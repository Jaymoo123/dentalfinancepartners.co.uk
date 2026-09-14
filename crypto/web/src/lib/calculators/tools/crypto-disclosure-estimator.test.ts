import { describe, it, expect } from "vitest";
import { cryptoDisclosureEstimator } from "./crypto-disclosure-estimator";

// RULES UNDER TEST (house_positions.md position 31, rates_ledger key
// disclosure_years_by_behaviour = "4/6/20"):
//  - assessable years are 4 (reasonable care), 6 (careless), 20 (deliberate);
//  - penalty percentages must NOT be asserted without re-verification at build
//    time, so the tool must not compute or display a penalty amount.

const rows = (behaviour: string, annualTaxUnpaid = 1000) =>
  cryptoDisclosureEstimator.compute({ behaviour, annualTaxUnpaid });

describe("cryptoDisclosureEstimator", () => {
  it.each([
    ["reasonable", 4],
    ["careless", 6],
    ["deliberate", 20],
  ])("%s behaviour is assessed over %i years (HP31)", (behaviour, years) => {
    const result = rows(behaviour);
    expect(result.rows?.find(r => r.label === "Years HMRC can assess")?.value).toBe(`${years} years`);
    // total tax = annual tax x assessable years
    expect(result.headline.value).toBe(`£${(1000 * (years as number)).toLocaleString("en-GB")}`);
  });

  it("does not assert a penalty percentage or a penalty amount (HP31)", () => {
    for (const behaviour of ["reasonable", "careless", "deliberate"]) {
      const result = rows(behaviour, 1000);
      expect(result.rows?.some(r => r.label.startsWith("Penalty range"))).toBe(false);
      const text = JSON.stringify(result);
      expect(text).not.toMatch(/\d+\s*%/); // no asserted percentage anywhere in the output
    }
  });

  it("reasonable care is described as attracting no penalty, not a 0-30% band", () => {
    expect(rows("reasonable").note).toMatch(/No penalty where you genuinely took reasonable care/i);
    expect(rows("careless").note).toMatch(/lowest where the disclosure is unprompted/i);
    expect(rows("deliberate").note).toMatch(/higher again where the error was concealed/i);
  });

  it("points at HMRC's guidance for the current penalty rates (HP31)", () => {
    expect(rows("careless").note).toContain("gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets");
  });

  it("falls back to the reasonable-care band on an unknown behaviour value", () => {
    expect(rows("nonsense").rows?.find(r => r.label === "Years HMRC can assess")?.value).toBe("4 years");
  });
});
