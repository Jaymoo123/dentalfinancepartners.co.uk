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

export function getTopVisitors(siteKey: string, limit = 500, country?: string) {
  return rest<VisitorJourney>(
    "vw_visitor_journey",
    withCountry(
      { site_key: `eq.${siteKey}`, select: "*", order: "last_seen.desc", limit: String(limit) },
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

export function getLeadsPage(siteKey: string, offset: number, limit: number) {
  return rest<LeadInfo>("leads", {
    source: `eq.${siteKey}`,
    select: LEAD_COLS,
    order: "created_at.desc",
    offset: String(offset),
    limit: String(limit),
  });
}

export async function getCountryOptions(siteKey: string): Promise<string[]> {
  const rows = await rest<{ country: string | null }>("vw_visitor_journey", {
    site_key: `eq.${siteKey}`,
    select: "country",
  });
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

export function getPersonalizationResults(siteKey: string) {
  return rest<PersonalizationResult>("vw_personalization_results", {
    site_key: `eq.${siteKey}`,
    select: "*",
    order: "shown.desc",
    limit: "100",
  });
}
