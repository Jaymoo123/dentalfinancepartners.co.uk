/**
 * NHS Pension Scheme Pays cost estimate — pure compute library.
 *
 * TL-03: no React, no DOM, no window, no fetch.
 *
 * METHOD (rebuilt 2026-08-26 to match NHSBSA's actually published basis).
 *
 * Source A: NHSBSA member factsheet "NHS Pensions — Annual Allowance —
 *   Estimating the cost of Scheme Pays", version V5, file stamped 20240712,
 *   downloaded and read 2026-08-26 from
 *   https://www.nhsbsa.nhs.uk/sites/default/files/2024-07/Annual%20Allowance%E2%80%93Estimating%20the%20cost%20of%20Scheme%20Pays-20240712-(V5).docx
 *   Both factor tables in that document are stamped "Factors in force from
 *   30 March 2023".
 *
 * Source B: NHSBSA member factsheet "NHS Pensions — Annual allowance — Scheme
 *   pays recovery factors", version V6, file stamped 20240822, downloaded and
 *   read 2026-08-26 from
 *   https://www.nhsbsa.nhs.uk/sites/default/files/2024-08/Annual%20allowance-Scheme%20pays%20recovery%20factors%E2%80%9320240822-(V6).docx
 *   Source B is the AT-RETIREMENT table (SP1/SP2). It is applied to the
 *   nominal negative DC balance including interest, so it is NOT the table a
 *   member uses to estimate today. It is cited here only to explain the
 *   difference, and to keep the two documents from being confused again.
 *
 * Source A states the estimating method verbatim:
 *   "Reduction to pension: Annual Allowance charge / [Factor 1 or Factor 2]"
 *   "Reduction to lump sum (1995 Section members only): 3 x reduction in pension"
 *   "The illustrative reduction is calculated in current day terms and will
 *    increase in line with the relevant interest rate in excess of inflation
 *    up to retirement."
 *   "They do not include the relevant interest rate in excess of inflation up
 *    to retirement."
 *
 * Consequences, which is why this is a different MODEL and not a constant swap:
 *  1. There is NO nominal interest rate to compound. Interest on the negative
 *     DC account is expressed in EXCESS OF INFLATION (CPI), and the estimating
 *     factors are calibrated so the answer comes out in today's money. Growing
 *     the charge by a nominal rate and then dividing by these factors would
 *     double-count.
 *  2. Factor 2 (2015 Scheme) is indexed by YEARS TO NORMAL PENSION AGE, not by
 *     age band. Factor 1 (1995/2008) is indexed by CURRENT AGE and by which
 *     Normal Pension Age applies.
 *  3. Because reduction = charge / factor, the simple cash break-even in
 *     today's money is exactly the factor. That is a property of the method,
 *     not a coincidence, and it is reported rather than re-derived.
 *
 * The excess-over-inflation interest rates in Source A are retained below for
 * disclosure only. They are deliberately NOT used in the arithmetic.
 */

export type MarginalRate = "basic" | "higher" | "additional";

/**
 * Scheme section, which selects the factor table and the Normal Pension Age.
 * "1995-55" is the NPA 55 column (Special Class / Mental Health Officer).
 */
export type SchemeSection = "1995-55" | "1995-60" | "2008" | "2015";

export type SchemePaysInput = {
  annualAllowanceCharge: number;
  schemeGrowth: number;
  age: number;
  marginalRate: MarginalRate;
  /** Defaults to "2015": all active members accrue in the 2015 Scheme from 1 April 2022. */
  section?: SchemeSection;
  /**
   * 2015 Scheme Normal Pension Age. The 2015 NPA is State Pension Age, or 65
   * if later, so it cannot be derived from age alone. Defaults to 68 and the
   * assumption is surfaced in the result. Ignored for 1995/2008 sections,
   * whose NPA is fixed by the section itself.
   */
  normalPensionAge?: number;
};

export type SchemePaysResult = {
  charge: number;
  mandatoryEligible: boolean;
  cashNow: number;
  section: SchemeSection;
  /** The NPA actually used, whether supplied or assumed. */
  normalPensionAge: number;
  /** True when NPA 68 was assumed rather than supplied by the member. */
  npaAssumed: boolean;
  /** Complete years to NPA. Drives the 2015 factor; display-only for 1995/2008. */
  yearsToRetirement: number;
  /** NHSBSA Source A estimating factor, table 1 or table 2 as applicable. */
  actuarialFactor: number;
  /** Which Source A table the factor came from. */
  factorTable: "table1-1995-2008" | "table2-2015";
  /** True when age or years-to-NPA fell outside the published table and was clamped. */
  factorClamped: boolean;
  /** Annual pension reduction in CURRENT DAY TERMS (today's money). */
  annualPensionReduction: number;
  /** 1995 Section only: retirement lump sum reduction = 3 x pension reduction. */
  lumpSumReduction: number;
  /** Cash charge divided by the annual reduction, in today's money. Equals the factor. */
  breakEvenYears: number | null;
  marginalRateValue: number;
};

/** Finance Act 2004 s.237B mandatory Scheme Pays tests. */
const STANDARD_AA = 60_000;
const MANDATORY_CHARGE_FLOOR = 2_000;

const MARGINAL_RATES: Record<MarginalRate, number> = {
  basic: 0.2,
  higher: 0.4,
  additional: 0.45,
};

/**
 * Interest charged on the negative DC account, expressed IN EXCESS OF
 * INFLATION measured by reference to CPI. Source A, "The interest rate applied
 * to the amount will be as follows". Disclosure only: the estimating factors
 * already exclude this, so applying it here would double-count.
 */
export const SCHEME_PAYS_REAL_INTEREST_RATES = [
  { from: "up to 15 March 2016", excessOverCpi: 0.03 },
  { from: "16 March 2016 to 31 March 2019", excessOverCpi: 0.028 },
  { from: "1 April 2019 to 30 March 2023", excessOverCpi: 0.024 },
  { from: "31 March 2023 onwards", excessOverCpi: 0.017 },
] as const;

/** The rate currently in force: 1.7% in excess of CPI from 31 March 2023 (Source A). */
export const SCHEME_PAYS_CURRENT_REAL_INTEREST_RATE = 0.017;

/**
 * Source A, Factor table 1 — members of the 1995/2008 Scheme.
 * Indexed by CURRENT AGE (last birthday), 22 to 70. Columns are the three
 * Normal Pension Ages. "Factors in force from 30 March 2023."
 * Rows from age 65 upward are NHSBSA's shaded band: at or above NPA they
 * assume retirement before the next birthday.
 * [age, NPA55, NPA60, NPA65]
 */
const FACTOR_TABLE_1: readonly (readonly [number, number, number, number])[] = [
  [22, 17.1, 14.2, 10.1],
  [23, 17.3, 14.4, 10.3],
  [24, 17.6, 14.6, 10.4],
  [25, 17.9, 14.9, 10.6],
  [26, 18.1, 15.1, 10.7],
  [27, 18.4, 15.3, 10.9],
  [28, 18.7, 15.5, 11.1],
  [29, 19.0, 15.8, 11.2],
  [30, 19.3, 16.0, 11.4],
  [31, 19.6, 16.3, 11.5],
  [32, 19.9, 16.5, 11.7],
  [33, 20.2, 16.8, 11.9],
  [34, 20.5, 17.0, 12.1],
  [35, 20.8, 17.3, 12.2],
  [36, 21.2, 17.5, 12.4],
  [37, 21.5, 17.8, 12.6],
  [38, 21.8, 18.1, 12.8],
  [39, 22.2, 18.4, 13.0],
  [40, 22.5, 18.7, 13.2],
  [41, 22.9, 18.9, 13.4],
  [42, 23.3, 19.2, 13.6],
  [43, 23.6, 19.5, 13.8],
  [44, 24.0, 19.8, 14.0],
  [45, 24.4, 20.1, 14.2],
  [46, 24.8, 20.5, 14.4],
  [47, 25.2, 20.8, 14.6],
  [48, 25.6, 21.1, 14.8],
  [49, 26.0, 21.5, 15.1],
  [50, 26.4, 21.8, 15.3],
  [51, 26.8, 22.2, 15.5],
  [52, 27.3, 22.5, 15.8],
  [53, 27.8, 22.9, 16.0],
  [54, 28.2, 23.2, 16.3],
  [55, 28.2, 23.6, 16.5],
  [56, 27.6, 24.0, 16.8],
  [57, 27.0, 24.4, 17.0],
  [58, 26.4, 24.8, 17.3],
  [59, 25.8, 25.2, 17.6],
  [60, 25.2, 25.2, 17.9],
  [61, 24.5, 24.5, 18.2],
  [62, 23.9, 23.9, 18.5],
  [63, 23.3, 23.3, 18.9],
  [64, 22.7, 22.7, 19.2],
  [65, 22.0, 22.0, 19.0],
  [66, 21.4, 21.4, 18.4],
  [67, 20.7, 20.7, 17.7],
  [68, 20.1, 20.1, 17.1],
  [69, 19.4, 19.4, 16.4],
  [70, 18.8, 18.8, 15.8],
];

/**
 * Source A, Factor table 2 — members of the 2015 Scheme.
 * Indexed by YEARS TO RETIREMENT, rounded up, 1 to 50. NHSBSA note: "factors
 * are based on complete years until Normal Pension Age".
 * "Factors in force from 30 March 2023."
 * Array position n-1 holds the factor for n years to retirement.
 */
const FACTOR_TABLE_2: readonly number[] = [
  18.2, 17.8, 17.3, 16.8, 16.5, 16.3, 16.0, 15.7, 15.5, 15.2,
  15.0, 14.8, 14.5, 14.3, 14.1, 13.9, 13.7, 13.5, 13.2, 12.9,
  12.5, 12.2, 12.1, 11.9, 11.7, 11.6, 11.4, 11.2, 11.1, 10.9,
  10.8, 10.6, 10.5, 10.3, 10.2, 10.0, 9.9, 9.7, 9.6, 9.5,
  9.3, 9.2, 9.1, 9.0, 8.8, 8.7, 8.6, 8.5, 8.3, 8.2,
];

/** Normal Pension Age fixed by section. 2015 is State Pension Age or 65 if later. */
export function sectionNormalPensionAge(
  section: SchemeSection,
  suppliedNpa?: number,
): { npa: number; assumed: boolean } {
  if (section === "1995-55") return { npa: 55, assumed: false };
  if (section === "1995-60") return { npa: 60, assumed: false };
  if (section === "2008") return { npa: 65, assumed: false };
  const n = Number(suppliedNpa);
  // 2015 NPA tracks State Pension Age with a floor of 65; 68 is the current
  // legislated maximum, so anything outside 65-68 is not a usable 2015 NPA.
  if (Number.isFinite(n) && n >= 65 && n <= 68) {
    return { npa: Math.round(n), assumed: false };
  }
  return { npa: 68, assumed: true };
}

/**
 * Source A estimating factor.
 * 1995/2008: table 1 by current age. 2015: table 2 by complete years to NPA.
 */
export function getEstimatingFactor(
  section: SchemeSection,
  age: number,
  npa: number,
): { factor: number; table: "table1-1995-2008" | "table2-2015"; clamped: boolean } {
  if (section === "2015") {
    const rawYears = Math.ceil(npa - age);
    const years = Math.min(FACTOR_TABLE_2.length, Math.max(1, rawYears));
    return {
      factor: FACTOR_TABLE_2[years - 1],
      table: "table2-2015",
      clamped: years !== rawYears,
    };
  }
  const col = section === "1995-55" ? 1 : section === "1995-60" ? 2 : 3;
  const minAge = FACTOR_TABLE_1[0][0];
  const maxAge = FACTOR_TABLE_1[FACTOR_TABLE_1.length - 1][0];
  const clampedAge = Math.min(maxAge, Math.max(minAge, Math.round(age)));
  const row = FACTOR_TABLE_1.find((r) => r[0] === clampedAge) ?? FACTOR_TABLE_1[0];
  return {
    factor: row[col] as number,
    table: "table1-1995-2008",
    clamped: clampedAge !== Math.round(age),
  };
}

export function calcSchemePays(input: SchemePaysInput): SchemePaysResult {
  const charge = Math.max(0, Number(input.annualAllowanceCharge) || 0);
  const schemeGrowth = Math.max(0, Number(input.schemeGrowth) || 0);
  const age = Math.min(75, Math.max(20, Math.round(Number(input.age) || 45)));
  const marginalRateValue = MARGINAL_RATES[input.marginalRate] ?? MARGINAL_RATES.higher;
  const section: SchemeSection = input.section ?? "2015";

  const { npa, assumed } = sectionNormalPensionAge(section, input.normalPensionAge);
  const { factor, table, clamped } = getEstimatingFactor(section, age, npa);

  const mandatoryEligible = charge > MANDATORY_CHARGE_FLOOR && schemeGrowth > STANDARD_AA;

  // Source A: reduction to pension = Annual Allowance charge / factor,
  // in current day terms.
  const annualPensionReduction = factor > 0 ? charge / factor : 0;

  // Source A: 1995 Section members only, lump sum reduction = 3 x pension reduction.
  const lumpSumReduction =
    section === "1995-55" || section === "1995-60" ? annualPensionReduction * 3 : 0;

  return {
    charge,
    mandatoryEligible,
    cashNow: charge,
    section,
    normalPensionAge: npa,
    npaAssumed: assumed,
    yearsToRetirement: Math.max(0, Math.ceil(npa - age)),
    actuarialFactor: factor,
    factorTable: table,
    factorClamped: clamped,
    annualPensionReduction,
    lumpSumReduction,
    breakEvenYears: annualPensionReduction > 0 ? charge / annualPensionReduction : null,
    marginalRateValue,
  };
}
