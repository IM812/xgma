import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'

const featuredMachine = machines.find((machine) => machine.model === 'XG956N')

const facts = [
  { value: String(machines.length), label: 'позиций в каталоге' },
  { value: String(categories.length), label: 'категорий техники' },
  { value: 'Вся РФ', label: 'доставка до объекта' },
  { value: 'Сервис', label: 'и запчасти XGMA' },
]

export function MachineryHero() {
  return (
    <section className="bg-muted" aria-labelledby="hero-title">
      <div className="site-container pb-6 pt-8 lg:pb-12 lg:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-[5fr_7fr] lg:gap-14">
          <div className="flex flex-col items-start gap-6 sm:gap-7">
            <p className="eyebrow text-primary"><span className="brand-square" aria-hidden="true" />XGMA / Техника для реальных задач</p>
            <h1 id="hero-title" className="home-hero-title">
              <span className="block">МАСШТАБ ВАШИХ</span>
              <span className="block text-primary">ВОЗМОЖНОСТЕЙ.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">Подберём технику под вашу задачу. От первой поставки до сервиса на объекте.</p>
            <div className="flex w-full flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
              <Link href="/catalog" className="industrial-button max-sm:w-full">Открыть каталог<ArrowUpRight className="size-5" aria-hidden="true" /></Link>
              <Link href="/contacts#request" className="text-link">Подобрать с менеджером</Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-background">
            <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-7">
              <span className="rounded-full bg-muted px-3 py-1 font-medium">Фронтальные погрузчики</span>
              <span className="text-muted-foreground max-sm:hidden">XGMA / N-серия</span>
            </div>
            <div className="relative aspect-[16/9]">
              <Image src="/photos/catalog/xg956n.webp" alt="Фронтальный погрузчик XGMA XG956N" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain p-4 sm:p-8" />
            </div>
            <div className="flex items-center justify-between gap-6 border-t border-border px-5 py-5 sm:px-7">
              <div className="flex flex-col gap-1">
                <strong className="font-heading text-3xl font-semibold leading-none">XG956N</strong>
                <span className="text-sm text-muted-foreground">Погрузчик 5-тонного класса</span>
              </div>
              {featuredMachine ? (
                <dl className="ml-auto hidden gap-6 md:flex">
                  {featuredMachine.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-1">
                      <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                      <dd className="font-heading text-xl font-semibold leading-none">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <Link href="/catalog/category/n-series" aria-label="Перейти к погрузчикам N-серии" className="showroom-next max-md:ml-auto">
                <ArrowUpRight className="size-6" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 border-t border-border lg:mt-14 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <div key={fact.label} className={`flex flex-col gap-1 py-6 ${index >= 2 ? 'border-t border-border lg:border-t-0' : ''} ${index % 2 === 1 ? 'border-l border-border pl-5 lg:pl-8' : ''} ${index === 2 ? 'lg:border-l lg:border-border lg:pl-8' : ''}`}>
              <dd className="font-heading text-3xl font-semibold leading-none sm:text-4xl">{fact.value}</dd>
              <dt className="text-sm text-muted-foreground">{fact.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
