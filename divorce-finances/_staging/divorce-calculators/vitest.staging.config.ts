// Staging-only config: lets the staged fleet run before the site scaffold
// exists. Delete when the files move into divorce-finances/web (the site then
// uses packages/web-shared/vitest.config.ts like every sibling).
import { defineConfig } from "vitest/config";
import path from "node:path";

const SHARED = "C:/Users/user/Documents/Accounting/packages/web-shared";

export default defineConfig({
  test: { environment: "node", include: ["**/*.test.ts"] },
  resolve: {
    alias: {
      "@accounting-network/web-shared": path.resolve(SHARED),
    },
  },
});
