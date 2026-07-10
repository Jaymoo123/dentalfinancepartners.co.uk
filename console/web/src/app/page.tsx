/**
 * Estate overview -- the home page of the unified console.
 *
 * Cookie-gated (OB-01). Never indexed (noindex meta + X-Robots-Tag header).
 *
 * Layout:
 *   1. Per-site comparison strip: sessions, humans, leads, conversion, 7d sparkline
 *   2. Estate funnel totals (28-day)
 *   3. Channel comparison across sites (best channel per site)
 *   4. Latest leads across all sites (site-tagged)
 *   5. Error groups across sites
 *
 * RSC BOUNDARY: SnapshotCard and Sparkline are server-renderable; all
 * interactive components (SiteSwitcher) are leaf-level client components
 * that receive only serialisable props.
 */
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import { SnapshotCard } from "@accounting-network/web-shared/console/components/SnapshotCard";
import KpiWindowCarousel, {
  type KpiPage,
} from "@accounting-network/web-shared/console/components/KpiWindowCarousel";
import { Sparkline } from "@accounting-network/web-shared/console/components/Sparkline";
import DeferredMount from "@accounting-network/web-shared/console/components/DeferredMount";
import { TrendChart } from "@/components/TrendChart";
import { WeeklyOverlayChart } from "@/components/WeeklyOverlayChart";
import { CategoryBarChart } from "@/components/CategoryBarChart";
import {
  getSitesRegistry,
  getEstateOverview,
  getEstateChannels,
  getEstateErrors,
  getEstateLatestLeads,
  getEstateKpis,
  getEstateTimeseries,
  type SiteKpis,
} from "@accounting-network/web-shared/console/estateData";
import { getTimeseries, getFunnelDaily } from "@accounting-network/web-shared/console/adminData";
import { MultiSiteTrendChart } from "@/components/MultiSiteTrendChart";
import { buildMultiSiteSeries, buildWeeklyAvgVisitors } from "@/lib/multiSiteSeries";
import { checkAuth } from "@/lib/checkAuth";
import SiteSwitcher from "@/components/SiteSwitcher";
import ConversionFunnel, { type FunnelTotals } from "@/components/ConversionFunnel";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

// ── Helpers ────────────────────────────────────────────────────────────────

function pct(n: number | null | undefined): string {
  return n == null ? "-" : `${(n * 100).toFixed(1)}%`;
}

function ago(iso: string): string {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

const CHANNEL_LABEL: Record<string, string> = {
  ai: "AI engines",
  search: "Search",
  social: "Social",
  internal: "Returning",
  referral: "Referral",
  direct: "Direct",
};

type EstateTotals = {
  sessions: number;
  humans: number;
  new_humans: number;
  converted_humans: number;
  leads_all: number;
  leads_uk: number;
};

/** Estate-total KPIs for one window, each card tagged with the window label. */
function EstateKpiGrid({ t, windowLabel }: { t: EstateTotals; windowLabel: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <SnapshotCard label="Sessions" value={t.sessions.toLocaleString("en-GB")} accent="sky" compact tag={windowLabel} />
      <SnapshotCard label="Visitors" value={t.humans.toLocaleString("en-GB")} sub={`${t.new_humans.toLocaleString("en-GB")} new`} accent="emerald" compact tag={windowLabel} />
      <SnapshotCard label="Leads (UK)" value={String(t.leads_uk)} accent="emerald" compact tag={windowLabel} />
      <SnapshotCard label="Leads (all)" value={String(t.leads_all)} accent="emerald" compact tag={windowLabel} />
      <SnapshotCard label="Conv / session" value={`${pct(t.sessions > 0 ? t.leads_uk / t.sessions : null)} / ${pct(t.sessions > 0 ? t.leads_all / t.sessions : null)}`} sub="UK / all" accent="emerald" compact tag={windowLabel} />
      <SnapshotCard label="Conv / visitor" value={pct(t.humans > 0 ? t.converted_humans / t.humans : null)} sub={`${t.converted_humans} of ${t.humans}`} accent="emerald" compact tag={windowLabel} />
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function EstatePage() {
  const authed = await checkAuth();
  if (!authed) redirect("/login");

  const now = new Date();
  const startOfTodayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const [sites, overview, channels, errors, leads, kpi7, kpiAll, estate30d, kpiToday, kpi30, estateAllDaily] =
    await Promise.all([
      getSitesRegistry(),
      getEstateOverview(7),
      getEstateChannels(28),
      getEstateErrors(),
      getEstateLatestLeads(30),
      getEstateKpis(new Date(now.getTime() - 7 * 86400_000).toISOString(), now.toISOString()),
      getEstateKpis(new Date("2000-01-01").toISOString(), now.toISOString()),
      getEstateTimeseries("1 day", new Date(now.getTime() - 30 * 86400_000).toISOString(), now.toISOString()),
      getEstateKpis(startOfTodayUTC.toISOString(), now.toISOString()),
      getEstateKpis(new Date(now.getTime() - 30 * 86400_000).toISOString(), now.toISOString()),
      getEstateTimeseries("1 day", new Date("2000-01-01").toISOString(), now.toISOString()),
    ]);

  // KPI reducer: sum SiteKpis[] into estate totals
  function sumKpis(rows: SiteKpis[]) {
    return rows.reduce(
      (acc, r) => ({
        sessions: acc.sessions + r.sessions,
        humans: acc.humans + r.humans,
        new_humans: acc.new_humans + r.new_humans,
        converted_humans: acc.converted_humans + r.converted_humans,
        leads_all: acc.leads_all + r.leads_all,
        leads_uk: acc.leads_uk + r.leads_uk,
      }),
      { sessions: 0, humans: 0, new_humans: 0, converted_humans: 0, leads_all: 0, leads_uk: 0 },
    );
  }
  const t7 = sumKpis(kpi7);
  const tAll = sumKpis(kpiAll);
  const tToday = sumKpis(kpiToday);
  const t30 = sumKpis(kpi30);

  // Estate KPI windows for the carousel (most granular -> widest).
  const estateKpiPages: KpiPage[] = [
    { key: "daily", label: "Daily", meta: "Today (since 00:00 UTC)", node: <EstateKpiGrid t={tToday} windowLabel="Daily" /> },
    { key: "weekly", label: "Weekly", meta: "Last 7 days", node: <EstateKpiGrid t={t7} windowLabel="Weekly" /> },
    { key: "monthly", label: "Monthly", meta: "Last 30 days", node: <EstateKpiGrid t={t30} windowLabel="Monthly" /> },
    { key: "all", label: "All time", meta: "All time", node: <EstateKpiGrid t={tAll} windowLabel="All time" /> },
  ];

  // Build per-site channel index (best channel by sessions per site)
  const bestChannelBySite = new Map<string, { channel: string; cr: number | null }>();
  for (const ch of channels) {
    const cur = bestChannelBySite.get(ch.site_key);
    if (!cur || (ch.sessions > 0 && (cur.cr ?? 0) < (ch.conversion_rate ?? 0))) {
      bestChannelBySite.set(ch.site_key, {
        channel: ch.channel,
        cr: ch.conversion_rate,
      });
    }
  }

  // JS error total for the (de-emphasised) errors card
  const totalErrors = errors.reduce((a, e) => a + e.total_errors, 0);

  // Per-site humans map (from 7d KPI data)
  const kpiBySite = new Map(kpi7.map((r) => [r.site_key, r]));

  // Leads by site (all time) for the estate bar chart.
  const kpiAllBySite = new Map(kpiAll.map((r) => [r.site_key, r]));
  const leadsBySite = sites
    .filter((s) => s.active)
    .map((s) => ({ name: s.display_name, value: kpiAllBySite.get(s.site_key)?.leads_all ?? 0 }))
    .sort((a, b) => b.value - a.value);

  // Per-site daily series (30 days) for the estate comparison overlay.
  const cmpFrom = new Date(now.getTime() - 30 * 86400_000).toISOString();
  const activeSites = sites.filter((s) => s.active);
  const [perSiteSeries, perSiteFunnel] = await Promise.all([
    Promise.all(activeSites.map((s) => getTimeseries(s.site_key, "1 day", cmpFrom, now.toISOString(), "GB"))),
    Promise.all(activeSites.map((s) => getFunnelDaily(s.site_key, "GB"))),
  ]);
  const cmp = buildMultiSiteSeries(activeSites, perSiteSeries, perSiteFunnel);

  // Estate conversion funnel, windowed: aggregate the per-site daily funnel rows
  // (already fetched above for the comparison overlay, GB) across sites by date,
  // then bucket into the same Daily/Weekly/Monthly/All-time windows as the KPIs.
  const estFunnelByDate = new Map<string, FunnelTotals & { date: string }>();
  for (const siteRows of perSiteFunnel) {
    for (const d of siteRows) {
      const e =
        estFunnelByDate.get(d.date) ??
        { date: d.date, sessions: 0, engaged: 0, calc: 0, formCta: 0, form: 0, converted: 0 };
      e.sessions += d.sessions;
      e.engaged += d.engaged_sessions;
      e.calc += d.calc_sessions;
      e.formCta += d.form_cta_sessions;
      e.form += d.form_start_sessions;
      e.converted += d.converted_sessions;
      estFunnelByDate.set(d.date, e);
    }
  }
  const estFunnelDaily = [...estFunnelByDate.values()];
  const sumEstateFunnel = (fromMs: number): FunnelTotals => {
    const since = new Date(fromMs).toISOString().slice(0, 10);
    return estFunnelDaily.reduce(
      (a, d) =>
        d.date >= since
          ? {
              sessions: a.sessions + d.sessions,
              engaged: a.engaged + d.engaged,
              calc: a.calc + d.calc,
              formCta: a.formCta + d.formCta,
              form: a.form + d.form,
              converted: a.converted + d.converted,
            }
          : a,
      { sessions: 0, engaged: 0, calc: 0, formCta: 0, form: 0, converted: 0 },
    );
  };
  const estFrom7 = new Date(now.getTime() - 7 * 86400_000);
  const estFrom30 = new Date(now.getTime() - 30 * 86400_000);
  const estAllFrom = new Date("2000-01-01");
  const estateFunnelPages: KpiPage[] = [
    { key: "today", label: "Daily", meta: "Today (since 00:00 UTC)", node: <ConversionFunnel totals={sumEstateFunnel(startOfTodayUTC.getTime())} /> },
    { key: "d7", label: "Weekly", meta: "Last 7 days", node: <ConversionFunnel totals={sumEstateFunnel(estFrom7.getTime())} /> },
    { key: "d30", label: "Monthly", meta: "Last 30 days", node: <ConversionFunnel totals={sumEstateFunnel(estFrom30.getTime())} /> },
    { key: "all", label: "All time", meta: "All time", node: <ConversionFunnel totals={sumEstateFunnel(estAllFrom.getTime())} /> },
  ];

  // Weekly average daily visitors, all-time (estate total).
  const estateWeekly = buildWeeklyAvgVisitors(estateAllDaily, "estate", "Estate", "#059669");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Chrome */}
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900">Estate console</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              {sites.filter((s) => s.active).length} sites
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/leads" className="shrink-0 text-xs font-semibold text-emerald-700 underline">
              Leads
            </Link>
            <SiteSwitcher sites={sites} activeSiteKey={null} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Estate KPI windows — swipe Daily -> Weekly -> Monthly -> All time */}
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Estate KPIs
        </h2>
        <KpiWindowCarousel
          pages={estateKpiPages}
          caption="GB visitors · all-country leads · windows in UTC"
        />

        {/* JS errors — de-emphasised standalone card */}
        <div className="mt-3 max-w-xs">
          <SnapshotCard
            label="JS errors (total)"
            value={String(totalErrors)}
            accent="rose"
            status={totalErrors > 0 ? "warn" : "ok"}
            compact
          />
        </div>

        {/* Estate trends */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">Estate trends (last 30 days)</h2>
        <p className="mt-1 text-xs text-slate-500">
          All sites combined. Sessions and visitors are GB-scoped; leads count all countries.
        </p>
        <DeferredMount>
          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            <TrendChart data={estate30d} metric="sessions" label="Sessions · daily" formatType="day" />
            <TrendChart data={estate30d} metric="humans" label="Visitors · daily" formatType="day" />
            <TrendChart data={estate30d} metric="leads" label="Leads · daily" formatType="day" />
          </div>
        </DeferredMount>
        <DeferredMount>
          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            <WeeklyOverlayChart data={estate30d} metric="sessions" label="Sessions by weekday (4 weeks)" />
            <WeeklyOverlayChart data={estate30d} metric="humans" label="Visitors by weekday (4 weeks)" />
            <WeeklyOverlayChart data={estate30d} metric="leads" label="Leads by weekday (4 weeks)" />
          </div>
        </DeferredMount>
        <DeferredMount minHeight={320}>
          <div className="mt-3">
            <CategoryBarChart label="Leads by site (all time)" data={leadsBySite} color="#059669" valueLabel="Leads" />
          </div>
        </DeferredMount>

        {/* Site comparison — one line per site */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">Site comparison (last 30 days)</h2>
        <p className="mt-1 text-xs text-slate-500">
          One line per site. Sessions and visitors are GB-scoped; conversion is a 7-day rolling
          lead conversion rate (converted sessions / sessions).
        </p>
        <DeferredMount>
          <div className="mt-3 grid gap-3 lg:grid-cols-3">
            <MultiSiteTrendChart data={cmp.sessions} series={cmp.series} label="Daily sessions" />
            <MultiSiteTrendChart data={cmp.visitors} series={cmp.series} label="Daily visitors" />
            <MultiSiteTrendChart
              data={cmp.conversion}
              series={cmp.series}
              label="Lead conversion rate"
              asPercent
              note="converted sessions / sessions, 7-day rolling"
            />
          </div>
        </DeferredMount>

        {/* Visitor trend — weekly average daily visitors, all time */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">Visitor trend (weekly average)</h2>
        <p className="mt-1 text-xs text-slate-500">
          Each point is one week; the value is that week&apos;s average visitors per day. All time, GB-scoped — a new point lands every week.
        </p>
        <DeferredMount>
          <div className="mt-3 max-w-2xl">
            <MultiSiteTrendChart
              data={estateWeekly.points}
              series={estateWeekly.series}
              label="Avg daily visitors · per week"
              note="all time"
            />
          </div>
        </DeferredMount>

        {/* Per-site comparison strip */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">Sites (last 7 days)</h2>
        <p className="mt-1 text-xs text-slate-500">
          One row per active site (UK / GB audience). Sessions, visitors and conversion are GB-scoped; leads counts all countries.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-2 py-2.5 sm:px-4">Site</th>
                <th className="px-2 py-2.5 text-right sm:px-4">Sessions</th>
                <th className="px-2 py-2.5 text-right sm:px-4">Visitors</th>
                <th className="px-2 py-2.5 text-right sm:px-4">Leads</th>
                <th className="px-2 py-2.5 text-right sm:px-4">Conv.</th>
                <th className="hidden px-4 py-2.5 lg:table-cell">7d trend</th>
              </tr>
            </thead>
            <tbody>
              {sites
                .filter((s) => s.active)
                .map((site) => {
                  const row = overview.find((r) => r.site_key === site.site_key);
                  const k = kpiBySite.get(site.site_key);
                  const sparkValues = row?.sessions_7d ?? [0, 0, 0, 0, 0, 0, 0];
                  const convRate = k && k.humans > 0 ? k.converted_humans / k.humans : null;
                  const hasData = !!k && k.sessions > 0;
                  return (
                    <tr
                      key={site.site_key}
                      className="border-t border-slate-100 hover:bg-slate-50/50"
                    >
                      <td className="min-w-[160px] px-2 py-3 sm:px-4">
                        <Link
                          href={`/site/${site.site_key}`}
                          className="font-semibold text-slate-900 hover:underline whitespace-nowrap"
                        >
                          {site.display_name}
                        </Link>
                        <div className="text-[11px] text-slate-400">{site.site_key}</div>
                      </td>
                      <td className="px-2 py-3 text-right font-mono text-slate-700 sm:px-4">
                        {k ? k.sessions.toLocaleString("en-GB") : "-"}
                      </td>
                      <td className="px-2 py-3 text-right font-mono text-slate-500 sm:px-4">
                        {k ? k.humans.toLocaleString("en-GB") : "-"}
                      </td>
                      <td className="px-2 py-3 text-right font-mono text-emerald-700 sm:px-4">
                        {k ? k.leads_all : "-"}
                      </td>
                      <td className="px-2 py-3 text-right sm:px-4">
                        <span className={hasData && (convRate ?? 0) > 0.02 ? "font-semibold text-emerald-700" : "text-slate-500"}>
                          {k ? pct(convRate) : "-"}
                        </span>
                      </td>
                      <td className="hidden w-32 px-4 py-3 lg:table-cell">
                        <div className="text-sky-500">
                          <Sparkline values={sparkValues} height={24} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {sites.filter((s) => s.active).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-slate-400">
                    No active sites registered.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Estate conversion funnel — swipe Daily -> Weekly -> Monthly -> All time */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">Estate funnel</h2>
        <p className="mt-1 text-xs text-slate-500">
          All sites combined (GB). Stages are sequential session subsets.
        </p>
        <div className="mt-3">
          <KpiWindowCarousel pages={estateFunnelPages} caption="GB sessions · windows in UTC" />
        </div>

        {/* Channel comparison */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">Best-converting channel per site</h2>
        <p className="mt-1 text-xs text-slate-500">
          Highest-converting channel for each site (all-time from vw_channel_conversion_geo).
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Site</th>
                <th className="px-4 py-2.5">Best channel</th>
                <th className="px-4 py-2.5 text-right">Sessions</th>
                <th className="px-4 py-2.5 text-right">Leads</th>
                <th className="px-4 py-2.5 text-right">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {sites
                .filter((s) => s.active)
                .map((site) => {
                  const bestCh = bestChannelBySite.get(site.site_key);
                  const chData = channels.find(
                    (c) => c.site_key === site.site_key && c.channel === bestCh?.channel,
                  );
                  return (
                    <tr key={site.site_key} className="border-t border-slate-100">
                      <td className="whitespace-nowrap min-w-[160px] px-4 py-2.5 font-medium text-slate-800">
                        <Link href={`/site/${site.site_key}`} className="hover:underline">
                          {site.display_name}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">
                        {bestCh ? (CHANNEL_LABEL[bestCh.channel] ?? bestCh.channel) : "-"}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono">
                        {chData ? chData.sessions : "-"}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-emerald-700">
                        {chData ? chData.leads : "-"}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {chData ? pct(chData.conversion_rate) : "-"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Latest leads */}
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">Latest leads (all sites)</h2>
              <Link href="/leads" className="text-xs text-emerald-700 underline">
                View all →
              </Link>
            </div>
            <p className="mt-1 text-xs text-slate-500">Most recent 30 across the estate.</p>
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Name / email</th>
                    <th className="px-3 py-2">Site</th>
                    <th className="px-3 py-2 text-right">When</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-3 py-4 text-center text-slate-400">
                        No leads yet.
                      </td>
                    </tr>
                  ) : (
                    leads.map((l) => (
                      <tr key={l.id} className="border-t border-slate-100">
                        <td className="px-3 py-2">
                          <div className="font-medium text-slate-800">
                            {l.full_name || l.email || "Anonymous"}
                          </div>
                          {l.full_name && l.email && (
                            <div className="text-[11px] text-slate-400">{l.email}</div>
                          )}
                        </td>
                        <td className="px-3 py-2">
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                            {l.site_key}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right text-xs text-slate-500">
                          {ago(l.created_at)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Error summary */}
          <div>
            <h2 className="text-lg font-bold text-slate-900">Errors (all sites)</h2>
            <p className="mt-1 text-xs text-slate-500">
              JS error totals per site from vw_client_errors.
            </p>
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Site</th>
                    <th className="px-3 py-2 text-right">Errors</th>
                    <th className="px-3 py-2 text-right">Sessions</th>
                    <th className="hidden px-3 py-2 text-right sm:table-cell">Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {errors.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-4 text-center text-slate-400">
                        No errors logged.
                      </td>
                    </tr>
                  ) : (
                    errors.map((e) => (
                      <tr key={e.site_key} className={`border-t border-slate-100 ${e.total_errors > 0 ? "bg-rose-50/30" : ""}`}>
                        <td className="px-3 py-2 font-medium text-slate-800">
                          <Link href={`/site/${e.site_key}`} className="hover:underline whitespace-nowrap">
                            {sites.find((s) => s.site_key === e.site_key)?.display_name ?? e.site_key}
                          </Link>
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-rose-700">
                          {e.total_errors}
                        </td>
                        <td className="px-3 py-2 text-right font-mono text-slate-500">
                          {e.total_sessions}
                        </td>
                        <td className="hidden px-3 py-2 text-right text-xs text-slate-400 sm:table-cell">
                          {e.last_seen ? ago(e.last_seen) : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
