import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { findOptimalSalary } from "@/lib/tools/compute/salary-dividend";

export const salaryDividendTool: GenericTool = {
  kind: "generic",
  slug: "salary-dividend-optimiser",
  name: "Salary & Dividend Optimiser",
  category: "Limited Company",
  oneLiner: "Find the most tax-efficient mix of salary and dividends for a UK limited company director. 2026/27 rates.",
  embedHeight: 620,
  metaTitle: "Salary & Dividend Optimiser 2026/27 | Free UK Calculator",
  metaDescription:
    "Free salary vs dividend calculator for UK limited company directors. Optimal split using 2026/27 tax rates.",
  intro:
    "Pay yourself too much salary and you waste personal allowance against National Insurance. Take too much dividend and you push yourself into higher-rate dividend tax. The calculator tests every salary from £0 to £60,000 in £10 steps and returns the split that leaves the most cash in your pocket after all taxes.",
  ctaLabel: "Book a free call",
  fields: [
    {
      id: "profit",
      label: "Company profit (before director extraction)",
      type: "currency",
      default: 100000,
      min: 0,
      max: 2000000,
      step: 1000,
    },
    {
      id: "useEA",
      label: "Apply Employment Allowance (£10,500 off employer NI — needs 2+ employees)",
      type: "toggle",
      default: false,
    },
  ],
  compute(values) {
    const profit = Number(values.profit);
    const useEA = Boolean(values.useEA);
    const r = findOptimalSalary(profit, useEA);
    return {
      headline: {
        label: "Net cash",
        value: gbp(r.netCash),
        sub: `optimal salary ${gbp(r.salary)} + dividends ${gbp(r.dividend)}`,
        tone: "good",
      },
      rows: [
        { label: "Optimal salary", value: gbp(r.salary) },
        { label: "Dividends (post-tax profit)", value: gbp(r.dividend) },
        { label: "Employer NI", value: gbp(r.employerNi) },
        { label: "Employee NI", value: gbp(r.employeeNi) },
        { label: "Income tax", value: gbp(r.incomeTax) },
        { label: "Dividend tax", value: gbp(r.dividendTax) },
        { label: "Corporation tax", value: gbp(r.corporationTax) },
        { label: "Total tax", value: gbp(r.totalTax), strong: true },
      ],
      note: "Optimal split found by testing salaries from £0 to £60k in £10 steps. Assumes no other income, no student loans, no pension, standard personal allowance.",
    };
  },
  explainer: {
    heading: "How the optimiser works",
    paragraphs: [
      "For a UK limited company director, the most tax-efficient extraction typically combines a small salary with dividends drawn from post-tax profit. The model applies corporation tax, employer NI, employee NI, income tax, and dividend tax together so you see the true net position rather than each tax in isolation.",
      "The 2026/27 secondary threshold is £5,000, so any salary above £5,000 attracts 15% employer NI (unless the Employment Allowance of £10,500 is available to offset it). The calculator models both scenarios.",
    ],
  },
  faqs: [
    {
      question: "What rates does this calculator use?",
      answer:
        "UK 2026/27 rates: personal allowance £12,570, basic rate 20%, higher rate 40%, additional rate 45%. Dividend allowance £500, dividend rates 10.75% / 35.75% / 39.35%. Employer NI 15% above £5,000 secondary threshold. Employee NI 8% between £12,570 and £50,270, 2% above. Corporation tax 19% (small profits ≤ £50k), 25% (main rate ≥ £250k), 26.5% marginal rate in between.",
    },
    {
      question: "Does it cover the marginal corporation tax rate?",
      answer:
        "Yes. For company profits between £50,000 and £250,000, marginal relief applies at an effective 26.5% on the slice between those thresholds. The calculator applies this correctly when modelling the corporation tax impact of salary versus dividend.",
    },
    {
      question: "Is the result personal tax advice?",
      answer:
        "No. This is a model based on standard 2026/27 thresholds. It assumes no other income, no student loans, no pension contributions, and the standard UK personal allowance. For advice specific to your situation, book a free call with our team.",
    },
    {
      question: "How does taking salary vs dividends affect corporation tax?",
      answer:
        "Salary is a deductible business expense that reduces taxable profit, so it reduces corporation tax. Dividends are paid from post-tax profits, so they do not reduce corporation tax. The optimiser models both effects together to find the true net position.",
    },
  ],
};
