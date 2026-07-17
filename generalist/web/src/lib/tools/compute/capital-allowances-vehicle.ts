/**
 * Van & Equipment Capital Allowance Calculator — pure compute module.
 * No React / DOM / fetch.
 *
 * FA 2026 rates (from 1 April 2026 for CT, 6 April 2026 for IT):
 *   AIA £1,000,000 at 100% (permanent, FA 2021) — plant, machinery, vans; NOT cars
 *   40% FYA on NEW main-rate plant & machinery, companies only (FA 2026 s.29)
 *   100% FYA on NEW zero-emission cars (CAA 2001 s.45D, extended)
 *   WDA main pool 14% (FA 2026 s.28, down from 18%)
 *   WDA special rate pool 6% (cars >50g/km CO2)
 * Not in uk-tax-rates.ts — hardcoded here with citations.
 */

export type AssetType = "van" | "car" | "equipment";
export type CarCO2 = "zero" | "upTo50" | "over50";
export type Structure = "ltd" | "soleTrader";

const WDA_MAIN = 0.14;
const WDA_SPECIAL = 0.06;
const FYA_COMPANY = 0.4;
const AIA_LIMIT = 1_000_000;
const YEARS = 4;

export type CARoute = {
  /** short route name, e.g. "Annual Investment Allowance (100%)" */
  name: string;
  /** allowance claimed in year 1, before private-use restriction */
  year1Allowance: number;
  /** cumulative allowance over 4 years, before private-use restriction */
  cumulative4Allowance: number;
};

export type CAResult = {
  /** the route the asset actually falls into (best available) */
  primary: CARoute;
  /** alternative routes shown for comparison (may be empty) */
  alternatives: CARoute[];
  /** fraction of allowance claimable (1 for companies; business-use % for unincorporated) */
  claimFraction: number;
  year1Saving: number;
  cumulative4Saving: number;
  /** cost still unrelieved after 4 years (before private-use restriction) */
  unrelievedAfter4: number;
  /** contextual caveat for the results panel */
  note: string;
};

/** cumulative reducing-balance WDA over n years: cost × (1 − (1−r)^n) */
const wdaCumulative = (cost: number, rate: number, years: number) =>
  cost * (1 - Math.pow(1 - rate, years));

export function calcCapitalAllowances(
  assetType: AssetType,
  cost: number,
  isNew: boolean,
  carCO2: CarCO2,
  structure: Structure,
  businessUsePct: number,
  marginalRate: number, // fraction, e.g. 0.25
): CAResult {
  cost = Math.max(0, cost);
  // Private-use restriction only applies to unincorporated businesses.
  // Companies claim in full; director private use is a BIK matter instead.
  const claimFraction =
    structure === "soleTrader" ? Math.min(100, Math.max(0, businessUsePct)) / 100 : 1;

  const wdaMain: CARoute = {
    name: "Writing down allowance, main pool (14%)",
    year1Allowance: cost * WDA_MAIN,
    cumulative4Allowance: wdaCumulative(cost, WDA_MAIN, YEARS),
  };

  let primary: CARoute;
  let alternatives: CARoute[] = [];
  let note: string;

  if (assetType === "car") {
    if (carCO2 === "zero" && isNew) {
      primary = {
        name: "100% first-year allowance (new zero-emission car)",
        year1Allowance: cost,
        cumulative4Allowance: cost,
      };
      alternatives = [wdaMain];
      note =
        "New, unused zero-emission cars qualify for a 100% first-year allowance. A used electric car loses this and drops to the main pool at 14% a year, shown for comparison.";
    } else if (carCO2 === "zero" || carCO2 === "upTo50") {
      primary = wdaMain;
      note =
        "Cars never qualify for the Annual Investment Allowance. With CO2 emissions of 50g/km or less (or a used electric car), relief comes through the main pool at 14% a year on a reducing balance, so most of the cost takes many years to relieve.";
    } else {
      primary = {
        name: "Writing down allowance, special rate pool (6%)",
        year1Allowance: cost * WDA_SPECIAL,
        cumulative4Allowance: wdaCumulative(cost, WDA_SPECIAL, YEARS),
      };
      note =
        "Cars with CO2 emissions above 50g/km go into the special rate pool at just 6% a year. Relief is very slow: under 22% of the cost is relieved after four years. A lower-emission car or a van changes the picture entirely.";
    }
  } else {
    // Vans and plant & equipment: AIA gives 100% in year 1 (up to £1m).
    const aiaSlice = Math.min(cost, AIA_LIMIT);
    const excess = cost - aiaSlice;
    primary = {
      name: "Annual Investment Allowance (100%)",
      year1Allowance: aiaSlice + excess * WDA_MAIN,
      cumulative4Allowance: aiaSlice + wdaCumulative(excess, WDA_MAIN, YEARS),
    };
    if (structure === "ltd" && isNew) {
      // 40% FYA (FA 2026 s.29): year 1 = 40%; the remaining 60% enters the
      // main pool and attracts 14% WDA from the following period.
      const balance = cost * (1 - FYA_COMPANY);
      alternatives = [
        {
          name: "40% first-year allowance (FA 2026, new assets, companies)",
          year1Allowance: cost * FYA_COMPANY,
          cumulative4Allowance: cost * FYA_COMPANY + wdaCumulative(balance, WDA_MAIN, YEARS - 1),
        },
        wdaMain,
      ];
      note =
        "The AIA relieves the full cost in year one and beats the 40% first-year allowance whenever you have AIA headroom. The 40% FYA matters only if your total qualifying spend this year exceeds £1 million.";
    } else {
      alternatives = [wdaMain];
      note =
        "The AIA covers new and used vans and equipment alike, up to £1 million of qualifying spend per year. Without it, relief would trickle through the main pool at 14% a year, shown for comparison.";
    }
    if (excess > 0) {
      note =
        "Your cost exceeds the £1 million AIA limit. The first £1 million is relieved in full; the excess enters the main pool at 14% a year on a reducing balance.";
    }
  }

  const year1Saving = primary.year1Allowance * claimFraction * marginalRate;
  const cumulative4Saving = primary.cumulative4Allowance * claimFraction * marginalRate;

  return {
    primary,
    alternatives,
    claimFraction,
    year1Saving,
    cumulative4Saving,
    unrelievedAfter4: Math.max(0, cost - primary.cumulative4Allowance),
    note,
  };
}
