import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { DealerForm } from '@/components/dealer-form'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  path: '/dealers',
  title: 'Стать дилером XGMA в России — сотрудничество с представительством',
  description: 'Станьте дилером спецтехники XGMA в своём регионе: поддержка на всех этапах, обучение продажам и сервису, запчасти и помощь в продвижении. Оставьте заявку на сотрудничество.',
})

const pillars = [
  { title: 'Работа с представительством', text: 'Прямой контакт с официальным представителем заводов XGMA в России — без лишних звеньев в цепочке поставки.' },
  { title: 'Поддержка 360°', text: 'Сопровождаем на всех этапах: от запуска дилерства и первых поставок до масштабирования бизнеса в регионе.' },
  { title: 'Обучаем продажам и сервису', text: 'Передаём знания о модельном ряде, комплектациях и обслуживании техники, чтобы продажи и сервис шли без сбоев.' },
]

const benefits = [
  { title: 'Делимся опытом поставок', text: 'Поможем разобраться, какие модели и комплектации востребованы в разных отраслях и регионах.' },
  { title: 'Помогаем с продвижением', text: 'Материалы о технике, фото и описания моделей, рекомендации по рекламе для старта в вашем регионе.' },
  { title: 'Делимся знаниями о сервисе', text: 'Подскажем, как решать типовые вопросы ремонта и обслуживания, и поддержим при сложных обращениях.' },
  { title: 'Решения по гарантии', text: 'Гарантийные обращения обрабатываем через представительство — вы знаете порядок действий и сроки.' },
  { title: 'Запчасти и расходники', text: 'Помогаем с подбором и поставкой запасных частей, чтобы техника ваших клиентов не простаивала.' },
  { title: 'Дилерские условия', text: 'Информация о ценах, наличии техники и плановых поставках — для партнёров по запросу.' },
]

const steps = [
  { title: 'Оставить заявку', text: 'Расскажите о компании и регионе, в котором хотите работать.' },
  { title: 'Обсудить условия', text: 'Свяжемся, уточним задачи и расскажем об условиях сотрудничества.' },
  { title: 'Подписать договор', text: 'Согласуем формат работы, ассортимент и порядок поставок.' },
  { title: 'Запустить продажи', text: 'Проведём обучение и передадим материалы для старта.' },
]

const offer = [
  'Актуальный модельный ряд: погрузчики, экскаваторы, катки и другая техника XGMA',
  'Международный бренд, представленный в десятках стран',
  'Официальное представительство заводов XGMA в России',
  'Обучение продажам и сервису техники',
  'Помощь с продвижением и маркетинговыми материалами',
  'Поддержка по запчастям и гарантийным вопросам',
]

export default function DealersPage() {
  return (
    <main className="site-container">
      <nav className="page-breadcrumb" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><span>Стать дилером</span></nav>
      <h1 className="page-title pb-8">Стать дилером XGMA</h1>

      <section aria-labelledby="dealer-hero" className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-foreground">
        <Image src="/photos/loaders-lineup.jpg" alt="Колёсные погрузчики XGMA в ряд на площадке" fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/20" aria-hidden="true" />
        <div className="flex max-w-2xl flex-col items-start gap-5 p-6 text-white sm:p-10">
          <p className="eyebrow text-white/90">Сотрудничество / {site.name}</p>
          <h2 id="dealer-hero" className="font-heading text-3xl font-semibold uppercase leading-tight sm:text-5xl">Станьте дилером XGMA в своём регионе</h2>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">Используйте узнаваемый бренд и поддержку официального представительства для устойчивого заработка на рынке спецтехники.</p>
          <a href="#dealer-request" className="inline-flex min-h-12 items-center gap-3 bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-white hover:text-black">Стать дилером<ArrowRight className="size-4" aria-hidden="true" /></a>
        </div>
      </section>

      <section className="interior-section flex flex-col gap-10 border-b border-border" aria-labelledby="dealer-intro">
        <h2 id="dealer-intro" className="max-w-4xl font-heading text-2xl font-semibold uppercase leading-snug sm:text-3xl">XGMA — международный производитель строительной и дорожной техники. Мы ищем партнёров, готовых развивать продажи и сервис в регионах России.</h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {pillars.map(item => <li key={item.title} className="flex flex-col gap-3 border-t-2 border-primary bg-muted p-6"><h3 className="font-heading text-xl font-semibold uppercase">{item.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p></li>)}
        </ul>
      </section>

      <section className="interior-section" aria-labelledby="dealer-why">
        <h2 id="dealer-why" className="pb-8 font-heading text-3xl font-semibold uppercase sm:text-4xl">Почему выбирают дилерство XGMA</h2>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(item => <li key={item.title} className="flex flex-col gap-3 border-t-2 border-primary pt-5"><h3 className="font-heading text-xl font-semibold uppercase">{item.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p></li>)}
        </ul>
      </section>

      <section className="interior-section border-t border-border" aria-labelledby="dealer-steps">
        <h2 id="dealer-steps" className="pb-8 font-heading text-3xl font-semibold uppercase sm:text-4xl">Как стать дилером</h2>
        <ol className="process-grid">
          {steps.map(step => <li key={step.title} className="process-step"><h3 className="font-heading text-2xl font-semibold">{step.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p></li>)}
        </ol>
      </section>

      <section id="dealer-request" className="scroll-mt-40 pb-16" aria-labelledby="dealer-form-title">
        <div className="contact-layout">
          <div className="contact-form">
            <div className="flex flex-col gap-3">
              <h2 id="dealer-form-title" className="font-heading text-3xl font-semibold uppercase">Стать дилером</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">Оставьте заявку — менеджер свяжется с вами в рабочее время ({site.hours}).</p>
            </div>
            <DealerForm />
          </div>
          <div className="contact-info">
            <h2 className="font-heading text-3xl font-semibold uppercase">Развивайте эффективный бизнес с XGMA</h2>
            <ul className="flex flex-col gap-5">
              {offer.map(text => <li key={text} className="flex items-start gap-3 text-sm leading-relaxed"><Check className="mt-0.5 size-5 shrink-0" aria-hidden="true" />{text}</li>)}
            </ul>
            <p className="border-t border-primary-foreground/25 pt-6 text-sm leading-relaxed text-primary-foreground/70">Вопросы по сотрудничеству: <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>, <a href={site.phoneHref} className="underline underline-offset-4">{site.phone}</a></p>
          </div>
        </div>
      </section>
    </main>
  )
}
