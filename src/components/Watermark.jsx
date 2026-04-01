import React from 'react'
import { couple } from '../data'
import { WATERMARK_CONFIG } from '../config/watermark'

const Watermark = () => {
  if (!WATERMARK_CONFIG.enabled) return null

  const text = WATERMARK_CONFIG.customText?.trim() || couple.together
  const dateStr = WATERMARK_CONFIG.showDate
    ? `${couple.wedding.month} ${couple.wedding.day}, ${couple.wedding.year}`
    : null

  const isLeft = WATERMARK_CONFIG.position === 'bottom-left'
  const posClass = isLeft
    ? 'left-[max(12px,env(safe-area-inset-left))] bottom-[max(12px,env(safe-area-inset-bottom))] text-left'
    : 'right-[max(12px,env(safe-area-inset-right))] bottom-[max(12px,env(safe-area-inset-bottom))] text-right'

  return (
    <div
      className={`pointer-events-none fixed z-[25] max-w-[min(200px,45vw)] select-none print:hidden ${posClass}`}
      aria-hidden
    >
      <p
        className="font-foglihten text-[9px] sm:text-[10px] tracking-[0.18em] uppercase leading-tight text-[#2E3B2F]"
        style={{ opacity: WATERMARK_CONFIG.opacity }}
      >
        {text}
      </p>
      {dateStr ? (
        <p
          className="font-albert text-[8px] sm:text-[9px] leading-tight text-[#2E3B2F] mt-1"
          style={{ opacity: WATERMARK_CONFIG.opacity * 0.9 }}
        >
          {dateStr}
        </p>
      ) : null}
    </div>
  )
}

export default Watermark
