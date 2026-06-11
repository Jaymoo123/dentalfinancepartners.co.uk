/**
 * Pension Contribution Optimiser — GenericTool config.
 * 2025/26 rates. Employer pension from Ltd company.
 */

import type { GenericTool, CalcValues } from "@accounting-network/web-shared/tools/types";
import { calcPensionOptimiser } from "../compute/pension-optimiser";

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const pct = (n: number) => `${(n * 100).toFixed(0)}%`;

export const pensionOptimiserTool: GenericTool = {
  kind: "generic",
  slug: "pension-contribution-optimiser",
  name: "Pension Contribution Optimiser",
  category: "Tax planning",
  oneLiner:
    "Model employer pension contributions from your limited company. Corp tax saving, real cost, and the advantage over taking dividends.",
  metaTitle: "Pension Contribution Optimiser | Limited Company Directors",
  metaDescription:
    "Free pension optimiser for UK limited company directors. Models corporation tax saving, real cost to company vs taking dividends. 2025/26 rates.",
  intro:
    "Model the true cost and tax advantage of making employer pension contributions from your limited company. Shows the corporation tax saving, real cost to the company, and how it compares to taking the same amount as a dividend.",
  embedHeight: 420,
  fields: [
    {
      id: "profit",
      label: "Company profit before extraction",
      type: "currency",
      default: 150000,
      min: 0,
      max: 5000000,
      step: 5000,
    },
    {
      id: "salary",
      label: "Director salary",
      type: "currency",
      default: 12570,
      min: 0,
      max: 100000,
      step: 500,
      help: "Salary paid to the director. Often set at the personal allowance.",
    },
    {
      id: "contribution",
      label: "Employer pension contribution",
      type: "currency",
      default: 30000,
      min: 0,
      max: 60000,
      step: 1000,
      help: "Employer pension contribution from the company. Subject to the annual allowance.",
    },
    {
      id: "adjustedIncome",
      label: "Adjusted income (for taper test)",
      type: "currency",
      default: 150000,
      min: 0,
      max: 1000000,
      step: 5000,
      help: "Total income from all sources including employer contributions. Used for the tapered annual allowance test (tapers above £260k adjusted income).",
      advanced: true,
    },
  ],
  compute: (values: CalcValues) => {
    const out = calcPensionOptimiser({
      profit: Number(values.profit) || 0,
      salary: Number(values.salary) || 0,
      contribution: Number(values.contribution) || 0,
      adjustedIncome: Number(values.adjustedIncome) || 0,
    });
    return {
      headline: {
        label: "Real cost to company",
        value: fmt(out.realCostToCompany),
        sub: `CT saving: ${fmt(out.ctSaved)} | Pension advantage vs dividend: ${fmt(out.pensionAdvantage)}`,
        tone: "good",
      },
      rows: [
        { label: "Annual allowance", value: fmt(out.allowance) },
        { label: "Contribution (capped if needed)", value: `${fmt(out.contribution)}${out.capped ? " (capped)" : ""}` },
        { label: "CT without pension", value: fmt(out.ctNoPension) },
        { label: "CT with pension", value: fmt(out.ctWithPension) },
        { label: "Corporation tax saved", value: fmt(out.ctSaved), strong: true },
        { label: "Marginal CT rate", value: pct(out.marginal) },
        { label: "Real cost to company", value: fmt(out.realCostToCompany), strong: true },
        { label: "Net if taken as dividend instead", value: fmt(out.netDividendIfTakenInstead) },
        { label: "Pension advantage", value: fmt(out.pensionAdvantage), strong: true },
      ],
      note: out.capped
        ? `Contribution capped at annual allowance of ${fmt(out.allowance)}. Not personalised advice.`
        : "Not personalised advice. Pension suitability depends on your personal circumstances.",
    };
  },
  explainer: {
    heading: "Why employer pension contributions are tax-efficient",
    paragraphs: [
      "Employer pension contributions are a deductible business expense, reducing company profits and therefore corporation tax. At the 19-25% CT rate, every £10,000 contributed costs the company £7,500-8,100 in real terms.",
      "Compared to extracting the same amount as a dividend (which is taxed at dividend rates after CT), the pension advantage is typically significant for higher earners.",
    ],
  },
  faqs: [
    {
      question: "What is the pension annual allowance?",
      answer:
        "The standard annual allowance is £60,000 (2025/26). This tapers for high earners: if your adjusted income exceeds £260,000, the allowance reduces by £1 for every £2 of income above that, down to a minimum of £10,000.",
    },
  ],
};
