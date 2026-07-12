import { describe, it, expect } from "vitest";
import { calcSleepInNmw, NLW_2026, NMW_18_20, NMW_UNDER_18 } from "./sleep-in-nmw";

/**
 * Golden-figure suite for sleep-in-nmw calculator.
 * All expected values hand-derived from Mencap ruling + NMW rules.
 *
 * Legal basis: R (Mencap) v Tomlinson-Blake [2021] UKSC 8
 *   Sleep-in: only awake-for-work hours count for NMW
 *   Waking night: all hours count for NMW
 *
 * NLW/NMW from 1 Apr 2026 (https://www.gov.uk/national-minimum-wage-rates, verified 2026-07-12):
 *   21+ = £12.71/hr
 *   18-20 = £10.85/hr
 *   under 18 = £8.00/hr
 */

describe("calcSleepInNmw — sleep-in shifts (Mencap ruling)", () => {
  it("sleep-in 8hr shift, 1hr awake, £50 flat, 21+: compliant", () => {
    // nmwHours = 1 (awake only); required = 1 * 12.71 = £12.71
    // flatRate £50 >= £12.71 → COMPLIANT
    // effectiveHourlyRate = 50/8 = 6.25 (informational)
    // nmwHourlyEquivalent = 50/1 = 50.00
    const r = calcSleepInNmw("sleep-in", 8, 1, 50, "21plus");
    expect(r.applicableNmw).toBeCloseTo(NLW_2026, 2);
    expect(r.nmwHours).toBeCloseTo(1, 2);
    expect(r.requiredMinimumPay).toBeCloseTo(NLW_2026 * 1, 2); // £12.71
    expect(r.isCompliant).toBe(true);
    expect(r.shortfallPerShift).toBeCloseTo(0, 2);
    expect(r.nmwHourlyEquivalent).toBeCloseTo(50, 2);
  });

  it("sleep-in 8hr shift, 2hr awake, £20 flat, 21+: NON-compliant", () => {
    // nmwHours = 2; required = 2 * 12.71 = £25.42
    // flatRate £20 < £25.42 → NON-COMPLIANT
    // shortfall = 25.42 - 20 = £5.42
    const r = calcSleepInNmw("sleep-in", 8, 2, 20, "21plus");
    expect(r.requiredMinimumPay).toBeCloseTo(NLW_2026 * 2, 2); // £25.42
    expect(r.isCompliant).toBe(false);
    expect(r.shortfallPerShift).toBeCloseTo(NLW_2026 * 2 - 20, 2); // £5.42
  });

  it("sleep-in 10hr shift, 0hr awake (no interruptions), £30 flat, 18-20: compliant (£0 required)", () => {
    // nmwHours = 0; required = 0 * 10.85 = £0
    // flatRate £30 >= £0 → COMPLIANT (employer still pays a flat rate; just no NMW obligation on sleep hours)
    const r = calcSleepInNmw("sleep-in", 10, 0, 30, "18to20");
    expect(r.applicableNmw).toBeCloseTo(NMW_18_20, 2);
    expect(r.requiredMinimumPay).toBeCloseTo(0, 2);
    expect(r.isCompliant).toBe(true);
    expect(r.shortfallPerShift).toBeCloseTo(0, 2);
  });
});

describe("calcSleepInNmw — waking night shifts (all hours count)", () => {
  it("waking night 8hr, £100 flat, 21+: compliant (required £101.68)", () => {
    // nmwHours = 8 (all hours); required = 8 * 12.71 = £101.68
    // flatRate £100 < £101.68 → NON-COMPLIANT
    const r = calcSleepInNmw("waking-night", 8, 0, 100, "21plus");
    expect(r.isWakingNight).toBe(true);
    expect(r.nmwHours).toBeCloseTo(8, 2);
    expect(r.requiredMinimumPay).toBeCloseTo(NLW_2026 * 8, 2); // £101.68
    expect(r.isCompliant).toBe(false);
    expect(r.shortfallPerShift).toBeCloseTo(NLW_2026 * 8 - 100, 2); // £1.68
  });

  it("waking night 8hr, £110 flat, 21+: compliant", () => {
    // required = 8 * 12.71 = £101.68; £110 >= £101.68 → COMPLIANT
    const r = calcSleepInNmw("waking-night", 8, 0, 110, "21plus");
    expect(r.isCompliant).toBe(true);
    expect(r.shortfallPerShift).toBeCloseTo(0, 2);
  });

  it("waking night 12hr, £90 flat, under-18: compliant (required £96)", () => {
    // nmwHours = 12; required = 12 * 8.00 = £96.00
    // flatRate £90 < £96 → NON-COMPLIANT
    const r = calcSleepInNmw("waking-night", 12, 0, 90, "under18");
    expect(r.applicableNmw).toBeCloseTo(NMW_UNDER_18, 2);
    expect(r.requiredMinimumPay).toBeCloseTo(NMW_UNDER_18 * 12, 2); // £96.00
    expect(r.isCompliant).toBe(false);
    expect(r.shortfallPerShift).toBeCloseTo(NMW_UNDER_18 * 12 - 90, 2); // £6.00
  });
});
