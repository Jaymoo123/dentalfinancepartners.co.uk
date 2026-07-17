/**
 * Lead-nurture cron for Medical Accountants UK: fires due follow-up
 * steps for leads that have not yet responded. Driven by Vercel Cron (hourly).
 *
 * Dormancy (two layers):
 *   - Auth: CRON_SECRET must match (bearer), or 401.
 *   - Master arm: cronArmed = LEAD_NURTURE_ENABLED. Until that is set, the run
 *     short-circuits with zero processing.
 *
 * vercel.json cron: { "path": "/api/cron/lead-nurture", "schedule": "0 * * * *" }
 */

import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured } from "@/lib/supabase/admin";
import { runLeadNurtureCron, type LeadCronResult } from "@accounting-network/web-shared/lead-nurture/cron";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";
import { buildMedicalLeadNurtureConfigs, buildLeadMessageContext } from "@/config/lead-nurture";
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

  try {
    await recordCronHeartbeat();
  } catch (err) {
    console.error("[lead-nurture-cron] heartbeat write failed", err);
  }

  const configs = buildMedicalLeadNurtureConfigs();
  const senderForLead = (lead: NurtureLead) =>
    buildLeadChannelSender({ live: lead.source !== "test" });
  const cronArmed = leadNurtureArmed();
  const dbPaused = await isNurturePaused();
  const effectiveArmed = cronArmed && !dbPaused;

  let processed = 0;
  let dispatched = 0;
  const perSequence: Record<string, LeadCronResult> = {};
  for (const config of configs) {
    const r = await runLeadNurtureCron(
      config,
      senderForLead,
      (lead, state) => buildLeadMessageContext(lead, state),
      effectiveArmed,
    );
    perSequence[config.sequenceName] = r;
    processed += r.processed;
    dispatched += r.dispatched;
  }
  const aux = effectiveArmed ? await runLeadAuxScans() : { reminders: 0, nudges: 0 };

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

  return NextResponse.json({ ok: true, armed: cronArmed, dbPaused, processed, dispatched, perSequence, aux, guard });
}

export async function GET(req: NextRequest) {
  return run(req);
}
export async function POST(req: NextRequest) {
  return run(req);
}
