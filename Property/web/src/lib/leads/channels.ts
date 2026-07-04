/**
 * Property lead-nurture channel sender: implements the engine's ChannelSender
 * over Resend (email) and Twilio REST (SMS + WhatsApp). One vendor for phone
 * verification, SMS and WhatsApp (Twilio); Resend for branded-domain email.
 *
 * DORMANCY (safety): real messages leave ONLY when LEAD_NURTURE_ENABLED is set
 * AND the per-channel flag is on AND the provider is configured. Otherwise the
 * sender returns { skipped: true } so the state machine still advances (in tests
 * and before go-live) without ever touching a real provider.
 *
 * TEST ISOLATION: build with { live: false } for source='test' leads so a
 * synthetic probe drives the full flow without messaging anyone.
 *
 * We call Twilio's REST API directly with fetch (Basic auth) rather than pull in
 * the Twilio SDK — fewer deps, works on the Node runtime.
 */

import type { ChannelSender } from "@accounting-network/web-shared/lead-nurture/config";
import { PermanentSendError } from "@accounting-network/web-shared/lead-nurture/config";
import { getResend } from "@/lib/resend";

function flagOn(name: string): boolean {
  const v = (process.env[name] || "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

/** Master arm for any real lead-nurture send. */
export function leadNurtureArmed(): boolean {
  return flagOn("LEAD_NURTURE_ENABLED");
}

function channelEnabled(channel: "email" | "sms" | "whatsapp"): boolean {
  if (!leadNurtureArmed()) return false;
  if (channel === "email") return flagOn("LEAD_NURTURE_EMAIL_ENABLED");
  if (channel === "sms") return flagOn("LEAD_NURTURE_SMS_ENABLED");
  return flagOn("LEAD_NURTURE_WHATSAPP_ENABLED");
}

// ── Email (Resend) ─────────────────────────────────────────────────────────

function serviceFrom(): string {
  const name = process.env.LEAD_SERVICE_FROM_NAME || "Property Tax Partners";
  const email = process.env.LEAD_SERVICE_FROM_EMAIL || "team@propertytaxpartners.co.uk";
  return `${name} <${email}>`;
}

function serviceReplyTo(): string {
  return process.env.LEAD_SERVICE_REPLY_TO || "hello@propertytaxpartners.co.uk";
}

async function sendEmail(params: {
  to: string;
  subject?: string;
  html?: string;
  text?: string;
  headers?: Record<string, string>;
}): Promise<{ id?: string } | null> {
  const { data, error } = await getResend().emails.send({
    from: serviceFrom(),
    to: params.to,
    replyTo: serviceReplyTo(),
    subject: params.subject ?? "",
    html: params.html ?? "",
    text: params.text ?? "",
    headers: params.headers,
  });
  if (error) throw new Error(`Resend send error: ${JSON.stringify(error)}`);
  return data?.id ? { id: data.id } : null;
}

// ── Phone normalisation ──────────────────────────────────────────────────────

/** Best-effort UK E.164. Verified numbers are stored E.164; this covers raw. */
export function toE164UK(raw: string): string | null {
  const s = (raw || "").replace(/[\s()\-.]/g, "");
  if (!s) return null;
  if (s.startsWith("+")) return /^\+\d{8,15}$/.test(s) ? s : null;
  if (s.startsWith("00")) {
    const e = "+" + s.slice(2);
    return /^\+\d{8,15}$/.test(e) ? e : null;
  }
  if (s.startsWith("0")) {
    const e = "+44" + s.slice(1);
    return /^\+44\d{9,10}$/.test(e) ? e : null;
  }
  // Bare national number without leading 0 (uncommon) — assume UK.
  if (/^\d{9,10}$/.test(s)) return "+44" + s;
  return null;
}

// ── Twilio (SMS + WhatsApp) ──────────────────────────────────────────────────

/**
 * Twilio error codes that represent permanent, non-retriable rejections. A send
 * that hits one of these will never succeed regardless of how many times it is
 * retried, so we throw PermanentSendError to let the engine advance immediately
 * instead of burning hourly cron ticks up to the 6 h RETRY_CAP_MS ceiling.
 *
 *  21211 -- invalid To phone number (the number itself is malformed or unassigned)
 *  21408 -- permission (geo-permission) not enabled for this region/country
 *  21610 -- message body or number is blacklisted (recipient unsubscribed via STOP)
 *  21614 -- To number is not a valid mobile number capable of receiving SMS
 */
export const PERMANENT_TWILIO_ERROR_CODES = new Set([21211, 21408, 21610, 21614]);

export interface TwilioAuth {
  accountSid: string;
  /** Basic-auth username: the AC... Account SID, or an SK... API Key SID. */
  user: string;
  /** Basic-auth password: the Auth Token, or the API Key secret. */
  pass: string;
}

/**
 * Resolve Twilio REST credentials. Two supported shapes:
 *   1. TWILIO_ACCOUNT_SID (AC...) + TWILIO_AUTH_TOKEN            (classic)
 *   2. TWILIO_ACCOUNT_SID (AC...) + TWILIO_API_KEY_SID (SK...)
 *      + TWILIO_API_KEY_SECRET                                   (API key)
 * Note: inbound webhook signature validation always needs TWILIO_AUTH_TOKEN
 * (Twilio signs webhooks with the Auth Token, never an API key secret).
 */
export function twilioAuth(): TwilioAuth | null {
  const account = (process.env.TWILIO_ACCOUNT_SID || "").trim();
  const authToken = (process.env.TWILIO_AUTH_TOKEN || "").trim();
  const keySid = (process.env.TWILIO_API_KEY_SID || "").trim();
  const keySecret = (process.env.TWILIO_API_KEY_SECRET || "").trim();
  if (account.startsWith("SK")) {
    console.error(
      "[lead-nurture] TWILIO_ACCOUNT_SID looks like an API Key SID (SK...). It must be the AC... Account SID; put the SK.../secret pair in TWILIO_API_KEY_SID / TWILIO_API_KEY_SECRET.",
    );
    return null;
  }
  if (!account.startsWith("AC")) return null;
  if (keySid.startsWith("SK") && keySecret) {
    return { accountSid: account, user: keySid, pass: keySecret };
  }
  if (authToken) return { accountSid: account, user: account, pass: authToken };
  return null;
}

async function twilioSendMessage(form: Record<string, string>): Promise<{ id?: string } | null> {
  const creds = twilioAuth();
  if (!creds) return null;
  const auth = Buffer.from(`${creds.user}:${creds.pass}`).toString("base64");
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${creds.accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(form).toString(),
      cache: "no-store",
    },
  );
  if (!res.ok) {
    const bodyText = await res.text().catch(() => "");
    let parsed: { code?: unknown; message?: unknown } = {};
    try {
      parsed = JSON.parse(bodyText) as { code?: unknown; message?: unknown };
    } catch {
      // Not valid JSON -- fall through to the generic throw below.
    }
    const code = typeof parsed.code === "number" ? parsed.code : undefined;
    if (code !== undefined && PERMANENT_TWILIO_ERROR_CODES.has(code)) {
      const detail =
        typeof parsed.message === "string"
          ? parsed.message
          : bodyText.slice(0, 200);
      throw new PermanentSendError(`Twilio ${code}: ${detail}`, code);
    }
    throw new Error(`Twilio send failed (${res.status}): ${bodyText.slice(0, 300)}`);
  }
  const data = (await res.json()) as { sid?: string };
  return data.sid ? { id: data.sid } : null;
}

async function sendSms(to: string, body?: string): Promise<{ id?: string } | null> {
  const from = process.env.TWILIO_SMS_FROM;
  const e164 = toE164UK(to);
  if (!from || !e164 || !body) return null;
  return twilioSendMessage({ To: e164, From: from, Body: body });
}

async function sendWhatsApp(
  to: string,
  body?: string,
  templateName?: string,
  templateVars?: string[],
): Promise<{ id?: string } | null> {
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const e164 = toE164UK(to);
  if (!from || !e164) return null;

  const form: Record<string, string> = {
    To: `whatsapp:${e164}`,
    From: `whatsapp:${from}`,
  };
  // Business-initiated (outside the 24h service window) requires an approved
  // template, wired via Twilio Content API. Map templateName -> ContentSid env.
  if (templateName) {
    const contentSid = process.env[`TWILIO_WA_CONTENT_${templateName.toUpperCase()}`];
    if (!contentSid) return null; // template not provisioned yet
    form.ContentSid = contentSid;
    if (templateVars && templateVars.length) {
      const vars: Record<string, string> = {};
      templateVars.forEach((v, i) => (vars[String(i + 1)] = v));
      form.ContentVariables = JSON.stringify(vars);
    }
  } else if (body) {
    form.Body = body; // free-form, only valid inside an open 24h window
  } else {
    return null;
  }
  return twilioSendMessage(form);
}

// ── The ChannelSender ────────────────────────────────────────────────────────

/**
 * Build the Property lead-nurture channel sender.
 * @param opts.live  When false (test leads), every channel is skipped -- no real
 *                   provider is ever contacted, but the state machine advances.
 *
 * Future option (NOT built): before calling sendSms, check whether `to` resolves
 * to a non-+44 number and return { skipped: true } rather than attempting the
 * send. This would suppress the 21408 (geo-permission) rejection at source for
 * international numbers and avoid the PermanentSendError path entirely.
 */
export function buildLeadChannelSender(opts?: { live?: boolean }): ChannelSender {
  const live = opts?.live !== false;
  return {
    send: async (msg) => {
      if (!live || !channelEnabled(msg.channel)) {
        return { skipped: true };
      }
      if (msg.channel === "email") {
        return sendEmail({
          to: msg.to,
          subject: msg.subject,
          html: msg.html,
          text: msg.text,
          headers: msg.headers,
        });
      }
      if (msg.channel === "sms") {
        return sendSms(msg.to, msg.body);
      }
      return sendWhatsApp(msg.to, msg.body, msg.templateName, msg.templateVars);
    },
  };
}
