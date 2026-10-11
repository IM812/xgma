import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Wrench, Truck, FileText, Package } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'
import { weeklyTopics } from '@/lib/articles'
import { site } from '@/lib/site'
import { RequestForm } from '@/components/request-form'

function plural(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'модель'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'модели'
  return 'моделей'
}

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="Фронтальный погрузчик XGMA разгружает щебень в карьере"
        fill
        priority
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/10" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-14 pt-32 md:px-6 md:pb-20">
        <p className="flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-[0.3em] text-primary">
          <span className="hazard h-3 w-10" aria-hidden="true" />
          Дилер техники XGMA
        </p>
        <h1 className="max-w-5xl text-balance font-heading text-5xl font-bold uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
          Техника, которая <span className="text-primary">не встаёт</span> на объекте
        </h1>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Фронтальные погрузчики, экскаваторы, дорожная и складская техника XGMA. Подбор, поставка, лизинг и сервис по всей
            России.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="flex items-center gap-2 bg-primary px-6 py-4 font-heading text-base font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
            >
              Каталог техники <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <a
              href={site.phoneHref}
              className="border border-foreground/30 px-6 py-4 font-heading text-base font-bold uppercase tracking-wide backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ModelTicker() {
  const models = machines.filter((m) => /^XG/.test(m.model)).map((m) => m.model)
  const row = [...models, ...models]
  return (
    <div className="overflow-hidden border-y border-primary bg-primary py-3 text-primary-foreground" aria-hidden="true">
      <div className="animate-ticker flex w-max gap-10">
        {row.map((m, i) => (
          <span key={`${m}-${i}`} className="flex items-center gap-10 font-heading text-2xl font-bold uppercase tracking-tight">
            {m}
            <span className="size-2 rotate-45 bg-primary-foreground" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function CatalogPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-primary">Модельный ряд</p>
          <h2 className="max-w-2xl text-balance font-heading text-4xl font-bold uppercase leading-none md:text-6xl">
            {`${categories.length} направлений, ${machines.length} позиций`}
          </h2>
        </div>
        <Link
          href="/catalog"
          className="flex w-fit items-center gap-2 border-b-2 border-primary pb-1 font-heading font-bold uppercase tracking-wide"
        >
          Весь каталог <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid auto-rows-[18rem] gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => {
          const count = machines.filter((m) => m.category === c.slug).length
          const big = i < 2
          return (
            <Link
              key={c.slug}
              href={`/catalog#${c.slug}`}
              className={`group relative isolate flex flex-col justify-end overflow-hidden bg-card p-5 ${
                big ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <Image
                src={c.image || '/placeholder.svg'}
                alt=""
                fill
                className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={big ? '(min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary">
                    {`${count} ${plural(count)}`}
                  </span>
                  <h3
                    className={`text-balance font-heading font-bold uppercase leading-tight ${big ? 'text-3xl md:text-4xl' : 'text-xl'}`}
                  >
                    {c.name}
                  </h3>
                  {big && <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{c.description}</p>}
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-transform group-hover:-translate-y-1">
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          )
        })}
        <Link
          href="/contacts"
          className="hazard flex flex-col justify-end p-1 sm:col-span-2 lg:col-span-1"
        >
          <span className="flex flex-col gap-2 bg-background p-5">
            <span className="font-heading text-xl font-bold uppercase">Нужен подбор?</span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              Поставляем всю линейку XGMA под заказ и подберём машину под задачу.
            </span>
          </span>
        </Link>
      </div>
    </section>
  )
}

const services = [
  { icon: Truck, title: 'Поставка', text: 'Техника в наличии и под заказ, доставка до объекта по России.' },
  { icon: FileText, title: 'Лизинг', text: 'Оформляем лизинг и рассрочку через банки-партнёры.' },
  { icon: Wrench, title: 'Сервис и ТО', text: 'Плановое обслуживание, диагностика, выезд механика.' },
  { icon: Package, title: 'Запчасти', text: 'Расходники и оригинальные запчасти XGMA со склада и под заказ.' },
]

export function Services() {
  return (
    <section id="service" className="scroll-mt-24 border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <div className="relative min-h-80 lg:min-h-[36rem]">
          <Image
            src="/images/service.png"
            alt="Механик обслуживает гидравлику погрузчика в сервисном центре"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center gap-10 px-4 py-16 md:px-12">
          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-primary">Сервис</p>
            <h2 className="text-balance font-heading text-4xl font-bold uppercase leading-none md:text-5xl">
              Полный цикл — от подбора до ремонта
            </h2>
          </div>
          <ul className="grid gap-px bg-border sm:grid-cols-2">
            {services.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex flex-col gap-3 bg-card p-5">
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="font-heading text-xl font-bold uppercase">{title}</h3>
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
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 md:px-6 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-3">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-primary">О компании</p>
          <h2 className="text-balance font-heading text-4xl font-bold uppercase leading-none md:text-5xl">
            Работаем с техникой XGMA каждый день
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">{site.name}</strong> — дилер дорожно-строительной и складской техники XGMA.
            Xiamen XGMA Machinery — один из крупнейших производителей фронтальных погрузчиков в Китае.
          </p>
          <p>
            Подбираем машины под задачи заказчика с учётом российского климата, помогаем с финансированием и сопровождаем технику
            сервисом на весь срок службы.
          </p>
        </div>
      </div>
    </section>
  )
}

export function ArticlesPreview() {
  const featured = weeklyTopics(3)
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-primary">Журнал</p>
            <h2 className="font-heading text-4xl font-bold uppercase leading-none md:text-5xl">Статьи о технике XGMA</h2>
            <p className="text-sm text-muted-foreground">Обновляются каждую неделю</p>
          </div>
          <Link
            href="/articles"
            className="flex w-fit items-center gap-2 border-b-2 border-primary pb-1 font-heading font-bold uppercase tracking-wide"
          >
            Все статьи <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/articles/${t.slug}`}
              className="group flex min-h-64 flex-col gap-4 bg-background p-6 transition-colors hover:bg-card"
            >
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary">{t.rubric}</span>
              <h3 className="text-pretty font-heading text-2xl font-bold leading-tight">{t.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.brief}</p>
              <span className="mt-auto flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide group-hover:text-primary">
                Читать <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactCta() {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-primary">Заявка</p>
          <h2 className="text-balance font-heading text-4xl font-bold uppercase leading-none md:text-6xl">
            Рассчитаем стоимость с доставкой
          </h2>
          <p className="max-w-md leading-relaxed text-muted-foreground">
            Менеджер уточнит задачи, подберёт модель и комплектацию, посчитает цену с доставкой и лизингом.
          </p>
          <a href={site.phoneHref} className="font-heading text-4xl font-bold text-primary md:text-5xl">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="w-fit underline underline-offset-4">
            {site.email}
          </a>
        </div>
        <div className="border border-border bg-background p-6 md:p-8">
          <RequestForm />
        </div>
      </div>
    </section>
  )
}
