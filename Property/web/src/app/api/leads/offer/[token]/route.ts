/**
 * Owner action route: offer a lead to buyer firms.
 *
 * GET  /api/leads/offer/[token] -- click from the internal notify email.
 *   Verifies the HMAC "offer" token (48h TTL). Renders a confirm page showing
 *   the anonymised teaser exactly as buyers will see it, plus the matching
 *   buyer count and a POST button. A bare GET never sends anything, so email
 *   link-scanners cannot trigger offers (same pattern as the opt-out route).
 *
 * POST -- human form submission (confirm=1) only. Builds the teaser and sends
 *   the offer to every matching active buyer via sendOffers (idempotent:
 *   double-click re-inserts nothing and re-emails no one).
 */
import { NextResponse, type NextRequest } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { adminSelect } from "@/lib/supabase/admin";
import { matchingBuyers, offerTierFor, tierPrice } from "@/lib/leads/offer-config";
import { buildTeaser, tierLabel } from "@/lib/leads/offer-teaser";
import { sendOffers, renderTeaserHtml } from "@/lib/leads/offer-send";
import type { LeadRecord } from "@/lib/leads/notify-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
  button{background:#1a1a1a;color:#fff;border:none;padding:12px 24px;border-radius:6px;font-size:1rem;cursor:pointer}
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

type ScoreRow = {
  tier: string;
  case_tier: string | null;
  est_value_gbp: number;
  intent: string;
  work_type: string;
};

async function loadLeadAndScore(
  leadId: string,
): Promise<{ lead: LeadRecord; score: ScoreRow } | null> {
  const leadRes = await adminSelect<LeadRecord>("leads", {
    select: "id,created_at,submitted_at,full_name,email,phone,role,practice_name,message,source,source_url,status,extras,is_test",
    id: `eq.${leadId}`,
  });
  const lead = leadRes.ok ? leadRes.data[0] : undefined;
  if (!lead) return null;
  const scoreRes = await adminSelect<ScoreRow>("lead_value_scores", {
    select: "tier,case_tier,est_value_gbp,intent,work_type",
    lead_id: `eq.${leadId}`,
  });
  const score = scoreRes.ok ? scoreRes.data[0] : undefined;
  if (!score) return null;
  return { lead, score };
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "offer");
  if (!v.ok) {
    return page("Link expired", `<h1>This link has expired</h1><p>The offer link is no longer valid. Newer leads carry a fresh link in their notification email.</p>`);
  }

  const loaded = await loadLeadAndScore(v.leadId);
  if (!loaded) {
    return page("Not available", `<h1>Lead not available</h1><p>This lead has no value score yet or no longer exists.</p>`);
  }
  const { lead, score } = loaded;

  if (lead.is_test) {
    return page("Test lead", `<h1>Test lead</h1><p>Test leads are never offered to buyers.</p>`);
  }
  const offerTier = offerTierFor(score);
  if (offerTier === null || tierPrice(offerTier) === null) {
    return page(
      "Not sellable",
      `<h1>Not a sellable tier</h1><p>This lead has no sellable case tier (scored <strong>${score.case_tier ?? score.tier}</strong>), so it is not on the price card.</p>`,
    );
  }

  const buyers = await matchingBuyers((lead.source ?? "").toLowerCase(), offerTier);
  if (buyers.length === 0) {
    return page(
      "No matching buyers",
      `<h1>No active buyers for this lead</h1><p>No active buyer subscribes to the <strong>${lead.source ?? ""}</strong> vertical at tier <strong>${tierLabel(offerTier)}</strong>. Add or update a buyer row and reopen this link.</p>`,
    );
  }

  const teaser = await buildTeaser(lead, score);
  const actionUrl = new URL(_req.url).pathname;
  return page(
    "Offer to buyers?",
    `<h1>Offer this lead to ${buyers.length} buyer${buyers.length === 1 ? "" : "s"}?</h1>
     <p>Buyers will see exactly this, with an Accept link. Up to three firms may claim at the same fixed price, first come, first served; the offer expires after 24 hours.</p>
     ${renderTeaserHtml(teaser, tierPrice(offerTier))}
     <form method="POST" action="${actionUrl}" style="margin-top:24px"><input type="hidden" name="confirm" value="1"><button type="submit">Offer to buyers</button></form>`,
  );
}

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "offer");
  if (!v.ok) {
    return page("Link expired", `<h1>This link has expired</h1><p>The offer link is no longer valid.</p>`);
  }

  let isHumanConfirm = false;
  try {
    const contentType = _req.headers.get("content-type") ?? "";
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const body = await _req.text();
      isHumanConfirm = new URLSearchParams(body).get("confirm") === "1";
    }
  } catch {
    // fall through: treated as non-confirm
  }
  if (!isHumanConfirm) {
    return new NextResponse(null, { status: 200 });
  }

  const loaded = await loadLeadAndScore(v.leadId);
  const postTier = loaded ? offerTierFor(loaded.score) : null;
  if (!loaded || loaded.lead.is_test || postTier === null || tierPrice(postTier) === null) {
    return page("Not available", `<h1>Lead not available</h1><p>This lead cannot be offered (missing score, test lead, or unsellable tier).</p>`);
  }

  const { lead, score } = loaded;
  const teaser = await buildTeaser(lead, score);
  const result = await sendOffers(v.leadId, (lead.source ?? "").toLowerCase(), teaser);

  if (result.matched === 0) {
    return page("No matching buyers", `<h1>No active buyers for this lead</h1><p>No active buyer subscribes to this vertical/tier.</p>`);
  }
  if (result.offered === 0) {
    return page(
      "Already offered",
      `<h1>Already offered</h1><p>All ${result.matched} matching buyer${result.matched === 1 ? " has" : "s have"} already received this lead (or sends failed, check logs).</p>`,
    );
  }
  return page(
    "Offer sent",
    `<h1>Offer sent to ${result.offered} buyer${result.offered === 1 ? "" : "s"}</h1><p>${result.buyers.map((b) => `<strong>${b}</strong>`).join(", ")} will receive the teaser now. You will get an email when a buyer accepts.</p>`,
  );
}
