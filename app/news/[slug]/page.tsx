import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { NewsCard } from '@/components/news-card'
import { formatNewsDate, getNews, kindLabel, news } from '@/lib/news'
import { site } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getNews(slug)
  if (!item) return {}
  return { title: item.title, description: item.summary, openGraph: { images: [item.image] } }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const item = getNews(slug)
  if (!item) notFound()
  const others = news.filter((entry) => entry.slug !== item.slug).slice(0, 3)

  return (
    <main className="site-container">
      <nav className="page-breadcrumb" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><Link href="/news">Новости</Link></nav>
      <article className="mx-auto flex max-w-3xl flex-col gap-8 pb-4">
        <header className="flex flex-col gap-5">
          <p className="flex items-center gap-3 text-sm"><span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">{kindLabel[item.kind ?? 'news']}</span><time dateTime={item.date} className="text-muted-foreground">{formatNewsDate(item.date)}</time></p>
          <h1 className="text-balance font-heading text-3xl font-semibold leading-tight sm:text-5xl">{item.title}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{item.summary}</p>
        </header>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
          <Image src={item.image} alt={item.imageAlt} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-5 text-base leading-relaxed sm:text-lg">
          {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <p className="border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
          {item.kind === 'article' ? 'Материал подготовлен специалистами ' : 'Материал подготовлен на основе публикации Xiamen XGMA Machinery Co., Ltd. '}
          {site.name} — официальное представительство заводов XGMA на территории РФ.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/news" className="text-link"><ArrowLeft className="size-5" aria-hidden="true" />Все новости</Link>
          <Link href="/contacts#request" className="industrial-button">Задать вопрос представителю<ArrowUpRight className="size-5" aria-hidden="true" /></Link>
        </div>
      </article>
      <section className="interior-section" aria-labelledby="more-news">
        <h2 id="more-news" className="pb-8 font-heading text-3xl font-semibold">ЕЩЁ НОВОСТИ</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{others.map((entry) => <NewsCard key={entry.slug} item={entry} />)}</div>
      </section>
    </main>
  )
}
