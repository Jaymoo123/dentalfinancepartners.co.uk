import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: console/web -> console -> Accounting (repo root).
const repoRoot = path.resolve(appDir, "..", "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: repoRoot,
  transpilePackages: ["@accounting-network/web-shared"],
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Global noindex header on every route (OB-01).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
