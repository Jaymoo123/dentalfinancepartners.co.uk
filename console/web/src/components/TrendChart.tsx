"use client";

/**
 * Interactive trend chart for the console trends page.
 *
 * Recovered from Property's deleted admin console
 * (`Property/web/src/components/admin/TrendChart.tsx`, pre-F1 ref e403f749~1)
 * and ported console-app-local. Property's original leaned on its shadcn
 * Card/ChartContainer wrappers and theme CSS vars; the console app has neither,
 * so this port is SELF-CONTAINED: plain recharts + the console's existing
 * slate/emerald Tailwind language. recharts is a console-web dependency only,
 * NOT a web-shared one (internal tool, bundle impact accepted).
 *
 * RSC note (the established lesson): a Server Component cannot pass function
 * props across the boundary, so the parent passes a `formatType` STRING plus a
 * serialisable TimePoint[] and all en-GB date formatting happens here, inside
 * the client component.
 */
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TimePoint } from "@accounting-network/web-shared/console/adminData";

type Metric = "sessions" | "events" | "leads" | "humans";
type FormatType = "time" | "hour" | "day";

type Props = {
  data: TimePoint[];
  metric: Metric;
  label: string;
  formatType: FormatType;
};

/** en-GB tick/tooltip formatters, keyed by granularity. Exported for tests. */
export function formatBucket(iso: string, formatType: FormatType): string {
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

/** Longer label for the hover tooltip header. Exported for tests. */
export function formatBucketLong(iso: string, formatType: FormatType): string {
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
  humans: "Visitors",
};

// Leads ride indigo; sessions/events ride emerald; humans ride violet.
// (Property's original mapping, with the theme CSS vars replaced by literal hex
// — the console has no shadcn theme tokens.)
const METRIC_COLOR: Record<Metric, string> = {
  sessions: "#059669",
  events: "#059669",
  leads: "#4f46e5",
  humans: "#7c3aed",
};

// Lead markers: a faint vertical red line at each X bucket where >=1 lead came
// in, overlaid on the sessions/visitors timelines so you can see at a glance
// *when* leads landed against traffic. Multiple leads in the same bucket stack
// into a single line at a higher opacity (still one line, just less faint).
const LEAD_MARK_COLOR = "#dc2626"; // red-600
const LEAD_OPACITY_BASE = 0.22;
const LEAD_OPACITY_STEP = 0.18;
const LEAD_OPACITY_MAX = 0.85;

/** Stacked opacity for N leads sharing one bucket. Exported for tests. */
export function leadMarkOpacity(count: number): number {
  if (count <= 0) return 0;
  return Math.min(LEAD_OPACITY_BASE + (count - 1) * LEAD_OPACITY_STEP, LEAD_OPACITY_MAX);
}

export type LeadMark = { tick: string; count: number };

/**
 * One marker per X-axis bucket that saw at least one lead, with the lead count
 * summed across any TimePoints that format to the same tick (e.g. hourly rows
 * rendered at day granularity collapse to one daily marker, so leads in the same
 * visible window stack correctly). Returns [] for the leads metric itself, where
 * a lead line on the leads chart would be redundant. Exported for tests.
 */
export function buildLeadMarks(
  data: TimePoint[],
  metric: Metric,
  formatType: FormatType,
): LeadMark[] {
  if (metric === "leads") return [];
  const byTick = new Map<string, number>();
  for (const d of data) {
    if (d.leads > 0) {
      const tick = formatBucket(d.bucket, formatType);
      byTick.set(tick, (byTick.get(tick) ?? 0) + d.leads);
    }
  }
  return Array.from(byTick, ([tick, count]) => ({ tick, count }));
}

type ChartPoint = { bucket: string; value: number; tick: string };

/** Hover tooltip: long en-GB bucket label + metric value. */
function TrendTooltip({
  active,
  payload,
  formatType,
  metricLabel,
  color,
}: {
  active?: boolean;
  payload?: Array<{ payload?: ChartPoint; value?: number | string }>;
  formatType: FormatType;
  metricLabel: string;
  color: string;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;
  const value = payload[0]?.value;
  return (
    <div className="min-w-[8rem] rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium text-slate-900">
        {formatBucketLong(point.bucket, formatType)}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ backgroundColor: color }}
        />
        <span className="text-slate-500">{metricLabel}</span>
        <span className="ml-auto font-mono font-medium tabular-nums text-slate-900">
          {typeof value === "number" ? value.toLocaleString("en-GB") : String(value ?? "")}
        </span>
      </div>
    </div>
  );
}

export function TrendChart({ data, metric, label, formatType }: Props) {
  const gradientId = React.useId().replace(/:/g, "");

  const points = React.useMemo<ChartPoint[]>(
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

  // Buckets that saw a lead, summed per X tick → faint stacked red markers.
  const leadMarks = React.useMemo(
    () => buildLeadMarks(data, metric, formatType),
    [data, metric, formatType],
  );

  // Thin out X-axis ticks so dense windows (e.g. 96 fifteen-minute buckets)
  // stay legible.
  const tickInterval = Math.max(0, Math.ceil(points.length / 8) - 1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900">{label}</h3>
        <div className="flex shrink-0 items-baseline gap-2 text-xs tabular-nums text-slate-500">
          {leadMarks.length > 0 && (
            <span className="flex items-center gap-1 text-slate-400">
              <span
                className="inline-block h-3 w-px"
                style={{ backgroundColor: LEAD_MARK_COLOR }}
                aria-hidden
              />
              lead
            </span>
          )}
          <span>
            {total.toLocaleString("en-GB")} total · peak {peak.toLocaleString("en-GB")}
          </span>
        </div>
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
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.04} />
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
                width={28}
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                allowDecimals={false}
                fontSize={11}
                tick={{ fill: "#64748b" }}
              />
              {leadMarks.map((m) => (
                <ReferenceLine
                  key={`lead-${m.tick}`}
                  x={m.tick}
                  stroke={LEAD_MARK_COLOR}
                  strokeWidth={1}
                  strokeOpacity={leadMarkOpacity(m.count)}
                />
              ))}
              <Tooltip
                cursor={{ stroke: color, strokeOpacity: 0.3, strokeWidth: 1 }}
                content={
                  <TrendTooltip
                    formatType={formatType}
                    metricLabel={METRIC_LABEL[metric]}
                    color={color}
                  />
                }
              />
              <Area
                dataKey="value"
                name={METRIC_LABEL[metric]}
                type="monotone"
                stroke={color}
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
