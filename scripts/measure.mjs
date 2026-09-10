// 通过 Chrome DevTools Protocol 量取页面真实布局（无第三方依赖，Node 自带 WebSocket）
const CDP_PORT = 9333
const TARGET_URL = 'http://localhost:5173/'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  // 找到 headless Edge 的页面 target
  let list
  for (let i = 0; i < 30; i++) {
    try {
      list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json()
      if (list.some((t) => t.type === 'page')) break
    } catch {}
    await sleep(300)
  }
  const page = list.find((t) => t.type === 'page')
  if (!page) throw new Error('no page target')

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg)
      pending.delete(msg.id)
    }
  })
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const myId = ++id
      pending.set(myId, resolve)
      ws.send(JSON.stringify({ id: myId, method, params }))
    })

  await new Promise((r) => ws.addEventListener('open', r))
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await send('Page.navigate', { url: TARGET_URL })
  await sleep(2500)

  const expr = `(() => {
    const r = (el) => el ? el.getBoundingClientRect() : null
    const hero = r(document.getElementById('top'))
    const about = r(document.getElementById('about'))
    const nav = r(document.querySelector('header'))
    return JSON.stringify({
      viewportH: window.innerHeight,
      viewportW: window.innerWidth,
      heroH: hero && Math.round(hero.height),
      heroBottom: hero && Math.round(hero.bottom),
      heroPct: hero && +(hero.height / window.innerHeight * 100).toFixed(1),
      aboutTop: about && Math.round(about.top),
      aboutVisiblePx: about && Math.max(0, Math.round(window.innerHeight - about.top)),
      aboutTitle: document.querySelector('#about h2')?.textContent,
      title: document.title,
    }, null, 2)
  })()`
  const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true })
  console.log(res.result?.result?.value ?? JSON.stringify(res))
  ws.close()
}

main().catch((e) => {
  console.error('FAIL', e.message)
  process.exit(1)
})
