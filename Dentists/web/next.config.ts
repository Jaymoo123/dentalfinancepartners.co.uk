import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: Dentists/web -> Dentists -> Accounting (repo root).
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
  async headers() {
    // ads: true widens frame-src for AdSense (owner 2026-09-28: set up every
    // site for AdSense). Solicitors carries the same flag.
    return buildSecurityHeaders({ ga: true, supabase: true, ads: true, embedPrefix: "embed" });
  },
  async redirects() {
    return [
      { source: "/pricing", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
