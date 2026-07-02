/**
 * Real-time lead verification: the "verifying your details" moment. Runs at
 * submit time (sub-second) to catch the biggest cause of "not contactable" —
 * dead / mistyped / non-mobile numbers and fat-fingered emails — BEFORE a lead
 * ever reaches DJH.
 *
 *   Phone: Twilio Lookup v2 line-type intelligence (real, live, mobile?).
 *   Email: syntax + MX (in-house) with an optional mailbox-level API.
 *
 * FAIL-SAFE: a provider outage never blocks a lead. On any error we return
 * status 'unknown' and let the lead through (verify_pass stays lenient); the
 * hard contactability gate is the two-way RESPONSE, which independently proves
 * reachability. verify_pass is a pre-filter + a signal for the DJH handoff, not
 * the final word.
 */

import { promises as dns } from "dns";
import { toE164UK, twilioAuth } from "./channels";

export type PhoneStatus = "valid_mobile" | "valid_landline" | "voip" | "invalid" | "unknown";
export type EmailStatus = "deliverable" | "undeliverable" | "risky" | "unknown";

export interface VerifyResult {
  phone: {
    status: PhoneStatus;
    line_type: string | null;
    carrier: string | null;
    e164: string | null;
  };
  email: { status: EmailStatus; domain: string | null };
  /** Lenient pre-filter: at least one reachable channel, nothing confirmed bad. */
  verify_pass: boolean;
  provider: string;
  raw: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Phone (Twilio Lookup v2) ─────────────────────────────────────────────────

async function lookupPhone(raw: string): Promise<VerifyResult["phone"] & { raw?: unknown }> {
  const e164 = toE164UK(raw);
  if (!e164) {
    return { status: "invalid", line_type: null, carrier: null, e164: null };
  }
  const creds = twilioAuth();
  if (!creds) {
    // Not configured -> we cannot verify; treat as unknown (fail-open).
    return { status: "unknown", line_type: null, carrier: null, e164 };
  }
  try {
    const auth = Buffer.from(`${creds.user}:${creds.pass}`).toString("base64");
    const res = await fetch(
      `https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(e164)}?Fields=line_type_intelligence`,
      { headers: { Authorization: `Basic ${auth}` }, cache: "no-store" },
    );
    if (!res.ok) {
      if (res.status === 404) {
        return { status: "invalid", line_type: null, carrier: null, e164 };
      }
      return { status: "unknown", line_type: null, carrier: null, e164 };
    }
    const data = (await res.json()) as {
      valid?: boolean;
      line_type_intelligence?: { type?: string; carrier_name?: string } | null;
    };
    if (data.valid === false) {
      return { status: "invalid", line_type: null, carrier: null, e164, raw: data };
    }
    const lti = data.line_type_intelligence || {};
    const type = (lti.type || "").toLowerCase();
    let status: PhoneStatus = "unknown";
    if (type === "mobile") status = "valid_mobile";
    else if (type === "landline" || type === "fixedvoip") status = "valid_landline";
    else if (type.includes("voip")) status = "voip"; // nonFixedVoip etc. -> risky
    else if (data.valid === true) status = "valid_landline"; // valid but untyped -> callable
    return {
      status,
      line_type: lti.type || null,
      carrier: lti.carrier_name || null,
      e164,
      raw: data,
    };
  } catch {
    return { status: "unknown", line_type: null, carrier: null, e164 };
  }
}

// ── Email (syntax + MX, optional API) ────────────────────────────────────────

async function checkEmail(email: string): Promise<VerifyResult["email"] & { raw?: unknown }> {
  const trimmed = (email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(trimmed)) return { status: "undeliverable", domain: null };
  const domain = trimmed.split("@")[1] || null;

  // Optional mailbox-level verification API (e.g. ZeroBounce).
  const apiKey = process.env.EMAIL_VERIFY_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch(
        `https://api.zerobounce.net/v2/validate?api_key=${encodeURIComponent(apiKey)}&email=${encodeURIComponent(trimmed)}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        const data = (await res.json()) as { status?: string };
        const s = (data.status || "").toLowerCase();
        let status: EmailStatus = "unknown";
        if (s === "valid") status = "deliverable";
        else if (s === "invalid") status = "undeliverable";
        else if (s === "catch-all" || s === "unknown" || s === "do_not_mail" || s === "spamtrap" || s === "abuse")
          status = "risky";
        return { status, domain, raw: data };
      }
    } catch {
      /* fall through to MX */
    }
  }

  // In-house MX check (free, catches dead domains + typos).
  if (!domain) return { status: "unknown", domain: null };
  try {
    const mx = await dns.resolveMx(domain);
    return { status: mx && mx.length > 0 ? "deliverable" : "undeliverable", domain };
  } catch {
    // NXDOMAIN / no MX -> undeliverable; transient DNS error -> unknown.
    return { status: "unknown", domain };
  }
}

// ── Combine ──────────────────────────────────────────────────────────────────

export function computePass(phone: PhoneStatus, email: EmailStatus): boolean {
  const phoneOk = phone === "valid_mobile" || phone === "valid_landline";
  const phoneBad = phone === "invalid";
  const emailOk = email === "deliverable";
  const emailBad = email === "undeliverable";
  if (phoneBad && emailBad) return false; // both confirmed bad -> junk
  if (phoneOk || emailOk) return true; // at least one confirmed good
  return true; // unknowns -> fail-open; the response gate decides
}

export async function verifyLead(input: { email: string; phone: string }): Promise<VerifyResult> {
  const [phone, email] = await Promise.all([lookupPhone(input.phone), checkEmail(input.email)]);
  const provider = [
    twilioAuth() ? "twilio" : "mx-only",
    process.env.EMAIL_VERIFY_API_KEY ? "zerobounce" : "mx",
  ].join("+");
  return {
    phone: { status: phone.status, line_type: phone.line_type, carrier: phone.carrier, e164: phone.e164 },
    email: { status: email.status, domain: email.domain },
    verify_pass: computePass(phone.status, email.status),
    provider,
    raw: { phone: (phone as { raw?: unknown }).raw ?? null, email: (email as { raw?: unknown }).raw ?? null },
  };
}
