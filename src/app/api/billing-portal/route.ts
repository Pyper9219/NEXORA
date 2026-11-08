import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import { getStripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe()
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userSub = await prisma.subscription.findUnique({
      where: { userId: session.user.id }
    })

    if (!userSub?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing account found" },
        { status: 400 }
      )
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: userSub.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error("Billing portal error:", error)
    return NextResponse.json(
      { error: "Failed to create billing portal session" },
      { status: 500 }
    )
  }
}
