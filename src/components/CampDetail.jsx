import { courses, nav } from '../data.js'
import Mark from './Mark.jsx'

/* 「三周浸泡营」详情弹窗内容 —— 全部取自 data.js 已有文案，不新增编造内容 */
export default function CampDetail({ onClose }) {
  const { camp, path, compare, require: req } = courses

  return (
    <>
      <p className="kicker">
        {courses.no}
        <span className="zh">
          {courses.en} · {courses.zh}
        </span>
      </p>

      <h3
        id="camp-detail-title"
        className="mt-5 text-[clamp(1.35rem,2.4vw,1.85rem)] font-extrabold leading-[1.25] tracking-[-0.015em]"
      >
        <Mark>{camp.title}</Mark>
      </h3>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-brand-soft px-3 py-1 text-[12px] font-bold text-brand">{camp.badge}</span>
        <span className="text-[13.5px] font-medium text-mut">{camp.date}</span>
      </div>

      <ul className="mt-6 space-y-2.5">
        {camp.points.map((t) => (
          <li key={t} className="flex gap-3 text-[14.5px] leading-[1.8] text-mut">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand/60" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-line pt-7">
        <p className="text-[13px] font-bold tracking-[0.14em] text-brand/80">{path.title}</p>
        <p className="mt-2.5 text-[14px] leading-[1.8] text-mut">{path.goal}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {path.steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-line bg-card/70 p-4">
              <span className="no-num text-[13px] font-bold text-brand/70">{s.n}</span>
              <p className="mt-1.5 text-[14.5px] font-bold">{s.t}</p>
              <p className="mt-1.5 text-[13px] leading-[1.75] text-mut">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
        <div>
          <p className="text-[13px] font-bold tracking-[0.14em] text-brand/80">{compare.title}</p>
          <p className="mt-2.5 text-[13px] leading-[1.75] text-faint">{compare.note}</p>
          <p className="mt-2 text-[13.5px] font-bold text-brand">{compare.line}</p>
          <ul className="mt-3 space-y-2">
            {compare.tifsc.items.map((t) => (
              <li key={t} className="flex gap-2.5 text-[13.5px] leading-[1.8] text-mut">
                <span className="text-brand">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-bold tracking-[0.14em] text-brand/80">{req.title}</p>
          <ul className="mt-2.5 space-y-2">
            {req.items.map((t) => (
              <li key={t} className="flex gap-2.5 text-[13.5px] leading-[1.8] text-mut">
                <span className="text-brand">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-line pt-7">
        <a href={nav.cta.href} className="nav-cta" onClick={onClose}>
          {nav.cta.label}
        </a>
      </div>
    </>
  )
}
