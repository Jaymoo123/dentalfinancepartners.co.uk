/**
 * Server-only data access for the internal /admin/analytics dashboard.
 *
 * Reads the human-only rollup views + raw web_events via the Supabase SERVICE
 * ROLE (RLS lets `authenticated` read, but we fetch server-side with the service
 * key so the page works without a user session). NEVER import this into a client
 * component — it holds the service credential (SUPABASE_SERVICE_ROLE_KEY is not
 * NEXT_PUBLIC_, so it is undefined in the browser and this is inert if bundled).
 */

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function rest<T>(path: string, params: Record<string, string>): Promise<T[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) return [];
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}?${qs}`, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return (await res.json()) as T[];
}

export type FunnelDay = {
  date: string;
  sessions: number;
  engaged_sessions: number;
  page_views: number;
  calc_sessions: number;
  cta_sessions: number;
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

export function getFunnelDaily(siteKey: string) {
  return rest<FunnelDay>("vw_web_funnel_daily", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "date.desc",
    limit: "30",
  });
}

export function getCalculatorConversion(siteKey: string) {
  return rest<CalculatorConversion>("vw_calculator_conversion", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "computed.desc",
    limit: "50",
  });
}

export function getTopVisitors(siteKey: string, limit = 500) {
  return rest<VisitorJourney>("vw_visitor_journey", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "last_seen.desc",
    limit: String(limit),
  });
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
  return rest<VisitorEvent>("web_events", {
    site_key: `eq.${siteKey}`,
    visitor_id: `eq.${visitorId}`,
    is_bot: "eq.false",
    select: "ts,session_id,event_name,page_path,props",
    order: "ts.asc",
    limit: "2000",
  });
}
