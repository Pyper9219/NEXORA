import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, preferences } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    })

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { error: "Email already subscribed" },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true, preferences: preferences || {} }
        })
        return NextResponse.json(
          { success: true, message: "Subscription reactivated!" },
          { status: 200 }
        )
      }
    }

    // Create new subscription
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        preferences: preferences || {},
        isActive: true,
      }
    })

    // TODO: Send welcome email
    // TODO: Add to email marketing list (Mailchimp, SendGrid, etc.)

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to newsletter!" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    await prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false }
    })

    return NextResponse.json(
      { success: true, message: "Successfully unsubscribed" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error)
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again." },
      { status: 500 }
    )
  }
}
