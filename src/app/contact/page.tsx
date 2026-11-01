"use client"

import { useState } from "react"
import { FaqAccordion } from '@/components/faq-accordion'
import { Navbar } from '@/components/ui/navbar'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setSubmitStatus("error")
        setErrorMessage(data.error || "Failed to send message. Please try again.")
      } else {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", company: "", message: "", phone: "" })
      }
    } catch (err) {
      setSubmitStatus("error")
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="flex-1 pt-20">
      <Navbar />

      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-violet-400 text-sm font-medium uppercase tracking-wider mb-4">
                Book a Demo
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
                Ready to Transform Your Business?
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Schedule a 30-minute call with our AI specialists to see how Nexora can automate your operations and drive growth.
              </p>
              
              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                  <p className="font-medium">Failed to send message</p>
                  <p className="text-sm mt-1">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 mb-8" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none transition-colors disabled:opacity-50"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    What challenges are you looking to solve? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-violet-500 focus:outline-none transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell us about your business and what you'd like to automate..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-violet-600 text-white px-8 py-3 rounded text-lg font-medium hover:bg-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Schedule Demo"}
                </button>
              </form>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-4xl opacity-70 blur-xl"></div>
              <div className="relative pt-20">
                <div className="bg-gray-900/80 rounded-2xl p-8 max-w-md">
                  <h3 className="text-2xl font-display font-bold mb-4">Quick Stats</h3>
                  <div className="space-y-3 text-white/60">
                    <div>
                      <p className="text-3xl font-display font-bold text-violet-500">15</p>
                      <p className="small">Min call duration</p>
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-violet-500">24</p>
                      <p className="small">Hours response</p>
                    </div>
                    <div>
                      <p className="text-3xl font-display font-bold text-violet-500">99%</p>
                      <p className="small">Satisfaction rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FaqAccordion />
        </div>
      </section>
    </main>
  )
}
