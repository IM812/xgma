import type { Metadata } from 'next'
import Link from 'next/link'
import { topics } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Статьи о технике XGMA',
  description: 'Обзоры, сравнения, советы по эксплуатации и обслуживанию техники XGMA на русском языке.',
}

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="mb-10 flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-bold uppercase md:text-5xl">Статьи о технике XGMA</h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          Обзоры моделей, советы по выбору, эксплуатации и сервису. Тексты пишет ИИ-редактор и автоматически обновляет их раз в
          неделю.
        </p>
      </div>
      <ul className="grid gap-px bg-border md:grid-cols-2">
        {topics.map((t) => (
          <li key={t.slug} className="bg-card">
            <Link href={`/articles/${t.slug}`} className="group flex h-full flex-col gap-2 p-6">
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-accent">{t.rubric}</span>
              <h2 className="text-pretty font-heading text-xl font-bold leading-snug group-hover:underline">{t.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.brief}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
