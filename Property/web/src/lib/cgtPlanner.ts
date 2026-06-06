/**
 * Capital Gains Tax on residential property — the richer "planner" math, shared
 * by the premium CGT tool and the Excel model builder so the two can never
 * disagree. It is a thin, deterministic layer ON TOP of lib/cgt.ts: the rates,
 * the annual exempt amount, the personal allowance / basic-rate band and the
 * band-splitting (18% within the unused basic-rate band, 24% above) all come
 * from computeCgt() in lib/cgt.ts, which is the SAME module the existing
 * Capital Gains Tax Calculator uses. This file only adds the things a richer
 * tool needs on top of that base:
 *
 *   - an itemised gain (purchase + buying/selling costs + capital improvements);
 *   - Private Residence Relief (PRR) for a property that was once a main home,
 *     with the final-9-months deemed-occupation rule (s.223(2) TCGA 1992);
 *   - the resulting tax, effective rate, net proceeds and a 60-day flag.
 *
 * Locked facts (docs/property/house_positions.md §5 + lib/cgt.ts):
 *   - Residential CGT rates: 18% within the unused basic-rate band, 24% above
 *     (Autumn Budget 2024, from 30 October 2024).
 *   - Annual exempt amount: £3,000 per individual (2024/25 onwards).
 *   - PRR: the final 9 months of ownership always qualify as deemed occupation
 *     where the property was at some point the owner's only/main residence.
 *   - Letting Relief: since 6 April 2020 only where the owner SHARED occupation
 *     with the tenant; not modelled here (flagged to the user instead).
 *   - 60-day report-and-pay applies to UK residents where CGT is actually due.
 */
import {
  computeCgt,
  CGT_ANNUAL_EXEMPT_AMOUNT,
  CGT_RESIDENTIAL_BASIC,
  CGT_RESIDENTIAL_HIGHER,
  PERSONAL_ALLOWANCE,
  BASIC_RATE_BAND,
  type CgtResult,
} from "./cgt";

export {
  CGT_ANNUAL_EXEMPT_AMOUNT,
  CGT_RESIDENTIAL_BASIC,
  CGT_RESIDENTIAL_HIGHER,
  PERSONAL_ALLOWANCE,
  BASIC_RATE_BAND,
};

/** Months in the always-qualifying final period of PRR (s.223(2) TCGA 1992). */
export const PRR_FINAL_PERIOD_MONTHS = 9;

export interface CgtPlannerInputs {
  /** completion / sale proceeds */
  salePrice: number;
  /** original acquisition cost */
  purchasePrice: number;
  /** buying + selling costs (legal, agent, the SDLT paid on purchase) */
  buyingSellingCosts: number;
  /** capital improvement spend (extensions, new kitchen as improvement, etc) */
  improvements: number;
  /** the owner's other taxable income for the year, before this gain */
  otherIncome: number;
  /** annual exempt amount already used on another disposal this year */
  aeaUsed: boolean;
  /** was the property EVER the owner's only/main residence? */
  wasMainResidence: boolean;
  /** total months owned (only used when wasMainResidence is true) */
  totalMonthsOwned: number;
  /** months actually lived in as a main residence (PRR numerator, pre-final-period) */
  monthsAsMainResidence: number;
}

export interface CgtPlannerResult {
  /** total allowable costs deducted from proceeds (purchase + costs + improvements). */
  totalCosts: number;
  /** gain before any relief (proceeds − total costs), floored at 0. */
  grossGain: number;
  /** Private Residence Relief given (s.223), 0 if never a main residence. */
  prr: number;
  /** months treated as occupied for PRR (actual occupation + final 9 months, capped). */
  prrMonths: number;
  /** the gain after PRR (the chargeable gain before the annual exemption). */
  gainAfterPrr: number;
  /** annual exempt amount applied (£3,000 or £0 if already used). */
  aea: number;
  /** taxable gain after PRR and the annual exemption. */
  taxableGain: number;
  /** amount of the taxable gain taxed at 18%. */
  atBasic: number;
  /** amount of the taxable gain taxed at 24%. */
  atHigher: number;
  /** tax at 18%. */
  taxAtBasic: number;
  /** tax at 24%. */
  taxAtHigher: number;
  /** total Capital Gains Tax due. */
  tax: number;
  /** tax as a % of the gross gain. */
  effectiveRate: number;
  /** net cash after CGT (proceeds − total costs − tax). */
  netAfterTax: number;
  /** true where CGT is due, so the 60-day report-and-pay clock runs. */
  sixtyDayReportingDue: boolean;
}

function round(n: number): number {
  return Math.round(n);
}

/**
 * Private Residence Relief fraction of the gain.
 *
 * PRR = gain × (qualifying months ÷ total months owned), where qualifying
 * months = months actually occupied as a main residence PLUS the final 9 months
 * of ownership (always deemed occupied where the property was a main residence
 * at some point), capped at the total months owned. This is the standard
 * straight-line apportionment in s.223 TCGA 1992. Letting Relief is NOT added
 * (post-2020 it needs shared occupation) and other deemed-occupation periods
 * (job-related, working abroad) are out of scope — both are flagged to the user.
 */
function prrFraction(
  totalMonthsOwned: number,
  monthsAsMainResidence: number,
): { fraction: number; qualifyingMonths: number } {
  const total = Math.max(0, totalMonthsOwned);
  if (total <= 0) return { fraction: 0, qualifyingMonths: 0 };
  const occupied = Math.min(Math.max(0, monthsAsMainResidence), total);
  // The final 9 months count even if let/empty, but cannot double-count actual
  // occupation, and the whole qualifying figure is capped at total ownership.
  const finalPeriod = Math.min(PRR_FINAL_PERIOD_MONTHS, Math.max(0, total - occupied));
  const qualifyingMonths = Math.min(total, occupied + finalPeriod);
  return { fraction: qualifyingMonths / total, qualifyingMonths };
}

/**
 * Full CGT picture for a residential disposal. Delegates the rates, the annual
 * exempt amount and the 18%/24% band split to computeCgt() in lib/cgt.ts (the
 * same engine the live calculator uses); adds itemised costs and PRR on top.
 */
export function computeCgtPlanner(i: CgtPlannerInputs): CgtPlannerResult {
  const totalCosts =
    Math.max(0, i.purchasePrice) +
    Math.max(0, i.buyingSellingCosts) +
    Math.max(0, i.improvements);

  const grossGain = Math.max(0, i.salePrice - totalCosts);

  // --- Private Residence Relief ---
  let prr = 0;
  let prrMonths = 0;
  if (i.wasMainResidence) {
    const { fraction, qualifyingMonths } = prrFraction(
      i.totalMonthsOwned,
      i.monthsAsMainResidence,
    );
    prr = grossGain * fraction;
    prrMonths = qualifyingMonths;
  }
  const gainAfterPrr = Math.max(0, grossGain - prr);

  // --- Annual exemption + 18%/24% band split via the shared lib/cgt engine ---
  // We feed the PRR-reduced gain into computeCgt by expressing it as a
  // proceeds-less-cost gain (salePrice = gainAfterPrr, purchasePrice = 0,
  // costs = 0) so the band split, AEA and rates come from the SAME function the
  // live site uses. This guarantees the 18%/24% split can never drift.
  const base: CgtResult = computeCgt({
    salePrice: gainAfterPrr,
    purchasePrice: 0,
    costs: 0,
    otherIncome: i.otherIncome,
    aeaUsed: i.aeaUsed,
  });

  const tax = base.tax;
  const effectiveRate = grossGain > 0 ? (tax / grossGain) * 100 : 0;
  const netAfterTax = i.salePrice - totalCosts - tax;

  return {
    totalCosts: round(totalCosts),
    grossGain: round(grossGain),
    prr: round(prr),
    prrMonths,
    gainAfterPrr: round(gainAfterPrr),
    aea: round(base.aea),
    taxableGain: round(base.taxableGain),
    atBasic: round(base.atBasic),
    atHigher: round(base.atHigher),
    taxAtBasic: round(base.taxAtBasic),
    taxAtHigher: round(base.taxAtHigher),
    tax: round(tax),
    effectiveRate,
    netAfterTax: round(netAfterTax),
    sixtyDayReportingDue: tax > 0,
  };
}

/** Format a whole-pound figure as GBP, e.g. 12345 → "£12,345". */
export function gbp(n: number): string {
  const rounded = Math.round(n);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}£${Math.abs(rounded).toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  })}`;
}
