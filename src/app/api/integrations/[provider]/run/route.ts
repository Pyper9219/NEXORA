/**
 * Run an external API call using a stored integration key.
 *
 * POST /api/integrations/[provider]/run
 * Body:
 *   For apify:   { actorId: string, input: Record<string, unknown> }
 *   For generic: { baseUrl: string, endpoint: string, method?: "GET"|"POST", body?: any, headers?: any }
 *
 * If baseUrl/actorId are omitted, the stored config values are used.
 */

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { getApiKey, getUserIntegrations, runApifyActor, runGenericApi } from "@/lib/integrations"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { provider } = await params
    if (provider !== "apify" && provider !== "generic") {
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

    const body = await request.json()

    if (provider === "apify") {
      const { actorId, input = {} } = body
      if (!actorId) {
        return NextResponse.json(
          { error: "actorId is required" },
          { status: 400 }
        )
      }

      const result = await runApifyActor({
        apiKey,
        actorId,
        input,
      })

      return NextResponse.json({
        success: true,
        provider: "apify",
        actorId,
        ...result,
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

    const { baseUrl, endpoint = "", method = "GET", body: reqBody, headers } = body
    const resolvedBaseUrl = baseUrl || storedGeneric?.baseUrl
    if (!resolvedBaseUrl) {
      return NextResponse.json(
        { error: "baseUrl is required" },
        { status: 400 }
      )
    }

    const result = await runGenericApi({
      baseUrl: resolvedBaseUrl,
      apiKey,
      endpoint,
      method,
      body: reqBody,
      headers,
    })

    return NextResponse.json({
      success: true,
      provider: "generic",
      baseUrl: resolvedBaseUrl,
      endpoint,
      data: result,
    })
  } catch (error) {
    console.error("Integration run error:", error)
    const message = error instanceof Error ? error.message : "Run failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
