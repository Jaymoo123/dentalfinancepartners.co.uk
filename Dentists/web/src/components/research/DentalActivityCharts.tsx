"use client";

/**
 * Client-side charts for the NHS Dental Activity Recovery Index page.
 *
 * Palette and accessibility rules are the folder's: see `DentalDensityCharts`
 * for the series-colour floor and `ChartDataTable` for why the values live in a
 * sibling table rather than inside the svg.
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

import { ChartDataTable } from "@/components/research/ChartDataTable";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { fmtIndex, fmtNumber, monthLabel, monthLabelShort } from "@/lib/research/dental-activity-index";
import type { NationalMonth, RegionalRow } from "@/lib/research/dental-activity-index";

// ---------------------------------------------------------------------------
// Monthly UDA area chart
// ---------------------------------------------------------------------------

export function NationalActivityChart({ monthly }: { monthly: NationalMonth[] }) {
  const data = monthly.map((d) => ({
    month: d.month,
    tick: monthLabelShort(d.month),
    uda: d.uda,
    cot: d.cot,
  }));

  const config = {
    uda: { label: "UDAs delivered", color: "var(--chart-1)" },
    cot: { label: "Courses of treatment", color: "var(--chart-4)" },
  } satisfies ChartConfig;

  const tickInterval = Math.max(0, Math.ceil(data.length / 12) - 1);

  return (
    <>
      <ChartDataTable
        caption="NHS dental UDAs delivered in England, by month"
        columns={["Month", "UDAs delivered", "Courses of treatment"]}
        rows={data.map((d) => [monthLabel(d.month), fmtNumber(d.uda), fmtNumber(d.cot)])}
      />
      <ChartContainer aria-hidden config={config} className="aspect-auto h-[300px] w-full">
        <AreaChart
          data={data}
          margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fill-uda" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-uda)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--color-uda)" stopOpacity={0.05} />
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
            width={56}
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            fontSize={11}
            tickFormatter={(v: number) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}m` : v.toLocaleString("en-GB")}
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
            dataKey="uda"
            name="UDAs delivered"
            type="monotone"
            stroke="var(--color-uda)"
            strokeWidth={2}
            fill="url(#fill-uda)"
            dot={false}
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
}

// ---------------------------------------------------------------------------
// Recovery Index area chart (vs baseline = 100)
// ---------------------------------------------------------------------------

export function RecoveryIndexChart({ monthly }: { monthly: NationalMonth[] }) {
  const data = monthly
    .filter((d) => d.recovery_index !== null)
    .map((d) => ({
      month: d.month,
      tick: monthLabelShort(d.month),
      index: d.recovery_index,
    }));

  const config = {
    index: { label: "Recovery index", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  const tickInterval = Math.max(0, Math.ceil(data.length / 12) - 1);

  return (
    <>
      <ChartDataTable
        caption="Recovery Index by month, where 100 is the average month of the pre-Covid 2019/20 baseline year"
        columns={["Month", "Recovery Index"]}
        rows={data.map((d) => [monthLabel(d.month), fmtIndex(d.index)])}
      />
      <ChartContainer aria-hidden config={config} className="aspect-auto h-[260px] w-full">
        <AreaChart
          data={data}
          margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fill-ridx" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-index)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--color-index)" stopOpacity={0.0} />
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
            domain={[0, "auto"]}
          />
          {/* Baseline reference */}
          <ReferenceLine y={100} stroke="var(--ink)" strokeDasharray="4 2" strokeWidth={1} label={{ value: "Baseline (100)", fill: "var(--ink)", fontSize: 10, position: "insideTopRight" }} />
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
            dataKey="index"
            name="Recovery index"
            type="monotone"
            stroke="var(--color-index)"
            strokeWidth={2}
            fill="url(#fill-ridx)"
            dot={false}
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
}

// ---------------------------------------------------------------------------
// Regional bar chart: top 20 ICBs by UDA volume (recovery_index is null for
// every ICB: no pre-2022 per-ICB baseline exists due to the boundary change)
// ---------------------------------------------------------------------------

export function RegionalRecoveryChart({ regional }: { regional: RegionalRow[] }) {
  const data = [...regional]
    .sort((a, b) => b.uda_ttm - a.uda_ttm)
    .slice(0, 20)
    .map((r) => ({
      name: r.commissioner.replace(/ ICB$/i, "").replace(/^NHS /, ""),
      uda: r.uda_ttm,
    }));

  const config = {
    uda: { label: "UDAs (trailing 12 months)", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <>
      <ChartDataTable
        caption="The 20 highest-volume ICB commissioner areas by UDAs delivered over the trailing twelve settled months"
        columns={["ICB commissioner area", "UDAs, trailing 12 months"]}
        rows={data.map((d) => [d.name, fmtNumber(d.uda)])}
      />
      <ChartContainer aria-hidden config={config} className="aspect-auto h-[400px] w-full">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 8, right: 16, top: 8, bottom: 0 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            fontSize={11}
            tickFormatter={(v: number) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}m` : v >= 1_000 ? `${(v / 1_000).toFixed(0)}k` : String(v)}
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
          <Bar dataKey="uda" name="UDAs (trailing 12 months)" fill="var(--color-uda)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
