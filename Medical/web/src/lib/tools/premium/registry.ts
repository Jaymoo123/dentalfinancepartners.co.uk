/**
 * Premium tool registry for the Medical Accountants UK site.
 *
 * SEPARATE from the main fleet registry (lib/tools/registry.ts) -- this does NOT
 * affect the indexable calculator pages, gallery, sitemap or embeds.
 * Premium tools are additive client islands only.
 *
 * Entries are added here ONLY after the tool's golden tests pass (per the brief).
 * Append-only: never remove or rename a toolId once a blog post has linked to it.
 *
 * Storage prefix: ma (FROZEN). Grid keys (none used in R2): ma:grid:<toolId>.
 * Never ptp: or dfp:.
 */
import type { PremiumToolConfig } from "./types";
import { nhsPensionPremiumConfig } from "./configs/nhs-pension-premium";
import { locumTakeHomePremiumConfig } from "./configs/locum-take-home-premium";
import { incorporationPremiumConfig } from "./configs/incorporation-premium";
import { nhsSuperannuationTieredContributionConfig } from "./configs/nhs-superannuation-tiered-contribution";
import { nhsPensionSchemePaysConfig } from "./configs/nhs-pension-scheme-pays-premium";
import { gpPartnerDrawingsPlannerConfig } from "./configs/gp-partner-drawings-planner";
import { salariedGpVsPartnerConfig } from "./configs/salaried-gp-vs-partner";
import { consultantPrivateVsNhsConfig } from "./configs/consultant-private-vs-nhs";

/**
 * Map of toolId -> PremiumToolConfig.
 * All three R2 tools: golden tests pass before these entries were added.
 */
export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {
  "nhs-pension-premium": nhsPensionPremiumConfig,
  "locum-take-home-premium": locumTakeHomePremiumConfig,
  "incorporation-premium": incorporationPremiumConfig,
  "nhs-superannuation-tiered-contribution": nhsSuperannuationTieredContributionConfig,
  "nhs-pension-scheme-pays-premium": nhsPensionSchemePaysConfig,
  "gp-partner-drawings-planner": gpPartnerDrawingsPlannerConfig,
  "salaried-gp-vs-partner": salariedGpVsPartnerConfig,
  "consultant-private-vs-nhs": consultantPrivateVsNhsConfig,
};

/** Returns the config for a tool, or undefined when not registered. */
export function getPremiumTool(toolId: string): PremiumToolConfig | undefined {
  return PREMIUM_TOOLS[toolId];
}

/** True when a toolId has a registered premium config. */
export function hasPremiumTool(toolId: string): boolean {
  return Object.prototype.hasOwnProperty.call(PREMIUM_TOOLS, toolId);
}
