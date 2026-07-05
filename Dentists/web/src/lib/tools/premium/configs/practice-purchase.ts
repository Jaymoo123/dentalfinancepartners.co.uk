/**
 * Tool 3: Dental practice purchase affordability and valuation calculator.
 *
 * toolId: practice-purchase-premium
 * topic: buying
 *
 * Composes calcPracticeValuation (existing lib) with the new calcAffordability
 * helper for a "can the practice pay for itself?" sense-check.
 *
 * FIGURES TRACED:
 * - calcPracticeValuation: indicative UK dental market multiples, 2025/26
 *   (mix/region/demand adjustments, HP §4).
 * - calcAffordability: arithmetic only; interest rate (default 8%) and term
 *   (default 15 years) are the reader's own assumptions (F3).
 * - HP §4: treat multiples as ranges, never a single number; corporate buyer
 *   premium not modelled (stated in note).
 * - HP §3: NHS contract transfers by novation with commissioner consent; some
 *   commissioners cut goodwill value 5-10% (stated in note).
 * - HP §5.B: interest is deductible against trade profit but loan principal is not
 *   (stated in note).
 */
import type { PremiumToolConfig, PremiumResult, ScenarioResult } from "../types";
import {
  calcPracticeValuation,
  type PracticeMix,
  type Region,
  type Demand,
} from "@/lib/tools/compute/practice-valuation";
import { calcAffordability } from "@/lib/tools/compute/practice-affordability";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function gbpRange(low: number, high: number): string {
  return `${gbp(low)} to ${gbp(high)}`;
}

export const practicePurchaseConfig: PremiumToolConfig = {
  id: "practice-purchase-premium",
  topic: "buying",
  title: "Dental practice purchase affordability and valuation calculator",
  intro: "Estimate an indicative value range for a practice you want to buy from its normalised EBITDA, then sense-check the deal: your deposit, the borrowing required, and whether the practice profit comfortably covers the repayments.",
  fields: [
    {
      id: "ebitda",
      label: "Normalised EBITDA of the target practice",
      type: "currency",
      default: 200000,
      min: 0,
      max: 2000000,
      step: 10000,
    },
    {
      id: "mix",
      label: "Practice mix",
      type: "select",
      default: "mixed",
      options: [
        { value: "nhs-heavy", label: "NHS-heavy" },
        { value: "mixed", label: "Mixed" },
        { value: "private-heavy", label: "Private-heavy" },
      ],
    },
    {
      id: "region",
      label: "Region",
      type: "select",
      default: "midlands",
      options: [
        { value: "london", label: "London" },
        { value: "south", label: "South" },
        { value: "midlands", label: "Midlands" },
        { value: "north", label: "North" },
        { value: "wales", label: "Wales" },
        { value: "ni", label: "Northern Ireland" },
      ],
    },
    {
      id: "demand",
      label: "Buyer demand",
      type: "select",
      default: "normal",
      options: [
        { value: "low", label: "Low" },
        { value: "normal", label: "Normal" },
        { value: "high", label: "High" },
      ],
    },
    {
      id: "tangibleAssets",
      label: "Tangible assets (equipment, fit-out)",
      type: "currency",
      default: 60000,
      min: 0,
      max: 1000000,
      step: 5000,
    },
    {
      id: "purchasePrice",
      label: "Agreed or expected purchase price",
      type: "currency",
      default: 0,
      min: 0,
      max: 5000000,
      step: 5000,
      advanced: true,
      help: "Defaults to the mid-point indicative total value when left at 0.",
    },
    {
      id: "depositPct",
      label: "Your deposit (%)",
      type: "number",
      default: 20,
      min: 0,
      max: 100,
      step: 5,
      advanced: true,
    },
    {
      id: "interestRate",
      label: "Loan interest rate (%)",
      type: "number",
      default: 8,
      min: 0,
      max: 20,
      step: 0.5,
      advanced: true,
      help: "Your own assumption, not a house figure (F3). Dental practice acquisition loans vary by lender, practice size and buyer profile.",
    },
    {
      id: "termYears",
      label: "Loan term (years)",
      type: "number",
      default: 15,
      min: 1,
      max: 30,
      step: 1,
      advanced: true,
      help: "Your own assumption, not a house figure (F3).",
    },
  ],
  compute({ values }): PremiumResult {
    const ebitda = Number(values.ebitda) || 0;
    const mix = String(values.mix) as PracticeMix;
    const region = String(values.region) as Region;
    const demand = String(values.demand) as Demand;
    const tangibleAssets = Number(values.tangibleAssets) || 0;
    const depositPct = Number.isFinite(Number(values.depositPct)) ? Number(values.depositPct) : 20;
    const interestRate = Number.isFinite(Number(values.interestRate)) ? Number(values.interestRate) : 8;
    const termYears = Number.isFinite(Number(values.termYears)) ? Number(values.termYears) : 15;

    const val = calcPracticeValuation(ebitda, mix, region, demand, tangibleAssets);
    const midTotal = (val.totalLow + val.totalHigh) / 2;

    // Default purchasePrice to mid total value if not overridden.
    const purchasePriceInput = Number(values.purchasePrice) || 0;
    const purchasePrice = purchasePriceInput > 0 ? purchasePriceInput : midTotal;

    const aff = calcAffordability({
      purchasePrice,
      depositPct,
      interestRate,
      termYears,
      ebitda,
    });

    const coverOk = aff.coverRatio >= 1.25;

    const scenarios: ScenarioResult[] = [
      {
        id: "low",
        label: "Low (conservative)",
        headline: {
          label: "Total value",
          value: gbp(val.totalLow),
          sub: `goodwill ${gbp(val.goodwillLow)} at ${val.multipleLow.toFixed(2)}x EBITDA`,
          tone: "good",
        },
        rows: [
          { label: "Goodwill (low)", value: gbp(val.goodwillLow) },
          { label: "Tangible assets", value: gbp(tangibleAssets) },
          { label: "Total value (low)", value: gbp(val.totalLow), strong: true },
        ],
      },
      {
        id: "high",
        label: "High (optimistic)",
        headline: {
          label: "Total value",
          value: gbp(val.totalHigh),
          sub: `goodwill ${gbp(val.goodwillHigh)} at ${val.multipleHigh.toFixed(2)}x EBITDA`,
          tone: "good",
        },
        rows: [
          { label: "Goodwill (high)", value: gbp(val.goodwillHigh) },
          { label: "Tangible assets", value: gbp(tangibleAssets) },
          { label: "Total value (high)", value: gbp(val.totalHigh), strong: true },
        ],
      },
    ];

    const coverLabel = aff.annualRepayment > 0
      ? `${aff.coverRatio.toFixed(1)}x ${coverOk ? "(comfortable)" : "(below 1.25x, review affordability)"}`
      : "n/a";

    return {
      headline: {
        label: "Indicative total value",
        value: gbp(midTotal),
        sub: `goodwill ${gbpRange(val.goodwillLow, val.goodwillHigh)} at ${val.multipleLow.toFixed(1)}x to ${val.multipleHigh.toFixed(1)}x EBITDA`,
        tone: "good",
      },
      scenarioResults: scenarios,
      breakdown: [
        { label: "Goodwill range", value: gbpRange(val.goodwillLow, val.goodwillHigh) },
        { label: "Tangible assets", value: gbp(tangibleAssets) },
        { label: "Total value range", value: gbpRange(val.totalLow, val.totalHigh) },
        { label: "Purchase price used", value: gbp(purchasePrice), strong: true },
        { label: "Deposit", value: gbp(aff.deposit) },
        { label: "Loan amount", value: gbp(aff.loanAmount) },
        { label: "Estimated annual repayment", value: gbp(aff.annualRepayment) },
        {
          label: "EBITDA cover ratio",
          value: coverLabel,
          ...(coverOk ? {} : { tone: "warn" as const }),
        },
      ],
      chart: {
        data: [
          { name: "Total value (mid)", value: Math.round(midTotal) },
          { name: "Annual repayment", value: Math.round(aff.annualRepayment) },
          { name: "EBITDA", value: Math.round(ebitda) },
        ],
      },
      note: "Goodwill multiples are indicative 2025/26 UK dental market ranges, not a formal valuation (HP §4). Corporate buyer premiums are not modelled. On an asset sale, the NHS contract transfers by novation with commissioner consent, and some commissioners reduce the goodwill value by 5 to 10% at that point (HP §3). The affordability layer is a sense-check on your own assumptions: the interest rate and loan term are not house figures. Goodwill amortisation relief for the buying company applies at 6.5% a year only on post-1-April-2019 acquisitions meeting the qualifying-IP condition (HP §4). Interest is deductible against trade profit, but loan principal is not (HP §5.B). These are estimates, not advice for your practice.",
    };
  },
  chart: {
    kind: "bar",
    valueFormat: "currency",
    series: [
      { dataKey: "value", label: "Value", color: "var(--gold)" },
    ],
  },
  explainer: {
    heading: "How this planner works",
    paragraphs: [
      "The valuation range is estimated from the practice's normalised EBITDA (earnings before interest, tax, depreciation and amortisation, with add-backs for non-recurring or owner-specific costs already applied by you). The EBITDA is multiplied by a range of indicative market multiples that vary by practice mix (NHS-heavy practices attract lower multiples than private), region (London commands a premium; north, Wales and Northern Ireland a discount) and buyer-demand conditions. Tangible assets (equipment, fit-out) are added to give the indicative total value.",
      "The affordability layer takes your purchase price (defaulting to the mid-point of the value range), applies your deposit percentage to compute the loan amount, and runs the standard amortising annuity formula on a monthly basis to estimate the annual repayment. The EBITDA cover ratio compares the practice's normalised profit to the repayment: a ratio below 1.25x is a flag to review the deal structure, rate assumption or deposit level.",
      "Important: these are indicative ranges only. Actual dental practice transaction values depend on a wide range of factors the model cannot capture: buyer type (individual dentist vs corporate group), lease vs freehold, NHS contract security and CQC history, associate retention risk, and negotiation. A formal valuation requires an independent specialist. The interest rate and loan term are your own assumptions and should be confirmed with your lender.",
    ],
  },
};
