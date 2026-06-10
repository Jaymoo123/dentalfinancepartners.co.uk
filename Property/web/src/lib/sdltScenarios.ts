/**
 * SDLT scenario comparison — the pure math shared by the premium Stamp Duty tool,
 * the Excel model builder and (as ground truth) the written guide, so the three
 * can never disagree with each other or with the existing StampDutyCalculator.
 *
 * Everything here builds on lib/sdlt.ts (the single source of truth for the bands,
 * the 5% additional-dwelling surcharge and first-time-buyer relief, locked from
 * docs/property/house_positions.md §1). The only figure that lib/sdlt did not yet
 * expose as a constant is the non-UK-resident surcharge, which the existing
 * StampDutyCalculator hard-coded inline as `price * 0.02`; it is lifted to a named
 * constant here (2%, residential, England + NI, from house_positions §1) so the
 * tool, the spreadsheet's Rates sheet and the guide all read the same number.
 *
 * The four scenarios compared:
 *   standard     — owner-occupier / replacement main residence (no surcharge).
 *   additional   — buy-to-let / second home / company purchase: + 5% surcharge.
 *   nonResident  — a UK purchase by a non-UK resident: + 2% surcharge.
 *   firstTimeBuyer — first-time-buyer relief (0% to £300k, 5% £300k–£500k,
 *                    withdrawn above £500k → standard rates apply).
 *
 * Scotland (LBTT) and Wales (LTT) are SEPARATE devolved taxes with their own
 * bands and surcharges — this module is England + Northern Ireland SDLT only.
 */
import {
  STANDARD_SDLT_BANDS,
  FTB_SDLT_BANDS,
  ADDITIONAL_DWELLING_SURCHARGE,
  marginalSdlt,
  firstTimeBuyerSdlt,
} from "./sdlt";

/**
 * Non-UK resident purchaser surcharge: 2% of the whole price, on top of the
 * standard SDLT (residential, England + NI). house_positions.md §1.
 */
export const NON_RESIDENT_SURCHARGE = 0.02;

/** First-time-buyer relief is withdrawn once the price exceeds this figure. */
export const FTB_PRICE_CAP = 500_000;

/** The four buyer types compared by the premium tool. */
export type SdltScenarioId =
  | "standard"
  | "additional"
  | "nonResident"
  | "firstTimeBuyer";

export interface SdltScenarioInputs {
  /** purchase price / chargeable consideration. */
  price: number;
  /**
   * Whether the non-resident scenario should ALSO carry the additional-dwelling
   * surcharge (a non-resident buying a buy-to-let pays both the 2% and the 5%).
   * Defaults to true because the typical investor case is a non-resident BTL.
   */
  nonResidentIsAdditional?: boolean;
}

/** One scenario's full SDLT breakdown. */
export interface SdltScenarioResult {
  id: SdltScenarioId;
  label: string;
  /** the band SDLT (standard or FTB-relief bands) before any surcharge. */
  baseSdlt: number;
  /** additional-dwelling surcharge component (5% of price), if any. */
  additionalSurcharge: number;
  /** non-resident surcharge component (2% of price), if any. */
  nonResidentSurcharge: number;
  /** total SDLT due. */
  total: number;
  /** total ÷ price, as a percentage (0 if price is 0). */
  effectiveRate: number;
  /** whether first-time-buyer relief was actually applied (price within cap). */
  ftbReliefApplied: boolean;
}

function round(n: number): number {
  return Math.round(n);
}

function effectiveRate(total: number, price: number): number {
  return price > 0 ? (total / price) * 100 : 0;
}

/** Standard SDLT: owner-occupier, no surcharge. */
export function standardScenario(price: number): SdltScenarioResult {
  const base = marginalSdlt(price, STANDARD_SDLT_BANDS);
  return {
    id: "standard",
    label: "Standard (main home)",
    baseSdlt: round(base),
    additionalSurcharge: 0,
    nonResidentSurcharge: 0,
    total: round(base),
    effectiveRate: effectiveRate(base, price),
    ftbReliefApplied: false,
  };
}

/** Additional property (buy-to-let / second home / company): standard + 5%. */
export function additionalScenario(price: number): SdltScenarioResult {
  const base = marginalSdlt(price, STANDARD_SDLT_BANDS);
  const surcharge = price * ADDITIONAL_DWELLING_SURCHARGE;
  const total = base + surcharge;
  return {
    id: "additional",
    label: "Additional property (+5%)",
    baseSdlt: round(base),
    additionalSurcharge: round(surcharge),
    nonResidentSurcharge: 0,
    total: round(total),
    effectiveRate: effectiveRate(total, price),
    ftbReliefApplied: false,
  };
}

/**
 * Non-UK resident purchase: standard SDLT + 2%, and (by default) the 5%
 * additional-dwelling surcharge as well, since the typical non-resident case
 * here is a buy-to-let investor.
 */
export function nonResidentScenario(
  price: number,
  alsoAdditional = true,
): SdltScenarioResult {
  const base = marginalSdlt(price, STANDARD_SDLT_BANDS);
  const additional = alsoAdditional ? price * ADDITIONAL_DWELLING_SURCHARGE : 0;
  const nonRes = price * NON_RESIDENT_SURCHARGE;
  const total = base + additional + nonRes;
  return {
    id: "nonResident",
    label: alsoAdditional ? "Non-resident BTL (+2% +5%)" : "Non-resident (+2%)",
    baseSdlt: round(base),
    additionalSurcharge: round(additional),
    nonResidentSurcharge: round(nonRes),
    total: round(total),
    effectiveRate: effectiveRate(total, price),
    ftbReliefApplied: false,
  };
}

/**
 * First-time buyer: relief gives 0% to £300k and 5% on £300k–£500k, fully
 * withdrawn above £500k (standard rates then apply). A first-time buyer cannot
 * also be buying an additional dwelling, so there is no surcharge here.
 */
export function firstTimeBuyerScenario(price: number): SdltScenarioResult {
  const total = firstTimeBuyerSdlt(price);
  const reliefApplied = price <= FTB_PRICE_CAP;
  return {
    id: "firstTimeBuyer",
    label: reliefApplied
      ? "First-time buyer (relief)"
      : "First-time buyer (relief withdrawn)",
    baseSdlt: round(total),
    additionalSurcharge: 0,
    nonResidentSurcharge: 0,
    total: round(total),
    effectiveRate: effectiveRate(total, price),
    ftbReliefApplied: reliefApplied,
  };
}

/**
 * Compute all four scenarios for a given price. The order is the order they are
 * shown in the tool: standard, additional, non-resident, first-time buyer.
 */
export function computeSdltScenarios(
  i: SdltScenarioInputs,
): SdltScenarioResult[] {
  const price = Math.max(0, i.price);
  const nonResAdditional = i.nonResidentIsAdditional ?? true;
  return [
    standardScenario(price),
    additionalScenario(price),
    nonResidentScenario(price, nonResAdditional),
    firstTimeBuyerScenario(price),
  ];
}

/** Convenience: the FTB-relief band table re-exported for the guide/xlsx. */
export { FTB_SDLT_BANDS, STANDARD_SDLT_BANDS };

/** Format a whole-pound figure as GBP, e.g. 12345 → "£12,345". */
export function gbp(n: number): string {
  const rounded = Math.round(n);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}£${Math.abs(rounded).toLocaleString("en-GB", {
    maximumFractionDigits: 0,
  })}`;
}
