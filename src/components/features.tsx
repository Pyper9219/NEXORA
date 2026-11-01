import { Shield, Zap, TrendingUp, Users, Mail, Globe, Laptop, BarChart2 } from 'lucide-react'

export default function FeaturesGrid() {
  return (
    <section className="section-py bg-gray-950">
      <div className="section-container">
        <div className="text-center mb-12 lg:mb-16 space-responsive-y">
          <p className="section-subheading text-violet-400">Intelligent Features</p>
          <h2 className="section-heading text-3xl sm:text-4xl lg:text-5xl">
            Powerful Tools for
            <span className="text-violet-400">Every</span> Business
          </h2>
        </div>

        <div className="content-grid">
          {/* Feature Card 1 */}
          <div className="card-responsive bg-gray-900/50 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-all group">
            <Zap className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">AI Automation</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Automate repetitive tasks, workflows, and processes with intelligent AI that learns and adapts to your business needs.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="card-responsive bg-gray-900/50 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-all group">
            <BarChart2 className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Predictive Analytics</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Forecast trends, customer behavior, and business outcomes with AI-powered predictive analytics to make data-driven decisions.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="card-responsive bg-gray-900/50 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-all group">
            <TrendingUp className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Multi-Channel</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Reach customers across email, SMS, social media, and chat platforms with unified messaging and automated campaigns.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="card-responsive bg-gray-900/50 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-all group">
            <Users className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Team Collaboration</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Enable seamless teamwork with shared workspaces, task assignments, and real-time collaboration features.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="card-responsive bg-gray-900/50 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-all group">
            <Shield className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Enterprise Security</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Bank-grade security, SOC 2 compliance, and data encryption to protect your business and customer information.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="card-responsive bg-gray-900/50 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-all group">
            <Laptop className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Custom Integrations</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Connect with 100+ business tools including CRM, ERP, accounting, and productivity platforms via API.
            </p>
          </div>

          {/* Feature Card 7 */}
          <div className="card-responsive bg-gray-900/50 rounded-3xl border border-white/10 hover:border-violet-500/30 transition-all group">
            <Mail className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Email Marketing</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Automate personalized email campaigns, nurture sequences, and drip marketing with AI-optimized send times.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
