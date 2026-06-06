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

/**
 * toolId -> config. Append one line per category as its premium tool is authored.
 * Empty in Phase A by design.
 */
export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {};

/** Look up a premium tool config by its id (or undefined). */
export function getPremiumTool(toolId: string | null | undefined): PremiumToolConfig | undefined {
  if (!toolId) return undefined;
  return PREMIUM_TOOLS[toolId];
}

/** True if a premium tool config exists for the given toolId. */
export function hasPremiumTool(toolId: string | null | undefined): boolean {
  return !!getPremiumTool(toolId);
}
