import Link from 'next/link'
import { Zap, BarChart2, Users, Shield, Laptop, Mail, Globe, Settings } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-indigo-950 to-violet-950 opacity-100"></div>

      {/* Abstract Shapes */}
      <div className="absolute -top-6 -left-6 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Hero Text */}
        <div>
          <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
            AI-Powered Business Growth
          </p>
          <h1 className="text-5xl sm:text-7xl font-display font-bold leading-tight mb-6">
            Automate <span className="text-violet-400">Repetitive</span> Tasks &
            <span className="text-violet-400">Scale</span> Your Operations
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-xl">
            Nexora&apos;s intelligent automation platform helps businesses like yours reduce manual workload by 80%,
            increase productivity by 300%, and focus on what matters most—growth.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              href="/pricing"
              className="bg-violet-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-violet-500 transition-colors"
            >
              View Pricing Plans
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium hover:border-violet-400 transition-colors"
            >
              Book a Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-violet-400">2,000+</p>
              <p className="text-white/50 text-sm">Businesses Trusted</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-violet-400">98%</p>
              <p className="text-white/50 text-xs">ROI Increase</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-violet-400">200M+</p>
              <p className="text-white/50 text-xs">Tasks/Day</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-violet-400">150+</p>
              <p className="text-white/50 text-xs">Countries</p>
            </div>
          </div>
        </div>

        {/* Right Column - Illustrative Graphics */}
        <div className="relative hidden lg:block">
          <div className="bg-gray-900/50 rounded-3xl p-8 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-violet-400"/>
                <span className="text-white/60 text-sm">AI Automation</span>
              </div>
              <div className="flex items-center gap-3">
                <BarChart2 className="w-8 h-8 text-violet-400"/>
                <span className="text-white/60 text-sm">Predictive Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-violet-400"/>
                <span className="text-white/60 text-sm">Team Collaboration</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-violet-400"/>
                <span className="text-white/60 text-sm">Enterprise Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative SVG Elements */}
      <svg className="absolute -inset-6 -rotate-6 opacity-5" aria-hidden="true">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="indigo-500"/>
            <stop offset="100%" stop-color="violet-500"/>
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="violet-500"/>
            <stop offset="100%" stop-color="indigo-500"/>
          </linearGradient>
        </defs>
        <path d="M150 300 C 200 100, 300 200, 350 350" stroke="url(#gradient1)" stroke-width="2" fill="none"/>
        <path d="M400 200 C 450 350, 500 150, 550 250" stroke="url(#gradient2)" stroke-width="2" fill="none"/>
      </svg>
    </section>
  )
}