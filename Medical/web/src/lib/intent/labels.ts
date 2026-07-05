/**
 * Human-readable names for the deterministic personalisation rules and surfaces.
 * Imported by both client surfaces (to stamp `label` onto events) and the admin
 * dashboard (to render journeys).
 */

export const RULE_LABELS: Record<string, string> = {
  topic_cta: "Tool offer (topic-matched)",
  engaged_guide: "Guide offer (engaged reader)",
  escalate_specialist: "Specialist escalation",
  deep_scroll_offer: "Deep-scroll offer",
  returning_welcome: "Returning greeting",
  topic_next_step: "Next-step suggestion",
};

export const SURFACE_LABELS: Record<string, string> = {
  sticky_cta: "Sticky CTA",
  hero_cta: "Hero CTA",
  deep_scroll_modal: "Deep-scroll modal",
  returning_bar: "Returning bar",
  next_step: "Next-step",
};

export const SURFACE_WHERE: Record<string, string> = {
  sticky_cta: "Bar pinned to the bottom of the screen",
  hero_cta: "Primary button near the top of the page",
  deep_scroll_modal: "One-time popup after a deep scroll",
  returning_bar: "Greeting bar shown on a return visit",
  next_step: "Card at the end of the article",
};

export const RULE_TRIGGER: Record<string, string> = {
  topic_cta: "Light browser with a clear topic",
  engaged_guide: "60%+ scroll or 60s+ engaged",
  escalate_specialist: "90s+ engaged and 60%+ scroll, not converted",
  deep_scroll_offer: "Scrolled past 70% of the page",
  returning_welcome: "A return visit (resumes last topic)",
  topic_next_step: "Reached the end of the article",
};

export function ruleLabel(ruleId: string): string {
  return RULE_LABELS[ruleId] ?? prettify(ruleId);
}

export function surfaceLabel(surface: string): string {
  return SURFACE_LABELS[surface] ?? prettify(surface);
}

export function surfaceWhere(surface: string): string {
  return SURFACE_WHERE[surface] ?? "";
}

export function ruleTrigger(ruleId: string): string {
  return RULE_TRIGGER[ruleId] ?? "";
}

function prettify(key: string): string {
  if (!key) return "";
  const spaced = key.replace(/_/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
