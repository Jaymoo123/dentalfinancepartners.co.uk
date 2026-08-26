/**
 * Tool 5: NHS Pension Scheme Pays cost modeller.
 *
 * toolId: nhs-pension-scheme-pays-premium
 * topic: nhs-pension
 *
 * Compares paying an Annual Allowance charge in cash now versus electing
 * Scheme Pays and accepting a permanent reduction to the eventual pension.
 *
 * ELIGIBILITY RULES (stated clearly in output, not gated in UI):
 * - Mandatory Scheme Pays: charge > £2,000 AND scheme growth > £60,000.
 * - Voluntary Scheme Pays: available where the scheme allows, even if below
 *   those thresholds -- cost terms differ and a specialist should advise.
 * - Election deadline: 31 July in the tax year following the charge year, with
 *   the s.237BA extended limb where a revised statement lands on or after 2 May.
 *
 * FACTORS AND METHOD: this file holds NO factor table and NO interest rate of
 * its own. It delegates to the single canonical module
 * @/lib/tools/compute/nhs-pension-scheme-pays, which carries NHSBSA's published
 * factor tables 1 and 2 with their source document, version and read date.
 *
 * This used to keep a private nine-band age table and a flat 2.35% nominal
 * interest rate, neither of which appears in any NHSBSA publication. Both were
 * removed on 2026-08-26. Do NOT re-declare scheme factors or interest rates
 * here: a private duplicate of a numeric table is exactly how the fabricated
 * figures survived review. NHSBSA's estimating basis is a single division,
 * charge / factor, and it already excludes interest because the interest rate
 * is expressed in excess of CPI, so the answer is in today's money.
 *
 * PREMIUM SIBLING NOTE: a carry-forward layer is the natural premium extension --
 * show whether unused AA from the previous three years eliminates the charge
 * before Scheme Pays is even needed. That extension is NOT modelled here.
 *
 * NO chart: the output is a side-by-side comparison, not a series.
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import {
  calcSchemePays,
  type MarginalRate,
  type SchemeSection,
} from "@/lib/tools/compute/nhs-pension-scheme-pays";

const SECTION_LABEL: Record<SchemeSection, string> = {
  "1995-55": "1995 Section, Normal Pension Age 55",
  "1995-60": "1995 Section, Normal Pension Age 60",
  "2008": "2008 Section, Normal Pension Age 65",
  "2015": "2015 Scheme",
};

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

export const nhsPensionSchemePaysConfig: PremiumToolConfig = {
  id: "nhs-pension-scheme-pays-premium",
  topic: "nhs-pension",
  title: "NHS Pension Scheme Pays cost modeller",
  intro:
    "Compare settling an Annual Allowance tax charge in cash now against electing Scheme Pays, where the scheme settles the bill and permanently reduces your future pension. Neither option is free. The reduction here follows NHSBSA's own published estimating method, the charge divided by the factor for your section and your years to Normal Pension Age, so it is expressed in today's money.",

  fields: [
    {
      id: "annualAllowanceCharge",
      label: "Annual Allowance tax charge",
      type: "currency",
      default: 8000,
      min: 0,
      max: 200000,
      step: 500,
      help: "The charge calculated by HMRC or your annual allowance statement. Use the NHS Pension Annual Allowance tool above to find this figure.",
    },
    {
      id: "schemeGrowth",
      label: "Pension input amount (scheme growth this year)",
      type: "currency",
      default: 70000,
      min: 0,
      max: 300000,
      step: 1000,
      help: "The capitalised growth in your NHS benefits this tax year (from your Pension Savings Statement). Needed to confirm mandatory Scheme Pays eligibility (growth must exceed £60,000).",
    },
    {
      id: "section",
      label: "Which benefits is the charge being paid from?",
      type: "select",
      default: "2015",
      options: [
        { value: "2015", label: "2015 Scheme" },
        { value: "2008", label: "2008 Section (Normal Pension Age 65)" },
        { value: "1995-60", label: "1995 Section (Normal Pension Age 60)" },
        { value: "1995-55", label: "1995 Section, Special Class or MHO (Normal Pension Age 55)" },
      ],
      help: "NHSBSA uses a different factor table for 1995 and 2008 benefits, and in the 1995 Section the retirement lump sum is reduced as well as the pension.",
    },
    {
      id: "age",
      label: "Your current age (last birthday)",
      type: "number",
      default: 45,
      min: 20,
      max: 75,
      step: 1,
      help: "For 2015 Scheme benefits NHSBSA indexes the factor by complete years from now to your Normal Pension Age. For 1995 and 2008 benefits it indexes by your current age instead.",
    },
    {
      id: "normalPensionAge",
      label: "Your 2015 Scheme Normal Pension Age",
      type: "number",
      default: 68,
      min: 65,
      max: 68,
      step: 1,
      help: "2015 Scheme only, and ignored for the 1995 and 2008 options. It is your State Pension Age, or 65 if that is later, so it cannot be worked out from your age alone. If you leave it at 68 the result says so.",
    },
    {
      id: "marginalRate",
      label: "Your marginal income tax rate",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
      help: "Context only. Scheme Pays gives no income-tax relief: you are settling a tax charge, not making a pension contribution.",
    },
  ],

  compute({ values }): PremiumResult {
    const r = calcSchemePays({
      annualAllowanceCharge: Number(values.annualAllowanceCharge),
      schemeGrowth: Number(values.schemeGrowth),
      age: Number(values.age),
      marginalRate: String(values.marginalRate) as MarginalRate,
      section: String(values.section ?? "2015") as SchemeSection,
      normalPensionAge: Number(values.normalPensionAge),
    });

    const eligibilityLabel = r.mandatoryEligible
      ? "Mandatory Scheme Pays available"
      : r.charge > 2000
      ? "Voluntary Scheme Pays only (scheme growth does not exceed £60,000)"
      : Number(values.schemeGrowth) > 60000
      ? "Voluntary Scheme Pays only (charge does not exceed £2,000)"
      : "Voluntary Scheme Pays only";

    const is1995 = r.section === "1995-55" || r.section === "1995-60";

    return {
      headline: {
        label: "Annual Allowance charge to settle",
        value: gbp(r.charge),
        sub: r.npaAssumed
          ? `${eligibilityLabel}. Normal Pension Age 68 assumed.`
          : eligibilityLabel,
        tone: r.charge > 0 ? "warn" : "good",
      },
      breakdown: [
        {
          label: "Option A: Pay in cash now",
          value: gbp(r.cashNow),
          strong: true,
        },
        {
          label: "Option B: Elect Scheme Pays (cost today)",
          value: "£0 now",
        },
        {
          label: "Benefits the charge is paid from",
          value: SECTION_LABEL[r.section],
        },
        {
          label: "Normal Pension Age used",
          value: r.npaAssumed
            ? `${r.normalPensionAge} (ASSUMED, check yours with NHSBSA)`
            : String(r.normalPensionAge),
          strong: r.npaAssumed,
        },
        ...(r.factorTable === "table2-2015"
          ? [
              {
                label: "Complete years to Normal Pension Age",
                value: String(r.yearsToRetirement),
              },
            ]
          : []),
        {
          label:
            r.factorTable === "table2-2015"
              ? "NHSBSA estimating factor (table 2, by years to retirement)"
              : "NHSBSA estimating factor (table 1, by current age)",
          value:
            r.actuarialFactor.toFixed(1) +
            (r.factorClamped ? " (edge of published table)" : ""),
        },
        {
          label: "Estimated annual pension reduction, in today's money",
          value: gbp(r.annualPensionReduction) + " per year",
          strong: true,
        },
        ...(is1995
          ? [
              {
                label:
                  "Estimated retirement lump sum reduction (1995 Section, three times the pension cut)",
                value: gbp(r.lumpSumReduction),
              },
            ]
          : []),
        ...(r.breakEvenYears !== null
          ? [
              {
                label: "Cash break-even in today's money (years of reduced pension)",
                value: r.breakEvenYears.toFixed(1) + " years",
              },
            ]
          : []),
        {
          label: "Your marginal rate (for context only)",
          value: (r.marginalRateValue * 100).toFixed(0) + "%",
        },
        {
          label: "Election deadline (31 July rule)",
          value: "31 July in the tax year following the charge year",
        },
        {
          label: "Extended deadline (revised statement issued on or after 2 May)",
          value: "Earlier of 3 months from that statement or 6 years from the tax year end",
        },
      ],
      note:
        "2026/27 basis, standard Annual Allowance £60,000. Mandatory Scheme Pays requires the charge to exceed £2,000 AND pension input to exceed £60,000 (Finance Act 2004 s.237B); below either test only voluntary Scheme Pays may be offered, on scheme terms. The factors used here are NHSBSA's illustrative estimating factors from the member factsheet Estimating the cost of Scheme Pays (V5, 12 July 2024), both tables stamped in force from 30 March 2023. NHSBSA's method is the charge divided by the factor, and the answer is in current day terms, because the factors deliberately exclude the interest charged on the Scheme Pays balance. That interest is set in excess of inflation measured against CPI, currently 1.7% above CPI for interest applied from 31 March 2023, so the reduction holds its value in today's money and rises with CPI in cash terms. NHSBSA calls its factors indicative and says they may be revised: the actual reduction is calculated at retirement using the recovery factors then in force. Ill-health retirement uses a different table. Carry-forward of unused Annual Allowance from the previous three tax years can reduce or remove the charge before Scheme Pays is needed and is not modelled here. These are estimates, not financial advice.",
    };
  },

  explainer: {
    heading: "How Scheme Pays works and when it makes sense",
    paragraphs: [
      "When your NHS Pension growth triggers an Annual Allowance charge, you have two ways to settle it. The first is to pay the charge directly to HMRC in cash (straightforward, but it can mean a large one-off payment if your pension input amount is substantial). The second is Scheme Pays, where you instruct the NHS Pension Scheme to pay the charge on your behalf. The scheme then reduces your eventual pension by an actuarial amount to recover the outlay, with interest.",
      "Mandatory Scheme Pays applies where the charge exceeds £2,000 and your pension input amount (scheme growth) for the year exceeds £60,000. Below either threshold, voluntary Scheme Pays may still be available on different terms (a specialist can advise on the scheme-specific conditions). You must lodge the election by 31 July in the tax year following the charge year. Missing that deadline removes the option.",
      "The pension reduction is calculated using NHSBSA's published factors, and the method is a single division rather than a compounding exercise. NHSBSA records the charge as a notional negative defined contribution account and charges interest on it in excess of inflation, measured against CPI, currently 1.7% above CPI for interest applied from 31 March 2023. Because that is a real rate, the estimating factors in NHSBSA's member factsheet already allow for it, and the factsheet says plainly that the answer is calculated in current day terms and that the factors exclude the interest in excess of inflation. So the reduction is the charge divided by the factor, and there is nothing to add on top.",
      "The factor depends on which benefits pay the charge. For 2015 Scheme benefits NHSBSA indexes it by complete years from now until your Normal Pension Age. For 1995 and 2008 benefits it indexes by your current age and by which Normal Pension Age applies, and in the 1995 Section the retirement lump sum is cut too, by three times the annual pension reduction. Take an £8,000 charge on 2015 Scheme benefits at age 45 with a Normal Pension Age of 68. That is 23 years out, where NHSBSA's own worked example uses a factor of 12.1, giving about £661 a year less pension from 68, in today's money. Because the reduction is the charge divided by the factor, the cash break-even in today's money is the factor itself, about 12.1 years. Electing later means a higher factor and a smaller annual cut, because there is less time for the real interest to run.",
      "Before electing Scheme Pays, check whether unused Annual Allowance from the previous three tax years (carry-forward) can eliminate the charge. If carry-forward removes it entirely, no election is needed. If it reduces the charge below £2,000, Scheme Pays becomes voluntary only. A medical accountant can pull your Pension Savings Statements for the three prior years and model the carry-forward position alongside the Scheme Pays cost.",
    ],
  },

};
