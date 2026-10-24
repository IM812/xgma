import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Condensed } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileActionBar } from '@/components/mobile-action-bar'
import { JsonLd } from '@/components/json-ld'
import { YandexMetrika } from '@/components/yandex-metrika'
import { isIndexable, organizationLd, siteUrl, websiteLd } from '@/lib/seo'
import { site } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-roboto-condensed',
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — официальное представительство заводов XGMA в России`,
    template: `%s | ${site.name}`,
  },
  description:
    'Официальное представительство заводов XGMA в России: погрузчики, экскаваторы, дорожная техника. Поставка, сервис, оригинальные запчасти и лизинг.',
  metadataBase: new URL(siteUrl),
  applicationName: site.name,
  icons: { icon: '/brand/xgma-logo.png', apple: '/brand/xgma-logo.png' },
  openGraph: { type: 'website', locale: 'ru_RU', siteName: site.name, images: [{ url: '/photos/loaders-lineup.jpg' }] },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: true, email: true, address: false },
  robots: isIndexable ? { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } : { index: false, follow: false },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
}

const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) || null

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${robotoCondensed.variable} bg-background`}>
      <body className="font-sans antialiased">
        <JsonLd data={[organizationLd, websiteLd]} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileActionBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && isIndexable && metrikaId && <YandexMetrika id={metrikaId} />}
      </body>
    </html>
  )
}
