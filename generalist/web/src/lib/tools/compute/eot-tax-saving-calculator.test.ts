import { describe, it, expect } from "vitest";
import { calcEOTTaxSaving } from "./eot-tax-saving-calculator";

const r2 = (n: number) => Math.round(n * 100) / 100;

describe("eot-tax-saving-calculator compute", () => {
  it("canonical brief example: £4m sale, £200k base cost, 100%, higher rate", () => {
    const r = calcEOTTaxSaving(4000000, 200000, 100, "higher", 1000000);
    expect(r.gain).toBe(3800000);
    expect(r.chargeableNow).toBe(1900000);
    expect(r.heldOver).toBe(1900000);
    expect(r2(r.cgtNew)).toBe(455280); // matches the brief's canonical £455,280
    expect(r.cgtOld).toBe(0); // old 100%-relief position, contrast only
    expect(r2(r.netProceedsNew)).toBe(3544720);
    expect(r.netProceedsOld).toBe(4000000);
  });

  it("BADR is blocked on the taxable 50% — trade-sale comparison uses BADR, EOT slice does not", () => {
    const r = calcEOTTaxSaving(4000000, 200000, 100, "higher", 1000000);
    expect(r2(r.tradeSaleCgt)).toBe(851280);
    expect(r2(r.tradeSaleNet)).toBe(3148720);
  });

  it("50% ownership and basic-rate seller scales gain and uses the 18% rate", () => {
    const r = calcEOTTaxSaving(500000, 50000, 50, "basic", 500000);
    expect(r.gain).toBe(225000);
    expect(r.chargeableNow).toBe(112500);
    expect(r2(r.cgtNew)).toBe(19710);
    expect(r2(r.netProceedsNew)).toBe(230290);
  });

  it("held-over 50% is always exactly half the gain, whatever the rate or ownership", () => {
    const r = calcEOTTaxSaving(1000000, 100000, 80, "higher", 1000000);
    expect(r.heldOver).toBe(r.chargeableNow);
    expect(r2(r.heldOver + r.chargeableNow)).toBe(r.gain);
  });
});
