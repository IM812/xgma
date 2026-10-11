'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'
import { cn } from '@/lib/utils'

const lines = [
  { slug: 'n-series', label: 'Фронтальные погрузчики', title: 'Сила в каждом\nдвижении.', image: '/photos/loaders-lineup.jpg', alt: 'Настоящие погрузчики XGMA на выставке техники', summary: 'Погрузка, перемещение, планировка. N-серия — для ежедневной работы на стройке, в карьере и на производстве.', feature: '1,8–4,0', unit: 'м³', detail: 'объём ковша', photoPosition: '50% 65%' },
  { slug: 'excavators', label: 'Гусеничные экскаваторы', title: 'Большой объём.\nТочная работа.', image: '/photos/excavator-822fl.jpg', alt: 'Гусеничный экскаватор XGMA XG822FL на выставке', summary: 'От городской траншеи до масштабной разработки карьера. Подберём массу, глубину копания и навесное под ваш объект.', feature: '6–125', unit: 'т', detail: 'классы эксплуатационной массы', photoPosition: '50% 55%' },
  { slug: 'road', label: 'Дорожная техника', title: 'Основа\nбольших дорог.', image: '/photos/roller-626mh.jpg', alt: 'Дорожный каток XGMA 626MH', summary: 'Катки, автогрейдеры и бульдозеры. Машины для подготовки основания, планировки и уплотнения дорожного полотна.', feature: '6', unit: '', detail: 'типов техники в каталоге', photoPosition: '50% 55%' },
]

export function EquipmentShowcase() {
  const [selected, setSelected] = useState(lines[0].slug)
  const line = lines.find((item) => item.slug === selected)!
  const models = machines.filter((machine) => machine.category === selected)

  return (
    <section id="equipment" className="section-space scroll-mt-24">
      <div className="site-container">
        <div className="section-heading">
          <div className="flex flex-col gap-5">
            <p className="eyebrow text-primary">Модельный ряд / XGMA</p>
            <h2 className="display-heading">ВАША ЗАДАЧА.<br /><span className="text-muted-foreground">НАША ТЕХНИКА.</span></h2>
          </div>
          <div className="flex max-w-80 flex-col gap-6">
            <p className="text-base leading-relaxed text-muted-foreground">Для тех, кто строит дороги, разрабатывает карьеры и двигает бизнес вперёд.</p>
            <Link href="/catalog" className="text-link">Все {categories.length} категорий <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
          </div>
        </div>
        <fieldset className="equipment-selector">
          <legend className="sr-only">Выберите категорию техники</legend>
          {lines.map((item) => (
            <label key={item.slug} className={cn('equipment-choice', selected === item.slug && 'is-selected')}>
              <input className="sr-only" type="radio" name="equipment-category" checked={selected === item.slug} onChange={() => setSelected(item.slug)} value={item.slug} />
              <span>{item.label}</span>
              <ArrowUpRight className="size-5 shrink-0" aria-hidden="true" />
            </label>
          ))}
        </fieldset>
        <div className="equipment-panel" aria-live="polite" aria-atomic="true">
          <div key={line.slug} className="equipment-visual animate-rise">
            <Image src={line.image} alt={line.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" style={{ objectPosition: line.photoPosition }} />
            <span className="equipment-photo-label">XGMA / {selected === 'n-series' ? 'N + H SERIES' : selected === 'road' ? 'ROAD EQUIPMENT' : 'EXCAVATORS'}</span>
          </div>
          <div className="equipment-details">
            <div className="flex flex-col gap-5">
              <h3 className="whitespace-pre-line font-heading text-4xl font-bold uppercase leading-none tracking-tight lg:text-5xl">{line.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/75">{line.summary}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-heading text-6xl font-semibold leading-none tracking-tight">{line.feature}<span className="ml-2 text-3xl">{line.unit}</span></p>
              <p className="text-sm text-primary-foreground/65">{line.detail}</p>
            </div>
            <Link href={`/catalog#${line.slug}`} className="flex items-center justify-between border-t border-primary-foreground/25 pt-5 text-sm font-semibold">Смотреть модели <ArrowRight className="size-5" aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="model-shortlist">
          <span className="shrink-0 text-sm text-muted-foreground">В этой линейке</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {models.slice(0, 5).map((model) => <Link key={model.slug} href={`/catalog/${model.slug}`} className="font-heading text-lg font-semibold hover:text-primary">{model.model}</Link>)}
            {models.length > 5 && <Link href={`/catalog#${selected}`} className="text-sm font-medium text-primary">Ещё {models.length - 5} <span aria-hidden="true">↗</span></Link>}
          </div>
        </div>
      </div>
    </section>
  )
}
