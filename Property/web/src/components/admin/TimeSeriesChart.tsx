/**
 * Dependency-free SVG bar chart for the admin Trends page. Server-rendered, no
 * client JS. Native <title> gives a hover tooltip per bar.
 */
import type { TimePoint } from "@/lib/analytics/server/adminData";

type Props = {
  data: TimePoint[];
  metric: "sessions" | "events" | "leads";
  label: string;
  format?: (iso: string) => string;
};

export function TimeSeriesChart({ data, metric, label, format }: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-400">
        {label}: no data in this window.
      </div>
    );
  }
  const max = Math.max(1, ...data.map((d) => d[metric]));
  const total = data.reduce((a, d) => a + d[metric], 0);
  const W = 720;
  const H = 120;
  const pad = 4;
  const bw = (W - pad * 2) / data.length;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-bold text-slate-900">{label}</h3>
        <span className="text-xs text-slate-500">{total} total · peak {max}</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${label} over time`}
      >
        {data.map((d, i) => {
          const h = (d[metric] / max) * (H - 16);
          return (
            <rect
              key={i}
              x={pad + i * bw}
              y={H - h}
              width={Math.max(1, bw - 1)}
              height={h}
              className={metric === "leads" ? "fill-indigo-500" : "fill-emerald-500"}
            >
              <title>{`${format ? format(d.bucket) : d.bucket}: ${d[metric]} ${metric}`}</title>
            </rect>
          );
        })}
      </svg>
    </div>
  );
}
