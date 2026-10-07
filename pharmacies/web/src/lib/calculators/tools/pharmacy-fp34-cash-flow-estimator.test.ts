import { describe, it, expect } from "vitest";
import { pharmacyFp34CashFlowEstimator } from "./pharmacy-fp34-cash-flow-estimator";

/**
 * Hand-computed golden values.
 * monthlyClaimValue = items * avgReimbursement
 * advanceAmount = monthlyClaimValue * (advancePct/100)
 * monthlyShortfall = monthlyClaimValue - advanceAmount
 * workingCapitalGap = monthlyShortfall * paymentLagMonths (the shortfall accrues every
 *   month you wait for settlement, HP 7)
 * steadyStateCash = monthlyClaimValue (advance + net settlement)
 */

describe("pharmacyFp34CashFlowEstimator", () => {
  it("standard case: 2000 items, £10, 50% advance, 2-month lag", () => {
    // Hand-derived: monthly = 2,000 * 10 = £20,000; advance = 20,000 * 0.50 = £10,000;
    // monthly shortfall = £10,000; gap = 10,000 * 2 months = £20,000
    // (was £10,000 while the gap ignored the payment-lag input)
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 2_000,
      avgReimbursement: 10,
      advancePct: 50,
      paymentLagMonths: 2,
    });
    const claimRow = result.rows?.find((r) => r.label === "Monthly claim value (illustrative)");
    const advanceRow = result.rows?.find((r) => r.label === "Advance on account (50%)");
    const gapRow = result.rows?.find((r) => r.label === "Working-capital gap to bridge");
    expect(claimRow?.value).toBe("£20,000");
    expect(advanceRow?.value).toBe("£10,000");
    expect(gapRow?.value).toBe("£20,000");
    expect(result.headline.value).toBe("£20,000");
  });

  it("40% advance: shortfall = 60% of claim, gap = shortfall x lag", () => {
    // Hand-derived: 1,000 * £8 = £8,000; advance = 8,000 * 0.40 = £3,200;
    // shortfall = £4,800; gap = 4,800 * 2 = £9,600
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 1_000,
      avgReimbursement: 8,
      advancePct: 40,
      paymentLagMonths: 2,
    });
    const claimRow = result.rows?.find((r) => r.label === "Monthly claim value (illustrative)");
    const gapRow = result.rows?.find((r) => r.label === "Working-capital gap to bridge");
    expect(claimRow?.value).toBe("£8,000");
    const shortfallRow = result.rows?.find((r) => r.label === "Monthly shortfall while you wait");
    expect(shortfallRow?.value).toBe("£4,800");
    expect(gapRow?.value).toBe("£9,600");
  });

  it("100% advance: zero working-capital gap", () => {
    // advance = full claim → gap = £0
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 3_000,
      avgReimbursement: 12,
      advancePct: 100,
      paymentLagMonths: 2,
    });
    const gapRow = result.rows?.find((r) => r.label === "Working-capital gap to bridge");
    expect(gapRow?.value).toBe("£0");
    expect(result.headline.value).toBe("£0");
  });

  it("0% advance: gap equals full monthly claim", () => {
    // Hand-derived: 500 * £20 = £10,000; advance = £0; shortfall = £10,000;
    // gap = 10,000 * 2 = £20,000
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 500,
      avgReimbursement: 20,
      advancePct: 0,
      paymentLagMonths: 2,
    });
    const claimRow = result.rows?.find((r) => r.label === "Monthly claim value (illustrative)");
    const gapRow = result.rows?.find((r) => r.label === "Working-capital gap to bridge");
    expect(claimRow?.value).toBe("£10,000");
    expect(gapRow?.value).toBe("£20,000");
  });

  it("the gap tracks the payment-lag input", () => {
    // Same trade, 1,000 * £10 = £10,000, 50% advance → shortfall £5,000.
    // lag 1 → £5,000; lag 4 → £20,000. The two must differ.
    const base = { monthlyItems: 1_000, avgReimbursement: 10, advancePct: 50 };
    const lag1 = pharmacyFp34CashFlowEstimator.compute({ ...base, paymentLagMonths: 1 });
    const lag4 = pharmacyFp34CashFlowEstimator.compute({ ...base, paymentLagMonths: 4 });
    expect(lag1.headline.value).toBe("£5,000");
    expect(lag4.headline.value).toBe("£20,000");
  });

  it("settlement row label includes lag months", () => {
    const result = pharmacyFp34CashFlowEstimator.compute({
      monthlyItems: 1_000,
      avgReimbursement: 10,
      advancePct: 50,
      paymentLagMonths: 3,
    });
    const settlementRow = result.rows?.find((r) =>
      r.label.includes("Full settlement") && r.label.includes("+3"),
    );
    expect(settlementRow).toBeDefined();
    expect(settlementRow?.value).toBe("£10,000");
  });
});
