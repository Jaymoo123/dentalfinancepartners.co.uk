/**
 * Inbound Twilio webhook — SMS and WhatsApp replies.
 *
 * Twilio POSTs application/x-www-form-urlencoded. We validate the signature
 * (HMAC-SHA1 over the full request URL + sorted POST params, no Twilio SDK),
 * resolve the sender to a Property lead, and either record their reply as a
 * contactability signal or honour a STOP opt-out.
 *
 * Always responds 200 with empty TwiML so Twilio does not retry.
 */

import { type NextRequest } from "next/server";
import crypto from "crypto";
import { adminSelect } from "@/lib/supabase/admin";
import { toE164UK } from "@/lib/leads/channels";
import { recordResponseAndEvaluate, stopNurture } from "@/lib/leads/contactability";
import { acknowledgeReply } from "@/lib/leads/reply-ack";
import { conciergeEnabled, handleInboundReply } from "@/lib/leads/concierge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMPTY_TWIML =
  '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

const OPT_OUT_KEYWORDS = new Set([
  "STOP",
  "STOPALL",
  "UNSUBSCRIBE",
  "CANCEL",
  "END",
  "QUIT",
]);

/** Verify Twilio signature per https://www.twilio.com/docs/usage/security */
function verifyTwilioSignature(
  authToken: string,
  signature: string,
  url: string,
  params: URLSearchParams,
): boolean {
  // Build the validation string: URL + sorted key/value pairs (no separators).
  const sortedKeys = Array.from(params.keys()).sort();
  const str = sortedKeys.reduce(
    (acc, key) => acc + key + (params.get(key) ?? ""),
    url,
  );
  const expected = crypto
    .createHmac("sha1", authToken)
    .update(str)
    .digest("base64");
  // Timing-safe compare (pad to equal length if needed, though base64 is fixed).
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

type LeadIdRow = { lead_id: string };
type LeadRow = { id: string };
type FullLeadRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string | null;
  source: string;
};

async function fetchFullLead(leadId: string): Promise<FullLeadRow | null> {
  const res = await adminSelect<FullLeadRow>("leads", {
    id: `eq.${leadId}`,
    select: "id,full_name,email,phone,role,source",
    limit: "1",
  });
  return res.ok && res.data.length > 0 ? res.data[0] : null;
}

async function resolveLeadId(e164: string): Promise<string | null> {
  // Primary: lead_verification table has a phone_e164 column indexed for lookup.
  const verRes = await adminSelect<LeadIdRow>("lead_verification", {
    select: "lead_id",
    phone_e164: `eq.${e164}`,
    limit: "1",
  });
  if (verRes.ok && verRes.data.length > 0) {
    return verRes.data[0].lead_id;
  }

  // Fallback: match the last 9 digits in leads.phone (handles formatting variation).
  const last9 = e164.slice(-9);
  const leadsRes = await adminSelect<LeadRow>("leads", {
    select: "id",
    phone: `ilike.*${last9}`,
    source: "eq.property",
    order: "created_at.desc",
    limit: "1",
  });
  if (leadsRes.ok && leadsRes.data.length > 0) {
    return leadsRes.data[0].id;
  }

  return null;
}

function twimlOk(): Response {
  return new Response(EMPTY_TWIML, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

export async function POST(req: NextRequest) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    return new Response("Service not configured", { status: 503 });
  }

  // Read raw body first — needed for signature verification AND param parsing.
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return twimlOk(); // Malformed body: ack so Twilio doesn't retry.
  }

  // Reconstruct the public-facing URL Twilio signed (proxy-aware).
  const forwProto = req.headers.get("x-forwarded-proto");
  const forwHost = req.headers.get("x-forwarded-host");
  let requestUrl = req.url;
  if (forwProto && forwHost) {
    try {
      const parsed = new URL(req.url);
      parsed.protocol = forwProto.split(",")[0].trim() + ":";
      parsed.host = forwHost.split(",")[0].trim();
      // Twilio signs the URL as configured in the console, which omits the
      // default HTTPS port. Force-strip any port so a forwarded ":443" (or the
      // internal port) cannot break the HMAC match and 403 every real reply.
      parsed.port = "";
      requestUrl = parsed.toString();
    } catch {
      // Keep req.url as-is.
    }
  }

  const twilioSig = req.headers.get("x-twilio-signature") ?? "";
  const params = new URLSearchParams(raw);

  if (!verifyTwilioSignature(authToken, twilioSig, requestUrl, params)) {
    return new Response("Forbidden", { status: 403 });
  }

  const fromRaw = params.get("From") ?? "";
  const body = params.get("Body") ?? "";

  // Determine channel and normalise phone to E.164.
  const isWhatsApp = fromRaw.startsWith("whatsapp:");
  const channel: "whatsapp" | "sms" = isWhatsApp ? "whatsapp" : "sms";
  const phoneRaw = isWhatsApp ? fromRaw.slice("whatsapp:".length) : fromRaw;
  const e164 = toE164UK(phoneRaw);

  if (!e164) {
    // Unrecognisable number — ack and move on.
    return twimlOk();
  }

  let leadId: string | null = null;
  try {
    leadId = await resolveLeadId(e164);
  } catch (err) {
    console.error("[leads/inbound/twilio] resolveLeadId failed", err);
  }

  if (!leadId) {
    // Unknown sender — ack, no-op.
    return twimlOk();
  }

  const keyword = body.trim().toUpperCase();
  try {
    if (OPT_OUT_KEYWORDS.has(keyword)) {
      await stopNurture(leadId, channel);
    } else {
      const result = await recordResponseAndEvaluate(leadId, "replied", channel, {
        body: body.slice(0, 300),
      });
      if (conciergeEnabled()) {
        const fullLead = await fetchFullLead(leadId).catch(() => null);
        if (fullLead) {
          await handleInboundReply({
            leadId,
            channel,
            body: body.slice(0, 300),
            lead: {
              full_name: fullLead.full_name,
              email: fullLead.email,
              phone: fullLead.phone,
              role: fullLead.role,
              source: fullLead.source,
            },
          }).catch((err) => console.error("[leads/inbound/twilio] concierge failed", err));
        } else {
          // Lead fetch failed: fall back to static ack so the lead still hears from us.
          await acknowledgeReply({
            leadId,
            channel,
            replyTo: e164,
            replyBody: body.slice(0, 300),
            alreadyContactable: result.alreadyPromoted === true,
          }).catch((err) => console.error("[leads/inbound/twilio] reply-ack failed", err));
        }
      } else {
        // Concierge disabled: keep original behaviour byte-identical.
        await acknowledgeReply({
          leadId,
          channel,
          replyTo: e164,
          replyBody: body.slice(0, 300),
          alreadyContactable: result.alreadyPromoted === true,
        }).catch((err) => console.error("[leads/inbound/twilio] reply-ack failed", err));
      }
    }
  } catch (err) {
    console.error("[leads/inbound/twilio] signal recording failed", err);
    // Still ack 200 so Twilio doesn't retry into the same failure.
  }

  return twimlOk();
}
