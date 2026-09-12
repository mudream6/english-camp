import { useEffect, useState } from 'react'
import { brand, nav } from '../data.js'
import logoUrl from '../assets/logo.png'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  /* 吸顶状态：不监听 scroll（滚动时零 JS、零 setState），改成观察页首 25px 的哨兵元素；
     哨兵离开视口 = 已滚动过 25px，与原来 window.scrollY > 24 等价 */
  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.cssText =
      'position:absolute;top:25px;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden'
    document.body.prepend(sentinel)
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { threshold: 0 })
    io.observe(sentinel)
    return () => {
      io.disconnect()
      sentinel.remove()
    }
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
        {/* 品牌：TIFSC 官方 logo（hero 左上角，随固定导航常驻，高度 40px） */}
        <a
          href="#top"
          className="relative z-[70] flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoUrl}
            alt={`${brand.nameZh} ${brand.nameEn} TIFSC`}
            className="h-8 w-auto sm:h-10"
          />
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
              <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={nav.cta.href} className="btn btn-primary nav-cta hidden shrink-0 sm:inline-flex">
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
              <span className="no-num text-[15px] text-brand">0{i + 1}</span>
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
