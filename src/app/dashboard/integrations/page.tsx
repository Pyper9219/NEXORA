import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import { IntegrationsHub } from "@/components/integrations-hub"

/**
 * Integrations dashboard page.
 *
 * Lets the signed-in user store API keys for external services (from the
 * API Mega List) and test / run them directly from the dashboard.
 */
export default async function IntegrationsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const integration = await (async () => {
    try {
      return await prisma.integration.findUnique({
        where: { userId: session.user.id },
      })
    } catch (error) {
      console.error("Integrations query failed:", error)
      return null
    }
  })()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Integrations</h1>
        <p className="text-white/50 mt-1">
          Connect NEXORA to external APIs from the API Mega List. Store your
          API keys here and run them directly from the dashboard.
        </p>
      </div>

      <IntegrationsHub
        userId={session.user.id}
        existingConfig={integration?.config as Record<string, unknown> | null}
      />
    </div>
  )
}
