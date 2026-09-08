import { courses } from '../data.js'
import Reveal from './Reveal.jsx'

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
            <h2 className="mt-6 max-w-[640px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
              {courses.title}
            </h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.9] text-mut">{courses.sub}</p>
          </Reveal>
          <Reveal delay={150}>
            <a href="#contact" className="btn btn-ghost hidden md:inline-flex">
              咨询班期与费用
            </a>
          </Reveal>
        </div>

        {/* 大卡片 */}
        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {courses.list.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 110}>
              <article className="course-card group h-full overflow-hidden rounded-[24px] border border-line bg-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-40px_rgba(38,40,43,0.35)]">
                {/* 封面 */}
                <div className={`cv cv-${(i % 4) + 1} relative flex min-h-[168px] flex-col justify-between p-7 sm:p-8`}>
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-white/16 px-4 py-1.5 text-[12px] font-semibold text-white backdrop-blur-sm">
                      {c.tag}
                    </span>
                    <span className="no-num select-none text-[54px] leading-none text-white/22">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
                      {c.en}
                    </span>
                    <span className="hidden text-[12px] font-medium text-white/65 sm:block">
                      {c.len}
                    </span>
                  </div>
                </div>

                {/* 内容 */}
                <div className="p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[24px] font-extrabold tracking-tight">{c.zh}</h3>
                    <span className="shrink-0 rounded-full border border-line px-3.5 py-1 text-[12px] font-medium text-mut">
                      适合 {c.age}
                    </span>
                  </div>
                  <p className="mt-2 text-[12.5px] font-medium uppercase tracking-[0.14em] text-faint sm:hidden">
                    {c.en} — {c.len}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-ink/78">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-pine)" strokeWidth="2.4" className="mt-1 shrink-0">
                          <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex items-center justify-between border-t border-line pt-6">
                    <span className="text-[13.5px] text-mut">{courses.note}</span>
                    <a href="#contact" className="tlink text-[14px]">
                      预约试听
                      <svg className="arr" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
