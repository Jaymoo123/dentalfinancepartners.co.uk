import { describe, it, expect } from "vitest";
import { calcBusinessLoan } from "./business-loan-calculator";

const r2 = (n: number) => Math.round(n * 100) / 100;

describe("business-loan-calculator compute", () => {
  it("£75,000 over 5 years at 9%, amortising, no fee", () => {
    const r = calcBusinessLoan(75000, 9, 60, "amortising", 0);
    expect(r2(r.monthlyRepayment)).toBe(1556.88);
    expect(r2(r.totalInterest)).toBe(18412.6);
    expect(r2(r.totalRepayable)).toBe(93412.6);
  });

  it("£20,000 over 3 years at 6%, amortising, no fee", () => {
    const r = calcBusinessLoan(20000, 6, 36, "amortising", 0);
    expect(r2(r.monthlyRepayment)).toBe(608.44);
    expect(r2(r.totalInterest)).toBe(1903.79);
  });

  it("interest-only £50,000 over 24 months at 8%: level interest, bullet principal", () => {
    const r = calcBusinessLoan(50000, 8, 24, "interestOnly", 0);
    expect(r2(r.monthlyRepayment)).toBe(333.33);
    expect(r2(r.totalInterest)).toBe(8000);
    expect(r2(r.totalRepayable)).toBe(58000);
  });

  it("arrangement fee is added on top of the repayment total", () => {
    const withFee = calcBusinessLoan(75000, 9, 60, "amortising", 1.5);
    const noFee = calcBusinessLoan(75000, 9, 60, "amortising", 0);
    expect(r2(withFee.fee)).toBe(1125);
    expect(r2(withFee.totalRepayable - noFee.totalRepayable)).toBe(1125);
  });

  it("zero interest rate falls back to a straight-line repayment", () => {
    const r = calcBusinessLoan(24000, 0, 24, "amortising", 0);
    expect(r2(r.monthlyRepayment)).toBe(1000);
    expect(r2(r.totalInterest)).toBe(0);
  });
});
