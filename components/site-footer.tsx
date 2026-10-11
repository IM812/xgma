import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '@/lib/catalog'
import { photoCredits } from '@/lib/photos'
import { nav, site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-ink-foreground">
      <div className="site-container">
        <div className="grid gap-10 border-b border-ink-foreground/20 py-14 md:grid-cols-[1.1fr_1.5fr_0.6fr] md:gap-12 md:py-20">
          <div className="flex flex-col items-start gap-5">
            <p className="font-heading text-2xl font-bold uppercase">{site.name}</p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-foreground/65">Техника для больших дел.<br />Поставка, лизинг, сервис и запчасти.</p>
            <a href={site.phoneHref} className="font-heading text-2xl font-semibold">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm">{site.email}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-sm text-ink-foreground/50">Каталог техники</p>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {categories.slice(0, 10).map((category) => <li key={category.slug}><Link href={`/catalog/category/${category.slug}`} className="text-sm leading-relaxed text-ink-foreground/80 transition-colors hover:text-accent">{category.name}</Link></li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-sm text-ink-foreground/50">Компания</p>
            <nav aria-label="Навигация в подвале" className="flex flex-col gap-3">{nav.map((item) => <Link key={item.href} href={item.href} className="text-sm text-ink-foreground/80 hover:text-accent">{item.label}</Link>)}</nav>
          </div>
        </div>
        <div className="flex items-end justify-between overflow-hidden py-10 md:py-16">
          <p className="footer-wordmark font-heading" aria-label="XGMA">XGMA<span className="text-accent">.</span></p>
          <p className="hidden text-right text-sm leading-relaxed text-ink-foreground/60 sm:block">Большая техника.<br />Большие возможности.</p>
        </div>
        <div className="flex flex-col gap-5 border-t border-ink-foreground/20 py-7 text-sm leading-relaxed text-ink-foreground/60">
          <div className="flex flex-col justify-between gap-4 lg:flex-row"><p>{`© ${new Date().getFullYear()} ${site.name}`}</p><p className="max-w-xl">Сайт дилера. XGMA — торговая марка Xiamen XGMA Machinery Co., Ltd.</p></div>
          <details>
            <summary className="w-fit cursor-pointer underline underline-offset-4">Источники фотографий</summary>
            <ul className="flex flex-col gap-2 pt-4">
              {photoCredits.map((photo) => <li key={photo.file}><a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink-foreground">{photo.title}</a>{` — ${photo.author}, `}<a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{photo.license}</a></li>)}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  )
}
