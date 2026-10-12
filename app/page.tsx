import { ArticlesPreview, LeasingBand, NewsPreview, Representation } from '@/components/home-sections'
import { MachineryHero } from '@/components/machinery-hero'
import { CatalogGateway } from '@/components/catalog-gateway'
import { OwnershipLinks } from '@/components/ownership-links'

export const metadata = { alternates: { canonical: '/' } }

export const revalidate = 86400

export default function HomePage() {
  return (
    <main>
      <MachineryHero />
      <CatalogGateway />
      <Representation />
      <OwnershipLinks />
      <NewsPreview />
      <ArticlesPreview />
      <LeasingBand />
    </main>
  )
}
