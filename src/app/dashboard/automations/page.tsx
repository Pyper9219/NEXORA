"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"

type Automation = {
  id: string
  name: string
  description: string | null
  trigger: string
  status: string
  templateId: string | null
  config: any
  totalRuns: number
  lastRunAt: string | null
  createdAt: string
  updatedAt: string
  runs: Array<{
    id: string
    status: string
    startedAt: string
    completedAt: string | null
    durationMs: number | null
    error: string | null
  }>
}

type Template = {
  id: string
  name: string
  description: string
  category: string
  icon: string
  difficulty: string
  estimatedTime: string
  trigger: string
}

const automationTemplates: Template[] = [
  {
    id: "welcome-sequence",
    name: "Welcome Email Sequence",
    description: "Automatically send a series of onboarding emails to new users",
    category: "Email Marketing",
    icon: "📧",
    difficulty: "Easy",
    estimatedTime: "5 min",
    trigger: "new_user_signup",
  },
  {
    id: "cart-abandonment",
    name: "Cart Abandonment Recovery",
    description: "Recover lost sales with automated follow-up emails and SMS",
    category: "E-Commerce",
    icon: "🛒",
    difficulty: "Medium",
    estimatedTime: "15 min",
    trigger: "cart_abandoned",
  },
  {
    id: "lead-scoring",
    name: "Lead Scoring & Qualification",
    description: "Automatically score and qualify leads based on behavior",
    category: "Sales",
    icon: "🎯",
    difficulty: "Medium",
    estimatedTime: "10 min",
    trigger: "lead_scoring",
  },
  {
    id: "invoice-processing",
    name: "Invoice Processing",
    description: "Extract data from invoices and sync to accounting software",
    category: "Finance",
    icon: "📄",
    difficulty: "Hard",
    estimatedTime: "30 min",
    trigger: "invoice_processing",
  },
  {
    id: "social-scheduling",
    name: "Social Media Scheduler",
    description: "Schedule and publish posts across multiple platforms",
    category: "Marketing",
    icon: "📱",
    difficulty: "Easy",
    estimatedTime: "10 min",
    trigger: "social_media_post",
  },
  {
    id: "customer-support",
    name: "Support Ticket Routing",
    description: "Automatically route support tickets to the right team",
    category: "Support",
    icon: "🎧",
    difficulty: "Medium",
    estimatedTime: "15 min",
    trigger: "support_ticket",
  },
  {
    id: "data-sync",
    name: "CRM Data Sync",
    description: "Keep customer data synchronized across all tools",
    category: "Operations",
    icon: "🔄",
    difficulty: "Easy",
    estimatedTime: "5 min",
    trigger: "data_sync",
  },
  {
    id: "report-generation",
    name: "Automated Reports",
    description: "Generate and deliver weekly/monthly reports automatically",
    category: "Analytics",
    icon: "📊",
    difficulty: "Medium",
    estimatedTime: "10 min",
    trigger: "report_generation",
  },
]

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  draft: "bg-gray-500/20 text-gray-400 border-gray-500/30",
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  Hard: "bg-red-500/20 text-red-400",
}

type Tab = "my" | "templates"

export default function AutomationsPage() {
  const { data: session } = useSession()
  const [tab, setTab] = useState<Tab>("my")
  const [automations, setAutomations] = useState<Automation[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [running, setRunning] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    fetchAutomations()
  }, [])

  const fetchAutomations = async () => {
    try {
      const res = await fetch("/api/automations")
      const data = await res.json()
      setAutomations(data.automations || [])
    } catch (err) {
      console.error("Failed to fetch automations:", err)
    } finally {
      setLoading(false)
    }
  }

  const notify = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleCreateFromTemplate = async (template: Template) => {
    try {
      const res = await fetch("/api/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: template.name,
          description: template.description,
          trigger: template.trigger,
          status: "draft",
          templateId: template.id,
          config: { templateId: template.id, steps: [] },
        }),
      })
      if (!res.ok) throw new Error("Failed to create automation")
      await fetchAutomations()
      setTab("my")
      notify("success", `Automation "${template.name}" created!`)
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Failed to create automation")
    }
  }

  const handleRun = async (automationId: string) => {
    setRunning(automationId)
    try {
      const res = await fetch(`/api/automations/${automationId}/run`, {
        method: "POST",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Run failed")
      await fetchAutomations()
      notify("success", "Automation executed successfully!")
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Run failed")
    } finally {
      setRunning(null)
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const res = await fetch(`/api/automations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus === "active" ? "paused" : "active" }),
      })
      if (!res.ok) throw new Error("Failed to update")
      await fetchAutomations()
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Failed to update automation")
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this automation?")) return
    try {
      const res = await fetch(`/api/automations/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      await fetchAutomations()
      notify("success", "Automation deleted")
    } catch (err) {
      notify("error", err instanceof Error ? err.message : "Failed to delete automation")
    }
  }

  const totalRuns = automations.reduce((sum, a) => sum + a.totalRuns, 0)
  const successfulRuns = automations.reduce(
    (sum, a) => sum + a.runs.filter((r) => r.status === "success").length,
    0
  )


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Automations</h1>
          <p className="text-white/50 mt-1">Build and manage your automated workflows</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setTab("templates")}
            className={`px-4 py-2 border border-white/10 rounded-lg text-sm font-medium transition-colors ${
              tab === "templates" ? "bg-violet-600 text-white" : "text-white/50 hover:text-white/70 hover:border-white/20"
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setTab("my")}
            className={`px-4 py-2 border border-white/10 rounded-lg text-sm font-medium transition-colors ${
              tab === "my" ? "bg-violet-600 text-white" : "text-white/50 hover:text-white/70 hover:border-white/20"
            }`}
          >
            My Automations
          </button>
        </div>
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

      {/* Tab: My Automations */}
      {tab === "my" && (
        <>
          {/* Usage Bar */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/50 text-sm">Monthly Automation Runs</p>
                <p className="text-2xl font-display font-bold text-white">
                  {totalRuns.toLocaleString()}
                </p>
              </div>
              <div className="w-48 h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalRuns / 100) * 100, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-white/50 text-sm">
              {successfulRuns} of {totalRuns} runs successful
            </p>
          </div>

          {/* My Automations List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">My Automations</h2>
            </div>

            {automations.length === 0 ? (
              <div className="text-center py-12 bg-gray-900/50 rounded-2xl border border-white/10 border-dashed">
                <span className="text-6xl mb-4 block">⚙️</span>
                <h3 className="text-xl font-display font-bold text-white mb-2">No automations yet</h3>
                <p className="text-white/50 mb-6 max-w-md mx-auto">
                  Create your first automation from the Templates tab to start saving time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {automations.map((auto) => (
                  <AutomationCard
                    key={auto.id}
                    automation={auto}
                    onRun={handleRun}
                    onToggle={handleToggleStatus}
                    onDelete={handleDelete}
                    isRunning={running === auto.id}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Tab: Templates */}
      {tab === "templates" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-white">Automation Templates</h2>
            <p className="text-white/50 text-sm">
              Get started quickly with pre-built automation templates
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {automationTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={handleCreateFromTemplate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AutomationCard({
  automation,
  onRun,
  onToggle,
  onDelete,
  isRunning,
}: {
  automation: Automation
  onRun: (id: string) => void
  onToggle: (id: string, status: string) => void
  onDelete: (id: string) => void
  isRunning: boolean
}) {
  const lastRun = automation.runs[0]

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-display font-bold text-white">{automation.name}</h3>
          <p className="text-white/50 text-sm mt-1">{automation.trigger}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[automation.status]}`}>
          {automation.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-white/50 text-xs">Total Runs</p>
          <p className="text-white font-bold">{automation.totalRuns.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-white/50 text-xs">Last Run</p>
          <p className="text-white font-medium">
            {lastRun ? new Date(lastRun.startedAt).toLocaleDateString() : "Never"}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onRun(automation.id)}
          disabled={isRunning}
          className="flex-1 bg-violet-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? "Running…" : "Run"}
        </button>
        <button
          onClick={() => onToggle(automation.id, automation.status)}
          className="flex-1 border-2 border-white/20 text-white/70 px-3 py-2 rounded-lg text-sm font-medium hover:border-violet-400 hover:text-violet-400 transition-colors"
        >
          {automation.status === "active" ? "Pause" : "Activate"}
        </button>
        <button
          onClick={() => onDelete(automation.id)}
          className="flex-1 border-2 border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-500/10 transition-colors"
        >
          Delete
        </button>
      </div>

      {lastRun && (
        <div className="mt-4 p-3 rounded-lg bg-gray-800/30 border border-white/5">
          <p className="text-xs text-white/50">Last run: {lastRun.status}</p>
          {lastRun.error && (
            <p className="text-xs text-red-400 mt-1">{lastRun.error}</p>
          )}
        </div>
      )}
    </div>
  )
}

function TemplateCard({
  template,
  onUse,
}: {
  template: Template
  onUse: (template: Template) => void
}) {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-colors group">
      <div className="text-4xl mb-4">{template.icon}</div>
      <h3 className="text-lg font-display font-bold text-white mb-2">{template.name}</h3>
      <p className="text-white/50 text-sm mb-4">{template.description}</p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-white/50 text-xs">{template.category}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[template.difficulty]}`}>
          {template.difficulty}
        </span>
      </div>

      <button
        onClick={() => onUse(template)}
        className="w-full py-3 rounded-lg border border-violet-500/50 bg-violet-600/10 text-violet-400 text-sm font-medium hover:bg-violet-600/20 hover:text-violet-300 transition-colors"
      >
        Use Template →
      </button>
    </div>
  )
}


