import { FaqAccordion } from '@/components/faq-accordion'
import { PricingPreview } from '@/components/pricing-preview'

export default function PricingPage() {
  return (
    <main className="page-main">
      <section className="section-py bg-gray-950">
        <div className="section-container">
          <div className="text-center mb-12 lg:mb-16 space-responsive-y">
            <p className="section-subheading text-violet-400">Pricing</p>
            <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              Choose Your Plan
            </h1>
          </div>

          <PricingPreview />

          <FaqAccordion />
        </div>
      </section>
    </main>
  )
}
