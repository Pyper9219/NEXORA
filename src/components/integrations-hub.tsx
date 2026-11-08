"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

type ProviderConfig = {
  apiKey: string
  baseUrl?: string
  [key: string]: unknown
}

type IntegrationConfig = {
  apify?: ProviderConfig
  generic?: ProviderConfig
  [provider: string]: ProviderConfig | undefined
}

/** Example Apify actors from API-mega-list that are useful for NEXORA */
const EXAMPLE_ACTORS: Array<{
  id: string
  name: string
  description: string
  category: string
  defaultInput: Record<string, unknown>
}> = [
  {
    id: "nexgendata/website-content-crawler",
    name: "Website Content Crawler (RAG)",
    description:
      "Crawl entire websites for clean text/markdown. Perfect for RAG pipelines, AI training, and content analysis.",
    category: "AI / Content",
    defaultInput: { startUrls: [{ url: "https://example.com" }] },
  },
  {
    id: "nexgendata/youtube-transcript-scraper",
    name: "YouTube Transcript Scraper",
    description:
      "Extract full transcripts and captions from YouTube videos. Perfect for content repurposing and SEO.",
    category: "AI / Content",
    defaultInput: { startUrls: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"] },
  },
  {
    id: "berkaydev/google-maps-lead-scraper-emails-contacts",
    name: "Google Maps Lead Scraper",
    description:
      "Scrape Google Maps for any business type worldwide. Get name, address, phone, rating, GPS, and contact email.",
    category: "Lead Generation",
    defaultInput: { search: "coffee shops New York", maxResults: 10 },
  },
  {
    id: "nexgendata/google-search-scraper",
    name: "Google SERP Scraper",
    description:
      "Scrape Google Search results — organic listings, featured snippets, People Also Ask, knowledge panels.",
    category: "SEO / Marketing",
    defaultInput: { query: "NEXORA business growth platform", resultsPerPage: 10 },
  },
  {
    id: "nexgendata/reddit-scraper",
    name: "Reddit Scraper",
    description:
      "Extract posts, comments & subreddit data. Monitor brand mentions and track discussions.",
    category: "Social Media",
    defaultInput: { startUrls: [{ url: "https://www.reddit.com/r/SaaS/" }] },
  },
  {
    id: "easyapi/linkedin-posts-generator",
    name: "LinkedIn Posts Generator",
    description:
      "AI-powered LinkedIn post generation with hooks, CTAs, and hashtags.",
    category: "AI / Content",
    defaultInput: { topic: "business growth automation", tone: "professional" },
  },
  {
    id: "easyapi/any-website-url-to-article-summarizer",
    name: "Article Summarizer",
    description:
      "Transform any article or web content into concise AI-powered summaries.",
    category: "AI / Content",
    defaultInput: { url: "https://example.com" },
  },
]

type Tab = "keys" | "run"

export function IntegrationsHub({
  userId,
  existingConfig,
}: {
  userId: string
  existingConfig: Record<string, unknown> | null
}) {
  const [tab, setTab] = useState<Tab>("keys")
  const [integrations, setIntegrations] = useState<IntegrationConfig | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [runResult, setRunResult] = useState<any>(null)
  const [actorInput, setActorInput] = useState<Record<string, unknown>>({})

  // Provider form state
  const [formProvider, setFormProvider] = useState("apify")
  const [formApiKey, setFormApiKey] = useState("")
  const [formBaseUrl, setFormBaseUrl] = useState("")

  // Run form state
  const [runProvider, setRunProvider] = useState("apify")
  const [selectedActor, setSelectedActor] = useState(EXAMPLE_ACTORS[0])
  const [genericEndpoint, setGenericEndpoint] = useState("")
  const [genericMethod, setGenericMethod] = useState("GET")
  const [genericBody, setGenericBody] = useState("")

  useEffect(() => {
    if (existingConfig) {
      setIntegrations(existingConfig as IntegrationConfig)
      if (existingConfig.apify) setFormApiKey(String((existingConfig.apify as ProviderConfig).apiKey ?? ""))
      if (existingConfig.generic) {
        setFormApiKey(String((existingConfig.generic as ProviderConfig).apiKey ?? ""))
        setFormBaseUrl(String((existingConfig.generic as ProviderConfig).baseUrl ?? ""))
      }
    }
  }, [existingConfig])

  const notify = useCallback((type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const keys: IntegrationConfig = {}
      if (formApiKey.trim()) {
        keys[formProvider] = {
          apiKey: formApiKey.trim(),
          ...(formProvider === "generic" && formBaseUrl.trim() ? { baseUrl: formBaseUrl.trim() } : {}),
        }
      }

      // Merge with existing so we don't wipe other providers
      const current = integrations ?? {}
      const next: IntegrationConfig = { ...current, [formProvider]: keys[formProvider] }

      await fetch("/api/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      })

      setIntegrations(next)
      notify("success", `Integration keys saved for ${formProvider}.`)
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  const handleTest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setTesting(true)
    setMessage(null)

    try {
      const res = await fetch("/api/integrations/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: formProvider }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Test failed")
      notify("success", data.message || "Connection verified")
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Test failed")
    } finally {
      setTesting(false)
    }
  }

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault()
    setRunning(true)
    setMessage(null)
    setRunResult(null)

    try {
      const res = await fetch(`/api/integrations/${runProvider}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          runProvider === "apify"
            ? { actorId: selectedActor.id, input: actorInput }
            : { baseUrl: formBaseUrl, endpoint: genericEndpoint, method: genericMethod, body: genericBody ? JSON.parse(genericBody) : undefined }
        ),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Run failed")
      setRunResult(data)
      notify("success", "API call completed successfully")
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Run failed")
    } finally {
      setRunning(false)
    }
  }

  const maskKey = (key: string): string => {
    if (!key || key.length <= 8) return "••••••••"
    return key.slice(0, 4) + "•".repeat(key.length - 8) + key.slice(-4)
  }

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setTab("keys")}
          className={`px-4 py-2 border-b-2 ${
            tab === "keys" ? "border-violet-500 text-violet-400" : "text-white/50 hover:text-white/70"
          }`}
        >
          API Keys
        </button>
        <button
          onClick={() => setTab("run")}
          className={`px-4 py-2 border-b-2 ${
            tab === "run" ? "border-violet-500 text-violet-400" : "text-white/50 hover:text-white/70"
          }`}
        >
          Run APIs
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tab: Keys */}
      {tab === "keys" && (
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-display font-bold text-white mb-4">
            Stored API Keys
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Keys are stored encrypted at rest and never returned to the browser
            in plain text. Only masked versions are shown below.
          </p>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Provider
                </label>
                <select
                  value={formProvider}
                  onChange={(e) => {
                    setFormProvider(e.target.value as "apify" | "generic")
                    // Prefill from stored config if available
                    const stored = integrations?.[e.target.value as string]
                    if (stored?.apiKey) setFormApiKey(String(stored.apiKey))
                    else setFormApiKey("")
                    if (stored?.baseUrl) setFormBaseUrl(String(stored.baseUrl))
                    else setFormBaseUrl("")
                  }}
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                >
                  <option value="apify">Apify</option>
                  <option value="generic">Generic HTTP API</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={formApiKey}
                  onChange={(e) => setFormApiKey(e.target.value)}
                  placeholder="sk-... or apify_api_key"
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                />
              </div>
              {formProvider === "generic" && (
                <div>
                  <label className="block text-sm text-white/70 mb-1">
                    Base URL
                  </label>
                  <input
                    value={formBaseUrl}
                    onChange={(e) => setFormBaseUrl(e.target.value)}
                    placeholder="https://api.example.com"
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={saving || !formApiKey.trim()}
              className="w-full bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving…" : "Save Integration Keys"}
            </button>

            <button
              type="button"
              onClick={handleTest}
              disabled={testing || !formApiKey.trim()}
              className="w-full mt-2 bg-gray-800 text-white/80 px-6 py-3 rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors border border-white/10"
            >
              {testing ? "Testing…" : "Test Connection"}
            </button>
          </form>

          {/* Stored integrations list */}
          {integrations && Object.keys(integrations).length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-bold text-white/70 mb-3">Configured Providers</h3>
              <div className="space-y-3">
                {Object.entries(integrations).map(([provider, config]) => (
                  <div
                    key={provider}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-white/5"
                  >
                    <div>
                      <p className="font-medium text-white">{provider}</p>
                      <p className="text-xs text-white/50">
                        {config?.apiKey ? `Key: ${maskKey(String(config.apiKey))}` : "No key"}
                      </p>
                      {config.baseUrl && (
                        <p className="text-xs text-white/50">
                          Base URL: {config.baseUrl}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setFormProvider(provider as "apify" | "generic")
                        setFormApiKey(String(config?.apiKey ?? ""))
                        setFormBaseUrl(String(config?.baseUrl ?? ""))
                        setTab("keys")
                      }}
                      className="text-violet-400 text-sm hover:text-violet-300"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Run */}
      {tab === "run" && (
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-display font-bold text-white mb-4">
            Run External APIs
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Call external APIs using your stored keys. Examples below are from
            the <a
              href="https://github.com/cporter202/API-mega-list"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:underline"
            >
              API Mega List
            </a>
            .
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Provider selector + example actors */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <label className="block text-sm text-white/70 mb-1">
                  Provider
                </label>
                <select
                  value={runProvider}
                  onChange={(e) => setRunProvider(e.target.value as "apify" | "generic")}
                  className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                >
                  <option value="apify">Apify Actor</option>
                  <option value="generic">Generic HTTP API</option>
                </select>
              </div>

              {runProvider === "apify" && (
                <div className="space-y-4">
                  <label className="block text-sm text-white/70 mb-2">
                    Example Actors (from API Mega List)
                  </label>
                  {EXAMPLE_ACTORS.map((actor) => (
                    <button
                      key={actor.id}
                      onClick={() => {
                        setSelectedActor(actor)
                        setActorInput({ ...actor.defaultInput })
                      }}
                      className={`w-full p-3 rounded-lg border text-left ${
                        selectedActor.id === actor.id
                          ? "bg-violet-500/10 border-violet-500/50"
                          : "bg-gray-800 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-white">{actor.name}</span>
                        <span className="text-xs text-violet-400">{actor.category}</span>
                      </div>
                      <p className="text-xs text-white/50">{actor.description}</p>
                      <p className="text-xs text-white/40 mt-1">
                        Actor ID: {actor.id}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {runProvider === "generic" && (
                <div className="space-y-4">
                  <label className="block text-sm text-white/70 mb-1">
                    Base URL (stored)
                  </label>
                  <p className="text-xs text-white/50 mb-2">
                    {integrations?.generic?.baseUrl || "Not configured — go to API Keys tab"}
                  </p>
                  <label className="block text-sm text-white/70 mb-1">
                    Endpoint
                  </label>
                  <input
                    value={genericEndpoint}
                    onChange={(e) => setGenericEndpoint(e.target.value)}
                    placeholder="/v1/search?q=..."
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                  />
                  <label className="block text-sm text-white/70 mb-1">
                    Method
                  </label>
                  <select
                    value={genericMethod}
                    onChange={(e) => setGenericMethod(e.target.value as "GET" | "POST")}
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </select>
                  <label className="block text-sm text-white/70 mb-1">
                    Request Body (JSON)
                  </label>
                  <textarea
                    value={genericBody}
                    onChange={(e) => setGenericBody(e.target.value)}
                    rows={4}
                    placeholder='{"key": "value"}'
                    className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              )}
            </div>

            {/* Run form */}
            <div className="lg:col-span-2 space-y-4">
              {runProvider === "apify" && (
                <>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-white/5">
                    <label className="block text-sm text-white/70 mb-1">
                      Actor ID
                    </label>
                    <p className="text-sm text-white font-mono mb-2">
                      {selectedActor.id}
                    </p>
                    <label className="block text-sm text-white/70 mb-1">
                      Input (JSON)
                    </label>
                    <textarea
                      value={JSON.stringify(actorInput, null, 2)}
                      onChange={(e) => {
                        try {
                          setActorInput(JSON.parse(e.target.value))
                        } catch {
                          // ignore invalid JSON while typing
                        }
                      }}
                      rows={8}
                      className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-violet-500"
                    />
                  </div>

                  <button
                    onClick={handleRun}
                    disabled={running}
                    className="w-full bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 disabled:opacity-50 transition-colors"
                  >
                    {running ? "Running…" : "Run Apify Actor"}
                  </button>
                </>
              )}

              {runProvider === "generic" && (
                <button
                  onClick={handleRun}
                  disabled={running}
                  className="w-full bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 disabled:opacity-50 transition-colors"
                >
                  {running ? "Running…" : "Call API Endpoint"}
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {runResult && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-white/70 mb-3">Results</h3>
              <div className="bg-gray-900 rounded-xl p-4 border border-white/5 overflow-x-auto">
                <pre className="text-xs text-green-400 font-mono overflow-auto">
                  {JSON.stringify(runResult, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
