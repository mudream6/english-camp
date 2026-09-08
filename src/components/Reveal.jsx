import { useEffect, useRef } from 'react'

/* 通用滚动显现包装：进场时上移淡入（仅 transform/opacity），delay 用于卡片错落 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const shown = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shown.current) {
          shown.current = true
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
