import { useEffect, useState } from 'react'
import { brand, nav } from '../data.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 移动端菜单展开时锁定滚动
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-line shadow-[0_10px_30px_-20px_rgba(38,40,43,0.25)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        {/* 品牌 */}
        <a href="#top" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-pine text-cream serif-it text-[21px] leading-none pt-0.5">
            {brand.mark}
          </span>
          <span className="leading-tight">
            <span className="block text-[16px] font-extrabold tracking-tight">
              {brand.nameZh}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-mut">
              {brand.nameEn}
            </span>
          </span>
        </a>

        {/* 桌面导航 */}
        <nav className="hidden lg:flex items-center gap-9">
          {nav.links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="group relative text-[14.5px] font-medium text-ink/80 hover:text-ink transition-colors py-2"
            >
              {l.label}
              <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-pine transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={nav.cta.href} className="btn btn-primary btn-sm hidden sm:inline-flex">
            {nav.cta.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          {/* 汉堡按钮 */}
          <button
            aria-label={open ? '关闭菜单' : '打开菜单'}
            onClick={() => setOpen(!open)}
            className="lg:hidden relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card/70 backdrop-blur"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-[1.8px] w-full rounded bg-ink transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1.8px] w-full -translate-y-1/2 rounded bg-ink transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.8px] w-full rounded bg-ink transition-all duration-300 ${
                  open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* 移动端全屏菜单 */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-paper transition-all duration-500 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="shell flex h-[72px] items-center" />
        <nav className="shell flex flex-1 flex-col justify-center gap-2 pb-24">
          {nav.links.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`flex items-baseline gap-4 border-b border-line py-5 transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
            >
              <span className="no-num text-[15px] text-pine">0{i + 1}</span>
              <span className="text-[26px] font-bold tracking-tight">{l.label}</span>
            </a>
          ))}
          <a
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className={`btn btn-primary mt-10 self-start transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: open ? '420ms' : '0ms' }}
          >
            {nav.cta.label}
          </a>
        </nav>
      </div>
    </header>
  )
}
