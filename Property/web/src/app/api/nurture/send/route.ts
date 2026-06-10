/**
 * Nurture drip scheduler — driven by Vercel Cron (see vercel.json).
 *
 * Reads the nurture_state rows that are due (active, next_send_at <= now) with an
 * active subscriber, sends each due step via Resend, and advances the schedule.
 * Idempotent per step (see lib/nurture/send). Refuses to run unless CRON_SECRET
 * is set and matches, so it can never be triggered anonymously.
 */
import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured, adminSelect } from "@/lib/supabase/admin";
import { processStep } from "@/lib/nurture/send";
import { NURTURE_SEQUENCE_NAME } from "@/lib/nurture/sequence";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const BATCH = 50;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // unconfigured = refuse (never send anonymously)
  // Vercel Cron sends Authorization: Bearer <CRON_SECRET>.
  if (req.headers.get("authorization") === `Bearer ${secret}`) return true;
  // Manual trigger for testing.
  return new URL(req.url).searchParams.get("key") === secret;
}

type DueRow = {
  subscriber_id: string;
  step: number;
  subscribers: { id: string; email: string; unsubscribe_token: string; status: string } | null;
};

async function run(req: NextRequest): Promise<NextResponse> {
  if (!adminConfigured()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  if (!authorized(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const nowIso = new Date().toISOString();
  const due = await adminSelect<DueRow>("nurture_state", {
    select: "subscriber_id,step,subscribers!inner(id,email,unsubscribe_token,status)",
    sequence: `eq.${NURTURE_SEQUENCE_NAME}`,
    status: "eq.active",
    next_send_at: `lte.${nowIso}`,
    "subscribers.status": "eq.active",
    order: "next_send_at.asc",
    limit: String(BATCH),
  });

  let processed = 0;
  let sent = 0;
  for (const row of due.data) {
    const s = row.subscribers;
    if (!s) continue;
    processed++;
    try {
      const ok = await processStep(
        { id: s.id, email: s.email, unsubscribe_token: s.unsubscribe_token },
        row.step,
      );
      if (ok) sent++;
    } catch (err) {
      console.error("[nurture/send] step failed", err);
    }
  }

  return NextResponse.json({ ok: true, processed, sent });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
