import path from "node:path"
import type { NextConfig } from "next"

/**
 * Pin Turbopack's root to this directory.
 *
 * Without this, Turbopack walks up and finds /home/tylor/package-lock.json,
 * assumes the monorepo root is the home directory, and then refuses to use
 * this project's own lockfile. Pinning the root keeps resolution (and the
 * file watcher) scoped to the repo.
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, "."),
  },
}

export default nextConfig
