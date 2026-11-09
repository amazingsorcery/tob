import type { NextConfig } from "next";

/**
 * Every page is prerendered. `standalone` (not `export`) keeps a Node server for the
 * Docker image and deploy health checks.
 */
const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
