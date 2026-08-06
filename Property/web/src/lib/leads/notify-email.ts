/**
 * Forward-ready lead email builder, extracted from the notify route so the
 * offer/claim pipeline can release the identical email to a claiming buyer.
 *
 * Neutral, site-agnostic design: this same template emails leads from every
 * site (the header label and the "Site" row identify which one), so it carries
 * no per-site brand colour. Navy header, white card, slate detail rows; long
 * values wrap inside the card and the message gets its own full-width block.
 */
import { roleLabel, surfaceLabel } from "@/lib/leads/role-labels";

export type LeadRecord = {
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
  extras?: Record<string, unknown> | null;
  is_test?: boolean;
};

// Scalar fields shown in the details table, in order. The lead name, the received
// timestamp, the free-text message and the lead id are presented separately (header,
// message block and footer), so they are not listed here. To add, remove or reorder
// a table row, edit this array; `kind` controls how the value renders.
// `optional: true` suppresses the row entirely when the value is empty (rather than
// showing "Not provided"), suitable for supplementary fields like role_detail.
//
// Single source of truth for both the HTML table and the plain-text fallback.
type DetailField = {
  label: string;
  get: (r: LeadRecord) => string | undefined;
  kind?: "url" | "pill";
  optional?: boolean;
};
const DETAIL_FIELDS: DetailField[] = [
  { label: "Email", get: (r) => r.email },
  { label: "Phone", get: (r) => r.phone },
  { label: "Role", get: (r) => roleLabel(r.role) || undefined },
  {
    label: "In their words",
    get: (r) => {
      const d = r.extras?.role_detail;
      return typeof d === "string" && d ? d : undefined;
    },
    optional: true,
  },
  {
    label: "Came via",
    get: (r) => {
      const fid = r.extras?.form_id;
      if (typeof fid !== "string" || !fid) return undefined;
      return surfaceLabel(fid) ?? fid;
    },
    optional: true,
  },
  { label: "Company / practice", get: (r) => r.practice_name },
  { label: "Site", get: (r) => prettySource(r.source) },
  { label: "Source page", get: (r) => r.source_url, kind: "url" },
  { label: "Submitted at", get: (r) => formatTimestamp(r.submitted_at) },
  { label: "Status", get: (r) => r.status, kind: "pill" },
  { label: "Data sharing", get: (r) => (r.consent_given ? "Confirmed at submission" : undefined) },
];

export function formatTimestamp(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  try {
    return d.toLocaleString("en-GB", { timeZone: "Europe/London" });
  } catch {
    return iso;
  }
}

export function prettySource(source?: string): string {
  if (!source) return "";
  // 'property' -> 'Property', 'contractors-ir35' -> 'Contractors Ir35'
  return source
    .split(/[-_]/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// Lead-supplied values are untrusted; escape before embedding in HTML.
export function escapeHtml(value: string): string {
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

export type LeadEmailOptions = {
  /** Red "nurture in progress, do not forward" banner (internal Property leads). */
  nurtureBanner?: boolean;
  /** Extra HTML injected after the statement block (e.g. teaser + offer button). */
  extraHtml?: string;
  /** Extra plain-text appended at the end. */
  extraText?: string;
};

export function buildLeadHtml(r: LeadRecord, opts: LeadEmailOptions = {}): string {
  const siteLabel = prettySource(r.source) || "Website";
  const headerName = (r.full_name ?? "").trim() || "New website enquiry";
  const received = formatTimestamp(r.created_at);
  const message = (r.message ?? "").trim();

  const detailRows = DETAIL_FIELDS
    .filter((field) => {
      if (!field.optional) return true;
      const val = (field.get(r) ?? "").toString().trim();
      return val.length > 0;
    })
    .map(
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

  // The exact data-sharing wording the enquirer was shown at submission (the
  // acknowledgement under legitimate interests, or the consent text on sites that
  // use consent). Surfaced so the lead is forward-ready with its own audit trail.
  const statement = (r.consent_text ?? "").trim();
  const statementBlock = statement
    ? `<p style="margin:24px 0 6px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Data-sharing notice shown</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;">
                  <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;color:#334155;font-size:13px;line-height:1.6;word-break:break-word;overflow-wrap:break-word;">${escapeHtml(statement)}</td></tr>
                </table>`
    : "";

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
                  opts.nurtureBanner
                    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;">
                  <tr><td style="background:#fef2f2;border:1px solid #fecaca;border-left:3px solid #b91c1c;border-radius:8px;padding:12px 16px;color:#7f1d1d;font-size:14px;font-weight:600;">Nurture in progress. Do NOT forward this yet. Wait for the separate READY handoff email, which arrives only once the lead is verified and has actively responded.</td></tr>
                </table>`
                    : ""
                }
                <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Lead details</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed;">
                  <colgroup><col style="width:140px;" /><col /></colgroup>
                  ${detailRows}
                </table>
                ${messageBlock}
                ${statementBlock}
                ${opts.extraHtml ?? ""}
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

export function buildLeadText(r: LeadRecord, opts: LeadEmailOptions = {}): string {
  const siteLabel = prettySource(r.source) || "Website";
  const headerName = (r.full_name ?? "").trim() || "New website enquiry";
  const received = formatTimestamp(r.created_at);
  const message = (r.message ?? "").trim();

  const lines: string[] = [`NEW ${siteLabel.toUpperCase()} LEAD`, headerName];
  if (received) lines.push(`Received ${received}`);
  if (opts.nurtureBanner)
    lines.push(
      "",
      "NURTURE IN PROGRESS. Do NOT forward this yet. Wait for the separate READY handoff email, which arrives only once the lead is verified and has actively responded.",
    );
  lines.push("", "LEAD DETAILS");
  for (const field of DETAIL_FIELDS) {
    const raw = (field.get(r) ?? "").toString().trim();
    if (field.optional && !raw) continue;
    lines.push(`${field.label}: ${raw || "Not provided"}`);
  }
  lines.push("", "MESSAGE", message || "Not provided");
  const statement = (r.consent_text ?? "").trim();
  if (statement) lines.push("", "DATA-SHARING NOTICE SHOWN", statement);
  if (opts.extraText) lines.push("", opts.extraText);
  lines.push("", `Lead ID: ${r.id || "Not provided"}`);
  return lines.join("\n");
}
