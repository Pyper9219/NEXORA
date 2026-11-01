import Link from 'next/link'
import { ShoppingCart, BriefcaseBusiness, Banknote, HeartPulse, Building2, Truck, GraduationCap, Megaphone, Scale, Handshake } from 'lucide-react'

export const industries = [
  {
    id: 'e-commerce',
    name: 'E-Commerce',
    icon: <ShoppingCart className="w-5 h-5"/>,
    problem: 'Cart abandonment rates of 70%+ and endless manual order processing',
    solution: "Nexora's AI automates cart recovery, inventory management, and personalized product recommendations",
    example: 'Online fashion retailer reduced cart abandonment by 45% in 30 days',
    cta: 'Start Automating',
  },
  {
    id: 'saas',
    name: 'SaaS',
    icon: <BriefcaseBusiness className="w-5 h-5"/>,
    problem: 'High churn rates and manual onboarding consuming 20+ hours/week',
    solution: 'Nexora scales customer onboarding, reduces churn with predictive retention, and automates billing',
    example: 'B2B SaaS platform cut onboarding time from 5 days to 2 hours',
    cta: 'Grow Faster',
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: <Banknote className="w-5 h-5"/>,
    problem: 'Compliance reporting takes 40+ hours/week and manual fraud detection',
    solution: 'AI-powered compliance automation, real-time fraud detection, and regulatory reporting',
    example: 'FinTech company reduced compliance time by 70% and detected 3x more fraud',
    cta: 'Ensure Compliance',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: <HeartPulse className="w-5 h-5"/>,
    problem: 'Patient scheduling bottlenecks and manual paperwork slowing care delivery',
    solution: 'Automated appointment scheduling, patient follow-ups, and insurance verification',
    example: 'Healthcare provider increased patient throughput by 35% and reduced admin overhead by 50%',
    cta: 'Improve Care',
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: <Building2 className="w-5 h-5"/>,
    problem: 'Lead qualification takes days and manual follow-ups lose deals',
    solution: 'AI lead scoring, automated follow-ups, and property matching',
    example: 'Real estate agency closed 3x more deals with automated lead nurturing',
    cta: 'Close More Deals',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    icon: <Truck className="w-5 h-5"/>,
    problem: 'Route optimization is manual and shipment tracking is reactive',
    solution: 'AI route optimization, predictive maintenance, and real-time shipment tracking',
    example: 'Logistics company reduced fuel costs by 25% and improved delivery times by 40%',
    cta: 'Optimize Operations',
  },
  {
    id: 'education',
    name: 'Education',
    icon: <GraduationCap className="w-5 h-5"/>,
    problem: 'Admissions processing is manual and student engagement is low',
    solution: 'Automated admissions, personalized student communication, and engagement analytics',
    example: 'University increased enrollment by 20% with automated nurture sequences',
    cta: 'Boost Enrollment',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: <Megaphone className="w-5 h-5"/>,
    problem: 'Campaign management is fragmented and ROI tracking is difficult',
    solution: 'Unified campaign management, AI-powered optimization, and multi-channel analytics',
    example: 'Marketing agency improved client ROI by 200% with automated campaigns',
    cta: 'Scale Campaigns',
  },
  {
    id: 'legal',
    name: 'Legal',
    icon: <Scale className="w-5 h-5"/>,
    problem: 'Document review is time-consuming and contract management is disorganized',
    solution: 'AI document review, automated contract management, and compliance tracking',
    example: 'Law firm reduced document review time by 60% and improved case preparation',
    cta: 'Streamline Practice',
  },
  {
    id: 'nonprofit',
    name: 'Nonprofit',
    icon: <Handshake className="w-5 h-5"/>,
    problem: 'Donor management is manual and fundraising campaigns are inefficient',
    solution: 'Automated donor outreach, campaign optimization, and volunteer coordination',
    example: 'Nonprofit increased donations by 35% with AI-powered donor segmentation',
    cta: 'Maximize Impact',
  },
]

export function IndustryCards() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
            Industry Solutions
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight">
            AI-Powered Growth for
            <span className="text-violet-400">Your</span> Industry
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="bg-gray-900/50 rounded-3xl p-6 border border-white/10 hover:border-violet-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {industry.icon}
                  <h3 className="text-xl font-display font-bold">{industry.name}</h3>
                </div>
                <Link
                  href="/pricing"
                  className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors"
                >
                  Learn More
                </Link>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {industry.problem}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-violet-400 text-sm">Solution:</span>
                <span className="text-white/60 text-sm">{industry.solution}</span>
              </div>

              <p className="text-white/60 text-xs leading-relaxed mb-4">
                {industry.example}
              </p>

              <Link
                href="/pricing"
                className="bg-violet-600/20 text-violet-400 px-4 py-2 rounded text-sm font-medium hover:bg-violet-600/30 transition-colors"
              >
                {industry.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IndustryCards