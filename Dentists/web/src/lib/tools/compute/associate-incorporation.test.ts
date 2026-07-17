/**
 * Golden tests for calcAssociateIncorporation (2026/27).
 *
 * Values traced by hand at the tool's worked-example inputs:
 *
 * Example 1: 200000 gross, 45% split, 8% lab, 4000 expenses, 80% NHS.
 *   share 90,000; lab 7,200; netFees 78,800.
 *   ST: IT = 37,700*0.2 + 28,530*0.4 = 7,540 + 11,412 = 18,952
 *       C4 = 37,700*0.06 + 28,530*0.02 = 2,262 + 570.60 = 2,832.60
 *       C2 = 179.40; total 21,964; net 56,836.
 *   Ltd: salary 12,570; erNI 1,135.50; ctProfit = 78,800-12,570-1,135.50-1,800
 *        = 63,294.50; CT = 9,500 + 13,294.50*0.265 = 13,023.04; div 50,271.46
 *        divTax: taxable 49,771.46; basic band left 37,700 @10.75% = 4,052.75;
 *        12,071.46 @35.75% = 4,315.55; total 8,368.30; ltdNet = 54,473.16.
 *   pensionable = 63,040; pensionValue = 63,040 * 0.2378 = 14,990.91.
 *   taxSavingBeforePension = -2,362.84 → Ltd behind even pre-pension here;
 *   afterPension = -17,353.75 → sole trader wins.
 */
import { describe, it, expect } from "vitest";
import { calcAssociateIncorporation } from "./associate-incorporation";

const r2 = (n: number) => Math.round(n * 100) / 100;

describe("calcAssociateIncorporation", () => {
  it("matches hand-traced example 1 (NHS-weighted associate)", () => {
    const r = calcAssociateIncorporation(200000, 45, 8, 4000, 80, 0);
    expect(r.netFees).toBe(78800);
    expect(r2(r.soleTrader.incomeTax)).toBe(18952);
    expect(r2(r.soleTrader.class4Ni)).toBe(2832.6);
    expect(r2(r.soleTrader.class2Ni)).toBe(179.4);
    expect(r2(r.soleTrader.net)).toBe(56836);
    expect(r2(r.ltd.employerNi)).toBe(1135.5);
    expect(r2(r.ltd.ctProfit)).toBe(63294.5);
    expect(r2(r.ltd.corporationTax)).toBe(13023.04);
    expect(r2(r.ltd.dividendTax)).toBe(8368.3);
    expect(r2(r.ltd.net)).toBe(54473.16);
    expect(r2(r.pensionableEarnings)).toBe(63040);
    expect(r2(r.pensionEmployerValue)).toBe(14990.91);
    expect(r.ltdWins).toBe(false);
  });

  it("pensionable override replaces the NHS-share heuristic", () => {
    const r = calcAssociateIncorporation(200000, 45, 8, 4000, 80, 70000);
    expect(r.pensionableEarnings).toBe(70000);
    expect(r2(r.pensionEmployerValue)).toBe(16646);
  });

  it("zero NHS share removes the pension layer from the verdict", () => {
    const r = calcAssociateIncorporation(200000, 45, 8, 4000, 0, 0);
    expect(r.pensionEmployerValue).toBe(0);
    expect(r2(r.netPositionAfterPension)).toBe(r2(r.taxSavingBeforePension));
  });

  it("handles zero income without NaN", () => {
    const r = calcAssociateIncorporation(0, 45, 8, 0, 80, 0);
    expect(r.soleTrader.net).toBe(0);
    expect(r.ltd.net).toBe(0);
    expect(r.ltd.corporationTax).toBe(0);
  });
});
