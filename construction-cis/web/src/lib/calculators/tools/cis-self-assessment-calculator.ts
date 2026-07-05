import type { GenericTool } from "@accounting-network/web-shared/tools";
import { gbp } from "../format";
import { PERSONAL_ALLOWANCE, BASIC_RATE_LIMIT, CLASS4_NI, INCOME_TAX_RATES } from "../cis-tax";

export const cisSelfAssessmentCalculator: GenericTool = {
  kind: "generic",
  slug: "cis-self-assessment-calculator",
  name: "CIS Self-Assessment Annual Calculator",
  category: "CIS Refunds",
  oneLiner:
    "Calculate your annual Self Assessment tax liability as a CIS subcontractor and see whether you are owed a refund or have tax to pay.",
  metaTitle: "CIS Self-Assessment Calculator | Annual Tax and Refund",
  metaDescription:
    "Calculate your CIS Self Assessment tax bill or refund for 2026/27. Enter your full year gross income, expenses, other income and CIS deducted to see your liability and refund.",
  intro:
    "This calculator works out your 2026/27 Self Assessment income tax and Class 4 NI liability as a sole-trader CIS subcontractor, and compares it against the CIS already deducted at source to estimate your refund or balance owed.",
  ctaLabel: "Get a specialist CIS Self Assessment filing →",
  embedHeight: 720,
  fields: [
    {
      id: "grossCIS",
      label: "Total gross CIS income (full year, before deductions)",
      type: "currency",
      default: 45000,
      step: 1000,
      help: "Your total gross CIS income as shown on all your payment and deduction statements. This is the amount before CIS was deducted, not what you received.",
    },
    {
      id: "materials",
      label: "Total materials costs (materials YOU supplied)",
      type: "currency",
      default: 5000,
      step: 500,
      help: "Materials you personally purchased and supplied on jobs. These reduce your taxable income.",
    },
    {
      id: "expenses",
      label: "Total allowable business expenses",
      type: "currency",
      default: 5500,
      step: 500,
      help: "Mileage (55p per mile from April 2026 for the first 10,000 miles), tools, PPE, van running costs, work phone, professional fees, insurance.",
    },
    {
      id: "otherIncome",
      label: "Other taxable income for the year",
      type: "currency",
      default: 0,
      step: 1000,
      help: "Salary from employment, rental income, or other income taxed at the individual level. Include gross amounts.",
    },
    {
      id: "cisDeducted",
      label: "Total CIS deducted at source (from all your statements)",
      type: "currency",
      default: 7200,
      step: 100,
      help: "The total amount withheld from your payments across all contractors for the full tax year, as shown on your deduction statements.",
    },
  ],
  compute: (v) => {
    const grossCIS = Number(v.grossCIS);
    const materials = Number(v.materials);
    const expenses = Number(v.expenses);
    const otherIncome = Number(v.otherIncome);
    const cisDeducted = Number(v.cisDeducted);

    // Taxable profit from CIS work
    const cisProfit = Math.max(0, grossCIS - materials - expenses);
    // Total income
    const totalIncome = cisProfit + otherIncome;

    // Personal allowance (HP §11a)
    const taxable = Math.max(0, totalIncome - PERSONAL_ALLOWANCE);

    // Income tax: 20% on first BASIC_RATE_LIMIT, 40% above (HP §11a)
    const basicTax = Math.min(taxable, BASIC_RATE_LIMIT) * INCOME_TAX_RATES.basic;
    const higherTax = Math.max(0, taxable - BASIC_RATE_LIMIT) * INCOME_TAX_RATES.higher;
    const incomeTax = basicTax + higherTax;

    // Class 4 NI on CIS profit: 6% on £12,570-£50,270, 2% above (HP §11a)
    const niBase = cisProfit;
    const class4Lower =
      Math.min(Math.max(0, niBase - CLASS4_NI.lowerLimit), CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit) * CLASS4_NI.main;
    const class4Upper = Math.max(0, niBase - CLASS4_NI.upperLimit) * CLASS4_NI.upper;
    const class4Ni = class4Lower + class4Upper;

    const totalLiability = incomeTax + class4Ni;
    const balance = cisDeducted - totalLiability;

    return {
      headline: {
        label:
          balance >= 0
            ? "Estimated refund from HMRC"
            : "Estimated balance to pay HMRC",
        value: gbp(Math.abs(balance)),
        sub:
          balance >= 0
            ? `${gbp(cisDeducted)} deducted minus ${gbp(totalLiability)} total liability`
            : `Your total liability (${gbp(totalLiability)}) exceeds CIS deducted (${gbp(cisDeducted)})`,
      },
      rows: [
        { label: "Gross CIS income", value: gbp(grossCIS) },
        { label: "Less materials", value: `−${gbp(materials)}` },
        { label: "Less allowable expenses", value: `−${gbp(expenses)}` },
        { label: "Taxable profit (CIS)", value: gbp(cisProfit) },
        { label: "Other income", value: gbp(otherIncome) },
        { label: "Total income", value: gbp(totalIncome) },
        {
          label: "Less personal allowance (£12,570)",
          value: `−${gbp(Math.min(PERSONAL_ALLOWANCE, totalIncome))}`,
        },
        { label: "Taxable income", value: gbp(taxable) },
        { label: "Income tax", value: gbp(incomeTax) },
        { label: "Class 4 NI (6% / 2%)", value: gbp(class4Ni) },
        {
          label: "Total tax liability",
          value: gbp(totalLiability),
          strong: true,
        },
        {
          label: "CIS deducted at source",
          value: gbp(cisDeducted),
          strong: true,
        },
      ],
      note: "2026/27 rates: PA £12,570, basic rate 20%, higher rate 40%, Class 4 NI 6% (£12,570–£50,270) and 2% above. Excludes Class 2 NI (£0 for profits above £7,105). For limited companies the EPS reclaim route applies instead of Self Assessment. This is an estimate only.",
    };
  },
  explainer: {
    heading: "How CIS subcontractors file Self Assessment",
    paragraphs: [
      "Every sole-trader CIS subcontractor must file a Self Assessment tax return, even when a refund is due. HMRC uses the return to calculate your final income tax and Class 4 National Insurance for the year ending 5 April, and to reconcile the CIS deductions your contractors have paid over on your behalf. The filing deadline for online returns is 31 January following the end of the tax year, so the 2026/27 return is due by 31 January 2028.",
      "Your return must include your total gross CIS income (before any deductions, taken from your payment and deduction statements), your allowable business expenses, any other taxable income such as employment earnings or rental income, and the total CIS deducted at source across all your contractors for the year. HMRC applies the personal allowance of £12,570 to your total income, which is why most CIS subcontractors receive a refund: the deductions are calculated on gross income, ignoring the personal allowance entirely.",
      "From April 2026, if your gross CIS income (before expenses, before deductions) exceeds £50,000, you must file quarterly digital updates through Making Tax Digital for Income Tax Self Assessment (MTD ITSA) compatible software, in addition to your annual return. The threshold drops to £30,000 in April 2027. Gross income for MTD purposes means the total before any deductions or expenses, not the net amount you actually received after CIS was withheld.",
    ],
  },
  faqs: [
    {
      question: "What is the Self Assessment deadline?",
      answer:
        "The deadline for online filing is 31 January. The tax year ends on 5 April and the return covers the year just ended, so the 31 January deadline falls 9 months and 26 days after the tax year end. Paper returns have an earlier deadline of 31 October. You must also pay any tax owed by 31 January.",
    },
    {
      question: "What is the penalty if I miss the Self Assessment deadline?",
      answer:
        "A £100 fixed penalty applies immediately, even if there is no tax to pay or you are owed a refund. Further penalties follow: £10 per day after 3 months (up to 90 days), then 5% of the tax owed or £300 (whichever is higher) at 6 months, and the same again at 12 months. Interest accrues on unpaid tax from 1 February.",
    },
    {
      question: "What counts as an allowable expense for a CIS subcontractor?",
      answer:
        "Mileage at 55p per mile for the first 10,000 miles (from April 2026), tools and equipment, PPE, van running costs (fuel, insurance, servicing), a work-only phone, public liability insurance, accountancy fees, and work clothing that is a uniform or protective in nature. Personal clothing, commuting costs and food are not allowable.",
    },
    {
      question: "What is different about the limited company route?",
      answer:
        "A CIS-registered limited company does not wait for Self Assessment to recover deductions. It offsets CIS deductions suffered against its monthly PAYE liability via the Employer Payment Summary (EPS), recovering the money in real time each month. Any excess beyond the PAYE liability can be reclaimed directly from HMRC.",
    },
    {
      question: "How far back can I claim CIS refunds?",
      answer:
        "You can make claims for the four tax years preceding the current year. Each prior year requires a separate return or amendment. You will need your payment and deduction statements for each year, along with records of your expenses.",
    },
    {
      question: "What records do I need?",
      answer:
        "Payment and deduction statements from every contractor you worked for, receipts for all business expenses, a mileage log, bank statements, any P60 or P45 from employment if applicable, and your UTR and National Insurance number. Keep records for at least five years after the 31 January filing deadline.",
    },
    {
      question: "Does the personal allowance apply to CIS income?",
      answer:
        "Yes. The personal allowance of £12,570 applies to your total taxable income, which includes your CIS profit. This is one of the main reasons most CIS subcontractors are owed a refund: contractors deduct CIS at 20% on gross income, with no personal allowance factored in, so you almost always overpay during the year.",
    },
    {
      question: "Am I affected by Making Tax Digital ITSA?",
      answer:
        "From April 2026, if your gross income (before expenses, before CIS deductions) exceeds £50,000, you must file quarterly digital updates via MTD-compatible software. The threshold drops to £30,000 from April 2027. Gross income means the total before any deductions, not the net amount you received after CIS was withheld.",
    },
  ],
};
