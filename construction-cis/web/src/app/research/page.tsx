import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { fmtNumber, monthLabel, type ConstructionIndexSnapshot } from "@/lib/research/construction-index";
import { monthLabel as insolvMonthLabel, type InsolvencyIndexSnapshot } from "@/lib/research/insolvency-index";
import { fmtPct as survivalFmtPct, type SurvivalIndexSnapshot } from "@/lib/research/survival-index";
import { type PprLeagueSnapshot } from "@/lib/research/ppr-league";
import snapshot from "@/data/uk-construction-index.json";
import insolvSnapshot from "@/data/construction-insolvency-index.json";
import survivalSnapshot from "@/data/construction-survival-index.json";
import pprSnapshot from "@/data/construction-ppr-league.json";

const cii = snapshot as unknown as ConstructionIndexSnapshot;
const insolv = insolvSnapshot as unknown as InsolvencyIndexSnapshot;
const survival = survivalSnapshot as unknown as SurvivalIndexSnapshot;
const ppr = pprSnapshot as unknown as PprLeagueSnapshot;

export const metadata: Metadata = {
  title: "Construction industry research and data | Trade Tax Specialists",
  description:
    "Original, sourced data on UK construction company formation and insolvency trends, built from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-construction-index",
    title: "UK Construction Index",
    blurb: `Domestic-building company incorporations over the past decade, sourced from Companies House, plus a net formation (incorporations minus dissolutions) breakdown. Up ${cii.headline.decade.change_pct.toFixed(0)}% since ${cii.headline.decade.from_year}.`,
    stat: fmtNumber(cii.headline.all_construction_cos_ttm),
    statLabel: "construction companies incorporated in the last 12 months",
    updated: monthLabel(cii.meta.incorporations_settled_through),
  },
  {
    href: "/research/uk-construction-insolvency-index",
    title: "UK Construction Insolvency Index",
    blurb: `Construction insolvencies rose ${insolv.headline.decade.change_pct?.toFixed(0) ?? "n/a"}% from ${insolv.headline.decade.from_year} to ${insolv.headline.decade.to_year}, now broken down by building, civil engineering and specialised trades. The sector consistently accounts for around 17% of all company insolvencies in England and Wales.`,
    stat: fmtNumber(insolv.headline.ttm_total),
    statLabel: "construction company insolvencies in the trailing 12 months",
    updated: insolvMonthLabel(insolv.meta.data_through),
  },
  {
    href: "/research/uk-construction-survival-index",
    title: "UK Construction Survival Index",
    blurb: `How long UK construction businesses actually last: ${survivalFmtPct(survival.headline.latest_5yr_construction_pct)} of the ${survival.headline.latest_5yr_cohort_year} birth cohort survived 5 years, ahead of the ${survivalFmtPct(survival.headline.latest_5yr_all_industries_pct)} all-industries average.`,
    stat: survivalFmtPct(survival.headline.latest_5yr_construction_pct),
    statLabel: `5-year survival rate, ${survival.headline.latest_5yr_cohort_year} birth cohort`,
    updated: survival.meta.release_date,
  },
  {
    href: "/research/uk-construction-payment-practices-league",
    title: "UK Construction Payment Practices League",
    blurb: `A sourced league table of ${fmtNumber(ppr.headline.n_companies)} large construction businesses' own statutory payment practice disclosures, median ${fmtNumber(ppr.headline.median_days_to_pay)} days to pay.`,
    stat: `${fmtNumber(ppr.headline.median_days_to_pay)} days`,
    statLabel: "median average time to pay, current cohort",
    updated: ppr.meta.generated_at,
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research" }]} />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Construction industry research and data
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Original, sourced reads on UK construction company formation trends, built entirely from
            official open data. Free to read and cite with attribution.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-orange-500 hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-orange-600 sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-orange-600">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{r.blurb}</p>
                <p className="mt-4 text-xs text-neutral-400">Updated {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
