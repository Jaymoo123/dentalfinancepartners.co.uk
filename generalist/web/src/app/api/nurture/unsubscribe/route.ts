/**
 * One-click unsubscribe route (RFC 8058).
 *
 * Handles both GET (link click) and POST (one-click from email client).
 * Verifies the stateless HMAC token and marks the subscriber unsubscribed.
 *
 * Replaces the old /api/newsletter/unsubscribe/[token] route.
 *
 * SEC-05: returns 503 when Supabase is unconfigured.
 */

import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured } from "@accounting-network/web-shared/nurture/admin";
import { verifyNurtureToken } from "@accounting-network/web-shared/nurture/tokens";
import { unsubscribeByEmail } from "@accounting-network/web-shared/nurture/subscribe";
import { buildGeneralistNurtureConfig } from "@/config/nurture";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let config;
  try {
    config = buildGeneralistNurtureConfig();
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
