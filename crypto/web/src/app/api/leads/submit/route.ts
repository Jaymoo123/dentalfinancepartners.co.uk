/**
 * Lead submission chokepoint.
 *
 * SEC-04: runtime, maxDuration and dynamic are declared at route level so
 * Vercel can read them statically; all logic lives in the shared factory.
 *
 * The factory handles:
 *   - Honeypot flagging (enquiry_ref non-empty -> store flagged, return success)
 *   - Server-side validation with field floors
 *   - Dedupe with adopt-and-merge semantics (24h window)
 *   - Environment isolation (preview/dev return no-op so the client fallback
 *     never triggers outside production)
 *   - Probe support (LEAD_PROBE_SECRET rewrites source='test')
 */
import { createLeadSubmitHandler } from "@accounting-network/web-shared/leads/server";
import { niche } from "@/config/niche-loader";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

export const POST = createLeadSubmitHandler({ source: niche.content_strategy.source_identifier });
