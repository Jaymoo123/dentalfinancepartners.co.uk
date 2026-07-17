/**
 * Dentists daily lead-nurture digest cron: fires at 07:00 UTC and sends a
 * plain-text operator summary. Quiet on dormant days.
 *
 * Auth pattern mirrors /api/cron/lead-nurture exactly (CRON_SECRET bearer,
 * timing-safe comparison).
 *
 * Dormancy: short-circuits with ok:true, sent:false when LEAD_NURTURE_ENABLED
 * is not set.
 *
 * vercel.json cron: { "path": "/api/cron/lead-nurture-digest", "schedule": "0 7 * * *" }
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured } from "@/lib/supabase/admin";
import { leadNurtureArmed } from "@/lib/leads/channels";
import { runNurtureDigest } from "@/lib/leads/nurture-digest";
import { recordDigestHeartbeat } from "@/lib/leads/nurture-control";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
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

  try {
    await recordDigestHeartbeat();
  } catch (err) {
    console.error("[lead-nurture-digest/dentists] heartbeat write failed", err);
  }

  if (!leadNurtureArmed()) {
    return NextResponse.json({ ok: true, sent: false });
  }

  try {
    const r = await runNurtureDigest();
    return NextResponse.json({ ok: true, sent: r.sent });
  } catch (err) {
    console.error("[lead-nurture-digest/dentists] unexpected error", err);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
