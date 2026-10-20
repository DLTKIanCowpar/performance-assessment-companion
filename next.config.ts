import type { NextConfig } from "next";

// Production deploy config — clean install + `next build` + `next start`.
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
