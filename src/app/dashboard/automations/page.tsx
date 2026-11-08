import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

async function getAutomationsData(userId: string) {
  const [featureUsage, subscription] = await Promise.all([
    prisma.featureUsage.findMany({
      where: { userId },
      orderBy: { usageCount: "desc" }
    }),
    prisma.subscription.findUnique({
      where: { userId }
    })
  ])

  return { featureUsage, subscription }
}

const automationTemplates = [
  {
    id: "welcome-sequence",
    name: "Welcome Email Sequence",
    description: "Automatically send a series of onboarding emails to new users",
    category: "Email Marketing",
    icon: "📧",
    difficulty: "Easy",
    estimatedTime: "5 min",
  },
  {
    id: "cart-abandonment",
    name: "Cart Abandonment Recovery",
    description: "Recover lost sales with automated follow-up emails and SMS",
    category: "E-Commerce",
    icon: "🛒",
    difficulty: "Medium",
    estimatedTime: "15 min",
  },
  {
    id: "lead-scoring",
    name: "Lead Scoring & Qualification",
    description: "Automatically score and qualify leads based on behavior",
    category: "Sales",
    icon: "🎯",
    difficulty: "Medium",
    estimatedTime: "10 min",
  },
  {
    id: "invoice-processing",
    name: "Invoice Processing",
    description: "Extract data from invoices and sync to accounting software",
    category: "Finance",
    icon: "📄",
    difficulty: "Hard",
    estimatedTime: "30 min",
  },
  {
    id: "social-scheduling",
    name: "Social Media Scheduler",
    description: "Schedule and publish posts across multiple platforms",
    category: "Marketing",
    icon: "📱",
    difficulty: "Easy",
    estimatedTime: "10 min",
  },
  {
    id: "customer-support",
    name: "Support Ticket Routing",
    description: "Automatically route support tickets to the right team",
    category: "Support",
    icon: "🎧",
    difficulty: "Medium",
    estimatedTime: "15 min",
  },
  {
    id: "data-sync",
    name: "CRM Data Sync",
    description: "Keep customer data synchronized across all tools",
    category: "Operations",
    icon: "🔄",
    difficulty: "Easy",
    estimatedTime: "5 min",
  },
  {
    id: "report-generation",
    name: "Automated Reports",
    description: "Generate and deliver weekly/monthly reports automatically",
    category: "Analytics",
    icon: "📊",
    difficulty: "Medium",
    estimatedTime: "10 min",
  },
]

export default async function AutomationsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const { featureUsage, subscription } = await getAutomationsData(session.user.id)
  const totalRuns = featureUsage.reduce((sum, f) => sum + f.usageCount, 0)

  const planLimits: Record<string, number> = {
    starter: 100,
    growth: 500,
    pro: 1000,
    enterprise: 10000,
  }
  const limit = planLimits[subscription?.plan || "starter"] || 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Automations</h1>
          <p className="text-white/50 mt-1">Build and manage your automated workflows</p>
        </div>
        <Link
          href="/dashboard/automations#templates"
          className="bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 transition-colors flex items-center gap-2"
        >
          <span>+</span>
          Create Automation
        </Link>
      </div>

      {/* Usage Bar */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/50 text-sm">Monthly Automation Runs</p>
            <p className="text-2xl font-display font-bold text-white">{totalRuns.toLocaleString()} / {limit.toLocaleString()}</p>
          </div>
          <div className="w-48 h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalRuns / limit) * 100, 100)}%` }}
            />
          </div>
        </div>
        <p className="text-white/50 text-sm">
          {subscription?.plan === "starter" && totalRuns > limit * 0.8 && (
            <span className="text-yellow-400">⚠️ You're approaching your limit. Consider upgrading for more runs.</span>
          )}
          {subscription?.plan === "starter" && totalRuns <= limit * 0.8 && (
            <span>{limit - totalRuns} runs remaining this period</span>
          )}
          {subscription?.plan !== "starter" && (
            <span>Unlimited runs on {subscription?.plan} plan</span>
          )}
        </p>
      </div>

      {/* My Automations */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">My Automations</h2>
          <select className="bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Welcome Email Sequence", status: "active", runs: 1247, lastRun: "2 hours ago", trigger: "New user signup" },
            { name: "Cart Abandonment Recovery", status: "active", runs: 892, lastRun: "30 min ago", trigger: "Cart abandoned" },
            { name: "Lead Scoring", status: "paused", runs: 456, lastRun: "3 days ago", trigger: "Form submission" },
            { name: "Weekly Report Generation", status: "active", runs: 12, lastRun: "1 day ago", trigger: "Schedule (Mondays)" },
          ].map((auto, i) => (
            <AutomationCard key={i} automation={auto} />
          ))}
        </div>

        {featureUsage.length === 0 && (
          <div className="text-center py-12 bg-gray-900/50 rounded-2xl border border-white/10 border-dashed">
            <span className="text-6xl mb-4 block">⚙️</span>
            <h3 className="text-xl font-display font-bold text-white mb-2">No automations yet</h3>
            <p className="text-white/50 mb-6 max-w-md mx-auto">
              Create your first automation to start saving time and scaling your operations.
            </p>
            <Link
              href="/dashboard/automations#templates"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 transition-colors"
            >
              Create Your First Automation
            </Link>
          </div>
        )}
      </div>

      {/* Template Library */}
      <div id="templates" className="scroll-mt-24">
        <h2 className="text-xl font-display font-bold text-white mb-6">Automation Templates</h2>
        <p className="text-white/50 mb-6">Get started quickly with pre-built automation templates</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {automationTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AutomationCard({ automation }: { automation: any }) {
  const statusColors: Record<string, string> = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    draft: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

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
          <p className="text-white font-bold">{automation.runs.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-white/50 text-xs">Last Run</p>
          <p className="text-white font-medium">{automation.lastRun}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 border-2 border-white/20 text-white/70 px-3 py-2 rounded-lg text-sm font-medium hover:border-violet-400 hover:text-violet-400 transition-colors">
          Edit
        </button>
        <button className="flex-1 border-2 border-white/20 text-white/70 px-3 py-2 rounded-lg text-sm font-medium hover:border-violet-400 hover:text-violet-400 transition-colors">
          View Runs
        </button>
      </div>
    </div>
  )
}

function TemplateCard({ template }: { template: any }) {
  const difficultyColors: Record<string, string> = {
    Easy: "bg-green-500/20 text-green-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Hard: "bg-red-500/20 text-red-400",
  }

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

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-white/50 text-sm">{template.estimatedTime} setup</span>
        <button className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors">
          Use Template →
        </button>
      </div>
    </div>
  )
}
