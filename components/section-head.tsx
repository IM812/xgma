import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type SectionHeadProps = {
  eyebrow: string
  title: ReactNode
  description?: string
  action?: { href: string; label: string }
  id?: string
}

export function SectionHead({ eyebrow, title, description, action, id }: SectionHeadProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-12">
      <div className="flex flex-col gap-4">
        <p className="eyebrow text-primary"><span className="brand-square" aria-hidden="true" />{eyebrow}</p>
        <h2 id={id} className="section-title">{title}</h2>
      </div>
      {description ? <p className="max-w-md text-base leading-relaxed text-muted-foreground">{description}</p> : null}
      {action ? <Link href={action.href} className="text-link shrink-0">{action.label}<ArrowUpRight className="size-5" aria-hidden="true" /></Link> : null}
    </div>
  )
}
