"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { useConsoleAuth } from "@/hooks/useConsoleAuth";
import { useConsoleData, cacheGet } from "@/hooks/useConsoleData";
import { DashboardSkeleton } from "@/components/Skeleton";
import { TrendChart } from "@/components/TrendChart";
import { WeeklyOverlayChart } from "@/components/WeeklyOverlayChart";
import { CategoryBarChart } from "@/components/CategoryBarChart";
import { ConversionRateChart } from "@/components/ConversionRateChart";
import { FunnelOverTimeChart } from "@/components/FunnelOverTimeChart";
import { CumulativeChart } from "@/components/CumulativeChart";
import { MultiSiteTrendChart } from "@/components/MultiSiteTrendChart";
import { buildMultiSiteSeries, buildWeeklyAvgVisitors } from "@/lib/multiSiteSeries";

type SiteEntry = {
  site_key: string;
  display_name: string;
  domain: string;
  niche: string | null;
  active: boolean;
};

type TimePoint = { bucket: string; sessions: number; humans: number; events: number; leads: number };

type FunnelRow = {
  date: string;
  sessions: number;
  engaged_sessions: number;
  calc_sessions: number;
  form_cta_sessions: number;
  form_start_sessions: number;
  converted_sessions: number;
};

type ChannelRow = {
  site_key: string;
  channel: string;
  sessions: number;
  leads: number;
  conversion_rate: number | null;
};

const CHANNEL_LABEL: Record<string, string> = {
  ai: "AI engines",
  search: "Search",
  social: "Social",
  internal: "Returning",
  referral: "Referral",
  direct: "Direct",
};

export default function SiteTrendsPage() {
  useConsoleAuth();

  const params = useParams<{ siteKey: string }>();
  const siteKey = params.siteKey;
  const countryParam = "GB";

  const trendsKeys = useMemo(
    () => [
      "estate:sites_registry",
      `site:${siteKey}:timeseries:15min:24h:${countryParam}`,
      `site:${siteKey}:timeseries:1h:24h:${countryParam}`,
      `site:${siteKey}:timeseries:1h:7d:${countryParam}`,
      `site:${siteKey}:timeseries:1h:30d:${countryParam}`,
      `site:${siteKey}:timeseries:30d:${countryParam}`,
      `site:${siteKey}:timeseries:1d:alltime:${countryParam}`,
      `site:${siteKey}:channels:all`,
      `site:${siteKey}:funnel:${countryParam}`,
    ],
    [siteKey],
  );

  const { cache, loading } = useConsoleData(trendsKeys);

  const allSites = cacheGet<SiteEntry[]>(cache, "estate:sites_registry", []);
  const site = allSites.find((s) => s.site_key === siteKey);

  const q15         = cacheGet<TimePoint[]>(cache, `site:${siteKey}:timeseries:15min:24h:${countryParam}`, []);
  const h24hourly   = cacheGet<TimePoint[]>(cache, `site:${siteKey}:timeseries:1h:24h:${countryParam}`, []);
  const w7hourly    = cacheGet<TimePoint[]>(cache, `site:${siteKey}:timeseries:1h:7d:${countryParam}`, []);
  const m30hourly   = cacheGet<TimePoint[]>(cache, `site:${siteKey}:timeseries:1h:30d:${countryParam}`, []);
  const m30daily    = cacheGet<TimePoint[]>(cache, `site:${siteKey}:timeseries:30d:${countryParam}`, []);
  const siteAllDaily = cacheGet<TimePoint[]>(cache, `site:${siteKey}:timeseries:1d:alltime:${countryParam}`, []);
  const channelRows  = cacheGet<ChannelRow[]>(cache, `site:${siteKey}:channels:all`, []);
  const funnelRows   = cacheGet<FunnelRow[]>(cache, `site:${siteKey}:funnel:${countryParam}`, []);

  // Derive last-7-days daily from 30d cache (avoids an extra cache key)
  const d7cutoff = new Date(Date.now() - 7 * 86400_000).toISOString().slice(0, 10);
  const w7daily = m30daily.filter((p) => p.bucket.slice(0, 10) >= d7cutoff);

  const siteName = site?.display_name ?? siteKey;

  if (loading && !site) return <DashboardSkeleton />;

  // Channel aggregation
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

  const funnelData = funnelRows.map((r) => ({
    date: r.date,
    sessions: r.sessions,
    engaged_sessions: r.engaged_sessions,
    form_start_sessions: r.form_start_sessions,
    converted_sessions: r.converted_sessions,
  }));

  const siteCmp = buildMultiSiteSeries(
    [{ site_key: siteKey, display_name: siteName }],
    [m30daily],
    [funnelRows],
  );
  const siteWeekly = buildWeeklyAvgVisitors(siteAllDaily, siteKey, siteName, "#059669");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trends</h1>
          <p className="mt-0.5 text-xs text-slate-400">{siteName}</p>
        </div>
        <Link href={`/site/${siteKey}`} className="text-sm text-emerald-700 underline">
          Overview
        </Link>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Human-only (bots excluded), UTC buckets. Country: {countryParam}.
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
