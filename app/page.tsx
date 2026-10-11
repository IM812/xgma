import {
  About,
  ArticlesPreview,
  CatalogPreview,
  ContactCta,
  FeaturedModel,
  Hero,
  LeasingBand,
  ServiceStrip,
  Services,
} from '@/components/home-sections'

export const revalidate = 86400

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServiceStrip />
      <CatalogPreview />
      <FeaturedModel />
      <Services />
      <LeasingBand />
      <About />
      <ArticlesPreview />
      <ContactCta />
    </main>
  )
}
