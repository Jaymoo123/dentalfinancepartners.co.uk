/**
 * Shared lead-nurture enrolment for Medical Accountants UK.
 *
 * Extracted from the submit route so the submit chokepoint, any internal
 * retro-enrol route, and the reconciliation safety-net all enrol through ONE
 * idempotent, arming-aware, sequence-aware code path.
 *
 * It picks the primary sequence from the lead's missing contact fields (unless
 * an explicit sequenceName is passed), fires the instant touch (or, with
 * deferFirstTouch:true, schedules it for the next send window without firing it
 * now), and reports whether this was a brand-new enrolment.
 *
 * deferFirstTouch:
 *   When false (default, used by the submit route): step 0 fires immediately.
 *   When true (used by lead-reconcile): the state row is inserted with
 *   next_action_at set to the next send-window open time for step 0. The hourly
 *   cron will fire step 0 when the window opens.
 */
import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { buildLeadChannelSender, leadNurtureArmed } from "@/lib/leads/channels";
import {
  buildMedicalLeadNurtureConfig,
  buildLeadMessageContext,
  routePrimarySequence,
  LEAD_SEQUENCE_NAMES,
} from "@/config/lead-nurture";
import { bestHourFromTimestamps, computeNextSendMs } from "@/lib/leads/send-window";
import { processLeadStep } from "@accounting-network/web-shared/lead-nurture/send";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";

export interface EnrollLeadOptions {
  sequenceName?: string;
  live?: boolean;
  visitorId?: string | null;
  bestSendHour?: number | null;
  deferFirstTouch?: boolean;
}

export interface EnrollLeadResult {
  enrolled: boolean;
  newlyEnrolled: boolean;
  sequenceName: string;
  reason?: string;
}

async function deriveBestSendHour(visitorId: string | null | undefined): Promise<number | null> {
  if (!visitorId) return null;
  try {
    const sessRes = await adminSelect<{ started_at: string }>("web_sessions", {
      select: "started_at",
      visitor_id: `eq.${visitorId}`,
      order: "started_at.desc",
      limit: "50",
    });
    const timestamps = sessRes.data.map((r) => r.started_at).filter(Boolean);
    return bestHourFromTimestamps(timestamps);
  } catch {
    return null;
  }
}

export async function enrollLead(
  lead: NurtureLead,
  opts: EnrollLeadOptions = {},
): Promise<EnrollLeadResult> {
  const sequenceName = opts.sequenceName ?? routePrimarySequence(lead);

  if (!leadNurtureArmed()) {
    return { enrolled: false, newlyEnrolled: false, sequenceName, reason: "dormant" };
  }

  const live = opts.live ?? lead.source !== "test";
  const bestSendHour = opts.bestSendHour ?? (await deriveBestSendHour(opts.visitorId));
  const nowMs = Date.now();

  const deferFirstTouch = opts.deferFirstTouch ?? false;

  let deferredNextActionAt: string | null = null;
  if (deferFirstTouch) {
    const variant =
      sequenceName === LEAD_SEQUENCE_NAMES.detail_capture ? "detail_capture" : "contactability";
    const config = buildMedicalLeadNurtureConfig(variant);
    const step0 = config.steps[0];
    const hasSms = step0
      ? (step0.channels ?? []).some((ch: string) => ch === "sms" || ch === "whatsapp")
      : false;
    const preferMonday = step0 ? (step0.preferMonday ?? false) : false;
    const nextWindowMs = computeNextSendMs(nowMs, 0, {
      hasSms,
      bestSendHour,
      preferMonday,
    });
    deferredNextActionAt = new Date(nextWindowMs).toISOString();
  }

  const nowIso = new Date(nowMs).toISOString();

  const enrol = await adminInsert<{ lead_id: string }>(
    "lead_nurture_state",
    {
      lead_id: lead.id,
      sequence: sequenceName,
      step: 0,
      status: "active",
      next_action_at: deferredNextActionAt ?? nowIso,
      ...(bestSendHour !== null ? { best_send_hour: bestSendHour } : {}),
    },
    { onConflict: "lead_id,sequence", ignoreDuplicates: true },
  );
  const newlyEnrolled = enrol.ok && enrol.data.length > 0;
  if (!newlyEnrolled) {
    return { enrolled: true, newlyEnrolled: false, sequenceName };
  }

  await adminUpdate("leads", { id: `eq.${lead.id}`, status: "eq.new" }, { status: "nurturing" });

  if (deferFirstTouch) {
    return { enrolled: true, newlyEnrolled: true, sequenceName };
  }

  const variant =
    sequenceName === LEAD_SEQUENCE_NAMES.detail_capture ? "detail_capture" : "contactability";
  const config = buildMedicalLeadNurtureConfig(variant);
  const sender = buildLeadChannelSender({ live });
  const stateRow = {
    lead_id: lead.id,
    step: 0,
    generated_copy: null,
    copy_status: null,
    best_send_hour: bestSendHour,
  };
  const ctx = await buildLeadMessageContext(lead, stateRow);

  await processLeadStep(lead, 0, config, sender, ctx);
  const step1 = config.steps[1];
  if (step1 && (step1.delayHours ?? 0) === 0) {
    await processLeadStep(lead, 1, config, sender, ctx);
  }

  return { enrolled: true, newlyEnrolled: true, sequenceName };
}
