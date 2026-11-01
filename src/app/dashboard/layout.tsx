import Link from "next/link"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth/[...nextauth]"
import { Navbar } from "@/components/ui/navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: "📊" },
    { label: "Automations", href: "/dashboard/automations", icon: "⚙️" },
    { label: "Analytics", href: "/dashboard/analytics", icon: "📈" },
    { label: "Team", href: "/dashboard/team", icon: "👥" },
    { label: "Billing", href: "/dashboard/billing", icon: "💳" },
    { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="fixed left-0 top-20 bottom-0 w-64 bg-gray-900/50 border-r border-white/10 backdrop-blur-xl z-40 hidden lg:block">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-white/70 rounded-lg hover:bg-violet-500/10 hover:text-violet-400 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          {/* User Profile at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold">
                {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{session.user.name || "User"}</p>
                <p className="text-white/50 text-xs truncate">{session.user.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
