"use client"

import { useState } from "react"
import { PRICING, type PricingPlan } from '@/constants/pricing'
import { Loader2 } from "lucide-react"

export function PricingPreview() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleStartTrial = async (planId: string) => {
    if (planId === "enterprise") {
      window.location.href = "/contact"
      return
    }

    setLoadingPlan(planId)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to sign in with callback to pricing
          window.location.href = "/auth/signin?callbackUrl=/pricing"
        } else {
          alert(data.error || "Failed to start trial. Please try again.")
        }
      } else if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      alert("Something went wrong. Please try again.")
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <section className="section-py bg-gray-950">
      <div className="section-container">
        <div className="text-center mb-10 lg:mb-12 space-responsive-y">
          <p className="section-subheading text-violet-400">Pricing</p>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl">
            Choose Your Plan
          </h2>
        </div>

        <div className="content-grid">
          {PRICING.map((plan) => (
            <div
              key={plan.id}
              className="card-responsive bg-gray-900/50 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-display font-bold">{plan.name}</h3>
                  <p className="text-violet-400 text-2xl sm:text-3xl font-bold">{plan.price}/mo</p>
                </div>
                <span className="text-white/50 text-xs sm:text-sm">{plan.interval === 'year' ? 'Annual' : 'Monthly'}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-white/60 text-sm">
                    <span className="w-4 h-4 rounded bg-violet-500 flex-shrink-0 mt-1"/>
                    <span className="pl-3">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-responsive-col gap-3 mb-6">
                <button
                  onClick={() => handleStartTrial(plan.id)}
                  disabled={loadingPlan === plan.id}
                  className="btn-primary w-full touch-target"
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                      Starting...
                    </>
                  ) : (
                    "Start Free Trial"
                  )}
                </button>
                <button
                  onClick={() => window.location.href = "/contact"}
                  className="btn-outline w-full touch-target"
                >
                  Contact Sales
                </button>
              </div>

              {/* Payment Methods Badge */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs text-white/50">
                {['visa', 'mastercard', 'amex', 'paypal', 'stripe'].map((method) => (
                  <span key={method} className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-indigo-400"></span>
                    {method}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPreview
