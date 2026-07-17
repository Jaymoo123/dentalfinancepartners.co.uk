/**
 * Premium tool config: Equity Partner Buy-In Modeller
 *
 * toolId: equity-partner-buyin-premium
 * topic: partnership-llp (surfaces on partnership/LLP blog posts)
 *
 * Compares three routes to fund a capital contribution:
 *   1. Personal loan with ITA 2007 s.398 qualifying loan interest relief
 *   2. Firm-facilitated loan (interest deducted at firm level)
 *   3. Staged capital build from drawings
 *
 * FIGURES SOURCED (2026/27):
 *   - Income tax rates and thresholds: gov.uk (confirmed 2026-07-17).
 *   - ITA 2007 s.398: HMRC Employment Income Manual EIM20500; qualifying
 *     condition = loan used wholly to acquire a share in a partnership.
 *   - PA taper from £100,000: ITEPA 2003 s.35.
 *   - No FA 2026 changes to ITA 2007 s.398 relief structure.
 */

import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import { calculateEquityPartnerBuyIn } from "@/lib/tools/compute/equity-partner-buyin";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function yr(n: number): string {
  return n >= 99 ? "n/a" : `${n.toFixed(1)} yrs`;
}

export const equityPartnerBuyInConfig: PremiumToolConfig = {
  id: "equity-partner-buyin-premium",
  topic: "partnership-llp",
  title: "Equity partner buy-in modeller",
  intro:
    "Compare funding routes for your capital contribution, see the tax relief available on qualifying loan interest under ITA 2007 s.398, and project your payback horizon against the profit-share uplift.",
  fields: [
    {
      id: "buyInAmount",
      label: "Capital contribution required",
      type: "currency",
      default: 75000,
      min: 5000,
      max: 1000000,
      step: 5000,
      help: "The total capital the firm requires from you on admission as an equity partner.",
    },
    {
      id: "firmAnnualProfit",
      label: "Firm annual profit pool",
      type: "currency",
      default: 800000,
      min: 50000,
      max: 10000000,
      step: 25000,
    },
    {
      id: "projectedProfitShare",
      label: "Profit share after buy-in",
      type: "number",
      default: 10,
      min: 0.5,
      max: 50,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "currentProfitShare",
      label: "Current profit share (0 if not yet a partner)",
      type: "number",
      default: 0,
      min: 0,
      max: 49,
      step: 0.5,
      suffix: "%",
    },
    {
      id: "taxableIncome",
      label: "Your total taxable income (before buy-in)",
      type: "currency",
      default: 75000,
      min: 12571,
      max: 500000,
      step: 5000,
      help: "Sets the marginal rate for ITA 2007 s.398 qualifying loan interest relief.",
    },
    {
      id: "loanInterestRate",
      label: "Loan interest rate",
      type: "number",
      default: 6.5,
      min: 1,
      max: 20,
      step: 0.25,
      suffix: "%",
      advanced: true,
      help: "Applies to both the personal loan and firm-facilitated loan routes.",
    },
    {
      id: "loanTermYears",
      label: "Loan repayment term",
      type: "number",
      default: 5,
      min: 1,
      max: 10,
      step: 1,
      suffix: "yrs",
      advanced: true,
    },
    {
      id: "stagedYears",
      label: "Years to build capital from drawings (staged route)",
      type: "number",
      default: 3,
      min: 1,
      max: 10,
      step: 1,
      suffix: "yrs",
      advanced: true,
      help: "Profit share begins only when full capital is in place in most firms.",
    },
    {
      id: "currentDrawings",
      label: "Current annual drawings",
      type: "currency",
      default: 60000,
      min: 0,
      max: 1000000,
      step: 5000,
      advanced: true,
      help: "Used for context on drawings impact; does not affect loan calculations.",
    },
  ],
  compute({ values }): PremiumResult {
    const result = calculateEquityPartnerBuyIn({
      buyInAmount:         Number(values.buyInAmount)         || 75000,
      loanInterestRate:    Number(values.loanInterestRate)    || 6.5,
      loanTermYears:       Number(values.loanTermYears)       || 5,
      currentDrawings:     Number(values.currentDrawings)     || 0,
      currentProfitShare:  Number(values.currentProfitShare)  || 0,
      projectedProfitShare: Number(values.projectedProfitShare) || 10,
      firmAnnualProfit:    Number(values.firmAnnualProfit)    || 800000,
      taxableIncome:       Number(values.taxableIncome)       || 75000,
      stagedYears:         Number(values.stagedYears)         || 3,
    });

    const { personalLoan, firmLoan, stagedDrawings } = result.fundingRoutes;

    const scenarios: ScenarioResult[] = [
      {
        id: "personal-loan",
        label: "Personal loan",
        best: result.bestRoute === "personalLoan",
        headline: {
          label:  "Monthly cost after s.398 relief",
          value:  gbp(personalLoan.monthlyNetCostAfterRelief),
          sub:    `Payback ${yr(personalLoan.paybackHorizonYears)} · s.398 relief ${gbp(personalLoan.qualifyingLoanInterestRelief)}/yr`,
          tone:   result.bestRoute === "personalLoan" ? "good" : "default",
        },
        rows: [
          { label: "Monthly repayment (gross)", value: gbp(personalLoan.monthlyRepayment)        },
          { label: "Annual interest (year 1)",  value: gbp(Math.round(Number(values.buyInAmount) * Number(values.loanInterestRate) / 100)) },
          { label: "ITA 2007 s.398 relief",     value: gbp(personalLoan.qualifyingLoanInterestRelief), strong: true },
          { label: "Monthly net cost",          value: gbp(personalLoan.monthlyNetCostAfterRelief), strong: true },
          { label: "Total interest over term",  value: gbp(personalLoan.totalInterestPaid)       },
          { label: "Payback horizon",           value: yr(personalLoan.paybackHorizonYears)       },
        ],
      },
      {
        id: "firm-loan",
        label: "Firm-facilitated loan",
        best: result.bestRoute === "firmLoan",
        headline: {
          label:  "Effective monthly cost",
          value:  gbp(firmLoan.monthlyNetCostAfterRelief),
          sub:    `Payback ${yr(firmLoan.paybackHorizonYears)} · interest reduces profit pool`,
          tone:   result.bestRoute === "firmLoan" ? "good" : "default",
        },
        rows: [
          { label: "Monthly repayment",          value: gbp(firmLoan.monthlyRepayment)           },
          { label: "Total interest over term",    value: gbp(firmLoan.totalInterestPaid)         },
          { label: "Effective monthly cost",      value: gbp(firmLoan.monthlyNetCostAfterRelief), strong: true },
          { label: "Payback horizon",             value: yr(firmLoan.paybackHorizonYears)         },
        ],
      },
      {
        id: "staged-drawings",
        label: "Staged from drawings",
        best: result.bestRoute === "stagedDrawings",
        headline: {
          label:  "Annual drawings diverted",
          value:  gbp(stagedDrawings.annualDrawingsReduction),
          sub:    `${Number(values.stagedYears) || 3} yrs to full capital · no interest cost`,
          tone:   result.bestRoute === "stagedDrawings" ? "good" : "default",
        },
        rows: [
          { label: "Annual drawings diverted",    value: gbp(stagedDrawings.annualDrawingsReduction), strong: true },
          { label: "Monthly cash reduction",      value: gbp(stagedDrawings.monthlyNetCostAfterRelief) },
          { label: "Total interest cost",         value: "Nil"                                       },
          { label: "Payback horizon (from full capital)", value: yr(stagedDrawings.paybackHorizonYears) },
        ],
      },
    ];

    return {
      headline: {
        label: "Annual profit-share uplift",
        value: gbp(result.profitShareUplift),
        sub:   result.summary,
        tone:  result.profitShareUplift > 0 ? "good" : "default",
      },
      scenarioResults: scenarios,
      breakdown: [
        { label: "Capital contribution",           value: gbp(result.capitalContribution) },
        { label: "Profit-share uplift per year",   value: gbp(result.profitShareUplift), strong: true },
        { label: "Net first-year position (vs personal loan cost)", value: gbp(result.netFirstYearGain) },
        { label: "Best route",                     value: { personalLoan: "Personal loan (s.398)", firmLoan: "Firm-facilitated loan", stagedDrawings: "Staged drawings" }[result.bestRoute], strong: true },
      ],
      note:
        "ITA 2007 s.398 relief applies only where the loan is used wholly and exclusively to acquire an interest in a partnership that is carrying on a trade or profession. The relief reduces total income, so the effective benefit depends on your marginal rate and personal allowance position. Firm-facilitated loan relief operates differently: the interest is a deduction from the firm's profit pool, reducing the pool on which all partners pay tax. Staged-drawings route payback includes the staging period. All figures are estimates only; your actual tax position will depend on your specific circumstances and should be confirmed with a specialist solicitors' accountant.",
    };
  },
  explainer: {
    heading: "How the modeller works",
    paragraphs: [
      "The capital contribution is the lump sum a firm requires a new equity partner to place into the partnership's capital account on admission. It gives the firm a buffer against future liabilities and aligns the partner's interests with those of the firm. Most firms between 3 and 15 partners set buy-ins between £25,000 and £200,000; larger commercial practices routinely require £300,000 or more.",
      "ITA 2007 s.398 provides income tax relief on interest paid on a qualifying loan taken out to acquire an interest in a close trading partnership. The relief is given as a deduction from total income rather than a credit, so the benefit equals the interest multiplied by your marginal rate. For a higher-rate taxpayer paying 6.5% interest on a £75,000 loan, the annual relief is roughly £1,950. For a taxpayer in the personal allowance taper band (£100,000 to £125,140), the effective marginal rate is 60%, making the relief correspondingly higher.",
      "The firm-facilitated route (the firm on-lends funds or defers full capital payment) works differently: the interest the firm pays on any underlying borrowing is deducted from the firm's profit pool before allocation, so the effective saving is each partner's share of that deduction. This is not a personal ITA 2007 s.398 relief and cannot be claimed on your self-assessment return in the same way.",
      "The staged-drawings route avoids interest entirely: the partner directs a portion of drawings each year into their capital account. The payback horizon is longer because equity-partner profit-share typically begins only once full capital is in place, so the staging period is additive to the payback calculation.",
    ],
  },
};
