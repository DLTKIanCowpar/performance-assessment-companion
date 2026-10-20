import type { NextConfig } from "next";

// Production deploy config — clean install + `next build` + `next start`.
const nextConfig: NextConfig = {
  // Platform health probes hit "/health" with NO trailing slash. Next's default
  // trailing-slash handling was issuing a 308 redirect then 404 at that exact
  // path, which made the deploy probe mark the container unhealthy and recycle
  // it in a loop. Disable the trailing-slash redirect so "/health" resolves
  // directly to the app/health/route.ts handler and returns 200.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      // Belt-and-suspenders: any probe variant maps to the handler.
      { source: "/health/", destination: "/health" },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
