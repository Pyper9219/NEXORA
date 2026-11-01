import { Navbar } from '@/components/ui/navbar'

export default function AboutPage() {
  return (
    <main className="flex-1 pt-20">
      <Navbar />

      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
                About Nexora
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
                AI-Powered Business Growth
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Nexora helps SaaS companies and enterprises automate operations, predict market trends, and scale efficiently with AI. Our platform combines predictive analytics, multi-channel orchestration, and enterprise security to drive measurable ROI.
              </p>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 flex-none">
                    <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7h20l-8 5-8-5zM2 17h20v2H2v-2zm0 4h20v2H2v-2zm0 4h20v2H2v-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-white mb-1">200+</h4>
                    <p className="text-white/40 text-xs">Enterprises Trusted</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 flex-none">
                    <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7h20l-8 5-8-5zM2 17h20v2H2v-2zm0 4h20v2H2v-2zm0 4h20v2H2v-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-white mb-1">30+</h4>
                    <p className="text-white/40 text-xs">Payment Methods</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 flex-none">
                    <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7h20l-8 5-8-5zM2 17h20v2H2v-2zm0 4h20v2H2v-2zm0 4h20v2H2v-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-white mb-1">98%</h4>
                    <p className="text-white/40 text-xs">Average ROI Increase</p>
                  </div>
                </li>
              </ul>
              <a
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded text-lg font-medium hover:bg-violet-500 transition-colors"
              >
                Let's Talk <span className="arrow">→</span>
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-4xl opacity-70 blur-xl"></div>
              <div className="relative pt-20">
                <div className="bg-gray-900/80 rounded-2xl p-8 max-w-md">
                  <h3 className="text-2xl font-display font-bold mb-4">Our Impact</h3>
                  <div className="space-y-4 text-white/60">
                    <div>
                      <p className="text-3xl font-display font-bold text-violet-500">10K+</p>
                      <p className="small">Businesses Automated</p>
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-violet-500">$50M+</p>
                      <p className="small">in Saved Costs</p>
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-violet-500">24/7</p>
                      <p className="small">Support Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}