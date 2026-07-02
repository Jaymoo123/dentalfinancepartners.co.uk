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
import { adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { parseEnquiryEchoes, normaliseEcho, categoryPhrase } from "@/lib/leads/enquiry-message";
import { computeNextSendMs, inSendWindow } from "@/lib/leads/send-window";

const SEQUENCE_NAME = "property_contactability";
const COMPANY = "Property Tax Partners";
const SIGNOFF = `Speak soon, the team at ${COMPANY}`;
const FOOTER =
  "You are receiving this because you submitted an enquiry on propertytaxpartners.co.uk. Reply to this email if you would prefer we did not contact you about it.";
const OPT_OUT = "Reply STOP to opt out.";

function base(): string {
  return getSiteUrl().replace(/\/$/, "");
}

// ── FNV-1a hash + variant bucket ─────────────────────────────────────────────

function fnv1a32(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

/**
 * Stable A/B bucket for the T0 experiment. Exported for offline analysis.
 * Uses FNV-1a hash of the lead UUID so retries always return the same variant.
 */
export function t0Variant(leadId: string): "t0_branded" | "t0_personal" {
  return fnv1a32(leadId) % 2 === 0 ? "t0_branded" : "t0_personal";
}

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
  };
}

function buildBookingUrl(lead: NurtureLead, b: string): string {
  try {
    return `${b}/book?t=${encodeURIComponent(mintLeadToken(lead.id, "book"))}`;
  } catch {
    return `${b}/contact`;
  }
}

// ── HTML escape (local copy, template's esc is not exported) ─────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
): LeadStepMessage {
  const gen: GeneratedStepCopy | undefined =
    stepKey && ctx.generatedCopy?.[stepKey] ? ctx.generatedCopy[stepKey] : undefined;

  const finalSubject = gen?.subject?.trim() || subject;
  const finalPreheader = gen?.preheader?.trim() || preheader;
  const finalParagraphs =
    gen?.paragraphs && gen.paragraphs.length > 0 ? gen.paragraphs : paragraphs;

  const optOutLine = ctx.optOutUrl
    ? `\n\nOr opt out of these follow-ups: ${ctx.optOutUrl}`
    : "";
  const footerNote = `${FOOTER}${optOutLine}`;

  const { html, text } = renderLeadServiceEmail({
    preheader: finalPreheader,
    greeting: `Hi ${ctx.firstName},`,
    paragraphs: finalParagraphs,
    cta: { label: "Pick a time for your review", href: ctx.bookingUrl },
    secondary: { label: "confirm you would like a call", href: ctx.confirmUrl },
    signoff: SIGNOFF,
    footerNote,
  });

  const headers = buildUnsubHeaders(ctx);
  return { channel: "email", subject: finalSubject, html, text, ...(headers ? { headers } : {}) };
}

/**
 * Minimal personal-style email for the t0_personal variant: plain <p> tags,
 * no CTA button (reply is the call to action). The booking URL appears as a
 * plain text link inside one of the paragraphs instead.
 */
function personalEmail(
  ctx: LeadMessageContext,
  subject: string,
  paragraphs: string[],
  stepKey?: string,
): LeadStepMessage {
  const gen: GeneratedStepCopy | undefined =
    stepKey && ctx.generatedCopy?.[stepKey] ? ctx.generatedCopy[stepKey] : undefined;

  const finalSubject = gen?.subject?.trim() || subject;
  const finalParagraphs =
    gen?.paragraphs && gen.paragraphs.length > 0 ? gen.paragraphs : paragraphs;

  const optOutLine = ctx.optOutUrl
    ? `\n\nOr opt out of these follow-ups: ${ctx.optOutUrl}`
    : "";
  const footerNote = `${FOOTER}${optOutLine}`;

  const paras = finalParagraphs
    .map((p) => `<p style="margin:0 0 14px;">${esc(p)}</p>`)
    .join("");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f6f7f8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7f8;padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:32px;">
<tr><td>
${paras}
<p style="margin:22px 0 0;">${esc(SIGNOFF)}</p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 12px;">
<p style="margin:0;font-size:12px;color:#64748b;">${esc(footerNote)}</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

  const text = [...finalParagraphs, "", SIGNOFF, "", footerNote].join("\n");

  const headers = buildUnsubHeaders(ctx);
  return {
    channel: "email",
    subject: finalSubject,
    html,
    text,
    ...(headers ? { headers } : {}),
  };
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
    buildMessages: (c) => {
      if (c.variant === "t0_personal") {
        // Plain person-shaped email: question-led, reply as CTA, no button.
        return [
          personalEmail(
            c,
            "Quick one about your enquiry",
            [
              `Hi ${c.firstName}, it is the team at Property Tax Partners. Your enquiry just came through.`,
              `Reading it back: you would like to ${c.callGoalEcho}. Have I got that right?`,
              `Reply and let me know, and we will get a call booked in with one of our property tax specialists. If it is easier, you can pick a time straight away here: ${c.bookingUrl}`,
              "Speak soon.",
            ],
            "t0_email",
          ),
        ];
      }
      // t0_branded (default): standard CTA email.
      return [
        emailMsg(
          c,
          `Got your enquiry, ${c.firstName}. Here is what happens next.`,
          "A property tax specialist will call. Pick a time that suits you.",
          [
            `Thanks for getting in touch. I have read what you sent us, and wanting to ${c.callGoalEcho} is exactly the kind of thing our property tax specialists work on every week, so you are in the right place.`,
            "The next step is a short call with a specialist. There is no charge and no obligation, and it is genuinely useful even if you decide to do nothing afterwards. The quickest way is to pick a time that suits you below. It takes under a minute and you will get a confirmation straight away.",
            "If it is easier, just reply to this email, or tap the confirm link and we will phone you.",
          ],
          "t0_email",
        ),
      ];
    },
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
        `Hi ${c.firstName}, it's Property Tax Partners. Thanks for your enquiry about your property tax. Two easy options: pick a time for your specialist call here ${c.bookingUrl}, or just reply YES and we'll ring you. ${c.optOutText}`,
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
          `Hi ${c.firstName}, Property Tax Partners again. Enquiries like yours are exactly what our senior specialists handle, so we have set aside time this week. Pick whichever slot suits: ${c.bookingUrl} or reply YES. ${c.optOutText}`,
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
        `Hi ${c.firstName}, following up on the property tax review you asked about. You said you'd like to ${c.callGoalEcho}, so we've kept some specialist time free this week for exactly that. Grab whichever slot suits: ${c.bookingUrl} ${c.optOutText}`,
      ),
      whatsappTemplate("lead_reminder", [c.firstName, c.bookingUrl]),
    ],
  },

  // ── Step 4: Day 2 give-value email ────────────────────────────────────────
  {
    key: "day2_give_email",
    delayHours: 24,
    channels: ["email"],
    buildMessages: (c) => {
      const calcPara =
        c.calculatorName && c.calculatorUrl
          ? `First, if it helps to see rough numbers for yourself, our ${c.calculatorName} lets you plug in your own figures in a few minutes: ${c.calculatorUrl}. It is a starting point, not advice, but it usually sharpens the questions worth asking.`
          : `First, so you can get the most from it, it helps to have a rough idea of your figures to hand: what the property or portfolio brings in, what it costs, and any mortgage interest. Nothing formal, the specialist works with whatever you have.`;
      return [
        emailMsg(
          c,
          `Two things worth having to hand for your call, ${c.firstName}`,
          "A quick way to see your own numbers before we speak.",
          [
            "While you decide on a time, here are a couple of things that make these calls more useful.",
            calcPara,
            "Second, so you know what to expect, your review will cover: where you stand today, the options that realistically apply to someone in your position, and the one or two things worth doing next. No jargon, and nothing to prepare.",
          ],
          "day2_give_email",
        ),
      ];
    },
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
          ? `Hi ${c.firstName}, Property Tax Partners here. Picking a time is quick and truly no-strings: if the call does not help, you have lost 20 minutes and owe nothing. Slots here: ${c.bookingUrl} or reply YES. Reply STOP to opt out.`
          : `Hi ${c.firstName}, Property Tax Partners here. Most landlords we speak to came to us with the same question you raised, and one short call usually clears up months of second-guessing. Happy to do the same for you: ${c.bookingUrl} or reply YES. ${c.optOutText}`;
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
            `Hi ${c.firstName}, our emails may not be reaching you, so one text instead. Your free property tax review is still open: ${c.bookingUrl} or reply YES. Reply STOP to opt out.`,
          ),
        ];
      }

      // hesitation variant: replace paragraph 2 with friction-reducing copy.
      const p2 =
        c.engagementVariant === "hesitation"
          ? `If something is holding you back, reply and tell us. There is no cost, no obligation, and no hard sell on the call, it is genuinely just a review of where you stand.`
          : `If a short call would help you ${c.callGoalEcho}, it is one decision and a minute to book. And if you would rather we call you, just reply to this email with a good time.`;

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
          "Your booking link stays live below. All the best with your property.",
        ],
        "breakup_day11",
      ),
    ],
  },
];

export function buildPropertyLeadNurtureConfig(): LeadNurtureConfig {
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

export const LEAD_SEQUENCE_NAME = SEQUENCE_NAME;
