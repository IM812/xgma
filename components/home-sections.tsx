import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgeCheck, Factory, FileText, Plus, ShieldCheck, Wrench } from 'lucide-react'
import { weeklyTopics } from '@/lib/articles'
import { news } from '@/lib/news'
import { site } from '@/lib/site'
import { NewsCard } from '@/components/news-card'
import { RequestForm } from '@/components/request-form'
import { SectionHead } from '@/components/section-head'

export function ServiceStrip() {
  return (
    <section className="service-ribbon" aria-label="Сопровождение техники">
      <div className="site-container">
        <div className="ribbon-inner">
          {[
            { label: 'Поставка по России', href: '/contacts' },
            { label: 'Покупка в лизинг', href: '#leasing' },
            { label: 'Сервис на объекте', href: '#service' },
            { label: 'Запчасти XGMA', href: '#service' },
          ].map((item) => <a href={item.href} key={item.label}>{item.label}<ArrowUpRight className="size-5" aria-hidden="true" /></a>)}
        </div>
      </div>
    </section>
  )
}

const services = [
  { title: 'Подобрать и поставить', text: 'Начинаем с вашей задачи: материал, объёмы, площадка и условия работы. Подбираем модель и навесное оборудование, согласовываем комплектацию и доставку до объекта.', link: 'Подобрать машину' },
  { title: 'Организовать финансирование', text: 'Сравниваем варианты покупки и лизинга. Уточняем первоначальный взнос и удобный срок, готовим предложение с графиком платежей.', link: 'Обсудить лизинг' },
  { title: 'Обслуживать и ремонтировать', text: 'Пусконаладка, плановое техническое обслуживание и выезд механика на объект. Поможем определить неисправность и согласовать порядок ремонта.', link: 'Связаться с сервисом' },
  { title: 'Обеспечить запчастями', text: 'Подбираем оригинальные детали и расходники по модели и серийному номеру. Уточняем совместимость, наличие и сроки поставки до оформления заказа.', link: 'Запросить запчасти' },
]

export function Services() {
  return (
    <section id="service" className="section-space scroll-mt-24 bg-muted text-foreground">
      <div className="site-container">
        <div className="service-layout">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow text-primary">Больше, чем поставка</p>
            <h2 className="display-heading">МАШИНА РАБОТАЕТ.<br /><span className="text-primary">МЫ РЯДОМ.</span></h2>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">Техника должна приносить результат, а не новые заботы. Берём на себя всё, что помогает ей работать.</p>
            <Link href="/contacts" className="text-link">Обсудить вашу задачу <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
          </div>
          <div>
            {services.map((service, index) => (
              <details className="service-row group" key={service.title} open={index === 0 ? true : undefined}>
                <summary><h3 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">{service.title}</h3><Plus className="size-5 shrink-0" aria-hidden="true" /></summary>
                <div className="flex flex-col items-start gap-5 pb-8">
                  <p className="max-w-lg text-base leading-relaxed text-muted-foreground">{service.text}</p>
                  <Link href="/contacts" className="flex min-h-11 items-center gap-3 text-sm font-semibold text-primary">{service.link}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function LeasingBand() {
  return (
    <section id="leasing" className="scroll-mt-24 pb-16 pt-4 lg:pb-24">
      <div className="site-container">
        <div className="relative isolate overflow-hidden rounded-lg bg-foreground text-background">
          <Image src="/photos/loaders-lineup.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-[60%_75%]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/20 max-md:to-foreground/60" aria-hidden="true" />
          <div className="flex flex-col items-start gap-8 px-5 py-10 sm:px-12 md:py-16 lg:px-16 lg:py-20">
            <p className="eyebrow text-accent"><span className="size-[7px] shrink-0 bg-accent" aria-hidden="true" />Финансовые решения</p>
            <h2 className="display-heading max-w-2xl">ТЕХНИКА — В РАБОТУ. <span className="text-accent">КАПИТАЛ — В ДЕЛО.</span></h2>
            <p className="max-w-md text-base leading-relaxed text-background/80">Не откладывайте большие планы. Подберём лизинг с учётом задач бизнеса и комфортной финансовой нагрузки.</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link href="/leasing" className="flex items-center justify-between gap-8 rounded-lg bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-background">Рассчитать лизинг<ArrowUpRight className="size-5" aria-hidden="true" /></Link>
              <Link href="/contacts#request" className="rounded-lg border border-background/40 px-6 py-4 text-center text-sm font-semibold transition-colors hover:bg-background hover:text-foreground">Связаться с нами</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="section-space scroll-mt-24">
      <div className="site-container">
        <div className="about-layout">
          <div className="flex flex-col items-start gap-7">
            <p className="eyebrow text-primary">{site.name} / Представительство XGMA</p>
            <h2 className="display-heading">ТЯЖЁЛАЯ ТЕХНИКА.<br />ЧЕЛОВЕЧЕСКИЙ<br /><span className="text-primary">ПОДХОД.</span></h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">Мы говорим на языке ваших задач. Что грузить, сколько копать, где работать — а не просто какой погрузчик купить.</p>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">{site.name} — {site.status.toLowerCase()}. От первой консультации до следующего техобслуживания у вас есть команда, к которой можно обратиться.</p>
            <Link href="/contacts" className="text-link">Давайте познакомимся <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
          </div>
          <figure>
            <div className="relative aspect-[5/4] overflow-hidden bg-muted">
              <Image src="/photos/exhibition.jpg" alt="Экспозиция производителя XGMA на международной выс��авке в Чанше" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="flex flex-wrap justify-between gap-3 border-b border-border py-4 text-sm text-muted-foreground"><span>XGMA на международной выставке</span><span>Чанша, 2021</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

const representationPoints = [
  { icon: Factory, title: 'Связь с заводом', text: 'Работаем напрямую с заводами XGMA: вопросы по комплектации, срокам и поставке решаем с производителем.' },
  { icon: ShieldCheck, title: 'Оригинальная техника', text: 'Поставляем серийную технику и запчасти XGMA, подбираем модель под задачу и условия эксплуатации в России.' },
  { icon: Wrench, title: 'Сервис по стандартам завода', text: 'Пусконаладка, техническое обслуживание и подбор деталей по модели и серийному номеру машины.' },
  { icon: FileText, title: 'Договор на территории РФ', text: 'Условия поставки, гарантии и сервиса фиксируем в документах с российским юридическим лицом.' },
]

export function Representation() {
  return (
    <section id="representative" className="section-space scroll-mt-24 bg-foreground text-background" aria-labelledby="representative-title">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow text-accent"><BadgeCheck className="size-5" aria-hidden="true" />Официальный статус</p>
            <h2 id="representative-title" className="display-heading">ПРЕДСТАВИТЕЛЬ<br /><span className="text-accent">ЗАВОДОВ XGMA.</span></h2>
            <p className="max-w-md text-base leading-relaxed text-background/75">{site.name} — официальное представительство заводов XGMA на территории Российской Федерации. Мы не просто продаём технику, а представляем производителя перед российскими заказчиками.</p>
            <Link href="/about" className="flex min-h-11 items-center gap-3 text-sm font-semibold text-accent">О представительстве<ArrowUpRight className="size-5" aria-hidden="true" /></Link>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-lg bg-background/15 sm:grid-cols-2">
            {representationPoints.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex flex-col gap-4 bg-foreground p-6 sm:p-8">
                <Icon className="size-7 text-accent" aria-hidden="true" />
                <h3 className="font-heading text-xl font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-background/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function NewsPreview() {
  const latest = news.slice(0, 3)
  return (
    <section className="section-space">
      <div className="site-container">
        <SectionHead eyebrow="Новости XGMA" title="СОБЫТИЯ ЗАВОДА." action={{ href: '/news', label: 'Все новости' }} />
        <div className="mobile-snap md:grid md:grid-cols-3 md:gap-6">
          {latest.map((item) => <NewsCard key={item.slug} item={item} />)}
        </div>
      </div>
    </section>
  )
}

export function ArticlesPreview() {
  const featured = weeklyTopics(3)
  return (
    <section className="section-space">
      <div className="site-container">
        <SectionHead eyebrow="Практика и экспертиза" title="ПО СУЩЕСТВУ." action={{ href: '/articles', label: 'Журнал XGMA' }} />
        <div className="mobile-snap md:grid md:grid-cols-3 md:gap-6">
          {featured.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group flex flex-col gap-5 rounded-lg border border-border bg-background p-5 transition-colors hover:border-primary sm:gap-6 sm:p-8">
              <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium">{article.rubric}</span>
              <div className="flex flex-col gap-3">
                <h3 className="text-pretty font-heading text-2xl font-semibold leading-tight">{article.title}</h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{article.brief}</p>
              </div>
              <span className="mt-auto flex items-center justify-between border-t border-border pt-5 text-sm font-semibold text-primary">
                Читать
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
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
    <section id="request" className="section-space scroll-mt-24 bg-muted text-foreground">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col items-start gap-7">
            <p className="eyebrow text-primary">Начнём с разговора</p>
            <h2 className="display-heading">ЧТО У ВАС<br /><span className="text-primary">В ПЛАНАХ?</span></h2>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">Расскажите о задаче. Подберём технику, посчитаем доставку и предложим варианты финансирования.</p>
            <a href={`mailto:${site.email}`} className="text-link">{site.email}<ArrowRight className="size-5" aria-hidden="true" /></a>
          </div>
          <div className="request-surface bg-background p-6 text-foreground sm:p-10"><RequestForm /></div>
        </div>
      </div>
    </section>
  )
}
