/**
 * Console cache refresh endpoint — called by Vercel Cron every 2 minutes.
 * Open endpoint: only writes to internal analytics cache, no sensitive data.
 * Returns: { refreshed: N, errors?: string[], ms: N }
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getSiteCapabilities } from "@/config/capabilities";
import {
  getFunnelDaily,
  getCalculatorConversionByPlacement,
  getTopVisitors,
  getLeadsForSite,
  getCountryOptions,
  getEventDaily,
  getCtaPerformance,
  getFormFieldDropoff,
  getSectionActions,
  getUxFriction,
  getClientErrors,
  getChannelConversion,
  getVisitsToConversion,
  getSiteKpis,
  getExperimentResults,
  getExperimentArms,
  getExperimentFunnel,
  getResultGateLeads,
  getNurtureHealth,
  getNurtureStepHealth,
  getStuckLeads,
  getFailedSends,
  getNurtureControl,
  getUnreachableLeads,
  getBookedLeads,
  getContactabilityFunnel,
  getContactabilityLeads,
  getEnrolledLeadFacts,
  getLeadIntentMix,
  getNurtureFunnel,
  getPersonalizationResults,
} from "@accounting-network/web-shared/console/adminData";
import {
  getSitesRegistry,
  getEstateOverview,
  getEstateChannels,
  getEstateErrors,
  getEstateLatestLeads,
  getEstateKpis,
  getEstateTimeseries,
} from "@accounting-network/web-shared/console/estateData";

// ── Supabase upsert ──────────────────────────────────────────────────────────

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function upsertCache(
  rows: Array<{ cache_key: string; data: unknown }>,
  refreshed_at: string,
): Promise<void> {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("supabase env missing");
  const body = rows.map((r) => ({
    cache_key: r.cache_key,
    data: r.data,
    refreshed_at,
  }));
  const res = await fetch(`${SUPABASE_URL}/rest/v1/console_cache`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`upsert ${res.status}: ${text.slice(0, 120)}`);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

type CacheRow = { cache_key: string; data: unknown } | null;

/**
 * Direct timeseries fetch — bypasses adminData.ts's unstable_cache layer which
 * silently returns [] in the cron context. Uses the same service-role credentials
 * already available in this route for the console_cache upsert.
 */
async function directTimeseries(
  siteKey: string,
  from: string,
  to: string,
  country: string | undefined,
  bucket = "1 day",
): Promise<unknown[]> {
  if (!SUPABASE_URL || !SERVICE_KEY) throw new Error("supabase env missing");
  const params: Record<string, string> = { p_site_key: siteKey, p_bucket: bucket, p_from: from, p_to: to };
  if (country) params.p_country = country;
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/web_timeseries?${qs}`, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`web_timeseries ${res.status}`);
  return res.json() as Promise<unknown[]>;
}

function capture(
  key: string,
  fn: () => Promise<unknown>,
  errors: string[],
  counter: { n: number },
): Promise<CacheRow> {
  return fn()
    .then((data) => {
      counter.n++;
      return { cache_key: key, data };
    })
    .catch((e: unknown) => {
      errors.push(`${key}: ${e instanceof Error ? e.message : String(e)}`);
      return null;
    });
}

async function flush(
  rows: CacheRow[],
  refreshed_at: string,
  errors: string[],
): Promise<void> {
  const valid = rows.filter(Boolean) as Array<{ cache_key: string; data: unknown }>;
  if (!valid.length) return;
  try {
    await upsertCache(valid, refreshed_at);
  } catch (e: unknown) {
    errors.push(`upsert: ${e instanceof Error ? e.message : String(e)}`);
  }
}

// ── Handler ──────────────────────────────────────────────────────────────────

// ponytail: no auth — this endpoint only writes to an internal analytics cache
export async function GET(_req: NextRequest): Promise<NextResponse> {
  const t0 = Date.now();
  const now = new Date();
  const nowISO = now.toISOString();
  const refreshed_at = nowISO;

  // Time windows
  const startOfToday = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  ).toISOString();
  const h24 = new Date(now.getTime() - 24 * 3600_000).toISOString();
  const d7 = new Date(now.getTime() - 7 * 86400_000).toISOString();
  const d14 = new Date(now.getTime() - 14 * 86400_000).toISOString();
  const d30 = new Date(now.getTime() - 30 * 86400_000).toISOString();
  const allTime = "2000-01-01T00:00:00.000Z";

  const errors: string[] = [];
  const counter = { n: 0 };
  const cap = (key: string, fn: () => Promise<unknown>) =>
    capture(key, fn, errors, counter);

  // ── 1. Estate-level ───────────────────────────────────────────────────────
  await flush(
    await Promise.all([
      cap("estate:sites_registry",    () => getSitesRegistry()),
      cap("estate:kpis:daily",        () => getEstateKpis(startOfToday, nowISO, "GB")),
      cap("estate:kpis:7d",           () => getEstateKpis(d7,           nowISO, "GB")),
      cap("estate:kpis:30d",          () => getEstateKpis(d30,          nowISO, "GB")),
      cap("estate:kpis:all",          () => getEstateKpis(allTime,      nowISO, "GB")),
      cap("estate:overview:7d",       () => getEstateOverview(7)),
      cap("estate:timeseries:30d",    () => getEstateTimeseries("1 day", d30,    nowISO, "GB")),
      cap("estate:timeseries:all",    () => getEstateTimeseries("1 day", allTime, nowISO, "GB")),
      cap("estate:channels:28d",      () => getEstateChannels(28)),
      cap("estate:errors",            () => getEstateErrors()),
      cap("estate:latest_leads:30",   () => getEstateLatestLeads(30)),
    ]),
    refreshed_at,
    errors,
  );

  // ── 2. Per-site × country analytics ──────────────────────────────────────
  const sites = await getSitesRegistry().catch(() => []);
  const activeSites = sites.filter((s) => s.active);

  for (const site of activeSites) {
    const sk = site.site_key;

    // Discover which countries have traffic for this site; always include "all".
    // getCountryOptions may return string[] or {value: string}[] — normalise either.
    const rawCountryOpts = await getCountryOptions(sk).catch(() => [] as unknown[]);
    const discoveredCodes = (rawCountryOpts as Array<string | { value: string }>)
      .map((o) => (typeof o === "string" ? o : o.value))
      .filter(Boolean);
    // Always include "GB" regardless of what getCountryOptions returns; cap at 9 more.
    const countriesToCompute = ["all", "GB", ...new Set(discoveredCodes.filter((c) => c !== "GB"))].slice(0, 10);

    // Cache the raw options list for the per-site country dropdown.
    await flush(
      [{ cache_key: `site:${sk}:country_options`, data: rawCountryOpts }],
      refreshed_at,
      errors,
    );

    // Per-country analytics (all discovered countries in parallel)
    const countryRows = await Promise.all(
      countriesToCompute.flatMap((country) => {
        const c = country === "all" ? undefined : country;
        const ck = (metric: string) => `site:${sk}:${metric}:${country}`;
        return [
          cap(ck("kpis:daily"),              () => getSiteKpis(sk, startOfToday, nowISO, c)),
          cap(ck("kpis:7d"),                 () => getSiteKpis(sk, d7,           nowISO, c)),
          cap(ck("kpis:30d"),                () => getSiteKpis(sk, d30,          nowISO, c)),
          cap(ck("kpis:all"),                () => getSiteKpis(sk, allTime,      nowISO, c)),
          cap(ck("timeseries:30d"),          () => directTimeseries(sk, d30, nowISO, c)),
          // Trends-page sub-day granularities — GB only, 24h window only (stay fast)
          // timeseries:1h:30d (27s/site) and timeseries:1d:alltime (89s/site) exceed
          // the cron budget and are intentionally omitted.
          ...(country === "GB" ? [
            cap(ck("timeseries:15min:24h"), () => directTimeseries(sk, h24, nowISO, c, "15 minutes")),
            cap(ck("timeseries:1h:24h"),    () => directTimeseries(sk, h24, nowISO, c, "1 hour")),
            cap(ck("timeseries:1h:7d"),     () => directTimeseries(sk, d7,  nowISO, c, "1 hour")),
          ] : []),
          cap(ck("funnel"),                  () => getFunnelDaily(sk, c)),
          cap(ck("visitors"),                () => getTopVisitors(sk, 500, c)),
          cap(ck("channels"),                () => getChannelConversion(sk, c)),
          cap(ck("calculators"),             () => getCalculatorConversionByPlacement(sk, c)),
          cap(ck("ctas"),                    () => getCtaPerformance(sk, c)),
          cap(ck("form_dropoff"),            () => getFormFieldDropoff(sk, c)),
          cap(ck("sections"),                () => getSectionActions(sk, c)),
          cap(ck("friction"),                () => getUxFriction(sk, c)),
          cap(ck("errors"),                  () => getClientErrors(sk, c)),
          cap(ck("visits_to_conversion"),    () => getVisitsToConversion(sk, c)),
          // 14-day daily error sparkline (for per-day trend chart on behaviour tab)
          cap(ck("errors_daily"),            () => getEventDaily(sk, "client_error", d14, nowISO, c)),
        ];
      }),
    );
    await flush(countryRows, refreshed_at, errors);

    // Site leads for visitor-row enrichment (no country split — all leads for the site)
    await flush(
      [await cap(`site:${sk}:site_leads`, () => getLeadsForSite(sk))],
      refreshed_at,
      errors,
    );

    // Capability-gated (no country split)
    const caps = getSiteCapabilities(sk);
    const capRows = await Promise.all([
      caps.experiments
        ? cap(`site:${sk}:experiments`, async () => {
            const [results, arms, funnel, resultGate] = await Promise.all([
              getExperimentResults(sk),
              getExperimentArms(sk),
              getExperimentFunnel(sk),
              getResultGateLeads(sk),
            ]);
            return { results, arms, funnel, resultGate };
          })
        : Promise.resolve(null),
      caps.nurture
        ? cap(`site:${sk}:nurture_funnel`, () => getNurtureFunnel(sk))
        : Promise.resolve(null),
      caps.personalisation
        ? cap(`site:${sk}:personalisation`, () => getPersonalizationResults(sk))
        : Promise.resolve(null),
      caps.leadIntent
        ? cap(`site:${sk}:lead_intent`, () => getLeadIntentMix(sk))
        : Promise.resolve(null),
    ]);
    await flush(capRows, refreshed_at, errors);

    // Property-specific operational data
    if (sk === "property") {
      const propRows = await Promise.all([
        cap(`site:${sk}:nurture_health`,       () => getNurtureHealth(sk)),
        cap(`site:${sk}:nurture_step_health`,  () => getNurtureStepHealth(sk)),
        cap(`site:${sk}:contactability`,       () => getContactabilityFunnel(sk)),
        cap(`site:${sk}:contactability_leads`, () => getContactabilityLeads(sk)),
        cap(`site:${sk}:stuck_leads`,          () => getStuckLeads(sk)),
        cap(`site:${sk}:failed_sends`,         () => getFailedSends(sk)),
        cap(`site:${sk}:nurture_control`,      () => getNurtureControl()),
        cap(`site:${sk}:unreachable_leads`,    () => getUnreachableLeads(sk)),
        cap(`site:${sk}:booked_leads`,         () => getBookedLeads(sk)),
        cap(`site:${sk}:enrolled_leads`,       () => getEnrolledLeadFacts(sk)),
      ]);
      await flush(propRows, refreshed_at, errors);
    }
  }

  return NextResponse.json({
    refreshed: counter.n,
    sites: activeSites.map((s) => s.site_key),
    errors: errors.length > 0 ? errors : undefined,
    ms: Date.now() - t0,
  });
}
