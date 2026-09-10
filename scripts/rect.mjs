// 取某选择器的真实几何 + 文本 + ® 小标的计算结果
// 用法: node scripts/rect.mjs <url> <selector> [w] [h]
const [, , url = 'http://localhost:5173/', sel = '.kicker', W = '1440', H = '900'] = process.argv

const list = await (await fetch('http://127.0.0.1:9333/json/list')).json()
const page = list.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) =>
  new Promise((res) => {
    const i = ++id
    pending.set(i, res)
    ws.send(JSON.stringify({ id: i, method, params }))
  })
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result)
    pending.delete(m.id)
  }
})
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

await new Promise((r) => ws.addEventListener('open', r))
await send('Emulation.setDeviceMetricsOverride', {
  width: +W,
  height: +H,
  deviceScaleFactor: 1,
  mobile: false,
})
await send('Page.enable')
await send('Page.navigate', { url })
await sleep(2800)

const expr = `(() => {
  const el = document.querySelector(${JSON.stringify(sel)})
  if (!el) return JSON.stringify({ error: 'not found: ' + ${JSON.stringify(sel)} })
  const r = el.getBoundingClientRect()
  const regs = [...el.querySelectorAll('.reg')].map((s) => {
    const cs = getComputedStyle(s)
    const rr = s.getBoundingClientRect()
    return { text: s.textContent, fontSize: cs.fontSize, top: +rr.top.toFixed(1), height: +rr.height.toFixed(1) }
  })
  return JSON.stringify({
    sel: ${JSON.stringify(sel)},
    text: el.innerText.replace(/\\n/g, ' '),
    html: el.innerHTML.replace(/\\s+/g, ' ').slice(0, 320),
    rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) },
    fontSize: getComputedStyle(el).fontSize,
    regs,
  })
})()`
const out = await send('Runtime.evaluate', { expression: expr, returnByValue: true })
const v = JSON.parse(out.result.value)
console.log('选择器 :', v.sel)
console.log('文本   :', v.text)
console.log('几何   :', v.rect ? `x=${v.rect.x} y=${v.rect.y} w=${v.rect.w} h=${v.rect.h}` : '-')
console.log('字号   :', v.fontSize)
console.log('HTML   :', v.html)
console.log('® 小标 :', v.regs.length ? JSON.stringify(v.regs) : '(无)')
ws.close()
process.exit(0)
