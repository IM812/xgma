import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatNewsDate, kindLabel, type NewsItem } from '@/lib/news'

export function NewsCard({ item, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw' }: { item: NewsItem; sizes?: string }) {
  return (
    <Link href={`/news/${item.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-colors hover:border-primary">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image src={item.image} alt={item.imageAlt} fill sizes={sizes} className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-primary px-3 py-1 font-semibold uppercase tracking-wide text-primary-foreground">{kindLabel[item.kind ?? 'news']}</span>
          <time dateTime={item.date} className="text-muted-foreground">{formatNewsDate(item.date)}</time>
        </div>
        <h3 className="text-pretty font-heading text-xl font-semibold leading-tight sm:text-2xl">{item.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
        <span className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-primary">
          Читать полностью
          <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
