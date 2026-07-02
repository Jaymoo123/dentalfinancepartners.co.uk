/**
 * Lead data retention cron: anonymises Property leads whose PII has exceeded
 * the configured retention window. Runs daily at 03:30 UTC (quiet period,
 * outside any send window).
 *
 * Dormancy (two layers):
 *   - Auth: CRON_SECRET bearer token must match, or 401. The endpoint is
 *     unreachable from the open web without it.
 *   - Master arm: dryRun is TRUE unless LEAD_RETENTION_PURGE_ENABLED is set
 *     to "1" or "true". Until then the run returns candidates:N, anonymised:0
 *     and performs no mutations, so the operator can verify the candidate
 *     count before arming.
 *
 * vercel.json cron: { "path": "/api/cron/lead-retention", "schedule": "30 3 * * *" }
 *
 * House style: no em-dashes. British English. Never throws.
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured } from "@/lib/supabase/admin";
import { runLeadRetentionPurge } from "@/lib/leads/retention";

export const runtime = "nodejs";
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

  // DRY-RUN unless the operator has explicitly armed the purge.
  const dryRun = !(
    process.env.LEAD_RETENTION_PURGE_ENABLED === "1" ||
    process.env.LEAD_RETENTION_PURGE_ENABLED === "true"
  );

  const result = await runLeadRetentionPurge({ dryRun });

  return NextResponse.json({ ok: true, ...result });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
