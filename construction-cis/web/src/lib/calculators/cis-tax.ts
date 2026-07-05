/**
 * Single-source-of-truth rates and pure numeric helpers for construction-cis.
 *
 * All constants are traced to the house_positions.md section noted in the
 * comment. Helpers return NUMBERS (never gbp() strings) so premium tools can
 * compose them without string parsing.
 *
 * HP references:
 *   CIS rates           - house_positions.md §1
 *   Personal allowance  - house_positions.md §11a
 *   Income tax bands    - house_positions.md §11a
 *   Class 4 NI          - house_positions.md §11a
 *   Employee Class 1 NI - house_positions.md §11a
 *   GPS thresholds      - house_positions.md §2
 */

// ---------------------------------------------------------------------------
// CIS deduction rates (HP §1)
// ---------------------------------------------------------------------------

export const CIS_RATES = {
  gps: 0,
  registered: 0.20,
  unregistered: 0.30,
} as const;

// ---------------------------------------------------------------------------
// Income tax thresholds (HP §11a, 2026/27)
// ---------------------------------------------------------------------------

export const PERSONAL_ALLOWANCE = 12570;
export const BASIC_RATE_LIMIT = 37700;
/** Upper earnings limit / higher-rate threshold (PA + basic band). */
export const UEL = 50270;

export const INCOME_TAX_RATES = {
  basic: 0.20,
  higher: 0.40,
  additional: 0.45,
} as const;

// ---------------------------------------------------------------------------
// Class 4 NI (self-employed, HP §11a, 2026/27)
// ---------------------------------------------------------------------------

export const CLASS4_NI = {
  main: 0.06,
  upper: 0.02,
  lowerLimit: 12570,
  upperLimit: 50270,
} as const;

// ---------------------------------------------------------------------------
// Employee Class 1 NI (HP §11a, 2026/27)
// ---------------------------------------------------------------------------

export const CLASS1_NI = {
  main: 0.08,
  upper: 0.02,
} as const;

// ---------------------------------------------------------------------------
// VAT standard rate
// ---------------------------------------------------------------------------

export const VAT_STANDARD = 0.20;

// ---------------------------------------------------------------------------
// GPS turnover thresholds (HP §2)
// ---------------------------------------------------------------------------

export type EntityType =
  | "sole_trader"
  | "partnership"
  | "limited"
  | "closely_controlled";

/**
 * Compute the GPS qualifying turnover threshold for an entity.
 *
 * HP §2 table:
 *   Sole trader:              £30,000
 *   Partnership:              £30,000 per partner OR £100,000 total (whichever is lower to qualify means you pass EITHER route)
 *   Limited company:          £30,000 per director OR £100,000 total
 *   Closely controlled:       £30,000 per controller
 *
 * A business qualifies on the turnover test if its turnover is >= the
 * per-head route (30000 * heads) OR >= the £100,000 whole-business route.
 * The existing fleet tool only checks the per-head route with NO whole-business
 * cap (defect #6 flagged in the brief). This helper implements the CORRECT rule:
 * gpsQualifiesOnTurnover() returns the per-head threshold for sole traders /
 * closely-controlled companies, and for partnerships / limited companies it
 * returns true when turnover >= per-head route OR >= £100,000.
 *
 * For PremiumCalculator (GPS scorer): we expose gpsThreshold() for display and
 * gpsQualifiesOnTurnover() for the boolean test, so the scorer can show which
 * route was used.
 */
export const GPS_WHOLE_BUSINESS_CAP = 100000;
export const GPS_PER_HEAD = 30000;

/**
 * Returns the per-head qualifying threshold for an entity.
 * For partnerships/limited this is the primary route; the whole-business
 * route (GPS_WHOLE_BUSINESS_CAP) is an ALTERNATIVE.
 */
export function gpsThreshold({
  entityType,
  heads,
}: {
  entityType: EntityType;
  heads: number;
}): number {
  const n = Math.max(1, heads);
  if (entityType === "sole_trader") {
    return GPS_PER_HEAD; // fixed, no partner multiplier
  }
  if (entityType === "closely_controlled") {
    return GPS_PER_HEAD * n; // per controller only, no whole-business cap applies
  }
  // partnership / limited: per-head route only (caller uses gpsQualifiesOnTurnover
  // to check against both routes)
  return GPS_PER_HEAD * n;
}

/**
 * Returns whether an entity passes the GPS turnover test, implementing the
 * correct HP §2 rule (EITHER route for partnerships and limited companies).
 */
export function gpsQualifiesOnTurnover({
  entityType,
  heads,
  turnover,
}: {
  entityType: EntityType;
  heads: number;
  turnover: number;
}): { passes: boolean; perHeadThreshold: number; wholeBusinessRoute: boolean } {
  const n = Math.max(1, heads);
  const perHeadThreshold = gpsThreshold({ entityType, heads: n });

  if (entityType === "sole_trader" || entityType === "closely_controlled") {
    return {
      passes: turnover >= perHeadThreshold,
      perHeadThreshold,
      wholeBusinessRoute: false,
    };
  }

  // partnership / limited: passes on EITHER route
  const passesPerHead = turnover >= perHeadThreshold;
  const passesWholeBusiness = turnover >= GPS_WHOLE_BUSINESS_CAP;
  return {
    passes: passesPerHead || passesWholeBusiness,
    perHeadThreshold,
    wholeBusinessRoute: !passesPerHead && passesWholeBusiness,
  };
}

// ---------------------------------------------------------------------------
// Pure numeric helpers (return numbers, never formatted strings)
// ---------------------------------------------------------------------------

/**
 * CIS deduction on the labour-only base (HP §1).
 * Materials are excluded from the deduction base.
 */
export function cisDeduction({
  gross,
  materials,
  rate,
}: {
  gross: number;
  materials: number;
  rate: number;
}): { deductionBase: number; cisDeducted: number } {
  const deductionBase = Math.max(0, gross - materials);
  const cisDeducted = deductionBase * rate;
  return { deductionBase, cisDeducted };
}

/**
 * Self Assessment liability for a sole-trader CIS subcontractor.
 * Returns income tax and Class 4 NI as separate numbers.
 *
 * cisProfit = gross labour - materials - expenses (caller computes this).
 * otherIncome = any other taxable income in the same year.
 */
export function saLiability({
  profit,
  otherIncome = 0,
}: {
  profit: number;
  otherIncome?: number;
}): { incomeTax: number; class4Ni: number; total: number } {
  const cisProfit = Math.max(0, profit);
  const totalIncome = cisProfit + (Number.isFinite(otherIncome) ? otherIncome : 0);

  // Personal allowance and taxable income
  const taxable = Math.max(0, totalIncome - PERSONAL_ALLOWANCE);

  // Income tax: 20% on first BASIC_RATE_LIMIT, 40% above
  const basicTax = Math.min(taxable, BASIC_RATE_LIMIT) * INCOME_TAX_RATES.basic;
  const higherTax = Math.max(0, taxable - BASIC_RATE_LIMIT) * INCOME_TAX_RATES.higher;
  const incomeTax = basicTax + higherTax;

  // Class 4 NI on CIS profit: 6% on (12570-50270), 2% above
  const c4Lower =
    Math.min(Math.max(0, cisProfit - CLASS4_NI.lowerLimit), CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit) *
    CLASS4_NI.main;
  const c4Upper = Math.max(0, cisProfit - CLASS4_NI.upperLimit) * CLASS4_NI.upper;
  const class4Ni = c4Lower + c4Upper;

  return { incomeTax, class4Ni, total: incomeTax + class4Ni };
}

/**
 * Employee Class 1 NI on gross employment income.
 * 8% on (12570 to 50270), 2% above (HP §11a, 2026/27).
 */
export function class1EmployeeNi(gross: number): number {
  const g = Math.max(0, gross);
  const lower =
    Math.min(Math.max(0, g - CLASS4_NI.lowerLimit), CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit) *
    CLASS1_NI.main;
  const upper = Math.max(0, g - CLASS4_NI.upperLimit) * CLASS1_NI.upper;
  return lower + upper;
}

/**
 * Class 4 NI standalone helper (same maths as saLiability but returns a single number).
 */
export function class4Ni(profit: number): number {
  const p = Math.max(0, profit);
  const lower =
    Math.min(Math.max(0, p - CLASS4_NI.lowerLimit), CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit) *
    CLASS4_NI.main;
  const upper = Math.max(0, p - CLASS4_NI.upperLimit) * CLASS4_NI.upper;
  return lower + upper;
}
