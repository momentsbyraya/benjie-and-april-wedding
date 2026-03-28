import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './pages/Details.css'
import { shouldUsePrenupPlaceholder, PRENUP_PLACEHOLDER_TEXT } from '../config/prenupPlaceholder'
import PrenupPlaceholder from './PrenupPlaceholder'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  // Avoid overlap with Hero, full-bleed/split on Home, and Love Story polaroids.
  // Includes former “unused” prenup*.jpg (1, 6, 9, 10, 12) only used here.
  // Grid: repeating 10-cell pattern — full, 1+2, 2+1, full, 1+2, 2+1.
  const galleryImages = [
    '/assets/images/prenup/JGM04189.jpg',
    '/assets/images/prenup/DSC00983.jpg',
    '/assets/images/prenup/JGM04100.jpg',
    '/assets/images/prenup/JGM03893.jpg',
    '/assets/images/prenup/DSC01113.jpg',
    '/assets/images/prenup/JGM04241.jpg',
    '/assets/images/prenup/DSC01020.jpg',
    '/assets/images/prenup/JGM04062.jpg',
    '/assets/images/prenup/DSC01026.jpg',
    '/assets/images/prenup/DSC01080.jpg',
    '/assets/images/prenup/prenup1.jpg',
    '/assets/images/prenup/prenup6.jpg',
    '/assets/images/prenup/prenup9.jpg',
    '/assets/images/prenup/prenup10.jpg',
    '/assets/images/prenup/prenup12.jpg',
  ]

  const gridColumnPattern = [
    'span 3',
    'span 1',
    'span 2',
    'span 2',
    'span 1',
    'span 3',
    'span 1',
    'span 2',
    'span 2',
    'span 1',
  ]

  /** Thumbnail crop tweaks (object-fit: cover) */
  const thumbObjectPosition = (src) => {
    if (src.includes('prenup1.jpg')) return 'center top'
    if (src.includes('JGM04241.jpg')) return 'center 38%'
    return 'center center'
  }

  const imageRefs = useRef([])

  useEffect(() => {
    if (titleRef.current) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse',
      })
    }

    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        const isFromLeft = index % 2 === 0
        const xValue = isFromLeft ? -100 : 100

        gsap.set(ref, {
          opacity: 0,
          x: xValue,
          force3D: true,
        })

        ScrollTrigger.create({
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
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars &&
          (trigger.vars.trigger === titleRef.current ||
            imageRefs.current.includes(trigger.vars.trigger))
        ) {
          trigger.kill()
        }
      })
    }
  }, [galleryImages.length])

  const handleImageClick = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (!isModalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, galleryImages.length])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      if (overlayRef.current && contentRef.current) {
        gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
        gsap.set(contentRef.current, { scale: 0.9 })

        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isModalOpen])

  return (
    <div ref={sectionRef} className="relative pb-8 sm:pb-12 md:pb-16">
      {/* Title strip — same layout / styles as FAQ (Details.css .faq-section, .faq-title-text) */}
      <div className="relative z-20 faq-section !py-8 sm:!py-10">
        <div className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
          <h3
            ref={titleRef}
            className="relative inline-block px-6 py-3 text-center w-full"
          >
            <span className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize faq-title-text">
              Gallery
            </span>
          </h3>
        </div>
      </div>

      <div className="max-w-xs sm:max-w-md lg:max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4" style={{ gridAutoRows: '1fr' }}>
          {galleryImages.map((image, index) => {
            const gridColumn = gridColumnPattern[index % gridColumnPattern.length]
            const isJgm03893 = image.includes('JGM03893.jpg')
            const isDsc00983 = image.includes('DSC00983.jpg')
            const responsiveObjectClass = isJgm03893
              ? 'object-center md:object-[center_38%]'
              : isDsc00983
                ? 'object-center min-[992px]:object-[center_18%]'
                : ''
            const skipInlineObjectPosition = isJgm03893 || isDsc00983

            return (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el
                }}
                className="cursor-pointer overflow-hidden max-h-[150px] lg:max-h-[250px]"
                style={{
                  gridColumn,
                  height: '100%',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
                onClick={() => handleImageClick(index)}
              >
                {shouldUsePrenupPlaceholder(image) ? (
                  <PrenupPlaceholder className="h-full w-full min-h-[120px]" />
                ) : (
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${responsiveObjectClass}`}
                    style={{
                      height: '100%',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      ...(skipInlineObjectPosition ? {} : { objectPosition: thumbObjectPosition(image) }),
                    }}
                    loading="lazy"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {isModalOpen &&
        createPortal(
          <div
            ref={modalRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={closeModal}
            />

            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div
              ref={contentRef}
              className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              style={{ pointerEvents: 'none' }}
            >
              {shouldUsePrenupPlaceholder(galleryImages[currentImageIndex]) ? (
                <div className="max-w-full max-h-[90vh] flex items-center justify-center px-8">
                  <p className="text-white font-albert text-lg sm:text-2xl tracking-[0.2em] uppercase text-center">
                    {PRENUP_PLACEHOLDER_TEXT}
                  </p>
                </div>
              ) : (
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              )}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-white text-sm font-albert">
                {currentImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default Gallery
