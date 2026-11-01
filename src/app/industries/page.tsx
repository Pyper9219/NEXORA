import { FaqAccordion } from '@/components/faq-accordion'
import { IndustryCards } from '@/components/industry-cards'
import { Navbar } from '@/components/ui/navbar'

export default function SolutionsPage() {
  return (
    <main className="page-main">
      <Navbar />

      <section className="section-py bg-gray-950">
        <div className="section-container">
          <div className="text-center mb-12 lg:mb-16 space-responsive-y">
            <p className="section-subheading text-violet-400">Industry Solutions</p>
            <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              AI Growth for
            </h1>
            <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-violet-400">
              Your Industry
            </h1>
          </div>

          <IndustryCards />
        </div>
      </section>
    </main>
  )
}
