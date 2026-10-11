import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getCategory, type Machine } from '@/lib/catalog'

export function MachineCard({ machine }: { machine: Machine }) {
  const category = getCategory(machine.category)
  const cutout = machine.category === 'n-series' || machine.category === 'wheel-loaders'
  const image = machine.image ?? (cutout ? '/photos/loader-957-cutout.webp' : machine.category === 'excavators' || machine.slug === 'vibratory-roller' ? category?.image : undefined)
  return (
    <article className="machine-tile">
      <Link href={`/catalog/${machine.slug}`} className="machine-tile-visual" aria-label={`Открыть ${machine.model}`}>
        {image ? <><Image src={image} alt={machine.image ? machine.model : `Представитель категории: ${category?.name}`} fill sizes="(min-width: 1280px) 26vw, (min-width: 640px) 45vw, 90vw" className={cutout ? 'object-contain p-3' : 'object-cover'} /><span className="machine-photo-note">{machine.image ? 'Фото модели' : 'Фото типа техники'}</span></> : <div className="machine-technical"><span>XGMA / Техническая карта</span><strong>{machine.specs[0]?.value}</strong><span>{machine.specs[0]?.label}</span></div>}
      </Link>
      <div className="machine-tile-content">
        <p className="text-sm text-muted-foreground">{category?.name}</p>
        <h3><Link href={`/catalog/${machine.slug}`}>{machine.model}</Link></h3>
        <dl>{machine.specs.slice(0, 3).map(spec => <div key={spec.label} className="machine-tile-spec"><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
        <Link href={`/catalog/${machine.slug}`} className="machine-tile-link">Подробнее о технике<ArrowUpRight className="size-5" /></Link>
      </div>
    </article>
  )
}
