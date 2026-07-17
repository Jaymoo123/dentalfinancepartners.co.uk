/**
 * Premium tool registry for the Solicitors site.
 *
 * SEPARATE from the main fleet registry (lib/tools/registry.ts) — this does NOT
 * affect the indexable calculator pages, gallery, sitemap or embeds.
 * Premium tools are additive client islands only.
 *
 * Entries are added here ONLY after the tool's golden tests pass (per the brief).
 * Append-only: never remove or rename a toolId once a blog post has linked to it.
 */
import type { PremiumToolConfig } from "./types";
import { llpProfitTaxConfig } from "./configs/llp-profit-tax";
import { solePractitionerConfig } from "./configs/sole-practitioner";
import { practiceSaleConfig } from "./configs/practice-sale";
import { sraClientAccountConfig } from "./configs/sra-client-account";
import { equityPartnerBuyInConfig } from "./configs/equity-partner-buyin";

/**
 * Map of toolId -> PremiumToolConfig.
 */
export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {
  "llp-profit-tax-premium": llpProfitTaxConfig,
  "sole-practitioner-premium": solePractitionerConfig,
  "practice-sale-premium": practiceSaleConfig,
  "sra-client-account-premium": sraClientAccountConfig,
  "equity-partner-buyin-premium": equityPartnerBuyInConfig,
};

/** Returns the config for a tool, or undefined when not registered. */
export function getPremiumTool(toolId: string): PremiumToolConfig | undefined {
  return PREMIUM_TOOLS[toolId];
}

/** True when a toolId has a registered premium config. */
export function hasPremiumTool(toolId: string): boolean {
  return Object.prototype.hasOwnProperty.call(PREMIUM_TOOLS, toolId);
}
