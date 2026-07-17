import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcTakeHomePay, type StudentLoanPlan } from "@/lib/tools/compute/take-home-pay";

export const takeHomePayTool: GenericTool = {
  kind: "generic",
  slug: "take-home-pay-calculator",
  name: "Take-Home Pay Calculator",
  category: "Employment",
  oneLiner: "Gross salary in, annual, monthly and weekly net out. 2026/27 income tax, NI, student loan and pension salary sacrifice.",
  embedHeight: 540,
  metaTitle: "Take-Home Pay Calculator 2026/27 | UK Salary After Tax",
  metaDescription:
    "Free UK take-home pay calculator. 2026/27 income tax, NI, student loan and pension salary sacrifice. Annual, monthly and weekly net figures.",
  intro:
    "The HMRC headline number says one thing; what arrives in your account says another. Enter your gross salary and the calculator returns annual, monthly and weekly net pay for 2026/27, with income tax, employee NI, student loan plans, and any salary-sacrifice pension contributions all factored in.",
  fields: [
    {
      id: "salary",
      label: "Gross annual salary",
      type: "currency",
      default: 45000,
      min: 0,
      max: 1000000,
      step: 500,
    },
    {
      id: "pensionPercent",
      label: "Pension contribution (salary sacrifice)",
      type: "number",
      default: 0,
      min: 0,
      max: 50,
      step: 0.5,
      suffix: "% of gross",
    },
    {
      id: "plan",
      label: "Student loan plan",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No student loan" },
        { value: "plan1", label: "Plan 1 (pre-2012 England/Wales)" },
        { value: "plan2", label: "Plan 2 (2012-2023 England/Wales)" },
        { value: "plan4", label: "Plan 4 (Scotland)" },
        { value: "plan5", label: "Plan 5 (from Aug 2023)" },
        { value: "pg", label: "Postgraduate loan" },
      ],
    },
  ],
  compute(values) {
    const salary = Number(values.salary);
    const pensionPercent = Number(values.pensionPercent);
    const plan = String(values.plan) as StudentLoanPlan;
    const r = calcTakeHomePay(salary, pensionPercent, plan);
    const rows = [
      { label: "Personal allowance", value: gbp(r.personalAllowance) },
      { label: "Pension (salary sacrifice)", value: gbp(r.pension) },
      { label: "Income tax", value: gbp(r.incomeTax) },
      { label: "National Insurance", value: gbp(r.ni) },
      ...(r.studentLoan > 0 ? [{ label: "Student loan", value: gbp(r.studentLoan) }] : []),
      { label: "Total deductions", value: gbp(r.totalDeductions), strong: true as const },
    ];
    return {
      headline: {
        label: "Annual take-home",
        value: gbp(r.net),
        sub: `${gbp(r.monthly)}/mo · ${gbp(r.weekly)}/wk`,
        tone: "good" as const,
      },
      rows,
      note: `Effective rate (income tax + NI): ${pct(r.effectiveRate * 100)}. Assumes standard tax code, no benefits in kind, PAYE only.`,
    };
  },
  explainer: {
    heading: "How this works",
    paragraphs: [
      "The calculator applies the standard 2026/27 personal allowance of £12,570 (tapering above £100,000), the three income tax bands, and employee NI at 8% on earnings between £12,570 and £50,270 plus 2% above. Salary-sacrifice pension contributions are deducted before tax and NI are calculated, so they save you both.",
      "Student loan deductions are added if you select a plan. The model assumes a standard tax code (1257L), no taxable benefits in kind, no other income, and that you are paid through PAYE.",
      "Worked example: on a gross salary of £45,000 with no pension or student loan, the personal allowance covers the first £12,570, leaving taxable income of £32,430. Income tax at 20% basic rate is £6,486. Employee NI at 8% on £32,430 (the band from £12,570 to £45,000) is £2,594. Total deductions are £9,080, leaving annual take-home pay of £35,920 (£2,993 per month, £691 per week). The combined income tax and NI effective rate is 20.2% of gross.",
    ],
  },
  faqs: [
    {
      question: "What is in 2026/27 take-home pay?",
      answer:
        "For a UK employee: gross salary, minus income tax (20% basic, 40% higher, 45% additional), minus employee National Insurance (8% between £12,570 and £50,270, 2% above), minus any student loan deductions, minus any salary-sacrifice pension contribution. The personal allowance is £12,570 and tapers by £1 for every £2 of income above £100,000.",
    },
    {
      question: "How does salary sacrifice pension affect take-home pay?",
      answer:
        "Salary sacrifice reduces your gross salary by the contribution amount before income tax and NI are calculated, so you save income tax AND NI on the sacrificed amount. This is more tax-efficient than a relief-at-source contribution because you also get NI relief.",
    },
    {
      question: "Which student loan plan am I on?",
      answer:
        "Plan 1 if you started uni before September 2012 in England/Wales. Plan 2 if you started September 2012 to August 2023 in England/Wales. Plan 4 for Scottish loans. Plan 5 for England loans from August 2023. Postgraduate loan is separate at 6% above £21,000.",
    },
    {
      question: "Does this work for limited company directors?",
      answer:
        "Only partly. If you run a limited company and pay yourself a small salary plus dividends, this calculator covers the salary portion only. For the full picture across salary, dividend, and corporation tax, use the Salary and Dividend Optimiser instead.",
    },
  ],
};
