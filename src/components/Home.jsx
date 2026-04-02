import React from 'react'
import Hero from './Hero'
import Venue from './Venue'
import Schedule from './Schedule'
import EntourageSection from './EntourageSection'
import RSVPSection from './RSVPSection'
import LoveStory from './LoveStory'
import Gallery from './Gallery'
import GiftRegistry from './GiftRegistry'
import DressCode from './DressCode'
import FAQ from './FAQ'
import SaveTheDateCounter from './SaveTheDateCounter'
import FullBleedPhoto from './FullBleedPhoto'
import FullBleedPhotoSplit from './FullBleedPhotoSplit'
import { prenupUrl, PRENUP_SPECS } from '../config/prenupPhotos'
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
        src={prenupUrl(PRENUP_SPECS[0].file)}
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
        leftSrc={prenupUrl(PRENUP_SPECS[8].file)}
        rightSrc={prenupUrl(PRENUP_SPECS[1].file)}
        leftAlt="Benjie and April"
        rightAlt="Benjie and April"
        leftObjectPosition={PRENUP_SPECS[8].objectPosition}
        rightObjectPosition={PRENUP_SPECS[1].objectPosition}
      />

      {/* Entourage Section - between Order of Events and Dress Code */}
      <EntourageSection />

      <FullBleedPhotoSplit
        invertLayout
        leftSrc={prenupUrl(PRENUP_SPECS[3].file)}
        rightSrc={prenupUrl(PRENUP_SPECS[4].file)}
        leftAlt="Benjie and April"
        rightAlt="Benjie and April"
        leftObjectPosition={PRENUP_SPECS[3].objectPosition}
        rightObjectPosition={PRENUP_SPECS[4].objectPosition}
      />

      <div className="relative z-20 flex items-center justify-center pt-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          <DressCode />
        </div>
      </div>

      <FullBleedPhoto
        src={prenupUrl(PRENUP_SPECS[10].file)}
        alt="Benjie and April"
      />

      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          <RSVPSection onOpenRSVP={onOpenRSVP} />
        </div>
      </div>

      <FullBleedPhotoSplit
        leftSrc={prenupUrl(PRENUP_SPECS[11].file)}
        rightSrc={prenupUrl(PRENUP_SPECS[2].file)}
        leftAlt="Benjie and April"
        rightAlt="Benjie and April"
        leftObjectPosition={PRENUP_SPECS[11].objectPosition}
        rightObjectPosition={PRENUP_SPECS[2].objectPosition}
      />

      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto">
          <LoveStory />

          {/* Gallery — masonry-style grid + lightbox */}
          <Gallery />

          <GiftRegistry />
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
