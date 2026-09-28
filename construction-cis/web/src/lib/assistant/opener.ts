/**
 * Opener copy for Trade Tax Specialists (construction-cis) SpecialistWidget (WS6).
 *
 * Topic nouns and three escalating hook lines (curious -> helpful -> direct)
 * per taxonomy key. Ported from Dentists with CIS 6-topic taxonomy, no booking
 * concierge (no /book path; escalation = /contact only), and the bfp storage
 * prefix.
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line.
 * - No em-dashes.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did.
 * - No "we noticed you're struggling" surveillance framing.
 * - No "DJH" anywhere in any copy here.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic Phase-0 only).
 *
 * UK English. No em-dashes. Storage prefix: bfp (FROZEN).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF in Phase 0. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into fallback templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  "cis-refund": "your CIS refund",
  "cis-deductions": "your CIS deductions",
  "gross-payment-status": "gross payment status",
  "self-assessment": "your Self Assessment",
  "limited-company": "your CIS take-home",
  "vat-reverse-charge": "the VAT reverse charge",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 * Lines are verbatim from the R3 brief (honoured as contract).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  "cis-refund": [
    "Working out what CIS refund you are owed? I can pull up the estimator that does the labour-only sums.",
    "Want a hand seeing how much of your CIS deductions come back after expenses and your allowance? Happy to point you to it.",
    "A free call with a CIS specialist will confirm your refund and the quickest way to claim it, want me to set one up?",
  ],
  "gross-payment-status": [
    "Checking if you qualify for gross payment status? I can pull up the three-test readiness checker.",
    "Not sure your turnover clears the GPS threshold for your set-up? I can run you through the quick check.",
    "A specialist can talk through GPS and what April 2026 means for keeping it, free first call, want me to set one up?",
  ],
  "cis-deductions": [
    "Working out how much CIS comes off your pay? Remember it is the labour element only. I can show you the calculator.",
    "Want to split an invoice into labour and materials to see the real deduction? I can point you to the tool.",
    "A free call will confirm your deductions and whether you are set up on the right rate, interested?",
  ],
  "self-assessment": [
    "Sorting your Self Assessment as a CIS subcontractor? I can pull up the estimator.",
    "Want to see your SA bill after your CIS deductions are credited? Happy to point you to it.",
    "A specialist can get your Self Assessment and your CIS refund straight in one free call, want me to arrange it?",
  ],
  "limited-company": [
    "Weighing self-employed CIS against going on the books? There is a tool that shows both take-homes.",
    "Want the like-for-like take-home, CIS self-employed versus PAYE employee, on the same gross? I can point you to it.",
    "A free call will get your structure and your take-home straight, want me to set one up?",
  ],
  "vat-reverse-charge": [
    "Trying to work out if the VAT domestic reverse charge applies to your job? I can point you to a quick answer.",
    "Not sure whether you or your customer accounts for the VAT? Happy to walk you through the conditions.",
    "A free call with a specialist is the quickest way to get the reverse charge right on your invoices, want one?",
  ],
};

/**
 * Combination opener: both cis-refund and gross-payment-status in the profile
 * (the "get my refund then step up to GPS" journey). Mirrors the Dentists
 * COMBO_ASSOCIATE_PRINCIPAL shape.
 */
const COMBO_REFUND_GPS: [string, string, string] = [
  "You have been looking at both refunds and gross payment status. They are closely linked: GPS removes the deduction advance cycle entirely. I can walk you through both.",
  "Refund and GPS are two sides of the same picture. Want me to line up the tools so you can see the full comparison?",
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
  "Happy to help you find what you need. What is the main CIS question on your mind?",
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

  // Combination: cis-refund + gross-payment-status (either order).
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "cis-refund" && secondaryTopic === "gross-payment-status") ||
      (primaryTopic === "gross-payment-status" && secondaryTopic === "cis-refund"))
  ) {
    return COMBO_REFUND_GPS[vi];
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
