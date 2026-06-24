/**
 * Lead enrichment webhook.
 *
 * Fired by the leads_to_enrich pg_net trigger on INSERT into leads (the same
 * sanitised-trigger pattern as notify/sync). Classifies the message via Opus (AI
 * Gateway) into intent + a value score, does a best-effort Companies House lookup
 * on any company named, and upserts a row into lead_enrichment (idempotent on
 * lead_id). Fail-open at every step: if the gateway is unavailable it skips
 * (so it can be retried) rather than blocking; CH no-ops without a key.
 *
 * Covers all sites (shared leads table; `source` distinguishes), so the same
 * endpoint + trigger can serve every niche once their AI Gateway is enabled.
 */
import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";
import { classifyLead, AI_MODEL_ID } from "@/lib/ai";
import { searchCompany } from "@/lib/companies-house";
import { adminConfigured, adminInsert } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

type LeadRecord = {
  id?: string;
  message?: string;
  role?: string;
  source?: string;
  source_url?: string;
};
type WebhookPayload = { type?: string; table?: string; record?: LeadRecord };

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    secretSet: Boolean(process.env.LEADS_ENRICH_SECRET || process.env.LEADS_NOTIFY_SECRET || process.env.LEADS_SYNC_SECRET),
    aiReady: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL),
    chReady: Boolean(process.env.COMPANIES_HOUSE_API_KEY),
  });
}

export async function POST(req: NextRequest) {
  if (!adminConfigured()) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const expected = process.env.LEADS_ENRICH_SECRET || process.env.LEADS_NOTIFY_SECRET || process.env.LEADS_SYNC_SECRET;
  if (!expected) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  if (!secretsMatch(req.headers.get("x-webhook-secret") || "", expected)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  if (payload.type && payload.type !== "INSERT") return NextResponse.json({ ok: true, skipped: "not-insert" });
  const r = payload.record;
  if (!r?.id) return NextResponse.json({ ok: false, error: "no_record" }, { status: 400 });

  // Synthetic/test leads (post-deploy smoke checks) must never consume the paid
  // enrichment model or land in lead_enrichment. They are deleted by the probe.
  if ((r.source ?? "").trim().toLowerCase() === "test") {
    return NextResponse.json({ ok: true, skipped: "test-lead" });
  }

  const message = (r.message ?? "").trim();
  if (!message) return NextResponse.json({ ok: true, skipped: "no_message" });

  // Classify. If the gateway is unavailable this returns null and we skip, so the
  // lead can be re-enriched later rather than storing an empty row.
  const cls = await classifyLead({ message, role: r.role, sourceUrl: r.source_url });
  if (!cls) return NextResponse.json({ ok: true, skipped: "no_classification" });

  // Best-effort Companies House on the first named company that resolves.
  let ch = null;
  for (const nm of cls.company_names ?? []) {
    ch = await searchCompany(nm);
    if (ch) break;
  }

  const row = {
    lead_id: r.id,
    intent_category: cls.intent_category,
    intent_confidence: cls.intent_confidence,
    quality_score: cls.quality_score,
    summary: cls.summary,
    ch_company_number: ch?.company_number ?? null,
    ch_company_name: ch?.company_name ?? null,
    ch_company_status: ch?.company_status ?? null,
    ch_confidence: ch?.confidence ?? null,
    model: AI_MODEL_ID,
    enriched_at: new Date().toISOString(),
    raw: cls,
  };

  const res = await adminInsert("lead_enrichment", row, { onConflict: "lead_id" });
  if (!res.ok) return NextResponse.json({ ok: false, error: "write_failed" }, { status: 500 });

  return NextResponse.json({
    ok: true,
    intent: cls.intent_category,
    quality: cls.quality_score,
    company: ch ? ch.confidence : "none",
  });
}
