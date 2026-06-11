"use client";

import { useEffect, useState } from "react";
import { getVisitorId } from "../../analytics/ids";
import { assignVariant } from "../assign";
import { setActiveExperiment } from "../../analytics/experiments/active";
import type { SiteExperimentRegistry } from "../types";

/**
 * QA / preview override: `?ab=key:variant[,key2:variant2]` in the URL forces a
 * variant for that experiment, so you can preview a treatment without waiting to
 * be bucketed into it. Only affects the current visitor's own session.
 */
function overrideFor(key: string): string | null {
  if (typeof window === "undefined") return null;
  const ab = new URLSearchParams(window.location.search).get("ab");
  if (!ab) return null;
  for (const tok of ab.split(",")) {
    const i = tok.indexOf(":");
    if (i > 0 && tok.slice(0, i) === key) return tok.slice(i + 1) || null;
  }
  return null;
}

/**
 * Factory that produces a `useExperiment` hook bound to a specific site registry.
 *
 * Usage (once, at site composition level):
 *
 *   import { makeUseExperiment } from "@accounting-network/web-shared/experiments/react/useExperiment";
 *   import { propertyRegistry } from "@accounting-network/web-shared/experiments/registries/property";
 *   export const useExperiment = makeUseExperiment(propertyRegistry);
 *
 * Then in components:
 *   const variant = useExperiment("calc_result_capture");
 *
 * The hook:
 *  - Returns null (control) on the server and first client render to avoid
 *    hydration mismatch -- NULL-UNTIL-MOUNTED CONTRACT IS PRESERVED VERBATIM.
 *  - After mount, resolves the stable variant from the visitor id.
 *  - Respects ?ab=key:variant QA overrides.
 *  - Registers the active assignment via setActiveExperiment so track() stamps
 *    props.exp on every subsequent analytics event automatically.
 */
export function makeUseExperiment(registry: SiteExperimentRegistry) {
  return function useExperiment(key: string): string | null {
    const [variant, setVariant] = useState<string | null>(null);
    useEffect(() => {
      const exp =
        registry.experiments.find((e) => e.key === key && e.status === "running") ?? null;
      const v = overrideFor(key) ?? assignVariant(getVisitorId() || "", exp);
      if (v) {
        setActiveExperiment(key, v);
        setVariant(v);
      }
    }, [key]);
    return variant;
  };
}
