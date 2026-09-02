/**
 * Employer (secondary) Class 1 National Insurance, 2025/26 onward:
 *   15% on earnings above the secondary threshold of £5,000/year (from 6 April
 *   2025, Autumn Budget 2024 measure). LEL 2026/27 is £6,708 — informational
 *   only: it governs the employee's contribution record, not the employer
 *   charge, so it plays no part in this calculation.
 * Ignores the Employment Allowance (up to £10,500/year): most single-director
 * companies with no other employees are excluded from claiming it, so the tool
 * flags it in its note rather than modelling an eligibility question it cannot
 * answer. Locked from docs/property/house_positions.md (employer NIC 15% /
 * £5,000; the pre-2025 13.8% figure is logged there as a stale correction).
 */
export const EMPLOYER_NIC_RATE = 0.15;
export const EMPLOYER_NIC_SECONDARY_THRESHOLD = 5_000;

/** Employer's secondary Class 1 NIC on an annual salary. */
export function employerNic(salary: number): number {
  const s = Math.max(0, salary);
  if (s <= EMPLOYER_NIC_SECONDARY_THRESHOLD) return 0;
  return (s - EMPLOYER_NIC_SECONDARY_THRESHOLD) * EMPLOYER_NIC_RATE;
}
