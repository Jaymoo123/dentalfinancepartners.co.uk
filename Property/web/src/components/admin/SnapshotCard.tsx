/**
 * Glance unit for the dashboard: a label, a big current value, an optional delta
 * vs the prior period, a trend sparkline, and an optional status dot. Pure
 * presentational / server-renderable. Reused across Overview, Calculators, Errors.
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
  /** Daily series for the sparkline (oldest → newest). */
  series?: number[];
  /** Fractional change vs the prior period (e.g. 0.2 = +20%). */
  delta?: number | null;
  status?: "ok" | "warn" | null;
  accent?: Accent;
  /** For metrics where "up is bad" (e.g. errors): flip the delta colour. */
  invertDelta?: boolean;
}) {
  let deltaEl: React.ReactNode = null;
  if (delta != null && Number.isFinite(delta)) {
    const up = delta >= 0;
    const good = invertDelta ? !up : up;
    deltaEl = (
      <span className={good ? "text-emerald-600" : "text-rose-600"}>
        {up ? "▲" : "▼"} {Math.abs(delta * 100).toFixed(0)}%
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
