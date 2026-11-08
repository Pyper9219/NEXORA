import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth/[...nextauth]"
import { DashboardShell } from "@/components/dashboard-shell"

/**
 * Server-side auth gate for every /dashboard route.
 *
 * This has to live in a server component ABOVE the client shell: when the
 * redirect was issued from a page underneath a client component, Next.js
 * streamed a 200 with a client-side redirect instead of a 307. Checking here
 * means signed-out visitors get a real redirect before anything renders.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  return <DashboardShell session={session}>{children}</DashboardShell>
}
