import { useState } from 'react'
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
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
}

/* 纯前端预约表单：提交时组装 mailto 唤起邮件客户端。
   接入第三方表单：在 data.js contact.leadForm.embedUrl 填入 iframe 地址即可整体替换。 */
function LeadForm() {
  const { leadForm } = contact
  const [sent, setSent] = useState(false)
  const { fields } = leadForm

  if (leadForm.embedUrl) {
    return (
      <div className="overflow-hidden rounded-[24px] border border-cream/10 bg-cream/5">
        <iframe src={leadForm.embedUrl} title="预约登记表单" className="h-[560px] w-full" loading="lazy" />
      </div>
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const lines = [
      `姓名：${fd.get('name') || '-'}`,
      `联系电话：${fd.get('phone') || '-'}`,
      `微信号：${fd.get('wechat') || '-'}`,
      `想了解的内容：${fd.get('note') || '-'}`,
    ]
    const subject = `报名咨询 · TIFSC 三周浸泡营（${fd.get('name') || '待定'}）`
    const body = lines.join('\n')
    window.location.href = `mailto:${leadForm.mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[26px] border border-cream/10 bg-cream/4 p-7 sm:p-9">
      <h3 className="text-[20px] font-bold text-cream">预约报名 · 三周浸泡营</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-cream/45">
        新一期 2026 年 10 月 9 日开营，面向全社会招生
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lf-name" className="mb-2 block text-[12px] font-medium text-cream/50">
            {fields.name} <span className="text-pine">*</span>
          </label>
          <input id="lf-name" name="name" required className="field" placeholder="怎么称呼你" />
        </div>
        <div>
          <label htmlFor="lf-phone" className="mb-2 block text-[12px] font-medium text-cream/50">
            {fields.phone} <span className="text-pine">*</span>
          </label>
          <input id="lf-phone" name="phone" type="tel" required className="field" placeholder="方便联系的手机号" />
        </div>
        <div>
          <label htmlFor="lf-wechat" className="mb-2 block text-[12px] font-medium text-cream/50">
            {fields.wechat}
          </label>
          <input id="lf-wechat" name="wechat" className="field" placeholder="选填，便于顾问添加你" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-note" className="mb-2 block text-[12px] font-medium text-cream/50">
            {fields.note}
          </label>
          <textarea id="lf-note" name="note" rows="3" className="field" placeholder="例如：想了解营期安排 / 当前听力词汇量大概水平" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-6 w-full">
        提交报名意向
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="mt-3.5 text-center text-[12px] leading-relaxed text-cream/35">
        {sent ? '已为你打开邮件客户端，发送即完成登记 ✓' : leadForm.submitNote}
      </p>
    </form>
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

            {/* 右：预约表单（第三方表单嵌入位） */}
            <Reveal delay={220}>
              <LeadForm />
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
