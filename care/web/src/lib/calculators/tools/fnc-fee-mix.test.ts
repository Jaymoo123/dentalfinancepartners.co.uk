import { describe, it, expect } from "vitest";
import { calcFncFeeMix, FNC_WEEKLY_RATE } from "./fnc-fee-mix";

/**
 * Golden-figure suite for fnc-fee-mix calculator.
 * All expected values hand-derived; arithmetic in comments.
 *
 * FNC rate: £267.68/week (2026-27 England, from 1 Apr 2026)
 * Source: spec (tier1_care/CALCULATORS.md). Live NHS England URLs returned 404 on 2026-07-12.
 * Operator must verify current rate at NHS England before production use.
 */

describe("calcFncFeeMix", () => {
  it("scenario 1: mixed bed types, verify blended revenue and margin", () => {
    // 10 self-funder at £1,400/wk: revenue = 14000
    // 12 LA at £950/wk: revenue = 11400
    // 8 FNC at base £1,100/wk + £267.68 FNC = £1,367.68/wk: revenue = 8 * 1367.68 = 10941.44
    // totalRevenue = 14000 + 11400 + 10941.44 = 36341.44
    // totalBeds = 30
    // blendedPerBed = 36341.44 / 30 = 1211.38
    // weeklyOperatingCost = 28000
    // grossMarginAmount = 36341.44 - 28000 = 8341.44
    // grossMarginPercent = 8341.44/36341.44*100 = 22.96%
    const r = calcFncFeeMix(10, 1400, 12, 950, 8, 1100, 28000);
    expect(r.selfFunderRevenue).toBeCloseTo(14000, 1);
    expect(r.laRevenue).toBeCloseTo(11400, 1);
    expect(r.fncRevenue).toBeCloseTo(8 * (1100 + FNC_WEEKLY_RATE), 2);
    expect(r.totalRevenue).toBeCloseTo(14000 + 11400 + 8 * (1100 + FNC_WEEKLY_RATE), 1);
    expect(r.totalBeds).toBe(30);
    expect(r.blendedRevenuePerBed).toBeCloseTo((14000 + 11400 + 8 * (1100 + FNC_WEEKLY_RATE)) / 30, 1);
    expect(r.grossMarginAmount).toBeCloseTo(14000 + 11400 + 8 * (1100 + FNC_WEEKLY_RATE) - 28000, 1);
    expect(r.grossMarginPercent).toBeCloseTo(
      ((14000 + 11400 + 8 * (1100 + FNC_WEEKLY_RATE) - 28000) / (14000 + 11400 + 8 * (1100 + FNC_WEEKLY_RATE))) * 100,
      1,
    );
  });

  it("scenario 2: all FNC beds, no self-funders or LA — FNC drives all revenue", () => {
    // 20 FNC beds at base £1,200 + £267.68 = £1,467.68/wk each
    // totalRevenue = 20 * 1467.68 = 29353.60
    // weeklyOperatingCost = 25000
    // grossMarginAmount = 29353.60 - 25000 = 4353.60
    const r = calcFncFeeMix(0, 0, 0, 0, 20, 1200, 25000);
    expect(r.selfFunderRevenue).toBeCloseTo(0, 2);
    expect(r.laRevenue).toBeCloseTo(0, 2);
    expect(r.fncRevenue).toBeCloseTo(20 * (1200 + FNC_WEEKLY_RATE), 2);
    expect(r.totalBeds).toBe(20);
    expect(r.grossMarginAmount).toBeCloseTo(20 * (1200 + FNC_WEEKLY_RATE) - 25000, 1);
  });

  it("scenario 3: all LA beds at below-cost rate — negative margin", () => {
    // 15 LA beds at £900/wk; weeklyOperatingCost = 15000
    // totalRevenue = 15 * 900 = 13500
    // grossMarginAmount = 13500 - 15000 = -1500 (loss)
    // grossMarginPercent = -1500/13500*100 = -11.11%
    const r = calcFncFeeMix(0, 0, 15, 900, 0, 0, 15000);
    expect(r.laRevenue).toBeCloseTo(13500, 1);
    expect(r.totalRevenue).toBeCloseTo(13500, 1);
    expect(r.grossMarginAmount).toBeCloseTo(-1500, 1);
    expect(r.grossMarginPercent).toBeCloseTo(-1500 / 13500 * 100, 1);
    expect(r.selfFunderPct).toBeCloseTo(0, 2);
    expect(r.laPct).toBeCloseTo(100, 1);
  });
});
