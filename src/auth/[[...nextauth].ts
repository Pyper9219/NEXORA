/**
 * NextAuth v4 App Router authentication configuration
 * 
 * Uses single-argument NextAuth(authOptions) form for App Router compatibility
 * Session strategy set to "jwt" with as const for type safety
 */
import NextAuth, { SessionStrategy } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "name@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
        })
        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return { id: user.id, email: user.email, name: user.name }
        }
        return null
      },
    }),
  ],
  session: {
    // Use "jwt" strategy for type compatibility with NextAuth v4
    strategy: "jwt" as SessionStrategy,
  },
  // Required for NextAuth v4 App Router single-argument form
  callbacks: {
    session: ({ session, token }) => {
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
}