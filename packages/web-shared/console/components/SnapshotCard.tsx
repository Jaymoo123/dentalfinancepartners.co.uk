/**
 * Glance unit for the dashboard: label, big value, optional delta vs prior
 * period, trend sparkline, optional status dot. Pure presentational /
 * server-renderable. Reused across Overview, Calculators, Errors panels.
 *
 * Shared across all operator consoles. Lifted from Property with no
 * behavioural changes (Property keeps its own copy until adoption).
 */
import { Sparkline } from "./Sparkline";

type Accent = "emerald" | "sky" | "rose" | "amber" | "slate";

const ACCENT_TEXT: Record<Accent, string> = {
  emerald: "text-emerald-600",
  sky: "text-sky-500",
  rose: "text-rose-500",
  amber: "text-amber-500",
  slate: "text-slate-400",
};
const DOT: Record<"ok" | "warn", string> = {
  ok: "bg-emerald-500",
  warn: "bg-amber-500",
};

export function SnapshotCard({
  label,
  value,
  sub,
  series,
  delta,
  status,
  accent = "emerald",
  invertDelta = false,
}: {
  label: string;
  value: string;
  sub?: string;
  series?: number[];
  delta?: number | null;
  status?: "ok" | "warn" | null;
  accent?: Accent;
  invertDelta?: boolean;
}) {
  let deltaEl: React.ReactNode = null;
  if (delta != null && Number.isFinite(delta)) {
    const up = delta >= 0;
    const good = invertDelta ? !up : up;
    deltaEl = (
      <span className={good ? "text-emerald-600" : "text-rose-600"}>
        {up ? "+" : "-"}{Math.abs(delta * 100).toFixed(0)}%
      </span>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
        {status && <span className={`h-2 w-2 rounded-full ${DOT[status]}`} aria-hidden />}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {deltaEl && <span className="text-xs font-semibold">{deltaEl}</span>}
      </div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
      {series && series.length > 0 && (
        <div className={`mt-3 ${ACCENT_TEXT[accent]}`}>
          <Sparkline values={series} height={28} />
        </div>
      )}
    </div>
  );
}
