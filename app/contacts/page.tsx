import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '@/lib/site'
import { RequestForm } from '@/components/request-form'

export const metadata: Metadata = {
  title: 'Контакты',
  description: `Свяжитесь с ${site.name}: телефон, почта, заявка на подбор техники XGMA.`,
}

export default function ContactsPage() {
  const items = [
    { icon: Phone, label: 'Телефон', value: site.phone, href: site.phoneHref },
    { icon: Mail, label: 'Почта', value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: 'Режим работы', value: site.hours },
    { icon: MapPin, label: 'Город', value: site.city },
  ]

  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:grid-cols-2 md:py-16">
      <div className="flex flex-col gap-8">
        <h1 className="font-heading text-4xl font-bold uppercase md:text-5xl">Контакты</h1>
        <ul className="flex flex-col gap-px bg-border">
          {items.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex items-center gap-4 bg-card p-5">
              <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                {href ? (
                  <a href={href} className="font-heading text-xl font-bold">
                    {value}
                  </a>
                ) : (
                  <p className="font-heading text-xl font-bold">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="font-heading text-2xl font-bold uppercase">Оставить заявку</h2>
        <RequestForm />
      </div>
    </main>
  )
}
