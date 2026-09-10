// 精确截图：支持真·移动端模拟（CDP setDeviceMetricsOverride mobile:true）
// 用法: node scripts/shot.mjs <url> <out.png> <w> <h> [mobile(true/false)] [fullpage(true/false)] [clip] [scale]
//   clip 两种写法：
//     x1,y1,x2,y2  页面坐标裁剪（CDP「视口外裁剪」实测有坐标漂移，只在视口内可靠）
//     @选择器      元素滚到视口中央 → 整视口截图(按 dpr 放大) → 写 <out>.rect.json
//                  再跑 python scripts/crop.py <out.png> 裁出局部（推荐，坐标不会漂）
//   scale：裁剪模式的放大倍数 / @模式的 deviceScaleFactor（默认 2）
// 注意: headless 的 --screenshot + --window-size 不做移动端模拟，
//       会按 ~980px 布局视口渲染再裁到窗口宽度，看起来像"内容被右侧截断"——
//       那是假象。要验证移动端布局必须走 CDP 的 mobile emulation。
import fs from 'node:fs'

const [
  url = 'http://localhost:5173/',
  out = 'C:/Users/mudream/english-camp/.shots/shot.png',
  w = '1440',
  h = '900',
  mobile = 'false',
  full = 'false',
  clip = '',
  scale = '2',
] = process.argv.slice(2)
const CDP_PORT = 9333
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json()
const page = list.find((t) => t.type === 'page')
if (!page) {
  console.error('找不到 CDP 页面，先启动 Edge: --remote-debugging-port=9333')
  process.exit(1)
}
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

const isSel = clip.startsWith('@')

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: isSel ? Number(scale) : 1,
  mobile: mobile === 'true',
})
await send('Page.navigate', { url })
await sleep(3200) // 等入场动画 settle

const isFull = full === 'true'
if (isFull) {
  const pageH = (await send('Runtime.evaluate', { expression: 'document.body.scrollHeight', returnByValue: true })).result.result.value
  for (let y = 0; y < pageH; y += Math.floor(Number(h) * 0.8)) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` })
    await sleep(500)
  }
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' })
  await sleep(800)
}

// 冻结入场动画：reveal/h-anim 直接置为终态，截图才可复现
// （否则可能拍到 opacity:0 的空白，或动画中途的位置）
await send('Runtime.evaluate', {
  expression: `(() => {
    const s = document.createElement('style')
    s.id = '__shot_freeze'
    s.textContent =
      '.reveal{opacity:1!important;transform:none!important;transition:none!important}' +
      '.h-anim{opacity:1!important;transform:none!important;animation:none!important}'
    document.head.appendChild(s)
  })()`,
})
await sleep(300)

const shotArgs = { format: 'png', captureBeyondViewport: isFull }

if (isSel) {
  // 选择器模式：滚到元素 → 整视口截图（可靠）→ 写 sidecar 给 crop.py
  const sel = clip.slice(1)
  const q = `document.querySelector(${JSON.stringify(sel)})`
  const found = (await send('Runtime.evaluate', { returnByValue: true, expression: `!!${q}` })).result.result.value
  if (!found) {
    console.error(`未找到选择器: ${sel}`)
    ws.close()
    process.exit(1)
  }
  await send('Runtime.evaluate', { expression: `(() => { ${q}.scrollIntoView({ block: 'center' }) })()` })
  await sleep(700)
  const box = (await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const el = ${q}
      const b = el.getBoundingClientRect()
      return {
        x: b.x, y: b.y, w: b.width, h: b.height,
        dpr: window.devicePixelRatio,
        opacity: getComputedStyle(el).opacity,
      }
    })()`,
  })).result.result.value
  const side = out.replace(/\.png$/i, '') + '.rect.json'
  fs.writeFileSync(side, JSON.stringify({ ...box, pad: 16 }, null, 2))
  console.log(
    `选择器定位 ${sel}: 视口 x=${box.x.toFixed(1)} y=${box.y.toFixed(1)} w=${box.w.toFixed(1)} h=${box.h.toFixed(1)} dpr=${box.dpr} opacity=${box.opacity}`,
  )
  console.log(`→ ${side} 已写入；接着跑: python scripts/crop.py ${out}`)
} else if (clip) {
  const [x1, y1, x2, y2] = clip.split(',').map(Number)
  shotArgs.clip = { x: x1, y: y1, width: x2 - x1, height: y2 - y1, scale: Number(scale) }
  shotArgs.captureBeyondViewport = true
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

const shot = await send('Page.captureScreenshot', shotArgs)
fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'))
console.log(`已保存 ${out}  视口 ${w}x${h} mobile=${mobile} full=${isFull}${isSel ? ` dpr=${scale}` : ''}`)
console.log(`布局自检: innerWidth=${geo.innerWidth} scrollWidth=${geo.scrollWidth} 横向溢出=${geo.overflowX}px`)
ws.close()
