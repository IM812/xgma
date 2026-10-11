import {
  About,
  ArticlesPreview,
  CatalogPreview,
  ContactCta,
  Hero,
  ModelTicker,
  Services,
} from '@/components/home-sections'

export const revalidate = 86400

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ModelTicker />
      <CatalogPreview />
      <Services />
      <About />
      <ArticlesPreview />
      <ContactCta />
    </main>
  )
}
