import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";
import niche from "../niche.config.json" with { type: "json" };

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: charities/web -> charities -> Accounting (repo root).
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
  async headers() {
    // ga: false until a GA measurement id exists; no /embed routes on this site.
    return buildSecurityHeaders({ ga: false, supabase: true });
  },
  async redirects() {
    // Estate audit 2026-07: 4 live sites emit 307 on apex->www. Permanent 308
    // in code as a fallback; ALSO set the Vercel dashboard domain redirect to
    // 308 (permanent) when attaching the apex domain.
    // Domain derives from niche.config.json so the G1 brand/domain swap
    // happens in ONE place (no hardcoded host anywhere in code).
    const apex = niche.domain.replace(/^www\./, "");
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: apex }],
        destination: `https://${niche.domain}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
