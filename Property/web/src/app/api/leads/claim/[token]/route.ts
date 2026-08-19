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
import { adminSelect } from "@/lib/supabase/admin";
import { renderTeaserHtml } from "@/lib/leads/offer-send";
import { claimOffer, releaseClaimedOffer } from "@/lib/leads/offer-release";
import { botArmed } from "@/lib/telegram";
import { isBotPaused } from "@/lib/leads/nurture-control";
import { notifyClaimHeld } from "@/lib/leads/bot-notify";
import type { TeaserJson } from "@/lib/leads/offer-teaser";

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
      `<h1>You claimed this lead</h1><p>Full contact details have been sent or are on their way. Check your inbox (and spam folder).</p>`,
    );
  }
  if (offer.status === "lost") return takenPage();
  if (offer.status === "expired" || isExpired(offer)) return expiredPage();
  if (offer.status !== "offered") return expiredPage();

  const actionUrl = new URL(_req.url).pathname;
  return page(
    "Accept this lead?",
    `<h1>Accept this lead exclusively · £${offer.price_gbp}</h1>
     <p>First firm to accept gets the lead. On accepting, full contact details are emailed to you and £${offer.price_gbp} is added to your monthly invoice under the agreed terms.</p>
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
      `<h1>You already claimed this lead</h1><p>Full contact details have been sent or are on their way.</p>`,
    );
  }

  // The whole claim transition (status checks, suppression re-check, buyer
  // DSA/active re-check, atomic first-click-wins flip, siblings, nurture halt)
  // is shared with the bot's claim-on-behalf path in offer-release.ts.
  const { outcome } = await claimOffer(offer.id);
  if (outcome === "lost") return takenPage();
  if (outcome === "expired" || outcome === "not-offered" || outcome === "error") {
    return expiredPage();
  }
  if (outcome === "suppressed") {
    return page(
      "No longer available",
      `<h1>This lead is no longer available</h1><p>The enquirer asked us not to pass their details on. Nothing has been charged.</p>`,
    );
  }
  if (outcome === "buyer-ineligible") {
    return page(
      "No longer available",
      `<h1>This offer is no longer available</h1><p>Please contact us if you believe this is an error. Nothing has been charged.</p>`,
    );
  }

  // Release, or hold for the owner's Telegram [Release details] tap.
  // Held ONLY when the bot is armed, unpaused, AND the prompt actually reached
  // Telegram: a silent hold (owner never told, buyer never served) is the one
  // unacceptable state, so any doubt falls open to the instant release the
  // published terms describe. LEAD_RELEASE_AUTO=1 restores instant release
  // without a deploy.
  const releaseAuto = (process.env.LEAD_RELEASE_AUTO || "").trim() === "1";
  let held = false;
  if (!releaseAuto && botArmed() && !(await isBotPaused())) {
    held = await notifyClaimHeld(
      { id: offer.id, lead_id: offer.lead_id, price_gbp: offer.price_gbp },
      await buyerFirmName(offer.buyer_id),
    );
  }

  if (held) {
    return page(
      "Lead accepted",
      `<h1>Lead accepted · it is yours</h1><p>Full contact details are on their way to your inbox. £${offer.price_gbp} will appear on your monthly invoice. The agreed credit policy applies if the lead is uncontactable or not genuine.</p>`,
    );
  }

  const release = await releaseClaimedOffer(offer.id);
  if (!release.released) {
    return page(
      "Accepted",
      `<h1>Lead accepted</h1><p>Your acceptance is recorded, but the details email could not be sent automatically. The details will be sent to you shortly.</p>`,
    );
  }
  return page(
    "Lead accepted",
    `<h1>Lead accepted · it is yours</h1><p>Full contact details have been emailed to you. £${offer.price_gbp} will appear on your monthly invoice. The agreed credit policy applies if the lead is uncontactable or not genuine.</p>`,
  );
}

async function buyerFirmName(buyerId: string): Promise<string> {
  try {
    const res = await adminSelect<{ firm_name: string }>("lead_buyers", {
      select: "firm_name",
      id: `eq.${buyerId}`,
      limit: "1",
    });
    return (res.ok && res.data[0]?.firm_name) || "A partner firm";
  } catch {
    return "A partner firm";
  }
}
