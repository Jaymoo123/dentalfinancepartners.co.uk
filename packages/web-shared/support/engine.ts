/**
 * Deterministic personalisation engine (NO ML). Pure functions only: given a
 * context of already-captured signals, decide what (if anything) each surface
 * should show. Import-light and side-effect-free so it is trivially testable
 * and safe in the client bundle. Measurement/track() lives in the provider.
 *
 * The LADDER and the thresholds live here. The offer COPY does not: a site
 * supplies `EngineConfig.offers`, three builders that return a live-resource
 * offer for a topic. That keeps every visitor-facing sentence on the site.
 *
 * The help widget reads the journey model directly rather than through
 * evaluate(); the `Surface` union is kept whole so a site that later mounts a
 * hero CTA, sticky CTA, next-step card, deep-scroll modal or returning bar
 * needs no re-derivation.
 */
import type {
  EngineConfig,
  EngineThresholds,
  IntentAction,
  IntentContext,
  IntentOffer,
  Surface,
} from "./types";

/** Thresholds, tuned conservatively. Overridable per site. */
export const DEFAULT_THRESHOLDS: EngineThresholds = {
  engagedEscalateMs: 90_000, // deeply engaged -> offer a specialist
  engagedGuideMs: 60_000, // engaged reader -> offer a review
  scrollEscalatePct: 60, // "deep into the page" threshold
  scrollModalPct: 70, // deep-scroll threshold
};

/**
 * Behaviour plus intent -> the single best offer for this visitor on this topic.
 * Escalation ladder (most-engaged first):
 *  - deeply engaged and unconverted -> specialist
 *  - engaged reader                 -> a review
 *  - light browser                  -> the interactive tool
 * Falls back down the ladder when the richer asset does not exist for the topic.
 */
function pickOffer(
  topicKey: string,
  ctx: IntentContext,
  cfg: EngineConfig,
  th: EngineThresholds,
): IntentOffer | null {
  const { offers } = cfg;
  const deeplyEngaged =
    ctx.engagedMs >= th.engagedEscalateMs && ctx.scrollPct >= th.scrollEscalatePct;
  const engagedReader =
    ctx.scrollPct >= th.scrollEscalatePct || ctx.engagedMs >= th.engagedGuideMs;

  if (deeplyEngaged && !ctx.converted) {
    return offers.specialist(topicKey);
  }
  if (engagedReader) {
    return offers.review(topicKey) ?? offers.tool(topicKey) ?? offers.specialist(topicKey);
  }
  return offers.tool(topicKey) ?? offers.review(topicKey) ?? offers.specialist(topicKey);
}

function build(
  cfg: EngineConfig,
  surface: Surface,
  ruleId: string,
  topicKey: string | null,
  offer: IntentOffer,
  override?: Partial<IntentAction>,
): IntentAction | null {
  const t = cfg.getTopic(topicKey);
  if (!t) return null;
  return {
    ruleId,
    surface,
    topic: t.key,
    label: t.label,
    ctaCopy: offer.title,
    calculatorSlug: t.primaryCalculator,
    resourceId: t.resourceId,
    variant: "default",
    offer,
    ...override,
  };
}

/** Decide the action for a surface, or null to render the generic experience. */
export function evaluate(
  surface: Surface,
  ctx: IntentContext,
  cfg: EngineConfig,
): IntentAction | null {
  const th = { ...DEFAULT_THRESHOLDS, ...(cfg.thresholds ?? {}) };
  // The page they are on wins; otherwise fall back to their landing intent.
  const primary = ctx.pageTopic ?? ctx.entryTopic;

  switch (surface) {
    case "hero_cta":
    case "sticky_cta": {
      if (ctx.converted) return null; // never nag someone who already converted
      if (!primary) return null;
      const offer = pickOffer(primary, ctx, cfg, th);
      if (!offer) return null;
      const ruleId =
        offer.kind === "specialist"
          ? "escalate_specialist"
          : offer.kind === "guide"
            ? "engaged_guide"
            : "topic_cta";
      const variant = offer.kind === "specialist" ? "escalate" : "default";
      return build(cfg, surface, ruleId, primary, offer, { variant });
    }

    case "next_step": {
      // End-of-article: always tied to the CURRENT page's topic.
      if (!ctx.pageTopic) return null;
      const offer = pickOffer(ctx.pageTopic, ctx, cfg, th);
      if (!offer) return null;
      return build(cfg, surface, "topic_next_step", ctx.pageTopic, offer);
    }

    case "deep_scroll_modal": {
      if (ctx.converted) return null;
      if (ctx.scrollPct < th.scrollModalPct) return null;
      if (!ctx.pageTopic) return null;
      const offer = pickOffer(ctx.pageTopic, ctx, cfg, th);
      if (!offer) return null;
      return build(cfg, surface, "deep_scroll_offer", ctx.pageTopic, offer);
    }

    case "returning_bar": {
      if (ctx.converted || !ctx.returning) return null;
      const resume = ctx.lastTopic ?? ctx.entryTopic;
      if (!resume) return null;
      const offer =
        cfg.offers.review(resume, cfg.offers.returningReason) ??
        cfg.offers.tool(resume) ??
        cfg.offers.specialist(resume);
      return build(cfg, surface, "returning_welcome", resume, offer);
    }
  }
}
