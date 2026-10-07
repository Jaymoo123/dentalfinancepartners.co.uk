import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: crypto/web -> crypto -> Accounting (repo root).
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
        has: [{ type: "host", value: "cryptotaxpartners.co.uk" }],
        destination: "https://www.cryptotaxpartners.co.uk/:path*",
        permanent: true,
      },
    ];
  },
  // Phase 0 2026-09-28: this site had no security headers at all (no CSP).
  // frame-src widened for the ad iframe, so this adds the shared builder
  // shape as Solicitors/next.config.ts. embedPrefix: "embed" for
  // /embed/[slug] (partner-site calculator iframes).
  async headers() {
    return buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
