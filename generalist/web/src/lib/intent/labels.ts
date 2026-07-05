/**
 * Human-readable names for the deterministic personalisation rules and surfaces.
 *
 * The analytics events (personalization_shown/clicked/dismissed) carry the raw
 * rule_id / surface keys; this map turns them into plain English so the
 * dashboard "human story" can read e.g. "Showed the Deep-scroll offer in the
 * Deep-scroll modal" instead of "deep_scroll_offer / deep_scroll_modal".
 *
 * Imported by both the client surfaces (to stamp `label` onto the event) and
 * the admin dashboard (to render journeys). Keep additions in sync with the
 * rule ids produced in src/lib/intent/engine.ts and the Surface union there.
 */

/** rule_id (from engine.ts `build(... ruleId ...)`) -> human label. */
export const RULE_LABELS: Record<string, string> = {
  topic_cta: "Tool offer (topic-matched)",
  engaged_guide: "Guide offer (engaged reader)",
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

/**
 * surface -> WHERE it physically renders (the dashboard "Where" column). Keep
 * in sync with the surfaces wired in IntentProvider / the Surface union.
 */
export const SURFACE_WHERE: Record<string, string> = {
  sticky_cta: "Bar pinned to the bottom of the screen",
  hero_cta: "Primary button near the top of the page",
  deep_scroll_modal: "One-time popup after a deep scroll",
  returning_bar: "Greeting bar shown on a return visit",
  next_step: "Card at the end of the article",
};

/**
 * rule_id -> the BEHAVIOUR that triggers it (the dashboard "Why it fires"
 * column). Mirrors the thresholds + escalation ladder in engine.ts.
 */
export const RULE_TRIGGER: Record<string, string> = {
  topic_cta: "Light browser with a clear topic",
  engaged_guide: "60%+ scroll or 60s+ engaged",
  escalate_specialist: "90s+ engaged and 60%+ scroll, not converted",
  deep_scroll_offer: "Scrolled past 70% of the page",
  returning_welcome: "A return visit (resumes last topic)",
  topic_next_step: "Reached the end of the article",
};

/** Human label for a rule_id (falls back to a tidied form of the raw id). */
export function ruleLabel(ruleId: string): string {
  return RULE_LABELS[ruleId] ?? prettify(ruleId);
}

/** Human label for a surface key (falls back to a tidied form of the raw key). */
export function surfaceLabel(surface: string): string {
  return SURFACE_LABELS[surface] ?? prettify(surface);
}

/** Where a surface physically renders (or "" if unknown). */
export function surfaceWhere(surface: string): string {
  return SURFACE_WHERE[surface] ?? "";
}

/** The behaviour that triggers a rule (or "" if unknown). */
export function ruleTrigger(ruleId: string): string {
  return RULE_TRIGGER[ruleId] ?? "";
}

function prettify(key: string): string {
  if (!key) return "";
  const spaced = key.replace(/_/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
