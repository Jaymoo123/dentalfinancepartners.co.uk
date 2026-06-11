/**
 * Nurture send orchestration: send one step to one subscriber idempotently,
 * then advance their schedule. Used by the subscribe handler (step 0 welcome
 * when the cron secret is set) and the cron send-job (all due steps).
 *
 * EN-05 idempotency: claim the (subscriber_id, sequence, step) row in
 * nurture_sends BEFORE calling the email provider. The UNIQUE index makes
 * the claim atomic. A second run sees the claim and returns "duplicate".
 * On a transient provider failure the claim is RELEASED (deleted) so the
 * next run retries cleanly rather than silently dropping the step.
 *
 * EN-04 dormancy: the caller (cron route) is responsible for checking the
 * CRON_SECRET env var before calling this. The engine itself does not know
 * which secret variable arms it; the route does.
 *
 * EN-06: from-identity and all per-site strings come from NurtureConfig.
 * No hardcoded fallbacks. If config is missing the call throws.
 *
 * Status exclusion: subscribers with status bounced or complained are NEVER
 * passed to this function. The cron query filters them out via an INNER JOIN
 * on subscribers.status = 'active'.
 */

import { adminInsert, adminUpdate, adminDelete } from "./admin";
import type { NurtureConfig, NurtureStep } from "./config";

export interface NurtureSubscriber {
  id: string;
  email: string;
  unsubscribe_token: string;
}

type StepResult = "sent" | "duplicate" | "failed";

export interface EmailProvider {
  send(params: {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    html: string;
    text: string;
    headers: Record<string, string>;
  }): Promise<{ id?: string } | null>;
}

const DAY_MS = 86_400_000;

/**
 * Send one step idempotently. Returns:
 *   "sent"      — email dispatched and send log row written.
 *   "duplicate" — the (subscriber, sequence, step) claim already existed; skip.
 *   "failed"    — transient failure; claim released; next run will retry.
 */
async function sendNurtureStep(
  sub: NurtureSubscriber,
  step: NurtureStep,
  stepIndex: number,
  config: NurtureConfig,
  provider: EmailProvider,
): Promise<StepResult> {
  // Claim this (subscriber, step) before sending.
  const claim = await adminInsert<{ id: string }>(
    "nurture_sends",
    {
      subscriber_id: sub.id,
      sequence: config.sequenceName,
      step: stepIndex,
    },
    { onConflict: "subscriber_id,sequence,step", ignoreDuplicates: true },
  );
  if (!claim.ok) return "failed";
  if (claim.data.length === 0) return "duplicate"; // already claimed

  const sendRowId = claim.data[0].id;

  const unsubUrl = unsubscribeUrl(sub.unsubscribe_token, config);
  const { html, text, listUnsubscribeHeader } = step.buildBody(unsubUrl);

  try {
    const result = await provider.send({
      from: config.fromAddress,
      to: sub.email,
      replyTo: config.replyTo,
      subject: step.subject,
      html,
      text,
      headers: {
        // RFC 8058 one-click unsubscribe (EN-06).
        "List-Unsubscribe": listUnsubscribeHeader,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    // Update the send row with the provider's message id (for webhook joins).
    if (result?.id) {
      await adminUpdate(
        "nurture_sends",
        { id: `eq.${sendRowId}` },
        { resend_id: result.id },
      );
    }
    return "sent";
  } catch (err) {
    // Release the claim so the next cron run retries this step (EN-05).
    await adminDelete("nurture_sends", { id: `eq.${sendRowId}` });
    console.error("[nurture/send] provider error — claim released for retry", err);
    return "failed";
  }
}

/** Build the per-subscriber unsubscribe URL from their token. */
export function unsubscribeUrl(token: string, config: NurtureConfig): string {
  const base = config.siteUrl.replace(/\/$/, "");
  return `${base}/api/nurture/unsubscribe?token=${encodeURIComponent(token)}`;
}

/** Advance the schedule after a step is handled. */
async function advanceNurtureState(
  subscriberId: string,
  currentStepIndex: number,
  totalSteps: number,
  config: NurtureConfig,
): Promise<void> {
  const next = currentStepIndex + 1;
  const nowIso = new Date().toISOString();
  const where = {
    subscriber_id: `eq.${subscriberId}`,
    sequence: `eq.${config.sequenceName}`,
  };
  if (next >= totalSteps) {
    await adminUpdate("nurture_state", where, {
      status: "completed",
      last_sent_at: nowIso,
      next_send_at: null,
      updated_at: nowIso,
    });
    return;
  }
  const nextStep = config.steps[next];
  // nextStep is always defined here because next < totalSteps; the cast is safe.
  const nextAt = new Date(Date.now() + (nextStep as NurtureStep).delayDays * DAY_MS).toISOString();
  await adminUpdate("nurture_state", where, {
    step: next,
    status: "active",
    last_sent_at: nowIso,
    next_send_at: nextAt,
    updated_at: nowIso,
  });
}

/**
 * Send the due step for one subscriber and advance their schedule.
 * Advancing on "duplicate" recovers state left by a prior partial run.
 * On "failed" the state is left so the cron retries next run.
 * Returns true if an email was dispatched.
 */
export async function processStep(
  sub: NurtureSubscriber,
  stepIndex: number,
  config: NurtureConfig,
  provider: EmailProvider,
): Promise<boolean> {
  const step = config.steps[stepIndex];
  if (!step) return false;

  const result = await sendNurtureStep(sub, step, stepIndex, config, provider);
  if (result === "sent" || result === "duplicate") {
    await advanceNurtureState(sub.id, stepIndex, config.steps.length, config);
  }
  return result === "sent";
}
