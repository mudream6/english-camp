import { hero } from '../data.js'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[80svh] flex-col overflow-hidden">
      {/* 低饱和环境光斑（静态渐变，无动画） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1100px 700px at 88% -8%, rgba(46,90,73,0.13), transparent 62%), radial-gradient(900px 640px at -8% 108%, rgba(192,158,105,0.12), transparent 55%)',
        }}
      />

      <div className="shell relative z-10 flex flex-1 flex-col items-center justify-center pt-[110px] pb-20 text-center">
        {/* kicker */}
        <p
          className="h-anim kicker text-[11.5px] sm:text-[12.5px]"
          style={{ animationDelay: '80ms' }}
        >
          <span className="zh">{hero.kicker}</span>
        </p>

        {/* 斜体衬线英文引句 */}
        <p
          className="h-anim serif-it mt-7 text-[17px] sm:text-[20px] md:text-[22px] text-pine"
          style={{ animationDelay: '200ms' }}
        >
          {hero.leadIt}
        </p>

        {/* 大标题 */}
        <h1
          className="h-anim mt-5 text-[clamp(2.5rem,6.6vw,4.9rem)] font-extrabold leading-[1.12] tracking-[-0.02em]"
          style={{ animationDelay: '300ms' }}
        >
          <span className="block">{hero.line1}</span>
          <span className="block">
            {hero.line2a}
            <span className="text-pine">{hero.line2b}</span>
          </span>
        </h1>

        {/* 副文案 */}
        <p
          className="h-anim mx-auto mt-7 max-w-[640px] text-[15px] leading-[1.9] text-mut sm:text-[16.5px]"
          style={{ animationDelay: '430ms' }}
        >
          {hero.sub}
        </p>

        {/* CTA */}
        <div
          className="h-anim mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: '560ms' }}
        >
          {hero.cta.map((c) =>
            c.primary ? (
              <a key={c.label} href={c.href} className="btn btn-primary">
                {c.label}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ) : (
              <a key={c.label} href={c.href} className="btn btn-ghost">
                {c.label}
              </a>
            ),
          )}
        </div>

        {/* 信任点 */}
        <ul
          className="h-anim mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={{ animationDelay: '680ms' }}
        >
          {hero.trust.map((t) => (
            <li key={t} className="flex items-center gap-2 text-[13.5px] font-medium text-mut sm:text-[14px]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-pine)" strokeWidth="2.2" className="shrink-0">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* 底部滚动提示 */}
      <div className="relative z-10 hidden pb-8 sm:block">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-faint">Scroll</span>
          <span className="cue-line" />
        </div>
      </div>
    </section>
  )
}
