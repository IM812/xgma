import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { categories, machines } from '@/lib/catalog'

const featured = [
  { slug: 'n-series', name: 'Фронтальные\nпогрузчики', image: '/photos/loader-957.jpg', label: 'N-серия', position: 'center' },
  { slug: 'excavators', name: 'Гусеничные\nэкскаваторы', image: '/photos/excavator-822fl.jpg', label: 'Земляные работы', position: 'center' },
  { slug: 'road', name: 'Дорожная\nтехника', image: '/photos/roller-626mh.jpg', label: 'Строительство дорог', position: 'center' },
]

export function CatalogGateway() {
  return (
    <section id="equipment" className="site-container catalog-gateway scroll-mt-36">
      <div className="flex flex-wrap items-end justify-between gap-5"><div className="flex flex-col gap-3"><p className="eyebrow text-primary">Каталог техники</p><h2 className="font-heading text-4xl font-semibold leading-none tracking-tight sm:text-5xl">ПОД ВАШУ ЗАДАЧУ.</h2></div><Link href="/catalog" className="text-link">Все {categories.length} категорий<ArrowUpRight className="size-5" /></Link></div>
      <div className="gateway-grid">
        {featured.map(item => <Link key={item.slug} href={`/catalog/category/${item.slug}`} className="gateway-item group"><div className="flex items-start justify-between gap-3"><span className="text-sm text-muted-foreground">{item.label}</span><ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><h3 className="whitespace-pre-line font-heading text-3xl font-semibold leading-none tracking-tight sm:text-4xl">{item.name}</h3><div className="gateway-photo"><Image src={item.image} alt={item.name.replace('\n', ' ')} fill sizes="(min-width: 768px) 30vw, 85vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div><span className="flex items-center justify-between text-sm"><span>{machines.filter(m => m.category === item.slug).length} позиций</span><span className="flex items-center gap-2 font-medium text-primary">В каталог<ArrowRight className="size-4" /></span></span></Link>)}
      </div>
      <div className="gateway-other"><span className="text-sm text-muted-foreground">А также</span>{['compact-loaders', 'backhoe-loaders', 'industrial', 'mining-trucks'].map(slug => { const category = categories.find(c => c.slug === slug)!; return <Link href={`/catalog/category/${slug}`} key={slug} className="flex items-center gap-2 text-sm hover:text-primary">{category.name}<ArrowUpRight className="size-4 shrink-0" /></Link> })}</div>
    </section>
  )
}
