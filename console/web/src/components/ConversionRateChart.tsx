"use client";

/**
 * Visitor-to-lead conversion rate over time, as an area chart.
 *
 * Computes `rate = leads / humans` per bucket and plots it on a percentage
 * Y-axis. Shows the overall conversion rate for the window in the card header.
 *
 * RSC note (the established lesson): server component passes serialisable
 * arrays + STRING props only; all formatting lives here inside the client
 * boundary. No functions passed in as props.
 *
 * Self-contained: plain recharts + the console's slate/indigo Tailwind language.
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

type FormatType = "time" | "hour" | "day";

type Props = {
  data: TimePoint[];
  label: string;
  formatType: FormatType;
};

const COLOR = "#4f46e5";

type ChartPoint = {
  bucket: string;
  tick: string;
  rate: number;
  leads: number;
  humans: number;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ payload?: ChartPoint; value?: number | string }>;
  formatType: FormatType;
};

function ConversionTooltip({ active, payload, formatType }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;
  return (
    <div className="min-w-[10rem] rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium text-slate-900">
        {formatBucketLong(point.bucket, formatType)}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ backgroundColor: COLOR }}
        />
        <span className="text-slate-500">Conversion</span>
        <span className="ml-auto font-mono font-medium tabular-nums text-slate-900">
          {(point.rate * 100).toFixed(1)}%
        </span>
      </div>
      <div className="mt-0.5 text-slate-400">
        {point.leads.toLocaleString("en-GB")} of {point.humans.toLocaleString("en-GB")} visitors
      </div>
    </div>
  );
}

export function ConversionRateChart({ data, label, formatType }: Props) {
  const gradientId = React.useId().replace(/:/g, "");

  const points = React.useMemo<ChartPoint[]>(
    () =>
      data.map((d) => ({
        bucket: d.bucket,
        tick: formatBucket(d.bucket, formatType),
        rate: d.humans > 0 ? d.leads / d.humans : 0,
        leads: d.leads,
        humans: d.humans,
      })),
    [data, formatType],
  );

  // Overall window conversion rate shown in the header.
  const { totalLeads, totalHumans } = React.useMemo(
    () => ({
      totalLeads: data.reduce((a, d) => a + d.leads, 0),
      totalHumans: data.reduce((a, d) => a + d.humans, 0),
    }),
    [data],
  );
  const overallRate = totalHumans > 0 ? totalLeads / totalHumans : 0;

  // Thin out X-axis ticks so dense windows stay legible.
  const tickInterval = Math.max(0, Math.ceil(points.length / 8) - 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900">{label}</h3>
        <span className="shrink-0 text-xs tabular-nums text-slate-500">
          {(overallRate * 100).toFixed(1)}% overall ({totalLeads.toLocaleString("en-GB")} of{" "}
          {totalHumans.toLocaleString("en-GB")} visitors)
        </span>
      </div>
      <div className="mt-3">
        {data.length === 0 ? (
          <div className="flex h-[160px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
            No data in this window
          </div>
        ) : (
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
                  <stop offset="5%" stopColor={COLOR} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={COLOR} stopOpacity={0.04} />
                </linearGradient>
              </defs>
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
                width={40}
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                fontSize={11}
                tick={{ fill: "#64748b" }}
                tickFormatter={(v) => (v * 100).toFixed(0) + "%"}
              />
              <Tooltip
                cursor={{ stroke: COLOR, strokeOpacity: 0.3, strokeWidth: 1 }}
                content={<ConversionTooltip formatType={formatType} />}
              />
              <Area
                dataKey="rate"
                name="Conversion rate"
                type="monotone"
                stroke={COLOR}
                strokeWidth={2}
                fill={`url(#fill-${gradientId})`}
                dot={false}
                activeDot={{ r: 3, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
