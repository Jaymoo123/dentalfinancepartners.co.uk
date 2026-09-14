import { describe, it, expect } from "vitest";
import { stakingMiningIncomeEstimator } from "./staking-mining-income-estimator";

// RULES UNDER TEST (house_positions.md positions 9, 10, 12; rates_ledger keys
// trading_misc_income_allowance = £1,000, basic_rate_band_ceiling = £37,700,
// income_tax_additional_rate = 45%):
//  - receipts are income in the year of receipt;
//  - the £1,000 allowance shelters small receipts;
//  - tax is the MARGINAL tax the receipts add on top of other income, so the
//    personal allowance must taper by £1 per £2 above £100,000 and the 45% band
//    must start at £125,140 of TAXABLE income.

const tax = (stakingMiningIncome: number, otherIncome: number) => {
  const result = stakingMiningIncomeEstimator.compute({ stakingMiningIncome, otherIncome });
  return { headline: result.headline.value, tax: result.rows?.find(r => r.label === "Estimated income tax")?.value, note: result.note };
};

describe("stakingMiningIncomeEstimator", () => {
  it("income within the £1,000 allowance: zero tax (HP12)", () => {
    expect(tax(800, 20000).headline).toBe("£0");
  });

  it("income above the allowance, all in the basic-rate band", () => {
    // other income £20k, staking £5k, net £4k, marginal rate 20%
    expect(tax(5000, 20000).tax).toBe("£800");
  });

  it("income tipping over the £37,700 taxable ceiling splits 20% / 40%", () => {
    // other income £49,000 => taxable £36,430, band left £1,270.
    // net staking £4,000: £1,270 at 20% + £2,730 at 40% = £254 + £1,092.
    expect(tax(5000, 49000).tax).toBe("£1,346");
  });

  it("applies the personal allowance taper: 60% effective rate above £100,000", () => {
    // other income £100,000, net staking £4,000: £4,000 at 40% plus £2,000 of
    // personal allowance withdrawn and taxed at 40% = £1,600 + £800 = £2,400,
    // i.e. 60% of £4,000.
    expect(tax(5000, 100000).tax).toBe("£2,400");
    expect(tax(5000, 100000).note).toContain("60%");
  });

  it("charges 45% only above £125,140 of taxable income", () => {
    // other income £137,710 => PA fully tapered => taxable £137,710, already
    // above £125,140, so the whole £4,000 is at 45%.
    expect(tax(5000, 137710).tax).toBe("£1,800");
    // other income £123,140 => PA tapered to £1,000 => taxable £122,140. Adding
    // £4,000 wipes the remaining £1,000 allowance, so taxable rises to £127,140:
    // £3,000 more at 40% and £2,000 at 45% = £1,200 + £900.
    expect(tax(5000, 123140).tax).toBe("£2,100");
  });

  it("does not report the taper caveat when it does not apply", () => {
    expect(tax(5000, 20000).note).not.toContain("60%");
  });
});
