import { describe, it, expect } from "vitest";
import { calcSellerTakeHome } from "./seller-take-home";

/**
 * Golden-figure suite for seller-take-home calculator.
 * All expected values hand-derived from 2026/27 ledger constants.
 *
 * Constants:
 *   personalAllowance = 12570
 *   basicRate = 20%, band ceiling 50270, so basic band = 37700 of taxable income
 *   higherRate = 40%
 *   class4Main = 6% on 12570-50270
 *   class4Upper = 2% above 50270
 *   vatRate = 20%
 */
describe("calcSellerTakeHome", () => {
  it("scenario 1: £60k gross, 15% fees, £25k COGS, £5k other costs, not VAT registered", () => {
    // platformFees = 60000 * 0.15 = 9000
    // netProfit = 60000 - 9000 - 25000 - 5000 = 21000
    // taxableIncome = 21000 - 12570 = 8430
    // incomeTax = 8430 * 0.20 = 1686
    // class4: profit=21000, above lower 12570: (21000-12570)*0.06 = 8430*0.06 = 505.80
    // takeHome = 21000 - 1686 - 505.80 = 18808.20
    const r = calcSellerTakeHome(60000, 15, 25000, 5000, false);
    expect(r.platformFees).toBeCloseTo(9000, 1);
    expect(r.netProfit).toBeCloseTo(21000, 1);
    expect(r.incomeTax).toBeCloseTo(1686, 1);
    expect(r.class4Nic).toBeCloseTo(505.8, 1);
    expect(r.vatDue).toBeCloseTo(0, 2);
    expect(r.takeHome).toBeCloseTo(18808.2, 0);
  });

  it("scenario 2: £100k gross, 10% fees, £40k COGS, £10k other, not VAT registered, crosses higher rate band", () => {
    // platformFees = 100000*0.10 = 10000
    // netProfit = 100000-10000-40000-10000 = 40000
    // taxableIncome = 40000-12570 = 27430
    // basicBand = min(27430, 37700) = 27430; incomeTax = 27430*0.20 = 5486
    // class4: (40000-12570)*0.06 = 27430*0.06=1645.80; above 50270: 0
    // takeHome = 40000 - 5486 - 1645.80 = 32868.20
    const r = calcSellerTakeHome(100000, 10, 40000, 10000, false);
    expect(r.netProfit).toBeCloseTo(40000, 1);
    expect(r.incomeTax).toBeCloseTo(5486, 1);
    expect(r.class4Nic).toBeCloseTo(1645.8, 1);
    expect(r.takeHome).toBeCloseTo(32868.2, 0);
  });

  it("scenario 3: profit = 0, all outputs are 0 or zero", () => {
    // grossRevenue=10000, fees=100%=10000, cogs=0, other=0
    const r = calcSellerTakeHome(10000, 100, 0, 0, false);
    expect(r.netProfit).toBeCloseTo(0, 1);
    expect(r.incomeTax).toBeCloseTo(0, 2);
    expect(r.class4Nic).toBeCloseTo(0, 2);
    expect(r.takeHome).toBeCloseTo(0, 1);
  });
});
