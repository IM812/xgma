import { About, ArticlesPreview, CatalogPreview, ContactCta, Hero, Services } from '@/components/home-sections'

export const revalidate = 86400

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CatalogPreview />
      <Services />
      <About />
      <ArticlesPreview />
      <ContactCta />
    </main>
  )
}
