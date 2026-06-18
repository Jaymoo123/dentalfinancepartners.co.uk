"use client";

/**
 * Construction-CIS useExperiment hook -- re-export shim.
 *
 * Composes the shared factory with the construction registry and exports
 * `useExperiment` under the same name, preserving the existing API.
 *
 * Source of truth: packages/web-shared/experiments/react/useExperiment.ts
 */
import { makeUseExperiment } from "@accounting-network/web-shared/experiments/react/useExperiment";
import { siteRegistries } from "@accounting-network/web-shared/experiments/registries";

// Resolved once at module load: the construction-cis registry.
const constructionRegistry = siteRegistries["construction-cis"];

/**
 * Assign + register the variant for a construction-CIS experiment. Returns null
 * (control) on the server and first client render to avoid hydration mismatch,
 * then the stable variant after mount. Branch on the return value to vary the
 * UI; exposure is stamped onto every analytics event automatically.
 */
export const useExperiment = makeUseExperiment(constructionRegistry);
