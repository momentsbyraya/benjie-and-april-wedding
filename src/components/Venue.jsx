import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueRef = useRef(null)
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception
  // Since both ceremony and reception are at the same venue, use ceremony data
  const venue = ceremony

  const venueImages = [
    { src: '/assets/images/venues/ceremony.JPG', alt: 'Ceremony Venue', label: 'Ceremony' },
    { src: '/assets/images/venues/reception.JPG', alt: 'Reception Venue', label: 'Reception' }
  ]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % venueImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + venueImages.length) % venueImages.length)
  }

  useEffect(() => {
    // Venue Title animation
    if (venueTitleRef.current) {
      ScrollTrigger.create({
        trigger: venueTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(venueTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Venue animation - animate image and content separately
    if (venueRef.current) {
      const venueContainer = venueRef.current
      const flexContainer = venueContainer.querySelector('.flex')
      if (flexContainer) {
        const venueImage = flexContainer.querySelector('.venue-image-container')
        const venueContent = Array.from(flexContainer.children).find(child => 
          (child.classList.contains('w-full') || child.classList.contains('md:w-1/2')) && child.querySelector('.font-boska')
        )
        
        if (venueImage) {
          gsap.set(venueImage, { opacity: 0, x: -30 })
        }
        if (venueContent) {
          gsap.set(venueContent, { opacity: 0, x: 30 })
        }
        
        ScrollTrigger.create({
          trigger: venueRef.current,
          start: "top 75%",
          onEnter: () => {
            if (venueImage) {
              gsap.to(venueImage, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (venueContent) {
              gsap.to(venueContent, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === venueTitleRef.current ||
          trigger.vars.trigger === venueRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      {/* Venue Title */}
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span 
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize venue-title-text"
          >
            WHERE TO GO
          </span>
        </h3>
      </div>

      {/* Venue Container */}
      <div className="relative overflow-visible">
        <div className="relative overflow-hidden">
          <div 
            ref={venueRef} 
            className="text-center transition-opacity duration-500 ease-in-out"
          >
            {/* Venue Image and Details - Stacked on all screen sizes */}
            <div className="flex flex-col gap-6 md:gap-8 items-center md:items-center">
              {/* Venue Images - Carousel on mobile, both images on 768px+ */}
              <div className="w-full flex justify-center items-center gap-2">
                {/* Carousel Navigation Buttons - Outside on mobile */}
                <button
                  onClick={prevImage}
                  className="md:hidden flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8 text-[#CC5500]" />
                </button>
                
                {/* Mobile Carousel (< 768px) */}
                <div className="md:hidden w-full max-w-[220px] sm:max-w-[240px] aspect-square relative venue-image-container overflow-hidden">
                  <div 
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {venueImages.map((image, index) => (
                      <div key={index} className="min-w-full aspect-square">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Carousel Indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {venueImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentIndex ? 'bg-[#CC5500] w-6' : 'bg-white/60'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Next Button - Outside on mobile */}
                <button
                  onClick={nextImage}
                  className="md:hidden flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8 text-[#CC5500]" />
                </button>

                {/* Desktop View - Both Images Side by Side (>= 768px) - Same container as original */}
                <div className="hidden md:flex gap-4 w-full max-w-[320px] lg:max-w-[380px] xl:max-w-[420px] justify-center">
                  {venueImages.map((image, index) => (
                    <div key={index} className="w-full aspect-square relative venue-image-container flex-shrink-0" style={{ width: 'calc(50% - 8px)' }}>
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Venue Details */}
              <div className="w-full flex flex-col justify-between text-center">
                {/* Venue Name and Location Container */}
                <div>
                  {/* Venue Name */}
                  <div className="text-lg sm:text-xl md:text-2xl font-boska text-[#333333] mb-2 text-center">
                    {venue.name}
                  </div>
                  
                  {/* Address */}
                  <p className="text-sm sm:text-base font-albert font-thin text-[#333333] mb-2 text-center">
                    {venue.address && `${venue.address}, `}
                    {venue.city}
                    {venue.state && `, ${venue.state}`}
                    {venue.zip && `, ${venue.zip}`}
                  </p>

                  {/* Schedule Times */}
                  <div className="text-sm sm:text-base font-albert font-thin text-[#333333] mb-4 text-center space-y-1">
                    <p>Ceremony: {ceremony.time}</p>
                    <p>Reception: {reception.time} onwards</p>
                  </div>
                </div>

                {/* Google Maps Link Button */}
                <div className="flex justify-center items-center">
                  <SecondaryButton
                    href={venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={ArrowRight}
                  >
                    Get Direction
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue
