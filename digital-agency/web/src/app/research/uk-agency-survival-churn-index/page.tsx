import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/ui/CTASection";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { BarChart, LineChart, CHART_COLORS } from "@/components/research/Charts";
import {
  fmtNumber,
  fmtPct,
  fmtPointsDiff,
  type SurvivalIndexSnapshot,
} from "@/lib/research/survival-index";
import snapshot from "@/data/uk-agency-survival-churn-index.json";

const data = snapshot as unknown as SurvivalIndexSnapshot;
const { meta, headline, cohorts } = data;

const PAGE_PATH = "/research/uk-agency-survival-churn-index";

const cohort2019 = cohorts.find((c) => c.birth_year === headline.latest_5yr_cohort_year) ?? cohorts[0];

const HEADLINE_SENTENCE = `${fmtPct(headline.latest_5yr_agency_pct)} of UK agencies founded in ${headline.latest_5yr_cohort_year} were still active five years later`;

export const metadata: Metadata = {
  title: "UK Agency Survival & Churn Index | How long do agencies last? | Agency Founder Finance",
  description: `${HEADLINE_SENTENCE}, against a ${fmtPct(headline.latest_5yr_all_industries_pct)} all-industries average. A sourced survival curve for advertising, market research, design and IT-consultancy agencies, compiled from ONS Business Demography data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Agency Survival & Churn Index | Agency Founder Finance",
    description: `${HEADLINE_SENTENCE}. Agency survival rates from ONS official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    q: "What does the UK Agency Survival & Churn Index measure?",
    a: "It tracks cohorts of newly-born UK enterprises (businesses registered for VAT or PAYE in a given year) in the agency-isolable SIC groups: 731 (advertising, including media representation), 732 (market research), 741 (specialised design) and 620 (computer programming and IT consultancy), and measures what percentage are still active 1, 2, 3, 4 and 5 years later. The data comes from ONS Business Demography Tables 5.2a-5.2e. Each birth-year cohort is tracked independently, so the most recent cohorts only have 1 or 2 years of survival data published so far.",
  },
  {
    q: "Why is the combined agency survival rate below the all-industries average?",
    a: `The combined agency curve is a weighted figure across four very differently-sized groups, and IT consultancy (SIC 620) is by far the largest, ${fmtNumber(cohort2019.it_consultancy.births)} of the ${fmtNumber(cohort2019.agency_combined.births)} agency-cluster births in the ${headline.latest_5yr_cohort_year} cohort. IT consultancy's own 5-year survival rate (${fmtPct(headline.latest_5yr_it_consultancy_pct)}) sits below the all-industries average and pulls the combined figure down with it, even though advertising (${fmtPct(headline.latest_5yr_advertising_pct)}), market research (${fmtPct(headline.latest_5yr_market_research_pct)}) and design (${fmtPct(headline.latest_5yr_design_pct)}) each individually beat the all-industries average on their own.`,
  },
  {
    q: "Can public relations agencies be measured separately?",
    a: "Not with this ONS release. SIC 70210 (public relations and communications activities) sits inside the 3-digit ONS group 702 (management consultancy activities) alongside general management consultants, and ONS does not publish a finer split in the Business Demography survival tables. Because management consultancy births vastly outnumber PR agency births, that group is reported as context only and deliberately excluded from the combined agency curve here, rather than diluting a genuine agency figure with an unrelated population.",
  },
  {
    q: "Is this the same as the UK Agency Insolvency Index?",
    a: "No, they measure different things from different sources. This survival index tracks the share of a whole birth-year cohort of ONS-defined 'enterprises' (which includes sole traders and partnerships, not just limited companies) still active at each anniversary, for any reason a business might close. The Agency Insolvency Index counts formal insolvency events among Companies House limited companies specifically. A sector can have a high number of insolvencies and a middling survival rate at the same time: insolvency is only one route out of the population this index tracks.",
  },
  {
    q: "Where does this data come from?",
    a: "The Business Demography release from the Office for National Statistics (ONS), specifically Tables 5.2a to 5.2e, 'Survival of newly born enterprises, Standard Industrial Classification (SIC2007) group.' It is published under the Open Government Licence v3.0 and updated annually, typically in November. Figures are control-rounded to base 5 by ONS before publication.",
  },
  {
    q: "Does this mean my agency is likely to survive?",
    a: "The survival rates are averages across the whole SIC group and say nothing about any individual business. Survival depends heavily on factors this dataset cannot see, including cash-flow management, client concentration, pricing discipline and how a founder draws money from the business, exactly the areas where an agency-specialist accountant adds the most value. Our team works with agency founders on the practical side of that.",
  },
];

const datasetSchema = buildDataset({
  name: "UK Agency Survival & Churn Index: enterprise survival rates by birth-year cohort",
  description:
    "1-to-5-year survival rates for UK advertising, market research, specialised design and IT-consultancy enterprises by birth-year cohort, compared against the all-industries UK average, compiled from ONS Business Demography data.",
  path: PAGE_PATH,
  distributionPath: `${PAGE_PATH}/data`,
  dateModified: meta.pull_date,
  temporalCoverage: `${cohorts[0]?.birth_year}/${cohorts.at(-1)?.birth_year}`,
  keywords: ["agency survival rate", "agency business failure", "how long do agencies last", "creative agency churn"],
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  spatialCoverage: "United Kingdom",
});

const faqSchema = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="text-3xl font-bold text-indigo-600 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

const SEGMENT_ROWS = [
  { key: "advertising" as const, label: "Advertising (SIC 731, incl. media representation)" },
  { key: "market_research" as const, label: "Market research (SIC 732)" },
  { key: "design" as const, label: "Specialised design (SIC 741)" },
  { key: "it_consultancy" as const, label: "IT consultancy (SIC 620)" },
];

export default function UkAgencySurvivalChurnIndexPage() {
  const curveData = [0, 1, 2, 3, 4, 5].map((y) => ({
    tick: `Year ${y}`,
    agency: y === 0 ? 100 : cohort2019.agency_combined[`y${y}_pct` as "y1_pct"],
    all_industries: y === 0 ? 100 : cohort2019.all_industries[`y${y}_pct` as "y1_pct"],
  }));

  const oneYearTrend = cohorts.map((c) => ({
    label: String(c.birth_year),
    value: c.agency_combined.y1_pct ?? 0,
  }));

  return (
    <>
      <JsonLd data={faqSchema ? [datasetSchema, faqSchema] : [datasetSchema]} />

      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research", href: "/research" }, { label: "UK Agency Survival & Churn Index" }]} />

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Flagship research · UK Agency Survival &amp; Churn Index</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">{HEADLINE_SENTENCE}</h1>
          <p className="mt-4 text-lg text-slate-700">
            How long UK marketing, creative, advertising and digital agencies actually last, tracked cohort by cohort
            from ONS Business Demography data, and compared against the all-industries UK average.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat
            value={fmtPct(headline.latest_5yr_agency_pct)}
            label={`of agencies born in ${headline.latest_5yr_cohort_year} survived 5 years`}
          />
          <Stat
            value={fmtPointsDiff(headline.latest_5yr_agency_pct, headline.latest_5yr_all_industries_pct)}
            label="vs the all-industries 5-year survival rate"
          />
          <Stat
            value={fmtPct(headline.latest_1yr_agency_pct)}
            label={`survived their first year (${headline.latest_1yr_cohort_year} cohort, most recent data)`}
          />
          <Stat value={fmtNumber(headline.agency_combined_births_2019)} label={`new agency-cluster enterprises born in ${headline.latest_5yr_cohort_year}`} />
        </div>

        <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-indigo-900">Key findings</h2>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-800">
            <li>
              Of the {fmtNumber(headline.agency_combined_births_2019)} agency-cluster enterprises born in{" "}
              {headline.latest_5yr_cohort_year}, only {fmtPct(headline.latest_5yr_agency_pct)} were still active five
              years later, roughly {Math.round(100 - (headline.latest_5yr_agency_pct ?? 0))} in every 100 had closed,
              against a {fmtPct(headline.latest_5yr_all_industries_pct)} average across all UK industries.
            </li>
            <li>
              That combined figure hides a wide spread. Advertising ({fmtPct(headline.latest_5yr_advertising_pct)}),
              market research ({fmtPct(headline.latest_5yr_market_research_pct)}) and specialised design (
              {fmtPct(headline.latest_5yr_design_pct)}) each individually beat the all-industries average, but IT
              consultancy ({fmtPct(headline.latest_5yr_it_consultancy_pct)}), the largest segment by far, sits below it
              and pulls the weighted combined figure down.
            </li>
            <li>
              Public relations (SIC 70210) cannot be measured separately in this release: it sits inside a broader
              management-consultancy ONS group and is excluded from the combined figure rather than diluting it with
              an unrelated population (see methodology below).
            </li>
            <li>
              {fmtPct(headline.latest_1yr_agency_pct)} of the {headline.latest_1yr_cohort_year} cohort survived their
              first year, in line with the {fmtPct(headline.latest_1yr_all_industries_pct)} all-industries figure. The
              first year is where agencies and the wider economy look most alike; the gap opens up from year 2 onwards.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Source: Office for National Statistics, Business Demography (Tables 5.2a-5.2e), under the Open Government
            Licence v3.0. Figures may be cited with attribution to Agency Founder Finance.
          </p>
        </div>

        <Section id="curve" title={`The survival curve: ${headline.latest_5yr_cohort_year} birth cohort`}>
          <p>
            Of every 100 agency-cluster enterprises that started trading in {headline.latest_5yr_cohort_year}, the
            chart tracks how many were still active at each anniversary, against the same measure for all UK
            industries combined.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
            <LineChart
              points={curveData}
              series={[
                { key: "agency", label: "Agency cluster (731+732+741+620)", color: CHART_COLORS.primary },
                { key: "all_industries", label: "All industries", color: CHART_COLORS.muted, dashed: true },
              ]}
              yDomain={[0, 100]}
              yUnit="percent"
            />
          </div>
        </Section>

        <Section id="segments" title="Survival by agency segment">
          <p>
            Each row is a different agency-isolable SIC group, tracked against the {headline.latest_5yr_cohort_year}{" "}
            birth cohort. IT consultancy is by far the largest segment by births, which is why it dominates the
            combined weighted figure above.
          </p>
          <div className="not-prose mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">Segment</th>
                  <th className="py-2 pr-4 font-bold text-slate-900 text-right">{headline.latest_5yr_cohort_year} births</th>
                  <th className="py-2 pr-4 font-bold text-slate-900 text-right">1yr</th>
                  <th className="py-2 pr-4 font-bold text-slate-900 text-right">3yr</th>
                  <th className="py-2 font-bold text-slate-900 text-right">5yr</th>
                </tr>
              </thead>
              <tbody>
                {SEGMENT_ROWS.map((s) => {
                  const c = cohort2019[s.key];
                  return (
                    <tr key={s.key} className="border-b border-slate-200">
                      <td className="py-2 pr-4 font-semibold text-slate-900">{s.label}</td>
                      <td className="py-2 pr-4 text-right text-slate-900">{fmtNumber(c.births)}</td>
                      <td className="py-2 pr-4 text-right text-slate-900">{fmtPct(c.y1_pct)}</td>
                      <td className="py-2 pr-4 text-right text-slate-900">{fmtPct(c.y3_pct)}</td>
                      <td className="py-2 text-right font-semibold text-indigo-700">{fmtPct(c.y5_pct)}</td>
                    </tr>
                  );
                })}
                <tr className="border-b border-slate-300">
                  <td className="py-2 pr-4 font-bold text-indigo-700">Agency combined (weighted union)</td>
                  <td className="py-2 pr-4 text-right font-bold text-indigo-700">{fmtNumber(cohort2019.agency_combined.births)}</td>
                  <td className="py-2 pr-4 text-right font-bold text-indigo-700">{fmtPct(cohort2019.agency_combined.y1_pct)}</td>
                  <td className="py-2 pr-4 text-right font-bold text-indigo-700">{fmtPct(cohort2019.agency_combined.y3_pct)}</td>
                  <td className="py-2 text-right font-bold text-indigo-700">{fmtPct(cohort2019.agency_combined.y5_pct)}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-500">All UK industries</td>
                  <td className="py-2 pr-4 text-right text-slate-500">{fmtNumber(cohort2019.all_industries.births)}</td>
                  <td className="py-2 pr-4 text-right text-slate-500">{fmtPct(cohort2019.all_industries.y1_pct)}</td>
                  <td className="py-2 pr-4 text-right text-slate-500">{fmtPct(cohort2019.all_industries.y3_pct)}</td>
                  <td className="py-2 text-right text-slate-500">{fmtPct(cohort2019.all_industries.y5_pct)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="trend" title="1-year survival rate over time">
          <p>
            The one figure available for every cohort in the series is 1-year survival for the combined agency
            cluster, tracked across all five published birth-year cohorts.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
            <BarChart data={oneYearTrend} valueSuffix="%" />
          </div>
        </Section>

        <Section id="methodology" title="Methodology and sources">
          <p>{meta.methodology}</p>
          <p>
            <strong>Enterprise, not company.</strong> This is a different unit and a different source to our UK
            Agency Formation Index and UK Agency Insolvency Index, which both track Companies House limited
            companies specifically. The ONS enterprise measure is broader: it includes sole traders and partnerships
            registered for VAT or PAYE as well as limited companies. The datasets are not directly comparable and
            should not be combined into a single figure.
          </p>
          <p className="font-semibold text-slate-900">Caveats</p>
          <ul className="list-disc space-y-2 pl-6">
            {meta.caveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <p>
            <strong>Updated.</strong> Tables 5.2a-5.2e were last published {meta.source.release_date}. Data generated{" "}
            {meta.pull_date}.
          </p>
          <p className="text-sm">
            <a href={meta.source.url} className="font-semibold text-indigo-700 hover:text-indigo-800" rel="nofollow">
              {meta.source.name}
            </a>{" "}
            <span className="text-slate-500">({meta.source.publisher})</span>
          </p>
          <p className="text-sm">
            <Link href={`${PAGE_PATH}/data`} className="font-semibold text-indigo-700 hover:text-indigo-800">
              Download the survival data (CSV)
            </Link>
          </p>
          <p className="text-sm text-slate-500">
            Free to cite and republish with attribution to Agency Founder Finance. This page is a data summary and
            does not constitute tax or business advice on any individual situation.
          </p>
        </Section>

        <div className="mt-10">
          <CTASection
            title="Starting or running an agency? Get your financial foundations right from year one."
            description="Survival averages are no guarantee for any individual agency, but cash-flow discipline, sensible salary and dividend planning, and a clear read on your margins are all within your control. Book a free health check with an agency specialist accountant."
            primaryHref="/free-health-check"
            primaryLabel="Get a free agency finance health check"
            secondaryHref="/for-new-founders"
            secondaryLabel="For new agency founders"
          />
        </div>

        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="border-l-4 border-slate-300 bg-white p-6 transition-all hover:border-indigo-600">
                <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
