"use client";

/**
 * Client-side charts for the UK Hospitality Insolvency Index page.
 *
 * Plain recharts primitives (no shadcn chart wrapper -- this site's design
 * system uses raw CSS custom properties via var(), not shadcn tokens).
 *
 * Three charts:
 *   1. Annual totals bar chart
 *   2. Monthly stacked area chart (CVL vs compulsory vs administration)
 *   3. 5-year survival curve, hospitality vs all-industry, latest full cohort
 */
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { monthLabel, monthLabelShort } from "@/lib/research/hospitality-insolvency-index";
import type {
  InsolvencyMonth,
  InsolvencyYear,
  SurvivalCohort,
} from "@/lib/research/hospitality-insolvency-index";

const BRAND = "var(--brand-primary)";
const AMBER = "#b45309";
const SLATE = "#64748b";

// ---------------------------------------------------------------------------
// Annual totals bar chart
// ---------------------------------------------------------------------------

export function AnnualInsolvencyChart({ annual }: { annual: InsolvencyYear[] }) {
  const data = annual
    .filter((r) => r.year < 2026)
    .map((r) => ({ year: String(r.year), value: r.total }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis
          width={52}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => v.toLocaleString("en-GB")}
        />
        <Tooltip
          cursor={{ fill: "rgba(176,83,47,0.08)" }}
          formatter={(v) => [Number(v).toLocaleString("en-GB"), "Total insolvencies"]}
        />
        <Bar dataKey="value" name="Total insolvencies" fill={BRAND} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ---------------------------------------------------------------------------
// Monthly stacked area chart: CVL + compulsory + administration
// ---------------------------------------------------------------------------

export function MonthlyInsolvencyChart({ monthly }: { monthly: InsolvencyMonth[] }) {
  const points = monthly.map((d) => ({
    month: d.month,
    tick: monthLabelShort(d.month),
    cvl: d.cvl,
    compulsory: d.compulsory,
    administration: d.administration + d.administration_to_cvl,
  }));

  const tickInterval = Math.max(0, Math.ceil(points.length / 10) - 1);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={points} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fill-hosp-cvl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={BRAND} stopOpacity={0.4} />
            <stop offset="95%" stopColor={BRAND} stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fill-hosp-compulsory" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={AMBER} stopOpacity={0.35} />
            <stop offset="95%" stopColor={AMBER} stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fill-hosp-admin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={SLATE} stopOpacity={0.3} />
            <stop offset="95%" stopColor={SLATE} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
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
        <Tooltip
          labelFormatter={(_, payload) => {
            const m = payload?.[0]?.payload?.month as string | undefined;
            return m ? monthLabel(m) : "";
          }}
          formatter={(v, name) => [Number(v).toLocaleString("en-GB"), name]}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area
          dataKey="cvl"
          name="CVL"
          type="monotone"
          stroke={BRAND}
          strokeWidth={2}
          fill="url(#fill-hosp-cvl)"
          dot={false}
          stackId="a"
        />
        <Area
          dataKey="compulsory"
          name="Compulsory liquidation"
          type="monotone"
          stroke={AMBER}
          strokeWidth={1.5}
          fill="url(#fill-hosp-compulsory)"
          dot={false}
          stackId="a"
        />
        <Area
          dataKey="administration"
          name="Administration"
          type="monotone"
          stroke={SLATE}
          strokeWidth={1.5}
          fill="url(#fill-hosp-admin)"
          dot={false}
          stackId="a"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ---------------------------------------------------------------------------
// 5-year survival curve: hospitality vs all-industry, latest full cohort
// ---------------------------------------------------------------------------

export function SurvivalCurveChart({ cohort }: { cohort: SurvivalCohort }) {
  const data = [
    { yr: "Birth", hospitality: 100, all_industry: 100 },
    { yr: "Year 1", hospitality: cohort.survival_1yr_pct, all_industry: cohort.all_industry_1yr_pct },
    { yr: "Year 2", hospitality: cohort.survival_2yr_pct, all_industry: cohort.all_industry_2yr_pct },
    { yr: "Year 3", hospitality: cohort.survival_3yr_pct, all_industry: cohort.all_industry_3yr_pct },
    { yr: "Year 4", hospitality: cohort.survival_4yr_pct, all_industry: cohort.all_industry_4yr_pct },
    { yr: "Year 5", hospitality: cohort.survival_5yr_pct, all_industry: cohort.all_industry_5yr_pct },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="yr" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis
          width={44}
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v: number) => `${v}%`}
        />
        <Tooltip formatter={(v, name) => [v != null ? `${Number(v).toFixed(1)}%` : "n/a", name]} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          dataKey="hospitality"
          name={`Hospitality (${cohort.cohort_year} cohort)`}
          type="monotone"
          stroke={BRAND}
          strokeWidth={2.5}
          dot={{ r: 3 }}
        />
        <Line
          dataKey="all_industry"
          name="All industries"
          type="monotone"
          stroke={SLATE}
          strokeWidth={2}
          strokeDasharray="4 3"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
