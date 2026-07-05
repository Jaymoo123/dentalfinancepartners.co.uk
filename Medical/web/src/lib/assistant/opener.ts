/**
 * Opener copy for the Medical Accountants UK SpecialistWidget (WS6).
 *
 * Topic nouns and three escalating hook lines (curious -> helpful -> direct)
 * per taxonomy key. Ported from the SHIPPED Dentists R3 opener.ts with the
 * Medical 5-topic taxonomy (`ma` storage prefix, no /book path, /contact only).
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line.
 * - No em-dashes.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did.
 * - No "we noticed you're struggling" surveillance framing.
 * - No "DJH", no "Reflex" in any copy here.
 * - No booking branch: the "call" chip points to /contact (no /book on Medical).
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic Phase-0 only).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF in Phase 0. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into fallback templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  "nhs-pension": "your NHS pension",
  "incorporation-private": "incorporating your private practice",
  locum: "your take-home",
  "gp-tax": "your tax",
  "gp-practice": "your practice accounts",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 * No em-dashes. No tax advice. No chartered/qualified claim.
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  "nhs-pension": [
    "Working out whether your NHS pension growth triggers a charge? I can pull up the annual allowance tool that checks it.",
    "Not sure where you sit against the taper and the £60,000 allowance? I can run you through the quick calculator.",
    "A free call with a specialist will get your annual allowance and Scheme Pays position straight, want me to set one up?",
  ],
  "incorporation-private": [
    "Weighing up incorporating your private work? I can point you to the comparison in a second.",
    "Sole trader against a limited company for your private practice, with the NHS pension trade-off, there is a tool that shows both. Want me to line it up?",
    "A free call will confirm whether incorporating is worth it for your private work, and what it costs your pension, shall I arrange it?",
  ],
  locum: [
    "Working out what you actually keep as a locum? I can pull up the calculator that does the fiddly part.",
    "Want a hand seeing your take-home after tax, Class 4 and any student loan? Happy to point you to it.",
    "A free call with a specialist will confirm the most tax-efficient way to work as a locum, want me to set one up?",
  ],
  "gp-tax": [
    "Sorting how you are taxed as a salaried GP, a partner or a locum? I can point you to a quick answer.",
    "Holding an NHS post plus private or locum sessions? The take-home tool shows the self-employed side. Want me to line it up?",
    "A free call is the quickest way to get your whole tax position, NHS and private, straight. Fancy a quick call?",
  ],
  "gp-practice": [
    "Anything I can help you find on your practice accounts, partnership drawings or premises? I can point you to a quick answer.",
    "Want a hand keeping on top of your practice finances and the year-end position? Happy to help.",
    "A free first call with a specialist is the quickest way to get your practice accounts sorted, want me to set one up?",
  ],
};

/**
 * Combination opener: both incorporation-private and nhs-pension in the profile
 * (the "should I incorporate my private work, and what does it do to my NHS pension?" journey).
 * Mirrors Dentists COMBO_ASSOCIATE_PRINCIPAL. Order-independent topic check.
 */
const COMBO_INCORP_NHS_PENSION: [string, string, string] = [
  "Looking at incorporating your private work and worried about your NHS pension? That is exactly the trade-off to get right, and I can help you start on it.",
  "Incorporating private income against the NHS pension you would give up is a close call for a lot of doctors. Want me to line up the comparison?",
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

  // Combination: incorporation-private + nhs-pension (the NHS pension trap journey).
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "incorporation-private" && secondaryTopic === "nhs-pension") ||
      (primaryTopic === "nhs-pension" && secondaryTopic === "incorporation-private"))
  ) {
    return COMBO_INCORP_NHS_PENSION[vi];
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
