/**
 * Trade Tax Specialists lead submission chokepoint.
 *
 * The factory handles:
 *   - Honeypot flagging (enquiry_ref non-empty -> store flagged, return success)
 *   - Server-side validation with field floors
 *   - Dedupe with adopt-and-merge semantics (24h window)
 *   - Environment isolation (preview/dev return no-op so the client fallback
 *     never triggers outside production)
 *   - Probe support (LEAD_PROBE_SECRET rewrites source='test')
 *
 * onLeadInserted: enrols every brand-new lead into the CIS nurture sequence.
 * Best-effort, never blocks or loses the lead. No-ops while LEAD_NURTURE_ENABLED
 * is unset (dormant/dry-run).
 *
 * After enrolment, mints a signed booking token and appends it to the response
 * so the thank-you page can render the inline BookingPicker.
 * Degrades silently if LEAD_NURTURE_TOKEN_SECRET is unset.
 *
 * // ponytail: phase-2 (inbound-reply, AI sequence-gen) NOT ported.
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

const baseHandler = createLeadSubmitHandler({ source: "construction-cis" });

export async function POST(req: Request): Promise<NextResponse> {
  let body: Record<string, unknown> = {};
  try {
    const cloned = req.clone();
    body = (await cloned.json()) as Record<string, unknown>;
  } catch {
    // best-effort; base handler will also parse/fail
  }

  const response = await baseHandler(req);

  let result: { success?: boolean; leadId?: string | null } = {};
  try {
    result = (await response.clone().json()) as typeof result;
  } catch {
    return response;
  }

  if (result.success && result.leadId) {
    let bookingToken: string | undefined;
    try {
      bookingToken = mintLeadToken(result.leadId, "book");
    } catch {
      // LEAD_NURTURE_TOKEN_SECRET unset: picker will not render, non-fatal
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
        source: "construction-cis",
        message,
      };
      const sequenceName = routePrimarySequence(lead);
      await enrollLead(lead, {
        sequenceName,
        live: lead.source !== "test",
        visitorId,
      });
    } catch (err) {
      console.error("[leads/submit/cis] enrol failed (non-fatal)", err);
    }

    if (bookingToken) {
      try {
        const base = (await response.clone().json()) as Record<string, unknown>;
        return NextResponse.json({ ...base, bookingToken }, { status: response.status });
      } catch {
        // re-parse failed: return original response
      }
    }
  }

  return response;
}
