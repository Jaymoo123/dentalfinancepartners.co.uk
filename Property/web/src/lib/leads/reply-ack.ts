/**
 * Reply acknowledgement + operator updates for inbound SMS/WhatsApp.
 *
 * Problem this fixes: a lead who replies "YES" previously heard nothing until
 * a specialist called, possibly days later. Now the first reply gets ONE
 * immediate, service-only acknowledgement confirming a human will be in touch
 * shortly. Any further detail they send lands in lead_contact_events and is
 * surfaced verbatim in the dossier/operator update.
 *
 * Guarantees:
 *   - At most ONE ack per lead, ever (ack_sent event is the idempotency check).
 *   - Fully dormancy-gated: goes through the same ChannelSender as the nurture
 *     sequence, so nothing leaves without LEAD_NURTURE_ENABLED + channel flag.
 *   - Replies that arrive AFTER the lead is already contactable trigger a short
 *     "lead update" email to the operator (capped at 3 per lead), so post-handoff
 *     answers (e.g. "after 6pm, 4 properties") are never lost.
 *   - Never throws: a failure here must not break the Twilio webhook ack.
 */

import { adminSelect } from "@/lib/supabase/admin";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";
import { buildLeadMessageContext } from "@/config/lead-nurture";
import { buildLeadChannelSender } from "./channels";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";

const OPERATOR_UPDATE_CAP = 3;

type LeadRow = NurtureLead & { message?: string | null };

export interface ReplyAckResult {
  acked: boolean;
  operatorUpdated: boolean;
}

function buildAckBody(firstName: string): string {
  return `Thanks ${firstName}, we have got your reply. One of the team will be in touch shortly to arrange your call.`;
}

async function fetchLead(leadId: string): Promise<LeadRow | null> {
  const res = await adminSelect<LeadRow>("leads", {
    id: `eq.${leadId}`,
    select: "id,full_name,email,phone,role,source,message",
    limit: "1",
  });
  return res.data[0] || null;
}

async function countEvents(leadId: string, eventType: string): Promise<number> {
  const res = await adminSelect<{ id: string }>("lead_contact_events", {
    lead_id: `eq.${leadId}`,
    event_type: `eq.${eventType}`,
    select: "id",
    limit: String(OPERATOR_UPDATE_CAP + 1),
  });
  return res.data.length;
}

/**
 * Handle the aftermath of a genuine (non-STOP) inbound reply: one-time ack to
 * the lead + a capped update email to the operator when the lead has already
 * been handed off. Call fire-and-forget from the inbound webhook.
 */
export async function acknowledgeReply(opts: {
  leadId: string;
  channel: "sms" | "whatsapp";
  /** The proven inbound number (E.164) to reply to. */
  replyTo: string;
  replyBody: string;
  /** True when the gate says this lead was already contactable (post-handoff reply). */
  alreadyContactable: boolean;
}): Promise<ReplyAckResult> {
  const result: ReplyAckResult = { acked: false, operatorUpdated: false };

  let lead: LeadRow | null = null;
  try {
    lead = await fetchLead(opts.leadId);
  } catch (err) {
    console.error("[leads/reply-ack] lead fetch failed", err);
    return result;
  }
  if (!lead) return result;

  // ── One-time acknowledgement to the lead ──────────────────────────────────
  try {
    const priorAcks = await countEvents(opts.leadId, "ack_sent");
    if (priorAcks === 0) {
      const ctx = await buildLeadMessageContext(lead, null);
      const sender = buildLeadChannelSender({ live: lead.source !== "test" });
      const sendResult = await sender.send({
        channel: opts.channel,
        to: opts.replyTo,
        body: buildAckBody(ctx.firstName),
      });
      // null = provider unconfigured -> do not record, so a later reply retries.
      // sent or dormancy/test skip -> record, the decision is final.
      if (sendResult !== null) {
        await recordLeadContactEvent(opts.leadId, "ack_sent", opts.channel, {
          provider_id: sendResult.id ?? null,
          skipped: sendResult.skipped === true,
        });
        result.acked = true;
      }
    }
  } catch (err) {
    console.error("[leads/reply-ack] ack send failed", err);
  }

  // ── Post-handoff reply -> short operator update (capped) ──────────────────
  try {
    if (
      opts.alreadyContactable &&
      opts.replyBody.trim() &&
      lead.source !== "test" &&
      process.env.RESEND_API_KEY
    ) {
      const priorUpdates = await countEvents(opts.leadId, "operator_update");
      if (priorUpdates < OPERATOR_UPDATE_CAP) {
        const to = resolveLeadTo(lead.source);
        const quoted = opts.replyBody.slice(0, 300);
        const { error } = await getResend().emails.send({
          from: getFromAddress(),
          to,
          subject: `Lead update: ${lead.full_name} replied`,
          html: `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
<p><strong>${lead.full_name}</strong> sent a follow-up ${opts.channel === "whatsapp" ? "WhatsApp" : "SMS"} message:</p>
<div style="background:#f1f5f9;border-radius:6px;padding:10px 14px;font-style:italic;">&ldquo;${quoted
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}&rdquo;</div>
<p style="font-size:13px;color:#64748b;">This reply may include a preferred call time or portfolio detail.</p>
</div>`,
          text: `${lead.full_name} sent a follow-up ${opts.channel} message: "${quoted}"`,
        });
        if (error) throw new Error(`operator update send error: ${JSON.stringify(error)}`);
        await recordLeadContactEvent(opts.leadId, "operator_update", opts.channel, {
          body: quoted,
        });
        result.operatorUpdated = true;
      }
    }
  } catch (err) {
    console.error("[leads/reply-ack] operator update failed", err);
  }

  return result;
}
