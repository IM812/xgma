import Link from 'next/link'
import { categories } from '@/lib/catalog'
import { photoCredits } from '@/lib/photos'
import { nav, site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1.2fr_1.6fr_0.8fr] md:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-accent font-heading text-lg font-extrabold text-accent-foreground">
              XG
            </span>
            <p className="font-heading text-xl font-bold">{site.name}</p>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-foreground/70">{site.tagline}</p>
          <a href={site.phoneHref} className="font-heading text-2xl font-bold">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="w-fit text-sm text-ink-foreground/80 underline underline-offset-4">
            {site.email}
          </a>
          <p className="text-sm text-ink-foreground/60">{site.hours}</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-accent">Техника</p>
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalog#${c.slug}`} className="text-sm text-ink-foreground/70 hover:text-ink-foreground">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-accent">Разделы</p>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-ink-foreground/70 hover:text-ink-foreground">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs leading-relaxed text-ink-foreground/50 md:px-6">
          <div className="flex flex-col gap-1 md:flex-row md:justify-between">
            <p>{`© ${new Date().getFullYear()} ${site.name}`}</p>
            <p>XGMA — торговая марка Xiamen XGMA Machinery Co., Ltd. Сайт дилера, не официальный сайт производителя.</p>
          </div>
          <p>
            {'Фото: '}
            {photoCredits.map((p, i) => (
              <span key={p.file}>
                <a href={p.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-foreground">
                  {p.title}
                </a>
                {` — ${p.author}, ${p.license}`}
                {i < photoCredits.length - 1 ? '; ' : '.'}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
