import type { GenericTool } from "../types";
import { gbp } from "../format";

export const bridgingLoanCalculator: GenericTool = {
  kind: "generic",
  slug: "bridging-loan-calculator",
  name: "Bridging Loan Calculator",
  category: "Property Finance",
  oneLiner: "Estimate the total cost of a bridging loan, interest, arrangement fee and exit fee, over the term.",
  metaTitle: "Bridging Loan Calculator | Total Cost of Finance",
  metaDescription:
    "Free bridging loan calculator. Estimate the total cost of a bridging loan, interest, arrangement fee and exit fee, over the term of the loan.",
  intro: "Estimate the total cost of a bridging loan, interest plus fees, over the term.",
  ctaLabel: "Is bridging interest tax deductible? →",
  embedHeight: 640,
  fields: [
    { id: "loanAmount", label: "Loan amount", type: "currency", default: 150_000, step: 5_000 },
    {
      id: "monthlyRatePct",
      label: "Monthly interest rate",
      type: "number",
      default: 0.85,
      step: 0.05,
      suffix: "%",
      help: "Monthly interest rate, typically around 0.55% to 1%.",
    },
    { id: "termMonths", label: "Term", type: "number", default: 12, step: 1 },
    { id: "arrangementFeePct", label: "Arrangement fee", type: "number", default: 2, step: 0.25, suffix: "%" },
    {
      id: "exitFeePct",
      label: "Exit fee",
      type: "number",
      default: 0,
      step: 0.25,
      suffix: "%",
      advanced: true,
    },
  ],
  compute: (v) => {
    const loanAmount = Number(v.loanAmount);
    const monthlyRatePct = Number(v.monthlyRatePct);
    const termMonths = Number(v.termMonths);
    const arrangementFeePct = Number(v.arrangementFeePct);
    const exitFeePct = Number(v.exitFeePct);

    const monthlyInterest = (loanAmount * monthlyRatePct) / 100;
    const totalInterest = monthlyInterest * termMonths;
    const arrangementFee = (loanAmount * arrangementFeePct) / 100;
    const exitFee = (loanAmount * exitFeePct) / 100;
    const totalCost = totalInterest + arrangementFee + exitFee;
    const totalRepay = loanAmount + totalCost;

    return {
      headline: { label: "Total cost of finance", value: gbp(totalCost) },
      rows: [
        { label: "Monthly interest", value: gbp(monthlyInterest) },
        { label: "Total interest over the term", value: gbp(totalInterest) },
        { label: "Arrangement fee", value: gbp(arrangementFee) },
        { label: "Exit fee", value: gbp(exitFee) },
        { label: "Total to repay", value: gbp(totalRepay), strong: true },
      ],
      note: "Rolled-up interest often compounds month on month, so the real cost can run slightly higher than this simple estimate. Bridging is short-term business finance, and the interest may be an allowable finance cost, see our guide to bridging loan interest and tax. This is an estimate only, not a quote or an offer of finance.",
    };
  },
  explainer: {
    heading: "What a bridging loan actually costs",
    paragraphs: [
      "Bridging finance is priced monthly, not annually, because it is designed to be short-term, often covering a chain break, an auction purchase, or works before refinancing onto a standard mortgage. A rate that looks small, well under 1% a month, adds up quickly over a 12-month term.",
      "The headline rate is only part of the cost. Most bridging loans also carry an arrangement fee, typically 1.5% to 2% of the loan, and sometimes an exit fee on top. Interest is frequently rolled up and added to the loan rather than paid monthly, which means it compounds, so the true cost can be a little higher than a simple multiplication of rate and term.",
      "Because bridging is treated as short-term business finance rather than a personal mortgage, the interest cost is often relevant to how the eventual profit or rental income is taxed, so it is worth working out the tax position alongside the raw cost of the loan.",
    ],
  },
  faqs: [
    {
      question: "Why is bridging finance so much more expensive than a mortgage?",
      answer:
        "It is priced for speed and short-term risk, not long-term affordability. Lenders can complete in days or weeks with less scrutiny of ongoing income, and the loan is expected to be repaid or refinanced within months, both of which push the rate up compared with a standard mortgage.",
    },
    {
      question: "Does rolled-up interest change the total cost?",
      answer:
        "Yes. If interest is rolled up and added to the balance each month rather than paid off, you pay interest on interest, so the true cost runs a little above a simple rate times term calculation, especially over a longer bridging term.",
    },
    {
      question: "Is bridging loan interest tax deductible?",
      answer:
        "Often yes, where the loan is for business or investment purposes, but the treatment depends on what the loan is for and how the property is held. See our guide to bridging loan interest and tax for the detail.",
    },
  ],
};
