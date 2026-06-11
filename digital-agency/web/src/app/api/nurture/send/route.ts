/**
 * Nurture drip scheduler — driven by Vercel Cron (GAP-5 adoption, mirrors generalist).
 *
 * Replaces the old /api/cron/newsletter-drip fork route. Now delegates to the
 * shared runNurtureCron engine, which uses claim-before-send idempotency
 * (EN-05 — the old fork sent THEN advanced, so a failed advance re-sent the
 * same step on the next run) and skips all sends when cronArmed=false (EN-04).
 *
 * vercel.json points the daily cron at this route.
 *
 * ARMING POSTURE (operator decision at deploy, not in code): CRON_SECRET set
 * -> armed; unset -> this route returns 401 on every tick and zero emails
 * leave while opt-ins continue to be recorded.
 *
 * SEC-05:
 *   - Returns 503 when Supabase is unconfigured (never processes).
 *   - Returns 401 when CRON_SECRET is unset (cannot authorize).
 *   - Timing-safe comparison for the bearer token.
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured } from "@accounting-network/web-shared/nurture/admin";
import { runNurtureCron } from "@accounting-network/web-shared/nurture/cron";
import { buildAgencyNurtureConfig } from "@/config/nurture";
import { buildResendProvider } from "@/lib/nurture-provider";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // SEC-05: if secret is unset, refuse. Return false so route returns 401.
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
    config = buildAgencyNurtureConfig();
  } catch (err) {
    console.error("[nurture/send] config error (EN-06)", err);
    return NextResponse.json({ ok: false, error: "config_error" }, { status: 503 });
  }

  const provider = buildResendProvider();
  const cronArmed = Boolean(process.env.CRON_SECRET);

  const result = await runNurtureCron(config, provider, cronArmed);
  return NextResponse.json({ ok: true, ...result });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
