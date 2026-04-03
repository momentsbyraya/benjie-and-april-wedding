import React, { createContext, useContext, useRef, useState, useEffect } from 'react'
import { audio } from '../data'

const AudioContext = createContext(null)

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Initialize audio - handle special characters in filename
    // Create a proper URL that handles emoji and special characters
    try {
      // Use URL constructor to properly handle special characters
      const baseUrl = window.location.origin
      const audioPath = audio.background.startsWith('/') ? audio.background : '/' + audio.background
      const audioUrl = new URL(audioPath, baseUrl).href
      audioRef.current = new Audio(audioUrl)
    } catch (error) {
      // Fallback to direct path if URL constructor fails
      console.warn('Failed to create URL for audio, using direct path:', error)
      audioRef.current = new Audio(audio.background)
    }
    const loopStart = typeof audio.loopStart === 'number' ? audio.loopStart : 0
    const loopEnd = typeof audio.loopEnd === 'number' ? audio.loopEnd : null
    const useSegmentLoop = loopEnd != null

    // Full-track repeat: native loop. Segment repeat: loop=false + timeupdate seek.
    audioRef.current.loop = !useSegmentLoop && audio.loop === true
    audioRef.current.volume = audio.volume

    const handleTimeUpdate = () => {
      if (!audioRef.current || !useSegmentLoop) return

      if (audioRef.current.currentTime >= loopEnd) {
        audioRef.current.currentTime = loopStart
        if (!audioRef.current.paused) {
          audioRef.current.play().catch(() => {})
        }
      }
    }
    
    // Update playing state
    audioRef.current.addEventListener('play', () => setIsPlaying(true))
    audioRef.current.addEventListener('pause', () => setIsPlaying(false))
    audioRef.current.addEventListener('ended', () => setIsPlaying(false))
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
    
    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const play = async () => {
    if (audioRef.current) {
      try {
        const loopStart = typeof audio.loopStart === 'number' ? audio.loopStart : 0
        audioRef.current.currentTime = loopStart
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.log('Could not play music:', error)
      }
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const value = {
    audioRef,
    isPlaying,
    play,
    pause
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

