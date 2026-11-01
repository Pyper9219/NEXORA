import { FaqAccordion } from '@/components/faq-accordion'
import { Navbar } from '@/components/ui/navbar'
import { PricingPreview } from '@/components/pricing-preview'

export default function PricingPage() {
  return (
    <main className="flex-1 pt-20">
      <Navbar />

      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
              Pricing
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
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