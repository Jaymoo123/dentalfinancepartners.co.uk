/**
 * RFC 8058 one-click email opt-out route.
 *
 * GET  /api/leads/optout/[token]  -- human click from email footer link.
 *   Verifies the token. If invalid, returns a small "link expired" HTML page
 *   (200). If valid, returns a small "Stop these messages?" page with a POST
 *   form so the human must click a button. This prevents email-security link
 *   scanners from silently opting real leads out on a bare GET.
 *
 * POST /api/leads/optout/[token]  -- two purposes:
 *   (a) RFC 8058 one-click machine post: a mail client posts body
 *       "List-Unsubscribe=One-Click" with no "confirm" field. The route stops
 *       the nurture sequence and returns 200 empty (per the RFC). Invalid/
 *       expired tokens also return 200 (never error to a mail client).
 *   (b) Human form submission: the page above posts with confirm=1. The route
 *       stops the nurture sequence and returns a small "You have been
 *       unsubscribed" HTML page (200).
 *
 * On success: calls stopNurture(leadId, "email") which records an opted_out
 * event and flips lead_nurture_state.status to "stopped". The gate in
 * contactability.ts ensures a subsequent confirm/booking link cannot
 * resurrect an opted-out lead.
 *
 * Keep the 1-year optout token TTL intact (set in the token layer).
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { stopNurture } from "@/lib/leads/contactability";

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
  button{background:#1a1a1a;color:#fff;border:none;padding:12px 24px;border-radius:6px;font-size:1rem;cursor:pointer}
  button:hover{background:#333}
`;

function expiredPage(): NextResponse {
  const html = `<!DOCTYPE html><html lang="en"><head>${COMMON_HEAD}<title>Link expired</title><style>${PAGE_STYLE}</style></head><body><h1>This link has expired</h1><p>The opt-out link is no longer valid. Please <a href="/contact">contact us</a> if you need further help.</p></body></html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

async function handleOptOut(leadId: string): Promise<void> {
  // stopNurture records the opted_out event and stops the sequence.
  // It is idempotent: calling it twice is safe.
  await stopNurture(leadId, "email");
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "optout");

  if (!v.ok) {
    return expiredPage();
  }

  // Post back to the same token path. Use the pathname only (never the raw
  // _req.url) so an attacker-appended query string cannot be reflected into the
  // action attribute. The token is a validated base64url HMAC, so the pathname
  // is injection-safe.
  const actionUrl = new URL(_req.url).pathname;
  const html = `<!DOCTYPE html><html lang="en"><head>${COMMON_HEAD}<title>Stop these messages?</title><style>${PAGE_STYLE}</style></head><body><h1>Stop these messages?</h1><p>Click the button below to stop receiving follow-up messages from us.</p><form method="POST" action="${actionUrl}"><input type="hidden" name="confirm" value="1"><button type="submit">Yes, stop messaging me</button></form></body></html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "optout");

  // RFC 8058: always return 200 to a machine post, even on an invalid token.
  if (!v.ok) {
    return new NextResponse(null, { status: 200 });
  }

  let isHumanConfirm = false;
  try {
    const contentType = _req.headers.get("content-type") ?? "";
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const body = await _req.text();
      const params = new URLSearchParams(body);
      isHumanConfirm = params.get("confirm") === "1";
    }
  } catch {
    // Body parse failure: treat as machine one-click path.
  }

  try {
    await handleOptOut(v.leadId);
  } catch (err) {
    console.error("[leads/optout] stopNurture failed (POST)", err);
  }

  if (isHumanConfirm) {
    const html = `<!DOCTYPE html><html lang="en"><head>${COMMON_HEAD}<title>Unsubscribed</title><style>${PAGE_STYLE}</style></head><body><h1>You have been unsubscribed</h1><p>We have stopped all follow-up messages. You will not hear from us again unless you get in touch directly.</p><p><a href="/">Return to the home page</a></p></body></html>`;
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Machine one-click (RFC 8058): return 200 empty body.
  return new NextResponse(null, { status: 200 });
}
