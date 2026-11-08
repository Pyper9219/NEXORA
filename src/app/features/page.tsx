import { FaqAccordion } from '@/components/faq-accordion'

export default function FeaturesPage() {
  return (
    <main className="page-main">
      <section className="section-py bg-gray-950">
        <div className="section-container">
          <div className="text-center mb-12 lg:mb-16 space-responsive-y">
            <p className="section-subheading text-violet-400">Features</p>
            <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              Features Built for Growth
            </h1>
          </div>

          <div className="content-grid">
            {/* Feature 1: AI Automation */}
            <div className="card-responsive bg-gray-900/50 rounded-3xl hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">AI Automation</h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                Automate 80% of repetitive tasks across your business operations, from data entry to customer support, freeing your team for high-value work.
              </p>
            </div>

            {/* Feature 2: Predictive Analytics */}
            <div className="card-responsive bg-gray-900/50 rounded-3xl hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">Predictive Analytics</h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                Forecast market trends, customer behavior, and revenue patterns with 90%+ accuracy using AI-driven predictive models.
              </p>
            </div>

            {/* Feature 3: Multi-Channel Orchestration */}
            <div className="card-responsive bg-gray-900/50 rounded-3xl hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">Multi-Channel Orchestration</h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                Reach customers everywhere through integrated email, SMS, social media, and chat platforms with unified campaign management.
              </p>
            </div>

            {/* Feature 4: Team Collaboration */}
            <div className="card-responsive bg-gray-900/50 rounded-3xl hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">Team Collaboration</h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                Coordinate work across teams with shared workspaces, real-time updates, and task management that keeps everyone aligned.
              </p>
            </div>

            {/* Feature 5: Enterprise Security */}
            <div className="card-responsive bg-gray-900/50 rounded-3xl hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">Enterprise Security</h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                Bank-grade encryption and compliance standards (GDPR, SOC 2) ensure your data is protected at rest and in transit.
              </p>
            </div>

            {/* Feature 6: Custom Integrations */}
            <div className="card-responsive bg-gray-900/50 rounded-3xl hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">Custom Integrations</h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                Connect with 200+ tools including Salesforce, HubSpot, Slack, Zapier, and custom APIs to fit your existing workflow.
              </p>
            </div>

            {/* Feature 7: Email Marketing */}
            <div className="card-responsive bg-gray-900/50 rounded-3xl hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">Email Marketing</h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                Create, send, and automate personalized email campaigns with AI-powered subject lines and optimal send-time optimization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
