// 移动端媒体查询诊断
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
await send('Page.enable'); await send('Runtime.enable')

for (const cfg of [
  { width: 390, height: 844, mobile: true },
  { width: 390, height: 844, mobile: false },
  { width: 1440, height: 900, mobile: false },
]) {
  await send('Emulation.setDeviceMetricsOverride', { ...cfg, deviceScaleFactor: 1 })
  await send('Page.navigate', { url: 'http://localhost:5173/' })
  await sleep(2000)
  const r = (await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const imgs = [...document.querySelectorAll('header img')]
      const small = imgs[1]
      return {
        innerWidth: window.innerWidth,
        clientWidth: document.documentElement.clientWidth,
        visual: window.visualViewport ? window.visualViewport.width : null,
        mdMatches: window.matchMedia('(min-width: 768px)').matches,
        smallDisplay: small ? getComputedStyle(small).display : 'n/a',
        smallRect: small ? JSON.stringify(small.getBoundingClientRect().toJSON()) : 'n/a',
        navRowWidth: Math.round(document.querySelector('header .shell').getBoundingClientRect().width),
      }
    })()`,
  })).result.result.value
  console.log(`cfg ${cfg.width}x${cfg.height} mobile=${cfg.mobile} →`, JSON.stringify(r))
}
ws.close()
