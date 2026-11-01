import Link from 'next/link'
import { PRICING, type PricingPlan } from '@/constants/pricing'
import { FAQs } from '@/constants/faqs'
import { cn } from '@/lib/utils'

export function Pricing() {
  const plans: PricingPlan[] = PRICING

  return (
    <section className="section-py bg-gray-900">
      <div className="section-container">
        <div className="text-center mb-12 lg:mb-16 space-responsive-y">
          <p className="section-subheading text-violet-400">Pricing Plans</p>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl">Choose the Plan That Fits</h2>
        </div>

        <div className="content-grid-1-2-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card-responsive bg-gray-900/80 border border-white/10 rounded-2xl hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-display font-bold">{plan.name}</span>
                {plan.popular && (
                  <span className="bg-violet-600 text-white px-3 py-1 rounded text-xs font-medium">Popular</span>
                )}
              </div>
              <p className="text-3xl sm:text-4xl font-display font-bold text-violet-400">{plan.price}/mo</p>
              <p className="text-white/50 text-sm mb-6">{plan.interval === 'year' ? 'billed annually' : 'billed monthly'}</p>
              <ul className="space-y-3 mb-6 text-white/60 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6l4 4M6 12H4a2 2 0 01-2-2V4a2 2 0 012-2h6a2 2 0 012 2v2m5 13a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary w-full">
                {plan.ctatext}
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mt-10 lg:mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg sm:text-xl font-display font-medium mb-6 text-center">Add-Ons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card-responsive-sm bg-gray-900/50 border border-white/10 rounded-xl">
              <p className="font-medium text-white">AI Credits</p>
              <p className="mt-1 text-indigo-400 text-sm">$20/mo for 5,000 credits</p>
            </div>
            <div className="card-responsive-sm bg-gray-900/50 border border-white/10 rounded-xl">
              <p className="font-medium text-white">DFY Automations</p>
              <p className="mt-1 text-indigo-400 text-sm">$50/mo setup + $100/mo</p>
            </div>
            <div className="card-responsive-sm bg-gray-900/50 border border-white/10 rounded-xl">
              <p className="font-medium text-white">Priority Support</p>
              <p className="mt-1 text-indigo-400 text-sm">$30/mo</p>
            </div>
            <div className="card-responsive-sm bg-gray-900/50 border border-white/10 rounded-xl">
              <p className="font-medium text-white">White-Label</p>
              <p className="mt-1 text-indigo-400 text-sm">Custom pricing</p>
            </div>
          </div>
        </div>

        {/* FAQs within Pricing */}
        <div className="mt-10 lg:mt-12">
          <h3 className="text-lg sm:text-xl font-display font-medium mb-4 text-center">Common Questions</h3>
          <div className="space-y-2 max-w-2xl mx-auto">
            {FAQs.map((faq) => (
              <div key={faq.id} className="card-responsive-sm bg-gray-900/80 border border-white/10 rounded-xl">
                <div className="flex items-between justify-between">
                  <span className="text-white font-medium text-sm">{faq.question}</span>
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
                <p className="mt-2 text-white/60 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
