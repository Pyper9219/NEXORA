import NextAuth from "next-auth"
import { authOptions } from "@/auth/[...nextauth]"

/**
 * NextAuth v4 App Router route handlers.
 *
 * `NextAuth(authOptions)` returns a request handler, so it must be invoked
 * ONCE at module scope and the result exported as both GET and POST. Exporting
 * an arrow function that calls NextAuth() per request would hand Next.js a
 * function as the response body instead of a Response.
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
