/**
 * Nurture send orchestration: send one step to one subscriber idempotently, then
 * advance their schedule. Shared by /api/subscribe (the immediate welcome) and
 * the /api/nurture/send cron (every following step).
 *
 * Idempotency: we CLAIM the (subscriber, sequence, step) row in nurture_sends
 * BEFORE calling Resend (the unique index makes the claim atomic). A second run
 * sees the claim and skips the email. On a transient send failure we RELEASE the
 * claim so the step retries cleanly next run rather than being silently dropped.
 */
import { getResend } from "@/lib/resend";
import { adminInsert, adminUpdate, adminDelete } from "@/lib/supabase/admin";
import { NURTURE_SEQUENCE, NURTURE_SEQUENCE_NAME, buildStepEmail } from "./sequence";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.propertytaxpartners.co.uk").replace(/\/$/, "");
const DAY_MS = 86_400_000;

export interface NurtureSubscriber {
  id: string;
  email: string;
  unsubscribe_token: string;
}

type StepResult = "sent" | "duplicate" | "failed";

function marketingFrom(): string {
  const name = process.env.NURTURE_FROM_NAME || "Property Tax Partners";
  const email = process.env.NURTURE_FROM_EMAIL || "updates@propertytaxpartners.co.uk";
  return `${name} <${email}>`;
}

// Where subscriber REPLIES go. Defaults to the hello@ inbox (which you forward to
// your own inbox), NOT the partner firm — nurture is our list, not a lead handoff.
function marketingReplyTo(): string {
  return process.env.NURTURE_REPLY_TO || "hello@propertytaxpartners.co.uk";
}

export function unsubscribeUrl(token: string): string {
  return `${SITE}/api/unsubscribe?token=${encodeURIComponent(token)}`;
}

/** Send one step, idempotently. "duplicate" = already sent; "failed" = transient, retry. */
async function sendNurtureStep(sub: NurtureSubscriber, step: number): Promise<StepResult> {
  const def = NURTURE_SEQUENCE[step];
  if (!def) return "failed";

  // Claim this (subscriber, step) before sending.
  const claim = await adminInsert<{ id: string }>(
    "nurture_sends",
    { subscriber_id: sub.id, sequence: NURTURE_SEQUENCE_NAME, step },
    { onConflict: "subscriber_id,sequence,step", ignoreDuplicates: true },
  );
  if (!claim.ok) return "failed";
  if (claim.data.length === 0) return "duplicate"; // someone already sent this step
  const sendRowId = claim.data[0].id;

  const unsub = unsubscribeUrl(sub.unsubscribe_token);
  const { subject, html, text } = buildStepEmail(def, unsub);

  try {
    const { data, error } = await getResend().emails.send({
      from: marketingFrom(),
      to: sub.email,
      replyTo: marketingReplyTo(),
      subject,
      html,
      text,
      headers: {
        // RFC 8058 one-click unsubscribe, honoured by Gmail/Apple Mail/etc.
        "List-Unsubscribe": `<${unsub}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    if (error) {
      await adminDelete("nurture_sends", { id: `eq.${sendRowId}` });
      console.error("[nurture] resend error", error);
      return "failed";
    }
    if (data?.id) {
      await adminUpdate("nurture_sends", { id: `eq.${sendRowId}` }, { resend_id: data.id });
    }
    return "sent";
  } catch (err) {
    await adminDelete("nurture_sends", { id: `eq.${sendRowId}` });
    console.error("[nurture] send threw", err);
    return "failed";
  }
}

/** Advance the schedule after a step is handled (completed = end of sequence). */
async function advanceNurtureState(subscriberId: string, currentStep: number): Promise<void> {
  const next = currentStep + 1;
  const nowIso = new Date().toISOString();
  const where = { subscriber_id: `eq.${subscriberId}`, sequence: `eq.${NURTURE_SEQUENCE_NAME}` };
  if (next >= NURTURE_SEQUENCE.length) {
    await adminUpdate("nurture_state", where, {
      status: "completed",
      last_sent_at: nowIso,
      next_send_at: null,
      updated_at: nowIso,
    });
    return;
  }
  const nextAt = new Date(Date.now() + NURTURE_SEQUENCE[next].delayDays * DAY_MS).toISOString();
  await adminUpdate("nurture_state", where, {
    step: next,
    status: "active",
    last_sent_at: nowIso,
    next_send_at: nextAt,
    updated_at: nowIso,
  });
}

/**
 * Send the due step for one subscriber and advance their schedule. Advancing on
 * "duplicate" recovers a state that was left behind by a prior partial run; on
 * "failed" we leave the state so the cron retries. Returns true if an email went.
 */
export async function processStep(sub: NurtureSubscriber, step: number): Promise<boolean> {
  const result = await sendNurtureStep(sub, step);
  if (result === "sent" || result === "duplicate") {
    await advanceNurtureState(sub.id, step);
  }
  return result === "sent";
}
