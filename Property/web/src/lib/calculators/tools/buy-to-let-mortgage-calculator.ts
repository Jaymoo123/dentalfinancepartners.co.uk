import type { GenericTool } from "../types";
import { gbp } from "../format";

export const buyToLetMortgageCalculator: GenericTool = {
  kind: "generic",
  slug: "buy-to-let-mortgage-calculator",
  name: "Buy-to-Let Mortgage Calculator",
  category: "Property Finance",
  oneLiner: "Estimate the monthly payment on a buy-to-let mortgage, interest-only or capital repayment.",
  metaTitle: "BTL Mortgage Calculator | Interest-Only vs Repayment",
  metaDescription:
    "Free buy-to-let mortgage calculator. Estimate the monthly payment on interest-only or repayment terms, plus the total cost over the loan term.",
  intro: "Estimate the monthly payment on a buy-to-let mortgage, on interest-only or capital repayment terms.",
  ctaLabel: "See the tax on your mortgage →",
  embedHeight: 600,
  fields: [
    { id: "loanAmount", label: "Loan amount", type: "currency", default: 200_000, step: 5_000 },
    { id: "annualRate", label: "Annual interest rate", type: "number", default: 5.5, step: 0.1, suffix: "%" },
    { id: "termYears", label: "Mortgage term", type: "number", default: 25, step: 1 },
    {
      id: "repaymentType",
      label: "Repayment type",
      type: "select",
      default: "interest-only",
      options: [
        { value: "interest-only", label: "Interest only" },
        { value: "repayment", label: "Capital repayment" },
      ],
    },
  ],
  compute: (v) => {
    const loanAmount = Number(v.loanAmount);
    const annualRate = Number(v.annualRate);
    const termYears = Number(v.termYears);
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
    const totalInterest = Math.max(0, totalPayable - loanAmount);

    return {
      headline: { label: "Monthly payment", value: gbp(monthly) },
      rows: [
        { label: "Annual payment", value: gbp(monthly * 12) },
        { label: "Total payable over the term", value: gbp(totalPayable), strong: true },
        isInterestOnly
          ? { label: "Capital still owed at the end", value: gbp(loanAmount) }
          : { label: "Total interest over the term", value: gbp(totalInterest) },
      ],
      note: "Most buy-to-let mortgages are interest-only, with the capital repaid on sale or remortgage. For a personal landlord, Section 24 restricts mortgage interest relief to a basic-rate tax credit rather than a full deduction, use the Section 24 calculator to see the tax impact. This is an estimate only, not a quote or an offer of finance.",
    };
  },
  explainer: {
    heading: "How buy-to-let mortgage payments are worked out",
    paragraphs: [
      "Most landlords borrow on an interest-only basis: the monthly payment is simply the loan balance multiplied by the interest rate, with the full capital still owed at the end of the term. That keeps the monthly cost lower than a residential mortgage of the same size, but it means the loan itself never shrinks unless you pay it down separately.",
      "A capital repayment mortgage costs more each month because part of the payment reduces the balance, but by the end of the term the loan is cleared and no capital is owed. The trade-off is cashflow now versus a smaller, or zero, balance later.",
      "Either way, the interest cost matters for tax as well as cashflow. For an individual landlord, Section 24 means mortgage interest no longer reduces taxable rental profit directly, it instead earns a basic-rate tax credit, which can push the effective tax rate on rental income above the headline income tax bands.",
    ],
  },
  faqs: [
    {
      question: "Why is interest-only cheaper each month than repayment?",
      answer:
        "Because the interest-only payment only covers the interest on the outstanding balance, the loan itself is not repaid. A repayment mortgage adds a capital element on top, so the monthly cost is higher but the balance falls over time.",
    },
    {
      question: "Can I deduct the full mortgage payment from my rental profit?",
      answer:
        "No. For an individual landlord, only the interest element is relevant to tax, and Section 24 limits that relief to a basic-rate credit rather than a deduction from income. Capital repayments are never tax-deductible.",
    },
    {
      question: "Does this figure match what a lender would offer me?",
      answer:
        "It is an estimate based on the rate and term you enter, to show the shape of the payment. Actual lender rates depend on the property, your income, existing borrowing and their own affordability and stress-test rules.",
    },
  ],
};
