/**
 * One-click unsubscribe route (RFC 8058) — GAP-5 adoption, mirrors generalist.
 *
 * Handles both GET (link click) and POST (one-click from email client).
 * Verifies the stateless HMAC token and marks the subscriber unsubscribed.
 *
 * Replaces the old /api/newsletter/unsubscribe/[token] fork route. Token
 * moves from a path segment to the ?token= query param (the shared engine's
 * unsubscribeUrl() contract); links minted by the old fork die with the old
 * NEWSLETTER_TOKEN_SECRET regardless, so there is no in-flight-link break
 * beyond the secret rotation already implied by the re-point.
 *
 * SEC-05: returns 503 when Supabase is unconfigured.
 */

import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured } from "@accounting-network/web-shared/nurture/admin";
import { verifyNurtureToken } from "@accounting-network/web-shared/nurture/tokens";
import { unsubscribeByEmail } from "@accounting-network/web-shared/nurture/subscribe";
import { buildAgencyNurtureConfig } from "@/config/nurture";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let config;
  try {
    config = buildAgencyNurtureConfig();
  } catch (err) {
    console.error("[nurture/unsubscribe] config error (EN-06)", err);
    return NextResponse.json({ ok: false, error: "config_error" }, { status: 503 });
  }

  const base = config.siteUrl.replace(/\/$/, "");

  // Token is in the query string: ?token=<token>
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const result = verifyNurtureToken(token, "unsubscribe");

  if (!result.ok) {
    return NextResponse.redirect(
      `${base}/newsletter/unsubscribed?error=${encodeURIComponent(result.reason)}`,
      303,
    );
  }

  await unsubscribeByEmail(result.email, config);

  return NextResponse.redirect(`${base}/newsletter/unsubscribed`, 303);
}

export async function GET(req: NextRequest) {
  return handle(req);
}

// RFC 8058: email clients send a POST for one-click unsubscribe.
export async function POST(req: NextRequest) {
  return handle(req);
}
