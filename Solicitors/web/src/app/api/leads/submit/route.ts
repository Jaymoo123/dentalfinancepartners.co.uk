/**
 * Server chokepoint for Solicitors (Accounts for Lawyers) lead submission.
 *
 * Delegates validation, dedup, and insert to the shared factory, then:
 *   - enrolls the lead into the Solicitors nurture sequence (best-effort);
 *   - mints a signed booking token so the thank-you page can show the native
 *     slot picker at the highest-intent moment straight after the form.
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
  source: "solicitors",
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

  // Parse the factory response so we can append bookingToken.
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
