/**
 * Single-source-of-truth fees, thresholds and pure numeric helpers for
 * divorce-finances. Role mirror of construction-cis cis-tax.ts and
 * wills-probate estate-tax.ts.
 *
 * All constants trace to the source noted in the comment. Helpers return
 * NUMBERS (never gbp() strings) so tools can compose them without parsing.
 *
 * Sources:
 *   HMCTS court fees (EX50)   - https://www.gov.uk/government/publications/fees-in-the-civil-and-family-courts-main-fees-ex50
 *   Fee uplift 13 July 2026   - SI 2026/642 (Court and Tribunal Fees), Family Proceedings Fees Order 2008 as amended: divorce £612 to £628 (fee 1.2), consent order £60 to £62 (fee 5.1), contested financial order £313 to £321 (fee 5.4)
 *   Help with Fees            - https://www.gov.uk/get-help-with-court-fees (EX160 scheme, post November 2023 rules)
 *   Mediation voucher         - https://www.gov.uk/guidance/family-mediation-voucher-scheme (£500, extended into 2026/27)
 *
 * Market cost bands are ESTIMATES from published fixed-fee pages and guides,
 * not statutory figures. Each band is queued in FACT_VERIFICATION_QUEUE.md.
 */

// ---------------------------------------------------------------------------
// HMCTS court fees, from 13 July 2026
// ---------------------------------------------------------------------------

/** Divorce / dissolution application fee (was £612 before 13 July 2026). */
export const DIVORCE_APPLICATION_FEE = 628;

/** Consent order (financial order by consent) court fee (was £60). */
export const CONSENT_ORDER_FEE = 62;

/** Contested financial order (Form A, not by consent) court fee (£313 before 13 July 2026). SI 2026/642 fee 5.4. */
export const CONTESTED_FINANCIAL_ORDER_FEE = 321;

// ---------------------------------------------------------------------------
// Help with Fees (EX160), post November 2023 scheme
// https://www.gov.uk/get-help-with-court-fees
// ---------------------------------------------------------------------------

export const HWF = {
  /** Gross monthly income threshold, single applicant. */
  singleIncomeThreshold: 1420,
  /** Gross monthly income threshold, applicant with a partner. */
  coupleIncomeThreshold: 2130,
  /**
   * Added to the threshold per dependent child. gov.uk sets this by age:
   * £425 for a child aged 0 to 13, £710 for a child aged 14 or over. This
   * tool does not collect ages, so it uses the £425 base figure (the common
   * case, and the conservative one for eligibility); the field help notes the
   * higher figure for older children.
   */
  childPremium: 425,
  /** Contribution rate on income above the threshold (50p per £1). */
  taper: 0.5,
  /** Disposable capital limit where the fee is £1,420 or less (covers all divorce fees). */
  capitalLimitStandard: 4250,
  /** Disposable capital limit where the applicant or partner is 66 or over. */
  capitalLimitOver66: 16000,
} as const;

export interface HwfInput {
  fee: number;
  grossMonthlyIncome: number;
  hasPartner: boolean;
  children: number;
  onQualifyingBenefit: boolean;
  disposableCapital: number;
  aged66OrOver: boolean;
}

export interface HwfResult {
  /** true when any remission (full or partial) is due */
  eligible: boolean;
  /** amount of the fee waived */
  remission: number;
  /** amount the applicant still pays */
  contribution: number;
  /** gross monthly income threshold applied */
  incomeThreshold: number;
  /** capital limit applied */
  capitalLimit: number;
  /** which test failed, if any */
  failedTest: "capital" | "income" | null;
}

/**
 * EX160 remission on a court fee. Two tests:
 *  1. Disposable capital must be under the limit for the fee band.
 *  2. Income test: full remission on a qualifying benefit or income at or
 *     below the threshold; otherwise a 50p per £1 contribution on the excess.
 */
export function hwfRemission(input: HwfInput): HwfResult {
  const fee = Math.max(0, input.fee);
  const capitalLimit = input.aged66OrOver
    ? HWF.capitalLimitOver66
    : HWF.capitalLimitStandard;
  const incomeThreshold =
    (input.hasPartner ? HWF.coupleIncomeThreshold : HWF.singleIncomeThreshold) +
    Math.max(0, Math.floor(input.children)) * HWF.childPremium;

  if (input.disposableCapital >= capitalLimit) {
    return {
      eligible: false,
      remission: 0,
      contribution: fee,
      incomeThreshold,
      capitalLimit,
      failedTest: "capital",
    };
  }

  if (input.onQualifyingBenefit || input.grossMonthlyIncome <= incomeThreshold) {
    return {
      eligible: true,
      remission: fee,
      contribution: 0,
      incomeThreshold,
      capitalLimit,
      failedTest: null,
    };
  }

  const excess = input.grossMonthlyIncome - incomeThreshold;
  const contribution = Math.min(fee, Math.round(excess * HWF.taper));
  const remission = fee - contribution;
  return {
    eligible: remission > 0,
    remission,
    contribution,
    incomeThreshold,
    capitalLimit,
    failedTest: remission > 0 ? null : "income",
  };
}

// ---------------------------------------------------------------------------
// Family Mediation Voucher Scheme
// https://www.gov.uk/guidance/family-mediation-voucher-scheme
// £500 per family, cases involving a child dispute. Extended into 2026/27.
// ---------------------------------------------------------------------------

export const MEDIATION_VOUCHER = 500;

// ---------------------------------------------------------------------------
// Market cost bands (ESTIMATES, not statutory; each figure queued for
// verification). Bands are [low, high] in GBP.
// ---------------------------------------------------------------------------

export type CostBand = readonly [number, number];

/** Online divorce services (application handled for you, excl. court fee). */
export const ONLINE_DIVORCE_SERVICE: CostBand = [150, 300];

/** Solicitor-managed uncontested divorce (fees excl. VAT and court fee). */
export const SOLICITOR_UNCONTESTED_DIVORCE: CostBand = [500, 1500];

/** Solicitor-negotiated financial settlement, per person. */
export const SOLICITOR_NEGOTIATED_SETTLEMENT: CostBand = [2000, 8000];

/** Contested financial remedy proceedings to final hearing, per person. */
export const CONTESTED_PROCEEDINGS: CostBand = [10000, 30000];

/** Consent order / clean break order drafting: online fixed-fee services. */
export const CONSENT_ORDER_ONLINE: CostBand = [279, 799];

/** Consent order / clean break order drafting: high-street solicitor. */
export const CONSENT_ORDER_SOLICITOR: CostBand = [500, 1500];

/** MIAM (Mediation Information and Assessment Meeting), per person. */
export const MIAM_FEE: CostBand = [90, 120];

/** Family mediation joint session, per person per session. */
export const MEDIATION_SESSION_PER_PERSON: CostBand = [100, 200];

/** Typical number of mediation sessions to reach a financial agreement. */
export const MEDIATION_TYPICAL_SESSIONS: CostBand = [3, 5];

/** VAT standard rate (applies to solicitor and mediator fees). */
export const VAT_STANDARD = 0.2;

/** Add VAT to both ends of a band. */
export function withVat(band: CostBand): CostBand {
  return [band[0] * (1 + VAT_STANDARD), band[1] * (1 + VAT_STANDARD)];
}

/** Shift a band by a fixed amount (e.g. add a court fee to both ends). */
export function bandPlus(band: CostBand, amount: number): CostBand {
  return [band[0] + amount, band[1] + amount];
}

// ---------------------------------------------------------------------------
// Financial settlement range model (INDICATIVE ONLY)
//
// There is no statutory formula. Section 25 Matrimonial Causes Act 1973 lists
// the factors the court weighs; case law (White v White, Miller v Miller)
// gives a yardstick of equality with needs as the first call on assets.
// This model states its assumptions and returns a RANGE for the lower-earning
// party's share, never a single entitlement figure.
// ---------------------------------------------------------------------------

export type IncomeDisparity = "similar" | "moderate" | "large";

export interface SettlementInput {
  /** Net matrimonial assets excluding pensions (equity + savings - debts). */
  netAssets: number;
  marriageYears: number;
  childrenUnder18: number;
  /** Disparity between the parties' earning capacities. */
  incomeDisparity: IncomeDisparity;
  /** true when the lower earner is the primary carer of the children. */
  lowerEarnerPrimaryCarer: boolean;
}

export interface SettlementRange {
  /** lower-earning party's share of net assets, as fractions */
  shareLow: number;
  shareHigh: number;
  /** in GBP */
  amountLow: number;
  amountHigh: number;
  /** model notes describing which adjustments fired */
  adjustments: string[];
}

/**
 * Indicative share range for the financially weaker party.
 * Starting point 50/50 (sharing principle), adjusted for:
 *  - short childless marriage: contributions argument widens the range down
 *  - dependent children with the lower earner as primary carer: needs push up
 *  - large income disparity: needs-based uplift
 * Clamped to 30% to 70%: outcomes outside that are rare enough that a
 * generic model should not suggest them.
 */
export function settlementRange(input: SettlementInput): SettlementRange {
  const assets = Math.max(0, input.netAssets);
  const adjustments: string[] = [];

  let low = 0.5;
  let high = 0.5;

  const shortMarriage = input.marriageYears < 5 && input.childrenUnder18 === 0;
  if (shortMarriage) {
    low -= 0.15;
    adjustments.push(
      "Short marriage with no children: courts give more weight to what each party brought in, so the range extends below an equal split.",
    );
  } else {
    low -= 0.05;
    high += 0.05;
    adjustments.push(
      "Starting point is the sharing principle: an equal division of matrimonial assets, with a margin either side for the section 25 factors.",
    );
  }

  if (input.childrenUnder18 > 0 && input.lowerEarnerPrimaryCarer) {
    low += 0.05;
    high += 0.1;
    adjustments.push(
      "Dependent children living mainly with the lower earner: housing the children is the first call on the assets, which typically moves the range above 50%.",
    );
  }

  if (input.incomeDisparity === "large") {
    high += 0.05;
    adjustments.push(
      "A large gap in earning capacity strengthens a needs-based claim for the lower earner.",
    );
  } else if (input.incomeDisparity === "similar") {
    adjustments.push(
      "Similar earning capacities: needs arguments carry less weight, keeping the outcome closer to equal.",
    );
  }

  low = Math.min(Math.max(low, 0.3), 0.7);
  high = Math.min(Math.max(high, low), 0.7);

  return {
    shareLow: low,
    shareHigh: high,
    amountLow: assets * low,
    amountHigh: assets * high,
    adjustments,
  };
}
