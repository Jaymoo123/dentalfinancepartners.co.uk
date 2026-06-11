/**
 * First-party analytics ingest endpoint.
 *
 * SEC-04: runtime, maxDuration and dynamic declarations are here (route level)
 * so Vercel can read them; logic lives in the shared factory.
 * SEC-08: only the service-role key writes to Supabase; no raw IP is stored;
 * bot control = UA heuristic in createTrackHandler.
 * Always returns 204 so bots get no signal.
 */
import { createTrackHandler } from "@accounting-network/web-shared/analytics/server/createTrackHandler";
import { niche } from "@/config/niche-loader";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

// Site key from config, never a literal (PF-07).
export const POST = createTrackHandler({ siteKey: niche.content_strategy.site_key });
