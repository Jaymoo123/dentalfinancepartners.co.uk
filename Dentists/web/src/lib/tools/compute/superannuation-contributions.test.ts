import { describe, it, expect } from "vitest";
import {
  calcSuperannuation,
  memberTierRate,
  TIER_EFFECTIVE_DATE,
} from "./superannuation-contributions";

/**
 * Golden test for the NHS Pension member-contribution tier table.
 *
 * Ground truth: house_positions.md §2.F, England and Wales only, in force from
 * 1 April 2026 (thresholds uprated by the September 2025 CPI figure of 3.8%).
 * Scotland and Northern Ireland run different tables and are NOT modelled here.
 *
 * This test exists because the shipped table carried 2024/25 thresholds on a
 * page labelled 2026/27, which pushed a dentist near a boundary into a higher
 * tier and OVERSTATED the contribution. It pins both boundaries of every band,
 * so a stale threshold fails rather than renders.
 */

describe("NHS Pension member tiers, England and Wales, from 1 April 2026 (HP §2.F)", () => {
  it("effective date is the 2026/27 table", () => {
    expect(TIER_EFFECTIVE_DATE).toBe("1 April 2026");
  });

  // [pensionable pay, expected member rate] — top and bottom of each band.
  const boundaries: Array<[number, number]> = [
    [1, 0.052],
    [13259, 0.052],
    [13260, 0.065],
    [28854, 0.065],
    [28855, 0.083],
    [35155, 0.083],
    [35156, 0.098],
    [52778, 0.098],
    [52779, 0.107],
    [67668, 0.107],
    [67669, 0.125],
    [250000, 0.125],
  ];

  it.each(boundaries)("pensionable pay £%i is charged at the correct tier rate", (pay, rate) => {
    expect(memberTierRate(pay)).toBe(rate);
  });

  it("the stale 2024/25 boundaries no longer select a tier", () => {
    // Each of these sat at a 2024/25 band top. On the 2026/27 table they are
    // all comfortably inside the band BELOW the one the old table assigned.
    expect(memberTierRate(27288)).toBe(0.065); // old 6.5% top, still 6.5%
    expect(memberTierRate(27289)).toBe(0.065); // old table said 8.3%
    expect(memberTierRate(33248)).toBe(0.083); // old table said 9.8%
    expect(memberTierRate(49914)).toBe(0.098); // old table said 10.7%
    expect(memberTierRate(63995)).toBe(0.107); // old table said 12.5%
  });

  it("worked example 1: associate, £120,000 gross fees at 43.9% pensionable", () => {
    const r = calcSuperannuation(52680);
    expect(r.memberRate).toBe(0.098);
    expect(r.memberContribution).toBeCloseTo(5162.64, 2);
    expect(r.employerContribution).toBeCloseTo(12485.16, 2); // 23.7% (HP §2.F)
    expect(r.careGrowthPerYear).toBeCloseTo(975.56, 2); // 1/54th (HP §2)
  });

  it("worked example 2: principal, £85,000 net pensionable earnings", () => {
    const r = calcSuperannuation(85000);
    expect(r.memberRate).toBe(0.125);
    expect(r.memberContribution).toBeCloseTo(10625, 2);
    expect(r.employerContribution).toBeCloseTo(20145, 2);
  });
});
