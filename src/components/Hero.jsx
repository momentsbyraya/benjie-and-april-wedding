import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Play, Pause } from 'lucide-react'
import { couple, venues, audio } from '../data'
import { themeConfig } from '../config/themeConfig'
import { shouldUsePrenupPlaceholder, PRENUP_PLACEHOLDER_TEXT } from '../config/prenupPlaceholder'
import PrenupPlaceholder from './PrenupPlaceholder'

const HERO_IMAGE_SRC = '/assets/images/prenup/DSC01018.jpg'

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  
  // Refs for animated elements
  const groomFirstNameRef = useRef(null)
  const groomLastNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
  const brideLastNameRef = useRef(null)
  const dateRef = useRef(null)
  const venueRef = useRef(null)
  const playButtonRef = useRef(null)

  const formatDate = () => {
    const { day, year, month } = couple.wedding
    // Format as MONTH.DD.YYYY (e.g. APRIL.25.2026)
    const monthUpper = month.toUpperCase() // Get month name in uppercase (APRIL)
    const dayFormatted = String(day).padStart(2, '0') // Ensure 2 digits (07)
    return `${monthUpper}.${dayFormatted}.${year}`
  }

  const venueName = venues.ceremony.name

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  useEffect(() => {
    // Set initial hidden states
    gsap.set(groomFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(groomLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(andRef.current, { opacity: 0, y: 20 })
    gsap.set(brideFirstNameRef.current, { opacity: 0, y: 30 })
    gsap.set(brideLastNameRef.current, { opacity: 0, y: 30 })
    gsap.set(dateRef.current, { opacity: 0, y: 20 })
    gsap.set(venueRef.current, { opacity: 0, y: 20 })
    gsap.set(playButtonRef.current, { opacity: 0, scale: 0.8 })

    // Create timeline for sequential animations (top → bottom: date/venue, then names)
    const tl = gsap.timeline({ delay: 0.3 })

    // 1. Date
    if (dateRef.current) {
      tl.to(dateRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      })
    }

    // 2. Venue
    if (venueRef.current) {
      tl.to(venueRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")
    }

    // 3. Groom's name
    if (groomFirstNameRef.current && groomLastNameRef.current) {
      tl.to(groomFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(groomLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 4. "AND"
    if (andRef.current) {
      tl.to(andRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.2")
    }

    // 5. Bride's name
    if (brideFirstNameRef.current && brideLastNameRef.current) {
      tl.to(brideFirstNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(brideLastNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
    }

    // 6. Play button
    if (playButtonRef.current) {
      tl.to(playButtonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.2")
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-burgundy-dark" style={{ height: '100vh' }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audio.background}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Slight bleed past edges + overflow-hidden hides subpixel gaps vs parent / next section */}
      {shouldUsePrenupPlaceholder(HERO_IMAGE_SRC) ? (
        <PrenupPlaceholder
          data-hero-image-slot
          className="absolute left-1/2 top-1/2 h-[102%] w-[102%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
          aria-label={PRENUP_PLACEHOLDER_TEXT}
        />
      ) : (
        <img
          data-hero-image-slot
          src={HERO_IMAGE_SRC}
          alt="Benjie and April"
          className="absolute left-1/2 top-1/2 h-[102%] w-[102%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover object-[50%_18%] sm:object-[50%_22%] md:object-[50%_25%] lg:object-[50%_27%] xl:object-[50%_28%]"
          fetchPriority="high"
          decoding="async"
        />
      )}

      {/* Blurred olive overlay — pulled past top/left/right so no hairline shows */}
      <svg
        className="pointer-events-none absolute -top-2 left-1/2 z-10 h-[calc(16rem+16px)] w-[calc(100%+24px)] max-w-none -translate-x-1/2 sm:h-[calc(20rem+16px)] md:h-[calc(24rem+16px)] lg:h-[calc(28rem+20px)]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBlurTop">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(58, 77, 57, 0.92)" />
            <stop offset="12%" stopColor="rgba(58, 77, 57, 0.82)" />
            <stop offset="40%" stopColor="rgba(58, 77, 57, 0.45)" />
            <stop offset="70%" stopColor="rgba(58, 77, 57, 0.18)" />
            <stop offset="100%" stopColor="rgba(58, 77, 57, 0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#topGradient)" filter="url(#heroBlurTop)" />
      </svg>
      
      {/* Date and venue — top */}
      <div className="absolute top-0 left-0 right-0 pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p ref={dateRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-foglihten" style={{ color: '#F4F1EC', textShadow: '0 1px 3px rgba(0,0,0,0.4), 0 0 18px rgba(46,59,47,0.35)' }}>
            {formatDate()}
          </p>
          <p ref={venueRef} className="text-xs sm:text-sm md:text-base font-albert mt-2 sm:mt-3" style={{ color: '#F4F1EC', textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}>
            {venueName}
          </p>
        </div>
      </div>

      <svg
        className="pointer-events-none absolute -bottom-2 left-1/2 z-10 h-[calc(16rem+16px)] w-[calc(100%+24px)] max-w-none -translate-x-1/2 sm:h-[calc(20rem+16px)] md:h-[calc(24rem+16px)] lg:h-[calc(28rem+20px)]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBlurBottom">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(58, 77, 57, 0)" />
            <stop offset="30%" stopColor="rgba(58, 77, 57, 0.22)" />
            <stop offset="60%" stopColor="rgba(58, 77, 57, 0.55)" />
            <stop offset="88%" stopColor="rgba(58, 77, 57, 0.88)" />
            <stop offset="100%" stopColor="rgba(46, 59, 47, 0.96)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bottomGradient)" filter="url(#heroBlurBottom)" />
      </svg>

      {/* Play/Pause Button - Bottom Right */}
      <button 
        ref={playButtonRef}
        onClick={togglePlayPause}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-30 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 flex items-center justify-center shadow-lg cursor-pointer"
        style={{ pointerEvents: 'auto' }}
      >
        {isPlaying ? (
          <Pause size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-burgundy-wine" fill="#3A4D39" />
        ) : (
          <Play size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-burgundy-wine ml-1" fill="#3A4D39" />
        )}
      </button>

      {/* Couple names — bottom (extra bottom padding for play control) */}
      <div className="absolute bottom-0 left-0 right-0 pb-10 sm:pb-12 md:pb-14 lg:pb-16 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <div>
              <p ref={groomFirstNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight" style={{ color: '#F4F1EC', textShadow: '0 1px 3px rgba(0,0,0,0.4), 0 0 20px rgba(46,59,47,0.35)' }}>
                {couple.groom.firstName}
              </p>
              <p ref={groomLastNameRef} className="font-ballet text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight -mt-2 sm:-mt-3" style={{ color: '#C2A878', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                {couple.groom.lastName}
              </p>
            </div>
            <p ref={andRef} className="caudex-bold text-sm sm:text-base md:text-lg lg:text-xl uppercase leading-tight my-2 sm:my-3" style={{ color: '#C2A878' }}>
              AND
            </p>
            <div>
              <p ref={brideFirstNameRef} className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight" style={{ color: '#F4F1EC', textShadow: '0 1px 3px rgba(0,0,0,0.4), 0 0 20px rgba(46,59,47,0.35)' }}>
                {couple.bride.firstName}
              </p>
              <p ref={brideLastNameRef} className="font-ballet text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight -mt-2 sm:-mt-3" style={{ color: '#C2A878', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                {couple.bride.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
