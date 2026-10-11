import Link from 'next/link'
import { ArrowUpRight, Banknote, Package, Wrench } from 'lucide-react'
import { SectionHead } from '@/components/section-head'

const support = [
  { href: '/service', icon: Wrench, title: 'Сервис и ремонт', text: 'Пусконаладка, плановое ТО, диагностика и выезд механика на объект.', cta: 'Про сервис' },
  { href: '/parts', icon: Package, title: 'Запчасти и расходники', text: 'Подбор по модели, артикулу и серийному номеру. Наличие и сроки — до заказа.', cta: 'Запросить запчасти' },
  { href: '/leasing', icon: Banknote, title: 'Финансирование', text: 'Лизинг с графиком платежей под задачи и финансовую нагрузку вашего бизнеса.', cta: 'Рассчитать лизинг' },
]

export function OwnershipLinks() {
  return (
    <section className="section-space bg-muted">
      <div className="site-container">
        <SectionHead
          eyebrow="После передачи ключей всё только начинается"
          title={<>НА ВАС — ДЕЛО. <span className="text-primary">НА НАС — ТЕХНИКА.</span></>}
          description="От первой консультации до следующего техобслуживания у вас есть команда, к которой можно обратиться."
        />
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {support.map((item, index) => (
            <Link key={item.href} href={item.href} className="group flex flex-col gap-8 rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary sm:p-8">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-lg bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="size-6" aria-hidden="true" />
                </span>
                <span className="font-heading text-2xl font-semibold text-border">0{index + 1}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-heading text-2xl font-semibold leading-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
              <span className="mt-auto flex items-center justify-between border-t border-border pt-5 text-sm font-semibold text-primary">
                {item.cta}
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
