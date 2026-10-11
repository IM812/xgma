'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { nav, site } from '@/lib/site'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="header-inner">
          <Link href="/" aria-label={`${site.name} — главная`} onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-3">
            <span className="brand-wordmark font-heading">XG<span className="text-primary">.</span></span>
            <span className="brand-name flex flex-col gap-1 border-l border-border pl-3">
              <span className="font-heading text-base font-bold uppercase leading-none tracking-wide">ПромТехника</span>
              <span className="text-sm leading-none text-muted-foreground">Дилер техники XGMA</span>
            </span>
          </Link>
          <nav aria-label="Основное меню" className="hidden items-center gap-6 xl:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <a href={site.phoneHref} className="hidden font-heading text-xl font-semibold tracking-tight min-[1360px]:block">{site.phone}</a>
            <Link href="/contacts" className="header-cta">Обсудить задачу <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
            <button type="button" className="flex size-11 items-center justify-center border border-border xl:hidden" aria-expanded={open} aria-controls="header-navigation" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="header-navigation" aria-label="Мобильное меню" className="flex flex-col border-t border-border pb-6 xl:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-4 font-heading text-2xl font-semibold">
                {item.label}<ArrowUpRight className="size-5" aria-hidden="true" />
              </Link>
            ))}
            <a href={site.phoneHref} className="pt-5 text-base font-semibold">{site.phone}</a>
          </nav>
        )}
      </div>
    </header>
  )
}
