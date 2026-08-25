/**
 * Opener copy for divorce-finances SpecialistWidget (WS6).
 *
 * Topic nouns and three escalating hook lines (curious -> helpful -> direct)
 * per taxonomy key.
 *
 * STUB (scaffold phase): neutral placeholder copy. Real niche voice lands
 * with the content build (no calculators exist yet; registry.ts is empty).
 *
 * Voice rules (LOCKED):
 * - One sentence per hook line.
 * - No em-dashes.
 * - No advice claims ("you should do X").
 * - Never claim the firm is chartered, qualified or MLR-supervised.
 * - Generic-helpful: references only what the visitor self-evidently did.
 * - No "we noticed you're struggling" surveillance framing.
 *
 * OPENER_LLM_ENRICHMENT_ENABLED = false (deterministic Phase-0 only).
 *
 * UK English. No em-dashes. Storage prefix: dvf.
 */
import type { TopicKey } from "@/lib/intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "@/lib/intent/journeyModel";

/** Feature flag: LLM personalisation is OFF in Phase 0. */
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/** One short noun for each topic, slotted into fallback templates. */
export const TOPIC_NOUN: Record<TopicKey, string> = {
  "financial-settlement": "your financial settlement",
  "pension-sharing": "how pensions get split",
  "tax-on-divorce": "the tax side of your split",
  "family-home": "the options for the family home",
  "maintenance": "maintenance and support",
  "process-costs": "the process and what it costs",
};

/**
 * Three escalating hook lines per topic.
 * Index 0 = curious (early visitor), 1 = helpful (mid-session), 2 = direct (ready).
 */
export const TOPIC_HOOKS: Record<TopicKey, [string, string, string]> = {
  "financial-settlement": [
    "Working out what a fair settlement looks like? I can point you to a clear starting place.",
    "Want a hand seeing how the numbers stack up? Happy to point you to it.",
    "A free call with a specialist will give you a clearer picture of your settlement, want me to set one up?",
  ],
  "pension-sharing": [
    "Trying to understand how pensions get split on divorce? I can point you to a plain-English answer.",
    "Want a hand seeing what pension sharing might mean for you? Happy to point you to it.",
    "A specialist can talk through the pension options in a free first call, want me to set one up?",
  ],
  "tax-on-divorce": [
    "Working out the tax side of a separation? I can point you to a quick answer.",
    "Want a hand seeing how the tax rules apply to your split? Happy to point you to it.",
    "A free call with a specialist is the quickest way to get the tax position straight, want one?",
  ],
  "family-home": [
    "Weighing up the options for the family home? I can point you to a clear starting place.",
    "Want a hand seeing what each option means financially? Happy to point you to it.",
    "A specialist can talk through the options for the home in a free first call, want me to set one up?",
  ],
  "maintenance": [
    "Trying to understand maintenance and support? I can point you to a plain-English answer.",
    "Want a hand seeing how maintenance is usually worked out? Happy to point you to it.",
    "A free call with a specialist will give you a clearer picture, want me to set one up?",
  ],
  "process-costs": [
    "Working out the process and what it costs? I can point you to a clear starting place.",
    "Want a hand seeing what each route is likely to cost? Happy to point you to it.",
    "A specialist can talk through the quickest way forward in a free first call, want one?",
  ],
};

/** Used-calculator sanity-check opener (fires at vi=2 with used-calculator signal). */
const USED_CALC: [string, string, string] = [
  "You have already run the numbers. Want me to point out anything worth a specialist eye?",
  "The calculator gives a picture; a specialist confirms whether it fits your actual situation. Want a quick check?",
  "Ready to sanity-check those results? A free call goes further than any calculator.",
];

/** Fully generic (no topic). */
const GENERIC: [string, string, string] = [
  "Not sure what you are looking for? I can point you to the right tool or a quick answer.",
  "Happy to help you find what you need. What is the main question on your mind?",
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
  const { primaryTopic, stage, signals } = profile;
  const vi = variantIndex(pingIndex, stage);

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
