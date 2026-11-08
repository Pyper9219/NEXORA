/**
 * NextAuth configuration for Nexora
 * 
 * Uses the v4 App Router single-argument NextAuth(authOptions) form.
 * Uses Prisma for database queries in credentials provider.
 */

import NextAuth from "next-auth"
import type { Provider } from "next-auth/providers/index"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

/**
 * OAuth providers are only registered when both halves of their credentials
 * exist. NextAuth will happily list a provider configured with empty strings
 * and then fail at the redirect step, so gating here keeps /api/auth/providers
 * and the sign-in page honest.
 */
const providers: Provider[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "user@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Invalid credentials")
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email }
      })

      if (!user || !user.password) {
        throw new Error("Invalid email or password")
      }

      const isValid = await bcrypt.compare(credentials.password, user.password)

      if (!isValid) {
        throw new Error("Invalid email or password")
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || "user",
        subscriptionId: user.subscriptionId || null
      }
    }
  }),
]

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  )
}

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = (user as any).role
        token.subscriptionId = (user as any).subscriptionId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.subscriptionId = token.subscriptionId as string
      }
      return session
    },
  },

  providers,

  pages: {
    // Only override sign-in: src/app/auth/signin exists. The other NextAuth
    // pages (signout, error, verify-request) have no route in this app, so
    // overriding them would redirect users to a 404. Leave them at the
    // NextAuth defaults.
    signIn: "/auth/signin"
  }
}
