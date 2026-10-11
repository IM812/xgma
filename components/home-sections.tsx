import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, FileText, Package, Truck, Wrench } from 'lucide-react'
import { categories, getMachine, machines } from '@/lib/catalog'
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

function SectionHead({ eyebrow, title, link }: { eyebrow: string; title: string; link?: { href: string; label: string } }) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-2xl flex-col gap-3">
        <p className="text-sm font-semibold text-primary">{eyebrow}</p>
        <h2 className="text-balance font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group flex w-fit items-center gap-2 text-sm font-semibold text-primary"
        >
          {link.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

const trust = ['Техника в наличии и под заказ', 'Лизинг и рассрочка', 'Гарантия производителя', 'Сервис и запчасти']

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-24">
        <div className="flex animate-rise flex-col gap-7">
          <p className="flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground/80">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            Дилер дорожно-строительной техники XGMA
          </p>
          <h1 className="text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Погрузчики и экскаваторы <span className="text-primary">XGMA</span> с поставкой по всей России
          </h1>
          <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            {`${machines.length} моделей в ${categories.length} категориях: от компактных погрузчиков до 125-тонных карьерных экскаваторов. Подберём машину под задачу и посчитаем цену с доставкой.`}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Смотреть каталог <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contacts"
              className="flex items-center justify-center rounded-md border border-input bg-card px-6 py-3.5 font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Рассчитать лизинг
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border pt-6 sm:grid-cols-2">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm font-medium">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <figure className="relative animate-rise [animation-delay:120ms]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <Image
              src="/photos/loader-957.jpg"
              alt="Фронтальный погрузчик XGMA XG957N"
              fill
              priority
              className="object-cover object-[50%_65%]"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-xl shadow-foreground/5 sm:left-6">
            <span className="flex size-12 items-center justify-center rounded-md bg-accent font-heading text-lg font-bold text-accent-foreground">
              N
            </span>
            <span className="flex flex-col">
              <span className="font-heading text-lg font-bold leading-tight">Погрузчики N-серии</span>
              <span className="text-sm text-muted-foreground">Ковши от 1,8 до 4,0 м³</span>
            </span>
          </div>
          <figcaption className="sr-only">Погрузчик XGMA серии N на выставке строительной техники</figcaption>
        </figure>
      </div>
    </section>
  )
}

const services = [
  { icon: Truck, title: 'Поставка', text: 'Со склада и под заказ, доставка до объекта трейлером или ж/д.' },
  { icon: FileText, title: 'Лизинг', text: 'Работаем с банками и лизинговыми компаниями, подберём условия.' },
  { icon: Wrench, title: 'Сервис и ТО', text: 'Пусконаладка, плановое ТО и выезд механика на объект.' },
  { icon: Package, title: 'Запчасти', text: 'Расходники и оригинальные запчасти XGMA со склада.' },
]

export function ServiceStrip() {
  return (
    <section aria-label="Услуги" className="border-b border-border bg-muted">
      <ul className="mx-auto grid max-w-7xl gap-px px-4 pb-0 pt-16 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:pt-14">
        {services.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4 py-6 lg:pr-8">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-card text-primary shadow-sm">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-heading text-lg font-bold">{title}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function CatalogPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <SectionHead
        eyebrow="Модельный ряд"
        title="Техника XGMA для стройки, карьера и склада"
        link={{ href: '/catalog', label: 'Весь каталог' }}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories
          .filter((c) => c.image)
          .map((c) => {
            const count = machines.filter((m) => m.category === c.slug).length
            return (
              <Link
                key={c.slug}
                href={`/catalog#${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-foreground/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={c.image || '/placeholder.svg'}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold shadow-sm">
                    {`${count} ${plural(count)}`}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-balance font-heading text-lg font-bold leading-tight">{c.name}</h3>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                </div>
              </Link>
            )
          })}
      </div>
      <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {categories
          .filter((c) => !c.image)
          .map((c) => {
            const items = machines.filter((m) => m.category === c.slug)
            return (
              <li key={c.slug} className="bg-card">
                <Link
                  href={`/catalog#${c.slug}`}
                  className="group flex h-full items-center justify-between gap-4 p-5 transition-colors hover:bg-muted"
                >
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-heading text-lg font-bold leading-tight group-hover:text-primary">{c.name}</span>
                    <span className="truncate text-sm text-muted-foreground">
                      {`${items.length} ${plural(items.length)} · ${items
                        .slice(0, 2)
                        .map((m) => m.model)
                        .join(', ')}`}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            )
          })}
      </ul>
    </section>
  )
}

export function FeaturedModel() {
  const model = getMachine('xg822-xg825')
  if (!model) return null
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:aspect-[4/3] lg:aspect-square">
          <Image
            src={model.image || '/placeholder.svg'}
            alt="Гусеничный экскаватор XGMA XG822FL"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Основной класс</p>
            <h2 className="text-balance font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Экскаваторы XG822 / XG825
            </h2>
            <p className="max-w-lg text-pretty text-lg leading-relaxed text-ink-foreground/70">{model.summary}</p>
          </div>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-ink-foreground/10 sm:grid-cols-3">
            {model.specs.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 bg-ink p-5">
                <dt className="text-xs text-ink-foreground/60">{s.label}</dt>
                <dd className="font-heading text-2xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/catalog/${model.slug}`}
              className="flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Характеристики и цена <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/catalog#excavators"
              className="flex items-center justify-center rounded-md border border-ink-foreground/25 px-6 py-3.5 font-semibold transition-colors hover:border-ink-foreground"
            >
              Все экскаваторы
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  { title: 'Заявка', text: 'Рассказываете о задаче, объёмах и условиях работы.' },
  { title: 'Подбор', text: 'Предлагаем модель, навесное и комплектацию под климат.' },
  { title: 'Договор и лизинг', text: 'Фиксируем цену, оформляем покупку или лизинг.' },
  { title: 'Доставка', text: 'Привозим на объект, проводим пусконаладку и обучение.' },
  { title: 'Сервис', text: 'Сопровождаем ТО и запчастями весь срок службы.' },
]

export function Services() {
  return (
    <section id="service" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20 md:px-6 md:py-28">
      <SectionHead eyebrow="Как мы работаем" title="От заявки до сервиса — одна команда" />
      <ol className="grid gap-5 md:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span className="font-heading text-lg font-bold">{s.title}</span>
            <span className="text-sm leading-relaxed text-muted-foreground">{s.text}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function LeasingBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="flex flex-col gap-6 rounded-xl bg-accent px-6 py-10 text-accent-foreground md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-balance font-heading text-3xl font-bold leading-tight md:text-4xl">Технику можно взять в лизинг</h2>
          <p className="max-w-xl leading-relaxed text-accent-foreground/80">
            Сравним предложения банков и лизинговых компаний и пришлём график платежей за один рабочий день.
          </p>
        </div>
        <Link
          href="/contacts"
          className="flex shrink-0 items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 font-semibold text-ink-foreground transition-opacity hover:opacity-90"
        >
          Рассчитать платёж <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20 md:px-6 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
          <Image
            src="/photos/exhibition.jpg"
            alt="Экспозиция техники XGMA на международной выставке в Чанше"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold text-primary">О компании</p>
          <h2 className="text-balance font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Работаем с техникой XGMA каждый день
          </h2>
          <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              <strong className="font-semibold text-foreground">{site.name}</strong> — дилер дорожно-строительной и складской
              техники XGMA. Xiamen XGMA Machinery — один из крупнейших производителей фронтальных погрузчиков в Китае, на рынке с
              1951 года.
            </p>
            <p>
              Подбираем машины под задачи заказчика с учётом российского климата, помогаем с финансированием и сопровождаем
              технику сервисом на весь срок службы.
            </p>
          </div>
          <Link href="/contacts" className="group flex w-fit items-center gap-2 font-semibold text-primary">
            Связаться с нами
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ArticlesPreview() {
  const featured = weeklyTopics(3)
  return (
    <section className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHead eyebrow="Журнал" title="Статьи о технике XGMA" link={{ href: '/articles', label: 'Все статьи' }} />
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/articles/${t.slug}`}
              className="group flex min-h-64 flex-col gap-4 rounded-xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
            >
              <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{t.rubric}</span>
              <h3 className="text-pretty font-heading text-xl font-bold leading-snug">{t.title}</h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{t.brief}</p>
              <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-primary">
                Читать
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="text-sm font-semibold text-primary">Заявка</p>
          <h2 className="text-balance font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Рассчитаем стоимость с доставкой
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
            Менеджер уточнит задачи, подберёт модель и комплектацию, посчитает цену с доставкой и лизингом.
          </p>
          <div className="mt-2 flex flex-col gap-1 border-l-2 border-accent pl-5">
            <span className="text-sm text-muted-foreground">Позвоните нам</span>
            <a href={site.phoneHref} className="font-heading text-3xl font-bold text-primary md:text-4xl">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="w-fit text-sm underline underline-offset-4">
              {site.email}
            </a>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-xl shadow-foreground/5 md:p-8">
          <RequestForm />
        </div>
      </div>
    </section>
  )
}
