import { site } from '@/lib/site'

export type LeadStatus = 'idle' | 'sending' | 'success' | 'error'

const TITLES = {
  dealer: 'Заявка на дилерство XGMA',
  request: 'Заявка с сайта XGMA',
} as const

const LABELS: Record<string, string> = {
  name: 'Имя',
  company: 'Компания',
  email: 'E-mail',
  phone: 'Телефон',
  region: 'Город / регион',
  subject: 'Техника / вопрос',
  message: 'Комментарий',
}

export async function submitLead(type: keyof typeof TITLES, form: HTMLFormElement) {
  const data = new FormData(form)
  const body: Record<string, string> = {}

  for (const [key, label] of Object.entries(LABELS)) {
    const value = String(data.get(key) ?? '').trim()
    if (value) body[label] = value
  }

  const detail = body['Город / регион'] || body['Техника / вопрос']
  body._subject = detail ? `${TITLES[type]}: ${detail}` : TITLES[type]
  body._template = 'table'
  body._captcha = 'false'
  body._honey = String(data.get('website') ?? '')
  if (body['E-mail']) body._replyto = body['E-mail']

  const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result || String(result.success) !== 'true') {
    throw new Error('lead request failed')
  }
}
