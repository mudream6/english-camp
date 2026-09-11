import { brand, contact } from '../data.js'
import Reveal from './Reveal.jsx'

const CONTACT_ICONS = {
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  chat: (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  douyin: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
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

/* 报名渠道卡：企业要求客户直接联系，原预约表单已下线（2026-09）。
   手机号 / 企业邮箱可直接点按，抖音账号名点开即进入主页。 */
function DirectContact() {
  const { direct } = contact
  const { douyin } = direct

  return (
    <div className="rounded-[26px] border border-cream/10 bg-cream/4 p-7 sm:p-9">
      <h3 className="text-[20px] font-bold text-cream">{direct.title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-cream/45">{direct.note}</p>

      <ul className="mt-7 space-y-7">
        {direct.rows.map((r) => (
          <li key={r.label} className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cream/12 bg-cream/4 text-cream/80">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {CONTACT_ICONS[r.icon]}
              </svg>
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-cream/40">{r.label}</p>
              <a
                href={r.href}
                className="mt-1.5 inline-block break-all text-[17px] font-semibold text-cream underline decoration-cream/20 underline-offset-[6px] transition-colors hover:text-white hover:decoration-cream/70"
              >
                {r.value}
              </a>
              <p className="mt-1 text-[12.5px] leading-relaxed text-cream/35">{r.hint}</p>
            </div>
          </li>
        ))}

        <li className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cream/12 bg-cream/4 text-cream/80">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {CONTACT_ICONS[douyin.icon]}
            </svg>
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-cream/40">{douyin.label}</p>
            <ul className="mt-2 space-y-2.5">
              {douyin.accounts.map((a) => (
                <li key={a}>
                  <a
                    href={douyin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[16px] font-semibold text-cream transition-colors hover:text-white"
                  >
                    {a}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cream/45 transition-colors group-hover:text-white">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[12.5px] leading-relaxed text-cream/35">{douyin.hint}</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <section id="contact" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night text-cream">
      {/* 巨型水印字（静态装饰） */}
      <span
        aria-hidden
        className="no-num serif-it pointer-events-none absolute -right-3 bottom-[4%] select-none text-[clamp(9rem,20vw,24rem)] leading-none text-cream/4"
      >
        {brand.watermark}
      </span>

      <div className="shell relative z-10 flex flex-1 flex-col justify-between pt-[120px] pb-10">
        {/* 主体 */}
        <div>
          <Reveal>
            <p className="kicker kicker-dark">
              {contact.no}
              <span className="zh">{contact.en} · {contact.zh}</span>
            </p>
            <h2 className="mt-6 text-[clamp(1.9rem,4vw,3.4rem)] font-extrabold leading-[1.18] tracking-[-0.02em]">
              {contact.title}
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.9] text-cream/55">{contact.sub}</p>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* 左：营地 / 咨询信息 */}
            <Reveal delay={120}>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {contact.items.map((it) => (
                  <div key={it.icon} className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cream/12 bg-cream/4 text-cream/80">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {CONTACT_ICONS[it.icon]}
                      </svg>
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                        {it.label}
                      </p>
                      <p className="mt-1.5 text-[16px] font-semibold text-cream">{it.value}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-cream/35">{it.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* 右：报名渠道（客户直接联系） */}
            <Reveal delay={220}>
              <DirectContact />
            </Reveal>
          </div>
        </div>

        {/* 页脚收束 */}
        <div className="mt-24 border-t border-cream/10 pt-7">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-[12.5px] text-cream/40">{contact.copyright}</p>
            <p className="flex items-center gap-2 text-[12px] text-cream/30">
              <a href="#top" className="transition-colors hover:text-cream/70">回到顶部 ↑</a>
              {contact.icp && (
                <>
                  <span>·</span>
                  <span>{contact.icp}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
