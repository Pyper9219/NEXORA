import { Navbar } from '@/components/ui/navbar'

export default function LegalPage() {
  return (
    <main className="flex-1 pt-20">
      <Navbar />

      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-violet-400 mb-6">Terms of Service</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">Last updated: January 2026</p>
              <ul className="space-y-4 text-white/60">
                <li>
                  <p className="font-medium">1. Acceptance of Terms</p>
                  <p className="ml-4 text-white/40 small">These terms constitute a legal agreement between you ("user") and Nexora regarding your use of our platform.</p>
                </li>
                <li>
                  <p className="font-medium">2. Service Description</p>
                  <p className="ml-4 text-white/40 small">Nexora provides an AI-powered business growth platform offering automation, analytics, and integration services.</p>
                </li>
                <li>
                  <p className="font-medium">3. User Conduct</p>
                  <p className="ml-4 text-white/40 small">You agree not to use the service for any illegal or unauthorized purpose.</p>
                </li>
                <li>
                  <p className="font-medium">4. Intellectual Property</p>
                  <p className="ml-4 text-white/40 small">All content and software provided by Nexora is protected by international copyright and trademark laws.</p>
                </li>
                <li>
                  <p className="font-medium">5. Termination</p>
                  <p className="ml-4 text-white/40 small">Nexora may terminate your account at any time for violation of these terms.</p>
                </li>
              </ul>
              <a href="/privacy" className="mt-6 text-violet-400 hover:text-white transition-colors text-sm font-medium">
                Read Privacy Policy
              </a>
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-violet-400 mb-6">Privacy Policy</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">Last updated: January 2026</p>
              <ul className="space-y-4 text-white/60">
                <li>
                  <p className="font-medium">1. Information We Collect</p>
                  <p className="ml-4 text-white/40 small">We collect information provided during account creation and usage data to improve our service.</p>
                </li>
                <li>
                  <p className="font-medium">2. How We Use Information</p>
                  <p className="ml-4 text-white/40 small">Your information is used to operate the service, improve our platform, and communicate with you.</p>
                </li>
                <li>
                  <p className="font-medium">3. Data Security</p>
                  <p className="ml-4 text-white/40 small">We implement appropriate data security measures to protect your information.</p>
                </li>
                <li>
                  <p className="font-medium">4. Cookies</p>
                  <p className="ml-4 text-white/40 small">We use cookies to enhance your browsing experience.</p>
                </li>
                <li>
                  <p className="font-medium">5. Your Rights</p>
                  <p className="ml-4 text-white/40 small">You have the right to access, modify, or delete your personal data.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm">© 2026 Nexora. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>
  )
}