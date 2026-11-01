"use client"

import { useState } from "react"
import { Mail, Loader2, Check } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setMessage(data.error || "Failed to subscribe. Please try again.")
      } else {
        setStatus("success")
        setMessage(data.message || "Successfully subscribed!")
        setEmail("")
      }
    } catch (err) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-responsive-col gap-3 max-w-md mx-auto w-full">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        id="newsletter-email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === "loading" || status === "success"}
        className="form-input flex-1"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="btn-primary w-full sm:w-auto touch-target"
      >
        {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
        {status === "success" && <Check className="w-5 h-5" />}
        {status !== "loading" && status !== "success" && (
          <>
            <Mail className="w-5 h-5" />
            <span>Subscribe</span>
          </>
        )}
      </button>
      
      {message && (
        <p className={`text-sm text-center sm:text-left w-full ${
          status === "success" ? "text-green-400" : "text-red-400"
        }`} role="alert">
          {message}
        </p>
      )}
    </form>
  )
}

export default NewsletterForm
