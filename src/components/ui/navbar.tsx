"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Menu, X, LogOut, User, Settings, ChevronDown } from "lucide-react"

interface NavItem {
  label: string
  href: string
  cta?: boolean
}

const navItems: NavItem[] = [
  { label: "Features", href: "/features", cta: false },
  { label: "Solutions", href: "/industries", cta: false },
  { label: "Pricing", href: "/pricing", cta: false },
  { label: "About", href: "/about", cta: false },
  { label: "Contact", href: "/contact", cta: false },
]

export function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
    setIsUserMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto container-responsive h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7v6l4 2-4 2v6h-8v-6l4-2-4-2v-6h8zm0-4c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H5c-2.21 0-4-1.79-4-4V7c0-2.21 1.79-4 4-4h14z"/>
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-display font-bold text-white truncate">Nexora</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white/70 text-sm font-medium hover:text-violet-400 transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
          
          {status === "loading" ? (
            <div className="w-24 h-10 bg-gray-800/50 rounded animate-pulse" />
          ) : session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="text-white/70 text-sm font-medium hover:text-violet-400 transition-colors whitespace-nowrap"
              >
                Dashboard
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded text-sm font-medium hover:bg-violet-500 transition-colors focus-visible-ring"
                >
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium text-sm">
                      {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)} 
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 py-2 shadow-xl z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white font-medium truncate">{session.user.name || "User"}</p>
                        <p className="text-white/50 text-sm truncate">{session.user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-violet-500/10 hover:text-violet-400 transition-colors"
                      >
                        <span className="w-5 h-5">📊</span>
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/dashboard/billing"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-violet-500/10 hover:text-violet-400 transition-colors"
                      >
                        <span className="w-5 h-5">💳</span>
                        <span>Billing</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-violet-500/10 hover:text-violet-400 transition-colors"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                      <hr className="border-white/10 my-2" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/signin"
                className="text-white/70 text-sm font-medium hover:text-violet-400 transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary px-4 py-2 text-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Nav & CTA Buttons */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded bg-white/10 hover:bg-violet-500/20 transition-colors touch-target focus-visible-ring"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white"/> : <Menu className="w-6 h-6 text-white"/>}
          </button>

          {/* CTA Buttons - Mobile */}
          {status !== "loading" && session?.user ? (
            <div className="flex gap-2">
              <Link
                href="/dashboard"
                className="btn-primary px-4 py-2 text-sm touch-target"
              >
                Dashboard
              </Link>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 rounded bg-white/10 hover:bg-violet-500/20 transition-colors touch-target focus-visible-ring"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <User className="w-6 h-6 text-white"/>
              </button>
            </div>
          ) : status !== "loading" ? (
            <div className="flex gap-2">
              <Link
                href="/auth/signin"
                className="btn-secondary px-4 py-2 text-sm touch-target"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary px-4 py-2 text-sm touch-target"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="w-20 h-10 bg-gray-800/50 rounded animate-pulse" />
          )}
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div
        className={`fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "left-0" : "-left-full"
        }`}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-screen p-6 pt-24 overflow-y-auto">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded bg-white/10 hover:bg-violet-500/20 transition-colors touch-target focus-visible-ring"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white"/>
          </button>

          <nav className="flex-1 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-lg font-medium hover:text-violet-400 transition-colors px-4 py-3 rounded-lg hover:bg-violet-500/10 touch-target"
              >
                {item.label}
              </Link>
            ))}
            
            {status !== "loading" && session?.user ? (
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary w-full text-center touch-target"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/billing"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-outline w-full text-center touch-target"
                >
                  Billing
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary w-full text-center touch-target"
                >
                  Settings
                </Link>
                <button
                  onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                  className="w-full text-red-400 px-6 py-3 rounded text-lg font-medium hover:bg-red-500/10 transition-colors touch-target focus-visible-ring"
                >
                  Sign Out
                </button>
              </div>
            ) : status !== "loading" ? (
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-secondary w-full text-center touch-target"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary w-full text-center touch-target"
                >
                  Get Started
                </Link>
              </div>
            ) : null}
          </nav>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
