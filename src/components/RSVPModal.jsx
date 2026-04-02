import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ExternalLink, X } from 'lucide-react'
import { shouldUsePrenupPlaceholder } from '../config/prenupPlaceholder'
import { prenupUrl, PRENUP_RSVP_MODAL_FILE } from '../config/prenupPhotos'
import { couple } from '../data'
import PrenupPlaceholder from './PrenupPlaceholder'
import SecondaryButton from './SecondaryButton'

const RSVP_MODAL_BG = prenupUrl(PRENUP_RSVP_MODAL_FILE)

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const rsvpFormUrl = couple.rsvpFormUrl || ''
  const rsvpEmbedUrl = couple.rsvpGoogleFormEmbedUrl || ''

  useEffect(() => {
    if (!isOpen) setIframeLoaded(false)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(contentRef.current, { opacity: 0, y: 24 })

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
    gsap
      .to(contentRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.25,
        ease: 'power2.out',
      })
      .then(() => {
        onClose()
      })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  const modalBgPlaceholder = shouldUsePrenupPlaceholder(RSVP_MODAL_BG)

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex flex-col m-0 p-0"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0 cursor-pointer overflow-hidden"
        onClick={handleOverlayClick}
        aria-hidden
      >
        {modalBgPlaceholder ? (
          <PrenupPlaceholder className="absolute inset-0 h-full w-full scale-105 opacity-70" aria-hidden />
        ) : (
          <div
            className="absolute inset-0 bg-cover pointer-events-none"
            style={{
              backgroundImage: `url(${RSVP_MODAL_BG})`,
              backgroundPosition: 'center 32%',
              filter: 'blur(14px)',
              transform: 'scale(1.12)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col flex-1 min-h-0 w-full min-w-0 max-h-[100dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 border-b border-white/20 bg-white/85 backdrop-blur-md">
          <h2 className="text-xl sm:text-2xl font-leckerli font-light text-burgundy-dark">
            RSVP
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 text-burgundy-dark hover:bg-burgundy-dark/10 rounded-full transition-colors duration-200"
            aria-label="Close RSVP form"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex flex-1 min-h-0 flex-col bg-white/95 backdrop-blur-sm">
          {rsvpEmbedUrl ? (
            <div className="relative flex-1 min-h-0 w-full">
              {!iframeLoaded && (
                <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 bg-white/90 px-4">
                  <p className="text-center font-albert text-sm text-burgundy-dark/80">
                    Loading RSVP form…
                  </p>
                  {rsvpFormUrl && (
                    <SecondaryButton
                      href={rsvpFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={ExternalLink}
                      className="!no-underline rounded-full border border-burgundy-tan/60 px-4 py-2 hover:bg-burgundy-dark/5"
                    >
                      Open in new tab
                    </SecondaryButton>
                  )}
                </div>
              )}
              <iframe
                title="RSVP — Google Form"
                src={rsvpEmbedUrl}
                className="absolute inset-0 h-full w-full border-0 rsvp-modal-content"
                onLoad={() => setIframeLoaded(true)}
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12">
              <p className="text-center font-albert text-burgundy-dark">
                RSVP form opens in a new tab.
              </p>
              {rsvpFormUrl && (
                <SecondaryButton
                  href={rsvpFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={ExternalLink}
                  className="!no-underline rounded-full border border-burgundy-tan/60 px-4 py-2 hover:bg-burgundy-dark/5"
                >
                  Open RSVP form
                </SecondaryButton>
              )}
            </div>
          )}

          {rsvpFormUrl && rsvpEmbedUrl && (
            <footer className="shrink-0 border-t border-burgundy-tan/30 bg-white/95 px-4 py-3 sm:px-6 sm:py-4">
              <p className="mb-2 text-center font-albert text-xs text-burgundy-dark/70">
                Form not showing or stuck loading? Open it in a new tab instead.
              </p>
              <div className="flex justify-center">
                <SecondaryButton
                  href={rsvpFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={ExternalLink}
                  className="!no-underline rounded-full border border-burgundy-tan/60 px-4 py-2.5 font-albert hover:bg-burgundy-dark/5"
                >
                  Open RSVP form in new tab
                </SecondaryButton>
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal
