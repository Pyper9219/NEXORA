"use client"

import { useState } from "react"
import Link from "next/link"
import type { Session } from "next-auth"
import { X, Menu } from "lucide-react"

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "Automations", href: "/dashboard/automations", icon: "⚙️" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "📈" },
  { label: "Team", href: "/dashboard/team", icon: "👥" },
  { label: "Billing", href: "/dashboard/billing", icon: "💳" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
]

export function DashboardShell({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (!session?.user) {
    // The server layout already redirects unauthenticated visitors; this is
    // only a type narrowing guard.
    return null
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-950">
      {/* The root layout already offsets the fixed navbar by pt-20. */}
      <div>
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-violet-600 text-white p-3 rounded-full shadow-xl hover:bg-violet-500 transition-colors touch-target focus-visible-ring"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar - Mobile Drawer / Desktop Fixed */}
        <aside
          className={`fixed left-0 top-20 bottom-0 w-64 bg-gray-900/50 border-r border-white/10 backdrop-blur-xl z-50 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "left-0" : "-left-full lg:left-0"
          }`}
          aria-label="Main navigation"
        >
          <nav className="p-4 space-y-1 h-full flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-white/70 rounded-lg hover:bg-violet-500/10 hover:text-violet-400 transition-colors touch-target"
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="font-medium truncate">{item.label}</span>
              </Link>
            ))}

            {/* Mobile Close Button */}
            <button
              className="lg:hidden w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 text-white/70 rounded-lg hover:bg-violet-500/10 hover:text-violet-400 transition-colors touch-target"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
              <span className="font-medium">Close Menu</span>
            </button>

            {/* User Profile at bottom */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{session.user.name || "User"}</p>
                  <p className="text-white/50 text-xs truncate">{session.user.email}</p>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
