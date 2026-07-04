/**
 * POST /api/leads/handoff/resend
 *
 * Re-sends both the forwardable brief and the internal ops email for a lead
 * that is already contactable or forwarded. Idempotent: sendContactableHandoff
 * performs no status writes, so re-calling it is safe.
 *
 * Security: x-internal-token shared-secret guard (constant-time compare).
 * British English. No em-dashes.
 */

import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured, adminSelect, adminInsert } from "@/lib/supabase/admin";
import { sendContactableHandoff } from "@/lib/leads/handoff";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

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
  // Basic uuid-ish validation (8-4-4-4-12 hex pattern).
  if (!leadId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(leadId)) {
    return NextResponse.json({ ok: false, error: "leadId must be a valid UUID" }, { status: 400 });
  }

  try {
    const res = await adminSelect<{ id: string; status: string }>("leads", {
      select: "id,status",
      id: `eq.${leadId}`,
      limit: "1",
    });
    const lead = res.data[0];
    if (!lead) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }
    if (lead.status !== "contactable" && lead.status !== "forwarded") {
      return NextResponse.json(
        { ok: false, error: `Cannot re-send handoff for a lead with status '${lead.status}'. Only contactable and forwarded leads are eligible.` },
        { status: 409 },
      );
    }

    const handoff = await sendContactableHandoff(leadId, "manual re-send");

    if (handoff.sent) {
      // Record the re-send event.
      await adminInsert("lead_contact_events", {
        lead_id: leadId,
        event_type: "operator_update",
        channel: "system",
        ts: new Date().toISOString(),
        meta: { kind: "handoff_resent" },
      });
    }

    return NextResponse.json({ ok: true, ...handoff });
  } catch (e) {
    console.error("[leads/handoff/resend] failed", e);
    return NextResponse.json({ ok: false, error: "resend_failed" }, { status: 500 });
  }
}
