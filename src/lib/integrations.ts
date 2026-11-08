/**
 * NEXORA Integration Layer
 *
 * Connects NEXORA to external APIs from the API Mega List
 * (https://github.com/cporter202/API-mega-list).
 *
 * Supported invocation patterns:
 * 1. Apify actors — the majority of entries in API-mega-list are Apify actors.
 *    We start an actor run, poll for completion, and return dataset items.
 * 2. Generic HTTP — any REST API that accepts a Bearer token or API key header.
 *
 * API keys are stored per-user in the Prisma `Integration` model (config JSON
 * column). Keys are never returned to the client — only masked prefixes are
 * shown in the UI.
 */

import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"

/** Providers we know how to invoke. Add more here as needed. */
export type IntegrationProvider = "apify" | "generic"

export interface StoredProviderConfig {
  apiKey: string
  baseUrl?: string
  [key: string]: unknown
}

export interface IntegrationConfig {
  apify?: StoredProviderConfig
  generic?: StoredProviderConfig
  [provider: string]: StoredProviderConfig | undefined
}

export interface StoredIntegration {
  id: string
  type: string
  config: IntegrationConfig | null
  isActive: boolean
  updatedAt: Date
}

/** Mask an API key for display (show first 4 + last 4 chars). */
export function maskKey(key: string): string {
  if (!key || key.length <= 8) return "••••••••"
  return key.slice(0, 4) + "•".repeat(key.length - 8) + key.slice(-4)
}

/** Get all integrations for a user (config is included for server-side use). */
export async function getUserIntegrations(userId: string): Promise<StoredIntegration[]> {
  const row = await prisma.integration.findUnique({ where: { userId } })
  if (!row) return []
  return [
    {
      id: row.id,
      type: row.type,
      config: (row.config as IntegrationConfig) ?? null,
      isActive: row.isActive,
      updatedAt: row.updatedAt,
    },
  ]
}

/** Save (upsert) integration keys for a user. */
export async function saveIntegrationKeys(
  userId: string,
  keys: IntegrationConfig
): Promise<void> {
  const existing = await prisma.integration.findUnique({ where: { userId } })

  if (existing) {
    await prisma.integration.update({
      where: { userId },
      data: {
        config: keys as unknown as Prisma.InputJsonValue,
        isActive: true,
        updatedAt: new Date(),
      },
    })
  } else {
    await prisma.integration.create({
      data: {
        userId,
        type: "api_keys",
        config: keys as unknown as Prisma.InputJsonValue,
        isActive: true,
      },
    })
  }
}

/** Retrieve a single provider's API key for a user. */
export async function getApiKey(
  provider: string,
  userId: string
): Promise<string | null> {
  const row = await prisma.integration.findUnique({ where: { userId } })
  if (!row?.config) return null
  const config = row.config as Record<string, unknown>
  const providerConfig = config[provider] as StoredProviderConfig | undefined
  return providerConfig?.apiKey ?? null
}

/* ------------------------------------------------------------------ */
/* Apify runner                                                       */
/* ------------------------------------------------------------------ */

/** Start an Apify actor run, poll until done, return dataset items. */
export async function runApifyActor({
  apiKey,
  actorId,
  input,
}: {
  apiKey: string
  actorId: string
  input: Record<string, unknown>
}) {
  const base = "https://api.apify.com/v2"

  const runRes = await fetch(
    `${base}/acts/${encodeURIComponent(actorId)}/runs?token=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }
  )

  if (!runRes.ok) {
    const text = await runRes.text()
    throw new Error(`Apify start failed (${runRes.status}): ${text}`)
  }

  const runData = await runRes.json()
  const runId = runData.data.id

  // Poll for completion — max ~30 seconds
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 1000))
    const statusRes = await fetch(
      `${base}/acts/${encodeURIComponent(actorId)}/runs/${runId}?token=${apiKey}`
    )
    const statusData = await statusRes.json()
    const status = statusData.data.status

    if (status === "SUCCEEDED") {
      const itemsRes = await fetch(
        `${base}/acts/${encodeURIComponent(actorId)}/runs/${runId}/dataset/items?token=${apiKey}`
      )
      const items = await itemsRes.json()
      return { status: "completed", runId, items }
    }
    if (status === "FAILED" || status === "ABORTED" || status === "TIMED-OUT") {
      throw new Error(`Apify run ${status.toLowerCase()}`)
    }
  }

  throw new Error("Apify run timed out")
}

/* ------------------------------------------------------------------ */
/* Generic HTTP runner                                                */
/* ------------------------------------------------------------------ */

export async function runGenericApi({
  baseUrl,
  apiKey,
  endpoint,
  method = "GET",
  body,
  headers,
}: {
  baseUrl: string
  apiKey: string
  endpoint: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: Record<string, unknown>
  headers?: Record<string, string>
}) {
  const url = baseUrl.endsWith("/") ? baseUrl + endpoint : baseUrl + "/" + endpoint

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...headers,
    },
    body: method === "POST" || method === "PUT" ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Generic API failed (${res.status}): ${text}`)
  }

  const contentType = res.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return res.json()
  }
  return res.text()
}
