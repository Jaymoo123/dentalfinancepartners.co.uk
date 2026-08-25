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
  Cell,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { monthLabel, monthLabelShort, fmtNumber, fmtPercent } from "@/lib/research/construction-index";
import type { ConstructionSegment } from "@/lib/research/construction-index";
import type { NetFormationAnnualRow } from "@/lib/research/net-formation-index";

type MonthlyRow = Record<string, number | string> & { month: string };
type AnnualRow = Record<string, number> & { year: number };

// ---------------------------------------------------------------------------
// Annual incorporations bar chart -- domestic-building (SIC 41202) by year
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

// ---------------------------------------------------------------------------
// Seasonality bar chart -- average incorporations by calendar month
// ---------------------------------------------------------------------------

export type SeasonalityPoint = { month: string; avg: number; isMarch: boolean };

export function SeasonalityChart({ data }: { data: SeasonalityPoint[] }) {
  const config = {
    avg: { label: "Avg incorporations", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[240px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
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
        <Bar dataKey="avg" name="Avg incorporations" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.isMarch ? "var(--chart-2)" : "var(--chart-1)"} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Net formation: incorporations vs dissolutions (bars) + net formation (line)
// ---------------------------------------------------------------------------

export function NetFormationChart({
  annual,
  segment = "union",
}: {
  annual: NetFormationAnnualRow[];
  segment?: "union" | "primary_41202";
}) {
  const data = annual.map((r) => ({
    year: String(r.year),
    inc: r[`${segment}_inc`],
    diss: r[`${segment}_diss`],
    net: r[`${segment}_net`],
  }));

  const config = {
    inc: { label: "Incorporated", color: "var(--chart-1)" },
    diss: { label: "Dissolved", color: "var(--chart-4)" },
    net: { label: "Net formation", color: "var(--chart-2)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
      <ComposedChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
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
        <Bar dataKey="inc" name="Incorporated" fill="var(--color-inc)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="diss" name="Dissolved" fill="var(--color-diss)" radius={[4, 4, 0, 0]} />
        <Line
          dataKey="net"
          name="Net formation"
          type="monotone"
          stroke="var(--color-net)"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Trade breakdown table -- 8 CIS subcontractor trade segments
// ponytail: plain HTML table; no chart lib needed for a static ranking table
// ---------------------------------------------------------------------------

// Ordered list of trade keys to display (division rollups excluded)
const TRADE_KEYS = [
  "electricians",
  "plumbers",
  "painters",
  "joiners",
  "plasterers",
  "flooring",
  "groundworks",
  "demolition",
] as const;

export function TradeBreakdownTable({ segments }: { segments: ConstructionSegment[] }) {
  const tradeMap = new Map(segments.map((s) => [s.key, s]));
  const trades = TRADE_KEYS.map((k) => tradeMap.get(k)).filter(
    (s): s is ConstructionSegment => s !== undefined && !s.thin_segment,
  );

  if (trades.length === 0) return null;

  const latestYear = trades[0]?.annual.at(-1)?.year ?? null;

  // Sort by latest full-year count descending
  const sorted = [...trades].sort((a, b) => {
    const ay = a.annual.at(-1)?.count ?? 0;
    const by_ = b.annual.at(-1)?.count ?? 0;
    return by_ - ay;
  });

  return (
    <div className="not-prose mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-neutral-300 text-left">
            <th className="py-2 pr-4 font-bold text-neutral-900">Trade</th>
            <th className="py-2 pr-4 font-bold text-neutral-900 text-right">
              {latestYear ? `${latestYear} formations` : "Annual formations"}
            </th>
            <th className="py-2 pr-4 font-bold text-neutral-900 text-right">TTM (settled)</th>
            <th className="py-2 font-bold text-neutral-900 text-right">YoY</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((seg) => {
            const annualCount = seg.annual.at(-1)?.count ?? null;
            return (
              <tr key={seg.key} className="border-b border-neutral-200">
                <td className="py-2 pr-4 font-semibold text-neutral-900">{seg.label}</td>
                <td className="py-2 pr-4 text-right text-neutral-900">{fmtNumber(annualCount)}</td>
                <td className="py-2 pr-4 text-right text-neutral-900">{fmtNumber(seg.ttm)}</td>
                <td className="py-2 text-right text-neutral-700">
                  {seg.yoy_pct != null ? fmtPercent(seg.yoy_pct) : "n/a"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
