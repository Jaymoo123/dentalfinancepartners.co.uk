/**
 * Internal analytics console — glance-first.
 *
 * Gated by ?k=<ADMIN_DASHBOARD_KEY>. Wrong/missing key 404s. Server-rendered
 * with the service role, never indexed. Every panel leads with a snapshot
 * (headline + sparkline + status); itemized tables collapse into dropdowns.
 */
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { niche } from "@/config/niche-loader";
import {
  getFunnelDaily,
  getCalculatorConversion,
  getCalculatorConversionByPlacement,
  getResourceConversion,
  getTopVisitors,
  getLeadsForSite,
  getPersonalizationResults,
  getExperimentResults,
  getExperimentArms,
  getCountryOptions,
  getFormFieldDropoff,
  getCtaPerformance,
  getSectionActions,
  getUxFriction,
  getClientErrors,
  getEventDaily,
  getTimeseries,
  type VisitorJourney,
  type CalculatorConversion,
  type CalculatorConversionPlacement,
  type ResourceConversion,
  type ExperimentArms,
  type PersonalizationResult,
  type ExperimentResult,
  type FormFieldDropoff,
  type CtaPerformance,
  type SectionAction,
  type UxFriction,
  type ClientError,
} from "@/lib/analytics/server/adminData";
import { ruleLabel, surfaceLabel, surfaceWhere, ruleTrigger } from "@/lib/intent/labels";
import { experimentMeta, runningExperiments, type ExperimentMeta } from "@/lib/experiments/registry";
import { ctaLabel, isDismissCta } from "@/lib/analytics/ctaLabels";
import { getTopic } from "@/lib/intent/taxonomy";
import { deriveTopic } from "@/lib/intent/deriveTopic";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SnapshotCard } from "@/components/admin/SnapshotCard";
import DashboardTabs from "./DashboardTabs";
import CountrySelect from "./CountrySelect";
import VisitorsTable, { type VisitorRow } from "./VisitorsTable";

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

/** Build a continuous last-`days` series from sparse daily rows (oldest→newest). */
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

/** Fractional change of the recent half of a series vs the prior half. */
function deltaVsPrior(series: number[]): number | null {
  const n = series.length;
  if (n < 4) return null;
  const half = Math.floor(n / 2);
  const prior = series.slice(0, n - half).reduce((a, b) => a + b, 0);
  const recent = series.slice(n - half).reduce((a, b) => a + b, 0);
  if (prior === 0) return null;
  return (recent - prior) / prior;
}

function personalizationHint(ruleId: string, topicKey: string): string {
  const topic = getTopic(topicKey);
  if (!topic) return "—";
  const label = topic.label.toLowerCase();
  switch (ruleId) {
    case "escalate_specialist":
      return `Speak to a ${label} specialist`;
    case "engaged_guide":
      return `The complete ${label} guide (+ Excel)`;
    case "returning_welcome":
      return `Pick up where you left off — ${label}`;
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

/** A "Show detail" disclosure used to keep itemized tables out of the glance. */
function Detail({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
        {summary}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="overflow-x-auto border-t border-slate-100">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

const AB_MIN_SESSIONS = 100;

function ExperimentCard({ meta, arms }: { meta: ExperimentMeta; arms: ExperimentArms }) {
  const { control, treatment } = arms;
  const hasBoth = !!control && !!treatment;
  const cRate = control?.conversion_rate ?? 0;
  const tRate = treatment?.conversion_rate ?? 0;
  const cSessions = control?.sessions ?? 0;
  const tSessions = treatment?.sessions ?? 0;
  const enough = hasBoth && cSessions >= AB_MIN_SESSIONS && tSessions >= AB_MIN_SESSIONS;
  const relLift = cRate > 0 ? (tRate - cRate) / cRate : null;

  let sig: { z: number; significant: boolean } | null = null;
  if (hasBoth && cSessions > 0 && tSessions > 0) {
    const cConv = control!.converted_sessions;
    const tConv = treatment!.converted_sessions;
    const pPool = (cConv + tConv) / (cSessions + tSessions);
    const se = Math.sqrt(pPool * (1 - pPool) * (1 / cSessions + 1 / tSessions));
    if (se > 0) {
      const z = (tRate - cRate) / se;
      sig = { z, significant: Math.abs(z) >= 1.96 };
    }
  }

  let headline: React.ReactNode;
  let headlineClass = "text-slate-900";
  if (!hasBoth) {
    headline = "Waiting for both arms to log sessions";
    headlineClass = "text-slate-500";
  } else if (!enough) {
    headline = "Not enough data yet, directional only (need ~100+ sessions per arm)";
    headlineClass = "text-amber-700";
  } else if (relLift == null) {
    headline = "Control has no conversions yet, lift not computable";
    headlineClass = "text-slate-500";
  } else {
    const sign = relLift >= 0 ? "+" : "";
    const dir = relLift >= 0 ? "vs" : "below";
    headline = (
      <>
        <span className={relLift >= 0 ? "text-emerald-700" : "text-rose-700"}>
          {sign}
          {(relLift * 100).toFixed(0)}% conversions
        </span>{" "}
        {dir} control
      </>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold text-emerald-900">{meta.label}</h3>
        {enough && sig && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              sig.significant ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            {sig.significant ? "Significant (95%)" : "Not yet significant"}
          </span>
        )}
      </div>

      <p className={`mt-1 text-xl font-bold ${headlineClass}`}>{headline}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Control</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pct(control?.conversion_rate)}</div>
          <div className="mt-0.5 text-xs text-slate-500">{cSessions} sessions · {control?.converted_sessions ?? 0} converted</div>
          <div className="mt-1 text-[11px] text-slate-400">{meta.controlDesc}</div>
        </div>
        <div className="rounded-lg border border-emerald-300 bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Treatment</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pct(treatment?.conversion_rate)}</div>
          <div className="mt-0.5 text-xs text-slate-500">{tSessions} sessions · {treatment?.converted_sessions ?? 0} converted</div>
          <div className="mt-1 text-[11px] text-emerald-700/70">{meta.treatmentDesc}</div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Relative lift = (treatment vs control) ÷ control. Directional until each arm has ~{AB_MIN_SESSIONS}+ sessions.
        {enough && sig && !sig.significant && " The current gap could still be noise."}
      </p>
    </div>
  );
}

// ── Calculators ────────────────────────────────────────────────────────────

const WEAK_COMPUTE_RATE = 0.4;
const WEAK_LEAD_RATE = 0.05;
const MIN_TRAFFIC_TO_FLAG = 20;

type CalcOpportunity = CalculatorConversion & { needsAttention: boolean; opportunityScore: number };

function scoreCalculators(rows: CalculatorConversion[]): CalcOpportunity[] {
  return rows
    .map((c) => {
      const hasTraffic = c.viewed >= MIN_TRAFFIC_TO_FLAG;
      const computeGap = c.compute_rate != null ? Math.max(0, WEAK_COMPUTE_RATE - c.compute_rate) : 0;
      const leadGap = c.computed_to_lead_rate != null ? Math.max(0, WEAK_LEAD_RATE - c.computed_to_lead_rate) : 0;
      const score = Math.max(computeGap * c.viewed, leadGap * c.computed);
      return { ...c, needsAttention: hasTraffic && score > 0, opportunityScore: hasTraffic ? score : 0 };
    })
    .sort((a, b) => b.opportunityScore - a.opportunityScore || b.viewed - a.viewed);
}

function needsAttention(viewed: number, compute: number | null, lead: number | null): null | "compute" | "lead" {
  if (viewed < MIN_TRAFFIC_TO_FLAG) return null;
  if (compute != null && compute < WEAK_COMPUTE_RATE) return "compute";
  if (lead != null && lead < WEAK_LEAD_RATE) return "lead";
  return null;
}

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
function placementLabel(p: string): string {
  return PLACEMENT_LABEL[p] ?? p;
}

function CalculatorsPanel({
  placement,
  agg,
  attentionCount,
  computesSeries,
}: {
  placement: CalculatorConversionPlacement[];
  agg: { viewed: number; computed: number; leads: number };
  attentionCount: number;
  computesSeries: number[];
}) {
  const overallCompute = agg.viewed > 0 ? agg.computed / agg.viewed : null;
  const overallLead = agg.computed > 0 ? agg.leads / agg.computed : null;
  const rows = [...placement].sort((a, b) => b.viewed - a.viewed);
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Calculators</h2>
      <p className="mt-1 text-xs text-slate-500">
        Tool funnel: <strong>Viewed → Computed → Lead</strong>.{" "}
        <em>Viewed</em> = the tool scrolled into the viewport once (an impression, not an interaction and not just
        engagement). On a blog a reader who scrolls the tool into view counts even without touching it — which deflates
        blog compute-rates. The detail splits each tool by where it&apos;s shown so you can tell the /blog render from the
        /calculators page.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Tools" value={String(rows.length)} sub={`${attentionCount} need attention`} />
        <Kpi label="View→Compute" value={pct(overallCompute)} sub={`${agg.computed} of ${agg.viewed}`} />
        <Kpi label="Compute→Lead" value={pct(overallLead)} sub={`${agg.leads} tool-driven leads`} />
        <SnapshotCard label="Computes / day" value={String(computesSeries.reduce((a, b) => a + b, 0))} series={computesSeries} delta={deltaVsPrior(computesSeries)} accent="sky" sub="last 14 days" />
      </div>
      <Detail summary={`Per-tool detail by placement (${rows.length})`}>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Tool</th>
              <th className="px-3 py-2">Where</th>
              <th className="hidden px-3 py-2 sm:table-cell">Kind</th>
              <th className="px-3 py-2 text-right">Viewed</th>
              <th className="px-3 py-2 text-right">Computed</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">Leads</th>
              <th className="px-3 py-2">View→Compute</th>
              <th className="hidden px-3 py-2 lg:table-cell">Compute→Lead</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={8} className="px-3 py-4 text-center text-slate-400">No calculator data yet.</td></tr>
            ) : (
              rows.map((c, i) => {
                const weak = needsAttention(c.viewed, c.compute_rate, c.computed_to_lead_rate);
                return (
                  <tr key={`${c.calculator_slug}-${c.placement}-${c.tool_kind}-${i}`} className={`border-t border-slate-100 ${weak ? "bg-amber-50/50" : ""}`}>
                    <td className="px-3 py-2 font-medium text-slate-800">
                      {c.calculator_slug}
                      {weak && <span className="ml-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">{weak === "compute" ? "low compute" : "low convert"}</span>}
                    </td>
                    <td className="px-3 py-2 text-slate-600">{placementLabel(c.placement)}</td>
                    <td className="hidden px-3 py-2 text-slate-500 sm:table-cell">{c.tool_kind}</td>
                    <td className="px-3 py-2 text-right font-mono">{c.viewed}</td>
                    <td className="px-3 py-2 text-right font-mono">{c.computed}</td>
                    <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{c.lead_sessions}</td>
                    <td className="w-28 px-3 py-2"><CalcStepBar rate={c.compute_rate} kind="compute" /></td>
                    <td className="hidden w-28 px-3 py-2 lg:table-cell"><CalcStepBar rate={c.computed_to_lead_rate} kind="lead" /></td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Detail>
    </div>
  );
}

// ── Content engagement (section → action) ───────────────────────────────────

function shortPage(p: string): string {
  return p.replace(/^\/blog\//, "").replace(/\/$/, "");
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
          <td className="hidden px-3 py-2 font-mono text-xs text-slate-500 sm:table-cell" title={r.page_path}>{shortPage(r.page_path)}</td>
          <td className="px-3 py-2 text-right font-mono">{r.read_sessions}</td>
          <td className="px-3 py-2 text-right font-mono">
            {r.acted_sessions}
            <span className="ml-1 text-xs text-slate-400">({(actRate * 100).toFixed(0)}%)</span>
          </td>
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
        <th className="px-3 py-2 text-right">→ Acted after</th>
        <th className="hidden px-3 py-2 text-right sm:table-cell">→ Converted</th>
      </tr>
    </thead>
  );
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Content engagement</h2>
      <p className="text-xs text-slate-500">
        Per section: how many sessions <strong>read</strong> it (≥50% visible for ≥2s), and of those how many then{" "}
        <strong>took an action</strong> (clicked a CTA or started the form) afterwards, and converted. Correlational —
        reading then acting isn&apos;t proof the section caused it, but a high act-rate marks where attention turns into
        intent. Top {top.length} by reads.
      </p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <Head />
          <tbody>
            {top.length === 0 ? (
              <tr><td colSpan={5} className="px-3 py-4 text-center text-slate-400">No section data yet.</td></tr>
            ) : (
              renderRows(top)
            )}
          </tbody>
        </table>
      </div>
      {rest.length > 0 && (
        <Detail summary={`Show ${rest.length} more sections`}>
          <table className="w-full text-sm">
            <Head />
            <tbody>{renderRows(rest)}</tbody>
          </table>
        </Detail>
      )}
    </div>
  );
}

// ── Errors / friction ───────────────────────────────────────────────────────

function ErrorsPanel({
  errors,
  errorsSeries,
  friction,
}: {
  errors: ClientError[];
  errorsSeries: number[];
  friction: UxFriction[];
}) {
  const totalErrors = errorsSeries.reduce((a, b) => a + b, 0);
  const today = errorsSeries[errorsSeries.length - 1] ?? 0;
  const fr = friction.reduce(
    (a, r) => ({ rage: a.rage + r.rage_clicks, dead: a.dead + r.dead_clicks, exit: a.exit + r.exit_intent_shown }),
    { rage: 0, dead: 0, exit: 0 },
  );
  const top = errors.slice(0, 8);
  const rest = errors.slice(8);
  const renderRows = (list: ClientError[]) =>
    list.map((e, i) => (
      <tr key={`${e.message}-${e.source}-${e.line}-${i}`} className="border-t border-slate-100 align-top">
        <td className="px-3 py-2 text-slate-800">
          <span className="break-words font-mono text-xs">{e.message}</span>
          {(e.source || e.line) && (
            <div className="mt-0.5 truncate text-[11px] text-slate-400" title={`${e.source ?? ""}:${e.line ?? ""}`}>
              {shortPage(e.source ?? "")}{e.line ? `:${e.line}` : ""}
            </div>
          )}
        </td>
        <td className="hidden px-3 py-2 text-xs text-slate-500 sm:table-cell">{e.kind}</td>
        <td className="px-3 py-2 text-right font-mono">{e.count}</td>
        <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{e.sessions}</td>
        <td className="hidden px-3 py-2 font-mono text-[11px] text-slate-500 lg:table-cell" title={e.example_page ?? ""}>{shortPage(e.example_page ?? "")}</td>
        <td className="px-3 py-2 text-right text-xs text-slate-500">{e.last_seen ? ago(e.last_seen) : "—"}</td>
      </tr>
    ));
  const Head = () => (
    <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
      <tr>
        <th className="px-3 py-2">Error</th>
        <th className="hidden px-3 py-2 sm:table-cell">Kind</th>
        <th className="px-3 py-2 text-right">Count</th>
        <th className="hidden px-3 py-2 text-right sm:table-cell">Sessions</th>
        <th className="hidden px-3 py-2 lg:table-cell">Example page</th>
        <th className="px-3 py-2 text-right">Last seen</th>
      </tr>
    </thead>
  );
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Errors &amp; friction</h2>
      <p className="text-xs text-slate-500">
        JS errors grouped by message (debuggable, not a URL dump), plus a rage/dead-click and exit-intent line. A clean
        site shows a flat, near-zero error trend.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SnapshotCard
          label="JS errors / day"
          value={String(today)}
          sub={`${totalErrors} in 14 days`}
          series={errorsSeries}
          delta={deltaVsPrior(errorsSeries)}
          invertDelta
          accent="rose"
          status={today > 0 ? "warn" : "ok"}
        />
        <Kpi label="Rage clicks" value={String(fr.rage)} sub="rapid repeat clicks" />
        <Kpi label="Dead clicks" value={String(fr.dead)} sub="clicks that did nothing" />
        <Kpi label="Exit-intent shown" value={String(fr.exit)} sub="leave-intent popups" />
      </div>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <Head />
          <tbody>
            {top.length === 0 ? (
              <tr><td colSpan={6} className="px-3 py-4 text-center text-slate-400">No JS errors logged — clean.</td></tr>
            ) : (
              renderRows(top)
            )}
          </tbody>
        </table>
      </div>
      {rest.length > 0 && (
        <Detail summary={`Show ${rest.length} more error types`}>
          <table className="w-full text-sm">
            <Head />
            <tbody>{renderRows(rest)}</tbody>
          </table>
        </Detail>
      )}
    </div>
  );
}

// ── CTA performance ─────────────────────────────────────────────────────────

function CtaRows({ rows }: { rows: CtaPerformance[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
        <tr>
          <th className="px-3 py-2">CTA</th>
          <th className="px-3 py-2 text-right">Clicks</th>
          <th className="px-3 py-2 text-right">Sessions</th>
          <th className="hidden px-3 py-2 text-right sm:table-cell">→ Form starts</th>
          <th className="px-3 py-2">Click→Form</th>
          <th className="hidden px-3 py-2 text-right sm:table-cell">Leads</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={6} className="px-3 py-4 text-center text-slate-400">None yet.</td></tr>
        ) : (
          rows.map((c) => {
            const lbl = ctaLabel(c.cta_id);
            const isForm = c.goal === "form";
            const weak = isForm && (c.click_to_form_rate ?? 0) < 0.1;
            const widthPct = c.click_to_form_rate == null ? 0 : Math.min(100, c.click_to_form_rate * 100);
            return (
              <tr key={c.cta_id} className={`border-t border-slate-100 ${weak ? "bg-rose-50/50" : ""}`}>
                <td className="px-3 py-2">
                  <div className="font-medium text-slate-800">{lbl.name}</div>
                  <div className="text-[11px] text-slate-400">{lbl.where}</div>
                </td>
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
          })
        )}
      </tbody>
    </table>
  );
}

function CtaPerformancePanel({ rows }: { rows: CtaPerformance[] }) {
  const formCtas = rows.filter((c) => c.goal === "form").sort((a, b) => b.clicks - a.clicks);
  const others = rows.filter((c) => c.goal !== "form").sort((a, b) => Number(isDismissCta(a.cta_id)) - Number(isDismissCta(b.cta_id)) || b.clicks - a.clicks);
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">CTA performance</h2>
      <p className="text-xs text-slate-500">
        <strong>Sessions</strong> = distinct sessions that clicked this CTA. <strong>Click→Form</strong> = of those, how
        many then started the lead form. Form-bound CTAs are what should reach the form; a low rate there is a leak. The
        funnel&apos;s &quot;Clicked a form CTA&quot; stage counts <em>distinct sessions</em>, so a session clicking two
        form CTAs appears in two rows here but once in the funnel — that&apos;s why the totals differ.
      </p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 bg-emerald-50/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
          Form-bound CTAs
        </div>
        <CtaRows rows={formCtas} />
      </div>
      <Detail summary={`Other CTAs & dismissals (${others.length})`}>
        <CtaRows rows={others} />
      </Detail>
    </div>
  );
}

/** Where users abandon the lead form, field by field (highest abandon first). */
function FormDropoffPanel({ rows }: { rows: FormFieldDropoff[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Form-field drop-off</h2>
      <p className="text-xs text-slate-500">
        Of people who focused each field, how many left without finishing. A high abandon rate is where the lead form
        loses people — the field to simplify, make optional, or move later.
      </p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="hidden px-3 py-2 sm:table-cell">Form</th>
              <th className="px-3 py-2">Field</th>
              <th className="px-3 py-2 text-right">Focused</th>
              <th className="px-3 py-2 text-right">Abandoned</th>
              <th className="px-3 py-2">Abandon rate</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">Errors</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="px-3 py-4 text-center text-slate-400">No form-field data yet.</td></tr>
            ) : (
              rows.map((r, i) => {
                const weak = (r.abandon_rate ?? 0) >= 0.3;
                const widthPct = r.abandon_rate == null ? 0 : Math.min(100, r.abandon_rate * 100);
                return (
                  <tr key={`${r.form_id}-${r.field}-${i}`} className={`border-t border-slate-100 ${weak ? "bg-rose-50/50" : ""}`}>
                    <td className="hidden px-3 py-2 font-mono text-xs text-slate-500 sm:table-cell">{r.form_id || "—"}</td>
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

/** Excel gate funnel — collapsed by default, flagged when it underperforms. */
function ResourceGatePanel({ rows }: { rows: ResourceConversion[] }) {
  const totals = rows.reduce((a, r) => ({ views: a.views + r.gate_views, unlocks: a.unlocks + r.unlocks, leads: a.leads + r.lead_sessions }), { views: 0, unlocks: 0, leads: 0 });
  const rate = totals.views > 0 ? totals.unlocks / totals.views : null;
  const underperforming = totals.views >= 20 && (rate ?? 0) < 0.05;
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">Excel toolkit (gated download)</h2>
        {underperforming && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
            Underperforming — consider a form block instead
          </span>
        )}
      </div>
      <p className="text-xs text-slate-500">
        Saw gate → Unlocked (email) → Lead. Overall saw→unlock: <strong>{pct(rate)}</strong> ({totals.unlocks} of{" "}
        {totals.views}). {underperforming && "Few visitors want the download here — a direct lead-form block may convert better (logged as a recommendation)."}
      </p>
      <Detail summary="Show gate detail by topic & placement">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Topic</th>
              <th className="hidden px-3 py-2 sm:table-cell">Placement</th>
              <th className="px-3 py-2 text-right">Saw gate</th>
              <th className="px-3 py-2 text-right">Unlocked</th>
              <th className="px-3 py-2">Saw→Unlock</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">Leads</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="px-3 py-4 text-center text-slate-400">No gate data yet.</td></tr>
            ) : (
              rows.map((r, i) => {
                const t = getTopic(r.topic);
                const widthPct = r.view_to_unlock_rate == null ? 0 : Math.min(100, r.view_to_unlock_rate * 100);
                return (
                  <tr key={`${r.topic}-${r.placement}-${i}`} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-800">{t?.label ?? r.topic}</td>
                    <td className="hidden px-3 py-2 text-slate-600 sm:table-cell">{placementLabel(r.placement)}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.gate_views}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.unlocks}</td>
                    <td className="w-28 px-3 py-2">
                      <span className="text-slate-700">{pct(r.view_to_unlock_rate)}</span>
                      <div className="mt-1 h-1.5 rounded bg-slate-100">
                        <div className="h-1.5 rounded bg-emerald-500" style={{ width: `${widthPct}%` }} />
                      </div>
                    </td>
                    <td className="hidden px-3 py-2 text-right font-mono sm:table-cell">{r.lead_sessions}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Detail>
    </div>
  );
}

// ── Experiments tab pieces ──────────────────────────────────────────────────

function ExperimentLedger({ experiments }: { experiments: ExperimentResult[] }) {
  if (experiments.length === 0) return null;
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Experiments (A/B ledger)</h2>
      <p className="text-xs text-slate-500">
        The raw ledger (directional; significance needs volume). New experiments registered in{" "}
        <code className="rounded bg-slate-100 px-1">lib/experiments/registry.ts</code> appear here.
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
            {experiments.map((x) => (
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
  );
}

function OfferPerformancePanel({ rows }: { rows: PersonalizationResult[] }) {
  const agg = rows.reduce(
    (a, r) => ({ shown: a.shown + r.shown, clicked: a.clicked + r.clicked, leads: a.leads + r.converted_sessions }),
    { shown: 0, clicked: 0, leads: 0 },
  );
  const ctr = agg.shown > 0 ? agg.clicked / agg.shown : null;
  const lead = agg.shown > 0 ? agg.leads / agg.shown : null;
  const best = [...rows].sort((a, b) => (b.click_rate ?? 0) - (a.click_rate ?? 0))[0];
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Offer performance (personalised arm)</h2>
      <p className="text-xs text-slate-500">
        What happens <em>inside</em> the treatment arm — which behaviour-matched offers earn a click and a lead. Not a
        second A/B (every row&apos;s alternative is the generic site, measured by the card above).
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Offers shown" value={String(agg.shown)} />
        <Kpi label="Overall CTR" value={pct(ctr)} sub={`${agg.clicked} clicks`} />
        <Kpi label="Shown→Lead" value={pct(lead)} sub={`${agg.leads} leads`} />
        <Kpi label="Best offer (CTR)" value={best ? pct(best.click_rate) : "—"} sub={best ? ruleLabel(best.rule_id) : ""} />
      </div>
      <Detail summary={`Show all ${rows.length} offers`}>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Offer</th>
              <th className="hidden px-3 py-2 sm:table-cell">Where</th>
              <th className="hidden px-3 py-2 lg:table-cell">Why it fires</th>
              <th className="px-3 py-2 text-right">Shown</th>
              <th className="px-3 py-2 text-right">CTR</th>
              <th className="px-3 py-2 text-right">Shown→Lead</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="px-3 py-4 text-center text-slate-400">No personalisation data yet.</td></tr>
            ) : (
              rows.map((p, i) => (
                <tr key={`${p.surface}-${p.rule_id}-${p.topic}-${p.variant}-${i}`} className="border-t border-slate-100 align-top">
                  <td className="px-3 py-2">
                    <div className="font-medium text-slate-800">{ruleLabel(p.rule_id)}</div>
                    <div className="text-xs text-slate-500">“{personalizationHint(p.rule_id, p.topic)}” · {getTopic(p.topic)?.label ?? p.topic}</div>
                  </td>
                  <td className="hidden px-3 py-2 text-slate-600 sm:table-cell">
                    <div>{surfaceLabel(p.surface)}</div>
                    <div className="text-xs text-slate-400">{surfaceWhere(p.surface)}</div>
                  </td>
                  <td className="hidden px-3 py-2 text-xs text-slate-500 lg:table-cell">{ruleTrigger(p.rule_id)}</td>
                  <td className="px-3 py-2 text-right font-mono">{p.shown}</td>
                  <td className="px-3 py-2 text-right">{pct(p.click_rate)}</td>
                  <td className="px-3 py-2 text-right">{pct(p.shown_to_lead_rate)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Detail>
    </div>
  );
}

function experimentOneLiner(arms: ExperimentArms | undefined): string {
  const c = arms?.control;
  const t = arms?.treatment;
  if (!c || !t) return "Personalisation A/B: waiting for both arms to log sessions.";
  const cRate = c.conversion_rate ?? 0;
  const tRate = t.conversion_rate ?? 0;
  const lift = cRate > 0 ? (tRate - cRate) / cRate : null;
  if (lift == null) return `Personalisation A/B: ${c.sessions + t.sessions} sessions, control has no conversions yet.`;
  const sign = lift >= 0 ? "+" : "";
  return `Personalisation A/B: ${sign}${(lift * 100).toFixed(0)}% conversions vs control (${c.sessions + t.sessions} sessions).`;
}

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string; country?: string }>;
}) {
  const { k, country: countryParam } = await searchParams;
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || k !== expected) notFound();

  const country = countryParam || "GB";
  const countryFilter = country === "ALL" ? undefined : country;
  const qs = `k=${expected}&country=${country}`;

  const now = new Date();
  const isoOf = (d: Date) => d.toISOString();
  const from30 = new Date(now.getTime() - 30 * 86400000);
  const from14 = new Date(now.getTime() - 14 * 86400000);

  const siteKey = niche.content_strategy.source_identifier;
  const [
    funnel,
    calculators,
    calcPlacement,
    resourceGate,
    visitors,
    leads,
    personalization,
    experiments,
    experimentArms,
    countryOptions,
    ctaPerformance,
    formDropoff,
    sectionActions,
    uxFriction,
    clientErrors,
    errorsDaily,
    tsDaily,
  ] = await Promise.all([
    getFunnelDaily(siteKey, countryFilter),
    getCalculatorConversion(siteKey, countryFilter),
    getCalculatorConversionByPlacement(siteKey, countryFilter),
    getResourceConversion(siteKey),
    getTopVisitors(siteKey, 500, countryFilter),
    getLeadsForSite(siteKey),
    getPersonalizationResults(siteKey),
    getExperimentResults(siteKey),
    getExperimentArms(siteKey),
    getCountryOptions(siteKey),
    getCtaPerformance(siteKey, countryFilter),
    getFormFieldDropoff(siteKey, countryFilter),
    getSectionActions(siteKey, countryFilter),
    getUxFriction(siteKey, countryFilter),
    getClientErrors(siteKey, countryFilter),
    getEventDaily(siteKey, "client_error", isoOf(from14), isoOf(now), countryFilter),
    getTimeseries(siteKey, "1 day", isoOf(from30), isoOf(now), countryFilter),
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
  const newVsReturning: Array<[string, number]> = [
    ["Returning", returningCount],
    ["New", newCount],
  ];

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
  const avgEngaged = visitors.length > 0 ? visitors.reduce((a, v) => a + (v.total_engaged_ms || 0), 0) / visitors.length : 0;
  const funnelDays = new Set(funnel.map((d) => d.date)).size;

  // Health sparklines (last 14 days).
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
    { label: "↳ Used calculator", n: totals.calc, denom: totals.engaged, denomLabel: "of engaged", branch: true },
    { label: "Clicked a form CTA", n: totals.formCta, denom: totals.engaged, denomLabel: "of engaged" },
    { label: "Started form", n: totals.form, denom: totals.formCta, denomLabel: "of form-CTA" },
    { label: "Submitted", n: totals.converted, denom: totals.form, denomLabel: "of form starts" },
  ];

  const calcAgg = calculators.reduce(
    (a, c) => ({ viewed: a.viewed + c.viewed, computed: a.computed + c.computed, leads: a.leads + c.lead_sessions }),
    { viewed: 0, computed: 0, leads: 0 },
  );
  const calcAttention = scoreCalculators(calculators).filter((c) => c.needsAttention).length;

  // Serializable, admin-only visitor rows for the client filter/table.
  const visitorRows: VisitorRow[] = visitors.map((v) => {
    const lead = leadByVisitor.get(v.visitor_id) || null;
    const entry = v.entry_paths?.[0] || "";
    const topic = entry ? getTopic(deriveTopic(entry)) : null;
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
      topic: topic?.label ?? null,
      converted: !!(v.converted || lead),
      lead_name: lead?.full_name ?? null,
      lead_email: lead?.email ?? null,
      lead_role: lead?.role ?? null,
    };
  });

  // ── Tab section nodes ──

  const overviewSection = (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SnapshotCard label="Sessions / day" value={String(totals.sessions)} sub={`last ${funnelDays} days`} series={sessionsSeries} delta={deltaVsPrior(sessionsSeries)} accent="sky" />
        <SnapshotCard label="Leads / day" value={String(totals.converted)} sub="conversions" series={leadsSeries} delta={deltaVsPrior(leadsSeries)} accent="emerald" />
        <SnapshotCard label="Conversion rate" value={pct(convRate)} sub={`${visitors.length} visitors`} series={convertedSeries} delta={deltaVsPrior(convertedSeries)} accent="emerald" />
        <SnapshotCard label="Engaged / day" value={secs(avgEngaged)} sub="avg per visitor" series={engagedSeries} delta={deltaVsPrior(engagedSeries)} accent="slate" />
      </div>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/40 px-3 py-2 text-xs text-emerald-900">
        {experimentOneLiner(experimentArms.personalization)} <span className="text-emerald-700">See the Experiments tab.</span>
      </div>

      <h2 className="mt-8 text-lg font-bold text-slate-900">Conversion funnel</h2>
      <p className="mt-1 text-xs text-slate-500">
        A true funnel: each mainline stage is a subset of the one above. <strong>Clicked a form CTA</strong> counts only
        CTAs that point at the lead form (dismiss/close buttons and tool links don&apos;t count). <strong>Used
        calculator</strong> is a side-branch off Engaged, not a step toward the form.
      </p>
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
        <Link href={`/admin/analytics/trends?${qs}`} className="text-xs text-emerald-700 underline">View trends →</Link>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Breakdown title="Traffic source" rows={tally(visitors, "referrer_host")} />
        <Breakdown title="Device" rows={tally(visitors, "device_type")} />
        <Breakdown title="Country" rows={tally(visitors, "country")} />
        <Breakdown title="New vs returning" rows={newVsReturning} />
      </div>
    </div>
  );

  const visitorsSection = <VisitorsTable rows={visitorRows} adminKey={expected} country={country} />;

  const experimentsSection = (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Live A/B tests</h2>
        <p className="mt-1 text-xs text-slate-500">
          Each running experiment, control (current) vs treatment (new), updating as data accrues. Lift and significance
          are honest: directional until each arm has ~{AB_MIN_SESSIONS}+ sessions.
        </p>
        <div className="mt-3 space-y-4">
          {runningExperiments().map((e) => (
            <ExperimentCard
              key={e.key}
              meta={experimentMeta(e.key)}
              arms={experimentArms[e.key] ?? { control: null, treatment: null }}
            />
          ))}
        </div>
      </div>
      <ExperimentLedger experiments={experiments} />
      <OfferPerformancePanel rows={personalization} />
    </div>
  );

  const behaviourSection = (
    <div className="space-y-8">
      <CalculatorsPanel placement={calcPlacement} agg={calcAgg} attentionCount={calcAttention} computesSeries={computesSeries} />
      <ContentEngagementPanel rows={sectionActions} />
      <ErrorsPanel errors={clientErrors} errorsSeries={errorsSeries} friction={uxFriction} />
    </div>
  );

  const conversionSection = (
    <div className="space-y-8">
      <CtaPerformancePanel rows={ctaPerformance} />
      <FormDropoffPanel rows={formDropoff} />
      <ResourceGatePanel rows={resourceGate} />
      <Link href={`/admin/analytics/leads?${qs}`} className="inline-block text-xs text-emerald-700 underline">View all leads →</Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <div className="flex flex-wrap items-center gap-3 text-xs sm:gap-4">
          <CountrySelect value={country} options={countryOptions} adminKey={expected} />
          <Link href={`/admin/analytics/trends?${qs}`} className="text-emerald-700 underline">Trends</Link>
          <Link href={`/admin/analytics/leads?${qs}`} className="text-emerald-700 underline">All leads</Link>
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
