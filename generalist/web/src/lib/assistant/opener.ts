/**
 * Opener copy for the generalist SpecialistWidget (WS6).
 *
 * Topic nouns and three escalating hook lines (curious -> helpful -> direct)
 * per taxonomy key. Ported from Property's opener.ts with generalist topics,
 * no booking concierge (no /book path in R3), and the `hd` storage prefix.
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
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF in R3. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into fallback templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  "director-pay": "paying yourself",
  "limited-company": "your company tax",
  "sole-trader": "your sole trader tax",
  incorporation: "going limited",
  "vat-mtd": "your VAT",
  payroll: "employing staff",
  rnd: "R&D tax relief",
  "exit-cgt": "selling your business",
  compliance: "your accounts and deadlines",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  "director-pay": [
    "Working out the best way to pay yourself? I can pull up the tool that shows the salary and dividend split.",
    "Still weighing salary versus dividends? I can point you to a plain run-through or the planner, your call.",
    "A free call with a specialist will confirm the most efficient way to pay yourself, want me to set one up?",
  ],
  "limited-company": [
    "Sorting your company tax? I can point you to the right tool in a second.",
    "Want a hand getting your limited company tax straight? There is a planner that makes it simple.",
    "A free call with a specialist will make sure nothing is slipping through, want me to arrange it?",
  ],
  "sole-trader": [
    "Working out your take-home as a sole trader? There is a calculator that does the fiddly part.",
    "Want a hand with your sole trader tax? Happy to dig out exactly what you need.",
    "A free first call is the quickest way to get your sole trader tax sorted, want me to set one up?",
  ],
  incorporation: [
    "Thinking about going limited? I can show you the real numbers before you commit either way.",
    "Incorporating suits some businesses and not others. Want me to line up the comparison tool?",
    "The limited-company question is a big one to call alone. A free chat will tell you if it stacks up, want me to arrange it?",
  ],
  "vat-mtd": [
    "Getting your head round VAT schemes? I can pull up the tool that picks the cheaper one.",
    "Not sure which VAT scheme fits? I can run you through the quick comparison.",
    "A specialist can confirm the right VAT scheme so there are no surprises, free, shall I arrange it?",
  ],
  payroll: [
    "Working out what a hire really costs? There is a tool that builds the full figure.",
    "Want a hand with payroll and the true cost of a hire? Happy to point you to it.",
    "A free call will get your payroll and staff costs straight, interested?",
  ],
  rnd: [
    "Wondering if you can claim R&D relief? I can point you to the estimator.",
    "Not sure you clear the R&D intensity test? I can run you through the quick checker.",
    "A specialist can scope an R&D claim properly, the first call is free, want me to set one up?",
  ],
  "exit-cgt": [
    "Planning an exit? There is a tool that shows the CGT and the BADR timing.",
    "CGT on a business sale has a few moving parts. Want me to point you to the calculator and guide?",
    "Before you put a figure on a sale, a specialist can sanity-check the CGT for you, free. Fancy a quick call?",
  ],
  compliance: [
    "Anything I can help you find on your accounts or deadlines? I can point you to a quick answer.",
    "Want a hand keeping on top of your filing deadlines? Happy to help.",
    "A free first call with a specialist is the quickest way to get your compliance sorted, want me to set one up?",
  ],
};

/** Combination opener: both sole-trader and incorporation in the profile. */
const COMBO_SOLE_INC: [string, string, string] = [
  "Trying to work out if going limited beats staying a sole trader? That is the real question, and I can help you start on it.",
  "Sole trader versus limited company is a close call for a lot of owners. Want me to line up the comparison?",
  "This is exactly what a specialist untangles in one free call. Want me to arrange it?",
];

/** Used-calculator (sanity-check opener). */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want me to point out anything that might be worth a specialist eye?",
  "The calculator gives a picture; a specialist confirms whether it fits your actual situation. Want a quick check?",
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

  // Combination: sole-trader + incorporation
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "sole-trader" && secondaryTopic === "incorporation") ||
      (primaryTopic === "incorporation" && secondaryTopic === "sole-trader"))
  ) {
    return COMBO_SOLE_INC[vi];
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

/** Friction opener (fires instantly on form_error). */
export function frictionOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Looks like the form gave you a bit of trouble. If it is easier, drop me a question about ${noun} and I will get a specialist to reply directly.`;
  }
  return "Looks like the form gave you a bit of trouble. Drop me a question and I will get a specialist to reply directly.";
}

/** Exit opener (fires on exit-intent trigger). */
export function exitOpener(profile: JourneyProfile): string {
  const t = profile.primaryTopic;
  if (t) {
    const noun = TOPIC_NOUN[t];
    return `Before you go: a specialist can give you a clearer picture on ${noun} in a free first call. Want me to set it up?`;
  }
  return "Before you go: a free call with a specialist is often the quickest way to get a straight answer. Fancy it?";
}
