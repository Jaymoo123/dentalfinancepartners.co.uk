import type { Metadata } from "next";
import Link from "next/link";

import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  fmtGBPm as fmtFundingGBPm,
  fmtPercent0 as fmtFundingPercent0,
  type TechFundingRefiefsIndexSnapshot,
} from "@/lib/research/tech-funding-reliefs-index";
import {
  fmtGBPbn,
  fmtNumber as fmtRdNumber,
  fmtPercent0 as fmtRdPercent0,
  type RdTaxReliefIndexSnapshot,
} from "@/lib/research/rd-tax-relief-index";
import {
  fmtPercent0 as fmtSurvivalPercent0,
  type TechStartupSurvivalIndexSnapshot,
} from "@/lib/research/tech-startup-survival-index";
import {
  fmtNumber as fmtFormationsNumber,
  fmtPercent as fmtFormationsPercent,
  monthLabel as formationsMonthLabel,
  type TechFormationsIndexSnapshot,
} from "@/lib/research/tech-formations-index";
import fundingData from "@/data/uk-tech-funding-reliefs-index.json";
import rdData from "@/data/rd-tax-relief-index.json";
import survivalCurvesData from "@/data/tech-startup-survival-index.json";
import formationsData from "@/data/uk-tech-formations-index.json";
import survivalData from "@/data/startup-formation-survival-index.json";

const funding = fundingData as unknown as TechFundingRefiefsIndexSnapshot;
const rd = rdData as unknown as RdTaxReliefIndexSnapshot;
const survivalCurves = survivalCurvesData as unknown as TechStartupSurvivalIndexSnapshot;
const formations = formationsData as unknown as TechFormationsIndexSnapshot;
const survival = survivalData as { combinedTechSector: { activeCompanies: { label: string }; snapshotSurvivalRate: { label: string } }; meta: { pullDate: string } };

export const metadata: Metadata = {
  title: "Original UK tech startup research and data | Founder Tax Partners",
  description:
    "Original, sourced data on UK startup funding, R&D tax relief and company formation, built entirely from HMRC and Companies House official statistics. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-tech-funding-reliefs-index",
    title: "UK Tech-Funding Reliefs Index (SEIS/EIS)",
    blurb: `Information & Communication took ${fmtFundingPercent0(funding.eis.latest.infoCommsSharePct)} of EIS funding and ${fmtFundingPercent0(funding.seis.latest.infoCommsSharePct)} of SEIS funding in ${funding.eis.latest.year}, the largest sector for both schemes. Full time series from 1993-94 (EIS) and 2012-13 (SEIS), by sector and region.`,
    stat: fmtFundingGBPm(funding.eis.latest.amountAllM),
    statLabel: `raised via EIS in ${funding.eis.latest.year}`,
    updated: `HMRC, data pulled ${funding.meta.pullDate}`,
  },
  {
    href: "/research/rd-tax-relief-index",
    title: "R&D Tax Relief Usage Index: the post-clampdown squeeze on tech",
    blurb: `R&D tax credit claims fell to ${fmtRdNumber(rd.headline.totalClaims)} in ${rd.headline.latestYear} after HMRC's anti-fraud clampdown. Information & Communication is the largest sector by claim count (${fmtRdPercent0(rd.headline.infoCommsClaimsSharePct)} of all claims).`,
    stat: fmtGBPbn(rd.headline.totalCostM),
    statLabel: `total R&D relief cost, ${rd.headline.latestYear}`,
    updated: `HMRC, data pulled ${rd.meta.pullDate}`,
  },
  {
    href: "/research/tech-startup-survival-index",
    title: "UK Tech Startup Survival Curves",
    blurb: `Only ${fmtSurvivalPercent0(survivalCurves.headline.techFiveYearSurvivalPct)} of UK tech companies born in ${survivalCurves.headline.fullFiveYearCohort} were still active five years later, versus ${fmtSurvivalPercent0(survivalCurves.headline.allIndustryFiveYearSurvivalPct)} across all industries. Cohort survival curves from ONS Business Demography.`,
    stat: fmtSurvivalPercent0(survivalCurves.headline.techFiveYearSurvivalPct),
    statLabel: `5-year survival, tech companies born ${survivalCurves.headline.fullFiveYearCohort}`,
    updated: `ONS, data pulled ${survivalCurves.meta.pullDate}`,
  },
  {
    href: "/research/uk-tech-formations-index",
    title: "UK Tech Formations Index",
    blurb: `New software development company formations rose ${fmtFormationsPercent(formations.headline.decade.change_pct, false)} between ${formations.headline.decade.from_year} and ${formations.headline.decade.to_year}. ${fmtFormationsNumber(formations.headline.all_tech_cos_ttm)} new tech companies in the last 12 months, plus tax-year-boundary seasonality.`,
    stat: fmtFormationsNumber(formations.headline.all_tech_cos_ttm),
    statLabel: "new tech companies incorporated (last 12 months)",
    updated: `Companies House, ${formationsMonthLabel(formations.meta.incorporations_settled_through)}`,
  },
  {
    href: "/research/startup-formation-survival-index",
    title: "UK Startup Formation & Survival Index",
    blurb: `${survival.combinedTechSector.activeCompanies.label} UK tech companies are currently active on the Companies House register (${survival.combinedTechSector.snapshotSurvivalRate.label} of all ever registered). Formation volume and register status by sub-sector.`,
    stat: survival.combinedTechSector.activeCompanies.label,
    statLabel: "active UK tech companies on the register",
    updated: `Companies House, data pulled ${survival.meta.pullDate}`,
  },
];

export default function ResearchIndexPage() {
  return (
    <main>
      <section className="border-b border-neutral-200 bg-[#1e1b4b] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6"
          >
            Home
          </Link>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Original UK tech startup research
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Sourced, methodology-transparent reads on UK startup funding, R&amp;D tax relief and
            company formation, built entirely from HMRC and Companies House official statistics.
            Free to read and cite with attribution.
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
                className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-[#4f46e5] hover:shadow-md sm:p-8"
              >
                <div className="text-3xl font-bold text-[#4f46e5] sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-neutral-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-neutral-900 group-hover:text-[#1e1b4b]">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-neutral-600">{r.blurb}</p>
                <p className="mt-4 text-xs text-neutral-400">Updated: {r.updated}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
