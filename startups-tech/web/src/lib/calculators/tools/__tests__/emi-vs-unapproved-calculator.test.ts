import { describe, it, expect } from "vitest";
import { emiVsUnapprovedCalculator } from "../emi-vs-unapproved-calculator";

/**
 * Golden-figure tests.
 *
 * Brief golden figures (calc-emi-vs-unapproved-calculator.md):
 *   - EMI, AMV=£1, EX=£1, EXIT=£100,000, BADR on: CGT = £100,000 × 18% = £18,000. (HP18)
 *   - Unapproved, EX=£1, EXIT=£100,000, higher-rate 40%: income tax = £100,000 × 40% = £40,000. (HP30)
 *   - Unapproved employer NIC: £100,000 × 15% = £15,000. (HP23)
 *
 * All gains use EXIT − EX = £99,999 ≈ £100,000 per brief note ("gain £99,999 ≈ £100,000 for illustration").
 * The compute function applies Math.round; we assert the rounded £ values.
 */
describe("emiVsUnapprovedCalculator", () => {
  // Base inputs matching the brief's worked example
  const base = {
    amv: 1,
    exercisePrice: 1,
    exitValue: 100000,
    band: "0.40",
    badr: true,
    growthAcquisitionValue: 0,
  };

  it("EMI: CGT at BADR 18% = £18,000 on ~£100,000 gain (HP18, brief golden figure)", () => {
    const result = emiVsUnapprovedCalculator.compute(base);
    const cgtRow = result.rows?.find((r) => r.label.startsWith("EMI: CGT at sale"));
    // gain = 100000 - 1 = 99999; 99999 × 0.18 = 17999.82 → Math.round → £18,000
    // Brief: "EMI CGT+BADR £18k on £100k gain" (exact match)
    expect(cgtRow?.value).toBe("£18,000");
  });

  it("EMI: no income tax at exercise when EX >= AMV (HP12)", () => {
    const result = emiVsUnapprovedCalculator.compute(base);
    const itRow = result.rows?.find((r) => r.label === "EMI: income tax at exercise");
    expect(itRow?.value).toBe("Nil (EX at AMV, HP12)");
  });

  it("EMI: employer NIC = nil on clean exercise at AMV (HP12)", () => {
    const result = emiVsUnapprovedCalculator.compute(base);
    const nicRow = result.rows?.find((r) => r.label === "EMI: employer NIC cost to company");
    expect(nicRow?.value).toBe("Nil (no earnings charge, HP12)");
  });

  it("Unapproved: income tax = £40,000 at 40% higher rate on ~£100,000 gain (HP30, brief golden figure)", () => {
    const result = emiVsUnapprovedCalculator.compute(base);
    const itRow = result.rows?.find((r) => r.label.startsWith("Unapproved: income tax at exercise"));
    // gain = 99999; 99999 × 0.40 = 39999.6 → Math.round → £40,000
    // Brief: "income tax ≈ £100,000 × 40% = £40,000" (rounded match)
    expect(itRow?.value).toBe("£40,000");
  });

  it("Unapproved: employer NIC = £15,000 at 15% on £99,999 gain (HP23, brief golden: £15,000)", () => {
    const result = emiVsUnapprovedCalculator.compute(base);
    const nicRow = result.rows?.find((r) => r.label.startsWith("Unapproved: employer NIC cost to company"));
    // 99999 × 0.15 = 14999.85 → rounded = £15,000
    expect(nicRow?.value).toBe("£15,000");
  });

  it("Growth shares: CGT at 24% (higher band, HP19, no auto-BADR)", () => {
    const result = emiVsUnapprovedCalculator.compute(base);
    const cgtRow = result.rows?.find((r) => r.label.startsWith("Growth shares: CGT at exit"));
    // gain = 100000 - 0 = 100000; 100000 × 0.24 = 24000
    expect(cgtRow?.value).toBe("£24,000");
  });

  it("EMI discount: income tax arises when EX < AMV (HP12 exception)", () => {
    const inputs = { ...base, amv: 10, exercisePrice: 1, badr: true };
    const result = emiVsUnapprovedCalculator.compute(inputs);
    const itRow = result.rows?.find((r) => r.label === "EMI: income tax at exercise");
    // discount = (10 - 1) × 0.40 = 9 × 0.40 = 3.6 → rounded £4
    expect(itRow?.value).toContain("£4");
  });

  it("Basic-rate band: EMI CGT at 18% BADR = £18,000 (HP18 and HP19 basic-rate both 18%)", () => {
    const inputs = { ...base, band: "0.20" };
    const result = emiVsUnapprovedCalculator.compute(inputs);
    const cgtRow = result.rows?.find((r) => r.label.startsWith("EMI: CGT at sale"));
    // BADR on; gain = 99999; 99999 × 0.18 = 17999.82 → Math.round → £18,000
    expect(cgtRow?.value).toBe("£18,000");
  });

  it("BADR off: EMI CGT at 24% for higher-rate taxpayer (HP19)", () => {
    const inputs = { ...base, badr: false };
    const result = emiVsUnapprovedCalculator.compute(inputs);
    const cgtRow = result.rows?.find((r) => r.label.startsWith("EMI: CGT at sale"));
    // gain = 99999; 99999 × 0.24 = 23999.76 → Math.round → £24,000
    expect(cgtRow?.value).toBe("£24,000");
  });

  it("Zero gain: all taxes are nil or zero", () => {
    const inputs = { ...base, exitValue: 1 };
    const result = emiVsUnapprovedCalculator.compute(inputs);
    const unapprovedIt = result.rows?.find((r) => r.label.startsWith("Unapproved: income tax at exercise"));
    const employerNic = result.rows?.find((r) => r.label.startsWith("Unapproved: employer NIC cost to company"));
    expect(unapprovedIt?.value).toBe("£0");
    expect(employerNic?.value).toBe("£0");
  });

  it("Growth shares with non-zero acquisition value: income tax at acquisition appears", () => {
    const inputs = { ...base, growthAcquisitionValue: 5000 };
    const result = emiVsUnapprovedCalculator.compute(inputs);
    const itRow = result.rows?.find((r) =>
      r.label.startsWith("Growth shares: income tax at acquisition"),
    );
    // 5000 × 0.40 = 2000
    expect(itRow?.value).toBe("£2,000");
  });

  it("compute returns a headline with a non-negative saving value", () => {
    const result = emiVsUnapprovedCalculator.compute(base);
    const saving = parseInt(result.headline.value.replace(/[£,]/g, ""), 10);
    expect(saving).toBeGreaterThan(0);
  });
});
