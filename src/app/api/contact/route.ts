import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message, phone } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Store in database (create a Contact model or use AuditLog)
    // For now, we'll use AuditLog with action "contact_form"
    await prisma.auditLog.create({
      data: {
        action: "contact_form",
        details: {
          name,
          email,
          company: company || null,
          message,
          phone: phone || null,
        },
        ipAddress: request.headers.get("x-forwarded-for") || 
                   request.headers.get("x-real-ip") || 
                   "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      }
    })

    // TODO: Send email notification to team
    // TODO: Send auto-reply to user

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
