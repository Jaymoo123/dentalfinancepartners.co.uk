/**
 * Tool 2: Dental principal profit-extraction planner.
 *
 * toolId: principal-extraction-premium
 * topic: principal
 *
 * Direct reuse of calcPrincipalExtraction. Surfaces the partnership vs Ltd
 * comparison with the NHS Pension trade-off made explicit (HP §2.C, §5).
 *
 * FIGURES TRACED:
 * - calcPrincipalExtraction: 2026/27 rates (employer NIC 15% above £5,000
 *   secondary threshold from 6 Apr 2025; dividend rates 10.75%/35.75%/39.35%
 *   FA 2026 s.4; Ltd admin cost £2,500; £12,570 director salary + dividends).
 * - HP §5.A: director's loan ahead of dividends triggers a s.455 charge at
 *   35.75% on post-6-Apr-2026 loans (stated in note).
 * - HP §2.C: NHS Pension accrual loss on incorporated dividend portion (stated
 *   in note when nhsActive).
 *
 * CRITICAL COMPLIANCE NOTE (HP §5): this tool must NOT present incorporation as
 * a clear tax win at typical dental profit levels. The NHS Pension pension-accrual
 * loss can outweigh the headline tax saving for an NHS-active principal with
 * 10+ years ahead. The pensionImpact output from the lib surfaces this.
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import { calcPrincipalExtraction } from "@/lib/tools/compute/principal-extraction";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number, profit: number): string {
  return profit > 0 ? ((n / profit) * 100).toFixed(1) + "%" : "0.0%";
}

export const principalExtractionConfig: PremiumToolConfig = {
  id: "principal-extraction-premium",
  topic: "principal",
  title: "Dental principal profit-extraction planner",
  intro: "Compare taking your practice profit as a sole trader or partnership against extracting it through a limited company, after income tax, National Insurance, corporation tax and dividend tax, with the NHS Pension trade-off made explicit.",
  fields: [
    {
      id: "profit",
      label: "Practice profit available to extract",
      type: "currency",
      default: 120000,
      min: 0,
      max: 1000000,
      step: 5000,
    },
    {
      id: "nhsActive",
      label: "Active NHS Pension member?",
      type: "toggle",
      default: true,
      help: "Changes the pension-accrual impact note. Incorporation can reduce NHS Pension accrual on the dividend portion (HP §2.C).",
    },
    {
      id: "pensionContrib",
      label: "Employer pension contribution a year",
      type: "currency",
      default: 0,
      min: 0,
      max: 60000,
      step: 1000,
      advanced: true,
      help: "Deducted before tax under FA 2004 s.196 (HP §5). Applies to both routes in this model.",
    },
  ],
  compute({ values }): PremiumResult {
    const profit = Number(values.profit) || 0;
    const nhsActive = Boolean(values.nhsActive);
    const pensionContrib = Number(values.pensionContrib) || 0;

    const result = calcPrincipalExtraction(profit, nhsActive, pensionContrib);

    const partnershipNet = result.partnership.net;
    const ltdNet = result.ltd.net;
    const partnershipWins = partnershipNet >= ltdNet;
    const bestNet = Math.max(partnershipNet, ltdNet);
    const bestLabel = partnershipWins ? "as a sole trader or partnership" : "through a limited company";
    const diff = Math.abs(partnershipNet - ltdNet);

    const scenarios: ScenarioResult[] = [
      {
        id: "partnership",
        label: "Sole trader / partnership",
        headline: {
          label: "Net take-home",
          value: gbp(partnershipNet),
          sub: `effective rate ${pct(result.partnership.tax, profit)}`,
          tone: "good",
        },
        rows: [
          { label: "Net take-home", value: gbp(partnershipNet), strong: true },
          { label: "Total tax and NIC", value: gbp(result.partnership.tax) },
          { label: "Effective tax rate", value: pct(result.partnership.tax, profit) },
        ],
        best: partnershipWins,
      },
      {
        id: "ltd",
        label: "Limited company",
        headline: {
          label: "Net take-home",
          value: gbp(ltdNet),
          sub: "£12,570 salary + dividends, £2,500 admin",
          tone: "good",
        },
        rows: [
          { label: "Net take-home", value: gbp(ltdNet), strong: true },
          { label: "Total tax and NIC", value: gbp(result.ltd.tax) },
          { label: "Effective tax rate", value: pct(result.ltd.tax, profit) },
          { label: "Note", value: "assumes £12,570 director salary plus dividends, £2,500 admin, no Employment Allowance" },
        ],
        best: !partnershipWins,
      },
    ];

    const breakdownRows = [
      { label: `Take-home difference (${partnershipWins ? "partnership ahead" : "Ltd ahead"})`, value: gbp(diff), strong: true },
      { label: "Partnership effective tax rate", value: pct(result.partnership.tax, profit) },
      { label: "Ltd effective tax rate", value: pct(result.ltd.tax, profit) },
    ];

    if (nhsActive) {
      breakdownRows.push({
        label: "NHS Pension impact",
        value: result.pensionImpact,
      });
    }

    return {
      headline: {
        label: "Best route keeps",
        value: gbp(bestNet),
        sub: bestLabel,
        tone: "good",
      },
      scenarioResults: scenarios,
      breakdown: breakdownRows,
      chart: {
        data: [
          {
            name: "Kept after tax",
            partnership: Math.round(partnershipNet),
            ltd: Math.round(ltdNet),
          },
          {
            name: "Total tax",
            partnership: Math.round(result.partnership.tax),
            ltd: Math.round(result.ltd.tax),
          },
        ],
      },
      note: nhsActive
        ? "2026/27 basis (FA 2026 dividend rates 10.75%/35.75%/39.35%; employer NIC 15% above £5,000 from 6 April 2025). NHS Pension: dividends are not NHS-pensionable, so an incorporated principal loses accrual on the dividend portion. For an NHS-active principal with 10 or more years ahead, the actuarial value of that pension loss can outweigh the headline tax saving (HP §2.C). The company's money is not your money: dividends are taxed again on extraction, already in the Ltd figure. A director's loan taken ahead of dividends triggers a s.455 charge at 35.75% on post-6-April-2026 loans (HP §5.A). Excludes Employment Allowance, salary optimisation above the threshold, and the actuarial value of the pension loss itself. These are estimates, not advice for your practice."
        : "2026/27 basis (FA 2026 dividend rates 10.75%/35.75%/39.35%; employer NIC 15% above £5,000 from 6 April 2025). The company's money is not your money: dividends are taxed again on extraction, already in the Ltd figure. A director's loan taken ahead of dividends triggers a s.455 charge at 35.75% on post-6-April-2026 loans (HP §5.A). Excludes Employment Allowance, salary optimisation above the threshold, and the actuarial value of any pension loss. These are estimates, not advice for your practice.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "partnership", label: "Sole trader / partnership", color: "var(--gold)" },
      { dataKey: "ltd", label: "Limited company", color: "var(--navy)" },
    ],
  },
  explainer: {
    heading: "How this planner works",
    paragraphs: [
      "A dental principal or practice owner has two main extraction routes: taking profit directly as a sole trader or partnership (income tax plus Class 4 and Class 2 NIC on the full profit), or channelling it through a limited company (the company pays corporation tax at 19% on small profits up to £50,000 or 25% on profits above £250,000, with marginal relief between; you then take a £12,570 director salary and pay the remainder as dividends). The 2026/27 dividend rates are 10.75% (basic), 35.75% (higher) and 39.35% (additional) following the FA 2026 uplift.",
      "At typical dental practice profit levels, the headline tax gap between the two routes is smaller than many principals expect, and it has narrowed further with the 2026/27 dividend rate increase. Employer NIC at 15% above the £5,000 secondary threshold (effective 6 April 2025) also reduces the Ltd advantage compared with earlier years.",
      "The most important number is not in this tool: it is the actuarial value of the NHS Pension accrual you give up on dividends. A full-rate NHS principal with 10 or more years of active membership ahead can face a pension cost that exceeds the lifetime tax saving from a limited company structure. This tool surfaces the pension-impact flag when you indicate you are an active NHS Pension member, but a full actuarial assessment needs a specialist dental financial planner (HP §2.C).",
    ],
  },
};
