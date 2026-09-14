import type { Metadata } from "next";

import { siteContainerLg } from "@/components/ui/layout-utils";
import { HubSection, LinkCardGrid, PageHero } from "@/components/hubs/HubParts";
import { siteConfig } from "@/config/site";
import { fmtNumber, fmtGbp, type FinanceIndexSnapshot } from "@/lib/research/finance-index";
import { type SurvivalIndexSnapshot } from "@/lib/research/survival-index";
import { type ScrutinyCliffSnapshot } from "@/lib/research/scrutiny-cliff";
import { type CauseIncomeSnapshot } from "@/lib/research/cause-income";
import financeSnapshot from "@/data/uk-small-charity-finance-index.json";
import survivalSnapshot from "@/data/charity-survival-index.json";
import cliffSnapshot from "@/data/charity-scrutiny-cliff.json";
import causeSnapshot from "@/data/charity-cause-income.json";

const finance = financeSnapshot as unknown as FinanceIndexSnapshot;
const survival = survivalSnapshot as unknown as SurvivalIndexSnapshot;
const cliff = cliffSnapshot as unknown as ScrutinyCliffSnapshot;
const cause = causeSnapshot as unknown as CauseIncomeSnapshot;

const ie_cliff = cliff.cliff_edges.find((e) => e.key === "ie_gate")!;
const causeTopIncome = [...cause.cause_income].sort((a, b) => b.median_income - a.median_income)[0];

export const metadata: Metadata = {
  title: `Charity finance research and data`,
  description:
    "Original, sourced data on England and Wales charity finances, survival rates, and compliance thresholds. Built entirely from Charity Commission open data. Free to read and cite.",
  alternates: { canonical: `${siteConfig.url}/research` },
};

const reports = [
  {
    href: "/research/uk-small-charity-finance-index",
    title: "UK Small Charity Finance Index",
    blurb: `The income distribution and scrutiny-band breakdown for all ${fmtNumber(finance.charities.registered_charities)} registered England and Wales charities. Median charity income is ${fmtGbp(finance.charities.income.median)}.`,
    stat: fmtGbp(finance.charities.income.median),
    statLabel: "median charity income",
    updated: finance.meta.generated_at.slice(0, 10),
  },
  {
    href: "/research/uk-charity-survival-index",
    title: "UK Charity Survival and Longevity Index",
    blurb: `Cohort survival analysis across ${fmtNumber(survival.headline.total_removed)} removed charities. The median age at which a charity leaves the register is ${survival.headline.median_age_at_removal_years} years. Early cohorts show roughly one third survival after 40+ years.`,
    stat: `${survival.headline.median_age_at_removal_years} yrs`,
    statLabel: "median age of a charity at removal from the register",
    updated: survival.meta.generated_at.slice(0, 10),
  },
  {
    href: "/research/uk-charity-scrutiny-cliff",
    title: "Charity Scrutiny Cliff-Edge Monitor",
    blurb: `${fmtNumber(ie_cliff.charities_in_cliff)} charities sit within 10% below the £25,000 independent examination gate, which rises to £40,000 for financial years ending on or after 30 September 2026. A live count of charities approaching each statutory compliance threshold.`,
    stat: fmtNumber(ie_cliff.charities_in_cliff),
    statLabel: "charities within 10% of the independent examination gate",
    updated: cliff.meta.generated_at.slice(0, 10),
  },
  {
    href: "/research/uk-charity-cause-income",
    title: "UK Charity Cause Income and Reserves Health Index",
    blurb: `Median income and free-reserves health for every charitable cause. ${causeTopIncome.cause_label} charities report the highest median income at ${fmtGbp(causeTopIncome.median_income)}.`,
    stat: fmtGbp(causeTopIncome.median_income),
    statLabel: `highest median income by cause (${causeTopIncome.cause_label})`,
    updated: cause.meta.generated_at.slice(0, 10),
  },
];

export default function ResearchIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Charity finance research and data"
        crumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
      >
        <p>
          Original, sourced reads on England and Wales charity finances and compliance, built
          entirely from Charity Commission open data. Free to read and cite with attribution.
        </p>
      </PageHero>

      <HubSection
        eyebrow="The studies"
        // Derived from the array below, so it cannot disagree with the corpus.
        title={`${reports.length} ${reports.length === 1 ? "study" : "studies"}`}
        ground="slate"
      >
        <LinkCardGrid
          columns={3}
          clampBody={false}
          items={reports.map((r) => ({
            href: r.href,
            title: r.title,
            body: r.blurb,
            meta: `Updated ${r.updated}`,
            stat: r.stat,
            statLabel: r.statLabel,
          }))}
        />
      </HubSection>

      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900">About this data</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              All datasets on this page are compiled from the Charity Commission for England and
              Wales full-register extract, published daily under the Open Government Licence v3.0.
              Figures are updated when the pipeline is re-run against the latest extract. All data
              is free to read and cite with attribution to <strong>{siteConfig.name}</strong> and
              the Charity Commission.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Source:{" "}
              <a
                href="https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download"
                rel="noopener"
                className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
              >
                Charity Commission full-register download
              </a>{" "}
              (OGL v3.0).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
