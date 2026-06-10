import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Root-level diagnostic/utility scripts (CJS require, not app code).
      // Read-only exception #1 (deliberate): CI-enabling, non-behavioural,
      // scopes out non-app scripts. Approved 2026-06-10.
      "*.js",
    ],
  },
];

export default eslintConfig;
