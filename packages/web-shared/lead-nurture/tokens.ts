/**
 * Stateless HMAC-signed tokens for lead one-tap confirm and opt-out links.
 * Same construction as ../nurture/tokens.ts, but the payload is keyed on the
 * lead id (not email) and carries lead-specific intents.
 *
 * Token format: base64url(payload).base64url(sig)
 * Payload JSON: { l, i, x } where
 *   l = lead id (uuid)
 *   i = intent ("confirm" | "optout" | "book")
 *   x = expiry (unix seconds)
 *
 * The confirm link proves a human acted (a contactability signal); the opt-out
 * link honours withdrawal. Keep LEAD_NURTURE_TOKEN_SECRET server-side only.
 * Rotating it invalidates in-flight tokens (acceptable: confirm TTL = 14 days,
 * matching the cadence length; opt-out = 1 year).
 */

import crypto from "crypto";

export type LeadTokenIntent = "confirm" | "optout" | "book";

type Payload = { l: string; i: LeadTokenIntent; x: number };

export function getLeadTokenSecret(): string {
  const s = process.env.LEAD_NURTURE_TOKEN_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "LEAD_NURTURE_TOKEN_SECRET must be set to a 32+ character secret",
    );
  }
  return s;
}

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function sign(payload: Buffer, secret: string): Buffer {
  return crypto.createHmac("sha256", secret).update(payload).digest();
}

const CONFIRM_TTL_SECONDS = 14 * 24 * 60 * 60; // 14 days (cadence length)
const OPTOUT_TTL_SECONDS = 365 * 24 * 60 * 60; // 1 year

export function mintLeadToken(leadId: string, intent: LeadTokenIntent): string {
  const secret = getLeadTokenSecret();
  // confirm + book live as long as the chase cadence; opt-out links last a year.
  const ttl = intent === "optout" ? OPTOUT_TTL_SECONDS : CONFIRM_TTL_SECONDS;
  const payload: Payload = {
    l: leadId,
    i: intent,
    x: Math.floor(Date.now() / 1000) + ttl,
  };
  const body = Buffer.from(JSON.stringify(payload));
  const sig = sign(body, secret);
  return `${base64url(body)}.${base64url(sig)}`;
}

export type LeadTokenVerifyResult =
  | { ok: true; leadId: string; intent: LeadTokenIntent }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" | "wrong-intent" };

export function verifyLeadToken(
  token: string,
  expectedIntent: LeadTokenIntent,
): LeadTokenVerifyResult {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return { ok: false, reason: "malformed" };
  }
  const [bodyB64, sigB64] = token.split(".", 2);
  let body: Buffer;
  let sig: Buffer;
  try {
    body = base64urlDecode(bodyB64);
    sig = base64urlDecode(sigB64);
  } catch {
    return { ok: false, reason: "malformed" };
  }

  let secret: string;
  try {
    secret = getLeadTokenSecret();
  } catch {
    return { ok: false, reason: "bad-signature" };
  }

  const expectedSig = sign(body, secret);
  if (sig.length !== expectedSig.length || !crypto.timingSafeEqual(sig, expectedSig)) {
    return { ok: false, reason: "bad-signature" };
  }

  let payload: Payload;
  try {
    payload = JSON.parse(body.toString("utf8")) as Payload;
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (payload.i !== expectedIntent) {
    return { ok: false, reason: "wrong-intent" };
  }
  if (typeof payload.x !== "number" || payload.x < Math.floor(Date.now() / 1000)) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true, leadId: payload.l, intent: payload.i };
}
