"use client";

/**
 * Client-side charts for the UK Construction Insolvency Index page.
 *
 * Two charts:
 *   1. Annual totals bar chart (trend over time)
 *   2. Monthly trend area chart (CVL vs compulsory vs administration stacked)
 *
 * Colours ride the site chart CSS vars (--chart-1..5, orange family).
 */
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { monthLabel, monthLabelShort } from "@/lib/research/insolvency-index";
import type { InsolvencyMonth, InsolvencyYear } from "@/lib/research/insolvency-index";

// ---------------------------------------------------------------------------
// Annual totals bar chart
// ---------------------------------------------------------------------------

export function AnnualInsolvencyChart({ annual }: { annual: InsolvencyYear[] }) {
  // Exclude partial 2026 from the bar chart to avoid misleading impression
  const data = annual
    .filter((r) => r.year < 2026)
    .map((r) => ({ year: String(r.year), value: r.total }));

  const config = {
    value: { label: "Total insolvencies", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
      <BarChart
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
          fontSize={12}
        />
        <YAxis
          width={52}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => v.toLocaleString("en-GB")}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(249,115,22,0.08)" }}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar
          dataKey="value"
          name="Total insolvencies"
          fill="var(--color-value)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Monthly stacked area chart: CVL + compulsory + administration
// ---------------------------------------------------------------------------

export function MonthlyInsolvencyChart({ monthly }: { monthly: InsolvencyMonth[] }) {
  const points = monthly.map((d) => ({
    month: d.month,
    tick: monthLabelShort(d.month),
    cvl: d.cvl,
    compulsory: d.compulsory,
    administration: d.administration + d.administration_to_cvl,
  }));

  const config = {
    cvl: { label: "CVL", color: "var(--chart-1)" },
    compulsory: { label: "Compulsory liquidation", color: "var(--chart-2)" },
    administration: { label: "Administration", color: "var(--chart-3)" },
  } satisfies ChartConfig;

  const tickInterval = Math.max(0, Math.ceil(points.length / 10) - 1);

  return (
    <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
      <AreaChart
        accessibilityLayer
        data={points}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fill-insolv-cvl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-cvl)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-cvl)" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fill-insolv-compulsory" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-compulsory)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-compulsory)" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fill-insolv-admin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-administration)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-administration)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="tick"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={20}
          interval={tickInterval}
          fontSize={11}
        />
        <YAxis
          width={44}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => v.toLocaleString("en-GB")}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="dot"
              labelFormatter={(_, payload) => {
                const m = payload?.[0]?.payload?.month as string | undefined;
                return m ? monthLabel(m) : "";
              }}
            />
          }
        />
        <Area
          dataKey="cvl"
          name="CVL"
          type="monotone"
          stroke="var(--color-cvl)"
          strokeWidth={2}
          fill="url(#fill-insolv-cvl)"
          dot={false}
          stackId="a"
        />
        <Area
          dataKey="compulsory"
          name="Compulsory liquidation"
          type="monotone"
          stroke="var(--color-compulsory)"
          strokeWidth={1.5}
          fill="url(#fill-insolv-compulsory)"
          dot={false}
          stackId="a"
        />
        <Area
          dataKey="administration"
          name="Administration"
          type="monotone"
          stroke="var(--color-administration)"
          strokeWidth={1.5}
          fill="url(#fill-insolv-admin)"
          dot={false}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
