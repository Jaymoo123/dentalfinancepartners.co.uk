/**
 * Landlord rental-profit & income-tax math — the pure, reusable model shared by
 * the premium "Landlord tax essentials" tool, the Excel model builder and the
 * golden check, so the three can never disagree.
 *
 * This is a fuller version of the existing rental-income-tax-calculator
 * (lib/calculators/tools/rental-income-tax-calculator.ts): it adds the personal
 * allowance, the basic/higher/additional BANDS (so a large profit can span
 * bands), the £100,000 personal-allowance taper, the £1,000 property allowance
 * election and a multi-property total. It deliberately REUSES the Section 24
 * reducer rates from lib/section24.ts so the finance-cost credit can never drift
 * from the Section 24 tool / page.
 *
 * Ground truth — docs/property/house_positions.md:
 *  - §4 / §7: individual residential landlords cannot deduct mortgage interest;
 *    a basic-rate finance-cost tax REDUCER is given (20% for 2026/27, 22% from
 *    2027/28 — FA 2026), capped at the lower of (a) the credit rate × finance
 *    costs and (b) the credit rate × rental profit before finance costs. (The
 *    third cap — credit rate × adjusted total income — is modelled here using the
 *    landlord's total taxable income above the personal allowance, which this
 *    tool DOES see once you enter your other income.)
 *  - §7: for 2026/27 property income uses the standard 20/40/45 bands; from
 *    2027/28 (England, Wales & NI; Scotland excluded) property income is taxed at
 *    22/42/47, and the reducer tracks the 22% property basic rate.
 *  - The £1,000 PROPERTY ALLOWANCE: full relief if gross property income ≤ £1,000
 *    (no tax, no need to declare); otherwise you may deduct £1,000 INSTEAD of your
 *    actual expenses (partial relief) where that is better. You cannot use the
 *    allowance and also deduct expenses.
 *
 * IMPORTANT: this is a SINGLE-source income-tax model for the landlord. It taxes
 * the rental profit ON TOP of the "other taxable income" the user supplies, which
 * is why it can place the profit in the right band(s) and apply the £100k taper.
 * It is general guidance, not advice; see the on-tool notes.
 */
import { reducerRateFor, type TaxYear } from "./section24";

export type { TaxYear };

/* ---------------------------------------------------------------------------
 * Locked income-tax constants (England, Wales & NI; 2026/27 frozen thresholds).
 * The personal allowance and band thresholds are the long-frozen UK figures.
 * ------------------------------------------------------------------------- */

/** Standard personal allowance (frozen). */
export const PERSONAL_ALLOWANCE = 12_570;
/** Income at which the personal-allowance taper begins. */
export const PA_TAPER_START = 100_000;
/** Income at which the personal allowance is fully withdrawn (£100k + 2×£12,570). */
export const PA_TAPER_END = 125_140;
/** Top of the basic-rate band (taxable income, i.e. above the PA): £37,700. */
export const BASIC_RATE_LIMIT = 37_700;
/** Top of the higher-rate band (taxable income): £125,140 − £12,570. */
export const HIGHER_RATE_LIMIT = PA_TAPER_END - PERSONAL_ALLOWANCE;

/** The £1,000 property (trading and property) allowance. */
export const PROPERTY_ALLOWANCE = 1_000;

/**
 * Marginal income-tax rates for the basic / higher / additional bands.
 *  - 2026/27: standard 20 / 40 / 45 (rental income taxed alongside other income).
 *  - 2027/28+: the new property income rates 22 / 42 / 47 (England, Wales & NI).
 * The reducer rate (lib/section24.ts) tracks the basic rate of the chosen year.
 */
export function bandRates(year: TaxYear): { basic: number; higher: number; additional: number } {
  return year === "2027-28"
    ? { basic: 0.22, higher: 0.42, additional: 0.47 }
    : { basic: 0.2, higher: 0.4, additional: 0.45 };
}

/* ---------------------------------------------------------------------------
 * Per-property profit
 * ------------------------------------------------------------------------- */

export interface PropertyInput {
  /** display name */
  name?: string;
  /** gross rents for the year */
  rent: number;
  /** allowable NON-finance running costs (repairs, agent fees, insurance, etc) */
  expenses: number;
  /** mortgage interest + other allowable finance costs (restricted under s.24) */
  interest: number;
}

export interface PropertyProfit {
  name: string;
  rent: number;
  /** the expenses actually used (actual, or the £1,000 allowance if better). */
  expensesUsed: number;
  /** true if the £1,000 property allowance beat the actual expenses. */
  usedPropertyAllowance: boolean;
  interest: number;
  /** taxable rental profit BEFORE finance costs (rent − expensesUsed). */
  taxableProfit: number;
}

/**
 * Profit for one property, applying the £1,000 property allowance where it beats
 * deducting actual expenses. (Finance costs are NOT deducted here — that is the
 * Section 24 restriction; they feed the finance-cost credit instead.)
 *
 * If gross rent ≤ £1,000 the income is covered in full (full relief) and the
 * taxable profit is nil. Otherwise the landlord deducts the GREATER of actual
 * expenses and the £1,000 allowance (you cannot do both).
 */
export function propertyProfit(p: PropertyInput, index = 0): PropertyProfit {
  const rent = Math.max(0, p.rent);
  const actualExpenses = Math.max(0, p.expenses);
  const interest = Math.max(0, p.interest);

  // Full relief: gross property income within the £1,000 allowance.
  if (rent <= PROPERTY_ALLOWANCE) {
    return {
      name: p.name?.trim() || `Property ${index + 1}`,
      rent,
      expensesUsed: rent, // wiped out by the allowance
      usedPropertyAllowance: true,
      interest,
      taxableProfit: 0,
    };
  }

  // Partial relief: deduct the GREATER of actual expenses and the £1,000 allowance.
  const usePA = PROPERTY_ALLOWANCE > actualExpenses;
  const expensesUsed = usePA ? PROPERTY_ALLOWANCE : actualExpenses;
  const taxableProfit = Math.max(0, rent - expensesUsed);

  return {
    name: p.name?.trim() || `Property ${index + 1}`,
    rent,
    expensesUsed,
    usedPropertyAllowance: usePA,
    interest,
    taxableProfit,
  };
}

/* ---------------------------------------------------------------------------
 * Band-aware income tax on a slice of income
 * ------------------------------------------------------------------------- */

/** The personal allowance left after the £100k taper, given total income. */
export function taperedPersonalAllowance(totalIncome: number): number {
  if (totalIncome <= PA_TAPER_START) return PERSONAL_ALLOWANCE;
  if (totalIncome >= PA_TAPER_END) return 0;
  const lost = Math.floor((totalIncome - PA_TAPER_START) / 2);
  return Math.max(0, PERSONAL_ALLOWANCE - lost);
}

/**
 * Income tax on a band-banded amount of income, returned as the total tax and a
 * per-band split. `totalIncome` is the landlord's whole taxable income (other
 * income + rental taxable profit) so the bands and the PA taper are applied
 * correctly; we then attribute tax to the rental "slice" by difference.
 */
function incomeTaxOn(income: number, year: TaxYear): number {
  const rates = bandRates(year);
  const pa = taperedPersonalAllowance(income);
  const taxable = Math.max(0, income - pa);

  const basicAmount = Math.min(taxable, BASIC_RATE_LIMIT);
  const higherAmount = Math.min(Math.max(0, taxable - BASIC_RATE_LIMIT), HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT);
  const additionalAmount = Math.max(0, taxable - HIGHER_RATE_LIMIT);

  return basicAmount * rates.basic + higherAmount * rates.higher + additionalAmount * rates.additional;
}

/* ---------------------------------------------------------------------------
 * The whole-portfolio model
 * ------------------------------------------------------------------------- */

export interface PortfolioInputs {
  /** the properties in the portfolio (one or many). */
  properties: PropertyInput[];
  /**
   * the landlord's OTHER taxable income for the year (employment, pension, etc),
   * used to place the rental profit in the right band(s) and apply the £100k
   * taper. 0 if the landlord has no other income.
   */
  otherIncome: number;
  /** which year's rates to apply (20/40/45 + 20% reducer, or 22/42/47 + 22%). */
  year?: TaxYear;
}

export interface PortfolioResult {
  year: TaxYear;
  reducerRate: number;
  properties: PropertyProfit[];

  /** totals across the portfolio. */
  totalRent: number;
  totalExpensesUsed: number;
  totalInterest: number;
  /** total taxable rental profit (rent − expenses, interest NOT deducted). */
  totalTaxableProfit: number;

  /** how much of the rental profit falls in each band (marginal slice view). */
  rentalInBasic: number;
  rentalInHigher: number;
  rentalInAdditional: number;

  /** income tax attributable to the rental profit, BEFORE the finance credit. */
  taxBeforeCredit: number;
  /** the Section 24 finance-cost reducer actually given (after the 3 caps). */
  financeCredit: number;
  /** income tax on the rentals AFTER the finance-cost reducer (not below 0). */
  incomeTax: number;

  /** net cash kept: rent − expenses − interest − tax. */
  netCashProfit: number;
  /** the blended effective tax rate on the rental profit (% of profit). */
  effectiveRate: number;

  /** the marginal band the rental profit mostly lands in (for messaging). */
  topBand: "basic" | "higher" | "additional";
}

function round(n: number): number {
  return Math.round(n);
}

/**
 * Compute the full rental-profit & income-tax picture for a one-or-many-property
 * portfolio, with the Section 24 finance-cost restriction and a band-aware tax
 * charge layered on top of the landlord's other income.
 */
export function computePortfolio(i: PortfolioInputs): PortfolioResult {
  const year = i.year ?? "2026-27";
  const rates = bandRates(year);
  const reducerRate = reducerRateFor(year);
  const otherIncome = Math.max(0, i.otherIncome);

  const properties = i.properties.map((p, idx) => propertyProfit(p, idx));

  const totalRent = properties.reduce((s, p) => s + p.rent, 0);
  const totalExpensesUsed = properties.reduce((s, p) => s + p.expensesUsed, 0);
  const totalInterest = properties.reduce((s, p) => s + p.interest, 0);
  const totalTaxableProfit = properties.reduce((s, p) => s + p.taxableProfit, 0);

  // Income tax attributable to the rental profit = tax on (other + rental) minus
  // tax on (other) alone, so the rental profit is taxed in the correct band(s)
  // and the £100k taper is captured.
  const taxWithRentals = incomeTaxOn(otherIncome + totalTaxableProfit, year);
  const taxOnOtherAlone = incomeTaxOn(otherIncome, year);
  const taxBeforeCredit = Math.max(0, taxWithRentals - taxOnOtherAlone);

  // Section 24 finance-cost reducer: lower of (a) reducerRate × finance costs,
  // (b) reducerRate × rental profit before finance, (c) reducerRate × adjusted
  // total income above the personal allowance. We have all three figures here.
  const totalIncome = otherIncome + totalTaxableProfit;
  const pa = taperedPersonalAllowance(totalIncome);
  const adjustedTotalIncome = Math.max(0, totalIncome - pa);
  const creditBase = Math.min(
    totalInterest,
    Math.max(0, totalTaxableProfit),
    adjustedTotalIncome,
  );
  const financeCredit = creditBase * reducerRate;

  const incomeTax = Math.max(0, taxBeforeCredit - financeCredit);

  const netCashProfit = totalRent - totalExpensesUsed - totalInterest - incomeTax;

  // Which bands the rental slice occupies (marginal view, sitting above other
  // income). Used for messaging and the band-split chart.
  const paLive = taperedPersonalAllowance(totalIncome);
  const taxableOther = Math.max(0, otherIncome - taperedPersonalAllowance(otherIncome));
  // Where the rental profit sits in the taxable-income axis once PA is settled.
  const taxableTotal = Math.max(0, totalIncome - paLive);
  const rentalTaxableSlice = Math.max(0, taxableTotal - taxableOther);

  const basicRoom = Math.max(0, BASIC_RATE_LIMIT - taxableOther);
  const higherRoom = Math.max(0, HIGHER_RATE_LIMIT - Math.max(taxableOther, BASIC_RATE_LIMIT));

  const rentalInBasic = Math.min(rentalTaxableSlice, basicRoom);
  const rentalInHigher = Math.min(Math.max(0, rentalTaxableSlice - rentalInBasic), higherRoom);
  const rentalInAdditional = Math.max(0, rentalTaxableSlice - rentalInBasic - rentalInHigher);

  const topBand: "basic" | "higher" | "additional" =
    rentalInAdditional > 0 ? "additional" : rentalInHigher > 0 ? "higher" : "basic";

  const effectiveRate = totalTaxableProfit > 0 ? (incomeTax / totalTaxableProfit) * 100 : 0;

  return {
    year,
    reducerRate,
    properties,

    totalRent: round(totalRent),
    totalExpensesUsed: round(totalExpensesUsed),
    totalInterest: round(totalInterest),
    totalTaxableProfit: round(totalTaxableProfit),

    rentalInBasic: round(rentalInBasic),
    rentalInHigher: round(rentalInHigher),
    rentalInAdditional: round(rentalInAdditional),

    taxBeforeCredit: round(taxBeforeCredit),
    financeCredit: round(financeCredit),
    incomeTax: round(incomeTax),

    netCashProfit: round(netCashProfit),
    effectiveRate,

    topBand,
  };
}

/** Format a whole-pound figure as GBP, e.g. 12345 → "£12,345". */
export function gbp(n: number): string {
  const rounded = Math.round(n);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}£${Math.abs(rounded).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;
}
