import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { NewsCard } from '@/components/news-card'
import { formatNewsDate, kindLabel, news } from '@/lib/news'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Новости XGMA',
  description: `Новости заводов XGMA: новая техника, поставки, участие в выставках и проектах. Публикует ${site.name} — официальное представительство XGMA в России.`,
}

export default function NewsPage() {
  const [featured, ...rest] = news
  return (
    <main className="site-container">
      <nav className="page-breadcrumb" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><span>Новости</span></nav>
      <header className="flex flex-col gap-5 pb-10">
        <p className="eyebrow text-primary">Новости и события / XGMA</p>
        <h1 className="page-title">НОВОСТИ<br /><span className="text-primary">ЗАВОДА XGMA.</span></h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">Что происходит на заводах XGMA: новые модели, поставки, выставки и проекты, а также практические статьи о выборе и эксплуатации техники. Публикует официальное представительство XGMA в России.</p>
      </header>

      {featured && (
        <Link href={`/news/${featured.slug}`} className="group grid overflow-hidden rounded-lg bg-foreground text-background md:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-96">
            <Image src={featured.image} alt={featured.imageAlt} fill priority sizes="(min-width: 768px) 55vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="flex flex-col items-start justify-center gap-5 p-6 sm:p-10">
            <span className="flex items-center gap-3 text-sm"><span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">{kindLabel[featured.kind ?? 'news']} · новое</span><time dateTime={featured.date} className="text-background/70">{formatNewsDate(featured.date)}</time></span>
            <h2 className="text-pretty font-heading text-3xl font-semibold leading-tight sm:text-4xl">{featured.title}</h2>
            <p className="text-sm leading-relaxed text-background/75">{featured.summary}</p>
            <span className="flex items-center gap-3 text-sm font-semibold text-accent">Читать полностью<ArrowUpRight className="size-5" aria-hidden="true" /></span>
          </div>
        </Link>
      )}

      <section className="interior-section" aria-labelledby="all-news">
        <div className="flex flex-wrap items-end justify-between gap-5 pb-8">
          <h2 id="all-news" className="font-heading text-3xl font-semibold">ВСЕ НОВОСТИ</h2>
          <p className="text-sm text-muted-foreground">Новости · Статьи · Советы по выбору техники</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => <NewsCard key={item.slug} item={item} />)}
        </div>
      </section>
    </main>
  )
}
