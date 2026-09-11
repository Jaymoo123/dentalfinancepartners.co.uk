import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  css: { postcss: { plugins: [] } },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // The route smoke tests dynamically import the whole lead stack, and the
    // first import pays the transform cost (measured over 120s of transform on
    // a machine running several site builds at once). At vitest's 5s default
    // that times out and CI goes red on a passing suite, which emails the
    // owner. A red run has to mean a verified defect, so the ceiling is raised
    // rather than the slow test being skipped.
    testTimeout: 20000,
  },
});
