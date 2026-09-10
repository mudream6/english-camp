import { about } from '../data.js'
import founder from '../assets/modal/founder.webp'
import classPic from '../assets/modal/class.webp'
import club from '../assets/modal/club.webp'
import banner from '../assets/modal/banner.webp'

/* 弹窗照片（顺序：余国良博士 / 公益口语课堂 / 俱乐部活动 / 营期合影）
   第一张挂了人物标识：鼠标碰到图片时从图底部滑出椭圆标识（触屏设备常显）
   黑白照原图仅 400×265，按原尺寸使用，不放大 */
const photos = [
  { src: founder, alt: '余国良博士照片', credit: true },
  { src: classPic, alt: 'TIFSC 公益口语课堂合影' },
  { src: club, alt: 'TIFSC 外语俱乐部活动现场' },
  { src: banner, alt: 'TIFSC 外语俱乐部合影' },
]

/* 「关于 TIFSC」弹窗正文 —— 正文逐句照搬《完整简介》资料，不新增文案 */
export default function AboutDetail() {
  const { modal } = about
  const { founder: yu } = modal
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
      <div className="mt-9 h-px w-full bg-line" />
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {photos.map((p) => (
          <figure
            key={p.src}
            className="photo-cell relative overflow-hidden rounded-[14px] border border-line bg-card"
          >
            <img
              src={p.src}
              alt={p.alt}
              decoding="async"
              className="aspect-[3/2] w-full object-cover"
            />
            {p.credit && (
              <figcaption className="photo-caption pointer-events-none bg-night/90 px-5 py-3 text-center text-paper shadow-[0_18px_40px_-18px_rgba(7,7,34,0.9)]">
                <span className="block text-[14.5px] font-bold leading-[1.3]">{yu.name}</span>
                <span className="mt-[6px] block text-[12.5px] font-medium leading-[1.7] text-paper/80">
                  {yu.titles}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </>
  )
}
