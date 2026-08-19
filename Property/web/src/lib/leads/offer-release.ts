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
import { adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { buildLeadHtml, buildLeadText, prettySource, type LeadRecord } from "@/lib/leads/notify-email";
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

export type ClaimOutcome =
  | "claimed"
  | "lost"
  | "suppressed"
  | "expired"
  | "not-offered"
  | "buyer-ineligible"
  | "error";

/**
 * The claim transition, shared by the buyer claim route and the bot's
 * [Claim & release for them] button so the two paths cannot drift:
 * status checks -> suppression re-check (withdraws siblings) -> buyer
 * DSA/active re-check -> atomic first-click-wins flip -> siblings lost ->
 * nurture halt + handed_off event. Release is NOT included; callers decide
 * between held and instant release.
 */
export async function claimOffer(offerId: string): Promise<{
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

  if (offer.status === "lost") return { outcome: "lost", offer };
  if (offer.status === "claimed") return { outcome: "not-offered", offer };
  const expTs = Date.parse(offer.expires_at);
  if (offer.status !== "offered" || (Number.isFinite(expTs) && expTs < Date.now())) {
    return { outcome: "expired", offer };
  }

  // Re-checked at claim time, not only at offer time: an objection can land
  // between the alert and the claim, and DSA clause 3.5 says a Referral must
  // not then be made. The offer is withdrawn rather than left claimable.
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

  // Atomic first-click-wins: only an 'offered' row can flip to 'claimed', and
  // the partial unique index on (lead_id) where status='claimed' makes a
  // concurrent double-win impossible. Zero rows back = we lost the race.
  const claim = await adminUpdate<{ id: string }>(
    "lead_offers",
    { id: `eq.${offer.id}`, status: "eq.offered" },
    { status: "claimed", claimed_at: new Date().toISOString() },
  );
  if (!claim.ok || claim.data.length === 0) return { outcome: "lost", offer };

  // Siblings lose (best-effort; expiry sweep catches any stragglers).
  await adminUpdate(
    "lead_offers",
    { lead_id: `eq.${offer.lead_id}`, status: "eq.offered" },
    { status: "lost" },
  ).catch(() => {});

  // The buyer now owns the relationship: halt ALL nurture sequences so the
  // lead is never chased by both. Deliberately NOT stopNurture(), which
  // records an opted_out consent event; a sold lead has not withdrawn
  // consent, it has been handed off. Failure never blocks release.
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
    });
  } catch (err) {
    console.error("leads/offer-release: nurture halt failed", err);
  }

  return { outcome: "claimed", offer };
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
    const subject = `Lead released: ${lead.full_name || "new enquiry"} (${prettySource(lead.source)})`;
    try {
      const { error } = await getResend().emails.send({
        from: offerFromAddress(),
        to: buyer.email,
        subject,
        html: buildLeadHtml(lead),
        text: buildLeadText(lead),
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
