'use client'

import { useId, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/lib/site'

export function RequestForm({ defaultSubject = '', defaultMessage = '' }: { defaultSubject?: string; defaultMessage?: string }) {
  const id = useId()
  const [prepared, setPrepared] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Заявка с сайта: ${data.get('subject') || 'консультация'}`
    const body = [`Имя: ${data.get('name')}`, `Телефон: ${data.get('phone')}`, `Техника / вопрос: ${data.get('subject')}`, '', String(data.get('message') ?? '')].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setPrepared(true)
  }

  return <form onSubmit={handleSubmit} className="request-form flex flex-col gap-5">
    <FieldGroup>
      <FieldGroup className="grid sm:grid-cols-2"><Field><FieldLabel htmlFor={`${id}-name`}>Ваше имя</FieldLabel><Input id={`${id}-name`} name="name" required autoComplete="name" maxLength={100} placeholder="Как к вам обращаться" /></Field><Field><FieldLabel htmlFor={`${id}-phone`}>Телефон</FieldLabel><Input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" maxLength={40} placeholder="Номер для связи" /></Field></FieldGroup>
      <Field><FieldLabel htmlFor={`${id}-subject`}>Модель или вопрос</FieldLabel><Input id={`${id}-subject`} name="subject" defaultValue={defaultSubject} maxLength={250} placeholder="Например, XG955N для карьера" /></Field>
      <Field><FieldLabel htmlFor={`${id}-message`}>Расскажите о задаче</FieldLabel><Textarea id={`${id}-message`} name="message" defaultValue={defaultMessage} rows={4} maxLength={3000} placeholder="Город, условия работы, желаемый срок поставки…" /></Field>
    </FieldGroup>
    <Button type="submit" size="lg">Подготовить письмо<ArrowUpRight data-icon="inline-end" /></Button>
    <p className="text-sm leading-relaxed text-muted-foreground" aria-live="polite">{prepared ? `Письмо подготовлено. Отправьте его в открывшемся почтовом приложении. Если приложение не открылось, напишите на ${site.email}.` : 'Форма откроет ваше почтовое приложение с готовым письмом. Заявка будет отправлена только после подтверждения в приложении.'}</p>
  </form>
}
