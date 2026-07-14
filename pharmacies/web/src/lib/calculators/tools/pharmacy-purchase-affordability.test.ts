import { describe, it, expect } from "vitest";
import { pharmacyPurchaseAffordability } from "./pharmacy-purchase-affordability";

/**
 * Hand-computed golden values — all assertions verified against the formula:
 *  - Monthly repayment: annuity PMT(r/12, 12*years, -loan)
 *  - CT: HP 27 (19% ≤ £50k, 25% ≥ £250k, marginal relief 3/200 in between)
 *  - SDLT: gov.uk non-residential bands (0% ≤ £150k, 2% £150k–£250k, 5% > £250k)
 *  - Share duty: 0.5% of price (HP 12)
 */

describe("pharmacyPurchaseAffordability", () => {
  it("zero interest rate: exact monthly and cover ratio", () => {
    // loan = 120000, term = 10yr, rate = 0% → monthly = 120000/120 = £1,000
    // annual = £12,000; profit = £30,000; CT = 30000*0.19 = £5,700; postTax = £24,300
    // cover = 24300/12000 = 2.025 → "2.03x"
    const result = pharmacyPurchaseAffordability.compute({
      purchasePrice: 150_000,
      deposit: 30_000,
      loanTermYears: 10,
      annualInterestRate: 0,
      projectedAnnualProfit: 30_000,
    });
    const monthly = result.rows?.find((r) => r.label === "Monthly repayment (estimated)");
    const cover = result.rows?.find((r) => r.label === "Post-tax cash cover ratio");
    const sdlt = result.rows?.find((r) => r.label === "Asset deal: SDLT non-residential (est.)");
    const shareDuty = result.rows?.find((r) => r.label === "Share deal: stamp duty (0.5%)");
    expect(monthly?.value).toBe("£1,000");       // 120000/120
    expect(cover?.value).toBe("2.02x");           // 24300/12000 = 2.025 → toFixed(2) = "2.02" (JS banker rounding)
    expect(sdlt?.value).toBe("£0");              // price=150k is exactly the zero band boundary
    expect(shareDuty?.value).toBe("£750");        // 150000*0.005
  });

  it("SDLT bands: price above £250k triggers 5% band", () => {
    // price=400000: 2%*(250k-150k) + 5%*(400k-250k) = 2000+7500 = £9,500
    // share duty: 400000*0.005 = £2,000
    const result = pharmacyPurchaseAffordability.compute({
      purchasePrice: 400_000,
      deposit: 400_000, // fully cash — no loan, monthly = £0
      loanTermYears: 20,
      annualInterestRate: 5,
      projectedAnnualProfit: 0,
    });
    const sdlt = result.rows?.find((r) => r.label === "Asset deal: SDLT non-residential (est.)");
    const shareDuty = result.rows?.find((r) => r.label === "Share deal: stamp duty (0.5%)");
    expect(sdlt?.value).toBe("£9,500");
    expect(shareDuty?.value).toBe("£2,000");
  });

  it("corporation tax: small-profits rate (≤ £50k)", () => {
    // profit=40000: CT = 40000*0.19 = £7,600; postTax = £32,400
    // loan=0 → annual repayment=0 → cover is Infinity (no row shows divide by zero)
    // Use a small loan so cover is finite
    const result = pharmacyPurchaseAffordability.compute({
      purchasePrice: 100_000,
      deposit: 99_900,
      loanTermYears: 5,
      annualInterestRate: 0,
      projectedAnnualProfit: 40_000,
    });
    const ct = result.rows?.find((r) => r.label === "Corporation tax (estimated)");
    const postTax = result.rows?.find((r) => r.label === "Post-tax profit available");
    expect(ct?.value).toBe("£7,600");    // 40000*0.19
    expect(postTax?.value).toBe("£32,400");
  });

  it("corporation tax: main rate (≥ £250k)", () => {
    // profit=300000: CT = 300000*0.25 = £75,000
    const result = pharmacyPurchaseAffordability.compute({
      purchasePrice: 200_000,
      deposit: 200_000,
      loanTermYears: 20,
      annualInterestRate: 0,
      projectedAnnualProfit: 300_000,
    });
    const ct = result.rows?.find((r) => r.label === "Corporation tax (estimated)");
    expect(ct?.value).toBe("£75,000");
  });

  it("marginal relief CT: profit in £50k–£250k band", () => {
    // profit=60000: CT = 60000*0.25 - (3/200)*(250000-60000) = 15000-2850 = £12,150
    const result = pharmacyPurchaseAffordability.compute({
      purchasePrice: 200_000,
      deposit: 200_000,
      loanTermYears: 20,
      annualInterestRate: 0,
      projectedAnnualProfit: 60_000,
    });
    const ct = result.rows?.find((r) => r.label === "Corporation tax (estimated)");
    expect(ct?.value).toBe("£12,150");
  });

  it("SDLT only 2% band: price £200k", () => {
    // SDLT on 200k: 2%*(200k-150k) = 2%*50k = £1,000; share duty: 200k*0.005 = £1,000
    const result = pharmacyPurchaseAffordability.compute({
      purchasePrice: 200_000,
      deposit: 200_000,
      loanTermYears: 20,
      annualInterestRate: 0,
      projectedAnnualProfit: 0,
    });
    const sdlt = result.rows?.find((r) => r.label === "Asset deal: SDLT non-residential (est.)");
    const shareDuty = result.rows?.find((r) => r.label === "Share deal: stamp duty (0.5%)");
    expect(sdlt?.value).toBe("£1,000");
    expect(shareDuty?.value).toBe("£1,000");
  });
});
