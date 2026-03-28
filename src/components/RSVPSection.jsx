import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail } from 'lucide-react'
import { couple } from '../data'
import { themeConfig } from '../config/themeConfig'
import { shouldUsePrenupPlaceholder } from '../config/prenupPlaceholder'
import PrenupPlaceholder from './PrenupPlaceholder'

const RSVP_SECTION_BG = '/assets/images/prenup/prenup3.jpg'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const RSVPSection = ({ onOpenRSVP }) => {
  const rsvpSectionRef = useRef(null)
  const rsvpTitleRef = useRef(null)
  const rsvpContentRef = useRef(null)

  useEffect(() => {
    // RSVP Section animation
    if (rsvpSectionRef.current) {
      ScrollTrigger.create({
        trigger: rsvpSectionRef.current,
        start: "top 80%",
        animation: gsap.fromTo(rsvpSectionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Title animation
    if (rsvpTitleRef.current) {
      ScrollTrigger.create({
        trigger: rsvpTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(rsvpTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Content animation
    if (rsvpContentRef.current) {
      ScrollTrigger.create({
        trigger: rsvpContentRef.current,
        start: "top 80%",
        animation: gsap.fromTo(rsvpContentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === rsvpSectionRef.current ||
          trigger.vars.trigger === rsvpTitleRef.current ||
          trigger.vars.trigger === rsvpContentRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  const rsvpBgPlaceholder = shouldUsePrenupPlaceholder(RSVP_SECTION_BG)

  return (
    <div
      ref={rsvpSectionRef}
      className="relative px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={
          rsvpBgPlaceholder
            ? { backgroundColor: '#dfe5da', opacity: 0.95 }
            : {
                backgroundImage: `url(${RSVP_SECTION_BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.8,
              }
        }
        aria-hidden
      />
      {rsvpBgPlaceholder && (
        <PrenupPlaceholder className="pointer-events-none absolute inset-0 z-0 opacity-40" aria-hidden />
      )}
      <div className="relative z-10 flex items-center justify-center py-16 sm:py-20 md:py-24">
        <div className="bg-white/50 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-11 lg:px-7 lg:py-10 xl:px-6 xl:py-9 max-w-3xl md:max-w-2xl lg:max-w-xl xl:max-w-lg mx-auto w-full">
      <div className="text-center mb-12 sm:mb-16">
            {/* Single Flower 3 Image */}
        <div className="flex justify-center mb-4">
          <img 
                src="/assets/images/graphics/single-flower-3.png" 
            alt="Flower decoration" 
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <h3 ref={rsvpTitleRef} className="relative inline-block px-6 py-3">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none"
            style={{ fontStyle: 'italic', color: themeConfig.text.burntOrange }}
          >
            RSVP
          </span>
        </h3>
        <div className="w-full max-w-3xl mx-auto mb-4">
          <div className="w-full h-px bg-burgundy-tan opacity-40"></div>
        </div>
        <div ref={rsvpContentRef}>
          <p className="text-sm sm:text-base font-albert font-thin text-[#2E3B2F] max-w-3xl mx-auto leading-relaxed text-center mb-6">
                Kindly respond on or before<br /><strong className="!font-bold" style={{ fontWeight: 700 }}>{couple.rsvpDeadline ? `${couple.rsvpDeadline.month} ${couple.rsvpDeadline.day}, ${couple.rsvpDeadline.year}` : 'April 17, 2026'}</strong>.<br />
                After this date, arrangements are final.
          </p>
          {onOpenRSVP && (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={onOpenRSVP}
                className="px-6 py-3 bg-burgundy-dark text-[#F4F1EC] rounded-full hover:bg-burgundy-wine transition-colors duration-200 font-albert flex items-center gap-2"
              >
                Respond
                <Mail size={18} />
              </button>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RSVPSection
