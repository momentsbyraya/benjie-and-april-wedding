import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImageLightbox from './ImageLightbox'
import { shouldUsePrenupPlaceholder } from '../config/prenupPlaceholder'
import PrenupPlaceholder from './PrenupPlaceholder'

gsap.registerPlugin(ScrollTrigger)

/**
 * Single photo spanning the viewport width; no margin/padding on the strip.
 */
const FullBleedPhoto = ({ src, alt = '' }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const wrapRef = useRef(null)
  const isPlaceholder = shouldUsePrenupPlaceholder(src)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 48 })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      animation: gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
      }),
      toggleActions: 'play none none reverse',
    })

    return () => {
      trigger.kill()
    }
  }, [src])

  return (
    <>
      <div
        ref={wrapRef}
        className="m-0 p-0 max-w-none overflow-x-clip"
        style={{ width: '100vw', margin: 0, padding: 0 }}
      >
        {isPlaceholder ? (
          <PrenupPlaceholder
            className="m-0 p-0 align-middle block min-h-[40vw] max-h-[85vh] w-full max-w-none"
            style={{ width: '100vw', margin: 0, padding: 0, display: 'block' }}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="m-0 p-0 border-0 align-middle block h-auto max-w-none cursor-pointer"
            style={{ width: '100vw', margin: 0, padding: 0, display: 'block' }}
            loading="lazy"
            decoding="async"
            role="button"
            tabIndex={0}
            aria-label={alt ? `View full size: ${alt}` : 'View full size'}
            onClick={() => setLightboxOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setLightboxOpen(true)
              }
            }}
          />
        )}
      </div>
      <ImageLightbox
        isOpen={lightboxOpen && !isPlaceholder}
        src={src}
        alt={alt}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}

export default FullBleedPhoto
