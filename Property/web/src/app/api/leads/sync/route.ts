/**
 * Lead -> Google Sheets sync webhook.
 *
 * Receives a Supabase database webhook (pg_net trigger) fired on INSERT into the
 * shared `leads` table, verifies a shared secret header, and appends the lead as
 * a row to a Google Sheet. Covers every site (property, dentists, medical,
 * solicitors, generalist, agency, contractors-ir35) because they all write to
 * the same `leads` table; the `source` column distinguishes them.
 *
 * The lead is already durably stored in Supabase before this fires, so the Sheet
 * is a convenience mirror: an append failure never loses a lead.
 *
 * ARMED BY OWNER DECISION 2026-08-26, with two known gaps accepted, not closed.
 * This writes full lead PII (name, email, phone, message) to a Google Sheet, and:
 *
 *   1. Google is named as a processor in no site's privacy policy, so the sharing
 *      is undisclosed; and
 *   2. the Sheet sits outside the retention purge entirely, so rows outlive the
 *      retention period every site publishes. There is no deletion path for it
 *      anywhere in this repo.
 *
 * Both were put to the owner on 2026-08-26 and he elected to proceed and to own
 * the disclosure and access questions himself. Recorded here so the next reader
 * knows these are accepted risks rather than oversights. Do not re-litigate; do
 * close them if asked (a privacy-policy processor line, and a purge that runs
 * with lead-retention).
 */
import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";
import { prependLeadRow, sheetsConfigured } from "@/lib/leads/google-sheets";

export const runtime = "nodejs";
export const maxDuration = 30;

type LeadRecord = {
  id?: string;
  created_at?: string;
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
    // Friendly UK local time for reading on a phone; DST handled by Intl.
    return d.toLocaleString("en-GB", { timeZone: "Europe/London" });
  } catch {
    return iso;
  }
}

// Lightweight health probe: confirms the route is deployed and whether the
// env is wired, without leaking any secret values.
export async function GET() {
  return NextResponse.json({
    ok: true,
    secretSet: Boolean(process.env.LEADS_SYNC_SECRET),
    sheetsConfigured: sheetsConfigured(),
  });
}

export async function POST(req: NextRequest) {
  const expected = process.env.LEADS_SYNC_SECRET;
  if (!expected) {
    console.error("leads/sync: LEADS_SYNC_SECRET not set");
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

  // Only act on new lead rows.
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

  // Columns A-I of the Lead Tracker sheet, in order. This array IS the contract:
  // add, remove or reorder an entry here and every future lead lands one column
  // out, silently, in a sheet people are already working from. The same order is
  // mirrored in proposal_engine/export_raw_leads.py (SHEET_WEBHOOK_COLS), which
  // seeds the sheet, and proposal_engine/test_export_wash.py fails if they drift.
  // Columns J onwards (history and the triager's own notes) are deliberately left
  // untouched: none of them exist yet at the moment a form is submitted.
  const row: (string | number)[] = [
    formatTimestamp(r.created_at),
    r.source || "",
    r.full_name || "",
    r.email || "",
    r.phone || "",
    r.role || "",
    r.message || "",
    r.source_url || "",
    r.id || "",
  ];

  try {
    await prependLeadRow(row);
  } catch (err) {
    console.error("leads/sync: prepend failed", err);
    // Lead is safe in Supabase; signal failure for diagnosis in logs.
    return NextResponse.json({ ok: false, error: "Sheets write failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
