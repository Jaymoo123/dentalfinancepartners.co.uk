/**
 * Native booking endpoint: a lead picks a callback slot (weekday + call window)
 * on /book or the thank-you page.
 *
 * 1. Verify token (intent "book") -- 410 expired, 401 otherwise.
 * 2. Validate date + window.
 * 3. Record "booked" event in lead_contact_events (NO new table, NO migration).
 * 4. Best-effort promote: update lead_nurture_state + leads (scoped to token leadId only).
 * 5. Return {success, label}.
 *
 * Security: promote is scoped to token leadId only; intent enforced; no mass-assignment;
 * slot validation guards date/window; token expiry enforced by verifyLeadToken.
 * Re-booking allowed; the most recent slot is what the team acts on.
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
  date?: string;
  window?: string;
}

export async function POST(req: NextRequest) {
  let body: BookBody;
  try {
    body = (await req.json()) as BookBody;
  } catch {
    return NextResponse.json({ success: false, error: "bad-request" }, { status: 400 });
  }

  // 1. Verify token -- intent "book" enforced; expiry checked inside verifyLeadToken.
  const verdict = verifyLeadToken(body.token ?? "", "book");
  if (!verdict.ok) {
    const status = verdict.reason === "expired" ? 410 : 401;
    return NextResponse.json({ success: false, error: verdict.reason }, { status });
  }
  const leadId = verdict.leadId;

  // 2. Validate slot -- guards against invalid dates and unknown windows.
  const date = (body.date ?? "").trim();
  const windowKey = (body.window ?? "").trim();
  if (!isValidBookingDate(date) || !windowByKey(windowKey)) {
    return NextResponse.json({ success: false, error: "bad-slot" }, { status: 400 });
  }

  const label = bookingLabel(date, windowKey);

  // 3. Record the booked event in lead_contact_events (load-bearing write).
  //    Bookings = lead_contact_events rows, NO new table, NO migration.
  try {
    await recordLeadContactEvent(leadId, "booked", "web", {
      start: label,
      date,
      window: windowKey,
    });
  } catch (err) {
    console.error("[leads/book/cis] event insert failed", err);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }

  // 4. Best-effort promote -- scoped to token leadId only; status filter prevents
  //    overwriting already-contactable/closed leads.
  try {
    await adminUpdate(
      "lead_nurture_state",
      { lead_id: `eq.${leadId}` },
      { status: "contactable", next_action_at: null },
    );
  } catch (err) {
    console.error("[leads/book/cis] nurture state promote failed (non-fatal)", err);
  }
  try {
    await adminUpdate(
      "leads",
      { id: `eq.${leadId}`, status: "in.(new,nurturing)" },
      { status: "contactable" },
    );
  } catch (err) {
    console.error("[leads/book/cis] lead promote failed (non-fatal)", err);
  }

  return NextResponse.json({ success: true, label });
}
