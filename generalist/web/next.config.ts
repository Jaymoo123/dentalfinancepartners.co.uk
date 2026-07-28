import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: generalist/web -> generalist -> Accounting (repo root).
const repoRoot = path.resolve(appDir, "..", "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: repoRoot,
  transpilePackages: ["@accounting-network/web-shared"],
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async redirects() {
    // 2026-07-23: five exact-duplicate slug pairs (2026-07-23 opportunity
    // audit). Loser of each pair 301s to the equity winner (GSC/Bing checked);
    // loser markdown removed.
    return [
      {
        source: "/blog/limited-company-tax/director-loan-write-off-tax-implications",
        destination: "/blog/limited-company-tax/directors-loan-written-off-tax-implications",
        permanent: true,
      },
      {
        source: "/blog/exit-and-capital-gains/gift-shares-family-member-cgt",
        destination: "/blog/exit-and-capital-gains/gifting-shares-family-member-cgt",
        permanent: true,
      },
      {
        source: "/blog/incorporation-and-structure/change-company-name-companies-house",
        destination: "/blog/incorporation-and-structure/how-to-change-company-name-companies-house",
        permanent: true,
      },
      {
        source: "/blog/director-pay-and-dividends/tax-efficient-salary-dividend-split-2025-26",
        destination: "/blog/director-pay-and-dividends/tax-efficient-salary-dividend-split-director-2025-26",
        permanent: true,
      },
      {
        source: "/blog/director-pay-and-dividends/dividend-before-board-meeting-minutes-signed",
        destination: "/blog/director-pay-and-dividends/director-takes-dividend-before-board-minutes-signed",
        permanent: true,
      },
    ];
  },
  async headers() {
    return buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
