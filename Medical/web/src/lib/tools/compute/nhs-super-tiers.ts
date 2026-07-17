/**
 * NHS Pension Scheme member (employee) contribution tiers — SINGLE SOURCE OF TRUTH.
 *
 * Every Medical tool that needs an NHS superannuation employee rate imports from
 * here. Do NOT re-declare a tier table in any tool config: they diverged badly
 * once and this module exists to stop that happening again.
 *
 * TABLE: 2026/27 (from 1 April 2026), England and Wales.
 * The rate is a STEPPED (not marginal) charge: the whole pensionable pay is
 * multiplied by the single rate for the band it falls into.
 *
 * SOURCE (three independent, cross-checked 2026-07-17):
 *   - NHS Employers, "NHS Pension Scheme member contributions" (2026/27 table).
 *   - nhspaycalculator.co.uk NHS pension contribution rates 2026/27.
 *   - Derived from GOV.UK 1-April-2025 uplift report + 3.8% CPI indexation to 2026/27.
 * Thresholds uplifted by CPI 3.8% from the 2025/26 bands; rates unchanged.
 * Tier 1 upper (£13,259) is frozen (linked to the personal allowance).
 *
 * Deemed employer contribution: 23.7% of pensionable pay (NHSBSA, unchanged for
 * 2025/26 and 2026/27). Used only for the Annual Allowance adjusted-income test.
 *
 * ponytail: calibration knob — update TIERS_2026_27 each April, nothing else moves.
 */

/** Deemed employer contribution rate (NHSBSA, 2024/25 onward; confirmed 2026/27). */
export const NHS_DEEMED_EMPLOYER_RATE = 0.237;

/**
 * Bands as [upper bound inclusive, rate]. Sorted ascending; final row Infinity.
 * A pay of exactly the upper bound belongs to that band.
 */
export const NHS_SUPER_TIERS_2026_27: ReadonlyArray<readonly [number, number]> = [
  [13259, 0.052],
  [28854, 0.065],
  [35155, 0.083],
  [52778, 0.098],
  [67668, 0.107],
  [Infinity, 0.125],
];

/** Human-readable band labels, index-aligned with NHS_SUPER_TIERS_2026_27. */
export const NHS_SUPER_TIER_LABELS_2026_27: readonly string[] = [
  "Tier 1 (up to £13,259) 5.2%",
  "Tier 2 (£13,260 to £28,854) 6.5%",
  "Tier 3 (£28,855 to £35,155) 8.3%",
  "Tier 4 (£35,156 to £52,778) 9.8%",
  "Tier 5 (£52,779 to £67,668) 10.7%",
  "Tier 6 (£67,669 and above) 12.5%",
];

/** Employee contribution rate for a given annual pensionable pay (stepped). */
export function nhsSuperEmployeeRate(pensionablePay: number): number {
  for (const [upper, rate] of NHS_SUPER_TIERS_2026_27) {
    if (pensionablePay <= upper) return rate;
  }
  return NHS_SUPER_TIERS_2026_27[NHS_SUPER_TIERS_2026_27.length - 1][1];
}

/** Employee rate plus its band label (for result rows). */
export function nhsSuperEmployeeTier(pensionablePay: number): { rate: number; label: string } {
  for (let i = 0; i < NHS_SUPER_TIERS_2026_27.length; i++) {
    if (pensionablePay <= NHS_SUPER_TIERS_2026_27[i][0]) {
      return { rate: NHS_SUPER_TIERS_2026_27[i][1], label: NHS_SUPER_TIER_LABELS_2026_27[i] };
    }
  }
  const last = NHS_SUPER_TIERS_2026_27.length - 1;
  return { rate: NHS_SUPER_TIERS_2026_27[last][1], label: NHS_SUPER_TIER_LABELS_2026_27[last] };
}

// ponytail: one runnable check — fails loudly if the table or lookup breaks.
if (typeof process !== "undefined" && process.argv[1]?.endsWith("nhs-super-tiers.ts")) {
  const cases: [number, number][] = [
    [10000, 0.052],
    [13259, 0.052],
    [20000, 0.065],
    [30000, 0.083],
    [40000, 0.098],
    [60000, 0.107],
    [67668, 0.107],
    [67669, 0.125],
    [120000, 0.125],
  ];
  let ok = true;
  for (const [pay, want] of cases) {
    const got = nhsSuperEmployeeRate(pay);
    if (got !== want) { ok = false; console.error(`FAIL ${pay}: got ${got} want ${want}`); }
  }
  console.log(ok ? "PASS nhs-super-tiers" : "FAIL nhs-super-tiers");
}
