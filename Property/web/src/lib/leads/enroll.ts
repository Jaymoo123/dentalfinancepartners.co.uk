/**
 * Shared lead-nurture enrolment. Extracted from the submit route so the submit
 * chokepoint, the internal retro-enrol route, and the reconciliation safety-net
 * all enrol through ONE idempotent, arming-aware, sequence-aware code path.
 *
 * It picks the primary sequence from the lead's missing contact fields (unless an
 * explicit sequenceName is passed), fires the instant touch, and reports whether
 * this was a brand-new enrolment so the caller can (for contactability) kick the
 * AI-copy job. Best-effort at the call sites: enrolment must never lose a lead.
 */
import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { buildLeadChannelSender, leadNurtureArmed } from "@/lib/leads/channels";
import {
  buildPropertyLeadNurtureConfig,
  buildLeadMessageContext,
  routePrimarySequence,
  LEAD_SEQUENCE_NAMES,
} from "@/config/lead-nurture";
import { bestHourFromTimestamps } from "@/lib/leads/send-window";
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
}

export interface EnrollLeadResult {
  /** True if the system is armed and enrolment was attempted. */
  enrolled: boolean;
  /** True only when a NEW state row was inserted (the instant touch fired). */
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
 * Enrol a lead into a nurture sequence and fire the instant touch, idempotently.
 *
 * - No-ops while dormant (nothing accumulates; the instant touch is not "spent").
 * - Idempotent per (lead_id, sequence): a resubmit never re-fires step 0.
 * - Fires step 1 synchronously ONLY when it is an instant (same-time) step, i.e.
 *   the contactability t0 SMS. Detail-capture's step 1 is a scheduled +24h email,
 *   so the cron fires it, not us.
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
  const nowIso = new Date().toISOString();

  const enrol = await adminInsert<{ lead_id: string }>(
    "lead_nurture_state",
    {
      lead_id: lead.id,
      sequence: sequenceName,
      step: 0,
      status: "active",
      next_action_at: nowIso,
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
