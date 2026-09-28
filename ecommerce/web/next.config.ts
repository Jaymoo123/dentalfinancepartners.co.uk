import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: ecommerce/web -> ecommerce -> Accounting (repo root).
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
        has: [{ type: "host", value: "ecommercefinance.co.uk" }],
        destination: "https://www.ecommercefinance.co.uk/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // 2026-09-28 parity phase 0: this site shipped with no CSP/security
    // headers at all (research finding I4). Added now, same shape as
    // Solicitors' (commit 7edc7fd3): embedPrefix "embed" for the /embed/*
    // calculator iframe, ads:true widens frame-src/script-src/connect-src for
    // AdSense (section 6, owner ruling "set up every site for AdSense").
    return buildSecurityHeaders({ ga: true, supabase: true, ads: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
