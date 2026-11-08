import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found | Nexora",
}

export default function NotFound() {
  return (
    <main className="page-main">
      <section className="section-py bg-gray-950">
        <div className="section-container text-center">
          <p className="section-subheading text-violet-400">404</p>
          <h1 className="hero-heading">This page doesn&apos;t exist</h1>
          <p className="hero-subheading text-white/60 mx-auto max-w-2xl">
            The link may be out of date, or the page may have moved. Head back
            home or tell us what you were looking for.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link href="/home" className="btn-primary">
              Back to home
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
