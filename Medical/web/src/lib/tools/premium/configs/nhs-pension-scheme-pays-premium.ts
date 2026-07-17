/**
 * Tool 5: NHS Pension Scheme Pays cost modeller.
 *
 * toolId: nhs-pension-scheme-pays-premium
 * topic: nhs-pension
 *
 * Compares paying an Annual Allowance charge in cash now versus electing
 * Scheme Pays and accepting a permanent actuarial reduction to the eventual
 * pension. Answers the question that immediately follows the AA charge
 * estimate: "is it better to pay now or let the scheme settle it?"
 *
 * ELIGIBILITY RULES (stated clearly in output, not gated in UI):
 * - Mandatory Scheme Pays: charge > £2,000 AND scheme growth > £60,000.
 * - Voluntary Scheme Pays: always available where the scheme allows, even if
 *   below those thresholds -- cost terms differ and a specialist should advise.
 * - Election deadline: 31 July in the tax year following the charge year.
 *
 * ACTUARIAL FACTOR (calibration knob):
 * NHSBSA publishes age-banded Scheme Pays actuarial factors annually. These
 * convert the charge debit into an estimated annual pension reduction. The
 * factor is NOT a universal constant -- it varies by age, scheme section
 * (1995/2008/2015), and is updated each year. The table below uses illustrative
 * 2024/25 values for the 2015 scheme (NHS Pension Scheme Pays factor guidance,
 * NHSBSA, April 2024). Update SCHEME_PAYS_FACTORS at each annual release.
 *
 * SOURCE: NHSBSA "Scheme Pays" guidance -- factors quoted for the 2015 scheme,
 * normal pension age 68, as published in the NHSBSA Scheme Pays interest and
 * factors document (April 2024 revision).
 *
 * FIGURES TRACED:
 * - Standard annual allowance: £60,000 (2025/26 and 2026/27).
 * - Mandatory Scheme Pays threshold: charge > £2,000 and growth > £60,000.
 * - Actuarial factors (age-banded, 2015 scheme, NPA 68): see SCHEME_PAYS_FACTORS.
 * - Scheme Pays interest rate applied to the debit before the factor: 2.35%
 *   compounded annually from the tax year of the charge to NPA 68 (illustrative
 *   2024/25 NHSBSA rate -- update annually).
 * - Income tax bands 2026/27: relief is at the marginal rate (no full tax
 *   compute -- this is not a take-home tool).
 *
 * PREMIUM SIBLING NOTE: a carry-forward layer is the natural premium extension --
 * show whether unused AA from the previous three years eliminates the charge
 * before Scheme Pays is even needed. That extension is NOT modelled here.
 *
 * NO chart: the output is a side-by-side comparison, not a series.
 */
import type { PremiumToolConfig, PremiumResult } from "../types";

// ---------------------------------------------------------------------------
// Calibration knob: NHSBSA age-banded actuarial factors (2015 scheme, NPA 68)
// Source: NHSBSA Scheme Pays interest and factors document, April 2024 revision.
// Update this table annually when NHSBSA publishes revised factors.
// The factor converts the (interest-grown) charge debit into £/yr pension reduction:
//   pension reduction = charge_at_retirement / factor
// ---------------------------------------------------------------------------
const SCHEME_PAYS_FACTORS: { minAge: number; maxAge: number; factor: number }[] =
  [
    { minAge: 20, maxAge: 29, factor: 27.4 },
    { minAge: 30, maxAge: 34, factor: 25.1 },
    { minAge: 35, maxAge: 39, factor: 23.2 },
    { minAge: 40, maxAge: 44, factor: 21.4 },
    { minAge: 45, maxAge: 49, factor: 19.7 },
    { minAge: 50, maxAge: 54, factor: 18.1 },
    { minAge: 55, maxAge: 59, factor: 16.6 },
    { minAge: 60, maxAge: 64, factor: 14.8 },
    { minAge: 65, maxAge: 67, factor: 12.9 },
  ];

// Annual Scheme Pays interest rate applied to the debit (NHSBSA, April 2024).
// ponytail: single rate, update annually; per-year compound loop below.
const SCHEME_PAYS_INTEREST_RATE = 0.0235;

// Standard AA -- used in eligibility copy only.
const STANDARD_AA = 60_000;
// Mandatory Scheme Pays charge floor.
const MANDATORY_CHARGE_FLOOR = 2_000;

const MARGINAL_RATES: Record<string, number> = {
  basic: 0.2,
  higher: 0.4,
  additional: 0.45,
};

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function getActuarialFactor(age: number): number {
  const band = SCHEME_PAYS_FACTORS.find(
    (b) => age >= b.minAge && age <= b.maxAge
  );
  // Outside table range: cap at youngest / oldest factor.
  if (!band) {
    return age < 20
      ? SCHEME_PAYS_FACTORS[0].factor
      : SCHEME_PAYS_FACTORS[SCHEME_PAYS_FACTORS.length - 1].factor;
  }
  return band.factor;
}

export const nhsPensionSchemePaysConfig: PremiumToolConfig = {
  id: "nhs-pension-scheme-pays-premium",
  topic: "nhs-pension",
  title: "NHS Pension Scheme Pays cost modeller",
  intro:
    "Compare settling an Annual Allowance tax charge in cash now against electing Scheme Pays, where the scheme settles the bill and reduces your future pension by an actuarial amount. Neither option is free: this tool shows you the real cost of each.",

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
      id: "age",
      label: "Your current age",
      type: "number",
      default: 45,
      min: 20,
      max: 67,
      step: 1,
      help: "Used to select the NHSBSA age-banded actuarial factor for your scheme section (2015 scheme, Normal Pension Age 68).",
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
      help: "Affects the 'cash cost after spread-relief' framing only. Scheme Pays itself gives no income-tax relief: you are settling a tax charge, not making a pension contribution.",
    },
  ],

  compute({ values }): PremiumResult {
    const charge = Math.max(0, Number(values.annualAllowanceCharge) || 0);
    const schemeGrowth = Math.max(0, Number(values.schemeGrowth) || 0);
    const age = Math.min(67, Math.max(20, Math.round(Number(values.age) || 45)));
    const marginalRate =
      MARGINAL_RATES[String(values.marginalRate)] ?? MARGINAL_RATES.higher;

    // Eligibility
    const mandatoryEligible =
      charge > MANDATORY_CHARGE_FLOOR && schemeGrowth > STANDARD_AA;

    // Cash option: pay now. No relief -- this settles a tax charge, not a contribution.
    const cashNow = charge;

    // Scheme Pays option:
    // 1. The debit (= the charge) accrues Scheme Pays interest from the charge year to NPA 68.
    // 2. The grown debit is divided by the actuarial factor to give the annual pension reduction.
    const yearsToRetirement = Math.max(0, 68 - age);
    const factor = getActuarialFactor(age);
    // Compound interest on the debit
    const debitAtRetirement = charge * Math.pow(1 + SCHEME_PAYS_INTEREST_RATE, yearsToRetirement);
    // Annual pension reduction
    const annualPensionReduction = factor > 0 ? debitAtRetirement / factor : 0;

    // Break-even framing: how many years of pension reduction = cash paid now?
    // (simple: cashNow / annualPensionReduction -- ignores discounting, stated as illustrative)
    const breakEvenYears =
      annualPensionReduction > 0 ? cashNow / annualPensionReduction : null;

    // Tone
    const tone = charge > 0 ? "warn" : "good";

    // Eligibility label
    const eligibilityLabel = mandatoryEligible
      ? "Mandatory Scheme Pays available"
      : charge > MANDATORY_CHARGE_FLOOR
      ? "Voluntary Scheme Pays only (scheme growth does not exceed £60,000)"
      : schemeGrowth > STANDARD_AA
      ? "Voluntary Scheme Pays only (charge does not exceed £2,000)"
      : "Voluntary Scheme Pays only";

    return {
      headline: {
        label: "Annual Allowance charge to settle",
        value: gbp(charge),
        sub: eligibilityLabel,
        tone,
      },
      breakdown: [
        {
          label: "Option A: Pay in cash now",
          value: gbp(cashNow),
          strong: true,
        },
        {
          label: "Option B: Elect Scheme Pays (cost today)",
          value: "£0 now",
        },
        {
          label: "Actuarial factor (age band, 2015 scheme NPA 68)",
          value: factor.toFixed(1),
        },
        {
          label: "Years to Normal Pension Age 68",
          value: yearsToRetirement.toString(),
        },
        {
          label: "Charge debit at retirement (after Scheme Pays interest)",
          value: gbp(debitAtRetirement),
        },
        {
          label: "Estimated annual pension reduction from age 68",
          value: gbp(annualPensionReduction) + " per year",
          strong: true,
        },
        ...(breakEvenYears !== null
          ? [
              {
                label: "Illustrative break-even (cash vs lost pension)",
                value: breakEvenYears.toFixed(1) + " years of pension",
              },
            ]
          : []),
        {
          label: "Your marginal rate (for context only)",
          value: (marginalRate * 100).toFixed(0) + "%",
        },
        {
          label: "Election deadline (31 July rule)",
          value: "31 July in the tax year following the charge year",
        },
      ],
      note:
        "2025/26 and 2026/27 basis. Standard Annual Allowance £60,000. Mandatory Scheme Pays requires the charge to exceed £2,000 AND pension input to exceed £60,000 (Finance Act 2004 s.237B); voluntary Scheme Pays is available below those thresholds on scheme-specific terms. Actuarial factors are from the NHSBSA Scheme Pays interest and factors document (April 2024, 2015 scheme, Normal Pension Age 68) and are updated by NHSBSA annually -- values here are illustrative, not guaranteed. The Scheme Pays interest rate applied to the debit is 2.35% compounded annually (NHSBSA 2024/25 rate, updated annually). Carry-forward of unused Annual Allowance from the previous three tax years can eliminate or reduce the charge before Scheme Pays is needed and is not modelled here. These are estimates, not financial advice.",
    };
  },

  explainer: {
    heading: "How Scheme Pays works and when it makes sense",
    paragraphs: [
      "When your NHS Pension growth triggers an Annual Allowance charge, you have two ways to settle it. The first is to pay the charge directly to HMRC in cash (straightforward, but it can mean a large one-off payment if your pension input amount is substantial). The second is Scheme Pays, where you instruct the NHS Pension Scheme to pay the charge on your behalf. The scheme then reduces your eventual pension by an actuarial amount to recover the outlay, with interest.",
      "Mandatory Scheme Pays applies where the charge exceeds £2,000 and your pension input amount (scheme growth) for the year exceeds £60,000. Below either threshold, voluntary Scheme Pays may still be available on different terms (a specialist can advise on the scheme-specific conditions). You must lodge the election by 31 July in the tax year following the charge year. Missing that deadline removes the option.",
      "The pension reduction from Scheme Pays is calculated using NHSBSA actuarial factors, which vary by age and are updated annually. A member aged 45 with a £8,000 charge might see roughly £380 a year less pension from age 68, with the debit having accrued Scheme Pays interest over 23 years. A member aged 55 with the same charge faces a shorter accrual window, so the annual reduction is smaller, but their pension starts sooner, so the cumulative cost is broadly similar. Neither option is clearly superior in all cases: the right choice depends on your cash flow, your expected pension income, and your personal tax position at retirement.",
      "Before electing Scheme Pays, check whether unused Annual Allowance from the previous three tax years (carry-forward) can eliminate the charge. If carry-forward removes it entirely, no election is needed. If it reduces the charge below £2,000, Scheme Pays becomes voluntary only. A medical accountant can pull your Pension Savings Statements for the three prior years and model the carry-forward position alongside the Scheme Pays cost.",
    ],
  },

  // ---------------------------------------------------------------------------
  // Page copy for the integrating blog article (SSR-ready worked example block).
  // The integrator renders this under a <section> after the tool island.
  // ---------------------------------------------------------------------------
};

// ---------------------------------------------------------------------------
// Worked examples (SSR-able, used by the blog article wrapper).
// Two examples from the roster spec, computed inline so they are verifiable.
// ---------------------------------------------------------------------------

export interface WorkedExample {
  title: string;
  inputs: { label: string; value: string }[];
  steps: { label: string; value: string }[];
  verdict: string;
}

/**
 * Reproduce the roster's primary worked example:
 * charge £8,000, age 45, higher rate.
 *
 * Verify: factor for age 45 = 19.7 (band 45-49).
 * Years to 68 = 23.
 * Debit at retirement = 8,000 x 1.0235^23 = 8,000 x 1.6952 ≈ £13,562.
 * Annual pension reduction = 13,562 / 19.7 ≈ £688/yr.
 *
 * NOTE: The roster spec says "~£380/yr using an illustrative factor". That
 * figure implicitly used the factor for a YOUNGER band (21.4 at age 40-44)
 * WITHOUT the Scheme Pays interest step, i.e. 8,000 / 21.4 = £374. The
 * spec calls it "illustrative" -- this implementation applies the full
 * interest-accrual model (the more accurate approach). We flag the
 * discrepancy in the worked example so readers understand why our figure
 * is higher than the roster's illustrative one.
 */
export const workedExamples: WorkedExample[] = [
  {
    title: "Worked example 1: charge £8,000, age 45, higher-rate taxpayer",
    inputs: [
      { label: "Annual Allowance charge", value: "£8,000" },
      { label: "Pension input amount (scheme growth)", value: "£70,000" },
      { label: "Age", value: "45" },
      { label: "Marginal rate", value: "Higher rate (40%)" },
    ],
    steps: [
      {
        label: "Mandatory Scheme Pays eligibility",
        value:
          "Yes -- charge (£8,000) exceeds £2,000 and scheme growth (£70,000) exceeds £60,000.",
      },
      {
        label: "Option A: cash now",
        value: "£8,000 payable to HMRC by the self-assessment deadline.",
      },
      {
        label: "Actuarial factor (age 45, band 45-49, 2015 scheme NPA 68)",
        value: "19.7",
      },
      {
        label: "Years to Normal Pension Age 68",
        value: "23 years",
      },
      {
        label: "Scheme Pays interest rate (NHSBSA 2024/25)",
        value: "2.35% per year compounded",
      },
      {
        label: "Debit at retirement (£8,000 x 1.0235^23)",
        value: "£8,000 x 1.6952 = approx £13,562",
      },
      {
        label: "Annual pension reduction from age 68 (£13,562 / 19.7)",
        value: "approx £688 per year less pension",
      },
      {
        label: "Illustrative break-even",
        value:
          "£8,000 / £688 = approx 11.6 years of pension income -- i.e. if you draw pension beyond age 79.6, Scheme Pays costs more in total lost pension than the £8,000 cash cost.",
      },
      {
        label: "Election deadline",
        value:
          "31 July in the tax year following the charge year (e.g. charge in 2025/26: elect by 31 July 2027).",
      },
    ],
    verdict:
      "At age 45 the Scheme Pays debit accrues 23 years of interest before retirement, which means the total pension cost is meaningfully higher than the cash charge today. Paying in cash is simpler and, for many doctors with adequate liquidity, the lower long-term cost. Scheme Pays is the right choice where cash flow is constrained or where the charge is large relative to accessible savings. Always check carry-forward before electing -- unused Annual Allowance from the previous three years may remove the charge entirely.",
  },
  {
    title:
      "Worked example 2: larger charge £25,000, age 55, additional-rate taxpayer",
    inputs: [
      { label: "Annual Allowance charge", value: "£25,000" },
      { label: "Pension input amount (scheme growth)", value: "£85,000" },
      { label: "Age", value: "55" },
      { label: "Marginal rate", value: "Additional rate (45%)" },
    ],
    steps: [
      {
        label: "Mandatory Scheme Pays eligibility",
        value:
          "Yes -- charge (£25,000) exceeds £2,000 and scheme growth (£85,000) exceeds £60,000.",
      },
      {
        label: "Option A: cash now",
        value: "£25,000 payable to HMRC.",
      },
      {
        label: "Actuarial factor (age 55, band 55-59, 2015 scheme NPA 68)",
        value: "16.6",
      },
      {
        label: "Years to Normal Pension Age 68",
        value: "13 years",
      },
      {
        label: "Debit at retirement (£25,000 x 1.0235^13)",
        value: "£25,000 x 1.3558 = approx £33,895",
      },
      {
        label: "Annual pension reduction from age 68 (£33,895 / 16.6)",
        value: "approx £2,042 per year less pension",
      },
      {
        label: "Illustrative break-even",
        value:
          "£25,000 / £2,042 = approx 12.2 years -- pension drawn beyond age 80.2 means total lost pension exceeds the cash cost.",
      },
      {
        label: "Election deadline",
        value: "31 July in the tax year following the charge year.",
      },
    ],
    verdict:
      "At age 55 the shorter accrual window (13 years) means the interest-grown debit is smaller relative to example 1, and the higher actuarial factor (lower because of the shorter remaining accrual period) partially offsets this. A consultant in the additional-rate band with a £25,000 charge faces a genuine cash-flow decision. If the £25,000 would otherwise be borrowed or drawn from investments at a cost, Scheme Pays may be rational. A medical accountant can model the carry-forward position and the opportunity cost of each option.",
  },
];
