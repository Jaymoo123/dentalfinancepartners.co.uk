/**
 * Opener copy for the Founder Tax Partners help widget.
 *
 * Topic nouns and three escalating hook lines (curious, helpful, direct) per
 * taxonomy key. Same machinery as the generalist build; the copy is written for
 * this site.
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line, under 20 words.
 * - No em-dashes.
 * - No pricing, and no turnaround promise beyond this site's own
 *   "reply within 24 hours" (niche.config.json entity.next).
 * - No "free call": this site does not offer one anywhere else, so the widget
 *   does not invent one.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified, regulated or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did. No
 *   "we noticed you are struggling" surveillance framing.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic only).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into the exit and friction templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  rnd: "your R&D claim",
  "seis-eis": "your SEIS or EIS round",
  "share-schemes": "your EMI or share scheme",
  "founder-pay": "how you pay yourself",
  "saas-finance": "your SaaS numbers",
  compliance: "your accounts and deadlines",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  rnd: [
    "Looking at R&D relief? I can pull up the estimator that sizes a claim.",
    "Want a hand working out whether your project qualifies for R&D relief?",
    "Speak to a startup accountant about your R&D claim, shall I point you to the form?",
  ],
  "seis-eis": [
    "Sorting SEIS or EIS advance assurance? I can point you to the relief calculator.",
    "Advance assurance has a few traps. Want me to show you what HMRC looks for?",
    "Speak to a startup accountant about your SEIS or EIS round, want me to set that up?",
  ],
  "share-schemes": [
    "Setting up EMI options? I can pull up the tool that compares EMI with unapproved.",
    "Want a hand with the EMI qualifying rules or your valuation? Happy to point you there.",
    "Speak to a startup accountant about your share scheme, shall I point you to the form?",
  ],
  "founder-pay": [
    "Working out salary against dividends as a founder? There is a tool for that.",
    "Want a hand getting founder pay and extraction right? I can show you the numbers.",
    "Speak to a startup accountant about how you pay yourself, want me to set that up?",
  ],
  "saas-finance": [
    "Getting your SaaS numbers investor ready? I can point you to the right place.",
    "Want a hand with SaaS reporting or a fractional finance lead? Happy to help.",
    "Speak to a startup accountant about your finance function, shall I point you to the form?",
  ],
  compliance: [
    "Anything I can help you find on your accounts or your deadlines?",
    "Want a hand keeping on top of your filing deadlines? Happy to help.",
    "Speak to a startup accountant about your compliance, shall I point you to the form?",
  ],
};

/** Combination opener: both R&D and SEIS or EIS in the profile. */
const COMBO_RND_SEIS: [string, string, string] = [
  "R&D relief and an SEIS or EIS round often land together. Want me to line both up?",
  "Claiming R&D alongside an SEIS or EIS round takes care. Want me to show you why?",
  "Speak to a startup accountant about both together, want me to set that up?",
];

/** Used-calculator (sanity-check opener). */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want a second pair of eyes on them?",
  "A calculator gives a picture. An accountant confirms it fits your company, want a check?",
  "Ready to sanity-check those results? An accountant goes further than any calculator.",
];

/** Fully generic (no topic). */
const GENERIC: [string, string, string] = [
  "Not sure what you are looking for? I can point you to the right tool.",
  "Happy to help you find what you need. What is the main thing on your mind?",
  "Speak to a startup accountant and get a straight answer. Want me to set that up?",
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

  // Combination: R&D plus SEIS or EIS
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "rnd" && secondaryTopic === "seis-eis") ||
      (primaryTopic === "seis-eis" && secondaryTopic === "rnd"))
  ) {
    return COMBO_RND_SEIS[vi];
  }

  // Used-calculator override at the high-intent variant
  if (signals.includes("used-calculator") && vi >= 2) {
    return USED_CALC[vi];
  }

  // Topic-specific hooks
  if (primaryTopic && TOPIC_HOOKS[primaryTopic]) {
    return TOPIC_HOOKS[primaryTopic][vi];
  }

  return GENERIC[vi];
}

/** Friction opener (fires instantly on form_error). One sentence, under 20 words. */
export function frictionOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Send a question about ${noun} here instead, we reply within 24 hours.`;
  }
  return "Send a question here instead, we reply within 24 hours.";
}

/** Exit opener (fires on the exit-intent trigger). */
export function exitOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Before you go: send a question about ${noun} and one of our accountants will come back to you.`;
  }
  return "Before you go: send a question and one of our accountants will come back to you.";
}
