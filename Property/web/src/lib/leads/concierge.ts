/**
 * SMS/WhatsApp booking concierge for Property leads.
 *
 * Handles the conversation flow after an initial reply: proposes call slots,
 * confirms bookings, answers FAQ logistics, and escalates anything substantive.
 *
 * Safety architecture:
 *   - The model NEVER generates outbound text. Every reply is from a FIXED
 *     template set; the only interpolations are code-generated (slot labels
 *     from booking.ts, {firstName}, bookingUrl). No user-provided text is
 *     ever echoed back.
 *   - The model's ONLY job is intent classification (Haiku via classify()).
 *   - Tax/finance questions ALWAYS escalate, never answered.
 *   - Turn cap 6 per lead, then permanent escalation.
 *   - Everything behind conciergeEnabled(): disabled = route keeps today's
 *     exact behaviour (one static ack via acknowledgeReply).
 *   - All sends go through the existing ChannelSender (dormancy/test-lead
 *     skips preserved).
 *
 * British English. No em-dashes.
 */

import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { classify, anthropicConfigured } from "@/lib/ai/anthropic";
import { buildLeadChannelSender, toE164UK } from "@/lib/leads/channels";
import { recordResponseAndEvaluate, stopNurture } from "@/lib/leads/contactability";
import {
  upcomingWeekdays,
  CALL_WINDOWS,
  isValidBookingDate,
  bookingLabel,
} from "@/lib/leads/booking";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { getSiteUrl } from "@/config/niche-loader";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import { firstNameOf } from "@accounting-network/web-shared/lead-nurture/config";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const TURN_CAP = 6;
const OPERATOR_ESCALATION_CAP = 3;

/** Enable the concierge: both the feature flag and the AI key must be present. */
export function conciergeEnabled(): boolean {
  return (
    process.env.LEAD_CONCIERGE_ENABLED === "true" && anthropicConfigured()
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ConversationStage = "open" | "slots_proposed" | "escalated" | "closed";

export interface PendingSlot {
  n: 1 | 2 | 3;
  date: string;   // YYYY-MM-DD
  window: string; // CALL_WINDOWS key
  label: string;  // human-readable label from bookingLabel()
}

export interface CapturedData {
  best_time?: string;
  portfolio?: string;
}

export interface ConversationStateRow {
  lead_id: string;
  stage: ConversationStage;
  pending_slot: PendingSlot[] | null;
  captured: CapturedData | null;
  turns: number;
  created_at?: string;
  updated_at?: string;
}

export interface ConciergeInput {
  leadId: string;
  channel: "sms" | "whatsapp";
  body: string;
  lead: {
    full_name: string;
    email: string;
    phone: string;
    role?: string | null;
    source: string;
  };
}

// ---------------------------------------------------------------------------
// Intent labels
// ---------------------------------------------------------------------------

const INTENT_LABELS = [
  "book_slot",
  "provide_besttime",
  "provide_portfolio",
  "faq_question",
  "optout",
  "tax_topic",
  "human_needed",
  "other",
] as const;

type IntentLabel = (typeof INTENT_LABELS)[number];

const CLASSIFY_SYSTEM = `You classify inbound SMS/WhatsApp replies from property landlords who have enquired about a tax review call.

Pick exactly ONE label from the list below.

book_slot         - The person wants to book or schedule a callback call slot.
provide_besttime  - The person is stating a preferred time or day to be called (e.g. "I am free evenings", "morning works best").
provide_portfolio - The person is sharing information about their property portfolio or the number of properties they own.
faq_question      - The person is asking a logistics question about the call or process ONLY: cost, duration, who will call, what to prepare. No tax or financial content.
optout            - The person wants no more messages, even without using the word STOP (e.g. "please stop", "not interested", "I have changed my mind", "leave me alone").
tax_topic         - ANY message containing a question or comment about tax rules, tax liabilities, potential savings, HMRC, ownership structures, capital gains, stamp duty, rental income, deductions, or ANY financial or tax subject. If in doubt between tax_topic and any other label, always choose tax_topic.
human_needed      - The person wants to speak to a real person immediately, is expressing frustration, or the message is too complex or unusual for this automated system.
other             - Anything that does not fit any of the categories above.`;

// ---------------------------------------------------------------------------
// FAQ matching (deterministic, code-only, pre-AI)
// ---------------------------------------------------------------------------

interface FaqEntry {
  id: string;
  pattern: RegExp;
  answer: string;
}

const FAQ_LIST: FaqEntry[] = [
  {
    id: "cost",
    pattern: /(cost|price|charge|fee|free)/i,
    answer: "The review call is completely free and there is no obligation afterwards.",
  },
  {
    id: "duration",
    pattern: /(how long|duration|minutes)/i,
    answer: "About 20 minutes, and there is nothing to prepare.",
  },
  {
    id: "who",
    pattern: /(who.*(call|speak)|which company|who are you)/i,
    answer: "A property tax specialist from our partner team will call you personally.",
  },
  {
    id: "prepare",
    pattern: /(prepare|bring|need.*hand)/i,
    answer: "Nothing formal. A rough idea of your figures helps, but the specialist works with whatever you have.",
  },
  {
    id: "advice_by_text",
    pattern: /(just tell me|answer here|by text|over message)/i,
    answer: "The specialist covers that properly on the call rather than by message.",
  },
];

/** Returns the first matching FAQ entry, or null if none match. */
export function matchFaq(body: string): FaqEntry | null {
  return FAQ_LIST.find((f) => f.pattern.test(body)) ?? null;
}

// ---------------------------------------------------------------------------
// Slot proposal
// ---------------------------------------------------------------------------

/** Build the 3 canonical proposed slots: day-0 morning, day-0 afternoon, day-1 morning. */
export function proposedSlots(from?: Date): PendingSlot[] {
  const days = upcomingWeekdays(3, from);
  return [
    {
      n: 1,
      date: days[0].iso,
      window: CALL_WINDOWS[0].key,
      label:
        bookingLabel(days[0].iso, CALL_WINDOWS[0].key) ??
        `${days[0].weekday} ${days[0].day} ${days[0].month}, morning (9am to 12pm)`,
    },
    {
      n: 2,
      date: days[0].iso,
      window: CALL_WINDOWS[1].key,
      label:
        bookingLabel(days[0].iso, CALL_WINDOWS[1].key) ??
        `${days[0].weekday} ${days[0].day} ${days[0].month}, afternoon (12pm to 3pm)`,
    },
    {
      n: 3,
      date: days[1].iso,
      window: CALL_WINDOWS[0].key,
      label:
        bookingLabel(days[1].iso, CALL_WINDOWS[0].key) ??
        `${days[1].weekday} ${days[1].day} ${days[1].month}, morning (9am to 12pm)`,
    },
  ] as PendingSlot[];
}

// ---------------------------------------------------------------------------
// Slot matching (deterministic, code-only, pre-AI)
// ---------------------------------------------------------------------------

const FULL_TO_SHORT: Record<string, string> = {
  monday: "mon",
  tuesday: "tue",
  wednesday: "wed",
  thursday: "thu",
  friday: "fri",
};

/**
 * Attempt to match a reply body against the pending slot list.
 *
 * Rules:
 *   - A lone digit "1", "2", or "3" matches that slot number unambiguously.
 *   - A short body (1-3 words after stripping punctuation) that contains only
 *     a recognised day abbreviation or full day name matches if exactly one
 *     slot is on that day; if multiple candidates exist (two windows on the
 *     same day), a window keyword disambiguates.
 *   - Anything else returns null so the classifier handles it.
 *
 * Deliberately conservative to avoid mis-booking on ambiguous phrasing
 * (e.g. "maybe tuesday??").
 */
export function matchSlotChoice(body: string, pending: PendingSlot[]): PendingSlot | null {
  const trimmed = body.trim();

  // Lone digit
  if (/^[123]$/.test(trimmed)) {
    const n = parseInt(trimmed, 10) as 1 | 2 | 3;
    return pending.find((s) => s.n === n) ?? null;
  }

  // Strip punctuation, collapse whitespace, lowercase
  const cleaned = trimmed.replace(/[^a-zA-Z0-9\s]/g, "").trim().toLowerCase();
  const words = cleaned.split(/\s+/).filter(Boolean);

  // Only attempt day matching for short replies (1-3 words)
  if (words.length === 0 || words.length > 3) return null;

  // Every word must be a recognised day name or window keyword.
  // This rejects ambiguous phrases like "maybe tuesday" where "maybe" is not recognised.
  const WINDOW_KEYS = new Set(["morning", "afternoon", "late", "am", "pm", "lunch"]);
  const DAY_SHORT = new Set(Object.values(FULL_TO_SHORT));
  const DAY_FULL = new Set(Object.keys(FULL_TO_SHORT));
  const isRecognised = (w: string) => DAY_SHORT.has(w) || DAY_FULL.has(w) || WINDOW_KEYS.has(w);
  if (!words.every(isRecognised)) return null;

  const candidates: PendingSlot[] = [];
  for (const slot of pending) {
    // Extract the short weekday from the label (first word, e.g. "tue")
    const shortDay = slot.label.toLowerCase().split(/\s+/)[0]; // "tue", "wed", etc.
    const fullDay = Object.entries(FULL_TO_SHORT).find(
      ([, s]) => s === shortDay,
    )?.[0]; // "tuesday", etc.

    const dayMatch =
      words.includes(shortDay) || (fullDay !== undefined && words.includes(fullDay));
    if (dayMatch) candidates.push(slot);
  }

  if (candidates.length === 1) return candidates[0];

  // Multiple candidates (same day, different windows): require window keyword
  if (candidates.length > 1) {
    const WINDOW_KEYWORDS: Record<string, string[]> = {
      morning: ["morning", "am"],
      afternoon: ["afternoon", "pm", "lunch"],
      late_afternoon: ["late"],
    };
    for (const cand of candidates) {
      const kws = WINDOW_KEYWORDS[cand.window] ?? [];
      if (kws.some((kw) => words.includes(kw))) return cand;
    }
    return null; // ambiguous, let classifier handle
  }

  return null;
}

// ---------------------------------------------------------------------------
// Booking URL
// ---------------------------------------------------------------------------

export function mintBookingUrl(leadId: string): string {
  try {
    const base = getSiteUrl().replace(/\/$/, "");
    return `${base}/book?t=${encodeURIComponent(mintLeadToken(leadId, "book"))}`;
  } catch {
    return `${getSiteUrl().replace(/\/$/, "")}/contact`;
  }
}

// ---------------------------------------------------------------------------
// State management
// ---------------------------------------------------------------------------

export async function loadOrCreateState(leadId: string): Promise<ConversationStateRow> {
  const res = await adminSelect<ConversationStateRow>("lead_conversation_state", {
    lead_id: `eq.${leadId}`,
    select: "lead_id,stage,pending_slot,captured,turns",
    limit: "1",
  });
  if (res.ok && res.data.length > 0) return res.data[0];

  const now = new Date().toISOString();
  const fresh: ConversationStateRow = {
    lead_id: leadId,
    stage: "open",
    pending_slot: null,
    captured: null,
    turns: 0,
    created_at: now,
    updated_at: now,
  };
  await adminInsert("lead_conversation_state", fresh);
  return fresh;
}

async function saveState(state: ConversationStateRow): Promise<void> {
  await adminUpdate(
    "lead_conversation_state",
    { lead_id: `eq.${state.lead_id}` },
    {
      stage: state.stage,
      pending_slot: state.pending_slot ?? null,
      captured: state.captured ?? null,
      turns: state.turns,
      updated_at: new Date().toISOString(),
    },
  );
}

// ---------------------------------------------------------------------------
// Channel sender (wraps ChannelSender + event recording)
// ---------------------------------------------------------------------------

async function sendReply(
  lead: ConciergeInput["lead"],
  channel: "sms" | "whatsapp",
  leadId: string,
  templateId: string,
  body: string,
): Promise<void> {
  const phone = toE164UK(lead.phone);
  if (!phone) return;
  const sender = buildLeadChannelSender({ live: lead.source !== "test" });
  let result: { id?: string; skipped?: boolean } | null;
  try {
    result = await sender.send({ channel, to: phone, body });
  } catch (err) {
    console.error("[leads/concierge] send failed", err);
    return;
  }
  // null = provider unconfigured -> do not record (so a later retry can send)
  if (result !== null) {
    await recordLeadContactEvent(leadId, "ack_sent", channel, {
      concierge: true,
      template: templateId,
    }).catch((err) => console.error("[leads/concierge] ack_sent record failed", err));
  }
}

// ---------------------------------------------------------------------------
// Operator escalation email
// ---------------------------------------------------------------------------

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendOperatorEscalationEmail(
  lead: ConciergeInput["lead"],
  channel: "sms" | "whatsapp",
  replyBody: string,
  captured: CapturedData | null,
  leadId: string,
): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  if (lead.source === "test") return;

  // Shared cap with reply-ack: count ALL operator_update events for this lead
  const priorRes = await adminSelect<{ id: string }>("lead_contact_events", {
    lead_id: `eq.${leadId}`,
    event_type: `eq.operator_update`,
    select: "id",
    limit: String(OPERATOR_ESCALATION_CAP + 1),
  });
  if (priorRes.ok && priorRes.data.length >= OPERATOR_ESCALATION_CAP) return;

  const to = resolveLeadTo(lead.source);
  const quotedRaw = replyBody.slice(0, 300);
  const quoted = esc(quotedRaw);
  const channelLabel = channel === "whatsapp" ? "WhatsApp" : "SMS";

  const capturedHtml = captured
    ? `<p style="margin:12px 0 0;"><strong>Captured from this conversation:</strong><br>
Best time: ${captured.best_time ? esc(captured.best_time) : "(none)"}<br>
Portfolio: ${captured.portfolio ? esc(captured.portfolio) : "(none)"}</p>`
    : "";

  const { error } = await getResend().emails.send({
    from: getFromAddress(),
    to,
    subject: `Concierge escalation: ${lead.full_name}`,
    html: `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
<p><strong>${esc(lead.full_name)}</strong> sent a ${channelLabel} message that the booking concierge escalated:</p>
<div style="background:#f1f5f9;border-radius:6px;padding:10px 14px;font-style:italic;">&ldquo;${quoted}&rdquo;</div>
${capturedHtml}
<p style="font-size:13px;color:#64748b;margin-top:16px;">The lead has been told someone will come back to them. Please follow up directly.</p>
</div>`,
    text: `${lead.full_name} sent a ${channelLabel} message that was escalated:\n"${quotedRaw}"${
      captured
        ? `\nCaptured: best_time=${captured.best_time ?? "(none)"}, portfolio=${captured.portfolio ?? "(none)"}`
        : ""
    }`,
  });

  if (error) {
    console.error("[leads/concierge] operator email failed", error);
    return;
  }

  await recordLeadContactEvent(leadId, "operator_update", channel, {
    kind: "concierge_escalation",
    body: quotedRaw,
  }).catch((err) => console.error("[leads/concierge] operator_update record failed", err));
}

// ---------------------------------------------------------------------------
// handleInboundReply
// ---------------------------------------------------------------------------

export async function handleInboundReply(input: ConciergeInput): Promise<void> {
  const { leadId, channel, body, lead } = input;
  const firstName = firstNameOf(lead.full_name);
  const bookingUrl = mintBookingUrl(leadId);

  // Load or create conversation state
  let state: ConversationStateRow;
  try {
    state = await loadOrCreateState(leadId);
  } catch (err) {
    console.error("[leads/concierge] state load failed", err);
    return;
  }

  // ── Terminal / turn-cap path ───────────────────────────────────────────────
  if (state.stage === "escalated" || state.stage === "closed" || state.turns >= TURN_CAP) {
    const holdingBody = `Thanks ${firstName}, I am passing this to the team now. Someone will come back to you shortly.`;
    await sendReply(lead, channel, leadId, "human_needed_escalation", holdingBody);
    await sendOperatorEscalationEmail(lead, channel, body, state.captured, leadId);
    // Transition to escalated only when not already in a terminal stage
    if (state.stage !== "escalated" && state.stage !== "closed") {
      state.stage = "escalated";
      state.turns += 1;
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
    }
    return;
  }

  // ── Deterministic slot matching (stage === 'slots_proposed') ─────────────
  if (state.stage === "slots_proposed" && state.pending_slot && state.pending_slot.length > 0) {
    const match = matchSlotChoice(body, state.pending_slot);
    if (match) {
      if (!isValidBookingDate(match.date)) {
        // Slot has expired: escalate
        const holdingBody = `Thanks ${firstName}, I am passing this to the team now. Someone will come back to you shortly.`;
        await sendReply(lead, channel, leadId, "human_needed_escalation", holdingBody);
        await sendOperatorEscalationEmail(lead, channel, body, state.captured, leadId);
        state.stage = "escalated";
        state.turns += 1;
        await saveState(state).catch((err) =>
          console.error("[leads/concierge] saveState failed", err),
        );
        return;
      }

      // Confirm the booking (mirror meta shape from api/leads/book/route.ts)
      await recordResponseAndEvaluate(leadId, "booked", channel, {
        start: match.label,
        date: match.date,
        window: match.window,
      }).catch((err) => console.error("[leads/concierge] booking record failed", err));

      const bookedBody = `Booked: ${match.label}. A property tax specialist will call you then. If your plans change, just reply here.`;
      await sendReply(lead, channel, leadId, "booked", bookedBody);
      state.stage = "closed";
      state.pending_slot = null;
      state.turns += 1;
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
      return;
    }
    // No slot match: fall through to AI classification
  }

  // ── AI classification ──────────────────────────────────────────────────────
  const intent = await classify<IntentLabel>({
    system: CLASSIFY_SYSTEM,
    prompt: body.slice(0, 500),
    labels: INTENT_LABELS,
    cacheSystem: true,
  });

  if (!intent) {
    // AI unavailable: escalate
    const holdingBody = `Thanks ${firstName}, I am passing this to the team now. Someone will come back to you shortly.`;
    await sendReply(lead, channel, leadId, "human_needed_escalation", holdingBody);
    await sendOperatorEscalationEmail(lead, channel, body, state.captured, leadId);
    state.stage = "escalated";
    state.turns += 1;
    await saveState(state).catch((err) =>
      console.error("[leads/concierge] saveState failed", err),
    );
    return;
  }

  // ── Intent dispatch ────────────────────────────────────────────────────────
  state.turns += 1;

  switch (intent) {
    case "book_slot": {
      const slots = proposedSlots();
      const [s1, s2, s3] = slots;
      const slotBody =
        `Happy to get that booked, ${firstName}. Reply 1, 2 or 3: ` +
        `1) ${s1.label} 2) ${s2.label} 3) ${s3.label}. ` +
        `Or pick any time here: ${bookingUrl} Reply STOP to opt out.`;
      state.pending_slot = slots;
      state.stage = "slots_proposed";
      await sendReply(lead, channel, leadId, "slots_proposed", slotBody);
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
      break;
    }

    case "provide_besttime": {
      const captured = { ...(state.captured ?? {}), best_time: body.slice(0, 200) };
      state.captured = captured;
      const btBody =
        `Noted, thank you. We will aim for that when the specialist calls. ` +
        `If you would rather lock in an exact slot: ${bookingUrl}`;
      await sendReply(lead, channel, leadId, "best_time_noted", btBody);
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
      break;
    }

    case "provide_portfolio": {
      const captured = { ...(state.captured ?? {}), portfolio: body.slice(0, 200) };
      state.captured = captured;
      const portBody = `Thanks, that helps us prepare properly. To pick your call time: ${bookingUrl}`;
      await sendReply(lead, channel, leadId, "portfolio_noted", portBody);
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
      break;
    }

    case "faq_question": {
      const faqEntry = matchFaq(body);
      if (!faqEntry) {
        // Classifier said faq but no pattern matched: escalate
        const holdingBody = `Thanks ${firstName}, I am passing this to the team now. Someone will come back to you shortly.`;
        await sendReply(lead, channel, leadId, "human_needed_escalation", holdingBody);
        await sendOperatorEscalationEmail(lead, channel, body, state.captured, leadId);
        state.stage = "escalated";
        await saveState(state).catch((err) =>
          console.error("[leads/concierge] saveState failed", err),
        );
        break;
      }
      const faqBody = `${faqEntry.answer} Pick a time here: ${bookingUrl} Reply STOP to opt out.`;
      await sendReply(lead, channel, leadId, `faq_${faqEntry.id}`, faqBody);
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
      break;
    }

    case "optout": {
      await stopNurture(leadId, channel).catch((err) =>
        console.error("[leads/concierge] stopNurture failed", err),
      );
      state.stage = "closed";
      await sendReply(
        lead,
        channel,
        leadId,
        "optout_ack",
        "Understood, we will not message you about this enquiry again.",
      );
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
      break;
    }

    case "tax_topic": {
      const taxBody =
        `That is one for the specialist rather than a text thread, ${firstName}, ` +
        `so I will make sure it is in front of them for your call. ` +
        `The quickest way to get it answered properly: ${bookingUrl}`;
      await sendReply(lead, channel, leadId, "tax_topic_escalation", taxBody);
      await sendOperatorEscalationEmail(lead, channel, body, state.captured, leadId);
      state.stage = "escalated";
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
      break;
    }

    case "human_needed":
    case "other":
    default: {
      const holdingBody = `Thanks ${firstName}, I am passing this to the team now. Someone will come back to you shortly.`;
      await sendReply(lead, channel, leadId, "human_needed_escalation", holdingBody);
      await sendOperatorEscalationEmail(lead, channel, body, state.captured, leadId);
      state.stage = "escalated";
      await saveState(state).catch((err) =>
        console.error("[leads/concierge] saveState failed", err),
      );
      break;
    }
  }
}
