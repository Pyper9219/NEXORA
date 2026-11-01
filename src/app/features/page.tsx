import { FaqAccordion } from '@/components/faq-accordion'
import { Navbar } from '@/components/ui/navbar'

export default function FeaturesPage() {
  return (
    <main className="flex-1 pt-20">
      <Navbar />

      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
              Features
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Features Built for Growth
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: AI Automation */}
            <div className="bg-gray-900/50 rounded-3xl p-8 hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">AI Automation</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Automate 80% of repetitive tasks across your business operations, from data entry to customer support, freeing your team for high-value work.
              </p>
            </div>

            {/* Feature 2: Predictive Analytics */}
            <div className="bg-gray-900/50 rounded-3xl p-8 hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Predictive Analytics</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Forecast market trends, customer behavior, and revenue patterns with 90%+ accuracy using AI-driven predictive models.
              </p>
            </div>

            {/* Feature 3: Multi-Channel Orchestration */}
            <div className="bg-gray-900/50 rounded-3xl p-8 hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Multi-Channel Orchestration</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Reach customers everywhere through integrated email, SMS, social media, and chat platforms with unified campaign management.
              </p>
            </div>

            {/* Feature 4: Team Collaboration */}
            <div className="bg-gray-900/50 rounded-3xl p-8 hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Team Collaboration</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Coordinate work across teams with shared workspaces, real-time updates, and task management that keeps everyone aligned.
              </p>
            </div>

            {/* Feature 5: Enterprise Security */}
            <div className="bg-gray-900/50 rounded-3xl p-8 hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Enterprise Security</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Bank-grade encryption and compliance standards (GDPR, SOC 2) ensure your data is protected at rest and in transit.
              </p>
            </div>

            {/* Feature 6: Custom Integrations */}
            <div className="bg-gray-900/50 rounded-3xl p-8 hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Custom Integrations</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Connect with 200+ tools including Salesforce, HubSpot, Slack, Zapier, and custom APIs to fit your existing workflow.
              </p>
            </div>

            {/* Feature 7: Email Marketing */}
            <div className="bg-gray-900/50 rounded-3xl p-8 hover:bg-violet-500/10 transition-colors">
              <div className="w-12 h-12 rounded bg-violet-500 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3">Email Marketing</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Create, send, and automate personalized email campaigns with AI-powered subject lines and optimal send-time optimization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}