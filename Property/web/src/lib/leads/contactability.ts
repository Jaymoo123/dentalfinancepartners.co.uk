/**
 * The contactability gate: the rule that decides whether a lead is genuinely
 * reachable AND has actively responded, so it is safe to hand to DJH. This is
 * the direct fix for "only 3 of 9 were contactable".
 *
 * Rule table (strict, per owner decision):
 *   contactable = the lead has RESPONDED two-way, and their PHONE is proven.
 *
 *   channel / event        phone proven?  gate passes when
 *   ---------------------  -------------  ------------------------------------------
 *   replied via SMS        yes (live msg) always (channel itself proves the number)
 *   replied via WhatsApp   yes (live msg) always (channel itself proves the number)
 *   replied via email      NO             phone is not known-bad (invalid/voip)
 *   confirmed (one-tap)    NO             phone is not known-bad (invalid/voip)
 *   booked (callback)      NO             phone is not known-bad (invalid/voip)
 *
 *   An email reply proves engagement but NOT that the phone is callable. It is
 *   treated exactly like a one-tap confirm: qualifying only when the stored phone
 *   is not known-bad, so DJH can still reach the lead by phone.
 *
 *   A lead with a known-bad phone who only confirms/books/email-replies is held
 *   for manual review rather than auto-forwarded.
 *
 * On promotion we stop the chase, flip leads.status to 'contactable' (once,
 * idempotently), and fire the enriched handoff to the operator. STOP/opt-out
 * replies stop the sequence without promoting.
 */

import { adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { LEAD_SEQUENCE_NAMES } from "@/config/lead-nurture";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import { sendContactableHandoff, type HandoffResult } from "./handoff";

type EventRow = { event_type: string; channel: string | null };
type VerRow = { phone_status: string | null };

export interface ContactabilityVerdict {
  contactable: boolean;
  responded: boolean;
  phoneProven: boolean;
  reason: string;
}

/** Read the lead's signals and decide contactability. */
export async function evaluateContactability(leadId: string): Promise<ContactabilityVerdict> {
  const [evRes, verRes] = await Promise.all([
    adminSelect<EventRow>("lead_contact_events", {
      lead_id: `eq.${leadId}`,
      select: "event_type,channel",
    }),
    adminSelect<VerRow>("lead_verification", {
      lead_id: `eq.${leadId}`,
      select: "phone_status",
      limit: "1",
    }),
  ]);

  const events = evRes.data;
  // Opt-out is absolute: a lead who replied STOP is never contactable, even if a
  // still-valid confirm/booking link is clicked afterwards.
  if (events.some((e) => e.event_type === "opted_out")) {
    return { contactable: false, responded: false, phoneProven: false, reason: "opted out" };
  }
  const repliedViaPhone = events.some(
    (e) => e.event_type === "replied" && (e.channel === "sms" || e.channel === "whatsapp"),
  );
  // Email reply proves engagement but not the phone; requires a non-bad phone to promote.
  const repliedViaEmail = events.some(
    (e) => e.event_type === "replied" && e.channel === "email",
  );
  const confirmed = events.some((e) => e.event_type === "confirmed");
  const booked = events.some((e) => e.event_type === "booked");
  const responded = repliedViaPhone || repliedViaEmail || confirmed || booked;

  const phoneStatus = verRes.data[0]?.phone_status ?? null;
  // 'invalid' and 'voip' are both not-callable-by-DJH: a booking/confirm on one
  // is held for manual review. A live SMS/WhatsApp reply still proves the number.
  const phoneKnownBad = phoneStatus === "invalid" || phoneStatus === "voip";
  const phoneGood = phoneStatus === "valid_mobile" || phoneStatus === "valid_landline";

  let contactable = false;
  let reason = "no response yet";
  if (repliedViaPhone) {
    contactable = true;
    reason = "replied by SMS/WhatsApp";
  } else if (booked && !phoneKnownBad) {
    contactable = true;
    reason = "booked a callback";
  } else if (confirmed && !phoneKnownBad) {
    contactable = true;
    reason = "confirmed by one-tap link";
  } else if (repliedViaEmail && !phoneKnownBad) {
    // Email reply treated like a confirm: qualifying engagement, but phone must be callable.
    contactable = true;
    reason = "replied by email";
  } else if ((booked || confirmed || repliedViaEmail) && phoneKnownBad) {
    reason = "responded but phone not callable (invalid/VoIP), manual review";
  }

  return { contactable, responded, phoneProven: repliedViaPhone || phoneGood, reason };
}

export interface PromoteResult {
  promoted: boolean;
  alreadyPromoted?: boolean;
  reason: string;
  handoff?: HandoffResult;
}

/** Promote to contactable (idempotent), stop the chase, fire the handoff once. */
export async function promoteIfContactable(leadId: string): Promise<PromoteResult> {
  try {
    const verdict = await evaluateContactability(leadId);
    if (!verdict.contactable) return { promoted: false, reason: verdict.reason };

    const nowIso = new Date().toISOString();
    // Stop chasing on BOTH primary sequences (contactability + detail-capture), so a
    // lead promoted while still in detail-capture is halted too. Aux sequences
    // (booking_reminder:*, abandoned_booking) are intentionally left running, since a
    // now-contactable lead who booked still wants their booking reminder.
    await adminUpdate(
      "lead_nurture_state",
      {
        lead_id: `eq.${leadId}`,
        sequence: `in.(${LEAD_SEQUENCE_NAMES.contactability},${LEAD_SEQUENCE_NAMES.detail_capture})`,
      },
      { status: "contactable", next_action_at: null, updated_at: nowIso },
    );

    // Flip leads.status exactly once: the filter excludes already-promoted states,
    // so a second call updates zero rows and does not re-fire the handoff.
    const flip = await adminUpdate<{ id: string }>(
      "leads",
      { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
      { status: "contactable" },
    );
    if (flip.data.length === 0) {
      return { promoted: false, alreadyPromoted: true, reason: verdict.reason };
    }

    // Fire the handoff first; the audit event is recorded only once we know the outcome.
    const handoff = await sendContactableHandoff(leadId, verdict.reason);

    if (handoff.sent === true || handoff.skipped) {
      // Sent successfully, or a known/expected skip (test, no-resend, no-lead):
      // record the standard handed-off event.
      await recordLeadContactEvent(leadId, "handed_off", "system", { reason: verdict.reason });
      // The contactable -> forwarded flip is OPERATOR-driven (owner decision AN-2):
      // it happens when the operator clicks "I have forwarded this to DJH" in the
      // handoff email (POST /api/leads/forwarded/[token]), so 'forwarded' means a
      // real DJH hand-over, not merely that our brief email was delivered.
    } else {
      // Real send failure after retries: audit it, then alert the operator.
      // leads.status remains 'contactable' so the handoff can be re-attempted later.
      await recordLeadContactEvent(leadId, "send_failed", "system", {
        kind: "handoff_failed",
        reason: handoff.reason,
      });
      // Best-effort operator alert: wrapped in its own try/catch so it can never throw.
      try {
        // Fetch the lead name for a readable subject; fall back to a generic label.
        let alertName = "the lead";
        try {
          const nameRes = await adminSelect<{ full_name: string }>("leads", {
            id: `eq.${leadId}`,
            select: "full_name",
            limit: "1",
          });
          if (nameRes.data[0]?.full_name) alertName = nameRes.data[0].full_name;
        } catch {
          // best-effort; generic label is fine
        }
        // handoff.to is already resolveLeadTo(source) so no second lookup is needed.
        if (handoff.to && process.env.RESEND_API_KEY) {
          const safe = (s: string) =>
            s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          const safeAlertName = safe(alertName);
          const safeReason = safe(handoff.reason ?? "unknown");
          await getResend().emails.send({
            from: getFromAddress(),
            to: handoff.to,
            subject: `Handoff email failed: ${alertName}`,
            html: `<p><strong>${safeAlertName}</strong> has passed the contactability gate and their status is now <strong>contactable</strong>, but the READY-FOR-DJH handoff email did not send after 3 attempts.</p><p>Please check the console for this lead and follow up manually. The lead has not been lost.</p><p>Failure reason: ${safeReason}</p>`,
            text: `${alertName} has passed the contactability gate (status: contactable) but the READY-FOR-DJH handoff email failed after 3 attempts. Please check the console and follow up manually. Failure reason: ${handoff.reason ?? "unknown"}`,
          });
        }
      } catch (alertErr) {
        console.error("[contactability] operator alert send failed", alertErr);
      }
    }

    return { promoted: true, reason: verdict.reason, handoff };
  } catch (err) {
    console.error("[contactability] promoteIfContactable unexpected error", err);
    return { promoted: false, reason: "unexpected error" };
  }
}

/**
 * Record a two-way response event, then evaluate + promote if it clears the gate.
 * Used by the inbound (SMS/WhatsApp), confirm (email one-tap) and booking routes.
 */
export async function recordResponseAndEvaluate(
  leadId: string,
  eventType: "replied" | "confirmed" | "booked",
  channel: "email" | "sms" | "whatsapp" | "web",
  meta?: Record<string, unknown>,
): Promise<PromoteResult> {
  await recordLeadContactEvent(leadId, eventType, channel, meta);
  // When a lead replies (any channel), flag the active nurture state for copy regeneration
  // so the AI copy layer can weave their reply into remaining touches.
  // Best-effort: errors are swallowed so a DB hiccup never blocks the contactability path.
  if (eventType === "replied") {
    try {
      await adminUpdate(
        "lead_nurture_state",
        { lead_id: `eq.${leadId}`, status: "eq.active" },
        { copy_status: "regenerate" },
      );
    } catch (err) {
      console.error("[contactability] copy_status regenerate update failed", err);
    }
  }
  return promoteIfContactable(leadId);
}

/** Honour an opt-out: record it and stop the sequence without promoting. */
export async function stopNurture(
  leadId: string,
  channel: "email" | "sms" | "whatsapp" | "web",
): Promise<void> {
  await recordLeadContactEvent(leadId, "opted_out", channel);
  const nowIso = new Date().toISOString();
  // Opt-out withdraws consent for ALL automated contact: halt every sequence for
  // this lead (both primary chases and any aux booking reminders), not just one.
  await adminUpdate(
    "lead_nurture_state",
    { lead_id: `eq.${leadId}` },
    { status: "stopped", next_action_at: null, updated_at: nowIso },
  );
  // Also close the lead so an in-flight confirm/booking link cannot resurrect it
  // (the promote filter excludes 'closed'). Never downgrade a lead already
  // contactable/forwarded/converted.
  await adminUpdate(
    "leads",
    { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
    { status: "closed" },
  );

  // Detect post-handoff opt-outs and alert the operator so DJH can be notified
  // of the objection within 2 working days, as required by the data-sharing agreement.
  // Wrapped entirely in try/catch so it can never throw out of this webhook path.
  try {
    // Fetch the lead's full_name, source and current status in one call.
    // Status check: contactable/forwarded means the lead was already handed off
    // (the update above only touches new/nurturing, so these states are unchanged).
    let leadName = "the lead";
    let leadSource: string | null = null;
    let wasHandedOff = false;

    try {
      const leadRes = await adminSelect<{
        full_name: string;
        source: string | null;
        status: string;
      }>("leads", {
        id: `eq.${leadId}`,
        select: "full_name,source,status",
        limit: "1",
      });
      const row = leadRes.data[0];
      if (row) {
        if (row.full_name) leadName = row.full_name;
        leadSource = row.source ?? null;
        if (row.status === "contactable" || row.status === "forwarded") {
          wasHandedOff = true;
        }
      }
    } catch {
      // best-effort; proceed to event check
    }

    // If the status check was inconclusive, confirm via the handed_off event record.
    if (!wasHandedOff) {
      try {
        const evRes = await adminSelect<{ id: string }>("lead_contact_events", {
          lead_id: `eq.${leadId}`,
          event_type: "eq.handed_off",
          select: "id",
          limit: "1",
        });
        wasHandedOff = evRes.data.length > 0;
      } catch {
        // best-effort
      }
    }

    // Send one operator alert. Skip for test leads and when Resend is unconfigured.
    if (wasHandedOff && leadSource !== "test" && process.env.RESEND_API_KEY) {
      const to = resolveLeadTo(leadSource ?? undefined);
      const safeName = leadName
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      await getResend().emails.send({
        from: getFromAddress(),
        to,
        subject: `Post-handoff opt-out: ${leadName}`,
        html:
          `<p><strong>${safeName}</strong> has opted out of further contact via ${channel} ` +
          `AFTER their enquiry was forwarded to DJH.</p>` +
          `<p>Under the data-sharing agreement, DJH must be notified of this objection ` +
          `within 2 working days. Please contact DJH directly to inform them that this ` +
          `lead has withdrawn consent and must not be contacted further.</p>`,
        text:
          `${leadName} has opted out of further contact via ${channel} AFTER their enquiry ` +
          `was forwarded to DJH. Under the data-sharing agreement, DJH must be notified of ` +
          `this objection within 2 working days. Please contact DJH directly to inform them ` +
          `that this lead has withdrawn consent and must not be contacted further.`,
      });
    }
  } catch (alertErr) {
    console.error("[contactability] post-handoff opt-out alert failed", alertErr);
  }
}
