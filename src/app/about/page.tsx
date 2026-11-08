
export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="section-py bg-gray-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-responsive-y">
              <p className="section-subheading text-violet-400">About Nexora</p>
              <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                AI-Powered Business Growth
              </h1>
              <p className="hero-subheading text-white/60">
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
                    <h4 className="font-display font-medium text-white mb-1 text-xl sm:text-2xl">200+</h4>
                    <p className="text-white/40 text-xs sm:text-sm">Enterprises Trusted</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 flex-none">
                    <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7h20l-8 5-8-5zM2 17h20v2H2v-2zm0 4h20v2H2v-2zm0 4h20v2H2v-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-white mb-1 text-xl sm:text-2xl">30+</h4>
                    <p className="text-white/40 text-xs sm:text-sm">Payment Methods</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 flex-none">
                    <svg className="w-4 h-4 text-violet-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7h20l-8 5-8-5zM2 17h20v2H2v-2zm0 4h20v2H2v-2zm0 4h20v2H2v-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-white mb-1 text-xl sm:text-2xl">98%</h4>
                    <p className="text-white/40 text-xs sm:text-sm">Average ROI Increase</p>
                  </div>
                </li>
              </ul>
              <a
                href="/contact"
                className="btn-primary mt-8 inline-flex items-center gap-2 touch-target"
              >
                Let's Talk <span className="arrow">→</span>
              </a>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-4xl opacity-70 blur-xl lg:hidden"></div>
              <div className="relative pt-12 lg:pt-20">
                <div className="card-responsive bg-gray-900/80 rounded-2xl max-w-md mx-auto lg:mx-0">
                  <h3 className="text-xl sm:text-2xl font-display font-bold mb-4">Our Impact</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-display font-bold text-violet-500">10K+</p>
                      <p className="text-xs sm:text-sm text-white/60">Businesses Automated</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-display font-bold text-violet-500">$50M+</p>
                      <p className="text-xs sm:text-sm text-white/60">in Saved Costs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-display font-bold text-violet-500">24/7</p>
                      <p className="text-xs sm:text-sm text-white/60">Support Available</p>
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
