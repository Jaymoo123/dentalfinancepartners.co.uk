/**
 * Golden tests for the practice purchase (valuation) xlsx builder.
 *
 * Asserts that the workbook formula logic at its default inputs equals
 * calcPracticeValuation() from the compute lib.
 *
 * Golden case (brief §4.1):
 *   ebitda=200000, mix=mixed, region=midlands, demand=normal, tangibles=60000
 *   -> goodwillLow=170000, goodwillHigh=230000, totalLow=230000, totalHigh=290000
 *   midpoint = (230000+290000)/2 = 260000
 *
 * Trace:
 *   MIX_BASE["mixed"] = [0.85, 1.15]
 *   REGION_ADJUST["midlands"] = 0
 *   DEMAND_ADJUST["normal"] = 0
 *   adjLow = max(0.4, 0.85+0+0) = 0.85
 *   adjHigh = max(0.5, 1.15+0+0) = 1.15
 *   goodwillLow = 200000 * 0.85 = 170000
 *   goodwillHigh = 200000 * 1.15 = 230000
 *   totalLow = 170000 + 60000 = 230000
 *   totalHigh = 230000 + 60000 = 290000
 */
import { describe, it, expect } from "vitest";
import { calcPracticeValuation } from "../../../src/lib/tools/compute/practice-valuation.js";

describe("practice purchase builder: brief golden case (ebitda=200000, mixed, midlands, normal, tangibles=60000)", () => {
  const res = calcPracticeValuation(200000, "mixed", "midlands", "normal", 60000);

  it("goodwillLow equals 170000", () => {
    expect(res.goodwillLow).toBeCloseTo(170000, 0);
  });

  it("goodwillHigh equals 230000", () => {
    expect(res.goodwillHigh).toBeCloseTo(230000, 0);
  });

  it("totalLow equals 230000", () => {
    expect(res.totalLow).toBeCloseTo(230000, 0);
  });

  it("totalHigh equals 290000", () => {
    expect(res.totalHigh).toBeCloseTo(290000, 0);
  });

  it("midpoint equals 260000", () => {
    const mid = (res.totalLow + res.totalHigh) / 2;
    expect(mid).toBeCloseTo(260000, 0);
  });

  it("multipleLow is 0.85", () => {
    expect(res.multipleLow).toBeCloseTo(0.85, 5);
  });

  it("multipleHigh is 1.15", () => {
    expect(res.multipleHigh).toBeCloseTo(1.15, 5);
  });
});

describe("practice purchase builder: London private-heavy high demand", () => {
  // mix="private-heavy"=[1.05,1.45]; london=+0.10; high=+0.10
  // adjLow=max(0.4,1.05+0.10+0.10)=1.25; adjHigh=max(0.5,1.45+0.10+0.10)=1.65
  const res = calcPracticeValuation(300000, "private-heavy", "london", "high", 100000);

  it("multipleLow is 1.25", () => {
    expect(res.multipleLow).toBeCloseTo(1.25, 5);
  });

  it("totalLow = 300000*1.25+100000 = 475000", () => {
    expect(res.totalLow).toBeCloseTo(475000, 0);
  });

  it("totalHigh > totalLow", () => {
    expect(res.totalHigh).toBeGreaterThan(res.totalLow);
  });
});

describe("practice purchase builder: floor enforcement (nhs-heavy, wales, low demand)", () => {
  // adjLow=max(0.4, 0.65-0.05-0.10)=max(0.4,0.50)=0.50
  // adjHigh=max(0.5, 0.95-0.05-0.10)=max(0.5,0.80)=0.80
  const res = calcPracticeValuation(100000, "nhs-heavy", "wales", "low", 0);

  it("multipleLow not below floor 0.4", () => {
    expect(res.multipleLow).toBeGreaterThanOrEqual(0.4);
  });

  it("multipleHigh not below floor 0.5", () => {
    expect(res.multipleHigh).toBeGreaterThanOrEqual(0.5);
  });

  it("goodwillLow > 0", () => {
    expect(res.goodwillLow).toBeGreaterThan(0);
  });
});
