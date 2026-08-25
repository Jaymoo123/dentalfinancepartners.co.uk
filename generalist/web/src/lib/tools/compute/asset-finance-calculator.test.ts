import { describe, it, expect } from "vitest";
import { calcAssetFinance } from "./asset-finance-calculator";

const r2 = (n: number) => Math.round(n * 100) / 100;

describe("asset-finance-calculator compute", () => {
  it("£120,000 asset, £12,000 deposit, 7.5%, 60 months, no balloon", () => {
    const r = calcAssetFinance(120000, 12000, 7.5, 60, 0);
    expect(r2(r.monthlyRental)).toBe(2164.1);
    expect(r2(r.totalPayable)).toBe(141845.91);
    expect(r2(r.totalFinanceCost)).toBe(21845.91);
  });

  it("£50,000 asset, £5,000 deposit, 8%, 36 months, £15,000 balloon", () => {
    const r = calcAssetFinance(50000, 5000, 8, 36, 15000);
    expect(r2(r.amountFinanced)).toBe(33191.18);
    expect(r2(r.monthlyRental)).toBe(1040.09);
    expect(r2(r.totalPayable)).toBe(57443.27);
    expect(r2(r.totalFinanceCost)).toBe(7443.27);
  });

  it("a larger balloon lowers the monthly rental for the same cost and term", () => {
    const small = calcAssetFinance(50000, 5000, 8, 36, 0);
    const big = calcAssetFinance(50000, 5000, 8, 36, 20000);
    expect(big.monthlyRental).toBeLessThan(small.monthlyRental);
  });

  it("zero interest rate: no finance cost beyond deposit/balloon arithmetic", () => {
    const r = calcAssetFinance(30000, 0, 0, 24, 0);
    expect(r2(r.monthlyRental)).toBe(1250);
    expect(r2(r.totalFinanceCost)).toBe(0);
  });
});
