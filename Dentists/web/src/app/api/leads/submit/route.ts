/**
 * Server chokepoint for Dental Finance Partners lead submission.
 *
 * Delegates validation, honeypot, and deduplication to the shared factory
 * (createLeadSubmitHandler). Then wires enrollLead so the instant nurture touch
 * fires after every new submission.
 *
 * Phase 1 (DRY-RUN): LEAD_NURTURE_ENABLED is unset so enrollLead returns
 * { enrolled: false, reason: "dormant" } on every call. No messages leave.
 * Set LEAD_NURTURE_ENABLED=1 to arm.
 *
 * // ponytail: phase-2, replies inert while dormant -- api/leads/inbound/email,
 * api/leads/generate-sequence and their deep chain (anthropic/reply/verify/
 * sequence-gen) are NOT ported here.
 */

import { NextResponse, type NextRequest } from "next/server";
import { createLeadSubmitHandler } from "@accounting-network/web-shared/leads/server";
import { adminConfigured } from "@/lib/supabase/admin";
import { enrollLead } from "@/lib/leads/enroll";
import { routePrimarySequence } from "@/config/lead-nurture";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

// Shared handler: validates, dedupes, inserts lead, returns { success, leadId }.
const sharedHandler = createLeadSubmitHandler({ source: "dentists" });

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { success: false, error: "Service unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  // Clone the request so sharedHandler can consume the body and we can also
  // read it for enrollment context.
  let body: Record<string, unknown> = {};
  let clonedReq: Request;
  try {
    const text = await req.text();
    body = JSON.parse(text) as Record<string, unknown>;
    clonedReq = new Request(req.url, {
      method: req.method,
      headers: req.headers,
      body: text,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
  }

  // Run the shared handler (validates, dedupes, inserts).
  const sharedRes = await sharedHandler(clonedReq as NextRequest);
  let json: { success?: boolean; leadId?: string | null; error?: string } = {};
  try {
    json = (await sharedRes.json()) as typeof json;
  } catch {
    return sharedRes;
  }

  if (!json.success || !json.leadId) {
    return NextResponse.json(json, { status: sharedRes.status });
  }

  // Enrol into the nurture sequence (best-effort, never blocks or loses a lead).
  try {
    const source = String(body.source ?? "dentists").toLowerCase();
    const full_name = String(body.full_name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const role = String(body.role ?? "Other").trim() || "Other";
    const message = String(body.message ?? "").trim();
    const visitorId = (body.visitor_id as string | undefined) ?? null;

    const lead: NurtureLead = {
      id: json.leadId,
      full_name,
      email,
      phone,
      role,
      source,
      message,
    };
    const sequenceName = routePrimarySequence(lead);
    await enrollLead(lead, {
      sequenceName,
      live: source !== "test",
      visitorId,
    });
  } catch (e) {
    console.error("[leads/submit/dentists] enrol/instant-touch failed", e);
  }

  return NextResponse.json(json, { status: sharedRes.status });
}
