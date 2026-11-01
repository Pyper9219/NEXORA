"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export const faqs = [
  {
    id: 1,
    question: "How does Nexora's AI automation work?",
    answer:
      "Nexora uses advanced machine learning models to analyze your business processes, identify automation opportunities, and create intelligent workflows that learn and adapt over time. Our platform integrates with your existing tools and systems to deliver seamless automation without disruption.",
  },
  {
    id: 2,
    question: "Is there a free trial available?",
    answer:
      "Yes! All plans include a 14-day credit-card-free free trial. You can explore all features, test automations, and see the ROI before committing. No credit card required to get started.",
  },
  {
    id: 3,
    question: "Which payment methods do you accept?",
    answer:
      "We accept 30+ local and international payment methods including M-PESA, Airtel Money, Paystack, Flutterwave, Visa, Mastercard, American Express, PayPal, Stripe, and cryptocurrency (BTC/ETH/USDT). Payment method selection is available during checkout.",
  },
  {
    id: 4,
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time from your account dashboard. Prorated credits are applied for plan changes mid-cycle, and you retain access to your upgraded features immediately.",
  },
  {
    id: 5,
    question: "How is data security and privacy handled?",
    answer:
      "Nexora employs bank-grade security with SOC 2 compliance, end-to-end encryption, and role-based access control. We never share your data with third parties without consent, and all data is stored in encrypted form at rest and in transit.",
  },
  {
    id: 6,
    question: "What kind of support is included?",
    answer:
      "Support varies by plan: Starter plans include email support with 24-hour response, Growth and Pro plans include priority email and chat support with 4-hour response, and Enterprise plans include dedicated account manager, 24/7 priority support, and SLA guarantees.",
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-py bg-gray-950">
      <div className="section-container">
        <div className="text-center mb-10 lg:mb-12 space-responsive-y">
          <p className="section-subheading text-violet-400">Frequently Asked Questions</p>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl">
            Get The Answers You Need
          </h2>
        </div>

        <div className="space-y-1 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="card-responsive-sm bg-gray-900/50 rounded-xl border border-white/10 hover:border-violet-500/30 transition-all overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left touch-target focus-visible-ring"
                aria-expanded={openIndex === index}
              >
                <div className="flex-1 pr-4">
                  <h3 className="text-base sm:text-lg font-display font-medium text-white">
                    {faq.question}
                  </h3>
                  {openIndex === null && (
                    <p className="text-white/40 text-xs sm:text-sm mt-1">
                      {faq.answer.substring(0, 100)}...
                    </p>
                  )}
                </div>
                <ChevronDown
                  className={"w-5 h-5 text-violet-400 transition-transform duration-300 flex-shrink-0 " + (openIndex === index ? "rotate-180" : "")}
                />
              </button>
              <div
                className={"overflow-hidden transition-all duration-300 " + (openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}
              >
                <div className="px-4 sm:px-6 pb-6">
                  <p className="text-white/50 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqAccordion
