import Link from 'next/link'
import { Phone } from 'lucide-react'
import { nav, site } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center bg-primary font-heading text-sm font-bold text-primary-foreground">
            XG
          </span>
          <span className="font-heading text-lg font-bold uppercase tracking-wide">{site.name}</span>
        </Link>
        <nav aria-label="Основное меню" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={site.phoneHref}
          className="flex items-center gap-2 bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground"
        >
          <Phone className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{site.phone}</span>
          <span className="sr-only sm:hidden">Позвонить</span>
        </a>
      </div>
      <nav aria-label="Мобильное меню" className="flex gap-5 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 text-sm font-medium text-muted-foreground">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
