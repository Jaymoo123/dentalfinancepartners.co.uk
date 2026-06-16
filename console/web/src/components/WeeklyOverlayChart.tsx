"use client";

/**
 * Week-over-week overlay chart for the console trends page.
 *
 * Receives a daily TimePoint[] (typically 30 days) and pivots it into a
 * Mon-Sun grid so each week becomes a separate line series. Useful for spotting
 * weekday patterns and week-on-week trajectory at a glance.
 *
 * RSC note (the established lesson): server component passes serialisable
 * arrays + STRING props only; all date arithmetic and formatting lives here
 * inside the "use client" boundary.
 *
 * Self-contained: plain recharts + the console's slate/emerald Tailwind language.
 * No functions passed in as props.
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

import type { TimePoint } from "@accounting-network/web-shared/console/adminData";

type Metric = "sessions" | "humans" | "leads";

type Props = {
  data: TimePoint[];
  metric: Metric;
  label: string;
  weeks?: number;
};

/** Mon=0 … Sun=6 (ISO weekday order). */
const DOW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** Returns the UTC timestamp (midnight) of the Monday on or before the given date. */
function utcMonday(date: Date): number {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  // getUTCDay(): Sun=0 Mon=1 … Sat=6 → shift so Mon=0
  const dow = (d.getUTCDay() + 6) % 7;
  return d.getTime() - dow * 86_400_000;
}

/** Series key from week offset: 0="This week", 1="Last week", etc. */
function weekLabel(offset: number): string {
  if (offset === 0) return "This week";
  if (offset === 1) return "Last week";
  return `${offset} wks ago`;
}

// Colors per week offset: offset 0 = current (emerald), older = progressively grey.
const SERIES_COLOR: Record<number, string> = {
  0: "#059669",
  1: "#10b981",
  2: "#94a3b8",
  3: "#cbd5e1",
};

const SERIES_WIDTH: Record<number, number> = {
  0: 2.5,
  1: 1.5,
  2: 1.5,
  3: 1.5,
};

// Violet for humans metric overrides the first series colour.
const HUMANS_COLOR: Record<number, string> = {
  0: "#7c3aed",
  1: "#a78bfa",
  2: "#94a3b8",
  3: "#cbd5e1",
};

// Indigo for the leads metric.
const LEADS_COLOR: Record<number, string> = {
  0: "#4f46e5",
  1: "#818cf8",
  2: "#94a3b8",
  3: "#cbd5e1",
};

type RowDow = { dow: string; [series: string]: number | string | undefined };

function buildRows(data: TimePoint[], metric: Metric, weeks: number): RowDow[] {
  if (data.length === 0) return [];

  // Find the most recent Monday across all data points (UTC dates only).
  let latestMonday = 0;
  for (const pt of data) {
    const d = new Date(pt.bucket);
    const mon = utcMonday(d);
    if (mon > latestMonday) latestMonday = mon;
  }

  // Seed the 7 rows (one per weekday).
  const rows: RowDow[] = DOW_LABELS.map((dow) => ({ dow }));

  for (const pt of data) {
    const d = new Date(pt.bucket);
    const dow = (d.getUTCDay() + 6) % 7; // Mon=0 … Sun=6
    const ptMonday = utcMonday(d);
    const weekOffset = Math.round((latestMonday - ptMonday) / 86_400_000 / 7);
    if (weekOffset < 0 || weekOffset >= weeks) continue;
    const key = weekLabel(weekOffset);
    rows[dow][key] = (pt[metric] as number) ?? 0;
  }

  return rows;
}

export function WeeklyOverlayChart({ data, metric, label, weeks = 4 }: Props) {
  const rows = React.useMemo(() => buildRows(data, metric, weeks), [data, metric, weeks]);

  // Collect which series keys actually have data (at least one defined value).
  const activeSeries = React.useMemo<string[]>(() => {
    const keys: string[] = [];
    for (let offset = weeks - 1; offset >= 0; offset--) {
      const key = weekLabel(offset);
      if (rows.some((r) => r[key] !== undefined)) {
        keys.push(key);
      }
    }
    return keys;
  }, [rows, weeks]);

  const colorMap = metric === "humans" ? HUMANS_COLOR : metric === "leads" ? LEADS_COLOR : SERIES_COLOR;

  if (activeSeries.length === 0) {
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
            data={rows}
            margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="dow"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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
            <Tooltip
              formatter={(value) =>
                typeof value === "number" ? value.toLocaleString("en-GB") : String(value)
              }
            />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "#64748b" }}
            />
            {activeSeries.map((key) => {
              // Map the series key back to a week offset for colour lookup.
              const offset =
                key === "This week"
                  ? 0
                  : key === "Last week"
                    ? 1
                    : parseInt(key.split(" ")[0], 10);
              return (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  dot={false}
                  strokeWidth={SERIES_WIDTH[offset] ?? 1.5}
                  stroke={colorMap[offset] ?? "#cbd5e1"}
                  connectNulls={false}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
