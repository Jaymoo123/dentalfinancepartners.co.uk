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
import { LEAD_SEQUENCE_NAME } from "@/config/lead-nurture";
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
  const verdict = await evaluateContactability(leadId);
  if (!verdict.contactable) return { promoted: false, reason: verdict.reason };

  const nowIso = new Date().toISOString();
  // Stop chasing (whatever state the sequence is in).
  await adminUpdate(
    "lead_nurture_state",
    { lead_id: `eq.${leadId}`, sequence: `eq.${LEAD_SEQUENCE_NAME}` },
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

  await recordLeadContactEvent(leadId, "handed_off", "system", { reason: verdict.reason });
  const handoff = await sendContactableHandoff(leadId, verdict.reason);
  return { promoted: true, reason: verdict.reason, handoff };
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
  await adminUpdate(
    "lead_nurture_state",
    { lead_id: `eq.${leadId}`, sequence: `eq.${LEAD_SEQUENCE_NAME}` },
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
}
