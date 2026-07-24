"use client";

/**
 * Minimal client-side charts for the /research section. Two small primitives
 * (line + bar) cover both asset pages — no need for construction-cis's full
 * 5-chart fleet given the much smaller datasets here.
 */
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// ---------------------------------------------------------------------------
// Probate wait times: mean weeks by quarter, digital vs paper
// ---------------------------------------------------------------------------

export type WaitTimesPoint = { quarter: string; digital: number; paper: number };

export function ProbateWaitTimesChart({ data }: { data: WaitTimesPoint[] }) {
  const config = {
    digital: { label: "Digital (mean weeks)", color: "var(--chart-1)" },
    paper: { label: "Paper (mean weeks)", color: "var(--chart-4)" },
  } satisfies ChartConfig;

  const tickInterval = Math.max(0, Math.ceil(data.length / 10) - 1);

  return (
    <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
      <LineChart accessibilityLayer data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="quarter"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={tickInterval}
          fontSize={11}
        />
        <YAxis
          width={44}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `${v}w`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          dataKey="digital"
          name="Digital (mean weeks)"
          type="monotone"
          stroke="var(--color-digital)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="paper"
          name="Paper (mean weeks)"
          type="monotone"
          stroke="var(--color-paper)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Exchequer yield by year (bar) -- reused for any simple year/value series
// ---------------------------------------------------------------------------

export type YearValuePoint = { year: string; value: number };

export function YearValueBarChart({
  data,
  label,
  unitPrefix = "",
  unitSuffix = "",
}: {
  data: YearValuePoint[];
  label: string;
  /** Prepended to each Y-axis tick, e.g. "£" (kept as plain strings, not a function, so this stays a serialisable Server->Client prop). */
  unitPrefix?: string;
  /** Appended to each Y-axis tick, e.g. "m". */
  unitSuffix?: string;
}) {
  const config = {
    value: { label, color: "var(--chart-2)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
      <BarChart accessibilityLayer data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis
          width={56}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `${unitPrefix}${v.toLocaleString("en-GB")}${unitSuffix}`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Bar dataKey="value" name={label} fill="var(--color-value)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
