/**
 * Deterministic opener copy for the proactive assistant.
 *
 * Maps a journey intent profile (+ ping position) to a short, human, behaviour-
 * referencing one-liner for the peek bubble. Pure, instant, no model.
 *
 * Voice: sounds like a helpful person who noticed what you're doing, not a form.
 * Hard rules: one sentence, NO em-dashes (commas/full stops only), no figures,
 * no tax advice, never claim the firm is chartered/qualified. The opener's only
 * job is to earn the click.
 *
 * Adaptivity comes from three axes: the topic the journey is about, the stage
 * (researching -> comparing -> evaluating-us -> ready), and the ping position
 * (later pings get more direct). LLM enrichment is the Phase-5 fast-follow.
 */
import { type TopicKey } from "../intent/taxonomy";
import type { JourneyProfile, JourneyStage } from "../intent/journeyModel";

/** Short noun for slotting a topic into generic copy. */
const TOPIC_NOUN: Record<TopicKey, string> = {
  "section-24": "Section 24",
  incorporation: "going limited",
  "capital-gains": "capital gains tax",
  "landlord-essentials": "your landlord tax",
  mtd: "Making Tax Digital",
  portfolio: "your portfolio",
  "non-resident": "non-resident landlord tax",
  "property-types": "the tax on your property",
  "stamp-duty": "stamp duty",
  services: "your situation",
};

/** Bespoke, human, [curious, helpful, direct] lines for the topics that carry most traffic. */
const TOPIC_HOOKS: Partial<Record<TopicKey, [string, string, string]>> = {
  "section-24": [
    "Section 24 catches a lot of landlords out. Want me to pull up the calculator that shows what it's actually costing you?",
    "Still getting your head round Section 24? I can point you to a plain-English run-through or the calculator, your call.",
    "Section 24 is worth a second pair of eyes. A specialist will check where you stand, free and no pressure, shall I set that up?",
  ],
  incorporation: [
    "Thinking about going limited? I can show you the real numbers before you commit either way.",
    "Incorporating suits some landlords and not others. Want me to line up the cost calculator so you can see for yourself?",
    "The limited-company question is a big one to call alone. A free chat with a specialist will tell you if it stacks up for you, want me to arrange it?",
  ],
  "capital-gains": [
    "Working out the CGT on a sale? There's a calculator that does the fiddly part for you.",
    "CGT has a few reliefs people miss. Want me to point you to the calculator and the guide?",
    "Before you put a figure on a sale, a specialist can sanity-check the CGT for you, free. Fancy a quick call?",
  ],
  "stamp-duty": [
    "Stamp duty surcharges trip people up. Want me to work it out for the place you're looking at?",
    "Happy to pull up the stamp duty calculator for your purchase, want me to?",
    "A specialist can confirm your stamp duty position so there are no surprises at completion, free, shall I arrange it?",
  ],
  mtd: [
    "Making Tax Digital is coming for landlords. Want to check if and when it actually hits you?",
    "Not sure where you stand with MTD? I can run you through the quick checker.",
    "A specialist can get you MTD-ready without the headache, the first call's free, interested?",
  ],
  "landlord-essentials": [
    "Sorting your rental tax? I can point you to the right tool in a second.",
    "Want a hand getting your landlord tax straight? There's a calculator that makes it simple.",
    "A free call with a specialist will make sure nothing's slipping through the cracks, want me to set one up?",
  ],
  portfolio: [
    "Curious how your portfolio is really performing? There's a tool that lays it out.",
    "Want me to pull up the portfolio profitability calculator for you?",
    "A specialist can stress-test your portfolio numbers with you, free first call, shall I arrange one?",
  ],
};

const GENERIC: [string, string, string] = [
  "Anything I can help you find? I can point you to the right calculator or a quick answer.",
  "Want a hand with anything? Happy to dig out the right tool for you.",
  "If you'd rather just ask a person, a free first call with a specialist is the quickest way, want me to set one up?",
];

const COMBO_S24_INC: [string, string, string] = [
  "Trying to work out if going limited beats the Section 24 hit? That's the real question, and I can help you start on it.",
  "Section 24 versus incorporating is a close call for a lot of landlords. Want me to line up both calculators?",
  "This is exactly the sort of thing a specialist untangles in one free call. Want me to book it?",
];

const USED_CALC: [string, string, string] = [
  "Got your numbers? It's worth having a specialist sanity-check them for your exact situation, free.",
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
  if (bothTopics(profile, "section-24", "incorporation")) return COMBO_S24_INC[i];
  if (profile.signals.includes("used-calculator")) return USED_CALC[i];

  const t = profile.primaryTopic;
  if (t && TOPIC_HOOKS[t]) return TOPIC_HOOKS[t]![i];
  if (t) return topicGeneric(t, i);
  return GENERIC[i];
}

/**
 * Booking concierge: the visitor already converted and holds a live booking
 * capability, so the only useful nudge is to pick the callback slot.
 */
export function bookingConciergeOpener(): string {
  return "Your specialist call is ready to book. Want to pick a time? It takes about 20 seconds.";
}

/** Instant copy when a form silently fails (honeypot/validation) — the visitor's own action. */
export function frictionOpener(): string {
  return "Looks like that form's being fiddly. Tell me what you need right here and I'll make sure it reaches us.";
}

/** Instant copy when the visitor is about to leave. Warm, never desperate. */
export function exitOpener(profile: JourneyProfile): string {
  if (profile.signals.includes("friction")) {
    return "Looks like the form played up. Before you go, tell me what you needed and I'll sort it.";
  }
  const t = profile.primaryTopic;
  if (t) {
    return `Before you dash off, want a quick, no-pressure way to get ${TOPIC_NOUN[t]} sorted? I can point you to it.`;
  }
  return "Before you go, can I point you to something useful? Even just the right calculator to take with you.";
}

// --- Phase 5 (flagged, off): LLM enrichment of the opener -------------------
export const OPENER_LLM_ENRICHMENT_ENABLED = false;

/**
 * Phase 5 fast-follow: pre-compute a sharper opener from the abstracted profile
 * (topic keys + flags only, no PII) during the dwell window, cached, with this
 * deterministic opener as the fallback. Disabled in v1 — always returns null.
 */
export async function enrichOpener(profile: JourneyProfile, pingIndex: number): Promise<string | null> {
  if (!OPENER_LLM_ENRICHMENT_ENABLED) return null;
  void profile;
  void pingIndex;
  return null;
}
