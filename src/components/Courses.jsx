import { courses } from '../data.js'
import Reveal from './Reveal.jsx'
import Mark from './Mark.jsx'

const Check = ({ onDark = false }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={onDark ? 'currentColor' : 'var(--color-brand)'}
    strokeWidth="2.4"
    className="mt-1 shrink-0"
  >
    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Cross = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a6a5a" strokeWidth="2" className="mt-1 shrink-0">
    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
)

export default function Courses() {
  return (
    <section id="courses" className="bg-paper2 py-[clamp(80px,10vw,150px)]">
      <div className="shell">
        {/* 区块头 */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="kicker">
              {courses.no}
              <span className="zh">{courses.en} · {courses.zh}</span>
            </p>
            <h2 className="mt-6 max-w-[680px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
              {courses.title}
            </h2>
            <p className="mt-5 text-[15px] text-mut">{courses.sub}</p>
          </Reveal>
        </div>

        {/* ── 核心产品大卡 ── */}
        <Reveal delay={100}>
          <article className="mt-14 grid gap-10 overflow-hidden rounded-[28px] border border-line bg-card p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="flex flex-col justify-center">
              <span className="self-start rounded-full bg-brand-soft px-4 py-1.5 text-[12px] font-semibold text-brand-deep">
                {courses.camp.badge}
              </span>
              <h3 className="mt-6 text-[clamp(1.7rem,3.2vw,2.6rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
                <Mark>{courses.camp.title}</Mark>
              </h3>
              <p className="mt-5 flex items-center gap-3 text-[15.5px] font-semibold text-brand">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                </svg>
                {courses.camp.date}
              </p>
              <p className="mt-2.5 text-[13.5px] text-mut">
                全封闭 · 全外教 · 面向全社会招生
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="btn btn-primary">
                  预约报名
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="#req" className="btn btn-ghost">查看入营要求</a>
              </div>
            </div>

            <ul className="flex flex-col justify-center gap-4 lg:border-l lg:border-line lg:pl-12">
              {courses.camp.points.map((p, i) => (
                <Reveal key={p} delay={150 + i * 80}>
                  <li className="flex items-start gap-3.5 text-[15px] leading-relaxed text-ink/80">
                    <Check />
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* ── 三级跃迁路径 ── */}
        <div className="mt-24">
          <Reveal>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.3em] text-mut">Growth Path · 成长路径</p>
            <h3 className="mt-4 text-[clamp(1.45rem,2.6vw,2.1rem)] font-extrabold tracking-[-0.01em]">
              {courses.path.title}
            </h3>
            <p className="mt-3 max-w-[560px] text-[14.5px] leading-[1.9] text-mut">{courses.path.goal}</p>
          </Reveal>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {courses.path.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative h-full rounded-[20px] border border-line bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_46px_-34px_rgba(38,40,43,0.4)]">
                  <span className="no-num text-[46px] leading-none text-brand/25">{s.n}</span>
                  <h4 className="mt-4 text-[19px] font-bold tracking-tight">{s.t}</h4>
                  <p className="mt-2.5 text-[14px] leading-[1.85] text-mut">{s.d}</p>
                  {i < courses.path.steps.length - 1 && (
                    <span className="absolute -right-[21px] top-1/2 z-10 hidden -translate-y-1/2 md:block">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-faint)" strokeWidth="1.8">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── 差异化对比 ── */}
        <div className="mt-24">
          <Reveal>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.3em] text-mut">Comparison · 差异对比</p>
            <h3 className="mt-4 text-[clamp(1.45rem,2.6vw,2.1rem)] font-extrabold tracking-[-0.01em]">
              {courses.compare.title}
            </h3>
            <p className="mt-3 text-[14px] text-mut">{courses.compare.note}</p>
          </Reveal>

          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            {/* 普通班 */}
            <Reveal>
              <div className="h-full rounded-[24px] border border-line bg-paper p-8 sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-[19px] font-bold tracking-tight">{courses.compare.standard.who}</h4>
                  <span className="rounded-full border border-line px-3.5 py-1 text-[12px] font-medium text-mut">
                    {courses.compare.standard.len}
                  </span>
                </div>
                <ul className="mt-7 space-y-4">
                  {courses.compare.standard.items.map((p) => (
                    <li key={p} className="flex items-start gap-3.5 text-[14.5px] leading-relaxed text-mut">
                      <Cross />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* TIFSC 高亮 */}
            <Reveal delay={120}>
              <div className="relative h-full overflow-hidden rounded-[24px] bg-brand p-8 text-cream sm:p-10">
                <span aria-hidden className="no-num serif-it pointer-events-none absolute -right-3 -top-6 select-none text-[120px] leading-none text-cream/10">
                  4×
                </span>
                <div className="relative flex items-center justify-between gap-4">
                  <h4 className="text-[19px] font-bold tracking-tight">{courses.compare.tifsc.who}</h4>
                  <span className="rounded-full bg-cream/12 px-3.5 py-1 text-[12px] font-medium text-cream/85">
                    {courses.compare.tifsc.len}
                  </span>
                </div>
                <ul className="relative mt-7 space-y-4">
                  {courses.compare.tifsc.items.map((p) => (
                    <li key={p} className="flex items-start gap-3.5 text-[14.5px] leading-relaxed text-cream/90">
                      <Check onDark />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="relative mt-8 border-t border-cream/15 pt-6 text-[17px] font-bold tracking-tight">
                  {courses.compare.line}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── 入营要求 ── */}
        <div id="req" className="mt-24 scroll-mt-28">
          <Reveal>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.3em] text-mut">Requirements · 入营要求</p>
            <h3 className="mt-4 text-[clamp(1.45rem,2.6vw,2.1rem)] font-extrabold tracking-[-0.01em]">
              {courses.require.title}
            </h3>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {courses.require.items.map((r, i) => (
              <Reveal key={r} delay={i * 80}>
                <div className="flex h-full flex-col rounded-[20px] border border-line bg-card p-7 transition-all duration-500 hover:-translate-y-1">
                  <span className="no-num text-[30px] leading-none text-brand/60">0{i + 1}</span>
                  <p className="mt-5 text-[14.5px] font-semibold leading-[1.75] tracking-tight">{r}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
