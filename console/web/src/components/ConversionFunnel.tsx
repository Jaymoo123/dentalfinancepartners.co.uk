/**
 * Conversion funnel — proportional bars.
 *
 * Each bar's width is the stage's share of ALL visitors (the top stage), so the
 * funnel visibly narrows from top to bottom and it is always clear what the bar
 * is "out of". Every row shows the count, that share of visitors, and the step
 * conversion from the previous meaningful stage (the number you actually act on).
 * "Used calculator" is a side path off Engaged, marked and not on the linear
 * visitor -> lead spine. Pure presentational; the page computes the windowed totals.
 */

export type FunnelTotals = {
  sessions: number;
  engaged: number;
  calc: number;
  formCta: number;
  form: number;
  converted: number;
};

type Stage = {
  label: string;
  n: number;
  denom: number; // denominator for the step-conversion rate
  denomLabel: string; // e.g. "of engaged"
  branch?: boolean;
  goal?: boolean;
};

const share = (n: number, d: number) => (d > 0 ? (n / d) * 100 : 0);
const fmtPct = (p: number) => (p === 0 || p >= 10 ? `${Math.round(p)}%` : `${p.toFixed(1)}%`);

export default function ConversionFunnel({ totals }: { totals: FunnelTotals }) {
  const top = totals.sessions;
  const stages: Stage[] = [
    { label: "Sessions", n: totals.sessions, denom: totals.sessions, denomLabel: "" },
    { label: "Engaged", n: totals.engaged, denom: totals.sessions, denomLabel: "of sessions" },
    { label: "Used calculator", n: totals.calc, denom: totals.engaged, denomLabel: "of engaged", branch: true },
    { label: "Clicked form CTA", n: totals.formCta, denom: totals.engaged, denomLabel: "of engaged" },
    { label: "Started form", n: totals.form, denom: totals.formCta, denomLabel: "of form CTA" },
    { label: "Submitted", n: totals.converted, denom: totals.form, denomLabel: "of form starts", goal: true },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-2">
        <span className="text-xs font-medium text-slate-500">Stage</span>
        <span className="text-[11px] text-slate-400">
          bar = share of all sessions · <span className="text-slate-500">↓</span> = conversion from previous step
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {stages.map((s) => {
          const shareOfVisitors = share(s.n, top);
          const stepRate = share(s.n, s.denom);
          // Show the step conversion only when it adds info beyond "share of visitors"
          // (for Engaged the denominator IS visitors, so it would be redundant).
          const showStep = !!s.denomLabel && s.denomLabel !== "of sessions";
          return (
            <div
              key={s.label}
              className={`grid grid-cols-[6.5rem_1fr] items-center gap-x-3 px-4 py-2.5 sm:grid-cols-[10rem_1fr] ${s.branch ? "bg-slate-50/50" : ""}`}
            >
              <div
                className={`min-w-0 truncate text-sm ${s.branch ? "text-slate-500" : s.goal ? "font-semibold text-emerald-700" : "font-semibold text-slate-800"}`}
              >
                {s.branch ? <span className="text-slate-300">└&nbsp;</span> : null}
                {s.label}
                {s.branch ? (
                  <span className="ml-1.5 rounded bg-slate-200 px-1 py-px text-[10px] font-medium text-slate-500">
                    side path
                  </span>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2.5 flex-1 rounded-full bg-slate-100">
                  <div
                    className={`h-2.5 rounded-full ${s.branch ? "bg-sky-400" : s.goal ? "bg-emerald-600" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(100, Math.max(shareOfVisitors, s.n > 0 ? 1.5 : 0))}%` }}
                  />
                </div>
                <div className="flex shrink-0 items-baseline justify-end gap-2 text-right">
                  <span className="w-12 font-mono text-sm font-semibold tabular-nums text-slate-900">
                    {s.n.toLocaleString("en-GB")}
                  </span>
                  <span className="w-9 text-xs tabular-nums text-slate-500">{fmtPct(shareOfVisitors)}</span>
                  <span className="hidden w-28 text-xs tabular-nums text-slate-400 sm:inline">
                    {showStep ? `↓ ${fmtPct(stepRate)} ${s.denomLabel}` : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
