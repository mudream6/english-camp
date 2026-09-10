// 多分辨率检查：横向溢出 + logo 实际尺寸/位置（CDP，零依赖）
const CDP_PORT = 9333
const URL = process.argv[2] || 'http://localhost:5173/'
const WIDTHS = (process.argv[3] || '390,768,1024,1280,1440,1920').split(',').map(Number)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
})
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
await new Promise((r) => ws.addEventListener('open', r))

await send('Page.enable')
await send('Runtime.enable')

const probe = `(() => {
  const imgs = [...document.querySelectorAll('header img')].map((el) => {
    const r = el.getBoundingClientRect()
    return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left), alt: el.alt, visible: r.width > 0 }
  })
  const de = document.documentElement
  const over = [...document.querySelectorAll('body *')]
    .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
    .slice(0, 5)
    .map((el) => el.tagName + '.' + (el.className || '').toString().slice(0, 40))
  return { innerWidth: window.innerWidth, scrollWidth: de.scrollWidth, overflowX: de.scrollWidth - window.innerWidth, imgs, overflowing: over }
})()`

console.log('宽度  | 页面宽 | 横向溢出 | 主logo(宽x高) | 小标(宽x高) | 溢出元素')
console.log('-'.repeat(88))
for (const w of WIDTHS) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 })
  await send('Page.navigate', { url: URL })
  await sleep(2200)
  const r = (await send('Runtime.evaluate', { expression: probe, returnByValue: true })).result.result.value
  const big = r.imgs[0]
  const small = r.imgs.find((i) => i.visible && i.h <= 30)
  console.log(
    `${String(w).padEnd(5)} | ${String(r.scrollWidth).padEnd(6)} | ${String(r.overflowX).padEnd(8)} | ` +
      `${big && big.visible ? `${big.w}x${big.h}` : '不可见'}`.padEnd(13) + ' | ' +
      `${small ? `${small.w}x${small.h}` : '隐藏'}`.padEnd(11) + ' | ' +
      (r.overflowing.length ? r.overflowing.join(' ; ') : '无'),
  )
}
ws.close()
