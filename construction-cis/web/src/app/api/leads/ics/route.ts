/**
 * ICS download: a lead clicks "Add to calendar" from the booking confirmation
 * or the T-24 reminder email. The signed book-intent token identifies the lead;
 * we look up their latest booked slot and return an RFC 5545 VCALENDAR attachment.
 *
 * Token intent is "book" (same secret used everywhere in the booking flow).
 * No caching: the slot may be rebooked at any time.
 */

import { type NextRequest, NextResponse } from "next/server";
import { verifyLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";
import { adminSelect } from "@/lib/supabase/admin";
import { bookingLabel } from "@/lib/leads/booking";
import { buildIcsForSlot } from "@/lib/leads/aux-cron";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface BookedMeta {
  date:   string;
  window: string;
  start?: string;
}

function parseBookedMeta(raw: unknown): BookedMeta | null {
  if (!raw || typeof raw !== "object") return null;
  const m = raw as Record<string, unknown>;
  if (typeof m.date !== "string" || typeof m.window !== "string") return null;
  return {
    date:   m.date,
    window: m.window,
    start:  typeof m.start === "string" ? m.start : undefined,
  };
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = req.nextUrl.searchParams.get("t") ?? "";

  const verdict = verifyLeadToken(token, "book");
  if (!verdict.ok) {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const { leadId } = verdict;

  const eventsRes = await adminSelect<{ meta: unknown }>("lead_contact_events", {
    select: "meta",
    lead_id: `eq.${leadId}`,
    event_type: "eq.booked",
    order: "ts.desc",
    limit: "1",
  });

  const meta = parseBookedMeta(eventsRes.data[0]?.meta);
  if (!meta) {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const label = meta.start ?? bookingLabel(meta.date, meta.window) ?? meta.window;
  const ics   = buildIcsForSlot({ leadId, date: meta.date, windowKey: meta.window, label });

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type":        "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="review-call.ics"',
      "Cache-Control":       "no-store, no-cache",
    },
  });
}
