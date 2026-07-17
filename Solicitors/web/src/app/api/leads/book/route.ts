/**
 * Native booking endpoint for Accounts for Lawyers: a lead picks a callback
 * slot (weekday + call window) on /book or the thank-you page. The signed token
 * (intent "book") identifies the lead. Recording the slot is a contactability
 * signal and promotes the lead for handoff.
 *
 * Slim adaptation of Property's /api/leads/book:
 *   - No contactability/verify tree (no phone-verify on this site).
 *   - Best-effort promote: flip lead_nurture_state to contactable + leads.status.
 */

import { type NextRequest, NextResponse } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { adminUpdate } from "@/lib/supabase/admin";
import { isValidBookingDate, windowByKey, bookingLabel } from "@/lib/leads/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BookBody {
  token?: string;
  date?: string;   // YYYY-MM-DD
  window?: string; // CALL_WINDOWS key
}

export async function POST(req: NextRequest) {
  let body: BookBody;
  try {
    body = (await req.json()) as BookBody;
  } catch {
    return NextResponse.json({ success: false, error: "bad-request" }, { status: 400 });
  }

  const verdict = verifyLeadToken(body.token ?? "", "book");
  if (!verdict.ok) {
    const status = verdict.reason === "expired" ? 410 : 401;
    return NextResponse.json({ success: false, error: verdict.reason }, { status });
  }

  const date = (body.date ?? "").trim();
  const windowKey = (body.window ?? "").trim();
  if (!isValidBookingDate(date) || !windowByKey(windowKey)) {
    return NextResponse.json({ success: false, error: "bad-slot" }, { status: 400 });
  }

  const label = bookingLabel(date, windowKey);
  const leadId = verdict.leadId;

  try {
    await recordLeadContactEvent(leadId, "booked", "web", {
      start: label,
      date,
      window: windowKey,
    });
  } catch (err) {
    console.error("[leads/book] recording failed", err);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }

  // Best-effort promote: flip every nurture row for this lead (both sequences)
  // to contactable so the cron stops chasing, and mark the lead contactable.
  // Awaited so the serverless instance cannot freeze before the writes land.
  try {
    await adminUpdate(
      "lead_nurture_state",
      { lead_id: `eq.${leadId}` },
      { status: "contactable", next_action_at: null },
    );
  } catch (e) {
    console.error("[leads/book] nurture state promote failed (non-fatal)", e);
  }
  try {
    await adminUpdate(
      "leads",
      { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
      { status: "contactable" },
    );
  } catch (e) {
    console.error("[leads/book] lead status promote failed (non-fatal)", e);
  }

  return NextResponse.json({ success: true, label });
}
