/**
 * Premium tool registry for the construction-cis site.
 *
 * SEPARATE from the main fleet registry (lib/calculators/registry.ts) -- this
 * does NOT affect the indexable calculator pages, gallery, sitemap or embeds.
 * Premium tools are additive client islands only.
 *
 * Entries are added here ONLY after the tool's golden tests pass (per the brief).
 * Append-only: never remove or rename a toolId once a blog post has linked to it.
 *
 * Storage prefix: bfp (FROZEN). Grid keys: bfp:grid:<toolId>.
 */
import type { PremiumToolConfig } from "./types";
import { cisRefundPlannerConfig } from "./configs/cis-refund-planner";
import { cisVsPayeConfig } from "./configs/cis-vs-paye";
import { cisGpsReadinessConfig } from "./configs/cis-gps-readiness";

/**
 * Map of toolId -> PremiumToolConfig.
 * All three R2 tools: golden tests pass before these entries were added.
 */
export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {
  "cis-refund-planner-premium": cisRefundPlannerConfig,
  "cis-vs-paye-premium": cisVsPayeConfig,
  "cis-gps-readiness-premium": cisGpsReadinessConfig,
};

/** Returns the config for a tool, or undefined when not registered. */
export function getPremiumTool(toolId: string): PremiumToolConfig | undefined {
  return PREMIUM_TOOLS[toolId];
}

/** True when a toolId has a registered premium config. */
export function hasPremiumTool(toolId: string): boolean {
  return Object.prototype.hasOwnProperty.call(PREMIUM_TOOLS, toolId);
}
