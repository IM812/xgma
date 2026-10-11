import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { categories, machines } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Каталог техники XGMA',
  description:
    'Полный модельный ряд XGMA: фронтальные погрузчики N и H серий, экскаваторы, дорожная и складская техника, карьерные самосвалы.',
}

export default function CatalogPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="mb-12 font-heading text-4xl font-bold uppercase md:text-5xl">Каталог техники XGMA</h1>
      <div className="flex flex-col gap-16">
        {categories.map((c) => (
          <section key={c.slug} id={c.slug} className="scroll-mt-28">
            <div className="mb-6 grid gap-6 md:grid-cols-[240px_1fr] md:items-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image src={c.image || '/placeholder.svg'} alt={c.name} fill className="object-cover" sizes="240px" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-2xl font-bold uppercase md:text-3xl">{c.name}</h2>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">{c.description}</p>
              </div>
            </div>
            <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {machines
                .filter((m) => m.category === c.slug)
                .map((m) => (
                  <li key={m.slug} className="bg-card">
                    <Link href={`/catalog/${m.slug}`} className="group flex h-full flex-col gap-3 p-5">
                      <span className="font-heading text-3xl font-bold tracking-tight group-hover:text-accent">{m.model}</span>
                      <p className="text-sm leading-relaxed text-muted-foreground">{m.summary}</p>
                      <dl className="mt-auto grid grid-cols-2 gap-2 border-t border-border pt-3">
                        {m.specs.slice(0, 2).map((s) => (
                          <div key={s.label}>
                            <dt className="text-xs text-muted-foreground">{s.label}</dt>
                            <dd className="text-sm font-semibold">{s.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
