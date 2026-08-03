// Snapshot shapes for the /research section, matching the committed JSON files
// under src/data/. Kept separate from page.tsx files so the index page and
// data/route.ts files can import types without pulling in route modules.

export type ProbateWaitTimesSnapshot = {
  meta: {
    generated_at: string;
    latest_period: string;
    series_start: string;
    geography: string;
    scope: string;
    sources: { name: string; publisher: string; publication_page: string; data_file: string; published: string; licence: string; attribution: string }[];
    notes: string;
    provisional: boolean;
  };
  headline: {
    latest_quarter: string;
    mean_weeks_all: number;
    mean_weeks_digital: number;
    mean_weeks_paper: number;
    median_weeks_digital: number;
    median_weeks_paper: number;
    yoy: {
      vs_quarter: string;
      mean_weeks_all_change: number;
      mean_weeks_digital_change: number;
      mean_weeks_paper_change: number;
    };
    applications_ttm: number;
    grants_ttm: number;
    applications_latest: number;
    grants_latest: number;
    digital_share_applications_latest_pct: number;
    worst_quarter: { quarter: string; mean_weeks_all: number };
    best_quarter: { quarter: string; mean_weeks_all: number };
    worst_paper_quarter: { quarter: string; mean_weeks_paper: number };
  };
  by_grant_type: {
    quarter: string;
    note: string;
    types: {
      grant_type: string;
      label: string;
      applies_when: string;
      applications: number;
      grants: number;
      applications_digital: number;
      applications_paper: number;
      mean_weeks_all: number;
      median_weeks_all: number;
      mean_weeks_digital: number;
      median_weeks_digital: number;
      mean_weeks_paper: number;
      median_weeks_paper: number;
      mean_weeks_all_stopped: number;
      mean_weeks_all_not_stopped: number;
    }[];
  };
  series: {
    quarter: string;
    applications: number | null;
    grants: number | null;
    applications_digital: number | null;
    applications_paper: number | null;
    mean_weeks_all: number;
    median_weeks_all: number;
    mean_weeks_digital: number;
    median_weeks_digital: number;
    mean_weeks_paper: number;
    median_weeks_paper: number;
  }[];
};

export type PensionsIhtSnapshot = {
  meta: {
    generated_at: string;
    commencement: string;
    title: string;
    sources: { id: string; name: string; url: string }[];
  };
  policy: {
    what_changes: string;
    in_scope: string[];
    out_of_scope: string[];
    liability_mechanics: string;
    stated_rationale: string;
  };
  impact: {
    source: string;
    reference_year: string;
    estates_with_inheritable_pension_wealth: number;
    newly_liable_pa: number;
    newly_liable_share_of_uk_deaths_pct: number;
    paying_more_pa: number;
    average_iht_increase_gbp: number;
    exchequer_yield_by_year: { year: string; gbp_m: number }[];
  };
  context_series: {
    source: string;
    note: string;
    years: { tax_year: string; taxpaying_estates: number | null; liabilities_gbp_bn: number }[];
    share_of_deaths_2022_23_pct: number;
    uk_deaths_2022_23: number;
    average_liability_2022_23_gbp: number;
  };
  worked_model: {
    disclaimer: string;
    assumptions: {
      nrb_gbp: number;
      rnrb_gbp: number;
      rnrb_taper_threshold_gbp: number;
      iht_rate_pct: number;
    };
    scenarios: {
      id: string;
      label: string;
      estate_ex_pension_gbp: number;
      pension_gbp: number;
      allowances_now_gbp: number;
      iht_now_gbp: number;
      allowances_2027_gbp: number;
      taxable_2027_gbp: number;
      iht_2027_gbp: number;
      note: string;
    }[];
  };
};
