import { FaqAccordion } from '@/components/faq-accordion'
import { IndustryCards } from '@/components/industry-cards'
import { Navbar } from '@/components/ui/navbar'

export default function SolutionsPage() {
  return (
    <main className="flex-1 pt-20">
      <Navbar />

      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
              Industry Solutions
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              AI Growth for
            </h1>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-violet-400 leading-tight mb-8">
              Your Industry
            </h1>
          </div>

          <IndustryCards />
        </div>
      </section>
    </main>
  )
}