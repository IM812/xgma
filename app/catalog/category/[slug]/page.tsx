import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, getCategory, machines } from '@/lib/catalog'
import { CatalogBrowser } from '@/components/catalog-browser'

export function generateStaticParams() { return categories.map(category => ({ slug: category.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const category = getCategory((await params).slug); return category ? { title: `${category.name} XGMA`, description: category.description } : {} }

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = getCategory((await params).slug)
  if (!category) notFound()
  const count = machines.filter(machine => machine.category === category.slug).length
  return <main className="site-container"><nav aria-label="Хлебные крошки" className="page-breadcrumb"><Link href="/">Главная</Link><span>/</span><Link href="/catalog">Каталог</Link><span>/</span><span>{category.name}</span></nav><header className="catalog-page-head"><div className="flex flex-col gap-4"><p className="eyebrow text-primary">XGMA / Позиций: {count}</p><h1 className="page-title uppercase">{category.name}</h1></div><p>{category.description}</p></header><CatalogBrowser key={category.slug} categorySlug={category.slug} /></main>
}
