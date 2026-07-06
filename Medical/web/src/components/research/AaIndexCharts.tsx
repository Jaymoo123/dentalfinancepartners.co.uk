"use client";

/**
 * Client-side charts for the Annual Allowance Pension Tax Index page.
 *
 * The server page passes plain serialisable arrays only (no functions cross
 * the RSC boundary).  All en-GB formatting happens here.  Colours ride the
 * site chart CSS vars (--chart-1..5, navy/copper) defined in globals.css.
 *
 * Chart honesty guardrails (per brief):
 *   - Never draw Scheme Pays value before 2012/13.
 *   - Never draw the NHS series past 2021/22.
 *   - Never merge Scheme Pays and SA into one series.
 *   - Never sum AfT + SA.
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// ---------------------------------------------------------------------------
// Prop types (plain serialisable arrays from the server page)
// ---------------------------------------------------------------------------

export type SchemePaysRow = {
  taxYear: string;
  value: number;
  provisional: boolean;
};

export type SaRow = {
  taxYear: string;
  value: number;
  provisional: boolean;
  artefact: boolean;
};

export type NhsExceededRow = {
  taxYear: string;
  practitioner: number;
  officer: number;
};

export type AllowanceRow = {
  taxYear: string;
  value: number;
};

// ---------------------------------------------------------------------------
// Chart 1: Scheme Pays value (AfT), 2012/13 to 2023/24
// ---------------------------------------------------------------------------

export function SchemePaysValueChart({ series }: { series: SchemePaysRow[] }) {
  const data = series.map((r) => ({ taxYear: r.taxYear, value: r.value, provisional: r.provisional }));

  const config: ChartConfig = {
    value: { label: "AfT charges (£m)", color: "var(--chart-1)" },
  };

  return (
    <div>
      <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
        <BarChart accessibilityLayer data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="taxYear"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={10}
            interval="preserveStartEnd"
          />
          <YAxis
            width={48}
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            fontSize={11}
            tickFormatter={(v: number) => `£${v}m`}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(0,27,61,0.06)" }}
            content={
              <ChartTooltipContent
                indicator="dot"
                formatter={(value, _name, item) => (
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="text-muted-foreground">AfT charges</span>
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      £{Number(value)}m{item.payload?.provisional ? " (provisional)" : ""}
                    </span>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="value" name="AfT charges (£m)" radius={[4, 4, 0, 0]}>
            {data.map((entry, idx) => (
              <Cell
                key={`sp-cell-${idx}`}
                fill={entry.provisional ? "var(--chart-3)" : "var(--chart-1)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      {/* Inline colour legend */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "var(--chart-1)" }} />
          Published (revised)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "var(--chart-3)" }} />
          2023/24 provisional
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chart 2: Self Assessment individuals over the allowance, 2006/07 to 2023/24
// ---------------------------------------------------------------------------

export function SaIndividualsChart({ series }: { series: SaRow[] }) {
  const data = series.map((r) => ({
    taxYear: r.taxYear,
    value: r.value,
    provisional: r.provisional,
    artefact: r.artefact,
    highlight: r.provisional || r.artefact,
  }));

  const config: ChartConfig = {
    value: { label: "Individuals over the AA (Self Assessment)", color: "var(--chart-1)" },
  };

  return (
    <div>
      <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
        <BarChart accessibilityLayer data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="taxYear"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={10}
            interval="preserveStartEnd"
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
            cursor={{ fill: "rgba(0,27,61,0.06)" }}
            content={
              <ChartTooltipContent
                indicator="dot"
                formatter={(value, _name, item) => (
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="text-muted-foreground">SA individuals</span>
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {Number(value).toLocaleString("en-GB")}
                      {item.payload?.provisional ? " (prov.)" : ""}
                      {item.payload?.artefact ? " (McCloud)" : ""}
                    </span>
                  </div>
                )}
              />
            }
          />
          {/* Taper annotation: from 2016/17 the count widened to include taper and MPAA cases */}
          <ReferenceLine
            x="2016/17"
            stroke="#5c6b80"
            strokeDasharray="4 2"
            label={{ value: "Taper", position: "insideTopRight", fill: "#5c6b80", fontSize: 9 }}
          />
          {/* McCloud annotation: 2022/23 fall is a reporting artefact */}
          <ReferenceLine
            x="2022/23"
            stroke="#b87333"
            strokeDasharray="4 2"
            label={{ value: "McCloud", position: "insideTopRight", fill: "#b87333", fontSize: 9 }}
          />
          <Bar dataKey="value" name="SA individuals" radius={[4, 4, 0, 0]}>
            {data.map((entry, idx) => (
              <Cell
                key={`sa-cell-${idx}`}
                fill={entry.highlight ? "var(--chart-3)" : "var(--chart-1)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      {/* Inline colour legend */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "var(--chart-1)" }} />
          Published (revised)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "var(--chart-3)" }} />
          2022/23 McCloud artefact / 2023/24 provisional
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chart 3: NHS Pension Scheme members over standard AA, 2015/16 to 2021/22
// ---------------------------------------------------------------------------

export function NhsExceededChart({ series }: { series: NhsExceededRow[] }) {
  const data = series.map((r) => ({
    taxYear: r.taxYear,
    practitioner: r.practitioner,
    officer: r.officer,
  }));

  const config: ChartConfig = {
    practitioner: { label: "Practitioners (GPs)", color: "var(--chart-1)" },
    officer: { label: "Officers (hospital doctors and others)", color: "var(--chart-2)" },
  };

  return (
    <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
        barCategoryGap="20%"
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="taxYear"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={10}
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
          cursor={{ fill: "rgba(0,27,61,0.06)" }}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="practitioner"
          name="practitioner"
          fill="var(--chart-1)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="officer"
          name="officer"
          fill="var(--chart-2)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

// ---------------------------------------------------------------------------
// Chart 4: Standard annual allowance path, 2006/07 to 2023/24
// ---------------------------------------------------------------------------

export function AllowancePathChart({ series }: { series: AllowanceRow[] }) {
  const data = series.map((r) => ({ taxYear: r.taxYear, value: r.value }));

  const config: ChartConfig = {
    value: { label: "Standard annual allowance", color: "var(--chart-2)" },
  };

  return (
    <ChartContainer config={config} className="aspect-auto h-[260px] w-full">
      <LineChart accessibilityLayer data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="taxYear"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={10}
          interval="preserveStartEnd"
        />
        <YAxis
          width={52}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `£${Math.round(v / 1000)}k`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(value) => (
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-muted-foreground">Annual allowance</span>
                  <span className="font-mono font-medium tabular-nums text-foreground">
                    £{Number(value).toLocaleString("en-GB")}
                  </span>
                </div>
              )}
            />
          }
        />
        <Line
          dataKey="value"
          name="value"
          type="stepAfter"
          stroke="var(--chart-2)"
          strokeWidth={2.5}
          dot={false}
          connectNulls
        />
      </LineChart>
    </ChartContainer>
  );
}
