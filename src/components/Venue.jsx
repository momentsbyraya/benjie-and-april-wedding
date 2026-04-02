import React, { useRef, useEffect, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { venues as venuesData } from '../data'
import SecondaryButton from './SecondaryButton'
import PrenupPlaceholder from './PrenupPlaceholder'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const venueTitleRef = useRef(null)
  const venueRef = useRef(null)
  const carouselRef = useRef(null)
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const ceremony = venuesData.ceremony
  const reception = venuesData.reception
  const useImagePlaceholder = venuesData.useImagePlaceholder === true
  const venueImageObjectPosition =
    typeof venuesData.venueImageObjectPosition === 'string'
      ? venuesData.venueImageObjectPosition
      : 'center center'

  const ceremonyPhoto = ceremony.ceremonyPhoto || '/assets/images/venues/ceremony.jpg'
  const receptionPhoto = reception.receptionPhoto

  const imageSlides = useMemo(() => {
    if (useImagePlaceholder) return []
    const fromJson = venuesData.carouselPhotos
    if (Array.isArray(fromJson) && fromJson.length > 0) {
      return fromJson.filter(Boolean)
    }
    const fallback = [ceremonyPhoto, receptionPhoto].filter(Boolean)
    return [...new Set(fallback)]
  }, [
    useImagePlaceholder,
    ceremonyPhoto,
    receptionPhoto,
    venuesData.carouselPhotos,
  ])

  const venueName = ceremony.name
  const mapsUrl =
    ceremony.directionsUrl ||
    reception.directionsUrl ||
    ceremony.googleMapsUrl ||
    reception.googleMapsUrl

  const nextImage = () => {
    if (imageSlides.length <= 1) return
    setCurrentIndex((prev) => (prev + 1) % imageSlides.length)
  }

  const prevImage = () => {
    if (imageSlides.length <= 1) return
    setCurrentIndex((prev) => (prev - 1 + imageSlides.length) % imageSlides.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    const minSwipe = 50
    if (diff > minSwipe) nextImage()
    else if (diff < -minSwipe) prevImage()
  }

  useEffect(() => {
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

    if (venueRef.current) {
      const venueContainer = venueRef.current
      const venueImage = venueContainer.querySelector('.venue-image-container')
      const venueContent = venueContainer.querySelector('.venue-details-single')
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
            gsap.to(venueImage, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
          }
          if (venueContent) {
            gsap.to(venueContent, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 })
          }
        }
      })
    }

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

  const showArrows = !useImagePlaceholder && imageSlides.length > 1

  return (
    <>
      <div ref={venueTitleRef}>
        <h3 className="relative inline-block px-6 venue-title text-center w-full">
          <span
            className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none capitalize venue-title-text"
          >
            WHERE TO GO
          </span>
        </h3>
      </div>

      <div ref={venueRef} className="relative overflow-visible">
        <div className="relative overflow-hidden">
          <div className="text-center transition-opacity duration-500 ease-in-out">
            <div className="flex flex-col gap-6 md:gap-8 items-center">
              <div className="w-full flex justify-center items-center gap-2 md:gap-4">
                {showArrows ? (
                  <button
                    type="button"
                    onClick={prevImage}
                    className="flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-burgundy-wine" />
                  </button>
                ) : (
                  <div className="w-8 md:w-10 flex-shrink-0" aria-hidden />
                )}

                <div
                  className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[380px] aspect-square relative venue-image-container overflow-hidden rounded-full"
                  onTouchStart={useImagePlaceholder ? undefined : handleTouchStart}
                  onTouchEnd={useImagePlaceholder ? undefined : handleTouchEnd}
                >
                  {useImagePlaceholder ? (
                    <PrenupPlaceholder className="h-full w-full min-h-0 rounded-full text-[9px] sm:text-xs" />
                  ) : (
                    <>
                      <div
                        ref={carouselRef}
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                      >
                        {imageSlides.map((src, index) => (
                          <div
                            key={`${src}-${index}`}
                            className="min-w-full aspect-square flex-shrink-0"
                          >
                            <img
                              src={src}
                              alt={`${venueName} — photo ${index + 1}`}
                              className="w-full h-full object-cover rounded-full"
                              style={{ objectPosition: venueImageObjectPosition }}
                            />
                          </div>
                        ))}
                      </div>
                      {showArrows && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {imageSlides.map((_, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setCurrentIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                index === currentIndex ? 'bg-burgundy-wine w-6' : 'bg-white/60'
                              }`}
                              aria-label={`Photo ${index + 1} of ${imageSlides.length}`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {showArrows ? (
                  <button
                    type="button"
                    onClick={nextImage}
                    className="flex items-center justify-center transition-opacity duration-200 z-10 flex-shrink-0 hover:opacity-70"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-burgundy-wine" />
                  </button>
                ) : (
                  <div className="w-8 md:w-10 flex-shrink-0" aria-hidden />
                )}
              </div>

              <div className="venue-details-single w-full flex flex-col gap-4 px-2 max-w-lg mx-auto">
                <div className="text-lg sm:text-xl md:text-2xl font-boska text-burgundy-dark text-center">
                  {venueName}
                </div>
                <div className="text-sm sm:text-base font-albert font-thin text-burgundy-dark text-center space-y-1">
                  <p>Ceremony: {ceremony.time}</p>
                  <p>Reception: {reception.time}</p>
                </div>
                {mapsUrl && (
                  <div className="flex justify-center">
                    <SecondaryButton
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={ArrowRight}
                    >
                      Get Direction
                    </SecondaryButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Venue
