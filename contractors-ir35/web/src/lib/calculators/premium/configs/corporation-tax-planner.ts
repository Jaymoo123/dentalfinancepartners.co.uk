/**
 * Tool 4: Corporation tax planner.
 *
 * toolId: corporation-tax-planner-premium
 * topic: company-tax
 *
 * Wraps corporationTax(profit, { associated }) from tax2026.ts.
 * Uses CT constants for regime labels and the marginal-band effective-rate row.
 *
 * FIGURES TRACED (from tax2026.ts, no maths forked):
 *   corporationTax(80000):
 *     n=1, lower=50000, upper=250000
 *     50000 < 80000 < 250000 -> marginal relief band
 *     ct = 80000*0.25 - 3/200*(250000-80000)
 *        = 20000 - (0.015 * 170000)
 *        = 20000 - 2550 = 17450
 *   corporationTax(50000):
 *     50000 <= 50000 -> small rate: 50000*0.19 = 9500
 *   corporationTax(100000):
 *     50000 < 100000 < 250000 -> marginal
 *     ct = 100000*0.25 - 3/200*(250000-100000)
 *        = 25000 - (0.015 * 150000)
 *        = 25000 - 2250 = 22750
 *     effective rate = 22750/100000 = 22.75%
 *   corporationTax(80000, {associated:1}):
 *     n=2, lower=25000, upper=125000
 *     25000 < 80000 < 125000 -> marginal
 *     ct = 80000*0.25 - 3/200*(125000-80000)
 *        = 20000 - (0.015 * 45000)
 *        = 20000 - 675 = 19325
 *
 * No em-dashes anywhere. No DJH. 2026/27 rates (FA 2026 left CT unchanged, HP §7).
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import {
  corporationTax,
  CT,
} from "@/lib/calculators/tax2026";

function gbp(n: number): string {
  return "£" + Math.round(Number.isFinite(n) ? n : 0).toLocaleString("en-GB");
}

function pct(n: number): string {
  return (Number.isFinite(n) ? n : 0).toFixed(2) + "%";
}

export const corporationTaxPlannerConfig: PremiumToolConfig = {
  id: "corporation-tax-planner-premium",
  topic: "company-tax",
  title: "Corporation tax planner (2026/27)",
  intro: "See which corporation tax regime applies to your limited company, the marginal relief calculation where relevant, and the exact tax due, then carry the profit-after-tax figure into your extraction planning.",
  fields: [
    {
      id: "profit",
      label: "Taxable profit",
      type: "currency",
      default: 80000,
      min: 0,
      max: 1000000,
      step: 1000,
      help: "Your limited company's taxable profit before corporation tax. This is broadly turnover minus salary, employer NIC, allowable expenses and capital allowances.",
    },
    {
      id: "associatedCompanies",
      label: "Associated companies",
      type: "number",
      default: 0,
      min: 0,
      max: 20,
      step: 1,
      help: "The number of companies associated with yours (under common control). Each associated company divides the £50,000 and £250,000 thresholds, increasing your effective rate. Most solo contractors have 0 (HP §7).",
    },
  ],
  compute({ values }): PremiumResult {
    const profit    = Number.isFinite(Number(values.profit))    ? Number(values.profit)    : 80000;
    const associated = Number.isFinite(Number(values.associatedCompanies)) ? Number(values.associatedCompanies) : 0;

    const ct  = corporationTax(profit, { associated });
    const n   = associated + 1;
    const lower = CT.lowerLimit / n;
    const upper = CT.upperLimit / n;

    let regime: string;
    let effectiveRate: number;
    if (profit <= 0) {
      regime = "No liability (profit is zero or negative)";
      effectiveRate = 0;
    } else if (profit <= lower) {
      regime = `Small profits rate (19%)`;
      effectiveRate = CT.smallRate * 100;
    } else if (profit >= upper) {
      regime = `Main rate (25%)`;
      effectiveRate = CT.mainRate * 100;
    } else {
      regime = `Marginal relief band (effective ~26.5% at midpoint)`;
      effectiveRate = profit > 0 ? (ct / profit) * 100 : 0;
    }

    const marginalRelief = profit > lower && profit < upper
      ? CT.marginalFraction * (upper - profit)
      : 0;

    const profitAfterCt = Math.max(0, profit - ct);

    const headlineTone = ("good" as const);

    return {
      headline: {
        label: "Corporation tax due",
        value: gbp(ct),
        sub: `On ${gbp(profit)} profit. ${regime}. 2026/27.`,
        tone: headlineTone,
      },
      breakdown: [
        { label: "Taxable profit", value: gbp(profit) },
        { label: "Regime", value: regime },
        { label: "Associated company divisor", value: `${n}` },
        { label: "Small profits threshold", value: gbp(lower) },
        { label: "Main rate threshold", value: gbp(upper) },
        ...(marginalRelief > 0
          ? [{ label: "Marginal relief", value: `-${gbp(marginalRelief)}` }]
          : []),
        { label: "Effective rate", value: pct(effectiveRate), strong: false },
        { label: "Corporation tax due", value: gbp(ct), strong: true },
        { label: "Profit after CT", value: gbp(profitAfterCt), strong: true },
      ],
      note: "FA 2026 left the corporation tax rates unchanged. Small profits rate 19% up to £50,000 taxable profit; main rate 25% above £250,000; marginal relief 3/200 (approximately 26.5% effective rate at the midpoint) between £50,000 and £250,000 (HP §7). Both thresholds are divided by the number of associated companies plus one: if you have one associated company, the small profits threshold halves to £25,000 and the main rate threshold halves to £125,000. The profit-after-CT figure feeds the dividend extraction calculation in the salary and dividend planner. These are estimates, not advice.",
    };
  },
  explainer: {
    heading: "How the corporation tax planner works",
    paragraphs: [
      "Corporation tax in the UK is not a flat rate. Profits up to £50,000 are charged at the small profits rate of 19%. Profits above £250,000 are charged at the main rate of 25%. Profits between £50,000 and £250,000 fall in the marginal relief band: the tax is calculated at 25% and then reduced by a marginal relief fraction of 3/200 multiplied by the distance from the upper limit. This produces an effective rate that rises from 19% to 25% across the band, with the midpoint at roughly 26.5%, which is higher than the headline 25%.",
      "The thresholds are divided by the number of associated companies plus one. If your company is associated with one other company (for example, a spouse owns another active company), both thresholds halve: the small profits threshold drops from £50,000 to £25,000, and the main rate threshold drops from £250,000 to £125,000. The definition of association is broad: it includes companies under common control (by you, your spouse, civil partner, or a connected person). Most solo contractors with no other company interests have zero associated companies.",
      "Corporation tax is due nine months and one day after your company's financial year end for companies within the standard quarterly instalment payment regime. Most small contractors pay in a single lump sum after filing their corporation tax return. The profit-after-CT figure shown above is the maximum available for dividend extraction, but you may want to retain some to cover future costs and maintain a buffer. The salary and dividend planner in this tool set models the personal tax on extraction.",
    ],
  },
};
