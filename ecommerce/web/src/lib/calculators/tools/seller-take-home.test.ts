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
  // --- Top band and personal-allowance taper (added 2026-09-25, P0A rows 4 and 5) ---
  // Constants re-derived from docs/ecommerce/rates_ledger.json:
  //   personal_allowance 12570, tapered £1 per £2 above £100,000, nil at £125,140
  //   basic_rate_band_ceiling 37700 (taxable), income_tax_additional_rate 45% above £125,140 taxable

  it("control: net profit £95,000 is just below the taper, full personal allowance", () => {
    // gross 100000, 0% fees, cogs 5000 -> netProfit 95000
    // PA 12570 (no taper); taxable 82430
    // tax = 37700*0.20 + 44730*0.40 = 7540 + 17892 = 25432
    // class4 = 37700*0.06 + 44730*0.02 = 2262 + 894.60 = 3156.60
    const r = calcSellerTakeHome(100000, 0, 5000, 0, false);
    expect(r.netProfit).toBeCloseTo(95000, 1);
    expect(r.incomeTax).toBeCloseTo(25432, 1);
    expect(r.class4Nic).toBeCloseTo(3156.6, 1);
    expect(r.takeHome).toBeCloseTo(66411.4, 0);
  });

  it("taper bites: net profit £110,000 loses £5,000 of allowance, £2,000 more tax", () => {
    // PA = 12570 - (110000-100000)/2 = 7570; taxable = 102430
    // tax = 37700*0.20 + 64730*0.40 = 7540 + 25892 = 33432
    // untapered would be 31432, so the taper adds exactly 5000*0.40 = 2000
    // class4 = 2262 + 59730*0.02 = 3456.60
    const r = calcSellerTakeHome(110000, 0, 0, 0, false);
    expect(r.netProfit).toBeCloseTo(110000, 1);
    expect(r.incomeTax).toBeCloseTo(33432, 1);
    expect(r.incomeTax - 31432).toBeCloseTo(2000, 1);
    expect(r.class4Nic).toBeCloseTo(3456.6, 1);
    expect(r.takeHome).toBeCloseTo(73111.4, 0);
  });

  it("additional rate: net profit £150,000 has nil allowance and a 45% slice", () => {
    // PA = 0; taxable = 150000
    // tax = 37700*0.20 + 87440*0.40 + 24860*0.45 = 7540 + 34976 + 11187 = 53703
    // class4 = 2262 + 99730*0.02 = 4256.60
    const r = calcSellerTakeHome(150000, 0, 0, 0, false);
    expect(r.incomeTax).toBeCloseTo(53703, 1);
    expect(r.class4Nic).toBeCloseTo(4256.6, 1);
    expect(r.takeHome).toBeCloseTo(92040.4, 0);
  });
});
