import { couple } from '../data'

// Countdown utility functions
export const getTimeUntilWedding = () => {
  // Get wedding date and time from couple data
  const dateStr = couple.wedding.date // ISO date e.g. "2026-04-25"
  const timeStr = couple.wedding.time // "3:30 PM"
  
  // Parse the date string
  const [year, month, day] = dateStr.split('-').map(Number)
  
  // Parse the time string (e.g., "3:30 PM")
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hours = 0
  let minutes = 0
  
  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10)
    minutes = parseInt(timeMatch[2], 10)
    const period = timeMatch[3].toUpperCase()
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12
    } else if (period === 'AM' && hours === 12) {
      hours = 0
    }
  }
  
  // Create date object in local timezone
  const weddingDate = new Date(year, month - 1, day, hours, minutes, 0)
  
  const now = new Date()
  const difference = weddingDate - now

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hoursRemaining = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutesRemaining = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const secondsRemaining = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days,
    hours: hoursRemaining,
    minutes: minutesRemaining,
    seconds: secondsRemaining
  }
} 