/**
 * Native booking endpoint: a lead picks a callback slot (weekday + call window)
 * on /book or the thank-you page. The signed token (intent "book", minted at
 * submit / in every nurture message) identifies the lead, so there is nothing
 * to guess or enumerate. Recording the slot is a contactability signal: it runs
 * through the same gate as a reply, promotes the lead, and the slot label lands
 * in the DJH handoff dossier.
 *
 * Re-booking is allowed (people change their mind); the dossier surfaces the
 * most recent slot. Replaces the former Cal.com webhook.
 */

import { type NextRequest, NextResponse } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { recordResponseAndEvaluate } from "@/lib/leads/contactability";
import { isValidBookingDate, windowByKey, bookingLabel } from "@/lib/leads/booking";

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
  try {
    await recordResponseAndEvaluate(verdict.leadId, "booked", "web", {
      start: label,
      date,
      window: windowKey,
    });
  } catch (err) {
    console.error("[leads/book] recording failed", err);
    return NextResponse.json({ success: false, error: "server" }, { status: 500 });
  }

  return NextResponse.json({ success: true, label });
}
