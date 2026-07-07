/**
 * Console cache data endpoint.
 *
 * POST { keys: string[] } → { results: Record<string, { data: unknown; refreshed_at: string } | null> }
 *
 * Reads pre-computed values from the console_cache Supabase table.
 * Auth-gated: requires a valid __console_session cookie.
 * Each lookup is a single indexed primary-key scan — ~5ms regardless of
 * how complex the underlying data was to compute.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/checkAuth";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

type CacheRow = {
  cache_key: string;
  data: unknown;
  refreshed_at: string;
};

async function readKeys(keys: string[]): Promise<CacheRow[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("supabase env missing");
  // Use `in` filter: cache_key=in.(key1,key2,...)
  const inList = keys.map((k) => `"${k}"`).join(",");
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/console_cache?cache_key=in.(${inList})&select=cache_key,data,refreshed_at`,
    {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`console_cache read ${res.status}`);
  return (await res.json()) as CacheRow[];
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const authed = await checkAuth();
  if (!authed) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let keys: string[];
  try {
    const body = await req.json();
    if (!Array.isArray(body?.keys)) throw new Error("keys must be array");
    keys = (body.keys as unknown[])
      .filter((k): k is string => typeof k === "string")
      .slice(0, 100); // safety cap
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  if (keys.length === 0) {
    return NextResponse.json({ results: {} });
  }

  try {
    const rows = await readKeys(keys);
    const byKey = new Map(rows.map((r) => [r.cache_key, r]));
    const results: Record<string, { data: unknown; refreshed_at: string } | null> = {};
    for (const k of keys) {
      const row = byKey.get(k);
      results[k] = row ? { data: row.data, refreshed_at: row.refreshed_at } : null;
    }
    return NextResponse.json({ results });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "fetch failed" },
      { status: 502 },
    );
  }
}
