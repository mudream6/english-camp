import { team } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Team() {
  return (
    <section id="team" className="py-[clamp(80px,10vw,150px)]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="kicker">
              {team.no}
              <span className="zh">{team.en} · {team.zh}</span>
            </p>
            <h2 className="mt-6 max-w-[640px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
              {team.title}
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.9] text-mut">{team.sub}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[13px] font-medium text-mut">
              {team.notice}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {team.cards.map((c, i) => (
            <Reveal key={c.t} delay={(i % 4) * 90}>
              <article className="group flex h-full flex-col rounded-[22px] border border-line bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-[0_30px_60px_-38px_rgba(38,40,43,0.35)]">
                <span className="no-num text-[38px] leading-none text-brand/25 transition-colors duration-300 group-hover:text-brand/50">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-[19px] font-bold tracking-tight leading-snug">{c.t}</h3>
                <p className="mt-3 text-[14px] leading-[1.9] text-mut">{c.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
