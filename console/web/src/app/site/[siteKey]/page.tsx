/**
 * Per-site dashboard (full panel view).
 *
 * Cookie-gated, never indexed. Equivalent to the per-site /admin/analytics
 * consoles, parameterised by siteKey from the URL.
 *
 * Capability-aware: panels for systems not operated on a site render the
 * established NotOperatedPanel state (no empty boxes, no misleading zeros).
 *
 * RSC BOUNDARY: DashboardTabs, VisitorsTable, CountrySelect are "use client"
 * shared components. They receive only serialisable props (ReactNode /
 * VisitorRow[] / string[]). No functions cross the server/client boundary.
 */
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CONSOLE_NOINDEX_META } from "@accounting-network/web-shared/console/consoleAuth";
import { SnapshotCard } from "@accounting-network/web-shared/console/components/SnapshotCard";
import DashboardTabs from "@accounting-network/web-shared/console/components/DashboardTabs";
import KpiWindowCarousel, {
  type KpiPage,
} from "@accounting-network/web-shared/console/components/KpiWindowCarousel";
import CountrySelect from "@accounting-network/web-shared/console/components/CountrySelect";
import VisitorsTable, {
  type VisitorRow,
} from "@accounting-network/web-shared/console/components/VisitorsTable";
import {
  getFunnelDaily,
  getCalculatorConversionByPlacement,
  getTopVisitors,
  getLeadsForSite,
  getCountryOptions,
  getCtaPerformance,
  getFormFieldDropoff,
  getSectionActions,
  getUxFriction,
  getClientErrors,
  getEventDaily,
  getChannelConversion,
  getVisitsToConversion,
  getExperimentResults,
  getExperimentArms,
  getExperimentFunnel,
  getResultGateLeads,
  type FormLeadCount,
  getPersonalizationResults,
  getNurtureFunnel,
  getLeadIntentMix,
  getSiteKpis,
  type SiteKpis,
  type VisitorJourney,
  type CalculatorConversionPlacement,
  type ClientError,
  type CtaPerformance,
  type SectionAction,
  type ChannelConversion,
  type VisitsBucket,
  type FormFieldDropoff,
  type ExperimentResult,
  type ExperimentArms,
  type ExperimentFunnelArms,
} from "@accounting-network/web-shared/console/adminData";
import { ExperimentCard } from "@accounting-network/web-shared/console/components/ExperimentCards";
import { getExperimentMeta, siteRegistries } from "@accounting-network/web-shared/experiments/registries";
import {
  getSitesRegistry,
} from "@accounting-network/web-shared/console/estateData";
import { checkAuth } from "@/lib/checkAuth";
import { getSiteCapabilities } from "@/config/capabilities";
import SiteSwitcher from "@/components/SiteSwitcher";
import ConversionFunnel from "@/components/ConversionFunnel";

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
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
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

function NotOperatedPanel({ feature, reason }: { feature: string; reason: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
      <h3 className="text-sm font-bold text-slate-700">{feature}</h3>
      <p className="mt-1 text-sm text-slate-400">{reason}</p>
    </div>
  );
}

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

const PLACEMENT_LABEL: Record<string, string> = {
  calculator: "Calc page",
  blog: "Blog post",
  embed: "Embed iframe",
  unknown: "Unknown",
};
const WEAK_COMPUTE_RATE = 0.4;
const WEAK_LEAD_RATE = 0.05;

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

/** One window's worth of the 6 Overview KPIs, all from a single estate_kpis row. */
function KpiGrid({
  kpi,
  engagedMs,
  windowLabel,
}: {
  kpi: SiteKpis;
  engagedMs: number;
  windowLabel: string;
}) {
  const ukSessConv = kpi.sessions > 0 ? kpi.leads_uk / kpi.sessions : null;
  const allSessConv = kpi.sessions > 0 ? kpi.leads_all / kpi.sessions : null;
  const visitorConv = kpi.humans > 0 ? kpi.converted_humans / kpi.humans : null;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <SnapshotCard label="Sessions" value={String(kpi.sessions)} sub="visits" accent="sky" tag={windowLabel} />
      <SnapshotCard label="Visitors" value={String(kpi.humans)} sub={`${kpi.new_humans} new`} accent="emerald" tag={windowLabel} />
      <SnapshotCard label="Leads" value={String(kpi.leads_all)} sub={`${kpi.leads_uk} UK`} accent="emerald" tag={windowLabel} />
      <SnapshotCard label="Visitor conv." value={pct(visitorConv)} sub={`${kpi.converted_humans} of ${kpi.humans}`} accent="emerald" tag={windowLabel} />
      <SnapshotCard label="Session conv." value={`${pct(ukSessConv)} / ${pct(allSessConv)}`} sub={`${kpi.leads_uk}/${kpi.leads_all} of ${kpi.sessions} (UK/all)`} accent="emerald" tag={windowLabel} />
      <SnapshotCard label="Avg engaged" value={secs(engagedMs)} sub="per visitor" accent="slate" tag={windowLabel} />
    </div>
  );
}

function CalculatorsPanel({ placement }: { placement: CalculatorConversionPlacement[] }) {
  const rows = [...placement].sort((a, b) => b.viewed - a.viewed);
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Calculators</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">No calculator data yet.</p>
      ) : (
        <Detail summary={`Per-tool detail by placement (${rows.length})`}>
          <div className="overflow-x-auto">
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
          </div>
        </Detail>
      )}
    </div>
  );
}

function ErrorsPanel({ errors }: { errors: ClientError[] }) {
  const top = errors.slice(0, 10);
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">JS errors</h2>
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
                <tr key={`${e.message}-${i}`} className="border-t border-slate-100">
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

function CtaPanel({ rows }: { rows: CtaPerformance[] }) {
  const formCtas = rows.filter((c) => c.goal === "form").sort((a, b) => b.clicks - a.clicks);
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">CTA performance</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">CTA</th>
              <th className="px-3 py-2 text-right">Clicks</th>
              <th className="px-3 py-2 text-right">Leads</th>
              <th className="px-3 py-2">Click to form</th>
            </tr>
          </thead>
          <tbody>
            {formCtas.length === 0 ? (
              <tr><td colSpan={4} className="px-3 py-4 text-center text-slate-400">No CTA data yet.</td></tr>
            ) : (
              formCtas.map((c) => (
                <tr key={c.cta_id} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{c.cta_id}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.clicks}</td>
                  <td className="px-3 py-2 text-right font-mono text-emerald-700">{c.lead_sessions}</td>
                  <td className="px-3 py-2 text-slate-700">{pct(c.click_to_form_rate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormDropoffPanel({ rows }: { rows: FormFieldDropoff[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Form-field drop-off</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Field</th>
              <th className="px-3 py-2 text-right">Focused</th>
              <th className="px-3 py-2 text-right">Abandoned</th>
              <th className="px-3 py-2">Rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={4} className="px-3 py-4 text-center text-slate-400">No form-field data yet.</td></tr>
            ) : (
              rows.map((r, i) => {
                const weak = (r.abandon_rate ?? 0) >= 0.3;
                return (
                  <tr key={`${r.form_id}-${r.field}-${i}`} className={`border-t border-slate-100 ${weak ? "bg-rose-50/50" : ""}`}>
                    <td className="px-3 py-2 font-medium text-slate-800">{r.field}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.focuses}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.abandons}</td>
                    <td className="px-3 py-2">
                      <span className={weak ? "font-semibold text-rose-600" : "text-slate-700"}>{pct(r.abandon_rate)}</span>
                    </td>
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

function ContentPanel({ rows }: { rows: SectionAction[] }) {
  const top = rows.slice(0, 10);
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Content engagement</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Section</th>
              <th className="px-3 py-2 text-right">Read by</th>
              <th className="px-3 py-2 text-right">Acted</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">Converted</th>
            </tr>
          </thead>
          <tbody>
            {top.length === 0 ? (
              <tr><td colSpan={4} className="px-3 py-4 text-center text-slate-400">No section data yet.</td></tr>
            ) : (
              top.map((r, i) => (
                <tr key={`${r.page_path}-${r.section_id}-${i}`} className="border-t border-slate-100">
                  <td className="px-3 py-2 text-slate-700">{r.section_text || r.section_id}</td>
                  <td className="px-3 py-2 text-right font-mono">{r.read_sessions}</td>
                  <td className="px-3 py-2 text-right font-mono">{r.acted_sessions}</td>
                  <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{r.converted_sessions}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const CHANNEL_LABEL: Record<string, string> = {
  ai: "AI engines",
  search: "Search",
  social: "Social",
  internal: "Returning",
  referral: "Referral",
  direct: "Direct",
};

function ChannelPanel({ rows }: { rows: ChannelConversion[] }) {
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
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Acquisition by channel</h2>
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
              channels.map((c) => (
                <tr key={c.channel} className={`border-t border-slate-100 ${c.channel === "ai" ? "bg-sky-50/40" : ""}`}>
                  <td className="px-3 py-2 font-medium text-slate-800">{CHANNEL_LABEL[c.channel] ?? c.channel}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.sessions}</td>
                  <td className="px-3 py-2 text-right font-mono text-emerald-700">{c.leads}</td>
                  <td className="px-3 py-2 text-slate-700">{pct(c.cr)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VisitsConvPanel({ rows }: { rows: VisitsBucket[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Visits to conversion</h2>
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
                return (
                  <tr key={r.visits_bucket} className={`border-t border-slate-100 ${r.converted_visitors > 0 ? "bg-emerald-50/40" : ""}`}>
                    <td className="px-3 py-2 font-medium text-slate-800">{r.visits_bucket >= 6 ? "6+" : r.visits_bucket}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.visitors}</td>
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

export default async function SitePage({
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
  const country = countryParam || "GB";
  const countryFilter = country === "ALL" ? undefined : country;

  // Validate the siteKey against the registry
  const sites = await getSitesRegistry();
  const site = sites.find((s) => s.site_key === siteKey);
  if (!site) notFound();

  const caps = getSiteCapabilities(siteKey);

  const now = new Date();
  const isoOf = (d: Date) => d.toISOString();
  const from14 = new Date(now.getTime() - 14 * 86400000);
  const from30 = new Date(now.getTime() - 30 * 86400000);
  const from7 = new Date(now.getTime() - 7 * 86400000);
  const startOfTodayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const allTimeFrom = new Date(Date.UTC(2020, 0, 1)); // before any site data

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
    channelConversion,
    visitsToConversion,
    kpi,
    kpiToday,
    kpi7,
    kpiAll,
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
    getChannelConversion(siteKey, countryFilter),
    getVisitsToConversion(siteKey, countryFilter),
    getSiteKpis(siteKey, isoOf(from30), isoOf(now), country),
    getSiteKpis(siteKey, isoOf(startOfTodayUTC), isoOf(now), country),
    getSiteKpis(siteKey, isoOf(from7), isoOf(now), country),
    getSiteKpis(siteKey, isoOf(allTimeFrom), isoOf(now), country),
  ]);

  const leadByVisitor = new Map<string, (typeof leads)[number]>();
  for (const l of leads) {
    if (l.visitor_id && !leadByVisitor.has(l.visitor_id)) leadByVisitor.set(l.visitor_id, l);
  }

  // Funnel stage totals for a time window: sum the daily funnel rows on/after the
  // window's start date (mirrors the KPI-card windows). Each FunnelDay is one date.
  const sumFunnel = (fromMs: number) => {
    const since = new Date(fromMs).toISOString().slice(0, 10);
    return funnel.reduce(
      (a, d) =>
        d.date >= since
          ? {
              sessions: a.sessions + d.sessions,
              engaged: a.engaged + d.engaged_sessions,
              calc: a.calc + d.calc_sessions,
              formCta: a.formCta + d.form_cta_sessions,
              form: a.form + d.form_start_sessions,
              converted: a.converted + d.converted_sessions,
            }
          : a,
      { sessions: 0, engaged: 0, calc: 0, formCta: 0, form: 0, converted: 0 },
    );
  };
  const errorsSeries = densify(errorsDaily, 14, (r) => r.count, "bucket");

  // Per-window average engaged time (ms), derived from the top-500 visitor set
  // filtered by last_seen. Exact for short windows; 500-capped for all-time
  // (same behaviour as before). No DB change needed.
  const engagedMsForWindow = (fromMs: number): number => {
    const vs = visitors.filter((v) => new Date(v.last_seen).getTime() >= fromMs);
    return vs.length
      ? vs.reduce((a, v) => a + (v.total_engaged_ms || 0), 0) / vs.length
      : 0;
  };

  // Four explicit time windows, same 6 metrics each (most granular -> widest).
  const kpiPages: KpiPage[] = [
    { key: "today", label: "Daily", meta: "Today (since 00:00 UTC)", node: <KpiGrid kpi={kpiToday} engagedMs={engagedMsForWindow(startOfTodayUTC.getTime())} windowLabel="Daily" /> },
    { key: "d7", label: "Weekly", meta: "Last 7 days", node: <KpiGrid kpi={kpi7} engagedMs={engagedMsForWindow(from7.getTime())} windowLabel="Weekly" /> },
    { key: "d30", label: "Monthly", meta: "Last 30 days", node: <KpiGrid kpi={kpi} engagedMs={engagedMsForWindow(from30.getTime())} windowLabel="Monthly" /> },
    { key: "all", label: "All time", meta: "All time", node: <KpiGrid kpi={kpiAll} engagedMs={engagedMsForWindow(0)} windowLabel="All time" /> },
  ];
  const kpiCaption =
    country === "ALL"
      ? "All countries · windows in UTC"
      : `${country} visitors · all-country leads · windows in UTC`;

  const uxTotals = uxFriction.reduce(
    (a, r) => ({ rage: a.rage + r.rage_clicks, dead: a.dead + r.dead_clicks }),
    { rage: 0, dead: 0 },
  );

  // Conversion funnel with the same Daily / Weekly / Monthly / All-time windows as
  // the KPI cards, computed from the daily funnel rows (no DB change needed).
  const funnelPages: KpiPage[] = [
    { key: "today", label: "Daily", meta: "Today (since 00:00 UTC)", node: <ConversionFunnel totals={sumFunnel(startOfTodayUTC.getTime())} /> },
    { key: "d7", label: "Weekly", meta: "Last 7 days", node: <ConversionFunnel totals={sumFunnel(from7.getTime())} /> },
    { key: "d30", label: "Monthly", meta: "Last 30 days", node: <ConversionFunnel totals={sumFunnel(from30.getTime())} /> },
    { key: "all", label: "All time", meta: "All time", node: <ConversionFunnel totals={sumFunnel(allTimeFrom.getTime())} /> },
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
      topic: null,
      converted: !!(v.converted || lead),
      lead_name: lead?.full_name ?? null,
      lead_email: lead?.email ?? null,
      lead_role: lead?.role ?? null,
    };
  });

  let newCount = 0;
  let returningCount = 0;
  for (const v of visitors) {
    if ((v.total_sessions || 0) > 1) returningCount++;
    else newCount++;
  }
  const newVsReturning: Array<[string, number]> = [["Returning", returningCount], ["New", newCount]];

  // Capability-conditional data fetches (only fetch if capability is on)
  const [experimentResults, experimentArms, experimentFunnel, personalisationResults, nurtureFunnel, leadIntent, resultGateLeads] = await Promise.all([
    caps.experiments ? getExperimentResults(siteKey) : Promise.resolve([] as ExperimentResult[]),
    caps.experiments ? getExperimentArms(siteKey) : Promise.resolve({} as Record<string, ExperimentArms>),
    caps.experiments ? getExperimentFunnel(siteKey) : Promise.resolve({} as Record<string, ExperimentFunnelArms>),
    caps.personalisation ? getPersonalizationResults(siteKey) : Promise.resolve([]),
    caps.nurture ? getNurtureFunnel(siteKey) : Promise.resolve([]),
    caps.leadIntent ? getLeadIntentMix(siteKey) : Promise.resolve([]),
    caps.experiments ? getResultGateLeads(siteKey) : Promise.resolve(null as FormLeadCount | null),
  ]);

  // ── Tab sections ──

  const overviewSection = (
    <div>
      <KpiWindowCarousel pages={kpiPages} caption={kpiCaption} />

      <h2 className="mt-8 text-lg font-bold text-slate-900">Conversion funnel</h2>
      <div className="mt-3">
        <KpiWindowCarousel pages={funnelPages} caption={kpiCaption} />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">How people arrive</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Breakdown title="Traffic source" rows={tally(visitors, "referrer_host")} />
          <Breakdown title="Device" rows={tally(visitors, "device_type")} />
          <Breakdown title="Country" rows={tally(visitors, "country")} />
          <Breakdown title="New vs returning" rows={newVsReturning} />
        </div>
      </div>

      <div className="mt-8"><ChannelPanel rows={channelConversion} /></div>
      <div className="mt-8"><VisitsConvPanel rows={visitsToConversion} /></div>
    </div>
  );

  const visitorsSection = (
    <VisitorsTable
      totalVisitors={kpi.humans}
      rows={visitorRows}
      country={country}
      visitorBasePath={`/site/${siteKey}/visitor`}
    />
  );

  // Derive which experiment keys have data (for the card loop).
  // All keys from both arms + funnel, deduplicated, so unknown ids also show.
  const experimentKeys = Array.from(
    new Set([
      ...Object.keys(experimentArms),
      ...Object.keys(experimentFunnel),
    ]),
  );

  // Classify each key as running vs retired using the registry.
  // Keys absent from the registry (unknown/legacy) are treated as retired.
  const _siteRegistry = siteRegistries[siteKey];
  const _runningSet = new Set(
    (_siteRegistry?.experiments ?? [])
      .filter((e) => e.status === "running")
      .map((e) => e.key),
  );
  const runningExperimentKeys = experimentKeys.filter((k) => _runningSet.has(k));
  const retiredExperimentKeys = experimentKeys.filter((k) => !_runningSet.has(k));

  // Experiments tab -- capability-conditional, rich card view
  const experimentsSection = (
    <div className="space-y-8">
      {caps.experiments ? (
        <>
          {resultGateLeads && (
            <div>
              <h2 className="text-lg font-bold text-slate-900">Result gate (shipped default)</h2>
              <p className="mt-1 text-xs text-slate-500">
                The calculator result-gate interstitial won its A/B test and is now the default for every in-blog
                visitor. Leads captured through the gate form, tracked directly by form (no longer an experiment).
              </p>
              <div className="mt-3 grid max-w-md gap-3 sm:grid-cols-2">
                <SnapshotCard
                  label="Result-gate leads"
                  value={String(resultGateLeads.lead_sessions)}
                  sub={`${resultGateLeads.form_start_sessions} form starts`}
                  accent="emerald"
                />
                <SnapshotCard
                  label="Form start → lead"
                  value={
                    resultGateLeads.form_start_sessions > 0
                      ? `${Math.round((resultGateLeads.lead_sessions / resultGateLeads.form_start_sessions) * 100)}%`
                      : "—"
                  }
                />
              </div>
            </div>
          )}
          {experimentResults.length === 0 ? (
          <p className="text-sm text-slate-400">No experiment results yet.</p>
        ) : (
          <>
            {runningExperimentKeys.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900">Live A/B tests</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Each running experiment, control (current) vs treatment (new), updating as data accrues. Lift and
                  significance are honest: directional until each arm has enough sessions.
                </p>
                <div className="mt-3 space-y-4">
                  {runningExperimentKeys.map((key) => (
                    <ExperimentCard
                      key={key}
                      meta={getExperimentMeta(siteKey, key)}
                      arms={experimentArms[key] ?? { control: null, treatment: null }}
                      funnel={experimentFunnel[key]}
                    />
                  ))}
                </div>
              </div>
            )}

            {retiredExperimentKeys.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900">Retired tests (historical data)</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Stopped experiments, shown for their historical results. Not assigning new visitors.
                </p>
                <div className="mt-3 space-y-4">
                  {retiredExperimentKeys.map((key) => (
                    <ExperimentCard
                      key={key}
                      meta={getExperimentMeta(siteKey, key)}
                      arms={experimentArms[key] ?? { control: null, treatment: null }}
                      funnel={experimentFunnel[key]}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Secondary: raw all-results ledger */}
            <div>
              <h2 className="text-lg font-bold text-slate-900">All results (raw ledger)</h2>
              <p className="mt-1 text-xs text-slate-500">
                Flat view of every experiment:variant row from vw_experiment_results. New experiments appear here
                automatically as events accrue.
              </p>
              <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Experiment : variant</th>
                      <th className="px-3 py-2 text-right">Sessions</th>
                      <th className="hidden px-3 py-2 text-right sm:table-cell">CTA clicks</th>
                      <th className="hidden px-3 py-2 text-right sm:table-cell">Form starts</th>
                      <th className="px-3 py-2 text-right">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {experimentResults.map((x) => (
                      <tr key={x.exp} className="border-t border-slate-100">
                        <td className="px-3 py-2 font-mono text-slate-700">{x.exp}</td>
                        <td className="px-3 py-2 text-right font-mono">{x.sessions}</td>
                        <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{x.cta_clicks}</td>
                        <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{x.form_starts}</td>
                        <td className="px-3 py-2 text-right">{pct(x.conversion_rate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
          )}
        </>
      ) : (
        <NotOperatedPanel
          feature="A/B experiments"
          reason="Not operated on this site. Experiments engine requires an active experimentation registry."
        />
      )}

      {caps.personalisation ? (
        personalisationResults.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">No personalisation results yet.</p>
        ) : (
          <Detail summary={`Personalisation results (${personalisationResults.length})`}>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-2">Rule</th>
                  <th className="px-3 py-2">Surface</th>
                  <th className="px-3 py-2 text-right">Shown</th>
                  <th className="px-3 py-2 text-right">Clicked</th>
                  <th className="px-3 py-2">Click rate</th>
                </tr>
              </thead>
              <tbody>
                {personalisationResults.map((r) => (
                  <tr key={r.rule_id} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-800">{r.rule_id}</td>
                    <td className="px-3 py-2 text-slate-600">{r.surface}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.shown}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.clicked}</td>
                    <td className="px-3 py-2 text-slate-700">{pct(r.click_rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Detail>
        )
      ) : (
        <NotOperatedPanel
          feature="Personalisation"
          reason="Not operated on this site. Behavioural personalisation requires the personalisation engine."
        />
      )}
    </div>
  );

  const behaviourSection = (
    <div className="space-y-8">
      <CalculatorsPanel placement={calcPlacement} />
      <ContentPanel rows={sectionActions} />
      <div>
        <h2 className="text-lg font-bold text-slate-900">Errors and friction</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SnapshotCard label="JS errors / day" value={String(errorsSeries[errorsSeries.length - 1] ?? 0)} series={errorsSeries} delta={deltaVsPrior(errorsSeries)} invertDelta accent="rose" status={(errorsSeries[errorsSeries.length - 1] ?? 0) > 0 ? "warn" : "ok"} />
          <Kpi label="Rage clicks" value={String(uxTotals.rage)} />
          <Kpi label="Dead clicks" value={String(uxTotals.dead)} />
        </div>
        <div className="mt-3"><ErrorsPanel errors={clientErrors} /></div>
      </div>
    </div>
  );

  const conversionSection = (
    <div className="space-y-8">
      {caps.leadIntent ? (
        leadIntent.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold text-slate-900">Lead intent mix</h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Intent</th>
                    <th className="px-3 py-2 text-right">Leads</th>
                    <th className="px-3 py-2 text-right">Avg quality</th>
                    <th className="px-3 py-2 text-right">High value</th>
                  </tr>
                </thead>
                <tbody>
                  {leadIntent.map((r) => (
                    <tr key={r.intent_category} className="border-t border-slate-100">
                      <td className="px-3 py-2 font-medium text-slate-800">{r.intent_category}</td>
                      <td className="px-3 py-2 text-right font-mono">{r.leads}</td>
                      <td className="px-3 py-2 text-right font-mono">{r.avg_quality?.toFixed(1) ?? "-"}</td>
                      <td className="px-3 py-2 text-right font-mono">{r.high_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">No lead intent data yet.</p>
        )
      ) : (
        <NotOperatedPanel
          feature="Lead-intent enrichment"
          reason="Not operated on this site. Lead-intent classifier requires the Opus enrichment pipeline."
        />
      )}

      {caps.nurture ? (
        nurtureFunnel.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold text-slate-900">Nurture funnel</h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Sequence</th>
                    <th className="px-3 py-2 text-right">Step</th>
                    <th className="px-3 py-2 text-right">Sent</th>
                    <th className="px-3 py-2 text-right">Opened</th>
                    <th className="px-3 py-2 text-right">Clicked</th>
                  </tr>
                </thead>
                <tbody>
                  {nurtureFunnel.map((r, i) => (
                    <tr key={`${r.sequence}-${r.step}-${i}`} className="border-t border-slate-100">
                      <td className="px-3 py-2 font-medium text-slate-800">{r.sequence}</td>
                      <td className="px-3 py-2 text-right font-mono">{r.step}</td>
                      <td className="px-3 py-2 text-right font-mono">{r.sent}</td>
                      <td className="px-3 py-2 text-right font-mono">{r.opened}</td>
                      <td className="px-3 py-2 text-right font-mono">{r.clicked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">No nurture data yet.</p>
        )
      ) : (
        <NotOperatedPanel
          feature="Nurture engine"
          reason="Not operated on this site. Marketing opt-in and drip nurture are not running here."
        />
      )}

      <CtaPanel rows={ctaPerformance} />
      <FormDropoffPanel rows={formDropoff} />
      <div>
        <Link href={`/site/${siteKey}/leads`} className="inline-block text-xs text-emerald-700 underline">
          View all leads for this site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Chrome */}
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xs text-slate-400 hover:text-slate-600">Estate</Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-bold text-slate-900">{site.display_name}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <CountrySelect value={country} options={countryOptions} basePath={`/site/${siteKey}`} />
            <Link href={`/site/${siteKey}/trends`} className="text-emerald-700 underline">Trends</Link>
            <Link href={`/site/${siteKey}/leads`} className="text-emerald-700 underline">Leads</Link>
            <span className="text-slate-400">Human-only</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Site switcher below the header on the site view */}
        <div className="mb-4 overflow-x-auto">
          <SiteSwitcher sites={sites} activeSiteKey={siteKey} />
        </div>

        <h1 className="text-xl font-bold text-slate-900">{site.display_name}</h1>
        <p className="mt-0.5 text-xs text-slate-400">{site.domain} · {siteKey}</p>

        <DashboardTabs
          overview={overviewSection}
          visitors={visitorsSection}
          experiments={experimentsSection}
          behaviour={behaviourSection}
          conversion={conversionSection}
        />
      </div>
    </div>
  );
}
