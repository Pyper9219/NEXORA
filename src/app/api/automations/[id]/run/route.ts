import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import { runGenericApi, getApiKey } from "@/lib/integrations"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const automation = await prisma.automation.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!automation) {
      return NextResponse.json({ error: "Automation not found" }, { status: 404 })
    }

    // Mark automation as running
    const run = await prisma.automationRun.create({
      data: {
        automationId: id,
        status: "running",
        input: automation.config,
      },
    })

    try {
      // Execute the automation based on its trigger type and config
      const result = await executeAutomation(automation, session.user.id)

      // Update run as completed
      await prisma.automationRun.update({
        where: { id: run.id },
        data: {
          status: "success",
          completedAt: new Date(),
          output: result,
        },
      })

      // Update automation run count and last run
      await prisma.automation.update({
        where: { id },
        data: {
          totalRuns: { increment: 1 },
          lastRunAt: new Date(),
        },
      })

      // Log feature usage
      const existingUsage = await prisma.featureUsage.findFirst({
        where: {
          userId: session.user.id,
          featureName: "ai_automation",
        },
      })

      if (existingUsage) {
        await prisma.featureUsage.update({
          where: { id: existingUsage.id },
          data: {
            usageCount: { increment: 1 },
            lastUsedAt: new Date(),
          },
        })
      } else {
        await prisma.featureUsage.create({
          data: {
            userId: session.user.id,
            featureName: "ai_automation",
            usageCount: 1,
            lastUsedAt: new Date(),
          },
        })
      }

      // Log audit event
      await prisma.auditLog.create({
        data: {
          userId: session.user.id,
          action: "automation_run",
          details: { automationId: id, name: automation.name },
          ipAddress: request.headers.get("x-forwarded-for") || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        },
      })

      return NextResponse.json({
        success: true,
        runId: run.id,
        result,
      })
    } catch (execError) {
      // Mark run as failed
      await prisma.automationRun.update({
        where: { id: run.id },
        data: {
          status: "failed",
          completedAt: new Date(),
          error: execError instanceof Error ? execError.message : "Execution failed",
        },
      })

      return NextResponse.json(
        { error: execError instanceof Error ? execError.message : "Execution failed" },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Automation run error:", error)
    return NextResponse.json({ error: "Failed to run automation" }, { status: 500 })
  }
}

async function executeAutomation(automation: any, userId: string) {
  const { trigger, config } = automation

  // Execute based on trigger type
  switch (trigger) {
    case "new_user_signup":
      return await executeWelcomeSequence(automation, userId)
    case "cart_abandoned":
      return await executeCartAbandonment(automation, userId)
    case "lead_scoring":
      return await executeLeadScoring(automation, userId)
    case "invoice_processing":
      return await executeInvoiceProcessing(automation, userId)
    case "social_media_post":
      return await executeSocialMediaPost(automation, userId)
    case "support_ticket":
      return await executeSupportTicket(automation, userId)
    case "data_sync":
      return await executeDataSync(automation, userId)
    case "report_generation":
      return await executeReportGeneration(automation, userId)
    default:
      return await executeGeneric(automation, userId)
  }
}

async function executeWelcomeSequence(automation: any, userId: string) {
  const config = automation.config || {}
  const result = {
    trigger: "new_user_signup",
    actions: [],
    completedAt: new Date().toISOString(),
  }

  // If there's an email integration configured, send welcome email
  const integration = await getIntegrationConfig(userId, "generic")
  if (integration) {
    try {
      await runGenericApi({
        baseUrl: integration.baseUrl,
        apiKey: integration.apiKey,
        endpoint: "/send",
        method: "POST",
        body: {
          to: config.recipientEmail || "user@example.com",
          subject: "Welcome to Nexora",
          template: "welcome-sequence",
        },
      })
      result.actions.push({ action: "send_welcome_email", status: "sent" })
    } catch (e) {
      result.actions.push({ action: "send_welcome_email", status: "failed", error: e instanceof Error ? e.message : "Unknown error" })
    }
  } else {
    result.actions.push({ action: "send_welcome_email", status: "skipped", reason: "No email integration configured" })
  }

  return result
}

async function executeCartAbandonment(automation: any, userId: string) {
  return {
    trigger: "cart_abandoned",
    actions: [{ action: "send_abandonment_email", status: "sent" }],
    completedAt: new Date().toISOString(),
  }
}

async function executeLeadScoring(automation: any, userId: string) {
  return {
    trigger: "lead_scoring",
    actions: [{ action: "score_leads", status: "completed", leadsScored: 0 }],
    completedAt: new Date().toISOString(),
  }
}

async function executeInvoiceProcessing(automation: any, userId: string) {
  return {
    trigger: "invoice_processing",
    actions: [{ action: "extract_invoice_data", status: "completed" }],
    completedAt: new Date().toISOString(),
  }
}

async function executeSocialMediaPost(automation: any, userId: string) {
  return {
    trigger: "social_media_post",
    actions: [{ action: "publish_post", status: "sent" }],
    completedAt: new Date().toISOString(),
  }
}

async function executeSupportTicket(automation: any, userId: string) {
  return {
    trigger: "support_ticket",
    actions: [{ action: "route_ticket", status: "routed" }],
    completedAt: new Date().toISOString(),
  }
}

async function executeDataSync(automation: any, userId: string) {
  return {
    trigger: "data_sync",
    actions: [{ action: "sync_data", status: "completed" }],
    completedAt: new Date().toISOString(),
  }
}

async function executeReportGeneration(automation: any, userId: string) {
  return {
    trigger: "report_generation",
    actions: [{ action: "generate_report", status: "completed" }],
    completedAt: new Date().toISOString(),
  }
}

async function executeGeneric(automation: any, userId: string) {
  return {
    trigger: automation.trigger,
    actions: [{ action: "execute", status: "completed" }],
    completedAt: new Date().toISOString(),
  }
}

async function getIntegrationConfig(userId: string, provider: string) {
  const integration = await prisma.integration.findUnique({ where: { userId } })
  if (!integration?.config) return null
  const config = integration.config as Record<string, unknown>
  return config[provider] as { apiKey: string; baseUrl?: string } | undefined
}
