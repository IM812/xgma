'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

const money = (value: number) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value)

export function LeasingCalculator({ model }: { model?: string }) {
  const [cost, setCost] = useState('7500000')
  const [advance, setAdvance] = useState(30)
  const [months, setMonths] = useState(36)
  const [rate, setRate] = useState('18')
  const numericCost = Number(cost)
  const numericRate = Number(rate)
  const valid = cost.trim() !== '' && rate.trim() !== '' && Number.isFinite(numericCost) && numericCost >= 100000 && numericCost <= 1000000000 && Number.isFinite(numericRate) && numericRate >= 0 && numericRate <= 60
  const initial = numericCost * advance / 100
  const principal = numericCost - initial
  const monthlyRate = numericRate / 1200
  const monthly = valid ? (monthlyRate === 0 ? principal / months : principal * monthlyRate / (1 - (1 + monthlyRate) ** -months)) : 0
  const subject = `Лизинг${model ? ` ${model}` : ' техники XGMA'}`
  const message = `Стоимость для расчёта: ${money(numericCost)}\nАванс: ${advance}%\nСрок: ${months} мес.\nРасчётная ставка: ${rate}%\nПредварительный платёж: ${money(monthly)} / мес.`

  return <section className="lease-calculator" aria-labelledby="calculator-title"><div className="flex flex-col gap-2"><h2 id="calculator-title" className="font-heading text-3xl font-semibold">ПРИКИНЕМ БЮДЖЕТ?</h2><p className="text-sm leading-relaxed text-muted-foreground">Пример расчёта, а не предложение лизинговой компании.</p></div>
    <FieldGroup>
      <Field data-invalid={cost !== '' && (!Number.isFinite(numericCost) || numericCost < 100000 || numericCost > 1000000000)}><FieldLabel htmlFor="lease-cost">Стоимость техники для расчёта, ₽</FieldLabel><Input id="lease-cost" type="number" min={100000} max={1000000000} step={100000} value={cost} onChange={e => setCost(e.target.value)} aria-invalid={cost !== '' && (!Number.isFinite(numericCost) || numericCost < 100000 || numericCost > 1000000000)} /><FieldDescription>Введите ваш бюджет. Это не цена из каталога.</FieldDescription></Field>
      <Field><div className="flex items-center justify-between gap-3"><FieldLabel id="advance-label">Первоначальный взнос</FieldLabel><output className="font-heading text-2xl font-semibold">{advance}%</output></div><Slider aria-labelledby="advance-label" value={[advance]} min={10} max={50} step={5} onValueChange={value => setAdvance(Array.isArray(value) ? value[0] : value)} /><FieldDescription>{valid ? money(initial) : 'Укажите корректную стоимость'}</FieldDescription></Field>
      <Field><div className="flex items-center justify-between gap-3"><FieldLabel id="term-label">Срок лизинга</FieldLabel><output className="font-heading text-2xl font-semibold">{months} мес.</output></div><Slider aria-labelledby="term-label" value={[months]} min={12} max={60} step={12} onValueChange={value => setMonths(Array.isArray(value) ? value[0] : value)} /></Field>
      <Field><FieldLabel htmlFor="lease-rate">Расчётная ставка, % годовых</FieldLabel><Input id="lease-rate" type="number" value={rate} min={0} max={60} step={0.5} onChange={e => setRate(e.target.value)} /><FieldDescription>Условная ставка для оценки. Фактическую ставку определяет лизинговая компания.</FieldDescription></Field>
    </FieldGroup>
    <div className="lease-output" aria-live="polite"><p className="text-sm text-primary-foreground/75">Ориентировочный ежемесячный платёж</p><output className="font-heading text-5xl font-semibold tracking-tight" data-testid="lease-payment">{valid ? money(monthly) : '—'}</output>{valid ? <p className="text-sm text-primary-foreground/75">Всего с авансом: {money(initial + monthly * months)}</p> : <p className="text-sm">Укажите стоимость от 100 000 до 1 млрд ₽ и ставку от 0 до 60%.</p>}</div>
    {valid && <Link href={`/contacts?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}#request`} className="text-link">Запросить индивидуальный расчёт<ArrowUpRight className="size-5" /></Link>}
    <p className="text-sm leading-relaxed text-muted-foreground">Аннуитетный расчёт без комиссий, страхования и выкупного платежа. Налоговый эффект не учитывается. Итоговые условия фиксируются в договоре; результат не является офертой.</p>
  </section>
}
