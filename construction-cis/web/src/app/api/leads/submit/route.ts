/**
 * Trade Tax Specialists lead submission chokepoint.
 *
 * SEC-04: runtime, maxDuration and dynamic are declared at route level so
 * Vercel can read them statically; core logic lives in the shared factory.
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
 * // ponytail: phase-2 (inbound-reply, AI sequence-gen) NOT ported.
 */
import { createLeadSubmitHandler } from "@accounting-network/web-shared/leads/server";
import { enrollLead } from "@/lib/leads/enroll";
import { routePrimarySequence } from "@/config/lead-nurture";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

export const POST = createLeadSubmitHandler({
  source: "construction-cis",
  onLeadInserted: async (lead) => {
    const sequenceName = routePrimarySequence(lead);
    await enrollLead(
      {
        id: lead.id,
        full_name: lead.full_name,
        email: lead.email,
        phone: lead.phone,
        role: lead.role,
        source: lead.source,
        message: lead.message,
      },
      {
        sequenceName,
        live: lead.source !== "test",
      },
    );
  },
});

/*
 * CONSENT TEXT (staged, commented): swap in once the owner enables nurture
 * marketing opt-in. Do NOT make this change live without owner sign-off.
 *
 * const CONSENT_TEXT =
 *   "I agree to be contacted by Trade Tax Specialists about my CIS tax enquiry. " +
 *   "Your data will be used in line with our privacy policy and you can opt out at any time.";
 */
