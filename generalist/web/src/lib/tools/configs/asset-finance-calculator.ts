import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcAssetFinance } from "@/lib/tools/compute/asset-finance-calculator";

export const assetFinanceCalculatorTool: GenericTool = {
  kind: "generic",
  slug: "asset-finance-calculator",
  name: "Asset Finance Calculator",
  category: "Business Finance",
  oneLiner:
    "Estimate the monthly rental on hire purchase or a finance lease for company equipment, vehicles or machinery, including a balloon or residual payment.",
  embedHeight: 640,
  metaTitle: "Asset Finance Calculator UK | HP & Lease Monthly Rental",
  metaDescription:
    "Free UK asset finance calculator for limited companies. Estimate the monthly rental and total cost of hire purchase or a finance lease on equipment, vehicles or machinery.",
  intro:
    "Financing equipment, a vehicle or machinery for your company? Enter the asset cost, deposit, term and rate (with an optional balloon or residual payment) to see an indicative monthly rental and total cost, whether you're comparing hire purchase or a finance lease.",
  fields: [
    {
      id: "assetCost",
      label: "Asset cost",
      type: "currency",
      default: 120000,
      min: 0,
      max: 5000000,
      step: 1000,
    },
    {
      id: "deposit",
      label: "Deposit paid upfront",
      type: "currency",
      default: 12000,
      min: 0,
      max: 5000000,
      step: 500,
    },
    {
      id: "termMonths",
      label: "Term (months)",
      type: "number",
      default: 60,
      min: 6,
      max: 120,
      step: 6,
    },
    {
      id: "annualRate",
      label: "Annual rate",
      type: "number",
      default: 7.5,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: "%",
    },
    {
      id: "balloon",
      label: "Balloon or residual payment (optional)",
      type: "currency",
      default: 0,
      min: 0,
      max: 5000000,
      step: 500,
      help: "A final lump sum due at the end of the term, common on lease agreements and some HP deals. Leave at 0 if there isn't one.",
    },
    {
      id: "product",
      label: "Product",
      type: "select",
      default: "hp",
      options: [
        { value: "hp", label: "Hire purchase (you own the asset)" },
        { value: "lease", label: "Finance lease (rentals, may hand back or sell at end)" },
      ],
    },
  ],
  compute(values) {
    const r = calcAssetFinance(
      Number(values.assetCost),
      Number(values.deposit),
      Number(values.annualRate),
      Number(values.termMonths),
      Number(values.balloon),
    );
    const isHP = values.product === "hp";
    const rows = [
      { label: "Amount financed", value: gbp(r.amountFinanced) },
      { label: "Monthly rental", value: gbp(r.monthlyRental), strong: true as const },
      { label: "Total rentals over term", value: gbp(r.totalRentals) },
      ...(Number(values.balloon) > 0
        ? [{ label: "Balloon/residual due at end", value: gbp(Number(values.balloon)) }]
        : []),
      { label: "Total payable (deposit + rentals + balloon)", value: gbp(r.totalPayable) },
      { label: "Total finance cost", value: gbp(r.totalFinanceCost) },
    ];
    return {
      headline: {
        label: "Estimated monthly rental",
        value: gbp(r.monthlyRental),
        sub: `${gbp(r.totalPayable)} total payable over the term`,
      },
      rows,
      note: isHP
        ? "Hire purchase: you're treated as owning the asset from day one, so it can usually qualify for the Annual Investment Allowance, full expensing, or the 40% first-year allowance. A finance lease instead lets you deduct the rentals as they fall due. Indicative estimate only, not a finance quote or tax advice."
        : "Finance lease: rentals are generally deductible against profits as they're paid, rather than claiming a capital allowance on the asset itself. Hire purchase works differently, treating you as the owner from day one for capital allowances. Indicative estimate only, not a finance quote or tax advice.",
    };
  },
  explainer: {
    heading: "Hire purchase vs finance lease, and how the rental is worked out",
    paragraphs: [
      "Asset finance spreads the cost of equipment, vehicles or machinery over a fixed term instead of paying the full cost upfront. The two most common structures are hire purchase (HP), where you're treated as the owner from day one and the asset is yours outright once the final payment clears, and a finance lease, where you pay rentals for the use of the asset and either hand it back, extend the rental, or arrange its sale at the end of the term.",
      "The monthly rental is calculated by spreading the amount financed (the asset cost, less your deposit, less the present value of any balloon or residual payment) over the term at the agreed rate. A balloon payment lowers the monthly rental because a chunk of the cost is deferred to a single lump sum at the end, which can help cash flow but needs planning for when it falls due.",
      "The tax treatment differs between the two structures. Hire purchase generally lets the company claim capital allowances on the asset from day one, so it can qualify for the Annual Investment Allowance (100% relief up to £1 million), full expensing, or the new 40% first-year allowance on new plant and machinery. A finance lease instead lets you deduct the rental payments as they're paid, without claiming a capital allowance on the asset itself. Worked example: a £120,000 machine financed with a £12,000 deposit over 5 years at 7.5% costs around £2,164 a month, with total finance cost of roughly £21,800 over the term, before any tax relief on the asset is taken into account.",
    ],
  },
  faqs: [
    {
      question: "Hire purchase or a finance lease, which is better for tax?",
      answer:
        "It depends on your company's position. Hire purchase generally lets you claim capital allowances on the asset (potentially the Annual Investment Allowance, full expensing, or the 40% first-year allowance), giving faster tax relief if you have profits to relieve it against. A finance lease instead lets you deduct the rentals as an expense as they're paid, which can suit companies that would rather spread the deduction evenly. Speak to your accountant about which fits your company's tax position.",
    },
    {
      question: "Can I claim the Annual Investment Allowance on a hire-purchase asset?",
      answer:
        "Generally yes. Under a hire-purchase agreement, you're treated as the owner of the asset from the start of the agreement for capital allowances purposes, even though legal title transfers only once the final payment is made, so it can qualify for the AIA, full expensing, or first-year allowances in the same way as an outright cash purchase.",
    },
    {
      question: "What is a balloon or residual payment?",
      answer:
        "It's a final lump sum due at the end of the finance term, sized to reflect the asset's expected value at that point. Including a balloon lowers the regular monthly rental because less of the asset's cost is spread across the earlier payments, but you need a plan (refinance, sale proceeds, or cash) to cover it when it falls due.",
    },
    {
      question: "Does new or used equipment change the tax treatment?",
      answer:
        "The Annual Investment Allowance applies to new and used qualifying assets alike. Full expensing and the new 40% first-year allowance, however, only apply to new and unused main-rate plant and machinery bought by companies, so buying secondhand can mean relying on the AIA or the slower writing-down allowance instead.",
    },
    {
      question: "Is asset finance regulated?",
      answer:
        "Business asset finance to a limited company is generally not a regulated consumer-credit activity. It becomes regulated where the borrower is an individual, sole trader, or small partnership borrowing below the relevant business-purpose exemption threshold, which is a different product to the company facilities this calculator estimates.",
    },
    {
      question: "Can I refinance equipment I already own?",
      answer:
        "Yes, this is known as asset refinance or sale-and-leaseback: a lender buys the asset from your company and you lease it back, releasing cash tied up in equipment you already own. The mechanics of the monthly payment are similar to this calculator, but based on the asset's current value rather than its original cost.",
    },
  ],
  related: [
    { label: "Asset Finance Guide", href: "/blog/business-finance/asset-finance-guide" },
    { label: "Equipment & Machinery Finance", href: "/blog/business-finance/equipment-and-machinery-finance" },
    { label: "Business Loan Calculator", href: "/calculators/business-loan-calculator" },
  ],
};
