/**
 * Buyer claim route: first firm to accept an offered lead claims it exclusively.
 *
 * GET  /api/leads/claim/[token] -- click from the buyer offer email.
 *   Looks up the offer by its unique DB token. Renders the teaser with an
 *   "Accept this lead" POST form (offered), a confirmation page (already
 *   claimed by this buyer), or a taken/expired page. A bare GET never claims,
 *   so a buyer's email link-scanner cannot accept leads (opt-out route pattern).
 *
 * POST -- human form submission (confirm=1). Conditional UPDATE to 'claimed'
 *   WHERE status='offered'; the partial unique index lead_offers_one_claim
 *   backstops any race, so exactly one buyer ever wins. On win: sibling offers
 *   marked 'lost', in-flight nurture stopped (buyer and nurture must never
 *   chase the same person), full lead details emailed to the buyer instantly
 *   in the forward-ready notify format, owner notified.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getResend, getFromAddress } from "@/lib/resend";
import { adminSelect, adminUpdate } from "@/lib/supabase/admin";
import { isSuppressed } from "@/lib/leads/suppression";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { buildLeadHtml, buildLeadText, prettySource, type LeadRecord } from "@/lib/leads/notify-email";
import { renderTeaserHtml } from "@/lib/leads/offer-send";
import type { TeaserJson } from "@/lib/leads/offer-teaser";
import { resolveLeadTo } from "@/lib/lead-routing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

type Ctx = { params: Promise<{ token: string }> };

const COMMON_HEAD = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex">
`;

const PAGE_STYLE = `
  body{font-family:system-ui,sans-serif;max-width:560px;margin:60px auto;padding:0 20px;color:#1a1a1a;background:#fff}
  h1{font-size:1.25rem;margin-bottom:1rem}
  p{margin-bottom:1.25rem;line-height:1.6}
  button{background:#0f172a;color:#fff;border:none;padding:12px 24px;border-radius:6px;font-size:1rem;cursor:pointer}
  button:hover{background:#333}
  table{border-collapse:collapse;width:100%}
`;

function page(title: string, body: string): NextResponse {
  const html = `<!DOCTYPE html><html lang="en"><head>${COMMON_HEAD}<title>${title}</title><style>${PAGE_STYLE}</style></head><body>${body}</body></html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

type OfferRow = {
  id: string;
  lead_id: string;
  buyer_id: string;
  teaser: TeaserJson;
  status: string;
  expires_at: string;
  price_gbp: number;
};

async function loadOffer(token: string): Promise<OfferRow | null> {
  // Token comes from the URL path; it only ever reaches PostgREST as a filter
  // value. Reject anything that is not the expected hex shape outright.
  if (!/^[a-f0-9]{16,128}$/i.test(token)) return null;
  const res = await adminSelect<OfferRow>("lead_offers", {
    select: "id,lead_id,buyer_id,teaser,status,expires_at,price_gbp",
    token: `eq.${token}`,
  });
  return res.ok ? (res.data[0] ?? null) : null;
}

function isExpired(offer: OfferRow): boolean {
  const t = Date.parse(offer.expires_at);
  return Number.isFinite(t) && t < Date.now();
}

function takenPage(): NextResponse {
  return page(
    "Lead taken",
    `<h1>This lead has been taken</h1><p>Another firm accepted this enquiry first. You will receive the next matching lead automatically.</p>`,
  );
}

function expiredPage(): NextResponse {
  return page(
    "Offer expired",
    `<h1>This offer has expired</h1><p>Offers are open for a limited window. You will receive the next matching lead automatically.</p>`,
  );
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const offer = await loadOffer(token);
  if (!offer) {
    return page("Not found", `<h1>Offer not found</h1><p>This link is not valid.</p>`);
  }

  if (offer.status === "claimed") {
    return page(
      "Lead claimed",
      `<h1>You claimed this lead</h1><p>Full contact details were emailed to you when you accepted. Check your inbox (and spam folder).</p>`,
    );
  }
  if (offer.status === "lost") return takenPage();
  if (offer.status === "expired" || isExpired(offer)) return expiredPage();
  if (offer.status !== "offered") return expiredPage();

  const actionUrl = new URL(_req.url).pathname;
  return page(
    "Accept this lead?",
    `<h1>Accept this lead exclusively · £${offer.price_gbp}</h1>
     <p>First firm to accept gets the lead. On accepting, full contact details are emailed to you immediately and £${offer.price_gbp} is added to your monthly invoice under the agreed terms.</p>
     ${renderTeaserHtml(offer.teaser, offer.price_gbp)}
     <form method="POST" action="${actionUrl}" style="margin-top:24px"><input type="hidden" name="confirm" value="1"><button type="submit">Accept this lead · £${offer.price_gbp}</button></form>`,
  );
}

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const offer = await loadOffer(token);
  if (!offer) {
    return page("Not found", `<h1>Offer not found</h1><p>This link is not valid.</p>`);
  }

  let isHumanConfirm = false;
  try {
    const contentType = _req.headers.get("content-type") ?? "";
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const body = await _req.text();
      isHumanConfirm = new URLSearchParams(body).get("confirm") === "1";
    }
  } catch {
    // fall through
  }
  if (!isHumanConfirm) {
    return new NextResponse(null, { status: 200 });
  }

  if (offer.status === "claimed") {
    return page(
      "Already claimed",
      `<h1>You already claimed this lead</h1><p>Full contact details were emailed to you when you accepted.</p>`,
    );
  }
  if (offer.status !== "offered" || isExpired(offer)) {
    return offer.status === "lost" ? takenPage() : expiredPage();
  }

  // Checked again here, not only at offer time: an objection can land between the
  // alert and the claim, and DSA clause 3.5 says a Referral must not then be made.
  // The offer is withdrawn rather than left claimable.
  if (await isSuppressed(offer.lead_id)) {
    await adminUpdate(
      "lead_offers",
      { lead_id: `eq.${offer.lead_id}`, status: "eq.offered" },
      { status: "lost" },
    ).catch(() => {});
    return page(
      "No longer available",
      `<h1>This lead is no longer available</h1><p>The enquirer asked us not to pass their details on. Nothing has been charged.</p>`,
    );
  }

  // Atomic first-click-wins: only an 'offered' row can flip to 'claimed', and
  // the partial unique index on (lead_id) where status='claimed' makes a
  // concurrent double-win impossible. Zero rows back = we lost the race.
  const claim = await adminUpdate<OfferRow>(
    "lead_offers",
    { id: `eq.${offer.id}`, status: "eq.offered" },
    { status: "claimed", claimed_at: new Date().toISOString() },
  );
  if (!claim.ok || claim.data.length === 0) {
    return takenPage();
  }

  // Siblings lose (best-effort; expiry sweep catches any stragglers).
  await adminUpdate(
    "lead_offers",
    { lead_id: `eq.${offer.lead_id}`, status: "eq.offered" },
    { status: "lost" },
  ).catch(() => {});

  // The buyer now owns the relationship: halt ALL nurture sequences so the
  // lead is never chased by both. Deliberately NOT stopNurture(), which records
  // an opted_out consent event; a sold lead has not withdrawn consent, it has
  // been handed off. Failure never blocks release.
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
    console.error("leads/claim: nurture halt failed", err);
  }

  // Release: full details to the buyer, forward-ready format.
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
        from: process.env.LEAD_OFFER_FROM || "Ashfield Partner Network <leads@propertytaxpartners.co.uk>",
        to: buyer.email,
        subject,
        html: buildLeadHtml(lead),
        text: buildLeadText(lead),
      });
      if (error) {
        console.error("leads/claim: release send error", error);
      } else {
        released = true;
        await adminUpdate(
          "lead_offers",
          { id: `eq.${offer.id}` },
          { released_at: new Date().toISOString() },
        ).catch(() => {});
      }
    } catch (err) {
      console.error("leads/claim: release send threw", err);
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
      console.error("leads/claim: owner notify threw", err);
    }
  }

  if (!buyer || !lead || !released) {
    return page(
      "Accepted",
      `<h1>Lead accepted</h1><p>Your acceptance is recorded${released ? "" : ", but the details email could not be sent automatically. The details will be sent to you shortly"}.</p>`,
    );
  }
  return page(
    "Lead accepted",
    `<h1>Lead accepted · it is yours</h1><p>Full contact details have been emailed to you. £${offer.price_gbp} will appear on your monthly invoice. The agreed credit policy applies if the lead is uncontactable or not genuine.</p>`,
  );
}
