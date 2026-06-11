/**
 * Resend webhook sink for nurture-email engagement events
 * (GAP-5 adoption — mirrors generalist).
 *
 * Replaces the old /api/resend/webhook fork route. Same Svix signature
 * verification, but the secret moves from RESEND_WEBHOOK_SECRET to
 * NURTURE_WEBHOOK_SECRET (shared engine env contract) and status updates
 * land on the shared subscribers/nurture_sends tables instead of the
 * legacy newsletter_subscribers fork table.
 *
 * Configure in Resend dashboard:
 *   Endpoint URL: https://www.agencyfounderfinance.co.uk/api/nurture/events
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

  let evt: unknown;
  try {
    evt = JSON.parse(body);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  await handleResendEvent(evt as Parameters<typeof handleResendEvent>[0]);

  return NextResponse.json({ ok: true });
}
