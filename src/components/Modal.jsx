import { useEffect } from 'react'

/* 通用弹窗：半透明遮罩 + 居中面板
   关闭方式：点遮罩 / 点右上关闭按钮 / 按 ESC；打开期间锁定背景滚动。
   所有动效只用 transform / opacity（本站动画约束）。
   面板本身不滚动，内容区滚动；关闭按钮定位在面板右上角所以始终可见。 */
export default function Modal({ open, onClose, labelledBy, children }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      {/* 遮罩：半透明 + 背景变暗，点击即关闭 */}
      <div
        className="modal-backdrop absolute inset-0 bg-night/70 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* 面板 */}
      <div className="modal-panel relative flex max-h-[92svh] w-full max-w-[1040px] flex-col overflow-hidden rounded-[24px] border border-line bg-paper shadow-[0_40px_90px_-30px_rgba(7,7,34,0.6)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          autoFocus
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card/85 text-mut transition-colors hover:border-brand/30 hover:text-brand"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="overflow-y-auto overscroll-contain px-7 py-8 pr-16 sm:px-12 sm:py-12 sm:pr-24">{children}</div>
      </div>
    </div>
  )
}
