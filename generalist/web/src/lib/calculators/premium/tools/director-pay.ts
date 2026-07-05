/**
 * Premium Tool 1 — Salary and dividend take-home planner (director-pay-premium)
 *
 * Topic: director-pay (also surfaced on limited-company and incorporation posts).
 * Reuses: modelExtraction + findOptimalSalary from compute/salary-dividend.ts.
 * Premium value: salary vs dividend split with EA on/off scenario, net-cash
 * headline, tax-stack breakdown, and a grouped bar chart.
 */

import type { PremiumToolConfig, PremiumComputeFn } from "../types";
import { modelExtraction, findOptimalSalary } from "@/lib/tools/compute/salary-dividend";
import { gbp } from "@accounting-network/web-shared/tools/format";

const compute: PremiumComputeFn = ({ values }) => {
  const profit = Number(values.profit) || 0;
  const salaryChoice = String(values.salaryChoice ?? "optimal");
  const useEA = Boolean(values.useEA);

  // Resolve salary from the choice field
  let salary: number;
  if (salaryChoice === "secondary") {
    salary = 5000;
  } else if (salaryChoice === "pa") {
    salary = 12570;
  } else {
    // optimal — let the tool pick
    salary = findOptimalSalary(profit, useEA).salary;
  }

  const r = modelExtraction(salary, profit, useEA);

  const totalTax = r.totalTax;
  const netCash = r.netCash;

  return {
    headline: {
      label: "Net cash in your pocket",
      value: gbp(netCash),
      sub: `Salary ${gbp(salary)}, dividend ${gbp(r.dividend)}`,
      tone: "good",
    },
    rows: [
      { label: "Director salary", value: gbp(salary) },
      { label: "Dividend paid", value: gbp(r.dividend) },
      { label: "Employer NIC", value: gbp(r.employerNi) },
      { label: "Corporation tax", value: gbp(r.corporationTax) },
      { label: "Dividend tax", value: gbp(r.dividendTax) },
      { label: "Total tax and NIC", value: gbp(totalTax), strong: true },
      { label: "Net cash in your pocket", value: gbp(netCash), strong: true },
    ],
    chart: {
      type: "bar",
      heading: "Where the money goes",
      bars: [
        { label: "Net cash", value: Math.max(0, netCash), colour: "#f97316" },
        { label: "Total tax", value: Math.max(0, totalTax), colour: "#94a3b8" },
      ],
    },
    note:
      "Dividend rates used: 10.75% basic, 35.75% higher, 39.35% additional (from 6 April 2026, FA 2026 s.4). " +
      "The £10,500 Employment Allowance is not available to single-director companies with no other employees.",
  };
};

export const directorPayPremium: PremiumToolConfig = {
  id: "director-pay-premium",
  name: "Salary and dividend take-home planner",
  topic: "director-pay",
  description:
    "See exactly where every pound goes when you take a salary and dividends from your company, " +
    "including the full tax stack and the impact of the Employment Allowance.",
  fields: [
    {
      id: "profit",
      label: "Company profit before your salary",
      type: "currency",
      default: 80000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Company profit before your salary and any employer pension.",
    },
    {
      id: "salaryChoice",
      label: "Salary level",
      type: "select",
      default: "optimal",
      options: [
        { value: "optimal", label: "Let the tool pick the tax-efficient salary" },
        { value: "secondary", label: "£5,000 (secondary threshold, no employer NIC)" },
        { value: "pa", label: "£12,570 (full personal allowance)" },
      ],
    },
    {
      id: "useEA",
      label: "Claim the £10,500 Employment Allowance?",
      type: "toggle",
      default: false,
      help: "Only where you have a genuine second employee, not a single-director company.",
    },
  ],
  compute,
  ctaLabel: "Get a personalised salary and dividend plan",
};
