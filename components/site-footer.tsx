import Link from 'next/link'
import { categories } from '@/lib/catalog'
import { nav, site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="hazard h-2" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-[1.2fr_1.5fr_1fr] md:px-6">
        <div className="flex flex-col gap-4">
          <p className="font-heading text-2xl font-bold uppercase">{site.name}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{site.tagline}</p>
          <a href={site.phoneHref} className="font-heading text-3xl font-bold text-primary">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="text-sm underline underline-offset-4">
            {site.email}
          </a>
          <p className="text-sm text-muted-foreground">{site.hours}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">Техника</p>
          <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalog#${c.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-primary">Разделы</p>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-border px-4 py-5 text-xs text-muted-foreground md:flex-row md:justify-between md:px-6">
        <p>{`© ${new Date().getFullYear()} ${site.name}`}</p>
        <p>XGMA — торговая марка Xiamen XGMA Machinery Co., Ltd. Сайт дилера, не официальный сайт производителя.</p>
      </div>
    </footer>
  )
}
