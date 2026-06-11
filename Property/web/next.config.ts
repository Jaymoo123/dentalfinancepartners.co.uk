import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: Property/web -> Property -> Accounting (repo root).
// Used so Next.js traces files in the npm workspace (packages/web-shared/*).
const repoRoot = path.resolve(appDir, "..", "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: repoRoot,
  // Workspace package contains pure TS — Next.js must transpile it.
  transpilePackages: ["@accounting-network/web-shared"],
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    // W2: shared builder. embedPrefix: "embed" keeps live embeds frameable (SEC-03).
    // ga: true adds GTM/GA script-src + connect-src.
    // supabase: true adds Supabase connect-src.
    // clarity: true adds clarity.ms script-src.
    // SEC-02 documented exception applies as-is (see security-headers.ts).
    return buildSecurityHeaders({
      ga: true,
      supabase: true,
      clarity: true,
      embedPrefix: "embed",
    });
  },
};

export default nextConfig;
