'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/lib/site'
import { submitLead, type LeadStatus } from '@/lib/submit-lead'

export function RequestForm({ defaultSubject = '', defaultMessage = '' }: { defaultSubject?: string; defaultMessage?: string }) {
  const id = useId()
  const [status, setStatus] = useState<LeadStatus>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    try {
      await submitLead('request', form)
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return <form onSubmit={handleSubmit} className="request-form flex flex-col gap-5">
    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
    <FieldGroup>
      <FieldGroup className="grid sm:grid-cols-2"><Field><FieldLabel htmlFor={`${id}-name`}>Ваше имя</FieldLabel><Input id={`${id}-name`} name="name" required autoComplete="name" maxLength={100} placeholder="Как к вам обращаться" /></Field><Field><FieldLabel htmlFor={`${id}-phone`}>Телефон</FieldLabel><Input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" maxLength={40} placeholder="Номер для связи" /></Field></FieldGroup>
      <Field><FieldLabel htmlFor={`${id}-subject`}>Модель или вопрос</FieldLabel><Input id={`${id}-subject`} name="subject" defaultValue={defaultSubject} maxLength={250} placeholder="Например, XG955N для карьера" /></Field>
      <Field><FieldLabel htmlFor={`${id}-message`}>Расскажите о задаче</FieldLabel><Textarea id={`${id}-message`} name="message" defaultValue={defaultMessage} rows={4} maxLength={3000} placeholder="Город, условия работы, желаемый срок поставки…" /></Field>
    </FieldGroup>
    <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
      <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-primary" />
      <span>Я даю согласие на обработку персональных данных в соответствии с <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">политикой конфиденциальности</Link> (ФЗ № 152-ФЗ).</span>
    </label>
    <Button type="submit" size="lg" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}<ArrowUpRight data-icon="inline-end" /></Button>
    <p className={status === 'error' ? 'text-sm leading-relaxed text-destructive' : 'text-sm leading-relaxed text-muted-foreground'} role="status" aria-live="polite">
      {status === 'success' && 'Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.'}
      {status === 'error' && `Не удалось отправить заявку. Попробуйте ещё раз или напишите на ${site.email}.`}
      {(status === 'idle' || status === 'sending') && 'Заявка уйдёт напрямую в отдел продаж, почтовое приложение не потребуется.'}
    </p>
  </form>
}
