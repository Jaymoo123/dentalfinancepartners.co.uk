import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  css: { postcss: { plugins: [] } },
  // tsconfig sets `jsx: "preserve"` for Next, which esbuild reads as the classic
  // transform, so any test that imports a component failed with "React is not
  // defined". The app itself already builds on the automatic runtime; this only
  // tells the test transform the same thing.
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
  },
});
