import type { GenericTool } from "../types";
import { gbp, pct } from "../format";

/**
 * Buy-to-let mortgage payment, from the two figures a searcher actually holds:
 * the price and their deposit. The loan and the LTV are OUTPUTS, not inputs.
 *
 * Structural decisions (briefs/property/tools/_teardown.md §7):
 *  - Interest-only AND capital repayment are both computed and shown together.
 *    No select. One page then answers the repayment / interest-only / generic
 *    variants of the head term instead of hiding two of them behind a control.
 *  - Total paid over the term is shown for both bases, because the contrast
 *    (£246,094 owing £187,500 vs £337,077 owing nothing) is the real decision.
 *  - Rent is optional and drives the rental-cover rows lenders use (125/145%).
 *
 * Rate honesty (HANDOFF Phase B mandate): the interest rate is a USER KNOB with
 * a stated default and a source note. No rate is asserted as a house position;
 * house_positions.md carries no mortgage-rate figure and must not be made to.
 * Fix round 2026-08-21: the 5.25% default is framed as a PLACEHOLDER everywhere.
 * No market-rate band (the old "4.5% to 6%") is stated as fact on this page,
 * and no forward rate is asserted, because neither carries a source we hold.
 *
 * Hyphenation is deliberately split: `name` and `metaTitle` carry the
 * unhyphenated "Buy to Let" exact-match head term, while body prose uses the
 * house "buy-to-let". Editorial QA 2026-08-21 flagged the split; it is kept.
 *
 * Derivations behind every figure quoted in the copy (loan £187,500 = £250,000
 * price less a £62,500 deposit, 5.25%, 25 years, n = 300):
 *   interest-only monthly = 187500 * 0.0525 / 12          = 820.3125   -> £820
 *   repayment monthly     = P*r*(1+r)^n / ((1+r)^n - 1)
 *                           r = 0.0525/12 = 0.004375, n = 300          -> £1,124
 *                           (1123.5895)
 *   interest-only total   = 820.3125 * 300                = 246,093.75 -> £246,094
 *   repayment total       = 1123.5895 * 300               = 337,076.84 -> £337,077
 *   repayment interest    = 337,076.84 - 187,500          = 149,576.84 -> £149,577
 *   monthly difference    = 1123.5895 - 820.3125          = 303.28     -> £303
 *   LTV                   = 187500 / 250000               = 75.0%
 *   rental cover at £1,250 rent = 1250 / 820.3125         = 152.38%    -> 152.4%
 *   rent for 125% cover   = 820.3125 * 1.25               = 1,025.39   -> £1,025
 *   rent for 145% cover   = 820.3125 * 1.45               = 1,189.45   -> £1,189
 */

/** ICR levels lenders commonly apply. Company / basic-rate, then higher-rate. */
const ICR_LOW = 1.25;
const ICR_HIGH = 1.45;

/** Standard annuity payment. mr = 0 degenerates to straight-line capital. */
function repaymentMonthly(loan: number, mr: number, n: number): number {
  if (n <= 0 || loan <= 0) return 0;
  if (mr === 0) return loan / n;
  return (loan * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
}

export const buyToLetMortgageCalculator: GenericTool = {
  kind: "generic",
  slug: "buy-to-let-mortgage-calculator",
  name: "Buy to Let Mortgage Calculator",
  category: "Property Finance",
  oneLiner:
    "Enter the price and your deposit and see what a buy-to-let mortgage costs you each month, interest-only and capital repayment side by side.",
  metaTitle: "Buy to Let Mortgage Calculator | Interest-Only and Repayment",
  metaDescription:
    "Free buy to let mortgage calculator. Price and deposit in, monthly cost out on interest-only and repayment terms, plus the loan, LTV and rent cover.",
  intro:
    "Enter the price and the deposit you are putting in. You get the loan, the LTV and the monthly payment on both interest-only and capital repayment terms, one under the other. Add the rent and you also see the cover a lender will look for.",
  ctaLabel: "Check the tax on the rent →",
  embedHeight: 900,
  fields: [
    {
      id: "propertyValue",
      label: "Property price",
      type: "currency",
      default: 250_000,
      step: 5_000,
      help: "What you are paying, or the lender's valuation if that comes in lower.",
    },
    {
      id: "deposit",
      label: "Deposit",
      type: "currency",
      default: 62_500,
      step: 2_500,
      help: "The cash you are putting in. The calculator turns it into the loan and the LTV for you. Most buy-to-let lenders want at least 25% of the price, so £62,500 on a £250,000 flat is the usual starting point.",
    },
    {
      id: "annualRate",
      label: "Interest rate",
      type: "number",
      default: 5.25,
      step: 0.05,
      suffix: "%",
      help: "This one is a knob, not a quote. The 5.25% here is a placeholder to give you a starting figure, not a reading of the market. Set it to the rate on your own deal, or to the rate on the deals you are seeing today. It moves with the fix length, the LTV and whether the lender charges a percentage fee or a flat one.",
    },
    {
      id: "termYears",
      label: "Mortgage term (years)",
      type: "number",
      default: 25,
      step: 1,
      min: 5,
      max: 40,
      help: "The term only changes the repayment figure. An interest-only payment is the same in year one and year twenty-five, because the balance never moves.",
    },
    {
      id: "monthlyRent",
      label: "Monthly rent (optional)",
      type: "currency",
      default: 1_250,
      step: 50,
      help: "The rent you expect to achieve. Enter it and you get the rental cover rows lenders use to size the loan. Leave it at 0 to skip them.",
    },
  ],
  compute: (v) => {
    const propertyValue = Math.max(0, Number(v.propertyValue));
    const deposit = Math.max(0, Number(v.deposit));
    const annualRate = Number(v.annualRate);
    const termYears = Math.max(0, Number(v.termYears));
    const monthlyRent = Math.max(0, Number(v.monthlyRent));

    const loan = Math.max(0, propertyValue - deposit);
    const ltv = propertyValue > 0 ? (loan / propertyValue) * 100 : 0;
    const depositShare = propertyValue > 0 ? (deposit / propertyValue) * 100 : 0;

    const mr = annualRate / 100 / 12;
    const n = Math.round(termYears * 12);

    const interestOnly = loan * mr;
    const repayment = repaymentMonthly(loan, mr, n);
    const interestOnlyTotal = interestOnly * n;
    const repaymentTotal = repayment * n;
    const repaymentInterest = Math.max(0, repaymentTotal - loan);

    const rows = [
      { label: `Loan amount, ${gbp(propertyValue)} less your ${gbp(deposit)} deposit`, value: gbp(loan), strong: true },
      { label: "Deposit as a share of the price", value: pct(depositShare) },
      { label: "Loan to value (LTV), the loan divided by the price", value: pct(ltv) },
      { label: `Interest-only, ${gbp(loan)} at ${pct(annualRate, 2)} a year`, value: `${gbp(interestOnly)} a month`, strong: true },
      { label: `Capital repayment over ${termYears} years`, value: `${gbp(repayment)} a month`, strong: true },
      { label: "Extra each month to repay the capital as well", value: gbp(Math.max(0, repayment - interestOnly)) },
      { label: `Total paid over ${termYears} years, interest-only`, value: gbp(interestOnlyTotal) },
      { label: "Still owed at the end on interest-only", value: gbp(loan) },
      { label: `Total paid over ${termYears} years, capital repayment`, value: gbp(repaymentTotal) },
      { label: `Interest paid over ${termYears} years, capital repayment`, value: gbp(repaymentInterest) },
    ];

    if (monthlyRent > 0) {
      const cover = interestOnly > 0 ? (monthlyRent / interestOnly) * 100 : 0;
      rows.push(
        {
          label: `Rental cover, ${gbp(monthlyRent)} rent against the interest at ${pct(annualRate, 2)}`,
          value: pct(cover),
          strong: true,
        },
        { label: "Rent needed for 125% cover at this rate", value: `${gbp(interestOnly * ICR_LOW)} a month` },
        { label: "Rent needed for 145% cover at this rate", value: `${gbp(interestOnly * ICR_HIGH)} a month` },
      );
    }

    return {
      headline: {
        label: "Interest-only monthly payment",
        value: gbp(interestOnly),
        sub: `${gbp(loan)} borrowed at ${pct(annualRate, 2)}. On capital repayment over ${termYears} years it is ${gbp(repayment)} a month.`,
      },
      rows,
      note:
        "The rate is your input, not a live quote. The default is a placeholder, so put in the rate you have been offered or the rate on the deals in front of you today. The cover figures use the rate you entered, while a lender tests the rent at a higher notional stress rate of its own, which is what the stress test calculator is for. This is an estimate for comparison, not a quote or an offer of finance.",
    };
  },
  explainer: {
    heading: "How is a buy-to-let mortgage payment worked out?",
    paragraphs: [
      "You start with the price and your deposit, because those are the two numbers you already hold. Everything else falls out of them. On a £250,000 flat with a £62,500 deposit you are borrowing £187,500, which is 75% loan to value. At 5.25% that loan runs up £187,500 x 5.25% = £9,844 of interest a year, and £9,844 divided by 12 is £820 a month on interest-only terms. The same loan on capital repayment over 25 years costs £1,124 a month, because every payment also chips a piece off the balance.",
      "Those two figures are the whole decision, and the totals show why. Interest-only leaves £303 a month in your pocket. Over 25 years you hand the lender £246,094 and still owe the original £187,500 at the end. Capital repayment costs you £337,077 over the same 25 years and leaves you owning the flat outright. So you are not choosing between a cheap option and an expensive one. You are choosing between a lower cost now and a debt that is still there later. Most landlords take the lower cost and plan the exit separately.",
      "Change the rate before you trust any of it. Four things decide where your own deal lands. How long you fix for. Your LTV, because lenders price in bands. Whether the arrangement fee is a percentage of the loan or a flat amount. And whether you borrow personally or through a company. Move the rate by a quarter of a point and watch the monthly figure move with it. Then run it a point or two above the rate you have been offered and see whether the deal still works, because nobody can tell you where rates sit on the day your fix ends.",
      "The rent then decides how much you can borrow at all. Put £1,250 a month in and the calculator sets it against the £820 of interest, which is 152.4% cover. Lenders want 125% or 145% depending on who is borrowing. They also test it at an invented higher rate instead of the one you are paying, so a loan that looks comfortable here can still be trimmed. One tax point changes the picture for a personal landlord. Your mortgage interest no longer comes off your rental profit. It earns a basic-rate credit instead under Section 24, so a higher-rate taxpayer keeps less of that rent than the cover figure suggests. Does the deal still work once you have taken that off? That is the number worth having before you decide whether to buy in your own name or through a company.",
    ],
  },
  faqs: [
    {
      question: "Should a buy-to-let mortgage be interest-only or capital repayment?",
      answer:
        "Most landlords go interest-only, and the figures show why. On a £187,500 loan at 5.25% you pay £820 a month interest-only, against £1,124 on repayment over 25 years. That is £303 a month of rent you keep rather than lock into the property. The catch is that the £187,500 is still owed on the last day of the term. You need a plan for it: sell the flat, remortgage again, or overpay when a fix allows. Repayment suits you if you want the debt gone by retirement and the rent covers the higher payment comfortably.",
    },
    {
      question: "How much can I borrow on a buy-to-let mortgage?",
      answer:
        "The rent decides it far more than your salary does. Lenders call this the BTL rental cover test, and it works like this: a lender divides the rent by the interest at its stress rate. It wants at least 125% for a company or a basic-rate taxpayer, and 145% for a higher-rate taxpayer. On £1,250 of rent, the stressed monthly interest has to stay under about £1,000 to clear 125%, and under about £862 to clear 145%. That test uses a notional rate above the one you pay. So the maximum loan is usually smaller than your deposit alone would allow, and the stress test calculator sizes it properly.",
    },
    {
      question: "What deposit do you need for a buy-to-let mortgage?",
      answer:
        "Plan on at least 25% of the price. That is £62,500 on a £250,000 flat, and it puts you at 75% LTV. Some lenders will go to 80%, and the rate is usually worse there because they take more risk. Push your deposit to 40% and you drop to 60% LTV, where the keenest rates tend to sit. The smaller payment also makes the rental cover test easier to pass. The deposit is not the only cash you need on day one either. Stamp duty, legal fees, a survey and the lender's arrangement fee come out of the same pot.",
    },
    {
      question: "What does LTV mean on a buy-to-let mortgage?",
      answer:
        "LTV is loan to value, the loan expressed as a percentage of the property price. Borrow £187,500 against a £250,000 flat and your LTV is 75%, because 187,500 divided by 250,000 is 0.75. Lenders price in bands, so 74.9% and 75.1% can sit in different rate brackets. If you are just the wrong side of a round number, adding a little to your deposit pays for itself. Falling property values push your LTV up without you doing anything, which is what makes remortgaging harder after a price dip.",
    },
    {
      question: "Can a limited company get a buy-to-let mortgage?",
      answer:
        "Yes, and company borrowing is now a mainstream route rather than a niche one. The mechanics are the ones this calculator models: a deposit, a loan, a rate and a term, with the payment worked out identically. What differs is the market around it. Fewer lenders play in it, most want a personal guarantee from the directors, and the cover test is often set at 125% instead of 145%. Company rates and fees have tended to sit above the personal equivalents. Compare the deals you are offered on both sides before you assume either structure wins on cost.",
    },
    {
      question: "Will a lender offer me the payment this calculator shows?",
      answer:
        "Treat it as the shape of the answer rather than a quote. The arithmetic is exactly what a lender uses, so if the rate and term you enter match your offer, the monthly figure matches too. What it cannot see is the lender's own view of you. Your income, your existing borrowing and your credit file all count. So does the property type, the stress rate applied to the rent, and the fee added to the loan. Get a decision in principle before you rely on any figure.",
    },
  ],
  workedExamples: [
    {
      // loan = 250,000 - 62,500 = 187,500; LTV = 75.0%
      // io  = 187,500 * 0.0525 / 12 = 820.3125
      // rep = 187,500 * 0.004375 * 1.004375^300 / (1.004375^300 - 1) = 1,123.5895
      // io total  = 820.3125 * 300  = 246,093.75
      // rep total = 1,123.5895 * 300 = 337,076.84; interest = 149,576.84
      // cover = 1,250 / 820.3125 = 152.38%
      heading: "A £250,000 flat with a 25% deposit at 5.25%",
      inputs: "Price £250,000, deposit £62,500, rate 5.25%, term 25 years, rent £1,250 a month",
      steps: [
        "Loan = £250,000 - £62,500 = £187,500, so the LTV is 187,500 / 250,000 = 75.0%",
        "Interest-only = £187,500 x 5.25% = £9,843.75 a year, divided by 12 = £820 a month",
        "Capital repayment over 300 months at 0.4375% a month = £1,124 a month",
        "Over 25 years interest-only costs £820.31 x 300 = £246,094, and the £187,500 is still owed",
        "Over 25 years repayment costs £1,123.59 x 300 = £337,077, of which £149,577 is interest, and nothing is owed at the end",
        "Rental cover = £1,250 / £820.31 = 152.4%, comfortably above 145% at the rate you are paying, though the lender will test it higher",
      ],
    },
    {
      // Same flat, 40% deposit: loan = 150,000; LTV = 60.0%
      // io  = 150,000 * 0.0525 / 12 = 656.25
      // rep = 898.8716; totals 196,875.00 and 269,661.47 (interest 119,661.47)
      // cover = 1,250 / 656.25 = 190.48%
      heading: "The same flat with a 40% deposit",
      inputs: "Price £250,000, deposit £100,000, rate 5.25%, term 25 years, rent £1,250 a month",
      steps: [
        "Loan = £250,000 - £100,000 = £150,000, so the LTV is 60.0%",
        "Interest-only = £150,000 x 5.25% = £7,875 a year, divided by 12 = £656 a month",
        "Capital repayment over 300 months = £899 a month",
        "Over 25 years interest-only costs £196,875 and repayment costs £269,661, of which £119,661 is interest",
        "Rental cover = £1,250 / £656.25 = 190.5%, so the rent is no longer the constraint on the loan",
        "The extra £37,500 of deposit buys you £164 a month of interest and moves you into a lower LTV band, where rates are usually keener",
      ],
    },
  ],
  related: [
    { label: "Buy-to-let stress test calculator: the maximum loan your rent supports", href: "/calculators/buy-to-let-rental-stress-test-calculator" },
    { label: "Buy-to-let cashflow calculator: what is left after the mortgage", href: "/calculators/buy-to-let-cashflow-calculator" },
    { label: "Rental yield calculator: gross and net yield on the purchase", href: "/calculators/rental-yield-calculator" },
    { label: "Rental income tax calculator: the tax on the rent", href: "/calculators/rental-income-tax-calculator" },
    { label: "Section 24 calculator: what the interest restriction costs you", href: "/calculators/section-24-calculator" },
    { label: "Stamp duty calculator: the surcharge on a buy-to-let purchase", href: "/calculators/stamp-duty-calculator" },
  ],
};
