import { describe, expect, it } from "vitest";
import { gasdsClaim, giftAid, scrutinyLevel } from "./charity-rules";

/**
 * Golden-figure suites. Every expected value is hand-derived from the cited
 * gov.uk rule (2026/27), never from the engine itself.
 */

describe("giftAid", () => {
  // Rule: charity reclaims basic-rate tax on the gross donation. Gross =
  // donation / (1 - 20%), i.e. 25p per £1 donated.
  // Source: https://www.gov.uk/claim-gift-aid ("claim an extra 25p for every £1")
  // Donor relief: higher/additional-rate donors reclaim (marginal - basic) x gross.
  // Source: https://www.gov.uk/donating-to-charity/gift-aid

  it("basic-rate donor, £100: charity gets £125, donor reclaims nothing", () => {
    // gross = 100 / 0.8 = 125; claim = 125 - 100 = 25; donor relief = 0
    const r = giftAid(100, "basic");
    expect(r.gross).toBeCloseTo(125, 2);
    expect(r.charityClaim).toBeCloseTo(25, 2);
    expect(r.charityReceives).toBeCloseTo(125, 2);
    expect(r.donorRelief).toBeCloseTo(0, 2);
    expect(r.netCostToDonor).toBeCloseTo(100, 2);
  });

  it("higher-rate donor, £100: donor reclaims £25, net cost £75", () => {
    // gross = 125; relief = 125 x (40% - 20%) = 25; net cost = 100 - 25 = 75
    // Worked example matches gov.uk: donate £100, claim back £25 at 40%.
    const r = giftAid(100, "higher");
    expect(r.donorRelief).toBeCloseTo(25, 2);
    expect(r.netCostToDonor).toBeCloseTo(75, 2);
    expect(r.charityReceives).toBeCloseTo(125, 2);
  });

  it("additional-rate donor, £100: donor reclaims £31.25, net cost £68.75", () => {
    // relief = 125 x (45% - 20%) = 31.25; net cost = 100 - 31.25 = 68.75
    const r = giftAid(100, "additional");
    expect(r.donorRelief).toBeCloseTo(31.25, 2);
    expect(r.netCostToDonor).toBeCloseTo(68.75, 2);
  });

  it("£40 donation, basic rate: charity claims £10", () => {
    // gross = 40 / 0.8 = 50; claim = 50 - 40 = 10 (25p per £1 x 40)
    const r = giftAid(40, "basic");
    expect(r.charityClaim).toBeCloseTo(10, 2);
    expect(r.charityReceives).toBeCloseTo(50, 2);
  });

  it("£1,000 donation, higher rate: charity gets £1,250, donor reclaims £250", () => {
    // gross = 1000 / 0.8 = 1250; relief = 1250 x 20% = 250
    const r = giftAid(1000, "higher");
    expect(r.charityReceives).toBeCloseTo(1250, 2);
    expect(r.donorRelief).toBeCloseTo(250, 2);
    expect(r.netCostToDonor).toBeCloseTo(750, 2);
  });

  it("non-taxpayer: Gift Aid must not be claimed", () => {
    // A donor must have paid at least the reclaimed amount in UK tax
    // (https://www.gov.uk/claim-gift-aid); with no tax paid there is no claim.
    const r = giftAid(100, "none");
    expect(r.eligible).toBe(false);
    expect(r.charityClaim).toBe(0);
    expect(r.charityReceives).toBeCloseTo(100, 2);
  });

  it("negative input is clamped to zero", () => {
    const r = giftAid(-50, "basic");
    expect(r.charityClaim).toBe(0);
  });
});

describe("gasdsClaim", () => {
  // Rules: top-up on small (<= £30) cash/contactless donations, on up to
  // £8,000 of donations per tax year; top-up rate matches Gift Aid (25%);
  // matching rule: GASDS donations <= 10 x Gift Aid donations claimed the
  // same year.
  // Sources: https://www.gov.uk/claim-gift-aid/small-donations-scheme
  //          https://www.gov.uk/guidance/claiming-a-top-up-payment-on-small-charitable-donations

  it("£2,000 small donations with ample Gift Aid: top-up £500", () => {
    // 2000 x 25% = 500; matching cap = 10 x 1000 = 10000 (not binding)
    const r = gasdsClaim(2000, 1000);
    expect(r.claimableDonations).toBe(2000);
    expect(r.topUp).toBeCloseTo(500, 2);
    expect(r.binding).toBe("none");
  });

  it("£12,000 small donations: capped at £8,000, top-up £2,000 (annual cap)", () => {
    // annual cap 8000 binds; 8000 x 25% = 2000 (the gov.uk maximum top-up)
    const r = gasdsClaim(12000, 5000);
    expect(r.claimableDonations).toBe(8000);
    expect(r.topUp).toBeCloseTo(2000, 2);
    expect(r.binding).toBe("annual-cap");
  });

  it("matching rule: £100 Gift Aid claimed caps GASDS at £1,000 of donations", () => {
    // gov.uk worked example: to claim on £1,000 GASDS you must claim Gift Aid
    // on at least £100 of donations in the same year (10x rule).
    // claimable = min(5000, 8000, 10 x 100 = 1000) = 1000; top-up = 250
    const r = gasdsClaim(5000, 100);
    expect(r.matchingCap).toBe(1000);
    expect(r.claimableDonations).toBe(1000);
    expect(r.topUp).toBeCloseTo(250, 2);
    expect(r.binding).toBe("matching");
  });

  it("no Gift Aid claimed: nothing claimable under GASDS", () => {
    // matching cap = 10 x 0 = 0
    const r = gasdsClaim(3000, 0);
    expect(r.claimableDonations).toBe(0);
    expect(r.topUp).toBe(0);
    expect(r.binding).toBe("matching");
  });

  it("exactly at the £8,000 cap: full £2,000 top-up, no cap flagged", () => {
    // 8000 x 25% = 2000; matching cap = 10 x 800 = 8000, exactly sufficient
    const r = gasdsClaim(8000, 800);
    expect(r.claimableDonations).toBe(8000);
    expect(r.topUp).toBeCloseTo(2000, 2);
    expect(r.binding).toBe("none");
  });

  it("small figures: £500 donations, £50 Gift Aid: matching just covers it", () => {
    // matching cap = 10 x 50 = 500 = donations; top-up = 500 x 25% = 125
    const r = gasdsClaim(500, 50);
    expect(r.claimableDonations).toBe(500);
    expect(r.topUp).toBeCloseTo(125, 2);
  });
});

describe("scrutinyLevel", () => {
  // Thresholds (England & Wales, Charities Act 2011):
  //  - IE required when gross income > £25,000
  //    https://www.gov.uk/government/publications/independent-examination-of-charity-accounts-trustees-cc31
  //  - Audit when income > £1m, or income > £250,000 AND gross assets > £3.26m
  //    https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d
  //  - Income > £250,000: accruals accounts + examiner from a listed body (CC32)

  const base = { assets: 50_000, isCompany: false, governingDocRequiresAudit: false };

  it("£20,000 income: no external scrutiny required", () => {
    // 20,000 <= 25,000 IE gate
    const r = scrutinyLevel({ ...base, income: 20_000 });
    expect(r.level).toBe("none");
    expect(r.accrualsRequired).toBe(false);
  });

  it("£25,000 exactly: still below the gate (gate is 'exceeds £25,000')", () => {
    const r = scrutinyLevel({ ...base, income: 25_000 });
    expect(r.level).toBe("none");
  });

  it("£60,000 income: independent examination, unqualified examiner allowed", () => {
    // 25,000 < 60,000 <= 250,000
    const r = scrutinyLevel({ ...base, income: 60_000 });
    expect(r.level).toBe("independent-examination");
    expect(r.qualifiedExaminerRequired).toBe(false);
    expect(r.accrualsRequired).toBe(false);
  });

  it("£400,000 income, modest assets: IE but examiner must be qualified, accruals required", () => {
    // 250,000 < 400,000 <= 1m and assets 500,000 <= 3.26m
    const r = scrutinyLevel({ ...base, income: 400_000, assets: 500_000 });
    expect(r.level).toBe("independent-examination");
    expect(r.qualifiedExaminerRequired).toBe(true);
    expect(r.accrualsRequired).toBe(true);
  });

  it("£400,000 income with £4m assets: audit (assets test)", () => {
    // income > 250,000 AND assets 4,000,000 > 3,260,000
    const r = scrutinyLevel({ ...base, income: 400_000, assets: 4_000_000 });
    expect(r.level).toBe("audit");
  });

  it("£200,000 income with £4m assets: IE only (assets test needs income > £250k)", () => {
    const r = scrutinyLevel({ ...base, income: 200_000, assets: 4_000_000 });
    expect(r.level).toBe("independent-examination");
  });

  it("£1.2m income: audit regardless of assets", () => {
    // 1,200,000 > 1,000,000
    const r = scrutinyLevel({ ...base, income: 1_200_000 });
    expect(r.level).toBe("audit");
  });

  it("governing document override forces audit at any size", () => {
    const r = scrutinyLevel({ ...base, income: 30_000, governingDocRequiresAudit: true });
    expect(r.level).toBe("audit");
  });

  it("charitable company always needs accruals accounts", () => {
    // CC15d: charitable companies must prepare accruals accounts at any income
    const r = scrutinyLevel({ ...base, income: 60_000, isCompany: true });
    expect(r.accrualsRequired).toBe(true);
    expect(r.level).toBe("independent-examination");
  });
});
