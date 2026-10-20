import type { NextConfig } from "next";
import path from "path";

// Production deploy config for Next.js 16 (Turbopack).
const nextConfig: NextConfig = {
  // Pin the Turbopack build root to THIS app directory so Next.js does not walk
  // up and misinterpret a parent pnpm-workspace.yaml as a monorepo root.
  turbopack: {
    root: path.join(__dirname),
  },
  // NOTE: do NOT add a top-level `eslint` key — Next.js 16 removed it from the
  // config schema and it triggers a TS2353 typecheck failure during `next build`.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
