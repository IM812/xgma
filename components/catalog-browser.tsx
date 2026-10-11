'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'
import { MachineCard } from '@/components/machine-card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CatalogBrowser({ categorySlug, initialQuery = '' }: { categorySlug?: string; initialQuery?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [sort, setSort] = useState('default')
  const [page, setPage] = useState(1)
  const [power, setPower] = useState('all')
  const filtered = machines.filter(machine => {
    const text = `${machine.model} ${machine.summary} ${categories.find(c => c.slug === machine.category)?.name}`.toLowerCase()
    const kw = Number.parseFloat(machine.specs.find(s => s.label === 'Номинальная мощность')?.value.replace(',', '.') ?? '')
    return (!categorySlug || machine.category === categorySlug) && text.includes(query.trim().toLowerCase()) && (power === 'all' || (power === 'under100' ? kw < 100 : kw >= 100))
  }).sort((a, b) => sort === 'az' ? a.model.localeCompare(b.model, 'ru', { numeric: true }) : sort === 'za' ? b.model.localeCompare(a.model, 'ru', { numeric: true }) : 0)
  const pages = Math.max(1, Math.ceil(filtered.length / 9))
  const currentPage = Math.min(page, pages)
  const visible = filtered.slice((currentPage - 1) * 9, currentPage * 9)
  function reset() { setQuery(''); setPower('all'); setSort('default'); setPage(1) }

  return <div className="catalog-layout">
    <aside className="catalog-sidebar" aria-label="Фильтр по категориям">
      <Field className="lg:hidden"><FieldLabel htmlFor="category-select">Категория техники</FieldLabel><select id="category-select" value={categorySlug ?? 'all'} onChange={event => router.push(event.target.value === 'all' ? '/catalog' : `/catalog/category/${event.target.value}`)} className="catalog-sort h-12 w-full"><option value="all">Вся техника · {machines.length}</option>{categories.map(category => <option key={category.slug} value={category.slug}>{category.name} · {machines.filter(machine => machine.category === category.slug).length}</option>)}</select></Field>
      <nav aria-label="Категории техники" className="hidden lg:block"><Link href="/catalog" className={cn('catalog-category', !categorySlug && 'is-active')} aria-current={!categorySlug ? 'page' : undefined}><span>Вся техника</span><span>{machines.length}</span></Link>{categories.map(category => <Link href={`/catalog/category/${category.slug}`} key={category.slug} className={cn('catalog-category', categorySlug === category.slug && 'is-active')} aria-current={categorySlug === category.slug ? 'page' : undefined}><span>{category.name}</span><span>{machines.filter(m => m.category === category.slug).length}</span></Link>)}</nav>
      <div className="pt-8"><div className="flex flex-col items-start gap-4 bg-muted p-5 text-foreground"><p className="font-heading text-2xl font-semibold">Не знаете, с чего начать?</p><p className="text-sm leading-relaxed text-muted-foreground">Опишите задачу — поможем подобрать технику и комплектацию.</p><Link href="/contacts?subject=Подбор%20техники#request" className="flex items-center gap-2 text-sm font-medium text-primary">Помощь с выбором<ArrowUpRight className="size-4" /></Link></div></div>
    </aside>
    <div className="min-w-0">
      <div className="catalog-toolbar">
        <Field><FieldLabel htmlFor="catalog-search" className="sr-only">Поиск по каталогу</FieldLabel><Input id="catalog-search" type="search" value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} placeholder="Модель или задача — например, XG955 или карьер" /></Field>
        <div className="catalog-result-info"><p role="status" aria-live="polite">Найдено позиций: <strong>{filtered.length}</strong></p><div className="flex flex-wrap items-center gap-3"><label className="sr-only" htmlFor="power-filter">Мощность</label><select id="power-filter" value={power} onChange={e => { setPower(e.target.value); setPage(1) }} className="catalog-sort"><option value="all">Любая мощность</option><option value="under100">До 100 кВт</option><option value="over100">От 100 кВт</option></select><label className="sr-only" htmlFor="catalog-sort">Сортировка</label><select id="catalog-sort" value={sort} onChange={e => { setSort(e.target.value); setPage(1) }} className="catalog-sort"><option value="default">По умолчанию</option><option value="az">Название: А–Я</option><option value="za">Название: Я–А</option></select></div></div>
      </div>
      {visible.length ? <div className="machine-grid">{visible.map(machine => <MachineCard key={machine.slug} machine={machine} />)}</div> : <section className="flex flex-col items-start gap-5 bg-muted p-8 text-foreground"><h2 className="font-heading text-3xl font-semibold">Ничего не нашлось</h2><p className="text-sm leading-relaxed text-muted-foreground">Попробуйте другое название или сбросьте фильтр мощности.</p><Button variant="outline" onClick={reset}>Сбросить поиск и фильтры</Button></section>}
      {pages > 1 && <nav aria-label="Страницы каталога" className="flex items-center justify-between gap-4 py-8"><Button variant="outline" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ArrowLeft data-icon="inline-start" />Назад</Button><span className="text-sm">{currentPage} / {pages}</span><Button variant="outline" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>Далее<ArrowRight data-icon="inline-end" /></Button></nav>}
      <p className="pt-6 text-sm leading-relaxed text-muted-foreground">Цена, наличие и комплектация — по запросу. Для части позиций показаны фото представителей серии или отмеченные иллюстрации типа техники; точное фото согласуем перед заказом.</p>
    </div>
  </div>
}
