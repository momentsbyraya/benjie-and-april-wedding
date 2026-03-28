import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getTimeUntilWedding } from '../utils/countdown'
import { themeConfig } from '../config/themeConfig'
import { couple } from '../data'
import './pages/Details.css'
import { shouldUsePrenupPlaceholder } from '../config/prenupPlaceholder'
import PrenupPlaceholder from './PrenupPlaceholder'

const SAVE_THE_DATE_BG = '/assets/images/prenup/prenup11.jpg'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const SaveTheDateCounter = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const countdownRef = useRef(null)

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Scroll-triggered animations
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    // Don't animate countdown numbers with ScrollTrigger - reversing would hide them again
    if (countdownRef.current) {
      const els = countdownRef.current.querySelectorAll('.countdown-number')
      if (els.length) {
        gsap.set(els, { opacity: 1, y: 0 })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const formatDate = () => {
    const { month, day, year } = couple.wedding
    return `${month} ${day}, ${year}`
  }

  const bgIsPlaceholder = shouldUsePrenupPlaceholder(SAVE_THE_DATE_BG)

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
      style={
        bgIsPlaceholder
          ? { backgroundColor: '#e8ebe4' }
          : {
              backgroundImage: `url(${SAVE_THE_DATE_BG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 35%',
              backgroundRepeat: 'no-repeat'
            }
      }
    >
      {bgIsPlaceholder && (
        <PrenupPlaceholder className="pointer-events-none absolute inset-0 z-0 min-h-full w-full opacity-90" aria-hidden />
      )}
      <div className="relative z-20 max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-between min-h-[400px] sm:min-h-[500px] md:min-h-[600px] min-[992px]:min-h-[760px]">
        {/* Title */}
        <div className="text-center">
          <h2
            ref={titleRef}
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl capitalize"
            style={{ color: themeConfig.text.burntOrange }}
          >
            Save The Date
          </h2>
        </div>

        {/* Countdown Timer */}
        <div ref={countdownRef} className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-6 px-4">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: '#2E3B2F', opacity: 1 }}>
              {countdown.days}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium" style={{ color: '#2E3B2F', opacity: 0.9 }}>Days</div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: '#2E3B2F' }}>:</div>
          
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: '#2E3B2F', opacity: 1 }}>
              {countdown.hours}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium" style={{ color: '#2E3B2F', opacity: 0.9 }}>Hours</div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: '#2E3B2F' }}>:</div>
          
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: '#2E3B2F', opacity: 1 }}>
              {countdown.minutes}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium" style={{ color: '#2E3B2F', opacity: 0.9 }}>Minutes</div>
          </div>
          
          <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: '#2E3B2F' }}>:</div>
          
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-albert font-semibold mb-1 countdown-number tabular-nums" style={{ color: '#2E3B2F', opacity: 1 }}>
              {countdown.seconds}
            </div>
            <div className="text-xs sm:text-sm font-albert font-medium" style={{ color: '#2E3B2F', opacity: 0.9 }}>Seconds</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaveTheDateCounter
