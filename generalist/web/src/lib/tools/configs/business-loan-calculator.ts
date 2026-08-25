import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcBusinessLoan, type RepaymentType } from "@/lib/tools/compute/business-loan-calculator";

export const businessLoanCalculatorTool: GenericTool = {
  kind: "generic",
  slug: "business-loan-calculator",
  name: "Business Loan Calculator",
  category: "Business Finance",
  oneLiner:
    "Estimate the monthly repayment, total interest, and total cost of a limited-company business loan, amortising or interest-only.",
  embedHeight: 620,
  metaTitle: "Business Loan Calculator UK | Monthly Repayment & Total Cost",
  metaDescription:
    "Free UK business loan calculator for limited companies. Enter the loan amount, term and rate to estimate the monthly repayment, total interest and total cost, amortising or interest-only.",
  intro:
    "Borrowing for your limited company? Enter the loan amount, term and interest rate to see an indicative monthly repayment and the total cost over the life of the loan. This is an estimate to help you compare options, not a credit quote.",
  fields: [
    {
      id: "loanAmount",
      label: "Loan amount",
      type: "currency",
      default: 75000,
      min: 1000,
      max: 2000000,
      step: 1000,
    },
    {
      id: "termYears",
      label: "Term",
      type: "select",
      default: "5",
      options: [
        { value: "1", label: "1 year" },
        { value: "2", label: "2 years" },
        { value: "3", label: "3 years" },
        { value: "4", label: "4 years" },
        { value: "5", label: "5 years" },
        { value: "7", label: "7 years" },
        { value: "10", label: "10 years" },
      ],
    },
    {
      id: "annualRate",
      label: "Annual interest rate",
      type: "number",
      default: 9,
      min: 0,
      max: 30,
      step: 0.1,
      suffix: "%",
      help: "The representative rate offered depends on your company's trading history, turnover and whether the loan is secured.",
    },
    {
      id: "repaymentType",
      label: "Repayment type",
      type: "select",
      default: "amortising",
      options: [
        { value: "amortising", label: "Capital + interest (repays the loan in full)" },
        { value: "interestOnly", label: "Interest-only (full principal due at the end)" },
      ],
    },
    {
      id: "feePct",
      label: "Arrangement fee",
      type: "number",
      default: 1.5,
      min: 0,
      max: 10,
      step: 0.1,
      suffix: "%",
      help: "A one-off fee, typically 1% to 3% of the loan amount, added to your total cost.",
    },
  ],
  compute(values) {
    const termMonths = Number(values.termYears) * 12;
    const r = calcBusinessLoan(
      Number(values.loanAmount),
      Number(values.annualRate),
      termMonths,
      String(values.repaymentType) as RepaymentType,
      Number(values.feePct),
    );
    const rows = [
      { label: "Monthly repayment", value: gbp(r.monthlyRepayment), strong: true as const },
      { label: "Total interest", value: gbp(r.totalInterest) },
      { label: "Arrangement fee", value: gbp(r.fee) },
      { label: "Total repayable", value: gbp(r.totalRepayable) },
      { label: "Indicative annualised cost", value: pct(r.indicativeAnnualCost, 1) },
    ];
    return {
      headline: {
        label: "Estimated monthly repayment",
        value: gbp(r.monthlyRepayment),
        sub: `${gbp(r.totalRepayable)} total repayable over the term`,
      },
      rows,
      note: "Indicative estimate only, not a credit quote. Your actual rate, fees and total cost depend on the lender's assessment of your company.",
    };
  },
  explainer: {
    heading: "How a business loan is priced and repaid",
    paragraphs: [
      "Most limited-company business loans are repaid on a capital-and-interest (amortising) basis: a level monthly payment that gradually clears both the interest and the principal, so the loan is fully repaid by the end of the term. Some facilities are structured interest-only, where you pay just the interest each month and the full loan amount falls due as a single payment at the end of the term, which keeps monthly outgoings lower but means you need a plan to repay or refinance the principal.",
      "The rate a lender offers reflects the risk they see in your company: trading history, turnover, existing debt, and whether the loan is secured against company assets or backed by a personal guarantee. Most alternative and bank lenders also charge a one-off arrangement fee, commonly 1% to 3% of the loan amount, which adds to the total cost even though it does not change the monthly repayment figure shown here.",
      "This calculator gives an indicative annualised cost that blends the interest and the fee over the term, to help you compare two offers on a like-for-like basis. It is not a regulated APR, because APR calculations follow specific rules that vary by product and lender. Worked example: a company borrows £75,000 over 5 years at 9%, amortising, with a 1.5% arrangement fee. The monthly repayment is about £1,557, the interest over the term comes to roughly £18,400, and the £1,125 fee brings the total cost of the loan to around £19,500 on top of the £75,000 borrowed.",
    ],
  },
  faqs: [
    {
      question: "Is this a real business loan quote?",
      answer:
        "No. This calculator gives an indicative estimate based on the amount, term and rate you enter. Your actual rate, fees and monthly repayment depend on the lender's assessment of your company's trading history, financial strength and security offered.",
    },
    {
      question: "What is the difference between amortising and interest-only repayment?",
      answer:
        "An amortising loan repays both interest and a portion of the capital every month, so the balance falls to zero by the end of the term. An interest-only loan only pays the interest each month, with the full principal due as one payment at the end, which lowers monthly outgoings but leaves a bullet repayment to plan for.",
    },
    {
      question: "Why is my company's rate higher than the headline rate advertised?",
      answer:
        "Advertised rates are usually the best rate available to the strongest applicants. Companies with a shorter trading history, lower turnover, or no security to offer typically pay a higher rate to reflect the lender's risk.",
    },
    {
      question: "Does the arrangement fee affect my monthly repayment?",
      answer:
        "It depends on the lender. Some add the fee to the loan amount you borrow (which increases the monthly repayment slightly), others deduct it from the amount you receive, and some invoice it separately. This calculator shows the fee as an additional cost on top of the repayment figures so you can see its full impact.",
    },
    {
      question: "Will I need to give a personal guarantee?",
      answer:
        "Many unsecured business loans to smaller or newer limited companies require a director's personal guarantee, meaning you become personally liable if the company cannot repay. Larger, established companies or loans secured against company assets are more likely to avoid this.",
    },
    {
      question: "Is loan interest tax-deductible?",
      answer:
        "Interest on a business loan used for business purposes is generally an allowable deduction against your company's profits for corporation tax, subject to the usual wholly-and-exclusively rules and any interest-restriction rules for larger borrowers. Check the specific treatment with your accountant.",
    },
  ],
  related: [
    { label: "Business Loans Guide", href: "/blog/business-finance/business-loans-guide" },
    { label: "Unsecured Business Loans", href: "/blog/business-finance/unsecured-business-loans" },
    { label: "Asset Finance Calculator", href: "/calculators/asset-finance-calculator" },
  ],
};
