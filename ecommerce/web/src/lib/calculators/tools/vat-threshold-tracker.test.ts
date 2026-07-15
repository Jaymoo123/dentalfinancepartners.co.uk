import { describe, it, expect } from "vitest";
import { calcVatThreshold, VAT_THRESHOLD } from "./vat-threshold-tracker";

describe("calcVatThreshold", () => {
  it("below threshold: headroom = threshold - revenue", () => {
    const r = calcVatThreshold(60000);
    expect(r.headroom).toBeCloseTo(30000, 1);
    expect(r.breached).toBe(false);
    expect(r.percentUsed).toBeCloseTo((60000 / VAT_THRESHOLD) * 100, 1);
  });

  it("at threshold: breached = true, headroom = 0", () => {
    const r = calcVatThreshold(90000);
    expect(r.breached).toBe(true);
    expect(r.headroom).toBeCloseTo(0, 2);
    expect(r.percentUsed).toBeCloseTo(100, 1);
  });

  it("above threshold: breached = true, headroom capped at 0", () => {
    const r = calcVatThreshold(120000);
    expect(r.breached).toBe(true);
    expect(r.headroom).toBeCloseTo(0, 2);
    expect(r.percentUsed).toBeCloseTo(100, 1);
  });

  it("zero revenue: no breach, full headroom", () => {
    const r = calcVatThreshold(0);
    expect(r.breached).toBe(false);
    expect(r.headroom).toBeCloseTo(VAT_THRESHOLD, 1);
    expect(r.percentUsed).toBeCloseTo(0, 2);
  });
});
