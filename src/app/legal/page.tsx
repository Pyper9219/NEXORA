
export default function LegalPage() {
  return (
    <main className="page-main">
      <section className="section-py bg-gray-950">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div id="terms" className="space-responsive-y scroll-mt-28">
              <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl text-violet-400">Terms of Service</h2>
              <p className="hero-subheading text-white/60">Last updated: January 2026</p>
              <ul className="space-y-4 text-white/60">
                <li>
                  <p className="font-medium text-base sm:text-lg">1. Acceptance of Terms</p>
                  <p className="ml-4 text-white/40 text-sm">These terms constitute a legal agreement between you ("user") and Nexora regarding your use of our platform.</p>
                </li>
                <li>
                  <p className="font-medium text-base sm:text-lg">2. Service Description</p>
                  <p className="ml-4 text-white/40 text-sm">Nexora provides an AI-powered business growth platform offering automation, analytics, and integration services.</p>
                </li>
                <li>
                  <p className="font-medium text-base sm:text-lg">3. User Conduct</p>
                  <p className="ml-4 text-white/40 text-sm">You agree not to use the service for any illegal or unauthorized purpose.</p>
                </li>
                <li>
                  <p className="font-medium text-base sm:text-lg">4. Intellectual Property</p>
                  <p className="ml-4 text-white/40 text-sm">All content and software provided by Nexora is protected by international copyright and trademark laws.</p>
                </li>
                <li>
                  <p className="font-medium text-base sm:text-lg">5. Termination</p>
                  <p className="ml-4 text-white/40 text-sm">Nexora may terminate your account at any time for violation of these terms.</p>
                </li>
              </ul>
              <a href="#privacy" className="btn-ghost mt-6 inline-block">
                Read Privacy Policy
              </a>
            </div>
            <div id="privacy" className="space-responsive-y scroll-mt-28">
              <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl text-violet-400">Privacy Policy</h2>
              <p className="hero-subheading text-white/60">Last updated: January 2026</p>
              <ul className="space-y-4 text-white/60">
                <li>
                  <p className="font-medium text-base sm:text-lg">1. Information We Collect</p>
                  <p className="ml-4 text-white/40 text-sm">We collect information provided during account creation and usage data to improve our service.</p>
                </li>
                <li>
                  <p className="font-medium text-base sm:text-lg">2. How We Use Information</p>
                  <p className="ml-4 text-white/40 text-sm">Your information is used to operate the service, improve our platform, and communicate with you.</p>
                </li>
                <li>
                  <p className="font-medium text-base sm:text-lg">3. Data Security</p>
                  <p className="ml-4 text-white/40 text-sm">We implement appropriate data security measures to protect your information.</p>
                </li>
                <li>
                  <p className="font-medium text-base sm:text-lg">4. Cookies</p>
                  <p className="ml-4 text-white/40 text-sm">We use cookies to enhance your browsing experience.</p>
                </li>
                <li>
                  <p className="font-medium text-base sm:text-lg">5. Your Rights</p>
                  <p className="ml-4 text-white/40 text-sm">You have the right to access, modify, or delete your personal data.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 lg:mt-16 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm text-center">© 2026 Nexora. All rights reserved.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
