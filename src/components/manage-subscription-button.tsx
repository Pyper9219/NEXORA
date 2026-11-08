"use client"

import { useState } from "react"

/**
 * Opens the Stripe billing portal.
 *
 * This has to be a client component: the billing page is a server component,
 * and passing an onClick handler from it throws "Event handlers cannot be
 * passed to Client Component props". It also has to POST — the billing-portal
 * route only accepts POST — instead of navigating the browser to the URL.
 */
export function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function openPortal() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/billing-portal", { method: "POST" })
      const data = await response.json().catch(() => ({}))

      if (!response.ok || typeof data.url !== "string") {
        setError(data.error || "Could not open the billing portal")
        setIsLoading(false)
        return
      }

      window.location.href = data.url
    } catch {
      setError("Could not open the billing portal")
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={openPortal}
        disabled={isLoading}
        className="bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? "Opening…" : "Manage Subscription"}
      </button>
      {error && (
        <p role="alert" className="text-red-400 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  )
}
