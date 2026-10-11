'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquareText, Phone } from 'lucide-react'
import { site } from '@/lib/site'

const hiddenOn = ['/contacts', '/privacy', '/terms']

export function MobileActionBar() {
  const pathname = usePathname()
  if (hiddenOn.some((path) => pathname.startsWith(path))) return null

  return (
    <div className="mobile-action-bar" role="region" aria-label="Быстрые действия">
      <a href={site.phoneHref} className="mobile-action mobile-action-secondary"><Phone className="size-5" aria-hidden="true" />Позвонить</a>
      <Link href="/contacts#request" className="mobile-action mobile-action-primary"><MessageSquareText className="size-5" aria-hidden="true" />Оставить заявку</Link>
    </div>
  )
}
