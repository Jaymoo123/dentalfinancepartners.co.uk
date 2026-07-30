/**
 * Business Valuation Calculator — pure compute module. No React / DOM / fetch.
 *
 * Enterprise value = adjusted EBITDA (or net profit) × sector multiple range.
 * Equity value = enterprise value + surplus cash/assets − debt. Multiples
 * are indicative UK SME ranges (see per-sector notes); output is always a
 * range, never a single point figure.
 */

export type ValuationSector =
  | "general"
  | "recruitment"
  | "manufacturing"
  | "ecommerce"
  | "construction"
  | "lawFirm"
  | "accountancy"
  | "careHome";

const SECTOR_MULTIPLES: Record<ValuationSector, { low: number; high: number; label: string }> = {
  general: { low: 3, high: 5, label: "General SME (no specific sector)" },
  recruitment: { low: 4, high: 6, label: "Recruitment / staffing" },
  manufacturing: { low: 4, high: 6, label: "Manufacturing" },
  ecommerce: { low: 2.5, high: 4, label: "Ecommerce" },
  construction: { low: 2, high: 4, label: "Construction" },
  lawFirm: { low: 3, high: 5, label: "Law firm" },
  accountancy: { low: 4, high: 6, label: "Accountancy practice" },
  careHome: { low: 6, high: 9, label: "Care home (property-heavy)" },
};

export type ValuationResult = {
  multipleLow: number;
  multipleHigh: number;
  multipleMid: number;
  enterpriseValueLow: number;
  enterpriseValueHigh: number;
  enterpriseValueMid: number;
  equityValueLow: number;
  equityValueHigh: number;
  equityValueMid: number;
};

export function calcBusinessValuation(
  ebitda: number,
  sector: ValuationSector,
  surplusCash: number,
  debt: number,
): ValuationResult {
  const e = Math.max(0, ebitda);
  const cash = Math.max(0, surplusCash);
  const debtAmount = Math.max(0, debt);
  const { low, high } = SECTOR_MULTIPLES[sector] ?? SECTOR_MULTIPLES.general;
  const mid = (low + high) / 2;

  const evLow = e * low;
  const evHigh = e * high;
  const evMid = e * mid;

  return {
    multipleLow: low,
    multipleHigh: high,
    multipleMid: mid,
    enterpriseValueLow: evLow,
    enterpriseValueHigh: evHigh,
    enterpriseValueMid: evMid,
    equityValueLow: evLow + cash - debtAmount,
    equityValueHigh: evHigh + cash - debtAmount,
    equityValueMid: evMid + cash - debtAmount,
  };
}

export { SECTOR_MULTIPLES };
