import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Phone } from 'lucide-react'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Страница не найдена — 404',
  description: 'Такой страницы нет на сайте. Перейдите в каталог техники XGMA или свяжитесь с представительством.',
  robots: { index: false, follow: true },
}

const destinations = [
  { href: '/catalog', label: 'Каталог техники', hint: 'Погрузчики, экскаваторы, катки' },
  { href: '/parts', label: 'Запчасти', hint: 'Оригинальные комплектующие' },
  { href: '/service', label: 'Сервис', hint: 'Обслуживание и ремонт' },
  { href: '/contacts', label: 'Контакты', hint: 'Подбор и коммерческое предложение' },
]

export default function NotFound() {
  return (
    <main className="site-container py-12 md:py-20">
      <section aria-labelledby="not-found-title" className="relative overflow-hidden bg-foreground text-background">
        <div aria-hidden="true" className="h-3 w-full bg-[repeating-linear-gradient(-45deg,var(--accent)_0_18px,var(--foreground)_18px_36px)]" />

        <div className="flex flex-col gap-10 p-6 md:p-12 lg:flex-row lg:items-center lg:gap-6">
          <div className="relative z-10 flex flex-1 flex-col gap-6">
            <p className="eyebrow text-accent">
              <span className="brand-square bg-accent!" aria-hidden="true" />
              Ошибка 404
            </p>
            <p aria-hidden="true" className="font-[family-name:var(--font-roboto-condensed)] text-[clamp(120px,20vw,260px)] font-bold leading-[0.8] tracking-tighter text-background">
              4<span className="text-accent">0</span>4
            </p>
            <h1 id="not-found-title" className="max-w-xl font-[family-name:var(--font-roboto-condensed)] text-[clamp(28px,3.4vw,48px)] font-bold uppercase leading-[1.05] tracking-tight text-balance">
              Здесь дорогу ещё не проложили
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-background/70">
              Страница могла переехать или её адрес набран с ошибкой. Вернитесь на главную или выберите нужный раздел ниже.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/"
                className="inline-flex h-12 items-center gap-2 bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-background"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                На главную
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex h-12 items-center gap-2 border border-background/30 px-6 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>

          <div className="relative flex-1 lg:max-w-[560px]">
            <Image
              src="/photos/loader-957-cutout.webp"
              alt="Фронтальный погрузчик XGMA 957"
              width={1120}
              height={800}
              priority
              className="h-auto w-full object-contain drop-shadow-2xl"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </div>
      </section>

      <nav aria-label="Популярные разделы" className="mt-10 md:mt-14">
        <p className="eyebrow mb-6 text-primary">
          <span className="brand-square" aria-hidden="true" />
          Куда отправиться
        </p>
        <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((item) => (
            <li key={item.href} className="bg-background">
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-6 p-6 transition-colors hover:bg-muted focus-visible:bg-muted"
              >
                <ArrowUpRight className="size-6 self-end text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-roboto-condensed)] text-2xl font-bold">{item.label}</span>
                  <span className="text-sm text-muted-foreground">{item.hint}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
