/**
 * Premium tool registry for the contractors-ir35 site.
 *
 * SEPARATE from the main fleet registry (lib/calculators/registry.ts) -- this
 * does NOT affect the indexable calculator pages, gallery, sitemap or embeds.
 * Premium tools are additive client islands only.
 *
 * Entries are added here ONLY after the tool's golden tests pass (per the brief).
 * Append-only: never remove or rename a toolId once a blog post has linked to it.
 *
 * Storage prefix: cfp (FROZEN). Grid keys: cfp:grid:<toolId>. Never ptp:/bfp:.
 */
import type { PremiumToolConfig } from "./types";
import { ir35TakeHomeCompareConfig } from "./configs/ir35-take-home-compare";
import { umbrellaVsLimitedPremiumConfig } from "./configs/umbrella-vs-limited";
import { salaryDividendPlannerConfig } from "./configs/salary-dividend-planner";
import { corporationTaxPlannerConfig } from "./configs/corporation-tax-planner";

/**
 * Map of toolId -> PremiumToolConfig.
 * All four R2 tools: golden tests pass before these entries were added.
 */
export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {
  "ir35-take-home-compare-premium":  ir35TakeHomeCompareConfig,
  "umbrella-vs-limited-premium":     umbrellaVsLimitedPremiumConfig,
  "salary-dividend-planner-premium": salaryDividendPlannerConfig,
  "corporation-tax-planner-premium": corporationTaxPlannerConfig,
};

/** Returns the config for a tool, or undefined when not registered. */
export function getPremiumTool(toolId: string): PremiumToolConfig | undefined {
  return PREMIUM_TOOLS[toolId];
}

/** True when a toolId has a registered premium config. */
export function hasPremiumTool(toolId: string): boolean {
  return Object.prototype.hasOwnProperty.call(PREMIUM_TOOLS, toolId);
}
