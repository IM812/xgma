'use client'

import Link from 'next/link'

export default function ArticleError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-16">
      <h1 className="font-heading text-3xl font-bold uppercase">Статья ещё не готова</h1>
      <p className="leading-relaxed text-muted-foreground">Не удалось подготовить материал. Попробуйте обновить страницу.</p>
      <div className="flex gap-4">
        <button onClick={reset} className="bg-primary px-4 py-2 font-heading font-bold uppercase text-primary-foreground">
          Повторить
        </button>
        <Link href="/articles" className="px-4 py-2 font-heading font-bold uppercase">
          Все статьи
        </Link>
      </div>
    </main>
  )
}
