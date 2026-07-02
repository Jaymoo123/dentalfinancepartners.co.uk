/**
 * RFC 8058 one-click email opt-out route.
 *
 * GET  /api/leads/optout/[token]  -- human click from email footer link.
 *   Verifies the token, stops the nurture sequence, redirects to
 *   /thank-you?optout=1 for feedback. Expired/invalid tokens redirect to
 *   /thank-you (still graceful: never show an error to a mail client).
 *
 * POST /api/leads/optout/[token]  -- RFC 8058 one-click machine post (a mail
 *   client fires this when the user clicks "Unsubscribe" in the header). Verifies
 *   the token, stops the nurture sequence, returns 200 empty body. Invalid/expired
 *   tokens also return 200 (never error to a mail client per the RFC).
 *
 * On success: calls stopNurture(leadId, "email") which records an opted_out event
 * and flips lead_nurture_state.status to "stopped". The gate in contactability.ts
 * ensures a subsequent confirm/booking link click cannot resurrect an opted-out lead.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { stopNurture } from "@/lib/leads/contactability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ token: string }> };

async function handleOptOut(leadId: string): Promise<void> {
  // stopNurture records the opted_out event and stops the sequence.
  // It is idempotent: calling it twice is safe.
  await stopNurture(leadId, "email");
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "optout");

  if (!v.ok) {
    // Expired or tampered: redirect gracefully, never reveal reason.
    return NextResponse.redirect(new URL("/thank-you", _req.url), 302);
  }

  try {
    await handleOptOut(v.leadId);
  } catch (err) {
    console.error("[leads/optout] stopNurture failed", err);
    // Still redirect: user experience must not break on a DB hiccup.
  }

  return NextResponse.redirect(new URL("/thank-you?optout=1", _req.url), 302);
}

export async function POST(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;
  const v = verifyLeadToken(token, "optout");

  // RFC 8058: always return 200 to a machine post, even on error.
  if (!v.ok) {
    return new NextResponse(null, { status: 200 });
  }

  try {
    await handleOptOut(v.leadId);
  } catch (err) {
    console.error("[leads/optout] stopNurture failed (POST)", err);
  }

  return new NextResponse(null, { status: 200 });
}
