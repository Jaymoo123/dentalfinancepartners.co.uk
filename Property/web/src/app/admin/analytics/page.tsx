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
  getCalculatorConversionByPlacement,
  getResourceConversion,
  getTopVisitors,
  getLeadsForSite,
  getPersonalizationResults,
  getExperimentResults,
  getPersonalizationAB,
  type VisitorJourney,
  type CalculatorConversion,
  type CalculatorConversionPlacement,
  type ResourceConversion,
  type PersonalizationAB,
} from "@/lib/analytics/server/adminData";
import { ruleLabel, surfaceLabel, surfaceWhere, ruleTrigger } from "@/lib/intent/labels";
import { getTopic } from "@/lib/intent/taxonomy";
import DashboardTabs from "./DashboardTabs";

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
  const label = topic.label.toLowerCase();
  switch (ruleId) {
    case "escalate_specialist":
      return `Speak to a ${label} specialist`;
    case "engaged_guide":
      return `The complete ${label} guide (+ Excel)`;
    case "returning_welcome":
      return `Pick up where you left off — ${label}`;
    case "topic_cta":
    case "deep_scroll_offer":
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

/**
 * The minimum sessions PER ARM before we trust an A/B number. Below this we show
 * a "directional only" state instead of a confident lift figure.
 */
const AB_MIN_SESSIONS = 100;

/**
 * Prominent personalisation A/B head-to-head card. Honest about significance:
 * if either arm is below AB_MIN_SESSIONS we say so rather than quoting a lift.
 */
function PersonalizationABCard({ ab }: { ab: PersonalizationAB }) {
  const { control, treatment } = ab;
  const hasBoth = !!control && !!treatment;
  const cRate = control?.conversion_rate ?? 0;
  const tRate = treatment?.conversion_rate ?? 0;
  const cSessions = control?.sessions ?? 0;
  const tSessions = treatment?.sessions ?? 0;
  const enough = hasBoth && cSessions >= AB_MIN_SESSIONS && tSessions >= AB_MIN_SESSIONS;

  const relLift = cRate > 0 ? (tRate - cRate) / cRate : null;

  // Two-proportion z-test (bonus): only meaningful once both arms have volume.
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

  // Headline: signal vs honest not-enough-data.
  let headline: React.ReactNode;
  let headlineClass = "text-slate-900";
  if (!hasBoth) {
    headline = "Waiting for both arms to log sessions";
    headlineClass = "text-slate-500";
  } else if (!enough) {
    headline = "Not enough data yet — directional only (need ~100+ sessions per arm)";
    headlineClass = "text-amber-700";
  } else if (relLift == null) {
    headline = "Control has no conversions yet — lift not computable";
    headlineClass = "text-slate-500";
  } else {
    const sign = relLift >= 0 ? "+" : "";
    const dir = relLift >= 0 ? "vs" : "below";
    headline = (
      <>
        Personalisation: <span className={relLift >= 0 ? "text-emerald-700" : "text-rose-700"}>{sign}{(relLift * 100).toFixed(0)}% conversions</span> {dir} control
      </>
    );
    headlineClass = "text-slate-900";
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
          Personalisation A/B — control vs treatment
        </h3>
        {enough && sig && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              sig.significant ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
          >
            {sig.significant ? "Statistically significant (95%)" : "Not yet significant (95%)"}
          </span>
        )}
      </div>

      <p className={`mt-2 text-xl font-bold ${headlineClass}`}>{headline}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Control (generic)</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pct(control?.conversion_rate)}</div>
          <div className="mt-0.5 text-xs text-slate-500">
            {cSessions} sessions · {control?.converted_sessions ?? 0} converted
          </div>
        </div>
        <div className="rounded-lg border border-emerald-300 bg-white p-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Treatment (personalised)</div>
          <div className="mt-1 text-2xl font-bold text-slate-900">{pct(treatment?.conversion_rate)}</div>
          <div className="mt-0.5 text-xs text-slate-500">
            {tSessions} sessions · {treatment?.converted_sessions ?? 0} converted
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Control (~25%) gets the plain generic site; treatment (~75%) gets behaviour-driven offers. Relative lift =
        (treatment − control) ÷ control. Honest by design: figures stay directional until each arm has ~
        {AB_MIN_SESSIONS}+ sessions.
        {enough && sig && !sig.significant && " The current gap could still be noise."}
      </p>
    </div>
  );
}

/**
 * Per-calculator opportunity scoring. We surface the weaker of the two funnel
 * steps (view→compute, compute→lead) and rank by traffic × how bad that step is,
 * so the biggest fixable losses float to the top.
 */
type CalcOpportunity = CalculatorConversion & {
  weakStep: "compute" | "lead" | null;
  weakRate: number | null;
  opportunityScore: number;
  needsAttention: boolean;
};

// Below these rates a step is "weak" enough to flag (given enough traffic).
const WEAK_COMPUTE_RATE = 0.4; // < 40% of viewers actually compute
const WEAK_LEAD_RATE = 0.05; // < 5% of computers become a lead
const MIN_TRAFFIC_TO_FLAG = 20; // ignore tiny-sample noise

function scoreCalculators(rows: CalculatorConversion[]): CalcOpportunity[] {
  const scored: CalcOpportunity[] = rows.map((c) => {
    const compute = c.compute_rate;
    const lead = c.computed_to_lead_rate;
    const hasTraffic = c.viewed >= MIN_TRAFFIC_TO_FLAG;

    // Estimate sessions "lost" at each step to compare apples to apples.
    // view→compute loss is measured against viewers; compute→lead against computers.
    const computeGap = compute != null ? Math.max(0, WEAK_COMPUTE_RATE - compute) : 0;
    const leadGap = lead != null ? Math.max(0, WEAK_LEAD_RATE - lead) : 0;
    const computeLoss = computeGap * c.viewed;
    const leadLoss = leadGap * c.computed;

    let weakStep: "compute" | "lead" | null = null;
    let weakRate: number | null = null;
    let opportunityScore = 0;
    if (hasTraffic && (computeLoss > 0 || leadLoss > 0)) {
      if (computeLoss >= leadLoss) {
        weakStep = "compute";
        weakRate = compute;
        opportunityScore = computeLoss;
      } else {
        weakStep = "lead";
        weakRate = lead;
        opportunityScore = leadLoss;
      }
    }

    return {
      ...c,
      weakStep,
      weakRate,
      opportunityScore,
      needsAttention: weakStep != null,
    };
  });

  // Opportunities first (by score), then the rest by traffic.
  return scored.sort((a, b) => {
    if (b.opportunityScore !== a.opportunityScore) return b.opportunityScore - a.opportunityScore;
    return b.viewed - a.viewed;
  });
}

function CalcStepBar({ rate, kind }: { rate: number | null; kind: "compute" | "lead" }) {
  const weak = kind === "compute" ? WEAK_COMPUTE_RATE : WEAK_LEAD_RATE;
  const isWeak = rate != null && rate < weak;
  const widthPct = rate == null ? 0 : Math.min(100, rate * 100);
  return (
    <div>
      <span className={isWeak ? "font-semibold text-rose-600" : "text-slate-700"}>{pct(rate)}</span>
      <div className="mt-1 h-1.5 rounded bg-slate-100">
        <div
          className={`h-1.5 rounded ${isWeak ? "bg-rose-400" : "bg-emerald-500"}`}
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </div>
  );
}

function CalculatorPanel({ rows }: { rows: CalcOpportunity[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Calculator drop-off & opportunities</h2>
      <p className="mt-1 text-xs text-slate-500">
        Funnel per tool: <strong>Viewed → Computed → Lead</strong>. Rows with decent traffic but a weak step are flagged
        and sorted to the top (biggest traffic × worst rate first). A weak <em>view→compute</em> means people open it
        but don&apos;t finish; a weak <em>compute→lead</em> means they get a result but don&apos;t convert.
      </p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Calculator</th>
              <th className="px-3 py-2 text-right">Viewed</th>
              <th className="px-3 py-2 text-right">Computed</th>
              <th className="px-3 py-2 text-right">Leads</th>
              <th className="px-3 py-2">View→Compute</th>
              <th className="px-3 py-2">Compute→Lead</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={7} className="px-3 py-4 text-center text-slate-400">No calculator data yet.</td></tr>
            ) : (
              rows.map((c) => (
                <tr
                  key={c.calculator_slug}
                  className={`border-t border-slate-100 ${c.needsAttention ? "bg-amber-50/50" : ""}`}
                >
                  <td className="px-3 py-2 font-medium text-slate-800">{c.calculator_slug}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.viewed}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.computed}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.lead_sessions}</td>
                  <td className="w-32 px-3 py-2"><CalcStepBar rate={c.compute_rate} kind="compute" /></td>
                  <td className="w-32 px-3 py-2"><CalcStepBar rate={c.computed_to_lead_rate} kind="lead" /></td>
                  <td className="px-3 py-2">
                    {c.needsAttention ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                        Needs attention
                        <span className="font-normal text-amber-700">
                          ({c.weakStep === "compute" ? "low compute" : "low convert"})
                        </span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Note: <code className="rounded bg-slate-100 px-1">calc_view</code> was recently fixed, so very old rows may
        under-count views (and inflate their compute rate). Treat low-traffic tools with caution.
      </p>
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

/**
 * The SAME tool funnel, split by WHERE it was surfaced (calc page / blog / embed
 * iframe). `viewed` is visibility-gated, so blog embeds are not inflated by
 * readers who never scroll to the injected tool.
 */
function PlacementPanel({ rows }: { rows: CalculatorConversionPlacement[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Tool performance by placement</h2>
      <p className="mt-1 text-xs text-slate-500">
        The same tool, split by where it was surfaced. <strong>Viewed</strong> counts only when the tool actually
        scrolled into view, so blog embeds are not inflated by readers who never reach them. Use this to see whether the
        embedded tool earns its place in a category&apos;s posts.
      </p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Tool</th>
              <th className="px-3 py-2">Placement</th>
              <th className="px-3 py-2">Kind</th>
              <th className="px-3 py-2 text-right">Viewed</th>
              <th className="px-3 py-2 text-right">Computed</th>
              <th className="px-3 py-2 text-right">Leads</th>
              <th className="px-3 py-2">View→Compute</th>
              <th className="px-3 py-2">Compute→Lead</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={8} className="px-3 py-4 text-center text-slate-400">No placement data yet (lands once the new events accrue).</td></tr>
            ) : (
              rows.map((c, i) => (
                <tr key={`${c.calculator_slug}-${c.placement}-${c.tool_kind}-${i}`} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{c.calculator_slug}</td>
                  <td className="px-3 py-2 text-slate-600">{placementLabel(c.placement)}</td>
                  <td className="px-3 py-2 text-slate-500">{c.tool_kind}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.viewed}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.computed}</td>
                  <td className="px-3 py-2 text-right font-mono">{c.lead_sessions}</td>
                  <td className="w-32 px-3 py-2"><CalcStepBar rate={c.compute_rate} kind="compute" /></td>
                  <td className="w-32 px-3 py-2"><CalcStepBar rate={c.computed_to_lead_rate} kind="lead" /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * The email-gated Excel toolkit funnel: saw the gate (a real impression) ->
 * unlocked (email captured) -> lead, by topic and placement. The impression
 * denominator is what the slug-only calculator view could never give.
 */
function ResourceGatePanel({ rows }: { rows: ResourceConversion[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">Excel toolkit (gated download) funnel</h2>
      <p className="text-xs text-slate-500">
        The email-gated Excel model, by topic and placement: <strong>Saw gate → Unlocked → Lead</strong>. &quot;Saw
        gate&quot; is a real impression (the gate scrolled into view), so the saw→unlock rate is honest — a high rate
        means the offer pulls its weight where it is shown.
      </p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Topic</th>
              <th className="px-3 py-2">Placement</th>
              <th className="px-3 py-2 text-right">Saw gate</th>
              <th className="px-3 py-2 text-right">Unlocked</th>
              <th className="px-3 py-2">Saw→Unlock</th>
              <th className="px-3 py-2 text-right">Leads</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={6} className="px-3 py-4 text-center text-slate-400">No gate data yet (lands once the new gate_view events accrue).</td></tr>
            ) : (
              rows.map((r, i) => {
                const t = getTopic(r.topic);
                const widthPct = r.view_to_unlock_rate == null ? 0 : Math.min(100, r.view_to_unlock_rate * 100);
                return (
                  <tr key={`${r.topic}-${r.placement}-${i}`} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-medium text-slate-800">{t?.label ?? r.topic}</td>
                    <td className="px-3 py-2 text-slate-600">{placementLabel(r.placement)}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.gate_views}</td>
                    <td className="px-3 py-2 text-right font-mono">{r.unlocks}</td>
                    <td className="w-32 px-3 py-2">
                      <span className="text-slate-700">{pct(r.view_to_unlock_rate)}</span>
                      <div className="mt-1 h-1.5 rounded bg-slate-100">
                        <div className="h-1.5 rounded bg-emerald-500" style={{ width: `${widthPct}%` }} />
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right font-mono">{r.lead_sessions}</td>
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

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || k !== expected) notFound();

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
    personalizationAB,
  ] = await Promise.all([
    getFunnelDaily(siteKey),
    getCalculatorConversion(siteKey),
    getCalculatorConversionByPlacement(siteKey),
    getResourceConversion(siteKey),
    getTopVisitors(siteKey),
    getLeadsForSite(siteKey),
    getPersonalizationResults(siteKey),
    getExperimentResults(siteKey),
    getPersonalizationAB(siteKey),
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

  const calcOpportunities = scoreCalculators(calculators);

  // ── Section nodes (server-rendered, passed to the client tab switcher) ──

  const overviewSection = (
    <div>
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Visitors" value={String(visitors.length)} sub="most recent 500" />
        <Kpi label="Sessions" value={String(totals.sessions)} sub={`last ${funnel.length} days`} />
        <Kpi label="Conversion rate" value={pct(convRate)} sub={`${totals.converted} leads`} />
        <Kpi label="Avg engaged" value={secs(avgEngaged)} sub="per visitor" />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Visitors = unique people · Sessions = visits (reset after 30 min idle).
      </p>

      {/* Funnel */}
      <h2 className="mt-8 text-lg font-bold text-slate-900">Conversion funnel</h2>
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
    </div>
  );

  const acquisitionSection = (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">How people arrive</h2>
        <Link href={`/admin/analytics/trends?k=${expected}`} className="text-xs text-emerald-700 underline">
          View trends →
        </Link>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Breakdown title="Traffic source" rows={tally(visitors, "referrer_host")} />
        <Breakdown title="Device" rows={tally(visitors, "device_type")} />
        <Breakdown title="Country" rows={tally(visitors, "country")} />
        <Breakdown title="New vs returning" rows={newVsReturning} />
      </div>
    </div>
  );

  const behaviourSection = (
    <div className="space-y-8">
      <CalculatorPanel rows={calcOpportunities} />
      <PlacementPanel rows={calcPlacement} />

      {/* Visitors */}
      <div>
        <h2 className="text-lg font-bold text-slate-900">Visitors</h2>
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
    </div>
  );

  const conversionSection = (
    <div className="space-y-8">
      {/* Personalisation A/B — front and centre */}
      <PersonalizationABCard ab={personalizationAB} />

      {/* Excel toolkit (gate) funnel — a key lead surface across placements */}
      <ResourceGatePanel rows={resourceGate} />

      {/* Offer performance WITHIN the personalised (treatment) arm */}
      <div>
        <h2 className="text-lg font-bold text-slate-900">Offer performance (within the personalised arm)</h2>
        <p className="text-xs text-slate-500">
          The card above is the actual test: 25% of visitors get the plain generic site (control), 75% get
          behaviour-matched offers (treatment). This table breaks down what happens <em>inside</em> that 75% — which
          individual offers earn a click and a lead. It is <strong>not</strong> another A/B: the alternative for every
          row is the generic site, measured by the card. <strong>Where</strong> = the on-page slot the offer renders in;{" "}
          <strong>Why it fires</strong> = the behaviour that triggered it.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Offer</th>
                <th className="px-3 py-2">Where</th>
                <th className="px-3 py-2">Why it fires</th>
                <th className="px-3 py-2 text-right">Shown</th>
                <th className="px-3 py-2 text-right">Clicks</th>
                <th className="px-3 py-2 text-right">CTR</th>
                <th className="px-3 py-2 text-right">Shown→Lead</th>
              </tr>
            </thead>
            <tbody>
              {personalization.length === 0 ? (
                <tr><td colSpan={7} className="px-3 py-4 text-center text-slate-400">No personalisation data yet (the treatment arm logs these as offers are shown).</td></tr>
              ) : (
                personalization.map((p, i) => (
                  <tr key={`${p.surface}-${p.rule_id}-${p.topic}-${p.variant}-${i}`} className="border-t border-slate-100 align-top">
                    <td className="px-3 py-2">
                      <div className="font-medium text-slate-800">{ruleLabel(p.rule_id)}</div>
                      <div className="text-xs text-slate-500">
                        “{personalizationHint(p.rule_id, p.topic)}” · {getTopic(p.topic)?.label ?? p.topic}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-slate-600">
                      <div>{surfaceLabel(p.surface)}</div>
                      <div className="text-xs text-slate-400">{surfaceWhere(p.surface)}</div>
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-500">{ruleTrigger(p.rule_id)}</td>
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
      </div>

      {/* Experiments */}
      {experiments.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900">Experiments (A/B ledger)</h2>
          <p className="text-xs text-slate-500">
            The raw A/B ledger (directional; significance needs volume). Right now there is a single experiment —{" "}
            <code className="rounded bg-slate-100 px-1">personalization</code> (on vs off) — so these rows are exactly
            the control vs treatment in the card above. New experiments added in{" "}
            <code className="rounded bg-slate-100 px-1">lib/experiments/registry.ts</code> show up here.
          </p>
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
        </div>
      )}

      <Link href={`/admin/analytics/leads?k=${expected}`} className="inline-block text-xs text-emerald-700 underline">
        View all leads →
      </Link>
    </div>
  );

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

      <DashboardTabs
        overview={overviewSection}
        acquisition={acquisitionSection}
        behaviour={behaviourSection}
        conversion={conversionSection}
      />
    </div>
  );
}
