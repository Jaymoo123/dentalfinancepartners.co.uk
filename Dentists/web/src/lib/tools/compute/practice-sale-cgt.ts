/**
 * Practice sale CGT and BADR net-proceeds compute lib.
 * Pure TypeScript, no React/window/document/fetch. TL-03 compliant.
 *
 * Computes the Capital Gains Tax payable on the disposal of a dental practice
 * business asset (goodwill/shares) by an individual, applying Business Asset
 * Disposal Relief (BADR) within the lifetime limit, and standard CGT above.
 *
 * Ported in shape from Solicitors/web/src/lib/tools/compute/practice-sale-cgt.ts
 * with constants re-traced to the Dentists house_positions.md.
 *
 * FIGURES TRACED (Dentists house_positions.md + estate CGT ground truth):
 *
 * BADR (HP §4, primary source gov.uk/business-asset-disposal-relief):
 *   - 18% from 6 April 2026 (confirmed at primary source 2026-07-06).
 *   - Lifetime limit: £1,000,000 (confirmed at primary source gov.uk BADR,
 *     estate-verified as F1 resolved: "The lifetime limit remains £1 million").
 *
 * Standard CGT on business-asset gains (HP §4 + estate CGT ground truth,
 *   matching the Solicitors lib which traces to its HP §9; estate-consistent):
 *   - 18% within any remaining basic-rate band from 30 October 2024.
 *   - 24% above the basic-rate band from 30 October 2024.
 *
 * Annual Exempt Amount (estate CGT ground truth, 2025/26 and 2026/27):
 *   - £3,000 (estate-verified as F1 resolved; consistent with Solicitors HP §9).
 *
 * LIMITATIONS:
 * - Basic-rate band remaining is estimated from otherIncome and standard thresholds.
 *   It does not model pension contributions, Gift Aid, or adjusted net income.
 * - BADR qualification (two-year holding period, genuine business interest,
 *   qualifying conditions for share sales) is not modelled; the caller passes
 *   badrEligible explicitly.
 * - Partial BADR (where only a portion of the gain qualifies) is not modelled;
 *   when badrEligible=true the ENTIRE gain up to the lifetime limit is at 18%.
 * - Cumulative lifetime BADR usage is not tracked; the badrLifetimeRemaining
 *   parameter must be supplied by the caller.
 */

export type PracticeSaleCgtInput = {
  /** Total chargeable gain on the disposal (before AEA deduction). */
  gain: number;
  /**
   * The seller's other taxable income this year (salary, partnership profit
   * share, etc.). Used to determine how much basic-rate band remains for CGT.
   */
  otherIncome: number;
  /** Whether BADR is expected to apply (caller's assessment). */
  badrEligible: boolean;
  /**
   * Annual Exempt Amount available to this disposal.
   * Default: £3,000 (2025/26 and 2026/27, estate CGT ground truth).
   */
  aeaAvailable?: number;
  /**
   * Remaining BADR lifetime limit available to this disposal.
   * Default: £1,000,000 (primary source: gov.uk BADR, HP §4).
   */
  badrLifetimeRemaining?: number;
};

export type PracticeSaleCgtResult = {
  /** Gain after AEA deduction. */
  taxableGain: number;
  /** Portion of the gain taxed at the BADR rate (18%). */
  gainAtBadr: number;
  /** Portion of the gain taxed at the standard basic-rate CGT (18%). */
  gainAtBasic: number;
  /** Portion of the gain taxed at the standard higher-rate CGT (24%). */
  gainAtHigher: number;
  /** BADR rate applied (18% from 6 April 2026). */
  badrRate: number;
  /** Standard basic-rate CGT applied (18% from 30 October 2024). */
  basicRateCgt: number;
  /** Standard higher-rate CGT applied (24% from 30 October 2024). */
  higherRateCgt: number;
  /** Total CGT payable. */
  totalCgt: number;
  /** Net proceeds after CGT (gain minus totalCgt). */
  netProceeds: number;
};

// ── Constants (primary-source verified) ─────────────────────────────────────

/** AEA: £3,000 (estate CGT ground truth, 2025/26 and 2026/27). */
export const DEFAULT_AEA = 3000;

/**
 * BADR lifetime limit: £1,000,000 (gov.uk/business-asset-disposal-relief,
 * HP §4, estate F1 resolved).
 */
const DEFAULT_BADR_LIFETIME = 1_000_000;

/** BADR rate from 6 April 2026 (HP §4, primary source verified). */
export const BADR_RATE_FROM_6APR2026 = 0.18;

/** Standard CGT basic-rate band rate from 30 October 2024 (estate CGT ground truth). */
export const CGT_BASIC_RATE = 0.18;

/** Standard CGT higher-rate from 30 October 2024 (estate CGT ground truth). */
export const CGT_HIGHER_RATE = 0.24;

/** Income tax basic-rate band upper limit (£50,270, 2025/26 and 2026/27). */
const BASIC_RATE_LIMIT = 50270;

/** Personal allowance (£12,570, 2025/26 and 2026/27). */
const PERSONAL_ALLOWANCE = 12570;

// ── Main function ────────────────────────────────────────────────────────────

export function calcPracticeSaleCgt(input: PracticeSaleCgtInput): PracticeSaleCgtResult {
  const {
    gain,
    otherIncome,
    badrEligible,
    aeaAvailable = DEFAULT_AEA,
    badrLifetimeRemaining = DEFAULT_BADR_LIFETIME,
  } = input;

  // Step 1: Deduct AEA to get the taxable gain.
  const taxableGain = Math.max(0, gain - aeaAvailable);

  if (taxableGain === 0) {
    return {
      taxableGain: 0,
      gainAtBadr: 0,
      gainAtBasic: 0,
      gainAtHigher: 0,
      badrRate: BADR_RATE_FROM_6APR2026,
      basicRateCgt: CGT_BASIC_RATE,
      higherRateCgt: CGT_HIGHER_RATE,
      totalCgt: 0,
      netProceeds: gain,
    };
  }

  // Step 2: Determine how much basic-rate band remains after other income.
  // The CGT basic-rate band = (basic rate limit - personal allowance) - income already
  // using the basic band. Income above the higher-rate limit leaves no basic band at all.
  const incomeInBasicBand = Math.min(
    Math.max(0, otherIncome - PERSONAL_ALLOWANCE),
    BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE
  );
  const basicBandRemaining = Math.max(0, (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE) - incomeInBasicBand);

  let remainingGain = taxableGain;
  let totalCgt = 0;
  let gainAtBadr = 0;
  let gainAtBasic = 0;
  let gainAtHigher = 0;

  // Step 3: Apply BADR (18% from 6 April 2026) to the qualifying gain within the lifetime limit.
  if (badrEligible && badrLifetimeRemaining > 0) {
    const badrGain = Math.min(remainingGain, badrLifetimeRemaining);
    gainAtBadr = badrGain;
    totalCgt += badrGain * BADR_RATE_FROM_6APR2026;
    remainingGain -= badrGain;
  }

  // Step 4: Apply standard CGT to the remainder.
  // Basic-rate band is used by the BADR gain first (BADR gain sits in the lower
  // part of the available gain stack), then by the remaining gain at 18%/24%.
  // HMRC treats BADR gains as using the basic-rate band first.
  const basicBandAfterBadr = Math.max(0, basicBandRemaining - gainAtBadr);

  if (remainingGain > 0) {
    const inBasic = Math.min(remainingGain, basicBandAfterBadr);
    gainAtBasic = inBasic;
    totalCgt += inBasic * CGT_BASIC_RATE;
    remainingGain -= inBasic;

    if (remainingGain > 0) {
      gainAtHigher = remainingGain;
      totalCgt += remainingGain * CGT_HIGHER_RATE;
      remainingGain = 0;
    }
  }

  const netProceeds = gain - totalCgt;

  return {
    taxableGain,
    gainAtBadr,
    gainAtBasic,
    gainAtHigher,
    badrRate: BADR_RATE_FROM_6APR2026,
    basicRateCgt: CGT_BASIC_RATE,
    higherRateCgt: CGT_HIGHER_RATE,
    totalCgt,
    netProceeds,
  };
}
