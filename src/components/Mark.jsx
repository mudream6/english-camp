import { Fragment } from 'react'

// 把字符串里的「®」渲染成小号上标商标符号（0.6em + 上标对齐，样式见 styles.css 的 .reg）
// 用法：<Mark>{brand.tagline}</Mark>  —— 文案里写不写 ® 由 data.js 决定
export default function Mark({ children, className = 'reg' }) {
  const parts = String(children ?? '').split('®')
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <sup className={className}>®</sup>}
    </Fragment>
  ))
}
