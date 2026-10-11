import Link from 'next/link'
import { categories } from '@/lib/catalog'
import { nav, site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className="font-heading text-xl font-bold uppercase">{site.name}</p>
          <p className="text-sm leading-relaxed opacity-75">{site.tagline}</p>
          <p className="text-xs leading-relaxed opacity-60">
            XGMA — торговая марка Xiamen XGMA Machinery Co., Ltd. Сайт не является официальным сайтом производителя.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-heading text-sm font-bold uppercase tracking-wider text-primary">Техника</p>
          {categories.map((c) => (
            <Link key={c.slug} href={`/catalog#${c.slug}`} className="text-sm opacity-80 hover:opacity-100">
              {c.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-heading text-sm font-bold uppercase tracking-wider text-primary">Контакты</p>
          <a href={site.phoneHref} className="text-sm font-semibold">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="text-sm opacity-80 hover:opacity-100">
            {site.email}
          </a>
          <p className="text-sm opacity-80">{site.hours}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs opacity-60 hover:opacity-100">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 px-4 py-4 text-center text-xs opacity-60">
        {`© ${new Date().getFullYear()} ${site.name}`}
      </div>
    </footer>
  )
}
