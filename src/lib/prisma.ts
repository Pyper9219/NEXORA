/**
 * Prisma Client singleton for Next.js App Router
 * Uses dynamic import for Turbopack compatibility
 * Real Prisma client should be generated with: npx prisma generate
 * DATABASE_URL must be set in .env.local
 */

import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
