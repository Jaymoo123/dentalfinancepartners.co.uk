import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
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

export const nhsPensionSchemePaysTool: GenericTool = {
  kind: "generic",
  slug: "nhs-pension-scheme-pays",
  name: "NHS Pension Scheme Pays Calculator",
  category: "NHS Pension",
  oneLiner:
    "Annual Allowance charge in, side-by-side cost out: pay HMRC in cash now, or elect Scheme Pays and see NHSBSA's own estimate of the permanent reduction to your NHS pension, in today's money.",
  embedHeight: 700,
  metaTitle: "NHS Pension Scheme Pays Calculator 2026/27 | Cash vs Scheme Pays",
  metaDescription:
    "Free NHS Scheme Pays calculator using NHSBSA's published estimating factors. Compare paying your Annual Allowance charge in cash against electing Scheme Pays, with the estimated annual pension reduction in today's money, the break-even, and the 31 July deadline with its extended limb.",

  intro:
    "Mandatory Scheme Pays lets the NHS Pension Scheme settle your Annual Allowance charge where the charge exceeds £2,000 and your 2026/27 pension growth exceeds £60,000, in exchange for a permanent cut to your pension. This calculator follows the method in NHSBSA's own member factsheet, Estimating the cost of Scheme Pays (V5, July 2024): it divides the charge by the published estimating factor for your section and your years to Normal Pension Age. NHSBSA's factors are built so the answer comes out in today's money, so there is no interest figure to add on top.",

  fields: [
    {
      id: "annualAllowanceCharge",
      label: "Annual Allowance tax charge",
      type: "currency",
      default: 8000,
      min: 0,
      max: 200000,
      step: 500,
      help: "The charge from HMRC or from your pension savings statement. Estimate it first with the NHS Pension Annual Allowance Calculator.",
    },
    {
      id: "schemeGrowth",
      label: "Pension input amount (scheme growth this year)",
      type: "currency",
      default: 70000,
      min: 0,
      max: 300000,
      step: 1000,
      help: "The capitalised growth in the value of your NHS benefits this tax year, taken from your Pension Savings Statement. It is growth, not the NHS pension contributions you paid. Mandatory Scheme Pays needs growth above £60,000.",
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
      help: "All active members have accrued in the 2015 Scheme since 1 April 2022, so a charge on current growth is usually settled from 2015 Scheme benefits. NHSBSA uses a different factor table for 1995 and 2008 benefits, and in the 1995 Section the retirement lump sum is cut as well as the pension.",
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
      help: "2015 Scheme only, and ignored for the 1995 and 2008 options above. The 2015 Normal Pension Age is your State Pension Age, or 65 if that is later, so it cannot be worked out from your age alone. Check it on your NHSBSA record. If you leave it at 68 the result says so.",
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
      help: "Context only. Scheme Pays settles a tax charge rather than making a pension contribution, so no income tax relief is due on it.",
    },
  ],

  compute(values) {
    const r = calcSchemePays({
      annualAllowanceCharge: Number(values.annualAllowanceCharge),
      schemeGrowth: Number(values.schemeGrowth),
      age: Number(values.age),
      marginalRate: String(values.marginalRate) as MarginalRate,
      section: String(values.section ?? "2015") as SchemeSection,
      normalPensionAge: Number(values.normalPensionAge),
    });

    const eligibilityLabel = r.mandatoryEligible
      ? "Mandatory Scheme Pays available (both tests met)"
      : r.charge > 2000
        ? "Voluntary Scheme Pays only (scheme growth does not exceed £60,000)"
        : Number(values.schemeGrowth) > 60000
          ? "Voluntary Scheme Pays only (charge does not exceed £2,000)"
          : "Voluntary Scheme Pays only (neither test met)";

    const is1995 = r.section === "1995-55" || r.section === "1995-60";

    const rows = [
      { label: "Option A: pay in cash now", value: gbp(r.cashNow), strong: true as const },
      { label: "Option B: elect Scheme Pays (cost today)", value: "£0 now" },
      { label: "Benefits the charge is paid from", value: SECTION_LABEL[r.section] },
      {
        label: "Normal Pension Age used",
        value: r.npaAssumed
          ? `${r.normalPensionAge} (ASSUMED, we could not tell from your answers, check yours with NHSBSA)`
          : String(r.normalPensionAge),
        strong: r.npaAssumed as boolean,
      },
      ...(r.factorTable === "table2-2015"
        ? [{ label: "Complete years to Normal Pension Age", value: String(r.yearsToRetirement) }]
        : []),
      {
        label:
          r.factorTable === "table2-2015"
            ? "NHSBSA estimating factor (table 2, by years to retirement)"
            : "NHSBSA estimating factor (table 1, by current age)",
        value: r.actuarialFactor.toFixed(1) + (r.factorClamped ? " (edge of published table)" : ""),
      },
      {
        label: "Estimated annual pension reduction, in today's money",
        value: `${gbp(r.annualPensionReduction)} per year`,
        strong: true as const,
      },
      ...(is1995
        ? [
            {
              label: "Estimated retirement lump sum reduction (1995 Section, three times the pension cut)",
              value: gbp(r.lumpSumReduction),
            },
          ]
        : []),
      ...(r.breakEvenYears !== null
        ? [
            {
              label: "Cash break-even in today's money (years of reduced pension)",
              value: `${r.breakEvenYears.toFixed(1)} years`,
            },
          ]
        : []),
      {
        label: "Standard election deadline",
        value: "31 July in the year following the charge year",
      },
      {
        label: "Extended deadline (revised statement issued on or after 2 May)",
        value: "Earlier of 3 months from that statement or 6 years from the tax year end",
      },
    ];

    return {
      headline: {
        label: "Annual Allowance charge to settle",
        value: gbp(r.charge),
        sub: r.npaAssumed
          ? `${eligibilityLabel}. Normal Pension Age 68 assumed.`
          : eligibilityLabel,
        tone: (r.charge > 0 ? "warn" : "good") as "warn" | "good",
      },
      rows,
      note:
        "2026/27 basis, standard Annual Allowance £60,000. Mandatory Scheme Pays requires the charge to exceed £2,000 AND the NHS scheme pension input to exceed £60,000 (Finance Act 2004 s.237B); below either test only voluntary Scheme Pays may be offered, on scheme terms. The factors used here are NHSBSA's illustrative estimating factors from the member factsheet Estimating the cost of Scheme Pays (V5, 12 July 2024), both tables stamped in force from 30 March 2023. NHSBSA's method is the charge divided by the factor, and the answer is expressed in current day terms, because the factors deliberately exclude the interest charged on the Scheme Pays balance. That interest is set in excess of inflation measured against CPI, currently 1.7% above CPI for interest applied from 31 March 2023, so the reduction keeps its value in today's money and rises with CPI in cash terms. NHSBSA describes its factors as indicative and says they may be revised before you retire: the actual reduction is calculated at retirement using the recovery factors then in force (table SP1, V6, 22 August 2024, applied to the balance including interest). Carry-forward of unused Annual Allowance from the previous three tax years can reduce or remove the charge before Scheme Pays is needed and is not modelled here. Estimates only, not financial advice.",
    };
  },

  explainer: {
    heading: "Scheme Pays for NHS doctors: the two tests, the deadlines, and the real cost",
    paragraphs: [
      "Scheme Pays means the NHS Pension Scheme settles your Annual Allowance charge and takes the money back later by cutting your pension permanently. Mandatory Scheme Pays applies only where both statutory tests are met. The charge must exceed £2,000, and the pension input amount in the NHS scheme alone must exceed the £60,000 standard Annual Allowance for 2026/27. A charge over £2,000 on its own does not qualify you.",
      "Voluntary Scheme Pays covers everything else. Where the charge is £2,000 or less, or the excess comes from a tapered allowance below £60,000, NHSBSA may still agree to settle it on scheme terms. The scheme is not obliged to agree, and HMRC interest can keep running on your self-assessment liability until the money actually reaches HMRC.",
      "The standard deadline is 31 July in the year following the year the charge arose, under section 237BA of the Finance Act 2004. A 2026/27 charge must therefore be elected by 31 July 2028. A 2025/26 charge closed on 31 July 2027.",
      "That date is not the whole rule, and for NHS members it is often not the operative one. Section 237BA extends the notice period where NHSBSA gives you a revised pension savings statement on or after 2 May.",
      "Under the extended limb you have the earlier of three months from the date of that statement or six years from the end of the tax year. Revised NHS statements are common, so read the date on yours before assuming the election has closed.",
      "The deadline also moves the other way. Once you are due to become entitled to all your benefits from the scheme, the notice must reach NHSBSA before that entitlement arises. Take everything and the Scheme Pays route is gone, which matters if you are weighing partial retirement in the same year.",
      "How NHSBSA actually prices it is simpler than most illustrations suggest, and it is worth following exactly, because getting it wrong in either direction misleads you. NHSBSA records the charge it pays as a notional negative defined contribution account on your record. That balance is charged interest until you retire, and the rate is set in excess of inflation, measured against the Consumer Price Index. For interest applied from 31 March 2023 the rate is 1.7% above CPI. Earlier tranches ran at 2.4%, 2.8% and 3.0% above CPI.",
      "Because the interest rate is a real rate rather than a cash rate, NHSBSA's member factsheet gives you a set of estimating factors that already allow for it. Its instruction is a single division: the Annual Allowance charge divided by the factor. The factsheet is explicit that the answer is calculated in current day terms and that the factors do not include the interest rate in excess of inflation up to retirement. So there is no compounding step to bolt on. Your reduction holds its buying power and rises with CPI in pounds.",
      "The factor depends on which benefits pay the charge. For 2015 Scheme benefits NHSBSA indexes the factor by complete years from now until your Normal Pension Age. For 1995 and 2008 benefits it indexes by your current age and by which Normal Pension Age applies, and in the 1995 Section the retirement lump sum is cut as well, by three times the annual pension reduction.",
      "Take Dr A, an illustrative hospital consultant aged 45 with 2015 Scheme benefits, a Normal Pension Age of 68, a 2026/27 charge of £8,000 and a pension input amount of £70,000. Both mandatory tests are met: the charge is over £2,000 and the input is over £60,000. Paying HMRC in cash costs £8,000 now. Dr A is 23 years from Normal Pension Age, and NHSBSA's own worked example for a 2015 member 23 years from an NPA of 68 uses a factor of 12.1. Eight thousand pounds divided by twelve point one is about £661 a year less pension from age 68, in today's money.",
      "The break-even falls out of the same arithmetic. Because the reduction is simply the charge divided by the factor, dividing the charge back by the reduction returns the factor. Dr A breaks even after about 12.1 years of drawing the reduced pension, so somewhere around age 80. That is a like-for-like comparison in today's money on both sides, which is the honest way to set it up: the reduction rises with CPI, and so does the value of cash you did not spend only if you actually invest it to keep pace.",
      "Scale and timing both move the answer. A £25,000 charge at age 55, again on 2015 Scheme benefits with a Normal Pension Age of 68, is 13 years from retirement, where the factor is 14.5. That is about £1,724 a year less pension, and a break-even of about 14.5 years. Electing later means a higher factor and so a smaller annual cut, because there is less time for the real interest to run.",
      "Two numbers you may see quoted are not comparable with these. NHSBSA publishes a second table, the Scheme Pays recovery factors in table SP1, and for the 2015 Scheme at age 68 that factor is 17.06. It is higher because it is applied at retirement to the balance including all the interest, not to today's charge. Using SP1 against today's charge understates the cost. Equally, any figure that compounds a nominal interest rate onto the charge and then divides by the estimating factors overstates it, because those factors already allow for the interest.",
      "Every figure here is an estimate, and NHSBSA says so itself. It calls the estimating factors indicative, notes they may be revised before you retire, and states that the actual reduction will be calculated at retirement using the factors in force on that date. Ill-health retirement uses a different table again. Treat the output as a decision frame, then get the formal figure from NHSBSA before you elect.",
      "Normal Pension Age is the input people get wrong most often. It is 60 in the 1995 Section, or 55 for Special Class and Mental Health Officer members, and 65 in the 2008 Section. In the 2015 Scheme it is your State Pension Age, or 65 if that is later. This calculator assumes 68 for the 2015 Scheme unless you change it, and it labels the result when it has assumed. If you hold legacy 1995 or 2008 benefits, choose that option, because the debit on those benefits uses the other factor table entirely.",
      "Check carry-forward before electing anything. Unused Annual Allowance from the previous three tax years is set against this year's excess growth, current year first, and can remove the charge outright. If it drops the charge to £2,000 or below, mandatory Scheme Pays disappears with it. The procedural detail, including how a late statement changes what you file and when, sits in the Scheme Pays deadlines guide linked below.",
      "One point of confusion is worth closing: the tiered NHS pension contributions taken from your payslip, sometimes still printed as superannuation, are not what triggers an Annual Allowance charge, which is driven by the growth in the value of your benefits instead. Those contribution rates and bands are covered by the NHS Superannuation Tiered Contribution Calculator linked below.",
    ],
  },

  faqs: [
    {
      question: "How does the NHS pension scheme work, and how does the NHS pension work out an Annual Allowance charge?",
      answer:
        "It is a defined-benefit scheme, so your pension is built from your earnings and an accrual rate, not from a pot. All active members accrue in the 2015 section from 1 April 2022 at 1/54th of each year's pensionable earnings, revalued at CPI plus 1.5%. The Annual Allowance measures the capitalised growth in that promise over the year, which is the pension input amount on your statement. Growth above £60,000 in 2026/27, after carry-forward, produces a charge at your marginal rate.",
    },
    {
      question: "What is the Scheme Pays election deadline?",
      answer:
        "The election must reach NHSBSA by 31 July in the tax year following the charge year. For a charge arising in 2025/26, that means 31 July 2027. The deadline is strict: miss it and the Scheme Pays route closes, leaving cash payment through self-assessment as the only option. Note that the charge itself still has to be reported on your self-assessment return for the charge year regardless of how it is settled. One important extension applies: where NHSBSA issues you a revised pension savings statement on or after 2 May, section 237BA gives you the earlier of three months from that statement or six years from the end of the tax year.",
    },
    {
      question: "Can carry-forward remove the charge so I do not need Scheme Pays at all?",
      answer:
        "Quite possibly. Unused Annual Allowance from the previous three tax years carries forward and is set against this year's excess growth before any charge is calculated. If carry-forward removes the charge entirely, no election is needed. If it reduces the charge to £2,000 or below, mandatory Scheme Pays is no longer available. Always model carry-forward first: it requires your Pension Savings Statements for the three prior years, which NHSBSA can provide.",
    },
    {
      question: "Is Scheme Pays cheaper than paying the charge in cash?",
      answer:
        "Usually not in total money, though it is far cheaper today. The Scheme Pays facility NHS pension members elect is best read as a loan from your future pension, priced by how long that loan runs. NHSBSA divides the charge by an estimating factor to give the annual cut in today's money, so the break-even in years is simply that factor. An £8,000 charge on 2015 Scheme benefits at age 45, with a Normal Pension Age of 68, uses a factor of 12.1 and costs about £661 a year of pension, overtaking the £8,000 after roughly 12.1 years of drawing it. Scheme Pays wins on cash flow rather than on lifetime cost.",
    },
    {
      question: "How accurate is the estimated pension reduction?",
      answer:
        "It is an illustration, not a quote, and NHSBSA is direct about that. The figure here uses the illustrative estimating factors from NHSBSA's member factsheet Estimating the cost of Scheme Pays, version 5 dated 12 July 2024, whose tables are stamped in force from 30 March 2023. NHSBSA calls those factors indicative, warns they may be revised before you retire, and states that the actual reduction will be calculated at retirement using the Scheme factors in force on that date. Ill-health retirement uses a separate table. Your Normal Pension Age, which section pays the charge and any early or late retirement all move the answer. NHSBSA provides a formal statement of the actual pension debit when you elect, so use this tool to frame the decision and confirm the exact figures with NHSBSA or a medical accountant before the deadline.",
    },
    {
      question: "Does electing Scheme Pays give me any tax relief?",
      answer:
        "No. Scheme Pays settles a tax charge; it is not a pension contribution, so there is no income-tax relief on the amount. Your marginal rate is shown in this calculator for context only. Where your marginal rate does matter is at retirement: the pension you give up through the Scheme Pays debit would have been taxed as income when drawn, so the net loss of income in retirement is slightly smaller than the gross reduction suggests.",
    },
    {
      question: "Is the NHS pension scheme good enough to justify paying an Annual Allowance charge?",
      answer:
        "Yes for most members, which is why opting out to dodge a charge is usually the wrong fix. Asking is the NHS pension good is really asking what a pound of contribution buys. In the 2015 section it buys 1/54th of pensionable earnings a year for life, revalued at CPI plus 1.5%, with employer money at 23.7% of pensionable pay behind it. The charge is a tax on growth you have already banked. Scheme Pays spreads that charge, whereas opting out surrenders the growth itself.",
    },
    {
      question: "Does electing Scheme Pays reduce the NHS pension death in service lump sum?",
      answer:
        "NHSBSA's factsheet is clear that no reduction applies to benefits payable to your spouse or dependants in the event of your death, so a Scheme Pays debit does not cut survivor benefits. What it does reduce, in the 1995 Section only, is your own retirement lump sum, by three times the annual pension reduction. In the 2008 Section and the 2015 Scheme only the pension is reduced. Death benefits are set by scheme rules rather than by the Annual Allowance, so confirm the position on your own record with NHSBSA before electing. Note also that the lifetime allowance was abolished on 6 April 2024; lump sums are now tested against the £268,275 lump sum allowance and the £1,073,100 lump sum and death benefit allowance.",
    },
    {
      question: "Is a salary sacrifice pension arrangement available for NHS pension contributions?",
      answer:
        "No. The BMA states plainly that it is not possible to contribute to the NHS pension via salary sacrifice, because member contributions are a statutory deduction from pensionable pay under the scheme regulations. NHS employers do run salary sacrifice for other benefits, such as cars and cycle-to-work, and sacrificing pay that way generally reduces pensionable pay, which can lower both your contribution tier and your 2015 section accrual. It can also cut adjusted income and so reduce a tapered Annual Allowance, which is a genuine trade-off worth modelling.",
    },
  ],

  related: [
    {
      label: "NHS Pension Annual Allowance Calculator",
      href: "/calculators/nhs-pension-annual-allowance",
    },
    {
      label: "NHS Superannuation Tiered Contribution Calculator",
      href: "/calculators/nhs-superannuation-tiered-contribution",
    },
    {
      label: "NHS Pension Scheme Pays: deadlines for doctors",
      href: "/blog/nhs-pension-scheme-pays-doctors-deadlines",
    },
    {
      label: "The NHS Pension Scheme explained",
      href: "/nhs-pension",
    },
    {
      label: "Salaried Doctor Take-Home Pay Calculator",
      href: "/calculators/salaried-doctor-take-home",
    },
  ],
};
