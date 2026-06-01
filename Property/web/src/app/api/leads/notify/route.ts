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
};

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: LeadRecord;
};

// Single source of truth for which columns appear in the email and in what
// order. To drop a column, delete its line; to rename a label, edit it here.
const FIELDS: { label: string; get: (r: LeadRecord) => string | undefined }[] = [
  { label: "Received", get: (r) => formatTimestamp(r.created_at) },
  { label: "Submitted at", get: (r) => formatTimestamp(r.submitted_at) },
  { label: "Name", get: (r) => r.full_name },
  { label: "Email", get: (r) => r.email },
  { label: "Phone", get: (r) => r.phone },
  { label: "Role", get: (r) => r.role },
  { label: "Company / practice", get: (r) => r.practice_name },
  { label: "Message", get: (r) => r.message },
  { label: "Site", get: (r) => prettySource(r.source) },
  { label: "Submitted from", get: (r) => r.source_url },
  { label: "Status", get: (r) => r.status },
  { label: "Lead ID", get: (r) => r.id },
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

function buildHtml(r: LeadRecord): string {
  const rows = FIELDS.map(({ label, get }) => {
    const raw = (get(r) ?? "").toString().trim();
    // Show every column from the leads table; render blanks as "(none)".
    const value = raw ? escapeHtml(raw).replace(/\n/g, "<br>") : "(none)";
    return `<tr>
      <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;color:#0f172a;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border:1px solid #e2e8f0;color:#0f172a;">${value}</td>
    </tr>`;
  }).join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;">
      <tr><td>
        <h2 style="margin:0 0 4px;color:#0f172a;font-size:18px;">New lead for ${escapeHtml(prettySource(r.source) || "website")}</h2>
        <p style="margin:0 0 16px;color:#475569;font-size:13px;">Forward this email to Reflex Accounting</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
          ${rows}
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function buildText(r: LeadRecord): string {
  const lines = FIELDS.map(({ label, get }) => {
    const raw = (get(r) ?? "").toString().trim();
    return `${label}: ${raw || "(none)"}`;
  });
  return `New lead for ${prettySource(r.source) || "website"}\n\nForward this email to Reflex Accounting\n\n${lines.join("\n")}`;
}

// Health probe: confirms the route is deployed and whether env is wired,
// without leaking any secret values.
export async function GET() {
  return NextResponse.json({
    ok: true,
    secretSet: Boolean(process.env.LEADS_NOTIFY_SECRET || process.env.LEADS_SYNC_SECRET),
    resendSet: Boolean(process.env.RESEND_API_KEY),
    notifyTo: Boolean(process.env.LEADS_NOTIFY_TO),
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
  const subject = `New ${prettySource(r.source) || "website"} lead${r.full_name ? `: ${r.full_name}` : ""}`;

  try {
    const { error } = await getResend().emails.send({
      from: getFromAddress(),
      to,
      subject,
      html: buildHtml(r),
      text: buildText(r),
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
