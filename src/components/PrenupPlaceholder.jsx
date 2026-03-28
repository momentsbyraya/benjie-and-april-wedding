import React from 'react'
import { PRENUP_PLACEHOLDER_TEXT } from '../config/prenupPlaceholder'

const PrenupPlaceholder = ({ className = '', ...rest }) => (
  <div
    className={`flex items-center justify-center bg-[#dfe5da] text-[#4a5a46] font-albert text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-center px-2 select-none ${className}`}
    {...rest}
  >
    {PRENUP_PLACEHOLDER_TEXT}
  </div>
)

export default PrenupPlaceholder
