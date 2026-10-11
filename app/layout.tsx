import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Condensed } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { MobileActionBar } from '@/components/mobile-action-bar'
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
    default: `${site.name} — техника XGMA: погрузчики, экскаваторы, сервис`,
    template: `%s | ${site.name}`,
  },
  description:
    'Каталог техники XGMA с поиском по моделям и характеристикам. Погрузчики, экскаваторы, дорожная техника. Отдельные разделы сервиса, запчастей, лизинга и полезных материалов.',
  icons: { icon: '/brand/xgma-logo.png', apple: '/brand/xgma-logo.png' },
  generator: 'v0.app',
}

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
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileActionBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
