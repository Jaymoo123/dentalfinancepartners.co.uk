/**
 * Shared lead-nurture enrolment. Extracted from the submit route so the submit
 * chokepoint, the internal retro-enrol route, and the reconciliation safety-net
 * all enrol through ONE idempotent, arming-aware, sequence-aware code path.
 *
 * It picks the primary sequence from the lead's missing contact fields (unless an
 * explicit sequenceName is passed), fires the instant touch (or, with
 * deferFirstTouch:true, schedules it for the next send window without firing it
 * now), and reports whether this was a brand-new enrolment so the caller can
 * (for contactability) kick the AI-copy job. Best-effort at the call sites:
 * enrolment must never lose a lead.
 *
 * deferFirstTouch:
 *   When false (default, used by the submit route): behaviour is bit-identical to
 *   the pre-deferral code. Step 0 fires immediately, step 1 fires if delayHours==0.
 *   When true (used by lead-reconcile): the state row is inserted with next_action_at
 *   set to the next send-window open time for step 0. processLeadStep is never
 *   called; the hourly lead-nurture cron will fire step 0 when the window opens.
 */
import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { buildLeadChannelSender, leadNurtureArmed } from "@/lib/leads/channels";
import {
  buildPropertyLeadNurtureConfig,
  buildLeadMessageContext,
  routePrimarySequence,
  LEAD_SEQUENCE_NAMES,
} from "@/config/lead-nurture";
import { bestHourFromTimestamps, computeNextSendMs } from "@/lib/leads/send-window";
import { processLeadStep } from "@accounting-network/web-shared/lead-nurture/send";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";

export interface EnrollLeadOptions {
  /** Sequence to enrol into. Defaults to routePrimarySequence(lead). */
  sequenceName?: string;
  /** Live sends vs test-skip. Defaults to lead.source !== "test". */
  live?: boolean;
  /** Visitor id, to derive the best send hour from prior web sessions. */
  visitorId?: string | null;
  /** Explicit best send hour (overrides the visitor-derived one). */
  bestSendHour?: number | null;
  /**
   * When true, the state row is inserted with next_action_at set to the next
   * send-window open time (computed for step 0's channel class) and
   * processLeadStep is never called. The hourly lead-nurture cron fires step 0
   * when the window opens. Used by lead-reconcile to avoid firing instant
   * touches at 04:30am. Default: false (submit path fires touches immediately).
   */
  deferFirstTouch?: boolean;
}

export interface EnrollLeadResult {
  /** True if the system is armed and enrolment was attempted. */
  enrolled: boolean;
  /**
   * True only when a NEW state row was inserted. With deferFirstTouch:false the
   * instant touch fired; with deferFirstTouch:true the touch is scheduled for
   * the next send window and will be fired by the hourly cron.
   */
  newlyEnrolled: boolean;
  /** The sequence the lead is (now) enrolled into. */
  sequenceName: string;
  /** Set when enrolled=false (e.g. "dormant"). */
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

/**
 * Enrol a lead into a nurture sequence and fire (or schedule) the instant touch,
 * idempotently.
 *
 * - No-ops while dormant (nothing accumulates; the instant touch is not "spent").
 * - Idempotent per (lead_id, sequence): a resubmit never re-fires step 0.
 * - Default (deferFirstTouch:false): fires step 0 and, if step 1 is also instant
 *   (delayHours===0), fires step 1 too. This is the submit-route behaviour.
 * - With deferFirstTouch:true: inserts the state row with next_action_at set to
 *   the next send-window open time for step 0's channel class, then returns
 *   WITHOUT calling processLeadStep. The hourly lead-nurture cron fires step 0
 *   when the window opens. Used by lead-reconcile to avoid waking leads at 04:30.
 */
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

  // When deferring, we need the sequence config to inspect step 0 before the insert,
  // so we can set next_action_at to the next window-open rather than now.
  let deferredNextActionAt: string | null = null;
  if (deferFirstTouch) {
    const variant =
      sequenceName === LEAD_SEQUENCE_NAMES.detail_capture ? "detail_capture" : "contactability";
    const config = buildPropertyLeadNurtureConfig(variant);
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

  // Flip status new -> nurturing (only from 'new', never regress a later status).
  await adminUpdate("leads", { id: `eq.${lead.id}`, status: "eq.new" }, { status: "nurturing" });

  // Deferred path: the hourly lead-nurture cron will fire step 0 at the scheduled
  // window. Return here without calling processLeadStep.
  if (deferFirstTouch) {
    return { enrolled: true, newlyEnrolled: true, sequenceName };
  }

  // Immediate path (submit route): fire step 0 now, then step 1 if also instant.
  const variant =
    sequenceName === LEAD_SEQUENCE_NAMES.detail_capture ? "detail_capture" : "contactability";
  const config = buildPropertyLeadNurtureConfig(variant);
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
