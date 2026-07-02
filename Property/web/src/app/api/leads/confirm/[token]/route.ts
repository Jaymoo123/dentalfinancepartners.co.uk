/**
 * Email one-tap confirm route.
 *
 * A lead clicks the confirm link from their nurture email; this route verifies
 * the stateless HMAC token, records the contactability signal, and redirects to
 * /thank-you. Never leaks token failure reasons; never 500s on DB hiccups.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordResponseAndEvaluate } from "@/lib/leads/contactability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ token: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { token } = await ctx.params;

  const v = verifyLeadToken(token, "confirm");

  if (!v.ok) {
    // Link expired or tampered — redirect gracefully, never 500, never reveal reason.
    return NextResponse.redirect(new URL("/thank-you", _req.url), 302);
  }

  try {
    await recordResponseAndEvaluate(v.leadId, "confirmed", "email");
  } catch (err) {
    // DB hiccup: still redirect so the user sees a friendly page.
    console.error("[leads/confirm] recordResponseAndEvaluate failed", err);
  }

  return NextResponse.redirect(new URL("/thank-you?confirmed=1", _req.url), 302);
}
