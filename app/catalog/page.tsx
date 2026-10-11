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
      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 md:px-6 md:py-20">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-primary">Каталог</p>
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">Техника XGMA</h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {`${machines.length} позиций в ${categories.length} категориях. Цены и наличие — по запросу.`}
            </p>
          </div>
          <nav aria-label="Категории" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
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
            <section key={c.slug} id={c.slug} className="scroll-mt-36">
              <div
                className={`mb-6 grid overflow-hidden rounded-xl border border-border bg-card ${c.image ? 'md:grid-cols-[2fr_3fr]' : ''}`}
              >
                {c.image && (
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-64">
                    <Image src={c.image || '/placeholder.svg'} alt={c.name} fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
                  </div>
                )}
                <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {`${items.length} поз.`}
                  </span>
                  <h2 className="text-balance font-heading text-2xl font-bold tracking-tight md:text-4xl">{c.name}</h2>
                  <p className="max-w-xl leading-relaxed text-muted-foreground">{c.description}</p>
                </div>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/catalog/${m.slug}`}
                      className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-heading text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
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
