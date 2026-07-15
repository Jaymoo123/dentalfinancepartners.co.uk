import { describe, it, expect } from "vitest";
import {
  residentialFee,
  communityFeePerLocation,
  nursesAgencyFee,
  calcCqcFee,
  RESIDENTIAL_BANDS,
  COMMUNITY_BASE,
  COMMUNITY_PER_USER,
  COMMUNITY_CAP,
  COMMUNITY_CAP_THRESHOLD,
  NURSES_AGENCY_BANDS,
} from "./cqc-fee-calculator";

/**
 * Golden-figure suite for cqc-fee-calculator.
 * All expected values derived directly from the pinned constants so that a
 * future CQC scheme update causes test failures rather than silent drift.
 *
 * Rounding decision (community): per-location fee = Math.round(£239 + n * £54.305).
 * At 1,700 service users the cap (£92,558) applies and rounding is irrelevant.
 *
 * Sources:
 *   https://www.cqc.org.uk/guidance-providers/fees/provider-fees-payable-social-care-services (10 June 2024)
 *   https://www.cqc.org.uk/guidance-regulation/fees (14 May 2025)
 *   Retrieved 2026-07-15.
 */

describe("residentialFee — band boundary edges", () => {
  it("3 registered places → <4 band (£313)", () => {
    expect(residentialFee(3)).toBe(RESIDENTIAL_BANDS[0].fee); // 313
  });

  it("4 registered places → 4-10 band (£816)", () => {
    expect(residentialFee(4)).toBe(RESIDENTIAL_BANDS[1].fee); // 816
  });

  it("90 registered places → 81-90 band (£14,069)", () => {
    expect(residentialFee(90)).toBe(RESIDENTIAL_BANDS[16].fee); // 14069
  });

  it("91 registered places → >90 band (£15,710)", () => {
    expect(residentialFee(91)).toBe(RESIDENTIAL_BANDS[17].fee); // 15710
  });

  it("0 registered places → smallest band (£313, not NaN)", () => {
    expect(residentialFee(0)).toBe(RESIDENTIAL_BANDS[0].fee);
    expect(isNaN(residentialFee(0))).toBe(false);
  });

  it("large value (999) → top band (£15,710)", () => {
    expect(residentialFee(999)).toBe(RESIDENTIAL_BANDS[RESIDENTIAL_BANDS.length - 1].fee);
  });

  it("mid-band (20 places) → 16-20 band (£2,388)", () => {
    expect(residentialFee(20)).toBe(2388);
  });
});

describe("communityFeePerLocation — formula and cap", () => {
  it("50 service users → £239 + 50*54.305 rounded", () => {
    const expected = Math.round(COMMUNITY_BASE + 50 * COMMUNITY_PER_USER);
    expect(communityFeePerLocation(50)).toBe(expected);
  });

  it("1 service user → £239 + 54.305 rounded = £293", () => {
    // 239 + 54.305 = 293.305 → rounds to 293
    expect(communityFeePerLocation(1)).toBe(293);
  });

  it("1699 service users → below cap", () => {
    const fee = communityFeePerLocation(1699);
    expect(fee).toBeLessThan(COMMUNITY_CAP);
    expect(fee).toBe(Math.round(COMMUNITY_BASE + 1699 * COMMUNITY_PER_USER));
  });

  it("1700 service users → cap (£92,558)", () => {
    expect(communityFeePerLocation(COMMUNITY_CAP_THRESHOLD)).toBe(COMMUNITY_CAP);
  });

  it("2000 service users → cap (£92,558)", () => {
    expect(communityFeePerLocation(2000)).toBe(COMMUNITY_CAP);
  });

  it("0 service users → £239 base", () => {
    expect(communityFeePerLocation(0)).toBe(COMMUNITY_BASE);
    expect(isNaN(communityFeePerLocation(0))).toBe(false);
  });
});

describe("nursesAgencyFee — location band boundaries", () => {
  it("1 location → £2,192", () => {
    expect(nursesAgencyFee(1)).toBe(NURSES_AGENCY_BANDS[0].fee); // 2192
  });

  it("2 locations → £6,093", () => {
    expect(nursesAgencyFee(2)).toBe(NURSES_AGENCY_BANDS[1].fee); // 6093
  });

  it("3 locations → £6,093", () => {
    expect(nursesAgencyFee(3)).toBe(NURSES_AGENCY_BANDS[1].fee); // 6093
  });

  it("4 locations → £12,184", () => {
    expect(nursesAgencyFee(4)).toBe(NURSES_AGENCY_BANDS[2].fee); // 12184
  });

  it("6 locations → £12,184", () => {
    expect(nursesAgencyFee(6)).toBe(NURSES_AGENCY_BANDS[2].fee); // 12184
  });

  it("7 locations → £24,370", () => {
    expect(nursesAgencyFee(7)).toBe(NURSES_AGENCY_BANDS[3].fee); // 24370
  });

  it("12 locations → £24,370", () => {
    expect(nursesAgencyFee(12)).toBe(NURSES_AGENCY_BANDS[3].fee); // 24370
  });

  it("13 locations → £48,740", () => {
    expect(nursesAgencyFee(13)).toBe(NURSES_AGENCY_BANDS[4].fee); // 48740
  });

  it("25 locations → £48,740", () => {
    expect(nursesAgencyFee(25)).toBe(NURSES_AGENCY_BANDS[4].fee); // 48740
  });

  it("26 locations → £97,476", () => {
    expect(nursesAgencyFee(26)).toBe(NURSES_AGENCY_BANDS[5].fee); // 97476
  });

  it("100 locations → £97,476 (top band, no overflow)", () => {
    expect(nursesAgencyFee(100)).toBe(NURSES_AGENCY_BANDS[5].fee);
  });
});

describe("calcCqcFee — providerType routing", () => {
  it("residential: only registeredPlaces drives the fee", () => {
    const r = calcCqcFee("residential", 20, 999, 999);
    expect(r.annualFee).toBe(residentialFee(20)); // 2388; community/location inputs ignored
    expect(r.providerType).toBe("residential");
  });

  it("community: locations multiplies per-location fee; registeredPlaces ignored", () => {
    const r = calcCqcFee("community", 999, 50, 3);
    const expectedPerLoc = communityFeePerLocation(50);
    expect(r.annualFee).toBe(expectedPerLoc * 3);
  });

  it("community: cap applied per location (1700 users, 2 locations)", () => {
    const r = calcCqcFee("community", 0, 1700, 2);
    expect(r.annualFee).toBe(COMMUNITY_CAP * 2);
  });

  it("nurses-agency: only locations drives the fee; other inputs ignored", () => {
    const r = calcCqcFee("nurses-agency", 999, 999, 7);
    expect(r.annualFee).toBe(nursesAgencyFee(7)); // 24370
    expect(r.providerType).toBe("nurses-agency");
  });
});
