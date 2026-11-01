import NextAuth from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"

/**
 * NextAuth v4 App Router authentication route handlers.
 * Uses the single-argument NextAuth(authOptions) form for App Router compatibility.
 * GET and POST handlers are required for the [ ...nextauth ] dynamic route.
 */
export const GET = () => NextAuth(authOptions)
export const POST = () => NextAuth(authOptions)