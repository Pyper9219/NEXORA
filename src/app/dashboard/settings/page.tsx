import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

async function getUserData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: true,
      apiKeys: true,
      integrations: true,
    }
  })
  return user
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const user = await getUserData(session.user.id)

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
        <p className="text-white/50 mt-1">Manage your account, preferences, and integrations.</p>
      </div>

      {/* Profile Section */}
      <section className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-bold text-white mb-6">Profile</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={user?.name || ""}
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white/70 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user?.email || ""}
                disabled
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-not-allowed opacity-70"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="block text-white/70 text-sm font-medium mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Acme Inc."
            />
          </div>
          <button type="submit" className="bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 transition-colors">
            Save Changes
          </button>
        </form>
      </section>

      {/* Security Section */}
      <section className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-bold text-white mb-6">Security</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-white/50 text-sm">Add an extra layer of security to your account</p>
            </div>
            <button className="border-2 border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:border-violet-400 hover:text-violet-400 transition-colors">
              Enable 2FA
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
            <div>
              <p className="text-white font-medium">Change Password</p>
              <p className="text-white/50 text-sm">Update your password regularly for security</p>
            </div>
            <button className="border-2 border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:border-violet-400 hover:text-violet-400 transition-colors">
              Change Password
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
            <div>
              <p className="text-white font-medium">Active Sessions</p>
              <p className="text-white/50 text-sm">View and manage your active login sessions</p>
            </div>
            <button className="border-2 border-white/20 text-white/70 px-4 py-2 rounded-lg text-sm font-medium hover:border-violet-400 hover:text-violet-400 transition-colors">
              View Sessions
            </button>
          </div>
        </div>
      </section>

      {/* API Keys Section */}
      <section className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">API Keys</h2>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-500 transition-colors">
            Create API Key
          </button>
        </div>

        {user?.apiKeys && user.apiKeys.length > 0 ? (
          <div className="space-y-4">
            {user.apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">{key.name}</p>
                    <p className="text-white/50 text-sm">
                      {key.isActive ? "Active" : "Inactive"} • 
                      {key.expiresAt ? `Expires ${new Date(key.expiresAt).toLocaleDateString()}` : "No expiration"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    key.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {key.isActive ? "Active" : "Revoked"}
                  </span>
                  <button className="text-white/50 hover:text-red-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <p className="text-white/50">No API keys created</p>
            <p className="text-white/30 text-sm mt-1">Create an API key to integrate with Nexora programmatically</p>
          </div>
        )}
      </section>

      {/* Integrations Section */}
      <section className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-bold text-white mb-6">Integrations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["stripe", "paystack", "flutterwave", "mpesa", "zapier", "make"].map((integration) => (
            <IntegrationCard key={integration} type={integration} connected={!!user?.integrations?.find(i => i.type === integration)} />
          ))}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-gray-900/50 rounded-2xl p-6 border border-white/10 border-red-500/20">
        <h2 className="text-xl font-display font-bold text-red-400 mb-6">Danger Zone</h2>
        <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl border border-red-500/20">
          <div>
            <p className="text-red-400 font-medium">Delete Account</p>
            <p className="text-white/50 text-sm">Permanently delete your account and all associated data</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-500 transition-colors">
            Delete Account
          </button>
        </div>
      </section>
    </div>
  )
}

function IntegrationCard({ type, connected }: { type: string; connected: boolean }) {
  const integrationInfo: Record<string, { name: string; description: string; color: string }> = {
    stripe: { name: "Stripe", description: "Payment processing", color: "bg-purple-500/20 text-purple-400" },
    paystack: { name: "Paystack", description: "African payments", color: "bg-blue-500/20 text-blue-400" },
    flutterwave: { name: "Flutterwave", description: "Global payments", color: "bg-orange-500/20 text-orange-400" },
    mpesa: { name: "M-Pesa", description: "Mobile money (Kenya)", color: "bg-green-500/20 text-green-400" },
    zapier: { name: "Zapier", description: "Workflow automation", color: "bg-amber-500/20 text-amber-400" },
    make: { name: "Make", description: "Visual automation", color: "bg-indigo-500/20 text-indigo-400" },
  }

  const info = integrationInfo[type]

  return (
    <div className={`p-4 rounded-xl border ${connected ? "border-green-500/30 bg-green-500/5" : "border-white/10"}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${info.color} flex items-center justify-center`}>
          <span className="text-xl">{type.charAt(0).toUpperCase()}</span>
        </div>
        {connected && (
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
            Connected
          </span>
        )}
      </div>
      <p className="text-white font-medium">{info.name}</p>
      <p className="text-white/50 text-sm mt-1">{info.description}</p>
      <button className={`w-full mt-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        connected 
          ? "border-2 border-white/20 text-white/70 hover:border-violet-400 hover:text-violet-400"
          : "bg-violet-600 text-white hover:bg-violet-500"
      }`}>
        {connected ? "Manage" : "Connect"}
      </button>
    </div>
  )
}
