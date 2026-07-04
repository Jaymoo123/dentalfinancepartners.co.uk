/**
 * Qualified lead handoff: fires once when a lead becomes contactable.
 *
 * Sends TWO emails to the operator:
 *
 * 1. Forwardable brief -- Annex-A-safe: name, contact details and the enquiry
 *    only. Rendered via the branded service-email shell. May be forwarded to
 *    DJH as-is.
 *
 * 2. Internal ops email -- plain styled, carries all internal context: verification
 *    detail, journey, enrichment, conversation timeline, and the one-click
 *    "I have forwarded this to DJH" log button. Must NOT be forwarded.
 *
 * Test leads and an unconfigured Resend are skipped (neither email is sent).
 */

import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import { adminSelect } from "@/lib/supabase/admin";
import { getSiteUrl } from "@/config/niche-loader";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { renderLeadServiceEmail } from "@/lib/emails/lead-service-template";
import { gatherLeadDossier, humanisePath, formatLatency, type LeadDossier } from "./dossier";

interface LeadRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string | null;
  message: string | null;
  source: string;
  source_url: string | null;
  created_at: string;
  visitor_id: string | null;
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:4px 12px 4px 0;color:#64748b;vertical-align:top;">${esc(label)}</td><td style="padding:4px 0;font-weight:600;">${value}</td></tr>`;
}

function fmtTs(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function journeyStory(d: LeadDossier): string {
  const j = d.journey;
  if (!j) return "";
  const bits: string[] = [];
  if (j.totalSessions > 0) {
    const mins = Math.round(j.totalEngagedMs / 60000);
    bits.push(
      `${j.totalSessions} visit${j.totalSessions === 1 ? "" : "s"}, ${j.pageViews} page view${j.pageViews === 1 ? "" : "s"}${mins ? `, ~${mins} min engaged` : ""}`,
    );
  }
  if (j.calcEvents > 0) bits.push("used our tax calculators");
  if (j.referrerHost) bits.push(`arrived via ${j.referrerHost}`);
  return bits.join("; ");
}

export interface HandoffResult {
  sent: boolean;
  to: string;
  skipped?: "test" | "no-resend" | "no-lead";
  messageId?: string;
  reason?: string;
  internal?: { sent: boolean; reason?: string };
}

// ── Pure email builders ───────────────────────────────────────────────────────

/** Annex-A-safe forwardable brief. Contains name, contact details, and the
 *  enquiry only. No grade, no verification status, no internal content. */
export function buildForwardableBrief(
  lead: LeadRow,
  d: LeadDossier,
): { subject: string; html: string; text: string } {
  const subject = `New qualified enquiry: ${lead.full_name}`;

  const detailRows: Array<{ label: string; value: string }> = [
    { label: "Name", value: lead.full_name },
    { label: "Phone", value: d.verification.phone_e164 || lead.phone },
    { label: "Email", value: lead.email },
  ];
  if (d.bookingStart) {
    detailRows.push({ label: "Booked call", value: fmtTs(d.bookingStart) });
  }
  if (lead.source_url) {
    detailRows.push({ label: "From page", value: lead.source_url });
  }

  const { html, text } = renderLeadServiceEmail({
    preheader: `New qualified enquiry from ${lead.full_name} via propertytaxpartners.co.uk.`,
    greeting: "Hello,",
    paragraphs: [
      "A new qualified enquiry from the Property Tax Partners website.",
      `Their enquiry: ${lead.message || "(no message)"}`,
    ],
    detailRows,
    signoff: "Property Tax Partners",
    footerNote: "This enquiry was submitted via propertytaxpartners.co.uk.",
  });

  return { subject, html, text };
}

/** Internal ops email. Contains all context that must NOT be forwarded to DJH:
 *  verification detail, journey, enrichment, conversation history, and the
 *  one-click forwarded-log button. */
export function buildInternalOpsEmail(
  lead: LeadRow,
  d: LeadDossier,
  reason: string,
  forwardedUrl: string | null,
): { subject: string; html: string; text: string } {
  const subject = `[Internal] ${lead.full_name}: log hand-over and context`;

  const ver = d.verification;
  const enr = d.enrichment;

  const boundaryBoxHtml = `<div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:6px;padding:12px 14px;font-size:14px;margin-bottom:16px;color:#92400e;">
<strong>Important:</strong> Forward ONLY the separate email titled "New qualified enquiry: ${esc(lead.full_name)}" to DJH. Under the data-sharing agreement (Annex A) that means name, contact details and the enquiry only. Everything in THIS email is internal: verification detail, journey, enrichment and the conversation history must not be forwarded.
</div>`;

  const detail = [
    `<p style="font-size:16px;"><strong style="color:#047857;">Contact details verified. Actively responded and ready for a call.</strong></p>`,
    `<p style="font-size:14px;color:#334155;">How they responded: <strong>${esc(reason)}</strong></p>`,
  ].join("\n");

  const verDetail = [
    row("Phone (verified)", `${esc(ver.phone_e164 || lead.phone)} ${ver.phone_status ? `(${esc(ver.phone_status)}${ver.phone_carrier ? ", " + esc(ver.phone_carrier) : ""})` : ""}`),
    row("Email (verified)", `${esc(lead.email)} ${ver.email_status ? `(${esc(ver.email_status)})` : ""}`),
    d.responseLatencyMs !== null
      ? row("Response time", esc(`${formatLatency(d.responseLatencyMs)} after enquiring`))
      : "",
    d.callWindow ? row("Best call window", esc(d.callWindow)) : "",
    enr.intent_category
      ? row("Intent", `${esc(enr.intent_category)} (quality ${esc(enr.quality_score ?? "?")}/5)`)
      : "",
    enr.summary ? row("Summary", esc(enr.summary)) : "",
    enr.ch_company_name
      ? row(
          "Companies House",
          `${esc(enr.ch_company_name)} (${esc(enr.ch_company_number)}, ${esc(enr.ch_company_status)})`,
        )
      : "",
    d.journey?.country || d.journey?.device
      ? row(
          "Device / location",
          esc([d.journey?.device, d.journey?.country].filter(Boolean).join(", ")),
        )
      : "",
    journeyStory(d) ? row("On-site journey", esc(journeyStory(d))) : "",
  ]
    .filter(Boolean)
    .join("");

  const topPagesHtml = d.journey?.topPages.length
    ? `<div style="margin:12px 0;">
<div style="color:#64748b;font-size:13px;margin-bottom:4px;">What they read on the site</div>
<ul style="margin:0;padding-left:18px;font-size:14px;">${d.journey.topPages
        .map(
          (p) =>
            `<li>${esc(humanisePath(p.path))}${p.views > 1 ? ` <span style="color:#64748b;">(x${p.views})</span>` : ""}</li>`,
        )
        .join("")}</ul>
</div>`
    : "";

  const timelineHtml = d.timeline.length
    ? `<div style="margin:12px 0;">
<div style="color:#64748b;font-size:13px;margin-bottom:4px;">Conversation so far</div>
<table style="border-collapse:collapse;font-size:13px;">${d.timeline
        .map(
          (t) =>
            `<tr><td style="padding:2px 10px 2px 0;color:#64748b;white-space:nowrap;vertical-align:top;">${esc(fmtTs(t.ts))}</td><td style="padding:2px 0;">${esc(t.label)}${t.detail ? `<div style="background:#f1f5f9;border-radius:4px;padding:4px 8px;margin-top:2px;font-style:italic;">&ldquo;${esc(t.detail)}&rdquo;</div>` : ""}</td></tr>`,
        )
        .join("")}</table>
</div>`
    : "";

  const forwardedButton = forwardedUrl
    ? `<div style="margin:22px 0 4px;">
<a href="${forwardedUrl}" style="display:inline-block;background:#047857;color:#ffffff;text-decoration:none;border-radius:6px;padding:11px 20px;font-size:14px;font-weight:600;">I have forwarded this to DJH</a>
<div style="color:#94a3b8;font-size:12px;margin-top:6px;">Click once you have sent this enquiry to DJH, to log the hand-over.</div>
</div>`
    : "";

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
${boundaryBoxHtml}
${detail}
<table style="border-collapse:collapse;font-size:14px;margin:12px 0;">${verDetail}</table>
${topPagesHtml}
${timelineHtml}
${forwardedButton}
</div>`;

  const lastReply = d.replies.length ? d.replies[d.replies.length - 1] : null;
  const text =
    `[Internal] ${lead.full_name}: log hand-over and context\n\n` +
    `IMPORTANT: Forward ONLY the separate email titled "New qualified enquiry: ${lead.full_name}" to DJH. Everything in this message is internal and must not be forwarded.\n\n` +
    `Contact details verified. Actively responded and ready for a call.\n` +
    `How they responded: ${reason}\n` +
    `Phone: ${ver.phone_e164 || lead.phone} (${ver.phone_status || "?"}${ver.phone_carrier ? ", " + ver.phone_carrier : ""})\n` +
    `Email: ${lead.email} (${ver.email_status || "?"})\n` +
    (d.bookingStart ? `Booked callback: ${fmtTs(d.bookingStart)}\n` : "") +
    (d.responseLatencyMs !== null
      ? `Responded ${formatLatency(d.responseLatencyMs)} after enquiring.\n`
      : "") +
    (d.callWindow ? `${d.callWindow}.\n` : "") +
    (lastReply ? `Last reply (${lastReply.channel}): "${lastReply.body}"\n` : "") +
    (journeyStory(d) ? `On-site journey: ${journeyStory(d)}\n` : "") +
    (forwardedUrl ? `\nOnce forwarded to DJH, log it here: ${forwardedUrl}` : "");

  return { subject, html, text };
}

// ── 3-attempt retry helper ────────────────────────────────────────────────────

async function sendWithRetry(
  payload: Parameters<ReturnType<typeof getResend>["emails"]["send"]>[0],
): Promise<{ messageId?: string; error?: unknown }> {
  const backoffs = [300, 800];
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, backoffs[attempt - 1]));
    }
    const { data, error } = await getResend().emails.send(payload);
    if (!error) return { messageId: data?.id };
    lastError = error;
  }
  return { error: lastError };
}

function extractReason(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "object" && err !== null && "message" in err) return String((err as { message: unknown }).message);
  return String(err ?? "send error");
}

// ── Orchestrator ──────────────────────────────────────────────────────────────

export async function sendContactableHandoff(
  leadId: string,
  reason: string,
): Promise<HandoffResult> {
  const leadRes = await adminSelect<LeadRow>("leads", {
    id: `eq.${leadId}`,
    select: "id,full_name,email,phone,role,message,source,source_url,created_at,visitor_id",
    limit: "1",
  });
  const lead = leadRes.data[0];
  if (!lead) return { sent: false, to: "", skipped: "no-lead" };

  const to = resolveLeadTo(lead.source);

  // Do not email for synthetic test leads, or if Resend is unconfigured.
  if (lead.source === "test") return { sent: false, to, skipped: "test" };
  if (!process.env.RESEND_API_KEY) return { sent: false, to, skipped: "no-resend" };

  // Best-effort dossier (never blocks the handoff).
  const d = await gatherLeadDossier({
    id: lead.id,
    created_at: lead.created_at,
    visitor_id: lead.visitor_id,
    message: lead.message,
  });

  // Mint the forwarded-log token (best-effort; omit button on failure).
  let forwardedUrl: string | null = null;
  try {
    forwardedUrl = `${getSiteUrl().replace(/\/$/, "")}/api/leads/forwarded/${mintLeadToken(lead.id, "forwarded")}`;
  } catch {
    forwardedUrl = null;
  }

  // 1. Send the forwardable brief first.
  const brief = buildForwardableBrief(lead, d);
  const briefResult = await sendWithRetry({
    from: getFromAddress(),
    to,
    subject: brief.subject,
    html: brief.html,
    text: brief.text,
  });
  if (briefResult.error) {
    return { sent: false, to, reason: extractReason(briefResult.error) };
  }

  // 2. Send the internal ops email.
  const ops = buildInternalOpsEmail(lead, d, reason, forwardedUrl);
  const opsResult = await sendWithRetry({
    from: getFromAddress(),
    to,
    subject: ops.subject,
    html: ops.html,
    text: ops.text,
  });
  if (opsResult.error) {
    return {
      sent: true,
      to,
      messageId: briefResult.messageId,
      internal: { sent: false, reason: extractReason(opsResult.error) },
    };
  }

  return {
    sent: true,
    to,
    messageId: briefResult.messageId,
    internal: { sent: true },
  };
}
