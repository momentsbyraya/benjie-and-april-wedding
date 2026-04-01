/**
 * Prenup photos live under /assets/images/prenup/.
 * Set SHOW_PRENUP_IMAGES to true when final photos are ready to ship.
 */
export const SHOW_PRENUP_IMAGES = true

export const PRENUP_PLACEHOLDER_TEXT = 'TO BE ADDED'

/** Fallback for favicon / social preview when prenup images are hidden */
export const NON_PRENUP_SHARE_IMAGE = '/assets/images/graphics/heart.png'

export function isPrenupAssetUrl(url) {
  return typeof url === 'string' && url.includes('/images/prenup/')
}

export function shouldUsePrenupPlaceholder(src) {
  return !SHOW_PRENUP_IMAGES && isPrenupAssetUrl(src)
}
