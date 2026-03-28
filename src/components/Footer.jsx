import React from 'react'
import { themeConfig } from '../config/themeConfig'

const Footer = () => {
  const handleFooterClick = () => {
    window.open('https://www.facebook.com/profile.php?id=61571540978411', '_blank', 'noopener,noreferrer')
  }

  return (
    <footer 
      className="w-full pb-4 transition-colors duration-300 hover:bg-[#2E3B2F]/90 active:bg-[#2E3B2F]/90 cursor-pointer"
      onClick={handleFooterClick}
    >
      {/* Divider line on top */}
      <div className="w-full h-px bg-burgundy-dark opacity-40 mb-4"></div>
      
      {/* Footer text */}
      <div className="text-center">
        <p className="text-sm sm:text-base font-albert font-thin transition-colors duration-300 hover:!text-[#F4F1EC] active:!text-[#F4F1EC]" style={{ color: themeConfig.cssVariables['--accent-text'] }}>
          Made with <ion-icon name="heart" className="inline-block mx-1 align-middle" style={{ fontSize: '1em', verticalAlign: 'middle' }}></ion-icon> by Moments by Raya
        </p>
      </div>
    </footer>
  )
}

export default Footer

