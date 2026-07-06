import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcLocumTax, type StudentLoanPlan } from "@/lib/tools/compute/locum-tax";

export const locumTaxTool: GenericTool = {
  kind: "generic",
  slug: "locum-tax-calculator",
  name: "Locum Doctor Tax Calculator",
  category: "Income Tax",
  oneLiner:
    "Gross locum income in, net take-home out. 2025/26 income tax, Class 4 NI and student loan (plan 1/2/4).",
  embedHeight: 560,
  metaTitle: "Locum Doctor Tax Calculator 2025/26 | UK Locum Net Pay",
  metaDescription:
    "Free locum doctor tax calculator. 2025/26 income tax, Class 4 NI and student loan deductions for self-employed locum doctors. Instant net take-home figures.",
  intro:
    "Self-employed locum work means calculating your own tax, NI and student loan repayments. Enter your gross locum income, allowable expenses and any pension contributions to see your estimated 2025/26 net take-home pay.",
  fields: [
    {
      id: "grossIncome",
      label: "Gross locum income",
      type: "currency",
      default: 80000,
      min: 0,
      max: 500000,
      step: 5000,
    },
    {
      id: "expenses",
      label: "Allowable expenses",
      type: "currency",
      default: 5000,
      min: 0,
      max: 100000,
      step: 500,
      help: "GMC, indemnity, BMA, travel, equipment",
    },
    {
      id: "pensionContributions",
      label: "Pension contributions",
      type: "currency",
      default: 10000,
      min: 0,
      max: 100000,
      step: 1000,
      help: "Personal pension or NHS locum contributions",
    },
    {
      id: "studentLoanPlan",
      label: "Student loan plan",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No student loan" },
        { value: "plan1", label: "Plan 1 (before 2012)" },
        { value: "plan2", label: "Plan 2 (2012 to 2023)" },
        { value: "plan4", label: "Plan 4 (Scotland)" },
      ],
    },
  ],
  compute(values) {
    const grossIncome = Number(values.grossIncome);
    const expenses = Number(values.expenses);
    const pensionContributions = Number(values.pensionContributions);
    const studentLoanPlan = String(values.studentLoanPlan) as StudentLoanPlan;
    const r = calcLocumTax({ grossIncome, expenses, pensionContributions, studentLoanPlan });
    const rows = [
      { label: "Gross income", value: gbp(grossIncome) },
      { label: "Expenses", value: `-${gbp(expenses)}` },
      { label: "Pension contributions", value: `-${gbp(pensionContributions)}` },
      { label: "Net income", value: gbp(r.netIncome), strong: true as const },
      { label: "Income tax", value: `-${gbp(r.incomeTax)}` },
      { label: "National Insurance (Class 4)", value: `-${gbp(r.nationalInsurance)}` },
      ...(r.studentLoanRepayment > 0
        ? [{ label: "Student loan", value: `-${gbp(r.studentLoanRepayment)}` }]
        : []),
      { label: "Total deductions", value: `-${gbp(r.totalDeductions)}`, strong: true as const },
    ];
    return {
      headline: {
        label: "Net take-home",
        value: gbp(r.netTakeHome),
        sub: `Effective rate: ${pct(r.effectiveTaxRate)}`,
        tone: "good" as const,
      },
      rows,
      note: "For self-employed locum doctors. 2025/26 tax year. Includes Class 4 NI. Does not include Class 2 NI (~£3.70/week). Standard tax code assumed.",
    };
  },
  explainer: {
    heading: "How this calculator works",
    paragraphs: [
      "The calculator applies the 2025/26 personal allowance of £12,570 (no taper above £100,000 for self-employed; the taper applies to adjusted net income), the three income tax bands, and Class 4 National Insurance at 6% on profits between £12,570 and £50,270 and 2% above. Class 2 NI (approximately £3.70/week) is not included in this estimate.",
      "Your gross locum income minus allowable expenses and pension contributions gives your net income. Tax, NI and any student loan repayments are calculated on that net figure. Student loan thresholds and rates vary by plan.",
    ],
  },
  faqs: [
    {
      question: "What expenses can a locum doctor deduct?",
      answer:
        "HMRC allows locum doctors to deduct costs wholly and exclusively incurred for work: GMC registration, medical indemnity (MDU/MPS), BMA membership, CPD and course fees, medical journals and textbooks, motor expenses (business journeys only), professional equipment, and the cost of running a home office if part of your home is used exclusively for administrative work.",
    },
    {
      question: "Do I pay Class 2 as well as Class 4 NI?",
      answer:
        "Class 2 NI is around £3.70 per week (approximately £192/year) and is not included in this calculator. It is usually collected via your self-assessment return along with Class 4. Class 2 is being phased out but is still payable in 2025/26.",
    },
    {
      question: "What student loan plan am I on?",
      answer:
        "Plan 1 if you started university before September 2012 in England or Wales. Plan 2 if you started between September 2012 and July 2023. Plan 4 applies to Scottish students. Postgraduate loans use a separate scheme not included here.",
    },
    {
      question: "Should I work through a limited company as a locum?",
      answer:
        "It depends on your income level, IR35 status across engagements, and NHS pension position. At sustained income above roughly £80,000 to £100,000 from outside-IR35 engagements, a limited company can save materially. Use the Private Practice Incorporation Calculator to model the comparison, or book a free call with a specialist.",
    },
  ],
};
