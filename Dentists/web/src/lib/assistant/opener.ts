/**
 * Opener copy for the Dental Finance Partners SpecialistWidget (WS6).
 *
 * Topic nouns and three escalating hook lines (curious -> helpful -> direct)
 * per taxonomy key. Ported from Property/generalist with Dentists 7-topic
 * taxonomy, no booking concierge (no /book path), and the `dfp` storage prefix.
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line.
 * - No em-dashes.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did.
 * - No "we noticed you're struggling" surveillance framing.
 * - No "DJH", no "Reflex" in any copy here.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic Phase-0 only).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF in Phase 0. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into fallback templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  associate: "your take-home",
  principal: "your profit extraction",
  buying: "buying a practice",
  selling: "selling your practice",
  nhs: "your NHS contract",
  "uda-calc": "your UDA contract",
  compliance: "your accounts and deadlines",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  associate: [
    "Working out what you keep as an associate? I can pull up the calculator that does the fiddly part.",
    "Want a hand comparing your take-home as a sole trader, or as a locum through a company? Happy to point you to it.",
    "A free call with a specialist will confirm the most tax-efficient way to work as an associate, want me to set one up?",
  ],
  principal: [
    "Sorting how to take your practice profit? I can point you to the planner in a second.",
    "Weighing partnership against a limited company? There is a tool that shows both, with the NHS pension trade-off.",
    "A free call will get your extraction and pension trade-off straight, want me to arrange it?",
  ],
  buying: [
    "Looking at a practice to buy? I can show you an indicative value and an affordability check.",
    "Want me to line up the valuation and affordability calculator before you make an offer?",
    "A specialist can run the financial due diligence with you, the first call is free, shall I set it up?",
  ],
  selling: [
    "Thinking about selling? There is a tool that shows an indicative value and what you keep after tax.",
    "CGT on a practice sale has a few moving parts. Want me to point you to the calculator and the BADR timing?",
    "Before you put a figure on a sale, a specialist can sanity-check the CGT and the timing for you, free. Fancy a quick call?",
  ],
  nhs: [
    "Working out what your UDA contract is really worth? I can pull up the tool that checks it.",
    "Not sure where your UDA value sits against the benchmark? I can run you through the quick comparison.",
    "A specialist can talk through your NHS contract and the pension side, free first call, want me to set one up?",
  ],
  "uda-calc": [
    "Want to check your effective UDA value? I can pull up the calculator.",
    "Not sure your UDA value keeps up with the benchmark? I can point you to the quick checker.",
    "A free call is the quickest way to get your NHS contract value straight, interested?",
  ],
  compliance: [
    "Anything I can help you find on your practice accounts, VAT or deadlines? I can point you to a quick answer.",
    "Want a hand keeping on top of your filing and VAT position? Happy to help.",
    "A free first call with a specialist is the quickest way to get your compliance sorted, want me to set one up?",
  ],
};

/**
 * Combination opener: both associate and principal in the profile
 * (the "should I go from associate to buying in / incorporating?" journey).
 */
const COMBO_ASSOCIATE_PRINCIPAL: [string, string, string] = [
  "Moving from associate towards owning or incorporating? That is a big question, and I can help you start on it.",
  "Associate versus principal, and whether to incorporate, is a close call for a lot of dentists. Want me to line up the comparison?",
  "This is exactly what a specialist untangles in one free call. Want me to arrange it?",
];

/** Used-calculator sanity-check opener. */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want me to point out anything worth a specialist eye?",
  "The calculator gives a picture; a specialist confirms whether it fits your actual practice. Want a quick check?",
  "Ready to sanity-check those results? A free call goes further than any calculator.",
];

/** Fully generic (no topic). */
const GENERIC: [string, string, string] = [
  "Not sure what you are looking for? I can point you to the right tool or a quick answer.",
  "Happy to help you find what you need. What is the main thing on your mind?",
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

  // Combination: associate + principal (the incorporation/ownership journey).
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "associate" && secondaryTopic === "principal") ||
      (primaryTopic === "principal" && secondaryTopic === "associate"))
  ) {
    return COMBO_ASSOCIATE_PRINCIPAL[vi];
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
 * openerFor is the public alias used by SpecialistWidget (matches generalist's export name).
 */
export function openerFor(profile: JourneyProfile, pingIndex: number): string {
  return pickOpener(profile, pingIndex);
}

/** Friction opener (fires instantly on form_error). */
export function frictionOpener(profile?: JourneyProfile): string {
  const t = profile?.primaryTopic;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Looks like the form gave you a bit of trouble. If it is easier, drop me a question about ${noun} and I will get a specialist to reply directly.`;
  }
  return "Looks like the form gave you a bit of trouble. Drop me a question and I will get a specialist to reply directly.";
}

/** Exit opener (fires on exit-intent trigger). */
export function exitOpener(profile?: JourneyProfile): string {
  const t = profile?.primaryTopic;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Before you go: a specialist can give you a clearer picture on ${noun} in a free first call. Want me to set it up?`;
  }
  return "Before you go: a free call with a specialist is often the quickest way to get a straight answer. Fancy it?";
}
