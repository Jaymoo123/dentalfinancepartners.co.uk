"use client";

import { useEffect, useRef, useState } from "react";

export type CacheEntry = { data: unknown; refreshed_at: string };
export type CacheMap = Record<string, CacheEntry>;

// Module-level cache — survives route changes so navigating back is instant
const moduleCache: CacheMap = {};

export type ConsoleDataResult = {
  cache: CacheMap;
  /** ISO timestamp from the most recently refreshed key (null until first load) */
  refreshedAt: string | null;
  loading: boolean;
};

export function useConsoleData(
  keys: string[],
  intervalMs = 30_000,
): ConsoleDataResult {
  // Seed from module cache immediately — returning to a page renders data instantly
  const [cache, setCache] = useState<CacheMap>(() => {
    const pre: CacheMap = {};
    for (const k of keys) if (moduleCache[k]) pre[k] = moduleCache[k];
    return pre;
  });
  const [refreshedAt, setRefreshedAt] = useState<string | null>(() => {
    let latest: string | null = null;
    for (const k of keys) {
      const ts = moduleCache[k]?.refreshed_at;
      if (ts && (!latest || ts > latest)) latest = ts;
    }
    return latest;
  });
  // loading = false if every key is already in module cache
  const [loading, setLoading] = useState(() => keys.some((k) => !moduleCache[k]));

  const keysStr = keys.join("|");
  const keysRef = useRef(keys);
  useEffect(() => { keysRef.current = keys; });

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
          moduleCache[k] = entry; // write-through to module cache
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
  }, [keysStr, intervalMs]);

  return { cache, refreshedAt, loading };
}

/** Type-safe accessor: cast a cache entry's data to T, or return a fallback. */
export function cacheGet<T>(cache: CacheMap, key: string, fallback: T): T {
  const entry = cache[key];
  return entry ? (entry.data as T) : fallback;
}
