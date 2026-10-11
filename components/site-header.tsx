import Link from 'next/link'
import { Clock, Mail, Phone } from 'lucide-react'
import { nav, site } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-xs">
          <p className="text-ink-foreground/80">Поставка, лизинг, сервис и запчасти XGMA по всей России</p>
          <div className="flex items-center gap-6 text-ink-foreground/80">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {site.hours}
            </span>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-ink-foreground">
              <Mail className="size-3.5" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-primary font-heading text-lg font-extrabold leading-none text-primary-foreground">
              XG
            </span>
            <span className="flex flex-col gap-0.5 leading-none">
              <span className="font-heading text-lg font-bold tracking-tight">{site.name}</span>
              <span className="hidden text-xs text-muted-foreground sm:block">Дилер техники XGMA</span>
            </span>
          </Link>
          <nav aria-label="Основное меню" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href={site.phoneHref} className="hidden flex-col items-end leading-tight sm:flex">
              <span className="font-heading text-lg font-bold">{site.phone}</span>
              <span className="text-xs text-muted-foreground">Звонок по России</span>
            </a>
            <a
              href={site.phoneHref}
              className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground sm:hidden"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="sr-only">Позвонить</span>
            </a>
            <Link
              href="/contacts"
              className="hidden rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 md:block"
            >
              Получить цену
            </Link>
          </div>
        </div>
        <nav aria-label="Мобильное меню" className="flex gap-6 overflow-x-auto border-t border-border px-4 py-2.5 lg:hidden">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 text-sm font-medium text-foreground/80">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
