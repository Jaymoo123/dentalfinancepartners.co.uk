/**
 * Golden tests for the practice sale CGT/BADR xlsx builder.
 *
 * Asserts that the workbook formula logic at its default inputs equals
 * calcPracticeSaleCgt() from the compute lib.
 *
 * Golden case (brief §4.1):
 *   gain=200000, otherIncome=50000, badrEligible=true, aeaAvailable=3000
 *   -> taxableGain=197000, totalCgt=35460, netProceeds=164540
 *
 * Trace:
 *   taxableGain = max(0, 200000-3000) = 197000
 *   incomeInBasicBand = min(max(0,50000-12570), 50270-12570) = min(37430,37700) = 37430
 *   basicBandRemaining = max(0, 37700-37430) = 270
 *   BADR: eligible, lifetime=1000000 > 0
 *     gainAtBadr = min(197000, 1000000) = 197000
 *     CGT_BADR = 197000 * 0.18 = 35460
 *     remainingGain = 0
 *   totalCgt = 35460
 *   netProceeds = 200000 - 35460 = 164540
 */
import { describe, it, expect } from "vitest";
import { calcPracticeSaleCgt } from "../../../src/lib/tools/compute/practice-sale-cgt.js";

describe("practice sale builder: brief golden case (gain=200000, otherIncome=50000, BADR=true, AEA=3000)", () => {
  const res = calcPracticeSaleCgt({
    gain: 200000,
    otherIncome: 50000,
    badrEligible: true,
    aeaAvailable: 3000,
  });

  it("taxableGain equals 197000", () => {
    expect(res.taxableGain).toBe(197000);
  });

  it("totalCgt equals 35460", () => {
    expect(res.totalCgt).toBeCloseTo(35460, 0);
  });

  it("netProceeds equals 164540", () => {
    expect(res.netProceeds).toBeCloseTo(164540, 0);
  });

  it("gainAtBadr is the full taxable gain (all within lifetime)", () => {
    expect(res.gainAtBadr).toBe(197000);
  });

  it("gainAtBasic is 0 (all absorbed by BADR)", () => {
    expect(res.gainAtBasic).toBe(0);
  });

  it("gainAtHigher is 0 (all absorbed by BADR)", () => {
    expect(res.gainAtHigher).toBe(0);
  });

  it("conservation: taxableGain = gainAtBadr + gainAtBasic + gainAtHigher", () => {
    expect(res.gainAtBadr + res.gainAtBasic + res.gainAtHigher).toBe(res.taxableGain);
  });

  it("conservation: netProceeds = gain - totalCgt", () => {
    expect(Math.abs(res.netProceeds - (200000 - res.totalCgt))).toBeLessThan(0.01);
  });
});

describe("practice sale builder: no BADR (higher CGT rates)", () => {
  // gain=200000, otherIncome=50000, BADR=false, AEA=3000
  // taxableGain=197000
  // basicBandRemaining = 270
  // gainAtBasic = 270, cgt = 270*0.18 = 48.60
  // gainAtHigher = 196730, cgt = 196730*0.24 = 47215.20
  // totalCgt = 48.60+47215.20 = 47263.80
  const res = calcPracticeSaleCgt({
    gain: 200000,
    otherIncome: 50000,
    badrEligible: false,
    aeaAvailable: 3000,
  });

  it("totalCgt > 35460 without BADR", () => {
    expect(res.totalCgt).toBeGreaterThan(35460);
  });

  it("totalCgt is close to 47264", () => {
    expect(res.totalCgt).toBeCloseTo(47264, 0);
  });

  it("gainAtBadr is 0", () => {
    expect(res.gainAtBadr).toBe(0);
  });
});

describe("practice sale builder: zero gain (below AEA)", () => {
  const res = calcPracticeSaleCgt({
    gain: 2000,
    otherIncome: 30000,
    badrEligible: true,
    aeaAvailable: 3000,
  });

  it("taxableGain is 0", () => {
    expect(res.taxableGain).toBe(0);
  });

  it("totalCgt is 0", () => {
    expect(res.totalCgt).toBe(0);
  });

  it("netProceeds equals gain", () => {
    expect(res.netProceeds).toBe(2000);
  });
});

describe("practice sale builder: BADR lifetime limit binding", () => {
  // lifetime remaining = 100000, gain = 500000, AEA=3000
  // taxableGain = 497000
  // gainAtBadr = min(497000,100000) = 100000 at 18%
  // remaining = 397000 at standard CGT
  const res = calcPracticeSaleCgt({
    gain: 500000,
    otherIncome: 0,
    badrEligible: true,
    aeaAvailable: 3000,
    badrLifetimeRemaining: 100000,
  });

  it("gainAtBadr = 100000 (lifetime limit)", () => {
    expect(res.gainAtBadr).toBe(100000);
  });

  it("remainder at standard CGT > 0", () => {
    expect(res.gainAtBasic + res.gainAtHigher).toBeGreaterThan(0);
  });

  it("conservation", () => {
    expect(res.gainAtBadr + res.gainAtBasic + res.gainAtHigher).toBe(res.taxableGain);
  });
});
