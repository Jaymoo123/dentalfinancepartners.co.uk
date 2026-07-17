/**
 * Native booking endpoint: a lead picks a callback slot (weekday + call window)
 * on /book or the thank-you page. The signed token (intent "book", minted at
 * submit and in every nurture message) identifies the lead.
 *
 * Slim write path -- no Property-style contactability/verify tree:
 * 1. Verify token (intent "book") -- 410 expired, 401 otherwise.
 * 2. Validate date + window.
 * 3. Record "booked" event via recordLeadContactEvent.
 * 4. Best-effort promote: update lead_nurture_state (both sequences) and leads.
 * 5. Return {success, label}.
 *
 * Operator notify fires automatically via the estate pg_net trigger on leads.
 * Re-booking is allowed; the most recent slot is what the team acts on.
 */

import { type NextRequest, NextResponse } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordLeadContactEvent } from "@accounting-network/web-shared/lead-nurture/send";
import { isValidBookingDate, windowByKey, bookingLabel } from "@/lib/leads/booking";
import { adminUpdate } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BookBody {
  token?: string;
  date?: string; // YYYY-MM-DD
  window?: string; // CALL_WINDOWS key
}

export async function POST(req: NextRequest) {
  let body: BookBody;
  try {
    body = (await req.json()) as BookBody;
  } catch {
    return NextResponse.json({ success: false, error: "bad-request" }, { status: 400 });
  }

  // 1. Verify token.
  const verdict = verifyLeadToken(body.token ?? "", "book");
  if (!verdict.ok) {
    const status = verdict.reason === "expired" ? 410 : 401;
    return NextResponse.json({ success: false, error: verdict.reason }, { status });
  }
  const leadId = verdict.leadId;

  // 2. Validate slot.
  const date = (body.date ?? "").trim();
  const windowKey = (body.window ?? "").trim();
  if (!isValidBookingDate(date) || !windowByKey(windowKey)) {
    return NextResponse.json({ success: false, error: "bad-slot" }, { status: 400 });
  }

  const label = bookingLabel(date, windowKey);

  // 3. Record the booked event (load-bearing write).
  try {
    await recordLeadContactEvent(leadId, "booked", "web", {
      start: label,
      date,
      window: windowKey,
    });
  } catch (err) {
    console.error("[leads/book] event insert failed", err);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }

  // 4. Best-effort promote: mark lead as contactable and stop the chase.
  // Wrapped so a DB hiccup never 500 after the event is already saved.
  try {
    await adminUpdate(
      "lead_nurture_state",
      { lead_id: `eq.${leadId}` },
      { status: "contactable", next_action_at: null },
    );
  } catch (err) {
    console.error("[leads/book] nurture state promote failed (non-fatal)", err);
  }
  try {
    await adminUpdate(
      "leads",
      { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
      { status: "contactable" },
    );
  } catch (err) {
    console.error("[leads/book] lead promote failed (non-fatal)", err);
  }

  return NextResponse.json({ success: true, label });
}
