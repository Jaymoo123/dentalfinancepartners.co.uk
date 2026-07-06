import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: Medical/web -> Medical -> Accounting (repo root).
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
      // Apex-to-www permanent redirect. Without this Vercel defaults to a 307
      // Temporary redirect, leaking any PageRank accumulated on the bare domain.
      // The 'has' host condition limits the rule to requests arriving on the
      // apex domain so it never fires on www or preview deployments.
      {
        source: "/:path*",
        has: [{ type: "host", value: "medicalaccounts.co.uk" }],
        destination: "https://www.medicalaccounts.co.uk/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
