import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { getStripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not set")
      return NextResponse.json(
        { error: "Webhook is not configured" },
        { status: 500 }
      )
    }

    const stripe = getStripe()

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Stripe webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const stripe = getStripe()
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string
  const userId = session.metadata?.userId

  if (!userId) {
    console.error("No userId in session metadata")
    return
  }

  // Get subscription details from Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const priceId = subscription.items.data[0]?.price.id

  // Determine plan from price ID
  const planMap: Record<string, string> = {
    [process.env.STRIPE_PRICE_STARTER || ""]: "starter",
    [process.env.STRIPE_PRICE_GROWTH || ""]: "growth",
    [process.env.STRIPE_PRICE_PRO || ""]: "pro",
    [process.env.STRIPE_PRICE_ENTERPRISE || ""]: "enterprise",
  }

  const plan = planMap[priceId] || "starter"

  // Update or create subscription in database
  // Using camelCase properties for newer Stripe API
  const currentPeriodStart = (subscription as any).current_period_start 
    ? new Date((subscription as any).current_period_start * 1000)
    : new Date()
  const currentPeriodEnd = (subscription as any).current_period_end
    ? new Date((subscription as any).current_period_end * 1000)
    : new Date()

  await prisma.subscription.upsert({
    where: { userId },
    update: {
      status: "active",
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      plan,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    create: {
      userId,
      status: "active",
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      plan,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    }
  })

  // Log audit event
  await prisma.auditLog.create({
    data: {
      userId,
      action: "subscription_created",
      details: {
        plan,
        stripeSubscriptionId: subscriptionId,
        stripeCustomerId: customerId,
      }
    }
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const subscriptionId = subscription.id
  const priceId = subscription.items.data[0]?.price.id

  // Find user by stripe customer ID
  const userSub = await prisma.subscription.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!userSub) {
    console.error("Subscription not found for customer:", customerId)
    return
  }

  const planMap: Record<string, string> = {
    [process.env.STRIPE_PRICE_STARTER || ""]: "starter",
    [process.env.STRIPE_PRICE_GROWTH || ""]: "growth",
    [process.env.STRIPE_PRICE_PRO || ""]: "pro",
    [process.env.STRIPE_PRICE_ENTERPRISE || ""]: "enterprise",
  }

  const plan = planMap[priceId] || userSub.plan

  // Using camelCase properties for newer Stripe API
  const currentPeriodStart = (subscription as any).current_period_start 
    ? new Date((subscription as any).current_period_start * 1000)
    : new Date()
  const currentPeriodEnd = (subscription as any).current_period_end
    ? new Date((subscription as any).current_period_end * 1000)
    : new Date()

  await prisma.subscription.update({
    where: { id: userSub.id },
    data: {
      status: subscription.status,
      plan,
      currentPeriodStart,
      currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    }
  })

  // Log audit event
  await prisma.auditLog.create({
    data: {
      userId: userSub.userId,
      action: "subscription_updated",
      details: {
        plan,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      }
    }
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  const userSub = await prisma.subscription.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!userSub) {
    return
  }

  await prisma.subscription.update({
    where: { id: userSub.id },
    data: {
      status: "canceled",
      cancelAtPeriodEnd: false,
    }
  })

  await prisma.auditLog.create({
    data: {
      userId: userSub.userId,
      action: "subscription_canceled",
      details: {
        stripeSubscriptionId: subscription.id,
      }
    }
  })
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  // Use subscription_details or subscription property depending on API version
  const subscriptionId = (invoice as any).subscription 
    || (invoice as any).subscription_details?.subscription
    || null

  const userSub = await prisma.subscription.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!userSub) return

  await prisma.auditLog.create({
    data: {
      userId: userSub.userId,
      action: "payment_succeeded",
      details: {
        amount: invoice.amount_paid,
        currency: invoice.currency,
        invoiceId: invoice.id,
        subscriptionId,
      }
    }
  })
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  const userSub = await prisma.subscription.findFirst({
    where: { stripeCustomerId: customerId }
  })

  if (!userSub) return

  await prisma.auditLog.create({
    data: {
      userId: userSub.userId,
      action: "payment_failed",
      details: {
        amount: invoice.amount_due,
        currency: invoice.currency,
        invoiceId: invoice.id,
        attemptCount: invoice.attempt_count,
      }
    }
  })

  // TODO: Send payment failed notification email
}
