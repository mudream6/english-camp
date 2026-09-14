import { useRef, useState } from 'react'
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
  // 2026-09-14 新增渠道图标：微信 / 小红书（书本）/ 视频号（播放块）/ 微信服务号（喇叭）
  wechat: (
    <>
      <path d="M9.5 15.1c-.8 0-1.6-.1-2.3-.3L4.4 16.3l.7-2.5C3.4 12.8 2.3 11 2.3 9c0-3.4 3.2-6.1 7.2-6.1" />
      <path d="M22 14.3c0-2.9-2.7-5.2-6-5.2s-6 2.3-6 5.2 2.7 5.2 6 5.2c.7 0 1.3-.1 1.9-.3l2.5 1.4-.6-2.2c1.3-.9 2.2-2.4 2.2-4.1z" />
    </>
  ),
  xhs: (
    <>
      <path d="M4.6 4.4A2.4 2.4 0 0 1 7 2h10a2.4 2.4 0 0 1 2.4 2.4v15.2A2.4 2.4 0 0 1 17 22H7a2.4 2.4 0 0 1-2.4-2.4z" />
      <path d="M8.6 2.4v19.2" />
      <path d="M12.4 8.2h4.2M12.4 12.2h4.2" />
    </>
  ),
  shipin: (
    <>
      <rect x="2.6" y="3.6" width="18.8" height="16.8" rx="5" />
      <path d="M10.6 9.6l4.8 2.4-4.8 2.4z" />
    </>
  ),
  service: (
    <>
      <path d="M3.2 10.6v2.8a1 1 0 0 0 1 1h2.1l4.3 3.8V6.8L6.3 10.6H4.2a1 1 0 0 0-1 1z" />
      <path d="M14.6 8.6a4.6 4.6 0 0 1 0 6.8M17.8 5.8a8.4 8.4 0 0 1 0 12.4" />
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
   内容全部来自 data.js 的 contact.direct.groups —— 加/减渠道只改数据，不用动这个组件：
     value  一行纯文字（手机号 / 邮箱 / 微信号 / 账号名）—— 纯展示，不跳转
     links  有主页链接的渠道：数组 { name, url }，点账号名开新窗口
     sub    主文字下面的小字（例：小红书号）
     hint   这一组最下面一行的灰色提示
   排布：手机端 1 列；lg 起 2 列并排（卡片宽约 600px，排 2 列才不会把左栏四张卡拉得过高） */
function DirectContact() {
  const { direct } = contact

  /* 一键复制：点微信号 / 视频号名字就把文字复制到剪贴板，并短暂显示「已复制」
     · 优先用剪贴板 API；旧环境或非安全上下文回退到 execCommand
     · 复制失败就静默（不弹窗打扰访客） */
  const [copied, setCopied] = useState('')
  const timer = useRef(null)
  const copyText = async (text, label) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.top = '-1000px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(label)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(''), 1600)
    } catch {
      /* 静默失败 */
    }
  }

  return (
    <div className="rounded-[26px] border border-cream/10 bg-cream/4 p-7 sm:p-9 lg:flex lg:h-full lg:flex-col lg:p-9">
      <div>
        <h3 className="text-[20px] font-bold text-cream lg:text-[23px]">{direct.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-cream/45 lg:mt-2.5 lg:text-[14.5px]">
          {direct.note}
        </p>
      </div>

      <ul className="mt-7 grid gap-x-8 gap-y-7 lg:mt-8 lg:flex-1 lg:content-around lg:grid-cols-2 lg:gap-y-6">
        {direct.groups.map((g) => (
          <li key={g.label} className={`flex items-start gap-4${g.wide ? ' lg:col-span-2' : ' lg:gap-3'}`}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cream/12 bg-cream/4 text-cream/80">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {CONTACT_ICONS[g.icon]}
              </svg>
            </span>
            <div className="min-w-0 pt-0.5">
              {/* 可复制的组（手机号 / 邮箱 / 微信号 / 视频号名）：
                  整块都是按钮（点小标题或点文字都能复制），复制图标放在小标题右侧
                  —— 这样值再长也不会被图标挤到折行（邮箱实测过） */}
              {g.value && g.copy ? (
                <button
                  type="button"
                  onClick={() => copyText(g.value, g.label)}
                  title={'点击复制：' + g.value}
                  className="group/copy block w-full text-left"
                >
                  <span className="flex items-center gap-1.5 text-[11.5px] font-semibold tracking-[0.18em] text-cream/40 lg:text-[12.5px]">
                    {g.label}
                    {copied === g.label ? (
                      <span className="rounded-full border border-cream/20 bg-cream/10 px-1.5 py-[2px] text-[10.5px] font-semibold leading-none tracking-normal text-cream">
                        已复制
                      </span>
                    ) : (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 text-cream/30 transition-colors group-hover/copy:text-cream/80"
                      >
                        <rect x="9" y="9" width="12" height="12" rx="2.5" />
                        <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
                      </svg>
                    )}
                  </span>
                  <span className="mt-1.5 block break-all text-[16px] font-semibold text-cream lg:text-[17px]">
                    {g.value}
                  </span>
                </button>
              ) : (
                <>
                  <p className="text-[11.5px] font-semibold tracking-[0.18em] text-cream/40 lg:text-[12.5px]">
                    {g.label}
                  </p>
                  {g.value && (
                    <p className="mt-1.5 break-all text-[16px] font-semibold text-cream lg:text-[17px]">
                      {g.value}
                    </p>
                  )}
                </>
              )}

              {g.links && (
                <ul className="mt-2 space-y-2">
                  {g.links.map((a) => (
                    <li key={a.name}>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[15.5px] font-semibold text-cream transition-colors hover:text-white lg:text-[17px]"
                      >
                        {a.name}
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0 text-cream/45 transition-colors group-hover:text-white lg:h-[15px] lg:w-[15px]"
                        >
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {g.sub && <p className="mt-1.5 text-[12.5px] leading-relaxed text-cream/45 lg:text-[13.5px]">{g.sub}</p>}

              {g.hint && (
                <p className="mt-2 text-[12px] leading-relaxed text-cream/35 lg:mt-2.5 lg:text-[13.5px]">
                  {g.hint}
                </p>
              )}
            </div>
          </li>
        ))}
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

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            {/* 左：营地 / 咨询信息 */}
            <Reveal delay={120} className="h-full">
              {/* 手机/平板：原来的图标 + 文字排布（保持不变）；lg 及以上：放大成四张卡片并撑满左栏高度 */}
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:h-full lg:auto-rows-fr lg:gap-6">
                {/* 备用开关：data.js 里某张卡写 wide: true → 这张卡在 2 列排布里独占整行
                    （2026-09-14 目前没有卡开启它，页面效果 = 四张卡 2×2 均分） */}
                {contact.items.map((it) => (
                  <div
                    key={it.icon}
                    className={`flex items-start gap-4 lg:h-full lg:flex-col lg:gap-0 lg:rounded-[22px] lg:border lg:border-cream/10 lg:bg-cream/4 lg:p-8${it.wide ? ' sm:col-span-2' : ''}`}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cream/12 bg-cream/4 text-cream/80 lg:h-14 lg:w-14">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lg:h-[23px] lg:w-[23px]"
                      >
                        {CONTACT_ICONS[it.icon]}
                      </svg>
                    </span>
                    <div className="min-w-0 pt-0.5 lg:pt-0">
                      <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-cream/40 lg:mt-7 lg:text-[12.5px]">
                        {it.label}
                      </p>
                      <p className="mt-1.5 text-[16px] font-semibold text-cream lg:mt-3 lg:text-[22px] lg:leading-[1.35]">
                        {it.value}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-cream/35 lg:mt-3 lg:text-[14px] lg:leading-[1.8]">
                        {it.note}
                      </p>
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
