import Image from 'next/image'
import { cn } from '@/lib/utils'

export function BrandLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/xgma-logo.png"
      alt="Логотип XGMA"
      width={249}
      height={300}
      priority={priority}
      className={cn('h-14 w-auto shrink-0', className)}
    />
  )
}
