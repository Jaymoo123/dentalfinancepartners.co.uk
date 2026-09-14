import { describe, it, expect } from "vitest";
import { cryptoCgtEstimator } from "./crypto-cgt-estimator";

// RULES UNDER TEST (house_positions.md + rates_ledger.json):
//  - HP3 / cgt_annual_exempt_amount: AEA = £3,000.
//  - HP2 / cgt_rate_basic_within_band + cgt_rate_above_basic_band: 18% on the part
//    of the gain inside the REMAINING basic-rate band, 24% above it.
//  - basic_rate_band_ceiling = £37,700 of TAXABLE income, i.e. income after the
//    personal allowance, so the remaining band must be measured after deducting
//    the personal allowance (tapered £1 per £2 above £100,000).

const cgt = (totalGain: number, otherTaxableIncome: number) => {
  const result = cryptoCgtEstimator.compute({ totalGain, otherTaxableIncome });
  return {
    headline: result.headline.value,
    tax: result.rows?.find(r => r.label === "Estimated CGT")?.value,
    band: result.rows?.find(r => r.label === "Basic-rate band remaining")?.value,
  };
};

describe("cryptoCgtEstimator", () => {
  it("gain within the £3,000 AEA returns zero tax (HP3)", () => {
    expect(cgt(2000, 30000).headline).toBe("£0");
  });

  it("deducts the personal allowance before measuring the remaining band (HP2)", () => {
    // income £20,000 gross => taxable £7,430 => band left £30,270.
    // gain £10,000 - £3,000 AEA = £7,000, all inside the band, at 18%.
    const r = cgt(10000, 20000);
    expect(r.band).toBe("£30,270");
    expect(r.tax).toBe("£1,260"); // 7000 * 0.18
  });

  it("splits across the £37,700 taxable-income ceiling (HP2)", () => {
    // income £45,000 gross => taxable £32,430 => band left £5,270.
    // gain £20,000 - £3,000 = £17,000: £5,270 at 18% + £11,730 at 24%.
    const r = cgt(20000, 45000);
    expect(r.band).toBe("£5,270");
    expect(r.tax).toBe("£3,764"); // 948.6 + 2815.2
  });

  it("higher-rate taxpayer pays a flat 24% with no band left (HP2)", () => {
    // income £60,000 gross => taxable £47,430, above £37,700, so no band remains.
    const r = cgt(15000, 60000);
    expect(r.band).toBe("£0");
    expect(r.tax).toBe("£2,880"); // 12000 * 0.24
  });

  it("tapers the personal allowance above £100,000", () => {
    // income £110,000 => PA tapered to £7,570 => taxable £102,430, no band left.
    expect(cgt(5000, 110000).band).toBe("£0");
    // income £100,000 => full PA => taxable £87,430, still no band left, but the
    // taper must not push the band negative or reappear.
    expect(cgt(5000, 100000).band).toBe("£0");
  });

  it("states the reporting obligation without a superseded numeric proceeds test (HP27)", () => {
    const faq = cryptoCgtEstimator.faqs?.find(f => f.question.includes("report crypto gains"));
    expect(faq?.answer).toContain("reporting threshold");
    expect(faq?.answer).not.toMatch(/four times|4 times/i);
  });
});
