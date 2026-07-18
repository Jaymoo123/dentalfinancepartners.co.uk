import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import {
  calcSchemePays,
  type MarginalRate,
} from "@/lib/tools/compute/nhs-pension-scheme-pays";

export const nhsPensionSchemePaysTool: GenericTool = {
  kind: "generic",
  slug: "nhs-pension-scheme-pays",
  name: "NHS Pension Scheme Pays Calculator",
  category: "NHS Pension",
  oneLiner:
    "Annual Allowance charge in, side-by-side cost out: pay HMRC in cash now, or elect Scheme Pays and see the estimated permanent reduction to your NHS pension.",
  embedHeight: 640,
  metaTitle: "NHS Pension Scheme Pays Calculator 2026/27 | Cash vs Scheme Pays",
  metaDescription:
    "Free NHS Scheme Pays calculator. Compare paying your Annual Allowance charge in cash against electing Scheme Pays, with the estimated annual pension reduction from age 68, break-even analysis, and the 31 July election deadline explained.",

  intro:
    "Once your NHS pension growth triggers an Annual Allowance tax charge, the next decision is how to settle it: pay HMRC in cash through self-assessment, or elect Scheme Pays so the NHS Pension Scheme pays the charge and permanently reduces your future pension. Neither option is free. Enter your charge, pension input amount, and age to see the real cost of each side by side, including the estimated annual pension reduction from age 68.",

  fields: [
    {
      id: "annualAllowanceCharge",
      label: "Annual Allowance tax charge",
      type: "currency",
      default: 8000,
      min: 0,
      max: 200000,
      step: 500,
      help: "The charge from HMRC or your annual allowance statement. Use our NHS Pension Annual Allowance calculator to estimate it.",
    },
    {
      id: "schemeGrowth",
      label: "Pension input amount (scheme growth this year)",
      type: "currency",
      default: 70000,
      min: 0,
      max: 300000,
      step: 1000,
      help: "The capitalised growth in your NHS benefits this tax year, from your Pension Savings Statement. Mandatory Scheme Pays needs growth above £60,000.",
    },
    {
      id: "age",
      label: "Your current age",
      type: "number",
      default: 45,
      min: 20,
      max: 67,
      step: 1,
      help: "Selects the NHSBSA age-banded actuarial factor (2015 scheme, Normal Pension Age 68).",
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

  compute(values) {
    const r = calcSchemePays({
      annualAllowanceCharge: Number(values.annualAllowanceCharge),
      schemeGrowth: Number(values.schemeGrowth),
      age: Number(values.age),
      marginalRate: String(values.marginalRate) as MarginalRate,
    });

    const eligibilityLabel = r.mandatoryEligible
      ? "Mandatory Scheme Pays available"
      : r.charge > 2000
        ? "Voluntary Scheme Pays only (scheme growth does not exceed £60,000)"
        : Number(values.schemeGrowth) > 60000
          ? "Voluntary Scheme Pays only (charge does not exceed £2,000)"
          : "Voluntary Scheme Pays only";

    const rows = [
      { label: "Option A: pay in cash now", value: gbp(r.cashNow), strong: true as const },
      { label: "Option B: elect Scheme Pays (cost today)", value: "£0 now" },
      {
        label: "Actuarial factor (age band, 2015 scheme, NPA 68)",
        value: r.actuarialFactor.toFixed(1),
      },
      { label: "Years to Normal Pension Age 68", value: String(r.yearsToRetirement) },
      {
        label: "Charge debit at retirement (after Scheme Pays interest)",
        value: gbp(r.debitAtRetirement),
      },
      {
        label: "Estimated annual pension reduction from age 68",
        value: `${gbp(r.annualPensionReduction)} per year`,
        strong: true as const,
      },
      ...(r.breakEvenYears !== null
        ? [
            {
              label: "Illustrative break-even (cash vs lost pension)",
              value: `${r.breakEvenYears.toFixed(1)} years of pension`,
            },
          ]
        : []),
      {
        label: "Election deadline",
        value: "31 July in the tax year following the charge year",
      },
    ];

    return {
      headline: {
        label: "Annual Allowance charge to settle",
        value: gbp(r.charge),
        sub: eligibilityLabel,
        tone: (r.charge > 0 ? "warn" : "good") as "warn" | "good",
      },
      rows,
      note:
        "2026/27 basis, standard Annual Allowance £60,000. Mandatory Scheme Pays requires the charge to exceed £2,000 AND pension input to exceed £60,000 (Finance Act 2004 s.237B); voluntary Scheme Pays may be available below those thresholds on scheme-specific terms. Actuarial factors are from the NHSBSA Scheme Pays interest and factors document (April 2024 revision, 2015 scheme, Normal Pension Age 68) and are updated annually, so treat the pension reduction as illustrative. Scheme Pays interest of 2.35% a year is compounded on the debit until age 68. Carry-forward of unused Annual Allowance from the previous three tax years can reduce or remove the charge before Scheme Pays is needed and is not modelled here. Estimates only, not financial advice.",
    };
  },

  explainer: {
    heading: "How Scheme Pays works and when it makes sense",
    paragraphs: [
      "When your NHS pension growth produces an Annual Allowance charge, you have two ways to settle it. Option A is to pay the charge directly to HMRC through self-assessment. It is a real cash outflow now, but your pension is untouched. Option B is Scheme Pays: you instruct the NHS Pension Scheme to pay the charge for you, and the scheme recovers the money by permanently reducing your eventual pension. The reduction is worked out with NHSBSA actuarial factors, and the debit accrues Scheme Pays interest (currently 2.35% a year, compounded) from the charge year until your Normal Pension Age of 68.",
      "Mandatory Scheme Pays is available where the charge exceeds £2,000 and your pension input amount (the scheme growth for the year) exceeds the £60,000 standard Annual Allowance. Below either threshold, only voluntary Scheme Pays may be available, on scheme-specific terms. Either way, the election must reach NHSBSA by 31 July in the tax year following the charge year. A 2025/26 charge, for example, needs the election lodged by 31 July 2027. Miss the deadline and the option disappears: the charge has to be paid in cash.",
      "Worked example: an Annual Allowance charge of £8,000 at age 45, higher-rate taxpayer, scheme growth £70,000. Mandatory Scheme Pays is available because the charge exceeds £2,000 and growth exceeds £60,000. Paying in cash costs £8,000 now. Electing Scheme Pays costs £0 now, but the £8,000 debit compounds at 2.35% for the 23 years to age 68, reaching roughly £13,649. Divided by the age-45 actuarial factor of 19.7, that produces an estimated pension reduction of about £693 a year from age 68. The break-even is roughly 11.5 years: draw your pension beyond about age 79 and a half and Scheme Pays will have cost you more in lost pension than the £8,000 cash would have.",
      "The age effect matters. The same £8,000 charge at age 55 has only 13 years to compound, so the debit at retirement is smaller, and a £25,000 charge at 55 (factor 16.6) turns into roughly £2,037 a year less pension, a break-even of around 12.3 years. Younger members carry the debit longer, so the interest accrual bites harder. You may see lower headline figures elsewhere (a commonly quoted illustration is around £380 a year for an £8,000 charge) because simpler illustrations divide the charge by a factor without applying the interest accrual. This calculator applies the full interest step, which is what NHSBSA actually does.",
      "Neither option is clearly superior in all cases. Paying in cash is simpler and, for many doctors with adequate savings, the lower long-term cost. Scheme Pays is rational where cash flow is tight, where the charge is large relative to accessible savings, or where the £8,000 or £25,000 would otherwise have to be borrowed or drawn from investments. Your marginal tax rate does not change the Scheme Pays arithmetic itself (there is no income-tax relief on settling a charge), but it does shape your position at retirement, when the reduced pension is taxed as income.",
      "Before electing at all, check carry-forward. Unused Annual Allowance from the previous three tax years can reduce or completely remove the charge, and if it drops the charge below £2,000, mandatory Scheme Pays is no longer available anyway. A medical accountant can pull your Pension Savings Statements for the three prior years and model the carry-forward position alongside the Scheme Pays cost before the 31 July deadline.",
    ],
  },

  faqs: [
    {
      question: "What is Scheme Pays and who can use it?",
      answer:
        "Scheme Pays lets the NHS Pension Scheme settle your Annual Allowance tax charge on your behalf instead of you paying HMRC in cash. The scheme recovers the cost by permanently reducing your future pension using NHSBSA actuarial factors. Mandatory Scheme Pays is available where the charge exceeds £2,000 and your pension input amount for the year exceeds £60,000. Below those thresholds, voluntary Scheme Pays may still be offered on scheme-specific terms, so check with NHSBSA or a medical accountant.",
    },
    {
      question: "What is the Scheme Pays election deadline?",
      answer:
        "The election must reach NHSBSA by 31 July in the tax year following the charge year. For a charge arising in 2025/26, that means 31 July 2027. The deadline is strict: miss it and the Scheme Pays route closes, leaving cash payment through self-assessment as the only option. Note that the charge itself still has to be reported on your self-assessment return for the charge year regardless of how it is settled.",
    },
    {
      question: "Is Scheme Pays cheaper than paying the charge in cash?",
      answer:
        "Usually not in pure money terms, especially for younger members. The debit accrues compound interest (currently 2.35% a year) until age 68 before the actuarial factor is applied, so the further you are from retirement, the larger the eventual pension reduction. In the worked example above, an £8,000 charge at age 45 becomes roughly £693 a year less pension, which overtakes the £8,000 cash cost after about 11.5 years of drawing your pension. Scheme Pays wins on cash flow, not on total cost. It is best seen as a loan from your future pension.",
    },
    {
      question: "Does electing Scheme Pays give me any tax relief?",
      answer:
        "No. Scheme Pays settles a tax charge; it is not a pension contribution, so there is no income-tax relief on the amount. Your marginal rate is shown in this calculator for context only. Where your marginal rate does matter is at retirement: the pension you give up through the Scheme Pays debit would have been taxed as income when drawn, so the net loss of income in retirement is slightly smaller than the gross reduction suggests.",
    },
    {
      question: "Can carry-forward remove the charge so I do not need Scheme Pays at all?",
      answer:
        "Quite possibly. Unused Annual Allowance from the previous three tax years carries forward and is set against this year's excess growth before any charge is calculated. If carry-forward removes the charge entirely, no election is needed. If it reduces the charge to £2,000 or below, mandatory Scheme Pays is no longer available. Always model carry-forward first: it requires your Pension Savings Statements for the three prior years, which NHSBSA can provide.",
    },
    {
      question: "How accurate is the estimated pension reduction?",
      answer:
        "It is an illustration, not a quote. The calculation uses NHSBSA age-banded actuarial factors for the 2015 scheme with a Normal Pension Age of 68 (April 2024 revision) and the published Scheme Pays interest rate of 2.35% a year. NHSBSA updates both annually, and members with 1995 or 2008 section benefits, or a different retirement age, will see different figures. NHSBSA provides a formal statement of the actual pension debit when you elect. Use this tool to frame the decision, then confirm the exact figures with NHSBSA or a medical accountant before the deadline.",
    },
  ],

  related: [
    {
      label: "NHS Pension Annual Allowance Calculator",
      href: "/calculators/nhs-pension-annual-allowance",
    },
    {
      label: "Salaried Doctor Take-Home Pay Calculator",
      href: "/calculators/salaried-doctor-take-home",
    },
  ],
};
