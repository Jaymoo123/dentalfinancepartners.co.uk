/**
 * Qualified lead handoff email. Fired once, when a lead becomes contactable.
 * Sends the owner a full lead brief: the enquiry, verification status,
 * AI + Companies House enrichment, the on-site journey (what they read, which
 * calculators they used), the conversation so far (verbatim replies with
 * timestamps), a best call window, and an explainable quality score.
 *
 * Test leads and an unconfigured Resend are skipped (no send), so the
 * synthetic probe can assert the handoff fired without emailing anyone.
 */

import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadTo } from "@/lib/lead-routing";
import { adminSelect } from "@/lib/supabase/admin";
import { getSiteUrl } from "@/config/niche-loader";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
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

const GRADE_COLOURS: Record<string, string> = {
  A: "#047857",
  B: "#b45309",
  C: "#b91c1c",
};

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

  // Best-effort dossier (never blocks the handoff; sparse when data is missing).
  const d = await gatherLeadDossier({
    id: lead.id,
    created_at: lead.created_at,
    visitor_id: lead.visitor_id,
    message: lead.message,
  });

  const ver = d.verification;
  const enr = d.enrichment;
  const gradeColour = GRADE_COLOURS[d.readiness.grade] || "#047857";

  const bookedLine = d.bookingStart
    ? `Booked callback: <strong>${esc(fmtTs(d.bookingStart))}</strong>`
    : "";

  const detail = [
    row("Name", esc(lead.full_name)),
    row(
      "Phone",
      `${esc(ver.phone_e164 || lead.phone)} ${ver.phone_status ? `(${esc(ver.phone_status)}${ver.phone_carrier ? ", " + esc(ver.phone_carrier) : ""})` : ""}`,
    ),
    row("Email", `${esc(lead.email)} ${ver.email_status ? `(${esc(ver.email_status)})` : ""}`),
    row("Role", esc(lead.role || "")),
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

  const reasonsHtml = d.readiness.reasons.length
    ? `<div style="margin:12px 0;">
<div style="color:#64748b;font-size:13px;margin-bottom:4px;">Why this grade</div>
<ul style="margin:0;padding-left:18px;font-size:13px;color:#334155;">${d.readiness.reasons
        .map((r) => `<li>${esc(r)}</li>`)
        .join("")}</ul>
</div>`
    : "";

  // Operator "mark as forwarded to DJH" one-click link (AN-2). Best-effort: if
  // the token secret is unset the button is simply omitted from the email.
  let forwardedUrl: string | null = null;
  try {
    forwardedUrl = `${getSiteUrl().replace(/\/$/, "")}/api/leads/forwarded/${mintLeadToken(lead.id, "forwarded")}`;
  } catch {
    forwardedUrl = null;
  }
  const forwardedButton = forwardedUrl
    ? `<div style="margin:22px 0 4px;">
<a href="${forwardedUrl}" style="display:inline-block;background:#047857;color:#ffffff;text-decoration:none;border-radius:6px;padding:11px 20px;font-size:14px;font-weight:600;">I have forwarded this to DJH</a>
<div style="color:#94a3b8;font-size:12px;margin-top:6px;">Click once you have sent this enquiry to DJH, to log the hand-over.</div>
</div>`
    : "";

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;max-width:640px;">
<p style="font-size:16px;">
<span style="display:inline-block;background:${gradeColour};color:#ffffff;border-radius:4px;padding:2px 10px;font-weight:700;margin-right:8px;">Grade ${esc(d.readiness.grade)} &middot; ${esc(d.readiness.score)}/10</span>
<strong style="color:#047857;">Contact details verified. Actively responded and ready for a call.</strong>
</p>
<div style="background:#fffbeb;border:1px solid #fde68a;border-left:3px solid #b45309;border-radius:8px;padding:12px 14px;margin:12px 0;font-size:13px;color:#78350f;">
<strong>Forwarding to DJH:</strong> under the data-sharing agreement (Annex A), forward only the enquirer's name, contact details and their enquiry (the name/phone/email rows and the "Their enquiry" block). The grade, on-site activity, enrichment and reply history further down are internal context for your decision and must NOT be forwarded to DJH.
</div>
${bookedLine ? `<p>${bookedLine}</p>` : ""}
<table style="border-collapse:collapse;font-size:14px;margin:12px 0;">${detail}</table>
<div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:6px;padding:12px 14px;font-size:14px;">
<div style="color:#64748b;margin-bottom:4px;">Their enquiry</div>
<div>${esc(lead.message || "(no message)")}</div>
</div>
${topPagesHtml}
${timelineHtml}
${reasonsHtml}
${forwardedButton}
</div>`;

  const lastReply = d.replies.length ? d.replies[d.replies.length - 1] : null;
  const text =
    `New qualified enquiry: ${lead.full_name}\n` +
    `FORWARDING TO DJH: forward only the name, contact details and enquiry (Annex A). ` +
    `The grade, on-site activity, enrichment and reply history are internal context, do NOT forward them.\n` +
    `Grade ${d.readiness.grade} (${d.readiness.score}/10)\n` +
    `Phone: ${ver.phone_e164 || lead.phone} (${ver.phone_status || "?"})\n` +
    `Email: ${lead.email} (${ver.email_status || "?"})\n` +
    (d.bookingStart ? `Booked callback: ${fmtTs(d.bookingStart)}\n` : "") +
    (d.responseLatencyMs !== null
      ? `Responded ${formatLatency(d.responseLatencyMs)} after enquiring.\n`
      : "") +
    (d.callWindow ? `${d.callWindow}.\n` : "") +
    (lastReply ? `Last reply (${lastReply.channel}): "${lastReply.body}"\n` : "") +
    (journeyStory(d) ? `On-site journey: ${journeyStory(d)}\n` : "") +
    `Enquiry: ${lead.message || "(none)"}` +
    (forwardedUrl ? `\n\nOnce forwarded to DJH, log it here: ${forwardedUrl}` : "");

  // Do not actually email for synthetic test leads, or if Resend is unconfigured.
  if (lead.source === "test") return { sent: false, to, skipped: "test" };
  if (!process.env.RESEND_API_KEY) return { sent: false, to, skipped: "no-resend" };

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
      subject: `New qualified enquiry: ${lead.full_name}`,
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
