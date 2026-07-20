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
import activitySnapshot from "@/data/nhs-dental-activity-index.json";
import earningsSnapshot from "@/data/nhs-dental-earnings-index.json";

const activity = activitySnapshot as unknown as DentalActivitySnapshot;
const earnings = earningsSnapshot as unknown as DentalEarningsSnapshot;

export const metadata: Metadata = {
  title: "NHS dental data and research | Dental Finance Partners",
  description:
    "Original, sourced data on NHS dental activity recovery and dentist earnings, built from NHSBSA and NHS Digital open data. Free to read and cite.",
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
          <div className="grid gap-6 sm:grid-cols-2">
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
