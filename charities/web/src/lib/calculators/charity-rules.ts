/**
 * Pure charity finance rules engine (no React). 2026/27 rules, England & Wales
 * default. Every constant traces to docs/charities/house_positions.md — the
 * site's single source of truth — which cites the live gov.uk page for each
 * figure. Do not change a number here without changing it there.
 */

// ---------------------------------------------------------------------------
// Gift Aid (house positions 14, 19)
// https://www.gov.uk/claim-gift-aid — charity claims 25p per £1 donated
// https://www.gov.uk/donating-to-charity/gift-aid — higher/additional-rate donor relief
// ---------------------------------------------------------------------------

export const GIFT_AID = {
  /** UK basic rate of income tax, 2026/27 */
  basicRate: 0.2,
  /** Higher rate */
  higherRate: 0.4,
  /** Additional rate */
  additionalRate: 0.45,
} as const;

export type DonorBand = "basic" | "higher" | "additional" | "none";

export interface GiftAidResult {
  /** The net donation the donor gives */
  donation: number;
  /** Gross donation = donation / (1 - basic rate) */
  gross: number;
  /** What the charity reclaims from HMRC (25p per £1) */
  charityClaim: number;
  /** Total the charity receives (donation + claim) */
  charityReceives: number;
  /** What the donor personally reclaims via Self Assessment */
  donorRelief: number;
  /** Donation minus donor relief */
  netCostToDonor: number;
  /** false when the donor pays no UK tax — Gift Aid must not be claimed */
  eligible: boolean;
}

export function giftAid(donation: number, band: DonorBand): GiftAidResult {
  const d = Math.max(0, donation);
  if (band === "none") {
    // Non-taxpayer: no valid declaration possible; donor would owe HMRC the
    // shortfall if Gift Aid were claimed.
    return {
      donation: d,
      gross: d,
      charityClaim: 0,
      charityReceives: d,
      donorRelief: 0,
      netCostToDonor: d,
      eligible: false,
    };
  }
  const gross = d / (1 - GIFT_AID.basicRate); // £100 -> £125
  const charityClaim = gross - d; // 25p per £1
  const donorRate =
    band === "higher" ? GIFT_AID.higherRate : band === "additional" ? GIFT_AID.additionalRate : GIFT_AID.basicRate;
  // Donor reclaims the difference between their marginal rate and basic rate, on the gross.
  const donorRelief = gross * (donorRate - GIFT_AID.basicRate);
  return {
    donation: d,
    gross,
    charityClaim,
    charityReceives: gross,
    donorRelief,
    netCostToDonor: d - donorRelief,
    eligible: true,
  };
}

// ---------------------------------------------------------------------------
// GASDS — Gift Aid Small Donations Scheme (house position 17)
// https://www.gov.uk/claim-gift-aid/small-donations-scheme
// https://www.gov.uk/guidance/claiming-a-top-up-payment-on-small-charitable-donations
// ---------------------------------------------------------------------------

export const GASDS = {
  /** Max size of an individual small cash/contactless donation */
  perDonationLimit: 30,
  /** Max small donations claimable per tax year (per charity, main allowance) */
  annualDonationsCap: 8000,
  /** Top-up rate mirrors Gift Aid: 25p per £1 */
  topUpRate: 0.25,
  /** Matching rule: GASDS donations claimed <= 10 x Gift Aid donations claimed same year */
  matchingMultiple: 10,
} as const;

export interface GasdsResult {
  /** Small donations entered (already <= £30 each; the form enforces this) */
  smallDonations: number;
  /** Cap applied by the £8,000 annual limit */
  cappedByAnnualLimit: number;
  /** Cap applied by the 10x matching rule */
  matchingCap: number;
  /** Donations actually claimable = min of the above */
  claimableDonations: number;
  /** Top-up payment = claimable x 25% */
  topUp: number;
  /** Which constraint bit: "annual-cap" | "matching" | "none" */
  binding: "annual-cap" | "matching" | "none";
}

/**
 * @param smallDonations total eligible small (<=£30) cash/contactless donations this tax year
 * @param giftAidDonations donations on which the charity has claimed (or will claim) Gift Aid this tax year
 */
export function gasdsClaim(smallDonations: number, giftAidDonations: number): GasdsResult {
  const s = Math.max(0, smallDonations);
  const matchingCap = Math.max(0, giftAidDonations) * GASDS.matchingMultiple;
  const claimable = Math.min(s, GASDS.annualDonationsCap, matchingCap);
  // When capped, the smaller of the two caps is the binding constraint.
  const binding: GasdsResult["binding"] =
    claimable >= s ? "none" : matchingCap < GASDS.annualDonationsCap ? "matching" : "annual-cap";
  return {
    smallDonations: s,
    cappedByAnnualLimit: Math.min(s, GASDS.annualDonationsCap),
    matchingCap,
    claimableDonations: claimable,
    topUp: claimable * GASDS.topUpRate,
    binding,
  };
}

// ---------------------------------------------------------------------------
// External scrutiny: independent examination vs audit (house positions 3-6)
// Charities Act 2011 ss.144-145 thresholds, England & Wales.
// https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d
// ---------------------------------------------------------------------------

export const SCRUTINY = {
  /** Gross income above which independent examination is required */
  ieIncomeGate: 25_000,
  /** Gross income above which accruals accounts + qualified examiner are required */
  accrualsGate: 250_000,
  /** Gross income above which statutory audit is required */
  auditIncomeGate: 1_000_000,
  /** Audit also required if income > accrualsGate AND gross assets exceed this */
  auditAssetsGate: 3_260_000,
} as const;

export type ScrutinyLevel = "none" | "independent-examination" | "audit";

export interface ScrutinyInput {
  /** Gross annual income, £ */
  income: number;
  /** Gross assets at year end, £ */
  assets: number;
  /** Charitable company (or CIO preparing accruals accounts)? */
  isCompany: boolean;
  /** Governing document or funder requires an audit regardless of size? */
  governingDocRequiresAudit: boolean;
}

export interface ScrutinyResult {
  level: ScrutinyLevel;
  /** Why the level applies */
  reason: string;
  /** Accruals accounts required (income > £250k, or a company)? */
  accrualsRequired: boolean;
  /** If IE: must the examiner belong to a listed body (ICAEW, ACCA, AAT etc.)? */
  qualifiedExaminerRequired: boolean;
}

export function scrutinyLevel(input: ScrutinyInput): ScrutinyResult {
  const { income, assets, isCompany, governingDocRequiresAudit } = input;
  const accrualsRequired = isCompany || income > SCRUTINY.accrualsGate;

  if (governingDocRequiresAudit) {
    return {
      level: "audit",
      reason:
        "Your governing document or a funder requires an audit, which overrides the statutory thresholds.",
      accrualsRequired,
      qualifiedExaminerRequired: false,
    };
  }
  if (income > SCRUTINY.auditIncomeGate) {
    return {
      level: "audit",
      reason: "Gross income exceeds £1m, so a statutory audit is required.",
      accrualsRequired,
      qualifiedExaminerRequired: false,
    };
  }
  if (income > SCRUTINY.accrualsGate && assets > SCRUTINY.auditAssetsGate) {
    return {
      level: "audit",
      reason:
        "Gross income exceeds £250,000 and gross assets exceed £3.26m, so a statutory audit is required.",
      accrualsRequired,
      qualifiedExaminerRequired: false,
    };
  }
  if (income > SCRUTINY.ieIncomeGate) {
    return {
      level: "independent-examination",
      reason:
        income > SCRUTINY.accrualsGate
          ? "Gross income exceeds £25,000, so independent examination is required. Because income exceeds £250,000 the examiner must belong to a body listed in the Charities Act (ICAEW, ACCA, AAT and others)."
          : "Gross income exceeds £25,000, so independent examination is required. Below £250,000 any suitably experienced independent person can examine.",
      accrualsRequired,
      qualifiedExaminerRequired: income > SCRUTINY.accrualsGate,
    };
  }
  return {
    level: "none",
    reason:
      "Gross income is £25,000 or below, so no external scrutiny is required by the Charities Act (check your governing document for stricter rules).",
    accrualsRequired,
    qualifiedExaminerRequired: false,
  };
}
