import { describe, it, expect } from "vitest";
import { calcTronc } from "./tronc";

/**
 * Golden-figure suite for tronc/tips calculator. All expected values are
 * hand-derived from HMRC rules, never from the engine itself.
 *
 * Constants used:
 *   employer NIC rate       = 15% (2026/27, secondary threshold irrelevant for tips)
 *   employee NIC rate       = 8%  (2026/27 main rate)
 *   income tax (basic rate) = 20%
 *
 * Tronc (independent troncmaster): NIC-free; PAYE income tax only.
 * Employer direct: employer NIC 15% + employee NIC 8% + income tax 20%.
 * Sources:
 *   https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
 *   HMRC NIM02922 / E24 booklet (tronc NIC exemption)
 */

describe("calcTronc — tronc method (NIC-free)", () => {
  it("£5,000 pool / 10 employees equal split: £400 take-home each", () => {
    // gross per person = 5000 / 10 = £500
    // income tax = 500 x 20% = £100
    // employee NIC = £0 (tronc exempt)
    // take-home = 500 - 100 = £400
    // employer NIC = £0; employer NIC saved vs direct = 5000 x 15% = £750
    const r = calcTronc(5000, 10, "tronc", "equal");
    expect(r.grossShares[0]).toBeCloseTo(500, 2);
    expect(r.employeeTakeHomes[0]).toBeCloseTo(400, 2);
    expect(r.employerNicTotal).toBeCloseTo(0, 2);
    expect(r.employerNicSaved).toBeCloseTo(750, 2);
    expect(r.employerTotalCost).toBeCloseTo(5000, 2);
  });

  it("£12,000 pool / 4 employees: £2,400 take-home each, £1,800 NIC saved", () => {
    // gross per person = 12000 / 4 = £3,000
    // income tax = 3000 x 20% = £600
    // take-home = 3000 - 600 = £2,400
    // employer NIC saved = 12000 x 15% = £1,800
    const r = calcTronc(12000, 4, "tronc", "equal");
    expect(r.grossShares[0]).toBeCloseTo(3000, 2);
    expect(r.employeeTakeHomes[0]).toBeCloseTo(2400, 2);
    expect(r.employerNicSaved).toBeCloseTo(1800, 2);
    expect(r.employerTotalCost).toBeCloseTo(12000, 2);
  });

  it("£0 pool: all zeros, no errors", () => {
    const r = calcTronc(0, 5, "tronc", "equal");
    expect(r.grossShares[0]).toBeCloseTo(0, 2);
    expect(r.employeeTakeHomes[0]).toBeCloseTo(0, 2);
    expect(r.employerNicSaved).toBeCloseTo(0, 2);
  });
});

describe("calcTronc — employer direct method (NIC due)", () => {
  it("£5,000 pool / 10 employees: take-home £360 each, employer NIC £750", () => {
    // gross per person = £500
    // income tax = 500 x 20% = £100
    // employee NIC = 500 x 8% = £40
    // take-home = 500 - 100 - 40 = £360
    // employer NIC total = 5000 x 15% = £750
    // employer total cost = 5000 + 750 = £5,750
    const r = calcTronc(5000, 10, "employer", "equal");
    expect(r.grossShares[0]).toBeCloseTo(500, 2);
    expect(r.employeeTakeHomes[0]).toBeCloseTo(360, 2);
    expect(r.employerNicTotal).toBeCloseTo(750, 2);
    expect(r.employerNicSaved).toBeCloseTo(0, 2);
    expect(r.employerTotalCost).toBeCloseTo(5750, 2);
  });

  it("£1,000 pool / 1 employee: take-home £720, employer NIC £150", () => {
    // gross = £1,000
    // income tax = 1000 x 20% = £200
    // employee NIC = 1000 x 8% = £80
    // take-home = 1000 - 200 - 80 = £720
    // employer NIC = 1000 x 15% = £150
    const r = calcTronc(1000, 1, "employer", "equal");
    expect(r.employeeTakeHomes[0]).toBeCloseTo(720, 2);
    expect(r.employerNicTotal).toBeCloseTo(150, 2);
    expect(r.employerTotalCost).toBeCloseTo(1150, 2);
  });

  it("custom shares distribute proportionally", () => {
    // Pool £900, 2 employees, custom shares [2, 1]
    // Employee 0 gets 2/3 x 900 = £600; Employee 1 gets 1/3 x 900 = £300
    // Under employer: take-home[0] = 600 x (1 - 0.08 - 0.20) = 600 x 0.72 = £432
    const r = calcTronc(900, 2, "employer", "custom", undefined, [2, 1]);
    expect(r.grossShares[0]).toBeCloseTo(600, 2);
    expect(r.grossShares[1]).toBeCloseTo(300, 2);
    expect(r.employeeTakeHomes[0]).toBeCloseTo(432, 2);
    expect(r.employeeTakeHomes[1]).toBeCloseTo(216, 2);
  });
});
