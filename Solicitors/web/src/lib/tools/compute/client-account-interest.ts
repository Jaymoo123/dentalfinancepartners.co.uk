/**
 * Client account interest estimator — SRA Accounts Rules Rule 7.1 "fair sum".
 *
 * Models a representative matter (balance held for a number of days), compares
 * the firm's interest-policy rate against a benchmark instant-access rate, and
 * scales to an aggregate annual interest liability. Includes a de minimis
 * sense-check against the firm's payout threshold.
 */

export interface ClientAccountInterestInput {
  /** representative client money balance per matter (£) */
  typicalBalance: number;
  /** typical holding duration (days) */
  holdingDays: number;
  /** matters holding client money completed per year */
  mattersPerYear: number;
  /** firm's interest-policy rate applied to client balances (% p.a.) */
  policyRate: number;
  /** benchmark instant-access rate a client could reasonably obtain (% p.a.) */
  benchmarkRate: number;
  /** firm's de minimis threshold below which no interest is paid (£) */
  deMinimis: number;
}

export interface ClientAccountInterestResult {
  /** interest per matter under the firm's policy rate (£) */
  policyInterestPerMatter: number;
  /** indicative fair interest per matter at the benchmark rate (£) */
  fairInterestPerMatter: number;
  /** fair minus policy, per matter (£, >= 0 means underpayment) */
  shortfallPerMatter: number;
  /** aggregate annual fair interest across all matters (£) */
  annualFairInterest: number;
  /** aggregate annual interest actually payable under policy (£) */
  annualPolicyInterest: number;
  /** aggregate annual shortfall vs fair sum (£) */
  annualShortfall: number;
  /** true if the de minimis threshold swallows the fair interest per matter */
  deMinimisSwallowsFairSum: boolean;
  /** true if threshold sits outside the typical £20-£50 range */
  deMinimisAboveTypicalRange: boolean;
}

const TYPICAL_DE_MINIMIS_HIGH = 50;

export function calcClientAccountInterest(
  input: ClientAccountInterestInput
): ClientAccountInterestResult {
  const { typicalBalance, holdingDays, mattersPerYear, policyRate, benchmarkRate, deMinimis } =
    input;

  const yearFraction = holdingDays / 365;
  const policyInterestPerMatter = typicalBalance * (policyRate / 100) * yearFraction;
  const fairInterestPerMatter = typicalBalance * (benchmarkRate / 100) * yearFraction;
  const shortfallPerMatter = Math.max(0, fairInterestPerMatter - policyInterestPerMatter);

  // ponytail: simple interest on one representative matter profile; add banded
  // tranches only if users ask for a multi-band ledger.
  const annualFairInterest = fairInterestPerMatter * mattersPerYear;
  const annualPolicyInterest = policyInterestPerMatter * mattersPerYear;
  const annualShortfall = shortfallPerMatter * mattersPerYear;

  return {
    policyInterestPerMatter,
    fairInterestPerMatter,
    shortfallPerMatter,
    annualFairInterest,
    annualPolicyInterest,
    annualShortfall,
    deMinimisSwallowsFairSum: fairInterestPerMatter > 0 && fairInterestPerMatter <= deMinimis,
    deMinimisAboveTypicalRange: deMinimis > TYPICAL_DE_MINIMIS_HIGH,
  };
}
