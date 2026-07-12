import { describe, it, expect } from "vitest";
import { calcStaffCost, NLW_2026 } from "./staff-cost";

/**
 * Golden-figure suite for staff cost calculator. All expected values are
 * hand-derived, never from the engine.
 *
 * Constants 2026/27:
 *   NLW 21+                    = £12.71/hr (1 Apr 2026)
 *   Employer NIC rate          = 15% above £5,000/yr secondary threshold
 *   Pension qualifying lower   = £6,240/yr
 *   Pension qualifying upper   = £50,270/yr
 *   Employer pension rate      = 3%
 *
 * Sources:
 *   https://www.gov.uk/national-minimum-wage-rates
 *   https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
 */

describe("calcStaffCost — NLW full-time worker", () => {
  it("NLW 40hrs/week, £15,000 revenue/week: checks all line items", () => {
    // annualWage   = 12.71 x 40 x 52 = 26,436.80
    // employerNic  = (26,436.80 - 5,000) x 15% = 21,436.80 x 15% = 3,215.52
    // pensionable  = min(26,436.80, 50,270) - 6,240 = 26,436.80 - 6,240 = 20,196.80
    // pension      = 20,196.80 x 3% = 605.904
    // tronc        = 0
    // totalCost    = 26,436.80 + 3,215.52 + 605.904 = 30,258.224
    // hourly       = 30,258.224 / (40 x 52) = 30,258.224 / 2,080 = 14.5473...
    // annualRev    = 15,000 x 52 = 780,000
    // labourPct    = 30,258.224 / 780,000 x 100 = 3.880...%
    const r = calcStaffCost(NLW_2026, 40, 15000);
    expect(r.annualWage).toBeCloseTo(26436.8, 1);
    expect(r.employerNic).toBeCloseTo(3215.52, 1);
    expect(r.pensionableEarnings).toBeCloseTo(20196.8, 1);
    expect(r.employerPension).toBeCloseTo(605.9, 1);
    expect(r.annualTroncCost).toBeCloseTo(0, 2);
    expect(r.trueTotalAnnualCost).toBeCloseTo(30258.22, 1);
    expect(r.trueHourlyCost).toBeCloseTo(14.547, 2);
    expect(r.annualRevenue).toBeCloseTo(780000, 0);
    expect(r.labourPercent).toBeCloseTo(3.88, 1);
    expect(r.benchmarkVariance).toBeCloseTo(3.88 - 30, 0);
  });
});

describe("calcStaffCost — low-hours worker below NIC threshold", () => {
  it("£12.71/hr 10 hrs/week: annual wage £6,609.20, small NIC", () => {
    // annualWage   = 12.71 x 10 x 52 = 6,609.20
    // employerNic  = (6,609.20 - 5,000) x 15% = 1,609.20 x 15% = 241.38
    // pensionable  = 6,609.20 - 6,240 = 369.20
    // pension      = 369.20 x 3% = 11.076
    // totalCost    = 6,609.20 + 241.38 + 11.076 = 6,861.656
    const r = calcStaffCost(NLW_2026, 10, 5000);
    expect(r.annualWage).toBeCloseTo(6609.2, 1);
    expect(r.employerNic).toBeCloseTo(241.38, 1);
    expect(r.employerPension).toBeCloseTo(11.08, 1);
    expect(r.trueTotalAnnualCost).toBeCloseTo(6861.66, 1);
  });

  it("very low wage: employee below £5,000 threshold, zero employer NIC", () => {
    // £8.00/hr x 10hrs x 52 = £4,160 — below £5,000 secondary threshold
    // employerNic = max(0, (4160 - 5000) x 0.15) = 0
    // pensionable = max(0, 4160 - 6240) = 0 (below lower limit)
    // pension = 0
    // totalCost = 4160
    const r = calcStaffCost(8, 10, 5000);
    expect(r.annualWage).toBeCloseTo(4160, 1);
    expect(r.employerNic).toBeCloseTo(0, 2);
    expect(r.employerPension).toBeCloseTo(0, 2);
    expect(r.trueTotalAnnualCost).toBeCloseTo(4160, 1);
  });
});

describe("calcStaffCost — with tronc", () => {
  it("£12.71/hr 40hrs + £1.00/hr tronc: tronc adds at face value (no NIC)", () => {
    // annualWage    = 26,436.80
    // employerNic   = 3,215.52
    // pension       = 605.90
    // annualTronc   = 1.00 x 40 x 52 = 2,080
    // totalCost     = 26,436.80 + 3,215.52 + 605.90 + 2,080 = 32,338.22
    // hourly        = 32,338.22 / 2,080 = 15.547
    const r = calcStaffCost(NLW_2026, 40, 15000, 1.0);
    expect(r.annualTroncCost).toBeCloseTo(2080, 1);
    expect(r.trueTotalAnnualCost).toBeCloseTo(32338.22, 1);
    expect(r.trueHourlyCost).toBeCloseTo(15.547, 2);
  });
});

describe("calcStaffCost — labour benchmark", () => {
  it("labour at exactly 30%: benchmarkVariance near zero", () => {
    // annualCost for NLW 40hrs = 30,258.22
    // for 30% labour: annualRevenue = 30,258.22 / 0.30 = 100,860.73
    // weeklyRevenue = 100,860.73 / 52 = 1,939.63
    const weeklyRev = 30258.22 / 0.30 / 52;
    const r = calcStaffCost(NLW_2026, 40, weeklyRev);
    expect(r.labourPercent).toBeCloseTo(30, 0);
    expect(Math.abs(r.benchmarkVariance)).toBeLessThan(0.5);
  });
});
