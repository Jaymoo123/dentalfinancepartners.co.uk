/**
 * Reply acknowledgement + operator updates for inbound SMS/WhatsApp/email.
 *
 * Problem this fixes: a lead who replies "YES" (or answers a nurture email)
 * previously heard nothing until a specialist called, possibly days later. Now
 * the first reply gets ONE immediate, service-only acknowledgement confirming a
 * human will call shortly. Any further detail they send lands in
 * lead_contact_events and is surfaced verbatim in the dossier/operator update.
 *
 * Guarantees:
 *   - At most ONE SMS/WhatsApp ack per lead, ever, and at most ONE email ack per
 *     lead, ever (ack_sent events are the idempotency check).
 *   - Fully dormancy-gated: goes through the same ChannelSender as the nurture
 *     sequence, so nothing leaves without LEAD_NURTURE_ENABLED + channel flag.
 *   - Replies that arrive AFTER the lead is already contactable trigger a short
 *     "lead update" email to the operator (capped at 3 per lead), so post-handoff
 *     answers (e.g. "after 6pm, 4 properties") are never lost.
 *   - Never throws: a failure here must not break the inbound webhook ack.
 */

import { adminSelect } from "@/lib/supabase/admin";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";
import { buildLeadMessageContext } from "@/config/lead-nurture";
import { renderLeadServiceEmail } from "@/lib/emails/lead-service-template";
import { buildLeadChannelSender } from "./channels";
import { sendContactableHandoff } from "./handoff";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";

const OPERATOR_UPDATE_CAP = 3;

type LeadRow = NurtureLead & { message?: string | null };

export interface ReplyAckResult {
  acked: boolean;
  operatorUpdated: boolean;
}

/** True when the context resolved a real first name (firstNameOf falls back to "there"). */
function hasRealFirstName(firstName: string): boolean {
  return Boolean(firstName) && firstName !== "there";
}

/** Post-YES SMS/WhatsApp ack. Under 160 chars, no STOP line (the lead just opted in). */
function buildAckBody(firstName: string): string {
  const name = hasRealFirstName(firstName) ? ` ${firstName}` : "";
  return `Great, thank you${name}. One of our specialists will call you shortly. Nothing to prepare. Speak soon.`;
}

async function fetchLead(leadId: string): Promise<LeadRow | null> {
  const res = await adminSelect<LeadRow>("leads", {
    id: `eq.${leadId}`,
    select: "id,full_name,email,phone,role,source,message",
    limit: "1",
  });
  return res.data[0] || null;
}

async function countEvents(
  leadId: string,
  eventType: string,
  channel?: string,
): Promise<number> {
  const params: Record<string, string> = {
    lead_id: `eq.${leadId}`,
    event_type: `eq.${eventType}`,
    select: "id",
    limit: String(OPERATOR_UPDATE_CAP + 1),
  };
  if (channel) params.channel = `eq.${channel}`;
  const res = await adminSelect<{ id: string }>("lead_contact_events", params);
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

  // ── Post-handoff reply -> refreshed handoff / operator update (capped) ────
  try {
    if (opts.alreadyContactable) {
      result.operatorUpdated = await notifyOperatorOfReply({
        leadId: opts.leadId,
        channel: opts.channel,
        replyBody: opts.replyBody,
        alreadyContactable: true,
      });
    }
  } catch (err) {
    console.error("[leads/reply-ack] operator update failed", err);
  }

  return result;
}

/**
 * One-time acknowledgement EMAIL to a prospect whose genuine email reply was
 * just captured. Closes the loop the same way the SMS ack does for a YES text:
 * the reply landed, a specialist will call, nothing else to prepare.
 * Copy source: docs/property/email-previews/email_reply_ack.html.
 *
 * Rules (mirror acknowledgeReply):
 *   - Dormancy-gated: sends through the shared ChannelSender, so nothing leaves
 *     without LEAD_NURTURE_ENABLED + LEAD_NURTURE_EMAIL_ENABLED, and the
 *     from/reply-to identity is the one the nurture sequence uses.
 *   - Never for test leads (lead.source === "test").
 *   - Idempotent per lead: at most one email ack, ever (ack_sent event with
 *     channel "email" is the check). Recorded ONLY after a real send, so a
 *     dormancy skip or unconfigured provider does not burn the one ack and a
 *     later reply retries once the channel is armed.
 *   - Never throws: a failure here must not break the inbound webhook ack.
 */
export async function acknowledgeEmailReply(opts: { leadId: string }): Promise<boolean> {
  try {
    const lead = await fetchLead(opts.leadId);
    if (!lead || !lead.email || lead.source === "test") return false;

    const priorEmailAcks = await countEvents(opts.leadId, "ack_sent", "email");
    if (priorEmailAcks > 0) return false;

    const ctx = await buildLeadMessageContext(lead, null);
    const subject = hasRealFirstName(ctx.firstName)
      ? `Got your reply, ${ctx.firstName}`
      : "Got your reply";

    const { html, text } = renderLeadServiceEmail({
      preheader: "Thanks, that is everything we need. A specialist will call you.",
      greeting: `Hi ${ctx.firstName},`,
      paragraphs: [
        "Got your reply, thank you. That is everything we need.",
        "One of our property tax specialists will call you, and if you mentioned a day or time that suits, we will aim for it.",
        "There is nothing else for you to do. If anything changes in the meantime, just reply here and I will pick it up.",
      ],
      // No cta/secondary: this is a reply-only service email, nothing to click.
      signoff: "Speak soon, Junayd at Property Tax Partners",
      footerNote:
        "You are receiving this because you submitted an enquiry on propertytaxpartners.co.uk.",
      ...(ctx.optOutUrl ? { optOutUrl: ctx.optOutUrl } : {}),
    });

    const sender = buildLeadChannelSender({ live: lead.source !== "test" });
    const sendResult = await sender.send({
      channel: "email",
      to: lead.email,
      subject,
      html,
      text,
      ...(ctx.optOutUrl
        ? {
            headers: {
              "List-Unsubscribe": `<${ctx.optOutUrl}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }
        : {}),
    });

    if (sendResult && sendResult.skipped !== true) {
      await recordLeadContactEvent(opts.leadId, "ack_sent", "email", {
        provider_id: sendResult.id ?? null,
      });
      return true;
    }
    return false;
  } catch (err) {
    console.error("[leads/reply-ack] email ack failed", err);
    return false;
  }
}

/**
 * Fire a capped operator notification with the verbatim reply body, for any
 * channel. Used by the inbound EMAIL route so a human always sees what a prospect
 * said (especially a detail-capture lead whose name/number arrive in the reply),
 * whether or not the gate promoted. Idempotency/cap shares the operator_update
 * event with acknowledgeReply. Never throws.
 */
export async function notifyOperatorOfReply(opts: {
  leadId: string;
  channel: "email" | "sms" | "whatsapp";
  replyBody: string;
  /** True when the lead was ALREADY handed off before this reply arrived. */
  alreadyContactable?: boolean;
}): Promise<boolean> {
  try {
    if (!opts.replyBody.trim() || !process.env.RESEND_API_KEY) return false;
    const lead = await fetchLead(opts.leadId);
    if (!lead || lead.source === "test") return false;
    const priorUpdates = await countEvents(opts.leadId, "operator_update");
    if (priorUpdates >= OPERATOR_UPDATE_CAP) return false;

    // A reply landing AFTER the handoff email went out means the operator may
    // already have forwarded a pack that is now incomplete. Resend the FULL
    // handoff (dossier timeline includes this reply, recorded upstream) with an
    // "Updated" subject so the operator forwards the refreshed version instead
    // of stitching a snippet onto the original. Fall through to the snippet
    // email only if the refreshed handoff fails to send.
    if (opts.alreadyContactable) {
      const handoff = await sendContactableHandoff(
        opts.leadId,
        `sent more info by ${opts.channel === "whatsapp" ? "WhatsApp" : opts.channel === "sms" ? "SMS" : "email"}`,
        { updated: true },
      );
      if (handoff.sent) {
        await recordLeadContactEvent(opts.leadId, "operator_update", opts.channel, {
          body: opts.replyBody.slice(0, 2000),
          kind: "updated_handoff",
        });
        return true;
      }
    }

    const who = (lead.full_name || "").trim() || lead.email;
    const quoted = opts.replyBody.slice(0, 500);
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const channelLabel =
      opts.channel === "whatsapp" ? "WhatsApp" : opts.channel === "sms" ? "SMS" : "email";

    const { error } = await getResend().emails.send({
      from: getFromAddress(),
      to: resolveLeadTo(lead.source),
      subject: `Lead replied: ${who}`,
      html: `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
<p><strong>${esc(who)}</strong> replied by ${channelLabel}:</p>
<div style="background:#f1f5f9;border-radius:6px;padding:10px 14px;font-style:italic;">&ldquo;${esc(quoted)}&rdquo;</div>
<p style="font-size:13px;color:#64748b;">This reply may include their name, a phone number, or a preferred call time.</p>
</div>`,
      text: `${who} replied by ${channelLabel}: "${quoted}"`,
    });
    if (error) throw new Error(`operator reply notify error: ${JSON.stringify(error)}`);
    await recordLeadContactEvent(opts.leadId, "operator_update", opts.channel, {
      body: quoted,
      kind: "reply",
    });
    return true;
  } catch (err) {
    console.error("[leads/reply-ack] notifyOperatorOfReply failed", err);
    return false;
  }
}
