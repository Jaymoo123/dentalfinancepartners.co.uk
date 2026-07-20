"use client";

/**
 * Client-side charts for the NHS Dentist Earnings and Expenses Tracker page.
 * Navy/gold brand palette (Dental Finance Partners).
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { EarningsYear } from "@/lib/research/dental-earnings-index";

// ---------------------------------------------------------------------------
// Time-series line chart: avg net income (England)
// ---------------------------------------------------------------------------

export function EarningsTimeSeriesChart({ series }: { series: EarningsYear[] }) {
  const data = series
    .filter((d) => d.avg_net_income !== null)
    .map((d) => ({
      year: d.year,
      net: d.avg_net_income,
      gross: d.avg_gross_earnings,
      expenses: d.avg_expenses,
    }));

  const config = {
    net: { label: "Avg net income before tax", color: "var(--chart-1)" },
    gross: { label: "Avg gross earnings", color: "var(--chart-2)" },
    expenses: { label: "Avg expenses", color: "var(--chart-5)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
          fontSize={11}
          interval="preserveStartEnd"
        />
        <YAxis
          width={60}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="dot"
              formatter={(value) => typeof value === "number" ? `£${value.toLocaleString("en-GB")}` : String(value)}
            />
          }
        />
        <Line
          dataKey="gross"
          name="Avg gross earnings"
          type="monotone"
          stroke="var(--color-gross)"
          strokeWidth={1.5}
          dot={false}
          strokeDasharray="4 2"
        />
        <Line
          dataKey="expenses"
          name="Avg expenses"
          type="monotone"
          stroke="var(--color-expenses)"
          strokeWidth={1.5}
          dot={false}
          strokeDasharray="4 2"
        />
        <Line
          dataKey="net"
          name="Avg net income before tax"
          type="monotone"
          stroke="var(--color-net)"
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Gross vs Expenses bar chart (latest year)
// ---------------------------------------------------------------------------

export function EarningsBreakdownChart({ series }: { series: EarningsYear[] }) {
  const latest = series.at(-1);
  if (!latest) return null;

  const data = [
    { label: "Gross earnings", value: latest.avg_gross_earnings ?? 0, fill: "var(--chart-2)" },
    { label: "Expenses", value: latest.avg_expenses ?? 0, fill: "var(--chart-5)" },
    { label: "Net income", value: latest.avg_net_income ?? 0, fill: "var(--chart-1)" },
  ];

  const config = {
    value: { label: "Amount", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
        />
        <YAxis
          width={60}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `£${(v / 1000).toFixed(0)}k`}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(184,151,93,0.08)" }}
          content={
            <ChartTooltipContent
              indicator="dot"
              formatter={(value) => typeof value === "number" ? `£${value.toLocaleString("en-GB")}` : String(value)}
            />
          }
        />
        <Bar dataKey="value" name="Amount" radius={[4, 4, 0, 0]}>
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
