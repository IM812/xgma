import Link from 'next/link'
import { Phone } from 'lucide-react'
import { nav, site } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 items-center bg-primary px-2 font-heading text-lg font-bold leading-none text-primary-foreground">
            XG
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-bold uppercase tracking-wide">{site.name}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Дилер техники XGMA</span>
          </span>
        </Link>
        <nav aria-label="Основное меню" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-heading text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={site.phoneHref}
          className="flex items-center gap-2 border border-primary px-3 py-2 font-heading text-sm font-bold tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Phone className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{site.phone}</span>
          <span className="sr-only sm:hidden">Позвонить</span>
        </a>
      </div>
      <nav aria-label="Мобильное меню" className="flex gap-6 overflow-x-auto border-t border-border px-4 py-2.5 lg:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 font-heading text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
