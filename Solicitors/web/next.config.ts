import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: Solicitors/web -> Solicitors -> Accounting (repo root).
const repoRoot = path.resolve(appDir, "..", "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: repoRoot,
  transpilePackages: ["@accounting-network/web-shared"],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async redirects() {
    return [
      // Canonical host: www.accountsforlawyers.co.uk. Non-www variants must
      // 301 to consolidate ranking signals. GSC shows split indexing across
      // both hosts which dilutes authority.
      {
        source: "/:path*",
        has: [{ type: "host", value: "accountsforlawyers.co.uk" }],
        destination: "https://www.accountsforlawyers.co.uk/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // embedPrefix: "embed" adds frame-ancestors exception for /embed/* pages
    // so partner sites can iframe our calculators.
    return buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
