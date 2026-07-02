/**
 * Lead-nurture cron: fires due follow-up steps for leads that have not yet
 * responded. Driven by Vercel Cron (hourly) so the cadence can hit UK contact
 * windows. The instant step 0 is NOT fired here (the submit route does that);
 * this only advances the later touches.
 *
 * Dormancy (two layers):
 *   - Auth: CRON_SECRET must match (bearer), or 401. The endpoint is unreachable
 *     without it.
 *   - Master arm: cronArmed = LEAD_NURTURE_ENABLED. Until that is set, the run
 *     short-circuits with zero processing, so no lead is ever advanced toward
 *     'unreachable' while the system is dormant. Per-channel flags gate the
 *     actual provider calls inside the sender.
 *
 * vercel.json cron: { "path": "/api/cron/lead-nurture", "schedule": "0 * * * *" }
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured } from "@/lib/supabase/admin";
import { runLeadNurtureCron } from "@accounting-network/web-shared/lead-nurture/cron";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";
import { buildPropertyLeadNurtureConfig, buildLeadMessageContext } from "@/config/lead-nurture";
import { buildLeadChannelSender, leadNurtureArmed } from "@/lib/leads/channels";
import { runLeadAuxScans } from "@/lib/leads/aux-cron";
import { isNurturePaused, recordCronHeartbeat } from "@/lib/leads/nurture-control";
import { runNurtureGuardrails } from "@/lib/leads/nurture-health";

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

  // Heartbeat: stamp last_cron_run_at on every authorised tick, even when
  // paused or dormant, so the dashboard can confirm the cron is alive.
  // Best-effort: never blocks or fails the run.
  try {
    await recordCronHeartbeat();
  } catch (err) {
    console.error("[lead-nurture-cron] heartbeat write failed", err);
  }

  const config = buildPropertyLeadNurtureConfig();
  // Per-lead sender: a real lead gets the live sender; a source='test' lead gets
  // a skip-only sender so a synthetic probe never messages a real provider from
  // the cron path (ENG-02). Mirrors the submit route's { live: !isTest }.
  const senderForLead = (lead: NurtureLead) =>
    buildLeadChannelSender({ live: lead.source !== "test" });
  // Master arm: nothing is processed (or advanced) until LEAD_NURTURE_ENABLED.
  const cronArmed = leadNurtureArmed();
  // DB-pause gate: a kill-switch in the database halts processing even when
  // the env flag is on. Alerting still runs (see guardrail call below).
  const dbPaused = await isNurturePaused();
  const effectiveArmed = cronArmed && !dbPaused;

  const result = await runLeadNurtureCron(
    config,
    senderForLead,
    (lead, state) => buildLeadMessageContext(lead, state),
    effectiveArmed,
  );
  const aux = effectiveArmed ? await runLeadAuxScans() : { reminders: 0, nudges: 0 };

  // Guardrail scan: fires whenever env-armed, regardless of dbPaused, so
  // operator alerts continue even while the system is paused.
  let guard: Awaited<ReturnType<typeof runNurtureGuardrails>> | null = null;
  if (cronArmed) {
    try {
      guard = await runNurtureGuardrails({
        autopauseEnabled:
          process.env.LEAD_NURTURE_AUTOPAUSE_ENABLED === "1" ||
          process.env.LEAD_NURTURE_AUTOPAUSE_ENABLED === "true",
      });
    } catch (err) {
      console.error("[lead-nurture-cron] guardrail scan failed", err);
    }
  }

  return NextResponse.json({ ok: true, armed: cronArmed, dbPaused, ...result, aux, guard });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
