"use client";

/**
 * Client-side charts for the UK Construction Survival Index page.
 *
 * Two charts:
 *   1. Survival curve for the latest full 5-year cohort: Construction vs all
 *      industries, year 1 through year 5.
 *   2. 5-year survival rate by birth-year cohort, Construction only (trend).
 *
 * Colours ride the site chart CSS vars (--chart-1..5, orange family), same
 * as the other research charts on this site.
 */
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { SurvivalCohortRow } from "@/lib/research/survival-index";

// ---------------------------------------------------------------------------
// Survival curve: Construction vs all industries, for one cohort year
// ---------------------------------------------------------------------------

export function SurvivalCurveChart({ cohort }: { cohort: SurvivalCohortRow }) {
  const data = ([1, 2, 3, 4, 5] as const)
    .map((y) => ({
      year: `Year ${y}`,
      construction: cohort.construction[`y${y}_pct` as const],
      all_industries: cohort.all_industries[`y${y}_pct` as const],
    }))
    .filter((d) => d.construction !== null);

  const config = {
    construction: { label: "Construction", color: "var(--chart-1)" },
    all_industries: { label: "All industries", color: "var(--chart-4)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis
          width={44}
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `${v}%`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Line
          dataKey="construction"
          name="Construction"
          type="monotone"
          stroke="var(--color-construction)"
          strokeWidth={2.5}
          dot={{ r: 4 }}
        />
        <Line
          dataKey="all_industries"
          name="All industries"
          type="monotone"
          stroke="var(--color-all_industries)"
          strokeWidth={2}
          strokeDasharray="4 3"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// 1-year survival rate by birth-year cohort (the only year available for every
// cohort in the series, so it's the one trend we can chart across all years)
// ---------------------------------------------------------------------------

export function OneYearTrendChart({ cohorts }: { cohorts: SurvivalCohortRow[] }) {
  const data = cohorts
    .filter((c) => c.construction.y1_pct !== null)
    .map((c) => ({
      year: String(c.birth_year),
      value: c.construction.y1_pct,
    }));

  const config = {
    value: { label: "1-year survival rate", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis
          width={44}
          domain={[80, 100]}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `${v}%`}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(249,115,22,0.08)" }}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="value" name="1-year survival rate" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
