/**
 * Svix-verified Resend events webhook handler (shared engine).
 *
 * Lifted from generalist/api/resend/webhook/route.ts (the GAP-8 fold-up).
 * The Svix signature verification pattern is adopted as THE shared standard
 * for Resend webhooks, replacing the plain-secret check used in Property's
 * events route (SEC-05 uplift).
 *
 * On bounce / complaint: the matching send-log row is updated AND the
 * subscriber status is set to bounced/complained so the cron never mails
 * them again. nurture_state is paused on complaint.
 *
 * SEC-05: the caller (route) returns 503 when NURTURE_WEBHOOK_SECRET is
 * unset BEFORE calling verifyResendWebhook.
 *
 * Usage from a Next.js route:
 *   const body = await req.text();
 *   if (!verifyResendWebhook(secret, req.headers, body)) return 401;
 *   await handleResendEvent(JSON.parse(body));
 */

import crypto from "crypto";
import { adminUpdate } from "./admin";

// ── Svix signature verification ───────────────────────────────────────────────

/**
 * Verify a Resend/Svix webhook signature.
 * Resend signs with Svix: header svix-id, svix-timestamp, svix-signature.
 * Secret format: "whsec_<base64-encoded key>".
 * Rejects events older than 5 minutes to prevent replay.
 */
export function verifyResendWebhook(
  secret: string,
  headers: Headers,
  body: string,
): boolean {
  const id = headers.get("svix-id");
  const ts = headers.get("svix-timestamp");
  const sig = headers.get("svix-signature");

  if (!id || !ts || !sig) return false;

  // Reject stale events (replay protection).
  const now = Math.floor(Date.now() / 1000);
  const tsNum = parseInt(ts, 10);
  if (!Number.isFinite(tsNum) || Math.abs(now - tsNum) > 5 * 60) return false;

  const cleanSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  let secretBytes: Buffer;
  try {
    secretBytes = Buffer.from(cleanSecret, "base64");
  } catch {
    return false;
  }

  const signedPayload = `${id}.${ts}.${body}`;
  const expectedSig = crypto
    .createHmac("sha256", secretBytes)
    .update(signedPayload)
    .digest("base64");

  // Header may carry multiple versioned signatures (e.g. "v1,sig1 v1,sig2").
  const candidates = sig
    .split(/\s+/)
    .map((s) => s.replace(/^v\d+,/, ""))
    .filter(Boolean);

  for (const candidate of candidates) {
    const candBuf = Buffer.from(candidate, "base64");
    const expBuf = Buffer.from(expectedSig, "base64");
    if (
      candBuf.length === expBuf.length &&
      crypto.timingSafeEqual(candBuf, expBuf)
    ) {
      return true;
    }
  }
  return false;
}

// ── Event handler ─────────────────────────────────────────────────────────────

export type ResendEventPayload = {
  type?: string;
  data?: {
    email_id?: string;
    to?: string | string[];
    [key: string]: unknown;
  };
};

/**
 * Process a verified Resend event payload.
 * Updates nurture_sends and subscriber status as needed.
 * email_id is the Resend message id stored in nurture_sends.resend_id.
 */
export async function handleResendEvent(evt: ResendEventPayload): Promise<void> {
  const emailId = evt.data?.email_id;
  const type = evt.type ?? "";
  if (!emailId) return;

  const nowIso = new Date().toISOString();
  const where = { resend_id: `eq.${emailId}` };

  if (type === "email.opened") {
    await adminUpdate("nurture_sends", where, { opened_at: nowIso });
  } else if (type === "email.clicked") {
    await adminUpdate("nurture_sends", where, { clicked_at: nowIso, opened_at: nowIso });
  } else if (type === "email.bounced") {
    const upd = await adminUpdate<{ subscriber_id: string }>("nurture_sends", where, {
      bounced_at: nowIso,
    });
    const subId = upd.data[0]?.subscriber_id;
    if (subId) {
      await adminUpdate("subscribers", { id: `eq.${subId}` }, {
        status: "bounced",
        updated_at: nowIso,
      });
    }
  } else if (type === "email.complained") {
    const upd = await adminUpdate<{ subscriber_id: string }>("nurture_sends", where, {
      complained_at: nowIso,
    });
    const subId = upd.data[0]?.subscriber_id;
    if (subId) {
      await adminUpdate("subscribers", { id: `eq.${subId}` }, {
        status: "complained",
        updated_at: nowIso,
      });
      await adminUpdate(
        "nurture_state",
        { subscriber_id: `eq.${subId}` },
        { status: "paused", updated_at: nowIso },
      );
    }
  }
}
