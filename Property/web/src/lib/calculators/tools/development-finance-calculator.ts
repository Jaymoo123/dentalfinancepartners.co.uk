import type { GenericTool } from "../types";
import { gbp } from "../format";

export const developmentFinanceCalculator: GenericTool = {
  kind: "generic",
  slug: "development-finance-calculator",
  name: "Development Finance Calculator",
  category: "Property Finance",
  oneLiner: "Estimate the maximum development finance facility from GDV and loan-to-cost, plus the cash you'd need.",
  metaTitle: "Development Finance Calculator | Max Facility",
  metaDescription:
    "Free development finance calculator. Estimate the maximum facility from GDV and loan-to-cost, and the developer cash and profit on a scheme.",
  intro: "Estimate the maximum development finance facility from GDV and loan-to-cost, and the cash you would need to find.",
  ctaLabel: "Plan the tax on your scheme →",
  embedHeight: 680,
  fields: [
    {
      id: "gdv",
      label: "Gross development value (GDV)",
      type: "currency",
      default: 1_500_000,
      step: 25_000,
      help: "Gross development value, the end value once complete.",
    },
    { id: "landCost", label: "Land cost", type: "currency", default: 400_000, step: 10_000 },
    { id: "buildCost", label: "Build cost", type: "currency", default: 600_000, step: 10_000 },
    {
      id: "ltgdvPct",
      label: "Loan to GDV",
      type: "number",
      default: 65,
      step: 1,
      suffix: "%",
      help: "Loan to GDV cap, often around 60% to 65%.",
    },
    {
      id: "ltcPct",
      label: "Loan to cost",
      type: "number",
      default: 90,
      step: 1,
      suffix: "%",
      help: "Loan to cost, often up to around 90%.",
    },
  ],
  compute: (v) => {
    const gdv = Number(v.gdv);
    const landCost = Number(v.landCost);
    const buildCost = Number(v.buildCost);
    const ltgdvPct = Number(v.ltgdvPct);
    const ltcPct = Number(v.ltcPct);

    const totalCost = landCost + buildCost;
    const maxByGDV = (gdv * ltgdvPct) / 100;
    const maxByLTC = (totalCost * ltcPct) / 100;
    const maxFacility = Math.min(maxByGDV, maxByLTC);
    const developerCash = Math.max(0, totalCost - maxFacility);
    const grossProfit = gdv - totalCost;
    const profitOnCost = totalCost > 0 ? (grossProfit / totalCost) * 100 : 0;

    return {
      headline: { label: "Maximum indicative facility", value: gbp(maxFacility) },
      rows: [
        { label: "Total land and build cost", value: gbp(totalCost) },
        { label: "Maximum by loan-to-GDV", value: gbp(maxByGDV) },
        { label: "Maximum by loan-to-cost", value: gbp(maxByLTC) },
        { label: "Developer cash required", value: gbp(developerCash), strong: true },
        { label: "Gross profit before finance costs", value: gbp(grossProfit) },
        { label: "Profit on cost", value: `${profitOnCost.toFixed(2)}%` },
      ],
      note: "This excludes finance costs, professional fees and contingency, and lenders usually retain interest so the net day-one advance is lower than the headline facility. This is an estimate only, not a quote or an offer of finance.",
    };
  },
  explainer: {
    heading: "How a development finance facility is sized",
    paragraphs: [
      "Development lenders cap the loan by two separate tests, and lend against whichever gives the lower figure: a percentage of the gross development value (GDV), the expected value once the scheme is finished and sold, and a percentage of total cost, the loan-to-cost (LTC) ratio.",
      "The loan-to-GDV cap protects the lender if the finished value comes in lower than expected, while the loan-to-cost cap ensures the developer has meaningful equity or profit tied up in the scheme. Whichever of the two produces the smaller loan is usually the effective ceiling on what a lender will advance.",
      "Any gap between the total cost and the maximum facility has to be found from the developer's own funds, or a second layer of finance. Profit on cost, the gross profit as a percentage of total spend, is a common quick check lenders and developers both use to judge whether a scheme has enough margin to be worth the risk.",
    ],
  },
  faqs: [
    {
      question: "Why does the loan use the lower of the GDV and cost tests?",
      answer:
        "Because either limit alone could let a lender over-lend: capping only by GDV ignores whether the build is efficiently costed, and capping only by cost ignores whether the finished value actually supports the debt. Using the lower of the two keeps both risks in check.",
    },
    {
      question: "What counts as 'total cost' for loan-to-cost purposes?",
      answer:
        "Typically land (or the value of land already owned) plus build costs. Some lenders also fold in professional fees, contingency and finance costs into the cost base, which changes the loan-to-cost figure, so always check exactly what a specific lender includes.",
    },
    {
      question: "What profit on cost do lenders usually want to see?",
      answer:
        "It varies by lender, location and scheme type, but many look for somewhere around 15% to 25% profit on cost as a margin of safety against build cost overruns or a softer sales market by completion.",
    },
  ],
};
