import { describe, it, expect } from "vitest";
import { calcStVsLtd } from "./sole-trader-vs-ltd-sellers";

/**
 * Golden-figure suite for sole-trader-vs-ltd-sellers calculator.
 * Model: salary £5,000 (employer NIC secondary threshold), CT marginal relief
 * between £50,000 and £250,000, unused personal allowance shelters dividends,
 * £500 dividend allowance taxed at 0% inside the band. 2026/27 ledger rates.
 *
 * Scenario A: profit = £40,000
 *   Sole trader:
 *     taxable = 40000 - 12570 = 27430; incomeTax = 27430 * 0.20 = 5486
 *     class4 = 27430 * 0.06 = 1645.80; stTakeHome = 32868.20
 *   Ltd:
 *     profitAfterSalary = 35000; CT = 35000 * 0.19 = 6650; netAfterCt = 28350
 *     paShelter = 12570 - 5000 = 7570; divTaxableIncome = 28350 - 7570 = 20780
 *     divBasic = (20780 - 500) * 0.1075 = 20280 * 0.1075 = 2180.10
 *     ltdTakeHome = 5000 + 28350 - 2180.10 = 31169.90
 *     saving = 31169.90 - 32868.20 = -1698.30 (sole trader ahead)
 *
 * Scenario B: profit = £70,000 (cross-checks the blog worked example)
 *   Sole trader:
 *     incomeTax = 37700*0.20 + 19730*0.40 = 7540 + 7892 = 15432
 *     class4 = 37700*0.06 + 19730*0.02 = 2262 + 394.60 = 2656.60
 *     stTakeHome = 70000 - 15432 - 2656.60 = 51911.40
 *   Ltd:
 *     profitAfterSalary = 65000
 *     CT = 65000*0.25 - (250000-65000)*3/200 = 16250 - 2775 = 13475 (marginal relief)
 *     netAfterCt = 51525; divTaxableIncome = 51525 - 7570 = 43955
 *     inBasic = 37700; divTax = (37700-500)*0.1075 + (43955-37700)*0.3575
 *             = 3999.00 + 2236.1625 = 6235.16
 *     ltdTakeHome = 5000 + 51525 - 6235.16 = 50289.84
 *     saving = -1621.56 (sole trader ahead at full extraction; matches blog ~£1,600)
 */
describe("calcStVsLtd", () => {
  it("profit £40,000: sole trader ahead by ~£1,698", () => {
    const r = calcStVsLtd(40000);
    expect(r.stTax).toBeCloseTo(5486, 0);
    expect(r.stNic).toBeCloseTo(1645.8, 1);
    expect(r.stTakeHome).toBeCloseTo(32868.2, 0);
    expect(r.ltdCt).toBeCloseTo(6650, 0);
    expect(r.ltdDivTax).toBeCloseTo(2180.1, 0);
    expect(r.ltdTakeHome).toBeCloseTo(31169.9, 0);
    expect(r.saving).toBeCloseTo(-1698.3, 0);
  });

  it("profit £70,000: marginal relief applied, sole trader ahead by ~£1,622 at full extraction", () => {
    const r = calcStVsLtd(70000);
    expect(r.stTax).toBeCloseTo(15432, 0);
    expect(r.stNic).toBeCloseTo(2656.6, 1);
    expect(r.stTakeHome).toBeCloseTo(51911.4, 0);
    expect(r.ltdCt).toBeCloseTo(13475, 0);
    expect(r.ltdDivTax).toBeCloseTo(6235.16, 0);
    expect(r.ltdTakeHome).toBeCloseTo(50289.84, 0);
    expect(r.saving).toBeCloseTo(-1621.56, 0);
  });

  it("CT small-rate boundary: £55,000 profit (taxable £50,000) stays at 19%", () => {
    const r = calcStVsLtd(55000);
    expect(r.ltdCt).toBeCloseTo(50000 * 0.19, 0); // 9500, no cliff
  });

  it("profit = 0: all outputs are 0", () => {
    const r = calcStVsLtd(0);
    expect(r.stTax).toBeCloseTo(0, 2);
    expect(r.stNic).toBeCloseTo(0, 2);
    expect(r.ltdCt).toBeCloseTo(0, 2);
    expect(r.ltdDivTax).toBeCloseTo(0, 2);
  });
});
