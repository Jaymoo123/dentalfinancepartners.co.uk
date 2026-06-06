/**
 * Internal analytics console — overview.
 *
 * Gated by ?k=<ADMIN_DASHBOARD_KEY>. Wrong/missing key 404s. Server-rendered
 * with the service role, never indexed.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import {
  getFunnelDaily,
  getCalculatorConversion,
  getTopVisitors,
  getLeadsForSite,
  getPersonalizationResults,
  getExperimentResults,
  type VisitorJourney,
} from "@/lib/analytics/server/adminData";
import { ruleLabel, surfaceLabel } from "@/lib/intent/labels";
import { getTopic } from "@/lib/intent/taxonomy";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

function pct(n: number | null | undefined): string {
  return n == null ? "—" : `${(n * 100).toFixed(1)}%`;
}
function secs(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}
function ago(iso: string): string {
  const d = new Date(iso).getTime();
  const mins = Math.round((Date.now() - d) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}
function tally(rows: VisitorJourney[], key: keyof VisitorJourney): Array<[string, number]> {
  const m = new Map<string, number>();
  for (const r of rows) {
    const v = (r[key] as string) || "(none)";
    m.set(v, (m.get(v) || 0) + 1);
  }
  return Array.from(m.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
}

/**
 * A short, representative copy string for what a given rule + topic actually
 * shows the visitor — derived from the canonical taxonomy so the user can see
 * roughly what each personalisation surface displays.
 */
function personalizationHint(ruleId: string, topicKey: string): string {
  const topic = getTopic(topicKey);
  if (!topic) return "—";
  switch (ruleId) {
    case "escalate_specialist":
      return `Speak to a ${topic.label} specialist`;
    case "topic_cta":
    case "deep_scroll_offer":
    case "returning_welcome":
    case "topic_next_step":
      return topic.ctaCopy;
    default:
      return topic.ctaCopy;
  }
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: Array<[string, number]> }) {
  const total = rows.reduce((a, [, n]) => a + n, 0) || 1;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {rows.length === 0 ? (
          <p className="text-xs text-slate-400">No data yet.</p>
        ) : (
          rows.map(([label, n]) => (
            <div key={label}>
              <div className="flex justify-between text-xs">
                <span className="truncate text-slate-700">{label}</span>
                <span className="font-mono text-slate-500">{n}</span>
              </div>
              <div className="mt-1 h-1.5 rounded bg-slate-100">
                <div className="h-1.5 rounded bg-emerald-500" style={{ width: `${(n / total) * 100}%` }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || k !== expected) notFound();

  const siteKey = niche.content_strategy.source_identifier;
  const [funnel, calculators, visitors, leads, personalization, experiments] = await Promise.all([
    getFunnelDaily(siteKey),
    getCalculatorConversion(siteKey),
    getTopVisitors(siteKey),
    getLeadsForSite(siteKey),
    getPersonalizationResults(siteKey),
    getExperimentResults(siteKey),
  ]);

  // Map each visitor to the lead they became (newest wins), so the visitor
  // table can show who converted even before the lead_id stitch backfills.
  const leadByVisitor = new Map<string, (typeof leads)[number]>();
  for (const l of leads) {
    if (l.visitor_id && !leadByVisitor.has(l.visitor_id)) leadByVisitor.set(l.visitor_id, l);
  }

  let newCount = 0;
  let returningCount = 0;
  for (const v of visitors) {
    if ((v.total_sessions || 0) > 1) returningCount++;
    else newCount++;
  }
  const newVsReturning: Array<[string, number]> = [
    ["Returning", returningCount],
    ["New", newCount],
  ];

  const totals = funnel.reduce(
    (a, d) => ({
      sessions: a.sessions + d.sessions,
      engaged: a.engaged + d.engaged_sessions,
      calc: a.calc + d.calc_sessions,
      cta: a.cta + d.cta_sessions,
      form: a.form + d.form_start_sessions,
      converted: a.converted + d.converted_sessions,
    }),
    { sessions: 0, engaged: 0, calc: 0, cta: 0, form: 0, converted: 0 },
  );
  const convRate = totals.sessions > 0 ? totals.converted / totals.sessions : 0;
  const avgEngaged =
    visitors.length > 0
      ? visitors.reduce((a, v) => a + (v.total_engaged_ms || 0), 0) / visitors.length
      : 0;

  const stages: Array<[string, number]> = [
    ["Sessions", totals.sessions],
    ["Engaged", totals.engaged],
    ["Used calculator", totals.calc],
    ["Clicked CTA", totals.cta],
    ["Started form", totals.form],
    ["Converted", totals.converted],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Analytics — {siteKey}</h1>
        <div className="flex items-center gap-4 text-xs">
          <Link href={`/admin/analytics/trends?k=${expected}`} className="text-emerald-700 underline">Trends</Link>
          <Link href={`/admin/analytics/leads?k=${expected}`} className="text-emerald-700 underline">All leads</Link>
          <span className="text-slate-500">Human-only · live</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Visitors" value={String(visitors.length)} sub="most recent 500" />
        <Kpi label="Sessions" value={String(totals.sessions)} sub={`last ${funnel.length} days`} />
        <Kpi label="Conversion rate" value={pct(convRate)} sub={`${totals.converted} leads`} />
        <Kpi label="Avg engaged" value={secs(avgEngaged)} sub="per visitor" />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Visitors = unique people · Sessions = visits (reset after 30 min idle).
      </p>

      {/* Funnel */}
      <h2 className="mt-10 text-lg font-bold text-slate-900">Conversion funnel</h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <tbody>
            {stages.map(([label, n], i) => {
              const prev = i > 0 ? stages[i - 1][1] : n;
              const rate = prev > 0 ? n / prev : 0;
              return (
                <tr key={label} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2.5 font-semibold text-slate-800">{label}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-slate-900">{n}</td>
                  <td className="w-1/3 px-4 py-2.5">
                    <div className="h-2 rounded bg-slate-100">
                      <div className="h-2 rounded bg-emerald-500" style={{ width: `${stages[0][1] > 0 ? (n / stages[0][1]) * 100 : 0}%` }} />
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-slate-500">
                    {i === 0 ? "" : `${(rate * 100).toFixed(0)}% of prev`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Breakdowns */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Breakdown title="Traffic source" rows={tally(visitors, "referrer_host")} />
        <Breakdown title="Device" rows={tally(visitors, "device_type")} />
        <Breakdown title="Country" rows={tally(visitors, "country")} />
        <Breakdown title="New vs returning" rows={newVsReturning} />
      </div>

      {/* Calculators */}
      <h2 className="mt-10 text-lg font-bold text-slate-900">Calculator conversion</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Calculator</th>
              <th className="px-3 py-2 text-right">Viewed</th>
              <th className="px-3 py-2 text-right">Computed</th>
              <th className="px-3 py-2 text-right">Leads</th>
              <th className="px-3 py-2 text-right">Computed→Lead</th>
            </tr>
          </thead>
          <tbody>
            {calculators.length === 0 ? (
              <tr><td colSpan={5} className="px-3 py-4 text-center text-slate-400">No calculator data yet.</td></tr>
            ) : (
              calculators.map((c) => (
                <tr key={c.calculator_slug} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{c.calculator_slug}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.viewed}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.computed}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.lead_sessions}</td>
                  <td className="px-3 py-2 text-right">{pct(c.computed_to_lead_rate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Personalization */}
      <h2 className="mt-10 text-lg font-bold text-slate-900">Personalization</h2>
      <p className="text-xs text-slate-500">How the intent-tailored surfaces perform (human-only). Shown→Lead needs the conversion stitch live.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Surface</th>
              <th className="px-3 py-2">Rule</th>
              <th className="px-3 py-2">What&apos;s shown</th>
              <th className="px-3 py-2 text-right">Shown</th>
              <th className="px-3 py-2 text-right">Clicks</th>
              <th className="px-3 py-2 text-right">CTR</th>
              <th className="px-3 py-2 text-right">Shown→Lead</th>
            </tr>
          </thead>
          <tbody>
            {personalization.length === 0 ? (
              <tr><td colSpan={7} className="px-3 py-4 text-center text-slate-400">No personalization data yet.</td></tr>
            ) : (
              personalization.map((p, i) => (
                <tr key={`${p.surface}-${p.topic}-${p.variant}-${i}`} className="border-t border-slate-100">
                  <td className="px-3 py-2 text-slate-700">{surfaceLabel(p.surface)}</td>
                  <td className="px-3 py-2 text-slate-600">{ruleLabel(p.rule_id)}</td>
                  <td className="px-3 py-2 text-slate-500">“{personalizationHint(p.rule_id, p.topic)}”</td>
                  <td className="px-3 py-2 text-right font-mono">{p.shown}</td>
                  <td className="px-3 py-2 text-right font-mono">{p.clicked}</td>
                  <td className="px-3 py-2 text-right">{pct(p.click_rate)}</td>
                  <td className="px-3 py-2 text-right">{pct(p.shown_to_lead_rate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Experiments */}
      {experiments.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-bold text-slate-900">Experiments</h2>
          <p className="text-xs text-slate-500">A/B results from first-party events (directional; significance needs volume).</p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-2">Experiment : variant</th>
                  <th className="px-3 py-2 text-right">Sessions</th>
                  <th className="px-3 py-2 text-right">CTA clicks</th>
                  <th className="px-3 py-2 text-right">Form starts</th>
                  <th className="px-3 py-2 text-right">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {experiments.map((x) => (
                  <tr key={x.exp} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-mono text-slate-700">{x.exp}</td>
                    <td className="px-3 py-2 text-right font-mono">{x.sessions}</td>
                    <td className="px-3 py-2 text-right font-mono">{x.cta_clicks}</td>
                    <td className="px-3 py-2 text-right font-mono">{x.form_starts}</td>
                    <td className="px-3 py-2 text-right">{pct(x.conversion_rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Visitors */}
      <h2 className="mt-10 text-lg font-bold text-slate-900">Visitors</h2>
      <p className="text-xs text-slate-500">Click any visitor to see everything they did.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Visitor</th>
              <th className="px-3 py-2">Last seen</th>
              <th className="px-3 py-2 text-right">Visits</th>
              <th className="px-3 py-2 text-right">Pages</th>
              <th className="px-3 py-2 text-right">Engaged</th>
              <th className="px-3 py-2">Device</th>
              <th className="px-3 py-2">Country</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2 text-center">Lead</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length === 0 ? (
              <tr><td colSpan={9} className="px-3 py-4 text-center text-slate-400">No visitors yet.</td></tr>
            ) : (
              visitors.map((v) => {
                const lead = leadByVisitor.get(v.visitor_id);
                return (
                <tr key={v.visitor_id} className={`border-t border-slate-100 ${v.converted || lead ? "bg-emerald-50/40" : ""}`}>
                  <td className="px-3 py-2">
                    <Link href={`/admin/analytics/visitor/${v.visitor_id}?k=${expected}`} className="font-mono text-emerald-700 underline">
                      {v.visitor_id.slice(0, 14)}…
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-slate-500">{ago(v.last_seen)}</td>
                  <td className="px-3 py-2 text-right font-mono">{v.total_sessions}</td>
                  <td className="px-3 py-2 text-right font-mono">{v.page_views}</td>
                  <td className="px-3 py-2 text-right font-mono">{secs(v.total_engaged_ms || 0)}</td>
                  <td className="px-3 py-2 text-slate-600">{v.device_type || "—"}</td>
                  <td className="px-3 py-2 text-slate-600">{v.country || "—"}</td>
                  <td className="px-3 py-2 text-slate-600">{v.referrer_host || v.utm_source || "direct"}</td>
                  <td className="px-3 py-2 text-xs text-emerald-800">{lead ? (lead.full_name || lead.email || "✅") : v.converted ? "✅" : ""}</td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
