/**
 * Per-site trends page: interactive time-series charts at multiple
 * granularities. Cookie-gated, never indexed.
 *
 * Charts are the recovered Property TrendChart (recharts, hover tooltips,
 * cursor-tracking points) ported console-app-local. Data is fetched here on
 * the server and passed as serialisable arrays plus a formatType STRING into
 * the "use client" chart (the established RSC lesson). The at-a-glance
 * Sparklines stay on the overview cards; this page is the interactive view.
 */
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import {
  getTimeseries,
  getChannelConversion,
  getFunnelDaily,
} from "@accounting-network/web-shared/console/adminData";
import { getSitesRegistry } from "@accounting-network/web-shared/console/estateData";
import { TrendChart } from "@/components/TrendChart";
import { WeeklyOverlayChart } from "@/components/WeeklyOverlayChart";
import { CategoryBarChart } from "@/components/CategoryBarChart";
import { ConversionRateChart } from "@/components/ConversionRateChart";
import { FunnelOverTimeChart } from "@/components/FunnelOverTimeChart";
import { CumulativeChart } from "@/components/CumulativeChart";
import { MultiSiteTrendChart } from "@/components/MultiSiteTrendChart";
import { buildMultiSiteSeries, buildWeeklyAvgVisitors } from "@/lib/multiSiteSeries";
import { checkAuth } from "@/lib/checkAuth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

const isoOf = (d: Date) => d.toISOString();

const CHANNEL_LABEL: Record<string, string> = {
  ai: "AI engines",
  search: "Search",
  social: "Social",
  internal: "Returning",
  referral: "Referral",
  direct: "Direct",
};

export default async function SiteTrendsPage({
  params,
  searchParams,
}: {
  params: Promise<{ siteKey: string }>;
  searchParams: Promise<{ country?: string }>;
}) {
  const authed = await checkAuth();
  if (!authed) redirect("/login");

  const { siteKey } = await params;
  const { country: countryParam } = await searchParams;

  const sites = await getSitesRegistry();
  const site = sites.find((s) => s.site_key === siteKey);
  if (!site) notFound();

  const country = countryParam || "GB";
  const countryFilter = country === "ALL" ? undefined : country;
  const now = new Date();
  const h24 = new Date(now.getTime() - 24 * 3600_000);
  const d7 = new Date(now.getTime() - 7 * 86400_000);
  const d30 = new Date(now.getTime() - 30 * 86400_000);
  const allTimeFrom = new Date("2000-01-01");

  const [q15, h24hourly, w7hourly, w7daily, m30daily, m30hourly, channelRows, funnelRows, siteAllDaily] =
    await Promise.all([
      getTimeseries(siteKey, "15 minutes", isoOf(h24), isoOf(now), countryFilter),
      getTimeseries(siteKey, "1 hour", isoOf(h24), isoOf(now), countryFilter),
      getTimeseries(siteKey, "1 hour", isoOf(d7), isoOf(now), countryFilter),
      getTimeseries(siteKey, "1 day", isoOf(d7), isoOf(now), countryFilter),
      getTimeseries(siteKey, "1 day", isoOf(d30), isoOf(now), countryFilter),
      getTimeseries(siteKey, "1 hour", isoOf(d30), isoOf(now), countryFilter),
      getChannelConversion(siteKey),
      getFunnelDaily(siteKey, countryFilter),
      getTimeseries(siteKey, "1 day", isoOf(allTimeFrom), isoOf(now), countryFilter),
    ]);

  // Leads by channel (all countries, attributable/stitched leads), summed per channel.
  const channelMap = new Map<string, { leads: number; sessions: number }>();
  for (const r of channelRows) {
    const cur = channelMap.get(r.channel) ?? { leads: 0, sessions: 0 };
    cur.leads += r.leads;
    cur.sessions += r.sessions;
    channelMap.set(r.channel, cur);
  }
  const channelData = Array.from(channelMap.entries())
    .map(([ch, v]) => ({
      name: CHANNEL_LABEL[ch] ?? ch,
      value: v.leads,
      sub: `${v.sessions.toLocaleString("en-GB")} sessions`,
    }))
    .sort((a, b) => b.value - a.value);

  // Funnel over time (GB audience): one point per day.
  const funnelData = funnelRows.map((r) => ({
    date: r.date,
    sessions: r.sessions,
    engaged_sessions: r.engaged_sessions,
    form_start_sessions: r.form_start_sessions,
    converted_sessions: r.converted_sessions,
  }));

  // Single-site version of the estate comparison charts (one line, this site).
  const siteCmp = buildMultiSiteSeries(
    [{ site_key: siteKey, display_name: site.display_name }],
    [m30daily],
    [funnelRows],
  );

  // Weekly average daily visitors, all-time (this site).
  const siteWeekly = buildWeeklyAvgVisitors(siteAllDaily, siteKey, site.display_name, "#059669");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trends</h1>
          <p className="mt-0.5 text-xs text-slate-400">{site.display_name}</p>
        </div>
        <Link href={`/site/${siteKey}`} className="text-sm text-emerald-700 underline">
          Overview
        </Link>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Human-only (bots excluded), UTC buckets. Country: {countryFilter ?? "all"}.
      </p>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Over time (last 30 days)</h2>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <MultiSiteTrendChart data={siteCmp.sessions} series={siteCmp.series} label="Daily sessions" />
        <MultiSiteTrendChart data={siteCmp.visitors} series={siteCmp.series} label="Daily visitors" />
        <MultiSiteTrendChart
          data={siteCmp.conversion}
          series={siteCmp.series}
          label="Lead conversion rate"
          asPercent
          note="converted sessions / sessions, 7-day rolling"
        />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Visitor trend (weekly average)</h2>
      <p className="mt-1 text-xs text-slate-500">
        Each point is one week; the value is that week&apos;s average visitors per day. All time.
      </p>
      <div className="mt-3 max-w-2xl">
        <MultiSiteTrendChart
          data={siteWeekly.points}
          series={siteWeekly.series}
          label="Avg daily visitors · per week"
          note="all time"
        />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 24 hours</h2>
      <div className="mt-3 space-y-3">
        <TrendChart data={q15} metric="sessions" label="Sessions · 15-minute" formatType="time" />
        <TrendChart data={q15} metric="humans" label="Visitors · 15-minute" formatType="time" />
        <TrendChart data={h24hourly} metric="sessions" label="Sessions · hourly" formatType="time" />
        <TrendChart data={h24hourly} metric="humans" label="Visitors · hourly" formatType="time" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 7 days</h2>
      <div className="mt-3 space-y-3">
        <TrendChart data={w7hourly} metric="sessions" label="Sessions · hourly" formatType="hour" />
        <TrendChart data={w7hourly} metric="humans" label="Visitors · hourly" formatType="hour" />
        <TrendChart data={w7daily} metric="sessions" label="Sessions · daily" formatType="day" />
        <TrendChart data={w7daily} metric="humans" label="Visitors · daily" formatType="day" />
        <TrendChart data={w7daily} metric="leads" label="Leads · daily" formatType="day" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Week over week</h2>
      <div className="mt-3 space-y-3">
        <WeeklyOverlayChart data={m30daily} metric="sessions" label="Sessions by weekday (last 4 weeks)" />
        <WeeklyOverlayChart data={m30daily} metric="humans" label="Visitors by weekday (last 4 weeks)" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Last 30 days</h2>
      <div className="mt-3 space-y-3">
        <TrendChart data={m30daily} metric="sessions" label="Sessions · daily" formatType="day" />
        <TrendChart data={m30daily} metric="humans" label="Visitors · daily" formatType="day" />
        <TrendChart data={m30daily} metric="leads" label="Leads · daily" formatType="day" />
        <TrendChart data={m30hourly} metric="sessions" label="Sessions · hourly · 30 days" formatType="day" />
        <TrendChart data={m30hourly} metric="humans" label="Visitors · hourly · 30 days" formatType="day" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Leads</h2>
      <p className="mt-1 text-xs text-slate-500">
        All countries (counted from the leads table, so historical and unstitched leads show).
      </p>
      <div className="mt-3 space-y-3">
        <CumulativeChart data={m30daily} metric="leads" label="Cumulative leads · 30 days" formatType="day" />
        <WeeklyOverlayChart data={m30daily} metric="leads" label="Leads by weekday (last 4 weeks)" />
        <CategoryBarChart label="Leads by channel (attributable)" data={channelData} color="#4f46e5" valueLabel="Leads" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Conversion</h2>
      <p className="mt-1 text-xs text-slate-500">Leads per visitor over time.</p>
      <div className="mt-3 space-y-3">
        <ConversionRateChart data={w7daily} label="Conversion rate · daily (7 days)" formatType="day" />
        <ConversionRateChart data={m30daily} label="Conversion rate · daily (30 days)" formatType="day" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Funnel over time</h2>
      <div className="mt-3 space-y-3">
        <FunnelOverTimeChart data={funnelData} label="Sessions to leads, per day" />
      </div>
    </div>
  );
}
