/**
 * Per-site lead analytics: value/quality/intent scoring for every lead.
 * Cookie-gated, never indexed.
 *
 * Values come from lead_value_scores (Claude-scored, one row per lead) and
 * are "est. first-year fee if won" — no conversion discount applied. Leads
 * without a score row show as unscored. All aggregation happens here on the
 * server; charts/table receive serialisable arrays only.
 */
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import {
  getLeadsForSite,
  getLeadValueScores,
  type LeadInfo,
  type LeadValueScore,
} from "@accounting-network/web-shared/console/adminData";
import { getSitesRegistry } from "@accounting-network/web-shared/console/estateData";
import DeferredMount from "@accounting-network/web-shared/console/components/DeferredMount";
import {
  ValueHistogram,
  RoleStripChart,
  MonthlyTrendChart,
} from "@/components/LeadAnalyticsCharts";
import LeadAnalyticsTable, { type LeadRow } from "@/components/LeadAnalyticsTable";
import { checkAuth } from "@/lib/checkAuth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

const gbp = (v: number) => `£${Math.round(v).toLocaleString("en-GB")}`;

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-900">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-400">{sub}</div>}
    </div>
  );
}

function BreakdownCard({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; count: number; total: number; mean: number }[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <table className="mt-2 w-full text-xs">
        <thead className="text-left uppercase tracking-wider text-slate-400">
          <tr>
            <th className="py-1"> </th>
            <th className="py-1 text-right">n</th>
            <th className="py-1 text-right">Total</th>
            <th className="py-1 text-right">Mean</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-slate-100">
              <td className="py-1.5 text-slate-700">{r.name}</td>
              <td className="py-1.5 text-right font-mono tabular-nums">{r.count}</td>
              <td className="py-1.5 text-right font-mono tabular-nums">{gbp(r.total)}</td>
              <td className="py-1.5 text-right font-mono tabular-nums text-slate-500">{gbp(r.mean)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function median(sorted: number[]): number {
  if (!sorted.length) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function breakdown(
  items: { key: string; value: number }[],
): { name: string; count: number; total: number; mean: number }[] {
  const map = new Map<string, { count: number; total: number }>();
  for (const it of items) {
    const cur = map.get(it.key) ?? { count: 0, total: 0 };
    cur.count += 1;
    cur.total += it.value;
    map.set(it.key, cur);
  }
  return Array.from(map.entries())
    .map(([name, v]) => ({ name, count: v.count, total: v.total, mean: v.total / v.count }))
    .sort((a, b) => b.total - a.total);
}

const VALUE_BUCKETS: [number, string][] = [
  [0, "£0"],
  [1, "£1–250"],
  [251, "£251–500"],
  [501, "£501–1k"],
  [1001, "£1k–2k"],
  [2001, "£2k–5k"],
  [5001, "£5k+"],
];

export default async function LeadAnalyticsPage({
  params,
}: {
  params: Promise<{ siteKey: string }>;
}) {
  const authed = await checkAuth();
  if (!authed) redirect("/login");

  const { siteKey } = await params;
  const sites = await getSitesRegistry();
  const site = sites.find((s) => s.site_key === siteKey);
  if (!site) notFound();

  const leads: LeadInfo[] = await getLeadsForSite(siteKey, 1000);
  const scores: LeadValueScore[] = leads.length
    ? await getLeadValueScores(leads.map((l) => l.id))
    : [];
  const scoreByLead = new Map(scores.map((s) => [s.lead_id, s]));

  const scored = leads
    .map((l) => ({ lead: l, score: scoreByLead.get(l.id) }))
    .filter((x): x is { lead: LeadInfo; score: LeadValueScore } => Boolean(x.score));
  const unscoredCount = leads.length - scored.length;

  const values = scored.map((x) => x.score.est_value_gbp).sort((a, b) => a - b);
  const total = values.reduce((a, v) => a + v, 0);
  const mean = values.length ? total / values.length : 0;
  const top5 = values.slice(-5).reduce((a, v) => a + v, 0);
  const tierCounts = { very_high: 0, high: 0, medium: 0, low: 0 } as Record<string, number>;
  let vhHighValue = 0;
  for (const { score } of scored) {
    tierCounts[score.tier] = (tierCounts[score.tier] ?? 0) + 1;
    if (score.tier === "very_high" || score.tier === "high") vhHighValue += score.est_value_gbp;
  }

  // Histogram buckets.
  const histogram = VALUE_BUCKETS.map(([, label]) => ({ bucket: label, count: 0 }));
  for (const v of values) {
    let idx = 0;
    for (let i = 0; i < VALUE_BUCKETS.length; i++) if (v >= VALUE_BUCKETS[i][0]) idx = i;
    histogram[idx].count += 1;
  }

  // Role strip: deterministic jitter (no Math.random in RSC render — stable HTML).
  const roles = Array.from(new Set(scored.map((x) => x.lead.role || "Unknown"))).sort();
  const strip = scored.map(({ lead, score }, i) => ({
    roleIdx: roles.indexOf(lead.role || "Unknown"),
    jitter: roles.indexOf(lead.role || "Unknown") + (((i * 37) % 9) - 4) * 0.045,
    value: score.est_value_gbp,
    plotValue: Math.max(score.est_value_gbp, 50),
    tier: score.tier,
    name: lead.full_name || "(anonymous)",
  }));

  // Monthly trend (scored leads only; unscored still count toward volume).
  const monthMap = new Map<string, { count: number; value: number }>();
  for (const l of leads) {
    const m = l.created_at.slice(0, 7);
    const cur = monthMap.get(m) ?? { count: 0, value: 0 };
    cur.count += 1;
    cur.value += scoreByLead.get(l.id)?.est_value_gbp ?? 0;
    monthMap.set(m, cur);
  }
  const monthly = Array.from(monthMap.entries())
    .map(([month, v]) => ({ month, ...v }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const byRole = breakdown(scored.map((x) => ({ key: x.lead.role || "Unknown", value: x.score.est_value_gbp })));
  const byChannel = breakdown(scored.map((x) => ({ key: x.score.channel, value: x.score.est_value_gbp })));
  const byIntent = breakdown(scored.map((x) => ({ key: x.score.intent.replace("_", " "), value: x.score.est_value_gbp })));
  const byWork = breakdown(scored.map((x) => ({ key: x.score.work_type.replace("_", " "), value: x.score.est_value_gbp })));

  const tableRows: LeadRow[] = leads.map((l) => {
    const s = scoreByLead.get(l.id);
    return {
      id: l.id,
      name: l.full_name || "(anonymous)",
      date: l.created_at,
      role: l.role || "",
      tier: s?.tier ?? null,
      value: s?.est_value_gbp ?? null,
      intent: s?.intent ?? null,
      channel: s?.channel ?? null,
      confidence: s?.confidence ?? null,
      rationale: s?.rationale ?? null,
      snippet: (l.message || "").replace(/\s+/g, " ").slice(0, 80),
    };
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lead analytics</h1>
          <p className="mt-0.5 text-xs text-slate-400">{site.display_name}</p>
        </div>
        <Link href={`/site/${siteKey}`} className="text-sm text-emerald-700 underline">
          Overview
        </Link>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Every lead is read and scored (tier, intent, est. value). Values are the estimated
        first-year fee <em>if won</em> — no conversion discount applied. Low-confidence scores
        are marked with &ldquo;?&rdquo;.
      </p>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          No leads for this site yet.
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Kpi label="Est. pipeline" value={gbp(total)} sub={`${scored.length} scored leads`} />
            <Kpi label="Mean / lead" value={gbp(mean)} sub={`median ${gbp(median(values))}`} />
            <Kpi
              label="Very high + high"
              value={String(tierCounts.very_high + tierCounts.high)}
              sub={total > 0 ? `${Math.round((vhHighValue / total) * 100)}% of value` : undefined}
            />
            <Kpi label="Medium" value={String(tierCounts.medium)} />
            <Kpi
              label="Top 5 share"
              value={total > 0 ? `${Math.round((top5 / total) * 100)}%` : "-"}
              sub="of pipeline value"
            />
            <Kpi
              label="Unscored"
              value={String(unscoredCount)}
              sub={unscoredCount > 0 ? "awaiting scoring" : "all scored"}
            />
          </div>

          {scored.length > 0 && (
            <>
              <h2 className="mt-8 text-lg font-bold text-slate-900">Distribution</h2>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                <DeferredMount minHeight={300}>
                  <ValueHistogram data={histogram} />
                </DeferredMount>
                <DeferredMount minHeight={300}>
                  <MonthlyTrendChart data={monthly} />
                </DeferredMount>
              </div>
              <div className="mt-3">
                <DeferredMount minHeight={340}>
                  <RoleStripChart data={strip} roles={roles} />
                </DeferredMount>
              </div>

              <h2 className="mt-8 text-lg font-bold text-slate-900">Breakdowns</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <BreakdownCard title="By self-selected role" rows={byRole} />
                <BreakdownCard title="By enquiry intent" rows={byIntent} />
                <BreakdownCard title="By capture channel" rows={byChannel} />
                <BreakdownCard title="By work type" rows={byWork} />
              </div>
            </>
          )}

          <h2 className="mt-8 text-lg font-bold text-slate-900">All leads</h2>
          <div className="mt-3">
            <LeadAnalyticsTable rows={tableRows} />
          </div>
        </>
      )}
    </div>
  );
}
