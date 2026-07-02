/**
 * Lead-nurture send orchestration: fire one step (across its channels) to one
 * lead idempotently, then advance the schedule. Used by the submit route
 * (step 0, synchronous, for sub-5-minute speed-to-lead) and the hourly cron
 * (all due later steps).
 *
 * Crash-safe idempotency: claim the (lead_id, sequence, step, channel) row in
 * lead_nurture_sends with status='pending' BEFORE calling the provider. The
 * UNIQUE index makes the claim atomic. Terminal states ('sent'/'skipped'/
 * 'delivered') mean truly done -> a second run returns "duplicate". A 'pending'
 * row means a PRIOR ATTEMPT CRASHED between claim and confirmation (or is a
 * failed attempt), so the next run TAKES IT OVER and retries. This closes the
 * "ghost sent" window where a killed function would otherwise leave a row that
 * looks sent but never was.
 *
 * Reactivity: this module only drives FORWARD (scheduled) motion. The moment a
 * lead replies / books / confirms, an inbound handler records a contact event
 * and flips lead_nurture_state.status to 'contactable' (see the contactability
 * gate). advanceLeadState() is guarded on status='active' AND the current step,
 * so it can never clobber a contactable/stopped state or skip a step under
 * concurrent runs, and the cron's due query skips anything not 'active'.
 */

import { adminInsert, adminUpdate, adminSelect } from "../nurture/admin";
import type {
  ChannelSender,
  LeadMessageContext,
  LeadNurtureConfig,
  LeadNurtureStep,
  NurtureLead,
} from "./config";

const HOUR_MS = 3_600_000;
const TERMINAL_SEND = new Set(["sent", "skipped", "delivered"]);

type ChannelResult = "sent" | "skipped" | "duplicate" | "failed";

/** Insert a lead lifecycle event (replied / confirmed / booked / opted_out / ...). */
export async function recordLeadContactEvent(
  leadId: string,
  eventType: string,
  channel: string | null,
  meta?: Record<string, unknown>,
): Promise<void> {
  await adminInsert("lead_contact_events", {
    lead_id: leadId,
    event_type: eventType,
    channel,
    meta: meta ?? null,
  });
}

/** Fire one message on one channel, idempotently. */
async function sendChannel(
  lead: NurtureLead,
  config: LeadNurtureConfig,
  stepIndex: number,
  msg: ReturnType<LeadNurtureStep["buildMessages"]>[number],
  sender: ChannelSender,
): Promise<ChannelResult> {
  const to = msg.channel === "email" ? lead.email : lead.phone;
  if (!to || !to.trim()) return "skipped"; // no address for this channel

  // Claim (lead, sequence, step, channel) as 'pending' before sending.
  const claim = await adminInsert<{ id: string }>(
    "lead_nurture_sends",
    {
      lead_id: lead.id,
      sequence: config.sequenceName,
      step: stepIndex,
      channel: msg.channel,
      status: "pending",
    },
    { onConflict: "lead_id,sequence,step,channel", ignoreDuplicates: true },
  );
  if (!claim.ok) return "failed";

  let sendRowId: string;
  if (claim.data.length === 0) {
    // Conflict: inspect the existing row. A terminal state means truly done; a
    // 'pending'/'failed' row is a crashed or failed prior attempt we take over.
    const ex = await adminSelect<{ id: string; status: string }>("lead_nurture_sends", {
      select: "id,status",
      lead_id: `eq.${lead.id}`,
      sequence: `eq.${config.sequenceName}`,
      step: `eq.${stepIndex}`,
      channel: `eq.${msg.channel}`,
      limit: "1",
    });
    const row = ex.data[0];
    if (!row) return "failed"; // race; retry next run
    if (TERMINAL_SEND.has(row.status)) return "duplicate";
    sendRowId = row.id; // take over a pending/failed claim
  } else {
    sendRowId = claim.data[0].id;
  }

  try {
    const result = await sender.send({
      channel: msg.channel,
      to,
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      body: msg.body,
      templateName: msg.templateName,
      templateVars: msg.templateVars,
      headers: msg.headers,
    });
    if (result && result.skipped) {
      // Channel intentionally not delivered (dormant / disabled / test lead).
      await adminUpdate("lead_nurture_sends", { id: `eq.${sendRowId}` }, { status: "skipped" });
      return "skipped";
    }
    if (result === null) {
      // Handled provider failure -> mark 'failed' (durable + retry-eligible) and
      // record an event, rather than deleting the row (which would be invisible).
      await adminUpdate("lead_nurture_sends", { id: `eq.${sendRowId}` }, { status: "failed" });
      await recordLeadContactEvent(lead.id, "send_failed", msg.channel, { step: stepIndex, reason: "provider_returned_null" });
      return "failed";
    }
    await adminUpdate(
      "lead_nurture_sends",
      { id: `eq.${sendRowId}` },
      { status: "sent", provider_id: result.id ?? null },
    );
    return "sent";
  } catch (err) {
    await adminUpdate("lead_nurture_sends", { id: `eq.${sendRowId}` }, { status: "failed" });
    await recordLeadContactEvent(lead.id, "send_failed", msg.channel, {
      step: stepIndex,
      reason: String(err instanceof Error ? err.message : err).slice(0, 200),
    });
    console.error("[lead-nurture/send] provider error, marked failed for retry", err);
    return "failed";
  }
}

/** Advance the schedule after a step is handled. Guarded on status='active'. */
async function advanceLeadState(
  leadId: string,
  currentStepIndex: number,
  totalSteps: number,
  config: LeadNurtureConfig,
  ctx: LeadMessageContext,
): Promise<void> {
  const next = currentStepIndex + 1;
  const nowIso = new Date().toISOString();
  // Guards: status='active' (never overwrite a lead that just became
  // contactable) AND step=current (a concurrent run that already advanced makes
  // this a no-op, so a step can never be skipped).
  const where = {
    lead_id: `eq.${leadId}`,
    sequence: `eq.${config.sequenceName}`,
    status: "eq.active",
    step: `eq.${currentStepIndex}`,
  };
  if (next >= totalSteps) {
    // Chased through every touch with no two-way response -> unreachable.
    await adminUpdate("lead_nurture_state", where, {
      step: next,
      status: "unreachable",
      last_action_at: nowIso,
      next_action_at: null,
      updated_at: nowIso,
    });
    return;
  }
  const nextStep = config.steps[next] as LeadNurtureStep;
  const nextAt = config.nextActionAt
    ? new Date(config.nextActionAt(Date.now(), nextStep, ctx)).toISOString()
    : new Date(Date.now() + nextStep.delayHours * HOUR_MS).toISOString();
  await adminUpdate("lead_nurture_state", where, {
    step: next,
    status: "active",
    last_action_at: nowIso,
    next_action_at: nextAt,
    updated_at: nowIso,
  });
}

/**
 * Fire the given step for one lead across all its channels, then advance.
 * Returns the number of channels actually dispatched (for cron metrics).
 * Advancing on duplicate/skip recovers state left by a prior partial run.
 */
export async function processLeadStep(
  lead: NurtureLead,
  stepIndex: number,
  config: LeadNurtureConfig,
  sender: ChannelSender,
  ctx: LeadMessageContext,
): Promise<number> {
  const step = config.steps[stepIndex];
  if (!step) return 0;

  const messages = step.buildMessages(ctx);
  // Conditional steps (e.g. a VIP-only touch) return [] for non-qualifying leads; advance without sending.
  if (messages.length === 0) {
    await advanceLeadState(lead.id, stepIndex, config.steps.length, config, ctx);
    return 0;
  }
  let sent = 0;
  let resolved = 0; // sent + skipped + duplicate (i.e. not a hard failure)
  let failed = 0;

  for (const msg of messages) {
    const r = await sendChannel(lead, config, stepIndex, msg, sender);
    if (r === "sent") {
      sent++;
      resolved++;
    } else if (r === "skipped" || r === "duplicate") {
      resolved++;
    } else {
      failed++;
    }
  }

  // Advance rules:
  //  - No failures: advance if anything resolved (all sent, or all skipped when
  //    dormant). This is the normal path.
  //  - Some failures: advance ONLY if at least one channel actually SENT (the
  //    lead was reached on >=1 channel; the failed one is logged as send_failed).
  //    If nothing sent (all failed, or skipped+failed with no send), do NOT
  //    advance, so the next cron tick retries the failed channel(s).
  const shouldAdvance = failed === 0 ? resolved > 0 : sent > 0;
  if (shouldAdvance) {
    await advanceLeadState(lead.id, stepIndex, config.steps.length, config, ctx);
  }
  return sent;
}
