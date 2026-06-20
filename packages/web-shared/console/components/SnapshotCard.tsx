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
  tag,
  accent = "emerald",
  invertDelta = false,
  compact = false,
}: {
  label: string;
  value: string;
  sub?: string;
  series?: number[];
  delta?: number | null;
  status?: "ok" | "warn" | null;
  /** Optional small pill in the card header, e.g. the active time window. */
  tag?: string;
  accent?: Accent;
  invertDelta?: boolean;
  compact?: boolean;
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
    <div className="rounded-xl border border-slate-200 bg-white p-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="min-w-0 truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</span>
        <span className="flex shrink-0 items-center gap-1.5">
          {tag && (
            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {tag}
            </span>
          )}
          {status && <span className={`h-2 w-2 rounded-full ${DOT[status]}`} aria-hidden />}
        </span>
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className={`${compact ? "text-base" : "text-xl"} font-semibold tracking-tight tabular-nums text-slate-900`}>{value}</span>
        {deltaEl && <span className="text-[11px] font-medium">{deltaEl}</span>}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-slate-500">{sub}</div>}
      {series && series.length > 0 && (
        <div className={`mt-3 ${ACCENT_TEXT[accent]}`}>
          <Sparkline values={series} height={28} />
        </div>
      )}
    </div>
  );
}
