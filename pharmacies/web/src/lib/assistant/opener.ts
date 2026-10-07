/**
 * Opener copy for the Pharmacy Tax help widget.
 *
 * Topic nouns and three escalating hook lines (curious, helpful, direct) per
 * taxonomy key. Same machinery as the startups-tech build; the copy is written
 * for this site and every line is listed verbatim in
 * docs/pharmacies/_port/W7_RECEIPT.md for the owner to read.
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line, under 20 words.
 * - No em-dashes.
 * - Firm voice: "we" is Pharmacy Tax (estate ruling 2026-09-28).
 * - No pricing, and no turnaround promise beyond the one this site already
 *   publishes: "within 24 hours" (niche.config.json cta.sticky_secondary,
 *   components/calculators/MiniCapture.tsx successText).
 * - No "free call" and no fee or fixed-quote language: the widget invents no
 *   offer the site does not already make.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified, regulated or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did. No
 *   "we noticed you are struggling" surveillance framing.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic only).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@accounting-network/web-shared/support/types";

/** Feature flag: LLM personalisation is OFF. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into the exit and friction templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  buying: "buying a pharmacy",
  selling: "selling your pharmacy",
  "nhs-income": "your NHS contract income",
  "vat-retail": "your VAT retail scheme",
  locum: "your locum pay and tax",
  structure: "your pharmacy structure",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  buying: [
    "Looking at buying a pharmacy? We can pull up the affordability calculator.",
    "Want a hand checking whether the numbers on a pharmacy purchase stack up?",
    "Speak to a pharmacy accountant about the purchase, shall we point you to the form?",
  ],
  selling: [
    "Thinking about selling? We can show you how a pharmacy sale is usually taxed.",
    "Want a hand working out what a sale leaves you with after tax?",
    "Speak to a pharmacy accountant about the sale, want us to set that up?",
  ],
  "nhs-income": [
    "Following your NHS contract income? We can pull up the FP34 cash flow estimator.",
    "Want a hand reconciling what the FP34 statement actually pays you?",
    "Speak to a pharmacy accountant about your NHS income, shall we point you to the form?",
  ],
  "vat-retail": [
    "Working out which VAT retail scheme fits? We can point you to the right page.",
    "Want a hand checking your retail scheme and your zero-rated split?",
    "Speak to a pharmacy accountant about your VAT, want us to set that up?",
  ],
  locum: [
    "Comparing locum pay? We can pull up the take-home comparator.",
    "Want a hand comparing locum take-home pay across the usual options?",
    "Speak to a pharmacy accountant about your locum tax, shall we point you to the form?",
  ],
  structure: [
    "Anything we can help you find on pharmacy structure or payroll?",
    "Want a hand checking your structure and payroll are set up the right way?",
    "Speak to a pharmacy accountant about your structure, want us to set that up?",
  ],
};

/** Combination opener: both buying and selling in the profile. */
const COMBO_BUY_SELL: [string, string, string] = [
  "Buying one pharmacy while selling another takes care on both sides. Want us to line them up?",
  "A purchase and a sale together change the tax on each. Want us to show you why?",
  "Speak to a pharmacy accountant about both together, want us to set that up?",
];

/** Used-calculator (sanity-check opener). */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want a second pair of eyes on them?",
  "A calculator gives a picture. An accountant confirms it fits your pharmacy, want a check?",
  "Ready to sanity-check those results? An accountant goes further than any calculator.",
];

/** Fully generic (no topic). */
const GENERIC: [string, string, string] = [
  "Not sure what you are looking for? We can point you to the right tool.",
  "Happy to help you find what you need. What is the main thing on your mind?",
  "Speak to a pharmacy accountant and get a straight answer. Want us to set that up?",
];

/**
 * Map a ping index plus stage to an escalation variant index (0..2).
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

  // Combination: buying plus selling.
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "buying" && secondaryTopic === "selling") ||
      (primaryTopic === "selling" && secondaryTopic === "buying"))
  ) {
    return COMBO_BUY_SELL[vi];
  }

  // Used-calculator override at the high-intent variant.
  if (signals.includes("used-calculator") && vi >= 2) {
    return USED_CALC[vi];
  }

  // Topic-specific hooks.
  const hooks = primaryTopic ? TOPIC_HOOKS[primaryTopic as TopicKey] : undefined;
  if (hooks) return hooks[vi];

  return GENERIC[vi];
}

/** Friction opener (fires on form_error). One sentence, under 20 words. */
export function frictionOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic as TopicKey | null;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Send a question about ${noun} here instead, we reply within 24 hours.`;
  }
  return "Send a question here instead, we reply within 24 hours.";
}

/** Exit opener (fires on the exit-intent trigger). */
export function exitOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic as TopicKey | null;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Before you go: send a question about ${noun} and one of our accountants will come back to you.`;
  }
  return "Before you go: send a question and one of our accountants will come back to you.";
}
