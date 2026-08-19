/**
 * Offer-send: creates lead_offers rows for every matching buyer and emails
 * each buyer the anonymised teaser with their own Accept link.
 *
 * Idempotent by construction: offers insert with onConflict (lead_id, buyer_id)
 * ignoreDuplicates, and emails go only to buyers whose insert succeeded, so a
 * double-click on the owner's "Offer to buyers" button sends nothing twice.
 *
 * Used by the owner-triggered offer route (Increment 3) and by auto mode
 * (Increment 7). Buyer emails send under a neutral partner-network identity,
 * never a site brand.
 */
import { getResend } from "@/lib/resend";
import { adminInsert, adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { isSuppressed } from "@/lib/leads/suppression";
import { matchingBuyers, tierPrice, type LeadBuyer } from "@/lib/leads/offer-config";
import { tierLabel, type TeaserJson } from "@/lib/leads/offer-teaser";
import { escapeHtml } from "@/lib/leads/notify-email";
import { offerFromAddress, offerReplyTo } from "@/lib/leads/offer-release";

const FONT = "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function offerBaseUrl(): string {
  return (process.env.LEAD_OFFER_BASE_URL || "https://www.propertytaxpartners.co.uk").replace(
    /\/+$/,
    "",
  );
}

// ---------------------------------------------------------------------------
// Teaser rendering (shared by buyer emails, owner notify email, confirm pages)
// ---------------------------------------------------------------------------

type TeaserRow = { label: string; value: string };

function teaserRows(t: TeaserJson, priceGbp?: number | null): TeaserRow[] {
  const rows: TeaserRow[] = [];
  if (t.site) rows.push({ label: "Vertical", value: t.site });
  if (t.tier) rows.push({ label: "Tier", value: tierLabel(t.tier) });
  if (typeof priceGbp === "number") rows.push({ label: "Price (ex VAT)", value: `£${priceGbp}` });
  // Est. first-year value row removed 2026-08-14: alerts carry the case tier and the
  // price, never an estimate of what the enquirer might be worth.
  if (t.intent && t.intent !== "unknown") rows.push({ label: "Topic", value: t.intent });
  if (t.work_type && t.work_type !== "unknown") rows.push({ label: "Work type", value: t.work_type });
  if (t.role) rows.push({ label: "Enquirer", value: t.role });
  if (t.surface) rows.push({ label: "Came via", value: t.surface });
  if (t.submitted_date) rows.push({ label: "Submitted", value: t.submitted_date });
  if (t.callback_booked) rows.push({ label: "Callback booked?", value: t.callback_booked });
  if (t.backlog) rows.push({ label: "Note", value: "Backlog lead (date above is accurate)" });
  return rows;
}

export function renderTeaserHtml(t: TeaserJson, priceGbp?: number | null): string {
  const rows = teaserRows(t, priceGbp)
    .map(
      (r) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:600;vertical-align:top;">${escapeHtml(r.label)}</td>
        <td style="padding:8px 0 8px 16px;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:500;vertical-align:top;">${escapeHtml(r.value)}</td>
      </tr>`,
    )
    .join("");
  const situation = (t.situation ?? "").trim();
  const enquiry = (t.redacted_message ?? "").trim();
  const panel = (label: string, body: string) =>
    `<p style="margin:16px 0 6px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${label}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;">
      <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;color:#334155;font-size:14px;line-height:1.6;">${escapeHtml(body)}</td></tr>
    </table>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed;">
      <colgroup><col style="width:150px;" /><col /></colgroup>${rows}
    </table>${situation ? panel("Situation", situation) : ""}${
      enquiry
        ? panel("The enquiry, in their words", enquiry) +
          `<p style="margin:8px 0 0;color:#64748b;font-size:12px;line-height:1.5;">Names, phone numbers, email addresses, postcodes, web addresses and company names are removed above. You get the enquiry in full, unredacted, with the enquirer's contact details, only if you claim it.</p>`
        : ""
    }`;
}

export function renderTeaserText(t: TeaserJson, priceGbp?: number | null): string {
  const lines = teaserRows(t, priceGbp).map((r) => `${r.label}: ${r.value}`);
  const situation = (t.situation ?? "").trim();
  if (situation) lines.push("", "SITUATION", situation);
  const enquiry = (t.redacted_message ?? "").trim();
  if (enquiry) {
    lines.push(
      "",
      "THE ENQUIRY, IN THEIR WORDS",
      enquiry,
      "",
      "Names, phone numbers, email addresses, postcodes, web addresses and company " +
        "names are removed above. You get the enquiry in full, unredacted, with the " +
        "enquirer's contact details, only if you claim it.",
    );
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Buyer offer email
// ---------------------------------------------------------------------------

/**
 * Reply-to-accept email (owner decisions 2026-08-19): no button, no link, no
 * greeting, no terms paragraph. The teaser plus one bold instruction and one
 * ignore line; everything else lives in the release email and the signed
 * agreement. The firm replies YES to accept; the inbound webhook detects it,
 * claims atomically and the owner releases.
 */
function buyerOfferEmail(
  _buyer: LeadBuyer,
  teaser: TeaserJson,
  priceGbp: number,
  _expiresHours: number,
  leadRef?: string,
): { subject: string; html: string; text: string } {
  // The [L-xxxxxxxx] ref in the subject is load-bearing: a firm's reply keeps
  // it in "Re: ...", which is how a YES is matched to the exact lead when the
  // firm has several offers open.
  const subject = `New ${teaser.site || "specialist"} enquiry available, ${tierLabel(teaser.tier)} tier, £${priceGbp}${leadRef ? ` [${leadRef}]` : ""}`;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#f1f5f9;">
<tr><td align="center" style="padding:24px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
<tr><td style="background:#0f172a;padding:22px 28px;">
<p style="margin:0 0 6px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Lead available</p>
<h1 style="margin:0;color:#ffffff;font-size:19px;font-weight:700;line-height:1.3;">${escapeHtml(teaser.site || "Specialist")} enquiry · ${escapeHtml(tierLabel(teaser.tier))} tier</h1>
</td></tr>
<tr><td style="padding:24px 28px 28px;color:#334155;font-size:15px;line-height:1.6;">
${renderTeaserHtml(teaser, priceGbp)}
<p style="margin:22px 0 0;font-size:16px;font-weight:700;color:#0f172a;">Want this lead? Just reply YES to this email.</p>
<p style="margin:8px 0 0;color:#64748b;font-size:13px;">If it's not for you, please ignore.</p>
</td></tr>
<tr><td style="padding:16px 28px 20px;border-top:1px solid #e2e8f0;">
<p style="margin:0;color:#94a3b8;font-size:12px;">Ashfield Partner Network · you receive these because your firm has a signed data-sharing agreement with Ashfield Trading Ltd.</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
  const text = [
    `New ${teaser.site || "specialist"} enquiry available (${tierLabel(teaser.tier)} tier, £${priceGbp})`,
    "",
    renderTeaserText(teaser, priceGbp),
    "",
    "Want this lead? Just reply YES to this email.",
    "If it's not for you, please ignore.",
  ].join("\n");
  return { subject, html, text };
}

/**
 * Deterministic buyer-acceptance detection for reply-to-accept. Judges only
 * the FIRST non-empty line (signature blocks sank the STOP classifier once;
 * never scan the whole body), caps its length, accepts the yes-family in any
 * casing, and refuses when any negation is present.
 */
export function isBuyerAcceptance(body: string): boolean {
  const firstLine = (body || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!firstLine || firstLine.length > 80) return false;
  const line = firstLine.toLowerCase();
  if (/\b(no|not|don't|dont|isn't|isnt|won't|wont|never|unsubscribe|stop|pause)\b/.test(line)) {
    return false;
  }
  return /(^|\W)(y|ya|yes|yep|yeah|yeh|accept|accepted|interested)(\W|$)/.test(line);
}

/** Pull the [L-xxxxxxxx] lead ref out of a reply subject ("Re: ... [L-12ab34cd]"). */
export function parseLeadRefFromSubject(subject: string): string | null {
  const m = /\[L-([0-9a-f]{8})\]/i.exec(subject || "");
  return m ? m[1].toLowerCase() : null;
}

/** "yes exclusive" / "EXCLUSIVE please" on the first line asks for the lock. */
export function isExclusiveRequest(body: string): boolean {
  const firstLine = (body || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!firstLine || firstLine.length > 80) return false;
  return /\bexclusive\b/i.test(firstLine);
}

// ---------------------------------------------------------------------------
// Send
// ---------------------------------------------------------------------------

const OFFER_EXPIRY_HOURS = 24;

/**
 * A lead may only enter the pool if the notice it was collected under
 * disclosed sharing. Decided from the lead's OWN stored consent_text, never
 * from the current site config: leads collected during the 2026-08-17
 * in-house-wording window (or under a named-firm notice) are not disclosable
 * to the partner network. Substring anchors, because the full string embeds
 * each site's display name.
 */
const SHARING_CONSENT_PHRASES = [
  "will share your details with", // estate sharing wording (partner network)
  "a firm from our specialist partner network",
  "may be shared with a specialist partner firm", // 2026-07-15 generic paused wording
];

export function consentAllowsSharing(consentText?: string | null): boolean {
  const text = (consentText ?? "").toLowerCase();
  if (!text) return false;
  return SHARING_CONSENT_PHRASES.some((p) => text.includes(p));
}

/**
 * True when the lead was already sold in a raw Bulk Supply batch.
 * Sharing paths keep the default failClosed=true (offering on a failed read
 * has no remedy); notify-only callers pass failClosed:false so a DB blip
 * cannot fabricate an "already sold" message.
 */
export async function isRawSupplied(
  leadId: string,
  opts?: { failClosed?: boolean },
): Promise<boolean> {
  const res = await adminSelect<{ id: string }>("lead_supply", {
    select: "id",
    lead_id: `eq.${leadId}`,
    limit: "1",
  });
  if (!res.ok) return opts?.failClosed === false ? false : true;
  return res.data.length > 0;
}

export type SendOffersResult = {
  matched: number;
  offered: number;
  buyers: string[];
};

type OfferRow = { id: string; token: string; buyer_id: string };

export async function sendOffers(
  leadId: string,
  source: string,
  teaser: TeaserJson,
): Promise<SendOffersResult> {
  const price = tierPrice(teaser.tier);
  if (price === null) return { matched: 0, offered: 0, buyers: [] };

  // An enquirer who has objected is never offered (DSA clause 3.5, LIA safeguard).
  if (await isSuppressed(leadId)) {
    console.warn("leads/offer-send: lead suppressed, not offering", leadId);
    return { matched: 0, offered: 0, buyers: [] };
  }

  // A raw-supplied lead is excluded from tiered offers forever (owner decision
  // 2026-08-19): the raw buyer already holds its full details.
  if (await isRawSupplied(leadId)) {
    console.warn("leads/offer-send: lead already raw-supplied, not offering", leadId);
    return { matched: 0, offered: 0, buyers: [] };
  }

  // The stored consent decides disclosability, not the current site copy.
  const consentRes = await adminSelect<{ consent_text: string | null }>("leads", {
    select: "consent_text",
    id: `eq.${leadId}`,
    limit: "1",
  });
  if (!consentRes.ok || !consentAllowsSharing(consentRes.data[0]?.consent_text)) {
    console.warn("leads/offer-send: consent wording does not disclose sharing, not offering", leadId);
    return { matched: 0, offered: 0, buyers: [] };
  }

  const buyers = await matchingBuyers(source, teaser.tier);
  if (buyers.length === 0) return { matched: 0, offered: 0, buyers: [] };

  const expiresAt = new Date(Date.now() + OFFER_EXPIRY_HOURS * 3600_000).toISOString();
  const offeredTo: string[] = [];

  for (const buyer of buyers) {
    // ignoreDuplicates: re-offering the same lead to the same buyer is a no-op,
    // and no email goes out when the insert returns no row.
    const res = await adminInsert<OfferRow>(
      "lead_offers",
      [
        {
          lead_id: leadId,
          buyer_id: buyer.id,
          teaser,
          expires_at: expiresAt,
          price_gbp: price,
        },
      ],
      { onConflict: "lead_id,buyer_id", ignoreDuplicates: true },
    );
    if (!res.ok || res.data.length === 0) continue;

    const email = buyerOfferEmail(buyer, teaser, price, OFFER_EXPIRY_HOURS, `L-${leadId.slice(0, 8)}`);
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
        console.error("leads/offer-send: resend error", buyer.ref, error);
        continue;
      }
      offeredTo.push(buyer.firm_name);
    } catch (err) {
      console.error("leads/offer-send: send threw", buyer.ref, err);
    }
  }

  return { matched: buyers.length, offered: offeredTo.length, buyers: offeredTo };
}

// ---------------------------------------------------------------------------
// Re-offer (bot [Re-offer] button on an expired offer)
// ---------------------------------------------------------------------------

export type ReofferResult = "reoffered" | "stale" | "blocked" | "error";

/**
 * Flip ONE expired offer row back to offered and resend the buyer email with
 * its existing claim token. A plain sendOffers cannot do this: the
 * (lead_id, buyer_id) row already exists, so its ignoreDuplicates insert is a
 * silent no-op. The conditional PATCH doubles as the stale-tap latch (a second
 * tap, or a race with the hourly expiry sweep, updates zero rows).
 */
export async function reofferExpired(offerId: string): Promise<ReofferResult> {
  type FullOffer = {
    id: string;
    lead_id: string;
    buyer_id: string;
    token: string;
    teaser: TeaserJson;
    price_gbp: number;
  };
  const res = await adminSelect<FullOffer>("lead_offers", {
    select: "id,lead_id,buyer_id,token,teaser,price_gbp",
    id: `eq.${offerId}`,
    limit: "1",
  });
  if (!res.ok || res.data.length === 0) return "error";
  const offer = res.data[0];

  // Same gates as a fresh offer: an objection or a raw supply since expiry
  // blocks the re-offer.
  if ((await isSuppressed(offer.lead_id)) || (await isRawSupplied(offer.lead_id))) {
    return "blocked";
  }

  const expiresAt = new Date(Date.now() + OFFER_EXPIRY_HOURS * 3600_000).toISOString();
  const flip = await adminUpdate<FullOffer>(
    "lead_offers",
    { id: `eq.${offerId}`, status: "eq.expired" },
    { status: "offered", expires_at: expiresAt },
  );
  if (!flip.ok) return "error";
  if (flip.data.length === 0) return "stale";

  const buyerRes = await adminSelect<LeadBuyer>("lead_buyers", {
    select: "id,ref,firm_name,contact_name,email,status,sources,min_tier,dsa_signed_at",
    id: `eq.${offer.buyer_id}`,
    status: "eq.active",
    dsa_signed_at: "not.is.null",
    limit: "1",
  });
  const buyer = buyerRes.ok ? buyerRes.data[0] : undefined;
  if (!buyer) {
    // Buyer no longer eligible: put the row back so it cannot sit claimable.
    await adminUpdate(
      "lead_offers",
      { id: `eq.${offerId}`, status: "eq.offered" },
      { status: "expired" },
    ).catch(() => {});
    return "blocked";
  }

  const email = buyerOfferEmail(
    buyer,
    offer.teaser,
    offer.price_gbp,
    OFFER_EXPIRY_HOURS,
    `L-${offer.lead_id.slice(0, 8)}`,
  );
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
      console.error("leads/offer-send: reoffer resend error", offerId, error);
      return "error";
    }
  } catch (err) {
    console.error("leads/offer-send: reoffer send threw", offerId, err);
    return "error";
  }
  return "reoffered";
}
