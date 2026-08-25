import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { JsonLd, buildCollectionPage } from "@/lib/schema";
import { fmtNumber, fmtPercent, monthLabel, type FormationIndexSnapshot } from "@/lib/research/formation-index";
import { fmtPct as survivalFmtPct, type SurvivalIndexSnapshot } from "@/lib/research/survival-index";
import { monthLabel as insolvMonthLabel, type InsolvencyIndexSnapshot } from "@/lib/research/insolvency-index";
import formationSnapshot from "@/data/uk-agency-formation-index.json";
import survivalSnapshot from "@/data/uk-agency-survival-churn-index.json";
import insolvSnapshot from "@/data/uk-agency-insolvency-index.json";

const formation = formationSnapshot as unknown as FormationIndexSnapshot;
const survival = survivalSnapshot as unknown as SurvivalIndexSnapshot;
const insolv = insolvSnapshot as unknown as InsolvencyIndexSnapshot;

export const metadata: Metadata = {
  title: "Agency industry research and data | Agency Founder Finance",
  description:
    "Original, sourced data on UK agency company formation, survival and insolvency trends, built from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const collection = buildCollectionPage({
  name: "Agency industry research and data",
  description: metadata.description as string,
  path: "/research",
});

const reports = [
  {
    href: "/research/uk-agency-survival-churn-index",
    flagship: true,
    title: "UK Agency Survival & Churn Index",
    blurb: `How long UK agencies actually last: ${survivalFmtPct(survival.headline.latest_5yr_agency_pct)} of the ${survival.headline.latest_5yr_cohort_year} agency-cluster birth cohort survived 5 years, against a ${survivalFmtPct(survival.headline.latest_5yr_all_industries_pct)} all-industries average.`,
    stat: survivalFmtPct(survival.headline.latest_5yr_agency_pct),
    statLabel: `5-year survival rate, ${survival.headline.latest_5yr_cohort_year} birth cohort`,
    updated: survival.meta.source.release_date,
  },
  {
    href: "/research/uk-agency-formation-index",
    flagship: false,
    title: "UK Agency Formation Index",
    blurb: `New advertising agency incorporations, sourced from Companies House, across the 7-code agency SIC cluster. ${fmtPercent(formation.headline.decade?.change_pct ?? null, false)} change since ${formation.headline.decade?.from_year}.`,
    stat: fmtNumber(formation.headline.all_agency_cos_ttm),
    statLabel: "agency-cluster companies incorporated in the last 12 months",
    updated: monthLabel(formation.meta.incorporations_settled_through),
  },
  {
    href: "/research/uk-agency-insolvency-index",
    flagship: false,
    title: "UK Agency Insolvency Index",
    blurb: `Agency insolvencies rose ${fmtPercent(insolv.headline.decade.change_pct, false)} from ${insolv.headline.decade.from_year} to ${insolv.headline.decade.to_year}, isolated to the exact 7-code agency SIC cluster using the Insolvency Service's 5-digit SIC field.`,
    stat: fmtNumber(insolv.headline.ttm_union),
    statLabel: "agency insolvencies in the trailing 12 months",
    updated: insolvMonthLabel(insolv.meta.data_through),
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <JsonLd data={collection} />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research" }]} />

        <header className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Agency industry research and data</h1>
          <p className="mt-4 text-lg text-slate-700">
            Original, sourced reads on UK agency company formation, survival and insolvency trends, built entirely
            from official open data (Companies House, ONS and the Insolvency Service). Free to read and cite with
            attribution.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`group rounded-2xl border p-6 transition hover:border-indigo-600 hover:shadow-md sm:p-8 ${
                r.flagship ? "border-indigo-300 bg-indigo-50/40 lg:col-span-3" : "border-slate-200"
              }`}
            >
              {r.flagship && (
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600">Flagship research</p>
              )}
              <div className="text-3xl font-bold text-indigo-600 sm:text-4xl">{r.stat}</div>
              <div className="mt-1 text-sm text-slate-500">{r.statLabel}</div>
              <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-indigo-600">{r.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{r.blurb}</p>
              <p className="mt-4 text-xs text-slate-400">Updated {r.updated}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
