/**
 * Qualified lead handoff: fires once when a lead becomes contactable.
 *
 * Sends ONE email to the operator with the full evidence pack: verified
 * contact details, response behaviour, enrichment, on-site journey and the
 * conversation timeline, in the original flat table style. No grading, no
 * partner names, no action buttons (owner decision 2026-07-04).
 *
 * Test leads and an unconfigured Resend are skipped.
 */

import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import { adminSelect } from "@/lib/supabase/admin";
import { gatherLeadDossier, humanisePath, formatLatency, type LeadDossier } from "./dossier";
import { roleLabel, surfaceLabel } from "./role-labels";

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
  extras?: Record<string, unknown> | null;
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
}

/** Builds the single handoff email (subject, html, text). Pure; exported for tests. */
export function buildHandoffEmail(
  lead: LeadRow,
  d: LeadDossier,
  reason: string,
): { subject: string; html: string; text: string } {
  const subject = `New qualified enquiry: ${lead.full_name}`;

  const ver = d.verification;
  const enr = d.enrichment;

  const bookedLine = d.bookingStart
    ? `Booked callback: <strong>${esc(fmtTs(d.bookingStart))}</strong>`
    : "";

  const extras = lead.extras ?? {};
  const roleDetail = typeof extras.role_detail === "string" && extras.role_detail ? extras.role_detail : null;
  const formId = typeof extras.form_id === "string" && extras.form_id ? extras.form_id : null;

  const detail = [
    row("Name", esc(lead.full_name)),
    row(
      "Phone",
      `${esc(ver.phone_e164 || lead.phone)} ${ver.phone_status ? `(${esc(ver.phone_status)}${ver.phone_carrier ? ", " + esc(ver.phone_carrier) : ""})` : ""}`,
    ),
    row("Email", `${esc(lead.email)} ${ver.email_status ? `(${esc(ver.email_status)})` : ""}`),
    row("Role", esc(roleLabel(lead.role))),
    roleDetail ? row("In their words", esc(roleDetail)) : "",
    formId ? row("Came via", esc(surfaceLabel(formId) ?? formId)) : "",
    row("How they responded", `<strong style="color:#047857;">${esc(reason)}</strong>`),
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
    lead.source_url ? row("From page", esc(lead.source_url)) : "",
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

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
<p style="font-size:16px;">
<strong style="color:#047857;">Contact details verified. Actively responded and ready for a call.</strong>
</p>
${bookedLine ? `<p>${bookedLine}</p>` : ""}
<table style="border-collapse:collapse;font-size:14px;margin:12px 0;">${detail}</table>
<div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:6px;padding:12px 14px;font-size:14px;">
<div style="color:#64748b;margin-bottom:4px;">Their enquiry</div>
<div>${esc(lead.message || "(no message)")}</div>
</div>
${topPagesHtml}
${timelineHtml}
</div>`;

  const lastReply = d.replies.length ? d.replies[d.replies.length - 1] : null;
  const text =
    `New qualified enquiry: ${lead.full_name}\n` +
    `Phone: ${ver.phone_e164 || lead.phone} (${ver.phone_status || "?"})\n` +
    `Email: ${lead.email} (${ver.email_status || "?"})\n` +
    (d.bookingStart ? `Booked callback: ${fmtTs(d.bookingStart)}\n` : "") +
    (d.responseLatencyMs !== null
      ? `Responded ${formatLatency(d.responseLatencyMs)} after enquiring.\n`
      : "") +
    (d.callWindow ? `${d.callWindow}.\n` : "") +
    (lastReply ? `Last reply (${lastReply.channel}): "${lastReply.body}"\n` : "") +
    (journeyStory(d) ? `On-site journey: ${journeyStory(d)}\n` : "") +
    `Enquiry: ${lead.message || "(none)"}`;

  return { subject, html, text };
}

export async function sendContactableHandoff(
  leadId: string,
  reason: string,
): Promise<HandoffResult> {
  const leadRes = await adminSelect<LeadRow>("leads", {
    id: `eq.${leadId}`,
    select: "id,full_name,email,phone,role,message,source,source_url,created_at,visitor_id,extras",
    limit: "1",
  });
  const lead = leadRes.data[0];
  if (!lead) return { sent: false, to: "", skipped: "no-lead" };

  const to = resolveLeadTo(lead.source);

  // Do not actually email for synthetic test leads, or if Resend is unconfigured.
  if (lead.source === "test") return { sent: false, to, skipped: "test" };
  if (!process.env.RESEND_API_KEY) return { sent: false, to, skipped: "no-resend" };

  // Best-effort dossier (never blocks the handoff; sparse when data is missing).
  const d = await gatherLeadDossier({
    id: lead.id,
    created_at: lead.created_at,
    visitor_id: lead.visitor_id,
    message: lead.message,
  });

  const { subject, html, text } = buildHandoffEmail(lead, d, reason);

  // Try up to 3 times with short backoffs before giving up gracefully.
  // Total worst-case wait is ~1.1 s, well inside any route budget.
  const backoffs = [300, 800];
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, backoffs[attempt - 1]));
    }
    const { data, error } = await getResend().emails.send({
      from: getFromAddress(),
      to,
      subject,
      html,
      text,
    });
    if (!error) return { sent: true, to, messageId: data?.id };
    lastError = error;
  }
  const failReason =
    lastError instanceof Error
      ? lastError.message
      : typeof lastError === "object" && lastError !== null && "message" in lastError
        ? String((lastError as { message: unknown }).message)
        : String(lastError ?? "send error");
  return { sent: false, to, reason: failReason };
}
