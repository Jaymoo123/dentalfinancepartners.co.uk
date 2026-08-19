/**
 * Release of a claimed lead offer: full details to the buyer, forward-ready
 * format, plus the owner notification. Extracted from the claim route so the
 * Telegram bot's [Release details] button and the claim route share ONE
 * implementation.
 *
 * Idempotency latch FIRST: a conditional PATCH stamps released_at only when it
 * is still null, so a double tap, a Telegram redelivery and a concurrent claim
 * route call collapse to exactly one release email. The latch is taken BEFORE
 * the send; on a send failure the offer stays latched and the owner gets the
 * RELEASE EMAIL FAILED alert to forward manually (same operational outcome as
 * the pre-extraction route, where nothing retried either).
 */
import { getResend, getFromAddress } from "@/lib/resend";
import { adminSelect, adminInsert, adminUpdate } from "@/lib/supabase/admin";
import { CLAIM_SLOTS_PER_LEAD, EXCLUSIVE_MULTIPLIER } from "@/lib/leads/tiers";
import { prettySource, type LeadRecord } from "@/lib/leads/notify-email";
import { buildReleaseEmail } from "@/lib/leads/release-email";
import { gatherLeadDossier } from "@/lib/leads/dossier";
import { resolveLeadTo } from "@/lib/lead-routing";
import { isSuppressed } from "@/lib/leads/suppression";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";

type OfferRow = {
  id: string;
  lead_id: string;
  buyer_id: string;
  status: string;
  price_gbp: number;
  released_at: string | null;
};

export type ReleaseResult = {
  /** True when this call did nothing because the offer was already released. */
  already: boolean;
  /** True when the release email reached Resend without error. */
  released: boolean;
  offer?: OfferRow;
  buyerFirm?: string;
  leadSource?: string;
};

export function offerFromAddress(): string {
  return process.env.LEAD_OFFER_FROM || "Ashfield Partner Network <leads@propertytaxpartners.co.uk>";
}

/**
 * Replies to buyer emails must land on the Resend inbound subdomain (any
 * address there hits the /api/leads/inbound/email webhook), so a firm that
 * replies instead of clicking Accept surfaces in Telegram with a
 * [Claim & release for them] button. Owner-preferred first-firm path
 * (concierge reply-to-claim, settled 2026-08-12): without this, replies died
 * in the root-domain mailbox.
 */
export function offerReplyTo(): string {
  return (
    process.env.LEAD_OFFER_REPLY_TO || "partners@inbound.propertytaxpartners.co.uk"
  );
}

export type ClaimOutcome =
  | "claimed"
  | "lost"
  | "suppressed"
  | "expired"
  | "not-offered"
  | "allocated"
  | "exclusive-unavailable"
  | "buyer-ineligible"
  | "error";

/**
 * The claim transition, shared by the buyer claim route and the bot/inbound
 * reply paths so they cannot drift. App side: suppression re-check (withdraws
 * the remaining offers), buyer DSA/active re-check. DB side: the atomic
 * claim_lead_offer() function (migration 20260819000002) serialises per lead
 * and enforces the claim-race rules — shared cap CLAIM_SLOTS_PER_LEAD, test
 * buyers exempt from the count, exclusive at EXCLUSIVE_MULTIPLIER x only
 * while wholly unclaimed. Release is NOT included; callers decide between
 * held and instant release.
 */
export async function claimOffer(
  offerId: string,
  opts?: { exclusive?: boolean },
): Promise<{
  outcome: ClaimOutcome;
  offer?: { id: string; lead_id: string; buyer_id: string; price_gbp: number };
}> {
  const res = await adminSelect<{
    id: string;
    lead_id: string;
    buyer_id: string;
    status: string;
    expires_at: string;
    price_gbp: number;
  }>("lead_offers", {
    select: "id,lead_id,buyer_id,status,expires_at,price_gbp",
    id: `eq.${offerId}`,
    limit: "1",
  });
  if (!res.ok || res.data.length === 0) return { outcome: "error" };
  const offer = res.data[0];

  // Re-checked at claim time, not only at offer time: an objection can land
  // between the alert and the claim, and DSA clause 3.5 says a Referral must
  // not then be made. The remaining offers are withdrawn rather than left
  // claimable (already-claimed firms keep what was lawfully released).
  if (await isSuppressed(offer.lead_id)) {
    await adminUpdate(
      "lead_offers",
      { lead_id: `eq.${offer.lead_id}`, status: "eq.offered" },
      { status: "lost" },
    ).catch(() => {});
    return { outcome: "suppressed", offer };
  }

  // The DSA signature gate is the lawful basis for the release; a buyer paused
  // or unsigned since the alert must not claim on an in-flight token. Fail
  // closed on a read error.
  const gate = await adminSelect<{ status: string; dsa_signed_at: string | null }>(
    "lead_buyers",
    { select: "status,dsa_signed_at", id: `eq.${offer.buyer_id}`, limit: "1" },
  );
  const gateRow = gate.ok ? gate.data[0] : undefined;
  if (!gateRow || gateRow.status !== "active" || !gateRow.dsa_signed_at) {
    return { outcome: "buyer-ineligible", offer };
  }

  // Atomic claim via PostgREST RPC (POST /rest/v1/rpc/claim_lead_offer).
  const rpc = await adminInsert<{ outcome: string; charged_gbp: number }>(
    "rpc/claim_lead_offer",
    {
      p_offer_id: offerId,
      p_cap: CLAIM_SLOTS_PER_LEAD,
      p_exclusive: Boolean(opts?.exclusive),
      p_exclusive_multiplier: EXCLUSIVE_MULTIPLIER,
    },
  );
  if (!rpc.ok || rpc.data.length === 0) return { outcome: "error", offer };
  const outcome = rpc.data[0].outcome as ClaimOutcome;
  const charged = rpc.data[0].charged_gbp;
  if (outcome !== "claimed") return { outcome, offer };

  // A claiming firm now owns the relationship: halt ALL nurture sequences so
  // the lead is never chased by both (idempotent across multiple claims).
  // Deliberately NOT stopNurture(), which records an opted_out consent event;
  // a sold lead has not withdrawn consent, it has been handed off. Failure
  // never blocks release.
  try {
    await adminUpdate(
      "lead_nurture_state",
      { lead_id: `eq.${offer.lead_id}` },
      { status: "stopped", next_action_at: null, updated_at: new Date().toISOString() },
    );
    await recordLeadContactEvent(offer.lead_id, "handed_off", "system", {
      reason: "buyer_claim",
      offer_id: offer.id,
      buyer_id: offer.buyer_id,
      exclusive: Boolean(opts?.exclusive),
    });
  } catch (err) {
    console.error("leads/offer-release: nurture halt failed", err);
  }

  return { outcome: "claimed", offer: { ...offer, price_gbp: charged } };
}

/**
 * Release a claimed offer's lead to its buyer. Only acts on status='claimed'
 * rows with released_at null; anything else returns {already:true}.
 */
export async function releaseClaimedOffer(offerId: string): Promise<ReleaseResult> {
  // Latch: claimed + unreleased -> stamped. Zero rows back means someone else
  // (double tap, concurrent path) got here first, or the offer is not claimed.
  const latch = await adminUpdate<OfferRow>(
    "lead_offers",
    { id: `eq.${offerId}`, status: "eq.claimed", released_at: "is.null" },
    { released_at: new Date().toISOString() },
  );
  if (!latch.ok || latch.data.length === 0) {
    return { already: true, released: false };
  }
  const offer = latch.data[0];

  const buyerRes = await adminSelect<{ email: string; firm_name: string }>("lead_buyers", {
    select: "email,firm_name",
    id: `eq.${offer.buyer_id}`,
  });
  const buyer = buyerRes.ok ? buyerRes.data[0] : undefined;

  const leadRes = await adminSelect<LeadRecord>("leads", {
    select:
      "id,created_at,submitted_at,full_name,email,phone,role,practice_name,message,source,source_url,status,consent_given,consent_text,extras",
    id: `eq.${offer.lead_id}`,
  });
  const lead = leadRes.ok ? leadRes.data[0] : undefined;

  let released = false;
  if (buyer && lead) {
    // Buyer release = "New qualified enquiry" template (owner request
    // 2026-08-19), constrained to DSA Annex A.2 fields. Supporting rows are
    // best-effort: a failed lookup drops a row, never the release.
    const [verRes, bookedRes, scoreRes] = await Promise.all([
      adminSelect<{ phone_status: string | null; email_status: string | null; verified_at: string | null }>(
        "lead_verification",
        { select: "phone_status,email_status,verified_at", lead_id: `eq.${offer.lead_id}`, limit: "1" },
      ),
      adminSelect<{ meta: { start?: string } | null }>("lead_contact_events", {
        select: "meta",
        lead_id: `eq.${offer.lead_id}`,
        event_type: "eq.booked",
        order: "ts.desc",
        limit: "1",
      }),
      adminSelect<{ case_tier: string | null; case_type: string | null; intent_line: string | null }>(
        "lead_value_scores",
        { select: "case_tier,case_type,intent_line", lead_id: `eq.${offer.lead_id}`, limit: "1" },
      ),
    ]);
    const ver = verRes.ok ? verRes.data[0] : undefined;
    const booked = bookedRes.ok ? bookedRes.data[0]?.meta?.start : undefined;
    const score = scoreRes.ok ? scoreRes.data[0] : undefined;
    // Sequence breakdown (owner instruction 2026-08-19): the dossier's
    // conversation timeline + response latency ride the release. Best-effort.
    let timeline: Awaited<ReturnType<typeof gatherLeadDossier>>["timeline"] = [];
    let responseLatencyMs: number | null = null;
    try {
      const dossier = await gatherLeadDossier({
        id: offer.lead_id,
        created_at: lead.created_at ?? "",
        visitor_id: null,
        message: lead.message ?? null,
      });
      timeline = dossier.timeline;
      responseLatencyMs = dossier.responseLatencyMs;
    } catch (err) {
      console.error("leads/offer-release: dossier gather failed", err);
    }
    const email = buildReleaseEmail(lead, {
      phoneStatus: ver?.phone_status,
      emailStatus: ver?.email_status,
      verifiedAt: ver?.verified_at,
      bookedSlot: typeof booked === "string" ? booked : null,
      caseTier: score?.case_tier,
      caseType: score?.case_type,
      intentLine: score?.intent_line,
      priceGbp: offer.price_gbp,
      timeline,
      responseLatencyMs,
    });
    try {
      const { error } = await getResend().emails.send({
        from: offerFromAddress(),
        to: buyer.email,
        replyTo: offerReplyTo(),
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
      if (error) {
        console.error("leads/offer-release: release send error", error);
      } else {
        released = true;
      }
    } catch (err) {
      console.error("leads/offer-release: release send threw", err);
    }

    // Mark the lead forwarded (best-effort; the offer row is the ledger).
    await adminUpdate("leads", { id: `eq.${offer.lead_id}` }, { status: "forwarded" }).catch(
      () => {},
    );

    // Tell the owner who won.
    try {
      await getResend().emails.send({
        from: getFromAddress(),
        to: resolveLeadTo(lead.source),
        subject: `Lead claimed by ${buyer.firm_name}: ${lead.full_name || offer.lead_id} (£${offer.price_gbp})`,
        text: [
          `${buyer.firm_name} claimed lead ${offer.lead_id} (${prettySource(lead.source)}) for £${offer.price_gbp}.`,
          released
            ? "Full details were released to the buyer automatically."
            : "RELEASE EMAIL FAILED, send the lead details manually.",
          `Offer ID: ${offer.id}`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("leads/offer-release: owner notify threw", err);
    }
  }

  return {
    already: false,
    released,
    offer,
    buyerFirm: buyer?.firm_name,
    leadSource: lead?.source ?? undefined,
  };
}

/**
 * Credit a claimed offer (bot [Credit] button). Mirrors
 * scripts/lead_offers_invoice.py --credit: the row moves to 'credited' with a
 * reason, and the invoice run nets it off. Only claimed rows can be credited.
 */
export async function creditOffer(
  offerId: string,
  reason: "spam_bot" | "duplicate_30d" | "wrong_category" | "dead_contact",
): Promise<boolean> {
  const res = await adminUpdate(
    "lead_offers",
    { id: `eq.${offerId}`, status: "eq.claimed" },
    { status: "credited", credit_reason: reason },
  );
  return res.ok && res.data.length > 0;
}
