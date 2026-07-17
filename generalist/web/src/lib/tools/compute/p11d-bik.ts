/**
 * P11D / BIK Calculator — pure compute module. No React / DOM / fetch.
 *
 * Tax year: 2026/27. All rate constants dated below.
 *
 * VERIFY BEFORE DEPLOY (flagged per spec):
 * - EV appropriate percentage 2026/27: 4% used here (3% was 2025/26; +1ppt/yr
 *   trajectory per Autumn Statement). Task brief said 3% — that is the 2025/26 figure.
 * - Car fuel multiplier, van benefit, van fuel: 2025/26 figures used pending
 *   confirmed 2026/27 uprating (usually CPI-uprated by SI each autumn).
 * - Official rate of interest: 3.75% (from April 2025; reviewed quarterly since
 *   6 April 2025 — check current quarter's rate).
 */

// --- Company car appropriate percentages, 2026/27 ---
// 0 g/km (pure electric)
const EV_PCT_2026_27 = 0.04; // VERIFY: 4% assumed (3% in 2025/26, +1ppt/yr)
// 1-50 g/km hybrids, banded by electric-only range (miles)
const HYBRID_BANDS_2026_27: { minRange: number; pct: number }[] = [
  { minRange: 130, pct: 0.04 },
  { minRange: 70, pct: 0.07 },
  { minRange: 40, pct: 0.1 },
  { minRange: 30, pct: 0.14 },
  { minRange: 0, pct: 0.16 },
];
// 51+ g/km: 17% at 51-54, +1ppt per full 5 g/km from 55, capped at 37%
const PETROL_BASE_PCT_2026_27 = 0.17;
const MAX_CAR_PCT = 0.37;
const DIESEL_SUPPLEMENT = 0.04; // non-RDE2 diesels only, still capped at 37%
const CAPITAL_CONTRIBUTION_CAP = 5000;

// --- Fuel / van flat rates ---
const CAR_FUEL_MULTIPLIER = 28200; // VERIFY: 2025/26 figure, 2026/27 uprating unconfirmed
const VAN_BENEFIT = 4020; // VERIFY: 2025/26 figure
const VAN_FUEL_BENEFIT = 769; // VERIFY: 2025/26 figure
// Zero-emission vans: nil benefit since 2021/22

// --- Beneficial loans ---
const OFFICIAL_RATE = 0.0375; // VERIFY: 3.75% from April 2025, reviewed quarterly
const LOAN_DE_MINIMIS = 10000; // benefit only arises if balance exceeds £10,000

// --- Employer NIC ---
const CLASS_1A_RATE = 0.15; // employer Class 1A on all BIKs, 2026/27

export function carAppropriatePct(co2: number, electricRange: number, dieselNonRde2: boolean): number {
  let pct: number;
  if (co2 <= 0) {
    pct = EV_PCT_2026_27;
  } else if (co2 <= 50) {
    pct = HYBRID_BANDS_2026_27.find((b) => electricRange >= b.minRange)!.pct;
  } else {
    pct = Math.min(MAX_CAR_PCT, PETROL_BASE_PCT_2026_27 + Math.max(0, Math.floor((co2 - 50) / 5)) * 0.01);
  }
  if (dieselNonRde2 && co2 > 0) pct = Math.min(MAX_CAR_PCT, pct + DIESEL_SUPPLEMENT);
  return pct;
}

export type P11DInputs = {
  carListPrice: number; // 0 = no company car
  carCo2: number;
  carElectricRange: number;
  carDieselNonRde2: boolean;
  capitalContribution: number;
  employerPaysCarFuel: boolean;
  van: "none" | "van" | "electricVan";
  vanFuel: boolean;
  loanBalance: number; // average balance across the year
  medicalCost: number; // cost to employer of private medical insurance
  marginalRate: number; // 0.2 / 0.4 / 0.45
};

export type P11DResult = {
  carPct: number;
  carBenefit: number;
  carFuelBenefit: number;
  vanBenefit: number;
  vanFuelBenefit: number;
  loanBenefit: number;
  medicalBenefit: number;
  totalTaxable: number;
  employeeTax: number;
  employerClass1A: number;
};

export function calcP11D(i: P11DInputs): P11DResult {
  const hasCar = i.carListPrice > 0;
  const carPct = hasCar ? carAppropriatePct(i.carCo2, i.carElectricRange, i.carDieselNonRde2) : 0;
  const priceForBenefit = Math.max(0, i.carListPrice - Math.min(i.capitalContribution, CAPITAL_CONTRIBUTION_CAP));
  const carBenefit = hasCar ? Math.round(priceForBenefit * carPct) : 0;
  const carFuelBenefit = hasCar && i.employerPaysCarFuel ? Math.round(CAR_FUEL_MULTIPLIER * carPct) : 0;

  const vanBenefit = i.van === "van" ? VAN_BENEFIT : 0; // electric van = nil
  const vanFuelBenefit = i.van === "van" && i.vanFuel ? VAN_FUEL_BENEFIT : 0;

  // De minimis: no charge unless the balance exceeds £10,000 at any point in
  // the year; once exceeded the WHOLE balance is charged, not just the excess.
  const loanBenefit = i.loanBalance > LOAN_DE_MINIMIS ? Math.round(i.loanBalance * OFFICIAL_RATE) : 0;

  const medicalBenefit = Math.round(Math.max(0, i.medicalCost));

  const totalTaxable = carBenefit + carFuelBenefit + vanBenefit + vanFuelBenefit + loanBenefit + medicalBenefit;
  return {
    carPct,
    carBenefit,
    carFuelBenefit,
    vanBenefit,
    vanFuelBenefit,
    loanBenefit,
    medicalBenefit,
    totalTaxable,
    employeeTax: Math.round(totalTaxable * i.marginalRate),
    employerClass1A: Math.round(totalTaxable * CLASS_1A_RATE),
  };
}
