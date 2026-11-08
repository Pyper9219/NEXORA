import type { Metadata } from "next"
import Link from "next/link"
import { Markdown } from "@/components/markdown"

interface BlogPost {
  title: string
  excerpt: string
  content: string
  date: string
}

const posts: Record<string, BlogPost> = {
  "ai-automation-trends-2026": {
    title: "AI Automation Trends 2026",
    excerpt: "Explore the top AI trends shaping business automation this year.",
    content: `## The year automation got agentic

The landscape of business automation is evolving rapidly. In 2026, we see:

1. **Agentic AI**: Autonomous AI agents that can plan, execute, and adapt workflows without human intervention
2. **Predictive Analytics**: Real-time forecasting of market trends and customer behavior
3. **Multi-Channel Orchestration**: Seamless coordination across email, SMS, web, and social platforms
4. **AI-Powered Personalization**: Dynamic content adaptation based on user behavior and preferences
5. **Compliance & Security**: Built-in privacy controls and audit trails for regulated industries

## Getting started

To begin your AI automation journey:

- Assess your current workflow bottlenecks
- Identify high-impact processes for automation
- Choose a platform with pre-built integrations
- Start with a pilot project and measure ROI

## The Nexora advantage

Nexora's platform combines all five trends in one unified experience, with enterprise-grade security and a credit-card-free free trial to get you started today.`,
    date: "Jan 15, 2026",
  },
  "predictive-analytics-guide": {
    title: "Predictive Analytics Guide",
    excerpt: "How to use data prediction for business growth.",
    content: `Predictive analytics empowers businesses to forecast future outcomes based on historical data and machine learning models.

## Key concepts

- **Regression Analysis**: Predicting continuous outcomes (revenue, churn rate)
- **Classification**: Predicting categorical outcomes (high-value customer, churn risk)
- **Time Series Forecasting**: Predicting future values based on temporal patterns

## Implementation framework

1. Data Collection: Gather clean, structured data from all relevant sources
2. Feature Engineering: Create meaningful predictors from raw data
3. Model Selection: Choose appropriate ML algorithms (linear regression, random forests, gradient boosting)
4. Training & Validation: Split data, train models, validate performance
5. Deployment: Integrate predictions into business workflows via API

## Common use cases

- **Churn Prediction**: Identify customers likely to cancel subscriptions
- **Lead Scoring**: Rank prospects by conversion probability
- **Inventory Optimization**: Forecast demand to reduce waste
- **Price Optimization**: Maximize revenue based on willingness to pay

## Getting started with Nexora

Nexora provides ready-to-use predictive models tailored to your industry, with a 14-day credit-card-free free trial to test drive the platform.`,
    date: "Jan 10, 2026",
  },
  "multi-channel-marketing": {
    title: "Multi-Channel Marketing",
    excerpt: "Reach customers across all channels seamlessly.",
    content: `Modern customers interact with brands across multiple touchpoints. A unified multi-channel strategy ensures consistent messaging and improved conversion rates.

## Channel integration

- **Email**: Personalized drip campaigns and behavioral triggers
- **SMS**: Time-sensitive offers and cart abandonment reminders
- **Web**: Retargeting ads and on-site personalization
- **Social Media**: Automated posting and engagement tracking
- **Mobile Push**: App engagement and re-engagement campaigns

## The single customer view

By unifying data from all channels, businesses can:

- Deliver consistent branding across all touchpoints
- Attribute conversions to the right channel
- Optimize spend based on performance
- Create seamless handoffs between channels

## Getting started

1. Map your customer journey across all touchpoints
2. Identify gaps in channel coverage
3. Choose a platform with native multi-channel support
4. Set up tracking and attribution for each channel
5. Test and iterate based on performance data

## Nexora features

Nexora's multi-channel orchestration platform enables:

- Visual workflow builder for cross-channel campaigns
- Real-time performance monitoring
- A/B testing across channels
- Unified analytics dashboard
- Native integrations with 30+ payment methods`,
    date: "Jan 5, 2026",
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

/** Unknown slugs get a real 404 instead of the previous soft 200 page. */
export const dynamicParams = false

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    return { title: "Post not found | Nexora" }
  }

  return {
    title: `${post.title} | Nexora Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      images: "/og-image.png",
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = posts[slug]
  const related = Object.entries(posts).filter(([relatedSlug]) => relatedSlug !== slug)

  return (
    <main className="page-main">
      <section className="section-py bg-gray-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-responsive-y">
              <p className="section-subheading text-violet-400">Blog</p>
              <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                {post.title}
              </h1>
              <p className="hero-subheading text-white/60">{post.excerpt}</p>
              <div className="text-white/50 text-sm mb-8">
                <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
              </div>
              <div className="prose prose-invert max-w-none">
                <Markdown content={post.content} />
              </div>
              <div className="mt-10 lg:mt-12 pt-8 border-t border-violet-500/20">
                <h3 className="text-lg sm:text-xl font-display font-medium text-violet-400 mb-4">
                  Related Posts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map(([relatedSlug, relatedPost]) => (
                    <Link
                      key={relatedSlug}
                      href={`/blog/${relatedSlug}`}
                      className="block rounded-xl border border-white/10 bg-gray-900/60 p-4 hover:border-violet-500/40 hover:bg-violet-500/5 transition-colors"
                    >
                      <p className="font-medium text-white">{relatedPost.title}</p>
                      <p className="text-sm text-white/50 mt-1">{relatedPost.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <aside className="relative hidden lg:block">
              <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-4xl opacity-70 blur-xl"></div>
              <div className="relative pt-12 lg:pt-20">
                <div className="card-responsive bg-gray-900/80 rounded-2xl max-w-md mx-auto lg:mx-0 sticky top-24">
                  <h3 className="text-lg sm:text-xl font-display font-bold mb-4">
                    Latest from Nexora
                  </h3>
                  <ul className="space-y-3 text-white/60">
                    {Object.entries(posts).map(([latestSlug, latestPost]) => (
                      <li key={latestSlug}>
                        <Link
                          href={`/blog/${latestSlug}`}
                          className="block hover:text-violet-400 transition-colors"
                        >
                          <span className="font-medium block">{latestPost.title}</span>
                          <span className="text-xs sm:text-sm opacity-60">{latestPost.date}</span>
                        </Link>
                      </li>
                    ))}
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
