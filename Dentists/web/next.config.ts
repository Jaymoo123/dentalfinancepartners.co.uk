import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Anchor tracing to this app so Next does not treat C:\Users\user (extra lockfile) as the monorepo root.
  outputFileTracingRoot: appDir,
};

export default nextConfig;
