import type { NextConfig } from "next";
import path from "path";

// Production deploy config — clean install + `next build` + `next start`.
const nextConfig: NextConfig = {
  // Pin the file-tracing root to THIS app directory. Without this, Next.js walks
  // up the tree, finds a stray pnpm-workspace.yaml in the parent (/workspace),
  // infers a monorepo root there, and produces an invalid production build that
  // crash-loops in the deployed container (404/502). Pinning it fixes the deploy.
  outputFileTracingRoot: path.join(__dirname),

  // No `output: "standalone"` — the deploy builder runs next build + next start
  // directly.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
