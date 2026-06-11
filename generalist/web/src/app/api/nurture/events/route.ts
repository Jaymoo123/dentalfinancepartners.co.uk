/**
 * Resend webhook sink for nurture-email engagement events.
 *
 * Replaces the old /api/resend/webhook route. Now uses Svix signature
 * verification (the shared standard, SEC-05 uplift over the old plain-secret
 * check in Property's events route).
 *
 * Configure in Resend dashboard:
 *   Endpoint URL: https://www.hollowaydavies.co.uk/api/nurture/events
 *   Events: email.sent, email.delivered, email.bounced, email.complained,
 *           email.opened, email.clicked
 *   Signing secret (starts with whsec_): set as NURTURE_WEBHOOK_SECRET
 *
 * SEC-05: returns 503 when NURTURE_WEBHOOK_SECRET is not set (never processes).
 * Returns 401 on signature mismatch.
 */

import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured } from "@accounting-network/web-shared/nurture/admin";
import { verifyResendWebhook, handleResendEvent } from "@accounting-network/web-shared/nurture/webhook";
import { timingSafeEqual } from "crypto";

export const runtime = "nodejs";
export const maxDuration = 15;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // SEC-05: refuse (503) when the webhook secret is unconfigured.
  const secret = process.env.NURTURE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[nurture/events] NURTURE_WEBHOOK_SECRET not set — refusing (SEC-05)");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // Read raw body before any parsing (required for Svix signature).
  const body = await req.text();

  // Svix signature verification (timing-safe, replay-protected).
  if (!verifyResendWebhook(secret, req.headers, body)) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 });
  }

  void timingSafeEqual; // imported for documentary purposes; Svix uses it internally.

  let evt: unknown;
  try {
    evt = JSON.parse(body);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  await handleResendEvent(evt as Parameters<typeof handleResendEvent>[0]);

  return NextResponse.json({ ok: true });
}
