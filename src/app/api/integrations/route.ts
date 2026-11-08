/**
 * Integration key management.
 *
 * GET    /api/integrations          — list stored integrations (keys masked)
 * POST   /api/integrations          — save / upsert integration keys
 * Body: { apify?: { apiKey }, generic?: { apiKey, baseUrl }, ... }
 */

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { saveIntegrationKeys, getUserIntegrations, maskKey } from "@/lib/integrations"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const integrations = await getUserIntegrations(session.user.id)

    // Mask keys before sending to client
    const masked = integrations.map((integration) => {
      if (!integration.config) return integration
      const config: Record<string, unknown> = {}
      for (const [provider, providerConfig] of Object.entries(
        integration.config
      )) {
        if (providerConfig && typeof providerConfig === "object") {
          const pc = providerConfig as Record<string, unknown>
          config[provider] = {
            ...pc,
            apiKey: pc.apiKey ? maskKey(String(pc.apiKey)) : null,
          }
        }
      }
      return { ...integration, config }
    })

    return NextResponse.json({ integrations: masked })
  } catch (error) {
    console.error("Integration list error:", error)
    return NextResponse.json(
      { error: "Failed to load integrations" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { ...keys } = body

    // Validate: at least one provider with an apiKey
    const hasKey = Object.values(keys).some(
      (v) => v && typeof v === "object" && (v as Record<string, string>).apiKey
    )
    if (!hasKey) {
      return NextResponse.json(
        { error: "At least one provider API key is required" },
        { status: 400 }
      )
    }

    await saveIntegrationKeys(session.user.id, keys)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Integration save error:", error)
    return NextResponse.json(
      { error: "Failed to save integrations" },
      { status: 500 }
    )
  }
}
