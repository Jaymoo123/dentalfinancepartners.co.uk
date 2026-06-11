/**
 * Stateless HMAC-signed tokens for double opt-in confirmation and
 * one-click unsubscribe. Lifted from generalist/lib/newsletter/tokens.ts
 * and promoted to the shared engine (GAP-5).
 *
 * Token format: base64url(payload).base64url(sig)
 *
 * The payload is JSON: { e, i, x } where
 *   e = email (lowercased)
 *   i = intent ("confirm" | "unsubscribe")
 *   x = expiry (unix seconds)
 *
 * Anyone with NURTURE_TOKEN_SECRET can mint/verify tokens. Keep it
 * server-side only. Rotating the secret invalidates all in-flight tokens
 * (acceptable for newsletter intents; confirm TTL = 7 days, unsub = 1 year).
 *
 * SEC-05: throws (rather than silently degrading) when the secret is absent
 * or too short, so callers cannot accidentally operate without auth.
 */

import crypto from "crypto";

export type NurtureTokenIntent = "confirm" | "unsubscribe";

type Payload = {
  e: string;
  i: NurtureTokenIntent;
  x: number;
};

export function getNurtureTokenSecret(): string {
  const s = process.env.NURTURE_TOKEN_SECRET;
  if (!s || s.length < 32) {
    throw new Error(
      "NURTURE_TOKEN_SECRET must be set to a 32+ character secret (SEC-05)",
    );
  }
  return s;
}

function base64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/=+$/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function sign(payload: Buffer, secret: string): Buffer {
  return crypto.createHmac("sha256", secret).update(payload).digest();
}

const CONFIRM_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days
const UNSUB_TTL_SECONDS = 365 * 24 * 60 * 60; // 1 year

export function mintNurtureToken(email: string, intent: NurtureTokenIntent): string {
  const secret = getNurtureTokenSecret();
  const ttl = intent === "confirm" ? CONFIRM_TTL_SECONDS : UNSUB_TTL_SECONDS;
  const payload: Payload = {
    e: email.trim().toLowerCase(),
    i: intent,
    x: Math.floor(Date.now() / 1000) + ttl,
  };
  const body = Buffer.from(JSON.stringify(payload));
  const sig = sign(body, secret);
  return `${base64url(body)}.${base64url(sig)}`;
}

export type NurtureTokenVerifyResult =
  | { ok: true; email: string; intent: NurtureTokenIntent }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" | "wrong-intent" };

export function verifyNurtureToken(
  token: string,
  expectedIntent: NurtureTokenIntent,
): NurtureTokenVerifyResult {
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
    secret = getNurtureTokenSecret();
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
  return { ok: true, email: payload.e, intent: payload.i };
}
