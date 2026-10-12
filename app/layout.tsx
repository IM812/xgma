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
    default: `${site.name} — официальное представительство заводов XGMA в России`,
    template: `%s | ${site.name}`,
  },
  description:
    'Сягонг Рус — официальное представительство заводов XGMA на территории РФ. Каталог техники XGMA: погрузчики, экскаваторы, дорожная техника. Поставка, сервис, запчасти, лизинг и новости завода.',
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
