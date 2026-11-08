import './globals.css'
import { Navbar } from '@/components/ui/navbar'
import { Providers } from './providers'

// Self-hosted font classes - fonts are loaded via CSS in globals.css
// to avoid network dependencies in restricted environments

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: 'Nexora | AI-Powered Business Growth Platform',
  description: 'Transform your business with intelligent automation, predictive analytics, and AI-powered growth tools. Join 2,000+ businesses already scaling faster.',
  openGraph: {
    title: 'Nexora - AI-Powered Business Growth Platform',
    description: 'Transform your business with intelligent automation, predictive analytics, and AI-powered growth tools',
    images: '/og-image.png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexora - AI-Powered Business Growth Platform',
    description: 'Transform your business with intelligent automation, predictive analytics, and AI-powered growth tools',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white min-h-screen">
        <Providers>
          <Navbar />
          {/* Pages own their <main> landmark; the layout only offsets the
              fixed navbar. Nesting <main> here produced invalid HTML. */}
          <div className="pt-20">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
