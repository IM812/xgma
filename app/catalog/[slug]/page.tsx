import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check, Truck, Wrench } from 'lucide-react'
import { getCategory, getMachine, machines } from '@/lib/catalog'
import { RequestForm } from '@/components/request-form'
import { MachineCard } from '@/components/machine-card'
import { catalogImages } from '@/lib/catalog-images'
import { JsonLd } from '@/components/json-ld'
import { breadcrumbLd, pageMetadata, productLd } from '@/lib/seo'

export function generateStaticParams() { return machines.map(machine => ({ slug: machine.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const machine = getMachine((await params).slug); return machine ? pageMetadata({ path: `/catalog/${machine.slug}`, title: `XGMA ${machine.model} — характеристики и цена`, description: `${machine.summary} Официальное представительство XGMA в России: поставка, сервис, лизинг.`, image: catalogImages[machine.slug]?.src }) : {} }

export default async function MachinePage({ params }: { params: Promise<{ slug: string }> }) {
  const machine = getMachine((await params).slug)
  if (!machine) notFound()
  const category = getCategory(machine.category)!
  const image = catalogImages[machine.slug]
  const related = machines.filter(m => m.category === machine.category && m.slug !== machine.slug).slice(0, 3)

  return <main>
    <JsonLd data={[productLd({ name: `XGMA ${machine.model}`, description: machine.summary, path: `/catalog/${machine.slug}`, image: image.src, category: category.name, specs: machine.specs }), breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Каталог', path: '/catalog' }, { name: category.name, path: `/catalog/category/${category.slug}` }, { name: `XGMA ${machine.model}`, path: `/catalog/${machine.slug}` }])]} />
    <div className="site-container"><nav aria-label="Хлебные крошки" className="page-breadcrumb"><Link href="/">Главная</Link><span>/</span><Link href="/catalog">Каталог</Link><span>/</span><Link href={`/catalog/category/${category.slug}`}>{category.name}</Link></nav>
      <section className="model-hero"><figure className="model-image"><Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="catalog-product-image" /><figcaption className="model-image-caption">{image.note ?? 'Каталожная фотография XGMA. Комплектация уточняется при заказе.'}</figcaption></figure><div className="flex flex-col items-start gap-6"><span className="text-sm text-primary">{category.name}</span><h1 className="page-title break-words">{machine.model}</h1><p className="text-base leading-relaxed text-muted-foreground">{machine.summary}</p><div className="flex w-full flex-col gap-3 border-y border-border py-5"><p className="font-heading text-3xl font-semibold">Цена по запросу</p><p className="text-sm leading-relaxed text-muted-foreground">Уточним наличие, комплектацию и срок поставки под ваш объект.</p></div><a href="#request" className="industrial-button">Получить предложение<ArrowUpRight className="size-5" /></a><Link href={`/leasing?model=${encodeURIComponent(machine.model)}`} className="text-link">Рассчитать лизинг<ArrowUpRight className="size-4" /></Link></div></section>
      <dl className="model-spec-strip">{machine.specs.map(spec => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
      <section className="interior-section grid gap-10 lg:grid-cols-2"><div className="flex flex-col gap-5"><p className="eyebrow text-primary">Подробно о технике</p><h2 className="font-heading text-4xl font-semibold">КОМПЛЕКТАЦИЯ ПОД ВАШУ РАБОТУ</h2><p className="text-base leading-relaxed text-muted-foreground">{category.description}</p><p className="text-sm leading-relaxed text-muted-foreground">Характеристики приведены по данным каталога и зависят от исполнения. Перед заказом согласуем полную спецификацию, навесное оборудование и условия эксплуатации.</p></div><div className="flex flex-col gap-6">{[{ icon: Check, title: 'Подбор комплектации', text: 'Учитываем материалы, объём работ, климат и особенности площадки.' }, { icon: Truck, title: 'Поставка на объект', text: 'Согласуем логистику и сроки до оформления договора.' }, { icon: Wrench, title: 'Поддержка после покупки', text: 'Техническое обслуживание, подбор запчастей и консультации.' }].map(({ icon: Icon, title, text }) => <div key={title} className="flex items-start gap-4"><Icon className="size-5 shrink-0 text-primary" /><div className="flex flex-col gap-2"><h3 className="font-heading text-2xl font-semibold">{title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{text}</p></div></div>)}</div></section>
    </div>
    <section id="request" className="interior-section scroll-mt-40 bg-muted text-foreground"><div className="site-container inquiry-layout"><div className="flex flex-col gap-5"><p className="eyebrow text-primary">Следующий шаг</p><h2 className="font-heading text-4xl font-semibold">ОБСУДИМ<br />{machine.model}?</h2><p className="max-w-sm text-base leading-relaxed text-muted-foreground">Укажите город, задачи и желаемый срок поставки — это поможет подготовить предметное предложение.</p></div><RequestForm defaultSubject={`XGMA ${machine.model}`} /></div></section>
    {related.length > 0 && <section className="site-container interior-section"><div className="flex flex-wrap items-end justify-between gap-5 pb-8"><h2 className="font-heading text-4xl font-semibold">ЕЩЁ В ЭТОЙ КАТЕГОРИИ</h2><Link href={`/catalog/category/${category.slug}`} className="text-link">Все модели<ArrowUpRight className="size-4" /></Link></div><div className="machine-grid">{related.map(model => <MachineCard key={model.slug} machine={model} />)}</div></section>}
  </main>
}
