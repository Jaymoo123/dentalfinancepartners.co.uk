/**
 * Email one-tap confirm route.
 *
 * GET  /api/leads/confirm/[token]
 *   Verifies the HMAC token. If invalid, returns a small "link expired" HTML
 *   page (200). If valid, returns a small confirmation HTML page with a POST
 *   form so the human must click a button. This prevents email-security link
 *   scanners from triggering the confirm signal on a bare GET.
 *
 * POST /api/leads/confirm/[token]
 *   Verifies the token again; on success records the confirmed signal and
 *   redirects 303 to /thank-you?confirmed=1. On invalid token, redirects 303
 *   to /thank-you. Never 500s; never leaks the failure reason.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordResponseAndEvaluate } from "@/lib/leads/contactability";

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
  button{background:#1a56db;color:#fff;border:none;padding:12px 24px;border-radius:6px;font-size:1rem;cursor:pointer}
  button:hover{background:#1447c0}
`;

function expiredPage(): NextResponse {
  const html = `<!DOCTYPE html><html lang="en"><head>${COMMON_HEAD}<title>Link expired</title><style>${PAGE_STYLE}</style></head><body><h1>This link has expired</h1><p>The confirmation link is no longer valid. Please <a href="/contact">contact us</a> if you need further help.</p></body></html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "confirm");

  if (!v.ok) {
    return expiredPage();
  }

  // Post back to the same token path. Use the pathname only (never the raw
  // _req.url) so an attacker-appended query string cannot be reflected into the
  // action attribute. The token is a validated base64url HMAC, so the pathname
  // is injection-safe.
  const actionUrl = new URL(_req.url).pathname;
  const html = `<!DOCTYPE html><html lang="en"><head>${COMMON_HEAD}<title>Confirm your call request</title><style>${PAGE_STYLE}</style></head><body><h1>Confirm your call request</h1><p>Click the button below to confirm that you would like us to call you. We will be in touch shortly.</p><form method="POST" action="${actionUrl}"><button type="submit">Yes, confirm my call</button></form></body></html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "confirm");

  if (!v.ok) {
    return NextResponse.redirect(new URL("/thank-you", _req.url), 303);
  }

  try {
    await recordResponseAndEvaluate(v.leadId, "confirmed", "email");
  } catch (err) {
    // DB hiccup: log and continue so the redirect still reaches the user.
    console.error("[leads/confirm] recordResponseAndEvaluate failed", err);
  }

  return NextResponse.redirect(new URL("/thank-you?confirmed=1", _req.url), 303);
}
