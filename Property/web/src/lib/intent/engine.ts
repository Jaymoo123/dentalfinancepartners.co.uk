/**
 * Deterministic personalization engine (NO ML). Pure functions only — given a
 * context of already-captured signals, decide what (if anything) each surface
 * should show. Kept import-light + side-effect-free so it is trivially testable
 * and safe in the client bundle. Measurement/track() lives in the provider.
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
  pageTopic: TopicKey | null; // topic of the page being viewed (route-derived)
  entryTopic: TopicKey | null; // session landing topic (search-intent proxy)
  lastTopic: TopicKey | null; // most-recent topic across visits
  returning: boolean;
  converted: boolean;
  scrollPct: number; // current page max scroll depth
  engagedMs: number; // cumulative engaged time this session
  isMobile: boolean;
  /** live booking capability (converted lead who hasn't picked a slot yet). */
  bookingNudge?: { token: string } | null;
};

/** The matched asset a surface should promote — a real, live resource. */
export type OfferKind = "tool" | "guide" | "specialist" | "booking";

export type IntentOffer = {
  /** which kind of asset this is (also stamped onto events as `content`). */
  kind: OfferKind;
  /** headline shown on the surface. */
  title: string;
  /** one-line supporting copy. */
  blurb: string;
  /** where the button goes (a real route: calculator / resource / contact). */
  href: string;
  /** the behaviour-derived "why you're seeing this" line. */
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
  variant: string; // for A/B + measurement
  /** the substantive, behaviour-matched asset this action promotes. */
  offer: IntentOffer;
};

// Thresholds (tuned conservatively; easy to A/B later).
const ENGAGED_ESCALATE_MS = 90_000; // deeply engaged -> offer a specialist
const ENGAGED_GUIDE_MS = 60_000; // engaged reader -> offer the full guide
const SCROLL_ESCALATE_PCT = 60; // "deep into the page" threshold
const SCROLL_MODAL_PCT = 70; // deep-scroll modal trigger

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

/** Build the "review" offer (a free, no-obligation review, routed via /contact). */
function reviewOffer(
  topicKey: TopicKey,
  reason = "You've spent real time on this, a quick review will confirm where you stand",
): IntentOffer | null {
  const t = getTopic(topicKey);
  if (!t) return null;
  return {
    kind: "specialist",
    title: t.ctaCopy,
    blurb: "A free, no-obligation review of your position with a property tax specialist.",
    href: "/contact",
    reason,
  };
}

/**
 * Build the "booking" offer: the converted visitor holds a live booking
 * capability (the signed token from their submit) but hasn't picked a slot,
 * so the one useful next step is the native slot picker.
 */
function bookingOffer(token: string): IntentOffer {
  return {
    kind: "booking",
    title: "Pick your callback slot",
    blurb: "It takes about 20 seconds and a specialist will call you at the time you choose.",
    href: `/book?t=${encodeURIComponent(token)}`,
    reason: "Your specialist callback is ready to book",
  };
}

/** Build the "specialist" offer (a human, routed via /contact). */
function specialistOffer(topicKey: TopicKey): IntentOffer {
  const t = getTopic(topicKey);
  const label = (t?.label ?? "property tax").toLowerCase();
  return {
    kind: "specialist",
    title: `Speak to a ${label} specialist`,
    blurb: "Get your specific position checked by a property tax specialist.",
    href: "/contact",
    reason: "You've spent real time here, a specialist can confirm your position",
  };
}

/**
 * Behaviour + intent -> the single best offer for this visitor on this topic.
 * Escalation ladder (most-engaged first):
 *  - deeply engaged & unconverted  -> specialist
 *  - engaged reader                -> a free review
 *  - light browser                 -> the interactive tool
 * Falls back down the ladder when the richer asset doesn't exist for the topic.
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
  // Light browser: the interactive tool (fall back to a review, then specialist).
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
  // The page they're on wins; otherwise fall back to their landing intent.
  const primary = ctx.pageTopic ?? ctx.entryTopic;

  switch (surface) {
    case "hero_cta":
    case "sticky_cta": {
      if (ctx.converted) {
        // Never nag someone who already converted, with ONE exception: a live
        // booking capability (they submitted but haven't picked a slot) turns
        // the sticky bar into the final step instead of silence.
        if (surface === "sticky_cta" && ctx.bookingNudge) {
          return build(surface, "booking_nudge", primary ?? "services", bookingOffer(ctx.bookingNudge.token), {
            variant: "booking",
          });
        }
        return null;
      }
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
      if (!ctx.returning) return null;
      if (ctx.converted) {
        // A returning converted lead holding a live booking capability gets the
        // single useful next step (pick the callback slot); otherwise stay quiet.
        if (ctx.bookingNudge) {
          const topic = ctx.lastTopic ?? ctx.entryTopic ?? "services";
          return build(surface, "booking_nudge", topic, bookingOffer(ctx.bookingNudge.token), {
            variant: "booking",
          });
        }
        return null;
      }
      // Resume their last topic with a free review, so a return visit picks up
      // where they left off rather than back at square one.
      const resume = ctx.lastTopic ?? ctx.entryTopic;
      if (!resume) return null;
      const offer =
        reviewOffer(
          resume,
          "Pick up where you left off, get your position reviewed",
        ) ??
        toolOffer(resume) ??
        specialistOffer(resume);
      return build(surface, "returning_welcome", resume, offer);
    }
  }
}
