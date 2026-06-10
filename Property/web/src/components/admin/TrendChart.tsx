"use client";

/**
 * Polished client-side trend chart for the admin dashboard.
 *
 * RSC note: a Server Component cannot pass function props across the boundary,
 * so the parent passes a `formatType` STRING and all en-GB date formatting is
 * done here, inside the client component.
 */
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import type { TimePoint } from "@/lib/analytics/server/adminData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type Metric = "sessions" | "events" | "leads";
type FormatType = "time" | "hour" | "day";

type Props = {
  data: TimePoint[];
  metric: Metric;
  label: string;
  formatType: FormatType;
};

/** en-GB tick/tooltip formatters, keyed by granularity. */
function formatBucket(iso: string, formatType: FormatType): string {
  const d = new Date(iso);
  switch (formatType) {
    case "time":
      return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    case "hour":
      return d.toLocaleString("en-GB", { weekday: "short", hour: "2-digit" });
    case "day":
      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    default:
      return iso;
  }
}

/** Longer label for the hover tooltip header. */
function formatBucketLong(iso: string, formatType: FormatType): string {
  const d = new Date(iso);
  switch (formatType) {
    case "time":
      return d.toLocaleString("en-GB", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    case "hour":
      return d.toLocaleString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
      });
    case "day":
      return d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    default:
      return iso;
  }
}

const METRIC_LABEL: Record<Metric, string> = {
  sessions: "Sessions",
  events: "Events",
  leads: "Leads",
};

// Leads ride the indigo chart var; sessions/events ride emerald.
const METRIC_COLOR: Record<Metric, string> = {
  sessions: "var(--chart-1)",
  events: "var(--chart-1)",
  leads: "var(--chart-2)",
};

export function TrendChart({ data, metric, label, formatType }: Props) {
  const points = React.useMemo(
    () =>
      data.map((d) => ({
        bucket: d.bucket,
        value: d[metric],
        tick: formatBucket(d.bucket, formatType),
      })),
    [data, metric, formatType],
  );

  const total = React.useMemo(
    () => data.reduce((a, d) => a + d[metric], 0),
    [data, metric],
  );
  const peak = React.useMemo(
    () => data.reduce((m, d) => Math.max(m, d[metric]), 0),
    [data, metric],
  );

  const color = METRIC_COLOR[metric];
  const config = {
    value: { label: METRIC_LABEL[metric], color },
  } satisfies ChartConfig;

  // Thin out X-axis ticks so dense windows (e.g. 96 fifteen-minute buckets)
  // stay legible.
  const tickInterval = Math.max(0, Math.ceil(points.length / 8) - 1);

  return (
    <Card className="gap-3 rounded-xl border-slate-200 py-4 shadow-sm">
      <CardHeader className="px-4">
        <div className="flex items-baseline justify-between gap-3">
          <CardTitle className="text-sm font-bold text-slate-900">{label}</CardTitle>
          <span className="shrink-0 text-xs tabular-nums text-slate-500">
            {total.toLocaleString("en-GB")} total · peak {peak.toLocaleString("en-GB")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        {data.length === 0 ? (
          <div className="flex h-[160px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
            No data in this window
          </div>
        ) : (
          <ChartContainer config={config} className="aspect-auto h-[160px] w-full">
            <AreaChart
              accessibilityLayer
              data={points}
              margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`fill-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="tick"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={16}
                interval={tickInterval}
                fontSize={11}
              />
              <YAxis
                width={28}
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                allowDecimals={false}
                fontSize={11}
              />
              <ChartTooltip
                cursor={{ stroke: color, strokeOpacity: 0.3, strokeWidth: 1 }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(_, payload) => {
                      const iso = payload?.[0]?.payload?.bucket as string | undefined;
                      return iso ? formatBucketLong(iso, formatType) : "";
                    }}
                  />
                }
              />
              <Area
                dataKey="value"
                name={METRIC_LABEL[metric]}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                fill={`url(#fill-${metric})`}
                dot={false}
                activeDot={{ r: 3, strokeWidth: 0 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
