/**
 * Exactly 13 prenup photos. Single source of truth for paths + object-position
 * (faces stay visible under object-cover / background-size: cover).
 *
 * URLs use /assets/images/prenup/... — in dev, vite rewrites `/assets/images/*` and
 * `/assets/fonts/*` to `/images/*` and `/fonts/*` (publicDir is the repo `assets` folder).
 */
export const PRENUP_DIR = '/assets/images/prenup'

export const prenupUrl = (filename) => `${PRENUP_DIR}/${filename}`

/** @typedef {{ file: string, objectPosition: string, galleryObjectPosition?: string }} PrenupSpec */

export const PRENUP_SPECS = [
  {
    file: 'MIC08696.jpg',
    objectPosition: 'center 18%',
    galleryObjectPosition: 'center 14%',
  },
  {
    file: 'MIC08761.jpg',
    objectPosition: 'center 32%',
    galleryObjectPosition: 'center 26%',
  },
  {
    file: 'MIC08826.jpg',
    objectPosition: 'center 36%',
    galleryObjectPosition: 'center 27%',
  },
  {
    file: 'MIC08858.jpg',
    objectPosition: 'center 30%',
    galleryObjectPosition: 'center 23%',
  },
  {
    file: 'MIC08994.jpg',
    objectPosition: 'center 28%',
    galleryObjectPosition: 'center 20%',
  },
  {
    file: 'MIC08997.jpg',
    objectPosition: 'center 28%',
    galleryObjectPosition: 'center 21%',
  },
  {
    file: 'MIC09065.jpg',
    objectPosition: 'center 22%',
    galleryObjectPosition: '52% 15%',
  },
  {
    file: 'MIC09069.jpg',
    objectPosition: 'center 24%',
    galleryObjectPosition: '50% 16%',
  },
  {
    file: 'MIC09098.jpg',
    objectPosition: 'center 28%',
    galleryObjectPosition: 'center 24%',
  },
  {
    file: 'MIC09113.jpg',
    objectPosition: 'center 30%',
    galleryObjectPosition: 'center 25%',
  },
  {
    file: 'MIC09124.jpg',
    objectPosition: 'center 28%',
    galleryObjectPosition: 'center 21%',
  },
  {
    file: 'MIC09175.jpg',
    objectPosition: 'center 25%',
    galleryObjectPosition: 'center 19%',
  },
  {
    file: 'MIC09191.jpg',
    objectPosition: 'center 32%',
    galleryObjectPosition: 'center 25%',
  },
]

export const GALLERY_ITEMS = PRENUP_SPECS.map((s) => ({
  src: prenupUrl(s.file),
  objectPosition: s.galleryObjectPosition ?? s.objectPosition,
}))

/** 3-column masonry spans for exactly 13 cells (full, 1+2, 2+1, …). */
export const GALLERY_GRID_SPANS = [
  'span 3',
  'span 1',
  'span 2',
  'span 2',
  'span 1',
  'span 3',
  'span 1',
  'span 2',
  'span 2',
  'span 1',
  'span 3',
  'span 1',
  'span 2',
]

/** Moments subpage: one featured + 12-tile grid (remaining photos). */
export const MOMENTS_GRID_SPANS = [
  'span 3',
  'span 1',
  'span 2',
  'span 2',
  'span 1',
  'span 3',
  'span 1',
  'span 2',
  'span 2',
  'span 1',
  'span 1',
  'span 2',
]

export const MOMENTS_BANNER = {
  src: prenupUrl(PRENUP_SPECS[8].file),
  objectPosition: PRENUP_SPECS[8].objectPosition,
}

/** Hero + section backgrounds (indices into PRENUP_SPECS). */
export const PRENUP_HERO_FILE = PRENUP_SPECS[11].file
export const PRENUP_SAVE_THE_DATE_FILE = PRENUP_SPECS[4].file
export const PRENUP_RSVP_SECTION_FILE = PRENUP_SPECS[9].file
export const PRENUP_RSVP_MODAL_FILE = PRENUP_SPECS[12].file
export const PRENUP_OG_FILE = PRENUP_SPECS[10].file

/** Love Story polaroids: four distinct shots from the set. */
export const LOVE_STORY_POLAROID_SPECS = [
  PRENUP_SPECS[4],
  PRENUP_SPECS[5],
  PRENUP_SPECS[12],
  PRENUP_SPECS[3],
].map((s) => ({
  src: prenupUrl(s.file),
  objectPosition: s.objectPosition,
}))

/** Default stacked polaroids (PhotoSection). */
export const PHOTO_SECTION_DEFAULTS = [
  {
    src: prenupUrl(PRENUP_SPECS[4].file),
    alt: 'Photo 1',
    label: 'Memories',
    backgroundPosition: PRENUP_SPECS[4].objectPosition,
  },
  {
    src: prenupUrl(PRENUP_SPECS[10].file),
    alt: 'Photo 2',
    label: 'Together',
    backgroundPosition: PRENUP_SPECS[10].objectPosition,
  },
  {
    src: prenupUrl(PRENUP_SPECS[2].file),
    alt: 'Photo 3',
    label: 'Love',
    backgroundPosition: PRENUP_SPECS[2].objectPosition,
  },
]
