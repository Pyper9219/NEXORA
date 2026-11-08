import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

async function getBillingData(userId: string) {
  const [subscription, payments, paymentMethods] = await Promise.all([
    prisma.subscription.findUnique({
      where: { userId },
      include: { user: true }
    }),
    prisma.auditLog.findMany({
      where: { 
        userId,
        action: { in: ["payment_succeeded", "payment_failed", "subscription_created", "subscription_updated"] }
      },
      orderBy: { createdAt: "desc" },
      take: 20
    }),
    prisma.paymentMethod.findMany({
      where: { userId },
      orderBy: { isDefault: "desc" }
    })
  ])

  return { subscription, payments, paymentMethods }
}

const planDetails: Record<string, { name: string; price: string; features: string[] }> = {
  starter: {
    name: "Starter",
    price: "$29/mo",
    features: ["100 automation tasks/month", "Email support", "Basic analytics", "1 user seat"]
  },
  growth: {
    name: "Growth",
    price: "$79/mo",
    features: ["500 automation tasks/month", "Email & Chat support", "Advanced analytics", "3 user seats", "AI predictive insights"]
  },
  pro: {
    name: "Pro",
    price: "$159/mo",
    features: ["1,000 automation tasks/month", "Priority support", "All features", "5 user seats", "Custom integrations", "API access"]
  },
  enterprise: {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited tasks", "Dedicated account manager", "White-label solution", "Custom compliance", "SLA guaranteed", "On-premise option"]
  }
}

export default async function BillingPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const { subscription, payments, paymentMethods } = await getBillingData(session.user.id)
  const currentPlan = subscription?.plan || "starter"
  const plan = planDetails[currentPlan]

  const statusColors: Record<string, string> = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    canceled: "bg-red-500/20 text-red-400 border-red-500/30",
    past_due: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    incomplete: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    trialing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  }

  const statusColor = statusColors[subscription?.status || "inactive"] || statusColors.canceled

  // Type-safe access to payment details
  const getPaymentAmount = (details: any) => {
    if (details && typeof details === 'object' && 'amount' in details) {
      return details.amount
    }
    return null
  }

  const getPaymentCurrency = (details: any) => {
    if (details && typeof details === 'object' && 'currency' in details) {
      return details.currency
    }
    return 'usd'
  }

  const getPaymentDescription = (details: any) => {
    if (details && typeof details === 'object' && 'description' in details) {
      return details.description
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Billing & Subscription</h1>
        <p className="text-white/50 mt-1">Manage your subscription, payment methods, and billing history.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
          <div>
            <p className="text-white/50 text-sm">Current Plan</p>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-display font-bold text-white">{plan.name}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                {subscription?.status || "inactive"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-sm">Billed Monthly</p>
            <p className="text-2xl font-display font-bold text-white">{plan.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-white/50 text-sm">Next Billing Date</p>
            <p className="text-white font-medium">
              {subscription?.currentPeriodEnd 
                ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                : "—"}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-white/50 text-sm">Billing Cycle</p>
            <p className="text-white font-medium">Monthly</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-white/50 text-sm">Auto-Renew</p>
            <p className="text-white font-medium">
              {subscription?.cancelAtPeriodEnd ? "Canceling at period end" : "Enabled"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.location.href = "/api/billing-portal"}
            className="bg-violet-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-violet-500 transition-colors"
          >
            Manage Subscription
          </button>
          <Link
            href="/pricing"
            className="border-2 border-violet-400 text-violet-400 px-6 py-3 rounded-lg font-medium hover:bg-violet-600/20 transition-colors text-center"
          >
            Change Plan
          </Link>
          {subscription?.cancelAtPeriodEnd && (
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors">
              Resume Subscription
            </button>
          )}
        </div>
      </div>

      {/* Plan Features */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-bold text-white mb-6">Plan Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-white">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">Payment Methods</h2>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-500 transition-colors text-sm">
            Add Payment Method
          </button>
        </div>

        {paymentMethods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <PaymentMethodCard key={method.id} method={method} isDefault={method.isDefault} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <p className="text-white/50">No payment methods added</p>
            <p className="text-white/30 text-sm mt-1">Add a payment method to enable automatic billing</p>
          </div>
        )}
      </div>

      {/* Billing History */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-display font-bold text-white mb-6">Billing History</h2>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Description</th>
                  <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-white/50 text-sm font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const details = payment.details
                  const amount = getPaymentAmount(details)
                  const currency = getPaymentCurrency(details)
                  const description = getPaymentDescription(details)
                  
                  return (
                    <tr key={payment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white/70 text-sm">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-white text-sm">
                        {description || payment.action}
                      </td>
                      <td className="py-4 px-4 text-white font-medium text-sm">
                        {amount !== null 
                          ? `$${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`
                          : "—"}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.action.includes("failed") 
                            ? "bg-red-500/20 text-red-400" 
                            : "bg-green-500/20 text-green-400"
                        }`}>
                          {payment.action.includes("failed") ? "Failed" : "Succeeded"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-violet-400 text-sm hover:text-violet-300 transition-colors">
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-white/50">No billing history yet</p>
            <p className="text-white/30 text-sm mt-1">Your invoices will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

function PaymentMethodCard({ method, isDefault }: { method: any; isDefault: boolean }) {
  const typeIcons: Record<string, string> = {
    card: "💳",
    mpesa: "📱",
    paystack: "💳",
    flutterwave: "💳",
    visa: "💳",
    mastercard: "💳",
    crypto: "₿",
    ussd: "📱",
  }

  return (
    <div className={`bg-gray-800/50 rounded-xl p-4 border ${isDefault ? "border-violet-500/50" : "border-white/10"}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{typeIcons[method.type] || "💳"}</span>
          <div>
            <p className="text-white font-medium">{method.name}</p>
            <p className="text-white/50 text-sm">{method.provider} • {method.type}</p>
          </div>
        </div>
        {isDefault && (
          <span className="px-2 py-1 bg-violet-500/20 text-violet-400 text-xs font-medium rounded-full">
            Default
          </span>
        )}
      </div>

      {method.last4 && (
        <p className="text-white/50 text-sm mb-3">Ending in •••• {method.last4}</p>
      )}

      {method.brand && (
        <p className="text-white/50 text-sm mb-3 capitalize">{method.brand}</p>
      )}

      <div className="flex gap-2">
        {!isDefault && (
          <button className="flex-1 border-2 border-white/20 text-white/70 px-3 py-2 rounded-lg text-sm font-medium hover:border-violet-400 hover:text-violet-400 transition-colors">
            Set as Default
          </button>
        )}
        <button className="flex-1 border-2 border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-500/10 transition-colors">
          Remove
        </button>
      </div>
    </div>
  )
}
