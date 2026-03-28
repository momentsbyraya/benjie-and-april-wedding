import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImageLightbox from './ImageLightbox'
import { shouldUsePrenupPlaceholder } from '../config/prenupPlaceholder'
import PrenupPlaceholder from './PrenupPlaceholder'

gsap.registerPlugin(ScrollTrigger)

const cellClass =
  'relative m-0 p-0 overflow-hidden h-[42vw] max-h-[560px] min-h-[200px] sm:min-h-[240px] md:min-h-[280px]'

const splitImgClass =
  'absolute inset-0 m-0 p-0 border-0 w-full h-full object-cover cursor-pointer'

/**
 * Two images in one full-viewport row, no gap, no outer margin/padding.
 * Default: left 2/3, right 1/3. With invertLayout: left 1/3, right 2/3.
 */
const FullBleedPhotoSplit = ({
  leftSrc,
  rightSrc,
  leftAlt = '',
  rightAlt = '',
  invertLayout = false,
}) => {
  const [lightbox, setLightbox] = useState(null) // { src, alt } | null
  const gridRef = useRef(null)
  const leftPaneRef = useRef(null)
  const rightPaneRef = useRef(null)

  const leftPlaceholder = shouldUsePrenupPlaceholder(leftSrc)
  const rightPlaceholder = shouldUsePrenupPlaceholder(rightSrc)

  const openLeft = () => {
    if (!leftPlaceholder) setLightbox({ src: leftSrc, alt: leftAlt || 'Photo' })
  }
  const openRight = () => {
    if (!rightPlaceholder) setLightbox({ src: rightSrc, alt: rightAlt || 'Photo' })
  }

  const imgKeyHandlers = (open) => ({
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        open()
      }
    },
  })

  useEffect(() => {
    const grid = gridRef.current
    const leftEl = leftPaneRef.current
    const rightEl = rightPaneRef.current
    if (!grid || !leftEl || !rightEl) return

    const fromX = (el, x) => gsap.set(el, { opacity: 0, x })
    fromX(leftEl, -56)
    fromX(rightEl, 56)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    })
    tl.to(
      leftEl,
      { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out' },
      0
    ).to(
      rightEl,
      { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out' },
      0.1
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [leftSrc, rightSrc, invertLayout])

  return (
    <>
      <div
        ref={gridRef}
        className="m-0 p-0 max-w-none overflow-x-clip grid grid-cols-3 gap-0"
        style={{ width: '100vw', margin: 0, padding: 0 }}
      >
        {invertLayout ? (
          <>
            <div ref={leftPaneRef} className={`col-span-1 ${cellClass}`}>
              {leftPlaceholder ? (
                <PrenupPlaceholder className="absolute inset-0 m-0 p-0 h-full w-full" />
              ) : (
                <img
                  src={leftSrc}
                  alt={leftAlt}
                  className={splitImgClass}
                  loading="lazy"
                  decoding="async"
                  role="button"
                  tabIndex={0}
                  aria-label={leftAlt ? `View full size: ${leftAlt}` : 'View full size'}
                  onClick={openLeft}
                  {...imgKeyHandlers(openLeft)}
                />
              )}
            </div>
            <div ref={rightPaneRef} className={`col-span-2 ${cellClass}`}>
              {rightPlaceholder ? (
                <PrenupPlaceholder className="absolute inset-0 m-0 p-0 h-full w-full" />
              ) : (
                <img
                  src={rightSrc}
                  alt={rightAlt}
                  className={splitImgClass}
                  loading="lazy"
                  decoding="async"
                  role="button"
                  tabIndex={0}
                  aria-label={rightAlt ? `View full size: ${rightAlt}` : 'View full size'}
                  onClick={openRight}
                  {...imgKeyHandlers(openRight)}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div ref={leftPaneRef} className={`col-span-2 ${cellClass}`}>
              {leftPlaceholder ? (
                <PrenupPlaceholder className="absolute inset-0 m-0 p-0 h-full w-full" />
              ) : (
                <img
                  src={leftSrc}
                  alt={leftAlt}
                  className={splitImgClass}
                  loading="lazy"
                  decoding="async"
                  role="button"
                  tabIndex={0}
                  aria-label={leftAlt ? `View full size: ${leftAlt}` : 'View full size'}
                  onClick={openLeft}
                  {...imgKeyHandlers(openLeft)}
                />
              )}
            </div>
            <div ref={rightPaneRef} className={`col-span-1 ${cellClass}`}>
              {rightPlaceholder ? (
                <PrenupPlaceholder className="absolute inset-0 m-0 p-0 h-full w-full" />
              ) : (
                <img
                  src={rightSrc}
                  alt={rightAlt}
                  className={splitImgClass}
                  loading="lazy"
                  decoding="async"
                  role="button"
                  tabIndex={0}
                  aria-label={rightAlt ? `View full size: ${rightAlt}` : 'View full size'}
                  onClick={openRight}
                  {...imgKeyHandlers(openRight)}
                />
              )}
            </div>
          </>
        )}
      </div>
      <ImageLightbox
        isOpen={!!lightbox}
        src={lightbox?.src}
        alt={lightbox?.alt ?? ''}
        onClose={() => setLightbox(null)}
      />
    </>
  )
}

export default FullBleedPhotoSplit
