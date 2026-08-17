/**
 * divorce-finances lead-nurture composition: the contactability sequence and
 * detail-capture sequence for divorce/separation finance enquiries.
 *
 * SERVICE-ONLY (compliance): every message is a solicited, non-promotional
 * follow-up about the enquirer's OWN enquiry. No marketing content.
 *
 * Audience: people starting a divorce or separation, people negotiating a
 * financial settlement, people working out pensions on divorce, and people
 * working out tax on divorce. Copy is role-adapted via the lead's role.
 *
 * PARTNER-FIRM FRAMING (compliance, LEAD_REGULATORY_POSITION_2026-07-24):
 * advice comes from "the partner firm we introduce you to", a vetted,
 * SRA-regulated family law firm. Never "our solicitors". The fee disclosure
 * ("we may receive a fee from the firm we introduce you to") appears in the
 * step-0 email, the first message that pitches the introduction.
 *
 * Cadence: an instant email (step 0) fires synchronously at submit. Then
 * 7 escalating follow-ups over approximately 11 days.
 * Cumulative delay hours from step 0: 0, 0, 4, 24, 48, 96, 168, 264.
 *
 * House style: no em-dashes. British English. Faceless team voice (no named
 * individual). No credential claims. Never legal advice: value-give messages
 * point at our free calculators (/calculators/divorce-cost-calculator,
 * /calculators/help-with-fees-checker, /calculators/settlement-range-estimator,
 * /calculators/consent-order-cost-calculator) and the pension-sharing and
 * capital-gains-tax-divorce pillars. Money facts match the site's ground
 * truth (divorce application fee £628 and consent order fee £62 from
 * 13 July 2026, SI 2026/642; CGT no gain no loss window to the end of the
 * third tax year after the tax year of separation, unlimited under a formal
 * agreement or court order).
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
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { getSiteUrl, niche } from "./niche-loader";
import { renderLeadServiceEmail } from "@/lib/emails/lead-service-template";
import { adminSelect, adminUpdate, adminInsert } from "@/lib/supabase/admin";
import { parseEnquiryEchoes, normaliseEcho } from "@/lib/leads/enquiry-message";
import { computeNextSendMs, inSendWindow } from "@/lib/leads/send-window";

const SEQUENCE_NAME = "divorce_contactability";
const DETAIL_CAPTURE_SEQUENCE_NAME = "divorce_detail_capture";

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

const COMPANY = niche.display_name;
const SIGNOFF = `Best wishes, the team at ${COMPANY}`;
const FOOTER = `You are receiving this because you submitted an enquiry on ${niche.domain}.`;
const OPT_OUT = "Reply STOP to opt out.";

function base(): string {
  return getSiteUrl().replace(/\/$/, "");
}

// ── Role adaptation ───────────────────────────────────────────────────────────
// Lead form role values: starting-divorce | negotiating-settlement |
// pension-questions | tax-questions | other. topicLabel carries the raw value.

type DivorceRole = "starting" | "settlement" | "pension" | "tax" | "other";

export function divorceRoleOf(ctx: Pick<LeadMessageContext, "topicLabel">): DivorceRole {
  const r = (ctx.topicLabel ?? "").toLowerCase();
  if (r.includes("starting")) return "starting";
  if (r.includes("settlement")) return "settlement";
  if (r.includes("pension")) return "pension";
  if (r.includes("tax")) return "tax";
  return "other";
}

/** One-line description of what the free call covers, per role. */
function callScopeLine(role: DivorceRole): string {
  switch (role) {
    case "starting":
      return "Whether it is what the whole process is likely to cost, how the £628 court fee works and whether Help with Fees could reduce it, or what order to do things in, we cover all of it.";
    case "settlement":
      return "Whether it is what a fair split looks like for your circumstances, how Form E financial disclosure works, or how to make an agreement legally binding with a consent order, we cover all of it.";
    case "pension":
      return "Whether it is how pension sharing works, what a pension sharing order involves, or how the pensions weigh against the house in a settlement, we cover all of it.";
    case "tax":
      return "Whether it is capital gains tax on transferring the house or investments, how long the no gain no loss window after separation runs, or what a buyout means for tax, we cover all of it.";
    default:
      return "Whatever the question, from settlements and consent orders to pensions and tax on divorce, we cover all of it.";
  }
}

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
  const callGoalEcho = normaliseEcho(parts.callGoal);

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
    intentCategory: undefined,
    qualityScore: undefined,
    calculatorName: undefined,
    calculatorUrl: undefined,
    bestSendHour: state?.best_send_hour ?? null,
    generatedCopy: state?.generated_copy ?? null,
    inSmsWindow: inSendWindow(Date.now(), true),
    variant: undefined,
    engagementVariant: undefined,
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

// ── The contactability sequence ───────────────────────────────────────────────
// 8 steps. Cumulative delay hours from step 0: 0, 0, 4, 24, 48, 96, 168, 264.
// Themes: cost of divorce and the £628 fee, settlement ranges and Form E,
// consent orders and the £62 fee, pension sharing, the CGT window after
// separation. Service-only follow-up. Faceless team voice. Partner-firm
// framing for advice. Never legal advice from us.

const STEPS: LeadNurtureStep[] = [
  // ── Step 0: T0 email ───────────────────────────────────────────────────────
  {
    key: "t0_email",
    delayHours: 0,
    channels: ["email"],
    buildMessages: (c) => {
      const role = divorceRoleOf(c);
      return [
        emailMsg(
          c,
          `Got your enquiry, ${c.firstName}`,
          "Just reply with a time that suits and we will arrange your free call.",
          [
            "Thanks for your enquiry, it has just come through to us and we are ready to help.",
            `The call is a free conversation about your situation, around 20 minutes, with no charge and no obligation. ${callScopeLine(role)}`,
            "Where formal legal advice is needed, we will tell you plainly and point you to the right kind of regulated professional.",
            "Just reply to this email, anything at all, and we will arrange your call. Even a one-word reply is fine. If a particular day or time suits you better, let us know and we will work around it.",
          ],
          "t0_email",
          { cta: null, secondary: null },
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
        `Hi ${c.firstName}, this is ${COMPANY}. Thanks for your enquiry. Reply YES and we will arrange your free call about the money side of your divorce or separation. ${c.optOutText}`,
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
          `Hi ${c.firstName}, ${COMPANY} again. Situations like yours are exactly what the specialists we work with handle every day, so we have set time aside this week. Reply YES and we will arrange your call. ${c.optOutText}`,
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
        `Hi ${c.firstName}, following up on your divorce finances enquiry. We have kept some time free this week for a short call. Reply YES and we will arrange it. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_reminder", [c.firstName, c.bookingUrl]),
    ],
  },

  // ── Step 4: Day 2 give-value email (role-adapted, calculators + pillars) ──
  {
    key: "day2_give_email",
    delayHours: 48,
    channels: ["email"],
    buildMessages: (c) => {
      const b = c.siteUrl;
      const role = divorceRoleOf(c);
      let subject = `Something useful while you decide, ${c.firstName}`;
      let paragraphs: string[];
      switch (role) {
        case "starting":
          subject = `The real cost picture before you start, ${c.firstName}`;
          paragraphs = [
            "A quick pointer while your enquiry is with us. The two questions people ask most at the start are what the whole thing is likely to cost and whether the £628 court fee can be reduced. We built two free tools that answer exactly those questions in a few minutes.",
            `You can get a realistic cost range for your route at ${b}/calculators/divorce-cost-calculator, and check whether your income and savings would take some or all of the £628 off under Help with Fees at ${b}/calculators/help-with-fees-checker. Both are free and neither asks for any contact details.`,
            "And if you would rather talk it through, the free call is still open. Just reply with a day and time and we will arrange it.",
          ];
          break;
        case "settlement":
          subject = `What a fair split actually looks like, ${c.firstName}`;
          paragraphs = [
            "A quick pointer while your enquiry is with us. Before any negotiation it helps to know the range a court would consider fair for a marriage of your length, your assets and the earnings gap. Our free tool at " +
              `${b}/calculators/settlement-range-estimator gives you that starting point in a couple of minutes, with no contact details asked for.`,
            "One thing worth knowing early: an agreement between the two of you is not legally binding until a court seals it in a consent order. The court fee is £62, and our calculator at " +
              `${b}/calculators/consent-order-cost-calculator shows what the drafting typically adds. Without one, either of you can still bring a financial claim years after the final order.`,
            "That is exactly the kind of thing the free call can walk through for your own situation. Whenever suits, just reply with a day and time and we will arrange it.",
          ];
          break;
        case "pension":
          subject = `The asset most often left on the table, ${c.firstName}`;
          paragraphs = [
            "A quick pointer while your enquiry is with us. After the house, pensions are usually the biggest asset in a divorce, and the one most often left unclaimed. A pension sharing order moves a percentage of one pension into the other person's own name, but it only exists if it is written into a court order. It cannot be agreed informally.",
            `We keep a plain-English guide to how sharing, offsetting and attachment compare, and which transfer value figure to ask each scheme for, at ${b}/pension-sharing. It is free and asks for no contact details.`,
            "And if you would rather talk it through, the free call is still open. Just reply with a day and time and we will arrange it.",
          ];
          break;
        case "tax":
          subject = `The tax clock that starts at separation, ${c.firstName}`;
          paragraphs = [
            "A quick pointer while your enquiry is with us. Transfers of assets between separating spouses stay free of capital gains tax at no gain no loss up to the end of the third tax year after the tax year you stop living together, and with no time limit at all where the transfer is made under a formal divorce agreement or court order. Get the timing wrong and the same transfer of a rental property or share portfolio can trigger a real tax bill.",
            `We keep a plain-English guide to how the window works, and what it means for the house, investments and a buyout, at ${b}/capital-gains-tax-divorce. It is free and asks for no contact details.`,
            "That is exactly the kind of groundwork the free call builds on. Whenever suits, just reply with a day and time and we will arrange it.",
          ];
          break;
        default:
          paragraphs = [
            "A quick pointer while your enquiry is with us. We keep a set of free tools on the site that answer the questions we hear most often: what a divorce is likely to cost at " +
              `${b}/calculators/divorce-cost-calculator, whether the £628 court fee can be reduced at ${b}/calculators/help-with-fees-checker, what a fair settlement range looks like at ${b}/calculators/settlement-range-estimator, and what making an agreement legally binding costs at ${b}/calculators/consent-order-cost-calculator. All free, none of them ask for contact details.`,
            "And if you would rather talk your situation through, the free call is still open. Just reply with a day and time and we will arrange it.",
          ];
      }
      return [
        emailMsg(c, subject, "A quick pointer from the team while your enquiry is with us.", paragraphs, "day2_give_email", { cta: null, secondary: null }),
      ];
    },
  },

  // ── Step 5: Day 4 SMS + WhatsApp ──────────────────────────────────────────
  {
    key: "day4_sms",
    delayHours: 96,
    channels: ["sms", "whatsapp"],
    buildMessages: (c) => [
      smsMsgWithGen(
        c,
        "day4_sms",
        `Hi ${c.firstName}, ${COMPANY} here. Most people we speak to had a question just like yours, and one short call usually clears up months of uncertainty. Reply YES and we will arrange your free call. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_reminder", [c.firstName, c.bookingUrl]),
    ],
  },

  // ── Step 6: Day 7 email (prefer Monday landing) ───────────────────────────
  {
    key: "day7_email",
    delayHours: 168,
    channels: ["email"],
    preferMonday: true,
    buildMessages: (c) => [
      emailMsg(
        c,
        `Still here when you are ready, ${c.firstName}`,
        "No rush at all. A one line reply is all it takes.",
        [
          "Just checking in, and there is genuinely no rush. Your free call is still open, and if now is not the right moment, that is completely fine. Separation moves at its own pace and we work around that.",
          "If something is holding you back, or life has simply been busy, a one line reply is all it takes. Tell us a day and time, or ask whatever is on your mind, and we will take it from there.",
        ],
        "day7_email",
        { cta: null, secondary: null },
      ),
    ],
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
          "This is our last note, we will stop the reminders here. No hard feelings at all, the timing has to be right, and with separation it rarely runs to a schedule.",
          "For what it is worth, the moments people most often come back to us are when negotiations stall over the house or the pensions, when Form E disclosure lands and the numbers do not add up, when an agreement needs turning into a consent order before it slips away, or when the capital gains tax window after separation starts to run short. If one of those lands, just reply to this email, even months from now, and we will pick it straight back up.",
          "All the best.",
        ],
        "breakup_day11",
        { cta: null, secondary: null },
      ),
    ],
  },
];

function buildContactabilityConfig(): LeadNurtureConfig {
  return {
    siteKey: "divorce-finances",
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
        console.error("[lead-nurture/divorce] mark lead unreachable failed", err);
      }
    },
  };
}

// ── Detail-capture sequence ────────────────────────────────────────────────────
// Email-only variant for leads missing a required contact field.
// Cadence: 0, 24, 48, 168 hours. Faceless, team voice throughout.

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
          `Reply with ${ask} and a member of the team will call you.`,
          [
            detailIntro(c),
            `Just reply to this email with ${ask} and a member of the team will call you. It is free, there is no obligation, and there is nothing to prepare.`,
            "If it is easier, reply with anything at all, even a one-word reply is fine. It confirms we can reach you and we will take it from there.",
          ],
          "detail_capture_t0",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, `Hi, thanks for getting in touch with ${COMPANY}.`),
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
            "A quick nudge about the message you sent us yesterday. We would still like to get a member of the team on the phone to you this week.",
            `All we need is ${ask}. Just reply to this email and we will sort the rest. No cost and no obligation at any point.`,
          ],
          "detail_capture_day1",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, `Hi, following up from ${COMPANY}.`),
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
          "One thing worth knowing while you decide",
          "A useful note from the team, and a free call if you would like one.",
          [
            "One quick pointer while your enquiry sits with us. A lot of the questions we are asked can be answered in a few minutes with our free tools: what a divorce is likely to cost (" +
              `${c.siteUrl}/calculators/divorce-cost-calculator), whether the £628 court fee can be reduced (${c.siteUrl}/calculators/help-with-fees-checker), what a fair settlement range looks like (${c.siteUrl}/calculators/settlement-range-estimator), and what making an agreement legally binding costs (${c.siteUrl}/calculators/consent-order-cost-calculator). None of them ask for any contact details.`,
            `And if you would like a specialist to look at the whole picture with you, just reply with ${ask} and we will arrange a free call.`,
          ],
          "detail_capture_day3",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, `Hi, from the team at ${COMPANY}.`),
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
            `If you would still like a free call, just reply with ${ask}, whether that is next week or next year. The moments it tends to matter most are when negotiations stall over the house or the pensions, when an agreement needs turning into a consent order, or when the capital gains tax window after separation starts to run short.`,
            "All the best.",
          ],
          "detail_capture_day7",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, `Hi, one last message from ${COMPANY}.`),
          },
        ),
      ];
    },
  },
];

function buildDetailCaptureConfig(): LeadNurtureConfig {
  return {
    siteKey: "divorce-finances",
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
        console.error("[lead-nurture/divorce] detail-capture exhaustion failed", err);
      }
    },
  };
}

export function buildLeadNurtureConfig(
  variant: LeadSequenceVariant = "contactability",
): LeadNurtureConfig {
  return variant === "detail_capture"
    ? buildDetailCaptureConfig()
    : buildContactabilityConfig();
}

export function buildLeadNurtureConfigs(): LeadNurtureConfig[] {
  return [buildContactabilityConfig(), buildDetailCaptureConfig()];
}

export const LEAD_SEQUENCE_NAME = SEQUENCE_NAME;
