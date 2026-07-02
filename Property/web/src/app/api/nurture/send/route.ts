/**
 * Property nurture drip scheduler, driven by Vercel Cron (see vercel.json).
 *
 * Delegates to the shared runNurtureCron engine, which uses claim-before-send
 * idempotency (EN-05) and skips all sends when cronArmed=false (EN-04).
 *
 * vercel.json cron: { "path": "/api/nurture/send", "schedule": "0 9 * * *" }
 *
 * EN-04 dormancy: CRON_SECRET unset -> returns 401 (cannot authorize). Even
 * when authorized, the drip stays PARKED unless SUBSCRIBER_NURTURE_ENABLED is
 * also set (GAP-1): CRON_SECRET is shared with the lead-nurture cron, so the
 * newsletter must not ride on it. No subscriber email leaves until BOTH the
 * secret and the dedicated flag are set.
 *
 * SEC-05:
 *   - Returns 503 when Supabase is unconfigured.
 *   - Returns 401 when CRON_SECRET is unset (cannot authorize).
 *   - Timing-safe comparison for the bearer token.
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured } from "@accounting-network/web-shared/nurture/admin";
import { runNurtureCron } from "@accounting-network/web-shared/nurture/cron";
import { buildPropertyNurtureConfig } from "@/config/nurture";
import { buildResendProvider } from "@/lib/nurture-provider";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // SEC-05: if secret is unset, refuse.
  if (!secret) return false;

  // Timing-safe comparison (SEC-05).
  const authHeader = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  try {
    const a = Buffer.from(authHeader.padEnd(512, "\0"), "utf8");
    const b = Buffer.from(expected.padEnd(512, "\0"), "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

async function run(req: NextRequest): Promise<NextResponse> {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let config;
  try {
    config = buildPropertyNurtureConfig();
  } catch (err) {
    console.error("[nurture/send] config error (EN-06)", err);
    return NextResponse.json({ ok: false, error: "config_error" }, { status: 503 });
  }

  const provider = buildResendProvider();
  // GAP-1: the subscriber marketing drip must NOT arm on CRON_SECRET alone.
  // CRON_SECRET was set for the lead-nurture go-live, which silently un-parked
  // this legacy drip (it shares the sending domain but sits outside the lead
  // kill-switch / guardrails / digest). It now also requires a DEDICATED flag,
  // default OFF, so the newsletter stays parked until deliberately activated.
  const newsletterArmed =
    process.env.SUBSCRIBER_NURTURE_ENABLED === "1" ||
    process.env.SUBSCRIBER_NURTURE_ENABLED === "true";
  const cronArmed = Boolean(process.env.CRON_SECRET) && newsletterArmed;

  const result = await runNurtureCron(config, provider, cronArmed);
  return NextResponse.json({ ok: true, ...result });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
