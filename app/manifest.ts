import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — официальное представительство XGMA в России`,
    short_name: 'XGMA Рус',
    description: site.tagline,
    lang: 'ru',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [{ src: '/brand/xgma-logo.png', sizes: 'any', type: 'image/png' }],
  }
}
