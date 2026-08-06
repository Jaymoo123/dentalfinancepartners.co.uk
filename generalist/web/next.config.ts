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
        source: "/pricing",
        destination: "/services",
        permanent: true,
      },
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
      // 2026-07-28: R3 year-transition clear batch. Each loser had ~0 equity on
      // BOTH Google and Bing (fresh GSC to 2026-07-26 + Bing to 07-27); winners
      // are the retained/refreshed pages. CGT-property cluster deferred (split
      // Google/Bing leaders, owner decision).
      {
        source: "/blog/bookkeeping-and-compliance/accounting-service-charges-2025-26-breakdown",
        destination: "/blog/bookkeeping-and-compliance/accounting-for-service-charges-uk-guide-2025-26",
        permanent: true,
      },
      {
        source: "/blog/corporation-tax/associated-companies-corporation-tax-rate-2025-26",
        destination: "/blog/corporation-tax/associated-companies-corporation-tax",
        permanent: true,
      },
      {
        source: "/blog/director-pay-and-dividends/dividend-tax-rates-2025-26-quarterly-director",
        destination: "/blog/director-pay-and-dividends/dividend-tax-rates-2025-26-quarterly-director-payments",
        permanent: true,
      },
    ];
  },
  async headers() {
    return buildSecurityHeaders({ ga: true, supabase: true, embedPrefix: "embed" });
  },
};

export default nextConfig;
