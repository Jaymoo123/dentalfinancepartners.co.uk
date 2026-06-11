import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcAssociateTakeHome } from "@/lib/tools/compute/associate-take-home";

export const associateTakeHomeTool: GenericTool = {
  kind: "generic",
  slug: "associate-take-home",
  name: "Associate Take-Home Calculator",
  category: "Associate tax",
  oneLiner: "Net annual take-home for a sole-trader associate. Fee split, lab fees, NHS Pension and expenses at 2025/26 rates.",
  embedHeight: 540,
  metaTitle: "Associate Dentist Take-Home Calculator UK 2025/26",
  metaDescription:
    "Net annual take-home for UK associate dentists. Fee split, lab fees, NHS Pension contribution and deductible expenses modelled at 2025/26 rates.",
  intro:
    "Enter your gross fees, split percentage, lab fee deduction, expenses and NHS Pension contribution. The calculator applies 2025/26 income tax and NI to give your estimated net take-home as a sole-trader associate.",
  fields: [
    {
      id: "grossFees",
      label: "Gross fees you generate (£/yr)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 1000,
    },
    {
      id: "associatePct",
      label: "Associate fee split (%)",
      type: "number",
      default: 50,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
    },
    {
      id: "labPct",
      label: "Lab fee deduction (% of gross)",
      type: "number",
      default: 5,
      min: 0,
      max: 20,
      step: 0.5,
      suffix: "% of gross",
    },
    {
      id: "expenses",
      label: "Other deductible expenses (indemnity, CPD, GDC, motor) (£/yr)",
      type: "currency",
      default: 8000,
      min: 0,
      max: 50000,
      step: 250,
    },
    {
      id: "pensionContribution",
      label: "NHS Pension contribution (£/yr)",
      type: "currency",
      default: 6500,
      min: 0,
      max: 50000,
      step: 250,
    },
  ],
  compute(values) {
    const grossFees = Number(values.grossFees);
    const associatePct = Number(values.associatePct);
    const labPct = Number(values.labPct);
    const expenses = Number(values.expenses);
    const pensionContribution = Number(values.pensionContribution);
    const r = calcAssociateTakeHome(grossFees, associatePct, labPct, expenses, pensionContribution);
    return {
      headline: {
        label: "Estimated annual take-home",
        value: gbp(r.netCash),
        sub: `After income tax, Class 2/4 NI and pension. Effective rate: ${pct(r.effectiveRate)}`,
        tone: "good" as const,
      },
      rows: [
        { label: "Associate share before lab", value: gbp(r.associateShare) },
        { label: "Lab fee deduction", value: gbp(r.lab) },
        { label: "Taxable profit", value: gbp(r.taxableProfit) },
        { label: "Income tax", value: gbp(r.incomeTax) },
        { label: "Class 4 NI", value: gbp(r.class4Ni) },
        { label: "Class 2 NI", value: gbp(r.class2Ni) },
        { label: "Total tax and NI", value: gbp(r.totalTax), strong: true },
      ],
      note: "Estimate uses UK 2025/26 income tax and NI rates for sole-trader associates. Excludes student loan repayments, Marriage Allowance, and other personal reliefs.",
    };
  },
  explainer: {
    heading: "How this works",
    paragraphs: [
      "The calculator starts with your gross fees and applies your split percentage to get your associate share. Lab fees (as a percentage of your gross, pro-rated to your split) are then deducted, followed by your other deductible expenses and NHS Pension contribution.",
      "The resulting taxable profit is run through 2025/26 income tax (20% up to £50,270, 40% up to £125,140, 45% above; personal allowance £12,570 tapering above £100,000), Class 4 NI (6% on profits between £12,570 and £50,270, 2% above), and Class 2 NI at £3.45/week where profits exceed £6,725.",
      "NHS Pension contributions are treated as deductible from taxable profit. This is the practitioner pensions arrangement available to NHS-contract associates.",
    ],
  },
  faqs: [
    {
      question: "What expenses can an associate dentist deduct?",
      answer: "For a sole-trader associate: GDC retention, indemnity premiums, CPD, professional subscriptions, lab fees attributable to your work, motor expenses between practices (not home to first practice), instruments and loupes, accountancy fees, and professional clothing. Personal elements need to be apportioned.",
    },
    {
      question: "Is my NHS Pension contribution deductible?",
      answer: "Yes, for sole-trader associates contributing via the practitioner pensions arrangement, the contribution is deductible from taxable profit. It is taken from NHS earnings at source via the GDS contract mechanism.",
    },
    {
      question: "Does this cover student loan repayments?",
      answer: "No. The model excludes student loan repayments for clarity. If you are on Plan 2 or Plan 5, you will repay 9% of earnings above the relevant threshold via your self-assessment return. This reduces your net take-home from the figure shown.",
    },
    {
      question: "Does this work for a limited company associate?",
      answer: "No. This model covers sole-trader associates only. For a Ltd-co associate, IR35 status and the salary/dividend split affect the calculation materially. Book a call for accurate modelling of your specific structure.",
    },
  ],
};
