'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/lib/site'

export function DealerForm() {
  const id = useId()
  const [prepared, setPrepared] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Заявка на дилерство XGMA: ${data.get('region') || 'регион не указан'}`
    const body = [
      `ФИО: ${data.get('name')}`,
      `Компания: ${data.get('company') || '—'}`,
      `E-mail: ${data.get('email')}`,
      `Телефон: ${data.get('phone')}`,
      `Город / регион: ${data.get('region')}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setPrepared(true)
  }

  return (
    <form onSubmit={handleSubmit} className="request-form flex flex-col gap-5">
      <FieldGroup>
        <FieldGroup className="grid sm:grid-cols-2">
          <Field><FieldLabel htmlFor={`${id}-name`}>ФИО</FieldLabel><Input id={`${id}-name`} name="name" required autoComplete="name" maxLength={100} placeholder="Как к вам обращаться" /></Field>
          <Field><FieldLabel htmlFor={`${id}-company`}>Компания</FieldLabel><Input id={`${id}-company`} name="company" autoComplete="organization" maxLength={150} placeholder="Название юрлица или ИП" /></Field>
        </FieldGroup>
        <FieldGroup className="grid sm:grid-cols-2">
          <Field><FieldLabel htmlFor={`${id}-email`}>E-mail</FieldLabel><Input id={`${id}-email`} name="email" type="email" required autoComplete="email" maxLength={120} placeholder="name@company.ru" /></Field>
          <Field><FieldLabel htmlFor={`${id}-phone`}>Телефон</FieldLabel><Input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" maxLength={40} placeholder="Номер для связи" /></Field>
        </FieldGroup>
        <Field><FieldLabel htmlFor={`${id}-region`}>Город / регион</FieldLabel><Input id={`${id}-region`} name="region" required maxLength={150} placeholder="Где планируете работать" /></Field>
        <Field><FieldLabel htmlFor={`${id}-message`}>Комментарий</FieldLabel><Textarea id={`${id}-message`} name="message" rows={4} maxLength={3000} placeholder="Опыт в продажах техники, наличие площадки и сервиса, планы по объёму" /></Field>
      </FieldGroup>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input type="checkbox" name="consent-policy" required className="mt-1 size-4 shrink-0 accent-primary" />
        <span>Согласен с <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">политикой конфиденциальности</Link></span>
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <input type="checkbox" name="consent-data" required className="mt-1 size-4 shrink-0 accent-primary" />
        <span>Согласен на обработку персональных данных (ФЗ № 152-ФЗ)</span>
      </label>
      <Button type="submit" size="lg">Отправить заявку<ArrowUpRight data-icon="inline-end" /></Button>
      <p className="text-sm leading-relaxed text-muted-foreground" aria-live="polite">{prepared ? `Письмо подготовлено. Отправьте его в открывшемся почтовом приложении. Если приложение не открылось, напишите на ${site.email}.` : 'Форма откроет ваше почтовое приложение с готовым письмом. Заявка будет отправлена только после подтверждения в приложении.'}</p>
    </form>
  )
}
