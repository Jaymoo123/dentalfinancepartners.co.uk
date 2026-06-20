"use client";

/**
 * Multi-line trend chart: one line per site (estate overlay) or a single line
 * (per-site page). Recharts LineChart with a legend and an all-series hover
 * tooltip. recharts is a console-web-only dependency (same as TrendChart).
 *
 * Dates are formatted with timeZone:"UTC" so the server (UTC) and a UK browser
 * (BST) render identical tick strings — avoids the hydration mismatch the audit
 * found in the older TrendChart.
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

import type { SeriesMeta, MultiPoint } from "@/lib/multiSiteSeries";

type Props = {
  data: MultiPoint[];
  series: SeriesMeta[];
  label: string;
  /** Format Y axis + tooltip values as a percentage (for conversion). */
  asPercent?: boolean;
  /** Optional one-line note under the title. */
  note?: string;
};

function fmtDayUTC(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
}

function fmtDayLongUTC(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
}

type TooltipRow = { dataKey?: string | number; value?: number | string; color?: string };

function MultiTooltip({
  active,
  payload,
  series,
  asPercent,
}: {
  active?: boolean;
  payload?: Array<TooltipRow & { payload?: MultiPoint }>;
  series: SeriesMeta[];
  asPercent: boolean;
}) {
  if (!active || !payload?.length) return null;
  const bucket = payload[0]?.payload?.bucket;
  const rows = payload
    .filter((p) => typeof p.value === "number")
    .sort((a, b) => (b.value as number) - (a.value as number));
  return (
    <div className="min-w-[11rem] rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium text-slate-900">
        {bucket ? fmtDayLongUTC(String(bucket)) : ""}
      </div>
      <div className="mt-1 space-y-0.5">
        {rows.map((r) => {
          const meta = series.find((s) => s.key === r.dataKey);
          const v = r.value as number;
          return (
            <div key={String(r.dataKey)} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: r.color }}
              />
              <span className="text-slate-500">{meta?.label ?? String(r.dataKey)}</span>
              <span className="ml-auto font-mono font-medium tabular-nums text-slate-900">
                {asPercent ? `${(v * 100).toFixed(1)}%` : v.toLocaleString("en-GB")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MultiSiteTrendChart({ data, series, label, asPercent = false, note }: Props) {
  const points = React.useMemo(
    () => data.map((d) => ({ ...d, tick: fmtDayUTC(String(d.bucket)) })),
    [data],
  );
  const tickInterval = Math.max(0, Math.ceil(points.length / 8) - 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900">{label}</h3>
      {note && <p className="mt-0.5 text-[11px] text-slate-400">{note}</p>}
      <div className="mt-3">
        {data.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
            No data in this window
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={220}
            initialDimension={{ width: 480, height: 220 }}
          >
            <LineChart data={points} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
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
                width={asPercent ? 40 : 32}
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                allowDecimals={false}
                fontSize={11}
                tick={{ fill: "#64748b" }}
                tickFormatter={(v) =>
                  asPercent ? `${(Number(v) * 100).toFixed(0)}%` : String(v)
                }
              />
              <Tooltip
                content={<MultiTooltip series={series} asPercent={asPercent} />}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} iconType="plainline" />
              {series.map((s) => (
                <Line
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  type="monotone"
                  stroke={s.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
