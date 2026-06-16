"use client";

/**
 * FunnelOverTimeChart — conversion funnel as a time series.
 *
 * Shows four funnel stages as separate lines over time so you can see the
 * funnel move rather than as a single snapshot. Useful for spotting when
 * form-start or lead-conversion rates shift.
 *
 * Self-contained: plain recharts + console slate/emerald Tailwind language.
 * No functions passed as props (RSC safe). en-GB date formatting throughout.
 */
import * as React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type FunnelPoint = {
  date: string;
  sessions: number;
  engaged_sessions: number;
  form_start_sessions: number;
  converted_sessions: number;
};

type Props = {
  data: FunnelPoint[];
  label: string;
};

/** Series config: label, dataKey, colour, strokeWidth. */
const SERIES = [
  {
    key: "sessions" as const,
    label: "Sessions",
    color: "#94a3b8",
    width: 1.5,
  },
  {
    key: "engaged_sessions" as const,
    label: "Engaged",
    color: "#38bdf8",
    width: 1.5,
  },
  {
    key: "form_start_sessions" as const,
    label: "Form starts",
    color: "#f59e0b",
    width: 1.5,
  },
  {
    key: "converted_sessions" as const,
    label: "Leads",
    color: "#059669",
    width: 2.5,
  },
] as const;

type SeriesKey = (typeof SERIES)[number]["key"];

type ChartRow = FunnelPoint & { tick: string };

/** Precompute tick label for a date string: "16 Jun" style. */
function formatDateTick(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

/** Hover tooltip: date + all four series values with colour swatches. */
function FunnelTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload?: ChartRow;
    name?: string;
    value?: number | string;
    color?: string;
  }>;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;

  const dateLabel = new Date(row.date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-w-[10rem] rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium text-slate-900">{dateLabel}</div>
      {payload.map((p) => (
        <div key={p.name} className="mt-1 flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-slate-500">{p.name}</span>
          <span className="ml-auto font-mono font-medium tabular-nums text-slate-900">
            {typeof p.value === "number"
              ? p.value.toLocaleString("en-GB")
              : String(p.value ?? "")}
          </span>
        </div>
      ))}
    </div>
  );
}

export function FunnelOverTimeChart({ data, label }: Props) {
  // Sort ascending by date (caller may pass descending).
  const sorted = React.useMemo<ChartRow[]>(() => {
    const copy = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return copy.map((d) => ({ ...d, tick: formatDateTick(d.date) }));
  }, [data]);

  // Thin X-axis ticks for dense windows.
  const tickInterval = Math.max(0, Math.ceil(sorted.length / 8) - 1);

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900">{label}</h3>
        <div className="mt-3 flex h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
          No data in this window
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900">{label}</h3>
      <div className="mt-3">
        <ResponsiveContainer
          width="100%"
          height={200}
          initialDimension={{ width: 320, height: 200 }}
        >
          <LineChart
            accessibilityLayer
            data={sorted}
            margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="tick"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={16}
              interval={tickInterval}
              fontSize={11}
              tick={{ fill: "#64748b" }}
            />
            <YAxis
              width={28}
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              allowDecimals={false}
              fontSize={11}
              tick={{ fill: "#64748b" }}
            />
            <Tooltip content={<FunnelTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: "#64748b" }} />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key as SeriesKey}
                name={s.label}
                dot={false}
                strokeWidth={s.width}
                stroke={s.color}
                activeDot={{ r: 3, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
