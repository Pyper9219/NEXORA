import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import { getStripe } from "@/lib/stripe"

const planPriceMap: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER || "",
  growth: process.env.STRIPE_PRICE_GROWTH || "",
  pro: process.env.STRIPE_PRICE_PRO || "",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || "",
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { plan } = body

    // Distinguish "no such plan" from "plan exists but its Stripe price is not
    // configured"; the old truthiness check reported the latter as the former.
    const priceId: string | undefined = plan ? planPriceMap[plan] : undefined

    if (typeof priceId !== "string") {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      )
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Plan not configured" },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Get or create Stripe customer
    let userSub = await prisma.subscription.findUnique({
      where: { userId: session.user.id }
    })

    let customerId = userSub?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email || undefined,
        name: session.user.name || undefined,
        metadata: {
          userId: session.user.id,
        },
      })
      customerId = customer.id

      // Update subscription with customer ID
      if (userSub) {
        await prisma.subscription.update({
          where: { userId: session.user.id },
          data: { stripeCustomerId: customerId }
        })
      } else {
        await prisma.subscription.create({
          data: {
            userId: session.user.id,
            stripeCustomerId: customerId,
            status: "incomplete",
            plan: "starter",
          }
        })
      }
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${appUrl}/dashboard?success=true`,
      cancel_url: `${appUrl}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id,
        plan,
      },
      subscription_data: {
        metadata: {
          userId: session.user.id,
          plan,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
