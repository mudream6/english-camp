import { about } from '../data.js'

/* 「关于 TIFSC」弹窗正文 —— 逐句照搬《完整简介》资料，不新增内容 */
export default function AboutDetail() {
  const { modal } = about
  return (
    <>
      <h3
        id="camp-detail-title"
        className="text-[clamp(1.5rem,2.6vw,2.05rem)] font-extrabold leading-[1.25] tracking-[-0.015em]"
      >
        {modal.title}
      </h3>
      <div className="mt-6 h-px w-full bg-line" />
      <div className="mt-7 space-y-5">
        {modal.paragraphs.map((t) => (
          <p key={t} className="text-[16.5px] leading-[2] text-ink/75">
            {t}
          </p>
        ))}
      </div>
    </>
  )
}
