"use client";

import { useEffect, useState } from "react";
import { getVisitorId } from "@/lib/analytics/ids";
import { assignVariant } from "@/lib/experiments/assign";
import { setActiveExperiment } from "@/lib/experiments/active";

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
 * Assign + register the variant for an experiment. Returns null (control) on the
 * server and first client render to avoid hydration mismatch, then the stable
 * variant after mount. Branch on the return value to vary the UI; exposure is
 * stamped onto every analytics event automatically.
 */
export function useExperiment(key: string): string | null {
  const [variant, setVariant] = useState<string | null>(null);
  useEffect(() => {
    const v = overrideFor(key) ?? assignVariant(getVisitorId() || "", key);
    if (v) {
      setActiveExperiment(key, v);
      setVariant(v);
    }
  }, [key]);
  return variant;
}
