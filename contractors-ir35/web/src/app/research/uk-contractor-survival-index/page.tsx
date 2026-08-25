import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import {
  buildArticleJsonLd,
  buildDatasetJsonLd,
  buildFaqJsonLd,
} from "@/lib/schema";
import { SurvivalCurveChart, OneYearTrendChart } from "@/components/research/SurvivalIndexCharts";
import {
  fmtNumber,
  fmtPct,
  fmtPointsDiff,
  type ContractorSurvivalIndexSnapshot,
} from "@/lib/research/contractor-survival-index";
import snapshot from "@/data/uk-contractor-survival-index.json";

const data = snapshot as unknown as ContractorSurvivalIndexSnapshot;
const { meta, headline, cohorts, groups } = data;

const PAGE_PATH = "/research/uk-contractor-survival-index";

const latestCohort = cohorts.find((c) => c.birth_year === headline.latest_5yr_cohort_year) ?? cohorts[0];

const HEADLINE_SENTENCE = `${fmtPct(headline.latest_5yr_contractor_pct)} of contractor-sector businesses born in ${headline.latest_5yr_cohort_year} were still active five years later`;

export const metadata: Metadata = {
  title: { absolute: "UK Contractor Survival Index | How long do contractor businesses last? | Contractor Tax Accountants" },
  description: `${HEADLINE_SENTENCE}, against a ${fmtPct(headline.latest_5yr_all_industries_pct)} all-industries average. A sourced survival curve compiled from ONS Business Demography data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Contractor Survival Index | Contractor Tax Accountants",
    description: `${HEADLINE_SENTENCE}. Contractor-sector business survival rates from ONS official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the UK Contractor Survival Index measure?",
    answer:
      "It tracks cohorts of newly-born enterprises (businesses registered for VAT or PAYE in a given year) in the three SIC 2007 groups closest to contracting, group 62 (computer programming, consultancy and related activities), group 70 (activities of head offices and management consultancy) and group 71 (architectural and engineering activities and technical testing), and measures what percentage are still active 1, 2, 3, 4 and 5 years later. The data comes from the Office for National Statistics (ONS) Business Demography release. Each birth-year cohort is tracked independently, so the most recent cohorts only have 1 or 2 years of survival data published so far.",
  },
  {
    question: "Why use SIC groups 62, 70 and 71 as a contractor proxy rather than exact SIC codes?",
    answer:
      "The ONS survival tables only break results down to 2-digit SIC group level (occasionally 3-digit), not the specific 5-digit codes this site's UK Contractor Index tracks (62020, 70229, 71121 and 71122 among them). Group 62, 70 and 71 are the closest available match, but they are broader: group 62 includes games studios and software product companies alongside IT consultancies, group 70 includes PR and communications firms alongside management consultants, and group 71 includes architecture practices alongside engineering consultancies. Read the survival figures as directionally representative of the contractor-heavy part of the economy, not as an exact PSC survival rate.",
  },
  {
    question: "How can contracting businesses survive at roughly the all-industries rate when they are mostly one-person companies?",
    answer:
      "The all-industries comparator in this dataset covers every registered enterprise in the UK, from single-person consultancies to large manufacturers, so it is a genuinely broad baseline, not a small-business benchmark. Contractor SIC groups track close to that baseline through most of the curve, running slightly behind on the 5-year figure. A single-director personal service company can close for reasons that have nothing to do with financial distress, most commonly the contractor returning to permanent employment, retiring, or simply not renewing the company once a contract ends, so 'survival' here should not be read as a proxy for business failure alone.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "The Business Demography release from the Office for National Statistics (ONS), specifically Table 5.2a to 5.2e, 'Survival of newly born enterprises, SIC 2007 group.' It is published under the Open Government Licence v3.0 and updated annually, typically in November. Figures are control-rounded to the base 5 by ONS before publication.",
  },
  {
    question: "Does this mean my contracting business is likely to survive?",
    answer:
      "The survival rates are averages across broad SIC groups and say nothing about any individual business. What is within a contractor's control is the practical side, keeping on top of IR35 status, claiming the expenses you are entitled to, and structuring salary and dividends efficiently, all of which affect how resilient a personal service company is through a quiet patch between contracts. Our take-home calculators show what you would actually keep, inside or outside IR35, on current rates.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD (Article + Dataset + FAQPage via shared schema helpers)
// ---------------------------------------------------------------------------

const articleJsonLd = buildArticleJsonLd({
  headline: "UK Contractor Survival Index",
  description: `${HEADLINE_SENTENCE}, tracked from ONS Business Demography open data.`,
  url: `${siteConfig.url}${PAGE_PATH}`,
  datePublished: "2026-07-23",
  dateModified: meta.generated_at,
});

const datasetJsonLd = buildDatasetJsonLd({
  name: "UK Contractor Survival Index: enterprise survival rates by birth-year cohort",
  description:
    "1-to-5-year survival rates for UK contractor-sector enterprises (SIC groups 62, 70 and 71) by birth-year cohort, compared against the all-industries UK average, compiled from ONS Business Demography data.",
  url: `${siteConfig.url}${PAGE_PATH}`,
  csvUrl: `${siteConfig.url}${PAGE_PATH}/data`,
  dateModified: meta.generated_at,
  temporalCoverage: `${cohorts[0]?.birth_year}/${cohorts.at(-1)?.birth_year}`,
  variableMeasured: [
    "1-to-5-year enterprise survival rate -- contractor SIC groups (62, 70, 71) combined",
    "1-to-5-year enterprise survival rate -- all industries (comparison baseline)",
    "1-to-5-year enterprise survival rate -- each contractor SIC group individually",
  ],
});

const faqJsonLd = buildFaqJsonLd(faqs);

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

export default function UKContractorSurvivalIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Contractor Survival Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-cyan-300">
            UK Contractor Survival Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            How long UK contractor-sector businesses actually last, tracked cohort by cohort from
            ONS Business Demography data, and compared against the all-industries UK average.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtPct(headline.latest_5yr_contractor_pct)}
              label={`of contractor-sector businesses born in ${headline.latest_5yr_cohort_year} survived 5 years`}
            />
            <Stat
              value={fmtPointsDiff(headline.latest_5yr_contractor_pct, headline.latest_5yr_all_industries_pct)}
              label="vs the all-industries 5-year survival rate"
            />
            <Stat
              value={fmtPct(headline.latest_1yr_contractor_pct)}
              label={`survived their first year (${headline.latest_1yr_cohort_year} cohort, most recent data)`}
            />
            <Stat
              value={fmtNumber(latestCohort?.contractor.births ?? null)}
              label={`new contractor-sector enterprises born in ${latestCohort?.birth_year}`}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key facts */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-cyan-900">Key facts</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  Of the {fmtNumber(latestCohort?.contractor.births ?? null)} contractor-sector
                  enterprises born in {headline.latest_5yr_cohort_year},{" "}
                  {fmtPct(headline.latest_5yr_contractor_pct)} were still active five years later,
                  against a {fmtPct(headline.latest_5yr_all_industries_pct)} average across all UK
                  industries.
                </li>
                <li>
                  {fmtPct(headline.latest_1yr_contractor_pct)} of the {headline.latest_1yr_cohort_year} cohort
                  survived their first year, {fmtPointsDiff(headline.latest_1yr_contractor_pct, headline.latest_1yr_all_industries_pct)}{" "}
                  against the {fmtPct(headline.latest_1yr_all_industries_pct)} all-industries figure.
                </li>
                <li>
                  Survival tracks closely against the all-industries baseline through the first
                  few years, then falls slightly behind it by year 5, a{" "}
                  {fmtPointsDiff(headline.latest_5yr_contractor_pct, headline.latest_5yr_all_industries_pct)}{" "}
                  gap in the {headline.latest_5yr_cohort_year} cohort.
                </li>
                <li>
                  The three contractor SIC groups do not move identically: see the breakdown table
                  below for group 62 (IT), 70 (management consultancy) and 71 (engineering)
                  individually.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Office for National Statistics, Business Demography (Table 5.2a-5.2e),
                under the Open Government Licence v3.0. Figures may be cited with attribution to
                Contractor Tax Accountants.
              </p>
            </div>

            <Section id="curve" title={`The survival curve: ${headline.latest_5yr_cohort_year} birth cohort`}>
              <p>
                Of every 100 contractor-sector enterprises that started trading in{" "}
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
                cohorts have fewer years of data available; blank cells mean that survival year
                has not yet elapsed and ONS has not yet published it. Figures are the combined
                contractor SIC group (62, 70 and 71 births and survivors summed before dividing).
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
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtNumber(c.contractor.births)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtPct(c.contractor.y1_pct)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtPct(c.contractor.y2_pct)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtPct(c.contractor.y3_pct)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtPct(c.contractor.y4_pct)}</td>
                        <td className="py-2 text-right font-semibold text-cyan-700">{fmtPct(c.contractor.y5_pct)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                Row-by-row figures are for the combined contractor SIC group. The all-industries
                comparison figures are in the CSV download below.
              </p>
            </Section>

            <Section id="trend" title="1-year survival rate over time">
              <p>
                The one figure available for every cohort in the series is 1-year survival. It has
                stayed above 94% in every birth-year cohort published so far, with no clear
                deterioration through the post-pandemic and cost-inflation period.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <OneYearTrendChart cohorts={cohorts} />
              </div>
            </Section>

            <Section id="groups" title="By contractor SIC group">
              <p>
                The three groups behind the combined figure, for the {headline.latest_5yr_cohort_year} birth
                cohort (the most recent with a full 5-year curve).
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">SIC group</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900">What it covers</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">Births ({headline.latest_5yr_cohort_year})</th>
                      <th className="py-2 font-bold text-neutral-900 text-right">5yr survival</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((g) => {
                      const c = g.cohorts.find((row) => row.birth_year === headline.latest_5yr_cohort_year);
                      return (
                        <tr key={g.sic_group} className="border-b border-neutral-200">
                          <td className="py-2 pr-4 font-semibold text-neutral-900">{g.sic_group}</td>
                          <td className="py-2 pr-4 text-neutral-700">{g.label}</td>
                          <td className="py-2 pr-4 text-right text-neutral-900">{fmtNumber(c?.births ?? null)}</td>
                          <td className="py-2 text-right font-semibold text-cyan-700">{fmtPct(c?.y5_pct ?? null)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> The Office for National Statistics (ONS) Business
                Demography release tracks &quot;enterprises&quot;, businesses registered for VAT or
                PAYE, from the year they are first active (&quot;born&quot;). Each birth-year
                cohort is followed for up to five years, and Table 5.2a to 5.2e report the count
                and percentage still active at each anniversary, broken down by SIC 2007 group. We
                use groups 62, 70 and 71, the closest match to the SIC codes used in our UK
                Contractor Index.
              </p>
              <p>
                <strong>Combined figure.</strong> The &quot;contractor&quot; series sums raw births
                and survivor counts across groups 62, 70 and 71 before dividing, so it is an exact
                weighted figure across the three groups, not an average of three percentages.
              </p>
              <p>
                <strong>Enterprise, not company.</strong> This is a different unit and a different
                source to our UK Contractor Index and UK Contractor Insolvency Index, which both
                track Companies House limited companies specifically. The ONS enterprise measure
                is broader: it includes sole traders and partnerships registered for VAT or PAYE as
                well as limited companies. The datasets should not be combined into a single
                figure.
              </p>
              <p>
                <strong>Caveats.</strong> Figures are control-rounded to the base 5 by ONS.
                &quot;Survival&quot; means the enterprise is still active in the ONS
                Inter-Departmental Business Register; it does not mean the business is profitable,
                growing, or trading under the same name or ownership. SIC groups 62, 70 and 71 are
                broader than the exact contractor SIC codes tracked elsewhere on this site, so
                figures here include some non-contractor businesses within the same groups. More
                recent birth-year cohorts have fewer years of survival data published, purely
                because less time has elapsed since they were born, not because of any data gap.
              </p>
              <p>
                <strong>Updated.</strong> Table 5.2a-5.2e was last published {meta.release_date}.
                Data generated {meta.generated_at}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} className="font-semibold text-cyan-800 hover:text-cyan-900" rel="nofollow">
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-cyan-800 hover:text-cyan-900">
                  Download the survival data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Contractor Tax Accountants. This
                page is a data summary and does not constitute tax or business advice on any
                individual situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-cyan-900 sm:text-3xl">
                Starting or running a contracting business? Get your tax position right from day one.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Survival averages are no guarantee for any individual business, but getting your
                IR35 status, expenses and salary and dividend split right protects the cash your
                company needs between contracts. Our calculators show what you would actually
                keep, inside or outside IR35, on 2026/27 rates.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/calculators/outside-ir35-take-home-calculator" className="text-cyan-800 hover:text-cyan-900">
                  Outside IR35 take-home calculator &rarr;
                </Link>
                <Link href="/calculators/inside-ir35-take-home-calculator" className="text-cyan-800 hover:text-cyan-900">
                  Inside IR35 take-home calculator &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get a free IR35 review" />
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
