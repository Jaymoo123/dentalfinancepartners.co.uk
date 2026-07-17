/**
 * VAT Registration Threshold Checker — pure compute module.
 *
 * Rolling-12-month test + 30-day forward-look test against the registration
 * threshold, breach-month projection, register-by date and effective date.
 * No React / DOM / fetch.
 *
 * Statutory dates (VATA 1994 Sch 1, amounts set by SI):
 *   Registration threshold £90,000 — since 1 April 2024 (was £85,000).
 *   Deregistration threshold £88,000 — since 1 April 2024 (was £83,000).
 */

export const VAT_REG_THRESHOLD = 90_000; // since 1 Apr 2024
export const VAT_DEREG_THRESHOLD = 88_000; // since 1 Apr 2024

const PROJECTION_HORIZON_MONTHS = 36;

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" });
const fullDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export type VatThresholdResult = {
  /** rolling-12 turnover after stripping exempt / outside-scope income */
  taxableRolling: number;
  /** threshold minus taxable rolling turnover (negative = over) */
  headroom: number;
  /** rolling-12 test already breached */
  breached: boolean;
  /** 30-day forward-look test breached on its own */
  forwardBreached: boolean;
  /** months ahead the rolling test is projected to breach; 0 = already; null = not within horizon */
  breachMonthsAhead: number | null;
  /** e.g. "October 2026" */
  breachMonthLabel: string | null;
  /** e.g. "30 November 2026" */
  registerByLabel: string | null;
  /** first day of the first VAT period, e.g. "1 December 2026" */
  effectiveFromLabel: string | null;
  /** already registered + below £88,000 → could apply to deregister */
  belowDereg: boolean;
};

export function checkVatThreshold(
  rolling12: number,
  latestMonth: number,
  growthPct: number,
  next30: number,
  exemptIncluded: number,
  now: Date = new Date(),
): VatThresholdResult {
  const taxableRolling = Math.max(0, rolling12 - exemptIncluded);
  const headroom = VAT_REG_THRESHOLD - taxableRolling;
  const g = growthPct / 100;

  const forwardBreached = next30 > VAT_REG_THRESHOLD;

  // Project the rolling total forward. Month k ahead adds latestMonth*(1+g)^k
  // and drops the month falling out of the window, back/forward-projected on
  // the same growth curve as latestMonth*(1+g)^(k-12).
  // ponytail: geometric approximation of the 12 unknown historical months;
  // exact breach month needs the real month-by-month history the user rarely has.
  let breachMonthsAhead: number | null = null;
  if (taxableRolling > VAT_REG_THRESHOLD) {
    breachMonthsAhead = 0;
  } else {
    let rolling = taxableRolling;
    for (let k = 1; k <= PROJECTION_HORIZON_MONTHS; k++) {
      rolling += latestMonth * Math.pow(1 + g, k) - latestMonth * Math.pow(1 + g, k - 12);
      if (rolling > VAT_REG_THRESHOLD) {
        breachMonthsAhead = k;
        break;
      }
    }
  }

  let breachMonthLabel: string | null = null;
  let registerByLabel: string | null = null;
  let effectiveFromLabel: string | null = null;

  if (forwardBreached) {
    // Forward-look test: register before the end of the 30-day period;
    // registration is effective from the date the expectation arose (today).
    const endOf30 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
    registerByLabel = fullDate.format(endOf30);
    effectiveFromLabel = fullDate.format(now);
  } else if (breachMonthsAhead !== null) {
    // Rolling test: notify HMRC within 30 days of the end of the breach month;
    // effective from the first day of the second month after the breach month.
    const breach = new Date(now.getFullYear(), now.getMonth() + breachMonthsAhead, 1);
    const endOfBreachMonth = new Date(breach.getFullYear(), breach.getMonth() + 1, 0);
    const registerBy = new Date(
      endOfBreachMonth.getFullYear(),
      endOfBreachMonth.getMonth(),
      endOfBreachMonth.getDate() + 30,
    );
    breachMonthLabel = monthYear.format(breach);
    registerByLabel = fullDate.format(registerBy);
    effectiveFromLabel = fullDate.format(new Date(breach.getFullYear(), breach.getMonth() + 2, 1));
  }

  return {
    taxableRolling,
    headroom,
    breached: breachMonthsAhead === 0,
    forwardBreached,
    breachMonthsAhead,
    breachMonthLabel,
    registerByLabel,
    effectiveFromLabel,
    belowDereg: taxableRolling < VAT_DEREG_THRESHOLD,
  };
}
