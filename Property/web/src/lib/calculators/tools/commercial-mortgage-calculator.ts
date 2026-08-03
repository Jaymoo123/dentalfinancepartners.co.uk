import type { GenericTool } from "../types";
import { gbp } from "../format";

export const commercialMortgageCalculator: GenericTool = {
  kind: "generic",
  slug: "commercial-mortgage-calculator",
  name: "Commercial Mortgage Calculator",
  category: "Property Finance",
  oneLiner: "Estimate the monthly payment on a commercial mortgage, plus the debt service cover ratio (DSCR).",
  metaTitle: "Commercial Mortgage Calculator | Payments & DSCR",
  metaDescription:
    "Free commercial mortgage calculator. Estimate the monthly payment on a commercial property loan, plus the debt service cover ratio (DSCR) on it.",
  intro: "Estimate the monthly payment on a commercial mortgage, and how comfortably net income covers it.",
  ctaLabel: "Check the tax on commercial property →",
  embedHeight: 660,
  fields: [
    { id: "loanAmount", label: "Loan amount", type: "currency", default: 400_000, step: 10_000 },
    { id: "annualRate", label: "Annual interest rate", type: "number", default: 7.5, step: 0.1, suffix: "%" },
    { id: "termYears", label: "Loan term", type: "number", default: 15, step: 1 },
    {
      id: "repaymentType",
      label: "Repayment type",
      type: "select",
      default: "repayment",
      options: [
        { value: "interest-only", label: "Interest only" },
        { value: "repayment", label: "Capital repayment" },
      ],
    },
    {
      id: "annualNetIncome",
      label: "Annual net operating income",
      type: "currency",
      default: 0,
      step: 5_000,
      help: "Optional: net operating income, to see the debt service cover (DSCR).",
      advanced: true,
    },
  ],
  compute: (v) => {
    const loanAmount = Number(v.loanAmount);
    const annualRate = Number(v.annualRate);
    const termYears = Number(v.termYears);
    const annualNetIncome = Number(v.annualNetIncome);
    const isInterestOnly = String(v.repaymentType) === "interest-only";
    const mr = annualRate / 100 / 12;
    const n = Math.max(0, termYears * 12);

    let monthly = 0;
    if (isInterestOnly) {
      monthly = loanAmount * mr;
    } else if (n > 0) {
      monthly = mr === 0 ? loanAmount / n : (loanAmount * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
    }
    const totalPayable = monthly * n;
    const annualDebtService = monthly * 12;

    const rows = [
      { label: "Annual payment", value: gbp(annualDebtService) },
      { label: "Total payable over the term", value: gbp(totalPayable), strong: true },
    ];

    if (annualNetIncome > 0) {
      const dscr = annualDebtService > 0 ? annualNetIncome / annualDebtService : 0;
      const clears = dscr >= 1.3;
      rows.push({
        label: "Debt service cover ratio (DSCR)",
        value: `${dscr.toFixed(2)}x${clears ? " (clears a typical 1.3x)" : " (below a typical 1.3x)"}`,
        strong: true,
      });
    }

    return {
      headline: { label: "Monthly payment", value: gbp(monthly) },
      rows,
      note: "Commercial mortgages are unregulated business lending, assessed on the covenant and the property rather than personal affordability rules, and Section 24 does not apply to commercial property. This is an estimate only, not a quote or an offer of finance.",
    };
  },
  explainer: {
    heading: "How commercial mortgage affordability is assessed",
    paragraphs: [
      "A commercial mortgage, whether for an office, shop, warehouse or mixed-use building, is priced and assessed differently from a residential or buy-to-let loan. Rates are typically higher and terms shorter, reflecting the higher risk and lower liquidity of commercial property.",
      "Lenders usually focus on the debt service cover ratio, or DSCR, the net operating income divided by the annual mortgage payment. A DSCR of 1.3x means the income covers the debt payment with 30% to spare, a common minimum many commercial lenders look for, though the exact figure varies by lender and sector.",
      "Unlike residential buy-to-let, Section 24's mortgage interest restriction only applies to individual landlords letting residential property. Commercial property held personally, in a partnership or through a company follows ordinary business tax rules, where finance costs are generally deducted in working out taxable profit.",
    ],
  },
  faqs: [
    {
      question: "What DSCR do commercial lenders usually want?",
      answer:
        "Requirements vary, but 1.25x to 1.4x net operating income to debt payment is common, with higher-risk sectors or shorter leases often needing a bigger buffer than well-let, long-lease property.",
    },
    {
      question: "Does Section 24 apply to commercial property?",
      answer:
        "No. Section 24's restriction on mortgage interest relief applies only to individuals letting residential property. Commercial property finance costs are generally deductible in the normal way when working out taxable profit.",
    },
    {
      question: "Why are commercial mortgage rates usually higher than residential?",
      answer:
        "Commercial lending is unregulated and carries more risk: values can be more volatile, tenants can be harder to replace, and the loan is assessed on the business and property rather than a salaried income, so lenders price in a higher margin.",
    },
  ],
};
