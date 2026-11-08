/**
 * One-time script: create an admin user directly in Neon.
 * Uses the same hashing (bcryptjs, 12 rounds) and plan setup as
 * src/app/api/auth/register/route.ts so sign-in will work immediately.
 */
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const EMAIL = "amosmurimi217@gmail.com"
const PASSWORD = "#12345678"
const NAME = "Admin"

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: EMAIL } })
  if (existing) {
    console.log("User already exists:", existing.email, "(role:", existing.role, ")")
    // Update role/password to guarantee admin + correct password
    const hashed = await bcrypt.hash(PASSWORD, 12)
    const updated = await prisma.user.update({
      where: { email: EMAIL },
      data: { password: hashed, role: "admin", name: NAME },
    })
    console.log("Updated to admin:", updated.email, "(role:", updated.role, ")")
    return
  }

  const hashedPassword = await bcrypt.hash(PASSWORD, 12)

  const user = await prisma.user.create({
    data: {
      email: EMAIL,
      name: NAME,
      password: hashedPassword,
      role: "admin",
    },
  })

  // Mirror register route: give every new user a starter subscription
  const now = new Date()
  await prisma.subscription.create({
    data: {
      userId: user.id,
      status: "active",
      plan: "starter",
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      currentPeriodStart: now,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  console.log("Admin user created:")
  console.log("  email:", user.email)
  console.log("  role:", user.role)
  console.log("  id:", user.id)
}

main()
  .catch((e) => {
    console.error("ERROR:", e.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
