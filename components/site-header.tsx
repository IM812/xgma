'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, LayoutGrid, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { nav, site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="site-header">
      <div className="site-container masthead">
        <Link href="/" aria-label={`${site.name} — главная`} className="masthead-brand">
          <BrandLogo priority className="h-12 sm:h-14" />
          <span className="flex flex-col gap-1"><span className="font-heading text-lg font-bold uppercase leading-none">Спецтехника XGMA</span><span className="hidden text-sm text-muted-foreground sm:block">Поставка и сервис</span></span>
        </Link>
        <p className="hidden text-sm leading-relaxed text-muted-foreground xl:block">Поставка и поддержка XGMA<br />На всех этапах работы</p>
        <div className="flex items-center gap-7">
          <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-medium lg:flex"><Phone className="size-4" />{site.phone}</a>
          <Link href="/catalog" className="catalog-trigger" aria-current={pathname.startsWith('/catalog') ? 'page' : undefined}><LayoutGrid className="size-5" aria-hidden="true" /><span>Каталог<span className="hidden sm:inline"> техники</span></span><ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="navigation-band">
        <div className="site-container navigation-inner">
          <nav aria-label="Основное меню" className="visible-navigation">
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className={cn('section-nav-link', pathname === '/' && 'is-current')}>Главная</Link>
            {nav.filter(item => item.href !== '/catalog').map(item => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? 'page' : undefined} className={cn('section-nav-link', pathname.startsWith(item.href) && 'is-current')}>{item.label}</Link>)}
          </nav>
          <Link href="/contacts#request" className="hidden shrink-0 items-center gap-3 text-sm font-medium text-primary lg:flex">Подобрать технику<ArrowUpRight className="size-4" /></Link>
        </div>
      </div>
    </header>
  )
}
