/**
 * LeadNurtureConfig: the contract the lead-nurture engine needs from the host
 * site. This engine is the LEAD-scoped, MULTI-CHANNEL, REACTIVE sibling of the
 * subscriber nurture engine in ../nurture. Key differences:
 *
 *   - Keyed on lead_id (not subscriber_id).
 *   - A step can fan out to several channels (email + sms + whatsapp).
 *   - It is REACTIVE: an inbound two-way action (reply / booking / confirm) is
 *     recorded as a lead_contact_event and flips lead_nurture_state.status out of
 *     'active', so the cron stops chasing. The engine here only drives the
 *     forward (scheduled) motion; the halt is done by the contactability gate.
 *
 * Identity (email from-address, WhatsApp sender, etc.) lives in the injected
 * ChannelSender, NOT here, because it is channel-specific. This file only holds
 * the sequence shape and per-lead message building. No site literals leak into
 * the engine itself (same PF-07 posture as the subscriber engine).
 */

export type LeadChannel = "email" | "sms" | "whatsapp";

/** Copy generated for a single nurture step (subject/preheader/body/sms). */
export interface GeneratedStepCopy {
  subject?: string;
  preheader?: string;
  paragraphs?: string[];
  sms?: string;
}

/**
 * Per-lead context handed to each step's message builder. The host composes this
 * (tokenised confirm URL, booking URL, first name, topic) so the engine never
 * needs to know how to mint tokens or resolve site URLs.
 */
export interface LeadMessageContext {
  /** Lead's first name (best-effort split of full_name), for a human greeting. */
  firstName: string;
  /** Absolute self-booking URL (carries the lead ref), for "pick a time". */
  bookingUrl: string;
  /** Absolute tokenised one-tap confirm URL, for the email/one-click gate. */
  confirmUrl: string;
  /** Short opt-out instruction appended to sms/whatsapp bodies (PECR/WA policy). */
  optOutText: string;
  /** Human topic label from the enquiry (e.g. "incorporation"), optional. */
  topicLabel?: string;
  /** Base site URL, already trailing-slash-trimmed. */
  siteUrl: string;
  /** Echoed booking-call goal from the lead's message, for personalised copy. */
  callGoalEcho?: string;
  /** Verbatim prompt/question the lead typed, for a reply-in-kind first touch. */
  promptedEcho?: string;
  /** Detected intent category (e.g. "CGT", "incorporation"), for branching copy. */
  intentCategory?: string;
  /** AI-scored lead quality (0–100), for channel/timing decisions. */
  qualityScore?: number;
  /** Name of the calculator the lead used before enquiring. */
  calculatorName?: string;
  /** URL of the calculator the lead used before enquiring. */
  calculatorUrl?: string;
  /** Whether the lead is currently inside the SMS send-window (PECR-safe hours). */
  inSmsWindow?: boolean;
  /** Preferred send hour (0–23 UTC) derived from prior open/click behaviour. */
  bestSendHour?: number | null;
  /** A/B variant key active for this lead (for copy personalisation). */
  variant?: string;
  /** Pre-generated step copy keyed by step key, produced by the copy-gen job. */
  generatedCopy?: Record<string, GeneratedStepCopy> | null;
  /** Absolute one-click opt-out URL for this lead (RFC 8058 List-Unsubscribe). */
  optOutUrl?: string;
  /**
   * Engagement-signal variant for the current lead. Computed from recent
   * lead_contact_events and email send count; drives copy/channel branching in
   * mid-sequence steps. Additive alongside `variant` (which is T0-only).
   *
   * "hesitation"    - clicked a booking link but has not booked, 24 h+ ago.
   * "channel_shift" - 3+ emails sent with zero opens (deliverability concern).
   */
  engagementVariant?: "hesitation" | "channel_shift";
}

/** One outbound message within a step, on a single channel. */
export interface LeadStepMessage {
  channel: LeadChannel;
  /** email: subject line. */
  subject?: string;
  /** email: HTML body. */
  html?: string;
  /** email: plain-text mirror. */
  text?: string;
  /** sms / whatsapp free-form (session-window) body. */
  body?: string;
  /**
   * whatsapp: name of a pre-approved (utility-category) template, for a
   * business-initiated message outside the 24h service window. When set, the
   * sender uses the template; `body` is ignored for WhatsApp.
   */
  templateName?: string;
  /** whatsapp: ordered template variable substitutions. */
  templateVars?: string[];
  /** Extra email headers (e.g. List-Unsubscribe). Ignored for sms/whatsapp. */
  headers?: Record<string, string>;
}

/** One step in the contactability sequence. */
export interface LeadNurtureStep {
  /** Stable identifier for logs (e.g. "instant", "day1_reminder", "breakup"). */
  key: string;
  /**
   * Hours to wait after the PREVIOUS step before this one is due.
   * Step 0 = 0 (fired synchronously at submit, not by the cron).
   * Hours (not days) so the cadence can target UK contact windows.
   */
  delayHours: number;
  /** Build the channel messages for this step for a given lead. */
  buildMessages: (ctx: LeadMessageContext) => LeadStepMessage[];
  /** Channel classes this step sends on (scheduler hint for send-window clamping). */
  channels?: LeadChannel[];
  /** Scheduler hint: prefer a Monday landing (fresh-start touch). */
  preferMonday?: boolean;
}

/** Per-site composition contract for the lead-nurture engine. */
export interface LeadNurtureConfig {
  /** Site key (e.g. "property"). Stored implicitly via the lead's source. */
  siteKey: string;
  /** Sequence name stored on lead_nurture_state / lead_nurture_sends rows. */
  sequenceName: string;
  /** Sequence steps, in order. Step 0 is the instant touch. */
  steps: LeadNurtureStep[];
  /**
   * Optional per-site scheduler: given the moment the previous step completed,
   * the next step, and the lead's context, return the epoch ms when the next
   * step should fire. When absent the engine uses fromMs + delayHours.
   */
  nextActionAt?: (fromMs: number, nextStep: LeadNurtureStep, ctx: LeadMessageContext) => number;
}

/**
 * The minimal lead shape the engine operates on. Read (service-role) from the
 * `leads` table by the cron; passed directly by the submit route for step 0.
 */
export interface NurtureLead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role?: string | null;
  source: string;
  message?: string | null;
}

/**
 * A row from lead_nurture_state enriched with copy-gen fields. Passed to
 * buildContext so the host can embed pre-generated copy into the message context.
 */
export interface LeadNurtureStateRow {
  lead_id: string;
  step: number;
  generated_copy: Record<string, GeneratedStepCopy> | null;
  copy_status: string | null;
  best_send_hour: number | null;
}

/**
 * A channel-agnostic sender, implemented per-site (Property: Resend + Twilio).
 * Returns the provider message id on success, or null when the channel is
 * dormant / disabled / the lead is a test row — in which case the engine still
 * records the send as 'skipped' so the sequence advances deterministically in
 * tests without hitting a real provider.
 */
export interface ChannelSender {
  send(msg: {
    channel: LeadChannel;
    to: string;
    subject?: string;
    html?: string;
    text?: string;
    body?: string;
    templateName?: string;
    templateVars?: string[];
    headers?: Record<string, string>;
  }): Promise<{ id?: string; skipped?: boolean } | null>;
}

/**
 * Read a required string from an environment variable, or throw. Mirrors the
 * subscriber engine's requireEnv so the lead engine refuses to run half-armed.
 */
export function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") {
    throw new Error(
      `Required environment variable ${name} is not set. ` +
        `The lead-nurture engine will not operate with missing config.`,
    );
  }
  return v.trim();
}

/** Best-effort first name from a full name, for a greeting. */
export function firstNameOf(fullName: string): string {
  const trimmed = (fullName || "").trim();
  if (!trimmed) return "there";
  const first = trimmed.split(/\s+/)[0];
  return first.length >= 2 ? first : "there";
}
