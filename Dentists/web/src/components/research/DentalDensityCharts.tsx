"use client";

/**
 * Client-side charts for the Dental Practice Density page.
 *
 * Brand palette, with one correction the port makes everywhere in this folder:
 * a chart series colour carries meaning, so it needs the 3:1 graphics floor
 * against the panel it is drawn on. These panels are `card-premium`, ground
 * `--surface` #ffffff. `--chart-2` is the brand gold #b8975d and measures 2.75
 * on white, under the floor, so every series that was gold now uses
 * `--chart-4`, gold-strong #9e7f4a, at 3.76. Nothing is drawn at partial
 * opacity, because compositing a series colour invalidates the measurement.
 *
 * Accessibility: see `ChartDataTable`. The svg is decorative and hidden, the
 * values are real text nodes in a sibling table, and `accessibilityLayer` is
 * deliberately not set (it would put a `tabIndex={0}` focus stop inside an
 * `aria-hidden` subtree).
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { ChartDataTable } from "@/components/research/ChartDataTable";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { fmtDensity, fmtNumber, type DensityRegion } from "@/lib/research/dental-practice-density";

// ---------------------------------------------------------------------------
// Horizontal bar chart: dental locations per 100k by region
// ---------------------------------------------------------------------------

export function DensityByRegionChart({ regions }: { regions: DensityRegion[] }) {
  const data = regions
    .filter((r) => r.per_100k !== null)
    .map((r) => ({
      name: r.region,
      density: r.per_100k,
    }));

  const config = {
    density: { label: "Per 100,000 population", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <>
      <ChartDataTable
        caption="CQC-registered dental locations per 100,000 population, by England region"
        columns={["Region", "Dental locations per 100,000 population"]}
        rows={data.map((d) => [d.name, fmtDensity(d.density)])}
      />
      <ChartContainer aria-hidden config={config} className="aspect-auto h-[340px] w-full">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 8, right: 32, top: 8, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            fontSize={11}
            domain={[0, "auto"]}
            tickFormatter={(v: number) => v.toFixed(0)}
          />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            axisLine={false}
            width={180}
            fontSize={10}
            tickMargin={4}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(184,151,93,0.08)" }}
            content={<ChartTooltipContent indicator="dot" formatter={(v) => [`${Number(v).toFixed(1)} per 100k`, "Dental locations"]} />}
          />
          <Bar
            dataKey="density"
            name="Per 100,000 population"
            fill="var(--color-density)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
}

// ---------------------------------------------------------------------------
// Bar chart: absolute count of dental locations by region
// ---------------------------------------------------------------------------

export function LocationCountByRegionChart({ regions }: { regions: DensityRegion[] }) {
  const data = [...regions]
    .sort((a, b) => b.dental_locations - a.dental_locations)
    .map((r) => ({
      name: r.region,
      count: r.dental_locations,
    }));

  const config = {
    count: { label: "CQC-registered dental locations", color: "var(--chart-4)" },
  } satisfies ChartConfig;

  return (
    <>
      <ChartDataTable
        caption="Total CQC-registered dental locations, by England region, highest first"
        columns={["Region", "CQC-registered dental locations"]}
        rows={data.map((d) => [d.name, fmtNumber(d.count)])}
      />
      <ChartContainer aria-hidden config={config} className="aspect-auto h-[340px] w-full">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 8, right: 32, top: 8, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            fontSize={11}
            tickFormatter={(v: number) => v.toLocaleString("en-GB")}
          />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            axisLine={false}
            width={180}
            fontSize={10}
            tickMargin={4}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(184,151,93,0.08)" }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar
            dataKey="count"
            name="CQC-registered dental locations"
            fill="var(--color-count)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
}
