import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, getMachine, machines } from '@/lib/catalog'
import { site } from '@/lib/site'
import { RequestForm } from '@/components/request-form'

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const machine = getMachine((await params).slug)
  if (!machine) return {}
  return { title: `XGMA ${machine.model}`, description: machine.summary }
}

export default async function MachinePage({ params }: { params: Promise<{ slug: string }> }) {
  const machine = getMachine((await params).slug)
  if (!machine) notFound()
  const category = getCategory(machine.category)

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <nav aria-label="Навигация" className="mb-6 text-sm text-muted-foreground">
        <Link href="/catalog" className="hover:text-foreground">
          Каталог
        </Link>
        {' / '}
        <Link href={`/catalog#${category?.slug}`} className="hover:text-foreground">
          {category?.name}
        </Link>
      </nav>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={category?.image || '/placeholder.svg'}
            alt={`${category?.name} XGMA ${machine.model}`}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-accent">{category?.name}</p>
          <h1 className="font-heading text-5xl font-bold md:text-6xl">XGMA {machine.model}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{machine.summary}</p>
          <dl className="grid grid-cols-2 border-l-4 border-primary bg-card">
            {machine.specs.map((s) => (
              <div key={s.label} className="border-b border-border p-4">
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="font-heading text-lg font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Характеристики ориентировочные и зависят от комплектации. Точные данные и цену уточняйте по телефону{' '}
            <a href={site.phoneHref} className="font-semibold text-foreground">
              {site.phone}
            </a>
            .
          </p>
        </div>
      </div>
      <section className="mt-16 grid gap-8 border-t border-border pt-12 md:grid-cols-2">
        <h2 className="font-heading text-3xl font-bold uppercase">Запросить цену на {machine.model}</h2>
        <RequestForm defaultSubject={`XGMA ${machine.model}`} />
      </section>
    </main>
  )
}
