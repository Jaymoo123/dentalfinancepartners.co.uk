/**
 * Premium tool registry for the Agency Founder Finance site (aff).
 *
 * SEPARATE from the main fleet registry (lib/tools/registry.ts) -- this does NOT
 * affect the indexable calculator pages, gallery, sitemap or embeds.
 * Premium tools are additive client islands only.
 *
 * Storage prefix: aff (FROZEN). Grid keys: aff:grid:<toolId>.
 * Never ptp:/dfp:/cfp:/bfp:.
 *
 * Entries are added here ONLY after the tool's golden tests pass (per the brief).
 * Append-only: never remove or rename a toolId once a blog post has linked to it.
 */
import type { PremiumToolConfig } from "./types";
import { salaryDividendOptimiserConfig } from "./configs/salary-dividend-optimiser";
import { agencyExitCgtConfig } from "./configs/agency-exit-cgt";
import { vatSchemeComparatorConfig } from "./configs/vat-scheme-comparator";
import { employerCostToHireConfig } from "./configs/employer-cost-to-hire";
import { rdTaxCreditConfig } from "./configs/rd-tax-credit";

/**
 * Map of toolId -> PremiumToolConfig.
 * All five R2 tools: golden tests pass before these entries were added.
 */
export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {
  "salary-dividend-optimiser-premium": salaryDividendOptimiserConfig,
  "agency-exit-cgt-premium":           agencyExitCgtConfig,
  "vat-scheme-comparator-premium":     vatSchemeComparatorConfig,
  "employer-cost-to-hire-premium":     employerCostToHireConfig,
  "rd-tax-credit-premium":             rdTaxCreditConfig,
};

/** Returns the config for a tool, or undefined when not registered. */
export function getPremiumTool(toolId: string): PremiumToolConfig | undefined {
  return PREMIUM_TOOLS[toolId];
}

/** True when a toolId has a registered premium config. */
export function hasPremiumTool(toolId: string): boolean {
  return Object.prototype.hasOwnProperty.call(PREMIUM_TOOLS, toolId);
}
