/**
 * Opener copy for Probate Compass (wills-probate) SpecialistWidget (WS6).
 *
 * Topic nouns and three escalating hook lines (curious -> helpful -> direct)
 * per taxonomy key. Ported from construction-cis's opener.ts with the CIS
 * 6-topic taxonomy swapped for the wills-probate taxonomy, no booking
 * concierge (no /book path; escalation = /contact only), and the wpc storage
 * prefix.
 *
 * PLACEHOLDER copy — Phase 2 rewrites the hook lines with real probate/IHT
 * voice once the calculator fleet exists (the tools referenced below are not
 * built yet; registry.ts is empty).
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line.
 * - No em-dashes.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did.
 * - No "we noticed you're struggling" surveillance framing.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic Phase-0 only).
 *
 * UK English. No em-dashes. Storage prefix: wpc (FROZEN).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF in Phase 0. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into fallback templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  "probate-cost": "what probate is likely to cost",
  "do-i-need-probate": "whether this estate needs probate",
  "inheritance-tax": "inheritance tax on this estate",
  "probate-timeline": "how long probate will take",
  "pensions-iht-2027": "the 2027 pension and inheritance tax changes",
  "diy-vs-solicitor": "DIY probate versus using a solicitor",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  "probate-cost": [
    "Working out what probate is likely to cost? I can pull up the calculator that estimates it.",
    "Want a hand seeing how the estate value and complexity affect the probate cost? Happy to point you to it.",
    "A free call with a specialist will confirm the likely cost and the quickest way through, want me to set one up?",
  ],
  "do-i-need-probate": [
    "Not sure if this estate needs probate at all? I can pull up the quick checker.",
    "Want to see whether joint assets or a small estate might mean you can skip probate? I can run you through it.",
    "A specialist can confirm whether probate is needed in your case, free first call, want me to set one up?",
  ],
  "inheritance-tax": [
    "Checking whether inheritance tax is due on this estate? I can pull up the threshold calculator.",
    "Want to see how the nil-rate band and residence nil-rate band apply here? I can point you to the tool.",
    "A free call will confirm the inheritance tax position and any reliefs available, interested?",
  ],
  "probate-timeline": [
    "Wondering how long probate usually takes? I can pull up the timeline estimator.",
    "Want a realistic timeline for this estate? Happy to point you to it.",
    "A specialist can talk through the timeline and where the delays usually happen, want me to set one up?",
  ],
  "pensions-iht-2027": [
    "Looking into the 2027 pension changes and what they mean for inheritance tax? I can point you to the guide.",
    "Want to see how unused pension funds might be treated for inheritance tax from April 2027? Happy to walk you through it.",
    "A free call with a specialist is the quickest way to plan around the 2027 changes, want one?",
  ],
  "diy-vs-solicitor": [
    "Weighing up doing probate yourself against using a solicitor? There is a comparison that lays out both.",
    "Want to see the trade-offs between DIY probate and a solicitor for an estate like this? I can point you to it.",
    "A free call will help you decide what fits your situation, want me to set one up?",
  ],
};

/**
 * Combination opener: probate-cost + inheritance-tax in the profile (the
 * "what will this cost, and is IHT due" journey).
 */
const COMBO_COST_IHT: [string, string, string] = [
  "You have been looking at both probate costs and inheritance tax. They are closely linked: the estate value drives both. I can walk you through both.",
  "Cost and inheritance tax are two sides of the same picture. Want me to line up the tools so you can see the full comparison?",
  "This is exactly what a specialist sorts out in one free call. Want me to set one up for you?",
];

/** Used-calculator sanity-check opener (fires at vi=2 with used-calculator signal). */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want me to point out anything worth a specialist eye?",
  "The calculator gives a picture; a specialist confirms whether it fits your actual situation. Want a quick check?",
  "Ready to sanity-check those results? A free call goes further than any calculator.",
];

/** Fully generic (no topic). */
const GENERIC: [string, string, string] = [
  "Not sure what you are looking for? I can point you to the right tool or a quick answer.",
  "Happy to help you find what you need. What is the main probate or inheritance tax question on your mind?",
  "The quickest way to get a straight answer is a free call with a specialist. Want me to set one up?",
];

/**
 * Map a ping index + stage to an escalation variant index (0..2).
 * evaluating-us adds +1, ready adds +2, clamped to 0..2.
 */
export function variantIndex(pingIndex: number, stage: JourneyStage): number {
  const stageBoost = stage === "evaluating-us" ? 1 : stage === "ready" ? 2 : 0;
  return Math.min(2, Math.max(0, pingIndex + stageBoost));
}

/** Pick the opener line for a given profile and ping index. */
export function pickOpener(profile: JourneyProfile, pingIndex: number): string {
  const { primaryTopic, secondaryTopic, stage, signals } = profile;
  const vi = variantIndex(pingIndex, stage);

  // Combination: probate-cost + inheritance-tax (either order).
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "probate-cost" && secondaryTopic === "inheritance-tax") ||
      (primaryTopic === "inheritance-tax" && secondaryTopic === "probate-cost"))
  ) {
    return COMBO_COST_IHT[vi];
  }

  // Used-calculator override at the high-intent variant.
  if (signals.includes("used-calculator") && vi >= 2) {
    return USED_CALC[vi];
  }

  // Topic-specific hooks.
  if (primaryTopic && TOPIC_HOOKS[primaryTopic]) {
    return TOPIC_HOOKS[primaryTopic][vi];
  }

  return GENERIC[vi];
}

/**
 * openerFor is the public alias used by SpecialistWidget (matches estate pattern).
 */
export function openerFor(profile: JourneyProfile, pingIndex: number): string {
  return pickOpener(profile, pingIndex);
}

/** Friction opener (fires instantly on form_error). Topic-aware. */
export function frictionOpener(profile?: JourneyProfile): string {
  const t = profile?.primaryTopic;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Looks like the form gave you a bit of trouble. If it is easier, drop me a question about ${noun} and I will get a specialist to reply directly.`;
  }
  return "Looks like the form gave you a bit of trouble. Drop me a question and I will get a specialist to reply directly.";
}

/** Exit opener (fires on exit-intent trigger). Topic-aware. */
export function exitOpener(profile?: JourneyProfile): string {
  const t = profile?.primaryTopic;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Before you go: a specialist can give you a clearer picture on ${noun} in a free first call. Want me to set it up?`;
  }
  return "Before you go: a free call with a specialist is often the quickest way to get a straight answer. Fancy it?";
}
