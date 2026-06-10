/**
 * Premium tool registry — maps a toolId to its PremiumToolConfig.
 *
 * Kept SEPARATE from the fleet registry (lib/calculators/registry.ts) so the
 * indexable calculator pages, the gallery and the sitemap are never affected by
 * premium tools. Premium tools surface only as additive client islands on the
 * blog and calculator pages, gated on a config existing here.
 *
 * PHASE A: this registry is intentionally EMPTY. With no configs, PremiumUpgrade
 * renders null everywhere, so the live site is unchanged. Onboarding a category
 * (Phase B/C) = add one `import` + one entry keyed by the category's toolId
 * (the same id stored on CategoryResource.toolId in lib/resources/registry.ts).
 */
import type { PremiumToolConfig } from "./types";
import { section24PremiumTool } from "./tools/section-24";
import { incorporationPremiumTool } from "./tools/incorporation";
import { capitalGainsPremiumTool } from "./tools/capital-gains";
import { landlordEssentialsPremiumTool } from "./tools/landlord-essentials";
import { stampDutyPremiumTool } from "./tools/stamp-duty";
import { mtdPremiumTool } from "./tools/mtd";

/**
 * toolId -> config. Append one line per category as its premium tool is authored.
 * Keyed by the same id stored on CategoryResource.toolId in lib/resources/registry.
 */
export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {
  "section-24-premium": section24PremiumTool,
  "incorporation-premium": incorporationPremiumTool,
  "capital-gains-premium": capitalGainsPremiumTool,
  "landlord-essentials-premium": landlordEssentialsPremiumTool,
  "stamp-duty-premium": stampDutyPremiumTool,
  "mtd-premium": mtdPremiumTool,
};

/** Look up a premium tool config by its id (or undefined). */
export function getPremiumTool(toolId: string | null | undefined): PremiumToolConfig | undefined {
  if (!toolId) return undefined;
  return PREMIUM_TOOLS[toolId];
}

/** True if a premium tool config exists for the given toolId. */
export function hasPremiumTool(toolId: string | null | undefined): boolean {
  return !!getPremiumTool(toolId);
}
