"use client"

import Link from 'next/link'
import { FaqAccordion } from '@/components/faq-accordion'
import { IndustryCards } from '@/components/industry-cards'
import { PricingPreview } from '@/components/pricing-preview'
import { NewsletterForm } from '@/components/newsletter'

export default function HomePage() {
  return (
    <main className="page-container">
      <section className="flex-1 bg-gradient-to-b from-gray-950 via-indigo-950 to-violet-950 section-py">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 space-responsive-y">
            <p className="section-subheading text-violet-400">
              AI-Powered Business Growth Platform
            </p>
            <h1 className="hero-heading">
              Turn Your Business Into a
              <span className="text-violet-400">Growth Machine</span>
            </h1>
            <p className="hero-subheading text-white/50 max-w-2xl mx-auto">
              Automate repetitive tasks, predict customer behavior, and scale your operations with
              AI. Join 2,000+ businesses already transforming their growth with Nexora.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-responsive-col justify-center gap-4 mb-12">
            <Link
              href="/pricing"
              className="btn-primary w-full sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="btn-secondary w-full sm:w-auto"
            >
              Book Demo
            </Link>
          </div>

          {/* Trust Logos */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
            <div className="w-20 sm:w-24 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-white/50 text-xs sm:text-sm">
              Shopify
            </div>
            <div className="w-20 sm:w-24 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-white/50 text-xs sm:text-sm">
              Salesforce
            </div>
            <div className="w-20 sm:w-24 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-white/50 text-xs sm:text-sm">
              HubSpot
            </div>
            <div className="w-20 sm:w-24 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-white/50 text-xs sm:text-sm">
              Slack
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16 text-center">
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-violet-400">2,000+</p>
              <p className="text-white/50 text-xs sm:text-sm">Businesses Trusted</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-violet-400">98%</p>
              <p className="text-white/50 text-xs sm:text-sm">Avg. ROI Increase</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-violet-400">200M</p>
              <p className="text-white/50 text-xs sm:text-sm">Tasks Automated Daily</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-violet-400">99.9%</p>
              <p className="text-white/50 text-xs sm:text-sm">Uptime</p>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12 lg:mb-16 space-responsive-y">
            <p className="section-subheading text-violet-400">
              Why Nexora?
            </p>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">
              Features Built for Growth
            </h2>
            <div className="content-grid">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-medium text-white">AI Automation</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Automate 80% of repetitive tasks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-medium text-white">Predictive Analytics</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Forecast trends with 90%+ accuracy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-medium text-white">Multi-Channel</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Reach customers everywhere</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-medium text-white">Team Collaboration</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Coordinate work across teams</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-medium text-white">Enterprise Security</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Bank-grade protection for your data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-violet-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 4a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H8zM2 2v20h20V2H2zm16 4h-4v12h4V8zM6 12h4v8H6v-8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-medium text-white">Custom Integrations</h4>
                  <p className="text-white/50 text-sm leading-relaxed">Connect with 200+ tools</p>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Use Cases */}
          <IndustryCards />

          {/* Pricing Preview */}
          <PricingPreview />

          {/* FAQ Section */}
          <FaqAccordion />

          {/* Sample ROI Calculator */}
          <div className="section-py-sm bg-gray-900/50 rounded-3xl card-responsive max-w-2xl mx-auto mb-12">
            <p className="section-subheading text-violet-400 mb-4">Calculate Your ROI</p>
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-4">See Your Potential Savings</h3>
            <p className="text-white/50 text-base sm:text-lg mb-8">
              Answer 3 quick questions to estimate your monthly savings and productivity gains with Nexora.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Monthly Revenue</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <label className="form-label">Team Size</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g., 15"
                />
              </div>
              <div>
                <label className="form-label">Current Automation</label>
                <select className="form-input">
                  <option value="0">0-10%</option>
                  <option value="10">10-30%</option>
                  <option value="30">30-50%</option>
                  <option value="50">50-70%</option>
                  <option value="70">70-90%</option>
                  <option value="90">90%+</option>
                </select>
              </div>
            </div>
            <button className="btn-primary w-full mt-6">
              Calculate ROI
            </button>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 lg:mt-16 pt-12 lg:pt-16 border-t border-white/10">
            <div className="text-center max-w-2xl mx-auto mb-8 space-responsive-y">
              <p className="section-subheading text-violet-400">
                Stay Updated
              </p>
              <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl">
                Get the Latest AI Insights
              </h2>
              <p className="hero-subheading text-white/50">
                Join 10,000+ subscribers receiving weekly automation tips, case studies, and product updates.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  )
}
