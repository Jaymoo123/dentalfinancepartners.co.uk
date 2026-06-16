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
import { getTimeseries } from "@accounting-network/web-shared/console/adminData";
import { getSitesRegistry } from "@accounting-network/web-shared/console/estateData";
import { TrendChart } from "@/components/TrendChart";
import { WeeklyOverlayChart } from "@/components/WeeklyOverlayChart";
import { checkAuth } from "@/lib/checkAuth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

const isoOf = (d: Date) => d.toISOString();

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

  const [q15, h24hourly, w7hourly, w7daily, m30daily, m30hourly] = await Promise.all([
    getTimeseries(siteKey, "15 minutes", isoOf(h24), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 hour", isoOf(h24), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 hour", isoOf(d7), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 day", isoOf(d7), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 day", isoOf(d30), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 hour", isoOf(d30), isoOf(now), countryFilter),
  ]);

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
    </div>
  );
}
