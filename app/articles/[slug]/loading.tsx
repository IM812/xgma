export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-16" aria-busy="true">
      <p className="mb-8 text-sm text-muted-foreground">ИИ-редактор готовит статью, это займёт до минуты…</p>
      <div className="flex animate-pulse flex-col gap-4">
        <div className="h-4 w-24 bg-muted" />
        <div className="h-12 w-full bg-muted" />
        <div className="h-12 w-2/3 bg-muted" />
        <div className="mt-6 h-4 w-full bg-muted" />
        <div className="h-4 w-full bg-muted" />
        <div className="h-4 w-5/6 bg-muted" />
      </div>
    </main>
  )
}
