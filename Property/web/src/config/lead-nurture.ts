/**
 * Property lead-nurture composition: the contactability sequence + per-lead
 * message context. This is the ONLY place Property copy/identity for the lead
 * follow-up lives; the shared engine (packages/web-shared/lead-nurture) is
 * content-agnostic.
 *
 * SERVICE-ONLY (compliance): every message is a solicited, non-promotional
 * follow-up about the enquirer's OWN enquiry (arrange the review, confirm, book,
 * gentle persistence, break-up). No tax marketing content. This keeps us inside
 * the "rely on existing LIA, service-only" posture and PECR's solicited-comms
 * carve-out. The marketing subscriber drip (config/nurture.ts) stays separate.
 *
 * Cadence: an instant email (step 0) fires synchronously at submit; an instant
 * SMS (step 1) fires at the same time if we are in the send window. Then 6
 * escalating follow-ups over ~11 days. Any two-way response (reply / book /
 * confirm) halts the chase and flips the lead to contactable.
 *
 * A/B: step 0 (t0_email) runs a stable hash split. "t0_branded" is the standard
 * CTA email; "t0_personal" is a plain question-led reply-as-CTA email. The split
 * is deterministic (FNV-1a of the lead UUID) so the same lead always sees the
 * same variant regardless of retries.
 *
 * House style: no em-dashes. British English.
 */

import type {
  GeneratedStepCopy,
  LeadMessageContext,
  LeadNurtureConfig,
  LeadNurtureStep,
  LeadStepMessage,
  LeadNurtureStateRow,
  NurtureLead,
} from "@accounting-network/web-shared/lead-nurture/config";
import { firstNameOf } from "@accounting-network/web-shared/lead-nurture/config";
import {
  computeMissingContact,
  type MissingContactField,
} from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";

// ── Engagement-variant decision (pure, exported for unit tests) ───────────────

/** Minimal event shape required by decideEngagementVariant. */
export interface EngagementEvent {
  event_type: string;
  /** ISO 8601 timestamp; used for the hesitation age check. */
  created_at: string;
}

/**
 * Decide which engagement-signal copy variant (if any) applies to this lead.
 *
 * Rules (in precedence order):
 *   hesitation    — a booking-link click exists AND no booking AND click >= 24 h
 *                   old. The lead looked but did not commit; address the friction.
 *   channel_shift — 3+ emails sent with ZERO open events. Emails may not be
 *                   reaching the lead; pivot to SMS for day-7.
 *
 * Hesitation wins when both conditions are true (a lead who clicked IS engaged;
 * channel-shift would be a downgrade in that case).
 *
 * @param events      Recent lead_contact_events (opened / clicked / booked) for
 *                    this lead, from the last 14 days.
 * @param emailSendCount  Count of lead_nurture_sends rows with channel=email,
 *                    status=sent for this lead.
 */
export function decideEngagementVariant(
  events: EngagementEvent[],
  emailSendCount: number,
): "hesitation" | "channel_shift" | undefined {
  const now = Date.now();
  const TWENTY_FOUR_H_MS = 24 * 60 * 60 * 1000;

  const clicked = events.find((e) => e.event_type === "clicked");
  const booked = events.find((e) => e.event_type === "booked");
  const opened = events.find((e) => e.event_type === "opened");

  // RULE hesitation: clicked a booking link, has not booked, click is at least
  // 24 h old (giving the lead a chance to book before we shift tone).
  if (clicked && !booked) {
    const clickedAt = new Date(clicked.created_at).getTime();
    if (!Number.isNaN(clickedAt) && now - clickedAt >= TWENTY_FOUR_H_MS) {
      return "hesitation";
    }
  }

  // RULE channel_shift: 3+ emails sent and not a single open recorded.
  // Only reached when hesitation did not match.
  if (emailSendCount >= 3 && !opened) {
    return "channel_shift";
  }

  return undefined;
}
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { getSiteUrl } from "./niche-loader";
import { renderLeadServiceEmail } from "@/lib/emails/lead-service-template";
import { adminSelect, adminUpdate, adminInsert } from "@/lib/supabase/admin";
import { parseEnquiryEchoes, normaliseEcho, categoryPhrase } from "@/lib/leads/enquiry-message";
import { computeNextSendMs, inSendWindow } from "@/lib/leads/send-window";

const SEQUENCE_NAME = "property_contactability";
const DETAIL_CAPTURE_SEQUENCE_NAME = "property_detail_capture";

/** Primary sequence variants. Names live here once so no write/gate path hardcodes them. */
export type LeadSequenceVariant = "contactability" | "detail_capture";
export const LEAD_SEQUENCE_NAMES = {
  contactability: SEQUENCE_NAME,
  detail_capture: DETAIL_CAPTURE_SEQUENCE_NAME,
} as const;

/**
 * Route a lead to its primary sequence by which required contact fields are
 * missing: any missing (name and/or phone) => the detail-capture chase that
 * collects them; otherwise the standard contactability chase. Single source of
 * truth for the submit route, retro-enrol, and the reconciliation safety-net, so
 * every path agrees.
 */
export function routePrimarySequence(lead: {
  full_name?: string | null;
  phone?: string | null;
}): string {
  return computeMissingContact(lead).length > 0
    ? DETAIL_CAPTURE_SEQUENCE_NAME
    : SEQUENCE_NAME;
}

/** Natural-language phrase for the missing contact field(s). No em/en dashes. */
export function missingPhraseFor(missing: MissingContactField[]): string {
  const hasName = missing.includes("name");
  const hasPhone = missing.includes("phone");
  if (hasName && hasPhone) return "your name and a phone number";
  if (hasPhone) return "a phone number we can reach you on";
  if (hasName) return "your name";
  return "";
}

/** CTA button label for the detail-capture "add your details" link. */
export function ctaLabelFor(missing: MissingContactField[] | undefined): string {
  const m = missing ?? [];
  const hasName = m.includes("name");
  const hasPhone = m.includes("phone");
  if (hasName && hasPhone) return "Add your details";
  if (hasPhone) return "Add your number";
  if (hasName) return "Add your name";
  return "Add your details";
}

const COMPANY = "Property Tax Partners";
const SIGNOFF = `Speak soon, the team at ${COMPANY}`;
const FOOTER =
  "You are receiving this because you submitted an enquiry on propertytaxpartners.co.uk.";
const OPT_OUT = "Reply STOP to opt out.";

function base(): string {
  return getSiteUrl().replace(/\/$/, "");
}

// ── T0 experiment variant ─────────────────────────────────────────────────────
// Single source of truth lives in web-shared so the console readout recomputes
// the exact same split; re-exported here for the copy layer's existing importers.
import { t0Variant } from "@accounting-network/web-shared/lead-nurture/t0";
export { t0Variant };

// ── Calculator slug map (verified against real routes) ───────────────────────

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
  // cgt: no CGT calculator route exists; intentionally omitted.
};

function calcKeyFrom(intentCategory: string | undefined): string | undefined {
  if (!intentCategory) return undefined;
  const norm = intentCategory.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  if (CALC_MAP[norm]) return norm;
  // Fuzzy fallbacks
  if (/section.?24/.test(norm)) return "section24";
  if (/incorporat/.test(norm)) return "incorporation";
  if (/portfolio|structur/.test(norm)) return "portfolio_structuring";
  if (/mtd|making.?tax/.test(norm)) return "mtd";
  return undefined;
}

// ── Per-lead context ──────────────────────────────────────────────────────────

/**
 * Build the per-lead message context. Async because it optionally reads
 * lead_enrichment (best-effort, never throws). Called by the submit route
 * (with state=null for step 0) and by the cron (with the state row).
 */
export async function buildLeadMessageContext(
  lead: NurtureLead,
  state?: LeadNurtureStateRow | null,
): Promise<LeadMessageContext> {
  const b = base();
  const confirmUrl = `${b}/api/leads/confirm/${mintLeadToken(lead.id, "confirm")}`;
  const optOutUrl = `${b}/api/leads/optout/${mintLeadToken(lead.id, "optout")}`;
  const bookingUrl = buildBookingUrl(lead, b);
  const detailsUrl = buildDetailsUrl(lead, b);
  // Which contact detail(s) the lead still owes us, and a natural phrase for the
  // copy. Recomputed from the live lead row on every send, so a partial completion
  // auto-narrows later detail-capture touches with no per-step branching.
  const missingFields = computeMissingContact(lead);
  const missingPhrase = missingPhraseFor(missingFields);
  // Did the capture surface even ASK for the missing field(s)? The "Ask a
  // specialist" widget stamps extras.capture_channel='assistant' and only takes
  // email + message, so those leads are "unasked" and the copy must own the gap
  // rather than imply the lead withheld it. Read lazily: only when something is
  // missing (contactability leads skip this query entirely). Best-effort.
  let contactUnasked = false;
  if (missingFields.length > 0) {
    try {
      const exRes = await adminSelect<{ extras: Record<string, unknown> | null }>("leads", {
        select: "extras",
        id: `eq.${lead.id}`,
        limit: "1",
      });
      contactUnasked = exRes.data[0]?.extras?.capture_channel === "assistant";
    } catch {
      // best-effort: default to the neutral framing
    }
  }

  // Parse guided-enquiry echoes from the stored message
  const parts = parseEnquiryEchoes(lead.message);
  let callGoalEcho = normaliseEcho(parts.callGoal);
  const promptedEcho = normaliseEcho(parts.prompted);

  // Enrich from lead_enrichment (best-effort, never blocks)
  let intentCategory: string | undefined;
  let qualityScore: number | undefined;
  try {
    const enrichRow = await adminSelect<{
      intent_category: string | null;
      quality_score: number | null;
    }>("lead_enrichment", {
      select: "intent_category,quality_score",
      lead_id: `eq.${lead.id}`,
      limit: "1",
    });
    if (enrichRow.data.length > 0) {
      intentCategory = enrichRow.data[0].intent_category ?? undefined;
      qualityScore = enrichRow.data[0].quality_score ?? undefined;
    }
  } catch {
    // best-effort: enrich failure is non-fatal
  }

  // If callGoalEcho is unusable, derive from intent category or role
  if (!callGoalEcho) {
    callGoalEcho = categoryPhrase(intentCategory, lead.role ?? undefined);
  }

  // Calculator context: keyed on intent category
  let calculatorName: string | undefined;
  let calculatorUrl: string | undefined;
  const calcKey = calcKeyFrom(intentCategory);
  if (calcKey) {
    const calc = CALC_MAP[calcKey];
    calculatorName = calc.name;
    calculatorUrl = `${b}${calc.path}`;
  }

  // Engagement-signal variant: one query for recent events + one for send count.
  // Best-effort: failure is non-fatal; the variant simply stays undefined.
  let engagementVariant: "hesitation" | "channel_shift" | undefined;
  try {
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const [eventsRes, sendsRes] = await Promise.all([
      adminSelect<EngagementEvent>("lead_contact_events", {
        // The column is `ts` (there is no created_at column). Alias it back to
        // created_at so decideEngagementVariant and its tests keep that field
        // name, and filter on the real column so the query no longer 400s (AN-1).
        select: "event_type,created_at:ts",
        lead_id: `eq.${lead.id}`,
        event_type: "in.(opened,clicked,booked)",
        ts: `gte.${fourteenDaysAgo}`,
      }),
      adminSelect<{ id: string }>("lead_nurture_sends", {
        select: "id",
        lead_id: `eq.${lead.id}`,
        channel: "eq.email",
        status: "eq.sent",
      }),
    ]);
    engagementVariant = decideEngagementVariant(eventsRes.data, sendsRes.data.length);
  } catch {
    // best-effort: engagement variant failure is non-fatal
  }

  return {
    firstName: firstNameOf(lead.full_name),
    bookingUrl,
    confirmUrl,
    optOutUrl,
    optOutText: OPT_OUT,
    topicLabel: (lead.role || "").trim() || undefined,
    siteUrl: b,
    callGoalEcho,
    promptedEcho: promptedEcho || undefined,
    intentCategory,
    qualityScore,
    calculatorName,
    calculatorUrl,
    bestSendHour: state?.best_send_hour ?? null,
    generatedCopy: state?.generated_copy ?? null,
    inSmsWindow: inSendWindow(Date.now(), true),
    variant: t0Variant(lead.id),
    engagementVariant,
    missingFields,
    missingPhrase,
    detailsUrl,
    contactUnasked,
  };
}

function buildBookingUrl(lead: NurtureLead, b: string): string {
  try {
    return `${b}/book?t=${encodeURIComponent(mintLeadToken(lead.id, "book"))}`;
  } catch {
    return `${b}/contact`;
  }
}

function buildDetailsUrl(lead: NurtureLead, b: string): string {
  try {
    return `${b}/complete?t=${encodeURIComponent(mintLeadToken(lead.id, "profile"))}`;
  } catch {
    return `${b}/contact`;
  }
}

// ── Message builders ──────────────────────────────────────────────────────────

/**
 * Standard service email via the shared template. Adds List-Unsubscribe headers
 * and appends the opt-out URL to the footer when ctx.optOutUrl is present.
 * Applies generatedCopy override for subject/preheader/paragraphs when stepKey
 * is provided and the generated copy is non-empty.
 */
function emailMsg(
  ctx: LeadMessageContext,
  subject: string,
  preheader: string,
  paragraphs: string[],
  stepKey?: string,
  opts?: {
    /** Override the primary CTA (default: book a time). Pass null for a reply-only email (no button/link). */
    cta?: { label: string; href: string } | null;
    /** Override the secondary one-tap link. Pass null to omit it entirely. */
    secondary?: { label: string; href: string } | null;
  },
): LeadStepMessage {
  const gen: GeneratedStepCopy | undefined =
    stepKey && ctx.generatedCopy?.[stepKey] ? ctx.generatedCopy[stepKey] : undefined;

  const finalSubject = gen?.subject?.trim() || subject;
  const finalPreheader = gen?.preheader?.trim() || preheader;
  const finalParagraphs =
    gen?.paragraphs && gen.paragraphs.length > 0 ? gen.paragraphs : paragraphs;

  // undefined => default booking CTA; null => no CTA at all (reply-only email).
  const cta =
    opts?.cta === undefined
      ? { label: "Pick a time for your review", href: ctx.bookingUrl }
      : opts.cta;
  // Default keeps the confirm link; opts.secondary === null omits it (reply-based
  // emails have nothing to confirm via a link).
  const secondary =
    opts?.secondary === undefined
      ? { label: "confirm you would like a call", href: ctx.confirmUrl }
      : opts.secondary;

  const { html, text } = renderLeadServiceEmail({
    preheader: finalPreheader,
    greeting: `Hi ${ctx.firstName},`,
    paragraphs: finalParagraphs,
    ...(cta ? { cta } : {}),
    ...(secondary ? { secondary } : {}),
    signoff: SIGNOFF,
    footerNote: FOOTER,
    ...(ctx.optOutUrl ? { optOutUrl: ctx.optOutUrl } : {}),
  });

  const headers = buildUnsubHeaders(ctx);
  return { channel: "email", subject: finalSubject, html, text, ...(headers ? { headers } : {}) };
}

function buildUnsubHeaders(
  ctx: LeadMessageContext,
): Record<string, string> | undefined {
  if (!ctx.optOutUrl) return undefined;
  return {
    "List-Unsubscribe": `<${ctx.optOutUrl}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

function smsMsg(body: string): LeadStepMessage {
  return { channel: "sms", body };
}

function smsMsgWithGen(
  ctx: LeadMessageContext,
  stepKey: string,
  staticBody: string,
): LeadStepMessage {
  const genBody = ctx.generatedCopy?.[stepKey]?.sms;
  return smsMsg(genBody?.trim() ? genBody : staticBody);
}

function whatsappTemplate(name: string, vars: string[]): LeadStepMessage {
  return { channel: "whatsapp", templateName: name, templateVars: vars };
}

// ── The sequence ──────────────────────────────────────────────────────────────
// 8 steps; step 0 = T0 email (instant, fires at submit), step 1 = T0 SMS
// (fires instantly if inside send window, else cron fires at next window open).
// Cumulative delay hours from step 0: 0, 0, 4, 24, 48, 96, 168, 264.

const STEPS: LeadNurtureStep[] = [
  // ── Step 0: T0 email ───────────────────────────────────────────────────────
  {
    key: "t0_email",
    delayHours: 0,
    channels: ["email"],
    buildMessages: (c) => [
      // Single standard first-touch email for everyone (the T0 A/B was retired).
      emailMsg(
        c,
        `Got your enquiry, ${c.firstName}. Here is what happens next.`,
        "A property tax specialist will call. Just reply to arrange a time.",
        [
          "Thanks for getting in touch. We have received your enquiry and a property tax specialist will be glad to help.",
          "The next step is a short call. There is no charge and no obligation, and it is genuinely useful even if you decide to do nothing afterwards. Just reply to this email with a day and time that suits you, and a specialist will call you then.",
          "Or if you would rather we simply called you, reply with the best number to reach you on and we will do the rest.",
        ],
        "t0_email",
        { cta: null, secondary: null },
      ),
    ],
  },

  // ── Step 1: T0 SMS + WhatsApp ──────────────────────────────────────────────
  {
    key: "t0_sms",
    delayHours: 0,
    channels: ["sms", "whatsapp"],
    buildMessages: (c) => [
      smsMsgWithGen(
        c,
        "t0_sms",
        `Hi ${c.firstName}, it's Property Tax Partners. Thanks for your enquiry about your property tax. Reply YES and one of our specialists will call you. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_welcome", [c.firstName, c.bookingUrl]),
    ],
  },

  // ── Step 2: VIP same-day SMS (quality score 5 only) ───────────────────────
  {
    key: "vip_sameday",
    delayHours: 4,
    channels: ["sms"],
    buildMessages: (c) => {
      if (c.qualityScore !== 5) return [];
      return [
        smsMsgWithGen(
          c,
          "vip_sameday",
          `Hi ${c.firstName}, Property Tax Partners again. Enquiries like yours are exactly what our senior specialists handle, so we have set aside time this week. Reply YES and a specialist will call you. ${c.optOutText}`,
        ),
      ];
    },
  },

  // ── Step 3: Day 1 SMS + WhatsApp ──────────────────────────────────────────
  {
    key: "day1_sms",
    delayHours: 20,
    channels: ["sms", "whatsapp"],
    buildMessages: (c) => [
      smsMsgWithGen(
        c,
        "day1_sms",
        `Hi ${c.firstName}, following up on your property tax enquiry. We have kept some specialist time free this week for a short call. Reply YES and we will call you. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_reminder", [c.firstName, c.bookingUrl]),
    ],
  },

  // ── Step 4: Day 2 give-value email ────────────────────────────────────────
  {
    key: "day2_give_email",
    delayHours: 24,
    channels: ["email"],
    buildMessages: (c) => [
      emailMsg(
        c,
        `Two things worth having to hand for your call, ${c.firstName}`,
        "A couple of things that make the call more useful.",
        [
          "While we line up your call, here are a couple of things that make these conversations more useful.",
          "First, so you can get the most from it, it helps to have a rough idea of your figures to hand: what the property or portfolio brings in, what it costs, and any mortgage interest. Nothing formal, the specialist works with whatever you have.",
          "Second, so you know what to expect, your review will cover: where you stand today, the options that realistically apply to someone in your position, and the one or two things worth doing next. No jargon, and nothing to prepare.",
          "Whenever you are ready, just reply with a day and time that suits and a specialist will call you.",
        ],
        "day2_give_email",
        { cta: null, secondary: null },
      ),
    ],
  },

  // ── Step 5: Day 4 SMS + WhatsApp ──────────────────────────────────────────
  // hesitation variant: swap the standard body for friction-reducing copy when
  // the lead clicked a booking link but has not booked (>= 24 h ago). The
  // smsMsgWithGen wrapper ensures generatedCopy still wins over either body.
  {
    key: "day4_sms",
    delayHours: 48,
    channels: ["sms", "whatsapp"],
    buildMessages: (c) => {
      const smsBody =
        c.engagementVariant === "hesitation"
          ? `Hi ${c.firstName}, Property Tax Partners here. A quick call is truly no-strings: if it does not help, you have lost 20 minutes and owe nothing. Just reply YES and a specialist will call you. Reply STOP to opt out.`
          : `Hi ${c.firstName}, Property Tax Partners here. Most landlords we speak to came to us with the same question you raised, and one short call usually clears up months of second-guessing. Reply YES and we will call you. ${c.optOutText}`;
      return [
        smsMsgWithGen(c, "day4_sms", smsBody),
        whatsappTemplate("lead_reminder", [c.firstName, c.bookingUrl]),
      ];
    },
  },

  // ── Step 6: Day 7 email (prefer Monday landing) ───────────────────────────
  // channel_shift variant: return SMS instead of email when 3+ emails were sent
  // with zero opens (deliverability concern). Declared channels updated to
  // ["email","sms"] so the scheduler hint stays accurate. generatedCopy is
  // bypassed for channel_shift (deliverability trumps personalisation).
  //
  // hesitation variant: swap paragraph 2 for friction-reducing copy. The
  // emailMsg wrapper means generatedCopy still wins over variant paragraphs
  // (normal override precedence), except for channel_shift (above).
  {
    key: "day7_email",
    delayHours: 72,
    channels: ["email", "sms"],
    preferMonday: true,
    buildMessages: (c) => {
      // channel_shift: deliverability trumps personalisation; return SMS instead.
      if (c.engagementVariant === "channel_shift") {
        return [
          smsMsg(
            `Hi ${c.firstName}, our emails may not be reaching you, so one text instead. Your free property tax review is still open. Reply YES and a specialist will call you. Reply STOP to opt out.`,
          ),
        ];
      }

      // hesitation variant: replace paragraph 2 with friction-reducing copy.
      const p2 =
        c.engagementVariant === "hesitation"
          ? `If something is holding you back, reply and tell us. There is no cost, no obligation, and no hard sell on the call, it is genuinely just a review of where you stand.`
          : `If a short call would help, just reply with a day and time that suits, or the best number to reach you on, and a specialist will call you. No forms, no fuss.`;

      return [
        emailMsg(
          c,
          `Still here whenever the timing is right, ${c.firstName}`,
          "No rush. One short conversation whenever it suits.",
          [
            "New week, so a quick and final-but-one note. Your free review is still open and there is no rush at all. If now is not the moment, that is completely fine.",
            p2,
          ],
          "day7_email",
          { cta: null, secondary: null },
        ),
      ];
    },
  },

  // ── Step 7: Break-up email ─────────────────────────────────────────────────
  {
    key: "breakup_day11",
    delayHours: 96,
    channels: ["email"],
    buildMessages: (c) => [
      emailMsg(
        c,
        `We'll leave it there for now, ${c.firstName}`,
        "The door stays open whenever you need us.",
        [
          "We have reached out a few times about your enquiry, so we will stop the reminders now and leave the ball in your court. No hard feelings at all.",
          "One parting thought that costs nothing: if your situation changes, the moments most worth a quick review are usually a new purchase, a sale, or the arrival of your Self Assessment bill. Whenever one of those lands, we are one message away and the review is still free.",
          "You can reply to this email any time and we will pick it straight back up. All the best with your property.",
        ],
        "breakup_day11",
        { cta: null, secondary: null },
      ),
    ],
  },
];

function buildContactabilityConfig(): LeadNurtureConfig {
  return {
    siteKey: "property",
    sequenceName: SEQUENCE_NAME,
    steps: STEPS,
    nextActionAt: (fromMs, nextStep, ctx) =>
      computeNextSendMs(fromMs, nextStep.delayHours, {
        bestSendHour: ctx.bestSendHour,
        hasSms: (nextStep.channels ?? []).some(
          (c) => c === "sms" || c === "whatsapp",
        ),
        preferMonday: nextStep.preferMonday,
      }),
    // Dispatch-time send-window guard (ENG-01 / M2). Scheduling already lands
    // steps inside the window via nextActionAt, but an OVERDUE step (a cron
    // backlog, or a pause/resume dumping the queue) could otherwise fire an SMS
    // at any hour of the night. For a step that sends on SMS/WhatsApp, if we are
    // outside the window at dispatch time, defer to the next window open. Email-
    // only steps carry no PECR hour restriction and dispatch anytime.
    dispatchGate: (step, nowMs) => {
      const hasSms = (step.channels ?? []).some(
        (c) => c === "sms" || c === "whatsapp",
      );
      if (!hasSms) return { ok: true };
      if (inSendWindow(nowMs, true)) return { ok: true };
      return {
        ok: false,
        retryAtMs: computeNextSendMs(nowMs, 0, {
          hasSms: true,
          preferMonday: step.preferMonday,
        }),
      };
    },
    // Sequence exhausted with no two-way response: the shared engine has just set
    // lead_nurture_state.status='unreachable'; also flip public.leads.status so
    // the funnel / console / digest stop reading 0 (INBOUND-3). Only downgrade
    // from an in-flight state, never from contactable/forwarded/converted/closed.
    onSequenceExhausted: async (leadId) => {
      try {
        await adminUpdate(
          "leads",
          { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
          { status: "unreachable" },
        );
      } catch (err) {
        console.error("[lead-nurture] mark lead unreachable failed", err);
      }
    },
  };
}

// ── Detail-capture sequence ────────────────────────────────────────────────────
// Email-only variant for leads that arrived missing a required contact field
// (name and/or phone). Each step asks for exactly what is missing, driven by
// ctx.missingPhrase (recomputed per send, so a partial completion auto-narrows
// later touches). No SMS steps: email is the universal prerequisite, and a
// phone-less SMS step would only self-skip and pollute the send dashboards.
// Graceful when nameless (the DEFAULT case here): greetings degrade to
// "Hi there," via firstNameOf, and no subject uses a "Thanks {name}," construction.

/** Safe missing-detail phrase for copy (never empty, even for a stray build). */
function detailAsk(c: LeadMessageContext): string {
  return c.missingPhrase && c.missingPhrase.trim() ? c.missingPhrase : "your details";
}

/**
 * Opening line. When contactUnasked (the capture form did not ask for the missing
 * field, e.g. the specialist widget), OWN the gap so the lead never feels blamed
 * for withholding something we never requested. Otherwise stay neutral.
 */
function detailIntro(c: LeadMessageContext): string {
  return c.contactUnasked
    ? "Thanks for reaching out through our site. Your message has landed with a property tax specialist who would be glad to help."
    : "Thanks for starting your enquiry. A property tax specialist would be glad to help.";
}

const DETAIL_CAPTURE_STEPS: LeadNurtureStep[] = [
  {
    key: "detail_capture_t0",
    delayHours: 0,
    channels: ["email"],
    buildMessages: (c) => {
      const ask = detailAsk(c);
      return [
        emailMsg(
          c,
          "Thanks for your message, one quick thing so we can help",
          `So a specialist can get back to you, could you share ${ask}?`,
          [
            detailIntro(c),
            `So we know who we are speaking to and can get back to you properly, just reply to this email with ${ask}. It takes a few seconds and there is nothing else to do.`,
            "Reply whenever it suits and a specialist will take it from there.",
          ],
          "detail_capture_t0",
          { cta: null, secondary: null },
        ),
      ];
    },
  },
  {
    key: "detail_capture_day1",
    delayHours: 24,
    channels: ["email"],
    buildMessages: (c) => {
      const ask = detailAsk(c);
      return [
        emailMsg(
          c,
          "Still happy to help with your property tax",
          "A specialist has time set aside this week.",
          [
            "Just following up on the message you sent us. A specialist has time set aside this week for a short call about your property tax, whenever suits you.",
            `The only thing we need to set it up is ${ask}, so we know who we are speaking to. Just reply to this email and a specialist will call you.`,
            "There is no cost and no obligation at any point.",
          ],
          "detail_capture_day1",
          { cta: null, secondary: null },
        ),
      ];
    },
  },
  {
    key: "detail_capture_day3",
    delayHours: 48,
    channels: ["email"],
    buildMessages: (c) => {
      const ask = detailAsk(c);
      return [
        emailMsg(
          c,
          "A minute now and a specialist can take it from there",
          `Reply with ${ask} and we will do the rest.`,
          [
            "Most people who ask us the kind of question you did get a genuinely useful answer from one short call.",
            `To set that up, we just need ${ask}. Just reply to this email and a specialist will pick it up from there.`,
            "If now is not the right time, that is completely fine. Reply whenever you are ready.",
          ],
          "detail_capture_day3",
          { cta: null, secondary: null },
        ),
      ];
    },
  },
  {
    key: "detail_capture_day7",
    delayHours: 168,
    channels: ["email"],
    preferMonday: true,
    buildMessages: (c) => {
      const ask = detailAsk(c);
      return [
        emailMsg(
          c,
          "We will leave it here for now",
          "The door stays open whenever the timing is right.",
          [
            "We have reached out a couple of times about your message, so we will leave it with you now.",
            `If you would still like that free review, just reply with ${ask} whenever it suits.`,
            "Whenever your situation changes, a new purchase, a sale, or a Self Assessment bill, we are one message away. All the best with your property.",
          ],
          "detail_capture_day7",
          { cta: null, secondary: null },
        ),
      ];
    },
  },
];

function buildDetailCaptureConfig(): LeadNurtureConfig {
  return {
    siteKey: "property",
    sequenceName: DETAIL_CAPTURE_SEQUENCE_NAME,
    steps: DETAIL_CAPTURE_STEPS,
    // Email-only, so no SMS window clamp is needed at scheduling or dispatch time.
    nextActionAt: (fromMs, nextStep, ctx) =>
      computeNextSendMs(fromMs, nextStep.delayHours, {
        bestSendHour: ctx.bestSendHour,
        hasSms: false,
        preferMonday: nextStep.preferMonday,
      }),
    // Phone-aware exhaustion: a lead with no usable phone is genuinely unreachable;
    // a lead that HAS a good phone (only a name was ever missing) is reachable, so
    // hand it to the standard contactability chase instead of marking it unreachable.
    onSequenceExhausted: async (leadId) => {
      try {
        const res = await adminSelect<{ full_name: string | null; phone: string | null }>(
          "leads",
          { select: "full_name,phone", id: `eq.${leadId}`, limit: "1" },
        );
        const row = res.data[0];
        const hasUsablePhone = row ? !computeMissingContact(row).includes("phone") : false;
        if (!hasUsablePhone) {
          await adminUpdate(
            "leads",
            { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
            { status: "unreachable" },
          );
        } else {
          // Reachable by phone: hand over to contactability. A direct state insert
          // (not enrollLead) avoids a circular import; the next cron tick fires it
          // from step 0. leads.status stays 'nurturing' (still in flight).
          await adminInsert(
            "lead_nurture_state",
            {
              lead_id: leadId,
              sequence: SEQUENCE_NAME,
              step: 0,
              status: "active",
              next_action_at: new Date().toISOString(),
            },
            { onConflict: "lead_id,sequence", ignoreDuplicates: true },
          );
        }
      } catch (err) {
        console.error("[lead-nurture] detail-capture exhaustion failed", err);
      }
    },
  };
}

/**
 * Build a Property lead-nurture config. Defaults to the contactability sequence
 * for back-compat with existing single-sequence callers.
 */
export function buildPropertyLeadNurtureConfig(
  variant: LeadSequenceVariant = "contactability",
): LeadNurtureConfig {
  return variant === "detail_capture"
    ? buildDetailCaptureConfig()
    : buildContactabilityConfig();
}

/** All primary sequences the cron must drive each tick, in priority order. */
export function buildPropertyLeadNurtureConfigs(): LeadNurtureConfig[] {
  return [buildContactabilityConfig(), buildDetailCaptureConfig()];
}

export const LEAD_SEQUENCE_NAME = SEQUENCE_NAME;
