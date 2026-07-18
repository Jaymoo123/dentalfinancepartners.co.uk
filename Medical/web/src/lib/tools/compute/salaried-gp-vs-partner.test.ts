/**
 * Golden tests for calcGpVsPartner (Tool 7 public compute).
 *
 * Values hand-derived per TOOL_ROSTER.md §4 Tool 7 worked example and the
 * LOCKED band rule; they match the premium config's workedExampleSsr block.
 * Kept in a separate file because medical-tools.test.ts is under concurrent
 * edit by another workstream.
 */

import { describe, it, expect } from "vitest";
import { calcGpVsPartner } from "./salaried-gp-vs-partner";

describe("calcGpVsPartner — golden tests (roster worked example)", () => {
  it("roster example: salaried 90k vs partner 110k, no SL", () => {
    // Salaried £90,000: PA 12,570 (full). Taxable 77,430.
    //   basic 37,700*0.2=7,540; higher 39,730*0.4=15,892 => tax 23,432
    //   Class 1 NI: 37,700*0.08=3,016 + 39,730*0.02=794.6 => 3,810.6
    //   super: top tier 12.5% * 90,000 = 11,250
    //   net = 90,000 - 23,432 - 3,810.6 - 11,250 = 51,507.4
    // Partner £110,000: PA tapered 12,570-5,000=7,570. Taxable 102,430.
    //   basic 7,540; higher band width (125,140-7,570)-37,700=79,870;
    //   higher taxable 64,730*0.4=25,892 => tax 33,432
    //   Class 4 NI: 37,700*0.06=2,262 + 59,730*0.02=1,194.6 => 3,456.6
    //   super: 12.5% * 110,000 = 13,750
    //   net = 110,000 - 33,432 - 3,456.6 - 13,750 = 59,361.4
    // Net gap = 59,361.4 - 51,507.4 = 7,854
    const r = calcGpVsPartner({ salariedPay: 90000, partnerProfitShare: 110000, studentLoanPlan: "none" });
    expect(r.salaried.personalAllowance).toBe(12570);
    expect(r.salaried.incomeTax).toBeCloseTo(23432, 0);
    expect(r.salaried.ni).toBeCloseTo(3810.6, 1);
    expect(r.salaried.nhsSuper).toBeCloseTo(11250, 0);
    expect(r.salaried.netPay).toBeCloseTo(51507, 0);
    expect(r.partner.personalAllowance).toBe(7570);
    expect(r.partner.incomeTax).toBeCloseTo(33432, 0);
    expect(r.partner.ni).toBeCloseTo(3456.6, 1);
    expect(r.partner.nhsSuper).toBeCloseTo(13750, 0);
    expect(r.partner.netPay).toBeCloseTo(59361, 0);
    expect(r.netGap).toBeCloseTo(7854, 0);
    expect(r.grossGap).toBe(20000);
  });

  it("plan2 student loan applies to both sides on gross", () => {
    // Salaried 90,000: SL = (90,000-28,470)*0.09 = 61,530*0.09 = 5,537.70
    // Partner 110,000: SL = (110,000-28,470)*0.09 = 81,530*0.09 = 7,337.70
    const r = calcGpVsPartner({ salariedPay: 90000, partnerProfitShare: 110000, studentLoanPlan: "plan2" });
    expect(r.salaried.studentLoanRepayment).toBeCloseTo(5537.7, 1);
    expect(r.partner.studentLoanRepayment).toBeCloseTo(7337.7, 1);
  });

  it("additional-rate partner: 150k profit share, PA fully tapered", () => {
    // PA = 0 (150,000 > 125,140). Taxable 150,000.
    //   basic 37,700*0.2=7,540; higher width 125,140-0-37,700=87,440 *0.4=34,976
    //   additional (150,000-125,140)=24,860*0.45=11,187 => tax 53,703
    //   Class 4 NI: 2,262 + (150,000-50,270)*0.02=1,994.6 => 4,256.6
    const r = calcGpVsPartner({ salariedPay: 90000, partnerProfitShare: 150000, studentLoanPlan: "none" });
    expect(r.partner.personalAllowance).toBe(0);
    expect(r.partner.incomeTax).toBeCloseTo(53703, 0);
    expect(r.partner.ni).toBeCloseTo(4256.6, 1);
  });

  it("equal pay: Class 4 main rate beats Class 1, partner nets slightly more", () => {
    // Both 60,000: only NI differs. C1 = 3,016 + 194.6 = 3,210.6; C4 = 2,262 + 194.6 = 2,456.6
    // netGap = 3,210.6 - 2,456.6 = 754
    const r = calcGpVsPartner({ salariedPay: 60000, partnerProfitShare: 60000, studentLoanPlan: "none" });
    expect(r.grossGap).toBe(0);
    expect(r.netGap).toBeCloseTo(754, 0);
  });

  it("income below thresholds: no tax, no NI", () => {
    const r = calcGpVsPartner({ salariedPay: 12000, partnerProfitShare: 12000, studentLoanPlan: "none" });
    expect(r.salaried.incomeTax).toBe(0);
    expect(r.salaried.ni).toBe(0);
    expect(r.partner.ni).toBe(0);
  });
});
