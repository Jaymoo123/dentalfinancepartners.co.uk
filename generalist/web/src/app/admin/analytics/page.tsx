/**
 * Generalist analytics console — main dashboard.
 *
 * Cookie-gated (OB-01): credential travels in an HttpOnly session cookie, never
 * the URL. Every console route checks the cookie via checkAuth(). noindex on all
 * console routes.
 *
 * Generalist-specific system state:
 *   - No A/B experiments operated: experiments tab shows explicit "not operated"
 *   - No nurture/subscriber engine: nurture panel shows explicit "not operated"
 *   - No lead-intent enrichment: intent panel shows explicit "not operated"
 *   - No personalisation: offer panel shows explicit "not operated"
 * These are permanent states for this site; empty panels would be misleading.
 *
 * RSC BOUNDARY: DashboardTabs, VisitorsTable, CountrySelect are "use client"
 * components from the shared console. They receive only serializable props
 * (ReactNode / VisitorRow[] / string[]). No function-bearing config objects
 * cross the server/client boundary.
 */
import { redirect } from "next/navigation";
import Link from "next/link";
import { niche } from "@/config/niche-loader";
import {
  getFunnelDaily,
  getCalculatorConversionByPlacement,
  getTopVisitors,
  getLeadsForSite,
  getCountryOptions,
  getFormFieldDropoff,
  getCtaPerformance,
  getSectionActions,
  getUxFriction,
  getClientErrors,
  getEventDaily,
  getTimeseries,
  getChannelConversion,
  getVisitsToConversion,
  type VisitorJourney,
  type CalculatorConversionPlacement,
  type ClientError,
  type CtaPerformance,
  type SectionAction,
  type UxFriction,
  type ChannelConversion,
  type VisitsBucket,
  type FormFieldDropoff,
} from "@accounting-network/web-shared/console/adminData";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import { SnapshotCard } from "@accounting-network/web-shared/console/components/SnapshotCard";
import DashboardTabs from "@accounting-network/web-shared/console/components/DashboardTabs";
import CountrySelect from "@accounting-network/web-shared/console/components/CountrySelect";
import VisitorsTable, { type VisitorRow } from "@accounting-network/web-shared/console/components/VisitorsTable";
import { checkAuth } from "./checkAuth";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = CONSOLE_NOINDEX_META;

// ── Helpers ────────────────────────────────────────────────────────────────

function pct(n: number | null | undefined): string {
  return n == null ? "-" : `${(n * 100).toFixed(1)}%`;
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

function densify<T>(rows: T[], days: number, valueOf: (r: T) => number, dateKey: keyof T): number[] {
  const byDate = new Map<string, number>();
  for (const r of rows) {
    const raw = r[dateKey];
    if (raw == null) continue;
    const day = String(raw).slice(0, 10);
    byDate.set(day, (byDate.get(day) || 0) + valueOf(r));
  }
  const out: number[] = [];
  const today = Date.now();
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today - i * 86400000).toISOString().slice(0, 10);
    out.push(byDate.get(day) || 0);
  }
  return out;
}

function deltaVsPrior(series: number[]): number | null {
  const n = series.length;
  if (n < 4) return null;
  const half = Math.floor(n / 2);
  const prior = series.slice(0, n - half).reduce((a, b) => a + b, 0);
  const recent = series.slice(n - half).reduce((a, b) => a + b, 0);
  if (prior === 0) return null;
  return (recent - prior) / prior;
}

function shortPage(p: string): string {
  return p.replace(/^\/blog\//, "").replace(/\/$/, "");
}

// ── Panel components ───────────────────────────────────────────────────────

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

/** Simple disclosure that doesn't need shadcn Collapsible. */
function Detail({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <summary className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900">
        {summary}
      </summary>
      <div className="overflow-x-auto border-t border-slate-100">{children}</div>
    </details>
  );
}

/** Panel for features not operated on this site (spec requirement). */
function NotOperatedPanel({ feature, reason }: { feature: string; reason: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
      <h3 className="text-sm font-bold text-slate-700">{feature}</h3>
      <p className="mt-1 text-sm text-slate-400">{reason}</p>
    </div>
  );
}

const WEAK_COMPUTE_RATE = 0.4;
const WEAK_LEAD_RATE = 0.05;
const MIN_TRAFFIC_TO_FLAG = 20;

function CalcStepBar({ rate, kind }: { rate: number | null; kind: "compute" | "lead" }) {
  const weak = kind === "compute" ? WEAK_COMPUTE_RATE : WEAK_LEAD_RATE;
  const isWeak = rate != null && rate < weak;
  const widthPct = rate == null ? 0 : Math.min(100, rate * 100);
  return (
    <div>
      <span className={isWeak ? "font-semibold text-rose-600" : "text-slate-700"}>{pct(rate)}</span>
      <div className="mt-1 h-1.5 rounded bg-slate-100">
        <div className={`h-1.5 rounded ${isWeak ? "bg-rose-400" : "bg-emerald-500"}`} style={{ width: `${widthPct}%` }} />
      </div>
    </div>
  );
}

const PLACEMENT_LABEL: Record<string, string> = {
  calculator: "Calc page",
  blog: "Blog post",
  embed: "Embed iframe",
  unknown: "Unknown",
};

function CalculatorsPanel({
  placement,
  computesSeries,
}: {
  placement: CalculatorConversionPlacement[];
  computesSeries: number[];
}) {
  const agg = placement.reduce(
    (a, c) => ({ viewed: a.viewed + c.viewed, computed: a.computed + c.computed, leads: a.leads + c.lead_sessions }),
    { viewed: 0, computed: 0, leads: 0 },
  );
  const overallCompute = agg.viewed > 0 ? agg.computed / agg.viewed : null;
  const overallLead = agg.computed > 0 ? agg.leads / agg.computed : null;
  const rows = [...placement].sort((a, b) => b.viewed - a.viewed);
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Calculators</h2>
      <p className="mt-1 text-xs text-slate-500">Tool funnel: Viewed to Computed to Lead.</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="View-to-compute" value={pct(overallCompute)} sub={`${agg.computed} of ${agg.viewed}`} />
        <Kpi label="Compute-to-lead" value={pct(overallLead)} sub={`${agg.leads} tool-driven leads`} />
        <SnapshotCard label="Computes / day" value={String(agg.computed)} series={computesSeries} delta={deltaVsPrior(computesSeries)} accent="sky" sub="last 14 days" />
        <Kpi label="Tools" value={String(new Set(rows.map((r) => r.calculator_slug)).size)} />
      </div>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">No calculator data yet. Tools were deployed 2026-06-10 and are accruing sessions.</p>
      ) : (
        <Detail summary={`Per-tool detail by placement (${rows.length})`}>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Tool</th>
                <th className="px-3 py-2">Where</th>
                <th className="px-3 py-2 text-right">Viewed</th>
                <th className="px-3 py-2 text-right">Computed</th>
                <th className="px-3 py-2 text-right">Leads</th>
                <th className="px-3 py-2">View-to-Compute</th>
                <th className="hidden px-3 py-2 lg:table-cell">Compute-to-Lead</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c, i) => (
                <tr key={`${c.calculator_slug}-${c.placement}-${c.tool_kind}-${i}`} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{c.calculator_slug}</td>
                  <td className="px-3 py-2 text-slate-600">{PLACEMENT_LABEL[c.placement] ?? c.placement}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.viewed}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.computed}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.lead_sessions}</td>
                  <td className="w-28 px-3 py-2"><CalcStepBar rate={c.compute_rate} kind="compute" /></td>
                  <td className="hidden w-28 px-3 py-2 lg:table-cell"><CalcStepBar rate={c.computed_to_lead_rate} kind="lead" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Detail>
      )}
    </div>
  );
}

function ContentEngagementPanel({ rows }: { rows: SectionAction[] }) {
  const top = rows.slice(0, 8);
  const rest = rows.slice(8);
  const renderRows = (list: SectionAction[]) =>
    list.map((r, i) => {
      const actRate = r.read_sessions > 0 ? r.acted_sessions / r.read_sessions : 0;
      return (
        <tr key={`${r.page_path}-${r.section_id}-${i}`} className="border-t border-slate-100">
          <td className="px-3 py-2 text-slate-700">{r.section_text || r.section_id}</td>
          <td className="hidden px-3 py-2 font-mono text-xs text-slate-500 sm:table-cell">{shortPage(r.page_path)}</td>
          <td className="px-3 py-2 text-right font-mono">{r.read_sessions}</td>
          <td className="px-3 py-2 text-right font-mono">{r.acted_sessions} <span className="text-xs text-slate-400">({(actRate * 100).toFixed(0)}%)</span></td>
          <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{r.converted_sessions}</td>
        </tr>
      );
    });
  const Head = () => (
    <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
      <tr>
        <th className="px-3 py-2">Section</th>
        <th className="hidden px-3 py-2 sm:table-cell">Page</th>
        <th className="px-3 py-2 text-right">Read by</th>
        <th className="px-3 py-2 text-right">Acted after</th>
        <th className="hidden px-3 py-2 text-right sm:table-cell">Converted</th>
      </tr>
    </thead>
  );
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Content engagement</h2>
      <p className="text-xs text-slate-500">Per section: how many sessions read it, took an action after, and converted.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <Head />
          <tbody>
            {top.length === 0 ? (
              <tr><td colSpan={5} className="px-3 py-4 text-center text-slate-400">No section data yet.</td></tr>
            ) : renderRows(top)}
          </tbody>
        </table>
      </div>
      {rest.length > 0 && (
        <Detail summary={`Show ${rest.length} more sections`}>
          <table className="w-full text-sm"><Head /><tbody>{renderRows(rest)}</tbody></table>
        </Detail>
      )}
    </div>
  );
}

function ErrorsPanel({ errors, errorsSeries, friction }: { errors: ClientError[]; errorsSeries: number[]; friction: UxFriction[] }) {
  const totalErrors = errorsSeries.reduce((a, b) => a + b, 0);
  const today = errorsSeries[errorsSeries.length - 1] ?? 0;
  const fr = friction.reduce((a, r) => ({ rage: a.rage + r.rage_clicks, dead: a.dead + r.dead_clicks }), { rage: 0, dead: 0 });
  const top = errors.slice(0, 8);
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Errors and friction</h2>
      <p className="text-xs text-slate-500">JS errors grouped by message, plus rage/dead-click counts.</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SnapshotCard label="JS errors / day" value={String(today)} sub={`${totalErrors} in 14 days`} series={errorsSeries} delta={deltaVsPrior(errorsSeries)} invertDelta accent="rose" status={today > 0 ? "warn" : "ok"} />
        <Kpi label="Rage clicks" value={String(fr.rage)} sub="rapid repeat clicks" />
        <Kpi label="Dead clicks" value={String(fr.dead)} sub="clicks that did nothing" />
      </div>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Error</th>
              <th className="hidden px-3 py-2 sm:table-cell">Kind</th>
              <th className="px-3 py-2 text-right">Count</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">Sessions</th>
              <th className="px-3 py-2 text-right">Last seen</th>
            </tr>
          </thead>
          <tbody>
            {top.length === 0 ? (
              <tr><td colSpan={5} className="px-3 py-4 text-center text-slate-400">No JS errors logged.</td></tr>
            ) : (
              top.map((e, i) => (
                <tr key={`${e.message}-${i}`} className="border-t border-slate-100 align-top">
                  <td className="px-3 py-2"><span className="break-words font-mono text-xs">{e.message}</span></td>
                  <td className="hidden px-3 py-2 text-xs text-slate-500 sm:table-cell">{e.kind}</td>
                  <td className="px-3 py-2 text-right font-mono">{e.count}</td>
                  <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{e.sessions}</td>
                  <td className="px-3 py-2 text-right text-xs text-slate-500">{e.last_seen ? ago(e.last_seen) : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CtaPerformancePanel({ rows }: { rows: CtaPerformance[] }) {
  const formCtas = rows.filter((c) => c.goal === "form").sort((a, b) => b.clicks - a.clicks);
  const others = rows.filter((c) => c.goal !== "form").sort((a, b) => b.clicks - a.clicks);
  const renderRows = (list: CtaPerformance[]) => list.map((c) => {
    const weak = c.goal === "form" && (c.click_to_form_rate ?? 0) < 0.1;
    const widthPct = c.click_to_form_rate == null ? 0 : Math.min(100, c.click_to_form_rate * 100);
    return (
      <tr key={c.cta_id} className={`border-t border-slate-100 ${weak ? "bg-rose-50/50" : ""}`}>
        <td className="px-3 py-2 font-medium text-slate-800">{c.cta_id}</td>
        <td className="px-3 py-2 text-right font-mono">{c.clicks}</td>
        <td className="px-3 py-2 text-right font-mono">{c.click_sessions}</td>
        <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{c.form_start_sessions}</td>
        <td className="w-28 px-3 py-2">
          <span className={weak ? "font-semibold text-rose-600" : "text-slate-700"}>{pct(c.click_to_form_rate)}</span>
          <div className="mt-1 h-1.5 rounded bg-slate-100">
            <div className={`h-1.5 rounded ${weak ? "bg-rose-400" : "bg-emerald-500"}`} style={{ width: `${widthPct}%` }} />
          </div>
        </td>
        <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{c.lead_sessions}</td>
      </tr>
    );
  });
  const Head = () => (
    <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
      <tr>
        <th className="px-3 py-2">CTA</th>
        <th className="px-3 py-2 text-right">Clicks</th>
        <th className="px-3 py-2 text-right">Sessions</th>
        <th className="hidden px-3 py-2 text-right sm:table-cell">Form starts</th>
        <th className="px-3 py-2">Click to form</th>
        <th className="hidden px-3 py-2 text-right sm:table-cell">Leads</th>
      </tr>
    </thead>
  );
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">CTA performance</h2>
      <p className="text-xs text-slate-500">Which CTAs drive form starts vs dead-end.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 bg-emerald-50/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-800">Form-bound CTAs</div>
        <table className="w-full text-sm"><Head /><tbody>
          {formCtas.length === 0 ? <tr><td colSpan={6} className="px-3 py-4 text-center text-slate-400">None yet.</td></tr> : renderRows(formCtas)}
        </tbody></table>
      </div>
      {others.length > 0 && (
        <Detail summary={`Other CTAs (${others.length})`}>
          <table className="w-full text-sm"><Head /><tbody>{renderRows(others)}</tbody></table>
        </Detail>
      )}
    </div>
  );
}

function FormDropoffPanel({ rows }: { rows: FormFieldDropoff[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Form-field drop-off</h2>
      <p className="text-xs text-slate-500">Of people who focused each field, how many left without finishing.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Field</th>
              <th className="px-3 py-2 text-right">Focused</th>
              <th className="px-3 py-2 text-right">Abandoned</th>
              <th className="px-3 py-2">Abandon rate</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">Errors</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="px-3 py-4 text-center text-slate-400">No form-field data yet.</td></tr>
            ) : (
              rows.map((r, i) => {
                const weak = (r.abandon_rate ?? 0) >= 0.3;
                const widthPct = r.abandon_rate == null ? 0 : Math.min(100, r.abandon_rate * 100);
                return (
                  <tr key={`${r.form_id}-${r.field}-${i}`} className={`border-t border-slate-100 ${weak ? "bg-rose-50/50" : ""}`}>
                    <td className="px-3 py-2 font-medium text-slate-800">{r.field}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.focuses}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.abandons}</td>
                    <td className="w-28 px-3 py-2">
                      <span className={weak ? "font-semibold text-rose-600" : "text-slate-700"}>{pct(r.abandon_rate)}</span>
                      <div className="mt-1 h-1.5 rounded bg-slate-100">
                        <div className={`h-1.5 rounded ${weak ? "bg-rose-400" : "bg-amber-400"}`} style={{ width: `${widthPct}%` }} />
                      </div>
                    </td>
                    <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{r.errors}</td>
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

const CHANNEL_LABEL: Record<string, string> = {
  ai: "AI engines",
  search: "Search engines",
  social: "Social",
  internal: "Returning / internal",
  referral: "Other referral",
  direct: "Direct",
};

function ChannelValuePanel({ rows }: { rows: ChannelConversion[] }) {
  const byChannel = new Map<string, { sessions: number; leads: number }>();
  for (const r of rows) {
    const c = byChannel.get(r.channel) || { sessions: 0, leads: 0 };
    c.sessions += r.sessions;
    c.leads += r.leads;
    byChannel.set(r.channel, c);
  }
  const channels = Array.from(byChannel.entries())
    .map(([channel, v]) => ({ channel, ...v, cr: v.sessions > 0 ? v.leads / v.sessions : 0 }))
    .sort((a, b) => b.sessions - a.sessions);
  const maxSessions = Math.max(1, ...channels.map((c) => c.sessions));
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Acquisition by value</h2>
      <p className="mt-1 text-xs text-slate-500">Channels by what they convert, not just volume.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Channel</th>
              <th className="px-3 py-2 text-right">Sessions</th>
              <th className="px-3 py-2 text-right">Leads</th>
              <th className="px-3 py-2">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {channels.length === 0 ? (
              <tr><td colSpan={4} className="px-3 py-4 text-center text-slate-400">No channel data yet.</td></tr>
            ) : (
              channels.map((c) => {
                const widthPct = (c.sessions / maxSessions) * 100;
                const flood = c.sessions >= MIN_TRAFFIC_TO_FLAG && c.leads === 0;
                return (
                  <tr key={c.channel} className={`border-t border-slate-100 ${c.channel === "ai" ? "bg-sky-50/40" : ""}`}>
                    <td className="px-3 py-2 font-medium text-slate-800">{CHANNEL_LABEL[c.channel] ?? c.channel}</td>
                    <td className="w-1/3 px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="hidden h-1.5 w-24 rounded bg-slate-100 sm:block">
                          <div className={`h-1.5 rounded ${flood ? "bg-amber-400" : "bg-emerald-500"}`} style={{ width: `${widthPct}%` }} />
                        </div>
                        <span className="font-mono">{c.sessions}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right font-mono">{c.leads}</td>
                    <td className="px-3 py-2"><span className={flood ? "font-semibold text-amber-700" : "text-slate-700"}>{pct(c.cr)}</span></td>
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

function VisitsToConversionPanel({ rows }: { rows: VisitsBucket[] }) {
  const maxV = Math.max(1, ...rows.map((r) => r.visitors));
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Visits to conversion</h2>
      <p className="mt-1 text-xs text-slate-500">How many visits a visitor makes before converting.</p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Visits</th>
              <th className="px-3 py-2 text-right">Visitors</th>
              <th className="px-3 py-2 text-right">Converted</th>
              <th className="px-3 py-2">Rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={4} className="px-3 py-4 text-center text-slate-400">No visitor data yet.</td></tr>
            ) : (
              rows.map((r) => {
                const cr = r.visitors > 0 ? r.converted_visitors / r.visitors : 0;
                const widthPct = (r.visitors / maxV) * 100;
                return (
                  <tr key={r.visits_bucket} className={`border-t border-slate-100 ${r.converted_visitors > 0 ? "bg-emerald-50/40" : ""}`}>
                    <td className="px-3 py-2 font-medium text-slate-800">{r.visits_bucket >= 6 ? "6+" : r.visits_bucket}</td>
                    <td className="w-1/3 px-3 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="hidden h-1.5 w-24 rounded bg-slate-100 sm:block">
                          <div className="h-1.5 rounded bg-sky-400" style={{ width: `${widthPct}%` }} />
                        </div>
                        <span className="font-mono">{r.visitors}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right font-mono">{r.converted_visitors}</td>
                    <td className="px-3 py-2 text-slate-700">{pct(cr)}</td>
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

// ── Page ───────────────────────────────────────────────────────────────────

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>;
}) {
  const authed = await checkAuth();
  if (!authed) redirect("/admin/analytics/login");

  const { country: countryParam } = await searchParams;
  const country = countryParam || "GB";
  const countryFilter = country === "ALL" ? undefined : country;

  // Site key from config — never a literal (PF-07 pattern).
  const siteKey = niche.content_strategy.site_key;

  const now = new Date();
  const isoOf = (d: Date) => d.toISOString();
  const from14 = new Date(now.getTime() - 14 * 86400000);
  const from30 = new Date(now.getTime() - 30 * 86400000);

  const [
    funnel,
    calcPlacement,
    visitors,
    leads,
    countryOptions,
    ctaPerformance,
    formDropoff,
    sectionActions,
    uxFriction,
    clientErrors,
    errorsDaily,
    tsDaily,
    channelConversion,
    visitsToConversion,
  ] = await Promise.all([
    getFunnelDaily(siteKey, countryFilter),
    getCalculatorConversionByPlacement(siteKey, countryFilter),
    getTopVisitors(siteKey, 500, countryFilter),
    getLeadsForSite(siteKey),
    getCountryOptions(siteKey),
    getCtaPerformance(siteKey, countryFilter),
    getFormFieldDropoff(siteKey, countryFilter),
    getSectionActions(siteKey, countryFilter),
    getUxFriction(siteKey, countryFilter),
    getClientErrors(siteKey, countryFilter),
    getEventDaily(siteKey, "client_error", isoOf(from14), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 day", isoOf(from30), isoOf(now), countryFilter),
    getChannelConversion(siteKey, countryFilter),
    getVisitsToConversion(siteKey, countryFilter),
  ]);

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
  const newVsReturning: Array<[string, number]> = [["Returning", returningCount], ["New", newCount]];

  const totals = funnel.reduce(
    (a, d) => ({
      sessions: a.sessions + d.sessions,
      engaged: a.engaged + d.engaged_sessions,
      calc: a.calc + d.calc_sessions,
      formCta: a.formCta + d.form_cta_sessions,
      form: a.form + d.form_start_sessions,
      converted: a.converted + d.converted_sessions,
    }),
    { sessions: 0, engaged: 0, calc: 0, formCta: 0, form: 0, converted: 0 },
  );
  const convRate = totals.sessions > 0 ? totals.converted / totals.sessions : 0;
  const avgEngaged = visitors.length > 0
    ? visitors.reduce((a, v) => a + (v.total_engaged_ms || 0), 0) / visitors.length
    : 0;
  const funnelDays = new Set(funnel.map((d) => d.date)).size;

  const sessionsSeries = densify(tsDaily, 14, (r) => r.sessions, "bucket");
  const leadsSeries = densify(tsDaily, 14, (r) => r.leads, "bucket");
  const engagedSeries = densify(funnel, 14, (r) => r.engaged_sessions, "date");
  const convertedSeries = densify(funnel, 14, (r) => r.converted_sessions, "date");
  const errorsSeries = densify(errorsDaily, 14, (r) => r.count, "bucket");
  const computesSeries = densify(funnel, 14, (r) => r.calc_sessions, "date");

  type FunnelRow = { label: string; n: number; denom: number; denomLabel: string; branch?: boolean };
  const funnelRows: FunnelRow[] = [
    { label: "Sessions", n: totals.sessions, denom: totals.sessions, denomLabel: "" },
    { label: "Engaged", n: totals.engaged, denom: totals.sessions, denomLabel: "of sessions" },
    { label: "Used calculator", n: totals.calc, denom: totals.engaged, denomLabel: "of engaged", branch: true },
    { label: "Clicked a form CTA", n: totals.formCta, denom: totals.engaged, denomLabel: "of engaged" },
    { label: "Started form", n: totals.form, denom: totals.formCta, denomLabel: "of form-CTA" },
    { label: "Submitted", n: totals.converted, denom: totals.form, denomLabel: "of form starts" },
  ];

  const visitorRows: VisitorRow[] = visitors.map((v) => {
    const lead = leadByVisitor.get(v.visitor_id) || null;
    return {
      visitor_id: v.visitor_id,
      last_seen: v.last_seen,
      total_sessions: v.total_sessions,
      page_views: v.page_views,
      engaged_ms: v.total_engaged_ms || 0,
      max_scroll_pct: v.max_scroll_pct || 0,
      cta_clicks: v.cta_clicks || 0,
      device: v.device_type,
      country: v.country,
      source: v.referrer_host || v.utm_source || "direct",
      topic: null, // generalist has no deriveTopic - no topic taxonomy
      converted: !!(v.converted || lead),
      lead_name: lead?.full_name ?? null,
      lead_email: lead?.email ?? null,
      lead_role: lead?.role ?? null,
    };
  });

  // ── Tab sections ──

  const overviewSection = (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SnapshotCard label="Sessions / day" value={String(totals.sessions)} sub={`last ${funnelDays} days`} series={sessionsSeries} delta={deltaVsPrior(sessionsSeries)} accent="sky" />
        <SnapshotCard label="Leads / day" value={String(totals.converted)} sub="conversions" series={leadsSeries} delta={deltaVsPrior(leadsSeries)} accent="emerald" />
        <SnapshotCard label="Conversion rate" value={pct(convRate)} sub={`${visitors.length} visitors`} series={convertedSeries} delta={deltaVsPrior(convertedSeries)} accent="emerald" />
        <SnapshotCard label="Engaged / day" value={secs(avgEngaged)} sub="avg per visitor" series={engagedSeries} delta={deltaVsPrior(engagedSeries)} accent="slate" />
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Conversion funnel</h2>
      <p className="mt-1 text-xs text-slate-500">A true funnel: each mainline stage is a subset of the one above.</p>
      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <tbody>
            {funnelRows.map((r) => {
              const rate = r.denom > 0 ? r.n / r.denom : 0;
              const barPct = totals.sessions > 0 ? (r.n / totals.sessions) * 100 : 0;
              return (
                <tr key={r.label} className={`border-b border-slate-100 last:border-0 ${r.branch ? "bg-slate-50/60" : ""}`}>
                  <td className={`px-4 py-2.5 ${r.branch ? "pl-6 font-normal text-slate-500 sm:pl-8" : "font-semibold text-slate-800"}`}>{r.label}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-slate-900">{r.n}</td>
                  <td className="hidden w-1/3 px-4 py-2.5 sm:table-cell">
                    <div className="h-2 rounded bg-slate-100">
                      <div className={`h-2 rounded ${r.branch ? "bg-sky-400" : "bg-emerald-500"}`} style={{ width: `${barPct}%` }} />
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs text-slate-500">{r.denomLabel ? `${(rate * 100).toFixed(0)}% ${r.denomLabel}` : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">How people arrive</h2>
        <Link href="/admin/analytics/trends" className="text-xs text-emerald-700 underline">View trends</Link>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Breakdown title="Traffic source" rows={tally(visitors, "referrer_host")} />
        <Breakdown title="Device" rows={tally(visitors, "device_type")} />
        <Breakdown title="Country" rows={tally(visitors, "country")} />
        <Breakdown title="New vs returning" rows={newVsReturning} />
      </div>

      <div className="mt-8"><ChannelValuePanel rows={channelConversion} /></div>
      <div className="mt-8"><VisitsToConversionPanel rows={visitsToConversion} /></div>
    </div>
  );

  const visitorsSection = (
    <VisitorsTable
      rows={visitorRows}
      country={country}
      visitorBasePath="/admin/analytics/visitor"
    />
  );

  // Generalist does not operate A/B experiments, personalisation, or nurture.
  const experimentsSection = (
    <div className="space-y-6">
      <NotOperatedPanel
        feature="A/B experiments"
        reason="Not operated on this site. The experiments engine requires a running experimentation registry (lib/experiments/registry.ts). Generalist does not currently run A/B tests."
      />
      <NotOperatedPanel
        feature="Personalisation"
        reason="Not operated on this site. Behavioural personalisation (intent-matched offers) requires the personalisation engine. Generalist does not currently run it."
      />
    </div>
  );

  const behaviourSection = (
    <div className="space-y-8">
      <CalculatorsPanel placement={calcPlacement} computesSeries={computesSeries} />
      <ContentEngagementPanel rows={sectionActions} />
      <ErrorsPanel errors={clientErrors} errorsSeries={errorsSeries} friction={uxFriction} />
    </div>
  );

  const conversionSection = (
    <div className="space-y-8">
      <NotOperatedPanel
        feature="Lead-intent enrichment"
        reason="Not operated on this site. The lead-intent classifier (Opus enrichment + vw_lead_intent_mix) has not been enabled for generalist. Enrichment is a Phase 5 / Phase 8 play deferred per the property growth plan."
      />
      <NotOperatedPanel
        feature="Nurture engine"
        reason="Not operated on this site. The marketing opt-in + drip nurture engine (Resend sequences, vw_subscriber_health, vw_nurture_step_funnel) is not running on generalist."
      />
      <CtaPerformancePanel rows={ctaPerformance} />
      <FormDropoffPanel rows={formDropoff} />
      <div>
        <Link href="/admin/analytics/leads" className="inline-block text-xs text-emerald-700 underline">View all leads</Link>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs sm:gap-4">
          <CountrySelect value={country} options={countryOptions} basePath="/admin/analytics" />
          <Link href="/admin/analytics/trends" className="text-emerald-700 underline">Trends</Link>
          <Link href="/admin/analytics/leads" className="text-emerald-700 underline">All leads</Link>
          <span className="text-slate-500">Human-only · live</span>
        </div>
      </div>

      <DashboardTabs
        overview={overviewSection}
        visitors={visitorsSection}
        experiments={experimentsSection}
        behaviour={behaviourSection}
        conversion={conversionSection}
      />
    </div>
  );
}
