import { useState } from 'react'
import { brand, contact, courses } from '../data.js'
import Reveal from './Reveal.jsx'

const CONTACT_ICONS = {
  wechat: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
}

function copyText(t) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(t)
  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement('textarea')
      ta.value = t
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      resolve()
    } catch (e) {
      reject(e)
    }
  })
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
        <iframe
          src={leadForm.embedUrl}
          title="预约登记表单"
          className="h-[560px] w-full"
          loading="lazy"
        />
      </div>
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const lines = [
      `家长/学员姓名：${fd.get('name') || '-'}`,
      `联系电话：${fd.get('phone') || '-'}`,
      `学员年龄：${fd.get('age') || '-'}`,
      `意向课程：${fd.get('program') || '-'}`,
      `补充说明：${fd.get('note') || '-'}`,
    ]
    const subject = `预约体验课 · ${fd.get('name') || '咨询'}`
    const body = lines.join('\n')
    window.location.href = `mailto:${contact.items.find((i) => i.icon === 'mail').value}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[26px] border border-cream/10 bg-cream/4 p-7 sm:p-9"
    >
      <h3 className="text-[20px] font-bold text-cream">预约免费体验课</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-cream/45">
        留下信息，课程顾问将在 24 小时内与你联系
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
          <label htmlFor="lf-age" className="mb-2 block text-[12px] font-medium text-cream/50">
            {fields.age}
          </label>
          <select id="lf-age" name="age" className="field" defaultValue="">
            <option value="" disabled>请选择年龄段</option>
            <option>6–9 岁</option>
            <option>10–12 岁</option>
            <option>13–15 岁</option>
            <option>16–18 岁</option>
            <option>成人</option>
          </select>
        </div>
        <div>
          <label htmlFor="lf-program" className="mb-2 block text-[12px] font-medium text-cream/50">
            {fields.program}
          </label>
          <select id="lf-program" name="program" className="field" defaultValue="">
            <option value="" disabled>选择意向课程</option>
            {courses.list.map((c) => (
              <option key={c.id}>{c.zh}</option>
            ))}
            <option>还没想好 / 想先咨询</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lf-note" className="mb-2 block text-[12px] font-medium text-cream/50">
            {fields.note}
          </label>
          <textarea id="lf-note" name="note" rows="3" className="field" placeholder="例如：想重点提升口语 / 计划寒假参营" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-6 w-full">
        提交预约
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="mt-3.5 text-center text-[12px] text-cream/35">
        {sent ? '已为你打开邮件客户端，发送即完成预约 ✓' : '体验课免费 · 信息仅用于课程咨询'}
      </p>
    </form>
  )
}

export default function Footer() {
  const [copied, setCopied] = useState('')

  const onCopy = (val) => {
    copyText(val).then(() => {
      setCopied(val)
      setTimeout(() => setCopied(''), 2200)
    })
  }

  return (
    <section id="contact" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night text-cream">
      {/* 巨型水印字（静态装饰） */}
      <span
        aria-hidden
        className="serif-it pointer-events-none absolute -right-4 bottom-[6%] select-none text-[clamp(10rem,22vw,26rem)] leading-none text-cream/4"
      >
        {brand.nameEn}
      </span>

      <div className="shell relative z-10 flex flex-1 flex-col justify-between pt-[120px] pb-10">
        {/* 主体 */}
        <div>
          <Reveal>
            <p className="kicker kicker-dark">
              {contact.no}
              <span className="zh">{contact.en} · {contact.zh}</span>
            </p>
            <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.6rem)] font-extrabold leading-[1.15] tracking-[-0.02em]">
              {contact.title}
            </h2>
            <p className="mt-5 max-w-[540px] text-[15.5px] leading-[1.9] text-cream/55">
              {contact.sub}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* 左：联系渠道 */}
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
                      <p className="mt-1.5 text-[16px] font-semibold text-cream">
                        {it.icon === 'phone' && (
                          <a href={`tel:${it.value.replace(/-/g, '')}`} className="break-all hover:text-cream/80">
                            {it.value}
                          </a>
                        )}
                        {it.icon === 'mail' && (
                          <a href={`mailto:${it.value}`} className="break-all hover:text-cream/80">
                            {it.value}
                          </a>
                        )}
                        {it.icon !== 'phone' && it.icon !== 'mail' && it.value}
                        {it.copyable && (
                          <button
                            onClick={() => onCopy(it.value)}
                            className="rounded-full border border-cream/15 px-3 py-0.5 text-[11.5px] font-semibold text-cream/60 transition-colors hover:border-cream/40 hover:text-cream"
                          >
                            {copied === it.value ? '已复制 ✓' : '复制'}
                          </button>
                        )}
                      </p>
                      <p className="mt-1 text-[12px] text-cream/35">{it.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 社交媒体 */}
              <div className="mt-12 flex flex-wrap gap-3">
                {contact.socials.map((s) => (
                  <span key={s.label} className="rounded-full border border-cream/12 bg-cream/4 px-5 py-2.5">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                      {s.label}
                    </span>
                    <span className="mt-0.5 block text-[13px] font-semibold text-cream/85">{s.handle}</span>
                  </span>
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
              <span>·</span>
              <span>{contact.icp}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
