/**
 * Double opt-in confirmation route (GAP-5 adoption — mirrors generalist).
 *
 * The subscriber clicks the link in their confirmation email; this route
 * verifies the stateless HMAC token, activates the subscriber, and starts
 * their drip schedule.
 *
 * Replaces the old /api/newsletter/confirm/[token] fork route. The old
 * route had the EN-05 send-then-advance defect (welcome email sent, then
 * step advanced in a separate non-atomic write); the shared engine's
 * claim-before-send removes it.
 *
 * SEC-05: returns 503 when Supabase is unconfigured (never processes).
 */

import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured } from "@accounting-network/web-shared/nurture/admin";
import { verifyNurtureToken } from "@accounting-network/web-shared/nurture/tokens";
import { confirmSubscriber } from "@accounting-network/web-shared/nurture/subscribe";
import { buildAgencyNurtureConfig } from "@/config/nurture";
import { buildResendProvider } from "@/lib/nurture-provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ token: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const { token } = await ctx.params;

  let config;
  try {
    config = buildAgencyNurtureConfig();
  } catch (err) {
    console.error("[nurture/confirm] config error (EN-06)", err);
    return NextResponse.json({ ok: false, error: "config_error" }, { status: 503 });
  }

  const base = config.siteUrl.replace(/\/$/, "");
  const result = verifyNurtureToken(token, "confirm");

  if (!result.ok) {
    return NextResponse.redirect(
      `${base}/newsletter/confirmed?error=${encodeURIComponent(result.reason)}`,
      303,
    );
  }

  const provider = buildResendProvider();
  const cronArmed = Boolean(process.env.CRON_SECRET);

  const outcome = await confirmSubscriber(result.email, config, provider, cronArmed);

  if (outcome === "not_found") {
    return NextResponse.redirect(`${base}/newsletter/confirmed?error=not_found`, 303);
  }

  return NextResponse.redirect(`${base}/newsletter/confirmed`, 303);
}
