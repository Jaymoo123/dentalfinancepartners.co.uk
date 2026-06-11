/**
 * Shared subscribe handler factory: creates a subscriber row, records
 * marketing consent (LD-09), and optionally sends the welcome email.
 *
 * Double opt-in is supported: when NURTURE_TOKEN_SECRET is set the handler
 * returns { mode: "confirm-required" } after sending a confirmation email
 * instead of immediately activating the subscriber.
 *
 * EN-04 dormancy: pass cronSecretEnvVar to the factory; when that env var is
 * unset the welcome email is NOT sent immediately (the cron handles it on its
 * first run after the operator arms the engine). Opt-ins are always recorded.
 *
 * LD-09: consent_given/text/at are captured on the subscriber row from the
 * explicit opt-in request body. They are never inferred from lead-enquiry or
 * analytics consent.
 *
 * PF-07: site_key and all identity fields come from NurtureConfig.
 *
 * SEC-05: the caller (API route) checks adminConfigured() and returns 503
 * before calling this function when Supabase is not configured.
 */

import { adminSelect, adminInsert, adminUpdate } from "./admin";
import { mintNurtureToken } from "./tokens";
import { processStep } from "./send";
import type { NurtureConfig } from "./config";
import type { EmailProvider } from "./send";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SubscribeInput {
  email: string;
  /** Must be explicitly true; never inferred (LD-09). */
  consent: boolean;
  /** Verbatim disclosure text the user accepted. */
  consentText?: string;
  visitorId?: string;
  topic?: string;
  source?: string;
  /** Honeypot field — non-empty means bot; caller should check and skip. */
  honeypot?: string;
}

export type SubscribeResult =
  | { ok: true; mode: "opt-in-recorded" | "confirm-required" | "reactivated" }
  | { ok: false; error: "bad_email" | "consent_required" | "insert_failed" };

type SubRow = { id: string; status?: string; unsubscribe_token: string };

/**
 * Record an opt-in.
 *
 * @param input       Validated form input (caller strips honeypot before calling).
 * @param config      Site-specific nurture config.
 * @param provider    Email provider (pass a no-op mock in tests to satisfy EN-04).
 * @param sendConfirmEmail   If true, send a double-opt-in confirmation email instead
 *                           of activating immediately. Requires NURTURE_TOKEN_SECRET.
 * @param cronArmed   Pass `Boolean(process.env.YOUR_CRON_SECRET_ENV)` — when true
 *                    the welcome email is sent immediately (step 0). EN-04.
 */
export async function handleSubscribe(
  input: SubscribeInput,
  config: NurtureConfig,
  provider: EmailProvider,
  sendConfirmEmail: (email: string, confirmUrl: string) => Promise<void>,
  cronArmed: boolean,
): Promise<SubscribeResult> {
  const email = (input.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: "bad_email" };
  }
  if (input.consent !== true) {
    return { ok: false, error: "consent_required" };
  }

  const nowIso = new Date().toISOString();
  const consentText =
    (input.consentText ?? "").slice(0, 500) || config.defaultConsentText;
  const visitorId = (input.visitorId ?? "").slice(0, 64) || null;
  const topic = (input.topic ?? "").slice(0, 64) || null;
  const source = ((input.source ?? "subscribe_form").slice(0, 64)) || "subscribe_form";

  // Check for existing subscriber (case-insensitive via the UNIQUE index on lower(email)).
  const existing = await adminSelect<SubRow>("subscribers", {
    select: "id,status,unsubscribe_token",
    site_key: `eq.${config.siteKey}`,
    email: `eq.${email}`,
    limit: "1",
  });

  let sub: { id: string; unsubscribe_token: string } | null = null;

  if (existing.ok && existing.data.length) {
    // Re-activate and refresh consent.
    const row = existing.data[0];
    const upd = await adminUpdate<SubRow>(
      "subscribers",
      { id: `eq.${row.id}` },
      {
        status: "active",
        consent_given: true,
        consent_text: consentText,
        consent_at: nowIso,
        visitor_id: visitorId,
        entry_topic: topic,
        source,
        updated_at: nowIso,
      },
    );
    const r = upd.data[0] ?? row;
    sub = { id: r.id, unsubscribe_token: r.unsubscribe_token };

    // (Re)start schedule at step 0 due now.
    await adminInsert(
      "nurture_state",
      {
        subscriber_id: sub.id,
        sequence: config.sequenceName,
        step: 0,
        status: "active",
        next_send_at: nowIso,
        updated_at: nowIso,
      },
      { onConflict: "subscriber_id,sequence" },
    );

    if (cronArmed) {
      try {
        await processStep(
          { id: sub.id, email, unsubscribe_token: sub.unsubscribe_token },
          0,
          config,
          provider,
        );
      } catch (err) {
        console.error("[nurture/subscribe] welcome send failed (reactivation)", err);
      }
    }
    return { ok: true, mode: "reactivated" };
  }

  // New subscriber — insert with status "pending" (double opt-in) or "active"
  // (single opt-in, no NURTURE_TOKEN_SECRET).
  const doubleOptIn = Boolean(process.env.NURTURE_TOKEN_SECRET);
  const initialStatus = doubleOptIn ? "pending" : "active";

  const ins = await adminInsert<SubRow>("subscribers", {
    site_key: config.siteKey,
    email,
    status: initialStatus,
    consent_given: true,
    consent_text: consentText,
    consent_at: nowIso,
    visitor_id: visitorId,
    entry_topic: topic,
    source,
  });
  if (!ins.ok || !ins.data.length) {
    return { ok: false, error: "insert_failed" };
  }
  sub = { id: ins.data[0].id, unsubscribe_token: ins.data[0].unsubscribe_token };

  if (doubleOptIn) {
    // Send confirmation email; do NOT start the drip yet.
    const token = mintNurtureToken(email, "confirm");
    const base = config.siteUrl.replace(/\/$/, "");
    const confirmUrl = `${base}/api/nurture/confirm/${encodeURIComponent(token)}`;
    try {
      await sendConfirmEmail(email, confirmUrl);
    } catch (err) {
      console.error("[nurture/subscribe] confirm email send failed", err);
      // Opt-in row is recorded; user can retry confirmation.
    }
    return { ok: true, mode: "confirm-required" };
  }

  // Single opt-in: start schedule and optionally send welcome now.
  await adminInsert(
    "nurture_state",
    {
      subscriber_id: sub.id,
      sequence: config.sequenceName,
      step: 0,
      status: "active",
      next_send_at: nowIso,
      updated_at: nowIso,
    },
    { onConflict: "subscriber_id,sequence" },
  );

  if (cronArmed) {
    try {
      await processStep(
        { id: sub.id, email, unsubscribe_token: sub.unsubscribe_token },
        0,
        config,
        provider,
      );
    } catch (err) {
      console.error("[nurture/subscribe] welcome send failed", err);
    }
  }

  return { ok: true, mode: "opt-in-recorded" };
}

/**
 * Activate a pending subscriber after they click the double-opt-in confirm link.
 * Returns "not_found" if the email doesn't exist or is already in a terminal state.
 */
export async function confirmSubscriber(
  email: string,
  config: NurtureConfig,
  provider: EmailProvider,
  cronArmed: boolean,
): Promise<"activated" | "already_active" | "not_found"> {
  const nowIso = new Date().toISOString();

  const existing = await adminSelect<SubRow & { status: string }>("subscribers", {
    select: "id,status,unsubscribe_token",
    site_key: `eq.${config.siteKey}`,
    email: `eq.${email}`,
    limit: "1",
  });

  if (!existing.ok || !existing.data.length) return "not_found";
  const row = existing.data[0];

  if (row.status === "active") return "already_active";
  if (row.status === "bounced" || row.status === "complained") return "not_found";

  // Activate: set status + confirmed_at.
  await adminUpdate<SubRow>(
    "subscribers",
    { id: `eq.${row.id}` },
    {
      status: "active",
      confirmed_at: nowIso,
      updated_at: nowIso,
    },
  );

  // Start the drip.
  await adminInsert(
    "nurture_state",
    {
      subscriber_id: row.id,
      sequence: config.sequenceName,
      step: 0,
      status: "active",
      next_send_at: nowIso,
      updated_at: nowIso,
    },
    { onConflict: "subscriber_id,sequence" },
  );

  if (cronArmed) {
    try {
      await processStep(
        { id: row.id, email, unsubscribe_token: row.unsubscribe_token },
        0,
        config,
        provider,
      );
    } catch (err) {
      console.error("[nurture/subscribe] welcome send failed (confirm)", err);
    }
  }

  return "activated";
}

/**
 * Unsubscribe a subscriber by their token string (already decoded to email
 * by the route after verifyNurtureToken).
 */
export async function unsubscribeByEmail(
  email: string,
  config: NurtureConfig,
): Promise<"ok" | "not_found"> {
  const nowIso = new Date().toISOString();

  const existing = await adminSelect<SubRow>("subscribers", {
    select: "id,unsubscribe_token",
    site_key: `eq.${config.siteKey}`,
    email: `eq.${email}`,
    limit: "1",
  });

  if (!existing.ok || !existing.data.length) return "not_found";
  const row = existing.data[0];

  await adminUpdate("subscribers", { id: `eq.${row.id}` }, {
    status: "unsubscribed",
    updated_at: nowIso,
  });
  // Pause all sequences for this subscriber.
  await adminUpdate(
    "nurture_state",
    { subscriber_id: `eq.${row.id}` },
    { status: "paused", updated_at: nowIso },
  );

  return "ok";
}
