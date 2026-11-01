import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

async function getAnalyticsData(userId: string) {
  const [featureUsage, recentActivity, subscription] = await Promise.all([
    prisma.featureUsage.findMany({
      where: { userId },
      orderBy: { usageCount: "desc" }
    }),
    prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50
    }),
    prisma.subscription.findUnique({
      where: { userId }
    })
  ])

  return { featureUsage, recentActivity, subscription }
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return null
  }

  const { featureUsage, recentActivity, subscription } = await getAnalyticsData(session.user.id)

  const totalAutomations = featureUsage.reduce((sum, f) => sum + f.usageCount, 0)
  const activeFeatures = featureUsage.filter(f => f.usageCount > 0).length
  const lastWeekActivity = recentActivity.filter(a => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return new Date(a.createdAt) > weekAgo
  }).length

  const planLimits: Record<string, number> = {
    starter: 100,
    growth: 500,
    pro: 1000,
    enterprise: 10000,
  }
  const limit = planLimits[subscription?.plan || "starter"] || 100
  const usagePercent = Math.min((totalAutomations / limit) * 100, 100)

  const featureLabels: Record<string, string> = {
    ai_automation: "AI Automation",
    predictive_analytics: "Predictive Analytics",
    email_marketing: "Email Marketing",
    multi_channel: "Multi-Channel",
    team_collaboration: "Team Collaboration",
    custom_integrations: "Custom Integrations",
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Analytics</h1>
          <p className="text-white/50 mt-1">Track your automation performance and usage</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="7d">Last 7 days</option>
            <option value="30d" selected>Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-500 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Automations" value={totalAutomations.toLocaleString()} change="+12% from last month" icon="⚙️" />
        <StatCard title="Active Features" value={`${activeFeatures}/6`} change={activeFeatures === 6 ? "All features active" : `${6 - activeFeatures} unused`} icon="📊" />
        <StatCard title="Weekly Activity" value={lastWeekActivity} change="+8% from last week" icon="📈" />
        <StatCard title="Plan Usage" value={`${totalAutomations}/${limit}`} change={`${usagePercent.toFixed(1)}% of limit`} icon="📦" progress={usagePercent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-display font-bold text-white mb-6">Automation Runs Over Time</h2>
          <div className="h-64 flex items-end justify-around gap-2 px-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-violet-500/50 rounded-t transition-all hover:bg-violet-500" style={{ height: `${Math.random() * 80 + 20}%` }} />
                <span className="text-white/50 text-xs mt-2">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-display font-bold text-white mb-6">Feature Usage</h2>
          <div className="space-y-4">
            {featureUsage.length > 0 ? (
              featureUsage.map((feature) => (
                <FeatureUsageBar key={feature.id} label={featureLabels[feature.featureName] || feature.featureName} value={feature.usageCount} max={Math.max(...featureUsage.map(f => f.usageCount), 1)} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-white/50">No feature usage data yet</p>
                <p className="text-white/30 text-sm mt-1">Start using features to see analytics</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">Recent Activity</h2>
          <select className="bg-gray-800/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="all">All Activity</option>
            <option value="automations">Automations</option>
            <option value="payments">Payments</option>
            <option value="settings">Settings</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Time</th>
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Action</th>
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Details</th>
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.slice(0, 20).map((activity) => (
                <tr key={activity.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-white/70 text-sm">{formatDate(new Date(activity.createdAt))}</td>
                  <td className="py-4 px-4 text-white text-sm"><span className="capitalize">{activity.action.replace(/_/g, " ")}</span></td>
                  <td className="py-4 px-4 text-white/50 text-sm max-w-xs truncate">{activity.details ? JSON.stringify(activity.details).substring(0, 50) + "..." : "—"}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.action.includes("failed") ? "bg-red-500/20 text-red-400" : activity.action.includes("canceled") ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>
                      {activity.action.includes("failed") ? "Failed" : activity.action.includes("canceled") ? "Canceled" : "Success"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentActivity.length === 0 && <div className="text-center py-8"><p className="text-white/50">No activity recorded yet</p></div>}
      </div>
    </div>
  )
}

function StatCard({ title, value, change, icon, progress }: { title: string; value: string | number; change: string; icon: string; progress?: number }) {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-sm font-medium">{title}</p>
          <p className="text-3xl font-display font-bold text-white mt-1">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      {progress !== undefined && <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} /></div>}
      <p className="mt-3 text-white/50 text-sm">{change}</p>
    </div>
  )
}

function FeatureUsageBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = max > 0 ? (value / max) * 100 : 0
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{label}</span>
        <span className="text-white/50 text-sm">{value} uses</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function formatDate(date: Date): string {
  return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
}
