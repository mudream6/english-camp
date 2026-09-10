import { outcomes } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Outcomes() {
  const { journey, barriers, closing } = outcomes

  return (
    <section id="outcomes" className="bg-paper2 py-[clamp(80px,10vw,150px)]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="kicker">
              {outcomes.no}
              <span className="zh">{outcomes.en} · {outcomes.zh}</span>
            </p>
            <h2 className="mt-6 max-w-[680px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
              {outcomes.title}
            </h2>
            <p className="mt-5 max-w-[540px] text-[15px] leading-[1.9] text-mut">{outcomes.sub}</p>
          </Reveal>
        </div>

        {/* ── 三周成长弧线 ── */}
        <div className="mt-14">
          <Reveal>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.3em] text-mut">
              {journey.label} · 蜕变纪实
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {journey.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative h-full rounded-[20px] border border-line bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_46px_-34px_rgba(38,40,43,0.4)]">
                  <span className="no-num text-[46px] leading-none text-brand/25">{s.n}</span>
                  <h4 className="mt-4 text-[19px] font-bold tracking-tight">{s.t}</h4>
                  <p className="mt-2.5 text-[14px] leading-[1.85] text-mut">{s.d}</p>
                  {i < journey.steps.length - 1 && (
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

        {/* ── 八大心理障碍 ── */}
        <div className="mt-20">
          <Reveal>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.3em] text-mut">Barriers · 障碍拆解</p>
            <h3 className="mt-4 text-[clamp(1.45rem,2.6vw,2.1rem)] font-extrabold tracking-[-0.01em]">
              {barriers.label}
            </h3>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {barriers.items.map((b, i) => (
              <Reveal key={b} delay={(i % 4) * 70}>
                <div className="flex h-full items-center gap-4 rounded-[16px] border border-line bg-card px-5 py-4.5 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand/25">
                  <span className="no-num shrink-0 text-[18px] leading-none text-brand/50">0{i + 1}</span>
                  <span className="text-[15px] font-semibold tracking-tight">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="mt-6 text-[14px] leading-[1.9] text-mut">{barriers.note}</p>
          </Reveal>
        </div>

        {/* ── 定位宣言横幅 ── */}
        <Reveal delay={80}>
          <div className="relative mt-20 overflow-hidden rounded-[28px] bg-brand px-8 py-12 text-center sm:px-14 sm:py-16">
            <p className="mx-auto max-w-[760px] text-[clamp(1.4rem,2.8vw,2.15rem)] font-extrabold leading-[1.5] tracking-[-0.01em] text-cream">
              {closing}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
