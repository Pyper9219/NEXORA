import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

async function getDashboardData(userId: string) {
  const [subscription, recentActivity, featureUsage] = await Promise.all([
    prisma.subscription.findUnique({
      where: { userId },
      include: { user: true }
    }),
    prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10
    }),
    prisma.featureUsage.findMany({
      where: { userId },
      orderBy: { usageCount: "desc" }
    })
  ])

  return { subscription, recentActivity, featureUsage }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const { subscription, recentActivity, featureUsage } = await getDashboardData(session.user.id)

  const planLabels: Record<string, string> = {
    starter: "Starter",
    growth: "Growth",
    pro: "Pro",
    enterprise: "Enterprise",
  }

  const statusColors: Record<string, string> = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    canceled: "bg-red-500/20 text-red-400 border-red-500/30",
    past_due: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    incomplete: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const currentPlan = subscription?.plan || "starter"
  const planLabel = planLabels[currentPlan] || currentPlan
  const statusColor = statusColors[subscription?.status || "inactive"] || statusColors.canceled

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">
            Welcome back, {session.user.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-white/50 mt-1">Here's what's happening with your account.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/automations"
            className="bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 transition-colors"
          >
            Create Automation
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Automations Run"
          value="1,234"
          change="+12%"
          changeLabel="vs last month"
          icon="⚙️"
        />
        <StatCard
          title="Time Saved"
          value="48 hrs"
          change="+8%"
          changeLabel="vs last month"
          icon="⏱️"
        />
        <StatCard
          title="Tasks Completed"
          value="2,891"
          change="+23%"
          changeLabel="vs last month"
          icon="✅"
        />
        <StatCard
          title="ROI Increase"
          value="247%"
          change="+15%"
          changeLabel="vs last month"
          icon="📈"
        />
      </div>

      {/* Subscription Status & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="lg:col-span-2 bg-gray-900/50 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-white">Current Plan</h2>
            <Link
              href="/dashboard/billing"
              className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors"
            >
              Manage Billing →
            </Link>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/50 text-sm">Current Plan</p>
                <p className="text-3xl font-display font-bold text-white">{planLabel}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                {subscription?.status || "inactive"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-white/50 text-sm">Billing Cycle</p>
                <p className="text-white font-medium">
                  {subscription?.currentPeriodEnd 
                    ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-white/50 text-sm">Next Payment</p>
                <p className="text-white font-medium">
                  {subscription?.currentPeriodEnd 
                    ? `$${subscription.plan === "starter" ? "29" : subscription.plan === "growth" ? "79" : subscription.plan === "pro" ? "159" : "Custom"}`
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/dashboard/billing"
                className="flex-1 bg-violet-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-violet-500 transition-colors"
              >
                Manage Subscription
              </Link>
              <Link
                href="/pricing"
                className="flex-1 border-2 border-violet-400 text-violet-400 px-4 py-2 rounded-lg text-center font-medium hover:bg-violet-600/20 transition-colors"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-display font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/automations/new"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-violet-500/10 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-xl">⚙️</span>
              <div>
                <p className="text-white font-medium">Create Automation</p>
                <p className="text-white/50 text-sm">Build a new workflow</p>
              </div>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-violet-500/10 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-xl">📊</span>
              <div>
                <p className="text-white font-medium">View Analytics</p>
                <p className="text-white/50 text-sm">Track performance</p>
              </div>
            </Link>
            <Link
              href="/dashboard/team"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-violet-500/10 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl">👥</span>
              <div>
                <p className="text-white font-medium">Invite Team</p>
                <p className="text-white/50 text-sm">Add team members</p>
              </div>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-violet-500/10 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center text-gray-400 text-xl">⚙️</span>
              <div>
                <p className="text-white font-medium">Settings</p>
                <p className="text-white/50 text-sm">Configure preferences</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity & Feature Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-white">Recent Activity</h2>
            <Link
              href="/dashboard/activity"
              className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors"
            >
              View All →
            </Link>
          </div>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/50">No recent activity</p>
              <p className="text-white/30 text-sm mt-1">Activity will appear here as you use Nexora</p>
            </div>
          )}
        </div>

        {/* Most Used Features */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-display font-bold text-white mb-6">Most Used Features</h2>
          
          {featureUsage.length > 0 ? (
            <div className="space-y-4">
              {featureUsage.slice(0, 5).map((feature) => (
                <FeatureUsageItem key={feature.id} feature={feature} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/50">No feature usage yet</p>
              <p className="text-white/30 text-sm mt-1">Start using features to see analytics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, changeLabel, icon }: {
  title: string
  value: string
  change: string
  changeLabel: string
  icon: string
}) {
  const isPositive = change.startsWith("+")
  
  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-sm font-medium">{title}</p>
          <p className="text-3xl font-display font-bold text-white mt-1">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      <div className="mt-4 flex items-center gap-1">
        <span className={`text-sm font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {change}
        </span>
        <span className="text-white/50 text-sm">{changeLabel}</span>
      </div>
    </div>
  )
}

function ActivityItem({ activity }: { activity: any }) {
  const actionLabels: Record<string, string> = {
    login: "Logged in",
    signup: "Signed up",
    plan_change: "Changed plan",
    payment: "Payment processed",
    feature_use: "Used feature",
    subscription_created: "Started subscription",
    subscription_updated: "Updated subscription",
    subscription_canceled: "Canceled subscription",
    payment_succeeded: "Payment succeeded",
    payment_failed: "Payment failed",
  }

  const actionLabel = actionLabels[activity.action] || activity.action
  const timeAgo = formatTimeAgo(new Date(activity.createdAt))

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-white/5 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{actionLabel}</p>
        <p className="text-white/50 text-sm truncate">{timeAgo}</p>
      </div>
    </div>
  )
}

function FeatureUsageItem({ feature }: { feature: any }) {
  const featureLabels: Record<string, string> = {
    ai_automation: "AI Automation",
    predictive_analytics: "Predictive Analytics",
    email_marketing: "Email Marketing",
    multi_channel: "Multi-Channel",
    team_collaboration: "Team Collaboration",
    custom_integrations: "Custom Integrations",
  }

  const label = featureLabels[feature.featureName] || feature.featureName

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <p className="text-white font-medium">{label}</p>
          <p className="text-white/50 text-sm">Last used {formatTimeAgo(feature.lastUsedAt || new Date())}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-bold">{feature.usageCount}</p>
        <p className="text-white/50 text-xs">uses</p>
      </div>
    </div>
  )
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}
