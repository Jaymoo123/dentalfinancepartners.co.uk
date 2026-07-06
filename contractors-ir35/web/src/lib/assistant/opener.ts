/**
 * Opener copy for the Contractor Tax Accountants SpecialistWidget (WS6).
 *
 * Topic nouns and three escalating hook lines (curious -> helpful -> direct)
 * per taxonomy key. Ported from Dentists with the contractors-ir35 five-topic
 * taxonomy, no booking concierge (no /book path on this site), and the `cfp`
 * storage prefix.
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line.
 * - No em-dashes.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did.
 * - No surveillance framing ("we noticed you're struggling").
 * - No "DJH" anywhere in this file.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic Phase-0 only).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF in Phase 0. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into fallback templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  ir35: "your IR35 take-home",
  structure: "umbrella versus limited",
  "company-tax": "your corporation tax",
  "pay-planning": "your salary and dividend split",
  "basics-expenses": "your contractor accounting",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  ir35: [
    "Working out how much better off you are outside IR35? I can pull up the like-for-like calculator.",
    "Want the outside-versus-inside take-home on your day rate? Happy to point you to it.",
    "A free call with a contractor specialist will confirm your status picture and your take-home, want me to set one up?",
  ],
  structure: [
    "Weighing an umbrella against your own limited company? There is a tool that shows both take-homes.",
    "Want to see the structure trade-off, running costs and admin against umbrella simplicity? I can point you to it.",
    "A specialist can get your structure decision straight in one free call, want me to arrange it?",
  ],
  "company-tax": [
    "Sorting your corporation tax? I can pull up the calculator with the marginal band.",
    "Not sure whether the marginal rate or associated companies apply to you? I can run you through it.",
    "A free call will get your company tax and extraction straight, interested?",
  ],
  "pay-planning": [
    "Working out your salary and dividend split for 2026/27? I can pull up the planner.",
    "Want to see how a split is taxed after the dividend-rate rise, with the Employment-Allowance caveat? Happy to point you to it.",
    "A specialist can confirm the most efficient split for your company in one free call, want me to set it up?",
  ],
  "basics-expenses": [
    "Getting to grips with contractor accounting and what you can claim? I can point you to a quick answer.",
    "Want a hand with the 24-month rule, mileage or the expenses that actually stick? Happy to help.",
    "A free first call is the quickest way to get your contractor set-up reviewed, want one?",
  ],
};

/**
 * Combination opener: both ir35 and structure in the profile
 * (the "is my status inside, and should I be on an umbrella?" journey).
 */
const COMBO_IR35_STRUCTURE: [string, string, string] = [
  "Working out your IR35 status and whether an umbrella or limited suits you? That is a close call and I can help you start on it.",
  "IR35 status and the structure choice are linked questions. Want me to line up the comparisons?",
  "This is exactly what a specialist untangles in one free call. Want me to arrange it?",
];

/** Used-calculator sanity-check opener. */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want me to point out anything worth a specialist eye?",
  "The calculator gives a picture; a specialist confirms whether it fits your actual contracts. Want a quick check?",
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

  // Combination: ir35 + structure (the status-and-structure journey).
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "ir35" && secondaryTopic === "structure") ||
      (primaryTopic === "structure" && secondaryTopic === "ir35"))
  ) {
    return COMBO_IR35_STRUCTURE[vi];
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
 * openerFor is the public alias used by SpecialistWidget.
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
