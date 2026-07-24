import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: construction-cis/web -> construction-cis -> Accounting (repo root).
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
    // SEC-03: embedPrefix opens frame-ancestors for /embed/* so third-party
    // sites can iframe calculators. Without this, buildSecurityHeaders emits
    // X-Frame-Options DENY + frame-ancestors 'none' everywhere, breaking embeds.
    return buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
