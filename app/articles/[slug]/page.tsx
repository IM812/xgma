import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import { defaultArticleImage, getTopic, topics } from '@/lib/articles'
import { getArticle } from '@/lib/article-content'
import { articleTexts } from '@/lib/article-texts'
import { articleLd, breadcrumbLd, faqLd, pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

const serviceLinks = [
  { href: '/catalog', label: 'Каталог техники XGMA' },
  { href: '/service', label: 'Сервис и гарантия' },
  { href: '/parts', label: 'Оригинальные запчасти' },
  { href: '/leasing', label: 'Лизинг и калькулятор платежа' },
]

// Texts are pre-generated into content/articles (scripts/generate-articles.ts) and prerendered at build time.
export const maxDuration = 60

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const topic = getTopic((await params).slug)
  if (!topic) return {}
  return pageMetadata({ path: `/articles/${topic.slug}`, title: topic.title, description: topic.brief, type: 'article', publishedTime: articleTexts[topic.slug]?.generatedAt, image: topic.image ?? defaultArticleImage.src })
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const topic = getTopic((await params).slug)
  if (!topic) notFound()

  const article = await getArticle(topic)
  const updated = new Date(article.generatedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const others = topics.filter((t) => t.slug !== topic.slug)
  const related = [...others.filter((t) => t.rubric === topic.rubric), ...others.filter((t) => t.rubric !== topic.rubric)].slice(0, 3)
  const image = { src: topic.image ?? defaultArticleImage.src, alt: topic.imageAlt ?? defaultArticleImage.alt }
  const path = `/articles/${topic.slug}`

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <JsonLd
        data={[
          articleLd({ title: topic.title, description: topic.brief, path, image: image.src, date: article.generatedAt, kind: 'article' }),
          breadcrumbLd([{ name: 'Главная', path: '/' }, { name: 'Журнал', path: '/articles' }, { name: topic.title, path }]),
          faqLd(article.faq),
        ]}
      />
      <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Главная</Link>
        <span aria-hidden="true">/</span>
        <Link href="/articles" className="hover:text-foreground">Журнал</Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">{topic.rubric}</span>
      </nav>
      <article className="mt-6 flex flex-col gap-8">
        <header className="flex flex-col gap-4 border-b border-border pb-8">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary">{topic.rubric}</span>
          <h1 className="text-balance font-heading text-4xl font-bold leading-tight md:text-5xl">{topic.title}</h1>
          <p className="text-xs text-muted-foreground">
            <time dateTime={article.generatedAt}>{`Опубликовано ${updated}`}</time>
            {` · ${site.name}, официальное представительство XGMA`}
          </p>
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
          <p className="text-lg leading-relaxed">{article.lead}</p>
        </header>

        {article.sections.map((s) => (
          <section key={s.heading} className="flex flex-col gap-4">
            <h2 className="font-heading text-2xl font-bold">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
            {s.bullets && s.bullets.length > 0 && (
              <ul className="flex flex-col gap-2 border-l-4 border-primary bg-card p-5">
                {s.bullets.map((b, i) => (
                  <li key={i} className="text-sm leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="flex flex-col gap-4 bg-muted p-6">
          <h2 className="font-heading text-2xl font-bold">Частые вопросы</h2>
          {article.faq.map((f) => (
            <div key={f.question} className="flex flex-col gap-1">
              <h3 className="font-semibold">{f.question}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </section>

        <aside className="flex flex-col gap-3 bg-secondary p-6 text-secondary-foreground">
          <p className="font-heading text-xl font-bold uppercase">Нужна консультация по технике XGMA?</p>
          <a href={site.phoneHref} className="font-heading text-2xl font-bold text-primary">
            {site.phone}
          </a>
          <Link href="/contacts" className="text-sm underline underline-offset-4">
            Оставить заявку
          </Link>
        </aside>

        <nav aria-label="Разделы сайта" className="flex flex-col gap-3">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">Полезные разделы</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block border border-border p-4 font-semibold hover:border-primary hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>

      <nav aria-label="Другие статьи" className="mt-12 flex flex-col gap-3 border-t border-border pt-8">
        <p className="font-heading text-sm font-bold uppercase tracking-widest text-muted-foreground">Читайте также</p>
        {related.map((t) => (
          <Link key={t.slug} href={`/articles/${t.slug}`} className="font-heading text-lg font-bold hover:text-primary">
            {t.title}
          </Link>
        ))}
      </nav>
    </main>
  )
}
