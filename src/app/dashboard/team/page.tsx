import { getServerSession } from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Mail, UserCheck, UserX, MoreVertical } from "lucide-react"

async function getTeamData(userId: string) {
  const [subscription, user] = await Promise.all([
    prisma.subscription.findUnique({
      where: { userId }
    }),
    prisma.user.findUnique({
      where: { id: userId },
      include: { subscriptions: true }
    })
  ])

  return { subscription, user }
}

const planSeats: Record<string, number> = {
  starter: 1,
  growth: 3,
  pro: 5,
  enterprise: 999,
}

export default async function TeamPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return null
  }

  const { subscription, user } = await getTeamData(session.user.id)
  const maxSeats = planSeats[subscription?.plan || "starter"] || 1
  const currentSeats = 1 // In a real app, this would come from a TeamMember table

  const teamMembers = [
    {
      id: "1",
      name: session.user.name || "You",
      email: session.user.email || "",
      role: "Owner",
      status: "active",
      avatar: session.user.name?.charAt(0).toUpperCase() || "U",
      joinedAt: new Date(user?.createdAt || Date.now()),
    }
    // In a real app, fetch from TeamMember table
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Team</h1>
          <p className="text-white/50 mt-1">Manage team members and permissions</p>
        </div>
        {currentSeats < maxSeats && (
          <button className="bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Invite Member
          </button>
        )}
      </div>

      {/* Plan Seats Info */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-sm">Team Seats</p>
            <p className="text-3xl font-display font-bold text-white">
              {currentSeats} / {maxSeats === 999 ? "Unlimited" : maxSeats}
            </p>
          </div>
          <div className="w-48 h-3 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-violet-500 rounded-full transition-all duration-500"
              style={{ width: maxSeats === 999 ? "100%" : `${(currentSeats / maxSeats) * 100}%` }}
            />
          </div>
        </div>
        {currentSeats >= maxSeats && maxSeats !== 999 && (
          <p className="text-yellow-400 text-sm mt-3">
            You've reached your plan's seat limit. <Link href="/dashboard/billing" className="text-violet-400 hover:underline">Upgrade your plan</Link> to add more members.
          </p>
        )}
      </div>

      {/* Team Members */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-bold text-white mb-6">Team Members</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Member</th>
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Role</th>
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Status</th>
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Joined</th>
                <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name} {member.id === "1" && <span className="ml-2 px-2 py-0.5 bg-violet-500/20 text-violet-400 text-xs rounded">You</span>}</p>
                        <p className="text-white/50 text-sm">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-violet-500/20 text-violet-400 text-xs font-medium rounded-full">
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${member.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${member.status === "active" ? "bg-green-400" : "bg-gray-400"}`} />
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/50 text-sm">
                    {member.joinedAt.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    {member.id !== "1" && (
                      <div className="relative">
                        <button className="p-2 rounded hover:bg-white/10 transition-colors">
                          <MoreVertical className="w-5 h-5 text-white/50" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-40 bg-gray-900/95 backdrop-blur-xl rounded-lg border border-white/10 py-1 shadow-lg hidden group-hover:block z-50">
                          <button className="w-full px-4 py-2 text-left text-white/70 hover:bg-violet-500/10 hover:text-violet-400 transition-colors">
                            <Mail className="w-4 h-4 inline-block mr-2" /> Resend Invite
                          </button>
                          <button className="w-full px-4 py-2 text-left text-white/70 hover:bg-violet-500/10 hover:text-violet-400 transition-colors">
                            <UserCheck className="w-4 h-4 inline-block mr-2" /> Make Admin
                          </button>
                          <hr className="border-white/10 my-1" />
                          <button className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors">
                            <UserX className="w-4 h-4 inline-block mr-2" /> Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentSeats < maxSeats && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-white/20 rounded-lg text-white/70 hover:border-violet-400 hover:text-violet-400 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Invite Team Member</span>
            </button>
          </div>
        )}
      </div>

      {/* Pending Invites */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-bold text-white mb-6">Pending Invites</h2>
        <div className="text-center py-8">
          <Mail className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/50">No pending invitations</p>
          <p className="text-white/30 text-sm mt-1">Invited team members will appear here</p>
        </div>
      </div>

      {/* Roles & Permissions */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-bold text-white mb-6">Roles & Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RoleCard 
            name="Owner" 
            description="Full access to all features, billing, and team management"
            permissions={["All permissions", "Manage billing", "Delete account", "Transfer ownership"]}
            color="violet"
          />
          <RoleCard 
            name="Admin" 
            description="Manage team members, automations, and view analytics"
            permissions={["Manage automations", "View analytics", "Invite members", "Manage integrations"]}
            color="blue"
          />
          <RoleCard 
            name="Member" 
            description="Create and run automations, view assigned reports"
            permissions={["Create automations", "Run automations", "View own reports"]}
            color="green"
          />
        </div>
      </div>
    </div>
  )
}

function RoleCard({ name, description, permissions, color }: { name: string; description: string; permissions: string[]; color: string }) {
  const colorClasses: Record<string, string> = {
    violet: "bg-violet-500/20 text-violet-400 border-violet-500/30",
    blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    green: "bg-green-500/20 text-green-400 border-green-500/30",
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <span className="text-xl font-bold">{name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-lg font-display font-bold text-white">{name}</h3>
          <p className="text-white/50 text-sm">{description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {permissions.map((perm, i) => (
          <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            {perm}
          </li>
        ))}
      </ul>
    </div>
  )
}
