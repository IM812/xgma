import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Condensed } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { site } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '700'],
  variable: '--font-roboto-condensed',
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — техника XGMA: погрузчики, экскаваторы, сервис`,
    template: `%s | ${site.name}`,
  },
  description:
    'Поставка фронтальных погрузчиков, экскаваторов, автогрейдеров и катков XGMA в России. Подбор техники, лизинг, сервис и запчасти. Статьи о технике XGMA.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#16191d',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${robotoCondensed.variable} bg-background`}>
      <body className="antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
