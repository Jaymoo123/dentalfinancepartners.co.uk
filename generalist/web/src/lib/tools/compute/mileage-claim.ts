/**
 * Mileage Reimbursement Calculator — pure compute module.
 *
 * AMAP rates 2026/27 (from 6 April 2026):
 *   Car/van: 55p first 10,000 business miles, 25p above (was 45p/25p to 2025/26).
 *   Motorcycle: 24p flat. Bicycle: 20p flat. Passenger: 5p/mile (note only).
 * No React / DOM / fetch.
 */

export type Vehicle = "car_van" | "motorcycle" | "bicycle";

const CAR_FIRST_RATE = 0.55; // from 6 Apr 2026 (FA 2026); was 0.45
const CAR_FIRST_RATE_OLD = 0.45; // 2025/26 and earlier, for comparison
const CAR_ABOVE_RATE = 0.25;
const CAR_THRESHOLD = 10_000;
const MOTORCYCLE_RATE = 0.24; // unchanged
const BICYCLE_RATE = 0.2; // unchanged
const EMPLOYEE_NIC_MAIN = 0.08; // Class 1 main rate, estimate on excess

export function amapAllowance(vehicle: Vehicle, miles: number): number {
  if (vehicle === "motorcycle") return miles * MOTORCYCLE_RATE;
  if (vehicle === "bicycle") return miles * BICYCLE_RATE;
  return Math.min(miles, CAR_THRESHOLD) * CAR_FIRST_RATE + Math.max(0, miles - CAR_THRESHOLD) * CAR_ABOVE_RATE;
}

/** Car/van allowance under the pre-April-2026 45p rate, for the "what changed" comparison. */
export function amapAllowanceOld(miles: number): number {
  return Math.min(miles, CAR_THRESHOLD) * CAR_FIRST_RATE_OLD + Math.max(0, miles - CAR_THRESHOLD) * CAR_ABOVE_RATE;
}

export type MileageMode = "selfEmployed" | "employee";

export type MileageResult = {
  amap: number;
  /** car/van only: uplift vs the old 45p rate */
  upliftVsOld: number;
  paid: number;
  /** employee mode: AMAP minus reimbursement (positive = MAR claim available) */
  shortfall: number;
  /** employee mode: taxable amount where employer pays above AMAP */
  excess: number;
  /** tax relief (self-employed saving or employee MAR) OR tax due on excess */
  taxAtMarginal: number;
  /** estimated employee Class 1 NIC on excess (8% main rate) */
  nicOnExcess: number;
};

export function calcMileage(
  mode: MileageMode,
  vehicle: Vehicle,
  miles: number,
  reimbursedPencePerMile: number,
  marginalRate: number, // 0.2 / 0.4 / 0.45
): MileageResult {
  const amap = amapAllowance(vehicle, miles);
  const upliftVsOld = vehicle === "car_van" ? amap - amapAllowanceOld(miles) : 0;

  if (mode === "selfEmployed") {
    return {
      amap,
      upliftVsOld,
      paid: 0,
      shortfall: 0,
      excess: 0,
      taxAtMarginal: amap * marginalRate,
      nicOnExcess: 0,
    };
  }

  const paid = (miles * reimbursedPencePerMile) / 100;
  const shortfall = Math.max(0, amap - paid);
  const excess = Math.max(0, paid - amap);
  return {
    amap,
    upliftVsOld,
    paid,
    shortfall,
    excess,
    taxAtMarginal: shortfall > 0 ? shortfall * marginalRate : excess * marginalRate,
    nicOnExcess: excess * EMPLOYEE_NIC_MAIN, // ponytail: 8% main-rate estimate; 2% applies above UEL
  };
}
