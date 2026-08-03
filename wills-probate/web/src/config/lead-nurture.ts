/**
 * Probate Compass (wills-probate) lead-nurture composition: the contactability
 * sequence and detail-capture sequence for wills, probate and estate enquiries.
 *
 * SERVICE-ONLY (compliance): every message is a solicited, non-promotional
 * follow-up about the enquirer's OWN enquiry. No marketing content. This
 * keeps us inside the "rely on existing LIA, service-only" posture and
 * PECR's solicited-comms carve-out.
 *
 * Audience: executors and administrators dealing with an estate, people
 * planning a will, the recently bereaved, and people planning around
 * inheritance tax. Copy is role-adapted via the lead's role and is
 * bereavement-sensitive throughout: for the recently-bereaved role the
 * same-day VIP SMS is suppressed entirely and the day-1 and day-4 SMS copy
 * is softened (no urgency, no "we kept time free" pressure).
 *
 * Cadence: an instant email (step 0) fires synchronously at submit. Then
 * 7 escalating follow-ups over approximately 11 days.
 * Cumulative delay hours from step 0: 0, 0, 4, 24, 48, 96, 168, 264.
 *
 * House style: no em-dashes. British English. Faceless team voice (no named
 * individual). No credential claims. Never legal advice, never product
 * advice: value-give messages point at our free calculators
 * (/calculators/do-i-need-probate-checker, /calculators/probate-cost-calculator,
 * /calculators/iht-threshold-calculator) and, for the IHT-planning role,
 * flag the April 2027 change bringing unused pensions into estates.
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
import { getSiteUrl } from "./niche-loader";
import { renderLeadServiceEmail } from "@/lib/emails/lead-service-template";
import { adminSelect, adminUpdate, adminInsert } from "@/lib/supabase/admin";
import { parseEnquiryEchoes, normaliseEcho } from "@/lib/leads/enquiry-message";
import { computeNextSendMs, inSendWindow } from "@/lib/leads/send-window";

const SEQUENCE_NAME = "wills_contactability";
const DETAIL_CAPTURE_SEQUENCE_NAME = "wills_detail_capture";

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

const COMPANY = "Probate Compass";
const SIGNOFF = `Best wishes, the team at ${COMPANY}`;
const FOOTER =
  "You are receiving this because you submitted an enquiry on the Probate Compass website.";
const OPT_OUT = "Reply STOP to opt out.";

function base(): string {
  return getSiteUrl().replace(/\/$/, "");
}

// ── Role adaptation ───────────────────────────────────────────────────────────
// Lead form role values: executor-administrator | planning-will |
// recently-bereaved | iht-planning | other. topicLabel carries the raw value.

type WillsRole = "executor" | "planning" | "bereaved" | "iht" | "other";

export function willsRoleOf(ctx: Pick<LeadMessageContext, "topicLabel">): WillsRole {
  const r = (ctx.topicLabel ?? "").toLowerCase();
  if (r.includes("executor")) return "executor";
  if (r.includes("bereaved")) return "bereaved";
  if (r.includes("iht")) return "iht";
  if (r.includes("planning-will") || r.includes("planning_will")) return "planning";
  return "other";
}

/** One-line description of what the free call covers, per role. */
function callScopeLine(role: WillsRole): string {
  switch (role) {
    case "executor":
      return "Whether it is working out if probate is needed, what the estate administration will cost, or where to start with valuations, we cover all of it.";
    case "bereaved":
      return "There is no checklist to work through and nothing you need to have ready. We simply talk through where things stand and what, if anything, needs doing first.";
    case "iht":
      return "Whether it is understanding the thresholds that apply to your estate, how the rules are changing, or what your options are, we cover all of it.";
    case "planning":
      return "Whether it is what your will needs to cover, how your estate would be treated, or simply where to start, we cover all of it.";
    default:
      return "Whatever the question, from probate and estate administration to wills and inheritance tax, we cover all of it.";
  }
}

// ── Message context ───────────────────────────────────────────────────────────

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
// Themes: probate need, estate administration cost, IHT thresholds and the
// April 2027 pensions change, will planning. Service-only follow-up. Faceless
// team voice. No credential claims. Never legal advice.

const STEPS: LeadNurtureStep[] = [
  // ── Step 0: T0 email ───────────────────────────────────────────────────────
  {
    key: "t0_email",
    delayHours: 0,
    channels: ["email"],
    buildMessages: (c) => {
      const role = willsRoleOf(c);
      return [
        emailMsg(
          c,
          `Got your enquiry, ${c.firstName}`,
          "Just reply with a time that suits and a member of the team will call you.",
          [
            "Thanks for your enquiry, it has just come through to us and a member of the team is ready to help.",
            `The call is a free conversation about your situation, around 20 minutes, with no charge and no obligation. ${callScopeLine(role)}`,
            role === "bereaved"
              ? "Whenever you feel ready, just reply to this email, anything at all, and we will arrange your call. There is no time limit on this and no pressure from us."
              : "Just reply to this email, anything at all, and we will arrange your call. Even a one-word reply is fine. If a particular day or time suits you better, let us know and we will work around it.",
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
        willsRoleOf(c) === "bereaved"
          ? `Hi ${c.firstName}, this is Probate Compass. Thank you for getting in touch. Whenever you are ready, reply YES and a member of the team will call you. No rush at all. ${c.optOutText}`
          : `Hi ${c.firstName}, this is Probate Compass. Thanks for your enquiry. Reply YES and a member of the team will call you about your estate or probate question. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_welcome", [c.firstName, c.bookingUrl]),
    ],
  },

  // ── Step 2: VIP same-day SMS (quality score 5 only) ───────────────────────
  // Suppressed entirely for the recently-bereaved role: a same-day chaser is
  // the wrong register for someone who has just lost somebody.
  {
    key: "vip_sameday",
    delayHours: 4,
    channels: ["sms"],
    buildMessages: (c) => {
      if (willsRoleOf(c) === "bereaved") return [];
      if (c.qualityScore !== 5) return [];
      return [
        smsMsgWithGen(
          c,
          "vip_sameday",
          `Hi ${c.firstName}, Probate Compass again. Situations like yours are exactly what the team handles every day, so we have set time aside this week. Reply YES and a specialist will call you. ${c.optOutText}`,
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
        willsRoleOf(c) === "bereaved"
          ? `Hi ${c.firstName}, Probate Compass here. Just a gentle note that your free call is still open whenever you feel ready. Reply YES and we will arrange it around you. ${c.optOutText}`
          : `Hi ${c.firstName}, following up on your wills and probate enquiry. We have kept some time free this week for a short call. Reply YES and we will call you. ${c.optOutText}`,
      ),
      whatsappTemplate("lead_reminder", [c.firstName, c.bookingUrl]),
    ],
  },

  // ── Step 4: Day 2 give-value email (role-adapted, calculators) ────────────
  {
    key: "day2_give_email",
    delayHours: 48,
    channels: ["email"],
    buildMessages: (c) => {
      const b = c.siteUrl;
      const role = willsRoleOf(c);
      let subject = `Something useful while you decide, ${c.firstName}`;
      let paragraphs: string[];
      switch (role) {
        case "executor":
          subject = `A quicker way to size up the estate, ${c.firstName}`;
          paragraphs = [
            "A quick pointer while your enquiry is with us. Two of the questions executors and administrators ask most often are whether a grant of probate is actually needed, and what the whole process is likely to cost. We built two free tools that answer exactly those questions in a few minutes.",
            `You can check whether probate is likely to be needed at ${b}/calculators/do-i-need-probate-checker and get a realistic cost picture at ${b}/calculators/probate-cost-calculator. Both are free and neither asks for any contact details.`,
            "And if you would rather talk it through, the free call is still open. Just reply with a day and time and the team will arrange it.",
          ];
          break;
        case "iht":
          subject = `The IHT numbers worth knowing, ${c.firstName}`;
          paragraphs = [
            "A quick pointer while your enquiry is with us. The starting point for any inheritance tax planning is knowing which nil-rate bands your estate can actually use, and how much headroom is left. Our free tool at " +
              `${b}/calculators/iht-threshold-calculator works that out in a couple of minutes, with no contact details asked for.`,
            "One thing worth having on your radar: from April 2027 most unused pension funds are due to be brought into the value of estates for inheritance tax. For a lot of people that quietly changes the arithmetic, which is exactly the kind of thing the free call can walk through for your own situation.",
            "Whenever suits, just reply with a day and time and the team will arrange it.",
          ];
          break;
        case "bereaved":
          subject = `Here if it helps, ${c.firstName}`;
          paragraphs = [
            "No pressure at all from us, just something that may be useful when you are ready. One of the first practical questions after a death is whether a grant of probate is actually needed, and often it is not. Our free checker at " +
              `${b}/calculators/do-i-need-probate-checker takes a few minutes and asks for no contact details.`,
            "And whenever you would like to talk anything through, the free call is still open. A one line reply to this email is all it takes, this week or months from now.",
          ];
          break;
        case "planning":
          subject = `A useful starting point for your planning, ${c.firstName}`;
          paragraphs = [
            "A quick pointer while your enquiry is with us. Before deciding what your will should do, it helps to know how your estate would currently be treated for inheritance tax, and how much of the available allowances you would actually use. Our free tool at " +
              `${b}/calculators/iht-threshold-calculator gives you that picture in a couple of minutes, with no contact details asked for.`,
            "That is exactly the kind of groundwork the free call builds on. Whenever suits, just reply with a day and time and the team will arrange it.",
          ];
          break;
        default:
          paragraphs = [
            "A quick pointer while your enquiry is with us. We keep a set of free tools on the site that answer the questions we hear most often: whether probate is needed at " +
              `${b}/calculators/do-i-need-probate-checker, what it is likely to cost at ${b}/calculators/probate-cost-calculator, and where an estate stands against the inheritance tax thresholds at ${b}/calculators/iht-threshold-calculator. All free, none of them ask for contact details.`,
            "And if you would rather talk your situation through, the free call is still open. Just reply with a day and time and the team will arrange it.",
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
        willsRoleOf(c) === "bereaved"
          ? `Hi ${c.firstName}, Probate Compass here. No rush at all, your free call stays open for whenever the time feels right. Reply YES whenever you are ready and we will take it from there. ${c.optOutText}`
          : `Hi ${c.firstName}, Probate Compass here. Most people we speak to had a question just like yours, and one short call usually clears up weeks of uncertainty. Reply YES and we will call you. ${c.optOutText}`,
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
          "Just checking in, and there is genuinely no rush. Your free call is still open, and if now is not the right moment, that is completely fine. These things move at their own pace and we work around that.",
          "If something is holding you back, or life has simply been busy, a one line reply is all it takes. Tell us a day and time, or ask whatever is on your mind, and the team will take it from there.",
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
          "This is our last note, we will stop the reminders here. No hard feelings at all, the timing has to be right, and with wills and estates it often is not straightforward.",
          "For what it is worth, the moments people most often come back to us are when a grant application stalls, when an estate turns out to hold property or investments, when a will needs writing or updating after a life change, or when the inheritance tax picture shifts, as it will for many estates when unused pensions are brought in from April 2027. If one of those lands, just reply to this email, even months from now, and the team will pick it straight back up.",
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
    siteKey: "wills-probate",
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
        console.error("[lead-nurture/wills] mark lead unreachable failed", err);
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
            "If it is easier, reply with anything at all, even a one-word reply is fine. It confirms we can reach you and we will take it from there, at whatever pace suits you.",
          ],
          "detail_capture_t0",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, thanks for getting in touch with Probate Compass."),
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
            "A gentle nudge about the message you sent us yesterday. We would still like to get a member of the team on the phone to you, whenever suits.",
            `All we need is ${ask}. Just reply to this email and we will sort the rest. No cost and no obligation at any point.`,
          ],
          "detail_capture_day1",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, following up from Probate Compass."),
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
            "One quick pointer while your enquiry sits with us. A lot of the questions we are asked can be answered in a few minutes with our free tools: whether a grant of probate is actually needed (" +
              `${c.siteUrl}/calculators/do-i-need-probate-checker), what the process is likely to cost (${c.siteUrl}/calculators/probate-cost-calculator), and where an estate stands against the inheritance tax thresholds (${c.siteUrl}/calculators/iht-threshold-calculator). None of them ask for any contact details.`,
            `And if you would like the team to look at the whole picture with you, just reply with ${ask} and we will arrange a free call.`,
          ],
          "detail_capture_day3",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, from the team at Probate Compass."),
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
            `If you would still like a free call, just reply with ${ask}, whether that is next week or next year. The moments it tends to matter most are when a grant application stalls, when an estate turns out to be more involved than expected, when a will needs writing or updating, or when the inheritance tax picture changes.`,
            "All the best.",
          ],
          "detail_capture_day7",
          {
            cta: null,
            secondary: null,
            ...detailGreeting(c, "Hi, one last message from Probate Compass."),
          },
        ),
      ];
    },
  },
];

function buildDetailCaptureConfig(): LeadNurtureConfig {
  return {
    siteKey: "wills-probate",
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
        console.error("[lead-nurture/wills] detail-capture exhaustion failed", err);
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
