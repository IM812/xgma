import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'

export function MachineryHero() {
  return (
    <section className="showroom-shell" aria-labelledby="hero-title">
      <div className="site-container">
        <div className="showroom-top"><span className="eyebrow"><span className="brand-square" />XGMA / Техника для реальных задач</span><span className="hidden text-sm text-muted-foreground md:block">Погрузить. Построить. Двигаться дальше.</span></div>
        <div className="showroom">
          <div className="showroom-intro">
            <span className="text-sm font-medium text-primary">ПромТехника XG</span>
            <h1 id="hero-title" className="showroom-heading font-heading">МАСШТАБ <br />ВАШИХ <br /><span className="text-primary">ВОЗМОЖНОСТЕЙ.</span></h1>
            <p className="max-w-72 text-sm leading-relaxed text-muted-foreground">Подберём технику под вашу задачу. От первой поставки до сервиса на объекте.</p>
            <Link href="/catalog" className="industrial-button">Открыть каталог <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
            <div className="showroom-inventory"><div><strong>{machines.length}</strong><span>позиций в каталоге</span></div><div><strong>{categories.length}</strong><span>категорий техники</span></div></div>
          </div>
          <div className="showroom-display">
            <div className="showroom-display-top"><span>Фронтальные погрузчики</span><span>XGMA / N-SERIES</span></div>
            <span className="showroom-model font-heading" aria-hidden="true">XGMA</span>
            <Image src="/photos/loader-957-cutout.webp" alt="Фронтальный погрузчик XGMA на выставке, фон фотографии удалён" width={1394} height={772} priority sizes="(min-width: 1024px) 65vw, 100vw" className="showroom-photo" />
            <div className="showroom-display-bottom"><span className="flex flex-col gap-1"><strong className="font-heading text-2xl font-semibold sm:text-3xl">СИЛА В КАЖДОМ ДВИЖЕНИИ</strong><span className="text-sm text-primary-foreground/70">Знакомьтесь с линейкой погрузчиков</span></span><Link href="/catalog/category/n-series" aria-label="Перейти к погрузчикам N-серии" className="showroom-next"><ArrowUpRight className="size-6" /></Link></div>
          </div>
        </div>
        <div className="showroom-foot"><span>От одной машины до вашего парка</span><a href="#equipment" className="flex items-center gap-2 font-medium">Выберите свою технику<ArrowDownRight className="size-4" /></a></div>
      </div>
    </section>
  )
}
