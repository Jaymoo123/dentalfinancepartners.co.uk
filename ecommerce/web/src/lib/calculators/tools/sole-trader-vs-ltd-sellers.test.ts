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
  // --- Top band and personal-allowance taper (added 2026-09-25, P0A rows 4 and 5) ---

  it("taper window: profit £110,000 costs £2,000 more sole-trader income tax", () => {
    // PA = 12570 - (110000-100000)/2 = 7570; taxable = 102430
    // stTax = 37700*0.20 + 64730*0.40 = 33432 (untapered 31432)
    // stNic = 37700*0.06 + 59730*0.02 = 3456.60
    const r = calcStVsLtd(110000);
    expect(r.stTax).toBeCloseTo(33432, 1);
    expect(r.stTax - 31432).toBeCloseTo(2000, 1);
    expect(r.stNic).toBeCloseTo(3456.6, 1);
    expect(r.stTakeHome).toBeCloseTo(73111.4, 0);
  });

  it("profit £150,000: sole trader hits 45%, director loses most of the allowance", () => {
    // Sole trader: PA 0, taxable 150000
    //   stTax = 37700*0.20 + 87440*0.40 + 24860*0.45 = 7540 + 34976 + 11187 = 53703
    //   stNic = 2262 + 99730*0.02 = 4256.60; stTakeHome = 92040.40
    // Ltd: profitAfterSalary 145000; CT = 145000*0.25 - 105000*3/200 = 34675
    //   netAfterCt 110325; totalExtract 115325; PA = 12570 - 15325/2 = 4907.50
    //   salary taxable 92.50 -> salary tax 18.50
    //   divTaxable 110325; inBasic 37607.50 -> (37607.50-500)*0.1075 = 3989.05625
    //   inHigher 72717.50 *0.3575 = 25996.50625; divTax = 29985.5625
    //   ltdTakeHome = 115325 - 29985.5625 - 18.50 = 85320.9375
    const r = calcStVsLtd(150000);
    expect(r.stTax).toBeCloseTo(53703, 1);
    expect(r.stNic).toBeCloseTo(4256.6, 1);
    expect(r.stTakeHome).toBeCloseTo(92040.4, 0);
    expect(r.ltdCt).toBeCloseTo(34675, 1);
    expect(r.ltdSalaryTax).toBeCloseTo(18.5, 2);
    expect(r.ltdDivTax).toBeCloseTo(29985.5625, 2);
    expect(r.ltdTakeHome).toBeCloseTo(85320.9375, 2);
  });

  it("profit £250,000: the 39.35% additional dividend rate applies", () => {
    // Ltd: profitAfterSalary 245000; CT = 245000*0.25 - 5000*3/200 = 61175
    //   netAfterCt 183825; totalExtract 188825; PA 0; salary tax 5000*0.20 = 1000
    //   divInBasic 32700 -> (32700-500)*0.1075 = 3461.50
    //   divInHigher 87440*0.3575 = 31259.80
    //   divAdditional 183825-32700-87440 = 63685 *0.3935 = 25060.0475
    //   divTax = 59781.3475; ltdTakeHome = 188825 - 59781.3475 - 1000 = 128043.6525
    // Sole trader: stTax = 7540 + 34976 + 124860*0.45 = 98703; stNic = 2262 + 199730*0.02 = 6256.60
    const r = calcStVsLtd(250000);
    expect(r.stTax).toBeCloseTo(98703, 1);
    expect(r.stNic).toBeCloseTo(6256.6, 1);
    expect(r.ltdCt).toBeCloseTo(61175, 1);
    expect(r.ltdSalaryTax).toBeCloseTo(1000, 2);
    expect(r.ltdDivTax).toBeCloseTo(59781.3475, 2);
    expect(r.ltdTakeHome).toBeCloseTo(128043.6525, 2);
  });
});
