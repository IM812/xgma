import type { Metadata } from 'next'
import Link from 'next/link'
import { CatalogBrowser } from '@/components/catalog-browser'
import { categories, machines } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Каталог техники XGMA', description: 'Модельный ряд XGMA с поиском и фильтрами: погрузчики, экскаваторы, дорожная и складская техника. Характеристики и подбор комплектации.' }

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  return <main className="site-container"><nav aria-label="Хлебные крошки" className="page-breadcrumb"><Link href="/">Главная</Link><span>/</span><span>Каталог</span></nav><header className="catalog-page-head"><div className="flex flex-col gap-4"><p className="eyebrow text-primary">XGMA / Модельный ряд</p><h1 className="page-title">КАТАЛОГ ТЕХНИКИ<span className="text-primary">.</span></h1></div><p>{machines.length} позиций, {categories.length} категорий.<br />Выберите модель под вашу задачу.<br />Цены и наличие — по запросу.</p></header><CatalogBrowser key={q ?? ''} initialQuery={typeof q === 'string' ? q : ''} /></main>
}
