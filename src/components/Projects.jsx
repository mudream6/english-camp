import { projects } from '../data.js'
import Reveal from './Reveal.jsx'

/* 值里的富文本约定（data.js 里已注明）：
   '纯文本'            → 原样输出
   { hl: '强调词' }     → 藏青加粗（企业资料里点明要加重的字）
   { num: '≥2000' }    → 藏青加粗 + 放大一档（企业资料里点明要加重的数字） */
function Seg({ s }) {
  if (typeof s === 'string') return s
  if (s.num !== undefined) return <em className="hl-num">{s.num}</em>
  return <em className="hl">{s.hl}</em>
}

function Value({ v }) {
  if (Array.isArray(v)) return v.map((s, i) => <Seg key={i} s={s} />)
  return v
}

/* 三个项目纵向排列，每张卡：左侧衬线序号 + 右侧标题与字段表。
   字段按 cols 列横排（企业给的字段本来就不等长，横排比竖排更省空、更像"课程规格表"）。
   移动端一切单列堆叠。 */
export default function Projects() {
  return (
    <section id="projects" className="py-[clamp(80px,10vw,150px)]">
      <div className="shell">
        <Reveal>
          <p className="kicker">
            {projects.no}
            <span className="zh">{projects.en} · {projects.zh}</span>
          </p>
          <h2 className="mt-6 max-w-[720px] text-[clamp(1.9rem,3.4vw,2.9rem)] font-extrabold leading-[1.2] tracking-[-0.015em]">
            {projects.title}
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          {projects.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="group rounded-[22px] border border-line bg-card p-7 transition-all duration-500 hover:border-brand/25 hover:shadow-[0_30px_60px_-38px_rgba(38,40,43,0.35)] sm:p-9 lg:grid lg:grid-cols-[88px_1fr] lg:gap-x-6">
                <span className="no-num text-[38px] leading-none text-brand/25 transition-colors duration-300 group-hover:text-brand/50">
                  0{i + 1}
                </span>

                <div className="mt-5 lg:mt-0">
                  <h3 className="text-[19px] font-bold leading-snug tracking-tight lg:text-[21px]">
                    {p.title}
                    {p.note && <span className="ml-1 text-[14px] font-medium text-mut lg:text-[15px]">{p.note}</span>}
                  </h3>

                  <dl
                    className={`mt-6 grid gap-x-12 gap-y-6 border-t border-line pt-6 lg:mt-7 lg:gap-y-7 ${
                      p.cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
                    }`}
                  >
                    {p.rows.map((r) => (
                      <div key={r.k} className={r.list ? 'lg:col-span-full' : ''}>
                        <dt className="text-[12px] font-semibold tracking-[0.08em] text-mut">{r.k}</dt>
                        {r.v && (
                          <dd className="mt-2 text-[14.5px] leading-[1.8] text-ink/85 lg:text-[15px]">
                            <Value v={r.v} />
                          </dd>
                        )}
                        {r.list && (
                          <dd>
                            <ol className="mt-3 list-decimal space-y-2.5 pl-5 text-[14.5px] leading-[1.75] text-ink/85 marker:font-semibold marker:text-mut lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-2.5 lg:space-y-0 lg:text-[15px]">
                              {r.list.map((item, k) => (
                                <li key={k}>
                                  <Value v={item} />
                                </li>
                              ))}
                            </ol>
                          </dd>
                        )}
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
