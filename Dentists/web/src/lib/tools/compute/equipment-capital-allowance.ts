/**
 * Equipment Capital Allowance compute lib — FA 2026 (2026/27)
 *
 * Pure functions only: no React, no window, no document, no fetch.
 *
 * FA 2026 rules applied:
 *   - AIA £1,000,000 (100% year-1 relief, main-rate AND special-rate expenditure).
 *   - New 40% first-year allowance (FA 2026 s.29): main-rate assets bought NEW,
 *     companies only (excluded for sole traders/partnerships). The unrelieved
 *     60% enters the main pool and attracts WDA from year 2.
 *   - Main-rate WDA reduced 18% -> 14% (FA 2026 s.28), reducing balance.
 *   - Special-rate WDA unchanged at 6% (integral features: electrical systems,
 *     plumbing/water, air conditioning in a surgery fit-out).
 *
 * Allocation logic:
 *   1. AIA against special-rate expenditure first (otherwise stuck at 6%).
 *   2. Remaining AIA against main-rate expenditure.
 *   3. Main-rate excess: 40% FYA if company + assets new; balance pooled at 14%
 *      from year 2. Otherwise straight into main pool, WDA 14% from year 1.
 *   4. Special-rate excess: special pool, WDA 6% from year 1.
 *
 * Limitations:
 *   - Marginal-relief band (Ltd profits £50k-£250k, effective 26.5%) not
 *     modelled as a rate option; note covers it.
 *   - Assumes a 12-month period and no other additions/disposals in the pools.
 */

const MAIN_WDA = 0.14; // FA 2026 s.28 (was 18%)
const SPECIAL_WDA = 0.06;
const FYA_RATE = 0.4; // FA 2026 s.29
const YEARS = 4;

export type BuyerRate = "ltd19" | "ltd25" | "st20" | "st40" | "st45";

export const BUYER_RATE_VALUES: Record<BuyerRate, number> = {
  ltd19: 0.19,
  ltd25: 0.25,
  st20: 0.2,
  st40: 0.4,
  st45: 0.45,
};

export function isCompanyRate(rate: BuyerRate): boolean {
  return rate === "ltd19" || rate === "ltd25";
}

export type EquipmentCapitalAllowanceResult = {
  taxRate: number;
  fyaEligible: boolean;
  aiaOnSpecial: number;
  aiaOnMain: number;
  aiaTotal: number;
  fyaClaim: number;
  year1Wda: number;
  year1Allowances: number;
  year1TaxSaving: number;
  /** allowances per year, index 0 = year 1 */
  yearlyAllowances: number[];
  fourYearAllowances: number;
  fourYearTaxSaving: number;
  unrelievedAfterFourYears: number;
};

export function calcEquipmentCapitalAllowance(
  mainCost: number,
  specialCost: number,
  buyerRate: BuyerRate,
  boughtNew: boolean,
  aiaAvailable: number,
): EquipmentCapitalAllowanceResult {
  const taxRate = BUYER_RATE_VALUES[buyerRate];
  const fyaEligible = isCompanyRate(buyerRate) && boughtNew;

  // 1-2. AIA: special-rate first, then main-rate.
  const aiaOnSpecial = Math.min(specialCost, Math.max(0, aiaAvailable));
  const aiaOnMain = Math.min(mainCost, Math.max(0, aiaAvailable - aiaOnSpecial));
  const aiaTotal = aiaOnSpecial + aiaOnMain;

  const mainExcess = mainCost - aiaOnMain;
  const specialExcess = specialCost - aiaOnSpecial;

  // 3. Main-rate excess: FYA or pool.
  const fyaClaim = fyaEligible ? mainExcess * FYA_RATE : 0;
  // FYA balance enters the pool at period end — no WDA on it in year 1.
  // Non-FYA route: pool gets WDA from year 1.
  let mainPool: number;
  let year1MainWda: number;
  if (fyaEligible) {
    mainPool = mainExcess - fyaClaim;
    year1MainWda = 0;
  } else {
    year1MainWda = mainExcess * MAIN_WDA;
    mainPool = mainExcess - year1MainWda;
  }

  // 4. Special-rate excess: pool, WDA from year 1.
  const year1SpecialWda = specialExcess * SPECIAL_WDA;
  let specialPool = specialExcess - year1SpecialWda;

  const year1Wda = year1MainWda + year1SpecialWda;
  const year1Allowances = aiaTotal + fyaClaim + year1Wda;

  const yearlyAllowances: number[] = [year1Allowances];
  for (let y = 2; y <= YEARS; y++) {
    const mWda = mainPool * MAIN_WDA;
    const sWda = specialPool * SPECIAL_WDA;
    mainPool -= mWda;
    specialPool -= sWda;
    yearlyAllowances.push(mWda + sWda);
  }

  const fourYearAllowances = yearlyAllowances.reduce((a, b) => a + b, 0);

  return {
    taxRate,
    fyaEligible,
    aiaOnSpecial,
    aiaOnMain,
    aiaTotal,
    fyaClaim,
    year1Wda,
    year1Allowances,
    year1TaxSaving: year1Allowances * taxRate,
    yearlyAllowances,
    fourYearAllowances,
    fourYearTaxSaving: fourYearAllowances * taxRate,
    unrelievedAfterFourYears: mainPool + specialPool,
  };
}
