import { describe, it, expect } from "vitest";
import { outsideIr35TakeHomeCalculator } from "./tools/outside-ir35-take-home-calculator";
import { insideIr35TakeHomeCalculator } from "./tools/inside-ir35-take-home-calculator";
import { umbrellaVsLimitedCalculator } from "./tools/umbrella-vs-limited-calculator";
import { dividendTaxCalculator } from "./tools/dividend-tax-calculator";
import { corporationTaxCalculator } from "./tools/corporation-tax-calculator";
import { contractorSalaryDividendCalculator } from "./tools/contractor-salary-dividend-calculator";
import { limitedTakeHome, umbrellaTakeHome } from "./tax2026";

/** Parse a gbp()-formatted string like "£71,821" back to a number. */
function parseGbp(s: string): number {
  return Number(s.replace(/[^0-9.-]/g, ""));
}

describe("outsideIr35TakeHomeCalculator (signature golden)", () => {
  const v = { dayRate: 500, billableDays: 240, salary: "12570", annualExpenses: 6000 };

  it("net take-home headline ≈ £71,821", () => {
    const r = outsideIr35TakeHomeCalculator.compute(v);
    expect(Math.abs(parseGbp(r.headline.value) - 71821)).toBeLessThanOrEqual(2);
  });

  it("matches the limitedTakeHome primitive to within £2", () => {
    const primitive = limitedTakeHome({ turnover: 500 * 240, salary: 12570, expenses: 6000 });
    expect(primitive.netTakeHome).toBeCloseTo(71820.95, 0);
    expect(parseGbp(r(v).headline.value)).toBeCloseTo(Math.round(primitive.netTakeHome), 2);
  });

  function r(values: typeof v) {
    return outsideIr35TakeHomeCalculator.compute(values);
  }
});

describe("insideIr35TakeHomeCalculator (signature golden)", () => {
  const v = { dayRate: 500, billableDays: 240, umbrellaMargin: 1200 };

  it("net take-home headline ≈ £69,890", () => {
    const r = insideIr35TakeHomeCalculator.compute(v);
    expect(Math.abs(parseGbp(r.headline.value) - 69890)).toBeLessThanOrEqual(2);
  });

  it("matches the umbrellaTakeHome primitive to within £2", () => {
    const primitive = umbrellaTakeHome({ assignmentIncome: 500 * 240, umbrellaMargin: 1200 });
    expect(primitive.netTakeHome).toBeCloseTo(69889.87, 0);
    const headline = insideIr35TakeHomeCalculator.compute(v).headline.value;
    expect(parseGbp(headline)).toBeCloseTo(Math.round(primitive.netTakeHome), 2);
  });
});

describe("umbrellaVsLimitedCalculator", () => {
  it("headline gap equals limited net minus umbrella net for the same income", () => {
    const v = {
      dayRate: 500,
      billableDays: 240,
      salary: "12570",
      annualExpenses: 6000,
      umbrellaMargin: 1200,
    };
    const ltd = limitedTakeHome({ turnover: 120000, salary: 12570, expenses: 6000 });
    const umb = umbrellaTakeHome({ assignmentIncome: 120000, umbrellaMargin: 1200 });
    const expectedGap = ltd.netTakeHome - umb.netTakeHome;
    const r = umbrellaVsLimitedCalculator.compute(v);
    expect(parseGbp(r.headline.value)).toBeCloseTo(Math.round(expectedGap), 2);
    expect(expectedGap).toBeGreaterThan(0); // outside IR35 keeps more
  });
});

describe("dividendTaxCalculator", () => {
  it("£12,570 salary + £50,000 dividends matches the personalTax dividend figure", () => {
    // PA fully used by salary. £50,000 dividends taxable; £37,700 fills the basic
    // band (£12,570 to £50,270), £12,300 spills into the higher band.
    // £500 allowance is 0%-rated from the basic band up.
    // basic: (37,700 - 500) * 10.75% = 3,999 ; higher: 12,300 * 35.75% = 4,397.25
    const r = dividendTaxCalculator.compute({ salary: 12570, dividends: 50000 });
    const expected = 37200 * 0.1075 + 12300 * 0.3575; // 8,396.25
    expect(parseGbp(r.headline.value)).toBeCloseTo(Math.round(expected), 0);
  });
});

describe("corporationTaxCalculator", () => {
  it("£80,000 profit, no associates, sits in the marginal band", () => {
    const r = corporationTaxCalculator.compute({ profit: 80000, associatedCompanies: 0 });
    // 25% * 80,000 - 3/200 * (250,000 - 80,000) = 20,000 - 2,550 = 17,450
    expect(parseGbp(r.headline.value)).toBeCloseTo(17450, 0);
  });

  it("19% small profits rate at or below £50,000", () => {
    const r = corporationTaxCalculator.compute({ profit: 50000, associatedCompanies: 0 });
    expect(parseGbp(r.headline.value)).toBeCloseTo(9500, 0);
  });
});

describe("contractorSalaryDividendCalculator", () => {
  it("reports the better of the £12,570 and £6,708 salary nets", () => {
    const v = { dayRate: 500, billableDays: 240, annualExpenses: 6000 };
    const high = limitedTakeHome({ turnover: 120000, salary: 12570, expenses: 6000 });
    const low = limitedTakeHome({ turnover: 120000, salary: 6708, expenses: 6000 });
    const best = Math.max(high.netTakeHome, low.netTakeHome);
    const r = contractorSalaryDividendCalculator.compute(v);
    expect(parseGbp(r.headline.value)).toBeCloseTo(Math.round(best), 2);
  });
});
