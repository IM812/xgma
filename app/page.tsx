import { About, ArticlesPreview, ContactCta, LeasingBand, ServiceStrip, Services } from '@/components/home-sections'
import { MachineryHero } from '@/components/machinery-hero'
import { EquipmentShowcase } from '@/components/equipment-showcase'

export const revalidate = 86400

export default function HomePage() {
  return (
    <main>
      <MachineryHero />
      <ServiceStrip />
      <EquipmentShowcase />
      <Services />
      <LeasingBand />
      <About />
      <ArticlesPreview />
      <ContactCta />
    </main>
  )
}
