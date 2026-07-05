/**
 * Premium tool registry — maps tool IDs to their PremiumToolConfig descriptors.
 *
 * Add one import + one entry per tool. The gallery, blog-injection, and
 * PremiumUpgrade component all resolve configs through getPremiumTool().
 *
 * This registry is intentionally separate from the standard tool fleet registry
 * (src/lib/tools/registry.ts) so the standard fleet pages are unaffected.
 */

import type { PremiumToolConfig } from "./types";
import { directorPayPremium } from "./tools/director-pay";
import { incorporationPremium } from "./tools/incorporation";
import { vatSchemePremium } from "./tools/vat-scheme";
import { employerCostPremium } from "./tools/employer-cost";
import { rdEstimatorPremium } from "./tools/rd-estimator";
import { badrExitPremium } from "./tools/badr-exit";

export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {
  [directorPayPremium.id]: directorPayPremium,
  [incorporationPremium.id]: incorporationPremium,
  [vatSchemePremium.id]: vatSchemePremium,
  [employerCostPremium.id]: employerCostPremium,
  [rdEstimatorPremium.id]: rdEstimatorPremium,
  [badrExitPremium.id]: badrExitPremium,
};

/** Retrieve a premium tool config by slug, or null if not found. */
export function getPremiumTool(id: string): PremiumToolConfig | null {
  return PREMIUM_TOOLS[id] ?? null;
}

/** True if a premium tool exists for the given slug. */
export function hasPremiumTool(id: string): boolean {
  return id in PREMIUM_TOOLS;
}
