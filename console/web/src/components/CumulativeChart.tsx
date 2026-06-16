"use client";

/**
 * CumulativeChart — running cumulative total of a metric over time.
 *
 * Walks the TimePoint[] in bucket order, accumulates the chosen metric, and
 * plots the monotonically increasing total as a filled AreaChart. Useful for
 * showing "total leads to date" or "total sessions this period" at a glance.
 *
 * Self-contained: plain recharts + console slate/emerald Tailwind language.
 * No functions passed as props (RSC safe). en-GB number and date formatting.
 *
 * Imports formatBucket / formatBucketLong from TrendChart (already in bundle).
 */
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TimePoint } from "@accounting-network/web-shared/console/adminData";
import { formatBucket, formatBucketLong } from "./TrendChart";

type Metric = "leads" | "sessions" | "humans";
type FormatType = "time" | "hour" | "day";

type Props = {
  data: TimePoint[];
  metric: Metric;
  label: string;
  formatType: FormatType;
};

const METRIC_COLOR: Record<Metric, string> = {
  leads: "#4f46e5",
  sessions: "#059669",
  humans: "#7c3aed",
};

const METRIC_LABEL: Record<Metric, string> = {
  leads: "Leads",
  sessions: "Sessions",
  humans: "Visitors",
};

type CumulativePoint = {
  bucket: string;
  tick: string;
  value: number;
};

/** Custom hover tooltip: long bucket label + running total. */
function CumulativeTooltip({
  active,
  payload,
  formatType,
  metricLabel,
  color,
}: {
  active?: boolean;
  payload?: Array<{ payload?: CumulativePoint; value?: number | string }>;
  formatType: FormatType;
  metricLabel: string;
  color: string;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;
  const value = payload[0]?.value;
  return (
    <div className="min-w-[9rem] rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium text-slate-900">
        {formatBucketLong(point.bucket, formatType)}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ backgroundColor: color }}
        />
        <span className="text-slate-500">Cumulative {metricLabel.toLowerCase()}</span>
        <span className="ml-auto font-mono font-medium tabular-nums text-slate-900">
          {typeof value === "number"
            ? value.toLocaleString("en-GB")
            : String(value ?? "")}
        </span>
      </div>
    </div>
  );
}

export function CumulativeChart({ data, metric, label, formatType }: Props) {
  const gradientId = React.useId().replace(/:/g, "");

  // Build cumulative points in bucket order.
  const points = React.useMemo<CumulativePoint[]>(() => {
    let running = 0;
    return data.map((d) => {
      running += d[metric];
      return {
        bucket: d.bucket,
        tick: formatBucket(d.bucket, formatType),
        value: running,
      };
    });
  }, [data, metric, formatType]);

  const total = points.length > 0 ? points[points.length - 1].value : 0;

  const color = METRIC_COLOR[metric];
  const metricLabel = METRIC_LABEL[metric];

  // Thin X-axis ticks for dense windows.
  const tickInterval = Math.max(0, Math.ceil(points.length / 8) - 1);

  if (points.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900">{label}</h3>
        </div>
        <div className="mt-3 flex h-[160px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
          No data in this window
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900">{label}</h3>
        <span className="shrink-0 text-xs tabular-nums text-slate-500">
          {total.toLocaleString("en-GB")} total
        </span>
      </div>
      <div className="mt-3">
        <ResponsiveContainer
          width="100%"
          height={160}
          initialDimension={{ width: 320, height: 160 }}
        >
          <AreaChart
            accessibilityLayer
            data={points}
            margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`fill-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.04} />
              </linearGradient>
            </defs>
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
            <Tooltip
              cursor={{ stroke: color, strokeOpacity: 0.3, strokeWidth: 1 }}
              content={
                <CumulativeTooltip
                  formatType={formatType}
                  metricLabel={metricLabel}
                  color={color}
                />
              }
            />
            <Area
              dataKey="value"
              name={`Cumulative ${metricLabel.toLowerCase()}`}
              type="monotone"
              stroke={color}
              strokeWidth={2}
              fill={`url(#fill-${gradientId})`}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
