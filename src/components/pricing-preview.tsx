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
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
            pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight">
            Choose Your Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRICING.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-900/50 rounded-3xl p-6 border border-white/10 hover:border-violet-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-display font-bold">{plan.name}</h3>
                  <p className="text-violet-400 text-3xl font-bold">{plan.price}/mo</p>
                </div>
                <span className="text-white/50 text-xs">{plan.interval === 'year' ? 'Annual' : 'Monthly'}</span>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-white/60">
                    <span className="w-4 h-4 rounded bg-violet-500 flex-shrink-0 mt-1"/>
                    <span className="pl-3">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => handleStartTrial(plan.id)}
                  disabled={loadingPlan === plan.id}
                  className="flex-1 bg-violet-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-violet-500 transition-colors disabled:opacity-50"
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
                  className="flex-1 border-2 border-violet-400 text-violet-400 px-4 py-2 rounded text-sm font-medium hover:bg-violet-600/20 transition-colors"
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
