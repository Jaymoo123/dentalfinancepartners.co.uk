"use client";

/**
 * Estate leads explorer: one page for all sites. Flow-focused — frequencies,
 * consistency, size mix and a plain trailing-mean forecast. No £ values;
 * lead value is the partner's judgment, not ours. `tier` is used only as a
 * size bucket.
 *
 * Receives a flat serialisable lead array (a few hundred rows); all
 * aggregation is client-side and recomputed per selected scope.
 */
import * as React from "react";
import { useMemo, useState } from "react";

import { MultiSiteTrendChart } from "@/components/MultiSiteTrendChart";
import { CategoryBarChart } from "@/components/CategoryBarChart";
import type { SeriesMeta, MultiPoint } from "@/lib/multiSiteSeries";
import LeadAnalyticsTable, { type LeadRow } from "@/components/LeadAnalyticsTable";

export type ExplorerLead = LeadRow & { siteKey: string };

type Props = {
  leads: ExplorerLead[]; // newest first
  sites: { key: string; name: string }[]; // active sites, display order
  nowIso: string; // server clock, avoids hydration drift
};

const PALETTE = [
  "#059669", "#4f46e5", "#7c3aed", "#e11d48",
  "#d97706", "#0284c7", "#0d9488", "#c026d3",
];

const TIERS = ["very_high", "high", "medium", "low"] as const;

const DAY = 86400_000;

/** UTC Monday 00:00 of the week containing `ms`, as ISO date string. */
function weekStart(ms: number): string {
  return new Date(weekStartMs(ms)).toISOString().slice(0, 10);
}

function weekStartMs(ms: number): number {
  const d = new Date(ms);
  const dow = (d.getUTCDay() + 6) % 7;
  const midnight = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return midnight - dow * DAY;
}

function median(sorted: number[]): number {
  if (!sorted.length) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function mean(xs: number[]): number {
  return xs.length ? xs.reduce((a, v) => a + v, 0) / xs.length : 0;
}

/** Zero-filled weekly counts from the first lead's week to the current week. */
function weeklyCounts(dates: number[], nowMs: number): { week: string; count: number }[] {
  if (!dates.length) return [];
  const first = weekStartMs(Math.min(...dates));
  const last = weekStartMs(nowMs);
  const out: { week: string; count: number }[] = [];
  const byWeek = new Map<number, number>();
  for (const d of dates) {
    const w = weekStartMs(d);
    byWeek.set(w, (byWeek.get(w) ?? 0) + 1);
  }
  for (let w = first; w <= last; w += 7 * DAY) {
    out.push({ week: new Date(w).toISOString().slice(0, 10), count: byWeek.get(w) ?? 0 });
  }
  return out;
}

type FlowStats = {
  total: number;
  thisWeek: number;
  lastWeek: number;
  perWeek: number | null; // trailing 4 full-week mean
  medianGapDays: number | null;
  consistency: { label: string; cov: number } | null;
  forecast: { n: number; lo: number; hi: number } | null;
};

const SMALL_N = 8;

function flowStats(dates: number[], nowMs: number): FlowStats {
  const weeks = weeklyCounts(dates, nowMs);
  const full = weeks.slice(0, -1); // exclude current partial week from averages
  const thisWeek = weeks.length ? weeks[weeks.length - 1].count : 0;
  const lastWeek = full.length ? full[full.length - 1].count : 0;
  const base: FlowStats = {
    total: dates.length,
    thisWeek,
    lastWeek,
    perWeek: null,
    medianGapDays: null,
    consistency: null,
    forecast: null,
  };
  if (dates.length < SMALL_N) return base; // don't present noise as signal

  const last4 = full.slice(-4).map((w) => w.count);
  base.perWeek = last4.length ? mean(last4) : null;

  const sorted = [...dates].sort((a, b) => a - b);
  const gaps = sorted.slice(1).map((d, i) => (d - sorted[i]) / DAY);
  base.medianGapDays = gaps.length ? median([...gaps].sort((a, b) => a - b)) : null;

  const last12 = full.slice(-12).map((w) => w.count);
  const m = mean(last12);
  if (last12.length >= 4 && m > 0) {
    const sd = Math.sqrt(mean(last12.map((c) => (c - m) ** 2)));
    const cov = sd / m;
    base.consistency = {
      cov,
      label: cov < 0.5 ? "Steady" : cov < 1 ? "Variable" : "Sporadic",
    };
  }

  if (base.perWeek != null && full.length >= 4) {
    const last8 = full.slice(-8).map((w) => w.count);
    base.forecast = {
      n: Math.round(base.perWeek * 4),
      lo: Math.min(...last8) * 4,
      hi: Math.max(...last8) * 4,
    };
  }
  return base;
}

function mix(items: (string | null)[]): { name: string; value: number }[] {
  const map = new Map<string, number>();
  for (const it of items) {
    const key = (it ?? "unknown").replace("_", " ");
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-900">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-400">{sub}</div>}
    </div>
  );
}

export default function LeadsExplorer({ leads, sites, nowIso }: Props) {
  const [scope, setScope] = useState<string | null>(null); // null = all sites
  const nowMs = useMemo(() => new Date(nowIso).getTime(), [nowIso]);

  const scoped = scope ? leads.filter((l) => l.siteKey === scope) : leads;
  const dates = useMemo(
    () => scoped.map((l) => new Date(l.date).getTime()),
    [scoped],
  );
  const stats = useMemo(() => flowStats(dates, nowMs), [dates, nowMs]);

  // Weekly multi-site chart data (always estate-wide axis; scoped = one line).
  const chart = useMemo(() => {
    const chartSites = (scope ? sites.filter((s) => s.key === scope) : sites).filter((s) =>
      leads.some((l) => l.siteKey === s.key),
    );
    const series: SeriesMeta[] = chartSites.map((s, i) => ({
      key: s.key,
      label: s.name,
      color: PALETTE[(scope ? sites.findIndex((x) => x.key === s.key) : i) % PALETTE.length],
    }));
    const relevant = scope ? scoped : leads;
    if (!relevant.length) return { series, data: [] as MultiPoint[] };
    const all = weeklyCounts(relevant.map((l) => new Date(l.date).getTime()), nowMs);
    const rows: MultiPoint[] = all.map(({ week }) => ({ bucket: week }));
    const idx = new Map(rows.map((r, i) => [r.bucket as string, i]));
    for (const s of chartSites) {
      for (const r of rows) r[s.key] = 0;
      for (const l of leads) {
        if (l.siteKey !== s.key) continue;
        const i = idx.get(weekStart(new Date(l.date).getTime()));
        if (i != null) rows[i][s.key] = (rows[i][s.key] as number) + 1;
      }
    }
    return { series, data: rows };
  }, [leads, scoped, scope, sites, nowMs]);

  // Per-site stats table (all-sites view only).
  const perSite = useMemo(
    () =>
      sites
        .map((s) => {
          const siteLeads = leads.filter((l) => l.siteKey === s.key);
          const st = flowStats(siteLeads.map((l) => new Date(l.date).getTime()), nowMs);
          const tierCounts = TIERS.map(
            (t) => siteLeads.filter((l) => l.tier === t).length,
          );
          const last4wk = siteLeads.filter(
            (l) => new Date(l.date).getTime() >= nowMs - 28 * DAY,
          ).length;
          const lastLead = siteLeads.length ? siteLeads[0].date.slice(0, 10) : null;
          return { site: s, stats: st, tierCounts, last4wk, lastLead };
        })
        .filter((r) => r.stats.total > 0)
        .sort((a, b) => b.stats.total - a.stats.total),
    [leads, sites, nowMs],
  );

  const fmt1 = (v: number) => (Math.round(v * 10) / 10).toLocaleString("en-GB");
  const dash = "—";
  const activeSite = sites.find((s) => s.key === scope);

  return (
    <div>
      {/* Scope tabs */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {[{ key: null as string | null, name: "All sites" }, ...perSite.map((r) => ({ key: r.site.key as string | null, name: r.site.name }))].map(
          (t) => (
            <button
              key={t.key ?? "all"}
              type="button"
              onClick={() => setScope(t.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                scope === t.key
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {t.name}
            </button>
          ),
        )}
      </div>

      {/* Flow KPIs */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Kpi
          label="Total leads"
          value={String(stats.total)}
          sub={activeSite ? activeSite.name : "all sites, all time"}
        />
        <Kpi
          label="This week"
          value={String(stats.thisWeek)}
          sub={`last week ${stats.lastWeek}`}
        />
        <Kpi
          label="Leads / week"
          value={stats.perWeek != null ? fmt1(stats.perWeek) : dash}
          sub="trailing 4 full weeks"
        />
        <Kpi
          label="Median gap"
          value={stats.medianGapDays != null ? `${fmt1(stats.medianGapDays)}d` : dash}
          sub="days between leads"
        />
        <Kpi
          label="Consistency"
          value={stats.consistency ? stats.consistency.label : dash}
          sub={
            stats.consistency
              ? `weekly variation ${Math.round(stats.consistency.cov * 100)}%`
              : stats.total < SMALL_N
                ? "too few leads to call"
                : "needs more weeks"
          }
        />
      </div>

      {/* Forecast — one honest sentence, no model */}
      <p className="mt-3 text-sm text-slate-600">
        {stats.forecast ? (
          <>
            <span className="font-semibold text-slate-900">Next 4 weeks:</span> ~
            {stats.forecast.n} leads expected (range {stats.forecast.lo}–{stats.forecast.hi},
            from the last 8 weeks&apos; spread), if recent flow holds.
          </>
        ) : (
          <span className="text-slate-400">
            Forecast appears once there are {SMALL_N}+ leads and 4+ full weeks of history.
          </span>
        )}
      </p>

      {/* Weekly flow chart */}
      <div className="mt-6">
        <MultiSiteTrendChart
          data={chart.data}
          series={chart.series}
          label="Leads per week"
          note="Week starting Monday (UTC). The latest week is partial."
        />
      </div>

      {/* Per-site table */}
      {!scope && (
        <>
          <h2 className="mt-8 text-lg font-bold text-slate-900">By site</h2>
          <p className="mt-1 text-xs text-slate-500">
            Click a row to focus. Rate, gap and consistency show {dash} under {SMALL_N} leads —
            not enough signal. Size mix is very high · high · medium · low.
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-2">Site</th>
                  <th className="px-3 py-2 text-right">Total</th>
                  <th className="px-3 py-2 text-right">Last 4wk</th>
                  <th className="px-3 py-2 text-right">Leads/wk</th>
                  <th className="px-3 py-2 text-right">Median gap</th>
                  <th className="px-3 py-2">Consistency</th>
                  <th className="px-3 py-2">Size mix</th>
                  <th className="px-3 py-2 text-right">Last lead</th>
                </tr>
              </thead>
              <tbody>
                {perSite.map((r) => (
                  <tr
                    key={r.site.key}
                    className="cursor-pointer border-t border-slate-100 hover:bg-slate-50"
                    onClick={() => setScope(r.site.key)}
                  >
                    <td className="px-3 py-2 font-medium text-emerald-700">{r.site.name}</td>
                    <td className="px-3 py-2 text-right font-mono tabular-nums">{r.stats.total}</td>
                    <td className="px-3 py-2 text-right font-mono tabular-nums">{r.last4wk}</td>
                    <td className="px-3 py-2 text-right font-mono tabular-nums">
                      {r.stats.perWeek != null ? fmt1(r.stats.perWeek) : dash}
                    </td>
                    <td className="px-3 py-2 text-right font-mono tabular-nums">
                      {r.stats.medianGapDays != null ? `${fmt1(r.stats.medianGapDays)}d` : dash}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-500">
                      {r.stats.consistency?.label ?? dash}
                    </td>
                    <td className="px-3 py-2 font-mono text-xs tabular-nums text-slate-500">
                      {r.tierCounts.join(" · ")}
                    </td>
                    <td className="px-3 py-2 text-right text-xs text-slate-400">{r.lastLead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Mixes */}
      <h2 className="mt-8 text-lg font-bold text-slate-900">What comes through</h2>
      <p className="mt-1 text-xs text-slate-500">
        Groupings across {scope ? activeSite?.name : "the estate"}, all time. Size uses the
        scored tier as a bucket — how big the enquiry looks, not a revenue estimate.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <CategoryBarChart label="By size bucket" data={mix(scoped.map((l) => l.tier))} color="#e11d48" />
        <CategoryBarChart label="By self-selected role" data={mix(scoped.map((l) => l.role || null))} color="#4f46e5" />
        <CategoryBarChart label="By enquiry intent" data={mix(scoped.map((l) => l.intent))} color="#059669" />
        <CategoryBarChart label="By capture channel" data={mix(scoped.map((l) => l.channel))} color="#d97706" />
      </div>

      {/* Lead list */}
      <h2 className="mt-8 text-lg font-bold text-slate-900">All leads</h2>
      <div className="mt-3">
        <LeadAnalyticsTable rows={scoped} />
      </div>
    </div>
  );
}
