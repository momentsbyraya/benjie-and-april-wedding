import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import './pages/Details.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const GiftRegistry = () => {
  const giftRegistryRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  const instaPayQr = {
    src: '/assets/images/qr/image.png',
    alt: 'InstaPay QR code — scan with your bank app to send a gift',
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  useEffect(() => {
    // Gift Registry animation
    if (giftRegistryRef.current) {
      ScrollTrigger.create({
        trigger: giftRegistryRef.current,
        start: "top 80%",
        animation: gsap.fromTo(giftRegistryRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === giftRegistryRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      {/* Gift Registry Section */}
      <div
        id="gifts"
        className="relative gift-registry-section mb-24 sm:mb-32 md:mb-40 lg:mb-48"
      >
        <div ref={giftRegistryRef} className="text-center relative z-10">
          {/* Single Flower 2 Image */}
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/graphics/single-flower-2.png" 
              alt="Flower decoration" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
          <h3 className="relative inline-block px-6 py-3">
            <span 
              className="font-foglihten text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none gift-registry-title-text"
              style={{ fontStyle: 'italic' }}
            >
              A notes on gifts...
            </span>
          </h3>
          <div className="w-full max-w-3xl mx-auto mb-4">
            <div className="w-full h-px bg-burgundy-tan opacity-40"></div>
          </div>
          <p className="text-base sm:text-lg font-albert font-thin text-burgundy-dark max-w-3xl mx-auto leading-relaxed text-center mb-6">
            Your presence is the greatest gift. If you wish to honor us, we would be grateful for a <strong>monetary gift</strong> to help us start our new life together.
          </p>

          <div className="flex flex-col items-center gap-3 mb-8 sm:mb-10">
            <button
              type="button"
              onClick={() => handleImageClick(instaPayQr)}
              className="rounded-2xl border border-burgundy-tan/50 bg-white p-3 sm:p-4 shadow-sm transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-wine/40"
              aria-label="Open InstaPay QR code full screen"
            >
              <img
                src={instaPayQr.src}
                alt={instaPayQr.alt}
                className="mx-auto block h-44 w-44 sm:h-52 sm:w-52 object-contain"
                decoding="async"
              />
            </button>
            <p className="text-sm sm:text-base font-albert font-thin text-burgundy-dark/90 text-center max-w-sm">
              Scan with your bank app via <span className="font-normal">InstaPay</span>
            </p>
          </div>
        </div>
      </div>

      {/* Image Full Screen Modal */}
      {selectedImage && createPortal(
        <div 
          ref={modalRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeImageModal}
          />
          
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image Container */}
          <div
            ref={contentRef}
            className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            <img 
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry
