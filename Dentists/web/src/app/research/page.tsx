import type { Metadata } from "next";
import Link from "next/link";

import { DentistsBackdrop } from "@/components/layout/DentistsBackdrop";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  fmtIndex,
  monthLabel as activityMonthLabel,
  type DentalActivitySnapshot,
} from "@/lib/research/dental-activity-index";
import {
  fmtGBP,
  type DentalEarningsSnapshot,
} from "@/lib/research/dental-earnings-index";
import {
  fmtDensity,
  fmtNumber as fmtDensityNumber,
  type DentalPracticeDensitySnapshot,
} from "@/lib/research/dental-practice-density";
import {
  fmtNumber as fmtFormationNumber,
  fmtPercent,
  monthLabel as formationMonthLabel,
  type DentalCompanyFormationSnapshot,
} from "@/lib/research/dental-company-formation-index";
import activitySnapshot from "@/data/nhs-dental-activity-index.json";
import earningsSnapshot from "@/data/nhs-dental-earnings-index.json";
import densitySnapshot from "@/data/dental-practice-density.json";
import formationSnapshot from "@/data/dental-company-formation-index.json";

const activity = activitySnapshot as unknown as DentalActivitySnapshot;
const earnings = earningsSnapshot as unknown as DentalEarningsSnapshot;
const density = densitySnapshot as unknown as DentalPracticeDensitySnapshot;
const formation = formationSnapshot as unknown as DentalCompanyFormationSnapshot;

export const metadata: Metadata = {
  title: "NHS dental data and research",
  description:
    "Original, sourced data on NHS dental activity, dentist earnings, practice density and company formation trends, built from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

/** Every figure below is read from the same snapshot files the report pages and
 *  the homepage render, through the same `lib/research` formatters, at build
 *  time and as plain text. No counter, no animation: the server HTML carries the
 *  true value, and the index, the homepage and the report cannot disagree. */
const reports = [
  {
    href: "/research/nhs-dental-activity-index",
    title: "NHS Dental Activity Recovery Index",
    blurb: `Monthly NHS dental UDA delivery against the pre-Covid 2019/20 baseline of 100. The Recovery Index stood at ${fmtIndex(activity.headline.last_month_recovery_index)} in ${activityMonthLabel(activity.headline.last_settled_month)}.`,
    stat: fmtIndex(activity.headline.last_month_recovery_index),
    statLabel: "Recovery Index, where 100 is the 2019/20 pre-Covid baseline",
    source: "Built from NHSBSA open data",
    updated: `Settled to ${activityMonthLabel(activity.headline.last_settled_month)}`,
  },
  {
    href: "/research/nhs-dentist-earnings-index",
    title: "NHS Dentist Earnings and Expenses Tracker",
    blurb: `Average net income for self-employed primary-care NHS dentists in England was ${fmtGBP(earnings.headline.avg_net_income_england)} in ${earnings.headline.reference_year}. Gross earnings, expenses and net income as a time series, ${earnings.meta.timeseries_coverage}.`,
    stat: fmtGBP(earnings.headline.avg_net_income_england),
    statLabel: `average net income before tax, England, ${earnings.headline.reference_year}`,
    source: "Built from NHS England Digital published statistics",
    updated: `${earnings.headline.reference_year} edition`,
  },
  {
    href: "/research/dental-practice-density",
    title: "Dental Practice Density: England Regional Map",
    blurb: `${fmtDensityNumber(density.headline.total_dental_locations)} CQC-registered dental locations in England, ${fmtDensity(density.headline.england_per_100k)} per 100,000 people. ${density.headline.highest_density_region} is the densest at ${fmtDensity(density.headline.highest_density_per_100k)}, ${density.headline.lowest_density_region} the thinnest at ${fmtDensity(density.headline.lowest_density_per_100k)}.`,
    stat: fmtDensity(density.headline.england_per_100k),
    statLabel: "CQC-registered dental locations per 100,000 people in England",
    source: "Built from the CQC Care Directory",
    updated: `CQC directory of ${density.meta.cqc_data_date}`,
  },
  {
    href: "/research/dental-company-formation-index",
    title: "Dental Company Formation Index (SIC 86230)",
    blurb: `New dental limited company incorporations under SIC 86230 rose ${fmtPercent(formation.headline.decade.change_pct, false)} between ${formation.headline.decade.from_year} and ${formation.headline.decade.to_year}. ${fmtFormationNumber(formation.headline.dental_cos_ttm)} were incorporated in the last twelve settled months.`,
    stat: fmtFormationNumber(formation.headline.dental_cos_ttm),
    statLabel: "new dental companies in the last twelve settled months",
    source: "Built from the Companies House register",
    updated: `Settled to ${formationMonthLabel(formation.meta.incorporations_settled_through)}`,
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[var(--navy)]">
        <DentistsBackdrop tone="navy" />
        <div className={`relative z-10 ${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb variant="light" items={[{ label: "Home", href: "/" }, { label: "Research" }]} />
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
            Original research
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            <span className="block">Four running data series</span>
            <span className="block">on UK dentistry.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            Built entirely from official open data: NHSBSA contract activity, NHS England Digital
            earnings statistics, the CQC Care Directory and the Companies House register. Each
            series states its source, its coverage and the month it runs to, each is updated as the
            sources settle, and each is free to read and cite with attribution.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70">
            Every series ships its underlying figures as a CSV download on its own page, so a
            number quoted here can be checked against the data it came from.
          </p>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {reports.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className={`card-premium group flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-[rgba(0,27,61,0.08)] sm:p-8 ${focusRing}`}
                  data-cta="research_index_report"
                  data-cta-placement="research_index"
                  data-cta-goal="content"
                >
                  <span className="text-3xl font-bold tabular-nums text-[var(--ink)] sm:text-4xl">
                    {r.stat}
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                    {r.statLabel}
                  </span>
                  <h2 className="mt-5 text-lg font-semibold leading-snug text-[var(--ink)] group-hover:underline group-hover:decoration-[var(--gold)] group-hover:underline-offset-4">
                    {r.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {r.blurb}
                  </p>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary-700">
                    {r.source}
                  </span>
                  <span className="mt-1 text-xs text-[var(--muted)]">{r.updated}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
