/**
 * UK Dividend Tax, 2026/27 (dividend rates are UK-wide, not devolved):
 *   Dividend allowance £500 (taxed at 0% but still uses up band space).
 *   Rates: 8.75% basic, 33.75% higher, 39.35% additional.
 * Dividends are the top slice of income: other (non-dividend) income uses the
 * personal allowance and the rate bands first, then dividends stack on top.
 * Ignores the personal-allowance taper above £100,000 (flagged in the tool).
 */
export const DIVIDEND_ALLOWANCE = 500;
export const DIV_BASIC = 0.0875;
export const DIV_HIGHER = 0.3375;
export const DIV_ADDITIONAL = 0.3935;

const PERSONAL_ALLOWANCE = 12_570;
const BASIC_RATE_TOP = 50_270; // top of the basic-rate band (total income)
const HIGHER_RATE_TOP = 125_140; // additional-rate threshold

export interface DividendInputs {
  otherIncome: number;
  dividends: number;
}

export interface DividendResult {
  taxFree: number; // covered by unused personal allowance + dividend allowance
  taxable: number;
  atBasic: number;
  atHigher: number;
  atAdditional: number;
  tax: number;
}

export function computeDividendTax(i: DividendInputs): DividendResult {
  const div = Math.max(0, i.dividends);
  const income = Math.max(0, i.otherIncome);

  const unusedPA = Math.max(0, PERSONAL_ALLOWANCE - income);
  const otherTaxable = Math.max(0, income - PERSONAL_ALLOWANCE);
  const divAfterPA = Math.max(0, div - unusedPA);
  const allowanceUsed = Math.min(divAfterPA, DIVIDEND_ALLOWANCE);
  const taxable = Math.max(0, divAfterPA - DIVIDEND_ALLOWANCE);
  const taxFree = div - taxable;

  const basicLimit = BASIC_RATE_TOP - PERSONAL_ALLOWANCE; // 37,700
  const higherLimit = HIGHER_RATE_TOP - PERSONAL_ALLOWANCE; // 112,570

  let pos = otherTaxable + allowanceUsed;
  let remaining = taxable;
  const take = (limit: number) => {
    const room = Math.max(0, limit - pos);
    const amt = Math.min(remaining, room);
    pos += amt;
    remaining -= amt;
    return amt;
  };
  const atBasic = take(basicLimit);
  const atHigher = take(higherLimit);
  const atAdditional = remaining;
  const tax = atBasic * DIV_BASIC + atHigher * DIV_HIGHER + atAdditional * DIV_ADDITIONAL;

  return { taxFree, taxable, atBasic, atHigher, atAdditional, tax };
}
