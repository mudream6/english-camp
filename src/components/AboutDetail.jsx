import { about } from '../data.js'
/* 2026-09-14 按要求下线：余国良博士照片 / 公益口语课堂合影
   （图片已备份到项目根目录「已下线图片备份」文件夹；重新上架时把下面两行外面的注释符号删掉）
import founder from '../assets/modal/founder.webp'
import classPic from '../assets/modal/class.webp'
*/
import club from '../assets/modal/club.webp'
import banner from '../assets/modal/banner.webp'

/* 弹窗照片（顺序：俱乐部活动 / 营期合影）
   原第 1 张（余国良博士）挂了人物标识：鼠标碰到图片时从图底部滑出椭圆标识 —— 已随图一起下线
   黑白照原图仅 400×265，按原尺寸使用，不放大 */
const photos = [
  /* 2026-09-14 按要求下线（备份见项目根目录「已下线图片备份」，重新上架时取消注释）：
  { src: founder, alt: '余国良博士照片', credit: true },
  { src: classPic, alt: 'TIFSC 公益口语课堂合影' },
  */
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
              <figcaption className="photo-caption pointer-events-none bg-white px-5 py-3 text-center text-ink shadow-[0_16px_34px_-16px_rgba(7,7,34,0.55)]">
                <span className="block text-[14.5px] font-bold leading-[1.3]">{yu.name}</span>
                <span className="mt-[6px] block text-[12.5px] font-medium leading-[1.7] text-ink/65">
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
