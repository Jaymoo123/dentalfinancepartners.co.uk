import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { Stat, Section } from "@/components/research/ResearchLayout";
import { VerticalBarChart } from "@/components/research/Charts";
import { fmtNumber, fmtPercent, fmtPct1, monthLabel } from "@/lib/research/format";
import type { SmeBarometerSnapshot } from "@/lib/research/sme-barometer";
import snapshot from "@/data/uk-small-business-barometer.json";

const data = snapshot as unknown as SmeBarometerSnapshot;
const { meta, headline, register, insolvency, survival, population } = data;

const PAGE_PATH = "/research/uk-small-business-barometer";

const HEADLINE_SENTENCE = `${fmtNumber(headline.incorporations.incorporations_fye)} new UK companies were incorporated in the year to ${monthLabel(headline.incorporations.as_of)}, against ${fmtNumber(headline.incorporations.dissolutions_fye)} dissolutions`;

export const metadata: Metadata = {
  title: "State of UK Small Business Barometer 2026 | Holloway Davies",
  description: `${HEADLINE_SENTENCE}. Fusing Companies House formations, Insolvency Service data, and ONS survival and population statistics into one all-sector UK SME barometer. Free to cite.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "State of UK Small Business Barometer | Holloway Davies",
    description: HEADLINE_SENTENCE,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the State of UK Small Business Barometer?",
    answer:
      "It is a quarterly-refreshed, all-sector barometer that fuses four national UK series into one read on small business conditions: Companies House company formations and dissolutions, Insolvency Service company insolvency statistics, ONS Business Demography survival rates, and ONS/DBT Business Population Estimates. Unlike a single-sector index, it covers the whole UK economy, every SIC section, every legal structure.",
  },
  {
    question: "Is the number of UK businesses growing or shrinking?",
    answer: `The UK private sector business population stood at ${fmtNumber(population.timeseries.at(-1)?.total)} at the start of ${headline.population.as_of_start_year}, up ${fmtPercent(headline.population.yoy_pct)} on the year before. Growth has been positive most years since 2010, though the population fell in 2021 to 2023 following the pandemic before recovering. Company incorporations are still comfortably outpacing dissolutions nationally, but the gap has narrowed.`,
  },
  {
    question: "What share of UK businesses are small or medium-sized?",
    answer: `${fmtPct1(headline.population.sme_pct)} of UK private sector businesses are SMEs (fewer than 250 employees) by the official Business Population Estimates definition. ${fmtPct1(headline.population.no_employees_pct)} employ nobody except the owner. Large businesses with 250 or more employees are a small fraction of the total business count, though they employ a disproportionate share of the workforce.`,
  },
  {
    question: "How many UK businesses survive five years?",
    answer: `Of the enterprises born in ${headline.survival.latest_5yr_cohort_year} (the most recent birth-year cohort with a full five-year track record), ${fmtPct1(headline.survival.latest_5yr_pct)} were still active five years later, according to ONS Business Demography. Survival drops off fastest in the first year or two; a large majority of businesses that fail do so early.`,
  },
  {
    question: "Which sectors have the most company insolvencies?",
    answer:
      "See our companion page, the UK Sector Insolvency League, which ranks every SIC section by trailing 12-month company insolvencies. Construction, wholesale and retail, and accommodation and food service consistently rank highest by volume, though that partly reflects the size of those sectors, not just their riskiness.",
  },
  {
    question: "Where does this data come from and how often is it updated?",
    answer:
      "Every figure is drawn directly from official UK government statistics: Companies House quarterly official statistics (Incorporated companies in the UK), The Insolvency Service's monthly Company Insolvency Statistics, and ONS/DBT's Business Demography and Business Population Estimates releases. All are published under the Open Government Licence v3.0. We refresh this barometer as each new release lands: monthly for insolvencies, quarterly for company formations, annually for survival and population.",
  },
];

export default function UkSmallBusinessBarometerPage() {
  const dataset = buildDataset({
    name: "State of UK Small Business Barometer",
    description:
      "Fused national UK series: company formations and dissolutions (Companies House), company insolvencies (Insolvency Service), business survival rates and business population (ONS/DBT). All-sector, all UK.",
    path: PAGE_PATH,
    distributionPath: `${PAGE_PATH}/data`,
    dateModified: meta.generated_at,
    temporalCoverage: "2010/2026",
    keywords: [
      "UK small business statistics",
      "company insolvencies UK",
      "company formations UK",
      "business survival rate UK",
      "UK business population",
      "SME statistics",
    ],
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    spatialCoverage: "United Kingdom",
  });
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  const annualInsolvency = insolvency.annual
    .filter((r) => r.year < 2026)
    .map((r) => ({ label: String(r.year), value: r.total }));

  const registerByYear = (() => {
    const byYear = new Map<string, { inc: number; diss: number }>();
    for (const q of register.quarterly) {
      const y = q.quarter_end.slice(0, 4);
      const cur = byYear.get(y) ?? { inc: 0, diss: 0 };
      cur.inc += q.incorporations;
      cur.diss += q.dissolutions;
      byYear.set(y, cur);
    }
    return Array.from(byYear.entries())
      .slice(0, -1) // drop the in-progress current year (partial)
      .map(([y, v]) => ({ label: y, value: v.inc, secondaryValue: v.diss }));
  })();

  const survivalCurve = survival.cohorts
    .filter((c) => c.y5_pct !== null)
    .slice(-1)
    .flatMap((c) => [
      { label: "1 yr", value: c.y1_pct ?? 0 },
      { label: "2 yr", value: c.y2_pct ?? 0 },
      { label: "3 yr", value: c.y3_pct ?? 0 },
      { label: "4 yr", value: c.y4_pct ?? 0 },
      { label: "5 yr", value: c.y5_pct ?? 0 },
    ]);

  const populationSeries = population.timeseries.map((r) => ({ label: String(r.year).slice(2), value: r.total }));

  return (
    <>
      <JsonLd data={faqPage ? [dataset, faqPage] : [dataset]} />

      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "State of UK Small Business" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            State of UK Small Business Barometer
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            The all-sector, all-UK read on small business conditions, fusing Companies House
            formations, Insolvency Service insolvencies, and ONS/DBT survival and population data
            into one quarterly barometer. Updated {monthLabel(headline.insolvency.last_settled_month)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtNumber(headline.incorporations.incorporations_fye)}
              label={`new company incorporations, ${headline.incorporations.fye_label}`}
            />
            <Stat
              value={fmtPercent(headline.incorporations.register_yoy_pct)}
              label="growth in the UK company register, year on year"
            />
            <Stat
              value={fmtNumber(headline.insolvency.ttm_total)}
              label="company insolvencies, trailing 12 months (England and Wales)"
            />
            <Stat
              value={fmtPct1(headline.population.sme_pct)}
              label={`of ${fmtNumber(headline.population.total_businesses)} UK businesses are SMEs`}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            <div className="rounded-2xl border border-orange-500/20 bg-orange-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-orange-800">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  {fmtNumber(headline.incorporations.incorporations_fye)} new companies were
                  incorporated across the UK in the year to {monthLabel(headline.incorporations.as_of)},
                  up {fmtPercent(headline.incorporations.incorporations_yoy_pct)} year on year, against{" "}
                  {fmtNumber(headline.incorporations.dissolutions_fye)} dissolutions, up{" "}
                  {fmtPercent(headline.incorporations.dissolutions_yoy_pct)}. Britain is still starting
                  companies faster than it closes them, but dissolutions are growing faster than
                  formations, narrowing the gap.
                </li>
                <li>
                  The effective UK company register stood at{" "}
                  {fmtNumber(headline.incorporations.register_effective)} companies as of{" "}
                  {monthLabel(headline.incorporations.as_of)}, growth of{" "}
                  {fmtPercent(headline.incorporations.register_yoy_pct)} on the year.
                </li>
                <li>
                  {fmtNumber(headline.insolvency.ttm_total)} companies entered insolvency across
                  England and Wales in the 12 months to {monthLabel(headline.insolvency.last_settled_month)}.{" "}
                  {fmtPct1(headline.insolvency.cvl_pct_ttm)} of these were Creditors&apos; Voluntary
                  Liquidations, directors choosing to wind up voluntarily rather than a bank or
                  creditor forcing the issue through the courts, the clearest signal of owner-led
                  distress rather than external pressure.
                </li>
                <li>
                  Of businesses born in {headline.survival.latest_5yr_cohort_year}, only{" "}
                  {fmtPct1(headline.survival.latest_5yr_pct)} were still trading five years later.
                  The UK private sector counted {fmtNumber(headline.population.total_businesses)}{" "}
                  businesses at the start of {headline.population.as_of_start_year}, up{" "}
                  {fmtPercent(headline.population.yoy_pct)} ({fmtNumber(headline.population.yoy_abs)}{" "}
                  more) on the year before.
                </li>
                <li>
                  {fmtPct1(headline.population.sole_proprietorships_pct)} of UK businesses are sole
                  proprietorships, {fmtPct1(headline.population.companies_pct)} are companies, and{" "}
                  {fmtPct1(headline.population.partnerships_pct)} are ordinary partnerships.{" "}
                  {fmtPct1(headline.population.no_employees_pct)} employ nobody but the owner.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Sources: Companies House, The Insolvency Service, Office for National Statistics /
                Department for Business and Trade, all under the Open Government Licence v3.0. Free
                to cite with attribution to Holloway Davies.
              </p>
            </div>

            <Section id="formations" title="Company formations vs dissolutions">
              <p>
                Each pair of bars shows new company incorporations (orange) against dissolutions
                (grey) for that calendar year, UK-wide. The gap between the two is the net growth
                in the company register.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <VerticalBarChart
                  data={registerByYear}
                  seriesLabels={["Incorporations", "Dissolutions"]}
                />
              </div>
              <p className="text-sm text-neutral-600">
                Formations peak in {register.seasonality.slice().sort((a, b) => b.avg_incorporations - a.avg_incorporations)[0]?.calendar_quarter}{" "}
                on average, the busiest quarter for new company registrations across the period
                covered.
              </p>
            </Section>

            <Section id="insolvency" title="Company insolvencies, all sectors">
              <p>
                Total registered company insolvencies by year, England and Wales, all SIC sections
                combined (2026 year to date excluded as a partial year). See the{" "}
                <Link href="/research/uk-sector-insolvency-league" className="font-semibold text-orange-700 hover:text-orange-800">
                  UK Sector Insolvency League
                </Link>{" "}
                for the sector-by-sector breakdown.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <VerticalBarChart data={annualInsolvency} />
              </div>
            </Section>

            <Section id="survival" title="How many new businesses survive?">
              <p>
                Survival rate of the {headline.survival.latest_5yr_cohort_year} birth-year cohort of UK
                enterprises, tracked for five years by ONS Business Demography. Attrition is steepest
                in year one; survivors of the first two years have a much better chance of lasting
                the full five.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <VerticalBarChart data={survivalCurve} format="percent" />
              </div>
            </Section>

            <Section id="population" title="The UK business population, 2010 to present">
              <p>
                Total UK private sector business count at the start of each year, from ONS/DBT
                Business Population Estimates. The population dipped through the pandemic years
                before recovering to a new high.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <VerticalBarChart data={populationSeries} />
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Company formations and dissolutions.</strong> Companies House&apos;s
                quarterly official statistics release, &quot;Incorporated companies in the UK&quot;,
                UK-wide, all corporate body types classed &quot;All companies&quot;.
              </p>
              <p>
                <strong>Company insolvencies.</strong> The Insolvency Service&apos;s monthly Company
                Insolvency Statistics, all-sector totals and procedure mix (Tables A1a and 1b).
                Coverage is England and Wales only; Scotland and Northern Ireland insolvencies are
                published separately and are not included here.
              </p>
              <p>
                <strong>Survival.</strong> ONS Business Demography Table 4.2, the &quot;Total&quot; row
                (all industries), tracking each birth-year cohort of enterprises for up to five years.
              </p>
              <p>
                <strong>Population.</strong> ONS/DBT Business Population Estimates, the headline UK
                private sector business count, legal-status split, and employment size bands.
              </p>
              <p>
                <strong>Caveats.</strong> Insolvency counts are gross registered events, not rates
                against the number of active companies, so sector or year-on-year comparisons should
                account for the size of the underlying population. The 2026 calendar year is partial
                and excluded from annual bar charts. Company register figures are UK-wide; insolvency
                figures are England and Wales only, a difference in geographic coverage that this
                page states throughout.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.release_page} className="font-semibold text-orange-700 hover:text-orange-800" rel="nofollow">
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher}{s.coverage ? `, ${s.coverage}` : ""})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-orange-700 hover:text-orange-800">
                  Download the barometer data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Holloway Davies. This page is a data
                summary and does not constitute financial, tax or business advice for any individual
                situation.
              </p>
            </Section>

            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Running a small business in a tightening market?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Rising insolvencies and narrowing formation growth mean cash flow, tax planning and
                structure decisions matter more, not less. Holloway Davies works with UK limited
                companies, contractors, sole traders and partnerships on exactly these questions.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/services" className="text-orange-700 hover:text-orange-800">
                  View our services &rarr;
                </Link>
                <Link href="/free-health-check" className="text-orange-700 hover:text-orange-800">
                  Free business health check &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Speak to an accountant" />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Frequently asked questions</h2>
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
