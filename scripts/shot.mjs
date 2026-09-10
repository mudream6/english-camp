// 精确截图：支持真·移动端模拟（CDP setDeviceMetricsOverride mobile:true）
// 用法: node scripts/shot.mjs <url> <out.png> <w> <h> [mobile(true/false)] [fullpage(true/false)]
// 注意: headless 的 --screenshot + --window-size 不做移动端模拟，
//       会按 ~980px 布局视口渲染再裁到窗口宽度，看起来像"内容被右侧截断"——
//       那是假象。要验证移动端布局必须走 CDP 的 mobile emulation。
import fs from 'node:fs'

const [url = 'http://localhost:5173/', out = 'C:/Users/mudream/english-camp/.shots/shot.png', w = '1440', h = '900', mobile = 'false', full = 'false'] = process.argv.slice(2)
const CDP_PORT = 9333
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
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: 1,
  mobile: mobile === 'true',
})
await send('Page.navigate', { url })
await sleep(3200) // 等入场动画 settle

const isFull = full === 'true'
if (isFull) {
  const pageH = (await send('Runtime.evaluate', { expression: 'document.body.scrollHeight', returnByValue: true })).result.result.value
  for (let y = 0; y < pageH; y += Math.floor(Number(h) * 0.8)) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` })
    await sleep(600)
  }
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' })
  await sleep(1000)
}

// 几何自检：布局视口 / 横向溢出
const geo = (await send('Runtime.evaluate', {
  returnByValue: true,
  expression: `({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
  })`,
})).result.result.value

const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: isFull })
fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'))
console.log(`已保存 ${out}  视口 ${w}x${h} mobile=${mobile} full=${isFull}`)
console.log(`布局自检: innerWidth=${geo.innerWidth} scrollWidth=${geo.scrollWidth} 横向溢出=${geo.overflowX}px`)
ws.close()
