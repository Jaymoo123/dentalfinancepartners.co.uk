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
import { Sparkline } from "@accounting-network/web-shared/console/components/Sparkline";
import { TrendChart } from "@/components/TrendChart";
import { WeeklyOverlayChart } from "@/components/WeeklyOverlayChart";
import { CategoryBarChart } from "@/components/CategoryBarChart";
import {
  getSitesRegistry,
  getEstateOverview,
  getEstateFunnel,
  getEstateChannels,
  getEstateErrors,
  getEstateLatestLeads,
  getEstateKpis,
  getEstateTimeseries,
  type SiteKpis,
} from "@accounting-network/web-shared/console/estateData";
import { checkAuth } from "@/lib/checkAuth";
import SiteSwitcher from "@/components/SiteSwitcher";

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

// ── Page ───────────────────────────────────────────────────────────────────

export default async function EstatePage() {
  const authed = await checkAuth();
  if (!authed) redirect("/login");

  const now = new Date();
  const [sites, overview, funnel, channels, errors, leads, kpi7, kpiAll, estate30d] =
    await Promise.all([
      getSitesRegistry(),
      getEstateOverview(7),
      getEstateFunnel(28),
      getEstateChannels(28),
      getEstateErrors(),
      getEstateLatestLeads(30),
      getEstateKpis(new Date(now.getTime() - 7 * 86400_000).toISOString(), now.toISOString()),
      getEstateKpis(new Date("2000-01-01").toISOString(), now.toISOString()),
      getEstateTimeseries("1 day", new Date(now.getTime() - 30 * 86400_000).toISOString(), now.toISOString()),
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

  const funnelRate = (num: number, den: number) =>
    den > 0 ? `${((num / den) * 100).toFixed(0)}%` : "-";

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
          <SiteSwitcher sites={sites} activeSiteKey={null} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Estate KPI strip — last 7 days */}
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Last 7 days
        </h2>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
          <SnapshotCard
            label="Sessions"
            value={t7.sessions.toLocaleString("en-GB")}
            accent="sky"
            compact
          />
          <SnapshotCard
            label="Visitors"
            value={t7.humans.toLocaleString("en-GB")}
            sub={`${t7.new_humans.toLocaleString("en-GB")} new`}
            accent="emerald"
            compact
          />
          <SnapshotCard
            label="Leads (UK)"
            value={String(t7.leads_uk)}
            accent="emerald"
            compact
          />
          <SnapshotCard
            label="Leads (all)"
            value={String(t7.leads_all)}
            accent="emerald"
            compact
          />
          <SnapshotCard
            label="Conv / session"
            value={pct(t7.sessions > 0 ? t7.leads_uk / t7.sessions : null)}
            accent="emerald"
            compact
          />
          <SnapshotCard
            label="Conv / visitor"
            value={pct(t7.humans > 0 ? t7.converted_humans / t7.humans : null)}
            sub={`${t7.converted_humans} of ${t7.humans}`}
            accent="emerald"
            compact
          />
        </div>

        {/* Estate KPI strip — all time */}
        <h2 className="mb-2 mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          All time
        </h2>
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
          <SnapshotCard
            label="Sessions"
            value={tAll.sessions.toLocaleString("en-GB")}
            accent="sky"
            compact
          />
          <SnapshotCard
            label="Visitors"
            value={tAll.humans.toLocaleString("en-GB")}
            accent="emerald"
            compact
          />
          <SnapshotCard
            label="Leads (UK)"
            value={String(tAll.leads_uk)}
            accent="emerald"
            compact
          />
          <SnapshotCard
            label="Leads (all)"
            value={String(tAll.leads_all)}
            accent="emerald"
            compact
          />
          <SnapshotCard
            label="Conv / session"
            value={pct(tAll.sessions > 0 ? tAll.leads_uk / tAll.sessions : null)}
            accent="emerald"
            compact
          />
          <SnapshotCard
            label="Conv / visitor"
            value={pct(tAll.humans > 0 ? tAll.converted_humans / tAll.humans : null)}
            sub={`${tAll.converted_humans} of ${tAll.humans}`}
            accent="emerald"
            compact
          />
        </div>

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
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <TrendChart data={estate30d} metric="sessions" label="Sessions · daily" formatType="day" />
          <TrendChart data={estate30d} metric="humans" label="Visitors · daily" formatType="day" />
          <TrendChart data={estate30d} metric="leads" label="Leads · daily" formatType="day" />
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <WeeklyOverlayChart data={estate30d} metric="sessions" label="Sessions by weekday (4 weeks)" />
          <WeeklyOverlayChart data={estate30d} metric="humans" label="Visitors by weekday (4 weeks)" />
          <WeeklyOverlayChart data={estate30d} metric="leads" label="Leads by weekday (4 weeks)" />
        </div>
        <div className="mt-3">
          <CategoryBarChart label="Leads by site (all time)" data={leadsBySite} color="#059669" valueLabel="Leads" />
        </div>

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

        {/* Estate funnel (28 days) */}
        <h2 className="mt-10 text-lg font-bold text-slate-900">Estate funnel (28 days)</h2>
        <p className="mt-1 text-xs text-slate-500">
          All sites combined. Stages are sequential subsets.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <tbody>
              {[
                { label: "Sessions", n: funnel.sessions, denom: funnel.sessions, denomLabel: "" },
                { label: "Engaged", n: funnel.engaged_sessions, denom: funnel.sessions, denomLabel: "of sessions" },
                { label: "Used calculator", n: funnel.calc_sessions, denom: funnel.engaged_sessions, denomLabel: "of engaged", branch: true },
                { label: "Clicked form CTA", n: funnel.form_cta_sessions, denom: funnel.engaged_sessions, denomLabel: "of engaged" },
                { label: "Started form", n: funnel.form_start_sessions, denom: funnel.form_cta_sessions, denomLabel: "of form-CTA" },
                { label: "Submitted", n: funnel.converted_sessions, denom: funnel.form_start_sessions, denomLabel: "of form starts" },
              ].map((row) => {
                const barPct = funnel.sessions > 0 ? (row.n / funnel.sessions) * 100 : 0;
                return (
                  <tr
                    key={row.label}
                    className={`border-b border-slate-100 last:border-0 ${row.branch ? "bg-slate-50/60" : ""}`}
                  >
                    <td
                      className={`px-4 py-2.5 ${row.branch ? "pl-6 font-normal text-slate-500 sm:pl-8" : "font-semibold text-slate-800"}`}
                    >
                      {row.label}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-900">
                      {row.n.toLocaleString("en-GB")}
                    </td>
                    <td className="hidden w-1/3 px-4 py-2.5 sm:table-cell">
                      <div className="h-2 rounded bg-slate-100">
                        <div
                          className={`h-2 rounded ${row.branch ? "bg-sky-400" : "bg-emerald-500"}`}
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs text-slate-500">
                      {row.denomLabel ? `${funnelRate(row.n, row.denom)} ${row.denomLabel}` : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
            <h2 className="text-lg font-bold text-slate-900">Latest leads (all sites)</h2>
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
