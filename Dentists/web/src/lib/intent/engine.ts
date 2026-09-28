/**
 * Deterministic personalisation engine (NO ML). Pure functions only -- given a
 * context of already-captured signals, decide what (if anything) each surface
 * should show. Kept import-light + side-effect-free so it is trivially
 * testable and safe in the client bundle. Measurement/track() lives in the
 * provider.
 *
 * Substantive offers (not just a copy swap): every action now carries a matched
 * ASSET (an `offer`) chosen from BEHAVIOUR + intent, pointing at a real live
 * resource: the topic's interactive calculator (/calculators/<slug>) or a free
 * specialist review (/contact). The surfaces render the offer (title + blurb +
 * reason + button to offer.href).
 */
import { getTopic, type TopicKey } from "./taxonomy";

export type Surface =
  | "hero_cta"
  | "sticky_cta"
  | "next_step"
  | "deep_scroll_modal"
  | "returning_bar";

export type IntentContext = {
  pageTopic: TopicKey | null;
  entryTopic: TopicKey | null;
  lastTopic: TopicKey | null;
  returning: boolean;
  converted: boolean;
  scrollPct: number;
  engagedMs: number;
  isMobile: boolean;
};

export type OfferKind = "tool" | "guide" | "specialist";

export type IntentOffer = {
  kind: OfferKind;
  title: string;
  blurb: string;
  href: string;
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
  variant: string;
  offer: IntentOffer;
};

// Thresholds (tuned conservatively; easy to A/B later).
const ENGAGED_ESCALATE_MS = 90_000;
const ENGAGED_GUIDE_MS = 60_000;
const SCROLL_ESCALATE_PCT = 60;
const SCROLL_MODAL_PCT = 70;

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

function reviewOffer(
  topicKey: TopicKey,
  reason = "You have spent real time on this. A quick review will confirm where you stand",
): IntentOffer | null {
  const t = getTopic(topicKey);
  if (!t) return null;
  return {
    kind: "specialist",
    title: t.ctaCopy,
    blurb: "A free, no-obligation review of your position with a specialist dental accountant.",
    href: "/contact",
    reason,
  };
}

function specialistOffer(topicKey: TopicKey): IntentOffer {
  const t = getTopic(topicKey);
  const label = (t?.label ?? "your dental accounting").toLowerCase();
  return {
    kind: "specialist",
    title: "Speak to a specialist dental accountant",
    blurb: `Get your specific ${label} position checked by a specialist.`,
    href: "/contact",
    reason: "You have spent real time here. A specialist can confirm your position",
  };
}

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

export function evaluate(surface: Surface, ctx: IntentContext): IntentAction | null {
  const primary = ctx.pageTopic ?? ctx.entryTopic;

  switch (surface) {
    case "hero_cta":
    case "sticky_cta": {
      if (ctx.converted) return null;
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
        reviewOffer(resume, "Pick up where you left off. Get your position reviewed") ??
        toolOffer(resume) ??
        specialistOffer(resume);
      return build(surface, "returning_welcome", resume, offer);
    }
  }
}
