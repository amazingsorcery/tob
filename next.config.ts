import type { NextConfig } from "next";

/**
 * The whole site is static. Every page is generated at build time from the Markdown in
 * `content/works/`, there is no database, no session and no request-time data, so nothing
 * needs a server beyond one that returns files.
 *
 * `output: "standalone"` is kept rather than `export` for one reason: it keeps `next start`
 * available for the production smoke checks the deploy script runs, and it costs nothing
 * when every route is prerendered anyway.
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
