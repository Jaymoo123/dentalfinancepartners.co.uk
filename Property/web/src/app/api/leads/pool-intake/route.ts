/**
 * Internal pool-intake endpoint: sibling sites call this (fail-open) when one of
 * THEIR leads passes the contactability gate, so the Telegram lead-ops flow
 * (AI tier grade + verified ping) fires from the single estate instance here,
 * exactly as it does in-process for Property's own leads
 * (lib/leads/contactability.ts promoteIfContactable).
 *
 * Additive, never load-bearing: the caller's handoff email fires regardless and
 * carries the "Offer to buyers" link, so any failure here costs convenience,
 * never a lead. Idempotency comes from the caller's promotion latch (the
 * status flip updates zero rows on a second pass, so this is called at most
 * once per promotion) plus ensureCaseTier's own stored-tier reuse.
 *
 * Security: the same x-internal-token shared-secret guard as /api/leads/enroll
 * (constant-time compare; dedicated secret preferred, master token secret as
 * fallback). Never publicly linked.
 */

import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { adminConfigured, adminSelect } from "@/lib/supabase/admin";
import { botArmed } from "@/lib/telegram";
import { isBotPaused } from "@/lib/leads/nurture-control";
import { ensureCaseTier } from "@/lib/leads/case-tier";
import { notifyLeadVerified } from "@/lib/leads/bot-notify";

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

type LeadRow = { id: string; source: string | null; is_test: boolean | null };

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
  if (!leadId) {
    return NextResponse.json({ ok: false, error: "leadId required" }, { status: 400 });
  }

  try {
    const res = await adminSelect<LeadRow>("leads", {
      select: "id,source,is_test",
      id: `eq.${leadId}`,
      limit: "1",
    });
    const row = res.data[0];
    if (!row) {
      return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
    }
    // Test traffic stays out of every operator surface (bot-notify refuses too;
    // this keeps the grading call from even running).
    if (row.is_test === true || (row.source ?? "") === "test") {
      return NextResponse.json({ ok: true, pinged: false, reason: "test" });
    }
    if (!botArmed()) {
      return NextResponse.json({ ok: true, pinged: false, reason: "bot_unarmed" });
    }
    if (await isBotPaused()) {
      return NextResponse.json({ ok: true, pinged: false, reason: "bot_paused" });
    }

    const grade = await ensureCaseTier(leadId);
    if (!grade) {
      return NextResponse.json({ ok: true, pinged: false, reason: "no_grade" });
    }
    await notifyLeadVerified(leadId, grade);
    return NextResponse.json({ ok: true, pinged: true });
  } catch (e) {
    // Best-effort: never leak internals in the error body.
    console.error("[leads/pool-intake] failed", e);
    return NextResponse.json({ ok: false, error: "intake_failed" }, { status: 500 });
  }
}
