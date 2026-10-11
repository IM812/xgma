'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { site } from '@/lib/site'

const fieldClass =
  'w-full border border-input bg-card px-3 py-2.5 text-sm text-card-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring'

export function RequestForm({ defaultSubject = '' }: { defaultSubject?: string }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = `Заявка с сайта: ${data.get('subject') || 'консультация'}`
    const body = [
      `Имя: ${data.get('name')}`,
      `Телефон: ${data.get('phone')}`,
      `Техника / вопрос: ${data.get('subject')}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Имя
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Телефон
          <input name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Модель или вопрос
        <input name="subject" defaultValue={defaultSubject} className={fieldClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Сообщение
        <textarea name="message" rows={4} className={fieldClass} />
      </label>
      <Button type="submit" size="lg" className="h-11 rounded-none font-heading text-base uppercase tracking-wide">
        Отправить заявку
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground" aria-live="polite">
        {sent
          ? `Откроется ваш почтовый клиент с готовым письмом на ${site.email}. Если он не открылся — позвоните нам.`
          : 'Ответим в течение рабочего дня.'}
      </p>
    </form>
  )
}
