import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

/**
 * CIS subcontractor deduction calculator (lite).
 *
 * Deliberately the lite version: the construction-cis sister site
 * (Trade Tax Specialists) owns the deep CIS toolset. Compute logic
 * copy-adapted from construction-cis/web/src/lib/calculators/cis-tax.ts
 * (copy-adapt, never cross-site import).
 */

const CIS_RATES = { registered: 0.2, unregistered: 0.3, gross: 0 } as const;
type CisStatus = keyof typeof CIS_RATES;

// 2026/27 rates
const PA = 12570;
const BASIC_BAND = 37700; // basic rate band width
const HIGHER_LIMIT = 125140;
const CLASS4_LPL = 12570;
const CLASS4_UPL = 50270;

function incomeTax(profit: number): number {
  // ponytail: PA taper above £100k included; no other reliefs modelled
  const pa = profit > 100000 ? Math.max(0, PA - (profit - 100000) / 2) : PA;
  const taxable = Math.max(0, profit - pa);
  const basic = Math.min(taxable, BASIC_BAND);
  const higher = Math.min(Math.max(taxable - BASIC_BAND, 0), HIGHER_LIMIT - PA - BASIC_BAND);
  const additional = Math.max(taxable - BASIC_BAND - (HIGHER_LIMIT - PA - BASIC_BAND), 0);
  return basic * 0.2 + higher * 0.4 + additional * 0.45;
}

function class4Ni(profit: number): number {
  const main = Math.min(Math.max(profit - CLASS4_LPL, 0), CLASS4_UPL - CLASS4_LPL) * 0.06;
  const upper = Math.max(profit - CLASS4_UPL, 0) * 0.02;
  return main + upper;
}

export const cisSubcontractorTool: GenericTool = {
  kind: "generic",
  slug: "cis-subcontractor-deduction",
  name: "CIS Subcontractor Deduction Calculator",
  category: "Self-Employed",
  oneLiner:
    "See what a contractor will deduct from your CIS invoices at 20% or 30%, your monthly take-home after deductions, and a year-end estimate of the refund you are likely due.",
  embedHeight: 560,
  metaTitle: "CIS Deduction Calculator 2026/27 | Subcontractor Take-Home & Refund",
  metaDescription:
    "Free CIS calculator for UK subcontractors. See the 20% or 30% deduction on your labour, monthly net pay after CIS, and your estimated year-end tax refund for 2026/27.",
  intro:
    "If you work in construction as a subcontractor, the contractor paying you must deduct CIS tax from the labour part of each invoice before it reaches you: 20% if you are registered for CIS, 30% if you are not, and 0% if you hold gross payment status. Materials you paid for are excluded from the deduction. Enter a typical monthly invoice below to see what lands in your account each month, what gets deducted over the year, and roughly how much of it comes back as a refund when your Self Assessment is filed.",
  fields: [
    {
      id: "monthlyGross",
      label: "Typical monthly invoice (gross, ex VAT)",
      type: "currency",
      default: 4000,
      min: 0,
      max: 50000,
      step: 100,
    },
    {
      id: "monthlyMaterials",
      label: "Materials cost on that invoice",
      type: "currency",
      default: 800,
      min: 0,
      max: 50000,
      step: 50,
      help: "The direct cost of materials you bought for the job. CIS is only deducted from the labour element, so materials come off before the rate is applied.",
    },
    {
      id: "status",
      label: "CIS registration status",
      type: "select",
      default: "registered",
      options: [
        { value: "registered", label: "Registered for CIS (20% deduction)" },
        { value: "unregistered", label: "Not registered (30% deduction)" },
        { value: "gross", label: "Gross payment status (0% deduction)" },
      ],
    },
    {
      id: "monthsWorked",
      label: "Months worked under CIS this tax year",
      type: "number",
      default: 12,
      min: 1,
      max: 12,
      step: 1,
    },
    {
      id: "annualProfit",
      label: "Estimated taxable profit for the year",
      type: "currency",
      default: 30000,
      min: 0,
      max: 200000,
      step: 500,
      help: "Your self-employed income minus all allowable expenses (tools, travel, materials, insurance). This drives the year-end tax comparison, not the CIS deduction itself.",
    },
  ],
  compute(values) {
    const gross = Number(values.monthlyGross);
    const materials = Math.min(Number(values.monthlyMaterials), gross);
    const status = String(values.status) as CisStatus;
    const months = Number(values.monthsWorked);
    const profit = Number(values.annualProfit);

    const rate = CIS_RATES[status];
    const labour = gross - materials;
    const monthlyDeduction = labour * rate;
    const monthlyNet = gross - monthlyDeduction;
    const annualDeducted = monthlyDeduction * months;

    const tax = incomeTax(profit);
    const ni = class4Ni(profit);
    const liability = tax + ni;
    const position = annualDeducted - liability;

    const rows = [
      { label: "Labour element (gross minus materials)", value: gbp(labour) },
      { label: `CIS deducted per month (${Math.round(rate * 100)}%)`, value: gbp(monthlyDeduction) },
      { label: "You receive per month", value: gbp(monthlyNet), strong: true as const },
      { label: `CIS deducted over ${months} month${months === 1 ? "" : "s"}`, value: gbp(annualDeducted) },
      { label: "Estimated income tax on profit", value: gbp(tax) },
      { label: "Estimated Class 4 NIC on profit", value: gbp(ni) },
      { label: "Total estimated liability", value: gbp(liability) },
    ];

    return {
      headline:
        position >= 0
          ? {
              label: "Estimated year-end refund",
              value: gbp(position),
              sub: `${gbp(annualDeducted)} deducted vs ${gbp(liability)} actual liability`,
              tone: position > 0 ? ("good" as const) : ("default" as const),
            }
          : {
              label: "Estimated year-end balance to pay",
              value: gbp(-position),
              sub: `${gbp(annualDeducted)} deducted vs ${gbp(liability)} actual liability`,
              tone: "warn" as const,
            },
      rows,
      note:
        status === "gross"
          ? "With gross payment status nothing is deducted at source, so you pay your full tax and Class 4 NIC through Self Assessment in January and July. Budget for the whole liability yourself."
          : "CIS deductions are taken from turnover, but your actual tax is charged on profit after expenses. Because expenses are ignored at the point of deduction, most subcontractors overpay during the year and reclaim the difference through Self Assessment. This is an estimate: payments on account, other income, and Class 2 NIC are not modelled.",
    };
  },
  explainer: {
    heading: "How CIS deductions work, with two worked examples",
    paragraphs: [
      "Under the Construction Industry Scheme, the contractor paying you acts as a tax collector. They split each invoice into labour and materials, apply the deduction rate to the labour element only, and pass the deducted amount to HMRC against your tax record. The rate depends on your status: 20% if you are registered as a CIS subcontractor, 30% if HMRC cannot verify you (usually because you have not registered), and 0% if you have been granted gross payment status.",
      "The deduction is a payment on account of your tax, not the tax itself. Your real liability is worked out on your Self Assessment return: income tax and Class 4 National Insurance on your profit after expenses. Because CIS is deducted from turnover before any expenses are considered, the amount taken during the year is usually more than you actually owe, which is why CIS refunds are so common.",
      "Worked example 1: a registered subcontractor invoices £4,000 a month, of which £800 is materials. The labour element is £3,200, so £640 is deducted each month and £3,360 is paid over. Across 12 months, £7,680 goes to HMRC. If their taxable profit for the year is £30,000, the actual liability is £3,486 income tax plus £1,045.80 Class 4 NIC, £4,531.80 in total. Filing the return produces a refund of £3,148.20.",
      "Worked example 2: an unregistered subcontractor invoices £2,500 a month with £300 of materials. The labour element is £2,200, so the 30% rate takes £660 a month, leaving £1,840. Over 10 months of work, £6,600 is deducted. On a taxable profit of £18,000, the real liability is £1,086 income tax plus £325.80 Class 4 NIC, £1,411.80 in total, so £5,188.20 comes back as a refund. Registering for CIS would have cut the in-year deductions from £6,600 to £4,400, keeping £2,200 in their pocket during the year instead of waiting for HMRC.",
      "This calculator is deliberately a quick estimate. For deeper CIS planning, including a full refund planner and contractor-side tools, our specialist construction site Trade Tax Specialists has a dedicated CIS toolset at tradetaxspecialists.co.uk/calculators.",
    ],
  },
  faqs: [
    {
      question: "Why am I being deducted 30% instead of 20%?",
      answer:
        "A 30% deduction almost always means the contractor could not verify you with HMRC, usually because you have not registered as a CIS subcontractor, or the details you gave the contractor (name, UTR, National Insurance number) do not match HMRC's records exactly. Registering for CIS is free and drops the rate to 20% once the contractor re-verifies you. The extra 10% is not lost, it is still credited to your tax record, but you wait until your Self Assessment refund to get it back.",
    },
    {
      question: "What counts as materials for the CIS split?",
      answer:
        "The direct cost of materials you actually bought for that job: bricks, timber, fixings, plant hire without an operator, and similar. It is your cost, not a marked-up price. If you are not VAT registered, the VAT you paid on materials is part of your cost and can be included. Labour, travel, and your own time never count as materials. Contractors are expected to check material costs are realistic, so keep receipts.",
    },
    {
      question: "How do I qualify for gross payment status?",
      answer:
        "You apply to HMRC and must pass three tests. The business test: you do construction work in the UK and run the business through a bank account. The turnover test: net construction turnover (excluding VAT and materials) of at least £30,000 for a sole trader, £30,000 per partner or director for partnerships and companies, or a £100,000 whole-business alternative for partnerships and companies. The compliance test: your tax returns and payments have been on time over the previous 12 months. HMRC reviews the status annually and can withdraw it for compliance failures.",
    },
    {
      question: "How do I claim my CIS refund?",
      answer:
        "Through your Self Assessment tax return. You declare your self-employed income and expenses as normal, then enter the total CIS deductions from your payment and deduction statements in the CIS box. HMRC offsets what has already been deducted against your final bill and refunds the difference, typically within a few weeks of filing. Keep every monthly CIS statement from each contractor, they are your evidence for the figures.",
    },
    {
      question: "Do CIS deductions cover my National Insurance?",
      answer:
        "Not separately, but in practice yes. CIS deductions are advance payments towards your overall Self Assessment liability, which includes both income tax and Class 4 National Insurance. When your return is calculated, the deductions are set against the combined bill. Class 2 NIC is now treated as paid automatically for most self-employed people with profits above the small profits threshold, so there is usually nothing extra to pay there either.",
    },
    {
      question: "Does CIS apply if I trade through a limited company?",
      answer:
        "Yes, contractors deduct CIS from payments to subcontractor companies in the same way. The difference is how you recover it: a company offsets CIS deductions against its monthly PAYE/CIS liabilities through the Employer Payment Summary rather than through Self Assessment, and reclaims any year-end surplus from HMRC after the final EPS of the tax year. This calculator models the sole trader position.",
    },
  ],
  related: [
    { label: "Take-home pay calculator", href: "/calculators/take-home-pay-calculator" },
  ],
};
