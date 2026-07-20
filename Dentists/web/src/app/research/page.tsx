import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
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
  title: "NHS dental data and research | Dental Finance Partners",
  description:
    "Original, sourced data on NHS dental activity, dentist earnings, practice density and company formation trends, built from official open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/nhs-dental-activity-index",
    title: "NHS Dental Activity Recovery Index",
    blurb: `Monthly NHS dental UDA delivery vs the pre-Covid 2019/20 baseline (= 100). Recovery Index: ${fmtIndex(activity.headline.last_month_recovery_index)} in ${activityMonthLabel(activity.headline.last_settled_month)}.`,
    stat: fmtIndex(activity.headline.last_month_recovery_index),
    statLabel: "Recovery Index (100 = 2019/20 pre-Covid baseline)",
    updated: activityMonthLabel(activity.headline.last_settled_month),
  },
  {
    href: "/research/nhs-dentist-earnings-index",
    title: "NHS Dentist Earnings and Expenses Tracker",
    blurb: `Average NHS dentist net income was ${fmtGBP(earnings.headline.avg_net_income_england)} in ${earnings.headline.reference_year}. Time series of gross earnings, expenses and net income from 2009/10 to 2023/24.`,
    stat: fmtGBP(earnings.headline.avg_net_income_england),
    statLabel: `average net income before tax (${earnings.headline.reference_year})`,
    updated: `NHS Digital ${earnings.headline.reference_year} edition`,
  },
  {
    href: "/research/dental-practice-density",
    title: "Dental Practice Density: England Regional Map",
    blurb: `There are ${fmtDensityNumber(density.headline.total_dental_locations)} CQC-registered dental locations in England (${fmtDensity(density.headline.england_per_100k)} per 100k). ${density.headline.highest_density_region} is highest (${fmtDensity(density.headline.highest_density_per_100k)}/100k); ${density.headline.lowest_density_region} lowest (${fmtDensity(density.headline.lowest_density_per_100k)}/100k).`,
    stat: `${fmtDensity(density.headline.england_per_100k)}`,
    statLabel: "dental locations per 100,000 population (England)",
    updated: `CQC Care Directory ${density.meta.cqc_data_date}`,
  },
  {
    href: "/research/dental-company-formation-index",
    title: "Dental Company Formation Index (SIC 86230)",
    blurb: `New dental limited company incorporations (SIC 86230) rose ${fmtPercent(formation.headline.decade.change_pct, false)} between ${formation.headline.decade.from_year} and ${formation.headline.decade.to_year}. ${fmtFormationNumber(formation.headline.dental_cos_ttm)} new dental companies in the last 12 months.`,
    stat: fmtFormationNumber(formation.headline.dental_cos_ttm),
    statLabel: "new dental companies incorporated (last 12 months)",
    updated: formationMonthLabel(formation.meta.incorporations_settled_through),
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <section className="hero-brand py-12 sm:py-16">
        <div className={`hero-inner ${siteContainerLg}`}>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research" }]} />
          <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            NHS dental data and research
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Original, sourced reads on NHS dental activity and dentist earnings, built entirely from
            official open data (NHSBSA and NHS Digital). Free to read and cite with attribution.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-[var(--gold)] hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-[var(--gold)] sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-[var(--navy)]">
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
