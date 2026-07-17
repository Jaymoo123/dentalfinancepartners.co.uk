/**
 * Equity partner buy-in funding modeller.
 * Pure TypeScript, no React/window/document/fetch.
 *
 * Models three funding routes for an equity partner capital contribution:
 *   1. Personal loan (ITA 2007 s.398 qualifying loan interest relief applies)
 *   2. Firm-facilitated loan (interest deducted at firm level, reduces profit pool)
 *   3. Staged capital build from drawings (no interest; drawings reduce over staging period)
 *
 * FIGURES SOURCED (2026/27):
 *   - Income tax bands: personal allowance £12,570, basic threshold £50,270,
 *     additional rate threshold £125,140 (Finance Act 2023 s.6, confirmed gov.uk 2026-07-17).
 *   - PA taper: £1 withdrawn per £2 earned above £100,000 (ITEPA 2003 s.35).
 *   - ITA 2007 s.398: qualifying loan interest on a loan used to acquire an interest
 *     in a partnership is relievable at the borrower's marginal rate.
 *     Relief is given as a deduction from total income (not a tax reducer).
 *   - Firm-loan interest: not an ITA 2007 s.398 situation; interest paid by the
 *     partner on a firm-facilitated (firm-on-lent) loan reduces the firm's profit
 *     pool, so the effective saving is the partner's profit-share fraction of the
 *     interest cost, not a personal relief. Modelled as profit-pool reduction.
 *   - Staged-drawings route: no interest; partner directs a portion of annual
 *     drawings into their capital account over stagedYears.
 */

// ── Constants (2026/27) ──────────────────────────────────────────────────────

const PERSONAL_ALLOWANCE = 12_570;
const PA_TAPER_START     = 100_000;
const BASIC_RATE         = 0.20;
const HIGHER_RATE        = 0.40;
const ADDITIONAL_RATE    = 0.45;
const BASIC_THRESHOLD    = 50_270;
const ADDITIONAL_THRESHOLD = 125_140;

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Effective marginal income tax rate given taxable income (before relief). */
function marginalRate(taxableIncome: number): number {
  // PA tapers at £2 per £1 above £100,000 — effective 60% band between £100k-£125,140.
  // For relief sizing we want the actual marginal rate on the next £1 of income.
  if (taxableIncome > ADDITIONAL_THRESHOLD) return ADDITIONAL_RATE;
  if (taxableIncome > PA_TAPER_START && taxableIncome <= ADDITIONAL_THRESHOLD) {
    // Effective marginal 60% (basic 40% + 20% from PA withdrawal at 50p per £1)
    // ITA 2007 s.398 relief is given against total income, so it restores PA at the margin.
    return 0.60;
  }
  if (taxableIncome > BASIC_THRESHOLD) return HIGHER_RATE;
  if (taxableIncome > PERSONAL_ALLOWANCE) return BASIC_RATE;
  return 0;
}

/** Monthly repayment for an annuity loan (standard amortisation). */
function monthlyRepayment(principal: number, annualRate: number, termYears: number): number {
  if (annualRate === 0) return principal / (termYears * 12);
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/** Total interest paid over the full loan term. */
function totalInterest(principal: number, annualRate: number, termYears: number): number {
  const monthly = monthlyRepayment(principal, annualRate, termYears);
  return monthly * termYears * 12 - principal;
}

/** Approximate first-year interest on an amortising loan (slightly overstates; conservative). */
function firstYearInterest(principal: number, annualRate: number): number {
  return principal * (annualRate / 100);
}

// ── Public types ─────────────────────────────────────────────────────────────

export interface EquityPartnerBuyInInputs {
  /** Total capital contribution required by the firm (£). */
  buyInAmount: number;
  /** Indicative annual interest rate for loan routes (%). Default: 6.5. */
  loanInterestRate: number;
  /** Repayment term for loan routes (years). Default: 5. */
  loanTermYears: number;
  /** Partner's total annual drawings from the firm (£). */
  currentDrawings: number;
  /** Current profit-share % before buy-in (0 if not yet an equity partner). */
  currentProfitShare: number;
  /** Profit-share % to be received as equity partner after buy-in. */
  projectedProfitShare: number;
  /** Firm's annual profit pool (£) used to size profit-share uplift. */
  firmAnnualProfit: number;
  /** Partner's taxable income (£), used to determine marginal rate for ITA 2007 s.398 relief. */
  taxableIncome: number;
  /** Years over which to build capital from drawings (staged route). Default: 3. */
  stagedYears: number;
}

export interface FundingRouteResult {
  /** Monthly repayment (loan routes) or annual drawings reduction (staged route). */
  monthlyRepayment: number;
  /** Drawings reduction per year (staged route only). */
  annualDrawingsReduction: number;
  /** Total interest paid over the term (0 for staged route). */
  totalInterestPaid: number;
  /** Annual income tax relief on qualifying loan interest (ITA 2007 s.398; personal loan route only). */
  qualifyingLoanInterestRelief: number;
  /** Monthly net cost after tax relief. */
  monthlyNetCostAfterRelief: number;
  /** Human-readable summary of drawings impact. */
  drawingsImpact: string;
  /** Approximate years until profit-share uplift recovers total cost. */
  paybackHorizonYears: number;
  /** 0-100 score for ranking routes (higher = more favourable). */
  recommendationScore: number;
}

export interface EquityPartnerBuyInResults {
  capitalContribution: number;
  fundingRoutes: {
    personalLoan: FundingRouteResult;
    firmLoan: FundingRouteResult;
    stagedDrawings: FundingRouteResult;
  };
  /** Annual profit-share gain from current to projected rate (£). */
  profitShareUplift: number;
  /** Profit-share uplift minus annual personal-loan cost (net first-year position). */
  netFirstYearGain: number;
  bestRoute: "personalLoan" | "firmLoan" | "stagedDrawings";
  summary: string;
}

// ── Main function ─────────────────────────────────────────────────────────────

export function calculateEquityPartnerBuyIn(
  inputs: EquityPartnerBuyInInputs
): EquityPartnerBuyInResults {
  const {
    buyInAmount,
    loanInterestRate,
    loanTermYears,
    currentDrawings,
    currentProfitShare,
    projectedProfitShare,
    firmAnnualProfit,
    taxableIncome,
    stagedYears,
  } = inputs;

  const rate    = Math.max(0, loanInterestRate);
  const termYrs = Math.max(1, Math.min(30, loanTermYears));
  const staged  = Math.max(1, Math.min(10, stagedYears));

  // Profit-share uplift
  const currentShare   = (currentProfitShare   / 100) * firmAnnualProfit;
  const projectedShare = (projectedProfitShare / 100) * firmAnnualProfit;
  const profitShareUplift = Math.max(0, projectedShare - currentShare);

  // ── Route 1: Personal loan (ITA 2007 s.398 relief) ─────────────────────
  const plMonthly      = monthlyRepayment(buyInAmount, rate, termYrs);
  const plTotalInt     = totalInterest(buyInAmount, rate, termYrs);
  const plAnnualInt    = firstYearInterest(buyInAmount, rate);
  const marginal       = marginalRate(taxableIncome);
  // ITA 2007 s.398: relief on qualifying loan interest at marginal rate.
  // Cap at 60% marginal for PA-taper band (technically capped at tax payable, not modelled).
  const plRelief       = Math.min(plAnnualInt * marginal, plAnnualInt * 0.60);
  const plMonthlyRelief = plRelief / 12;
  const plNetMonthly   = plMonthly - plMonthlyRelief;
  const plAnnualCost   = plMonthly * 12;
  // Payback: total cost = total repayment (inc. interest); benefit = uplift
  const plPayback = profitShareUplift > 0
    ? (buyInAmount + plTotalInt) / profitShareUplift
    : 99;
  const plDrawingsImpact = `Monthly drawings reduce by roughly £${Math.round(plNetMonthly).toLocaleString("en-GB")} net of tax relief`;

  const personalLoan: FundingRouteResult = {
    monthlyRepayment:            Math.round(plMonthly * 100) / 100,
    annualDrawingsReduction:     Math.round(plAnnualCost),
    totalInterestPaid:           Math.round(plTotalInt),
    qualifyingLoanInterestRelief: Math.round(plRelief),
    monthlyNetCostAfterRelief:   Math.round(plNetMonthly * 100) / 100,
    drawingsImpact:              plDrawingsImpact,
    paybackHorizonYears:         Math.round(plPayback * 10) / 10,
    recommendationScore:         0, // set after comparison
  };

  // ── Route 2: Firm-facilitated loan ──────────────────────────────────────
  // Interest reduces the firm's profit pool; partner's share of the interest
  // saving is their profit-share fraction. No ITA 2007 s.398 relief.
  const flMonthly     = monthlyRepayment(buyInAmount, rate, termYrs);
  const flTotalInt    = totalInterest(buyInAmount, rate, termYrs);
  const flAnnualInt   = firstYearInterest(buyInAmount, rate);
  // Firm deducts interest from pool; partner's share of that cost
  const partnerFraction = projectedProfitShare / 100;
  const flPartnerAnnualCostShare = flAnnualInt * partnerFraction;
  const flNetMonthly  = flMonthly - (flPartnerAnnualCostShare / 12);
  const flPayback = profitShareUplift > 0
    ? (buyInAmount + flTotalInt) / profitShareUplift
    : 99;
  const flDrawingsImpact = `Effective monthly cost after your profit-share fraction of firm interest deduction is roughly £${Math.round(flNetMonthly).toLocaleString("en-GB")}`;

  const firmLoan: FundingRouteResult = {
    monthlyRepayment:            Math.round(flMonthly * 100) / 100,
    annualDrawingsReduction:     Math.round(flMonthly * 12),
    totalInterestPaid:           Math.round(flTotalInt),
    qualifyingLoanInterestRelief: 0, // not applicable (firm deducts)
    monthlyNetCostAfterRelief:   Math.round(flNetMonthly * 100) / 100,
    drawingsImpact:              flDrawingsImpact,
    paybackHorizonYears:         Math.round(flPayback * 10) / 10,
    recommendationScore:         0,
  };

  // ── Route 3: Staged capital build from drawings ──────────────────────────
  const annualDrawingsDiverted = Math.round(buyInAmount / staged);
  const sdMonthly = annualDrawingsDiverted / 12;
  // No interest cost; opportunity cost is the net-of-tax lost earnings on that cash
  // (approximated as the diverted amount; we show it without attempting to model investment)
  const sdPayback = profitShareUplift > 0
    ? staged + (buyInAmount / profitShareUplift)
    : 99;
  const sdDrawingsImpact = `Drawings reduce by £${annualDrawingsDiverted.toLocaleString("en-GB")} per year for ${staged} year${staged !== 1 ? "s" : ""} while capital builds`;

  const stagedDrawings: FundingRouteResult = {
    monthlyRepayment:            0,
    annualDrawingsReduction:     annualDrawingsDiverted,
    totalInterestPaid:           0,
    qualifyingLoanInterestRelief: 0,
    monthlyNetCostAfterRelief:   Math.round(sdMonthly * 100) / 100,
    drawingsImpact:              sdDrawingsImpact,
    paybackHorizonYears:         Math.round(sdPayback * 10) / 10,
    recommendationScore:         0,
  };

  // ── Recommendation scoring ───────────────────────────────────────────────
  // Lower net monthly cost = better. Lower payback = better.
  const routes = [
    { key: "personalLoan" as const, r: personalLoan },
    { key: "firmLoan"     as const, r: firmLoan     },
    { key: "stagedDrawings" as const, r: stagedDrawings },
  ];

  // Normalise net monthly cost (lower = higher score)
  const costs = routes.map((x) => x.r.monthlyNetCostAfterRelief);
  const maxCost = Math.max(...costs);
  const minCost = Math.min(...costs);
  const costRange = maxCost - minCost || 1;

  const paybacks = routes.map((x) => x.r.paybackHorizonYears);
  const maxPb  = Math.min(Math.max(...paybacks), 99);
  const minPb  = Math.min(...paybacks);
  const pbRange = maxPb - minPb || 1;

  for (const { r } of routes) {
    const costScore = ((maxCost - r.monthlyNetCostAfterRelief) / costRange) * 60;
    const pbScore   = ((maxPb - Math.min(r.paybackHorizonYears, 99)) / pbRange) * 40;
    r.recommendationScore = Math.round(costScore + pbScore);
  }

  const best = routes.reduce((a, b) =>
    a.r.recommendationScore >= b.r.recommendationScore ? a : b
  ).key;

  const netFirstYearGain = profitShareUplift - plAnnualCost;

  const routeLabels: Record<typeof best, string> = {
    personalLoan:    "personal loan with ITA 2007 s.398 interest relief",
    firmLoan:        "firm-facilitated loan",
    stagedDrawings:  "staged capital build from drawings",
  };

  const summary =
    profitShareUplift > 0
      ? `At ${projectedProfitShare}% of a £${firmAnnualProfit.toLocaleString("en-GB")} profit pool, ` +
        `equity partnership adds £${Math.round(profitShareUplift).toLocaleString("en-GB")} per year. ` +
        `The most cost-effective route for your inputs is the ${routeLabels[best]}.`
      : `Enter your projected profit share and firm profit pool to compare funding routes.`;

  return {
    capitalContribution: buyInAmount,
    fundingRoutes: { personalLoan, firmLoan, stagedDrawings },
    profitShareUplift: Math.round(profitShareUplift),
    netFirstYearGain:  Math.round(netFirstYearGain),
    bestRoute: best,
    summary,
  };
}
