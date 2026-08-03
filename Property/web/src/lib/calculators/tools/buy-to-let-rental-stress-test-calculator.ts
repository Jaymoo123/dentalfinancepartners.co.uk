import type { GenericTool } from "../types";
import { gbp } from "../format";

export const buyToLetRentalStressTestCalculator: GenericTool = {
  kind: "generic",
  slug: "buy-to-let-rental-stress-test-calculator",
  name: "Buy-to-Let Stress Test Calculator",
  category: "Property Finance",
  oneLiner: "See the maximum loan a rental's income supports, using a lender's stress rate and interest cover ratio.",
  metaTitle: "BTL Stress Test Calculator | Maximum Loan (UK)",
  metaDescription:
    "Free buy-to-let stress test calculator. See the maximum loan a rental's rent supports at a lender's stress rate and interest cover ratio (ICR).",
  intro:
    "See the maximum loan a rental's rent supports at a given stress rate and interest cover ratio, or test a specific loan amount.",
  ctaLabel: "Plan the tax around your borrowing →",
  embedHeight: 660,
  fields: [
    { id: "monthlyRent", label: "Monthly rent", type: "currency", default: 1_200, step: 50 },
    {
      id: "stressRate",
      label: "Stress rate",
      type: "number",
      default: 5.5,
      step: 0.1,
      suffix: "%",
      help: "Lender notional rate, often around 5.5%, or the pay rate plus 2%.",
    },
    {
      id: "icrRatio",
      label: "Interest cover ratio (ICR) required",
      type: "select",
      default: "125",
      options: [
        { value: "125", label: "125% (company / basic-rate)" },
        { value: "145", label: "145% (higher-rate individual)" },
      ],
    },
    {
      id: "targetLoan",
      label: "Loan amount to test",
      type: "currency",
      default: 0,
      step: 5_000,
      help: "Optional: enter a loan to test it; leave 0 to see the maximum.",
      advanced: true,
    },
  ],
  compute: (v) => {
    const monthlyRent = Number(v.monthlyRent);
    const stressRate = Number(v.stressRate);
    const targetLoan = Number(v.targetLoan);
    const icr = Number(v.icrRatio) / 100;
    const sr = stressRate / 100;

    const annualRent = monthlyRent * 12;
    const maxAnnualInterest = icr > 0 ? annualRent / icr : 0;
    const maxLoan = sr > 0 ? maxAnnualInterest / sr : 0;

    const rows = [
      { label: "Annual rent", value: gbp(annualRent) },
      { label: "Stress rate", value: `${stressRate.toFixed(2)}%` },
      { label: "ICR required", value: `${(icr * 100).toFixed(0)}%` },
      { label: "Maximum indicative loan", value: gbp(maxLoan), strong: targetLoan <= 0 },
    ];

    if (targetLoan > 0) {
      const annualInterestAtTarget = targetLoan * sr;
      const actualICR = annualInterestAtTarget > 0 ? annualRent / annualInterestAtTarget : 0;
      const pass = actualICR >= icr;
      rows.push(
        { label: "Actual ICR at this loan", value: `${(actualICR * 100).toFixed(0)}%`, strong: true },
        { label: "Result", value: pass ? "Pass" : "Fail", strong: true },
      );
      return {
        headline: {
          label: "Loan tested",
          value: gbp(targetLoan),
          tone: pass ? "good" : "warn",
          sub: pass ? "Clears the stress test" : "Fails the stress test",
        },
        rows,
        verdict: { text: pass ? "Passes the lender's stress test" : "Fails the lender's stress test", positive: pass },
        note: "Lenders vary the stress rate and the ICR required by product, tax band and whether the mortgage is personal or via a company. A 5-year fixed rate is often stressed at a lower rate than a variable deal. This is an estimate only, not a quote or an offer of finance.",
      };
    }

    return {
      headline: { label: "Maximum indicative loan", value: gbp(maxLoan) },
      rows,
      note: "Lenders vary the stress rate and the ICR required by product, tax band and whether the mortgage is personal or via a company. A 5-year fixed rate is often stressed at a lower rate than a variable deal. This is an estimate only, not a quote or an offer of finance.",
    };
  },
  explainer: {
    heading: "How the buy-to-let stress test works",
    paragraphs: [
      "Before offering a buy-to-let mortgage, lenders check that the rent would still cover the interest payment at a higher notional rate, not just the rate you are actually paying. This protects against rates rising and against the loan being unaffordable if the true pay rate proves optimistic.",
      "The check compares annual rent against annual interest at the stress rate, expressed as the interest cover ratio, or ICR. A lender might require 125% cover for a limited company or basic-rate taxpayer, and a higher 145% for an individual higher-rate taxpayer, because Section 24 leaves less of the rent available after tax.",
      "The maximum loan a property supports is therefore driven by the rent, not just the property value or your deposit. A high-value property with modest rent can be stress-test constrained long before it reaches a normal loan-to-value limit.",
    ],
  },
  faqs: [
    {
      question: "Why do lenders use a higher stress rate than the actual mortgage rate?",
      answer:
        "To check the rent would still cover the interest if rates rise, or if the pay rate on offer changes. It builds in a margin of safety rather than assuming today's rate holds for the whole term.",
    },
    {
      question: "Why is the ICR higher for individual higher-rate taxpayers?",
      answer:
        "Because Section 24 restricts mortgage interest relief to a basic-rate credit for individual landlords, more of the rent is needed to cover tax as well as the mortgage, so lenders ask for a bigger buffer, often 145% rather than 125%.",
    },
    {
      question: "Does passing the stress test mean the lender will offer the loan?",
      answer:
        "Not on its own. It shows the loan clears one common affordability hurdle. Lenders also assess the property, your income, credit history, deposit and their own criteria before making an offer.",
    },
  ],
};
