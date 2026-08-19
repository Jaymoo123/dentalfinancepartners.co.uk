/**
 * Charities lead-nurture composition: the contactability sequence and
 * detail-capture sequence for Trustee Tax enquiries.
 *
 * SERVICE-ONLY (compliance): every message is a solicited, non-promotional
 * follow-up about the enquirer's OWN enquiry. No tax marketing content, no
 * advice, no figures. This keeps us inside the "rely on existing LIA,
 * service-only" posture and PECR's solicited-comms carve-out.
 *
 * Cadence: an instant email (step 0) fires synchronously at submit; an instant
 * SMS (step 1) fires at the same time if we are in the send window. Then 6
 * escalating follow-ups over approximately 11 days.
 *
 * Audience: UK charity trustees, treasurers, finance officers, charity CEOs
 * and CIC directors. Independent examination, Gift Aid, VAT, SORP accounts.
 *
 * House style: no em-dashes. British English. Faceless team voice.
 * No named individual, no credential claims, no sector cliches.
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
import { getSiteUrl } from "./niche-loader";
import { renderLeadServiceEmail } from "@/lib/emails/lead-service-template";
import { adminSelect, adminUpdate, adminInsert } from "@/lib/supabase/admin";
import { parseEnquiryEchoes, normaliseEcho } from "@/lib/leads/enquiry-message";
import { computeNextSendMs, inSendWindow } from "@/lib/leads/send-window";

const SEQUENCE_NAME = "charities_contactability";
const DETAIL_CAPTURE_SEQUENCE_NAME = "charities_detail_capture";

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

const COMPANY = "Trustee Tax";
const SIGNOFF = `Speak soon, the team at ${COMPANY}`;
const FOOTER =
  "You are receiving this because you submitted an enquiry on trusteetax.co.uk.";
const OPT_OUT = "Reply STOP to opt out.";

function base(): string {
  return getSiteUrl().replace(/\/$/, "");
}

// ponytail: the reference site keeps an empty CALC_MAP with no consumer, so the
// mechanism is omitted here rather than populated with charities' calculator
// slugs. Add it back when a booking flow actually reads calculatorUrl.

// ── Per-lead context ──────────────────────────────────────────────────────────

export async function buildLeadMessageContext(
  lead: NurtureLead,
  state?: LeadNurtureStateRow | null,
): Promise<LeadMessageContext> {
  const b = base();
  const confirmUrl = `${b}/api/leads/confirm/${mintLeadToken(lead.id, "confirm")}`;
  const optOutUrl = `${b}/api/leads/optout/${mintLeadToken(lead.id, "optout")}`;
  const bookingUrl = buildBookingUrl(lead, b);
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
  const callGoalEcho = normaliseEcho(parts.callGoal) || undefined;

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

  // No calculator context: nothing downstream reads it (see CALC_MAP note above).
  const calculatorName: string | undefined = undefined;
  const calculatorUrl: string | undefined = undefined;

  let engagementVariant: "hesitation" | "channel_shift" | undefined;
  try {
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const [eventsRes, sendsRes] = await Promise.all([
      adminSelect<{ event_type: string; created_at: string }>("lead_contact_events", {
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
    const clicked = eventsRes.data.find((e) => e.event_type === "clicked");
    const booked = eventsRes.data.find((e) => e.event_type === "booked");
    const opened = eventsRes.data.find((e) => e.event_type === "opened");
    const emailSendCount = sendsRes.data.length;

    if (clicked && !booked) {
      const clickedAt = new Date(clicked.created_at).getTime();
      if (!Number.isNaN(clickedAt) && Date.now() - clickedAt >= 24 * 60 * 60 * 1000) {
        engagementVariant = "hesitation";
      }
    } else if (emailSendCount >= 3 && !opened) {
      engagementVariant = "channel_shift";
    }
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
    promptedEcho: normaliseEcho(parts.prompted) || undefined,
    intentCategory,
    qualityScore,
    calculatorName,
    calculatorUrl,
    bestSendHour: state?.best_send_hour ?? null,
    generatedCopy: state?.generated_copy ?? null,
    inSmsWindow: inSendWindow(Date.now(), true),
    variant: undefined, // ponytail: no A/B split for charities; add when needed
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
    // /complete is the page that reads the profile token; /contact ignores it.
    return `${b}/complete?t=${encodeURIComponent(mintLeadToken(lead.id, "profile"))}`;
  } catch {
    return `${b}/contact`;
  }
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

  const cta =
    opts?.cta === undefined
      ? { label: "Get in touch", href: ctx.bookingUrl }
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

function buildUnsubHeaders(ctx: LeadMessageContext): Record<string, string> | undefined {
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
// 8 steps. Delays from step 0: 0, 0, 4, 24, 48, 96, 168, 264 hours.
// Steps 0+1 fire at submit. Steps 2-7 are driven by the hourly cron.

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
          "Thanks for your enquiry. It has just come through to us and a charity finance specialist is ready to help.",
          "The call is a free review of where your organisation stands, about 20 minutes, with no charge and no obligation.",
          "Just reply to this email, anything at all, and we will arrange your call. Even a one-word reply is fine. If a particular day or time suits you better, or you would rather we called around a trustee meeting, tell us and we will work to that.",
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
        `Hi ${c.firstName}, it's the team at Trustee Tax. Thanks for your enquiry. Reply YES and one of our specialists will call you. ${c.optOutText}`,
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
          `Hi ${c.firstName}, the team at Trustee Tax here. Enquiries like yours are exactly what our specialists handle, so we have kept time aside this week. Reply YES and one of them will call you. ${c.optOutText}`,
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
        `Hi ${c.firstName}, following up on your enquiry to Trustee Tax. We have specialist time free this week for a short call. Reply YES and we will call you. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_reminder", [c.firstName, c.bookingUrl]),
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
        `What trustees usually want to cover, ${c.firstName}`,
        "A short call tends to surface something worth knowing before your year end.",
        [
          "A quick note while your enquiry is with us. The questions trustees bring to these calls tend to cluster: whether this year's accounts need an independent examination or a full audit, whether Gift Aid has been claimed on everything it could be, and how much of the finance detail the board is expected to sign off personally.",
          "Those are the things a specialist would work through with you, against your own accounts rather than general rules, so you know where you stand before the year end rather than after it.",
          "Whenever suits, reply with a day and time and we will get a specialist to call you. If it is easier to fit around a trustee meeting, say so and we will work to that.",
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
          ? `Hi ${c.firstName}, the team at Trustee Tax here. A quick call is genuinely no-strings: if it does not help, you have lost 20 minutes and owe nothing. Just reply YES and a specialist will call you. Reply STOP to opt out.`
          : `Hi ${c.firstName}, the team at Trustee Tax here. Most trustees we speak to arrive with the question you raised, and one short call usually settles it. Reply YES and we will call you. ${c.optOutText}`;
      return [
        smsMsgWithGen(c, "day4_sms", smsBody),
        whatsappTemplate("lead_reminder", [c.firstName, c.bookingUrl]),
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
            `Hi ${c.firstName}, our emails may not be reaching you, so one text instead. Your free call with a charity finance specialist is still open. Reply YES and we will call you. Reply STOP to opt out.`,
          ),
        ];
      }

      return [
        emailMsg(
          c,
          `Still here when you are ready, ${c.firstName}`,
          "No rush at all. A one-line reply is all it takes.",
          [
            "Just checking in, and there is genuinely no rush. Your free review is still open, and if the timing is not right just now that is completely fine. We know plenty of these decisions wait for the next board meeting.",
            "If something is holding you back, or things have simply been busy, a one-line reply is all it takes. Tell us a day and time that works, or ask whatever is on your mind, and we will take it from there.",
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
          "This is our last note. We will stop the reminders here. No hard feelings at all, the timing has to be right.",
          "For what it is worth, the moments trustees tend to get the most out of a call are when the year end is coming round, when an independent examination or audit is being arranged, or when a Gift Aid claim has been sitting unclaimed longer than anyone meant. If one of those comes up, reply to this email whenever and we will pick it straight back up.",
          "All the best with the year ahead.",
        ],
        "breakup_day11",
        { cta: null, secondary: null },
      ),
    ],
  },
];

function buildContactabilityConfig(): LeadNurtureConfig {
  return {
    siteKey: "charities",
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
        console.error("[lead-nurture/charities] mark lead unreachable failed", err);
      }
    },
  };
}

// ── Detail-capture sequence ────────────────────────────────────────────────────
// Email-only. 4 steps at 0/24/48/168 hours. Collects missing name and/or phone
// before the lead can be forwarded to the specialist team.

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
            `Just reply to this email with ${ask} and a charity finance specialist will call you. It is free, there is no obligation, and there is nothing to prepare.`,
            "If it is easier, reply with anything at all. Even a one-word reply is fine. It confirms we can reach you and we will take it from there.",
          ],
          "detail_capture_t0",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, the team at Trustee Tax here."),
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
            ...detailGreeting(c, "Hi, the team at Trustee Tax here."),
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
          "Something worth knowing while your enquiry sits with us.",
          [
            "One quick note while your enquiry is with us. The thing trustees most often find out too late is which level of scrutiny this year's accounts need, independent examination or full audit. A specialist can look at your own figures and tell you where you sit. Knowing early makes the year end a great deal calmer.",
            `And if you would like a specialist to look at the whole picture with you, just reply with ${ask} and we will set up a free call.`,
          ],
          "detail_capture_day3",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, the team at Trustee Tax."),
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
            "We have sent a couple of messages now, so we will stop the reminders and leave it with you. No hard feelings at all.",
            `If you would still like a free review, just reply with ${ask}, whether that is next week or next year. The moments it tends to matter most are the run-up to a year end, arranging an independent examination, or a Gift Aid claim that has been waiting on someone.`,
            "All the best with the year ahead.",
          ],
          "detail_capture_day7",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, the team at Trustee Tax, one last time."),
          },
        ),
      ];
    },
  },
];

function buildDetailCaptureConfig(): LeadNurtureConfig {
  return {
    siteKey: "charities",
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
        console.error("[lead-nurture/charities] detail-capture exhaustion failed", err);
      }
    },
  };
}

export function buildCharitiesLeadNurtureConfig(
  variant: LeadSequenceVariant = "contactability",
): LeadNurtureConfig {
  return variant === "detail_capture"
    ? buildDetailCaptureConfig()
    : buildContactabilityConfig();
}

export function buildCharitiesLeadNurtureConfigs(): LeadNurtureConfig[] {
  return [buildContactabilityConfig(), buildDetailCaptureConfig()];
}

export const LEAD_SEQUENCE_NAME = SEQUENCE_NAME;
