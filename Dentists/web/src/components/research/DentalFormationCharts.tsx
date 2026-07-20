"use client";

/**
 * Client-side charts for the Dental Company Formation Index page.
 * Navy/gold brand palette (Dental Finance Partners).
 */

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  monthLabel,
  monthLabelShort,
  type DentalFormationMonth,
  type DentalFormationAnnual,
} from "@/lib/research/dental-company-formation-index";

// ---------------------------------------------------------------------------
// Monthly incorporations area chart
// ---------------------------------------------------------------------------

export function MonthlyFormationChart({
  monthly,
  provisionalMonths,
}: {
  monthly: DentalFormationMonth[];
  provisionalMonths: string[];
}) {
  const provisionalSet = new Set(provisionalMonths);
  const data = monthly.map((d) => ({
    month: d.month,
    tick: monthLabelShort(d.month),
    count: d["86230"],
    provisional: provisionalSet.has(d.month) ? d["86230"] : null,
    settled: provisionalSet.has(d.month) ? null : d["86230"],
  }));

  const config = {
    settled: { label: "New dental companies (settled)", color: "var(--chart-1)" },
    provisional: { label: "New dental companies (provisional)", color: "var(--chart-2)" },
  } satisfies ChartConfig;

  const tickInterval = Math.max(0, Math.ceil(data.length / 12) - 1);

  return (
    <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fill-dental-settled" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-settled)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--color-settled)" stopOpacity={0.05} />
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
          dataKey="settled"
          name="New dental companies (settled)"
          type="monotone"
          stroke="var(--color-settled)"
          strokeWidth={2}
          fill="url(#fill-dental-settled)"
          dot={false}
          connectNulls={false}
        />
        <Area
          dataKey="provisional"
          name="New dental companies (provisional)"
          type="monotone"
          stroke="var(--color-provisional)"
          strokeWidth={2}
          strokeDasharray="4 2"
          fill="none"
          dot={false}
          connectNulls={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Annual bar chart
// ---------------------------------------------------------------------------

export function AnnualFormationChart({ annual }: { annual: DentalFormationAnnual[] }) {
  // Only complete calendar years (exclude partial current year)
  const currentYear = new Date().getFullYear();
  const data = annual
    .filter((r) => r.year < currentYear)
    .map((r) => ({ year: String(r.year), count: r["86230"] }));

  const config = {
    count: { label: "New dental companies (SIC 86230)", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
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
          fontSize={11}
        />
        <YAxis
          width={44}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(184,151,93,0.08)" }}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="count" name="New dental companies" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Seasonality: average formations by calendar month
// ---------------------------------------------------------------------------

export interface SeasonalityPoint {
  month: string;
  avg: number;
  isMarch: boolean;
}

export function SeasonalityChart({ data }: { data: SeasonalityPoint[] }) {
  const config = {
    avg: { label: "Average formations", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  const grandAvg = data.reduce((s, d) => s + d.avg, 0) / (data.length || 1);

  return (
    <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
        <YAxis width={44} tickLine={false} axisLine={false} tickMargin={4} fontSize={11} />
        <ReferenceLine
          y={grandAvg}
          stroke="#001b3d"
          strokeDasharray="4 2"
          strokeWidth={1}
          label={{ value: "Annual avg", fill: "#001b3d", fontSize: 10, position: "insideTopRight" }}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(184,151,93,0.08)" }}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar
          dataKey="avg"
          name="Average formations"
          radius={[4, 4, 0, 0]}
          fill="var(--color-avg)"
        />
      </BarChart>
    </ChartContainer>
  );
}
