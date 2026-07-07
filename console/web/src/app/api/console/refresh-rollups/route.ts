/**
 * Rollup refresh cron — calls refresh_web_rollups() which incrementally
 * recomputes the recent window (today/yesterday) of the web_rollup table at all
 * grains. This is the heavy count(DISTINCT) aggregation; it runs on its own
 * longer cadence so the every-2-min cache cron (/api/console/refresh) stays fast.
 *
 * Open endpoint: only recomputes an internal analytics rollup, no sensitive data.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// ponytail: no auth — only recomputes an internal analytics rollup
export async function GET(_req: NextRequest): Promise<NextResponse> {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return NextResponse.json({ error: "supabase env missing" }, { status: 500 });
  }
  const t0 = Date.now();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/refresh_web_rollups`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    cache: "no-store",
  });
  const ok = res.ok;
  const body = await res.text().catch(() => "");
  return NextResponse.json(
    { ok, status: res.status, ms: Date.now() - t0, body: ok ? undefined : body.slice(0, 300) },
    { status: ok ? 200 : 502 },
  );
}
