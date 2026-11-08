/**
 * Test an integration connection.
 *
 * POST /api/integrations/test
 * Body: { provider: "apify" | "generic", ...providerConfig }
 *
 * For apify: { actorId: string }
 * For generic: { baseUrl: string, endpoint: string }
 */

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { getApiKey, getUserIntegrations, runApifyActor, runGenericApi } from "@/lib/integrations"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { provider, ...config } = body

    if (!provider || (provider !== "apify" && provider !== "generic")) {
      return NextResponse.json(
        { error: "Provider must be 'apify' or 'generic'" },
        { status: 400 }
      )
    }

    const apiKey = await getApiKey(provider, session.user.id)
    if (!apiKey) {
      return NextResponse.json(
        { error: `No API key stored for ${provider}` },
        { status: 400 }
      )
    }

    if (provider === "apify") {
      const { actorId } = config
      if (!actorId) {
        return NextResponse.json(
          { error: "actorId is required for Apify" },
          { status: 400 }
        )
      }

      // Do a minimal run with empty input to verify the key works
      await runApifyActor({
        apiKey,
        actorId,
        input: {},
      })

      return NextResponse.json({
        success: true,
        provider: "apify",
        actorId,
        message: "Apify connection verified",
      })
    }

    // generic
    const storedList = await getUserIntegrations(session.user.id)
    const stored = storedList.find(
      (i) => i.type === "api_keys" || i.type === "generic"
    )
    const storedConfig = stored?.config as Record<string, unknown> | undefined
    const storedGeneric = storedConfig?.generic as
      | { baseUrl?: string; apiKey?: string }
      | undefined

    const { baseUrl, endpoint = "" } = config
    const resolvedBaseUrl = baseUrl || storedGeneric?.baseUrl
    if (!resolvedBaseUrl) {
      return NextResponse.json(
        { error: "baseUrl is required for generic provider" },
        { status: 400 }
      )
    }

    await runGenericApi({
      baseUrl: resolvedBaseUrl,
      apiKey,
      endpoint,
      method: "GET",
    })

    return NextResponse.json({
      success: true,
      provider: "generic",
      baseUrl,
      message: "Generic API connection verified",
    })
  } catch (error) {
    console.error("Integration test error:", error)
    const message = error instanceof Error ? error.message : "Test failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
