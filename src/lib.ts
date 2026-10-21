const env = import.meta.env

export const WA = (env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
export const EMAIL: string = env.VITE_CONTACT_EMAIL || ''
export const FB: string = env.VITE_FACEBOOK_URL || ''
export const YT: string = env.VITE_YOUTUBE_URL || ''
export const SITE: string = env.VITE_SITE_URL || ''
export const FORM_ENDPOINT: string = env.VITE_FORM_ENDPOINT || ''

export const waLink = (msg: string) =>
  WA.length >= 8 ? `https://wa.me/${WA}?text=${encodeURIComponent(msg)}` : ''

export const mailLink = (subject: string, body: string) =>
  EMAIL
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : ''

export const siteUrl = (path: string) =>
  SITE ? `${SITE.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}` : path
