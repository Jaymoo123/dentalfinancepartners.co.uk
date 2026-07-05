/**
 * Server-only data access for the shared operator console.
 *
 * Every function is parameterised by siteKey — no site literal anywhere here.
 * Reads via Supabase REST using the SERVICE ROLE key (server-only, never client).
 * NEVER import this into a client component.
 *
 * GAP-3: lifted from Property/web/src/lib/analytics/server/adminData.ts and
 * generalised. Property keeps its own copy until adoption is separately approved.
 */

import { unstable_cache } from "next/cache";
import { t0Variant } from "../lead-nurture/t0";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/** Default cache TTL for console reads (seconds). Admin-only data refreshed
 * manually, so a short shared window turns repeat loads / tab-switches into
 * ~zero DB work without any meaningful staleness. Tune per-call where needed. */
const DEFAULT_TTL = 60;

/**
 * Strict fetch: THROWS on missing env / non-OK response / parse failure. Used
 * inside unstable_cache so that failures are NEVER cached (a thrown rejection is
 * not memoised). This is the lesson from the 2026-06-30 outage: caching the
 * `[]`-on-error result poisoned the cache (empty data served for the whole TTL,
 * 1h for the sites/country lists) the moment a single read transiently failed.
 */
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
 * Cached Supabase REST read. The result is memoised in Next's Data Cache keyed
 * by (path, params) for `ttlSeconds`, so the heavy rollup views (each a full
 * Seq Scan of the growing web_events table) are recomputed at most once per
 * window per distinct query no matter how often an operator refreshes or
 * switches tabs. Works under `force-dynamic` (it is a separate cache layer).
 *
 * Only SUCCESSFUL responses are cached: the cached callback throws on failure so
 * unstable_cache never stores an error/empty result; the caller then falls back
 * to a single uncached read for that request and the next request retries fresh.
 * Pass ttlSeconds=0 to bypass the cache (paginated / per-visitor drill-downs
 * that must stay fresh, or large per-event payloads we don't want to retain).
 */
function rest<T>(
  path: string,
  params: Record<string, string>,
  ttlSeconds: number = DEFAULT_TTL,
): Promise<T[]> {
  if (ttlSeconds <= 0) return restUncached<T>(path, params);
  // unstable_cache also throws ("incrementalCache missing") outside a Next
  // request/render scope (unit tests, scripts); the try/catch handles that too.
  // Key namespace "v2" deliberately abandons any v1 entries poisoned during the
  // 2026-06-30 outage.
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

function withCountry(
  params: Record<string, string>,
  country?: string,
): Record<string, string> {
  if (country && country !== "ALL") params.country = `eq.${country}`;
  return params;
}

function aggregateRows<T extends Record<string, unknown>>(
  rows: T[],
  keyOf: (r: T) => string,
  sumFields: (keyof T)[],
  finalize: (summed: T) => T,
): T[] {
  const map = new Map<string, T>();
  for (const r of rows) {
    const k = keyOf(r);
    const cur = map.get(k);
    if (!cur) {
      map.set(k, { ...r });
    } else {
      const acc = cur as Record<string, unknown>;
      for (const f of sumFields) {
        const key = f as string;
        acc[key] = (Number(acc[key]) || 0) + (Number((r as Record<string, unknown>)[key]) || 0);
      }
    }
  }
  return Array.from(map.values()).map(finalize);
}

const n = (v: unknown): number => Number(v) || 0;
const rate = (num: number, den: number): number | null =>
  den > 0 ? num / den : null;

// ── Types ──────────────────────────────────────────────────────────────────

export type FunnelDay = {
  date: string;
  country: string;
  sessions: number;
  engaged_sessions: number;
  calc_sessions: number;
  form_cta_sessions: number;
  form_start_sessions: number;
  converted_sessions: number;
};

export type CalculatorConversion = {
  calculator_slug: string;
  viewed: number;
  computed: number;
  result_viewed: number;
  embed_cta_clicks: number;
  lead_sessions: number;
  compute_rate: number | null;
  computed_to_lead_rate: number | null;
};

export type CalculatorConversionPlacement = {
  calculator_slug: string;
  placement: string;
  tool_kind: string;
  viewed: number;
  computed: number;
  result_viewed: number;
  lead_sessions: number;
  compute_rate: number | null;
  computed_to_lead_rate: number | null;
};

export type ResourceConversion = {
  topic: string;
  placement: string;
  gate_views: number;
  unlocks: number;
  lead_sessions: number;
  view_to_unlock_rate: number | null;
  unlock_to_lead_rate: number | null;
};

export type VisitorJourney = {
  visitor_id: string;
  first_seen: string;
  last_seen: string;
  total_sessions: number;
  total_events: number;
  total_engaged_ms: number;
  max_scroll_pct: number;
  converted: boolean;
  lead_id: string | null;
  device_type: string | null;
  os_family: string | null;
  country: string | null;
  referrer_host: string | null;
  utm_source: string | null;
  page_views: number;
  cta_clicks: number;
  entry_paths: string[] | null;
};

export type VisitorEvent = {
  ts: string;
  session_id: string;
  event_name: string;
  page_path: string | null;
  props: Record<string, unknown>;
};

export type LeadInfo = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  source: string | null;
  message: string | null;
  created_at: string;
  visitor_id: string | null;
  session_id: string | null;
};

export type FormFieldDropoff = {
  form_id: string;
  field: string;
  focuses: number;
  abandons: number;
  errors: number;
  abandon_rate: number | null;
};

export type CtaPerformance = {
  cta_id: string;
  goal: string | null;
  clicks: number;
  click_sessions: number;
  form_start_sessions: number;
  lead_sessions: number;
  click_to_form_rate: number | null;
};

export type SectionEngagement = {
  page_path: string;
  section_id: string;
  section_text: string | null;
  views: number;
  sessions: number;
};

export type SectionAction = {
  page_path: string;
  section_id: string;
  section_text: string | null;
  read_sessions: number;
  acted_sessions: number;
  converted_sessions: number;
};

export type ClientError = {
  message: string;
  source: string | null;
  line: string | null;
  kind: string;
  count: number;
  sessions: number;
  example_page: string | null;
  last_seen: string;
};

export type UxFriction = {
  page_path: string;
  rage_clicks: number;
  dead_clicks: number;
  client_errors: number;
  exit_intent_shown: number;
  friction_sessions: number;
};

export type ChannelConversion = {
  channel: string;
  referrer_host: string;
  sessions: number;
  leads: number;
  conversion_rate: number | null;
};

export type VisitsBucket = {
  visits_bucket: number;
  visitors: number;
  converted_visitors: number;
};

export type TimePoint = {
  bucket: string;
  sessions: number;
  humans: number;
  events: number;
  leads: number;
};

export type DailyPoint = { bucket: string; count: number; sessions: number };

export type LeadIntent = {
  intent_category: string;
  leads: number;
  avg_quality: number | null;
  high_value: number;
};

export type SubscriberHealth = { status: string; subscribers: number };

export type NurtureStepRow = {
  sequence: string;
  step: number;
  sent: number;
  opened: number;
  clicked: number;
  bounced: number;
};

export type ExperimentResult = {
  exp: string;
  sessions: number;
  cta_clicks: number;
  form_starts: number;
  converted_sessions: number;
  conversion_rate: number | null;
};

export type PersonalizationResult = {
  rule_id: string;
  surface: string;
  topic: string;
  variant: string;
  shown: number;
  clicked: number;
  dismissed: number;
  shown_sessions: number;
  converted_sessions: number;
  click_rate: number | null;
  shown_to_lead_rate: number | null;
};

// ── Query functions ───────────────────────────────────────────────────────

const LEAD_COLS =
  "id,full_name,email,phone,role,source,message,created_at,visitor_id,session_id";

export function getFunnelDaily(siteKey: string, country?: string) {
  return rest<FunnelDay>(
    "vw_web_funnel_daily_v2",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "date.desc", limit: "2000" },
      country,
    ),
  );
}

export async function getCalculatorConversion(siteKey: string, country?: string) {
  const rows = await rest<CalculatorConversion & { country: string }>(
    "vw_calculator_conversion_geo",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "computed.desc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<CalculatorConversion & { country: string }>(
    rows,
    (r) => r.calculator_slug,
    ["viewed", "computed", "result_viewed", "embed_cta_clicks", "lead_sessions"],
    (r) => ({
      ...r,
      compute_rate: rate(n(r.computed), n(r.viewed)),
      computed_to_lead_rate: rate(n(r.lead_sessions), n(r.computed)),
    }),
  );
}

export async function getCalculatorConversionByPlacement(siteKey: string, country?: string) {
  const rows = await rest<CalculatorConversionPlacement & { country: string }>(
    "vw_calculator_conversion_placement_geo",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "viewed.desc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<CalculatorConversionPlacement & { country: string }>(
    rows,
    (r) => `${r.calculator_slug}|${r.placement}|${r.tool_kind}`,
    ["viewed", "computed", "result_viewed", "lead_sessions"],
    (r) => ({
      ...r,
      compute_rate: rate(n(r.computed), n(r.viewed)),
      computed_to_lead_rate: rate(n(r.lead_sessions), n(r.computed)),
    }),
  );
}

export function getResourceConversion(siteKey: string) {
  return rest<ResourceConversion>("vw_resource_conversion", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "gate_views.desc",
    limit: "100",
  });
}

/** TTL for the Visitors table read. Shorter than DEFAULT_TTL because the "Last
 * seen" column is a live-recency signal an operator watches — a 60s window made
 * it feel laggy / needed a manual refresh. ~20s keeps it near-live while still
 * collapsing rapid repeat loads. (The client also ticks the relative label every
 * 30s; this controls how fresh the underlying timestamp is on a navigation.) */
const VISITORS_TTL = 20;

export function getTopVisitors(siteKey: string, limit = 500, country?: string) {
  return rest<VisitorJourney>(
    "vw_visitor_journey",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "last_seen.desc", limit: String(limit) },
      country,
    ),
    VISITORS_TTL,
  );
}

export function getVisitorJourney(siteKey: string, visitorId: string) {
  return rest<VisitorJourney>("vw_visitor_journey", {
    site_key: `eq.${siteKey}`,
    visitor_id: `eq.${visitorId}`,
    select: "*",
    limit: "1",
  }).then((rows) => rows[0] ?? null);
}

export function getVisitorEvents(siteKey: string, visitorId: string) {
  // Per-visitor drill-down: keep fresh (ttl 0) and uncached — large per-event
  // props payloads we don't want to retain in the Data Cache.
  return rest<VisitorEvent>("web_events", {
    site_key: `eq.${siteKey}`,
    visitor_id: `eq.${visitorId}`,
    is_bot: "eq.false",
    select: "ts,session_id,event_name,page_path,props",
    order: "ts.asc",
    limit: "2000",
  }, 0);
}

export function getLeadsForSite(siteKey: string, limit = 200) {
  return rest<LeadInfo>("leads", {
    source: `eq.${siteKey}`,
    select: LEAD_COLS,
    order: "created_at.desc",
    limit: String(limit),
  });
}

export function getLeadForVisitor(siteKey: string, visitorId: string) {
  return rest<LeadInfo>("leads", {
    source: `eq.${siteKey}`,
    visitor_id: `eq.${visitorId}`,
    select: LEAD_COLS,
    order: "created_at.desc",
    limit: "1",
  }).then((rows) => rows[0] ?? null);
}

export interface FormLeadCount {
  form_id: string;
  lead_sessions: number;
  lead_events: number;
  form_start_sessions: number;
}

/**
 * Leads + form-starts captured through a single capture surface, by its formId
 * (from vw_form_lead_counts). Durable and formId-based, so a surface that has
 * stopped being an A/B experiment (e.g. the result gate, form_id
 * 'calc_result_gate') can still be tracked. Returns null if it has no events yet.
 */
export async function getResultGateLeads(siteKey: string): Promise<FormLeadCount | null> {
  const rows = await rest<FormLeadCount>("vw_form_lead_counts", {
    site_key: `eq.${siteKey}`,
    form_id: "eq.calc_result_gate",
    select: "form_id,lead_sessions,lead_events,form_start_sessions",
    limit: "1",
  });
  return rows[0] ?? null;
}

export function getLeadsPage(siteKey: string, offset: number, limit: number) {
  // Paginated ledger: keep fresh (ttl 0) so paging never serves a stale page.
  return rest<LeadInfo>("leads", {
    source: `eq.${siteKey}`,
    select: LEAD_COLS,
    order: "created_at.desc",
    offset: String(offset),
    limit: String(limit),
  }, 0);
}

export async function getCountryOptions(siteKey: string): Promise<string[]> {
  // Distinct countries for the filter dropdown. Read straight from web_sessions
  // (≈11k rows, indexed by site_key) instead of re-aggregating vw_visitor_journey
  // — the old source did a full Seq Scan of the entire web_events table (~115 ms)
  // purely to populate a rarely-changing dropdown, AND that same heavy view is
  // already computed by getTopVisitors on the same page load. Cached for an hour:
  // the set of countries a site has ever seen changes very slowly.
  const rows = await rest<{ country: string | null }>(
    "web_sessions",
    {
      site_key: `eq.${siteKey}`,
      is_bot: "eq.false",
      human_confirmed: "eq.true",
      country: "not.is.null",
      select: "country",
    },
    3600,
  );
  return Array.from(
    new Set(rows.map((r) => r.country).filter((c): c is string => !!c)),
  ).sort();
}

export async function getFormFieldDropoff(siteKey: string, country?: string) {
  const rows = await rest<FormFieldDropoff & { country: string }>(
    "vw_form_field_dropoff_geo",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "abandons.desc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<FormFieldDropoff & { country: string }>(
    rows,
    (r) => `${r.form_id}|${r.field}`,
    ["focuses", "abandons", "errors"],
    (r) => ({ ...r, abandon_rate: rate(n(r.abandons), n(r.focuses)) }),
  ).sort((a, b) => b.abandons - a.abandons);
}

export async function getCtaPerformance(siteKey: string, country?: string) {
  const rows = await rest<CtaPerformance & { country: string }>(
    "vw_cta_performance",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "clicks.desc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<CtaPerformance & { country: string }>(
    rows,
    (r) => r.cta_id,
    ["clicks", "click_sessions", "form_start_sessions", "lead_sessions"],
    (r) => ({
      ...r,
      click_to_form_rate: rate(n(r.form_start_sessions), n(r.click_sessions)),
    }),
  ).sort((a, b) => b.clicks - a.clicks);
}

export async function getSectionActions(siteKey: string, country?: string) {
  const rows = await rest<SectionAction & { country: string }>(
    "vw_section_action",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "read_sessions.desc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<SectionAction & { country: string }>(
    rows,
    (r) => `${r.page_path}|${r.section_id}`,
    ["read_sessions", "acted_sessions", "converted_sessions"],
    (r) => r,
  ).sort((a, b) => b.read_sessions - a.read_sessions);
}

export async function getUxFriction(siteKey: string, country?: string) {
  const rows = await rest<UxFriction & { country: string }>(
    "vw_ux_friction",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "rage_clicks.desc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<UxFriction & { country: string }>(
    rows,
    (r) => r.page_path,
    ["rage_clicks", "dead_clicks", "client_errors", "exit_intent_shown", "friction_sessions"],
    (r) => r,
  ).sort(
    (a, b) =>
      b.rage_clicks + b.dead_clicks + b.client_errors -
      (a.rage_clicks + a.dead_clicks + a.client_errors),
  );
}

export async function getClientErrors(siteKey: string, country?: string) {
  const rows = await rest<ClientError & { country: string }>(
    "vw_client_errors",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "count.desc", limit: "500" },
      country,
    ),
  );
  return aggregateRows<ClientError & { country: string }>(
    rows,
    (r) => `${r.message}|${r.source}|${r.line}|${r.kind}`,
    ["count", "sessions"],
    (r) => r,
  ).sort((a, b) => b.count - a.count);
}

export async function getChannelConversion(siteKey: string, country?: string) {
  const rows = await rest<ChannelConversion & { country: string }>(
    "vw_channel_conversion_geo",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "sessions.desc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<ChannelConversion & { country: string }>(
    rows,
    (r) => `${r.channel}|${r.referrer_host}`,
    ["sessions", "leads"],
    (r) => ({ ...r, conversion_rate: rate(n(r.leads), n(r.sessions)) }),
  ).sort((a, b) => b.sessions - a.sessions);
}

export async function getVisitsToConversion(siteKey: string, country?: string) {
  const rows = await rest<VisitsBucket & { country: string }>(
    "vw_visits_to_conversion",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "visits_bucket.asc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<VisitsBucket & { country: string }>(
    rows,
    (r) => String(r.visits_bucket),
    ["visitors", "converted_visitors"],
    (r) => r,
  ).sort((a, b) => a.visits_bucket - b.visits_bucket);
}

export function getTimeseries(
  siteKey: string,
  bucket: "15 minutes" | "1 hour" | "1 day",
  fromISO: string,
  toISO: string,
  country?: string,
) {
  const params: Record<string, string> = {
    p_site_key: siteKey,
    p_bucket: bucket,
    p_from: fromISO,
    p_to: toISO,
  };
  if (country && country !== "ALL") params.p_country = country;
  return rest<TimePoint>("rpc/web_timeseries", params);
}

/** Humans-first KPI row from the estate_kpis() RPC (one site, one window). */
export type SiteKpis = {
  site_key: string;
  sessions: number;
  humans: number;
  new_humans: number;
  converted_humans: number;
  leads_all: number;
  leads_uk: number;
};

/**
 * Per-site humans-first KPIs over [fromISO, toISO) via estate_kpis().
 * Returns a zero-filled row when the site has no activity in the window.
 */
export async function getSiteKpis(
  siteKey: string,
  fromISO: string,
  toISO: string,
  country?: string,
): Promise<SiteKpis> {
  const params: Record<string, string> = {
    p_from: fromISO,
    p_to: toISO,
    p_site_key: siteKey,
  };
  if (country) params.p_country = country;
  const rows = await rest<SiteKpis>("rpc/estate_kpis", params);
  return (
    rows[0] ?? {
      site_key: siteKey,
      sessions: 0,
      humans: 0,
      new_humans: 0,
      converted_humans: 0,
      leads_all: 0,
      leads_uk: 0,
    }
  );
}

export function getEventDaily(
  siteKey: string,
  eventName: string,
  fromISO: string,
  toISO: string,
  country?: string,
) {
  const params: Record<string, string> = {
    p_site_key: siteKey,
    p_event_name: eventName,
    p_from: fromISO,
    p_to: toISO,
  };
  if (country && country !== "ALL") params.p_country = country;
  return rest<DailyPoint>("rpc/web_event_daily", params);
}

export async function getLeadIntentMix(siteKey: string): Promise<LeadIntent[]> {
  const rows = await rest<LeadIntent>("vw_lead_intent_mix", {
    site_key: `eq.${siteKey}`,
    select: "intent_category,leads,avg_quality,high_value",
    order: "leads.desc",
    limit: "100",
  });
  return rows.map((r) => ({
    intent_category: r.intent_category,
    leads: n(r.leads),
    avg_quality: r.avg_quality == null ? null : Number(r.avg_quality),
    high_value: n(r.high_value),
  }));
}

export async function getSubscriberHealth(siteKey: string): Promise<SubscriberHealth[]> {
  const rows = await rest<SubscriberHealth>("vw_subscriber_health", {
    site_key: `eq.${siteKey}`,
    select: "status,subscribers",
    limit: "20",
  });
  return rows.map((r) => ({ status: r.status, subscribers: n(r.subscribers) }));
}

export async function getNurtureFunnel(siteKey: string): Promise<NurtureStepRow[]> {
  const rows = await rest<NurtureStepRow>("vw_nurture_step_funnel", {
    site_key: `eq.${siteKey}`,
    select: "sequence,step,sent,opened,clicked,bounced",
    order: "step.asc",
    limit: "100",
  });
  return rows.map((r) => ({
    sequence: r.sequence,
    step: n(r.step),
    sent: n(r.sent),
    opened: n(r.opened),
    clicked: n(r.clicked),
    bounced: n(r.bounced),
  }));
}

export function getExperimentResults(siteKey: string) {
  return rest<ExperimentResult>("vw_experiment_results", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "sessions.desc",
    limit: "100",
  });
}

// ── Experiment arm + funnel types ─────────────────────────────────────────

export type ExperimentArm = {
  sessions: number;
  cta_clicks: number;
  form_starts: number;
  converted_sessions: number;
  conversion_rate: number | null;
};

export type ExperimentArms = {
  control: ExperimentArm | null;
  treatment: ExperimentArm | null;
};

export type ExperimentFunnelArm = {
  /** Distinct sessions that saw the experiment surface (the denominator). */
  exposed: number;
  /** Distinct sessions that took the building-block step (the numerator). */
  acted: number;
  /** Of acted, how many captured a phone number (lead_form_length guardrail). */
  acted_with_phone: number;
  /** Of exposed, how many became a lead (secondary outcome). */
  converted: number;
};

export type ExperimentFunnelArms = {
  control: ExperimentFunnelArm | null;
  treatment: ExperimentFunnelArm | null;
};

/**
 * Pure grouping function: parses ExperimentResult rows into a per-key arms map.
 * Exported for testing. Not siteKey-parameterised -- it only groups given rows.
 */
export function parseExperimentArms(rows: ExperimentResult[]): Record<string, ExperimentArms> {
  const out: Record<string, ExperimentArms> = {};
  for (const r of rows) {
    const idx = r.exp.indexOf(":");
    if (idx < 0) continue;
    const key = r.exp.slice(0, idx);
    const variant = r.exp.slice(idx + 1);
    if (!out[key]) out[key] = { control: null, treatment: null };
    const arm: ExperimentArm = {
      sessions: r.sessions,
      cta_clicks: r.cta_clicks,
      form_starts: r.form_starts,
      converted_sessions: r.converted_sessions,
      conversion_rate: r.conversion_rate,
    };
    if (variant === "control") out[key].control = arm;
    else if (variant === "treatment") out[key].treatment = arm;
  }
  return out;
}

/**
 * All experiments grouped by key into control/treatment arms. Reads
 * vw_experiment_results (one row per `key:variant`) and restructures into a
 * map keyed by experiment id. Site-agnostic: any site that records exp stamps
 * on web_events surfaces here automatically.
 */
export async function getExperimentArms(
  siteKey: string,
): Promise<Record<string, ExperimentArms>> {
  const rows = await getExperimentResults(siteKey);
  return parseExperimentArms(rows);
}

/** Raw row type from vw_experiment_funnel (exported for tests). */
export type ExperimentFunnelRow = {
  exp: string;
  exposed_sessions: number;
  acted_sessions: number;
  acted_with_phone_sessions: number;
  converted_sessions: number;
};

/**
 * Pure grouping function: parses funnel rows into a per-key arms map.
 * Exported for testing.
 */
export function parseExperimentFunnel(rows: ExperimentFunnelRow[]): Record<string, ExperimentFunnelArms> {
  const out: Record<string, ExperimentFunnelArms> = {};
  for (const r of rows) {
    const idx = r.exp.indexOf(":");
    if (idx < 0) continue;
    const key = r.exp.slice(0, idx);
    const variant = r.exp.slice(idx + 1);
    if (!out[key]) out[key] = { control: null, treatment: null };
    const arm: ExperimentFunnelArm = {
      exposed: n(r.exposed_sessions),
      acted: n(r.acted_sessions),
      acted_with_phone: n(r.acted_with_phone_sessions),
      converted: n(r.converted_sessions),
    };
    if (variant === "control") out[key].control = arm;
    else if (variant === "treatment") out[key].treatment = arm;
  }
  return out;
}

/**
 * Building-block funnel per experiment arm (vw_experiment_funnel): exposed ->
 * acted, scoped to the sessions that actually saw each surface, with conversion
 * as a secondary outcome. Grouped by key into control/treatment like
 * getExperimentArms. Experiments with no funnel rows return empty arms (the
 * card renders the not-enough-data state).
 */
export async function getExperimentFunnel(
  siteKey: string,
): Promise<Record<string, ExperimentFunnelArms>> {
  const rows = await rest<ExperimentFunnelRow>("vw_experiment_funnel", {
    site_key: `eq.${siteKey}`,
    select: "*",
    limit: "200",
  });
  return parseExperimentFunnel(rows);
}

export function getPersonalizationResults(siteKey: string) {
  return rest<PersonalizationResult>("vw_personalization_results", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "shown.desc",
    limit: "100",
  });
}

// ── Lead contactability (Property-scoped) ──────────────────────────────────

/**
 * Per-site contactability funnel row from vw_lead_contactability_funnel.
 * Submitted -> verified -> messaged -> responded -> contactable / forwarded / unreachable.
 */
export type ContactabilityFunnel = {
  site_key: string;
  submitted: number;
  verified: number;
  messaged: number;
  responded: number;
  contactable: number;
  forwarded: number;
  unreachable: number;
};

/**
 * One row in the lead ops list: core lead fields joined with verification
 * and nurture state. PII limited to name (already shown in the existing leads
 * view); no email/phone surfaced here.
 */
export type ContactabilityLeadRow = {
  id: string;
  full_name: string | null;
  created_at: string;
  status: string | null;
  phone_status: string | null;
  email_status: string | null;
  verify_pass: boolean | null;
  nurture_step: number | null;
  nurture_status: string | null;
  next_action_at: string | null;
  responded: boolean;
};

/**
 * Contactability funnel from vw_lead_contactability_funnel (site-keyed).
 *
 * Fails soft: returns null if the view is absent (migration not yet applied to
 * the connected DB) or if the site has no submitted leads yet. The rest()
 * helper returns [] on any non-OK response, so missing tables never throw.
 */
export async function getContactabilityFunnel(
  siteKey: string,
): Promise<ContactabilityFunnel | null> {
  const rows = await rest<ContactabilityFunnel>(
    "vw_lead_contactability_funnel",
    {
      site_key: `eq.${siteKey}`,
      select:
        "site_key,submitted,verified,messaged,responded,contactable,forwarded,unreachable",
      limit: "1",
    },
    60,
  );
  if (!rows.length) return null;
  const r = rows[0];
  return {
    site_key: r.site_key,
    submitted: n(r.submitted),
    verified: n(r.verified),
    messaged: n(r.messaged),
    responded: n(r.responded),
    contactable: n(r.contactable),
    forwarded: n(r.forwarded),
    unreachable: n(r.unreachable),
  };
}

/**
 * Recent leads ops list for the contactability console view.
 *
 * Fetches the last `limit` (default 25) leads for the site, then parallel-fetches
 * lead_verification, lead_nurture_state, and replied/confirmed/booked events.
 * All joined in memory. Fails soft on every query (missing tables return []).
 *
 * PII constraint: only name, created_at, and status identifiers are returned.
 * No email/phone crosses this boundary beyond the phone_status label (e.g. "mobile").
 */
export async function getContactabilityLeads(
  siteKey: string,
  limit = 25,
): Promise<ContactabilityLeadRow[]> {
  type RawLead = { id: string; full_name: string | null; created_at: string; status: string | null };
  const leadRows = await rest<RawLead>(
    "leads",
    {
      source: `eq.${siteKey}`,
      select: "id,full_name,created_at,status",
      order: "created_at.desc",
      limit: String(limit),
    },
    0,
  );
  if (!leadRows.length) return [];

  const ids = leadRows.map((r) => r.id);
  const idFilter = `in.(${ids.join(",")})`;
  const batchLimit = String(ids.length + 1);

  type RawVer = { lead_id: string; phone_status: string | null; email_status: string | null; verify_pass: boolean | null };
  type RawNurture = { lead_id: string; step: number | null; status: string | null; next_action_at: string | null };
  type RawEvent = { lead_id: string };

  const [verRows, nurtureRows, eventRows] = await Promise.all([
    rest<RawVer>("lead_verification", {
      lead_id: idFilter,
      select: "lead_id,phone_status,email_status,verify_pass",
      limit: batchLimit,
    }, 0),
    rest<RawNurture>("lead_nurture_state", {
      lead_id: idFilter,
      select: "lead_id,step,status,next_action_at",
      limit: String(ids.length * 2 + 1),
    }, 0),
    rest<RawEvent>("lead_contact_events", {
      lead_id: idFilter,
      event_type: "in.(replied,confirmed,booked)",
      select: "lead_id",
      limit: String(ids.length * 5 + 1),
    }, 0),
  ]);

  const verMap = new Map(verRows.map((r) => [r.lead_id, r]));
  const nurtureMap = new Map<string, RawNurture>();
  for (const r of nurtureRows) {
    // Take the first row per lead (primary sequence)
    if (!nurtureMap.has(r.lead_id)) nurtureMap.set(r.lead_id, r);
  }
  const respondedSet = new Set(eventRows.map((r) => r.lead_id));

  return leadRows.map((l) => {
    const ver = verMap.get(l.id);
    const nurture = nurtureMap.get(l.id);
    return {
      id: l.id,
      full_name: l.full_name ?? null,
      created_at: l.created_at,
      status: l.status ?? null,
      phone_status: ver?.phone_status ?? null,
      email_status: ver?.email_status ?? null,
      verify_pass: ver != null ? (ver.verify_pass ?? null) : null,
      nurture_step: nurture?.step ?? null,
      nurture_status: nurture?.status ?? null,
      next_action_at: nurture?.next_action_at ?? null,
      responded: respondedSet.has(l.id),
    };
  });
}

// ── Lead-nurture observability: types ────────────────────────────────────────

/**
 * Health summary from vw_lead_nurture_health (site-keyed, one row per site).
 * Fails soft: getNurtureHealth() returns null when the view is absent.
 */
export type NurtureHealth = {
  site_key: string;
  active_leads: number;
  stuck_leads: number;
  sends_24h: number;
  sent_24h: number;
  complaints_24h: number;
  complaints_7d: number;
  bounces_7d: number;
  optouts_7d: number;
  replies_24h: number;
  booked_24h: number;
  failed_24h: number;
  bounces_24h: number;
  /** Email engagement figures; populated once the Resend engagement webhook is configured. */
  opened24h: number;
  clicked24h: number;
  opened7d: number;
  clicked7d: number;
};

/**
 * Per-step throughput from vw_lead_nurture_step_health (site-keyed).
 * Fails soft: getNurtureStepHealth() returns [] when the view is absent.
 *
 * `sequence` distinguishes the two primary nurture flows
 * (property_contactability vs property_detail_capture); the live panel filters
 * to property_contactability, so this field is present but effectively constant
 * there until a detail-capture panel is added.
 */
export type NurtureStepHealth = {
  site_key: string;
  sequence: string;
  step: number;
  sent: number;
  failed: number;
  skipped: number;
};

/**
 * Overdue lead row from vw_lead_nurture_stuck (site-keyed).
 * Fails soft: getStuckLeads() returns [] when the view is absent.
 */
export type StuckLead = {
  lead_id: string;
  full_name: string | null;
  created_at: string;
  overdue_hours: number;
  step: number | null;
  /** Which nurture sequence the lead is stuck in; optional so older callers are unaffected. */
  sequence?: string;
};

/**
 * Failed send event joined with the lead's full_name in memory.
 * Fails soft: getFailedSends() returns [] when the table / column is absent.
 */
export type FailedSend = {
  id: string;
  lead_id: string;
  full_name: string | null;
  channel: string | null;
  step: number | null;
  reason: string | null;
  ts: string;
};

/**
 * Global nurture-send control state (id=1 row in lead_nurture_control).
 * getNurtureControl() returns a safe default when the table is absent.
 */
export type NurtureControl = {
  paused: boolean;
  paused_reason: string | null;
  paused_at: string | null;
  paused_by: string | null;
  last_alert_at: string | null;
  last_alert_key: string | null;
  /** ISO timestamp of the most recent hourly cron run (null = never run / unknown). */
  lastCronRunAt: string | null;
  /** ISO timestamp of the most recent daily digest run (null = never run / unknown). */
  lastDigestRunAt: string | null;
};

// ── Lead-nurture observability: fetchers ─────────────────────────────────────

/**
 * Overall send-health summary from vw_lead_nurture_health.
 *
 * Returns null when the view is absent (migration pending) or the site has no
 * nurture rows yet, so the panel degrades gracefully.
 */
export async function getNurtureHealth(
  siteKey: string,
): Promise<NurtureHealth | null> {
  // Raw row type: existing snake_case fields plus the new engagement columns from
  // the view. The camelCase fields on NurtureHealth are mapped explicitly below.
  type RawHealth = Omit<NurtureHealth, "opened24h" | "clicked24h" | "opened7d" | "clicked7d"> & {
    opened_24h: number;
    clicked_24h: number;
    opened_7d: number;
    clicked_7d: number;
  };
  const rows = await rest<RawHealth>(
    "vw_lead_nurture_health",
    {
      site_key: `eq.${siteKey}`,
      limit: "1",
    },
    60,
  );
  if (!rows.length) return null;
  const r = rows[0];
  return {
    site_key: r.site_key,
    active_leads: n(r.active_leads),
    stuck_leads: n(r.stuck_leads),
    sends_24h: n(r.sends_24h),
    sent_24h: n(r.sent_24h),
    complaints_24h: n(r.complaints_24h),
    complaints_7d: n(r.complaints_7d),
    bounces_7d: n(r.bounces_7d),
    optouts_7d: n(r.optouts_7d),
    replies_24h: n(r.replies_24h),
    booked_24h: n(r.booked_24h),
    failed_24h: n(r.failed_24h),
    bounces_24h: n(r.bounces_24h),
    opened24h: n(r.opened_24h),
    clicked24h: n(r.clicked_24h),
    opened7d: n(r.opened_7d),
    clicked7d: n(r.clicked_7d),
  };
}

/**
 * Per-step throughput from vw_lead_nurture_step_health.
 *
 * Returns [] when the view is absent (migration pending) or has no rows.
 */
export async function getNurtureStepHealth(
  siteKey: string,
): Promise<NurtureStepHealth[]> {
  // The view now carries a `sequence` dimension (property_contactability vs
  // property_detail_capture). Filter to the contactability sequence so this LIVE
  // panel stays byte-for-byte identical to its single-sequence behaviour; a
  // dedicated detail-capture panel can drop the filter (or query the other
  // sequence) later. select/order include `sequence` for that future use.
  return rest<NurtureStepHealth>(
    "vw_lead_nurture_step_health",
    {
      site_key: `eq.${siteKey}`,
      sequence: "eq.property_contactability",
      select: "site_key,sequence,step,sent,failed,skipped",
      order: "sequence.asc,step.asc",
    },
    60,
  );
}

/**
 * Overdue leads from vw_lead_nurture_stuck.
 *
 * TTL=0: must stay fresh for actionable ops decisions.
 * Returns [] when the view is absent (migration pending) or no stuck leads.
 */
export async function getStuckLeads(
  siteKey: string,
): Promise<StuckLead[]> {
  // `sequence` is included so the UI can (optionally) show which flow a lead is
  // stuck in; it is backward-compatible (StuckLead.sequence is optional, so the
  // existing accordion that ignores it is unaffected).
  return rest<StuckLead>(
    "vw_lead_nurture_stuck",
    {
      site_key: `eq.${siteKey}`,
      select: "lead_id,full_name,created_at,overdue_hours,step,sequence",
      order: "overdue_hours.desc",
    },
    0,
  );
}

/**
 * Last 25 send_failed events for this site, joined with lead full_name
 * in memory (mirrors the getContactabilityLeads join pattern).
 *
 * Reads lead_contact_events (no site column at table level), then parallel-fetches
 * lead rows to resolve full_name and filter by source = siteKey. Fetches 100
 * events before filtering so cross-site events do not exhaust the 25-row target.
 *
 * TTL=0: always fresh (operational alert view).
 * Returns [] when the table / ts column is absent (migration pending) or on any error.
 */
export async function getFailedSends(
  siteKey: string,
): Promise<FailedSend[]> {
  type RawEvent = {
    id: string;
    lead_id: string;
    channel: string | null;
    meta: Record<string, unknown> | null;
    ts: string;
  };
  const events = await rest<RawEvent>(
    "lead_contact_events",
    {
      event_type: "eq.send_failed",
      select: "id,lead_id,channel,meta,ts",
      order: "ts.desc",
      limit: "100",
    },
    0,
  );
  if (!events.length) return [];

  const ids = [...new Set(events.map((e) => e.lead_id))];
  type RawLead = { id: string; full_name: string | null; source: string };
  const leadRows = await restUncached<RawLead>("leads", {
    id: `in.(${ids.join(",")})`,
    select: "id,full_name,source",
    limit: String(ids.length + 1),
  });
  const leadMap = new Map(leadRows.map((l) => [l.id, l]));

  const out: FailedSend[] = [];
  for (const e of events) {
    const lead = leadMap.get(e.lead_id);
    if (!lead || lead.source !== siteKey) continue;
    const meta = e.meta ?? {};
    out.push({
      id: e.id,
      lead_id: e.lead_id,
      full_name: lead.full_name ?? null,
      channel: e.channel ?? null,
      step:
        typeof meta["step"] === "number" ? (meta["step"] as number) : null,
      reason:
        typeof meta["kind"] === "string"
          ? (meta["kind"] as string)
          : typeof meta["reason"] === "string"
          ? (meta["reason"] as string)
          : null,
      ts: e.ts,
    });
    if (out.length >= 25) break;
  }
  return out;
}

const DEFAULT_NURTURE_CONTROL: NurtureControl = {
  paused: false,
  paused_reason: null,
  paused_at: null,
  paused_by: null,
  last_alert_at: null,
  last_alert_key: null,
  lastCronRunAt: null,
  lastDigestRunAt: null,
};

/**
 * Global nurture-send control row (id=1).
 *
 * TTL=0: must reflect pause/resume immediately after a write.
 * Returns a safe default ({paused:false}) when the table is absent (migration
 * pending), so the console always renders a Resume/Pause button.
 */
export async function getNurtureControl(): Promise<NurtureControl> {
  type RawControl = {
    paused: boolean;
    paused_reason: string | null;
    paused_at: string | null;
    paused_by: string | null;
    last_alert_at: string | null;
    last_alert_key: string | null;
    last_cron_run_at: string | null;
    last_digest_run_at: string | null;
  };
  const rows = await rest<RawControl>(
    "lead_nurture_control",
    {
      id: "eq.1",
      select: "paused,paused_reason,paused_at,paused_by,last_alert_at,last_alert_key,last_cron_run_at,last_digest_run_at",
      limit: "1",
    },
    0,
  );
  if (!rows.length) return { ...DEFAULT_NURTURE_CONTROL };
  const r = rows[0];
  return {
    paused: Boolean(r.paused),
    paused_reason: r.paused_reason ?? null,
    paused_at: r.paused_at ?? null,
    paused_by: r.paused_by ?? null,
    last_alert_at: r.last_alert_at ?? null,
    last_alert_key: r.last_alert_key ?? null,
    lastCronRunAt: r.last_cron_run_at ?? null,
    lastDigestRunAt: r.last_digest_run_at ?? null,
  };
}

// ── Per-site lead-status lists ─────────────────────────────────────────────

/**
 * Lead row for the unreachable list (leads.status = 'unreachable').
 * Fails soft: getUnreachableLeads() returns [] when the table is absent.
 */
export type UnreachableLead = {
  id: string;
  full_name: string | null;
  created_at: string;
};

/**
 * Recent unreachable leads for this site.
 *
 * TTL=0: operational ops view, must stay fresh.
 * Returns [] when there are no unreachable leads or on any error.
 */
export function getUnreachableLeads(siteKey: string): Promise<UnreachableLead[]> {
  return rest<UnreachableLead>(
    "leads",
    {
      source: `eq.${siteKey}`,
      status: "eq.unreachable",
      select: "id,full_name,created_at",
      order: "created_at.desc",
    },
    0,
  );
}

/**
 * Booked-appointment event joined with the lead's full_name in memory.
 * Mirrors the getFailedSends join pattern.
 * Fails soft: getBookedLeads() returns [] when the table or column is absent.
 */
export type BookedLead = {
  id: string;
  lead_id: string;
  full_name: string | null;
  ts: string;
};

/**
 * Last ~25 booked events for this site, joined with lead full_name in memory.
 *
 * Reads lead_contact_events (event_type = booked), parallel-fetches lead rows to
 * resolve full_name and filter by source = siteKey. Fetches 100 events before
 * filtering so cross-site events do not exhaust the 25-row target.
 *
 * TTL=0: always fresh (operational view).
 * Returns [] when the table is absent (migration pending) or on any error.
 */
export async function getBookedLeads(siteKey: string): Promise<BookedLead[]> {
  type RawEvent = { id: string; lead_id: string; ts: string };
  const events = await rest<RawEvent>(
    "lead_contact_events",
    {
      event_type: "eq.booked",
      select: "id,lead_id,ts",
      order: "ts.desc",
      limit: "100",
    },
    0,
  );
  if (!events.length) return [];

  const ids = [...new Set(events.map((e) => e.lead_id))];
  type RawLead = { id: string; full_name: string | null; source: string };
  const leadRows = await restUncached<RawLead>("leads", {
    id: `in.(${ids.join(",")})`,
    select: "id,full_name,source",
    limit: String(ids.length + 1),
  });
  const leadMap = new Map(leadRows.map((l) => [l.id, l]));

  const out: BookedLead[] = [];
  for (const e of events) {
    const lead = leadMap.get(e.lead_id);
    if (!lead || lead.source !== siteKey) continue;
    out.push({
      id: e.id,
      lead_id: e.lead_id,
      full_name: lead.full_name ?? null,
      ts: e.ts,
    });
    if (out.length >= 25) break;
  }
  return out;
}

/**
 * Upsert the global nurture-send control row (id=1).
 *
 * Uses the service-role key directly (same env vars as the rest of adminData).
 * Callers MUST authenticate before calling this function. This is the only
 * WRITE in adminData.ts and is intentionally minimal.
 *
 * Throws on DB error so the route handler can return 500 without silently
 * swallowing the failure.
 */
export async function setNurturePaused(
  paused: boolean,
  by: string,
): Promise<void> {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("supabase env missing");
  const body = {
    id: 1,
    paused,
    paused_reason: paused ? "Paused by operator" : null,
    paused_at: paused ? new Date().toISOString() : null,
    paused_by: by || "console",
    updated_at: new Date().toISOString(),
  };
  const qs = new URLSearchParams({ on_conflict: "id" }).toString();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/lead_nurture_control?${qs}`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal,resolution=merge-duplicates",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`nurture-control upsert ${res.status}: ${txt}`);
  }
}

// ── Enrolled-cohort facts + contactability window helpers ──────────────────

/**
 * Minimal fact per enrolled lead for contactability window calculations.
 * Derived from lead_nurture_state joined to leads (enrolled cohort only).
 */
export type EnrolledLeadFact = {
  leadId: string;
  createdAt: string;
  status: string;
};

/**
 * Enrolled-lead cohort from lead_nurture_state (PostgREST embed on leads).
 *
 * Only leads that have a lead_nurture_state row are enrolled; no state row
 * means the lead pre-dates or has not entered the nurture sequence.
 *
 * Fails soft: returns [] on any error or missing table (migration pending).
 */
export async function getEnrolledLeadFacts(siteKey: string): Promise<EnrolledLeadFact[]> {
  type RawRow = {
    lead_id: string;
    leads: { id: string; created_at: string; status: string; source: string };
  };
  try {
    const rows = await rest<RawRow>(
      "lead_nurture_state",
      {
        select: "lead_id,leads!inner(id,created_at,status,source)",
        "leads.source": `eq.${siteKey}`,
        limit: "2000",
      },
      60,
    );
    return rows.map((row) => ({
      leadId: row.lead_id,
      createdAt: row.leads.created_at,
      status: row.leads.status,
    }));
  } catch {
    return [];
  }
}

/** Shared rate-window shape used by contactability window helpers. */
export type RateWindow = { enrolled: number; contactable: number; rate: number };

/**
 * Returns true for statuses that represent a successfully contacted lead.
 * A forwarded lead was contactable first; both count as "made contactable".
 * Exported for testing.
 */
export function isContactableStatus(s: string): boolean {
  return s === "contactable" || s === "forwarded";
}

/**
 * Computes contactability rates over 7-day, 28-day, and all-time windows.
 *
 * Filtering is by `createdAt >= nowMs - windowMs`. The all-time bucket
 * includes every fact. When enrolled = 0 rate is 0 (no divide-by-zero).
 *
 * Exported (pure function) for testing.
 *
 * @param facts  - Enrolled-lead facts from getEnrolledLeadFacts.
 * @param nowMs  - Current time in milliseconds (injectable for testability).
 */
export function computeContactabilityWindows(
  facts: EnrolledLeadFact[],
  nowMs: number,
): { d7: RateWindow; d28: RateWindow; all: RateWindow } {
  const MS_7D = 7 * 24 * 60 * 60 * 1000;
  const MS_28D = 28 * 24 * 60 * 60 * 1000;

  function bucket(cutoffMs: number | null): RateWindow {
    const filtered =
      cutoffMs == null
        ? facts
        : facts.filter((f) => new Date(f.createdAt).getTime() >= cutoffMs);
    const enrolled = filtered.length;
    const contactable = filtered.filter((f) => isContactableStatus(f.status)).length;
    return { enrolled, contactable, rate: enrolled > 0 ? contactable / enrolled : 0 };
  }

  return {
    d7: bucket(nowMs - MS_7D),
    d28: bucket(nowMs - MS_28D),
    all: bucket(null),
  };
}

/**
 * Groups enrolled-lead facts by their T0 experiment arm (deterministic FNV-1a
 * split from the lead id) and computes per-arm contactability rates.
 *
 * The split is recomputed from the lead id rather than read from a persisted
 * column, so this readout can never drift out of sync with the live assignment.
 *
 * Exported (pure function) for testing.
 */
export function computeT0Readout(
  facts: EnrolledLeadFact[],
): { branded: RateWindow; personal: RateWindow } {
  const brandedFacts: EnrolledLeadFact[] = [];
  const personalFacts: EnrolledLeadFact[] = [];
  for (const f of facts) {
    if (t0Variant(f.leadId) === "t0_branded") {
      brandedFacts.push(f);
    } else {
      personalFacts.push(f);
    }
  }
  function summarise(fs: EnrolledLeadFact[]): RateWindow {
    const enrolled = fs.length;
    const contactable = fs.filter((f) => isContactableStatus(f.status)).length;
    return { enrolled, contactable, rate: enrolled > 0 ? contactable / enrolled : 0 };
  }
  return {
    branded: summarise(brandedFacts),
    personal: summarise(personalFacts),
  };
}
