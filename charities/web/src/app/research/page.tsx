import type { Metadata } from "next";
import Link from "next/link";

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
  title: `Charity finance research and data | ${siteConfig.name}`,
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
    blurb: `${fmtNumber(ie_cliff.charities_in_cliff)} charities sit within 10% below the £25,000 independent examination gate. A live count of charities approaching each statutory compliance threshold.`,
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
      <main>
        <section className="bg-[var(--brand-primary)] py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Charity finance research and data
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              Original, sourced reads on England and Wales charity finances and compliance, built
              entirely from Charity Commission open data. Free to read and cite with attribution.
            </p>
          </div>
        </section>

        <section className="bg-white py-10 sm:py-14">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group rounded-2xl border border-[var(--border)] p-6 transition hover:border-[var(--brand-primary)] hover:shadow-md sm:p-8"
                >
                  <div className="text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">
                    {r.stat}
                  </div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{r.statLabel}</div>
                  <h2 className="mt-5 text-xl font-bold text-[var(--ink)] group-hover:text-[var(--brand-primary)]">
                    {r.title}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{r.blurb}</p>
                  <p className="mt-4 text-xs text-[var(--muted)]">Updated {r.updated}</p>
                </Link>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[var(--ink)]">About this data</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                All datasets on this page are compiled from the Charity Commission for England and
                Wales full-register extract, published daily under the Open Government Licence v3.0.
                Figures are updated when the pipeline is re-run against the latest extract. All data
                is free to read and cite with attribution to{" "}
                <strong>{siteConfig.name}</strong> and the Charity Commission.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                Source:{" "}
                <a
                  href="https://register-of-charities.charitycommission.gov.uk/en/register/full-register-download"
                  rel="noopener"
                  className="text-[var(--brand-primary)] underline"
                >
                  Charity Commission full-register download
                </a>{" "}
                (OGL v3.0).
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
