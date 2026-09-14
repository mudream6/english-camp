import { useEffect, useRef, useState } from 'react'

/* 数字滚动：元素滚进视口后，从 0 快速累加到目标值，只跑一次。
   · 只处理纯数字（'3' / '240' / '0'）；含字母或符号的值原样显示，不动。
   · 动画期间把宽度锁在「终值的自然宽度」上，避免后面的单位字（周 / h / ×）跟着位数左右抖；
     动画一结束立刻撤掉内联样式，所以【静止态和没做动画时逐像素一致】。
   · 系统开了「减少动态效果」时直接显示终值。 */
export default function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null)
  const [text, setText] = useState(String(value))

  useEffect(() => {
    const el = ref.current
    const raw = String(value)
    const target = Number(raw)
    const isNum = /^\d+$/.test(raw) && !Number.isNaN(target)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!el || !isNum || target === 0 || reduce) {
      setText(raw)
      return
    }

    const hold = el.offsetWidth // 此刻 DOM 里就是终值，量到的就是终值自然宽度
    let raf = 0
    let started = false

    const run = () => {
      const t0 = performance.now()
      const step = (now) => {
        const p = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic：前段冲得快，末段稳稳落位
        setText(String(Math.round(target * eased)))
        if (p < 1) {
          raf = requestAnimationFrame(step)
        } else {
          setText(raw)
          el.style.minWidth = ''
          el.style.display = ''
        }
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        io.disconnect()
        el.style.minWidth = `${hold}px`
        el.style.display = 'inline-block'
        setText('0')
        run()
      },
      { threshold: 0.4 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return <span ref={ref}>{text}</span>
}
