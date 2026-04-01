/**
 * Site-wide visual watermark (non-interactive, does not block clicks).
 * Set enabled: false to hide everywhere.
 */
export const WATERMARK_CONFIG = {
  enabled: true,
  /** If empty, uses couple.together from data (e.g. "Benjie & April") */
  customText: '',
  showDate: true,
  /** 'bottom-left' stays clear of back-to-home buttons on the right */
  position: 'bottom-left',
  /** Text opacity 0–1 */
  opacity: 0.16,
}
