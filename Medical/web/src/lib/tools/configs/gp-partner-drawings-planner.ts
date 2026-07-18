import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import {
  calcGpPartnerDrawings,
  type StudentLoanPlan,
} from "@/lib/tools/compute/gp-partner-drawings";

export const gpPartnerDrawingsPlannerTool: GenericTool = {
  kind: "generic",
  slug: "gp-partner-drawings-planner",
  name: "GP Partner Drawings Planner",
  category: "Income Tax",
  oneLiner:
    "Annual partnership profit share in, sustainable monthly drawings out. Accounts for income tax, Class 4 NI, NHS superannuation, and any student loan for 2026/27.",
  embedHeight: 640,
  metaTitle: "GP Partner Drawings Planner 2026/27 | Monthly Take-Home After Tax and Super",
  metaDescription:
    "Free GP partner drawings planner for 2026/27. Enter your partnership profit share and NHS superannuable profit to see your sustainable monthly drawings after income tax, Class 4 National Insurance and NHS superannuation are set aside. Includes the personal allowance taper above £100,000.",

  intro:
    "GP partners are self-employed and receive a share of practice profits rather than a salary, which means tax, National Insurance and NHS pension contributions are not deducted at source. This planner works out the maximum you can safely draw from the practice each month by calculating all the liabilities first and leaving them in the account. Enter your expected profit share and superannuable profit for 2026/27 to get an instant breakdown.",

  fields: [
    {
      id: "profitShare",
      label: "Annual partnership profit share",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Your share of the practice's taxable profits for the year, before any drawings. Check your partnership agreement or accountant's projection.",
    },
    {
      id: "superannuablePay",
      label: "Superannuable profit (NHS pension)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Usually the same as your profit share for most GP partners. If in doubt, use the figure from your NHS Superannuation Tiered Contribution calculator or Form A/B.",
    },
    {
      id: "studentLoanPlan",
      label: "Student loan plan",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No student loan" },
        { value: "plan1", label: "Plan 1 (started before September 2012)" },
        { value: "plan2", label: "Plan 2 (started September 2012 to 2023)" },
        { value: "plan4", label: "Plan 4 (Scotland)" },
      ],
    },
    {
      id: "taxReservePct",
      label: "Extra buffer to hold back (%)",
      type: "number",
      default: 0,
      min: 0,
      max: 30,
      step: 1,
      suffix: "%",
      advanced: true,
      help: "Percentage of profit share to hold back over and above the computed tax and super liabilities. Useful if you want a working-capital cushion or expect year-end adjustments.",
    },
  ],

  compute(values) {
    const profitShare = Math.max(0, Number(values.profitShare) || 0);
    const superannuablePay = Math.max(0, Number(values.superannuablePay) || 0);
    const studentLoanPlan = String(values.studentLoanPlan) as StudentLoanPlan;
    const taxReserveRate = Math.min(0.3, Math.max(0, (Number(values.taxReservePct) || 0) / 100));

    const r = calcGpPartnerDrawings({
      profitShare,
      superannuablePay,
      studentLoanPlan,
      taxReserveRate,
    });

    const superPct = `${(r.superRate * 100).toFixed(1)}%`;

    const rows = [
      { label: "Annual profit share", value: gbp(profitShare) },
      { label: "Personal allowance", value: gbp(r.personalAllowance) },
      { label: "Income tax (basic rate 20%)", value: `-${gbp(r.basicTax)}` },
      ...(r.higherTax > 0
        ? [{ label: "Income tax (higher rate 40%)", value: `-${gbp(r.higherTax)}` }]
        : []),
      ...(r.additionalTax > 0
        ? [{ label: "Income tax (additional rate 45%)", value: `-${gbp(r.additionalTax)}` }]
        : []),
      { label: "Total income tax", value: `-${gbp(r.incomeTax)}`, strong: true as const },
      { label: "Class 4 National Insurance", value: `-${gbp(r.class4NI)}` },
      {
        label: `NHS superannuation (${superPct} tier on ${gbp(superannuablePay)})`,
        value: `-${gbp(r.superAmount)}`,
      },
      ...(r.studentLoanRepayment > 0
        ? [{ label: "Student loan repayment", value: `-${gbp(r.studentLoanRepayment)}` }]
        : []),
      {
        label: "Total set-aside (tax + NI + super + loan)",
        value: `-${gbp(r.incomeTax + r.class4NI + r.superAmount + r.studentLoanRepayment)}`,
        strong: true as const,
      },
      ...(r.bufferAmount > 0
        ? [
            {
              label: `Extra buffer (${(taxReserveRate * 100).toFixed(0)}% of profit)`,
              value: `-${gbp(r.bufferAmount)}`,
            },
          ]
        : []),
      {
        label: "Net available for drawings (annual)",
        value: gbp(r.netAnnual),
        strong: true as const,
      },
    ];

    const paNote =
      r.personalAllowance === 0
        ? " Your personal allowance is fully withdrawn above £125,140."
        : r.personalAllowance < 12570
        ? " Your personal allowance is tapered because profit exceeds £100,000."
        : "";

    return {
      headline: {
        label: "Sustainable monthly drawings",
        value: gbp(r.monthlyDrawings),
        sub: `Annual net: ${gbp(r.netAnnual)} · Effective rate (tax + super): ${pct(r.effectiveRate * 100)}`,
        tone: "good" as const,
      },
      rows,
      note:
        `2026/27 tax year. Income tax uses the correct band arithmetic: personal allowance £12,570 (tapered above £100,000), basic band fixed at £37,700, higher band widens as the allowance tapers. Class 4 NI is 6% between £12,570 and £50,270 then 2% above. NHS superannuation is charged at the stepped tier rate on your superannuable profit and is paid directly to the scheme, separate from your drawings. Tax is due in two payments on account (31 January and 31 July) plus a balancing payment; your monthly drawings must leave enough in the practice account to meet those dates.${paNote} These are estimates, not advice.`,
    };
  },

  explainer: {
    heading: "How the GP partner drawings planner works",
    paragraphs: [
      "GP partners are self-employed and draw money from the practice throughout the year rather than receiving a salary with tax deducted at source. The most common financial mistake partners make is drawing too much early in the year and then finding they cannot cover the January and July tax payments. This planner prevents that by calculating the full liability upfront and telling you the maximum you can draw each month once all the obligations are reserved.",

      "Income tax for 2026/27 is calculated on your partnership profit share using the correct band arithmetic. The personal allowance is £12,570, but it tapers by £1 for every £2 of income above £100,000, disappearing entirely at £125,140. The basic-rate band is always fixed at £37,700 (taxed at 20%), covering income from the end of the personal allowance up to £50,270 at the full allowance. The higher-rate band then widens as the personal allowance tapers, which is what creates the well-known ~60% effective marginal rate on income between £100,000 and £125,140. Any income above £125,140 is taxed at the additional rate of 45%.",

      "Class 4 National Insurance applies to self-employed profits at 6% on the band between £12,570 and £50,270, then 2% on profits above £50,270. Class 2 NIC is no longer a compulsory payment from 6 April 2024 and is not included in this calculation. GP partners do not pay employer National Insurance on their own drawings.",

      "NHS superannuation (your employee contribution to the NHS Pension Scheme) is charged on your superannuable profit at the stepped tier rate for your income band. The entire superannuable profit is charged at the single rate it falls into rather than being taxed marginally band by band. For 2026/27 the top tier (superannuable profit of £67,669 and above) is 12.5%. Crucially, NHS superannuation is not deductible from your profit for income tax purposes. This means the tax bill is calculated on the full profit share and the superannuation comes out separately afterwards. This planner models that correctly: tax is computed on the full profit, then superannuation is deducted to reach the true net position.",

      "If you have a student loan, repayment is calculated at 9% on profit above your plan threshold (Plan 1 £26,065, Plan 2 £28,470, Plan 4 £32,745 for Scottish borrowers). The optional buffer field lets you hold back an additional percentage of your profit share on top of all the computed liabilities, which some partners use as a working-capital cushion or to absorb year-end profit adjustments.",

      "Worked example: a GP partner with a profit share of £120,000 and superannuable profit of £120,000, no student loan, no buffer. The personal allowance tapers to £2,570 (£12,570 minus half of the £20,000 excess above £100,000). Income tax: the basic band of £37,700 is taxed at 20%, giving £7,540; the remaining profit in the higher band (£79,730) is taxed at 40%, giving £31,892; total income tax £39,432. Class 4 NI: 6% on £37,700 (the £12,570 to £50,270 band) = £2,262; plus 2% on £69,730 (profit above £50,270) = £1,395; total NI £3,657. NHS superannuation: £120,000 sits in the top tier at 12.5%, so £15,000 is set aside for the scheme. Total liabilities: £58,089. Net available for drawings: £61,911 per year, or £5,159 per month.",
    ],
  },

  faqs: [
    {
      question: "Why can I not simply draw my profit share in full each month?",
      answer:
        "Because income tax, Class 4 National Insurance and NHS superannuation are not deducted from your drawings before you receive them. If you draw the full profit, you will have nothing left to pay the January and July tax bills. HMRC also raises payments on account based on the previous year's liability, so the amounts can be larger than expected if your profit has grown. This planner works out the safe monthly drawing figure by reserving all those obligations first.",
    },
    {
      question: "What is the personal allowance taper and why does it matter at £100,000?",
      answer:
        "Between £100,000 and £125,140 your personal allowance reduces by £1 for every £2 of extra profit. You pay income tax on the additional profit AND lose the tax-free allowance at the same time, creating an effective marginal rate of around 60% on income in that corridor. Above £125,140 the additional rate of 45% applies on a standard basis. A pension contribution that brings your adjusted net income below £100,000 can restore the full personal allowance and reduce the tax bill significantly more than the face-value rate suggests.",
    },
    {
      question: "Is NHS superannuation deductible from my income for tax purposes?",
      answer:
        "No. NHS employee superannuation contributions for GP partners are not deductible in computing taxable profits, unlike a personal pension contribution. You pay income tax on your full profit share and then the superannuation comes out of your net pay separately. This is a common source of confusion when partners compare their position to salaried colleagues, whose superannuation is deducted before PAYE is applied. This calculator models both flows correctly.",
    },
    {
      question: "When do I actually pay the tax?",
      answer:
        "Self-assessment tax for the 2026/27 year (ending 5 April 2027) is due on 31 January 2028 as the balancing payment. HMRC also requires two payments on account during the year: 31 January 2027 (50% of the prior year's liability) and 31 July 2027 (another 50%). If your profit is growing, the payments on account from the prior year will fall short and a larger balancing payment will be due. Monthly drawings must leave enough in the practice account to cover those dates. Some accountants recommend setting aside a fixed percentage of each drawing immediately into a separate tax reserve.",
    },
    {
      question: "How is Class 4 NI different from the Class 1 NI a salaried GP pays?",
      answer:
        "Salaried GPs pay Class 1 employee NI at 8% between the primary threshold (£12,570) and the upper earnings limit (£50,270), then 2% above. GP partners pay Class 4 NI at 6% in the same main band and 2% above. The Class 4 rate is therefore lower than Class 1 on the main band (6% versus 8%), which is one financial advantage of partner status. There is no employer NI payable by a partner on their own drawings.",
    },
    {
      question: "What is not included in this calculator?",
      answer:
        "This calculator does not cover: Class 2 NI (no longer compulsory from 6 April 2024); private pension contributions (which reduce adjusted net income and can affect the personal allowance taper); the NHS Pension Annual Allowance charge if your pension growth exceeds your tapered allowance; or practice-level expenses such as rent, staff costs and equipment that reduce the profit before it reaches your profit share. Always confirm your final figures with your accountant before deciding how much to draw.",
    },
  ],

  related: [
    {
      label: "Salaried GP vs GP Partner Calculator",
      href: "/calculators/salaried-gp-vs-partner",
    },
    {
      label: "NHS Pension Annual Allowance Calculator",
      href: "/calculators/nhs-pension-annual-allowance",
    },
    {
      label: "NHS Superannuation Tiered Contribution Calculator",
      href: "/calculators/nhs-superannuation-tiered-contribution",
    },
    {
      label: "Locum Doctor Tax Calculator",
      href: "/calculators/locum-tax-calculator",
    },
  ],

  workedExamples: [
    {
      title: "GP partner, profit share £120,000, no student loan",
      description:
        "A GP partner with an annual profit share of £120,000 and superannuable profit of £120,000, no student loan and no extra buffer.",
      inputs: {
        profitShare: 120000,
        superannuablePay: 120000,
        studentLoanPlan: "none",
        taxReservePct: 0,
      },
      result: {
        personalAllowance: 2570,
        incomeTax: 39432,
        class4NI: 3657,
        nhsSuper: 15000,
        netAnnual: 61911,
        monthlyDrawings: 5159,
      },
    },
  ],
};
