"use client";

/**
 * Horizontal bar chart for categorical breakdowns (e.g. leads by channel, leads by site).
 *
 * Self-contained: plain recharts + the console's slate/indigo Tailwind language.
 * No functions passed in as props.
 */
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  label: string;
  data: { name: string; value: number; sub?: string }[];
  color?: string;
  valueLabel?: string;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload?: { name: string; value: number; sub?: string };
    value?: number | string;
  }>;
  valueLabel: string;
  color: string;
};

function CategoryTooltip({ active, payload, valueLabel, color }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;
  const value = payload[0]?.value;
  return (
    <div className="min-w-[8rem] rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium text-slate-900">{point.name}</div>
      <div className="mt-1 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
          style={{ backgroundColor: color }}
        />
        <span className="text-slate-500">{valueLabel}</span>
        <span className="ml-auto font-mono font-medium tabular-nums text-slate-900">
          {typeof value === "number" ? value.toLocaleString("en-GB") : String(value ?? "")}
        </span>
      </div>
      {point.sub && (
        <div className="mt-0.5 text-slate-400">{point.sub}</div>
      )}
    </div>
  );
}

export function CategoryBarChart({
  label,
  data,
  color = "#4f46e5",
  valueLabel = "Leads",
}: Props) {
  // Size bars so they stay readable regardless of category count.
  const chartHeight = Math.max(120, data.length * 38);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900">{label}</h3>
        <span className="shrink-0 text-xs tabular-nums text-slate-500">
          {data.reduce((a, d) => a + d.value, 0).toLocaleString("en-GB")} total
        </span>
      </div>
      <div className="mt-3">
        {data.length === 0 ? (
          <div className="flex h-[120px] items-center justify-center rounded-lg border border-dashed border-slate-200 text-xs text-slate-400">
            No data in this window
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={chartHeight}
            initialDimension={{ width: 320, height: chartHeight }}
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              data={data}
              margin={{ left: 8, right: 24, top: 8, bottom: 0 }}
            >
              <CartesianGrid
                horizontal={false}
                strokeDasharray="3 3"
                stroke="#e2e8f0"
              />
              <XAxis
                type="number"
                allowDecimals={false}
                fontSize={11}
                tick={{ fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={112}
                fontSize={11}
                tick={{ fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: color, fillOpacity: 0.06 }}
                content={<CategoryTooltip valueLabel={valueLabel} color={color} />}
              />
              <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey="value"
                  position="right"
                  fontSize={11}
                  fill="#475569"
                  formatter={(v) => Number(v ?? 0).toLocaleString("en-GB")}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
