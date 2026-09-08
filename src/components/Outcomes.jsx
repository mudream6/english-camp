import { outcomes } from '../data.js'
import Reveal from './Reveal.jsx'

/* 极简线性图标（stroke 风格，低饱和克制） */
const ICONS = {
  mic: (
    <>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8" />
    </>
  ),
  message: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  zap: (
    <>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </>
  ),
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
}

export default function Outcomes() {
  return (
    <section id="outcomes" className="bg-paper2 py-[clamp(80px,10vw,150px)]">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="kicker">
              {outcomes.no}
              <span className="zh">{outcomes.en} · {outcomes.zh}</span>
            </p>
            <h2 className="mt-6 max-w-[620px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
              {outcomes.title}
            </h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.9] text-mut">{outcomes.sub}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {outcomes.list.map((o, i) => (
            <Reveal key={o.t} delay={(i % 4) * 80}>
              <article className="group flex h-full flex-col rounded-[20px] border border-line bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-pine/30 hover:shadow-[0_26px_50px_-36px_rgba(38,40,43,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-[14px] bg-pine-soft text-pine transition-transform duration-500 group-hover:scale-105">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[o.icon]}
                    </svg>
                  </span>
                  <span className="rounded-full bg-mist px-3 py-1 text-[11.5px] font-semibold text-pine-deep/80">
                    {o.cat}
                  </span>
                </div>
                <h3 className="mt-6 text-[18px] font-bold tracking-tight">{o.t}</h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.85] text-mut">{o.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
