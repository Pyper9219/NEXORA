/**
 * Lazily-created Stripe client.
 *
 * Importing this module must NOT require STRIPE_SECRET_KEY. Next.js evaluates
 * route modules while collecting page data during `next build`, and the Stripe
 * constructor throws ("Neither apiKey nor config.authenticator provided") if
 * it is handed an empty key. Creating the client on first use keeps builds
 * green without a live Stripe key while still failing loudly at request time
 * if the key is genuinely missing.
 */

import Stripe from "stripe"

let client: Stripe | undefined

export function getStripe(): Stripe {
  if (!client) {
    const apiKey = process.env.STRIPE_SECRET_KEY
    if (!apiKey) {
      throw new Error("STRIPE_SECRET_KEY is not set")
    }
    client = new Stripe(apiKey, { apiVersion: "2026-10-28.endive" })
  }
  return client
}
