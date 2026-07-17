// Golden tests for sole-trader-vs-ltd compute (2026/27 rates, full extraction).
// Figures recomputed independently from first principles, then confirmed
// against compute output. Separate file: compute.test.ts is edited by
// parallel tool builds.
import { describe, it, expect } from "vitest";
import { compare, findCrossover } from "./sole-trader-vs-ltd";

const r2 = (n: number) => Math.round(n * 100) / 100;

describe("sole-trader-vs-ltd compute", () => {
  it("£40k profit: ST net 32868.20, Ltd net 31632.70", () => {
    const c = compare(40000, 0);
    // ST: income tax (40000-12570)*0.20 = 5486; Class 4 (40000-12570)*0.06 = 1645.80
    expect(r2(c.soleTrader.incomeTax)).toBe(5486);
    expect(r2(c.soleTrader.class4)).toBe(1645.8);
    expect(r2(c.soleTrader.net)).toBe(32868.2);
    // Ltd: salary 12570, ER NI (12570-5000)*0.15 = 1135.50, CT on 26294.50 @19% = 4995.955
    expect(r2(c.ltd.employerNi)).toBe(1135.5);
    expect(r2(c.ltd.corporationTax)).toBe(4995.96);
    expect(r2(c.ltd.net)).toBe(31632.7);
  });

  it("£100k profit: ST net 69311.40, Ltd net 65334.62 (26.5% CT band bites)", () => {
    const c = compare(100000, 0);
    expect(r2(c.soleTrader.incomeTax)).toBe(27432);
    expect(r2(c.soleTrader.class4)).toBe(3256.6);
    expect(r2(c.soleTrader.net)).toBe(69311.4);
    expect(r2(c.ltd.corporationTax)).toBe(19118.04);
    expect(r2(c.ltd.net)).toBe(65334.62);
  });

  it("crossover: no admin cost → narrow window 60200-62600", () => {
    expect(findCrossover(0)).toEqual({ from: 60200, to: 62600 });
  });

  it("crossover: £1,000 admin cost → company never wins £20k-£150k", () => {
    expect(findCrossover(1000)).toBe(null);
  });
});
