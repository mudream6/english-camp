import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'

/* ── 深蓝按钮 Border Glow（移植 reactbits BorderGlow 的指针逻辑）──────────
   光标在按钮内移动时算出「离边缘的接近度 --eg」与「光标方位角 --ca」，
   交给 styles.css 里 .btn-primary::before/::after 点亮边框辉光。
   手机 / 触屏不启用（与 CSS 的 @media (hover: hover) and (min-width: 768px) 对齐）。 */
const glowQuery = window.matchMedia('(hover: hover) and (min-width: 768px)')

if (glowQuery.matches) {
  let frame = 0
  let pending = null

  const paint = () => {
    frame = 0
    const { el, x, y } = pending
    const rect = el.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = x - rect.left - cx
    const dy = y - rect.top - cy
    const kx = dx === 0 ? Infinity : cx / Math.abs(dx)
    const ky = dy === 0 ? Infinity : cy / Math.abs(dy)
    const proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1) * 100
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
    if (angle < 0) angle += 360
    el.style.setProperty('--eg', proximity.toFixed(2))
    el.style.setProperty('--ca', `${angle.toFixed(2)}deg`)
  }

  document.addEventListener(
    'pointermove',
    (e) => {
      const el = e.target instanceof Element ? e.target.closest('.btn-primary') : null
      if (!el) return
      pending = { el, x: e.clientX, y: e.clientY }
      if (!frame) frame = requestAnimationFrame(paint)
    },
    { passive: true },
  )

  document.addEventListener('pointerout', (e) => {
    const el = e.target instanceof Element ? e.target.closest('.btn-primary') : null
    if (!el) return
    const to = e.relatedTarget
    if (to instanceof Node && el.contains(to)) return
    el.style.setProperty('--eg', '0')
  })
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
