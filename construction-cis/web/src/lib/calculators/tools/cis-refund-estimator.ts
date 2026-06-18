import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";

export const cisRefundEstimator: GenericTool = {
  kind: "generic",
  slug: "cis-refund-estimator",
  name: "CIS Refund Estimator",
  category: "CIS Refunds",
  oneLiner:
    "Estimate your annual CIS tax refund. See how much HMRC owes you after deductions, expenses and your personal allowance.",
  metaTitle: "CIS Tax Refund Estimator | How Much Are You Owed?",
  metaDescription:
    "Estimate your CIS tax refund for 2026/27. Enter your gross CIS income, materials, expenses and deduction rate to see what HMRC owes you back.",
  intro:
    "CIS deductions are taken from your labour payments before any expenses or personal allowance are accounted for. Most registered subcontractors overpay and are owed a refund. Enter your figures to get an estimate.",
  ctaLabel: "Claim your CIS refund with a specialist →",
  embedHeight: 680,
  fields: [
    {
      id: "grossIncome",
      label: "Gross CIS income (total labour + materials invoiced)",
      type: "currency",
      default: 45000,
      step: 1000,
      help: "The total amount on your CIS invoices before any deductions. Include both labour and materials you invoice for.",
    },
    {
      id: "materialsInvoiced",
      label: "Materials cost (materials YOU supply and invoice for)",
      type: "currency",
      default: 5000,
      step: 500,
      help: "Materials you personally purchase and include on your invoices. These are excluded from the CIS deduction base.",
    },
    {
      id: "rate",
      label: "Your CIS deduction rate",
      type: "select",
      default: "20",
      options: [
        { value: "20", label: "20% (registered subcontractor)" },
        { value: "30", label: "30% (unregistered subcontractor)" },
      ],
    },
    {
      id: "expenses",
      label: "Allowable business expenses",
      type: "currency",
      default: 4000,
      step: 500,
      help: "Mileage (55p per mile from April 2026), tools, PPE, van running costs, phone, work clothing. Do not include personal expenses.",
    },
    {
      id: "otherIncome",
      label: "Other taxable income (salary, rental, etc.)",
      type: "currency",
      default: 0,
      step: 1000,
      help: "Include any non-CIS income that forms part of your total taxable income for the year.",
    },
  ],
  compute: (v) => {
    const gross = Number(v.grossIncome);
    const materials = Number(v.materialsInvoiced);
    const rate = Number(v.rate) / 100;
    const expenses = Number(v.expenses);
    const otherIncome = Number(v.otherIncome);

    // CIS deduction base = gross labour (gross minus materials)
    const deductionBase = Math.max(0, gross - materials);
    // CIS deducted at source
    const cisDeducted = deductionBase * rate;

    // Taxable profit from CIS work = labour income minus expenses
    const cisProfit = Math.max(0, deductionBase - expenses);
    // Total income including other sources
    const totalIncome = cisProfit + otherIncome;

    // Personal allowance: £12,570
    const pa = 12570;
    const taxable = Math.max(0, totalIncome - pa);

    // Income tax: 20% on first £37,700 (basic rate band), 40% above
    const basicBand = 37700;
    const basicTax = Math.min(taxable, basicBand) * 0.2;
    const higherTax = Math.max(0, taxable - basicBand) * 0.4;
    const incomeTax = basicTax + higherTax;

    // Class 4 NI on CIS profit: 6% on £12,570-£50,270, 2% above
    const niLower = 12570;
    const niUpper = 50270;
    const class4Lower =
      Math.min(Math.max(0, cisProfit - niLower), niUpper - niLower) * 0.06;
    const class4Upper = Math.max(0, cisProfit - niUpper) * 0.02;
    const class4Ni = class4Lower + class4Upper;

    const totalLiability = incomeTax + class4Ni;
    const refund = cisDeducted - totalLiability;

    return {
      headline: {
        label: refund >= 0 ? "Estimated CIS refund" : "Estimated tax to pay",
        value: gbp(Math.abs(refund)),
        sub:
          refund >= 0
            ? `Based on ${gbp(cisDeducted)} deducted at source minus a ${gbp(totalLiability)} tax liability`
            : `You may owe ${gbp(Math.abs(refund))}. Your deductions were less than your total liability.`,
      },
      rows: [
        { label: "Gross CIS income", value: gbp(gross) },
        {
          label: "Less materials (excluded from deduction base)",
          value: `−${gbp(materials)}`,
        },
        { label: "CIS deduction base (labour)", value: gbp(deductionBase) },
        {
          label: `CIS deducted at source (${Number(v.rate)}%)`,
          value: gbp(cisDeducted),
          strong: true,
        },
        { label: "Less allowable expenses", value: `−${gbp(expenses)}` },
        { label: "Taxable profit", value: gbp(Math.max(0, cisProfit)) },
        { label: "Estimated income tax", value: gbp(incomeTax) },
        { label: "Estimated Class 4 NI", value: gbp(class4Ni) },
        {
          label: "Total estimated liability",
          value: gbp(totalLiability),
          strong: true,
        },
      ],
      note: "This is an estimate based on 2026/27 rates (PA £12,570, basic rate 20%, Class 4 NI 6%/2%). It assumes no other credits or adjustments. A specialist CIS accountant will identify all allowable deductions and file your Self Assessment correctly.",
    };
  },
  explainer: {
    heading: "How CIS tax refunds work",
    paragraphs: [
      "CIS deductions are taken from your labour payments at source, before any account is made for your personal allowance, business expenses or materials costs. A registered subcontractor on a 20% deduction rate may pay 20% on every labour pound received, even if their actual income tax liability for the year is far lower.",
      "The refund is calculated at the end of the tax year through a Self Assessment return. Your total CIS deductions are offset against your actual tax and National Insurance liability, and HMRC refunds the difference. The average CIS subcontractor is owed around £2,000 back per year.",
      "This calculator applies the 2026/27 rates: personal allowance of £12,570, income tax at 20% (basic) and 40% (higher rate), and Class 4 NI at 6% up to £50,270 and 2% above. It does not include Class 2 NI, which is £0 for profits above the £7,105 small profits threshold.",
    ],
  },
  faqs: [
    {
      question: "What is the average CIS refund?",
      answer:
        "The average CIS subcontractor is owed around £2,000 back per year. The actual figure depends on your total gross income, materials costs, allowable expenses and whether you have other income sources. Subcontractors with high materials costs or significant business expenses typically see higher refunds.",
    },
    {
      question: "How long does a CIS refund take?",
      answer:
        "HMRC typically processes Self Assessment repayments within 5 to 10 working days of the return being filed online. Returns filed close to the January 31 deadline may take longer due to volume. Filing earlier in the tax year usually results in faster repayment.",
    },
    {
      question: "Can a limited company claim a CIS refund?",
      answer:
        "Yes, but the mechanism is different. A CIS-registered limited company offsets CIS deductions suffered against its monthly PAYE liability via the Employer Payment Summary (EPS), recovering the money in real time rather than waiting for year-end Self Assessment. This is significantly faster.",
    },
    {
      question: "Can I claim back CIS deductions for previous years?",
      answer:
        "Yes. You can claim back overpaid CIS deductions going back up to four tax years from the current year. Each year requires a separate Self Assessment return or amendment. You will need your CIS payment and deduction statements for each year.",
    },
    {
      question: "What records do I need to claim my CIS refund?",
      answer:
        "You need your CIS payment and deduction statements (issued by each contractor who deducted CIS from your payments), receipts for all business expenses including materials, mileage records, and details of any other income. Contractors are legally required to issue statements within 14 days of each payment.",
    },
    {
      question: "Do I need an accountant to claim my CIS refund?",
      answer:
        "There is no legal requirement to use an accountant, but a specialist CIS accountant will identify all allowable expenses, ensure the deduction base has been applied correctly on your statements, and maximise your refund. Errors in self-filed returns, such as using net income instead of gross or missing expense categories, frequently result in lower refunds.",
    },
  ],
};
