/**
 * Premium tool registry for the wills-probate site.
 *
 * SEPARATE from the main fleet registry (lib/calculators/registry.ts) -- this
 * does NOT affect the indexable calculator pages, gallery, sitemap or embeds.
 * Premium tools are additive client islands only.
 *
 * Entries are added here ONLY after the tool's golden tests pass.
 * Append-only: never remove or rename a toolId once a blog post has linked to it.
 *
 * Storage prefix: wpc. Grid keys: wpc:grid:<toolId>.
 * Empty placeholder — Phase 2 adds the premium probate/IHT tool fleet.
 */
import type { PremiumToolConfig } from "./types";

export const PREMIUM_TOOLS: Record<string, PremiumToolConfig> = {};

/** Returns the config for a tool, or undefined when not registered. */
export function getPremiumTool(toolId: string): PremiumToolConfig | undefined {
  return PREMIUM_TOOLS[toolId];
}

/** True when a toolId has a registered premium config. */
export function hasPremiumTool(toolId: string): boolean {
  return Object.prototype.hasOwnProperty.call(PREMIUM_TOOLS, toolId);
}
