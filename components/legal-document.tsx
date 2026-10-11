import Link from 'next/link'
import { legal } from '@/lib/site'

export type LegalSection = { title: string; paragraphs?: string[]; items?: string[] }

export function LegalDocument({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main className="site-container">
      <nav className="page-breadcrumb" aria-label="Хлебные крошки"><Link href="/">Главная</Link><span>/</span><span>{title}</span></nav>
      <header className="flex max-w-3xl flex-col gap-5 pb-10">
        <p className="eyebrow text-primary">{`Редакция от ${legal.documentsUpdated}`}</p>
        <h1 className="page-title">{title}</h1>
        <p className="leading-relaxed text-muted-foreground">{intro}</p>
      </header>
      <article className="flex max-w-3xl flex-col gap-10 pb-24">
        {sections.map((section, index) => (
          <section key={section.title} className="flex flex-col gap-4" aria-labelledby={`legal-${index}`}>
            <h2 id={`legal-${index}`} className="font-heading text-2xl font-semibold">{`${index + 1}. ${section.title}`}</h2>
            {section.paragraphs?.map((text) => <p key={text} className="leading-relaxed text-muted-foreground">{text}</p>)}
            {section.items && <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed text-muted-foreground">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
      </article>
    </main>
  )
}
