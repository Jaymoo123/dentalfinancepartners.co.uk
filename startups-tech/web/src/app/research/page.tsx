import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";

import { siteContainerLg, focusRing } from "@/components/ui/layout-utils";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
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
  title: "Original UK tech startup research and data",
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
    <div>
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, in place
          of the hand-rolled 12px uppercase "Home" back-link. Same destination,
          same word, and it now also emits BreadcrumbList JSON-LD, which this
          route had none of. `onDark` because the band is primary-950 #1e1b4b:
          the kit's onDark palette measures slate-300 links 10.76:1 and slate-400
          chevrons 6.08:1 there, both past the 4.5 text and 3.0 graphic floors, so
          no local contrast wrapper is needed on this site (ecommerce needed one
          only to match a different navy).

          `ground-dark` is on the section because globals.css:153-155 rebinds
          --focus-ring to white inside it, and the trail's Home link is the only
          focusable element in this band. No light island sits inside it.

          ADOPTION DECLINED here:
          - packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`.
            Stacking an eyebrow over the card grid needs a word ("Reports") that
            is not on this page today, and owner ruling 1 forbids authoring copy
            in this port. Eyebrow IS adopted, with no new words, on
            /research/startup-formation-survival-index, where three hand-rolled
            uppercase 12px labels were eyebrows in all but name.
          - packages/web-shared/design/marketing/StatsCounter.tsx for these stat
            tiles. It takes one number and a plain-string label, renders no link
            and no markup in the label, so it would strip both the source line
            under each figure and the card's own link to the study.
          - packages/web-shared/design/primitives/NoticeCard.tsx: nothing on this
            route is an outcome card, and its only tones are slate and primary.

          ADOPTED (U2 item 1): src/components/layout/StartupsBackdrop.tsx. Its
          contrast table carries this ground: bg-primary-950 #1e1b4b composited
          with the motif at its strongest point = #28265c, white 13.80 and
          slate-300 9.29, both well past the 4.5 text floor, so the white h1 and
          the slate-300 standfirst below are unaffected. Host contract added:
          `relative overflow-hidden` on the section, `relative z-10` on the
          content. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-12 sm:py-16">
        <StartupsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "Research" }]}
          />
          <h1 className="mt-2 max-w-3xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Original UK tech startup research
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Sourced, methodology-transparent reads on UK startup funding, R&amp;D tax relief and
            company formation, built entirely from HMRC and Companies House official statistics.
            Free to read and cite with attribution.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          {/* ADOPTED: packages/web-shared/design/marketing/ScrollGlowGroup.tsx,
              a wrapper. It flips data-glow="on" when the grid is fully on
              screen; the card-glow rules U4 imported into globals.css do the
              rest. No card, href, figure or string inside it changes.
              CoverageCards stays declined for the reason already written above:
              CoverageItem (CoverageCards.tsx:5-15) has no `href` and these five
              cards ARE this route's five links to the studies. */}
          <ScrollGlowGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {reports.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className={`group rounded-2xl border border-slate-200 p-6 transition hover:border-primary-600 hover:shadow-md sm:p-8 ${focusRing}`}
              >
                <div className="text-3xl font-bold text-primary-600 sm:text-4xl">{r.stat}</div>
                <div className="mt-1 text-sm text-slate-500">{r.statLabel}</div>
                <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-primary-950">
                  {r.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{r.blurb}</p>
                <p className="mt-4 text-xs text-slate-500">Updated: {r.updated}</p>
              </Link>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>
    </div>
  );
}
