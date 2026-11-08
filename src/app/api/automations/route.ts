import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const automations = await prisma.automation.findMany({
      where: { userId: session.user.id },
      include: {
        runs: {
          orderBy: { startedAt: "desc" },
          take: 5,
        },
        _count: {
          select: { runs: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json({ automations })
  } catch (error) {
    console.error("Automation list error:", error)
    return NextResponse.json({ error: "Failed to load automations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, trigger, status = "draft", templateId, config } = body

    if (!name || !trigger) {
      return NextResponse.json(
        { error: "Name and trigger are required" },
        { status: 400 }
      )
    }

    const automation = await prisma.automation.create({
      data: {
        userId: session.user.id,
        name,
        description,
        trigger,
        status,
        templateId,
        config,
      },
      include: {
        runs: true,
      },
    })

    // Log audit event
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "automation_created",
        details: { automationId: automation.id, name, trigger },
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      }
    })

    return NextResponse.json({ automation }, { status: 201 })
  } catch (error) {
    console.error("Automation create error:", error)
    return NextResponse.json({ error: "Failed to create automation" }, { status: 500 })
  }
}
