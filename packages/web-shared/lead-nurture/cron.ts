/**
 * Lead-nurture cron: query due steps and fire them. Called from Property's
 * /api/cron/lead-nurture route (hourly), which handles secret verification and
 * arms the run only when CRON_SECRET is set (dormancy). The instant step 0 is
 * NOT fired here — the submit route fires it synchronously for speed-to-lead.
 *
 * Only status='active' rows are chased; the moment a lead becomes 'contactable'
 * / 'unreachable' / 'stopped' it drops out of this query (and the partial index
 * that backs it), so we never chase a lead that already responded.
 */

import { adminSelect } from "../nurture/admin";
import { processLeadStep } from "./send";
import type {
  ChannelSender,
  GeneratedStepCopy,
  LeadMessageContext,
  LeadNurtureConfig,
  LeadNurtureStateRow,
  NurtureLead,
} from "./config";

const BATCH = 50;

type DueRow = {
  lead_id: string;
  step: number;
  generated_copy: Record<string, GeneratedStepCopy> | null;
  copy_status: string | null;
  best_send_hour: number | null;
  leads: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    role: string | null;
    source: string;
    message: string | null;
  } | null;
};

export type LeadCronResult = { processed: number; dispatched: number };

/**
 * Run one cron tick: query due lead_nurture_state rows, fire each due step.
 *
 * @param config        Site-specific lead-nurture config.
 * @param sender        Channel sender (Resend + Twilio for Property).
 * @param buildContext  Builds the per-lead message context (confirm/booking URLs).
 * @param cronArmed     Whether the cron secret is configured (dormancy gate).
 */
export async function runLeadNurtureCron(
  config: LeadNurtureConfig,
  sender: ChannelSender,
  buildContext: (lead: NurtureLead, state: LeadNurtureStateRow) => Promise<LeadMessageContext>,
  cronArmed: boolean,
): Promise<LeadCronResult> {
  if (!cronArmed) return { processed: 0, dispatched: 0 };

  const nowIso = new Date().toISOString();
  const due = await adminSelect<DueRow>("lead_nurture_state", {
    select: "lead_id,step,generated_copy,copy_status,best_send_hour,leads!inner(id,full_name,email,phone,role,source,message)",
    sequence: `eq.${config.sequenceName}`,
    status: "eq.active",
    next_action_at: `lte.${nowIso}`,
    order: "next_action_at.asc",
    limit: String(BATCH),
  });

  let processed = 0;
  let dispatched = 0;

  for (const row of due.data) {
    const l = row.leads;
    if (!l) continue;
    processed++;
    try {
      const lead: NurtureLead = {
        id: l.id,
        full_name: l.full_name,
        email: l.email,
        phone: l.phone,
        role: l.role,
        source: l.source,
        message: l.message,
      };
      const state: LeadNurtureStateRow = {
        lead_id: row.lead_id,
        step: row.step,
        generated_copy: row.generated_copy,
        copy_status: row.copy_status,
        best_send_hour: row.best_send_hour,
      };
      const ctx = await buildContext(lead, state);
      dispatched += await processLeadStep(lead, row.step, config, sender, ctx);
    } catch (err) {
      console.error("[lead-nurture/cron] step failed", err);
    }
  }

  return { processed, dispatched };
}
