/**
 * Typed loader/selectors for the estate snapshot baked at build time.
 * All data is static JSON; server-only, no runtime fetching.
 */
import snapshotJson from "@/data/estate-snapshot.json";

export type SeriesPoint = { period: string; value: number };

export type EstateSite = {
  id: string;
  name: string;
  domain: string;
  niche: string;
  sector: string;
  research_assets: string[];
};

export type EstateTotals = {
  sites: number;
  research_assets: number;
  posts_estimate: number | null;
};

export type LeadMonth = { month: string; count: number };
export type ForecastMonth = { month: string; low: number; mid: number; high: number };

export type EstateAsset = {
  id: string;
  name: string;
  brand: string;
  series: SeriesPoint[];
  latest: number | null;
  unit: string | null;
  finding: string;
  source: string | null;
  source_url: string | null;
  licence: string | null;
  report_url: string;
};

export type EstateSnapshot = {
  meta: { generated_at: string; sources: string[] };
  estate: { sites: EstateSite[]; totals: EstateTotals };
  leads: {
    monthly: LeadMonth[];
    forecast: ForecastMonth[];
    trend: {
      model: string;
      months_fitted: number;
      monthly_growth_pct: number;
      fitted_latest: number;
    };
  };
  assets: EstateAsset[];
};

export const snapshot = snapshotJson as EstateSnapshot;

export function leadsSeries(): LeadMonth[] {
  return snapshot.leads.monthly;
}

export function forecastSeries(): ForecastMonth[] {
  return snapshot.leads.forecast;
}

export function assetById(id: string): EstateAsset | undefined {
  return snapshot.assets.find((a) => a.id === id);
}

export function assetsWithSeries(): EstateAsset[] {
  return snapshot.assets.filter((a) => a.series.length > 0);
}

export function estateTotals(): EstateTotals {
  return snapshot.estate.totals;
}

export function estateSites(): EstateSite[] {
  return snapshot.estate.sites;
}

/** "2026-04" -> "Apr 2026" (en-GB). */
export function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  if (!y || !m) return month;
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** en-GB grouped integer formatting for chart labels. */
export function fmtNum(v: number): string {
  return Math.round(v).toLocaleString("en-GB");
}
