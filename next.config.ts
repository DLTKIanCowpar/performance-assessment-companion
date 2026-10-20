import type { NextConfig } from "next";

// Production deploy config — clean install + `next build` + `next start`.
const nextConfig: NextConfig = {
  // No `output: "standalone"` — the deploy builder runs next build + next start
  // directly. Standalone's post-build file-trace/copy step failed intermittently
  // on this workspace's filesystem, so it is intentionally omitted.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
