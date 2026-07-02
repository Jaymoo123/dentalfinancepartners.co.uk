/**
 * Resend webhook sink for lead-nurture email engagement events (Property).
 *
 * Uses Svix signature verification copied exactly from the subscriber-nurture
 * webhook at /api/nurture/events (SEC-05 posture: refuses when the secret is
 * unset). Uses its OWN secret (LEAD_RESEND_WEBHOOK_SECRET) so the two webhook
 * endpoints can be rotated independently.
 *
 * Configure in the Resend dashboard as a SEPARATE webhook endpoint from the
 * subscriber one:
 *   Endpoint URL: https://www.propertytaxpartners.co.uk/api/leads/events
 *   Events: email.opened, email.clicked, email.bounced, email.complained
 *   Signing secret (starts with whsec_): set as LEAD_RESEND_WEBHOOK_SECRET
 *
 * Lead resolution: provider_id in lead_nurture_sends maps to the Resend
 * message id in the payload. An unknown id is almost certainly a subscriber-
 * nurture message; those are silently ignored (200 empty) so the subscriber
 * webhook endpoint handles them correctly without cross-contamination.
 *
 * Complaint handling: records send_failed, then sends a throttled operator
 * alert (at most once per lead per 24 h) so the rate can be monitored. Auto-
 * pause lands with the observability layer; this is alert-only v1.
 *
 * Always returns 200. Never blocks on non-critical work.
 */

import { NextResponse, type NextRequest } from "next/server";
import { adminConfigured } from "@accounting-network/web-shared/nurture/admin";
import { verifyResendWebhook } from "@accounting-network/web-shared/nurture/webhook";
import { adminSelect } from "@/lib/supabase/admin";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";

export const runtime = "nodejs";
export const maxDuration = 15;
export const dynamic = "force-dynamic";

// ── Payload types ─────────────────────────────────────────────────────────────

type ResendPayload = {
  type?: string;
  data?: {
    email_id?: string;
    click?: { link?: string };
    [key: string]: unknown;
  };
};

type SendLookupRow = {
  lead_id: string;
  step: number;
};

type LeadRow = {
  id: string;
  full_name: string;
  source: string;
};

type ContactEventRow = {
  id: string;
  created_at: string;
  meta: Record<string, unknown> | null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Resolve a Resend message id to the lead_nurture_sends row. */
async function resolveLeadSend(providerId: string): Promise<SendLookupRow | null> {
  const res = await adminSelect<SendLookupRow>("lead_nurture_sends", {
    select: "lead_id,step",
    provider_id: `eq.${providerId}`,
    limit: "1",
  });
  return res.data[0] ?? null;
}

/** Fetch minimal lead fields for the operator alert. */
async function fetchLeadForAlert(leadId: string): Promise<LeadRow | null> {
  const res = await adminSelect<LeadRow>("leads", {
    select: "id,full_name,source",
    id: `eq.${leadId}`,
    limit: "1",
  });
  return res.data[0] ?? null;
}

/**
 * True when an operator_update event with meta.kind='complaint_alert' was
 * recorded for this lead in the last 24 h. Used to throttle alerts.
 */
async function hasRecentComplaintAlert(leadId: string): Promise<boolean> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const res = await adminSelect<ContactEventRow>("lead_contact_events", {
    // The column is `ts` (no created_at column). Alias it back so the type keeps
    // its field name; filter on the real column so the 24h throttle actually
    // works instead of 400-ing and alerting on every complaint (AN-3).
    select: "id,created_at:ts,meta",
    lead_id: `eq.${leadId}`,
    event_type: "eq.operator_update",
    ts: `gte.${since}`,
  });
  return res.data.some((e) => (e.meta as Record<string, unknown> | null)?.kind === "complaint_alert");
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Send a single throttled alert email to the operator and record the event. */
async function sendComplaintAlert(leadId: string, lead: LeadRow): Promise<void> {
  const to = resolveLeadTo(lead.source);
  await getResend().emails.send({
    from: getFromAddress(),
    to,
    subject: `Spam complaint received: ${lead.full_name}`,
    html: `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
<p>A spam complaint was received for a lead-nurture email sent to <strong>${esc(lead.full_name)}</strong> (lead ID: ${esc(leadId)}).</p>
<p>This is an alert only. No automatic action has been taken. If the complaint rate rises, consider pausing further sends to this lead via the console or by opting the lead out.</p>
<p style="font-size:13px;color:#64748b;">Automated notification from the Property lead-nurture system.</p>
</div>`,
    text: `Spam complaint received for lead ${lead.full_name} (ID: ${leadId}). No automatic action taken. Consider disarming further sends if the complaint rate rises.`,
  });
  await recordLeadContactEvent(leadId, "operator_update", "email", {
    kind: "complaint_alert",
  });
}

// ── Route ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // SEC-05: refuse when the webhook secret is unconfigured.
  const secret = process.env.LEAD_RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[leads/events] LEAD_RESEND_WEBHOOK_SECRET not set — refusing (SEC-05)");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // Read raw body before any parsing (required for Svix signature).
  const body = await req.text();

  // Svix signature verification (timing-safe, replay-protected).
  // Mirrors /api/nurture/events exactly.
  if (!verifyResendWebhook(secret, req.headers, body)) {
    return NextResponse.json({ ok: false, error: "invalid_signature" }, { status: 401 });
  }

  let evt: ResendPayload;
  try {
    evt = JSON.parse(body) as ResendPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const type = evt.type ?? "";
  const emailId = evt.data?.email_id;

  // No message id in payload: nothing to act on.
  if (!emailId) {
    return NextResponse.json({ ok: true });
  }

  // Resolve to a lead. An unknown id is probably a subscriber-nurture message;
  // ignore it silently so the subscriber webhook endpoint handles it correctly.
  let send: SendLookupRow | null = null;
  try {
    send = await resolveLeadSend(emailId);
  } catch (err) {
    console.error("[leads/events] send lookup failed", err);
    return NextResponse.json({ ok: true });
  }

  if (!send) {
    // Not a lead-nurture send — ignore.
    return NextResponse.json({ ok: true });
  }

  const { lead_id: leadId, step } = send;

  if (type === "email.opened") {
    try {
      await recordLeadContactEvent(leadId, "opened", "email", { step });
    } catch (err) {
      console.error("[leads/events] record opened failed", err);
    }
  } else if (type === "email.clicked") {
    try {
      const url = evt.data?.click?.link ?? undefined;
      await recordLeadContactEvent(leadId, "clicked", "email", {
        step,
        ...(url ? { url } : {}),
      });
    } catch (err) {
      console.error("[leads/events] record clicked failed", err);
    }
  } else if (type === "email.bounced") {
    try {
      await recordLeadContactEvent(leadId, "send_failed", "email", {
        step,
        kind: "bounce",
      });
    } catch (err) {
      console.error("[leads/events] record bounce failed", err);
    }
  } else if (type === "email.complained") {
    try {
      await recordLeadContactEvent(leadId, "send_failed", "email", {
        step,
        kind: "complaint",
      });
    } catch (err) {
      console.error("[leads/events] record complaint failed", err);
    }
    // Throttled operator alert: at most once per lead per 24 h.
    try {
      const alreadyAlerted = await hasRecentComplaintAlert(leadId);
      if (!alreadyAlerted) {
        const lead = await fetchLeadForAlert(leadId);
        if (lead && lead.source !== "test" && process.env.RESEND_API_KEY) {
          await sendComplaintAlert(leadId, lead);
        }
      }
    } catch (err) {
      console.error("[leads/events] complaint alert failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
