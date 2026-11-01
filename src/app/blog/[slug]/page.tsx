import { Navbar } from '@/components/ui/navbar'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const samplePosts: Record<string, { title: string; excerpt: string; content: string; date: string }> = {
    'ai-automation-trends-2026': {
      title: 'AI Automation Trends 2026',
      excerpt: 'Explore the top AI trends shaping business automation this year.',
      content: "# AI Automation Trends 2026\n\nThe landscape of business automation is evolving rapidly. In 2026, we see:\n\n1. **Agentic AI**: Autonomous AI agents that can plan, execute, and adapt workflows without human intervention\n2. **Predictive Analytics**: Real-time forecasting of market trends and customer behavior\n3. **Multi-Channel Orchestration**: Seamless coordination across email, SMS, web, and social platforms\n4. **AI-Powered Personalization**: Dynamic content adaptation based on user behavior and preferences\n5. **Compliance & Security**: Built-in privacy controls and audit trails for regulated industries\n\n## Getting Started\n\nTo begin your AI automation journey:\n- Assess your current workflow bottlenecks\n- Identify high-impact processes for automation\n- Choose a platform with pre-built integrations\n- Start with a pilot project and measure ROI\n\n## The Nexora Advantage\n\nNexora&apos;s platform combines all five trends in one unified experience, with enterprise-grade security and a credit-card-free free trial to get you started today.",
      date: 'Jan 15, 2026'
    },
    'predictive-analytics-guide': {
      title: 'Predictive Analytics Guide',
      excerpt: 'How to use data prediction for business growth.',
      content: "# Predictive Analytics Guide\n\nPredictive analytics empowers businesses to forecast future outcomes based on historical data and machine learning models.\n\n## Key Concepts\n\n- **Regression Analysis**: Predicting continuous outcomes (revenue, churn rate)\n- **Classification**: Predicting categorical outcomes (high-value customer, churn risk)\n- **Time Series Forecasting**: Predicting future values based on temporal patterns\n\n## Implementation Framework\n\n1. Data Collection: Gather clean, structured data from all relevant sources\n2. Feature Engineering: Create meaningful predictors from raw data\n3. Model Selection: Choose appropriate ML algorithms (linear regression, random forests, gradient boosting)\n4. Training & Validation: Split data, train models, validate performance\n5. Deployment: Integrate predictions into business workflows via API\n\n## Common Use Cases\n\n- **Churn Prediction**: Identify customers likely to cancel subscriptions\n- **Lead Scoring**: Rank prospects by conversion probability\n- **Inventory Optimization**: Forecast demand to reduce waste\n- **Price Optimization**: Maximize revenue based on willingness to pay\n\n## Getting Started with Nexora\n\nNexora provides ready-to-use predictive models tailored to your industry, with a 14-day credit-card-free free trial to test drive the platform.",
      date: 'Jan 10, 2026'
    },
    'multi-channel-marketing': {
      title: 'Multi-Channel Marketing',
      excerpt: 'Reach customers across all channels seamlessly.',
      content: "# Multi-Channel Marketing\n\nModern customers interact with brands across multiple touchpoints. A unified multi-channel strategy ensures consistent messaging and improved conversion rates.\n\n## Channel Integration\n\n- **Email**: Personalized drip campaigns and behavioral triggers\n- **SMS**: Time-sensitive offers and cart abandonment reminders\n- **Web**: Retargeting ads and on-site personalization\n- **Social Media**: Automated posting and engagement tracking\n- **Mobile Push**: App engagement and re-engagement campaigns\n\n## The Single Customer View\n\nBy unifying data from all channels, businesses can:\n- Deliver consistent branding across all touchpoints\n- Attribute conversions to the right channel\n- Optimize spend based on performance\n- Create seamless handoffs between channels\n\n## Getting Started\n\n1. Map your customer journey across all touchpoints\n2. Identify gaps in channel coverage\n3. Choose a platform with native multi-channel support\n4. Set up tracking and attribution for each channel\n5. Test and iterate based on performance data\n\n## Nexora Features\n\nNexora&apos;s multi-channel orchestration platform enables:\n- Visual workflow builder for cross-channel campaigns\n- Real-time performance monitoring\n- A/B testing across channels\n- Unified analytics dashboard\n- Native integrations with 30+ payment methods",
      date: 'Jan 5, 2026'
    }
  }

  const post = samplePosts[slug]

  if (!post) {
    return (
      <main className="page-main">
        <Navbar />
        <section className="section-py bg-gray-950">
          <div className="section-container">
            <h1 className="hero-heading text-2xl sm:text-3xl lg:text-4xl text-violet-400 mb-6">Post Not Found</h1>
            <p className="hero-subheading text-white/60">
              The blog post "{slug}" could not be found.
            </p>
            <a href="/resources" className="btn-primary mt-6 inline-flex">
              Browse All Posts →
            </a>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-main">
      <Navbar />

      <section className="section-py bg-gray-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-responsive-y">
              <p className="section-subheading text-violet-400">Blog</p>
              <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                {post.title}
              </h1>
              <p className="hero-subheading text-white/60">
                {post.excerpt}
              </p>
              <div className="text-white/50 text-sm mb-8">
                <time>{post.date}</time>
              </div>
              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              <div className="mt-10 lg:mt-12 pt-8 border-t border-violet-500/20">
                <h3 className="text-lg sm:text-xl font-display font-medium text-violet-400 mb-4">Related Posts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Related posts would be fetched dynamically in a real CMS integration */}
                </div>
              </div>
            </div>
            <aside className="relative hidden lg:block">
              <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-4xl opacity-70 blur-xl"></div>
              <div className="relative pt-12 lg:pt-20">
                <div className="card-responsive bg-gray-900/80 rounded-2xl max-w-md mx-auto lg:mx-0 sticky top-24">
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-4">Latest from Nexora</h3>
                  <ul className="space-y-3 text-white/60">
                    <li>
                      <p className="font-medium">AI Automation Trends 2026</p>
                      <p className="text-xs sm:text-sm opacity-60">Jan 15, 2026</p>
                    </li>
                    <li>
                      <p className="font-medium">Predictive Analytics Guide</p>
                      <p className="text-xs sm:text-sm opacity-60">Jan 10, 2026</p>
                    </li>
                    <li>
                      <p className="font-medium">Multi-Channel Marketing</p>
                      <p className="text-xs sm:text-sm opacity-60">Jan 5, 2026</p>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
