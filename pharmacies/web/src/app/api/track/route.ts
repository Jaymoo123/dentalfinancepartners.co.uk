import { createTrackHandler } from "@accounting-network/web-shared/analytics/server/createTrackHandler";
import { niche } from "@/config/niche-loader";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-dynamic";

export const POST = createTrackHandler({ siteKey: niche.content_strategy.site_key });
