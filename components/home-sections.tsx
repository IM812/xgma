import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react'
import { weeklyTopics } from '@/lib/articles'
import { site } from '@/lib/site'
import { RequestForm } from '@/components/request-form'

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
                  <Link href="/contacts" className="flex items-center gap-3 text-sm font-semibold text-primary">{service.link}<ArrowUpRight className="size-4" aria-hidden="true" /></Link>
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
    <section id="leasing" className="leasing-section scroll-mt-24">
      <div className="site-container">
        <div className="leasing-content">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">Финансовые решения</p>
            <h2 className="display-heading">ТЕХНИКА — В РАБОТУ.<br />КАПИТАЛ — В ДЕЛО.</h2>
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className="max-w-sm text-base leading-relaxed">Не откладывайте большие планы. Подберём лизинг с учётом задач бизнеса и комфортной финансовой нагрузки.</p>
            <Link href="/leasing" className="flex w-full max-w-sm items-center justify-between border-b border-foreground pb-4 text-base font-semibold">Рассчитать лизинг <ArrowUpRight className="size-6" aria-hidden="true" /></Link>
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
            <p className="eyebrow text-primary">ПромТехника XG / О нас</p>
            <h2 className="display-heading">ТЯЖЁЛАЯ ТЕХНИКА.<br />ЧЕЛОВЕЧЕСКИЙ<br /><span className="text-primary">ПОДХОД.</span></h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">Мы говорим на языке ваших задач. Что грузить, сколько копать, где работать — а не просто какой погрузчик купить.</p>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">{site.name} — поставка и сервис техники XGMA. От первой консультации до следующего техобслуживания у вас есть команда, к которой можно обратиться.</p>
            <Link href="/contacts" className="text-link">Давайте познакомимся <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
          </div>
          <figure>
            <div className="relative aspect-[5/4] overflow-hidden bg-muted">
              <Image src="/photos/exhibition.jpg" alt="Экспозиция производителя XGMA на международной выставке в Чанше" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="flex flex-wrap justify-between gap-3 border-b border-border py-4 text-sm text-muted-foreground"><span>XGMA на международной выставке</span><span>Чанша, 2021</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export function ArticlesPreview() {
  const featured = weeklyTopics(3)
  return (
    <section className="section-space border-t border-border">
      <div className="site-container">
        <div className="section-heading">
          <div className="flex flex-col gap-5"><p className="eyebrow text-primary">Практика и экспертиза</p><h2 className="display-heading">ПО СУЩЕСТВУ.</h2></div>
          <Link href="/articles" className="text-link">Журнал XGMA <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
        </div>
        <div>
          {featured.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="article-row group">
              <span className="text-sm text-muted-foreground">{article.rubric}</span>
              <div className="flex flex-col gap-3"><h3 className="max-w-3xl text-pretty font-heading text-2xl font-semibold leading-tight md:text-3xl">{article.title}</h3><p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{article.brief}</p></div>
              <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
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
