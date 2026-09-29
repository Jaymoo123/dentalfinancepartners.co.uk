/**
 * Opener copy for the Hospitality Tax help widget.
 *
 * Topic nouns and three escalating hook lines (curious, helpful, direct) per
 * taxonomy key. Same machinery as the startups-tech build; the copy is written
 * for this site.
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line, under 20 words.
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
    "Looking at tronc and tips? I can pull up the tool that runs the PAYE and NIC.",
    "Want a hand checking your tronc is independent enough for the NIC treatment?",
    "Speak to a hospitality accountant about your tronc scheme, shall I point you to the form?",
  ],
  vat: [
    "Working out food and drink VAT? I can open the rate checker for your menu.",
    "Want a hand with the hot food tests or an eat-in line? Happy to help.",
    "Speak to a hospitality accountant about your VAT, shall I point you to the form?",
  ],
  "staff-costs": [
    "Looking at staff cost against covers? There is a rota margin tool for that.",
    "Want a hand working out what the April cost rises do to your rotas?",
    "Speak to a hospitality accountant about your payroll, want me to set that up?",
  ],
  "business-rates": [
    "Checking your business rates? I can show you which reliefs venues most often miss.",
    "Want a hand seeing whether Small Business Rate Relief applies to your site?",
    "Speak to a hospitality accountant about your rates bill, shall I point you to the form?",
  ],
  "licensed-trade": [
    "Running a licensed site? I can point you to the wet and dry margin pages.",
    "Want a hand with alcohol duty, licensing costs or Machine Games Duty? Happy to help.",
    "Speak to a hospitality accountant about your licensed trade, want me to set that up?",
  ],
  compliance: [
    "Anything I can help you find on your accounts or your filing deadlines?",
    "Want a hand keeping on top of your deadlines and Making Tax Digital? Happy to help.",
    "Speak to a hospitality accountant about your compliance, shall I point you to the form?",
  ],
};

/** Combination opener: both tronc and staff costs in the profile. */
const COMBO_TRONC_PAYROLL: [string, string, string] = [
  "Tronc and payroll nearly always land together. Want me to line both up?",
  "Running a tronc alongside your pay run takes care to separate. Want me to show you?",
  "Speak to a hospitality accountant about both together, want me to set that up?",
];

/** Used-calculator (sanity-check opener). */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want a second pair of eyes on them?",
  "A calculator gives a picture. An accountant confirms it fits your venue, want a check?",
  "Ready to sanity-check those results? An accountant goes further than any calculator.",
];

/** Fully generic (no topic). */
const GENERIC: [string, string, string] = [
  "Not sure what you are looking for? I can point you to the right tool.",
  "Happy to help you find what you need. What is the main thing on your mind?",
  "Speak to a hospitality accountant and get a straight answer. Want me to set that up?",
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

/** Exit opener (fires on the exit-intent trigger). */
export function exitOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic as TopicKey | null;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Before you go: send a question about ${noun} and one of our accountants will come back to you.`;
  }
  return "Before you go: send a question and one of our accountants will come back to you.";
}
