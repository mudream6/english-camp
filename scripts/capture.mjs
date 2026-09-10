// 全页截图（CDP）: 先滚到底触发 reveal 动画，再回顶截全页
const CDP_PORT = 9333
const URL = process.argv[2] || 'http://localhost:5173/'
const OUT = process.argv[3] || 'C:/Users/mudream/english-camp/.shots/full.png'
const W = Number(process.argv[4] || 1440)
const H = Number(process.argv[5] || 900)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const fs = await import('node:fs')

let list
for (let i = 0; i < 40; i++) {
  try {
    list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json()
    if (list.some((t) => t.type === 'page')) break
  } catch {}
  await sleep(300)
}
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
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: URL })
await sleep(3000)

// 逐屏滚动，触发 IntersectionObserver 显现动画
const height = (await send('Runtime.evaluate', { expression: 'document.body.scrollHeight', returnByValue: true })).result.result.value
for (let y = 0; y < height; y += Math.floor(H * 0.8)) {
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` })
  await sleep(700)
}
await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' })
await sleep(1200)

const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
fs.writeFileSync(OUT, Buffer.from(shot.result.data, 'base64'))
console.log(`已保存 ${OUT}  页面总高 ${height}px`)
ws.close()
