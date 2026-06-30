/**
 * Cross-site (estate-level) query layer.
 *
 * Reads from the same Supabase REST endpoints as adminData.ts, but groups
 * results by site_key to produce estate-wide aggregates. Every function
 * is intentionally simple: group-by over the existing site-key-parameterised
 * views and the leads / sites tables.
 *
 * ADDITIVE ONLY: no existing functions modified.
 * NO new SQL / migrations. If a needed view is absent, add a STOP comment.
 * Server-only: never import into a client component.
 */

import { unstable_cache } from "next/cache";
import type { SiteKpis, TimePoint } from "./adminData";
export type { SiteKpis };

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const DEFAULT_TTL = 60;

/** Strict fetch: THROWS on missing env / non-OK / parse failure so failures are
 * never cached. See adminData.ts (the 2026-06-30 cache-poisoning lesson). */
async function fetchRowsStrict<T>(path: string, params: Record<string, string>): Promise<T[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("supabase env missing");
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}?${qs}`, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase rest ${res.status} for ${path}`);
  return (await res.json()) as T[];
}

/** Graceful read: returns [] on any failure. For uncached / fallback callers. */
async function restUncached<T>(path: string, params: Record<string, string>): Promise<T[]> {
  try {
    return await fetchRowsStrict<T>(path, params);
  } catch {
    return [];
  }
}

/**
 * Cached Supabase REST read for the estate (cross-site) layer. Same rationale as
 * adminData.rest(): the estate home page fires ~27 reads per load (two of them
 * full-history scans) with nothing memoised. A short shared TTL collapses repeat
 * loads to ~zero DB work. Only successful responses are cached (the callback
 * throws on failure so errors are never memoised). ttlSeconds=0 bypasses.
 */
function rest<T>(
  path: string,
  params: Record<string, string>,
  ttlSeconds: number = DEFAULT_TTL,
): Promise<T[]> {
  if (ttlSeconds <= 0) return restUncached<T>(path, params);
  try {
    return unstable_cache(
      () => fetchRowsStrict<T>(path, params),
      ["console-rest-v2", path, JSON.stringify(params)],
      { revalidate: ttlSeconds, tags: ["console-data"] },
    )().catch(() => restUncached<T>(path, params));
  } catch {
    return restUncached<T>(path, params);
  }
}

const n = (v: unknown): number => Number(v) || 0;
const rate = (num: number, den: number): number | null =>
  den > 0 ? num / den : null;

// ── Types ──────────────────────────────────────────────────────────────────

/** One row from the sites registry. */
export type SiteRegistryEntry = {
  site_key: string;
  display_name: string;
  domain: string;
  niche: string | null;
  active: boolean;
};

/** Per-site session / lead summary for the estate comparison strip. */
export type EstateSiteRow = {
  site_key: string;
  sessions: number;
  human_sessions: number;
  leads: number;
  conversion_rate: number | null;
  /** 7-day daily sessions array (index 0 = oldest, index 6 = most recent). */
  sessions_7d: number[];
};

/** Estate-level funnel totals (across all sites). */
export type EstateFunnel = {
  sessions: number;
  engaged_sessions: number;
  calc_sessions: number;
  form_cta_sessions: number;
  form_start_sessions: number;
  converted_sessions: number;
};

/** Best-converting channel per site, plus estate totals. */
export type EstateChannelRow = {
  site_key: string;
  channel: string;
  sessions: number;
  leads: number;
  conversion_rate: number | null;
};

/** Per-site error summary. */
export type EstateErrorRow = {
  site_key: string;
  total_errors: number;
  total_sessions: number;
  example_message: string | null;
  last_seen: string | null;
};

/** Per-site web-vitals summary. */
export type EstateVitalsRow = {
  site_key: string;
  metric: string;
  avg_value: number;
  poor_count: number;
  good_count: number;
  total: number;
};

/** A lead row tagged with its originating site. */
export type EstateLeadRow = {
  id: string;
  site_key: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  source: string | null;
  message: string | null;
  created_at: string;
};

/** Top tool per site by lead session rate. */
export type EstateTopTool = {
  site_key: string;
  calculator_slug: string;
  viewed: number;
  computed: number;
  lead_sessions: number;
  computed_to_lead_rate: number | null;
};

// ── Internal raw types ─────────────────────────────────────────────────────

type RawSite = {
  site_key: string;
  display_name: string;
  domain: string;
  niche: string | null;
  active: boolean;
};

type RawFunnelDay = {
  site_key: string;
  date: string;
  sessions: number;
  engaged_sessions: number;
  calc_sessions: number;
  form_cta_sessions: number;
  form_start_sessions: number;
  converted_sessions: number;
};

type RawChannel = {
  site_key: string;
  channel: string;
  referrer_host: string;
  sessions: number;
  leads: number;
  country: string;
};

type RawError = {
  site_key: string;
  message: string | null;
  kind: string;
  count: number;
  sessions: number;
  last_seen: string | null;
  country: string;
};

type RawVitals = {
  site_key: string;
  metric: string;
  value: number;
  rating: string;
  country: string;
};

type RawLead = {
  id: string;
  source: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  message: string | null;
  created_at: string;
};

type RawCalcConversion = {
  site_key: string;
  calculator_slug: string;
  viewed: number;
  computed: number;
  lead_sessions: number;
  country: string;
};

// ── Query functions ───────────────────────────────────────────────────────

/**
 * Return all registered sites from the sites table (active or not).
 * This is the authoritative list for the site switcher.
 */
export async function getSitesRegistry(): Promise<SiteRegistryEntry[]> {
  // The site registry changes ~never; cache an hour. Fetched on every console
  // page (and it serially gates the per-site dashboard's main query batch).
  const rows = await rest<RawSite>("sites", {
    select: "site_key,display_name,domain,niche,active",
    order: "site_key.asc",
    limit: "50",
  }, 3600);
  return rows.map((r) => ({
    site_key: r.site_key,
    display_name: r.display_name,
    domain: r.domain,
    niche: r.niche ?? null,
    active: !!r.active,
  }));
}

/**
 * Returns only the active sites from the registry.
 */
export async function getActiveSites(): Promise<SiteRegistryEntry[]> {
  const rows = await rest<RawSite>("sites", {
    select: "site_key,display_name,domain,niche,active",
    active: "eq.true",
    order: "site_key.asc",
    limit: "50",
  }, 3600);
  return rows.map((r) => ({
    site_key: r.site_key,
    display_name: r.display_name,
    domain: r.domain,
    niche: r.niche ?? null,
    active: true,
  }));
}

/**
 * Estate overview: per-site comparison strip.
 *
 * Reads vw_web_funnel_daily_v2 without a site_key filter (estate-wide),
 * groups by site_key, and joins against recent leads counts.
 *
 * @param days - lookback window (default 7)
 */
export async function getEstateOverview(days = 7): Promise<EstateSiteRow[]> {
  const since = new Date(Date.now() - days * 86400_000).toISOString().slice(0, 10);

  const [funnelRows, leadRows] = await Promise.all([
    rest<RawFunnelDay>("vw_web_funnel_daily_v2", {
      select: "site_key,date,sessions,engaged_sessions,converted_sessions",
      date: `gte.${since}`,
      order: "site_key.asc,date.asc",
      limit: "5000",
    }),
    rest<RawLead>("leads", {
      select: "source,created_at",
      created_at: `gte.${since}T00:00:00Z`,
      order: "source.asc",
      limit: "5000",
    }),
  ]);

  // Aggregate funnel by site_key
  const funnelBySite = new Map<
    string,
    { sessions: number; human_sessions: number; converted: number; byDate: Map<string, number> }
  >();

  for (const r of funnelRows) {
    const k = r.site_key;
    if (!funnelBySite.has(k)) {
      funnelBySite.set(k, { sessions: 0, human_sessions: 0, converted: 0, byDate: new Map() });
    }
    const entry = funnelBySite.get(k)!;
    entry.sessions += n(r.sessions);
    entry.human_sessions += n(r.engaged_sessions);
    entry.converted += n(r.converted_sessions);
    const day = String(r.date).slice(0, 10);
    entry.byDate.set(day, (entry.byDate.get(day) || 0) + n(r.sessions));
  }

  // Count leads by source (maps to site_key)
  const leadsBySite = new Map<string, number>();
  for (const l of leadRows) {
    const src = l.source || "";
    leadsBySite.set(src, (leadsBySite.get(src) || 0) + 1);
  }

  // Build 7-day sparkline arrays
  const today = Date.now();
  const result: EstateSiteRow[] = [];
  for (const [siteKey, data] of funnelBySite) {
    const sessions_7d: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today - i * 86400_000).toISOString().slice(0, 10);
      sessions_7d.push(data.byDate.get(day) || 0);
    }
    const leads = leadsBySite.get(siteKey) || 0;
    result.push({
      site_key: siteKey,
      sessions: data.sessions,
      human_sessions: data.human_sessions,
      leads,
      conversion_rate: rate(leads, data.sessions),
      sessions_7d,
    });
  }

  return result.sort((a, b) => a.site_key.localeCompare(b.site_key));
}

/**
 * Estate-level funnel totals across all sites for a given period.
 *
 * @param days - lookback window (default 28)
 */
export async function getEstateFunnel(days = 28): Promise<EstateFunnel> {
  const since = new Date(Date.now() - days * 86400_000).toISOString().slice(0, 10);

  const rows = await rest<RawFunnelDay>("vw_web_funnel_daily_v2", {
    select:
      "sessions,engaged_sessions,calc_sessions,form_cta_sessions,form_start_sessions,converted_sessions",
    date: `gte.${since}`,
    limit: "10000",
  });

  return rows.reduce(
    (acc, r) => ({
      sessions: acc.sessions + n(r.sessions),
      engaged_sessions: acc.engaged_sessions + n(r.engaged_sessions),
      calc_sessions: acc.calc_sessions + n(r.calc_sessions),
      form_cta_sessions: acc.form_cta_sessions + n(r.form_cta_sessions),
      form_start_sessions: acc.form_start_sessions + n(r.form_start_sessions),
      converted_sessions: acc.converted_sessions + n(r.converted_sessions),
    }),
    {
      sessions: 0,
      engaged_sessions: 0,
      calc_sessions: 0,
      form_cta_sessions: 0,
      form_start_sessions: 0,
      converted_sessions: 0,
    },
  );
}

/**
 * Best-converting channel per site, plus estate totals.
 *
 * Reads vw_channel_conversion_geo without a country filter, groups by
 * site_key + channel.
 *
 * @param days - not filterable at the view level (view is lifetime aggregate);
 *   parameter retained for API consistency but not applied to the query.
 */
export async function getEstateChannels(_days = 28): Promise<EstateChannelRow[]> {
  const rows = await rest<RawChannel>("vw_channel_conversion_geo", {
    select: "site_key,channel,sessions,leads",
    order: "site_key.asc,sessions.desc",
    limit: "5000",
  });

  // Group by site_key + channel (summing across referrer_host and country splits)
  const map = new Map<string, { sessions: number; leads: number }>();
  for (const r of rows) {
    const k = `${r.site_key}|${r.channel}`;
    const cur = map.get(k) || { sessions: 0, leads: 0 };
    cur.sessions += n(r.sessions);
    cur.leads += n(r.leads);
    map.set(k, cur);
  }

  const result: EstateChannelRow[] = [];
  for (const [k, v] of map) {
    const [siteKey, channel] = k.split("|");
    result.push({
      site_key: siteKey,
      channel,
      sessions: v.sessions,
      leads: v.leads,
      conversion_rate: rate(v.leads, v.sessions),
    });
  }

  return result.sort((a, b) =>
    a.site_key.localeCompare(b.site_key) || b.sessions - a.sessions,
  );
}

/**
 * Error summary across all sites (top errors per site by count).
 *
 * Reads vw_client_errors without a site_key filter.
 */
export async function getEstateErrors(): Promise<EstateErrorRow[]> {
  const rows = await rest<RawError>("vw_client_errors", {
    select: "site_key,message,kind,count,sessions,last_seen",
    order: "site_key.asc,count.desc",
    limit: "1000",
  });

  // Aggregate by site_key
  const map = new Map<
    string,
    { total_errors: number; total_sessions: number; example_message: string | null; last_seen: string | null }
  >();

  for (const r of rows) {
    const k = r.site_key;
    if (!map.has(k)) {
      map.set(k, {
        total_errors: 0,
        total_sessions: 0,
        example_message: r.message ?? null,
        last_seen: r.last_seen ?? null,
      });
    }
    const entry = map.get(k)!;
    entry.total_errors += n(r.count);
    entry.total_sessions += n(r.sessions);
    // Keep the most recent last_seen
    if (r.last_seen && (!entry.last_seen || r.last_seen > entry.last_seen)) {
      entry.last_seen = r.last_seen;
    }
  }

  return Array.from(map.entries())
    .map(([site_key, v]) => ({ site_key, ...v }))
    .sort((a, b) => b.total_errors - a.total_errors);
}

/**
 * Web-vitals summary per site.
 *
 * Reads vw_web_vitals_summary (or falls back gracefully if the view is not
 * present). Groups by site_key + metric.
 *
 * NOTE: if vw_web_vitals_summary does not exist in the schema, this returns []
 * gracefully (the rest() helper returns [] on non-ok responses).
 */
export async function getEstateVitals(): Promise<EstateVitalsRow[]> {
  const rows = await rest<RawVitals>("vw_web_vitals_summary", {
    select: "site_key,metric,value,rating",
    order: "site_key.asc,metric.asc",
    limit: "5000",
  });

  // Aggregate by site_key + metric
  const map = new Map<
    string,
    { sum: number; count: number; poor: number; good: number }
  >();

  for (const r of rows) {
    const k = `${r.site_key}|${r.metric}`;
    const cur = map.get(k) || { sum: 0, count: 0, poor: 0, good: 0 };
    cur.sum += n(r.value);
    cur.count += 1;
    if (r.rating === "poor") cur.poor += 1;
    if (r.rating === "good") cur.good += 1;
    map.set(k, cur);
  }

  return Array.from(map.entries())
    .map(([k, v]) => {
      const [site_key, metric] = k.split("|");
      return {
        site_key,
        metric,
        avg_value: v.count > 0 ? v.sum / v.count : 0,
        poor_count: v.poor,
        good_count: v.good,
        total: v.count,
      };
    })
    .sort((a, b) => a.site_key.localeCompare(b.site_key) || a.metric.localeCompare(b.metric));
}

/**
 * Latest leads across all sites, tagged with their source (site_key).
 *
 * @param limit - max rows to return (default 50)
 */
export async function getEstateLatestLeads(limit = 50): Promise<EstateLeadRow[]> {
  const rows = await rest<RawLead>("leads", {
    select: "id,source,full_name,email,phone,role,message,created_at",
    order: "created_at.desc",
    limit: String(limit),
  });

  return rows.map((r) => ({
    id: r.id,
    site_key: r.source || "unknown",
    full_name: r.full_name ?? null,
    email: r.email ?? null,
    phone: r.phone ?? null,
    role: r.role ?? null,
    source: r.source ?? null,
    message: r.message ?? null,
    created_at: r.created_at,
  }));
}

/**
 * Top tool per site by computed-to-lead rate.
 *
 * Reads vw_calculator_conversion_geo without a site_key filter. Returns the
 * top-performing tool for each site (by lead_sessions desc, then slug asc).
 */
export async function getEstateTopTools(): Promise<EstateTopTool[]> {
  const rows = await rest<RawCalcConversion>("vw_calculator_conversion_geo", {
    select: "site_key,calculator_slug,viewed,computed,lead_sessions",
    order: "site_key.asc,lead_sessions.desc",
    limit: "2000",
  });

  // Aggregate by site_key + calculator_slug (to collapse country splits)
  const map = new Map<string, { viewed: number; computed: number; lead_sessions: number }>();
  for (const r of rows) {
    const k = `${r.site_key}|${r.calculator_slug}`;
    const cur = map.get(k) || { viewed: 0, computed: 0, lead_sessions: 0 };
    cur.viewed += n(r.viewed);
    cur.computed += n(r.computed);
    cur.lead_sessions += n(r.lead_sessions);
    map.set(k, cur);
  }

  // Best tool per site
  const best = new Map<string, EstateTopTool>();
  for (const [k, v] of map) {
    const [siteKey, slug] = k.split("|");
    const existing = best.get(siteKey);
    const candidate: EstateTopTool = {
      site_key: siteKey,
      calculator_slug: slug,
      viewed: v.viewed,
      computed: v.computed,
      lead_sessions: v.lead_sessions,
      computed_to_lead_rate: rate(v.lead_sessions, v.computed),
    };
    if (!existing || v.lead_sessions > existing.lead_sessions) {
      best.set(siteKey, candidate);
    }
  }

  return Array.from(best.values()).sort((a, b) =>
    a.site_key.localeCompare(b.site_key),
  );
}

/**
 * Estate-wide humans-first KPIs over [fromISO, toISO): one row per site from
 * the estate_kpis() RPC (p_site_key omitted = all sites). The home strip sums
 * these for the "Last 7 days" and "All time" card rows. Re-uses SiteKpis.
 */
export async function getEstateKpis(
  fromISO: string,
  toISO: string,
  country = "GB",
): Promise<SiteKpis[]> {
  return rest<SiteKpis>("rpc/estate_kpis", { p_from: fromISO, p_to: toISO, p_country: country });
}

/**
 * Estate-wide bucketed series (all sites) for the home-page charts, via the
 * estate_timeseries() RPC. sessions/humans scoped to country (default GB),
 * leads all-countries. events is 0-filled so the result is a plain TimePoint[].
 */
export async function getEstateTimeseries(
  bucket: "15 minutes" | "1 hour" | "1 day",
  fromISO: string,
  toISO: string,
  country = "GB",
): Promise<TimePoint[]> {
  const rows = await rest<Omit<TimePoint, "events">>("rpc/estate_timeseries", {
    p_bucket: bucket,
    p_from: fromISO,
    p_to: toISO,
    p_country: country,
  });
  return rows.map((r) => ({ ...r, events: 0 }));
}
