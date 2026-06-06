/**
 * Deterministic personalization engine (NO ML). Pure functions only — given a
 * context of already-captured signals, decide what (if anything) each surface
 * should show. Kept import-light + side-effect-free so it is trivially testable
 * and safe in the client bundle. Measurement/track() lives in the provider.
 */
import { getTopic, type TopicKey } from "./taxonomy";

export type Surface =
  | "hero_cta"
  | "sticky_cta"
  | "next_step"
  | "deep_scroll_modal"
  | "returning_bar";

export type IntentContext = {
  pageTopic: TopicKey | null; // topic of the page being viewed (route-derived)
  entryTopic: TopicKey | null; // session landing topic (search-intent proxy)
  lastTopic: TopicKey | null; // most-recent topic across visits
  returning: boolean;
  converted: boolean;
  scrollPct: number; // current page max scroll depth
  engagedMs: number; // cumulative engaged time this session
  isMobile: boolean;
};

export type IntentAction = {
  ruleId: string;
  surface: Surface;
  topic: TopicKey;
  label: string;
  ctaCopy: string;
  calculatorSlug: string | null;
  resourceId: string | null;
  variant: string; // for A/B + measurement
};

// Thresholds (tuned conservatively; easy to A/B later).
const ENGAGED_ESCALATE_MS = 90_000;
const SCROLL_ESCALATE_PCT = 60;
const SCROLL_MODAL_PCT = 70;

function build(
  surface: Surface,
  ruleId: string,
  topicKey: TopicKey | null,
  override?: Partial<IntentAction>,
): IntentAction | null {
  const t = getTopic(topicKey);
  if (!t) return null;
  return {
    ruleId,
    surface,
    topic: t.key,
    label: t.label,
    ctaCopy: t.ctaCopy,
    calculatorSlug: t.primaryCalculator,
    resourceId: t.resourceId,
    variant: "default",
    ...override,
  };
}

/** Decide the action for a surface, or null to render the generic experience. */
export function evaluate(surface: Surface, ctx: IntentContext): IntentAction | null {
  // The page they're on wins; otherwise fall back to their landing intent.
  const primary = ctx.pageTopic ?? ctx.entryTopic;

  switch (surface) {
    case "hero_cta":
    case "sticky_cta": {
      if (ctx.converted) return null; // never nag someone who already converted
      // Escalate to a specialist after deep, unconverted engagement.
      if (
        primary &&
        ctx.engagedMs >= ENGAGED_ESCALATE_MS &&
        ctx.scrollPct >= SCROLL_ESCALATE_PCT
      ) {
        const t = getTopic(primary)!;
        return build(surface, "escalate_specialist", primary, {
          ctaCopy: `Speak to a ${t.label.toLowerCase()} specialist`,
          variant: "escalate",
        });
      }
      return build(surface, "topic_cta", primary);
    }

    case "next_step":
      // End-of-article: always tied to the CURRENT page's topic.
      return build(surface, "topic_next_step", ctx.pageTopic);

    case "deep_scroll_modal": {
      if (ctx.converted) return null;
      if (ctx.scrollPct < SCROLL_MODAL_PCT) return null;
      return build(surface, "deep_scroll_offer", ctx.pageTopic);
    }

    case "returning_bar": {
      if (ctx.converted || !ctx.returning) return null;
      return build(surface, "returning_welcome", ctx.lastTopic ?? ctx.entryTopic);
    }
  }
}
