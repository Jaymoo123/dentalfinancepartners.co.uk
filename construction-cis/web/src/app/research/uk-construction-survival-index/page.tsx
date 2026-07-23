import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { SurvivalCurveChart, OneYearTrendChart } from "@/components/research/SurvivalIndexCharts";
import {
  fmtNumber,
  fmtPct,
  fmtPointsDiff,
  type SurvivalIndexSnapshot,
} from "@/lib/research/survival-index";
import snapshot from "@/data/construction-survival-index.json";

const data = snapshot as unknown as SurvivalIndexSnapshot;
const { meta, headline, cohorts } = data;

const PAGE_PATH = "/research/uk-construction-survival-index";

const latestCohort = cohorts.find((c) => c.birth_year === headline.latest_5yr_cohort_year) ?? cohorts[0];

const HEADLINE_SENTENCE = `${fmtPct(headline.latest_5yr_construction_pct)} of construction companies founded in ${headline.latest_5yr_cohort_year} were still active five years later`;

export const metadata: Metadata = {
  title: "UK Construction Survival Index | How long do construction companies last? | Trade Tax Specialists",
  description: `${HEADLINE_SENTENCE}, ahead of the ${fmtPct(headline.latest_5yr_all_industries_pct)} all-industries average. A sourced survival curve compiled from ONS Business Demography data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Construction Survival Index | Trade Tax Specialists",
    description: `${HEADLINE_SENTENCE}. Construction company survival rates from ONS official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the UK Construction Survival Index measure?",
    answer:
      "It tracks cohorts of newly-born construction enterprises (businesses registered for VAT or PAYE in a given year) and measures what percentage are still active 1, 2, 3, 4 and 5 years later. The data comes from the Office for National Statistics (ONS) Business Demography release, which assigns each enterprise to a broad industry group; Construction aligns to SIC 2007 Section F. Each birth-year cohort is tracked independently, so the most recent cohorts only have 1 or 2 years of survival data published so far.",
  },
  {
    question: "How can construction companies survive longer than average when the sector has the most insolvencies?",
    answer:
      "These are two different measurements of two different things, and both are true at once. The Insolvency Service data (see our UK Construction Insolvency Index) counts formal insolvency events among registered companies, and construction has by far the largest number of active companies of any sector, so it naturally produces the largest number of insolvency events in absolute terms. The ONS survival data measures the proportion of each year's new business cohort that is still trading at all, for any reason for closure, not only insolvency, across a much broader 'enterprise' population that includes sole traders and partnerships as well as companies. A sector can have a high count of insolvencies and a comparatively strong survival rate simultaneously if its overall population is large and its closure rate (voluntary closure, retirement, merger, as well as insolvency) is not unusually high relative to other sectors.",
  },
  {
    question: "Why might construction businesses survive at an above-average rate?",
    answer:
      "The data does not identify a single cause, but plausible contributing factors include steady underlying demand for repair, maintenance and improvement work that continues even when new-build activity slows, low barriers to continuing as a sole trader or small limited company once trade contacts and a client base are established, and the fact that many construction businesses are single-person or small-team operations with low fixed overheads, which makes them more resilient to a slow month or a late-paying client than a business with a large fixed cost base.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "The Business Demography release from the Office for National Statistics (ONS), specifically Table 4.2, 'Survival of newly born enterprises, broad industry group.' It is published under the Open Government Licence v3.0 and updated annually, typically in November. Figures are control-rounded to the base 5 by ONS before publication.",
  },
  {
    question: "Does this mean my construction business is likely to survive?",
    answer:
      "The survival rates are averages across the whole Construction broad industry group and say nothing about any individual business. Survival depends heavily on factors this dataset cannot see, including how well cash flow, retentions and late payment are managed, which is exactly where a CIS subcontractor or contractor's own tax and financial position matters most. Our team works with construction businesses on the practical side of that, from CIS refunds and Gross Payment Status through to Self Assessment and structure decisions.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Construction Survival Index",
  description: `${HEADLINE_SENTENCE}, tracked from ONS Business Demography open data.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-23",
  dateModified: meta.generated_at,
  author: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteConfig.url}${PAGE_PATH}`,
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Construction Survival Index: enterprise survival rates by birth-year cohort",
  description:
    "1-to-5-year survival rates for UK construction-sector enterprises by birth-year cohort, compared against the all-industries UK average, compiled from ONS Business Demography data.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: `${cohorts[0]?.birth_year}/${cohorts.at(-1)?.birth_year}`,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "1-year enterprise survival rate -- Construction",
    "2-year enterprise survival rate -- Construction",
    "3-year enterprise survival rate -- Construction",
    "4-year enterprise survival rate -- Construction",
    "5-year enterprise survival rate -- Construction",
    "1-to-5-year enterprise survival rate -- all industries (comparison baseline)",
  ],
};

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-neutral-300">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-neutral-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export default function UKConstructionSurvivalIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Construction Survival Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Construction Survival Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            How long UK construction businesses actually last, tracked cohort by cohort from ONS
            Business Demography data, and compared against the all-industries UK average.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtPct(headline.latest_5yr_construction_pct)}
              label={`of construction businesses born in ${headline.latest_5yr_cohort_year} survived 5 years`}
            />
            <Stat
              value={fmtPointsDiff(headline.latest_5yr_construction_pct, headline.latest_5yr_all_industries_pct)}
              label="vs the all-industries 5-year survival rate"
            />
            <Stat
              value={fmtPct(headline.latest_1yr_construction_pct)}
              label={`survived their first year (${headline.latest_1yr_cohort_year} cohort, most recent data)`}
            />
            <Stat
              value={fmtNumber(latestCohort?.construction.births ?? null)}
              label={`new construction enterprises born in ${latestCohort?.birth_year}`}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key findings */}
            <div className="rounded-2xl border border-orange-500/20 bg-orange-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-orange-800">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  Of the {fmtNumber(latestCohort?.construction.births ?? null)} construction
                  enterprises born in {headline.latest_5yr_cohort_year},{" "}
                  {fmtPct(headline.latest_5yr_construction_pct)} were still active five years
                  later, against a {fmtPct(headline.latest_5yr_all_industries_pct)} average across
                  all UK industries.
                </li>
                <li>
                  Construction&apos;s survival advantage widens the longer a business has been
                  trading: at year 2 the gap over the all-industries average is under 1 percentage
                  point in most cohorts, but by year 5 it has grown to roughly{" "}
                  {fmtPointsDiff(headline.latest_5yr_construction_pct, headline.latest_5yr_all_industries_pct)}.
                </li>
                <li>
                  This holds despite construction being consistently the sector with the largest
                  number of company insolvencies in the UK (see our{" "}
                  <Link href="/research/uk-construction-insolvency-index" className="font-semibold text-orange-700 hover:text-orange-800">
                    UK Construction Insolvency Index
                  </Link>
                  ): the two measures track different things, a formal insolvency event among
                  registered companies versus the share of a whole year&apos;s new-business cohort
                  still trading at all.
                </li>
                <li>
                  {fmtPct(headline.latest_1yr_construction_pct)} of the {headline.latest_1yr_cohort_year} cohort
                  survived their first year, in line with the {fmtPct(headline.latest_1yr_all_industries_pct)} all-industries
                  figure. The first year is where construction and the wider economy are most alike; the gap opens up from year 2 onwards.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Office for National Statistics, Business Demography (Table 4.2), under the
                Open Government Licence v3.0. Figures may be cited with attribution to Trade Tax
                Specialists.
              </p>
            </div>

            <Section id="curve" title={`The survival curve: ${headline.latest_5yr_cohort_year} birth cohort`}>
              <p>
                Of every 100 construction enterprises that started trading in{" "}
                {headline.latest_5yr_cohort_year}, the chart tracks how many were still active at
                each anniversary, against the same measure for all UK industries combined.
              </p>
              {latestCohort && (
                <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                  <SurvivalCurveChart cohort={latestCohort} />
                </div>
              )}
            </Section>

            <Section id="cohorts" title="Survival by birth-year cohort">
              <p>
                Each row is a different birth-year cohort, tracked independently. More recent
                cohorts have fewer years of data available; blank cells mean that survival year has
                not yet elapsed and ONS has not yet published it.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Birth year</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">Births</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">1yr</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">2yr</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">3yr</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">4yr</th>
                      <th className="py-2 font-bold text-neutral-900 text-right">5yr</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohorts.map((c) => (
                      <tr key={c.birth_year} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 font-semibold text-neutral-900">{c.birth_year}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtNumber(c.construction.births)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtPct(c.construction.y1_pct)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtPct(c.construction.y2_pct)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtPct(c.construction.y3_pct)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtPct(c.construction.y4_pct)}</td>
                        <td className="py-2 text-right font-semibold text-orange-700">{fmtPct(c.construction.y5_pct)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                Row-by-row figures are for Construction only. The all-industries comparison figures
                are in the CSV download below.
              </p>
            </Section>

            <Section id="trend" title="1-year survival rate over time">
              <p>
                The one figure available for every cohort in the series is 1-year survival. It has
                stayed in a narrow band, between 93 and 95%, across all five birth-year cohorts
                published so far, showing no clear deterioration even through the post-pandemic and
                cost-inflation period.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <OneYearTrendChart cohorts={cohorts} />
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> The Office for National Statistics (ONS) Business
                Demography release tracks &quot;enterprises&quot;, businesses registered for VAT or
                PAYE, from the year they are first active (&quot;born&quot;). Each birth-year cohort
                is followed for up to five years, and Table 4.2 reports the count and percentage
                still active at each anniversary, broken down by broad industry group. Construction
                aligns to SIC 2007 Section F.
              </p>
              <p>
                <strong>Enterprise, not company.</strong> This is a different unit and a different
                source to our UK Construction Index and UK Construction Insolvency Index, which
                both track Companies House limited companies specifically. The ONS enterprise
                measure is broader: it includes sole traders and partnerships registered for VAT or
                PAYE as well as limited companies. The two datasets are not directly comparable and
                should not be combined into a single figure.
              </p>
              <p>
                <strong>Caveats.</strong> Figures are control-rounded to the base 5 by ONS.
                &quot;Survival&quot; means the enterprise is still active in the ONS Inter-Departmental
                Business Register; it does not mean the business is profitable, growing, or trading
                under the same name or ownership. More recent birth-year cohorts have fewer years
                of survival data published, purely because less time has elapsed since they were
                born, not because of any data gap.
              </p>
              <p>
                <strong>Updated.</strong> Table 4.2 was last published {meta.release_date}. Data
                generated {meta.generated_at}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.release_page}
                      className="font-semibold text-orange-700 hover:text-orange-800"
                      rel="nofollow"
                    >
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link
                  href={`${PAGE_PATH}/data`}
                  className="font-semibold text-orange-700 hover:text-orange-800"
                >
                  Download the survival data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Trade Tax Specialists. This page is a
                data summary and does not constitute tax or business advice on any individual
                situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Starting or running a construction business? Get your tax position right from day one.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Survival averages are no guarantee for any individual business, but cash flow
                discipline is one of the few factors within your control. Getting CIS deductions,
                Gross Payment Status and your Self Assessment right protects the cash your business
                needs to see out the years where survival rates matter most.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/calculators/cis-refund-estimator"
                  className="text-orange-700 hover:text-orange-800"
                >
                  CIS refund estimator &rarr;
                </Link>
                <Link
                  href="/calculators/cis-gps-eligibility-checker"
                  className="text-orange-700 hover:text-orange-800"
                >
                  GPS eligibility checker &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get a free CIS review" />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
