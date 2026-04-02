import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Footer from './components/Footer'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'
import Details from './components/pages/Details'
import Entourage from './components/pages/Entourage'
import Moments from './components/pages/Moments'
import { AudioProvider, useAudio } from './contexts/AudioContext'
import { SHOW_PRENUP_IMAGES } from './config/prenupPlaceholder'
import { prenupUrl, PRENUP_HERO_FILE, PRENUP_SAVE_THE_DATE_FILE, PRENUP_OG_FILE } from './config/prenupPhotos'
function AppContent() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { play } = useAudio()
  const navigate = useNavigate()
  const location = useLocation()

  /** Opening envelope only on home so deep links (/details, etc.) still work */
  const showOpeningEnvelope =
    !isLoading &&
    !showInvitation &&
    (location.pathname === '/' || location.pathname === '')

  // Preload critical images and resources
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const prenupCritical = SHOW_PRENUP_IMAGES
          ? [
              prenupUrl(PRENUP_HERO_FILE),
              prenupUrl(PRENUP_OG_FILE),
              prenupUrl(PRENUP_SAVE_THE_DATE_FILE),
            ]
          : []

        const criticalImages = [
          ...prenupCritical,
          '/assets/images/graphics/dusty-blue.png',
          '/assets/images/graphics/flower-1.png',
          '/assets/images/graphics/flower-3.png',
          '/assets/images/graphics/flower-4.png',
          '/assets/images/graphics/textured-bg-2.png',
          '/assets/images/graphics/bg-1.png',
        ]

        const preloadFonts = async () => {
          if (document.fonts && document.fonts.ready) {
            try {
              await document.fonts.ready
            } catch (e) {
              console.warn('Font loading error:', e)
            }
          }
        }

        const imagePromises = criticalImages.map((src) => {
          return new Promise((resolve) => {
            if (src.endsWith('.mp4')) {
              const video = document.createElement('video')
              video.preload = 'auto'
              video.oncanplaythrough = () => resolve()
              video.onerror = () => resolve()
              video.src = src
            } else {
              const img = new Image()
              img.onload = () => {
                if (img.decode) {
                  img.decode().then(() => resolve()).catch(() => resolve())
                } else {
                  resolve()
                }
              }
              img.onerror = () => {
                console.warn(`Failed to load image: ${src}`)
                resolve()
              }
              img.src = src
              setTimeout(() => resolve(), 15000)
            }
          })
        })

        const fontPromise = preloadFonts()

        const results = await Promise.allSettled([
          Promise.all(imagePromises),
          fontPromise,
        ])

        const imageResults = results[0]
        if (imageResults.status === 'fulfilled') {
          console.log('All critical images loaded')
        } else {
          console.warn('Some images failed to load:', imageResults.reason)
        }

        await new Promise((resolve) => setTimeout(resolve, 300))

        const waitForHeroVisible = () => {
          return new Promise((resolve) => {
            const checkHero = () => {
              try {
                if (
                  window.location.pathname === '/' ||
                  window.location.pathname === ''
                ) {
                  const heroSlot = document.querySelector('[data-hero-image-slot]')
                  if (heroSlot && heroSlot.tagName === 'IMG') {
                    const heroImg = heroSlot
                    if (heroImg.complete && heroImg.naturalHeight > 0) {
                      if (typeof IntersectionObserver === 'undefined') {
                        resolve()
                        return
                      }
                      const observer = new IntersectionObserver(
                        (entries) => {
                          entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                              observer.disconnect()
                              resolve()
                            }
                          })
                        },
                        { threshold: 0.1 }
                      )
                      observer.observe(heroImg)
                      setTimeout(() => {
                        observer.disconnect()
                        resolve()
                      }, 2000)
                    } else {
                      heroImg.onload = () => {
                        setTimeout(() => resolve(), 100)
                      }
                      heroImg.onerror = () => resolve()
                      setTimeout(() => resolve(), 2000)
                    }
                  } else {
                    resolve()
                  }
                } else {
                  resolve()
                }
              } catch (e) {
                console.warn('waitForHeroVisible:', e)
                resolve()
              }
            }

            if (document.readyState === 'complete') {
              checkHero()
            } else {
              window.addEventListener('load', checkHero)
              setTimeout(() => resolve(), 3000)
            }
          })
        }

        await waitForHeroVisible()
      } catch (e) {
        console.error('Preload failed:', e)
      } finally {
        setIsLoading(false)
      }
    }

    preloadImages()
  }, [])

  const handleEnvelopeOpen = async () => {
    // Start playing music when invitation is revealed (user interaction allows auto-play)
    await play()
    setShowInvitation(true)
    navigate('/')
  }

  return (
    <div className="App min-h-screen wedding-gradient">
      <DynamicTitle />
      <ScrollToTop />
      {/* Loader - shows while preloading */}
      {isLoading && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-white">
          <Loader />
        </div>
      )}
      {showOpeningEnvelope && (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      )}
      {/* Main content — mounted after loader; envelope overlays home until opened */}
      {!isLoading && (
        <>
          <Routes>
            <Route path="/" element={<Home onOpenRSVP={() => setIsRSVPModalOpen(true)} />} />
            <Route path="/details" element={<Details />} />
            <Route path="/entourage" element={<Entourage />} />
            <Route path="/moments" element={<Moments />} />
          </Routes>
          <Footer />
        </>
      )}
      <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  )
}

export default App 