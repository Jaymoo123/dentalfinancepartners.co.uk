"use client";

/**
 * The actual recharts chart. Imported only via next/dynamic({ ssr: false }) from
 * ResultChart.tsx, so recharts lands in its own client chunk and never touches
 * the server render or non-premium pages. Renders bar / grouped-bar / line per
 * the ChartSpec.kind, sized to fill its (already-reserved) parent container.
 */
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ChartSpec, ChartResult } from "@/lib/calculators/premium/types";

function formatValue(v: number, kind: ChartSpec["valueFormat"]): string {
  if (kind === "percent") return `${v.toFixed(1)}%`;
  if (kind === "number") return v.toLocaleString("en-GB", { maximumFractionDigits: 0 });
  // default: currency
  return `£${v.toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;
}

export function ResultChartInner({
  spec,
  result,
  height,
}: {
  spec: ChartSpec;
  result: ChartResult;
  height: number;
}) {
  const tickFmt = (v: number) => formatValue(v, spec.valueFormat);

  if (spec.kind === "line") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={result.data} margin={{ top: 8, right: 12, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
          <YAxis tickFormatter={tickFmt} tick={{ fontSize: 12, fill: "#64748b" }} width={70} />
          <Tooltip formatter={(v) => formatValue(Number(v), spec.valueFormat)} />
          <Legend />
          {spec.series.map((s) => (
            <Line key={s.dataKey} dataKey={s.dataKey} name={s.label} stroke={s.color} strokeWidth={2} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // "bar" and "groupedBar" share the same component; multiple series naturally
  // render grouped, a single series renders as a plain bar chart.
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={result.data} margin={{ top: 8, right: 12, bottom: 8, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748b" }} />
        <YAxis tickFormatter={tickFmt} tick={{ fontSize: 12, fill: "#64748b" }} width={70} />
        <Tooltip formatter={(v) => formatValue(Number(v), spec.valueFormat)} />
        <Legend />
        {spec.series.map((s) => (
          <Bar key={s.dataKey} dataKey={s.dataKey} name={s.label} fill={s.color} radius={[2, 2, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
