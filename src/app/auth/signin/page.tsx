import { Suspense } from "react"
import SignInForm from "./SignInForm"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 7v6l4 2-4 2v6h-8v-6l4-2-4-2v-6h8zm0-4c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H5c-2.21 0-4-1.79-4-4V7c0-2.21 1.79-4 4-4h14z"/>
              </svg>
            </div>
            <span className="text-2xl font-display font-bold text-white">Nexora</span>
          </a>
          <h1 className="text-3xl font-display font-bold text-white">Welcome back</h1>
          <p className="text-white/50 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Sign In Form with Suspense boundary for useSearchParams */}
        <Suspense fallback={<div className="bg-gray-900/50 rounded-2xl p-8 border border-white/10 animate-pulse"><div className="h-8 bg-gray-800 rounded w-3/4 mx-auto mb-4"></div><div className="h-4 bg-gray-800 rounded w-1/2 mx-auto mb-6"></div><div className="space-y-4"><div className="h-10 bg-gray-800 rounded"></div><div className="h-10 bg-gray-800 rounded"></div><div className="h-10 bg-gray-800 rounded"></div></div></div>}>
          <SignInForm />
        </Suspense>

        {/* Sign Up Link */}
        <p className="text-center text-white/50 mt-6">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-violet-400 font-medium hover:text-violet-300 transition-colors">
            Sign up
          </a>
        </p>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-white/10">
          <p className="text-white/50 text-sm text-center">
            <strong>Demo:</strong> demo@nexora.com / demo123
          </p>
        </div>
      </div>
    </div>
  )
}
