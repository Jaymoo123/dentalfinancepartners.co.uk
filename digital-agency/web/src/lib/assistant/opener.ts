/**
 * Opener copy for the Agency Founder Finance SpecialistWidget (WS6).
 *
 * Topic nouns and three escalating hook lines (curious -> helpful -> direct)
 * per taxonomy key. Ported from the Dentists pattern with the agency 6-topic
 * taxonomy, no booking concierge (no /book path; /contact only), and the
 * `aff` storage prefix.
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line.
 * - No em-dashes.
 * - No tax-advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did.
 * - No "we noticed you're struggling" surveillance framing.
 * - No "DJH" in any copy here.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic Phase-0 only).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF in Phase 0. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into fallback templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  international: "moving your agency abroad",
  "pay-planning": "your salary and dividend split",
  rnd: "R&D tax relief",
  exit: "your agency exit",
  "compliance-vat": "your agency VAT",
  structure: "your agency structure",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  international: [
    "Looking at moving the agency overseas and what it means for UK tax? I can point you to a starting answer.",
    "Want to understand the temporary non-residence rule before you plan a move? Happy to help.",
    "A free call is the quickest way to get UK-side advice on relocating, and we will flag where you need a local specialist, want one?",
  ],
  "pay-planning": [
    "Working out the most efficient salary and dividend split for your agency? I can pull up the optimiser.",
    "Want to see how a split is taxed after the 2026/27 dividend rise, with the Employment Allowance caveat? Happy to point you to it.",
    "A free call with an agency finance specialist will confirm the sensible split for your company, want me to set one up?",
  ],
  rnd: [
    "Wondering whether your agency work counts as R&D? Most does not, but I can point you to a quick sense-check.",
    "Want to know what a genuine technical advance looks like before you consider a claim? Happy to walk you through it.",
    "A free call with a specialist is the safest way to check whether you have a real R&D claim, want one?",
  ],
  exit: [
    "Thinking about selling the agency and what CGT you would pay? I can pull up the exit and BADR model.",
    "Want the like-for-like bill with and without Business Asset Disposal Relief on your numbers? I can point you to it.",
    "A specialist can talk through your exit, the BADR conditions and the April 2026 rate step in one free call, want me to arrange it?",
  ],
  "compliance-vat": [
    "Checking whether the VAT Flat Rate Scheme is worth it for your agency? I can pull up the comparison.",
    "Not sure if you are a limited-cost trader stuck on the 16.5% rate? I can run you through the quick check.",
    "A free call will get your VAT scheme and registration straight, want me to set one up?",
  ],
  structure: [
    "Weighing whether to incorporate your agency? There is a tool that shows the take-home either way.",
    "Want a hand seeing how your structure affects what you keep, with the employer NI and Employment Allowance in the mix? Happy to point you to it.",
    "A specialist can get your structure decision straight in one free call, want me to arrange it?",
  ],
};

/**
 * Combination opener: exit + pay-planning in the profile
 * (the "structuring for exit while optimising current draw" journey).
 */
const COMBO_EXIT_PAY: [string, string, string] = [
  "Balancing current extraction against the exit planning? That is a common agency founder tension, and I can help you start on both.",
  "Optimising your salary and dividend split now while planning the exit structure is worth modelling together. Want me to point you to both tools?",
  "This is exactly the kind of two-sided question a specialist resolves in one free call. Shall I set it up?",
];

/** Used-calculator sanity-check opener. */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want me to point out anything worth a specialist look?",
  "The calculator gives a picture; a specialist confirms whether it fits your specific agency structure. Want a quick check?",
  "Ready to sanity-check those results with a specialist? The first call is free and goes further than any model.",
];

/** Fully generic (no topic). */
const GENERIC: [string, string, string] = [
  "Not sure what you are looking for? I can point you to the right tool or a quick answer.",
  "Happy to help you find what you need. What is the main thing on your mind?",
  "The quickest way to get a straight answer for your agency is a free call with a specialist. Want me to set one up?",
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

  // Combination: exit + pay-planning (the simultaneous extraction + exit journey).
  if (
    primaryTopic &&
    secondaryTopic &&
    ((primaryTopic === "exit" && secondaryTopic === "pay-planning") ||
      (primaryTopic === "pay-planning" && secondaryTopic === "exit"))
  ) {
    return COMBO_EXIT_PAY[vi];
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
  return "Before you go: a free call with a specialist agency accountant is often the quickest way to get a straight answer. Fancy it?";
}
