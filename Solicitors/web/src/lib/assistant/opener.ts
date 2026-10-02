/**
 * Deterministic opener copy for the Solicitors proactive assistant.
 *
 * Maps a journey intent profile (+ ping position) to a short, human,
 * behaviour-referencing one-liner for the peek bubble. Pure, instant, no model.
 *
 * Voice rules: one sentence, no em-dashes (commas/full stops/middle dots only),
 * no figures, no tax/regulatory advice, never claim the firm is chartered or
 * qualified. The opener's only job is to earn the click.
 *
 * LLM enrichment is Phase 5 (flagged off). OPENER_LLM_ENRICHMENT_ENABLED = false.
 */
import { type TopicKey } from "../intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "../intent/journeyModel";

/** Short noun for slotting a topic into generic copy. No em-dashes. */
const TOPIC_NOUN: Record<TopicKey, string> = {
  "sra-compliance": "your client account",
  "sole-practitioner": "your take-home",
  "partnership-llp": "your profit share",
  "succession-sale": "selling your firm",
  "practice-finance": "your firm's cash flow",
  vat: "your VAT position",
  incorporation: "going limited",
  "professional-indemnity": "your PII premium",
};

/** Bespoke, human, [curious, helpful, direct] lines for the four traffic topics. */
const TOPIC_HOOKS: Partial<Record<TopicKey, [string, string, string]>> = {
  "sra-compliance": [
    "Getting the client account right is where firms trip up. Want me to point you to the reserve and reconciliation tool?",
    "Still weighing up the SRA Accounts Rules? I can point you to a plain-English run-through or the client account tool, your call.",
    "The client account is worth a second pair of eyes. A specialist will talk it through with you, free and no pressure, shall I set that up?",
  ],
  "sole-practitioner": [
    "Working out what you actually keep from the practice? There is a calculator that does the fiddly part for you.",
    "Want a hand comparing sole practitioner, partner and limited company take-home? Happy to pull up the tool.",
    "A free call with a specialist will confirm the most tax-efficient way to draw your profit, want me to arrange it?",
  ],
  "partnership-llp": [
    "Splitting profit across the partners? There is a tool that allocates it and shows what each keeps after tax.",
    "Want me to line up the LLP profit share and partner tax calculator for you?",
    "A specialist can sanity-check your partner allocation and the tax on it, free first call, shall I set one up?",
  ],
  "succession-sale": [
    "Thinking about selling or succession? I can show you an indicative value and what you would keep after tax.",
    "Want me to pull up the practice sale value and net-proceeds calculator?",
    "A specialist can talk through the sale, the CGT and Business Asset Disposal Relief with you, free, want me to arrange it?",
  ],
};

const GENERIC: [string, string, string] = [
  "Anything I can help you find? I can point you to the right calculator or a quick answer.",
  "Want a hand with anything? Happy to dig out the right tool for your firm.",
  "If you would rather just ask a person, a free first call with a specialist is the quickest way, want me to set one up?",
];

// Combination: sole-practitioner + incorporation (the "should I go limited?" question).
const COMBO_SOLE_INC: [string, string, string] = [
  "Trying to work out if going limited beats staying a sole practitioner? That is the real question, and I can help you start on it.",
  "Sole practitioner versus a limited company is a close call for a lot of solicitors. Want me to line up the take-home comparison?",
  "This is exactly the sort of thing a specialist untangles in one free call. Want me to book it?",
];

const USED_CALC: [string, string, string] = [
  "Got your numbers? It is worth having a specialist sanity-check them for your firm, free.",
  "Those figures are a solid start. Want one of our specialists to confirm them on a quick call?",
  "Shall I set up a free call to walk through what the calculator gave you?",
];

function bothTopics(profile: JourneyProfile, a: TopicKey, b: TopicKey): boolean {
  const set = new Set<TopicKey | null>([profile.primaryTopic, profile.secondaryTopic]);
  return set.has(a) && set.has(b);
}

/** Later pings get more direct; an already-warm visitor jumps ahead. */
function variantIndex(pingIndex: number, stage: JourneyStage): 0 | 1 | 2 {
  let i = pingIndex;
  if (stage === "evaluating-us") i += 1;
  if (stage === "ready") i += 2;
  return Math.max(0, Math.min(i, 2)) as 0 | 1 | 2;
}

function topicGeneric(t: TopicKey, i: 0 | 1 | 2): string {
  const n = TOPIC_NOUN[t];
  return [
    `Looking into ${n}? I can point you to the right tool or a quick answer.`,
    `Want a hand with ${n}? Happy to dig out exactly what you need.`,
    `A free first call with a specialist is the quickest way to get ${n} sorted, want me to set one up?`,
  ][i];
}

/**
 * The cadence opener. `pingIndex` (0-based) plus the journey stage drive how
 * direct the line is; the topic + combination signals drive what it says.
 */
export function openerFor(profile: JourneyProfile, pingIndex = 0): string {
  const i = variantIndex(pingIndex, profile.stage);

  if (profile.signals.includes("friction")) return frictionOpener();
  if (bothTopics(profile, "sole-practitioner", "incorporation")) return COMBO_SOLE_INC[i];
  if (profile.signals.includes("used-calculator")) return USED_CALC[i];

  const t = profile.primaryTopic;
  if (t && TOPIC_HOOKS[t]) return TOPIC_HOOKS[t]![i];
  if (t) return topicGeneric(t, i);
  return GENERIC[i];
}

/**
 * Booking concierge: the visitor already converted and holds a live booking
 * capability, so the only useful nudge is to pick the callback slot.
 * (Solicitors has no /book route so this is dead code until C1 resolves.)
 */
export function bookingConciergeOpener(): string {
  return "Your specialist call is ready to book. Want to pick a time? It takes about 20 seconds.";
}

/** Instant copy when a form silently fails (honeypot/validation). */
export function frictionOpener(): string {
  return "Looks like that form is being fiddly. Tell me what you need right here and I will make sure it reaches us.";
}

/** Instant copy when the visitor is about to leave. Warm, never desperate. */
export function exitOpener(profile: JourneyProfile): string {
  if (profile.signals.includes("friction")) {
    return "Looks like the form played up. Before you go, tell me what you needed and I will sort it.";
  }
  const t = profile.primaryTopic;
  if (t) {
    return `Before you dash off, want a quick, no-pressure way to get ${TOPIC_NOUN[t]} sorted? I can point you to it.`;
  }
  return "Before you go, can I point you to something useful? Even just the right calculator to take with you.";
}

// --- Phase 5 (flagged off): LLM enrichment of the opener -------------------
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/**
 * Phase 5 fast-follow: pre-compute a sharper opener from the abstracted profile
 * (topic keys + flags only, no PII) during the dwell window, cached, with this
 * deterministic opener as the fallback. Disabled in v1: always returns null.
 */
export async function enrichOpener(profile: JourneyProfile, pingIndex: number): Promise<string | null> {
  if (!OPENER_LLM_ENRICHMENT_ENABLED) return null;
  void profile;
  void pingIndex;
  return null;
}
