"use client";

import { useEffect, useState } from "react";
import { getVisitorId } from "@/lib/analytics/ids";
import { assignVariant } from "@/lib/experiments/assign";
import { setActiveExperiment } from "@/lib/experiments/active";

/**
 * Assign + register the variant for an experiment. Returns null (control) on the
 * server and first client render to avoid hydration mismatch, then the stable
 * variant after mount. Branch on the return value to vary the UI; exposure is
 * stamped onto every analytics event automatically.
 */
export function useExperiment(key: string): string | null {
  const [variant, setVariant] = useState<string | null>(null);
  useEffect(() => {
    const v = assignVariant(getVisitorId() || "", key);
    if (v) {
      setActiveExperiment(key, v);
      setVariant(v);
    }
  }, [key]);
  return variant;
}
