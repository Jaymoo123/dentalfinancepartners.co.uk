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
import { adminSelect, adminUpdate, adminInsert } from "@/lib/supabase/admin";
import { classify } from "@/lib/ai/anthropic";
import { recordResponseAndEvaluate, stopNurture } from "@/lib/leads/contactability";
import { extractEmail, stripQuotedHistory } from "@/lib/leads/email-parse";
import { fetchReceivedEmailText } from "@/lib/leads/inbound-content";
import { classifyEmailReplyIntent } from "@/lib/leads/reply-intent";
import { copyAiEnabled } from "@/lib/leads/sequence-gen";
import { verifyLead } from "@/lib/leads/verify";
import { extractUkPhone } from "@/lib/leads/reply-extract";
import { phoneMeetsFloor } from "@/lib/leads/field-floors";
import { acknowledgeEmailReply, notifyOperatorOfReply } from "@/lib/leads/reply-ack";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { isRawSupplied, isBuyerAcceptance } from "@/lib/leads/offer-send";
import { claimOffer, offerFromAddress, offerReplyTo } from "@/lib/leads/offer-release";
import { notifyBuyerReply, notifyClaimHeld, notifySuppliedLeadResponded } from "@/lib/leads/bot-notify";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";

/** Short plain ack to a buyer, best-effort (never blocks the webhook). */
async function sendBuyerAck(to: string, subject: string, bodyText: string): Promise<void> {
  try {
    if (!process.env.RESEND_API_KEY) return;
    await getResend().emails.send({
      from: offerFromAddress(),
      to,
      replyTo: offerReplyTo(),
      subject,
      text: `${bodyText}\n\nAshfield Partner Network`,
    });
  } catch (err) {
    console.error("[leads/inbound/email] buyer ack failed", err);
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Payload types ─────────────────────────────────────────────────────────────

type InboundEmailData = {
  /** Id of the received email; the body must be fetched with it (the webhook carries metadata only). */
  email_id?: string;
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

// Opt-out detection lives in classifyEmailReplyIntent (reply-intent.ts): tiered
// so our own quoted footer ("reply STOP") can never opt a lead out, the exact
// failure of 2026-07-03, when a Hotmail reply's unstripped quote did just that.

// ── Lead resolution ───────────────────────────────────────────────────────────

type LeadRow = {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  source: string;
};

async function resolveLeadByEmail(senderEmail: string): Promise<LeadRow | null> {
  const res = await adminSelect<LeadRow>("leads", {
    select: "id,full_name,email,phone,source",
    email: `eq.${senderEmail}`,
    order: "created_at.desc",
    limit: "1",
  });
  if (res.ok && res.data.length > 0) return res.data[0];
  return null;
}

// ── Buyer replies ─────────────────────────────────────────────────────────────

/**
 * If the sender is an active lead buyer, handle the reply and report
 * handled=true (inactive buyers fall through to the normal enquirer path).
 *
 * Reply-to-accept (owner decision 2026-08-19): a yes-family reply with
 * EXACTLY ONE open offer claims it atomically on the spot; the owner then
 * gets the usual [Release details] prompt and the buyer gets a short ack.
 * A yes with several open offers cannot be trusted to pick the right lead,
 * and any other reply is business text: both surface in Telegram with
 * per-offer [Claim & release] buttons.
 */
async function handleBuyerReply(senderEmail: string, body: string): Promise<boolean> {
  const buyerRes = await adminSelect<{ id: string; firm_name: string }>("lead_buyers", {
    select: "id,firm_name",
    email: `eq.${senderEmail}`,
    status: "eq.active",
    limit: "1",
  });
  if (!buyerRes.ok || buyerRes.data.length === 0) return false;
  const buyer = buyerRes.data[0];

  let offers: Array<{ id: string; lead_id: string; price_gbp: number; teaser: { tier?: string } }> = [];
  try {
    const res = await adminSelect<{
      id: string;
      lead_id: string;
      price_gbp: number;
      teaser: { tier?: string };
    }>("lead_offers", {
      select: "id,lead_id,price_gbp,teaser",
      buyer_id: `eq.${buyer.id}`,
      status: "eq.offered",
      order: "created_at.desc",
      limit: "5",
    });
    if (res.ok) offers = res.data;
  } catch (err) {
    console.error("[leads/inbound/email] buyer offers load failed", err);
  }

  if (offers.length === 1 && isBuyerAcceptance(body)) {
    const offer = offers[0];
    const { outcome } = await claimOffer(offer.id);
    if (outcome === "claimed") {
      await notifyClaimHeld(
        { id: offer.id, lead_id: offer.lead_id, price_gbp: offer.price_gbp },
        buyer.firm_name,
      ).catch(() => {});
      await sendBuyerAck(
        senderEmail,
        "Lead accepted, details on their way",
        `Thanks, the lead is yours. Full contact details will be with you shortly, and £${offer.price_gbp} is added to your monthly invoice under the agreed terms.`,
      );
    } else {
      await sendBuyerAck(
        senderEmail,
        "That lead is no longer available",
        "Thanks for the quick reply, but that lead is no longer available. You will receive the next matching lead automatically.",
      );
    }
    return true;
  }

  const sent = await notifyBuyerReply(
    buyer.firm_name,
    body,
    offers.map((o) => ({
      id: o.id,
      lead_id: o.lead_id,
      price_gbp: o.price_gbp,
      tier: o.teaser?.tier,
    })),
  );
  if (!sent) {
    // Telegram down: the reply must still reach a human. Plain operator email.
    try {
      if (process.env.RESEND_API_KEY) {
        await getResend().emails.send({
          from: getFromAddress(),
          to: resolveLeadTo(undefined),
          subject: `Buyer reply from ${buyer.firm_name}`,
          text: `${buyer.firm_name} replied to a lead offer email:\n\n${body.slice(0, 2000)}\n\nOpen offers for this firm: ${offers.length}. Handle from your inbox or the console.`,
        });
      }
    } catch (err) {
      console.error("[leads/inbound/email] buyer reply email fallback failed", err);
    }
  }
  return true;
}

// ── Response helpers ──────────────────────────────────────────────────────────

function ok200(): Response {
  return new Response(null, { status: 200 });
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const secret = process.env.LEAD_RESEND_INBOUND_SECRET;
  if (!secret) {
    console.error("[leads/inbound/email] LEAD_RESEND_INBOUND_SECRET not set, refusing");
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

  // Resend's email.received payload is metadata-only: the body must be fetched
  // by email_id. Keep the inline-text path first so a payload that does carry
  // text (tests, future shapes) skips the extra call.
  let rawText = typeof data.text === "string" ? data.text : "";
  if (!rawText.trim() && typeof data.email_id === "string" && data.email_id) {
    rawText = await fetchReceivedEmailText(data.email_id);
  }

  const senderEmail = extractEmail(fromRaw);
  if (!senderEmail) return ok200();

  const strippedBody = stripQuotedHistory(rawText);

  // Buyer-address-first: a partner firm replying to an offer ping must NEVER
  // fall through into the enquirer paths (opt-out detection, phone capture,
  // nurture promotion). Checked before lead resolution because a buyer contact
  // may once have submitted a form and matched a lead row.
  try {
    const handled = await handleBuyerReply(senderEmail, strippedBody);
    if (handled) return ok200();
  } catch (err) {
    console.error("[leads/inbound/email] buyer branch failed", err);
    // Fall through to lead resolution; worst case the reply is dropped like
    // any unmatched sender.
  }

  // Resolve sender to a Property lead (most recent match wins).
  let lead: LeadRow | null = null;
  try {
    lead = await resolveLeadByEmail(senderEmail);
  } catch (err) {
    console.error("[leads/inbound/email] resolveLeadByEmail failed", err);
  }
  if (!lead) return ok200();
  const leadId = lead.id;

  // A raw-supplied lead's replies are an owner FYI only: the raw buyer owns
  // the relationship, so no ack email, no operator pack, no promotion. The
  // reply event is still recorded for the audit trail.
  try {
    if (await isRawSupplied(leadId, { failClosed: false })) {
      await recordLeadContactEvent(leadId, "replied", "email", {
        body: strippedBody.slice(0, 2000),
        raw_supplied: true,
      });
      await notifySuppliedLeadResponded(leadId);
      return ok200();
    }
  } catch (err) {
    console.error("[leads/inbound/email] raw-supplied check failed", err);
  }

  try {
    // Detect opt-out deterministically BEFORE calling the AI (avoids API spend).
    if (classifyEmailReplyIntent(strippedBody, subject) === "opt_out") {
      await stopNurture(leadId, "email");
      return ok200();
    }

    // Classify with Haiku. Null (AI down, unconfigured, or flag off) is safe-defaulted
    // to genuine_reply so a real human reply is never silently dropped.
    //
    // Gate on copyAiEnabled(): an Anthropic key added for the copy layer must not
    // silently fire ungated calls on lead content when the flag is OFF.
    const label = copyAiEnabled()
      ? await classify({
          system:
            "You are classifying an inbound email reply to a property-tax service follow-up " +
            "sent to the sender about their own property-tax enquiry. " +
            "genuine_reply = a real human response expressing interest, questions, or intent. " +
            "auto_responder = out-of-office, auto-acknowledgement, delivery notification, or other system message. " +
            "opt_out = any message expressing a wish not to be contacted further.",
          prompt: `Subject: ${subject.slice(0, 200)}\n\nBody:\n${strippedBody.slice(0, 300)}`,
          labels: ["genuine_reply", "auto_responder", "opt_out"] as const,
          cacheSystem: true,
        })
      : null;

    // Null AI response -> treat as genuine (safe direction: never drop a real reply).
    const effective = label ?? "genuine_reply";

    if (effective === "opt_out") {
      await stopNurture(leadId, "email");
    } else if (effective === "genuine_reply") {
      // If the lead has no usable phone yet, capture one from the reply so the gate
      // can promote (detail-capture leads reply with their number). Deterministic
      // extraction, no third party; Twilio Lookup verifies it, so a wrong grab just
      // fails verification and does not promote.
      if (!phoneMeetsFloor(lead.phone)) {
        const extracted = extractUkPhone(strippedBody);
        if (extracted) {
          try {
            await adminUpdate("leads", { id: `eq.${leadId}` }, { phone: extracted });
            const v = await verifyLead({ email: lead.email, phone: extracted });
            await adminInsert(
              "lead_verification",
              {
                lead_id: leadId,
                phone_status: v.phone.status,
                phone_line_type: v.phone.line_type,
                phone_carrier: v.phone.carrier,
                phone_e164: v.phone.e164,
                email_status: v.email.status,
                email_domain: v.email.domain,
                verify_pass: v.verify_pass,
                provider: v.provider,
                raw: v.raw,
              },
              { onConflict: "lead_id" },
            );
          } catch (e) {
            console.error("[leads/inbound/email] phone capture failed", e);
          }
        }
      }
      const promote = await recordResponseAndEvaluate(leadId, "replied", "email", {
        body: strippedBody.slice(0, 2000),
      });
      // Always surface the reply to the operator so a human sees exactly what the
      // prospect said (name, number, best time), whether or not it promoted. If the
      // lead was already handed off before this reply, this resends the full
      // handoff pack ("Updated enquiry") so nothing said post-handoff is lost.
      await notifyOperatorOfReply({
        leadId,
        channel: "email",
        replyBody: strippedBody,
        alreadyContactable: promote.alreadyPromoted === true,
      });
      // Close the loop with the prospect: one short ack email confirming the
      // reply landed and a specialist will call. Idempotent per lead, dormancy
      // and test gated, fail-soft inside (never throws out of the webhook).
      await acknowledgeEmailReply({ leadId });
    }
    // auto_responder: record nothing, fall through to 200.
  } catch (err) {
    console.error("[leads/inbound/email] processing failed", err);
    // Still return 200 so Resend does not retry into the same failure.
  }

  return ok200();
}
