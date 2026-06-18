"use client";

/**
 * Client-side charts for the UK Construction Index page.
 *
 * The server page passes plain serializable arrays (no functions cross the RSC
 * boundary). All en-GB formatting happens here. Colours ride the site chart
 * CSS vars (--chart-1..5, orange family) defined in globals.css.
 *
 * Note: the ONS construction-output series is absent (construction_output.available === false).
 * No output chart is rendered. Guard is applied at the call site in the page.
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
import { monthLabel, monthLabelShort } from "@/lib/research/construction-index";

type MonthlyRow = Record<string, number | string> & { month: string };
type AnnualRow = Record<string, number> & { year: number };

// ---------------------------------------------------------------------------
// Annual incorporations bar chart — domestic-building (SIC 41202) by year
// ---------------------------------------------------------------------------

export function AnnualIncorporationsChart({
  annual,
  sic,
}: {
  annual: AnnualRow[];
  sic: string;
}) {
  const data = annual.map((a) => ({
    year: String(a.year),
    value: Number(a[sic] ?? 0),
  }));

  const config = {
    value: { label: "New companies", color: "var(--chart-1)" },
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
          name="New companies"
          fill="var(--color-value)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Monthly trend line: domestic-building + all-construction union
// Provisional last 2 months shown as dashed/lighter tail
// ---------------------------------------------------------------------------

export function MonthlyIncorporationsChart({
  monthly,
  sic,
  provisionalMonths,
}: {
  monthly: MonthlyRow[];
  sic: string;
  provisionalMonths: string[];
}) {
  const prov = new Set(provisionalMonths);

  let lastSettledIdx = -1;
  monthly.forEach((d, i) => {
    if (!prov.has(d.month)) lastSettledIdx = i;
  });

  const points = monthly.map((d, i) => {
    const v = Number(d[sic] ?? 0);
    const isProv = prov.has(d.month);
    return {
      month: d.month,
      tick: monthLabelShort(d.month),
      solid: isProv ? null : v,
      prov: isProv || i === lastSettledIdx ? v : null,
    };
  });

  const config = {
    solid: { label: "Companies incorporated", color: "var(--chart-1)" },
    prov: { label: "Provisional (indexing lag)", color: "var(--chart-3)" },
  } satisfies ChartConfig;

  const tickInterval = Math.max(0, Math.ceil(points.length / 10) - 1);

  return (
    <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
      <AreaChart
        accessibilityLayer
        data={points}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fill-cii-solid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-solid)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-solid)" stopOpacity={0.03} />
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
          dataKey="solid"
          name="Companies incorporated"
          type="monotone"
          stroke="var(--color-solid)"
          strokeWidth={2}
          fill="url(#fill-cii-solid)"
          dot={false}
          connectNulls={false}
        />
        <Area
          dataKey="prov"
          name="Provisional (indexing lag)"
          type="monotone"
          stroke="var(--color-prov)"
          strokeWidth={2}
          strokeDasharray="4 3"
          fill="none"
          dot={false}
          connectNulls={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
