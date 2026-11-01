import { Shield, Zap, TrendingUp, Users, Mail, Globe, Laptop, BarChart2 } from 'lucide-react'

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
            Intelligent Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight">
            Powerful Tools for
            <span className="text-violet-400">Every</span> Business
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <div className="bg-gray-900/50 rounded-3xl p-6 transition-all hover:bg-gray-900/80 border border-white/10 hover:border-violet-500/30 group">
            <Zap className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">AI Automation</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Automate repetitive tasks, workflows, and processes with intelligent AI that learns and adapts to your business needs.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-gray-900/50 rounded-3xl p-6 transition-all hover:bg-gray-900/80 border border-white/10 hover:border-violet-500/30 group">
            <BarChart2 className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Predictive Analytics</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Forecast trends, customer behavior, and business outcomes with AI-powered predictive analytics to make data-driven decisions.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-gray-900/50 rounded-3xl p-6 transition-all hover:bg-gray-900/80 border border-white/10 hover:border-violet-500/30 group">
            <TrendingUp className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Multi-Channel</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Reach customers across email, SMS, social media, and chat platforms with unified messaging and automated campaigns.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-gray-900/50 rounded-3xl p-6 transition-all hover:bg-gray-900/80 border border-white/10 hover:border-violet-500/30 group">
            <Users className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Team Collaboration</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Enable seamless teamwork with shared workspaces, task assignments, and real-time collaboration features.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="bg-gray-900/50 rounded-3xl p-6 transition-all hover:bg-gray-900/80 border border-white/10 hover:border-violet-500/30 group">
            <Shield className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Enterprise Security</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Bank-grade security, SOC 2 compliance, and data encryption to protect your business and customer information.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="bg-gray-900/50 rounded-3xl p-6 transition-all hover:bg-gray-900/80 border border-white/10 hover:border-violet-500/30 group">
            <Laptop className="w-8 h-8 text-violet-400 group-hover:text-violet-300 transition-colors mb-4"/>
            <h3 className="text-xl font-display font-bold mb-2">Custom Integrations</h3>
            <p className="text-white/60 text-sm leading-relaxed">
            Connect with 100+ business tools including CRM, ERP, accounting, and productivity platforms via API.
            </p>
          </div>

          {/* Feature Card 7 */}
          <div className="bg-gray-900/50 rounded-3xl p-6 transition-all hover:bg-gray-900/80 border border-white/10 hover:border-violet-500/30 group">
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