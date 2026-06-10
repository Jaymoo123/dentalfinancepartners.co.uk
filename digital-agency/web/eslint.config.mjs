import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores: in flat config, `ignores` is only project-wide when it is
  // the SOLE key in its own config object. Combined with `rules` (as it was
  // before), it merely scoped the rules and .next/ build output got linted.
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Apostrophes inside JSX text are widely accepted and rarely cause
      // real issues. Downgrade to warning so build doesn't fail.
      "react/no-unescaped-entities": "warn",
      // Unused vars - warn, don't fail
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];

export default eslintConfig;
