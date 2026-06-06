/**
 * Section 24 finance-cost restriction — the pure math, shared by the existing
 * Section24Calculator component, the premium personal-vs-company tool and the
 * Excel model builder so the three can never disagree.
 *
 * Locked from docs/property/house_positions.md §4 + §7:
 *  - Individual residential landlords CANNOT deduct mortgage interest / finance
 *    costs from rental profit. Instead a basic-rate tax REDUCER (credit) is given.
 *  - Reducer rate: 20% for 2026/27 and earlier; 22% from 2027/28 (FA 2026 Sch 1
 *    gives it at the new property basic rate of 22%, NOT frozen at 20%).
 *  - The reducer is capped at the LOWER of: 20%/22% of (a) the finance costs and
 *    (b) the residential rental profit before any finance-cost deduction. (A third
 *    cap — % of total income above the personal allowance — is out of scope for a
 *    single-property tool and flagged to the user.)
 *  - Companies are OUTSIDE Section 24: they deduct interest in full before
 *    Corporation Tax. CT is 19% small-profits / 25% main / marginal in between.
 *
 * "Old system" = the pre-2017 position where individuals deducted interest in
 * full at their marginal rate. It is shown only to quantify what Section 24 costs;
 * it is NOT a current option for individuals.
 */
import {
  corporationTax,
  corporationTaxEffectiveRate,
} from "./corpTax";

export type TaxBand = "basic" | "higher" | "additional";

/** Marginal income tax rates by band, 2026/27 (England/Wales/NI, UK-wide here). */
export const INCOME_TAX_RATES: Record<TaxBand, number> = {
  basic: 0.2,
  higher: 0.4,
  additional: 0.45,
};

/** Section 24 finance-cost reducer rate. 20% now; 22% from 2027/28 (FA 2026). */
export const REDUCER_RATE_2026_27 = 0.2;
export const REDUCER_RATE_2027_28 = 0.22;

/** The tax year a Section 24 calculation is run for. */
export type TaxYear = "2026-27" | "2027-28";

export function reducerRateFor(year: TaxYear): number {
  return year === "2027-28" ? REDUCER_RATE_2027_28 : REDUCER_RATE_2026_27;
}

export interface Section24Inputs {
  /** annual rental income (gross rents) */
  rentalIncome: number;
  /** annual mortgage interest + other allowable finance costs */
  mortgageInterest: number;
  /** other allowable (non-finance) running costs */
  otherExpenses: number;
  /** the landlord's marginal income tax band */
  taxBand: TaxBand;
  /** which year's rules to apply (reducer 20% vs 22%). Default 2026/27. */
  year?: TaxYear;
}

export interface Section24Result {
  /** rental profit before any finance-cost deduction (rent − other costs). */
  rentalProfitBeforeFinance: number;
  /** the marginal income tax rate used. */
  marginalRate: number;
  /** the Section 24 reducer (credit) rate used. */
  reducerRate: number;

  /* --- Individual under Section 24 (the current rules) --- */
  /** income tax on rental profit BEFORE the finance-cost reducer. */
  s24TaxBeforeCredit: number;
  /** the finance-cost tax reducer actually given (after the cap). */
  s24Credit: number;
  /** income tax on the rental business after the reducer. */
  s24Tax: number;
  /** cash profit kept after tax (rent − other costs − interest − s24 tax). */
  s24NetProfit: number;

  /* --- "Old system" (pre-2017, full interest deduction at marginal rate) --- */
  /** taxable profit if interest were fully deductible. */
  oldTaxableProfit: number;
  /** income tax under the old, fully-deductible system. */
  oldSystemTax: number;
  /** cash profit kept after tax under the old system. */
  oldSystemNetProfit: number;

  /** extra income tax Section 24 costs the individual vs the old system. */
  extraTax: number;

  /* --- Company (outside Section 24: full interest deduction, pays CT) --- */
  /** company taxable profit (rent − other costs − interest). */
  companyProfit: number;
  /** Corporation Tax on that profit. */
  companyTax: number;
  /** effective CT rate (%) on the company profit. */
  companyEffectiveRate: number;
  /** cash profit retained in the company after CT. */
  companyNetProfit: number;

  /** company tax − individual (S24) tax. Negative = company pays less tax. */
  companyVsIndividualTax: number;
}

function round(n: number): number {
  return Math.round(n);
}

/**
 * Compute the full Section 24 picture for one property/set of figures, comparing
 * the individual position (under the s.24 restriction) with a company (outside
 * s.24). All amounts are rounded to whole pounds.
 */
export function computeSection24(i: Section24Inputs): Section24Result {
  const year = i.year ?? "2026-27";
  const rent = Math.max(0, i.rentalIncome);
  const interest = Math.max(0, i.mortgageInterest);
  const other = Math.max(0, i.otherExpenses);
  const marginalRate = INCOME_TAX_RATES[i.taxBand];
  const reducerRate = reducerRateFor(year);

  const rentalProfitBeforeFinance = rent - other;

  // --- Individual under Section 24 ---
  // Taxable rental profit = profit BEFORE deducting interest (interest is not an
  // expense for individuals). Tax at the marginal rate, then a reducer.
  const s24TaxableProfit = Math.max(0, rentalProfitBeforeFinance);
  const s24TaxBeforeCredit = s24TaxableProfit * marginalRate;
  // Reducer cap: lower of reducerRate × finance costs and reducerRate × rental
  // profit before finance (caps 1 & 2). Total-income cap (3) is out of scope.
  const creditBase = Math.min(interest, Math.max(0, rentalProfitBeforeFinance));
  const s24Credit = creditBase * reducerRate;
  const s24Tax = Math.max(0, s24TaxBeforeCredit - s24Credit);
  const s24NetProfit = rentalProfitBeforeFinance - interest - s24Tax;

  // --- "Old system": full interest deduction at the marginal rate ---
  const oldTaxableProfit = Math.max(0, rentalProfitBeforeFinance - interest);
  const oldSystemTax = oldTaxableProfit * marginalRate;
  const oldSystemNetProfit = rentalProfitBeforeFinance - interest - oldSystemTax;

  const extraTax = s24Tax - oldSystemTax;

  // --- Company (outside Section 24) ---
  const companyProfit = Math.max(0, rentalProfitBeforeFinance - interest);
  const companyTax = corporationTax(companyProfit);
  const companyEffectiveRate = corporationTaxEffectiveRate(companyProfit);
  const companyNetProfit = rentalProfitBeforeFinance - interest - companyTax;

  const companyVsIndividualTax = companyTax - s24Tax;

  return {
    rentalProfitBeforeFinance: round(rentalProfitBeforeFinance),
    marginalRate,
    reducerRate,

    s24TaxBeforeCredit: round(s24TaxBeforeCredit),
    s24Credit: round(s24Credit),
    s24Tax: round(s24Tax),
    s24NetProfit: round(s24NetProfit),

    oldTaxableProfit: round(oldTaxableProfit),
    oldSystemTax: round(oldSystemTax),
    oldSystemNetProfit: round(oldSystemNetProfit),

    extraTax: round(extraTax),

    companyProfit: round(companyProfit),
    companyTax: round(companyTax),
    companyEffectiveRate,
    companyNetProfit: round(companyNetProfit),

    companyVsIndividualTax: round(companyVsIndividualTax),
  };
}

/** Format a whole-pound figure as GBP, e.g. 12345 → "£12,345". */
export function gbp(n: number): string {
  const rounded = Math.round(n);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}£${Math.abs(rounded).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;
}
