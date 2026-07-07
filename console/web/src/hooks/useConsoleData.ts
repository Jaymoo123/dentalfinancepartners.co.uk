"use client";

import { useEffect, useRef, useState } from "react";

export type CacheEntry = { data: unknown; refreshed_at: string };
export type CacheMap = Record<string, CacheEntry>;

export type ConsoleDataResult = {
  cache: CacheMap;
  /** ISO timestamp from the most recently refreshed key (null until first load) */
  refreshedAt: string | null;
  loading: boolean;
};

/**
 * Fetches a set of console_cache keys from /api/console/data and keeps them
 * fresh with an auto-refresh interval.
 *
 * - On mount: immediate fetch
 * - When keys change (new keys added): immediate re-fetch for the new keys
 * - On interval: re-fetch all keys
 * - On 401: redirects to /login (session expired mid-session)
 *
 * @param keys      Cache key slugs (e.g. "estate:kpis:7d", "site:property:visitors:GB")
 * @param intervalMs Auto-refresh interval in ms (default 30 000)
 */
export function useConsoleData(
  keys: string[],
  intervalMs = 30_000,
): ConsoleDataResult {
  const [cache, setCache] = useState<CacheMap>({});
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Serialise key list so we can detect changes in the useEffect dependency
  const keysStr = keys.join("|");

  // Stable ref so the interval closure always uses the current key list
  const keysRef = useRef(keys);
  useEffect(() => {
    keysRef.current = keys;
  });

  useEffect(() => {
    if (keys.length === 0) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function refresh() {
      try {
        const res = await fetch("/api/console/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ keys: keysRef.current }),
        });

        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        if (!res.ok) return; // transient error — keep stale data, retry next interval

        const json = (await res.json()) as {
          results: Record<string, CacheEntry | null>;
        };

        if (cancelled) return;

        let latestTs: string | null = null;
        const next: CacheMap = {};
        for (const [k, entry] of Object.entries(json.results)) {
          if (!entry) continue;
          next[k] = entry;
          if (!latestTs || entry.refreshed_at > latestTs) {
            latestTs = entry.refreshed_at;
          }
        }

        setCache((prev) => ({ ...prev, ...next }));
        if (latestTs) setRefreshedAt(latestTs);
      } catch {
        // Network error — keep stale data
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    refresh();
    const timer = setInterval(refresh, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keysStr, intervalMs]); // re-fetches immediately when key list changes

  return { cache, refreshedAt, loading };
}

/** Type-safe accessor: cast a cache entry's data to T, or return a fallback. */
export function cacheGet<T>(cache: CacheMap, key: string, fallback: T): T {
  const entry = cache[key];
  return entry ? (entry.data as T) : fallback;
}
