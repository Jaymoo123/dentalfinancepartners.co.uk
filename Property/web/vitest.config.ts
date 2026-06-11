import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  // PostCSS workaround: disable CSS processing in tests to avoid PostCSS
  // plugin errors when Tailwind v4 postcss config is present in the project.
  css: { postcss: { plugins: [] } },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
