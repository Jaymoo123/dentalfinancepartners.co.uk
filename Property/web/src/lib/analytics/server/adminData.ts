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

// Leads are distinguished per site by `source` (= the source_identifier), not
// site_key. PII is read with the service role straight from the table and never
// flows through a vw_* view.
const LEAD_COLS =
  "id,full_name,email,phone,role,source,message,created_at,visitor_id,session_id";

export function getLeadsForSite(siteKey: string, limit = 200) {
  return rest<LeadInfo>("leads", {
    source: `eq.${siteKey}`,
    select: LEAD_COLS,
    order: "created_at.desc",
    limit: String(limit),
  });
}

/** The lead a given visitor became, if any (newest match wins). */
export function getLeadForVisitor(siteKey: string, visitorId: string) {
  return rest<LeadInfo>("leads", {
    source: `eq.${siteKey}`,
    visitor_id: `eq.${visitorId}`,
    select: LEAD_COLS,
    order: "created_at.desc",
    limit: "1",
  }).then((rows) => rows[0] ?? null);
}

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

export function getPersonalizationResults(siteKey: string) {
  return rest<PersonalizationResult>("vw_personalization_results", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "shown.desc",
    limit: "100",
  });
}

export type ExperimentResult = {
  exp: string;
  sessions: number;
  cta_clicks: number;
  form_starts: number;
  converted_sessions: number;
  conversion_rate: number | null;
};

export function getExperimentResults(siteKey: string) {
  return rest<ExperimentResult>("vw_experiment_results", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "sessions.desc",
    limit: "100",
  });
}

export type PersonalizationArm = {
  sessions: number;
  converted_sessions: number;
  conversion_rate: number | null;
};

export type PersonalizationAB = {
  control: PersonalizationArm | null;
  treatment: PersonalizationArm | null;
};

/**
 * The personalisation A/B head-to-head: reads vw_experiment_results and pulls
 * the two `personalization:*` rows so the dashboard can show control vs
 * treatment conversion and the relative lift. Returns null arms when an arm has
 * no data yet (the card then renders the honest not-enough-data state).
 */
export async function getPersonalizationAB(siteKey: string): Promise<PersonalizationAB> {
  const rows = await getExperimentResults(siteKey);
  const pick = (exp: string): PersonalizationArm | null => {
    const r = rows.find((x) => x.exp === exp);
    if (!r) return null;
    return {
      sessions: r.sessions,
      converted_sessions: r.converted_sessions,
      conversion_rate: r.conversion_rate,
    };
  };
  return {
    control: pick("personalization:control"),
    treatment: pick("personalization:treatment"),
  };
}

export type TimePoint = {
  bucket: string;
  sessions: number;
  events: number;
  leads: number;
};

/** Bucketed time-series via the web_timeseries RPC (stable fn, GET-able). */
export function getTimeseries(
  siteKey: string,
  bucket: "15 minutes" | "1 hour" | "1 day",
  fromISO: string,
  toISO: string,
) {
  return rest<TimePoint>("rpc/web_timeseries", {
    p_site_key: siteKey,
    p_bucket: bucket,
    p_from: fromISO,
    p_to: toISO,
  });
}

/** A page of leads (newest first) for the paginated leads sub-page. */
export function getLeadsPage(siteKey: string, offset: number, limit: number) {
  return rest<LeadInfo>("leads", {
    source: `eq.${siteKey}`,
    select: LEAD_COLS,
    order: "created_at.desc",
    offset: String(offset),
    limit: String(limit),
  });
}
