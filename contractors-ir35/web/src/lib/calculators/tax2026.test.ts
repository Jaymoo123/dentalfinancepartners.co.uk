import { describe, it, expect } from "vitest";
import {
  personalAllowance,
  employeeNI,
  employerNI,
  corporationTax,
  personalTax,
  limitedTakeHome,
  umbrellaTakeHome,
} from "./tax2026";

describe("personalAllowance taper (HP §5)", () => {
  it("is full below £100k", () => {
    expect(personalAllowance(50000)).toBe(12570);
    expect(personalAllowance(100000)).toBe(12570);
  });
  it("tapers £1 per £2 over £100k", () => {
    expect(personalAllowance(110000)).toBe(12570 - 5000); // 7570
    expect(personalAllowance(103506.49)).toBeCloseTo(10816.755, 2);
  });
  it("is nil at £125,140", () => {
    expect(personalAllowance(125140)).toBe(0);
    expect(personalAllowance(130000)).toBe(0);
  });
});

describe("National Insurance (HP §6)", () => {
  it("employee NIC: 8% PT->UEL then 2%", () => {
    expect(employeeNI(12570)).toBeCloseTo(0, 6);
    expect(employeeNI(50270)).toBeCloseTo(37700 * 0.08, 2); // 3016
    expect(employeeNI(103506.49)).toBeCloseTo(3016 + 53236.49 * 0.02, 2); // 4080.7298
  });
  it("employer NIC: 15% above £5,000 ST; single director gets no EA", () => {
    expect(employerNI(12570)).toBeCloseTo(7570 * 0.15, 2); // 1135.50
    expect(employerNI(5000)).toBe(0);
    expect(employerNI(20000, { employmentAllowance: true })).toBe(0); // 2250 - 10500 floored at 0
  });
});

describe("corporationTax FY2026 (HP §7)", () => {
  it("19% at or below £50k", () => {
    expect(corporationTax(50000)).toBeCloseTo(9500, 2);
  });
  it("marginal relief between £50k and £250k (fraction 3/200)", () => {
    // 100,294.50 profit -> 25% - 1.5%*(250000-profit)
    expect(corporationTax(100294.5)).toBeCloseTo(22828.0425, 2);
    // effective marginal rate ~26.5% on the band
    expect(corporationTax(250000) - corporationTax(50000)).toBeCloseTo(200000 * 0.265, 0);
  });
  it("25% at or above £250k", () => {
    expect(corporationTax(300000)).toBeCloseTo(75000, 2);
  });
});

describe("personalTax dividend stacking (HP §5)", () => {
  it("£12,570 salary + £77,466.46 dividends", () => {
    const r = personalTax(12570, 77466.46);
    expect(r.incomeTaxOnSalary).toBeCloseTo(0, 2);
    expect(r.employeeNI).toBeCloseTo(0, 2);
    // basic: (37,700 - 500 allowance) * 10.75%; higher: 39,766.46 * 35.75%
    expect(r.dividendTax).toBeCloseTo(37200 * 0.1075 + 39766.46 * 0.3575, 2); // 18,215.51
  });
});

describe("income tax under the PA taper (pinning: 45%-band split above £100k)", () => {
  it("£150k salary -> £53,703 income tax (PA fully tapered)", () => {
    // pa=0; basic 37,700@20% + higher (125,140-37,700)@40% + additional (150,000-125,140)@45%
    expect(personalTax(150000, 0).incomeTaxOnSalary).toBeCloseTo(53703, 0);
  });
  it("£45k salary unchanged by the fix -> £6,486 income tax (PA full)", () => {
    expect(personalTax(45000, 0).incomeTaxOnSalary).toBeCloseTo(6486, 0);
  });
});

describe("limitedTakeHome outside IR35 (signature golden)", () => {
  it("£120k turnover, £12,570 salary, £6k expenses, single director", () => {
    const r = limitedTakeHome({ turnover: 120000, salary: 12570, expenses: 6000 });
    expect(r.employerNI).toBeCloseTo(1135.5, 2);
    expect(r.profitBeforeTax).toBeCloseTo(100294.5, 2);
    expect(r.corporationTax).toBeCloseTo(22828.04, 1);
    expect(r.dividends).toBeCloseTo(77466.46, 1);
    expect(r.netTakeHome).toBeCloseTo(71820.95, 0);
  });
});

describe("umbrellaTakeHome inside IR35 (signature golden)", () => {
  it("£120k assignment income, £1,200 umbrella margin", () => {
    const r = umbrellaTakeHome({ assignmentIncome: 120000, umbrellaMargin: 1200 });
    expect(r.grossSalary).toBeCloseTo(103506.49, 1);
    expect(r.employerNI).toBeCloseTo(14775.97, 1);
    expect(r.apprenticeshipLevy).toBeCloseTo(517.53, 1);
    // employer costs + salary reconcile to the post-margin pot
    expect(r.grossSalary + r.employerNI + r.apprenticeshipLevy).toBeCloseTo(118800, 0);
    expect(r.netTakeHome).toBeCloseTo(69889.87, 0);
  });
});
