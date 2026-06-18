/**
 * Lead -> email notification webhook.
 *
 * Receives a Supabase database webhook (pg_net trigger) fired on INSERT into the
 * shared `leads` table, verifies a shared secret header, and emails the new lead
 * as a pre-formatted HTML table to the internal notification inbox. The intent is
 * a "forward-ready" email: open it, forward it to the partner firm, done. No
 * Supabase export, no spreadsheet.
 *
 * Runs independently of the Google Sheets sync (`/api/leads/sync`): each is its
 * own trigger, so an email failure never affects the Sheet and vice versa. The
 * lead is already durably stored in Supabase before this fires, so a send failure
 * never loses a lead, it just needs a re-send.
 *
 * Covers every site (one shared `leads` table; the `source` column distinguishes
 * them), so the same endpoint + trigger serves property, dentists, medical,
 * solicitors, generalist, agency and contractors-ir35.
 */
import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";
import { getResend, getFromAddress } from "@/lib/resend";
import { resolveLeadCc, ccExcludedSources } from "@/lib/lead-routing";

export const runtime = "nodejs";
export const maxDuration = 30;

type LeadRecord = {
  id?: string;
  created_at?: string;
  submitted_at?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  role?: string;
  practice_name?: string;
  message?: string;
  source?: string;
  source_url?: string;
  status?: string;
  consent_given?: boolean;
  consent_text?: string;
  consent_at?: string;
};

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: LeadRecord;
};

// Scalar fields shown in the details table, in order. The lead name, the received
// timestamp, the free-text message and the lead id are presented separately (header,
// message block and footer), so they are not listed here. To add, remove or reorder
// a table row, edit this array; `kind` controls how the value renders.
//
// Single source of truth for both the HTML table and the plain-text fallback.
type DetailField = {
  label: string;
  get: (r: LeadRecord) => string | undefined;
  kind?: "url" | "pill";
};
const DETAIL_FIELDS: DetailField[] = [
  { label: "Email", get: (r) => r.email },
  { label: "Phone", get: (r) => r.phone },
  { label: "Role", get: (r) => r.role },
  { label: "Company / practice", get: (r) => r.practice_name },
  { label: "Site", get: (r) => prettySource(r.source) },
  { label: "Source page", get: (r) => r.source_url, kind: "url" },
  { label: "Submitted at", get: (r) => formatTimestamp(r.submitted_at) },
  { label: "Status", get: (r) => r.status, kind: "pill" },
  { label: "Consent", get: (r) => (r.consent_given ? "Data-sharing agreed" : undefined) },
];

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function formatTimestamp(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    return d.toLocaleString("en-GB", { timeZone: "Europe/London" });
  } catch {
    return iso;
  }
}

function prettySource(source?: string): string {
  if (!source) return "";
  // 'property' -> 'Property', 'contractors-ir35' -> 'Contractors Ir35'
  return source
    .split(/[-_]/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// Lead-supplied values are untrusted; escape before embedding in HTML.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Renders one detail value. Empty values become a muted "Not provided" so the
// table stays complete without looking unfinished; URLs become a wrapping link
// and the status renders as a small pill.
function renderCell(field: DetailField, r: LeadRecord): string {
  const raw = (field.get(r) ?? "").toString().trim();
  if (!raw) return `<span style="color:#94a3b8;">Not provided</span>`;
  if (field.kind === "pill") {
    return `<span style="display:inline-block;padding:3px 11px;border-radius:999px;background:#f1f5f9;border:1px solid #e2e8f0;color:#334155;font-size:12px;font-weight:700;letter-spacing:0.3px;text-transform:capitalize;">${escapeHtml(raw)}</span>`;
  }
  if (field.kind === "url") {
    return `<a href="${escapeHtml(raw)}" style="color:#334155;text-decoration:underline;word-break:break-all;overflow-wrap:break-word;">${escapeHtml(raw)}</a>`;
  }
  return escapeHtml(raw).replace(/\n/g, "<br>");
}

// Neutral, site-agnostic design: this same template emails leads from every site
// (the header label and the "Site" row identify which one), so it carries no
// per-site brand colour. Navy header, white card, slate detail rows; long values
// wrap inside the card and the message gets its own full-width block.
function buildHtml(r: LeadRecord, partnerCopied: boolean): string {
  const siteLabel = prettySource(r.source) || "Website";
  const headerName = (r.full_name ?? "").trim() || "New website enquiry";
  const received = formatTimestamp(r.created_at);
  const message = (r.message ?? "").trim();

  const detailRows = DETAIL_FIELDS.map(
    (field) => `<tr>
                  <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:600;vertical-align:top;word-break:break-word;">${escapeHtml(field.label)}</td>
                  <td style="padding:11px 0 11px 16px;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:500;vertical-align:top;word-break:break-word;overflow-wrap:break-word;">${renderCell(field, r)}</td>
                </tr>`,
  ).join("");

  // Always render the message block so the field never silently disappears; an
  // empty message shows a muted "Not provided" like the other detail fields, so
  // it is obvious there was no message rather than leaving the reader unsure.
  const messageCell = message
    ? escapeHtml(message).replace(/\n/g, "<br>")
    : `<span style="color:#94a3b8;">Not provided</span>`;
  const messageBlock = `<p style="margin:24px 0 6px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Message</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;">
                  <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;color:#334155;font-size:14px;line-height:1.6;word-break:break-word;overflow-wrap:break-word;">${messageCell}</td></tr>
                </table>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
  </head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f1f5f9;">New ${escapeHtml(siteLabel)} lead: ${escapeHtml(headerName)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#f1f5f9;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:26px 28px;">
                <p style="margin:0 0 6px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">New ${escapeHtml(siteLabel)} lead</p>
                <h1 style="margin:0;color:#ffffff;font-size:21px;font-weight:700;line-height:1.3;word-break:break-word;">${escapeHtml(headerName)}</h1>
                ${received ? `<p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">Received ${escapeHtml(received)}</p>` : ""}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 28px;">
                ${
                  partnerCopied
                    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;">
                  <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #0f172a;border-radius:8px;padding:12px 16px;color:#0f172a;font-size:14px;font-weight:600;">Forward this email to Reflex Accounting</td></tr>
                </table>`
                    : ""
                }
                <p style="margin:${partnerCopied ? "24px" : "0"} 0 4px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Lead details</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed;">
                  <colgroup><col style="width:140px;" /><col /></colgroup>
                  ${detailRows}
                </table>
                ${messageBlock}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px 22px;border-top:1px solid #e2e8f0;background:#ffffff;">
                <p style="margin:0 0 3px;color:#94a3b8;font-size:12px;word-break:break-word;">Lead ID: ${escapeHtml(r.id || "Not provided")}</p>
                <p style="margin:0;color:#cbd5e1;font-size:12px;">Automated notification · lead capture system</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildText(r: LeadRecord, partnerCopied: boolean): string {
  const siteLabel = prettySource(r.source) || "Website";
  const headerName = (r.full_name ?? "").trim() || "New website enquiry";
  const received = formatTimestamp(r.created_at);
  const message = (r.message ?? "").trim();

  const lines: string[] = [`NEW ${siteLabel.toUpperCase()} LEAD`, headerName];
  if (received) lines.push(`Received ${received}`);
  if (partnerCopied) lines.push("", "Forward this email to Reflex Accounting");
  lines.push("", "LEAD DETAILS");
  for (const field of DETAIL_FIELDS) {
    const raw = (field.get(r) ?? "").toString().trim();
    lines.push(`${field.label}: ${raw || "Not provided"}`);
  }
  lines.push("", "MESSAGE", message || "Not provided");
  lines.push("", `Lead ID: ${r.id || "Not provided"}`);
  return lines.join("\n");
}

// Health probe: confirms the route is deployed and whether env is wired,
// without leaking any secret values.
export async function GET() {
  return NextResponse.json({
    ok: true,
    secretSet: Boolean(process.env.LEADS_NOTIFY_SECRET || process.env.LEADS_SYNC_SECRET),
    resendSet: Boolean(process.env.RESEND_API_KEY),
    notifyTo: Boolean(process.env.LEADS_NOTIFY_TO),
    ccSet: Boolean(process.env.LEADS_NOTIFY_CC),
    // Sites NOT copied to the partner firm (Property by default).
    ccExcludeSources: ccExcludedSources(),
  });
}

export async function POST(req: NextRequest) {
  // Reuse the existing sync secret by default so no new env var is required;
  // a dedicated LEADS_NOTIFY_SECRET takes precedence if set.
  const expected = process.env.LEADS_NOTIFY_SECRET || process.env.LEADS_SYNC_SECRET;
  if (!expected) {
    console.error("leads/notify: no LEADS_NOTIFY_SECRET / LEADS_SYNC_SECRET set");
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }
  const provided = req.headers.get("x-webhook-secret") || "";
  if (!secretsMatch(provided, expected)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.type && payload.type !== "INSERT") {
    return NextResponse.json({ ok: true, skipped: "not-insert" });
  }
  if (payload.table && payload.table !== "leads") {
    return NextResponse.json({ ok: true, skipped: "not-leads" });
  }

  const r = payload.record;
  if (!r || !r.email) {
    return NextResponse.json({ ok: false, error: "No record" }, { status: 400 });
  }

  const to = process.env.LEADS_NOTIFY_TO || "junaydmoughal@hotmail.co.uk";
  // Partner firm (Reflex Accounting) is copied on leads from every site EXCEPT
  // Property's own — Property leads go to the internal inbox only, no partner
  // CC. The rule lives in resolveLeadCc (LEADS_NOTIFY_CC_EXCLUDE_SOURCES,
  // defaults to "property"); an empty list here means no CC header is sent.
  const cc = resolveLeadCc(r.source);
  const partnerCopied = cc.length > 0;
  const subject = `New ${prettySource(r.source) || "website"} lead${r.full_name ? `: ${r.full_name}` : ""}`;

  try {
    const { error } = await getResend().emails.send({
      from: getFromAddress(),
      to,
      ...(cc.length ? { cc } : {}),
      subject,
      html: buildHtml(r, partnerCopied),
      text: buildText(r, partnerCopied),
      // No reply-to: the lead's address is never placed in the email headers,
      // so the lead can never be contacted from this notification.
    });
    if (error) {
      console.error("leads/notify: resend error", error);
      return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("leads/notify: send threw", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
