import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couple } from '../data'
import {
  SHOW_PRENUP_IMAGES,
  NON_PRENUP_SHARE_IMAGE,
} from '../config/prenupPlaceholder'
import { prenupUrl, PRENUP_OG_FILE, PRENUP_HERO_FILE } from '../config/prenupPhotos'

const OG_IMAGE_PATH = SHOW_PRENUP_IMAGES
  ? prenupUrl(PRENUP_OG_FILE)
  : NON_PRENUP_SHARE_IMAGE
const FAVICON_PATH = SHOW_PRENUP_IMAGES
  ? prenupUrl(PRENUP_HERO_FILE)
  : NON_PRENUP_SHARE_IMAGE

const DynamicTitle = () => {
  const weddingDate = new Date(couple.wedding.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const ogImageAbsolute = origin ? `${origin}${OG_IMAGE_PATH}` : OG_IMAGE_PATH
  const pageUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : ''

  const title = `${couple.nickname}'s Wedding - ${weddingDate}`
  const description = `Join us for ${couple.nickname}'s wedding on ${weddingDate}.`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type={SHOW_PRENUP_IMAGES ? 'image/jpeg' : 'image/png'} href={FAVICON_PATH} />
      <link rel="apple-touch-icon" href={FAVICON_PATH} />

      <meta property="og:type" content="website" />
      {pageUrl ? <meta property="og:url" content={pageUrl} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageAbsolute} />
      <meta property="og:image:secure_url" content={ogImageAbsolute} />
      <meta property="og:image:type" content={SHOW_PRENUP_IMAGES ? 'image/jpeg' : 'image/png'} />
      <meta property="og:image:alt" content={`${couple.bride.firstName} and ${couple.groom.firstName}`} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageAbsolute} />
      <meta name="twitter:image:alt" content={`${couple.bride.firstName} and ${couple.groom.firstName}`} />
    </Helmet>
  )
}

export default DynamicTitle 