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

/**
 * Country slice. The dashboard defaults to "GB" so headline rates reflect the
 * real UK audience; pass undefined (or "ALL" upstream) for every country. The
 * *_geo views carry a `country` column (COALESCE'd to 'XX' for legacy NULL-geo
 * rows), so this is a plain PostgREST eq filter.
 */
function withCountry(
  params: Record<string, string>,
  country?: string,
): Record<string, string> {
  if (country && country !== "ALL") params.country = `eq.${country}`;
  return params;
}

/**
 * Collapse country-dimensioned rows back to one row per natural key. With a
 * concrete country selected there is already one row per key (a no-op); under
 * "All countries" the *_geo views return one row per (key, country), so we sum
 * the raw counts and let the caller recompute any rates from the summed totals.
 */
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

export type FunnelDay = {
  date: string;
  country: string;
  sessions: number;
  engaged_sessions: number;
  calc_sessions: number; // BRANCH off engaged (not a mainline step)
  form_cta_sessions: number; // mainline: clicked a form-bound CTA (or reached a later stage)
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

/**
 * TRUE nested funnel (vw_web_funnel_daily_v2): each mainline stage is a strict
 * subset of the one above. Returns daily rows (one per date, or per date+country
 * under "All"); the dashboard sums them into stage totals. Limit is generous so
 * an "All countries" window (≤30 days × many countries) is never truncated.
 */
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

/** Tool funnel split by placement (calculator | blog | embed) and tool_kind. */
export async function getCalculatorConversionByPlacement(
  siteKey: string,
  country?: string,
) {
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

export type ResourceConversion = {
  topic: string;
  placement: string;
  gate_views: number;
  unlocks: number;
  lead_sessions: number;
  view_to_unlock_rate: number | null;
  unlock_to_lead_rate: number | null;
};

/** Excel-gate funnel: gate_view -> unlock -> lead, by topic and placement. */
export function getResourceConversion(siteKey: string) {
  return rest<ResourceConversion>("vw_resource_conversion", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "gate_views.desc",
    limit: "100",
  });
}

export function getTopVisitors(siteKey: string, limit = 500, country?: string) {
  return rest<VisitorJourney>(
    "vw_visitor_journey",
    withCountry(
      {
        site_key: `eq.${siteKey}`,
        select: "*",
        order: "last_seen.desc",
        limit: String(limit),
      },
      country,
    ),
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

export type ExperimentArm = {
  sessions: number;
  cta_clicks: number;
  form_starts: number;
  converted_sessions: number;
  conversion_rate: number | null;
};

export type ExperimentArms = { control: ExperimentArm | null; treatment: ExperimentArm | null };

/**
 * All experiments grouped by key into control/treatment arms (the live A/B
 * ledger). vw_experiment_results now returns one row per `key:variant` (unnested
 * from the comma-separated props.exp), so every running experiment lights up
 * here automatically.
 */
export async function getExperimentArms(siteKey: string): Promise<Record<string, ExperimentArms>> {
  const rows = await getExperimentResults(siteKey);
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

// ===========================================================================
// Country slicer + previously-dark panels (form-field drop-off, per-CTA
// performance, content section engagement, UX friction). All read the *_geo
// views and collapse to one row per natural key so "All countries" sums while a
// concrete country (default GB) is a clean one-row-per-key passthrough.
// ===========================================================================

/** Distinct countries seen for this site, for the dashboard country selector. */
export async function getCountryOptions(siteKey: string): Promise<string[]> {
  const rows = await rest<{ country: string | null }>("vw_visitor_journey", {
    site_key: `eq.${siteKey}`,
    select: "country",
  });
  return Array.from(
    new Set(rows.map((r) => r.country).filter((c): c is string => !!c)),
  ).sort();
}

export type FormFieldDropoff = {
  form_id: string;
  field: string;
  focuses: number;
  abandons: number;
  errors: number;
  abandon_rate: number | null;
};

/** Where users abandon the lead form, field by field (highest-abandon first). */
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

export type CtaPerformance = {
  cta_id: string;
  goal: string | null;
  clicks: number;
  click_sessions: number;
  form_start_sessions: number;
  lead_sessions: number;
  click_to_form_rate: number | null;
};

/** Which CTAs drive form starts vs dead-end (most-clicked first). */
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

export type SectionEngagement = {
  page_path: string;
  section_id: string;
  section_text: string | null;
  views: number;
  sessions: number;
};

/** Which article sections actually get read (most-read first). */
export async function getSectionEngagement(siteKey: string, country?: string) {
  const rows = await rest<SectionEngagement & { country: string }>(
    "vw_section_engagement_geo",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "sessions.desc", limit: "1000" },
      country,
    ),
  );
  return aggregateRows<SectionEngagement & { country: string }>(
    rows,
    (r) => `${r.page_path}|${r.section_id}`,
    ["views", "sessions"],
    (r) => r,
  ).sort((a, b) => b.sessions - a.sessions);
}

export type DailyPoint = { bucket: string; count: number; sessions: number };

/**
 * Daily count + sessions for ONE event over a window (web_event_daily RPC).
 * Drives the dashboard sparklines (errors/day, etc.). Days with no events are
 * absent — the caller densifies into a continuous series.
 */
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

/** JS errors grouped by message (actionable list), most frequent first. */
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

export type SectionAction = {
  page_path: string;
  section_id: string;
  section_text: string | null;
  read_sessions: number;
  acted_sessions: number;
  converted_sessions: number;
};

/** Per section: read -> acted (clicked a CTA / started a form) -> converted. */
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

export type UxFriction = {
  page_path: string;
  rage_clicks: number;
  dead_clicks: number;
  client_errors: number;
  exit_intent_shown: number;
  friction_sessions: number;
};

/** Rage/dead clicks, JS errors and exit-intent by page (worst first). */
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
      b.rage_clicks + b.dead_clicks + b.client_errors - (a.rage_clicks + a.dead_clicks + a.client_errors),
  );
}

export type ChannelConversion = {
  channel: string;
  referrer_host: string;
  sessions: number;
  leads: number;
  conversion_rate: number | null;
};

/** Channel VALUE: per (channel, referrer_host) sessions/leads/CR, biggest first. */
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

export type VisitsBucket = {
  visits_bucket: number;
  visitors: number;
  converted_visitors: number;
};

/** Visitor session-count histogram vs conversion (the multi-visit reality). */
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
