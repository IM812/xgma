import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Каталог техники XGMA',
  description:
    'Полный модельный ряд XGMA: фронтальные погрузчики N и H серий, экскаваторы, дорожная и складская техника, карьерные самосвалы.',
}

export default function CatalogPage() {
  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 md:px-6 md:py-20">
          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-primary">Каталог</p>
            <h1 className="font-heading text-5xl font-bold uppercase leading-none md:text-7xl">Техника XGMA</h1>
          </div>
          <nav aria-label="Категории" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="border border-border px-3 py-1.5 font-heading text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-16 md:px-6">
        {categories.map((c) => {
          const items = machines.filter((m) => m.category === c.slug)
          return (
            <section key={c.slug} id={c.slug} className="scroll-mt-32">
              <div className="mb-6 grid overflow-hidden border border-border bg-card md:grid-cols-[2fr_3fr]">
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-64">
                  <Image
                    src={c.image || '/placeholder.svg'}
                    alt={c.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
                <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
                  <span className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
                    {`${items.length} поз.`}
                  </span>
                  <h2 className="text-balance font-heading text-3xl font-bold uppercase leading-none md:text-4xl">{c.name}</h2>
                  <p className="max-w-xl leading-relaxed text-muted-foreground">{c.description}</p>
                </div>
              </div>
              <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {items.map((m) => (
                  <li key={m.slug} className="bg-background">
                    <Link
                      href={`/catalog/${m.slug}`}
                      className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-card"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-heading text-3xl font-bold leading-none tracking-tight transition-colors group-hover:text-primary">
                          {m.model}
                        </span>
                        <ArrowUpRight
                          className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{m.summary}</p>
                      <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-4">
                        {m.specs.slice(0, 2).map((s) => (
                          <div key={s.label} className="flex flex-col gap-0.5">
                            <dt className="text-xs text-muted-foreground">{s.label}</dt>
                            <dd className="font-heading text-lg font-bold">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </main>
  )
}
