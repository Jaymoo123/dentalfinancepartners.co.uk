/**
 * Generalist (Holloway Davies) lead submission chokepoint.
 *
 * Ports Property's submit route steps 1-3 from the shared factory, then adds
 * step 5: enrol into the lead-nurture sequence. While LEAD_NURTURE_ENABLED is
 * unset, enrollLead returns {enrolled:false, reason:"dormant"} -- safe no-op.
 *
 * The factory handles:
 *   - Honeypot flagging (enquiry_ref non-empty -> store flagged, return success)
 *   - Server-side validation with field floors
 *   - Dedupe with adopt-and-merge semantics (24h window)
 *   - Environment isolation (preview/dev return no-op so the client fallback
 *     never triggers outside production)
 *   - Probe support (LEAD_PROBE_SECRET rewrites source='test')
 *
 * // ponytail: phase-2, replies inert while dormant -- api/leads/inbound/email
 * // and api/leads/generate-sequence are NOT ported; wire them here when phase-2 starts.
 */
import { createLeadSubmitHandler } from "@accounting-network/web-shared/leads/server";
import { NextResponse } from "next/server";
import { enrollLead } from "@/lib/leads/enroll";
import { routePrimarySequence } from "@/config/lead-nurture";
import type { NurtureLead } from "@accounting-network/web-shared/lead-nurture/config";
import { mintLeadToken } from "@accounting-network/web-shared/lead-nurture/tokens";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

// The base handler handles steps 1-3 (honeypot, validate, dedupe/insert).
const baseHandler = createLeadSubmitHandler({ source: "generalist" });

export async function POST(req: Request): Promise<NextResponse> {
  // Clone the body before the base handler consumes it (we need leadId + source).
  let body: Record<string, unknown> = {};
  try {
    const cloned = req.clone();
    body = (await cloned.json()) as Record<string, unknown>;
  } catch {
    // best-effort; fall through to base handler which will also parse/fail
  }

  const response = await baseHandler(req);

  // Only enrol on a successful insert; never on 4xx/5xx or dedupe merges.
  // The base handler returns {success:true, leadId} on insert; leadId may be
  // null on dedupe merges (returns early) -- skip enrol in both those cases.
  let result: { success?: boolean; leadId?: string | null } = {};
  try {
    result = (await response.clone().json()) as typeof result;
  } catch {
    return response;
  }

  if (result.success && result.leadId) {
    // Mint a booking token for the thank-you picker (best-effort; silent on failure).
    let bookingToken: string | undefined;
    try {
      bookingToken = mintLeadToken(result.leadId, "book");
    } catch {
      // LEAD_NURTURE_TOKEN_SECRET unset or other error: picker just won't render
    }

    try {
      const full_name = String(body.full_name ?? "").trim();
      const email = String(body.email ?? "").trim();
      const phone = String(body.phone ?? "").trim();
      const role = String(body.role ?? "Other").trim() || "Other";
      const message = String(body.message ?? "").trim();
      const visitorId = (body.visitor_id as string) ?? null;

      const lead: NurtureLead = {
        id: result.leadId,
        full_name,
        email,
        phone,
        role,
        source: "generalist",
        message,
      };
      const sequenceName = routePrimarySequence(lead);
      await enrollLead(lead, {
        sequenceName,
        live: lead.source !== "test",
        visitorId,
      });
    } catch (err) {
      console.error("[leads/submit] enrol failed (non-fatal)", err);
    }

    // Re-serialise the base response JSON with bookingToken appended.
    if (bookingToken) {
      try {
        const base = (await response.clone().json()) as Record<string, unknown>;
        return NextResponse.json({ ...base, bookingToken }, { status: response.status });
      } catch {
        // If re-parse fails, fall through to original response (bookingToken lost, non-fatal)
      }
    }
  }

  return response;
}
