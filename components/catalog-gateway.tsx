import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'
import { SectionHead } from '@/components/section-head'

const featured = [
  { slug: 'n-series', name: 'Фронтальные\nпогрузчики', image: '/photos/catalog/xg956n.webp', label: 'Погрузка и перемещение' },
  { slug: 'excavators', name: 'Гусеничные\nэкскаваторы', image: '/photos/catalog/xg825el.webp', label: 'Земляные работы' },
  { slug: 'road', name: 'Дорожная\nтехника', image: '/photos/catalog/vibratory-roller.webp', label: 'Строительство дорог' },
]

const otherSlugs = ['compact-loaders', 'backhoe-loaders', 'industrial', 'mining-trucks']

export function CatalogGateway() {
  const others = otherSlugs.flatMap((slug) => categories.find((category) => category.slug === slug) ?? [])
  return (
    <section id="equipment" className="section-space scroll-mt-36">
      <div className="site-container">
        <SectionHead eyebrow="Каталог техники" title="ПОД ВАШУ ЗАДАЧУ." action={{ href: '/catalog', label: `Все ${categories.length} категорий` }} />
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {featured.map((item) => (
            <Link key={item.slug} href={`/catalog/category/${item.slug}`} className="group flex overflow-hidden rounded-lg border border-border bg-background transition-colors hover:border-primary max-md:flex-row md:flex-col">
              <div className="relative bg-muted max-md:w-2/5 max-md:shrink-0 md:aspect-[4/3]">
                <Image src={item.image} alt={item.name.replace('\n', ' ')} fill sizes="(min-width: 768px) 30vw, 100vw" className="catalog-product-image transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 hidden rounded-full bg-background px-3 py-1 text-xs font-medium md:block">{item.label}</span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5 md:gap-6 md:p-6">
                <h3 className="whitespace-pre-line font-heading text-3xl font-semibold leading-tight tracking-tight">{item.name}</h3>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-5 text-sm">
                  <span className="text-muted-foreground">{machines.filter((machine) => machine.category === item.slug).length} позиций</span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="mr-2 text-sm text-muted-foreground">А также</span>
          {others.map((category) => (
            <Link key={category.slug} href={`/catalog/category/${category.slug}`} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary">
              {category.name}
              <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
