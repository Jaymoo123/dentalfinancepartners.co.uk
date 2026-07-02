/**
 * Per-lead AI sequence copy generation for Property Tax Partners.
 *
 * Generates personalised copy for 6 nurture steps (t0_email, day1_sms,
 * day2_give_email, day4_sms, day7_email, breakup_day11) using the lead's
 * enquiry echoes, intent category, and journey digest as selection context.
 *
 * GLASS WALL (hard rule): the model is never shown passive browsing data.
 * It never receives name, email, or phone. Copy is stored fully resolved
 * (real URLs, not placeholders) so the send path consumes it verbatim.
 *
 * British English. No em-dashes.
 */

import { z } from "zod";
import { generateJson, anthropicConfigured } from "@/lib/ai/anthropic";
import { qaGateMessage } from "@/lib/ai/qa-gate";
import { adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { getSiteUrl } from "@/config/niche-loader";
import {
  parseEnquiryEchoes,
  normaliseEcho,
  categoryPhrase,
} from "@/lib/leads/enquiry-message";
import { humanisePath } from "@/lib/leads/dossier";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { firstNameOf } from "@accounting-network/web-shared/lead-nurture/config";
import { t0Variant } from "@/config/lead-nurture";
import type { GeneratedStepCopy } from "@accounting-network/web-shared/lead-nurture/config";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GENERATABLE_STEP_KEYS = [
  "t0_email",
  "day1_sms",
  "day2_give_email",
  "day4_sms",
  "day7_email",
  "breakup_day11",
] as const;

type GeneratableStepKey = (typeof GENERATABLE_STEP_KEYS)[number];

// Map each generatable step key to its index in the STEPS array in lead-nurture.ts.
// Used by regenerateLeadCopy to filter to unsent steps only.
const STEP_KEY_TO_IDX: Record<GeneratableStepKey, number> = {
  t0_email: 0,
  day1_sms: 3,
  day2_give_email: 4,
  day4_sms: 5,
  day7_email: 6,
  breakup_day11: 7,
};

const GENERATABLE_STEPS: Array<{ key: GeneratableStepKey; stepsIdx: number }> =
  GENERATABLE_STEP_KEYS.map((key) => ({ key, stepsIdx: STEP_KEY_TO_IDX[key] }));

const EMAIL_STEPS = new Set<string>([
  "t0_email",
  "day2_give_email",
  "day7_email",
  "breakup_day11",
]);
const SMS_STEPS = new Set<string>(["day1_sms", "day4_sms"]);

// ---------------------------------------------------------------------------
// Calculator map (mirrors lead-nurture.ts - not exported there)
// ---------------------------------------------------------------------------

const CALC_MAP: Record<string, { name: string; path: string }> = {
  section24: {
    name: "Section 24 Tax Relief Calculator",
    path: "/calculators/section-24-calculator",
  },
  incorporation: {
    name: "Incorporation Cost Calculator",
    path: "/calculators/incorporation-cost-calculator",
  },
  portfolio_structuring: {
    name: "Portfolio Profitability Calculator",
    path: "/calculators/portfolio-profitability-calculator",
  },
  mtd: {
    name: "MTD Checker",
    path: "/calculators/mtd-checker",
  },
};

function calcKeyFrom(intentCategory: string | undefined): string | undefined {
  if (!intentCategory) return undefined;
  const norm = intentCategory
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  if (CALC_MAP[norm]) return norm;
  if (/section.?24/.test(norm)) return "section24";
  if (/incorporat/.test(norm)) return "incorporation";
  if (/portfolio|structur/.test(norm)) return "portfolio_structuring";
  if (/mtd|making.?tax/.test(norm)) return "mtd";
  return undefined;
}

// ---------------------------------------------------------------------------
// Zod schema for AI output
// ---------------------------------------------------------------------------

const StepCopySchema = z.object({
  key: z.enum([
    "t0_email",
    "day1_sms",
    "day2_give_email",
    "day4_sms",
    "day7_email",
    "breakup_day11",
  ]),
  subject: z.string().optional(),
  preheader: z.string().optional(),
  paragraphs: z.array(z.string()).optional(),
  sms: z.string().optional(),
});

const SequenceSchema = z.object({
  steps: z.array(StepCopySchema),
});

// ---------------------------------------------------------------------------
// Journey digest
// ---------------------------------------------------------------------------

interface JourneyDigest {
  totalSessions: number;
  topPages: string[];
  calcEvents: number;
}

type WebEventRow = {
  event_name: string;
  page_path: string | null;
};

async function buildJourneyDigest(
  visitorId: string | null,
): Promise<JourneyDigest | null> {
  if (!visitorId) return null;

  try {
    const [journeyRes, eventsRes] = await Promise.all([
      adminSelect<Record<string, unknown>>("vw_visitor_journey", {
        visitor_id: `eq.${visitorId}`,
        select: "total_sessions",
        limit: "1",
      }),
      adminSelect<WebEventRow>("web_events", {
        visitor_id: `eq.${visitorId}`,
        is_bot: "eq.false",
        select: "event_name,page_path",
        order: "ts.desc",
        limit: "300",
      }),
    ]);

    const pageCounts = new Map<string, number>();
    let calcEvents = 0;
    for (const ev of eventsRes.data) {
      if (ev.event_name === "page_view" && ev.page_path) {
        pageCounts.set(ev.page_path, (pageCounts.get(ev.page_path) || 0) + 1);
      }
      if (ev.event_name.startsWith("calc_")) calcEvents += 1;
    }

    const topPages = Array.from(pageCounts.entries())
      .filter(([p]) => p !== "/thank-you")
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([path]) => humanisePath(path));

    const journeyRow = journeyRes.data[0] || null;
    const totalSessions = journeyRow
      ? Number(journeyRow.total_sessions || 1)
      : eventsRes.data.length > 0
        ? 1
        : 0;

    if (totalSessions === 0 && topPages.length === 0 && calcEvents === 0) {
      return null;
    }

    return { totalSessions, topPages, calcEvents };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

function buildLeadUrls(
  leadId: string,
  siteUrl: string,
): { bookingUrl: string; confirmUrl: string } {
  const b = siteUrl.replace(/\/$/, "");
  try {
    const bookingUrl = `${b}/book?t=${encodeURIComponent(mintLeadToken(leadId, "book"))}`;
    const confirmUrl = `${b}/api/leads/confirm/${mintLeadToken(leadId, "confirm")}`;
    return { bookingUrl, confirmUrl };
  } catch {
    return { bookingUrl: `${b}/contact`, confirmUrl: `${b}/contact` };
  }
}

// ---------------------------------------------------------------------------
// Placeholder substitution
// ---------------------------------------------------------------------------

function subAll(text: string, subs: Record<string, string>): string {
  let result = text;
  for (const [key, value] of Object.entries(subs)) {
    // replaceAll not universally available in older targets; use split/join
    result = result.split(`{{${key}}}`).join(value);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------

function buildSystemPrompt(): string {
  return `\
You write follow-up emails and SMS messages for Property Tax Partners, a UK property tax specialist.

Leads have already submitted a free review enquiry. These are solicited service communications, not marketing. The tone is warm and human, like a knowledgeable colleague reaching out.

HARD RULES (any violation makes a step invalid):
1. GLASS WALL: Never reference passive browsing. Banned phrases: "we saw you", "we noticed", "you visited", "you viewed", "you read", "you returned", "your visits", "you browsed", "you have been looking", "you've been looking".
2. PLACEHOLDERS: Use {{firstName}} for the lead's first name and {{bookingUrl}} for the booking link. Use no other placeholders except {{confirmUrl}} and {{calculatorUrl}} when directly relevant. Do NOT invent names, emails, or phone numbers.
3. BOOKING CTA: Every email must include {{bookingUrl}} somewhere in the body paragraphs. Every SMS must contain {{bookingUrl}}.
4. SMS OPT-OUT: Every SMS must end with exactly: "Reply STOP to opt out."
5. SMS LENGTH: Every SMS body including opt-out must be at most 320 characters.
6. NO CREDENTIALS: Do not claim "chartered", "ICAEW", "ACCA", "CTA", "qualified accountant", or any regulatory membership.
7. NO GUARANTEES: No "you will save", "guaranteed", "risk-free", "certain to".
8. NO FIGURES: No GBP amounts, percentages, or "N per cent".
9. NO HMRC ATTRIBUTION: Do not write "HMRC says", "HMRC confirmed", "according to HMRC".
10. BRITISH ENGLISH: Use British spelling (organise, colour, behaviour, centre).
11. NO EM-DASHES OR EN-DASHES: Use commas, parentheses, or full stops instead of -- or -.
12. EMAIL PARAGRAPHS: 2 to 4 paragraphs. Each paragraph max 450 characters. Subject max 78 characters.

SEQUENCE: 6 steps over 11 days. The lead filled in a detailed enquiry form and has not yet booked.

PSYCHOLOGICAL MECHANISM PER STEP:
- t0_email: Reciprocity. "I have read what you sent." Mirror their words naturally.
- day1_sms: Commitment echo. Name their stated goal. Hold time for it.
- day2_give_email: Generosity (give without asking). If calculator context is available, reference "the calculator you tried" as an active engagement signal (NOT a browsing signal). Always include "a starting point, not advice" when mentioning a calculator. If no calculator context, use figures-to-hand preparation variant.
- day4_sms: Social proof. Most landlords with the same question found one short call clearing months of uncertainty.
- day7_email: Fresh start plus autonomy. New week, no pressure, one decision and a minute to book.
- breakup_day11: Warm peak-end. Stop reminders gracefully. Leave a useful parting insight about when to reach out next (new purchase, sale, or Self Assessment bill).

STATIC EXEMPLARS (use as style guide, not copy-paste; personalise using the lead context):

--- t0_email BRANDED variant (3 paragraphs, include {{bookingUrl}} inline) ---
Subject: Got your enquiry, {{firstName}}. Here is what happens next.
Preheader: A property tax specialist will call. Pick a time that suits you.
Para 1: Thanks for getting in touch. I have read what you sent us, and wanting to [CALL GOAL] is exactly the kind of thing our property tax specialists work on every week, so you are in the right place.
Para 2: The next step is a short call with a specialist. There is no charge and no obligation, and it is genuinely useful even if you decide to do nothing afterwards. Pick a time here: {{bookingUrl}}
Para 3: If it is easier, just reply to this email and we will call you.

--- t0_email PERSONAL variant (4 paragraphs, reply is the CTA, {{bookingUrl}} inline in para 3) ---
Subject: Quick one about your enquiry
Para 1: Hi {{firstName}}, it is the team at Property Tax Partners. Your enquiry just came through.
Para 2: Reading it back: you would like to [CALL GOAL]. Have I got that right?
Para 3: Reply and let me know, and we will get a call booked in. If it is easier, pick a time straight away here: {{bookingUrl}}
Para 4: Speak soon.

--- day1_sms (keep under 320 chars including opt-out) ---
Hi {{firstName}}, following up on the property tax review you asked about. You said you would like to [CALL GOAL], so we have kept some specialist time free this week for exactly that. Grab whichever slot suits: {{bookingUrl}} Reply STOP to opt out.

--- day2_give_email (with calculator reference) ---
Subject: Two things worth having to hand for your call, {{firstName}}
Preheader: A quick way to see your own numbers before we speak.
Para 1: While you decide on a time, here are a couple of things that make these calls more useful.
Para 2: First, if it helps to see rough numbers for yourself, the calculator you tried lets you plug in your own figures in a few minutes. It is a starting point, not advice, but it usually sharpens the questions worth asking. When you are ready: {{bookingUrl}}
Para 3: Second, your review will cover where you stand today, the options that realistically apply to your position, and the one or two things worth doing next. No jargon, nothing to prepare.

--- day2_give_email (figures-to-hand variant, no calculator) ---
Subject: Two things worth having to hand for your call, {{firstName}}
Preheader: A quick way to see your own numbers before we speak.
Para 1: While you decide on a time, here are a couple of things that make these calls more useful.
Para 2: First, it helps to have a rough idea of your figures to hand: what the property or portfolio brings in, what it costs, and any mortgage interest. Nothing formal, the specialist works with whatever you have.
Para 3: Second, your review will cover where you stand today, the options that realistically apply to your position, and the one or two things worth doing next. No jargon, nothing to prepare. Book here: {{bookingUrl}}

--- day4_sms ---
Hi {{firstName}}, Property Tax Partners here. Most landlords we speak to came to us with the same question you raised, and one short call usually clears up months of second-guessing. Happy to do the same for you: {{bookingUrl}} or reply YES. Reply STOP to opt out.

--- day7_email ---
Subject: Still here whenever the timing is right, {{firstName}}
Preheader: No rush. One short conversation whenever it suits.
Para 1: New week, so a quick and final-but-one note. Your free review is still open and there is no rush at all. If now is not the moment, that is completely fine.
Para 2: If a short call would help you [CALL GOAL], it is one decision and a minute to book whenever it suits: {{bookingUrl}}

--- breakup_day11 ---
Subject: We will leave it there for now, {{firstName}}
Preheader: The door stays open whenever you need us.
Para 1: We have reached out a few times about your enquiry, so we will stop the reminders now and leave the ball in your court. No hard feelings at all.
Para 2: One parting thought that costs nothing: if your situation changes, the moments most worth a quick review are usually a new purchase, a sale, or the arrival of your Self Assessment bill. Whenever one of those lands, we are one message away and the review is still free.
Para 3: Your booking link stays live: {{bookingUrl}}`;
}

interface UserPromptOptions {
  callGoalEcho: string;
  situationEcho: string;
  promptedEcho?: string;
  role?: string;
  intentCategory?: string;
  qualityScore?: number;
  journeyDigest: JourneyDigest | null;
  variant: "t0_branded" | "t0_personal";
  calculatorName?: string;
  regenTranscript?: string;
  keysToGenerate?: string[];
}

function buildUserPrompt(opts: UserPromptOptions): string {
  const keys = opts.keysToGenerate ?? [...GENERATABLE_STEP_KEYS];

  const journeyBlock = opts.journeyDigest
    ? [
        `Sessions before enquiring: ${opts.journeyDigest.totalSessions}`,
        opts.journeyDigest.topPages.length > 0
          ? `Topics engaged with (top ${opts.journeyDigest.topPages.length}): ${opts.journeyDigest.topPages.join(", ")}`
          : null,
        opts.journeyDigest.calcEvents > 0
          ? `Calculator interactions: ${opts.journeyDigest.calcEvents}`
          : null,
      ]
        .filter(Boolean)
        .join("\n")
    : "No journey data available.";

  const calcBlock = opts.calculatorName
    ? `Calculator context: The lead engaged with the ${opts.calculatorName}. Reference it as "the calculator you tried" in day2_give_email.`
    : "No calculator context. Use the figures-to-hand variant for day2_give_email.";

  const t0Note =
    opts.variant === "t0_personal"
      ? "t0_email VARIANT: personal (question-led, reply-as-CTA, 4 paragraphs, no CTA button, include {{bookingUrl}} inline in paragraph 3, include 'Have I got that right?' question)"
      : "t0_email VARIANT: branded (3 paragraphs with CTA button, include {{bookingUrl}} inline in paragraph 2 or 3)";

  const transcript = opts.regenTranscript
    ? `\nREPLY TRANSCRIPT (weave acknowledgement of these replies into later touches naturally):\n${opts.regenTranscript}\n`
    : "";

  return `\
Generate personalised follow-up copy for this property tax enquiry lead.

LEAD CONTEXT:
Role: ${opts.role || "Not specified"}
What they want from the review: ${opts.callGoalEcho}${opts.situationEcho ? `\nTheir situation (their own words): ${opts.situationEcho}` : ""}${opts.promptedEcho ? `\nWhat prompted their enquiry: ${opts.promptedEcho}` : ""}
Intent category: ${opts.intentCategory || "general property tax"}
Quality score: ${opts.qualityScore !== undefined ? `${opts.qualityScore}/5` : "not scored"}
${calcBlock}

JOURNEY DIGEST (use only as context for HOW DEEPLY they researched, not to reference visits):
${journeyBlock}

${t0Note}
${transcript}
STEPS TO GENERATE: ${keys.join(", ")}

Generate exactly those steps. Weave the lead's own words naturally. Follow all rules in the system prompt.`;
}

// ---------------------------------------------------------------------------
// Copy storage helper
// ---------------------------------------------------------------------------

async function storeCopy(
  leadId: string,
  passingSteps: Record<string, GeneratedStepCopy>,
  status: "ready" | "partial" | "failed",
  regens: number,
): Promise<void> {
  const stored: Record<string, unknown> = {
    ...passingSteps,
    _meta: { regens, generatedAt: new Date().toISOString() },
  };
  await adminUpdate(
    "lead_nurture_state",
    { lead_id: `eq.${leadId}` },
    { generated_copy: stored, copy_status: status },
  );
}

// ---------------------------------------------------------------------------
// Per-step QA with substitution
// ---------------------------------------------------------------------------

function qaAndSubstituteStep(
  step: z.infer<typeof StepCopySchema>,
  substitutions: Record<string, string>,
  siteUrl: string,
): GeneratedStepCopy | null {
  const isEmail = EMAIL_STEPS.has(step.key);
  const isSms = SMS_STEPS.has(step.key);

  if (isEmail) {
    if (!step.paragraphs || step.paragraphs.length === 0) return null;
    const subjectSub = step.subject ? subAll(step.subject, substitutions) : "";
    const paraSubs = step.paragraphs.map((p) => subAll(p, substitutions));
    const preheaderSub = step.preheader
      ? subAll(step.preheader, substitutions)
      : undefined;

    const qa = qaGateMessage(
      "email",
      { subject: subjectSub, paragraphs: paraSubs },
      { siteUrl, requireBookingCta: true },
    );
    if (!qa.ok) return null;

    return {
      subject: subjectSub || undefined,
      preheader: preheaderSub,
      paragraphs: paraSubs,
    };
  }

  if (isSms) {
    if (!step.sms) return null;
    const smsSub = subAll(step.sms, substitutions);

    const qa = qaGateMessage(
      "sms",
      { body: smsSub },
      { siteUrl, requireBookingCta: true },
    );
    if (!qa.ok) return null;

    return { sms: smsSub };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Lead row type
// ---------------------------------------------------------------------------

interface LeadRow {
  id: string;
  full_name: string;
  role: string | null;
  message: string | null;
  source: string;
  visitor_id: string | null;
}

// ---------------------------------------------------------------------------
// Core generation logic (shared by generate and regenerate)
// ---------------------------------------------------------------------------

interface GenerationResult {
  passingSteps: Record<string, GeneratedStepCopy>;
  passCount: number;
  dropCount: number;
}

async function runGeneration(
  leadId: string,
  lead: LeadRow,
  keysToGenerate: GeneratableStepKey[],
  regenTranscript?: string,
): Promise<GenerationResult | null> {
  // Read lead_enrichment (best-effort)
  let intentCategory: string | undefined;
  let qualityScore: number | undefined;
  try {
    const enrichRes = await adminSelect<{
      intent_category: string | null;
      quality_score: number | null;
    }>("lead_enrichment", {
      select: "intent_category,quality_score",
      lead_id: `eq.${leadId}`,
      limit: "1",
    });
    if (enrichRes.data.length > 0) {
      intentCategory = enrichRes.data[0].intent_category ?? undefined;
      qualityScore = enrichRes.data[0].quality_score ?? undefined;
    }
  } catch {
    /* best-effort */
  }

  const journeyDigest = await buildJourneyDigest(lead.visitor_id);

  const parts = parseEnquiryEchoes(lead.message);
  let callGoalEcho = normaliseEcho(parts.callGoal);
  if (!callGoalEcho) {
    callGoalEcho = categoryPhrase(intentCategory, lead.role ?? undefined);
  }
  const situationEcho = parts.situation?.trim() || "";
  const promptedEcho = normaliseEcho(parts.prompted);

  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const firstName = firstNameOf(lead.full_name);
  const { bookingUrl, confirmUrl } = buildLeadUrls(leadId, siteUrl);

  const calcKey = calcKeyFrom(intentCategory);
  let calculatorName: string | undefined;
  let calculatorUrl: string | undefined;
  if (calcKey && CALC_MAP[calcKey]) {
    calculatorName = CALC_MAP[calcKey].name;
    calculatorUrl = `${siteUrl}${CALC_MAP[calcKey].path}`;
  }

  const variant = t0Variant(leadId);

  const system = buildSystemPrompt();
  const userPrompt = buildUserPrompt({
    callGoalEcho,
    situationEcho,
    promptedEcho: promptedEcho || undefined,
    role: lead.role || undefined,
    intentCategory,
    qualityScore,
    journeyDigest,
    variant,
    calculatorName,
    regenTranscript,
    keysToGenerate: keysToGenerate as string[],
  });

  const aiOutput = await generateJson({
    model: "sonnet",
    system,
    prompt: userPrompt,
    schema: SequenceSchema,
    maxTokens: 3500,
    cacheSystem: true,
  });

  if (!aiOutput) return null;

  const substitutions: Record<string, string> = {
    firstName,
    bookingUrl,
    confirmUrl,
    ...(calculatorUrl ? { calculatorUrl } : {}),
    ...(calculatorName ? { calculatorName } : {}),
  };

  const requestedKeySet = new Set<string>(keysToGenerate);
  const passingSteps: Record<string, GeneratedStepCopy> = {};
  let passCount = 0;
  let dropCount = 0;

  for (const step of aiOutput.steps) {
    if (!requestedKeySet.has(step.key)) {
      continue;
    }
    const resolved = qaAndSubstituteStep(step, substitutions, siteUrl);
    if (resolved) {
      passingSteps[step.key] = resolved;
      passCount++;
    } else {
      dropCount++;
    }
  }

  return { passingSteps, passCount, dropCount };
}

// ---------------------------------------------------------------------------
// Public exports
// ---------------------------------------------------------------------------

/**
 * True when LEAD_COPY_AI_ENABLED=true AND the Anthropic key is configured.
 */
export function copyAiEnabled(): boolean {
  return (
    process.env.LEAD_COPY_AI_ENABLED === "true" && anthropicConfigured()
  );
}

/**
 * Generate personalised sequence copy for a lead and store it on
 * lead_nurture_state.generated_copy. Returns the generation status.
 *
 * Skips test leads (source='test') to save tokens; the send path already
 * skips sends for test leads.
 */
export async function generateLeadSequenceCopy(
  leadId: string,
): Promise<{ status: "ready" | "partial" | "failed" | "disabled" }> {
  if (!copyAiEnabled()) return { status: "disabled" };

  // Read lead
  const leadRes = await adminSelect<LeadRow>("leads", {
    select: "id,full_name,role,message,source,visitor_id",
    id: `eq.${leadId}`,
    limit: "1",
  });

  const lead = leadRes.data[0];
  if (!lead) {
    console.warn(`[sequence-gen] lead ${leadId} not found`);
    return { status: "failed" };
  }

  // Skip test leads to save tokens
  if (lead.source === "test") {
    return { status: "disabled" };
  }

  const result = await runGeneration(
    leadId,
    lead,
    [...GENERATABLE_STEP_KEYS],
  );

  if (!result) {
    await storeCopy(leadId, {}, "failed", 0);
    console.log(`[sequence-gen] ${leadId}: model failure -> failed`);
    return { status: "failed" };
  }

  const { passingSteps, passCount, dropCount } = result;
  const total = GENERATABLE_STEP_KEYS.length;

  let status: "ready" | "partial" | "failed";
  if (passCount === 0) {
    status = "failed";
  } else if (passCount < total) {
    status = "partial";
  } else {
    status = "ready";
  }

  await storeCopy(leadId, passingSteps, status, 0);
  console.log(
    `[sequence-gen] ${leadId}: ${passCount}/${total} passed, ${dropCount} dropped -> ${status}`,
  );

  return { status };
}

/**
 * Regenerate copy for steps not yet sent. Appends the reply transcript to the
 * prompt so later touches can acknowledge the conversation.
 *
 * Capped at 2 regenerations (tracked in generated_copy._meta.regens).
 */
export async function regenerateLeadCopy(leadId: string): Promise<void> {
  if (!copyAiEnabled()) return;

  // Read current nurture state
  const stateRes = await adminSelect<{
    generated_copy: Record<string, unknown> | null;
    step: number;
  }>("lead_nurture_state", {
    select: "generated_copy,step",
    lead_id: `eq.${leadId}`,
    limit: "1",
  });

  const stateRow = stateRes.data[0];
  if (!stateRow) return;

  const existingCopy = stateRow.generated_copy as Record<string, unknown> | null;
  const meta = existingCopy?._meta as
    | { regens?: number; generatedAt?: string }
    | undefined;
  const regens = meta?.regens ?? 0;

  if (regens >= 2) return;

  // Read reply transcript (best-effort)
  let regenTranscript: string | undefined;
  try {
    const eventsRes = await adminSelect<{
      event_type: string;
      ts: string;
      meta: Record<string, unknown> | null;
      channel: string | null;
    }>("lead_contact_events", {
      lead_id: `eq.${leadId}`,
      select: "event_type,ts,meta,channel",
      order: "ts.asc",
      limit: "20",
    });
    const replies = eventsRes.data.filter(
      (e) =>
        e.event_type === "replied" && typeof e.meta?.body === "string",
    );
    if (replies.length > 0) {
      regenTranscript = replies
        .map(
          (r) =>
            `[${r.channel || "sms"} at ${r.ts}]: ${String(r.meta?.body || "")}`,
        )
        .join("\n");
    }
  } catch {
    /* best-effort */
  }

  // Determine which steps to regenerate (at or after current step index)
  const currentStepIdx = stateRow.step;
  const stepsToGen = GENERATABLE_STEPS.filter(
    (s) => s.stepsIdx >= currentStepIdx,
  );

  if (stepsToGen.length === 0) return;

  const keysToGen = stepsToGen.map((s) => s.key);

  // Read lead
  const leadRes = await adminSelect<LeadRow>("leads", {
    select: "id,full_name,role,message,source,visitor_id",
    id: `eq.${leadId}`,
    limit: "1",
  });

  const lead = leadRes.data[0];
  if (!lead || lead.source === "test") return;

  const result = await runGeneration(leadId, lead, keysToGen, regenTranscript);
  if (!result) return;

  // Merge into existing copy (preserve sent steps, update unsent ones)
  const mergedCopy: Record<string, unknown> = { ...(existingCopy || {}) };
  for (const [key, copy] of Object.entries(result.passingSteps)) {
    mergedCopy[key] = copy;
  }
  mergedCopy._meta = {
    regens: regens + 1,
    generatedAt: new Date().toISOString(),
  };

  await adminUpdate(
    "lead_nurture_state",
    { lead_id: `eq.${leadId}` },
    { generated_copy: mergedCopy },
  );

  console.log(
    `[sequence-gen] regen ${leadId}: ${result.passCount} steps merged, regens now ${regens + 1}`,
  );
}
