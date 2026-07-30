import { describe, it, expect } from "vitest";
import { calcBusinessValuation } from "./business-valuation-calculator";

describe("business-valuation-calculator compute", () => {
  it("general sector: £500k EBITDA, £50k surplus cash, £100k debt", () => {
    const r = calcBusinessValuation(500000, "general", 50000, 100000);
    expect(r.multipleLow).toBe(3);
    expect(r.multipleHigh).toBe(5);
    expect(r.enterpriseValueLow).toBe(1500000);
    expect(r.enterpriseValueHigh).toBe(2500000);
    expect(r.equityValueLow).toBe(1450000);
    expect(r.equityValueHigh).toBe(2450000);
    expect(r.equityValueMid).toBe(1950000);
  });

  it("construction sector uses the lower 2-4x range", () => {
    const r = calcBusinessValuation(200000, "construction", 0, 50000);
    expect(r.enterpriseValueLow).toBe(400000);
    expect(r.enterpriseValueHigh).toBe(800000);
    expect(r.equityValueLow).toBe(350000);
    expect(r.equityValueHigh).toBe(750000);
  });

  it("care home sector uses the higher property-backed 6-9x range", () => {
    const r = calcBusinessValuation(300000, "careHome", 0, 0);
    expect(r.enterpriseValueLow).toBe(1800000);
    expect(r.enterpriseValueHigh).toBe(2700000);
  });

  it("debt reduces equity value below enterprise value", () => {
    const r = calcBusinessValuation(100000, "general", 0, 1000000);
    expect(r.equityValueLow).toBeLessThan(r.enterpriseValueLow);
    expect(r.equityValueLow).toBe(300000 - 1000000);
  });
});
