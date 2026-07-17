import { describe, it, expect } from "vitest";
import { calcAaTaper, incomeTax } from "./nhs-pension-aa-taper";

// Worked example 1 (associate, estimate path): no taper, no charge.
describe("calcAaTaper — associate, estimated PIA, no charge", () => {
  const r = calcAaTaper({
    practiceProfit: 115000,
    otherIncome: 5000,
    employeeConts: 13750,
    pia: 0,
    superannuable: 110000,
    openingPension: 20000,
    carryForward: 0,
  });
  it("threshold income", () => expect(r.thresholdIncome).toBe(106250));
  it("PIA estimate", () => expect(r.piaUsed).toBeCloseTo(37392.59, 1));
  it("estimated flag", () => expect(r.piaEstimated).toBe(true));
  it("no taper", () => expect(r.taperApplies).toBe(false));
  it("full AA", () => expect(r.taperedAa).toBe(60000));
  it("no charge", () => expect(r.charge).toBe(0));
});

// Worked example 2 (principal, statement PIA): taper + 45% charge + scheme pays.
describe("calcAaTaper — principal, tapered, charge at 45%", () => {
  const r = calcAaTaper({
    practiceProfit: 230000,
    otherIncome: 20000,
    employeeConts: 26000,
    pia: 70000,
    superannuable: 0,
    openingPension: 0,
    carryForward: 5000,
  });
  it("threshold income", () => expect(r.thresholdIncome).toBe(224000));
  it("adjusted income", () => expect(r.adjustedIncome).toBe(294000));
  it("taper applies", () => expect(r.taperApplies).toBe(true));
  it("tapered AA", () => expect(r.taperedAa).toBe(43000));
  it("carry-forward used", () => expect(r.carryForwardUsed).toBe(5000));
  it("excess", () => expect(r.excess).toBe(22000));
  it("charge at 45%", () => expect(r.charge).toBeCloseTo(9900, 1));
  it("mandatory scheme pays", () => expect(r.mandatorySchemePays).toBe(true));
});

describe("taper floor and PA taper", () => {
  it("AA floors at £10,000 at adjusted income £360,000+", () => {
    const r = calcAaTaper({
      practiceProfit: 400000,
      otherIncome: 0,
      employeeConts: 0,
      pia: 60000,
      superannuable: 0,
      openingPension: 0,
      carryForward: 0,
    });
    expect(r.taperedAa).toBe(10000);
  });
  it("threshold income £200k exactly keeps full AA even with big PIA", () => {
    const r = calcAaTaper({
      practiceProfit: 200000,
      otherIncome: 0,
      employeeConts: 0,
      pia: 90000,
      superannuable: 0,
      openingPension: 0,
      carryForward: 0,
    });
    expect(r.taperedAa).toBe(60000);
    expect(r.excess).toBe(30000);
  });
  it("incomeTax handles PA taper band (60% effective zone)", () => {
    // £100k -> £110k: £10k extra income costs 40% + loss of £5k PA at 40% = £6,000.
    expect(incomeTax(110000) - incomeTax(100000)).toBeCloseTo(6000, 0);
  });
});
