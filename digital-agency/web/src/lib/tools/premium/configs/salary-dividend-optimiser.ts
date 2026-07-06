/**
 * Tool 1 (FLAGSHIP): Salary and dividend optimiser (premium).
 *
 * toolId: salary-dividend-optimiser-premium
 * topic: pay-planning
 *
 * Composes calcSalaryDividend from compute/salary-dividend.ts.
 * NO maths forked: calls the lib directly.
 *
 * RATES (2026/27, HP §2/§3, FA 2026):
 *   Dividends:    10.75% / 35.75% / 39.35% + £500 allowance (FA 2026 s.4)
 *   Employer NIC: 15% above £5,000 secondary threshold (from 6 Apr 2025)
 *   EA:           £10,500, EXCLUDED for single-director companies (HP §2)
 *   CT:           19% / 25% marginal ~26.5% (HP §2/§3)
 *   PA:           £12,570
 *
 * GOLDEN (executed 2026-07-06, EA=false default):
 *   optimal.netCash = 74779.37... -> "£74,779"
 *   optimal.salary = 12570, optimal.dividend = 81876.46
 *   optimal.employerNi = 1135.5, optimal.corporationTax = 24418.04
 *   optimal.employeeNi = 0, optimal.incomeTax = 0
 *   optimal.dividendTax = 19667.08, optimal.totalTax = 45220.63
 *   optimalVsSalaryOnly = 2395.56, optimalVsDividendOnly = 1603.97
 *
 * EA=true branch (same profit):
 *   optimal.salary = 60000, optimal.netCash = 76279.775 -> "£76,280"
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcSalaryDividend } from "@/lib/tools/compute/salary-dividend";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

export const salaryDividendOptimiserConfig: PremiumToolConfig = {
  id: "salary-dividend-optimiser-premium",
  topic: "pay-planning",
  title: "Salary and dividend optimiser (2026/27)",
  intro: "Find the most tax-efficient split between salary and dividends for your agency, see what each route costs in every tax, and compare against taking everything as salary or dividends only.",
  fields: [
    {
      id: "profitBeforeDirector",
      label: "Company profit before director pay",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
    },
    {
      id: "useEmploymentAllowance",
      label: "Claim the Employment Allowance",
      type: "toggle",
      default: false,
      help: "The Employment Allowance is not available to a company whose only employee is a single director. Most solo founder-director agencies cannot claim it (HP §2). Switch on only if you employ someone other than a single director.",
    },
  ],
  compute({ values }): PremiumResult {
    const profitBeforeDirector = Number(values.profitBeforeDirector) || 0;
    const useEmploymentAllowance = Boolean(values.useEmploymentAllowance);

    const r = calcSalaryDividend({ profitBeforeDirector, useEmploymentAllowance });
    const opt = r.optimal;

    return {
      headline: {
        label: "Optimal net cash",
        value: gbp(opt.netCash),
        sub: `Salary ${gbp(opt.salary)} + Dividend ${gbp(opt.dividend)}`,
        tone: "good",
      },
      breakdown: [
        { label: "Optimal salary", value: gbp(opt.salary) },
        { label: "Optimal dividend", value: gbp(opt.dividend) },
        { label: "Employer NIC", value: gbp(opt.employerNi) },
        { label: "Corporation tax", value: gbp(opt.corporationTax) },
        { label: "Employee NIC", value: gbp(opt.employeeNi) },
        { label: "Income tax", value: gbp(opt.incomeTax) },
        { label: "Dividend tax", value: gbp(opt.dividendTax) },
        { label: "Total tax", value: gbp(opt.totalTax), strong: true },
        { label: "Net cash vs salary only", value: `+${gbp(r.optimalVsSalaryOnly)}` },
        { label: "Net cash vs dividend only", value: `+${gbp(r.optimalVsDividendOnly)}` },
      ],
      scenarioResults: [
        {
          id: "optimal",
          label: "Optimal split",
          headline: { label: "Net cash", value: gbp(opt.netCash), tone: "good" },
          rows: [
            { label: "Net cash", value: gbp(opt.netCash), strong: true },
            { label: "Total tax", value: gbp(opt.totalTax) },
          ],
          best: true,
        },
        {
          id: "salary-only",
          label: "Salary only",
          headline: { label: "Net cash", value: gbp(r.salaryOnly.netCash) },
          rows: [
            { label: "Net cash", value: gbp(r.salaryOnly.netCash), strong: true },
            { label: "Total tax", value: gbp(r.salaryOnly.totalTax) },
          ],
          best: false,
        },
        {
          id: "dividend-only",
          label: "Dividend only",
          headline: { label: "Net cash", value: gbp(r.dividendOnly.netCash) },
          rows: [
            { label: "Net cash", value: gbp(r.dividendOnly.netCash), strong: true },
            { label: "Total tax", value: gbp(r.dividendOnly.totalTax) },
          ],
          best: false,
        },
      ],
      chart: {
        data: [
          { name: "Optimal split", netCash: Math.round(opt.netCash), totalTax: Math.round(opt.totalTax) },
          { name: "Salary only", netCash: Math.round(r.salaryOnly.netCash), totalTax: Math.round(r.salaryOnly.totalTax) },
          { name: "Dividend only", netCash: Math.round(r.dividendOnly.netCash), totalTax: Math.round(r.dividendOnly.totalTax) },
        ],
      },
      note: "2026/27 basis: dividends taxed at 10.75% / 35.75% / 39.35% plus the £500 dividend allowance (FA 2026 s.4, HP §3). Employer NIC 15% above the £5,000 secondary threshold from 6 April 2025 (HP §2). EA £10,500 is not available to a company whose only employee is a single director (HP §2). Corporation tax 19% up to £50,000 / 25% main rate above £250,000 (marginal rate ~26.5% in the taper band). Personal allowance £12,570. These are estimates based on the profit figure entered and do not constitute advice for your company.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "netCash", label: "Net cash", color: "var(--accent)" },
      { dataKey: "totalTax", label: "Total tax", color: "var(--ink)" },
    ],
  },
  explainer: {
    heading: "How the salary and dividend optimiser works",
    paragraphs: [
      "The optimiser tests every salary from zero to £60,000 in £10 steps. For each salary level it calculates the employer NIC cost, deducts salary and NIC from your profit to find the distributable post-corporation-tax profit, then works out the dividend tax on that amount. It picks the salary that leaves you with the highest net cash after every tax.",
      "Salary and dividends are taxed very differently, and the 2026/27 dividend rates rose again. Here is the most efficient split for your profit, and what you keep after every tax. The right salary depends on whether your company can claim the Employment Allowance, so treat this as your starting point, not a fixed answer.",
      "The Employment Allowance is the most important variable. Without it (the common single-director case), employer NIC erodes the benefit of a higher salary, so the optimal salary often sits at or near the personal allowance. With EA available (because you employ at least one other person), the NIC cost is absorbed by the allowance up to £10,500, which typically shifts the optimal salary higher. Never publish a one-size-fits-all optimal salary: always state the EA assumption.",
    ],
  },
};
