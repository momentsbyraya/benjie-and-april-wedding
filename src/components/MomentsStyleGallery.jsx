import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** 3-column spans: full → ⅓|⅔ → ⅔|⅓ → full, repeating; index 18 matches reference (⅔ only). */
export function getMomentsGridColumn(index) {
  const cycle = ['span 3', 'span 1', 'span 2', 'span 2', 'span 1', 'span 3']
  if (index === 18) return 'span 2'
  if (index >= 0 && index <= 17) return cycle[index % 6]
  if (index > 18) return cycle[(index - 19) % 6]
  return 'span 1'
}

/**
 * Prenup-style masonry grid: alternating slide-in from left/right on scroll.
 */
export default function MomentsStyleGallery({ images, onImageClick, className = '' }) {
  const imageRefs = useRef([])
  const triggersRef = useRef([])

  useEffect(() => {
    triggersRef.current.forEach((t) => t.kill())
    triggersRef.current = []

    imageRefs.current.forEach((ref, index) => {
      if (!ref) return
      const fromLeft = index % 2 === 0
      const xValue = fromLeft ? -100 : 100

      gsap.set(ref, { opacity: 0, x: xValue, force3D: true })

      const st = ScrollTrigger.create({
        trigger: ref,
        start: 'top 85%',
        animation: gsap.to(ref, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
        }),
        toggleActions: 'play none none reverse',
      })
      triggersRef.current.push(st)
    })

    return () => {
      triggersRef.current.forEach((t) => t.kill())
      triggersRef.current = []
    }
  }, [images.length])

  return (
    <div className={`max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-4 sm:px-6 ${className}`.trim()}>
      <div
        className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
        style={{ gridAutoRows: '1fr' }}
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            ref={(el) => {
              imageRefs.current[index] = el
            }}
            className="soft-edges relative overflow-hidden max-h-[150px] lg:max-h-[200px] cursor-pointer"
            style={{
              gridColumn: getMomentsGridColumn(index),
              height: '100%',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
            onClick={() => onImageClick?.(src, index)}
          >
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              style={{
                height: '100%',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
              loading={index < 6 ? 'eager' : 'lazy'}
              fetchPriority={index < 3 ? 'high' : index < 6 ? 'auto' : 'low'}
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
