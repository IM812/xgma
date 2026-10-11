import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { type Machine } from '@/lib/catalog'
import { catalogImages, categoryLabels } from '@/lib/catalog-images'

const specLabels: Record<string, string> = {
  'Эксплуатационная масса': 'Масса',
  'Номинальная мощность': 'Мощность',
  'Объём ковша': 'Ковш',
  'Грузоподъёмность': 'Грузоподъёмность',
}

export function MachineCard({ machine }: { machine: Machine }) {
  const image = catalogImages[machine.slug]
  return (
    <article className="machine-tile">
      <Link href={`/catalog/${machine.slug}`} className="machine-tile-visual" aria-label={`Открыть ${machine.model}`}>
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 26vw, (min-width: 640px) 45vw, 90vw" className="catalog-product-image" />
        {image.note && <span className="machine-image-kind">{image.note.startsWith('Иллюстрация') ? 'Иллюстрация типа' : 'Фото типа техники'}</span>}
      </Link>
      <div className="machine-tile-content">
        <div className="machine-tile-heading">
          <p>{categoryLabels[machine.category]}</p>
          <h3><Link href={`/catalog/${machine.slug}`}>{machine.model}</Link></h3>
        </div>
        <dl>{machine.specs.slice(0, 3).map(spec => <div key={spec.label} className="machine-tile-spec"><dt>{specLabels[spec.label] ?? spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
        <Link href={`/catalog/${machine.slug}`} className="machine-tile-link"><span>Подробнее о модели</span><span className="machine-tile-arrow"><ArrowUpRight className="size-5" aria-hidden="true" /></span></Link>
      </div>
    </article>
  )
}
