/**
 * Making Tax Digital for Income Tax (MTD ITSA) — the pure, locked logic shared by
 * the premium "does MTD apply to you, and when?" checker and the Excel
 * quarterly-deadline tracker, so the two can never disagree.
 *
 * Locked from docs/property/house_positions.md §3 + §19 (verified gov.uk
 * 2026-05-22):
 *  - Qualifying income = GROSS self-employment turnover + GROSS property rental
 *    income, BEFORE any deductions. The two streams are aggregated for the test.
 *  - Mandate is phased by qualifying income:
 *      • from 6 April 2026: qualifying income OVER £50,000
 *      • from 6 April 2027: OVER £30,000
 *      • from 6 April 2028: OVER £20,000
 *  - The thresholds are "over", i.e. strictly greater than: exactly £50,000 is
 *    NOT mandated in the first cohort (it is over £30,000, so it joins from 2027).
 *  - Limited companies are OUTSIDE MTD ITSA entirely. Partnerships are deferred
 *    (no confirmed date). Trustees are outside. Those are flagged to the user,
 *    not modelled as a number.
 *  - Once in, the obligations are: keep digital records, submit four quarterly
 *    updates, then a final declaration by 31 January after the tax year.
 *
 * "Qualifying income" deliberately EXCLUDES employment (PAYE), pensions,
 * dividends and savings interest — see house_positions §19.2. The checker only
 * asks for the two streams that count.
 */

/** A single tier of the phased mandate. */
export interface MtdTier {
  /** the April the mandate begins (e.g. 2026 = 6 April 2026). */
  fromYear: number;
  /** human label for the start, e.g. "6 April 2026". */
  fromLabel: string;
  /** qualifying-income threshold: mandated when income is STRICTLY OVER this. */
  threshold: number;
  /** the self-assessment return the threshold is tested against. */
  testedAgainst: string;
}

/**
 * The locked phased schedule. Strictly-greater-than thresholds, in descending
 * threshold order so the first match (highest threshold the income clears) is the
 * EARLIEST mandate date.
 */
export const MTD_TIERS: MtdTier[] = [
  {
    fromYear: 2026,
    fromLabel: "6 April 2026",
    threshold: 50000,
    testedAgainst: "your 2024/25 Self Assessment return",
  },
  {
    fromYear: 2027,
    fromLabel: "6 April 2027",
    threshold: 30000,
    testedAgainst: "your 2025/26 Self Assessment return",
  },
  {
    fromYear: 2028,
    fromLabel: "6 April 2028",
    threshold: 20000,
    testedAgainst: "your 2026/27 Self Assessment return",
  },
];

/** The lowest threshold in the published schedule (the final phase). */
export const MTD_FINAL_THRESHOLD = 20000;

/** The annual count of mandatory quarterly updates once in MTD. */
export const QUARTERLY_UPDATES_PER_YEAR = 4;

/**
 * The default (standard) quarterly period ends and the date each update is due
 * (one month and one week after the period end). A calendar-quarter election is
 * available from 6 April 2026 (31 Mar / 30 Jun / 30 Sep / 31 Dec) but the default
 * remains the UK-tax-year quarters below (house_positions §19.6).
 */
export interface MtdQuarter {
  label: string;
  periodCovers: string;
  periodEnds: string;
  updateDue: string;
}

export const MTD_STANDARD_QUARTERS: MtdQuarter[] = [
  { label: "Quarter 1", periodCovers: "6 Apr – 5 Jul", periodEnds: "5 July", updateDue: "7 August" },
  { label: "Quarter 2", periodCovers: "6 Jul – 5 Oct", periodEnds: "5 October", updateDue: "7 November" },
  { label: "Quarter 3", periodCovers: "6 Oct – 5 Jan", periodEnds: "5 January", updateDue: "7 February" },
  { label: "Quarter 4", periodCovers: "6 Jan – 5 Apr", periodEnds: "5 April", updateDue: "7 May" },
];

/** The annual wrap-up obligation after the four quarterly updates. */
export const FINAL_DECLARATION_DUE = "31 January following the tax year";

export type MtdEntity = "individual" | "company" | "partnership" | "trust";

export interface MtdInputs {
  /** gross annual property rental income (before any deductions). */
  rentalIncome: number;
  /** gross annual self-employment / sole-trade turnover (before deductions). */
  soleTradeIncome: number;
  /**
   * the entity holding the income. Only an individual can be in MTD ITSA; the
   * others are out of scope and the checker says so.
   */
  entity?: MtdEntity;
}

export interface MtdResult {
  /** aggregated qualifying income (the figure the threshold is tested on). */
  qualifyingIncome: number;
  /** true if MTD ITSA applies (now or in a future phase) for this entity. */
  applies: boolean;
  /** the matched tier (earliest mandate date), or null if never mandated / out of scope. */
  tier: MtdTier | null;
  /**
   * "mandated" = an individual whose income clears one of the thresholds;
   * "below"    = an individual whose income is at/under the lowest threshold;
   * "out-of-scope" = a company / partnership / trust (not in MTD ITSA).
   */
  status: "mandated" | "below" | "out-of-scope";
  /** how far the qualifying income is above/below the relevant boundary. */
  marginToThreshold: number;
  /** the boundary the margin is measured against (£ figure). */
  boundary: number;
  /** plain-English summary line. */
  summary: string;
}

function round(n: number): number {
  return Math.round(n);
}

/**
 * Resolve whether (and from when) MTD ITSA applies. Picks the EARLIEST tier the
 * qualifying income clears (highest threshold first → earliest date).
 */
export function computeMtd(i: MtdInputs): MtdResult {
  const entity = i.entity ?? "individual";
  const rent = Math.max(0, i.rentalIncome);
  const trade = Math.max(0, i.soleTradeIncome);
  const qualifyingIncome = round(rent + trade);

  // Companies, partnerships and trusts are outside MTD ITSA entirely.
  if (entity !== "individual") {
    const why =
      entity === "company"
        ? "Limited companies are outside MTD for Income Tax entirely — they file an annual Company Tax return (CT600)."
        : entity === "partnership"
          ? "Partnerships are deferred from MTD for Income Tax, with no confirmed start date. (A partner's own separate sole-trade or rental income can still bring them in.)"
          : "Trustees are outside MTD for Income Tax — trust property income is reported on the SA900 trust return as before.";
    return {
      qualifyingIncome,
      applies: false,
      tier: null,
      status: "out-of-scope",
      marginToThreshold: 0,
      boundary: 0,
      summary: why,
    };
  }

  // Individual: find the earliest tier whose threshold the income clears.
  const tier = MTD_TIERS.find((t) => qualifyingIncome > t.threshold) ?? null;

  if (tier) {
    return {
      qualifyingIncome,
      applies: true,
      tier,
      status: "mandated",
      marginToThreshold: round(qualifyingIncome - tier.threshold),
      boundary: tier.threshold,
      summary: `Your qualifying income is over £${tier.threshold.toLocaleString("en-GB")}, so MTD for Income Tax is mandatory for you from ${tier.fromLabel}.`,
    };
  }

  // Below the lowest published threshold.
  const margin = round(MTD_FINAL_THRESHOLD - qualifyingIncome);
  return {
    qualifyingIncome,
    applies: false,
    tier: null,
    status: "below",
    marginToThreshold: -margin,
    boundary: MTD_FINAL_THRESHOLD,
    summary:
      qualifyingIncome === MTD_FINAL_THRESHOLD
        ? "Your qualifying income is exactly £20,000. The thresholds are 'over' £20,000, so you are not yet mandated, but you are on the boundary — watch it closely."
        : `Your qualifying income is £${margin.toLocaleString("en-GB")} below the lowest published threshold (£20,000 from April 2028). No MTD mandate currently applies, but you can join voluntarily.`,
  };
}

/** Format a whole-pound figure as GBP, e.g. 52000 → "£52,000". */
export function gbp(n: number): string {
  const rounded = Math.round(n);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}£${Math.abs(rounded).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;
}
