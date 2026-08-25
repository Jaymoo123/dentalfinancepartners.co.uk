"use client";

/**
 * Client-side charts for the UK Hospitality Food Hygiene (FHRS/FHIS) map page.
 */
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { BusinessTypeSummary } from "@/lib/research/hospitality-fsa-hygiene-index";

const BRAND = "var(--brand-primary)";

export function BusinessTypeRatingChart({ businessTypes }: { businessTypes: BusinessTypeSummary[] }) {
  const data = businessTypes
    .filter((b) => b.fhrs_top_rating_share_pct !== null)
    .map((b) => ({
      label: b.label,
      value: b.fhrs_top_rating_share_pct as number,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 8, bottom: 0 }}>
        <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tickLine={false}
          axisLine={false}
          fontSize={11}
        />
        <YAxis
          type="category"
          dataKey="label"
          width={170}
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <Tooltip formatter={(v) => [`${v}%`, "Rated top (5) hygiene score"]} />
        <Bar dataKey="value" fill={BRAND} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
