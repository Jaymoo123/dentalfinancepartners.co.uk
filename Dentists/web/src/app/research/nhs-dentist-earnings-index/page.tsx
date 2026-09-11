import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import {
  EarningsTimeSeriesChart,
  EarningsBreakdownChart,
} from "@/components/research/DentalEarningsCharts";
import {
  ChartPanel,
  ClosingPanel,
  DataTableWrap,
  KeyFindings,
  OtherSeries,
  ReportFaqs,
  ReportHero,
  ReportSection,
  reportLink,
} from "@/components/research/report-ui";
import {
  fmtGBP,
  fmtGBPChange,
  fmtNumber,
  type DentalEarningsSnapshot,
} from "@/lib/research/dental-earnings-index";
import snapshot from "@/data/nhs-dental-earnings-index.json";

const data = snapshot as unknown as DentalEarningsSnapshot;
const { meta, headline } = data;

const PAGE_PATH = "/research/nhs-dentist-earnings-index";

/** Expenses as a share of gross, computed rather than asserted, so the sentence
 *  in the copy cannot drift away from the data when a new edition lands. */
const expenseShare =
  headline.avg_gross_earnings_england && headline.avg_expenses_england
    ? Math.round((headline.avg_expenses_england / headline.avg_gross_earnings_england) * 100)
    : null;

export const metadata: Metadata = {
  title: "NHS Dentist Earnings and Expenses Tracker",
  description: `NHS dentist average net income was ${fmtGBP(headline.avg_net_income_england)} in ${headline.reference_year}. Track gross earnings, expenses and net income for NHS dentists in England from NHS Digital open data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "NHS Dentist Earnings and Expenses Tracker | Dental Finance Partners",
    description: `NHS dentist average net income was ${fmtGBP(headline.avg_net_income_england)} in ${headline.reference_year}. Earnings, expenses and trend from NHS Digital open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: `What is the average NHS dentist salary in ${headline.reference_year}?`,
    answer:
      `NHS England Digital reports that the average income before tax for self-employed primary-care NHS dentists in England was ${fmtGBP(headline.avg_net_income_england)} in ${headline.reference_year}. This is average net income, meaning gross earnings minus expenses, before income tax and national insurance. The median net income (the midpoint, less influenced by high earners) was ${fmtGBP(headline.median_net_income_england)}. These figures cover dentists who derive the majority of their income from NHS dental contracts.`,
  },
  {
    question: "What expenses can NHS dentists deduct?",
    answer:
      "Self-employed NHS dentists can deduct legitimate business expenses from their gross earnings before calculating taxable income. Common allowable expenses include practice costs (premises, rates, utilities), clinical staff wages (nurses, receptionists), laboratory fees, equipment and instruments, professional indemnity insurance, professional body subscriptions, continuing professional development costs, clinical supplies and materials, and motor expenses for business travel. The NHS England Digital data shows average expenses of " +
      fmtGBP(headline.avg_expenses_england) +
      ` in ${headline.reference_year}, which is ${expenseShare ?? "about half"}% of average gross earnings. Associates working from a principal's practice have a different expense profile, primarily limited to indemnity, CPD and equipment they personally own.`,
  },
  {
    question: "How do NHS dentist earnings compare with private dentistry?",
    answer:
      "The NHS Digital earnings data covers only dentists earning primarily from NHS contracts. Private dental income is not captured. In practice, many dentists work in a mixed NHS and private model, and the private component can substantially increase total earnings above the NHS-only figures shown here. Some fully private dentists earn significantly more; others earn less if they are early in their career or in less affluent areas. The figures here provide a reliable NHS benchmark, not a ceiling.",
  },
  {
    question: "Are these figures for associates or principals?",
    answer:
      "The NHS Digital dataset covers all self-employed primary-care NHS dentists, including both providing-performer (principals who hold the NHS contract) and associate (performer-only) dentists. The dataset segments by Business Arrangement in its full detail, but the headline figures shown here are for all types combined. Associates typically earn less than principals because associates pay a percentage of their UDA receipts to the practice (or work on a fee-share arrangement) and do not hold the capital value of the NHS contract. Principals have higher gross earnings but also higher expenses.",
  },
  {
    question: "Where does this data come from?",
    answer:
      `The earnings and expenses figures come from the NHS England Digital Dental Earnings and Expenses Estimates publication, produced annually from HMRC self-assessment records and NHS payment data. The edition used here covers ${meta.reference_year} and was published on 30 July 2026. The data is published under the Open Government Licence v3.0. The England time series runs from ${meta.timeseries_coverage}: earlier years exist in the workbook for the UK as a whole, but England is marked 'Not applicable' before 2017/18, so no England figures are shown for those years.`,
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "NHS Dentist Earnings and Expenses Tracker",
  description:
    "Annual gross earnings, expenses and net income for self-employed NHS dentists in England, from NHS Digital open data.",
  inLanguage: "en-GB",
  datePublished: "2026-07-20",
  dateModified: meta.generated_at,
  author: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "NHS Dentist Earnings and Expenses Tracker: annual earnings data for self-employed NHS dentists",
  description: `Annual average and median gross earnings, expenses and net income before tax for self-employed primary-care NHS dentists in England, with a UK country breakdown. England time series ${meta.timeseries_coverage}, compiled from NHS England Digital open data.`,
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: "2017-04/2025-03",
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Average gross earnings, self-employed NHS primary-care dentists, England",
    "Average expenses, self-employed NHS primary-care dentists, England",
    "Average income before tax (net income), self-employed NHS primary-care dentists, England",
    "Median income before tax, self-employed NHS primary-care dentists, England",
    "Estimated dentist population, self-employed NHS primary-care dentists, England",
    "Average gross earnings by UK country (England, Scotland, Wales, Northern Ireland)",
    "Average net income by UK country",
  ],
};

const th = "py-2 pr-4 text-left text-sm font-semibold text-[var(--ink)]";
const thNum = "py-2 pr-4 text-right text-sm font-semibold text-[var(--ink)]";
const tdNum = "py-2 pr-4 text-right text-sm text-[var(--ink-soft)]";

export default function NHSDentistEarningsPage() {
  const ts = data.timeseries_england;
  const cs = data.cross_sectional_latest;
  const byCountry = cs.by_country ?? [];

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPage(faqs)) }}
      />

      <ReportHero
        crumb="NHS Dentist Earnings and Expenses Tracker"
        eyebrow="NHS Dentist Earnings and Expenses Tracker"
        title={
          <>
            NHS dentist average net income was {fmtGBP(headline.avg_net_income_england)} in{" "}
            {headline.reference_year}
          </>
        }
        intro={
          <>
            Annual gross earnings, expenses and net income for self-employed primary-care NHS
            dentists in England, from NHS England Digital. England time series{" "}
            {meta.timeseries_coverage}, published under the Open Government Licence v3.0 and free to
            cite with attribution.
          </>
        }
        stats={[
          {
            value: fmtGBP(headline.avg_net_income_england),
            label: `average net income before tax, ${headline.reference_year}`,
          },
          {
            value: fmtGBP(headline.median_net_income_england),
            label: `median net income before tax, ${headline.reference_year}`,
          },
          {
            value: fmtGBP(headline.avg_gross_earnings_england),
            label: `average gross earnings, ${headline.reference_year}`,
          },
          {
            value:
              headline.net_income_change_yoy !== null
                ? fmtGBPChange(headline.net_income_change_yoy)
                : "n/a",
            label: `change in average net income against ${headline.prior_year ?? "the prior year"}`,
          },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className={siteContainerLg}>
          <div className="max-w-4xl py-10 sm:py-14">
            <KeyFindings
              title={`Key findings (${headline.reference_year})`}
              note={
                <>
                  Source: NHS England Digital, {meta.edition}, under the Open Government Licence
                  v3.0. Figures may be cited with attribution to Dental Finance Partners.
                </>
              }
            >
              <li>
                Self-employed primary-care NHS dentists in England earned an average of{" "}
                {fmtGBP(headline.avg_gross_earnings_england)} gross in {headline.reference_year},
                with average expenses of {fmtGBP(headline.avg_expenses_england)}, leaving average
                net income before tax of{" "}
                <strong>{fmtGBP(headline.avg_net_income_england)}</strong>.
              </li>
              <li>
                Expenses ran at {expenseShare !== null ? `${expenseShare}%` : "roughly half"} of
                gross earnings. Everything after that is still before income tax and national
                insurance.
              </li>
              <li>
                The median net income was {fmtGBP(headline.median_net_income_england)}, below the
                average. A smaller number of high-earning dentists, typically principals of larger
                practices, pulls the average up, so the median is the better read for a single
                dentist.
              </li>
              {headline.net_income_change_yoy !== null && (
                <li>
                  Net income rose {fmtGBPChange(headline.net_income_change_yoy)} against{" "}
                  {headline.prior_year}, when the average was{" "}
                  {fmtGBP(headline.prior_year_avg_net_income)}.
                </li>
              )}
              <li>
                The survey covers an estimated{" "}
                {fmtNumber(headline.estimated_population_england)} NHS primary-care dentists in
                England in {headline.reference_year}.
              </li>
            </KeyFindings>

            <ReportSection id="timeseries" title={`Earnings trend: ${meta.timeseries_coverage}`}>
              <p>
                Average gross earnings, expenses and net income before tax for self-employed NHS
                dentists in England. The series starts at 2017/18 because the published UK time
                series marks England as not applicable from 2008/09 to 2016/17, so no England
                figures exist for those years. The 2020/21 figures carry NHS Covid support payments
                to dental contractors and are not comparable with the years either side of them.
              </p>
              <ChartPanel>
                <EarningsTimeSeriesChart series={ts} />
              </ChartPanel>
            </ReportSection>

            <ReportSection
              id="breakdown"
              title={`Gross earnings, expenses and net income (${headline.reference_year})`}
            >
              <p>
                The same year read as three bars. Expenses take{" "}
                {expenseShare !== null ? `${expenseShare}%` : "roughly half"} of gross earnings, and
                net income is what is left before income tax and national insurance.
              </p>
              <ChartPanel>
                <EarningsBreakdownChart series={ts} />
              </ChartPanel>
            </ReportSection>

            {byCountry.length > 0 && (
              <ReportSection
                id="by-country"
                title={`Earnings by UK country (${headline.reference_year})`}
              >
                <p>
                  Only England and Wales report a comparable all-dental-types, all-contract-types
                  figure. Scotland and Northern Ireland run different NHS contract structures and
                  are broken down on different categories in the source data, so putting them in the
                  same column would be a false comparison rather than a missing one.
                </p>
                <DataTableWrap>
                  <table className="w-full border-collapse">
                    <caption className="sr-only">
                      Average gross earnings, expenses and net income before tax by UK country,{" "}
                      {headline.reference_year}
                    </caption>
                    <thead>
                      <tr className="border-b-2 border-[var(--border)]">
                        <th scope="col" className={th}>Country</th>
                        <th scope="col" className={thNum}>Avg gross earnings</th>
                        <th scope="col" className={thNum}>Avg expenses</th>
                        <th scope="col" className={thNum}>Avg net income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {byCountry.map((row) => (
                        <tr key={row.country} className="border-b border-[var(--border)]">
                          <th scope="row" className={`${th} font-semibold`}>{row.country}</th>
                          <td className={tdNum}>{fmtGBP(row.avg_gross_earnings)}</td>
                          <td className={tdNum}>{fmtGBP(row.avg_expenses)}</td>
                          <td className={`${tdNum} font-bold text-[var(--ink)]`}>
                            {fmtGBP(row.avg_net_income)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </DataTableWrap>
              </ReportSection>
            )}

            <ReportSection id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> Figures come from the {meta.edition} publication,
                released on 30 July 2026 and produced annually from HMRC self-assessment records and
                NHS payment data. The survey covers self-employed dentists who take a significant
                proportion of their income from primary-care NHS dental contracts (GDS and PDS).
                Employed dentists, such as salaried officers in community services, are excluded.
              </p>
              <p>
                <strong>Measures.</strong> Gross earnings include all taxable income from dentistry,
                NHS and private alike. Expenses are total allowable business expenses. Income before
                tax, the net income figure used throughout this page, is gross earnings minus
                expenses, before income tax and national insurance. The publisher rounds to the
                nearest hundred pounds.
              </p>
              <p>
                <strong>Caveats.</strong> The 2020/21 figures are distorted by NHS Covid support
                payments, which paid dentists without normal activity being delivered. The dataset
                under-represents dentists working mostly in private practice. Averages are pulled by
                a small number of very high earners, which is why the median is published alongside
                them. The headline and time series are England only; the country table adds Wales.
                Generated {meta.generated_at}.
              </p>
              <ul className="not-prose mt-2 space-y-2 text-sm">
                {meta.sources.slice(0, 1).map((s) => (
                  <li key={s.name}>
                    <a href={s.publication_page} className={reportLink} rel="nofollow">
                      {s.name}
                    </a>{" "}
                    <span className="text-[var(--muted)]">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link
                  href={`${PAGE_PATH}/data`}
                  className={reportLink}
                  data-cta="research_data_download"
                  data-cta-placement="research_report"
                  data-cta-goal="content"
                >
                  Download the earnings time series (CSV)
                </Link>
              </p>
              <p className="text-sm text-[var(--muted)]">
                Free to cite and republish with attribution to Dental Finance Partners. This page is
                a data summary and does not constitute tax or financial advice on any individual
                situation.
              </p>
            </ReportSection>

            <ClosingPanel heading="Making the most of your dental earnings">
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                A benchmark only tells you where you sit. What you keep depends on structure,
                expenses claimed, pension treatment and how income is drawn. Whether you are an
                associate comparing yourself with the national average, a principal reviewing
                extraction, or a buyer reading goodwill against income, that is the work. We act for
                dental professionals only.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link
                  href="/for-associates"
                  className={reportLink}
                  data-cta="research_pillar_link"
                  data-cta-placement="research_report"
                  data-cta-goal="content"
                >
                  Tax for associate dentists
                </Link>
                <Link
                  href="/for-principals"
                  className={reportLink}
                  data-cta="research_pillar_link"
                  data-cta-placement="research_report"
                  data-cta-goal="content"
                >
                  Practice principal finance
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Speak to a dental accountant" />
              </div>
            </ClosingPanel>

            <OtherSeries current={PAGE_PATH} />

            <ReportFaqs faqs={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
