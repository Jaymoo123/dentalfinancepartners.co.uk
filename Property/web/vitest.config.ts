import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  // PostCSS workaround: disable CSS processing in tests to avoid PostCSS
  // plugin errors when Tailwind v4 postcss config is present in the project.
  css: { postcss: { plugins: [] } },
  // Tests that render a component through react-dom/server need the automatic
  // JSX runtime, which is what Next compiles with; esbuild's default is classic.
  esbuild: { jsx: "automatic" },
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
