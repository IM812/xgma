import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Wrench, Truck, FileText, ShieldCheck } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'
import { weeklyTopics } from '@/lib/articles'
import { site } from '@/lib/site'
import { RequestForm } from '@/components/request-form'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary text-secondary-foreground">
      <Image
        src="/images/hero.png"
        alt="Фронтальный погрузчик в карьере"
        fill
        priority
        className="-z-10 object-cover opacity-55"
        sizes="100vw"
      />
      <div className="-z-10 absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20 md:py-32">
        <p className="w-fit bg-primary px-2 py-1 font-heading text-xs font-bold uppercase tracking-widest text-primary-foreground">
          Техника XGMA в России
        </p>
        <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold uppercase leading-tight md:text-6xl">
          Погрузчики и спецтехника, которые работают в любой сезон
        </h1>
        <p className="max-w-xl text-pretty text-base leading-relaxed opacity-85 md:text-lg">
          Подбор, поставка, лизинг и сервисное обслуживание фронтальных погрузчиков, экскаваторов, автогрейдеров и катков XGMA.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="flex items-center gap-2 bg-primary px-5 py-3 font-heading font-bold uppercase tracking-wide text-primary-foreground"
          >
            Каталог техники <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href={site.phoneHref}
            className="border border-secondary-foreground/40 px-5 py-3 font-heading font-bold uppercase tracking-wide"
          >
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

export function CatalogPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-heading text-3xl font-bold uppercase md:text-4xl">Модельный ряд</h2>
        <Link href="/catalog" className="flex items-center gap-1 text-sm font-semibold text-accent">
          Весь каталог <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const models = machines.filter((m) => m.category === c.slug)
          return (
            <Link key={c.slug} href={`/catalog#${c.slug}`} className="group flex flex-col bg-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={c.image || '/placeholder.svg'}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-heading text-xl font-bold uppercase">{c.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                <p className="mt-auto pt-2 font-heading text-sm font-bold tracking-wider text-accent">
                  {models.map((m) => m.model).join(' · ')}
                </p>
              </div>
            </Link>
          )
        })}
        <div className="flex flex-col justify-center gap-3 bg-primary p-6 text-primary-foreground">
          <p className="font-heading text-2xl font-bold uppercase">Не нашли модель?</p>
          <p className="text-sm leading-relaxed">
            Поставляем всю линейку XGMA под заказ. Подберём технику под ваши задачи и бюджет.
          </p>
          <Link href="/contacts" className="font-heading font-bold uppercase underline underline-offset-4">
            Запросить подбор
          </Link>
        </div>
      </div>
    </section>
  )
}

const services = [
  { icon: Truck, title: 'Поставка и доставка', text: 'Техника в наличии и под заказ, доставка до объекта по России.' },
  { icon: FileText, title: 'Лизинг и рассрочка', text: 'Помогаем оформить лизинг через банки-партнёры, готовим документы.' },
  { icon: Wrench, title: 'Сервис и ТО', text: 'Плановое обслуживание, диагностика и ремонт, выезд механика.' },
  { icon: ShieldCheck, title: 'Запчасти', text: 'Расходники и запчасти для техники XGMA со склада и под заказ.' },
]

export function Services() {
  return (
    <section id="service" className="scroll-mt-24 border-y border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
          <Image
            src="/images/service.png"
            alt="Механик обслуживает погрузчик в сервисном центре"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="font-heading text-3xl font-bold uppercase md:text-4xl">Полный цикл: от подбора до сервиса</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {services.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex flex-col gap-2">
                <Icon className="size-6 text-accent" aria-hidden="true" />
                <h3 className="font-heading text-lg font-bold uppercase">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <h2 className="font-heading text-3xl font-bold uppercase md:text-4xl">О компании</h2>
        <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">{site.name}</strong> — поставщик дорожно-строительной и складской техники XGMA. XGMA
            (Xiamen XGMA Machinery) — один из крупнейших китайских производителей фронтальных погрузчиков, выпускающий технику с
            1950-х годов.
          </p>
          <p>
            Мы подбираем машины под конкретные задачи заказчика, учитываем российский климат и условия эксплуатации, помогаем с
            финансированием и обеспечиваем сервисную поддержку на весь срок службы техники.
          </p>
        </div>
      </div>
    </section>
  )
}

export function ArticlesPreview() {
  const featured = weeklyTopics(3)
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-3xl font-bold uppercase md:text-4xl">Статьи о технике XGMA</h2>
            <p className="text-sm opacity-70">Материалы готовит ИИ-редактор и обновляет каждую неделю</p>
          </div>
          <Link href="/articles" className="flex items-center gap-1 text-sm font-semibold text-primary">
            Все статьи <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/articles/${t.slug}`}
              className="flex flex-col gap-3 border border-secondary-foreground/15 p-6 transition-colors hover:border-primary"
            >
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary">{t.rubric}</span>
              <h3 className="text-pretty font-heading text-xl font-bold leading-snug">{t.title}</h3>
              <p className="text-sm leading-relaxed opacity-70">{t.brief}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactCta() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-3xl font-bold uppercase md:text-4xl">Получите расчёт стоимости</h2>
        <p className="leading-relaxed text-muted-foreground">
          Оставьте заявку — менеджер уточнит задачи, подберёт модель и комплектацию, рассчитает цену с доставкой и лизингом.
        </p>
        <a href={site.phoneHref} className="font-heading text-3xl font-bold">
          {site.phone}
        </a>
        <a href={`mailto:${site.email}`} className="text-accent underline underline-offset-4">
          {site.email}
        </a>
      </div>
      <RequestForm />
    </section>
  )
}
