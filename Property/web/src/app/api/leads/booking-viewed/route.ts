/**
 * Records a booking_viewed engagement signal when a lead opens /book in a real
 * browser. The call originates from BookingPicker.tsx on mount, so email-link
 * scanners (bare server GET, no JS) never trigger it.
 *
 * Dedupes to once per 24 hours per lead. Always returns { ok: true } regardless
 * of outcome: the signal is best-effort and must never surface errors to the
 * client or reveal internal state.
 */

import { type NextRequest, NextResponse } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { adminConfigured, adminSelect } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OK = NextResponse.json({ ok: true });

export async function POST(req: NextRequest) {
  try {
    if (!adminConfigured()) return OK;

    let token = "";
    try {
      const body = (await req.json()) as { token?: unknown };
      token = typeof body.token === "string" ? body.token.trim() : "";
    } catch {
      return OK;
    }

    if (!token) return OK;

    const verdict = verifyLeadToken(token, "book");
    if (!verdict.ok) return OK;

    const leadId = verdict.leadId;
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const existing = await adminSelect<{ id: string }>("lead_contact_events", {
      select: "id",
      lead_id: `eq.${leadId}`,
      event_type: "eq.booking_viewed",
      ts: `gte.${since}`,
      limit: "1",
    });

    if (existing.data.length === 0) {
      await recordLeadContactEvent(leadId, "booking_viewed", "web");
    }
  } catch {
    // best-effort: swallow everything
  }

  return OK;
}
