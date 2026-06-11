"use client";

/**
 * Generalist (Holloway Davies) useExperiment hook.
 *
 * Composes the shared factory with the generalist registry and exports
 * `useExperiment` under the conventional name.
 *
 * Usage in components:
 *   import { useExperiment } from "@/lib/experiments";
 *   const variant = useExperiment("calc_promo_inline");
 *
 * The hook returns null on the server and first client render (null-until-mounted
 * contract), then the stable assigned variant after hydration. null is treated as
 * control: render the default (no-promo) experience on the server and first paint.
 *
 * Source of truth for experiment definitions:
 *   packages/web-shared/experiments/registries/generalist.ts
 */
import { makeUseExperiment } from "@accounting-network/web-shared/experiments/react/useExperiment";
import { generalistRegistry } from "@accounting-network/web-shared/experiments/registries/generalist";

/**
 * Assign + register the variant for a generalist experiment. Returns null (control)
 * on the server and first client render to avoid hydration mismatch, then the
 * stable variant after mount.
 */
export const useExperiment = makeUseExperiment(generalistRegistry);
