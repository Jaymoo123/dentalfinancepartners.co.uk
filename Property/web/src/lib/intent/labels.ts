/**
 * Human-readable names for the deterministic personalization rules and surfaces.
 *
 * The analytics events (personalization_shown/clicked/dismissed) carry the raw
 * rule_id / surface keys; this map turns them into plain English so the
 * dashboard "human story" can read e.g. "Showed the Deep-scroll offer in the
 * Deep-scroll modal" instead of "deep_scroll_offer / deep_scroll_modal".
 *
 * Imported by both the client surfaces (to stamp `label` onto the event) and the
 * admin dashboard (to render journeys). Keep additions in sync with the rule ids
 * produced in src/lib/intent/engine.ts and the Surface union there.
 */

/** rule_id (from engine.ts `build(... ruleId ...)`) -> human label. */
export const RULE_LABELS: Record<string, string> = {
  topic_cta: "Topic-matched CTA",
  escalate_specialist: "Specialist escalation",
  deep_scroll_offer: "Deep-scroll offer",
  returning_welcome: "Returning greeting",
  topic_next_step: "Next-step suggestion",
};

/** surface (the Surface union in engine.ts) -> human label. */
export const SURFACE_LABELS: Record<string, string> = {
  sticky_cta: "Sticky CTA",
  hero_cta: "Hero CTA",
  deep_scroll_modal: "Deep-scroll modal",
  returning_bar: "Returning bar",
  next_step: "Next-step",
};

/** Human label for a rule_id (falls back to a tidied form of the raw id). */
export function ruleLabel(ruleId: string): string {
  return RULE_LABELS[ruleId] ?? prettify(ruleId);
}

/** Human label for a surface key (falls back to a tidied form of the raw key). */
export function surfaceLabel(surface: string): string {
  return SURFACE_LABELS[surface] ?? prettify(surface);
}

function prettify(key: string): string {
  if (!key) return "";
  const spaced = key.replace(/_/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
