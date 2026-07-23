"use client";

/**
 * Client-side chart for the UK Construction Payment Practices League page.
 *
 * Horizontal-style bar chart (vertical bars, truncated names) of the 12
 * slowest-paying large construction businesses by their own statutory
 * "average time to pay" figure, with a reference line at the cohort median
 * so the scale of the gap is visible at a glance.
 */
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PprCompanyRow } from "@/lib/research/ppr-league";

function shortName(name: string, max = 22): string {
  const cleaned = name.replace(/\s+LIMITED$|\s+LTD$|\s+PLC$/i, "");
  return cleaned.length > max ? `${cleaned.slice(0, max - 1)}…` : cleaned;
}

export function SlowestPayersChart({
  companies,
  medianDays,
}: {
  companies: PprCompanyRow[];
  medianDays: number | null;
}) {
  const data = companies.slice(0, 12).map((c) => ({
    name: shortName(c.name),
    fullName: c.name,
    atp: c.atp,
  }));

  const config = {
    atp: { label: "Average days to pay", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[360px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 24, top: 8, bottom: 0 }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `${v}d`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={150}
          fontSize={11}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(249,115,22,0.08)" }}
          content={
            <ChartTooltipContent
              indicator="dot"
              labelFormatter={(_, payload) => (payload?.[0]?.payload?.fullName as string) ?? ""}
            />
          }
        />
        {medianDays !== null && (
          <ReferenceLine
            x={medianDays}
            stroke="var(--chart-4)"
            strokeDasharray="4 3"
            label={{ value: `Median: ${medianDays}d`, position: "top", fontSize: 11, fill: "var(--chart-4)" }}
          />
        )}
        <Bar dataKey="atp" name="Average days to pay" fill="var(--color-atp)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
