'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Handshake, LayoutGrid, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { nav, site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = navRef.current
    const current = container?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!container || !current) return
    container.scrollTo({ left: current.offsetLeft - 20, behavior: 'smooth' })
  }, [pathname])

  return (
    <header className="site-header">
      <div className="site-container masthead">
        <Link href="/" aria-label={`${site.name} — главная`} className="masthead-brand">
          <BrandLogo priority className="h-10 sm:h-14" />
          <span className="flex flex-col gap-1"><span className="font-heading text-lg font-bold uppercase leading-none sm:text-xl">{site.name}</span><span className="text-[11px] leading-tight text-muted-foreground sm:text-xs">Официальное представительство<br />заводов XGMA в РФ</span></span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3 xl:gap-4">
          <a href={site.phoneHref} className="group hidden items-center gap-3 pr-2 lg:flex xl:pr-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Phone className="size-4" aria-hidden="true" /></span>
            <span className="flex flex-col leading-tight"><span className="text-xs text-muted-foreground">Отдел продаж</span><span className="whitespace-nowrap text-base font-semibold tabular-nums">{site.phone}</span></span>
          </a>
          <a href={site.phoneHref} aria-label={`Позвонить: ${site.phone}`} className="header-call lg:hidden"><Phone className="size-5" aria-hidden="true" /></a>
          <Link href="/dealers" aria-current={pathname.startsWith('/dealers') ? 'page' : undefined} className={cn('hidden h-12 items-center gap-2 whitespace-nowrap rounded-[var(--radius)] border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:flex', pathname.startsWith('/dealers') && 'bg-primary text-primary-foreground')}><Handshake className="size-5" aria-hidden="true" />Стать дилером</Link>
          <Link href="/catalog" className="catalog-trigger h-12 whitespace-nowrap !py-0" aria-current={pathname.startsWith('/catalog') ? 'page' : undefined}><LayoutGrid className="size-5" aria-hidden="true" /><span>Каталог<span className="hidden sm:inline"> техники</span></span><ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="navigation-band">
        <div className="site-container navigation-inner">
          <nav ref={navRef} aria-label="Основное меню" className="visible-navigation">
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className={cn('section-nav-link', pathname === '/' && 'is-current')}>Главная</Link>
            <Link href="/dealers" aria-current={pathname.startsWith('/dealers') ? 'page' : undefined} className={cn('section-nav-link font-semibold text-primary md:hidden', pathname.startsWith('/dealers') && 'is-current')}>Стать дилером</Link>
            {nav.filter(item => item.href !== '/catalog').map(item => <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? 'page' : undefined} className={cn('section-nav-link', pathname.startsWith(item.href) && 'is-current')}>{item.label}</Link>)}
          </nav>
          <Link href="/contacts#request" className="hidden shrink-0 items-center gap-3 text-sm font-medium text-primary lg:flex">Подобрать технику<ArrowUpRight className="size-4" /></Link>
        </div>
      </div>
    </header>
  )
}
