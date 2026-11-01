import { Navbar } from '@/components/ui/navbar'

export default function ResourcesPage() {
  return (
    <main className="flex-1 pt-20">
      <Navbar />

      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
              Resources
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Blog & Insights
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="group bg-gray-900/80 rounded-2xl p-6 hover:transform hover:transition-transform hover:translate-y-[-4] hover:bg-violet-500/10 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6l7 3-7 3v6zm-5 6h10v2h-10v-2zm7 5h2v3h2v-2h2v-3h2v2h2v-5h-2v-3h-2v3h-2v-2h-2v3h-2v-5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white group-hover:text-violet-400 transition-colors duration-300">
                    AI Automation Trends 2026
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    Explore the top AI trends shaping business automation this year.
                  </p>
                </div>
              </div>
              <time className="text-white/40 text-sm opacity-60">Jan 15, 2026</time>
              <a
                href="/blog/ai-automation-trends-2026"
                className="mt-4 inline-flex items-center text-violet-400 hover:text-white transition-colors text-sm font-medium"
              >
                Read <span className="ml-1">→</span>
              </a>
            </article>

            <article className="group bg-gray-900/80 rounded-2xl p-6 hover:transform hover:transition-transform hover:translate-y-[-4] hover:bg-violet-500/10 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6l7 3-7 3v6zm-5 6h10v2h-10v-2zm7 5h2v3h2v-2h2v-3h2v-2h2v-5h-2v-3h-2v3h-2v-2h-2v3h-2v-5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white group-hover:text-violet-400 transition-colors duration-300">
                    Predictive Analytics Guide
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    How to use data prediction for business growth.
                  </p>
                </div>
              </div>
              <time className="text-white/40 text-sm opacity-60">Jan 10, 2026</time>
              <a
                href="/blog/predictive-analytics-guide"
                className="mt-4 inline-flex items-center text-violet-400 hover:text-white transition-colors text-sm font-medium"
              >
                Read <span className="ml-1">→</span>
              </a>
            </article>

            <article className="group bg-gray-900/80 rounded-2xl p-6 hover:transform hover:transition-transform hover:translate-y-[-4] hover:bg-violet-500/10 transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 transition-colors duration-300">
                  <svg className="w-5 h-5 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6l7 3-7 3v6zm-5 6h10v2h-10v-2zm7 5h2v3h2v-2h2v-3h2v-2h2v-5h-2v-3h-2v3h-2v-2h-2v3h-2v-5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-medium text-white group-hover:text-violet-400 transition-colors duration-300">
                    Multi-Channel Marketing
                  </h3>
                  <p className="text-white/50 text-sm mt-1">
                    Reach customers across all channels seamlessly.
                  </p>
                </div>
              </div>
              <time className="text-white/40 text-sm opacity-60">Jan 5, 2026</time>
              <a
                href="/blog/multi-channel-marketing"
                className="mt-4 inline-flex items-center text-violet-400 hover:text-white transition-colors text-sm font-medium"
              >
                Read <span className="ml-1">→</span>
              </a>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}