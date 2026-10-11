import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { categories } from '@/lib/catalog'
import { legal, legalLinks, nav, site, trademark } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="site-footer overflow-hidden bg-ink text-ink-foreground">
      <div className="site-container">
        <div className="grid gap-9 border-b border-ink-foreground/20 py-12 md:grid-cols-[1.1fr_1.5fr_0.6fr] md:gap-12 md:py-20">
          <div className="flex flex-col items-start gap-5">
            <Link href="/" aria-label={`${site.name} — главная`} className="flex items-center gap-4">
              <span className="flex items-center bg-white p-2"><BrandLogo className="h-16" /></span>
              <span className="font-heading text-xl font-bold uppercase leading-tight">{site.name}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-ink-foreground/65">Поставка, лизинг, сервис и запчасти для техники XGMA.</p>
            <a href={site.phoneHref} className="font-heading text-2xl font-semibold">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-3 text-sm">{site.email}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-sm text-ink-foreground/50">Каталог техники</p>
            <ul className="grid gap-x-8 sm:grid-cols-2 md:gap-y-3">
              {categories.slice(0, 10).map((category, index) => <li key={category.slug} className={index >= 6 ? 'max-md:hidden' : undefined}><Link href={`/catalog/category/${category.slug}`} className="footer-link">{category.name}</Link></li>)}
              <li className="md:hidden"><Link href="/catalog" className="footer-link font-medium text-accent">Весь каталог<ArrowUpRight className="size-4" aria-hidden="true" /></Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <p className="text-sm text-ink-foreground/50">Компания</p>
            <nav aria-label="Навигация в подвале" className="grid grid-cols-2 gap-x-6 md:flex md:flex-col md:gap-3">{nav.map((item) => <Link key={item.href} href={item.href} className="footer-link">{item.label}</Link>)}</nav>
          </div>
        </div>
        <div className="flex flex-col gap-6 py-8 text-sm leading-relaxed text-ink-foreground/60">
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            <address className="flex flex-col gap-1 not-italic">
              <span className="text-ink-foreground/80">{`© ${new Date().getFullYear()} ${legal.owner}`}</span>
              <span>{`ИНН ${legal.inn}, ОГРН ${legal.ogrn}`}</span>
              <span>{`Адрес: ${legal.address}`}</span>
            </address>
            <nav aria-label="Правовая информация" className="flex flex-col gap-2 lg:items-end">
              {legalLinks.map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-10 items-center underline underline-offset-4 hover:text-ink-foreground">{item.label}</Link>)}
            </nav>
          </div>
          <div className="flex flex-col gap-3 border-t border-ink-foreground/20 pt-6 text-xs leading-relaxed text-ink-foreground/50">
            <p>Информация на сайте носит справочный характер и не является публичной офертой, определяемой положениями статьи 437 Гражданского кодекса РФ. Цены, технические характеристики, комплектация и наличие техники уточняются у менеджера.</p>
            <p>{trademark.notice}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
