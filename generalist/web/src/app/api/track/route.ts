/**
 * First-party analytics ingest endpoint.
 *
 * SEC-04: runtime, maxDuration and dynamic declarations are here (route level)
 * so Vercel can read them; logic lives in the shared factory.
 * SEC-08: only the service-role key writes to Supabase; no raw IP is stored;
 * bot control = UA heuristic in createTrackHandler (sendBeacon has no client
 * challenge so Vercel BotID is intentionally not wired here — see server/bots.ts).
 * Always returns 204 so bots get no signal.
 */
import { createTrackHandler } from "@accounting-network/web-shared/analytics/server/createTrackHandler";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

export const POST = createTrackHandler({ siteKey: "general" });
