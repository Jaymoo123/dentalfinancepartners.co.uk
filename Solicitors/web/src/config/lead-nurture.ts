/**
 * Solicitors (Accounts for Lawyers) lead-nurture composition: the contactability
 * sequence + per-lead message context. This is the ONLY place Solicitors copy
 * and identity for the lead follow-up lives; the shared engine
 * (packages/web-shared/lead-nurture) is content-agnostic.
 *
 * SERVICE-ONLY (compliance): every message is a solicited, non-promotional
 * follow-up about the enquirer's OWN enquiry (arrange the review, confirm,
 * gentle persistence, break-up). No marketing content. This keeps us inside
 * the "rely on existing LIA, service-only" posture and PECR's solicited-comms
 * carve-out.
 *
 * Cadence: an instant email (step 0) fires synchronously at submit; an instant
 * SMS (step 1) fires at the same time if we are in the send window. Then 6
 * escalating follow-ups over about 11 days. Any two-way response (reply /
 * confirm) halts the chase and flips the lead to contactable.
 *
 * Delays from step 0: 0h, 0h, 4h, 24h, 48h, 96h, 168h, 264h (contactability).
 * Detail-capture delays: 0h, 24h, 48h, 168h.
 *
 * House style: no em-dashes. British English. Faceless team voice.
 * No named individual, no credential claims.
 */

import type {
  LeadMessageContext,
  LeadNurtureConfig,
  LeadNurtureStep,
  LeadStepMessage,
  LeadNurtureStateRow,
  NurtureLead,
  GeneratedStepCopy,
} from "@accounting-network/web-shared/lead-nurture/config";
import { firstNameOf } from "@accounting-network/web-shared/lead-nurture/config";
import {
  computeMissingContact,
  type MissingContactField,
} from "@accounting-network/web-shared/lead-nurture/lead-nurture-shared";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { t0Variant } from "@accounting-network/web-shared/lead-nurture/t0";
import { getSiteUrl } from "./niche-loader";
import { renderLeadServiceEmail } from "@/lib/emails/lead-service-template";
import { adminSelect, adminUpdate, adminInsert } from "@/lib/supabase/admin";
import { parseEnquiryEchoes, normaliseEcho, categoryPhrase } from "@/lib/leads/enquiry-message";
import { computeNextSendMs, inSendWindow } from "@/lib/leads/send-window";

export { t0Variant };

const SEQUENCE_NAME = "solicitors_contactability";
const DETAIL_CAPTURE_SEQUENCE_NAME = "solicitors_detail_capture";

export type LeadSequenceVariant = "contactability" | "detail_capture";
export const LEAD_SEQUENCE_NAMES = {
  contactability: SEQUENCE_NAME,
  detail_capture: DETAIL_CAPTURE_SEQUENCE_NAME,
} as const;

export function routePrimarySequence(lead: {
  full_name?: string | null;
  phone?: string | null;
}): string {
  return computeMissingContact(lead).length > 0
    ? DETAIL_CAPTURE_SEQUENCE_NAME
    : SEQUENCE_NAME;
}

export function missingPhraseFor(missing: MissingContactField[]): string {
  const hasName = missing.includes("name");
  const hasPhone = missing.includes("phone");
  if (hasName && hasPhone) return "your name and a phone number";
  if (hasPhone) return "a phone number we can reach you on";
  if (hasName) return "your name";
  return "";
}

export function ctaLabelFor(missing: MissingContactField[] | undefined): string {
  const m = missing ?? [];
  const hasName = m.includes("name");
  const hasPhone = m.includes("phone");
  if (hasName && hasPhone) return "Add your details";
  if (hasPhone) return "Add your number";
  if (hasName) return "Add your name";
  return "Add your details";
}

const COMPANY = "Accounts for Lawyers";
const SIGNOFF = `Speak soon, the team at ${COMPANY}`;
const FOOTER =
  "You are receiving this because you submitted an enquiry on accountsforlawyers.co.uk.";
const OPT_OUT = "Reply STOP to opt out.";

// ponytail: CALC_MAP empty; Solicitors tools live at /tools/[slug] but none map
// directly to a single intent category the way Property's section24/incorporation do.
// Add entries as usage data shows a category driving meaningful click-through.
const CALC_MAP: Record<string, { name: string; path: string }> = {};

function base(): string {
  return getSiteUrl().replace(/\/$/, "");
}

function buildConfirmUrl(lead: NurtureLead, b: string): string {
  try {
    return `${b}/api/leads/confirm/${mintLeadToken(lead.id, "confirm")}`;
  } catch {
    return `${b}/contact`;
  }
}

function buildOptOutUrl(lead: NurtureLead, b: string): string {
  try {
    return `${b}/api/leads/optout/${mintLeadToken(lead.id, "optout")}`;
  } catch {
    return "";
  }
}

function buildDetailsUrl(lead: NurtureLead, b: string): string {
  try {
    return `${b}/complete?t=${encodeURIComponent(mintLeadToken(lead.id, "profile"))}`;
  } catch {
    return `${b}/contact`;
  }
}

// ── Engagement-variant decision ───────────────────────────────────────────────

export interface EngagementEvent {
  event_type: string;
  created_at: string;
}

export function decideEngagementVariant(
  events: EngagementEvent[],
  emailSendCount: number,
): "hesitation" | "channel_shift" | undefined {
  const now = Date.now();
  const TWENTY_FOUR_H_MS = 24 * 60 * 60 * 1000;

  const clicked = events.find((e) => e.event_type === "clicked");
  const booked = events.find((e) => e.event_type === "booked");
  const opened = events.find((e) => e.event_type === "opened");

  if (clicked && !booked) {
    const clickedAt = new Date(clicked.created_at).getTime();
    if (!Number.isNaN(clickedAt) && now - clickedAt >= TWENTY_FOUR_H_MS) {
      return "hesitation";
    }
  }

  if (emailSendCount >= 3 && !opened) {
    return "channel_shift";
  }

  return undefined;
}

// ── Per-lead context ──────────────────────────────────────────────────────────

export async function buildLeadMessageContext(
  lead: NurtureLead,
  state?: LeadNurtureStateRow | null,
): Promise<LeadMessageContext> {
  const b = base();
  const confirmUrl = buildConfirmUrl(lead, b);
  const optOutUrl = buildOptOutUrl(lead, b);
  // Solicitors has no /book flow: confirmUrl serves as the booking URL placeholder.
  // ponytail: phase-2, wire a proper booking page if one is added.
  const bookingUrl = confirmUrl;
  const detailsUrl = buildDetailsUrl(lead, b);

  const missingFields = computeMissingContact(lead);
  const missingPhrase = missingPhraseFor(missingFields);

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
      // best-effort
    }
  }

  const parts = parseEnquiryEchoes(lead.message);
  let callGoalEcho = normaliseEcho(parts.callGoal);
  const promptedEcho = normaliseEcho(parts.prompted);

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
    // best-effort
  }

  if (!callGoalEcho) {
    callGoalEcho = categoryPhrase(intentCategory, lead.role ?? undefined);
  }

  // ponytail: CALC_MAP is empty for now; calculatorName/calculatorUrl stay undefined.
  let calculatorName: string | undefined;
  let calculatorUrl: string | undefined;
  if (intentCategory && CALC_MAP[intentCategory]) {
    const calc = CALC_MAP[intentCategory];
    calculatorName = calc.name;
    calculatorUrl = `${b}${calc.path}`;
  }

  let engagementVariant: "hesitation" | "channel_shift" | undefined;
  try {
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const [eventsRes, sendsRes] = await Promise.all([
      adminSelect<EngagementEvent>("lead_contact_events", {
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
    // best-effort
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

// ── Message builders ──────────────────────────────────────────────────────────

function emailMsg(
  ctx: LeadMessageContext,
  subject: string,
  preheader: string,
  paragraphs: string[],
  stepKey?: string,
  opts?: {
    cta?: { label: string; href: string } | null;
    secondary?: { label: string; href: string } | null;
    greeting?: string;
  },
): LeadStepMessage {
  const gen: GeneratedStepCopy | undefined =
    stepKey && ctx.generatedCopy?.[stepKey] ? ctx.generatedCopy[stepKey] : undefined;

  const finalSubject = gen?.subject?.trim() || subject;
  const finalPreheader = gen?.preheader?.trim() || preheader;
  const finalParagraphs =
    gen?.paragraphs && gen.paragraphs.length > 0 ? gen.paragraphs : paragraphs;

  // Solicitors has no /book flow: CTA defaults to confirm link (reply-only style).
  const cta =
    opts?.cta === undefined
      ? null
      : opts.cta;
  const secondary =
    opts?.secondary === undefined
      ? { label: "confirm you would like a call", href: ctx.confirmUrl }
      : opts.secondary;

  const { html, text } = renderLeadServiceEmail({
    preheader: finalPreheader,
    greeting: opts?.greeting ?? `Hi ${ctx.firstName},`,
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

// ── Contactability sequence ───────────────────────────────────────────────────
// 8 steps; step 0 = T0 email (instant, fires at submit), step 1 = T0 SMS
// (fires unconditionally at submit; the hourly cron dispatchGate keeps actual
// delivery inside the UK window).
// Cumulative delay hours from step 0: 0, 0, 4, 24, 48, 96, 168, 264.

const STEPS: LeadNurtureStep[] = [
  // ── Step 0: T0 email ───────────────────────────────────────────────────────
  {
    key: "t0_email",
    delayHours: 0,
    channels: ["email"],
    buildMessages: (c) => [
      emailMsg(
        c,
        `Got your enquiry, ${c.firstName}`,
        "Just reply with a time that suits and a specialist will call you.",
        [
          "Thanks for your enquiry, it has just landed with us and a specialist is ready to help.",
          "The call is a free review of where your firm stands on its accounts and tax, about 20 minutes, with no charge and no obligation.",
          "Just reply to this email, anything at all, and we will arrange your call. Even a one-word reply is fine. If a particular day or time suits you, tell us and we will work around it.",
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
        `Hi ${c.firstName}, it's Accounts for Lawyers. Thanks for your enquiry. Reply YES and one of our specialists will call you to discuss your firm's accounts. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_welcome", [c.firstName, c.confirmUrl]),
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
          `Hi ${c.firstName}, Accounts for Lawyers again. Enquiries like yours are exactly what our specialists handle, so we have set aside time this week. Reply YES and a specialist will call you. ${c.optOutText}`,
        ),
      ];
    },
  },

  // ── Step 3: Day 1 SMS + WhatsApp ──────────────────────────────────────────
  {
    key: "day1_sms",
    delayHours: 24,
    channels: ["sms", "whatsapp"],
    buildMessages: (c) => [
      smsMsgWithGen(
        c,
        "day1_sms",
        `Hi ${c.firstName}, following up on your law firm accounts enquiry. We have kept some specialist time free this week for a short call. Reply YES and we will call you. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_reminder", [c.firstName, c.confirmUrl]),
    ],
  },

  // ── Step 4: Day 2 give-value email ────────────────────────────────────────
  {
    key: "day2_give_email",
    delayHours: 48,
    channels: ["email"],
    buildMessages: (c) => [
      emailMsg(
        c,
        `One thing law firms often overlook, ${c.firstName}`,
        "Partners and LLP members have different tax obligations, and a short call often surfaces the gaps.",
        [
          "A quick pointer while your enquiry is with us. Most law firm partners do not realise that LLP member drawings, profit allocations and personal tax reserves need careful planning from the first year, and the cost of getting it wrong compounds quickly.",
          "If that is relevant to your situation, it is exactly the kind of thing a short call with our specialists would cover.",
          "Whenever suits you, just reply with a day and time and we will arrange it.",
        ],
        "day2_give_email",
        { cta: null, secondary: null },
      ),
    ],
  },

  // ── Step 5: Day 4 SMS + WhatsApp ──────────────────────────────────────────
  {
    key: "day4_sms",
    delayHours: 96,
    channels: ["sms", "whatsapp"],
    buildMessages: (c) => {
      const smsBody =
        c.engagementVariant === "hesitation"
          ? `Hi ${c.firstName}, Accounts for Lawyers here. A quick call is truly no-strings: if it does not help, you have lost 20 minutes and owe nothing. Just reply YES and a specialist will call you. Reply STOP to opt out.`
          : `Hi ${c.firstName}, Accounts for Lawyers here. Most firms we speak to came to us with the same question you raised, and one short call usually clears up months of uncertainty. Reply YES and we will call you. ${c.optOutText}`;
      return [
        smsMsgWithGen(c, "day4_sms", smsBody),
        whatsappTemplate("lead_reminder", [c.firstName, c.confirmUrl]),
      ];
    },
  },

  // ── Step 6: Day 7 email (prefer Monday landing) ───────────────────────────
  {
    key: "day7_email",
    delayHours: 168,
    channels: ["email", "sms"],
    preferMonday: true,
    buildMessages: (c) => {
      if (c.engagementVariant === "channel_shift") {
        return [
          smsMsg(
            `Hi ${c.firstName}, our emails may not be reaching you, so one text instead. Your free law firm accounts review is still open. Reply YES and a specialist will call you. Reply STOP to opt out.`,
          ),
        ];
      }

      return [
        emailMsg(
          c,
          `Still here when you are, ${c.firstName}`,
          "No rush at all. A one-line reply is all it takes.",
          [
            "Just checking in, and there is genuinely no rush. Your free review is still available, and if now is not the right moment, that is completely fine.",
            "If something is holding you back, or things have just been busy at the firm, a one-line reply is all it takes. Tell us a day and a time, or ask whatever is on your mind, and we will take it from there.",
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
    delayHours: 264,
    channels: ["email"],
    buildMessages: (c) => [
      emailMsg(
        c,
        `Last one from us, ${c.firstName}`,
        "Stopping the reminders now. The door stays open whenever you need it.",
        [
          "This is our last note, we will stop the reminders here. No hard feelings at all, the timing has to be right.",
          "For what it is worth, the moments a review really earns its keep are when a firm is restructuring, taking on a new partner, or facing a compliance deadline. If one of those lands, reply to this email, even months from now, and we will pick it straight back up.",
          "All the best with the firm.",
        ],
        "breakup_day11",
        { cta: null, secondary: null },
      ),
    ],
  },
];

function buildContactabilityConfig(): LeadNurtureConfig {
  return {
    siteKey: "solicitors",
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
// Email-only variant for leads that arrived missing a required contact field.
// Delays from step 0: 0h, 24h, 48h, 168h.

function detailAsk(c: LeadMessageContext): string {
  return c.missingPhrase && c.missingPhrase.trim() ? c.missingPhrase : "your details";
}

function detailGreeting(c: LeadMessageContext, namelessLine: string): { greeting?: string } {
  return c.missingFields?.includes("name") ? { greeting: namelessLine } : {};
}

function detailIntro(c: LeadMessageContext): string {
  const ask = detailAsk(c);
  return c.contactUnasked
    ? `Thanks for your message. The form you used did not ask for ${ask}, so we have no way to call you back yet.`
    : `Thanks for your message. To set up your call, we just need ${ask}.`;
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
          "Got your message, one quick thing",
          `Reply with ${ask} and a specialist will call you.`,
          [
            detailIntro(c),
            `Just reply to this email with ${ask} and we will have one of our law firm accounts specialists call you. It is free, there is no obligation, and there is nothing to prepare.`,
            "If it is easier, reply with anything at all. Even a one-word reply is fine. It confirms we can reach you and we will take it from there.",
          ],
          "detail_capture_t0",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, the team at Accounts for Lawyers here."),
          },
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
          "Still happy to help",
          `Reply with ${ask} and we will sort the rest.`,
          [
            "A quick nudge on the message you sent us yesterday. We would still like to get a specialist on the phone to you this week.",
            `All we need is ${ask}. Just reply to this email and we will sort the rest. No cost and no obligation at any point.`,
          ],
          "detail_capture_day1",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, the team at Accounts for Lawyers here again."),
          },
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
          "One pointer while you decide",
          "Something law firm partners often miss, and a free call if you want one.",
          [
            "One quick pointer while your enquiry sits with us. Partners and LLP members frequently underestimate their personal tax reserve in the first year of a new structure. An underpayment in year one can turn into a January cashflow problem that catches firms off guard.",
            `And if you would like a specialist to look at the full picture for your firm, just reply with ${ask} and we will set up a free call.`,
          ],
          "detail_capture_day3",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, the team at Accounts for Lawyers here."),
          },
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
          "We will leave it with you",
          "No more reminders. Reply any time and we will pick it straight up.",
          [
            "We have asked a couple of times now, so we will stop the reminders and leave it with you. No hard feelings at all.",
            `If you would still like a free review of your firm's accounts and tax position, just reply with ${ask}, whether that is next week or next year. The moments it tends to matter most are a new partner joining, a practice restructure, or an SRA compliance deadline.`,
            "All the best with the firm.",
          ],
          "detail_capture_day7",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, one last message from the team at Accounts for Lawyers."),
          },
        ),
      ];
    },
  },
];

function buildDetailCaptureConfig(): LeadNurtureConfig {
  return {
    siteKey: "solicitors",
    sequenceName: DETAIL_CAPTURE_SEQUENCE_NAME,
    steps: DETAIL_CAPTURE_STEPS,
    nextActionAt: (fromMs, nextStep, ctx) =>
      computeNextSendMs(fromMs, nextStep.delayHours, {
        bestSendHour: ctx.bestSendHour,
        hasSms: false,
        preferMonday: nextStep.preferMonday,
      }),
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

export function buildSolicitorsLeadNurtureConfig(
  variant: LeadSequenceVariant = "contactability",
): LeadNurtureConfig {
  return variant === "detail_capture"
    ? buildDetailCaptureConfig()
    : buildContactabilityConfig();
}

export function buildSolicitorsLeadNurtureConfigs(): LeadNurtureConfig[] {
  return [buildContactabilityConfig(), buildDetailCaptureConfig()];
}

export const LEAD_SEQUENCE_NAME = SEQUENCE_NAME;
