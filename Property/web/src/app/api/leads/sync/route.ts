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
 */
import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";
import { appendLeadRow, sheetsConfigured } from "@/lib/leads/google-sheets";

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

  const row: (string | number)[] = [
    formatTimestamp(r.created_at),
    r.source || "",
    r.full_name || "",
    r.email || "",
    r.phone || "",
    r.role || "",
    r.practice_name || "",
    r.message || "",
    r.source_url || "",
    r.status || "new",
    r.id || "",
  ];

  try {
    await appendLeadRow(row);
  } catch (err) {
    console.error("leads/sync: append failed", err);
    // Lead is safe in Supabase; signal failure for diagnosis in logs.
    return NextResponse.json({ ok: false, error: "Sheets append failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
