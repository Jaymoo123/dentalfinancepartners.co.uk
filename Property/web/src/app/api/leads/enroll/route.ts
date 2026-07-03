/**
 * Internal retro-enrol / backfill endpoint: enrols a single existing lead into
 * its primary nurture sequence via the shared, idempotent enrollLead path. This
 * is the target the reconciliation safety-net (and any manual backfill) calls to
 * repair a lead that has lost, or never got, its lead_nurture_state row.
 *
 * It re-uses the ONE enrolment code path (enrollLead), so it is:
 *   - idempotent (no-op if a state row already exists),
 *   - dormant-aware (no-op while LEAD_NURTURE_ENABLED is unset),
 *   - sequence-aware (routes by the lead's missing contact fields).
 *
 * Security: the same x-internal-token shared-secret guard as
 * /api/leads/generate-sequence (constant-time compare; dedicated secret
 * preferred, master token secret as fallback). Never publicly linked.
 *
 * British English. No em-dashes.
 */

import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured, adminSelect } from "@/lib/supabase/admin";
import { enrollLead } from "@/lib/leads/enroll";
import { routePrimarySequence } from "@/config/lead-nurture";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Constant-time string compare (padded so length never leaks via timing). */
function safeEqual(a: string, b: string): boolean {
  try {
    const ab = Buffer.from(a.padEnd(256, "\0"), "utf8");
    const bb = Buffer.from(b.padEnd(256, "\0"), "utf8");
    if (ab.length !== bb.length) return false;
    return timingSafeEqual(ab, bb);
  } catch {
    return false;
  }
}

interface LeadRow {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  source: string | null;
  message: string | null;
  visitor_id: string | null;
}

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // Shared-secret guard: prefer a DEDICATED secret so this internal endpoint
  // never reuses the master token-signing secret; fall back to it only if the
  // dedicated one is unset. Constant-time compare (never `token !== secret`).
  const secret = process.env.LEAD_INTERNAL_SECRET || process.env.LEAD_NURTURE_TOKEN_SECRET || "";
  const token = req.headers.get("x-internal-token") ?? "";
  if (!secret || !safeEqual(token, secret)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const leadId = typeof body.leadId === "string" ? body.leadId.trim() : "";
  if (!leadId) {
    return NextResponse.json({ ok: false, error: "leadId required" }, { status: 400 });
  }

  try {
    const res = await adminSelect<LeadRow>("leads", {
      select: "id,full_name,email,phone,role,source,message,visitor_id",
      id: `eq.${leadId}`,
      limit: "1",
    });
    const row = res.data[0];
    if (!row) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }

    const lead: NurtureLead = {
      id: row.id,
      full_name: row.full_name ?? "",
      email: row.email ?? "",
      phone: row.phone ?? "",
      role: row.role ?? undefined,
      source: row.source ?? "property",
      message: row.message ?? undefined,
    };

    const result = await enrollLead(lead, {
      sequenceName: routePrimarySequence(lead),
      visitorId: row.visitor_id,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    // Best-effort: never leak internals in the error body.
    console.error("[leads/enroll] failed", e);
    return NextResponse.json({ ok: false, error: "enrol_failed" }, { status: 500 });
  }
}
