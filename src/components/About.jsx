import { useState } from 'react'
import { about } from '../data.js'
import CampDetail from './CampDetail.jsx'
import Mark from './Mark.jsx'
import Modal from './Modal.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)

  return (
    <section id="about" className="py-[clamp(80px,10vw,150px)]">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* 左：简介 */}
          <div>
            <Reveal>
              <p className="kicker">
                {about.no}
                <span className="zh">{about.en} · {about.zh}</span>
              </p>
              <h2 className="mt-6 text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
                {about.title}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-[560px] text-[15.5px] leading-[2] text-ink/75">
                <Mark>{about.p1}</Mark>
              </p>
              <p className="mt-5 max-w-[560px] text-[15.5px] leading-[2] text-ink/75">{about.p2}</p>
              <p className="mt-5 max-w-[560px] text-[15.5px] leading-[2] text-ink/75">{about.p3}</p>
            </Reveal>
            <Reveal delay={200}>
              <button type="button" className="tlink mt-9" aria-haspopup="dialog" onClick={() => setOpen(true)}>
                {about.linkText}
                <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Reveal>
          </div>

          {/* 右：优势亮点列表 */}
          <div className="flex flex-col justify-center">
            {about.features.map((f, i) => (
              <Reveal key={f.n} delay={i * 90}>
                <div className="group flex gap-7 border-t border-line py-7 transition-colors duration-300 first:border-t-0 sm:gap-10">
                  <span className="no-num text-[22px] leading-none text-brand/70 pt-1">{f.n}</span>
                  <div>
                    <h3 className="text-[19px] font-bold tracking-tight">{f.t}</h3>
                    <p className="mt-2 max-w-[480px] text-[14.5px] leading-[1.85] text-mut">{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 底部数据带 */}
        <Reveal delay={100}>
          <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-line pt-10 md:grid-cols-4 md:pt-12">
            {about.stats.map((s, i) => (
              <div
                key={s.l}
                className={`md:px-8 ${
                  i % 2 === 1 ? 'max-md:border-l max-md:border-line max-md:pl-8' : ''
                } ${i > 0 ? 'md:border-l md:border-line' : ''}`}
              >
                <p className="text-[clamp(2.2rem,3.6vw,3.2rem)] font-extrabold tracking-[-0.02em]">
                  {s.v}
                  {s.u && <span className="text-[0.62em] font-bold text-brand ml-0.5">{s.u}</span>}
                </p>
                <p className="mt-1.5 text-[13.5px] font-medium text-mut">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* 点「查看三周浸泡营具体由来」→ 居中详情弹窗：半透明遮罩压暗背景，
          点遮罩 / 右上关闭按钮 / ESC 都能关掉回到原页面 */}
      <Modal open={open} onClose={closeModal} labelledBy="camp-detail-title">
        <CampDetail onClose={closeModal} />
      </Modal>
    </section>
  )
}
