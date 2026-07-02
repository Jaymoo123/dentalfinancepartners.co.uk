/**
 * Operator "mark as forwarded to DJH" one-click route (AN-2 forwarded writer).
 *
 * The READY-FOR-DJH handoff email (handoff.ts) carries a link here. When the
 * operator has actually forwarded the lead to DJH, they click it and confirm,
 * which flips leads.status 'contactable' -> 'forwarded' so the contactability
 * funnel / console / digest reflect the real hand-over (and give a timestamp
 * for the 24-month Delivery Log). 'forwarded' therefore means the operator
 * genuinely sent it to DJH, not merely that our brief email was delivered.
 *
 * GET  renders a small confirmation page (a button that POSTs) so an email
 *      security scanner in the operator's inbox cannot mark leads forwarded on a
 *      bare GET. POST performs the flip. The flip is guarded to 'contactable'
 *      only and is idempotent (a second click updates zero rows).
 *
 * Never 500s; never reveals token-failure reasons.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { adminConfigured, adminUpdate } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ token: string }> };

const COMMON_HEAD = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex">
`;

const PAGE_STYLE = `
  body{font-family:system-ui,sans-serif;max-width:480px;margin:60px auto;padding:0 20px;color:#1a1a1a;background:#fff}
  h1{font-size:1.25rem;margin-bottom:1rem}
  p{margin-bottom:1.25rem;line-height:1.6}
  a{color:#1a56db}
  button{background:#047857;color:#fff;border:none;padding:12px 24px;border-radius:6px;font-size:1rem;cursor:pointer}
  button:hover{background:#036c4e}
`;

function page(title: string, bodyHtml: string): NextResponse {
  const html = `<!DOCTYPE html><html lang="en"><head>${COMMON_HEAD}<title>${title}</title><style>${PAGE_STYLE}</style></head><body>${bodyHtml}</body></html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function expiredPage(): NextResponse {
  return page(
    "Link expired",
    `<h1>This link has expired</h1><p>The forwarding-confirmation link is no longer valid. You can still mark the lead in the console.</p>`,
  );
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "forwarded");
  if (!v.ok) return expiredPage();

  // Post back to the same token path. Use the pathname only (never the raw
  // _req.url) so an appended query string cannot be reflected into the action.
  const actionUrl = new URL(_req.url).pathname;
  return page(
    "Mark as forwarded to DJH?",
    `<h1>Mark this lead as forwarded to DJH?</h1><p>Click the button once you have forwarded this enquiry to DJH. This records the hand-over for our data-sharing log.</p><form method="POST" action="${actionUrl}"><button type="submit">Yes, I have forwarded it to DJH</button></form>`,
  );
}

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "forwarded");
  if (!v.ok) return expiredPage();

  if (adminConfigured()) {
    try {
      // Flip 'contactable' -> 'forwarded' only. Guarded + idempotent: a second
      // click (or a lead not in the contactable state) updates zero rows.
      const flip = await adminUpdate<{ id: string }>(
        "leads",
        { id: `eq.${v.leadId}`, status: "in.(contactable)" },
        { status: "forwarded" },
      );
      if (flip.data.length > 0) {
        await recordLeadContactEvent(v.leadId, "operator_update", "system", {
          kind: "forwarded_to_djh",
        });
      }
    } catch (err) {
      // Best-effort: never break the operator's confirmation on a DB hiccup.
      console.error("[leads/forwarded] status flip failed", err);
    }
  }

  return page(
    "Marked as forwarded",
    `<h1>Thank you</h1><p>This lead is now marked as forwarded to DJH. You can close this tab.</p>`,
  );
}
