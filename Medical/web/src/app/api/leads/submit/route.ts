/**
 * Server chokepoint for Medical Accountants UK lead submission.
 *
 * Replaces the old client-side direct PostgREST insert (which bypassed all
 * shared contract checks and had a client-side honeypot that silently dropped
 * real leads when browser autofill populated the hidden field).
 *
 * Delegates all logic to the shared factory which handles:
 *   1. Honeypot (enquiry_ref) -- stores flagged, never silently loses a lead.
 *   2. Server-side validation.
 *   3. 24-hour same-source+email dedupe with adopt-and-merge semantics.
 *
 * Environment isolation: returns a success-shaped no-op outside production so
 * preview browsing never creates real leads. Set LEADS_ALLOW_NONPROD_SUBMIT=1
 * to override during testing.
 *
 * Dormancy: enrollLead is a no-op while LEAD_NURTURE_ENABLED is unset.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createLeadSubmitHandler } from "@accounting-network/web-shared/leads/server";
import { enrollLead } from "@/lib/leads/enroll";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

const _handler = createLeadSubmitHandler({
  source: "medical",
  onLeadInserted: async (lead) => {
    // Best-effort: enrolment must never lose or block the lead submission.
    // Dormant while LEAD_NURTURE_ENABLED is unset.
    await enrollLead(lead).catch((err) => {
      console.error("[leads/submit] enrollLead failed (non-fatal)", err);
    });
  },
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const res = await _handler(req);

  let body: Record<string, unknown>;
  try {
    body = (await res.json()) as Record<string, unknown>;
  } catch {
    return res;
  }

  // Mint a booking token only on success with a real leadId.
  let bookingToken: string | undefined;
  if (body.success && typeof body.leadId === "string" && body.leadId) {
    try {
      bookingToken = mintLeadToken(body.leadId, "book");
    } catch {
      // LEAD_NURTURE_TOKEN_SECRET unset: thank-you page just omits the picker.
    }
  }

  return NextResponse.json(
    { ...body, ...(bookingToken !== undefined ? { bookingToken } : {}) },
    { status: res.status },
  );
}
