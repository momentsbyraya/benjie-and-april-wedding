import React from 'react'
import Hero from './Hero'
import Venue from './Venue'
import Schedule from './Schedule'
import EntourageSection from './EntourageSection'
import RSVPSection from './RSVPSection'
import LoveStory from './LoveStory'
import Gallery from './Gallery'
import DressCode from './DressCode'
import FAQ from './FAQ'
import SaveTheDateCounter from './SaveTheDateCounter'
import FullBleedPhoto from './FullBleedPhoto'
import FullBleedPhotoSplit from './FullBleedPhotoSplit'
import './pages/Details.css'

const Home = ({ onOpenRSVP }) => {
  return (
    <div className="relative w-full bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Flower Banner - Top */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/flower-banner-2.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Venue Section */}
          <Venue />
        </div>
      </div>

      {/* Flower Banner - Bottom */}
      <div className="relative" style={{ width: '100vw' }}>
        <img 
          src="/assets/images/graphics/flower-banner-2.png" 
          alt="Flower banner"
          className="w-full h-auto object-contain"
          style={{ transform: 'scaleY(-1)' }}
        />
      </div>

      <FullBleedPhoto
        src="/assets/images/prenup/JGM04266.jpg"
        alt="Benjie and April"
      />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          {/* Schedule Section */}
          <Schedule />
        </div>
      </div>

      <FullBleedPhotoSplit
        leftSrc="/assets/images/prenup/JGM04170.jpg"
        rightSrc="/assets/images/prenup/JGM03897.jpg"
        leftAlt="Benjie and April"
        rightAlt="Benjie and April"
      />

      {/* Entourage Section - between Order of Events and Dress Code */}
      <EntourageSection />

      <FullBleedPhotoSplit
        invertLayout
        leftSrc="/assets/images/prenup/prenup5.jpg"
        rightSrc="/assets/images/prenup/JGM04213.jpg"
        leftAlt="Benjie and April"
        rightAlt="Benjie and April"
      />

      <div className="relative z-20 flex items-center justify-center pt-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          <DressCode />
        </div>
      </div>

      <FullBleedPhoto
        src="/assets/images/prenup/DSC01046.jpg"
        alt="Benjie and April"
      />

      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          <RSVPSection onOpenRSVP={onOpenRSVP} />
        </div>
      </div>

      <FullBleedPhotoSplit
        leftSrc="/assets/images/prenup/prenup2.jpg"
        rightSrc="/assets/images/prenup/JGM04077.jpg"
        leftAlt="Benjie and April"
        rightAlt="Benjie and April"
      />

      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          <LoveStory />

          {/* Gallery — masonry-style grid + lightbox */}
          <Gallery />
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Save The Date Counter Section */}
      <SaveTheDateCounter />
    </div>
  )
}

export default Home
