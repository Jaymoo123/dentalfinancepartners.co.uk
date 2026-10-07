import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: contractors-ir35/web -> contractors-ir35 -> Accounting (repo root).
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
    // embedPrefix: "embed" allows /embed/* to be framed in third-party iframes
    // (SEC-03 fix: without this, buildSecurityHeaders emits X-Frame-Options DENY
    // site-wide, which blocks the embed pages from working in iframe contexts).
    return buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
