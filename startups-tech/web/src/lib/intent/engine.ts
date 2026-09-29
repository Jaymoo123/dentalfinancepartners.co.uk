/**
 * Deterministic personalisation engine (NO ML). Pure functions only: given a
 * context of already-captured signals, decide what (if anything) each surface
 * should show. Import-light and side-effect-free so it is trivially testable
 * and safe in the client bundle. Measurement/track() lives in the provider.
 *
 * SCOPE ON THIS SITE (owner ruling 2026-09-29): the only surface actually
 * mounted is the floating help widget (components/support/SpecialistWidget),
 * which reads the journey model directly rather than through evaluate(). The
 * `Surface` union below deliberately keeps every surface the estate model
 * defines, including the three the owner said no to, so this file stays one
 * implementation across sites and a later yes needs no re-derivation. Nothing
 * renders `hero_cta`, `sticky_cta`, `next_step`, `deep_scroll_modal` or
 * `returning_bar` here, so no copy in this file reaches a visitor today.
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

/** The matched asset a surface should promote: a real, live resource. */
export type OfferKind = "tool" | "guide" | "specialist";

export type IntentOffer = {
  /** which kind of asset this is (also stamped onto events as `content`). */
  kind: OfferKind;
  /** headline shown on the surface. */
  title: string;
  /** one-line supporting copy. */
  blurb: string;
  /** where the button goes (a real route: calculator or contact). */
  href: string;
  /** the behaviour-derived "why you are seeing this" line. */
  reason: string;
};

export type IntentAction = {
  ruleId: string;
  surface: Surface;
  topic: TopicKey;
  label: string;
  ctaCopy: string;
  calculatorSlug: string | null;
  resourceId: string | null;
  variant: string; // for measurement
  /** the substantive, behaviour-matched asset this action promotes. */
  offer: IntentOffer;
};

// Thresholds, tuned conservatively.
const ENGAGED_ESCALATE_MS = 90_000; // deeply engaged -> offer an accountant
const ENGAGED_GUIDE_MS = 60_000; // engaged reader -> offer a review
const SCROLL_ESCALATE_PCT = 60; // "deep into the page" threshold
const SCROLL_MODAL_PCT = 70; // deep-scroll threshold

/** Build the "tool" offer (the topic's interactive calculator). */
function toolOffer(topicKey: TopicKey): IntentOffer | null {
  const t = getTopic(topicKey);
  if (!t || !t.primaryCalculator) return null;
  const label = t.label.toLowerCase();
  return {
    kind: "tool",
    title: t.ctaCopy,
    blurb: `Run your own numbers on ${label} in a couple of minutes.`,
    href: `/calculators/${t.primaryCalculator}`,
    reason: "Most-used tool for this topic",
  };
}

/** Build the "review" offer, routed via /contact. */
function reviewOffer(
  topicKey: TopicKey,
  reason = "You have spent real time on this. A quick look will confirm where you stand",
): IntentOffer | null {
  const t = getTopic(topicKey);
  if (!t) return null;
  return {
    kind: "specialist",
    title: t.ctaCopy,
    blurb: "A no-obligation look at your position with a startup accountant.",
    href: "/contact",
    reason,
  };
}

/** Build the "specialist" offer (a human, routed via /contact). */
function specialistOffer(topicKey: TopicKey): IntentOffer {
  const t = getTopic(topicKey);
  const label = (t?.label ?? "your company tax").toLowerCase();
  return {
    kind: "specialist",
    title: "Speak to a startup accountant",
    blurb: `Get your ${label} position checked by a startup accountant.`,
    href: "/contact",
    reason: "You have spent real time here. An accountant can confirm your position",
  };
}

/**
 * Behaviour plus intent -> the single best offer for this visitor on this topic.
 * Escalation ladder (most-engaged first):
 *  - deeply engaged and unconverted -> accountant
 *  - engaged reader                 -> a review
 *  - light browser                  -> the interactive tool
 * Falls back down the ladder when the richer asset does not exist for the topic.
 */
function pickOffer(topicKey: TopicKey, ctx: IntentContext): IntentOffer | null {
  const deeplyEngaged =
    ctx.engagedMs >= ENGAGED_ESCALATE_MS && ctx.scrollPct >= SCROLL_ESCALATE_PCT;
  const engagedReader =
    ctx.scrollPct >= SCROLL_ESCALATE_PCT || ctx.engagedMs >= ENGAGED_GUIDE_MS;

  if (deeplyEngaged && !ctx.converted) {
    return specialistOffer(topicKey);
  }
  if (engagedReader) {
    return reviewOffer(topicKey) ?? toolOffer(topicKey) ?? specialistOffer(topicKey);
  }
  return toolOffer(topicKey) ?? reviewOffer(topicKey) ?? specialistOffer(topicKey);
}

function build(
  surface: Surface,
  ruleId: string,
  topicKey: TopicKey | null,
  offer: IntentOffer,
  override?: Partial<IntentAction>,
): IntentAction | null {
  const t = getTopic(topicKey);
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
export function evaluate(surface: Surface, ctx: IntentContext): IntentAction | null {
  // The page they are on wins; otherwise fall back to their landing intent.
  const primary = ctx.pageTopic ?? ctx.entryTopic;

  switch (surface) {
    case "hero_cta":
    case "sticky_cta": {
      if (ctx.converted) return null; // never nag someone who already converted
      if (!primary) return null;
      const offer = pickOffer(primary, ctx);
      if (!offer) return null;
      const ruleId =
        offer.kind === "specialist"
          ? "escalate_specialist"
          : offer.kind === "guide"
            ? "engaged_guide"
            : "topic_cta";
      const variant = offer.kind === "specialist" ? "escalate" : "default";
      return build(surface, ruleId, primary, offer, { variant });
    }

    case "next_step": {
      // End-of-article: always tied to the CURRENT page's topic.
      if (!ctx.pageTopic) return null;
      const offer = pickOffer(ctx.pageTopic, ctx);
      if (!offer) return null;
      return build(surface, "topic_next_step", ctx.pageTopic, offer);
    }

    case "deep_scroll_modal": {
      if (ctx.converted) return null;
      if (ctx.scrollPct < SCROLL_MODAL_PCT) return null;
      if (!ctx.pageTopic) return null;
      const offer = pickOffer(ctx.pageTopic, ctx);
      if (!offer) return null;
      return build(surface, "deep_scroll_offer", ctx.pageTopic, offer);
    }

    case "returning_bar": {
      if (ctx.converted || !ctx.returning) return null;
      const resume = ctx.lastTopic ?? ctx.entryTopic;
      if (!resume) return null;
      const offer =
        reviewOffer(resume, "Pick up where you left off. Get your position looked at") ??
        toolOffer(resume) ??
        specialistOffer(resume);
      return build(surface, "returning_welcome", resume, offer);
    }
  }
}
