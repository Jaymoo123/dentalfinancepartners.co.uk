/**
 * Salary & Dividend Optimiser — GenericTool config.
 * 2025/26 UK rates.
 */

import type { GenericTool, CalcValues } from "@accounting-network/web-shared/tools/types";
import { calcSalaryDividend } from "../compute/salary-dividend";

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

export const salaryDividendTool: GenericTool = {
  kind: "generic",
  slug: "salary-dividend-optimiser",
  name: "Salary & Dividend Optimiser",
  category: "Tax planning",
  oneLiner: "Find the most tax-efficient mix of salary and dividends for a UK limited company agency director. 2025/26 rates.",
  metaTitle: "Salary & Dividend Optimiser 2025/26 | Free UK Calculator",
  metaDescription:
    "Free salary vs dividend calculator for UK limited company agency directors. Optimal split using 2025/26 tax rates. Built by ICAEW accountants.",
  intro:
    "Find the optimal salary and dividend mix for a UK limited company director. Models corporation tax, employer NI, employee NI, income tax and dividend tax together so you see the true net position. 2025/26 rates.",
  embedHeight: 480,
  fields: [
    {
      id: "profitBeforeDirector",
      label: "Company profit before director extraction",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Pre-tax profit before paying the director salary or dividends.",
    },
    {
      id: "useEmploymentAllowance",
      label: "Apply Employment Allowance (£5,000 off employer NI)",
      type: "toggle",
      default: true,
      help: "Most agencies with 2+ employees qualify. Single-director companies do not.",
    },
  ],
  compute: (values: CalcValues) => {
    const out = calcSalaryDividend({
      profitBeforeDirector: Number(values.profitBeforeDirector) || 0,
      useEmploymentAllowance: Boolean(values.useEmploymentAllowance),
    });
    return {
      headline: {
        label: "Optimal net cash",
        value: fmt(out.optimal.netCash),
        sub: `Salary ${fmt(out.optimal.salary)} + Dividend ${fmt(out.optimal.dividend)}`,
        tone: "good",
      },
      rows: [
        { label: "Optimal salary", value: fmt(out.optimal.salary) },
        { label: "Dividend", value: fmt(out.optimal.dividend) },
        { label: "Employer NI", value: fmt(out.optimal.employerNi) },
        { label: "Corporation tax", value: fmt(out.optimal.corporationTax) },
        { label: "Employee NI", value: fmt(out.optimal.employeeNi) },
        { label: "Income tax", value: fmt(out.optimal.incomeTax) },
        { label: "Dividend tax", value: fmt(out.optimal.dividendTax) },
        { label: "Total tax", value: fmt(out.optimal.totalTax), strong: true },
        { label: "Net cash vs salary-only", value: `+${fmt(Math.max(0, out.optimalVsSalaryOnly))}` },
        { label: "Net cash vs dividend-only", value: `+${fmt(Math.max(0, out.optimalVsDividendOnly))}` },
      ],
      note: "Assumes no other income, no student loan, standard personal allowance. Not personalised advice.",
    };
  },
  explainer: {
    heading: "How this works",
    paragraphs: [
      "For a UK limited company director, the most tax-efficient extraction strategy typically combines a small salary (up to the primary NI threshold) with dividends from post-tax profits. The calculator models all taxes together so you see the true net position.",
      "It assumes no other income, no student loan, standard UK personal allowance, and no pension contributions. For a tailored model, book a free call.",
    ],
  },
  faqs: [
    {
      question: "What rates does this calculator use?",
      answer:
        "UK 2025/26 rates. PA £12,570. Basic rate 20% (up to £50,270). Higher rate 40% (up to £125,140). Additional rate 45%. Dividend allowance £500. Dividend rates 8.75% / 33.75% / 39.35%. Employer NI 13.8% above £9,100. Employee NI 8% above £12,570. Corporation tax 19% small profits / 25% main rate.",
    },
    {
      question: "Does it cover the marginal corporation tax rate?",
      answer:
        "Yes. For company profits between £50,000 and £250,000 marginal relief gives an effective rate of 26.5% on that slice. The calculator applies this correctly.",
    },
    {
      question: "Is the result personal tax advice?",
      answer:
        "No. This is a model based on standard 2025/26 thresholds. It assumes no other income, no student loans, no pension contributions and standard personal allowance. For advice specific to your agency, book a free call.",
    },
  ],
};
