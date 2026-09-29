/**
 * Opener copy for the Hospitality Tax help widget.
 *
 * Topic nouns and three escalating hook lines (curious, helpful, direct) per
 * taxonomy key. Same machinery as the startups-tech build; the copy is written
 * for this site.
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line, under 20 words. The same cap applies to the
 *   friction and exit templates with their LONGEST topic noun substituted
 *   (R4 W-G1: the exit template reached 21 words that way and shipped green
 *   because the test only measured TOPIC_HOOKS). Both halves of the rule are
 *   now asserted in src/tests/assistant-opener.test.ts.
 * - No em-dashes.
 * - No pricing, and no turnaround promise beyond this site's own
 *   "reply within 24 hours".
 * - No "free call": the widget does not invent an offer the site does not make.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified, regulated or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did. No
 *   "we noticed you are struggling" surveillance framing.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic only).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type {
  JourneyProfile,
  JourneyStage,
} from "@accounting-network/web-shared/support/types";

/** Feature flag: LLM personalisation is OFF. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into the exit and friction templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  tronc: "your tronc and tips",
  vat: "your food and drink VAT",
  "staff-costs": "your staff costs and payroll",
  "business-rates": "your business rates",
  "licensed-trade": "your licensed trade numbers",
  compliance: "your accounts and deadlines",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  tronc: [
    "Want me to pull up the tool that runs the PAYE and NIC on tronc and tips?",
    "Want a hand checking your tronc is independent enough for the NIC treatment?",
    "Speak to a hospitality accountant about your tronc scheme, shall I point you to the form?",
  ],
  vat: [
    "Want me to open the rate checker for the food and drink VAT on your menu?",
    "Happy to help with the hot food tests or an eat-in line if you want a hand.",
    "Speak to a hospitality accountant about your VAT, shall I point you to the form?",
  ],
  "staff-costs": [
    "Want me to open the rota margin tool for staff cost against covers?",
    "Want a hand working out what the April cost rises do to your rotas?",
    "Speak to a hospitality accountant about your payroll, want me to set that up?",
  ],
  "business-rates": [
    "Checking your business rates, shall I show you which reliefs venues most often miss?",
    "Want a hand seeing whether Small Business Rate Relief applies to your site?",
    "Speak to a hospitality accountant about your rates bill, shall I point you to the form?",
  ],
  "licensed-trade": [
    "Running a licensed site, shall I point you to the wet and dry margin pages?",
    "Happy to help with alcohol duty, licensing costs or Machine Games Duty if you want a hand.",
    "Speak to a hospitality accountant about your licensed trade, want me to set that up?",
  ],
  compliance: [
    "Anything I can help you find on your accounts or your filing deadlines?",
    "Happy to help you keep on top of your deadlines and Making Tax Digital.",
    "Speak to a hospitality accountant about your compliance, shall I point you to the form?",
  ],
};

/** Combination opener: both tronc and staff costs in the profile. */
const COMBO_TRONC_PAYROLL: [string, string, string] = [
  "Tronc and payroll nearly always land together, so shall I line both up?",
  "Running a tronc alongside your pay run takes care to separate, want me to show you?",
  "Speak to a hospitality accountant about both together, want me to set that up?",
];

/** Used-calculator (sanity-check opener). */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers, so want a second pair of eyes on them?",
  "A calculator gives a picture, and an accountant confirms it fits your venue, want a check?",
  "Ready to sanity-check those results with an accountant who goes further than any calculator?",
];

/** Fully generic (no topic). */
const GENERIC: [string, string, string] = [
  "Not sure what you are looking for, shall I point you to the right tool?",
  "Happy to help you find what you need, so what is the main thing on your mind?",
  "Speak to a hospitality accountant and get a straight answer, want me to set that up?",
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

  // Combination: tronc plus staff costs and payroll
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "tronc" && secondaryTopic === "staff-costs") ||
      (primaryTopic === "staff-costs" && secondaryTopic === "tronc"))
  ) {
    return COMBO_TRONC_PAYROLL[vi];
  }

  // Used-calculator override at the high-intent variant
  if (signals.includes("used-calculator") && vi >= 2) {
    return USED_CALC[vi];
  }

  // Topic-specific hooks
  const hooks = primaryTopic ? TOPIC_HOOKS[primaryTopic as TopicKey] : undefined;
  if (hooks) return hooks[vi];

  return GENERIC[vi];
}

/** Friction opener (fires instantly on form_error). One sentence, under 20 words. */
export function frictionOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic as TopicKey | null;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Send a question about ${noun} here instead, we reply within 24 hours.`;
  }
  return "Send a question here instead, we reply within 24 hours.";
}

/** Exit opener (fires on the exit-intent trigger). One sentence, under 20 words. */
export function exitOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic as TopicKey | null;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Before you go, send a question about ${noun} and we will reply within 24 hours.`;
  }
  return "Before you go, send a question and we will reply within 24 hours.";
}
