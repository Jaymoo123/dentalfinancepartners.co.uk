import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import {
  calcSalariedDoctorTakeHome,
  type StudentLoanPlan,
} from "@/lib/tools/compute/salaried-doctor-take-home";

export const salariedDoctorTakeHomeTool: GenericTool = {
  kind: "generic",
  slug: "salaried-doctor-take-home",
  name: "Salaried Doctor Take-Home Pay Calculator",
  category: "Income Tax",
  oneLiner:
    "NHS salary plus optional private income in, monthly net take-home out. Includes NHS superannuation deduction and 2026/27 PAYE bands.",
  embedHeight: 600,
  metaTitle: "Salaried Doctor Take-Home Pay Calculator 2026/27 | NHS + Private Income",
  metaDescription:
    "Free salaried doctor take-home pay calculator for 2026/27. Includes NHS superannuation deduction, PAYE income tax, Class 1 and Class 4 NI, and optional private sessional income. Instant monthly net pay figures.",

  intro:
    "Whether you are a salaried GP, a hospital specialty doctor, or a consultant with NHS salary and private sessions on top, this calculator shows your monthly net take-home after PAYE income tax, National Insurance, and the NHS superannuation deduction. Enter your NHS salary and any private sessional income you earn on the side to get an instant breakdown for 2026/27.",

  fields: [
    {
      id: "nhsSalary",
      label: "NHS salary (gross, annual)",
      type: "currency",
      default: 85000,
      min: 0,
      max: 500000,
      step: 5000,
      help: "Your contracted NHS pensionable pay before any deductions",
    },
    {
      id: "privateSessionalIncome",
      label: "Private sessional income (annual)",
      type: "currency",
      default: 0,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Self-employed private practice income on top of your NHS salary. Needs a self-assessment return.",
    },
    {
      id: "privatePensionContribution",
      label: "Private pension contributions (annual)",
      type: "currency",
      default: 0,
      min: 0,
      max: 100000,
      step: 500,
      help: "Gross contributions to a personal pension outside the NHS scheme. Reduces your taxable income.",
      advanced: true,
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
  ],

  compute(values) {
    const nhsSalary = Number(values.nhsSalary);
    const privateSessionalIncome = Number(values.privateSessionalIncome);
    const privatePensionContribution = Number(values.privatePensionContribution);
    const studentLoanPlan = String(values.studentLoanPlan) as StudentLoanPlan;

    const r = calcSalariedDoctorTakeHome({
      nhsSalary,
      privateSessionalIncome,
      privatePensionContribution,
      studentLoanPlan,
    });

    const superPct = `${(r.superTierRate * 100).toFixed(1)}%`;

    const rows = [
      { label: "NHS salary", value: gbp(nhsSalary) },
      ...(privateSessionalIncome > 0
        ? [{ label: "Private sessional income", value: gbp(privateSessionalIncome) }]
        : []),
      { label: "Total gross income", value: gbp(r.totalIncome), strong: true as const },
      { label: "Personal allowance", value: gbp(r.personalAllowance) },
      { label: "Income tax (PAYE + self-assessment)", value: `-${gbp(r.incomeTax)}` },
      { label: "National Insurance (Class 1, PAYE)", value: `-${gbp(r.class1NI)}` },
      ...(r.class4NI > 0
        ? [{ label: "National Insurance (Class 4, private income)", value: `-${gbp(r.class4NI)}` }]
        : []),
      {
        label: `NHS superannuation (${superPct} tier)`,
        value: `-${gbp(r.nhsSuper)}`,
      },
      ...(r.studentLoanRepayment > 0
        ? [{ label: "Student loan repayment", value: `-${gbp(r.studentLoanRepayment)}` }]
        : []),
      {
        label: "Total deductions",
        value: `-${gbp(r.totalDeductions)}`,
        strong: true as const,
      },
    ];

    const hasPrivate = privateSessionalIncome > 0;
    const noteBase =
      "2026/27 tax year. NHS superannuation deducted at the NHSBSA employee contribution tier for your pensionable pay. Standard 1257L tax code assumed for PAYE.";
    const privateNote = hasPrivate
      ? " Private sessional income requires a self-assessment return; Class 4 NI applies."
      : "";
    const paNote =
      r.personalAllowance < 12570
        ? " Your personal allowance is tapered because total income exceeds £100,000."
        : "";

    return {
      headline: {
        label: "Monthly net take-home",
        value: gbp(r.monthlyNetTakeHome),
        sub: `Annual net: ${gbp(r.annualNetTakeHome)} · Effective rate: ${pct(r.effectiveTaxRate * 100)}`,
        tone: "good" as const,
      },
      rows,
      note: noteBase + privateNote + paNote,
    };
  },

  explainer: {
    heading: "How this calculator works",
    paragraphs: [
      "The calculator applies 2026/27 PAYE income tax using the correct band arithmetic. The personal allowance is £12,570, tapering by £1 for every £2 of income above £100,000 and reaching zero at £125,140. The basic-rate band is fixed at £37,700 (covering income from £12,571 to £50,270 at the full personal allowance). The higher-rate band widens as the personal allowance tapers, which is what creates an effective ~60% marginal rate on income between £100,000 and £125,140. Additional rate of 45% applies above £125,140.",
      "National Insurance on your NHS salary uses the Class 1 employee rates: 8% between the primary threshold (£12,570) and the upper earnings limit (£50,270), then 2% above. Private sessional income is self-employed income and attracts Class 4 NI at 6% up to £50,270 and 2% above, taking into account any main-rate NI band already used by your salary.",
      "The NHS superannuation deduction is the employee contribution to the NHS Pension Scheme, calculated at the tier rate that applies to your NHS pensionable pay. For 2026/27 the rates run from 5.2% at the lowest band to 12.5% on pensionable pay of £67,669 and above. The NHS pension is one of the most valuable in the public sector; the superannuation line is a cost, but it is building a defined-benefit pension in return.",
      "Private pension contributions (if entered) reduce your taxable income for income-tax purposes. They do not reduce NI or NHS superannuation.",

      // Worked example 1 (from spec): £85k NHS + £15k private
      "Worked example 1: NHS salary £85,000 plus private sessional income £15,000, no student loan, no private pension contributions. Total income £100,000. Personal allowance is fully intact (£100,000 is exactly at the taper start, not above it). Taxable income: £100,000 minus £12,570 = £87,430. Income tax: basic band £37,700 at 20% = £7,540; higher band £49,730 at 40% = £19,892; total income tax £27,432. Class 1 NI on NHS salary: 8% on £37,700 (PT to UEL) = £3,016; 2% on £34,730 (salary above UEL) = £695; total Class 1 NI £3,711. Class 4 NI on private income: the NHS salary already exceeds the UEL, so all £15,000 of private income falls in the 2% band, giving £300. NHS super: £85,000 sits in the top tier (£67,669 and above) at 12.5% = £10,625. Total deductions: £27,432 + £3,711 + £300 + £10,625 = £42,068. Annual net take-home: £57,932. Monthly net: approximately £4,828.",

      // Worked example 2: high case to illustrate PA taper
      "Worked example 2: NHS salary £120,000, no private income, no student loan. Total income £120,000. Personal allowance tapers: £12,570 minus (£120,000 minus £100,000) divided by 2 = £12,570 minus £10,000 = £2,570. Taxable income: £120,000 minus £2,570 = £117,430. Basic band £37,700 at 20% = £7,540. Higher band: (£125,140 minus £2,570) minus £37,700 = £84,870; but only £117,430 minus £37,700 = £79,730 sits in this band, so higher tax = £79,730 at 40% = £31,892. Total income tax: £39,432. Class 1 NI: 8% on £37,700 = £3,016; 2% on £69,730 = £1,395; total £4,411. NHS super: £120,000 sits in the top tier (£67,669 and above) at 12.5% = £15,000. Total deductions: £39,432 + £4,411 + £15,000 = £58,843. Annual net take-home: £61,157. Monthly net: approximately £5,096. Note the effective rate rises steeply here because the personal allowance taper creates an implicit 60% band between £100,000 and £125,140.",
    ],
  },

  faqs: [
    {
      question: "What is the NHS superannuation deduction and why is it shown as a cost?",
      answer:
        "The NHS superannuation deduction is your employee contribution to the NHS Pension Scheme. It is compulsory for most NHS employees and is collected through payroll before you receive your net pay. The rate depends on your NHS pensionable pay and follows a tiered table set by NHSBSA (for 2026/27, from 5.2% up to 12.5%). The contribution buys you accrual in one of the best defined-benefit pension schemes available, so while it reduces your monthly take-home, it is building a pension income that few private alternatives can match.",
    },
    {
      question: "My tax code is not 1257L. Will this affect the result?",
      answer:
        "This calculator assumes the standard 1257L tax code, which corresponds to the basic personal allowance of £12,570. If HMRC has issued an adjusted code (for example due to underpaid tax, benefits-in-kind, or multiple jobs), your actual PAYE deduction from your NHS payroll will differ. The estimate is accurate for most salaried doctors on a standard code. Check your P60 or payslip coding notice if you are unsure.",
    },
    {
      question: "Do I need to complete a self-assessment return if I have private income?",
      answer:
        "Yes. Any self-employed private sessional income sits outside PAYE and must be declared on a self-assessment tax return by 31 January following the tax year. Class 4 National Insurance at 6% (up to £50,270) and 2% (above) also applies to this income. HMRC will usually raise a payment-on-account requirement once your self-assessment liability exceeds £1,000.",
    },
    {
      question: "Why does the personal allowance taper matter so much at £100,000?",
      answer:
        "Between £100,000 and £125,140, your personal allowance reduces by £1 for every £2 of extra income. This means you pay income tax on the normal income AND lose tax-free allowance at the same time. The combined effect creates an effective marginal rate of around 60% on income in that range. A private pension contribution that brings your adjusted income below £100,000 can recover the full personal allowance and save significantly more tax than the face-value 40% or 45% rate suggests.",
    },
    {
      question: "Can NHS superannuation contributions reduce my income tax?",
      answer:
        "NHS superannuation is collected through payroll under a net-pay arrangement, which means contributions are taken before income tax is calculated on your salary. This gives you automatic higher or additional rate relief depending on your band. This relief is already built into the tax figure the NHS payroll produces. This calculator models superannuation as a separate deduction from net pay for clarity, but in practice the payroll arithmetic achieves the same result.",
    },
    {
      question: "What is not included in this calculator?",
      answer:
        "This calculator does not cover: Class 2 NI (small flat charge for self-employed income, around £3.70 per week in 2025/26, usually collected via self-assessment); Benefits in Kind (e.g. private medical cover from the NHS); partnership profit shares for GP partners (use the GP Partner Drawings Planner instead); locum income through a personal service company (use the Locum Doctor Tax Calculator); or the NHS Pension Annual Allowance charge if your pension growth exceeds your tapered limit.",
    },
  ],

  related: [
    {
      label: "Locum Doctor Tax Calculator",
      href: "/calculators/locum-tax-calculator",
    },
    {
      label: "NHS Pension Annual Allowance Calculator",
      href: "/calculators/nhs-pension-annual-allowance",
    },
  ],
};
