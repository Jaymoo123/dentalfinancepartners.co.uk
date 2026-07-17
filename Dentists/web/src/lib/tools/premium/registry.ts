/**
 * Premium tool registry for the Dentists site.
 *
 * SEPARATE from the main fleet registry (lib/tools/registry.ts) -- this does NOT
 * affect the indexable calculator pages, gallery, sitemap or embeds.
 * Premium tools are additive client islands only.
 *
 * Entries are added here ONLY after the tool's golden tests pass (per the brief).
 * Append-only: never remove or rename a toolId once a blog post has linked to it.
 *
 * Storage prefix: dfp (FROZEN). Grid keys: dfp:grid:<toolId>.
 */
import type { PremiumToolConfig } from "./types";
import { associateIncorporationConfig } from "./configs/associate-incorporation";
import { associateTakeHomeConfig } from "./configs/associate-take-home";
import { principalExtractionConfig } from "./configs/principal-extraction";
import { practicePurchaseConfig } from "./configs/practice-purchase";
import { practiceSaleConfig } from "./configs/practice-sale";
import { udaNhsConfig } from "./configs/uda-nhs";

/**
 * Map of toolId -> PremiumToolConfig.
 * All five R2 tools: golden tests pass before these entries were added.
 */
export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {
  "associate-take-home-premium": associateTakeHomeConfig,
  "associate-incorporation-premium": associateIncorporationConfig,
  "principal-extraction-premium": principalExtractionConfig,
  "practice-purchase-premium": practicePurchaseConfig,
  "practice-sale-premium": practiceSaleConfig,
  "uda-nhs-premium": udaNhsConfig,
};

/** Returns the config for a tool, or undefined when not registered. */
export function getPremiumTool(toolId: string): PremiumToolConfig | undefined {
  return PREMIUM_TOOLS[toolId];
}

/** True when a toolId has a registered premium config. */
export function hasPremiumTool(toolId: string): boolean {
  return Object.prototype.hasOwnProperty.call(PREMIUM_TOOLS, toolId);
}
