/**
 * Manual runner for the Lead Tracker handoff sync.
 *
 * Deliberately NOT on a schedule yet. This is the endpoint the owner and I drive
 * by hand during testing; wiring it into the hourly cron is part of arming, which
 * is a separate decision taken later.
 *
 * Dormancy, same two layers as the nurture cron plus one:
 *   - Auth: CRON_SECRET bearer, or 401.
 *   - Mode: LEAD_HANDOFF_MODE defaults to "report", which sends nothing.
 *   - Watermark: LEAD_HANDOFF_GO_LIVE_AT unset means nothing is actionable at all.
 *
 * GET  returns the configuration a run WOULD use, sending nothing and reading
 *      nothing, so the wiring can be checked before the sheet is touched.
 * POST performs a pass, subject to the mode above.
 */
import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured } from "@/lib/supabase/admin";
import { runTrackerSync } from "@/lib/leads/tracker-sync";
import {
  maxPerRun,
  operatorEmail,
  partnerEmail,
  partnerBcc,
  resolveMode,
} from "@/lib/leads/handoff-intro";

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

/** Health/config probe. Addresses are reported as set/unset, never echoed back. */
export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    mode: resolveMode(),
    goLiveAt: process.env.LEAD_HANDOFF_GO_LIVE_AT || null,
    tab: process.env.GOOGLE_SHEETS_TAB || "Leads",
    maxPerRun: maxPerRun(),
    operatorEmailSet: Boolean(operatorEmail()),
    partnerEmailSet: Boolean(partnerEmail()),
    bccSet: Boolean(partnerBcc()),
    adminConfigured: adminConfigured(),
  });
}

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const report = await runTrackerSync();
    return NextResponse.json({ ok: true, ...report });
  } catch (err) {
    console.error("[leads/tracker-sync] run failed", err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    );
  }
}
