import { describe, it, expect } from "vitest";
import { calcTrueCostCareHour } from "./true-cost-care-hour";

/**
 * Golden-figure suite for true-cost-care-hour calculator.
 * All expected values are hand-derived; arithmetic in comments.
 *
 * Constants (2026/27):
 *   NLW = £12.71/hr  https://www.gov.uk/national-minimum-wage-rates (verified 2026-07-12)
 *   AMAP = £0.55/mile  FA 2026, from 6 Apr 2026
 *   Holiday accrual = 12.07%  on total paid hours (delivered + travel)
 *   Employer NIC = 15% above £5,000/yr  https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 (verified 2026-07-12)
 *   Pension = 3% on qualifying earnings above £6,240/yr
 */

describe("calcTrueCostCareHour", () => {
  it("scenario 1: NLW carer, 30 hrs/wk delivered, 15 min travel/hr, 4 miles/hr, 10% overhead, £22 charged", () => {
    // deliveredHrs/wk = 30; travelHrs/wk = (15/60)*30 = 7.5
    // annualWage (delivered only) = 12.71 * 30 * 52 = 19827.60
    // annualTravelPay = 12.71 * 7.5 * 52 = 4956.90
    // totalAnnualPay = 19827.60 + 4956.90 = 24784.50
    // holidayPay = 24784.50 * 0.1207 = 2993.407 (≈2993.41)
    // earningsForNic = 24784.50 + 2993.41 = 27777.91
    // NIC = (27777.91 - 5000) * 0.15 = 22777.91 * 0.15 = 3416.687
    // pensionable = min(27777.91,50270) - 6240 = 27777.91 - 6240 = 21537.91
    // pension = 21537.91 * 0.03 = 646.137
    // mileage = 4 * 30 * 52 * 0.55 = 3432.00
    // overhead = 24784.50 * 0.10 = 2478.45
    // totalCost = 24784.50 + 3432.00 + 2993.41 + 3416.687 + 646.137 + 2478.45 = 37751.184
    // deliveredHours = 30 * 52 = 1560
    // trueCostPerHour = 37751.184 / 1560 = 24.199
    // marginPerHour = 22 - 24.199 = -2.199 (loss-making)
    const r = calcTrueCostCareHour(12.71, 30, 15, 4, 10, 22);
    expect(r.annualWage).toBeCloseTo(19827.60, 1);
    expect(r.annualTravelPay).toBeCloseTo(4956.90, 1);
    expect(r.annualHolidayPay).toBeCloseTo(24784.50 * 0.1207, 1);
    expect(r.annualMileage).toBeCloseTo(3432.00, 1);
    expect(r.totalDeliveredHours).toBeCloseTo(1560, 0);
    const expectedTotal = 24784.50 + 3432.00 + 24784.50 * 0.1207 + (24784.50 + 24784.50 * 0.1207 - 5000) * 0.15 + (Math.min(24784.50 + 24784.50 * 0.1207, 50270) - 6240) * 0.03 + 24784.50 * 0.10;
    expect(r.trueCostPerHour).toBeCloseTo(expectedTotal / 1560, 1);
    expect(r.marginPerHour).toBeCloseTo(22 - expectedTotal / 1560, 1);
  });

  it("scenario 2: zero travel, zero mileage, 0% overhead, £25 charged — only wage + NIC + pension + holiday", () => {
    // wage = £15/hr, 20 hrs/wk delivered, 0 travel, 0 mileage, 0% overhead
    // annualWage = 15 * 20 * 52 = 15600; annualTravelPay = 0
    // totalAnnualPay = 15600
    // holidayPay = 15600 * 0.1207 = 1882.92
    // earningsForNic = 15600 + 1882.92 = 17482.92
    // NIC = (17482.92 - 5000) * 0.15 = 12482.92 * 0.15 = 1872.438
    // pensionable = 17482.92 - 6240 = 11242.92; pension = 11242.92 * 0.03 = 337.2876
    // mileage = 0; overhead = 0
    // totalCost = 15600 + 0 + 1882.92 + 1872.438 + 337.2876 + 0 = 19692.6456
    // deliveredHours = 20 * 52 = 1040
    // trueCostPerHour = 19692.6456 / 1040 = 18.935
    // marginPerHour = 25 - 18.935 = 6.065; marginPercent = 6.065/25*100 = 24.26%
    const r = calcTrueCostCareHour(15, 20, 0, 0, 0, 25);
    expect(r.annualWage).toBeCloseTo(15600, 1);
    expect(r.annualTravelPay).toBeCloseTo(0, 2);
    expect(r.annualMileage).toBeCloseTo(0, 2);
    expect(r.annualHolidayPay).toBeCloseTo(1882.92, 1);
    expect(r.employerNic).toBeCloseTo(1872.438, 1);
    expect(r.employerPension).toBeCloseTo(337.2876, 1);
    expect(r.totalDeliveredHours).toBeCloseTo(1040, 0);
    expect(r.trueCostPerHour).toBeCloseTo(19692.6456 / 1040, 2);
    expect(r.marginPerHour).toBeCloseTo(25 - 19692.6456 / 1040, 2);
    expect(r.marginPercent).toBeCloseTo((25 - 19692.6456 / 1040) / 25 * 100, 1);
  });

  it("scenario 3: charged rate = 0, marginPercent returns 0 (not NaN/Inf)", () => {
    // wage = £12.71, 10 hrs/wk delivered, 0 travel, 0 mileage, 0% overhead, £0 charged
    // annualWage = 12.71 * 10 * 52 = 6609.20; no travel or mileage
    // holidayPay = 6609.20 * 0.1207 = 797.77
    // earningsForNic = 6609.20 + 797.77 = 7406.97
    // NIC = (7406.97 - 5000) * 0.15 = 2406.97 * 0.15 = 361.046
    // pensionable = 7406.97 - 6240 = 1166.97; pension = 1166.97 * 0.03 = 35.009
    // totalCost = 6609.20 + 0 + 797.77 + 361.046 + 35.009 + 0 = 7803.025
    // deliveredHours = 10 * 52 = 520
    // trueCostPerHour = 7803.025 / 520 = 15.006
    // chargedRate = 0: marginPercent = 0 per implementation guard
    const r = calcTrueCostCareHour(12.71, 10, 0, 0, 0, 0);
    expect(r.totalDeliveredHours).toBeCloseTo(520, 0);
    expect(r.trueCostPerHour).toBeCloseTo(7803.025 / 520, 1);
    expect(r.chargedRate).toBeCloseTo(0, 2);
    expect(r.marginPercent).toBeCloseTo(0, 2); // guard: 0 when chargedRate=0
    expect(r.marginPerHour).toBeCloseTo(-(7803.025 / 520), 1);
  });
});
