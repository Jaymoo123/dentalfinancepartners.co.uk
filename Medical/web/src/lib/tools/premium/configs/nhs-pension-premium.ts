/**
 * Tool 1: NHS Pension annual allowance and taper planner.
 *
 * toolId: nhs-pension-premium
 * topic: nhs-pension
 *
 * Direct reuse of calcNHSPension. Shows whether NHS Pension growth breaches
 * the annual allowance once the taper is applied, and estimates the tax charge
 * before the user decides on Scheme Pays.
 *
 * FIGURES TRACED:
 * - calcNHSPension: 2025/26 constants (£60,000 standard allowance; £200,000
 *   threshold income trigger; £260,000 adjusted income trigger; £10,000 floor).
 * - Taper: reduction = (adjustedIncome - £260,000) / 2.
 * - Tax charge: excess * marginal rate (20% / 40% / 45%).
 * - effectiveCost = taxCharge / pensionGrowth * 100 (shown only when taxCharge > 0).
 *
 * COMPLIANCE NOTE (HP §2.B, §2.D): Scheme Pays can settle the charge where it
 * exceeds £2,000 and scheme growth exceeds £60,000 (election deadline 31 July
 * in the year after the charge). Carry-forward of unused allowance from the
 * previous three years can remove or reduce the charge and is NOT modelled here.
 * These facts are stated in the tool note and explainer.
 *
 * NO chart: single-charge output, not a comparison.
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcNHSPension, type TaxBand } from "@/lib/tools/compute/nhs-pension";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

export const nhsPensionPremiumConfig: PremiumToolConfig = {
  id: "nhs-pension-premium",
  topic: "nhs-pension",
  title: "NHS Pension annual allowance and taper planner",
  intro:
    "See whether your NHS Pension growth breaches the annual allowance once the taper is applied, and estimate the tax charge before you decide on Scheme Pays.",
  fields: [
    {
      id: "thresholdIncome",
      label: "Threshold income",
      type: "currency",
      default: 150000,
      min: 0,
      max: 400000,
      step: 5000,
      help: "Broadly your taxable income minus your own pension contributions (HP §2.B).",
    },
    {
      id: "pensionGrowth",
      label: "NHS pension input amount (growth this year)",
      type: "currency",
      default: 40000,
      min: 0,
      max: 200000,
      step: 1000,
      help: "The capitalised growth in your NHS benefits, not the contributions you paid (HP §2.B).",
    },
    {
      id: "taxBand",
      label: "Your marginal income tax rate",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
    },
  ],
  compute({ values }): PremiumResult {
    const thresholdIncome = Number(values.thresholdIncome) || 0;
    const pensionGrowth = Number(values.pensionGrowth) || 0;
    const taxBand = (String(values.taxBand) || "higher") as TaxBand;

    const result = calcNHSPension({ thresholdIncome, pensionGrowth, taxBand });

    const headlineTone = result.taxCharge > 0 ? "warn" : "good";
    const allowanceSub = result.isTapered
      ? `Tapered allowance ${gbp(result.annualAllowance)}`
      : "Standard allowance £60,000";

    const breakdownRows = [
      {
        label: "Annual allowance (tapered or standard)",
        value: gbp(result.annualAllowance),
      },
      {
        label: "Adjusted income",
        value: gbp(result.adjustedIncome),
      },
      {
        label: "Excess over allowance",
        value: gbp(result.excess),
      },
      {
        label: "Estimated tax charge",
        value: gbp(result.taxCharge),
        strong: true,
      },
    ];

    if (result.taxCharge > 0) {
      breakdownRows.push({
        label: "Effective cost of the breach",
        value: result.effectiveCost.toFixed(4).replace(/\.?0+$/, "") + "%",
      });
    }

    return {
      headline: {
        label: "Estimated annual allowance charge",
        value: gbp(result.taxCharge),
        sub: allowanceSub,
        tone: headlineTone,
      },
      breakdown: breakdownRows,
      note:
        "2025/26 basis. The annual allowance is £60,000, tapering where threshold income exceeds £200,000 AND adjusted income exceeds £260,000, down to a £10,000 floor (HP §2.B). This tool measures pension growth (input amount), not contributions you paid. Carry-forward of unused allowance from the previous three tax years can remove or reduce a charge and is not modelled here. Where the charge exceeds £2,000 and scheme growth exceeds £60,000, mandatory Scheme Pays can settle it (election deadline 31 July in the year after the charge, HP §2.D). These are estimates, not advice.",
    };
  },
  explainer: {
    heading: "How the annual allowance and taper work",
    paragraphs: [
      "The NHS Pension annual allowance is the maximum amount by which your pension benefits can grow in a tax year without triggering a charge. From 2023/24 the standard allowance was restored to £60,000 a year. The growth is measured as the pension input amount: the capitalised increase in your defined-benefit entitlement, calculated by NHS Pensions, not the contributions you actually paid during the year. These two figures can differ significantly for senior doctors whose salaries place them in higher accrual tiers.",
      "The taper reduces the annual allowance for high earners whose threshold income exceeds £200,000 AND whose adjusted income (broadly threshold income plus the pension input amount itself) exceeds £260,000. For every £2 of adjusted income above £260,000 the allowance shrinks by £1, down to a minimum of £10,000. A consultant with a large pension input amount can find the adjusted income trigger breached even when their take-home pay feels relatively modest, because the pension accrual is counted as notional income for taper purposes.",
      "Before accepting a tax charge, check whether carry-forward of unused allowance from the previous three tax years can eliminate or reduce it. If a charge remains and exceeds £2,000 (and your scheme growth exceeds £60,000), Scheme Pays allows you to ask the NHS Pension Scheme to settle the charge and reduce your eventual pension by an actuarial amount. The election deadline is 31 July in the tax year following the charge year (HP §2.D). A specialist medical accountant can model the carry-forward position and help you decide whether Scheme Pays or direct payment is the better option.",
    ],
  },
};
