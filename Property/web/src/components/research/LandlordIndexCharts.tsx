"use client";

/**
 * Client-side charts for the UK Landlord Tax Index page.
 *
 * The server page passes plain serializable arrays (no functions cross the RSC
 * boundary). All en-GB formatting happens here. Colours ride the site chart
 * CSS vars (--chart-1..5, emerald/indigo) defined in globals.css.
 */
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { monthLabel, monthLabelShort } from "@/lib/research/landlord-index";

type MonthlyRow = Record<string, number | string> & { month: string };
type AnnualRow = Record<string, number> & { year: number };

// ---------------------------------------------------------------------------
// Annual incorporations (the headline magnitude)
// ---------------------------------------------------------------------------

export function AnnualIncorporationsChart({
  annual,
  sic,
}: {
  annual: AnnualRow[];
  sic: string;
}) {
  const data = annual.map((a) => ({ year: String(a.year), value: Number(a[sic] ?? 0) }));
  const config = {
    value: { label: "New companies", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
      <BarChart accessibilityLayer data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis
          width={44}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => v.toLocaleString("en-GB")}
        />
        <ChartTooltip
          cursor={{ fill: "rgba(5,150,105,0.06)" }}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="value" name="New companies" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Monthly incorporations (trend texture + recency, provisional tail dashed)
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
  // Last index that is NOT provisional, so the dashed segment connects cleanly.
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
      <AreaChart accessibilityLayer data={points} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fill-lti-solid" x1="0" y1="0" x2="0" y2="1">
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
          fill="url(#fill-lti-solid)"
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

// ---------------------------------------------------------------------------
// House prices by nation (context)
// ---------------------------------------------------------------------------

const REGION_SERIES = [
  { key: "uk", region: "United Kingdom", label: "UK", color: "var(--chart-1)" },
  { key: "england", region: "England", label: "England", color: "var(--chart-2)" },
  { key: "london", region: "London", label: "London", color: "var(--chart-3)" },
  { key: "scotland", region: "Scotland", label: "Scotland", color: "var(--chart-4)" },
  { key: "wales", region: "Wales", label: "Wales", color: "var(--chart-5)" },
  { key: "ni", region: "Northern Ireland", label: "N. Ireland", color: "#64748b" },
] as const;

export function HousePriceChart({ monthly }: { monthly: MonthlyRow[] }) {
  const points = monthly.map((d) => {
    const row: Record<string, number | string> = { month: d.month, tick: monthLabelShort(d.month) };
    for (const s of REGION_SERIES) {
      const v = d[s.region];
      if (typeof v === "number") row[s.key] = v;
    }
    return row;
  });

  const config = Object.fromEntries(
    REGION_SERIES.map((s) => [s.key, { label: s.label, color: s.color }]),
  ) satisfies ChartConfig;

  const tickInterval = Math.max(0, Math.ceil(points.length / 10) - 1);

  return (
    <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
      <LineChart accessibilityLayer data={points} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
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
          width={48}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `£${Math.round(v / 1000)}k`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const m = payload?.[0]?.payload?.month as string | undefined;
                return m ? monthLabel(m) : "";
              }}
              formatter={(value, name, item) => {
                const key = String(item?.dataKey ?? name);
                const label = (config as Record<string, { label?: string }>)[key]?.label ?? name;
                return (
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{ background: `var(--color-${key})` }}
                      />
                      {label}
                    </span>
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      £{Number(value).toLocaleString("en-GB")}
                    </span>
                  </div>
                );
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        {REGION_SERIES.map((s) => (
          <Line
            key={s.key}
            dataKey={s.key}
            name={s.key}
            type="monotone"
            stroke={`var(--color-${s.key})`}
            strokeWidth={s.key === "uk" ? 2.5 : 1.5}
            dot={false}
            connectNulls
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
