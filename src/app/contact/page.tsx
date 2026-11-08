"use client"

import { useState } from "react"
import { FaqAccordion } from '@/components/faq-accordion'

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
    <main className="page-main">
      <section className="section-py bg-gray-950">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="space-responsive-y">
              <p className="section-subheading text-violet-400">Book a Demo</p>
              <h1 className="hero-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                Ready to Transform Your Business?
              </h1>
              <p className="hero-subheading text-white/60">
                Schedule a 30-minute call with our AI specialists to see how Nexora can automate your operations and drive growth.
              </p>
              
              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="card-responsive-sm bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="card-responsive-sm bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                  <p className="font-medium">Failed to send message</p>
                  <p className="text-sm mt-1">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="name" className="form-label">
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
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
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
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="form-label">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="form-input"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="form-label">
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
                    className="form-textarea"
                    placeholder="Tell us about your business and what you'd like to automate..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full touch-target"
                >
                  {isLoading ? "Sending..." : "Schedule Demo"}
                </button>
              </form>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-4xl opacity-70 blur-xl lg:hidden"></div>
              <div className="relative pt-12 lg:pt-20">
                <div className="card-responsive bg-gray-900/80 rounded-2xl max-w-md mx-auto lg:mx-0">
                  <h3 className="text-xl sm:text-2xl font-display font-bold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-display font-bold text-violet-500">15</p>
                      <p className="text-xs sm:text-sm text-white/60">Min call duration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-display font-bold text-violet-500">24</p>
                      <p className="text-xs sm:text-sm text-white/60">Hours response</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl sm:text-3xl font-display font-bold text-violet-500">99%</p>
                      <p className="text-xs sm:text-sm text-white/60">Satisfaction rate</p>
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
