/**
 * Agency nurture subscribe route (GAP-5 adoption — mirrors generalist).
 *
 * Delegates to the shared handleSubscribe engine, composed with the agency
 * NurtureConfig. Replaces the old /api/newsletter/subscribe fork route
 * (legacy fork deleted in this commit).
 *
 * Double opt-in: active when NURTURE_TOKEN_SECRET is set in env. When set,
 * the subscriber gets a confirmation email and is set to status='pending'
 * until they click the link. When unset, they are immediately activated
 * (single opt-in).
 *
 * LD-09: consent must be explicitly true in the request body (the SignupForm
 * checkbox). The route returns 400 consent_required otherwise — consent is
 * never inferred.
 *
 * EN-04 dormancy / arming: the cron is armed only when CRON_SECRET is set.
 * This route is posture-neutral; the operator decides arming at deploy.
 *
 * SEC-05: returns 503 when Supabase service role is unconfigured.
 */

import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured } from "@accounting-network/web-shared/nurture/admin";
import { handleSubscribe } from "@accounting-network/web-shared/nurture/subscribe";
import { buildAgencyNurtureConfig } from "@/config/nurture";
import { buildResendProvider } from "@/lib/nurture-provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  email?: string;
  consent?: boolean;
  consent_text?: string;
  visitor_id?: string;
  topic?: string;
  source?: string;
  agency_type?: string;
  company_url?: string; // honeypot
};

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: non-empty means bot.
  if ((body.company_url ?? "").trim() !== "") {
    return NextResponse.json({ ok: true }); // silent success to bots
  }

  let config;
  try {
    config = buildAgencyNurtureConfig();
  } catch (err) {
    console.error("[nurture/subscribe] config error (EN-06)", err);
    return NextResponse.json({ ok: false, error: "config_error" }, { status: 503 });
  }

  const provider = buildResendProvider();

  // Build the confirm-email sender (used when NURTURE_TOKEN_SECRET is set).
  const sendConfirmEmail = async (email: string, confirmUrl: string) => {
    await provider.send({
      from: config.fromAddress,
      to: email,
      replyTo: config.replyTo,
      subject: "Confirm your subscription to The Agency Founder Tax Brief",
      html: [
        `<p>Thanks for subscribing to The Agency Founder Tax Brief.</p>`,
        `<p>Please confirm your subscription by clicking the link below. The link expires in 7 days.</p>`,
        `<p><a href="${confirmUrl}">Confirm my subscription</a></p>`,
        `<p style="font-size:12px;color:#94a3b8;">If you did not subscribe, you can safely ignore this email.</p>`,
      ].join("\n"),
      text: [
        "Thanks for subscribing to The Agency Founder Tax Brief.",
        "",
        "Please confirm your subscription by opening the link below. The link expires in 7 days.",
        "",
        `Confirm: ${confirmUrl}`,
        "",
        "If you did not subscribe, you can safely ignore this email.",
      ].join("\n"),
      headers: {
        "List-Unsubscribe": `<${config.siteUrl}/newsletter>`,
      },
    });
  };

  const cronArmed = Boolean(process.env.CRON_SECRET);

  const result = await handleSubscribe(
    {
      email: body.email ?? "",
      consent: body.consent === true,
      consentText: body.consent_text,
      visitorId: body.visitor_id,
      topic: body.topic ?? body.agency_type,
      source: body.source,
    },
    config,
    provider,
    sendConfirmEmail,
    cronArmed,
  );

  if (!result.ok) {
    const status =
      result.error === "bad_email" || result.error === "consent_required" ? 400 : 500;
    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  return NextResponse.json({ ok: true, mode: result.mode });
}
