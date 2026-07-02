/**
 * Inbound email webhook for Resend: processes replies to Property nurture outreach.
 *
 * When a lead replies to a nurture email, Resend posts an email.received event here.
 * The route verifies the Svix signature, resolves the sender to a Property lead,
 * detects opt-outs, and classifies the reply before updating contactability state.
 *
 * Uses the same Svix signature pattern as /api/nurture/events but with a separate
 * secret (LEAD_RESEND_INBOUND_SECRET), so inbound and outbound webhook endpoints
 * can be rotated independently.
 *
 * Configure in Resend dashboard:
 *   Inbound routing domain: propertytaxpartners.co.uk (or a reply.* subdomain)
 *   Endpoint URL: https://www.propertytaxpartners.co.uk/api/leads/inbound/email
 *   Events: email.received (inbound only)
 *   Signing secret (whsec_...): set as LEAD_RESEND_INBOUND_SECRET
 *
 * Classification labels:
 *   genuine_reply    a real human response expressing interest, questions, or intent
 *   auto_responder   out-of-office, auto-acknowledgement, or delivery notification
 *   opt_out          any message expressing a wish not to be contacted further
 *
 * Always responds 200 so Resend does not retry on transient failures.
 * Returns 503 when the signing secret is absent (never processes without verification).
 * Returns 401 on a signature mismatch.
 */

import { type NextRequest } from "next/server";
import { verifyResendWebhook } from "@accounting-network/web-shared/nurture/webhook";
import { adminSelect } from "@/lib/supabase/admin";
import { classify } from "@/lib/ai/anthropic";
import { recordResponseAndEvaluate, stopNurture } from "@/lib/leads/contactability";
import { extractEmail, stripQuotedHistory } from "@/lib/leads/email-parse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Payload types ─────────────────────────────────────────────────────────────

type InboundEmailData = {
  from?: string;
  to?: string | string[];
  subject?: string;
  text?: string;
  html?: string;
  [key: string]: unknown;
};

type InboundEmailPayload = {
  type?: string;
  data?: InboundEmailData;
  [key: string]: unknown;
};

// Keyword opt-out detection (case-insensitive, word-bounded).
const OPT_OUT_RE =
  /\b(unsubscribe|stop|opt.?out|remove me|no longer|don't contact|do not contact)\b/i;

// ── Lead resolution ───────────────────────────────────────────────────────────

type LeadRow = { id: string };

async function resolveLeadByEmail(senderEmail: string): Promise<string | null> {
  const res = await adminSelect<LeadRow>("leads", {
    select: "id",
    email: `eq.${senderEmail}`,
    order: "created_at.desc",
    limit: "1",
  });
  if (res.ok && res.data.length > 0) return res.data[0].id;
  return null;
}

// ── Response helpers ──────────────────────────────────────────────────────────

function ok200(): Response {
  return new Response(null, { status: 200 });
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const secret = process.env.LEAD_RESEND_INBOUND_SECRET;
  if (!secret) {
    console.error("[leads/inbound/email] LEAD_RESEND_INBOUND_SECRET not set — refusing");
    return new Response("Service not configured", { status: 503 });
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    // Malformed body: ack so Resend does not retry.
    return ok200();
  }

  if (!verifyResendWebhook(secret, req.headers, rawBody)) {
    return new Response("Forbidden", { status: 401 });
  }

  let payload: InboundEmailPayload;
  try {
    payload = JSON.parse(rawBody) as InboundEmailPayload;
  } catch {
    return ok200();
  }

  // Only handle inbound email events; ignore outbound delivery events silently.
  if (payload.type !== "email.received") return ok200();

  const data = payload.data ?? {};
  const fromRaw = typeof data.from === "string" ? data.from : "";
  const subject = typeof data.subject === "string" ? data.subject : "";
  const rawText = typeof data.text === "string" ? data.text : "";

  const senderEmail = extractEmail(fromRaw);
  if (!senderEmail) return ok200();

  const strippedBody = stripQuotedHistory(rawText);

  // Resolve sender to a Property lead (most recent match wins).
  let leadId: string | null = null;
  try {
    leadId = await resolveLeadByEmail(senderEmail);
  } catch (err) {
    console.error("[leads/inbound/email] resolveLeadByEmail failed", err);
  }
  if (!leadId) return ok200();

  try {
    // Detect opt-out by keyword BEFORE calling the AI (avoids unnecessary API spend).
    const isKeywordOptOut =
      OPT_OUT_RE.test(subject) || OPT_OUT_RE.test(strippedBody);
    if (isKeywordOptOut) {
      await stopNurture(leadId, "email");
      return ok200();
    }

    // Classify with Haiku. Null (AI down or unconfigured) is safe-defaulted to
    // genuine_reply so a real human reply is never silently dropped.
    const label = await classify({
      system:
        "You are classifying an inbound email reply to a property-tax service follow-up " +
        "sent to the sender about their own property-tax enquiry. " +
        "genuine_reply = a real human response expressing interest, questions, or intent. " +
        "auto_responder = out-of-office, auto-acknowledgement, delivery notification, or other system message. " +
        "opt_out = any message expressing a wish not to be contacted further.",
      prompt: `Subject: ${subject.slice(0, 200)}\n\nBody:\n${strippedBody.slice(0, 300)}`,
      labels: ["genuine_reply", "auto_responder", "opt_out"] as const,
      cacheSystem: true,
    });

    // Null AI response -> treat as genuine (safe direction: never drop a real reply).
    const effective = label ?? "genuine_reply";

    if (effective === "opt_out") {
      await stopNurture(leadId, "email");
    } else if (effective === "genuine_reply") {
      await recordResponseAndEvaluate(leadId, "replied", "email", {
        body: strippedBody.slice(0, 300),
      });
    }
    // auto_responder: record nothing, fall through to 200.
  } catch (err) {
    console.error("[leads/inbound/email] processing failed", err);
    // Still return 200 so Resend does not retry into the same failure.
  }

  return ok200();
}
