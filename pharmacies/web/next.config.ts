import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: pharmacies/web -> pharmacies -> Accounting (repo root).
const repoRoot = path.resolve(appDir, "..", "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: repoRoot,
  transpilePackages: ["@accounting-network/web-shared"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    // Estate audit 2026-07: 4 live sites emit 307 on apex->www. Permanent 308
    // in code as a fallback; ALSO set the Vercel dashboard domain redirect to
    // 308 (permanent) when attaching the apex domain.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "pharmacytax.co.uk" }],
        destination: "https://www.pharmacytax.co.uk/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // ads: true widens frame-src for AdSense (owner ruling 2026-09-28: every
    // site gets AdSense). embedPrefix keeps the existing /embed/* frame-ancestors
    // exception the partner iframe route already relies on.
    return buildSecurityHeaders({ ga: true, supabase: true, ads: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
