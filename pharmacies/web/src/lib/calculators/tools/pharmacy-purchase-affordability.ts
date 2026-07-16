import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";

// SDLT non-residential bands (gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-use-rates, HP 12)
function sdltNonResidential(price: number): number {
  // Band 1: 0% on first £150,000
  // Band 2: 2% on £150,001 to £250,000
  // Band 3: 5% above £250,000
  const b2 = Math.max(0, Math.min(price, 250_000) - 150_000) * 0.02;
  const b3 = Math.max(0, price - 250_000) * 0.05;
  return b2 + b3;
}

// Stamp duty on share purchase: 0.5% of price (HP 12)
function stampDutyShares(price: number): number {
  return price * 0.005;
}

// Annuity repayment formula
function monthlyRepayment(principal: number, annualRate: number, termYears: number): number {
  if (annualRate === 0) return principal / (termYears * 12);
  const r = annualRate / 12;
  const n = termYears * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Corporation tax with marginal relief (HP 27)
// Single company, no associated companies assumed
function ctOnProfit(profit: number): number {
  if (profit <= 0) return 0;
  if (profit <= 50_000) return profit * 0.19;
  if (profit >= 250_000) return profit * 0.25;
  return profit * 0.25 - (3 / 200) * (250_000 - profit);
}

export const pharmacyPurchaseAffordability: GenericTool = {
  kind: "generic",
  slug: "pharmacy-purchase-affordability",
  name: "Pharmacy Purchase Affordability Calculator",
  category: "Buying a Pharmacy",
  oneLiner:
    "Estimate monthly loan repayments, post-tax cash cover, and the stamp duty or SDLT cost of buying a pharmacy on a share or asset deal for 2026/27.",
  metaTitle: "Pharmacy Purchase Affordability Calculator | Pharmacy Tax",
  metaDescription:
    "Estimate loan repayments and post-tax cash cover for buying a pharmacy. Compare share vs asset deal stamp duty and SDLT costs. 2026/27 scenario tool.",
  intro:
    "Enter the purchase price, deposit, loan terms and projected pharmacy profit to see your estimated loan repayments, how well trading cash flow covers the debt, and the acquisition tax cost for a share deal versus an asset deal. Figures are illustrative and the position on your deal will depend on its specific structure.",
  embedHeight: 600,
  fields: [
    {
      id: "purchasePrice",
      label: "Purchase price (£)",
      type: "currency",
      default: 400_000,
      min: 0,
      help: "The agreed headline price for the pharmacy. Pharmacies typically price on an adjusted EBITDA multiple or a pence-per-item benchmark; enter the actual figure from heads of terms.",
    },
    {
      id: "deposit",
      label: "Deposit / equity contribution (£)",
      type: "currency",
      default: 100_000,
      min: 0,
      help: "The amount you are putting in from your own funds. The rest is assumed to be financed by a commercial loan.",
    },
    {
      id: "loanTermYears",
      label: "Loan term (years)",
      type: "number",
      default: 25,
      min: 1,
      max: 30,
      step: 1,
      help: "Typical pharmacy acquisition finance runs 10 to 25 years. Shorter terms mean higher repayments but less total interest.",
    },
    {
      id: "annualInterestRate",
      label: "Annual interest rate (%)",
      type: "number",
      default: 6.5,
      min: 0,
      step: 0.1,
      help: "The rate quoted by the lender. Commercial pharmacy finance rates in 2026 have varied between approximately 5% and 8% depending on lender, term and loan-to-value.",
    },
    {
      id: "projectedAnnualProfit",
      label: "Projected annual pharmacy profit before tax (£)",
      type: "currency",
      default: 60_000,
      min: 0,
      help: "The adjusted EBITDA or trading profit you expect to generate after your salary. This is used to estimate post-tax cash available to service the loan.",
    },
  ],
  compute(v) {
    const price = Math.max(0, Number(v.purchasePrice));
    const deposit = Math.max(0, Number(v.deposit));
    const termYears = Math.max(1, Number(v.loanTermYears));
    const rate = Math.max(0, Number(v.annualInterestRate)) / 100;
    const profit = Math.max(0, Number(v.projectedAnnualProfit));

    const loanAmount = Math.max(0, price - deposit);
    const monthly = loanAmount > 0 ? monthlyRepayment(loanAmount, rate, termYears) : 0;
    const annualRepayment = monthly * 12;

    const ct = ctOnProfit(profit);
    const postTaxProfit = profit - ct;
    const coverRatio = annualRepayment > 0 ? postTaxProfit / annualRepayment : 0;

    const sdlt = sdltNonResidential(price);
    const shareDuty = stampDutyShares(price);
    const dutyDiff = sdlt - shareDuty;

    const complexityScore =
      (price > 500_000 ? 1 : 0) +
      (profit > 100_000 ? 1 : 0) +
      (coverRatio < 1.2 ? 1 : 0);
    const complexity = complexityScore >= 2 ? "high" : complexityScore === 1 ? "moderate" : "standard";

    return {
      headline: {
        label: "Estimated monthly loan repayment",
        value: gbp(monthly),
        sub: `${gbp(loanAmount)} loan over ${termYears} years at ${pct(rate * 100, 1)} per annum`,
        tone: coverRatio >= 1.5 ? "good" : coverRatio >= 1.0 ? "default" : "warn",
      },
      rows: [
        { label: "Purchase price", value: gbp(price) },
        { label: "Deposit", value: gbp(deposit) },
        { label: "Loan amount", value: gbp(loanAmount) },
        { label: "Monthly repayment (estimated)", value: gbp(monthly), strong: true },
        { label: "Annual repayment", value: gbp(annualRepayment) },
        { label: "Projected annual profit (pre-tax)", value: gbp(profit) },
        { label: "Corporation tax (estimated)", value: `${gbp(ct)}` },
        { label: "Post-tax profit available", value: gbp(postTaxProfit) },
        { label: "Post-tax cash cover ratio", value: `${coverRatio.toFixed(2)}x`, strong: true },
        { label: "--- Acquisition tax comparison ---", value: "" },
        { label: "Share deal: stamp duty (0.5%)", value: gbp(shareDuty) },
        { label: "Asset deal: SDLT non-residential (est.)", value: gbp(sdlt), strong: true },
        { label: "SDLT premium over share duty", value: gbp(dutyDiff) },
      ],
      note: `This is a scenario estimate, not a financial projection. Corporation tax uses the 2026/27 rates (19% up to £50,000 profits, 25% above £250,000, marginal relief in between) and assumes a single company with no associated companies. SDLT applies the non-residential bands (0% to £150,000, 2% from £150,001 to £250,000, 5% above). A share deal attracts 0.5% stamp duty on the share consideration but inherits the company's full history. Your deal has ${complexity} complexity. Speak to us before signing heads of terms.`,
    };
  },
  explainer: {
    heading: "How to assess pharmacy purchase affordability",
    paragraphs: [
      "Buying a pharmacy is almost always financed with a mix of equity and commercial acquisition lending. The repayment calculation uses the standard annuity formula: your loan amount, interest rate and term determine a fixed monthly payment that clears the debt over the chosen period. The key commercial test is whether post-tax trading profit comfortably covers those repayments, typically measured as a cash cover or debt service cover ratio.",
      "Corporation tax (at 2026/27 rates: 19% on profits up to £50,000, 25% on profits over £250,000, with marginal relief in between) reduces the cash available before you service the loan. A ratio above 1.5x means trading income comfortably exceeds repayments. Below 1.0x the deal needs additional working capital or a renegotiated structure. Most lenders want to see at least 1.25x on a pharmacy deal.",
      "The second structuring decision is share versus asset purchase. In a share deal you buy the company that holds the NHS contract and pay 0.5% stamp duty on the shares, but you inherit all of the company's history including any historic liabilities. In an asset deal you buy the NHS contract, goodwill and physical assets and pay SDLT on any property at non-residential rates (up to 5%), but you get a clean start. Goodwill dominates pharmacy pricing and corporation tax relief on purchased goodwill is restricted on a company acquisition, which is another reason deal structure matters early.",
    ],
  },
  faqs: [
    {
      question: "What is a good cash cover ratio for a pharmacy acquisition?",
      answer:
        "Most commercial lenders require at least 1.25x debt service cover on a pharmacy loan, meaning post-tax profit should be at least 1.25 times the annual repayment. A ratio above 1.5x gives more headroom for working capital, unexpected costs and rate rises. Below 1.0x the deal typically cannot support the debt on current trading alone.",
    },
    {
      question: "How is SDLT calculated on an asset purchase of a pharmacy?",
      answer:
        "Where a pharmacy is sold as an asset deal with property included, SDLT applies to the property element at non-residential rates: 0% on the first £150,000, 2% on the portion from £150,001 to £250,000, and 5% on anything above £250,000. The goodwill and non-property assets are outside SDLT. A share purchase avoids SDLT and pays 0.5% stamp duty on the share consideration instead, but inherits the company's history.",
    },
    {
      question: "Why does the calculator not show a valuation multiple or pence-per-item figure?",
      answer:
        "Pharmacy valuations use adjusted EBITDA multiples and pence-per-item benchmarks, but those benchmarks shift with market conditions and are deal-specific. Stating a figure without a current, cited broker source would be misleading. The calculator asks for the actual agreed price rather than deriving it from an invented multiple.",
    },
  ],
};
