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
  getContactabilityFunnel,
  getContactabilityLeads,
  getNurtureHealth,
  getNurtureStepHealth,
  getStuckLeads,
  getFailedSends,
  getNurtureControl,
  getUnreachableLeads,
  getBookedLeads,
  type SiteKpis,
  type ContactabilityFunnel,
  type ContactabilityLeadRow,
  type NurtureHealth,
  type NurtureStepHealth,
  type StuckLead,
  type FailedSend,
  type NurtureControl,
  type UnreachableLead,
  type BookedLead,
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

// ── Lead contactability panel (Property only) ─────────────────────────────

const NURTURE_LABEL: Record<string, string> = {
  active: "Active",
  awaiting_response: "Awaiting reply",
  contactable: "Contactable",
  unreachable: "Unreachable",
  stopped: "Stopped",
  completed: "Completed",
};

function LeadContactabilityPanel({
  funnel,
  leads,
  nurtureHealth,
  nurtureStepHealth,
  stuckLeads,
  failedSends,
  nurtureControl,
  unreachableLeads,
  bookedLeads,
}: {
  funnel: ContactabilityFunnel | null;
  leads: ContactabilityLeadRow[];
  nurtureHealth: NurtureHealth | null;
  nurtureStepHealth: NurtureStepHealth[];
  stuckLeads: StuckLead[];
  failedSends: FailedSend[];
  nurtureControl: NurtureControl;
  unreachableLeads: UnreachableLead[];
  bookedLeads: BookedLead[];
}) {
  const contactableRate =
    funnel && funnel.submitted > 0 ? funnel.contactable / funnel.submitted : null;

  const sendSuccessRate =
    nurtureHealth && nurtureHealth.sends_24h > 0
      ? nurtureHealth.sent_24h / nurtureHealth.sends_24h
      : null;

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Lead contactability</h2>
      <p className="mt-1 text-xs text-slate-500">
        Verify-then-nurture pipeline: only leads that are verified live and demonstrably responsive are forwarded.
      </p>

      {/* System health strip */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-bold text-slate-700">System health</h3>
          {nurtureControl.paused ? (
            <div className="flex-1 rounded bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-800">
              PAUSED
              {nurtureControl.paused_reason ? ` (${nurtureControl.paused_reason})` : ""}
              {nurtureControl.paused_at ? `, ${ago(nurtureControl.paused_at)}` : ""}
              {nurtureControl.paused_by ? `, by ${nurtureControl.paused_by}` : ""}
            </div>
          ) : (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              Active
            </span>
          )}
          <form method="POST" action="/api/nurture-control">
            <input type="hidden" name="paused" value={String(!nurtureControl.paused)} />
            <input type="hidden" name="by" value="console-operator" />
            <button
              type="submit"
              className={`rounded px-3 py-1 text-xs font-semibold ${
                nurtureControl.paused
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-rose-50 text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100"
              }`}
            >
              {nurtureControl.paused ? "Resume sends" : "Pause sends"}
            </button>
          </form>
        </div>
        {(nurtureControl.last_alert_at || nurtureControl.last_alert_key) && (
          <p className="mt-2 text-xs text-slate-500">
            Last alert:{" "}
            {nurtureControl.last_alert_key && (
              <span className="font-medium text-slate-700">{nurtureControl.last_alert_key}</span>
            )}
            {nurtureControl.last_alert_at && (
              <span className="ml-1 text-slate-400">{ago(nurtureControl.last_alert_at)}</span>
            )}
          </p>
        )}

        {nurtureHealth ? (
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
            <SnapshotCard
              label="Send success 24h"
              value={sendSuccessRate != null ? pct(sendSuccessRate) : "-"}
              sub={`${nurtureHealth.sent_24h} of ${nurtureHealth.sends_24h}`}
              accent={sendSuccessRate != null && sendSuccessRate < 0.9 ? "rose" : "emerald"}
              compact
            />
            <SnapshotCard
              label="Replies 24h"
              value={String(nurtureHealth.replies_24h)}
              accent={nurtureHealth.replies_24h > 0 ? "emerald" : "sky"}
              compact
            />
            <SnapshotCard
              label="Booked 24h"
              value={String(nurtureHealth.booked_24h)}
              accent={nurtureHealth.booked_24h > 0 ? "emerald" : "sky"}
              compact
            />
            <SnapshotCard
              label="Failed 24h"
              value={String(nurtureHealth.failed_24h)}
              accent={nurtureHealth.failed_24h > 0 ? "rose" : "sky"}
              compact
            />
            <SnapshotCard
              label="Complaints 24h"
              value={String(nurtureHealth.complaints_24h)}
              accent={nurtureHealth.complaints_24h > 0 ? "rose" : "sky"}
              compact
            />
            <SnapshotCard
              label="Complaints 7d"
              value={String(nurtureHealth.complaints_7d)}
              accent={nurtureHealth.complaints_7d > 0 ? "rose" : "sky"}
              compact
            />
            <SnapshotCard
              label="Bounces 7d"
              value={String(nurtureHealth.bounces_7d)}
              accent={nurtureHealth.bounces_7d > 0 ? "rose" : "sky"}
              compact
            />
            <SnapshotCard
              label="Opt-outs 7d"
              value={String(nurtureHealth.optouts_7d)}
              accent={nurtureHealth.optouts_7d > 0 ? "rose" : "sky"}
              compact
            />
            <SnapshotCard
              label="Active leads"
              value={String(nurtureHealth.active_leads)}
              accent="sky"
              compact
            />
            <SnapshotCard
              label="Stuck leads"
              value={String(nurtureHealth.stuck_leads)}
              accent={nurtureHealth.stuck_leads > 0 ? "rose" : "sky"}
              compact
            />
          </div>
        ) : (
          <p className="mt-2 text-xs text-slate-400">
            Health metrics not yet available (migration pending).
          </p>
        )}
      </div>

      {funnel ? (
        <>
          {/* Headline + secondary stats */}
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SnapshotCard
              label="Contactable rate"
              value={contactableRate != null ? pct(contactableRate) : "-"}
              sub={
                funnel.submitted > 0
                  ? `${funnel.contactable} of ${funnel.submitted} submitted`
                  : "No leads yet"
              }
              accent="emerald"
            />
            <SnapshotCard
              label="Forwarded"
              value={String(funnel.forwarded)}
              sub={funnel.submitted > 0 ? pct(funnel.forwarded / funnel.submitted) : "-"}
              accent="emerald"
              compact
            />
            <SnapshotCard
              label="Unreachable"
              value={String(funnel.unreachable)}
              sub={funnel.submitted > 0 ? pct(funnel.unreachable / funnel.submitted) : "-"}
              accent="rose"
              compact
            />
          </div>

          {/* Funnel step strip: submitted to contactable */}
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
            <SnapshotCard
              label="Submitted"
              value={String(funnel.submitted)}
              accent="sky"
              compact
            />
            <SnapshotCard
              label="Verified"
              value={String(funnel.verified)}
              sub={funnel.submitted > 0 ? pct(funnel.verified / funnel.submitted) : "-"}
              accent="sky"
              compact
            />
            <SnapshotCard
              label="Messaged"
              value={String(funnel.messaged)}
              sub={funnel.submitted > 0 ? pct(funnel.messaged / funnel.submitted) : "-"}
              accent="sky"
              compact
            />
            <SnapshotCard
              label="Responded"
              value={String(funnel.responded)}
              sub={funnel.submitted > 0 ? pct(funnel.responded / funnel.submitted) : "-"}
              accent="emerald"
              compact
            />
            <SnapshotCard
              label="Contactable"
              value={String(funnel.contactable)}
              sub={funnel.submitted > 0 ? pct(funnel.contactable / funnel.submitted) : "-"}
              accent="emerald"
              compact
            />
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm text-slate-400">
          Contactability pipeline not yet active (migration pending or no data).
        </p>
      )}

      {/* Where leads get stuck: per-step throughput */}
      {nurtureStepHealth.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-slate-700">Where leads get stuck</h3>
          <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-3 py-2">Step</th>
                  <th className="px-3 py-2 text-right">Sent</th>
                  <th className="px-3 py-2 text-right">Failed</th>
                  <th className="px-3 py-2 text-right">Skipped</th>
                  <th className="px-3 py-2">Success rate</th>
                </tr>
              </thead>
              <tbody>
                {nurtureStepHealth.map((s) => {
                  const total = s.sent + s.failed + s.skipped;
                  const sr = total > 0 ? s.sent / total : null;
                  return (
                    <tr key={s.step} className="border-t border-slate-100">
                      <td className="px-3 py-2 font-medium text-slate-800">Step {s.step}</td>
                      <td className="px-3 py-2 text-right font-mono text-slate-700">{s.sent}</td>
                      <td className={`px-3 py-2 text-right font-mono ${s.failed > 0 ? "font-semibold text-rose-600" : "text-slate-500"}`}>{s.failed}</td>
                      <td className="px-3 py-2 text-right font-mono text-slate-500">{s.skipped}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${sr != null && sr < 0.8 ? "font-semibold text-rose-600" : "text-slate-700"}`}>{pct(sr)}</span>
                          {sr != null && (
                            <div className="h-1.5 w-16 rounded bg-slate-100">
                              <div
                                className={`h-1.5 rounded ${sr < 0.8 ? "bg-rose-400" : "bg-emerald-500"}`}
                                style={{ width: `${Math.min(100, sr * 100)}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stuck / overdue leads */}
      {stuckLeads.length > 0 && (
        <Detail summary={`Stuck / overdue leads (${stuckLeads.length})`}>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Submitted</th>
                <th className="px-3 py-2 text-right">Overdue</th>
                <th className="px-3 py-2 text-right">Step</th>
              </tr>
            </thead>
            <tbody>
              {stuckLeads.map((l) => (
                <tr key={l.lead_id} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{l.full_name || "(unnamed)"}</td>
                  <td className="px-3 py-2 text-xs text-slate-500">{ago(l.created_at)}</td>
                  <td className="px-3 py-2 text-right text-xs font-semibold text-rose-600">{l.overdue_hours}h</td>
                  <td className="px-3 py-2 text-right text-xs text-slate-600">{l.step ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Detail>
      )}

      {/* Failed sends */}
      {failedSends.length > 0 && (
        <Detail summary={`Failed sends (${failedSends.length})`}>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Channel</th>
                <th className="px-3 py-2">Step</th>
                <th className="px-3 py-2">Reason</th>
                <th className="px-3 py-2">When</th>
              </tr>
            </thead>
            <tbody>
              {failedSends.map((f) => (
                <tr key={f.id} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{f.full_name || "(unnamed)"}</td>
                  <td className="px-3 py-2 text-xs text-slate-600">{f.channel ?? "-"}</td>
                  <td className="px-3 py-2 text-xs text-slate-600">{f.step ?? "-"}</td>
                  <td className="px-3 py-2 text-xs text-rose-600">{f.reason ?? "-"}</td>
                  <td className="px-3 py-2 text-xs text-slate-500">{ago(f.ts)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Detail>
      )}

      {/* Unreachable leads */}
      {unreachableLeads.length > 0 && (
        <Detail summary={`Unreachable leads (${unreachableLeads.length})`}>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {unreachableLeads.map((l) => (
                <tr key={l.id} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{l.full_name || "(unnamed)"}</td>
                  <td className="px-3 py-2 text-xs text-slate-500">{ago(l.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Detail>
      )}

      {/* Booked appointments */}
      {bookedLeads.length > 0 && (
        <Detail summary={`Booked appointments (${bookedLeads.length})`}>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Booked</th>
              </tr>
            </thead>
            <tbody>
              {bookedLeads.map((b) => (
                <tr key={b.id} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{b.full_name || "(unnamed)"}</td>
                  <td className="px-3 py-2 text-xs text-slate-500">{ago(b.ts)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Detail>
      )}

      {/* Recent leads ops table */}
      <div className="mt-6">
        <h3 className="text-sm font-bold text-slate-700">
          Recent leads ({leads.length})
        </h3>
        <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Submitted</th>
                <th className="px-3 py-2">Verify</th>
                <th className="px-3 py-2">Nurture</th>
                <th className="px-3 py-2 text-center">Responded</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-4 text-center text-slate-400">
                    No leads yet.
                  </td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr key={l.id} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-800">
                      {l.full_name || "(unnamed)"}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-500">{ago(l.created_at)}</td>
                    <td className="px-3 py-2 text-xs">
                      {l.verify_pass === true ? (
                        <span className="font-medium text-emerald-700">Pass</span>
                      ) : l.verify_pass === false ? (
                        <span className="font-medium text-rose-600">Fail</span>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
                      {l.phone_status && (
                        <span className="ml-1 text-slate-400">
                          ({l.phone_status.replace("valid_", "")})
                        </span>
                      )}
                      {l.email_status && (
                        <span className="ml-1 text-slate-400">
                          {l.email_status.replace("valid_", "")}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {l.nurture_status ? (
                        <span
                          className={`font-medium ${
                            l.nurture_status === "contactable"
                              ? "text-emerald-700"
                              : l.nurture_status === "unreachable"
                              ? "text-rose-600"
                              : "text-slate-700"
                          }`}
                        >
                          {NURTURE_LABEL[l.nurture_status] ?? l.nurture_status}
                          {l.nurture_step != null && ` (step ${l.nurture_step})`}
                        </span>
                      ) : (
                        <span className="text-slate-400">Not started</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center text-xs">
                      {l.responded ? (
                        <span className="font-medium text-emerald-700">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-600">{l.status ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
  const isProperty = siteKey === "property";

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

  // Property-only: contactability pipeline data + nurture observability
  const [
    contactabilityFunnel,
    contactabilityLeads,
    nurtureHealth,
    nurtureStepHealth,
    stuckLeads,
    failedSends,
    nurtureControl,
    unreachableLeads,
    bookedLeads,
  ] = await Promise.all([
    isProperty ? getContactabilityFunnel(siteKey) : Promise.resolve(null),
    isProperty ? getContactabilityLeads(siteKey) : Promise.resolve([] as ContactabilityLeadRow[]),
    isProperty ? getNurtureHealth(siteKey) : Promise.resolve(null as NurtureHealth | null),
    isProperty ? getNurtureStepHealth(siteKey) : Promise.resolve([] as NurtureStepHealth[]),
    isProperty ? getStuckLeads(siteKey) : Promise.resolve([] as StuckLead[]),
    isProperty ? getFailedSends(siteKey) : Promise.resolve([] as FailedSend[]),
    isProperty
      ? getNurtureControl()
      : Promise.resolve({ paused: false, paused_reason: null, paused_at: null, paused_by: null, last_alert_at: null, last_alert_key: null } as NurtureControl),
    isProperty ? getUnreachableLeads(siteKey) : Promise.resolve([] as UnreachableLead[]),
    isProperty ? getBookedLeads(siteKey) : Promise.resolve([] as BookedLead[]),
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
      {isProperty && (
        <LeadContactabilityPanel
          funnel={contactabilityFunnel}
          leads={contactabilityLeads}
          nurtureHealth={nurtureHealth}
          nurtureStepHealth={nurtureStepHealth}
          stuckLeads={stuckLeads}
          failedSends={failedSends}
          nurtureControl={nurtureControl}
          unreachableLeads={unreachableLeads}
          bookedLeads={bookedLeads}
        />
      )}
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
