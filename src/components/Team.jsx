import { team } from '../data.js'
import Reveal from './Reveal.jsx'

/* 外教头像：有 photo 显示图片，否则显示字母占位（照片由用户后续提供） */
function Avatar({ t, idx }) {
  if (t.photo) {
    return (
      <img
        src={t.photo}
        alt={t.name}
        className="h-[88px] w-[88px] rounded-[20px] object-cover"
        loading="lazy"
      />
    )
  }
  return (
    <span className={`av av-${idx % 4} grid h-[88px] w-[88px] place-items-center rounded-[20px] text-white`}>
      <span className="no-num text-[30px] leading-none">{t.initials}</span>
    </span>
  )
}

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
            <h2 className="mt-6 max-w-[620px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
              {team.title}
            </h2>
            <p className="mt-5 max-w-[480px] text-[15px] leading-[1.9] text-mut">{team.sub}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {team.list.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 90}>
              <article className="flex h-full flex-col rounded-[22px] border border-line bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-38px_rgba(38,40,43,0.35)]">
                <div className="flex items-center gap-5">
                  <Avatar t={t} idx={i} />
                  <div className="min-w-0">
                    <p className="truncate text-[18px] font-extrabold tracking-tight">
                      {t.name} <span className="text-[15px]">{t.flag}</span>
                    </p>
                    <p className="mt-0.5 text-[13px] font-medium text-mut">{t.zh}</p>
                    <p className="mt-1.5 text-[12px] font-semibold text-pine">{t.cert}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-[12px] font-medium text-mut">
                  <span className="rounded-full bg-mist px-3 py-1 text-pine-deep">{t.exp}</span>
                  <span>{t.origin}</span>
                </div>

                <p className="mt-5 flex-1 text-[14px] leading-[1.9] text-mut">{t.bio}</p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                  {t.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line px-3 py-1 text-[12px] font-medium text-ink/65">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
