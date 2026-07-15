import { describe, it, expect } from "vitest";
import { calcSideHustle, TRADING_ALLOWANCE } from "./side-hustle-tax-checker";

/**
 * Golden-figure suite for side-hustle-tax-checker.
 * All rates from docs/ecommerce/rates_ledger.json (verified 2026-07-15).
 *
 * Band constants reused from sole-trader-vs-ltd-sellers.ts:
 *   PERSONAL_ALLOWANCE = £12,570
 *   BASIC_BAND_WIDTH   = £37,700  (taxable-income ceiling of basic-rate band)
 *   CLASS4_LOWER       = £12,570
 *   BASIC_RATE = 20%, HIGHER_RATE = 40%, ADDITIONAL_RATE = 45%
 *   CLASS4_MAIN = 6%, CLASS4_UPPER_RATE = 2%
 *
 * Employment-income stacking logic:
 *   taxableEmp = max(0, employmentIncome - 12570)
 *   basicRemaining = max(0, 37700 - min(taxableEmp, 37700))
 *   Side profit fills basicRemaining first, then higher band.
 *
 * Case A — within trading allowance:
 *   grossIncome £900 ≤ £1,000 → verdict "within_allowance", all zeros.
 *
 * Case B — allowance route, all basic rate:
 *   grossIncome £5,000, costs £500, employment £30,000
 *   costs £500 < trading allowance £1,000 → use allowance
 *   taxableSideProfit = 5000 - 1000 = £4,000
 *   taxableEmp = 30000 - 12570 = 17430; basicRemaining = 37700 - 17430 = 20270
 *   profitInBasic = min(4000, 20270) = 4000; incomeTax = 4000 * 0.20 = £800
 *   class4: 4000 < 12570 → £0
 *
 * Case C — actual-costs route, all basic rate:
 *   grossIncome £5,000, costs £2,000, employment £30,000
 *   costs £2,000 > trading allowance £1,000 → use actual costs
 *   taxableSideProfit = 5000 - 2000 = £3,000
 *   profitInBasic = min(3000, 20270) = 3000; incomeTax = 3000 * 0.20 = £600
 *   class4: 3000 < 12570 → £0
 *
 * Case D — higher-rate stacking (employment already above £50,270):
 *   grossIncome £10,000, costs £1,000 (= allowance), employment £55,000
 *   deduction: costs = allowance = £1,000; use allowance (same result either way)
 *   taxableSideProfit = 9000
 *   taxableEmp = 55000 - 12570 = 42430; basicRemaining = max(0, 37700 - 37700) = 0
 *   (42430 > 37700, so basic band is fully used)
 *   profitInBasic = 0; profitInHigher = min(9000, 112570) = 9000
 *   incomeTax = 9000 * 0.40 = £3,600
 *   class4: 9000 < 12570 → £0
 *
 * Case E — straddle (employment uses part of basic band):
 *   grossIncome £8,000, costs £1,000 (= allowance), employment £45,000
 *   use allowance; taxableSideProfit = 7000
 *   taxableEmp = 45000 - 12570 = 32430; basicRemaining = 37700 - 32430 = 5270
 *   profitInBasic = min(7000, 5270) = 5270 → taxAtBasic = 5270 * 0.20 = £1,054
 *   profitInHigher = 7000 - 5270 = 1730 → taxAtHigher = 1730 * 0.40 = £692
 *   incomeTax = 1054 + 692 = £1,746
 *   class4: 7000 < 12570 → £0
 *
 * Case F — no employment income, profit below personal allowance:
 *   grossIncome £5,000, costs £500, employment £0
 *   use allowance; taxableSideProfit = 4000
 *   taxableEmp = 0; basicRemaining = 37700
 *   Personal allowance protects the employment-income slot but side profit stacks:
 *   NOTE: with employment £0, the PA is available against side profit.
 *   taxableEmp = max(0, 0 - 12570) = 0; basicRemaining = 37700 - 0 = 37700
 *   Side profit £4,000 falls fully in the basic band — but wait:
 *   if the personal allowance is not already used (employment = 0),
 *   the engine must not apply it again to side profit.
 *   The engine computes taxableEmp = max(0, emp - PA) = 0,
 *   and profitInBasic = min(4000, 37700) = 4000 → incomeTax = 4000*0.20 = £800.
 *   This is CORRECT: without employment, taxable side profit = 4000 (after trading allowance),
 *   which when added to £0 employment gives taxable total of £4,000 (all in basic band).
 *   The personal allowance shelters £12,570 of taxable income total.
 *   Total income = side profit after deduction = £4,000; this is under PA → tax £0 ONLY if
 *   the PA is NOT already used. We must re-check the engine's handling of employment=0.
 *
 *   Re-analysis for employment = 0:
 *   taxableEmp = max(0, 0 - 12570) = 0 — the 0 here means zero of the basic band is used
 *   by employment. The engine then says profitInBasic = min(4000, 37700) = 4000,
 *   incomeTax = 4000 * 0.20 = £800. But the real answer if there is no other income:
 *   taxable income = side profit = £4,000; PA = £12,570; taxable = max(0, 4000-12570) = 0.
 *   So the engine as written would OVER-tax the employment=0 case because it assumes
 *   the personal allowance is pre-consumed by employment and doesn't re-apply it.
 *   We test what the engine ACTUALLY produces (which matches the spec: employment-stacking
 *   mode — when employment is 0, the engine must still apply the PA correctly).
 *
 *   CORRECTION: the engine does max(0, emp - PA) for taxableEmp but does NOT apply any
 *   remaining PA to the side profit. This is intentional for the main use-case (employed).
 *   For employment=0, the correct behaviour is: PA shelters the first £12,570 of ANY income,
 *   including side profit. So when employment=0, the side profit of £4,000 is fully sheltered
 *   by the unused personal allowance and tax = £0.
 *
 *   We need to verify the engine handles this. Looking at the engine: it applies taxableEmp
 *   to consume the basic band, then fills remaining band with side profit. But it never adjusts
 *   the PA against side profit. This means for employment=0 the engine may return £800 not £0.
 *
 *   Per the brief: "if employment income £0 and side profit below the personal allowance → £0
 *   income tax". The engine MUST handle this. We will assert the expected behaviour and fix
 *   the engine if needed.
 *
 * Case G — negative profit (loss):
 *   grossIncome £1,500, costs £2,000, employment £30,000 → loss, verdict "loss", all taxes £0.
 */

describe("calcSideHustle", () => {
  it("TRADING_ALLOWANCE constant is £1,000", () => {
    expect(TRADING_ALLOWANCE).toBe(1000);
  });

  describe("Case A: within trading allowance", () => {
    it("gross income £900 → verdict within_allowance, zero tax", () => {
      const r = calcSideHustle(900, 200, 30000);
      expect(r.verdict).toBe("within_allowance");
      expect(r.incomeTax).toBe(0);
      expect(r.class4Nic).toBe(0);
      expect(r.totalTax).toBe(0);
      expect(r.taxableSideProfit).toBe(0);
    });

    it("gross income exactly £1,000 → verdict within_allowance", () => {
      const r = calcSideHustle(1000, 0, 40000);
      expect(r.verdict).toBe("within_allowance");
      expect(r.totalTax).toBe(0);
    });
  });

  describe("Case B: allowance route, all basic rate", () => {
    it("income £5,000, costs £500, employment £30,000 → allowance used, tax £800, class4 £0", () => {
      const r = calcSideHustle(5000, 500, 30000);
      expect(r.verdict).toBe("taxable");
      expect(r.deductionRoute).toBe("allowance");
      expect(r.deductionUsed).toBe(1000);
      expect(r.taxableSideProfit).toBe(4000);
      expect(r.incomeTax).toBeCloseTo(800, 2);
      expect(r.taxAtBasic).toBeCloseTo(800, 2);
      expect(r.taxAtHigher).toBe(0);
      expect(r.class4Nic).toBe(0); // 4000 < 12570
      expect(r.totalTax).toBeCloseTo(800, 2);
    });
  });

  describe("Case C: actual-costs route, all basic rate", () => {
    it("income £5,000, costs £2,000, employment £30,000 → actual costs used, tax £600", () => {
      const r = calcSideHustle(5000, 2000, 30000);
      expect(r.verdict).toBe("taxable");
      expect(r.deductionRoute).toBe("actual");
      expect(r.deductionUsed).toBe(2000);
      expect(r.taxableSideProfit).toBe(3000);
      expect(r.incomeTax).toBeCloseTo(600, 2);
      expect(r.taxAtBasic).toBeCloseTo(600, 2);
      expect(r.taxAtHigher).toBe(0);
      expect(r.class4Nic).toBe(0);
      expect(r.totalTax).toBeCloseTo(600, 2);
    });
  });

  describe("Case D: higher-rate stacking (employment £55,000)", () => {
    it("income £10,000, costs £1,000, employment £55,000 → all at 40%, tax £3,600", () => {
      const r = calcSideHustle(10000, 1000, 55000);
      expect(r.verdict).toBe("taxable");
      expect(r.taxableSideProfit).toBe(9000);
      expect(r.taxAtBasic).toBe(0);
      expect(r.taxAtHigher).toBeCloseTo(3600, 2);
      expect(r.incomeTax).toBeCloseTo(3600, 2);
      expect(r.class4Nic).toBe(0); // 9000 < 12570
      expect(r.totalTax).toBeCloseTo(3600, 2);
    });
  });

  describe("Case E: straddle — employment £45,000, side profit splits bands", () => {
    it("income £8,000, costs £1,000, employment £45,000 → £5,270 at 20%, £1,730 at 40%", () => {
      // taxableEmp = 45000 - 12570 = 32430
      // basicRemaining = 37700 - 32430 = 5270
      const r = calcSideHustle(8000, 1000, 45000);
      expect(r.verdict).toBe("taxable");
      expect(r.taxableSideProfit).toBe(7000);
      expect(r.taxAtBasic).toBeCloseTo(5270 * 0.20, 2); // 1054
      expect(r.taxAtHigher).toBeCloseTo(1730 * 0.40, 2); // 692
      expect(r.incomeTax).toBeCloseTo(1746, 1);
      expect(r.class4Nic).toBe(0);
    });
  });

  describe("Case F: employment £0, profit below personal allowance", () => {
    it("income £5,000, costs £500, employment £0 → profit £4,000 below PA → tax £0", () => {
      // Side profit after allowance = £4,000; no employment → PA not consumed → £0 tax
      const r = calcSideHustle(5000, 500, 0);
      expect(r.verdict).toBe("taxable");
      expect(r.taxableSideProfit).toBe(4000);
      expect(r.incomeTax).toBeCloseTo(0, 2);
      expect(r.totalTax).toBeCloseTo(0, 2); // class4 also 0 (4000 < 12570)
    });

    it("income £20,000, costs £500, employment £0 → profit £19,000, PA shelters first £12,570", () => {
      // After allowance: profit = 19000; PA available (employment=0)
      // taxable = 19000 - 12570 = 6430; incomeTax = 6430 * 0.20 = £1,286
      // class4: 19000 > 12570 → (min(19000,50270) - 12570) * 0.06 = 6430 * 0.06 = 385.80
      const r = calcSideHustle(20000, 500, 0);
      expect(r.verdict).toBe("taxable");
      expect(r.taxableSideProfit).toBe(19000);
      expect(r.incomeTax).toBeCloseTo(1286, 0);
      expect(r.class4Nic).toBeCloseTo(385.8, 1);
    });
  });

  describe("Case G: loss", () => {
    it("income £1,500, costs £2,000 → loss, all zeros", () => {
      const r = calcSideHustle(1500, 2000, 30000);
      expect(r.verdict).toBe("loss");
      expect(r.incomeTax).toBe(0);
      expect(r.class4Nic).toBe(0);
      expect(r.totalTax).toBe(0);
    });
  });

  describe("Class 4 NIC threshold", () => {
    it("side profit £15,000, employment £0 → class4 = (15000-12570)*0.06", () => {
      // tax: profit=14000 after allowance; oh wait costs=500 allowance=1000 → profit=14000? No:
      // gross=15000, costs=500, allowance wins, taxableSideProfit=14000
      // employment=0, taxableEmp=0, profitInBasic=14000, incomeTax=(14000-12570)*0.20=286
      // class4: min(14000,50270)-12570 = 1430; 1430*0.06 = 85.80
      const r = calcSideHustle(15000, 500, 0);
      expect(r.taxableSideProfit).toBe(14000);
      expect(r.class4Nic).toBeCloseTo(85.8, 1);
    });

    it("side profit above class4 upper, employment £0 → class4 spans both rates", () => {
      // gross=60000, costs=500 → allowance wins; profit=59000
      // employment=0; class4 main: (50270-12570)*0.06=37700*0.06=2262
      // class4 upper: (59000-50270)*0.02=8730*0.02=174.60; total class4=2436.60
      const r = calcSideHustle(60000, 500, 0);
      expect(r.taxableSideProfit).toBe(59000);
      expect(r.class4Nic).toBeCloseTo(2436.6, 1);
    });
  });

  describe("toggle class4 off", () => {
    it("class4 is 0 when includeClass4=false", () => {
      const r = calcSideHustle(20000, 500, 0, false);
      expect(r.class4Nic).toBe(0);
      expect(r.incomeTax).toBeGreaterThan(0);
    });
  });
});
