import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import {
  NationalActivityChart,
  RecoveryIndexChart,
  RegionalRecoveryChart,
} from "@/components/research/DentalActivityCharts";
import {
  ChartPanel,
  ClosingPanel,
  KeyFindings,
  OtherSeries,
  ReportFaqs,
  ReportHero,
  ReportSection,
  reportLink,
} from "@/components/research/report-ui";
import {
  fmtNumber,
  fmtIndex,
  fmtPercent,
  monthLabel,
  type DentalActivitySnapshot,
} from "@/lib/research/dental-activity-index";
import snapshot from "@/data/nhs-dental-activity-index.json";

const data = snapshot as unknown as DentalActivitySnapshot;
const { meta, headline, series } = data;

const PAGE_PATH = "/research/nhs-dental-activity-index";

export const metadata: Metadata = {
  title: "NHS Dental Activity Recovery Index",
  description: `Track monthly NHS dental UDA delivery and recovery vs the pre-Covid 2019/20 baseline. England national and regional data from NHSBSA open data. Settled to ${monthLabel(meta.last_settled_month)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "NHS Dental Activity Recovery Index | Dental Finance Partners",
    description: "Monthly NHS dental UDA delivery and regional recovery index from NHSBSA open data.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the NHS Dental Activity Recovery Index?",
    answer:
      "The Recovery Index measures how much NHS dental activity (in Units of Dental Activity, or UDAs) England delivers each month compared with the pre-Covid average of 2019/20, which is set to 100. A reading of 80 means activity is 20% below the pre-Covid level; a reading above 100 means the area has surpassed it. The index is compiled from NHSBSA English Contractor Monthly General Dental Activity open data, covering all NHS GDS and PDS contracts in England.",
  },
  {
    question: "What is a Unit of Dental Activity (UDA)?",
    answer:
      "A UDA is the unit used to measure and pay for NHS dental treatment under GDS and PDS contracts. Band 1 treatments (a check-up or simple scale and polish) are worth 1 UDA; Band 2 treatments (fillings, extractions) are worth 3 UDAs; Band 3 treatments (crowns, dentures) are worth 12 UDAs. Urgent treatment is also worth 1.2 UDAs. Dentists are paid a set amount per UDA under their contract value, so UDA delivery is the primary measure of NHS dental output.",
  },
  {
    question: "Why did NHS dental activity fall so sharply in 2020?",
    answer:
      "NHS dental practices were closed for routine treatment from late March 2020 due to Covid-19 restrictions. When practices reopened from June 2020 they operated under infection control guidance (including fallow times between aerosol-generating procedures) that significantly reduced the number of patients that could be seen. Activity remained suppressed throughout 2020 and 2021 before recovering in 2022. The UDA contract model meant dentists received NHS income without delivering activity during the closures, which created significant catch-up demand.",
  },
  {
    question: "Which ICB areas deliver the most NHS dental activity?",
    answer:
      "Per-ICB recovery indices cannot be calculated from public NHSBSA data because ICB boundaries changed in 2022 and no pre-2022 per-ICB baseline is available. The regional chart on this page instead ranks commissioner areas by UDA volume over the trailing twelve settled months. Greater Manchester, North East and North Cumbria, and Cheshire and Merseyside are the highest-volume ICBs. Areas with fewer contracted NHS dentists relative to population deliver lower total UDA volumes, which is the clearest public-data measure of relative NHS dental capacity.",
  },
  {
    question: "What does this mean for NHS dentists' finances?",
    answer:
      "UDA delivery directly drives NHS contract income. Dentists who consistently under-deliver against their UDA target face clawback of NHS income at year end. Those who over-deliver are paid only for the contracted UDA value and not the excess. Alongside NHS income, many associate dentists and principals earn private income that is not captured in this data. Understanding the UDA landscape helps dentists and practice principals model their NHS income, plan capacity, and consider the balance between NHS and private activity.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "NHS Dental Activity Recovery Index",
  description:
    "Monthly NHS dental UDA delivery and recovery vs the pre-Covid 2019/20 baseline, by England and by ICB region.",
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
  name: "NHS Dental Activity Recovery Index: monthly UDA delivery and recovery vs 2019/20 baseline",
  description:
    "Monthly NHS dental Units of Dental Activity (UDA) delivered in England, with a Recovery Index benchmarked against the pre-Covid 2019/20 average (= 100). National and ICB-level series compiled from NHSBSA English Contractor Monthly General Dental Activity open data.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: meta.coverage,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Monthly NHS dental UDAs delivered, England national",
    "Monthly NHS dental courses of treatment (COT), England national",
    "Monthly Band 1 courses, England national",
    "Monthly Band 2 courses, England national",
    "Monthly Band 3 courses, England national",
    "Monthly urgent treatment courses, England national",
    "Recovery Index vs 2019/20 baseline (100 = pre-Covid level)",
    "Annual UDA delivery by ICB commissioner, England regional",
  ],
};

export default function NHSDentalActivityIndexPage() {
  const lastMonth = headline.last_settled_month;
  const recovIdx = headline.last_month_recovery_index;
  const firstMonth = series.national[0].month;

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
        crumb="NHS Dental Activity Recovery Index"
        eyebrow="NHS Dental Activity Recovery Index"
        title="NHS dental activity, month by month, against the pre-Covid baseline"
        intro={
          <>
            A monthly index of NHS dental UDA delivery in England, benchmarked against the 2019/20
            average set to 100. National and ICB-level figures from NHSBSA open data, settled to{" "}
            {monthLabel(lastMonth)}
            {meta.provisional_months.length > 0
              ? `, with ${monthLabel(meta.latest_month)} charted as provisional and excluded from every figure below`
              : ""}
            .
          </>
        }
        stats={[
          {
            value: fmtNumber(headline.last_month_uda),
            label: `UDAs delivered in ${monthLabel(lastMonth)}`,
          },
          {
            value: fmtIndex(recovIdx),
            label: "Recovery Index, where 100 is the 2019/20 pre-Covid baseline",
          },
          {
            value: `${headline.months_below_90}`,
            label: `months below 90 on the Recovery Index since ${monthLabel(firstMonth)}`,
          },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className={siteContainerLg}>
          <div className="max-w-4xl py-10 sm:py-14">
            <KeyFindings
              note={
                <>
                  Source: NHSBSA English Contractor Monthly General Dental Activity, under the Open
                  Government Licence v3.0. Figures may be cited with attribution to Dental Finance
                  Partners.
                </>
              }
            >
              <li>
                NHS dental activity in England reached a Recovery Index of{" "}
                <strong>{fmtIndex(recovIdx)}</strong> in {monthLabel(lastMonth)}, meaning delivery
                was{" "}
                {recovIdx !== null && recovIdx < 100
                  ? `${fmtIndex(100 - recovIdx)} points below`
                  : recovIdx !== null
                  ? `${fmtIndex(recovIdx - 100)} points above`
                  : "at"}{" "}
                the pre-Covid 2019/20 monthly average.
              </li>
              <li>
                The pre-Covid monthly baseline is{" "}
                <strong>{fmtNumber(headline.baseline_monthly_avg_uda)}</strong> UDAs across all
                England NHS dental contracts, the mean month of April 2019 to March 2020. That
                baseline is the 100 in the index.
              </li>
              {headline.yoy_pct_uda !== null && (
                <li>
                  UDA delivery is <strong>{fmtPercent(headline.yoy_pct_uda)}</strong> year on year.{" "}
                  {headline.yoy_basis}
                </li>
              )}
              <li>
                <strong>{headline.months_below_90}</strong> of the{" "}
                {series.national.length} months in the series since {monthLabel(firstMonth)} sit
                below 90 on the index, which is the scale of the gap the recovery had to close.
              </li>
              <li>
                Per-ICB recovery indices cannot be calculated from public data. ICB boundaries
                changed in 2022, so no pre-2022 per-ICB baseline exists. The regional chart below
                shows trailing-twelve-month UDA volume by ICB instead, which is the measure the
                published data can actually support.
              </li>
            </KeyFindings>

            <ReportSection id="national" title="National monthly UDA delivery">
              <p>
                Total NHS dental UDAs delivered per month across all NHS contracts in England. The
                collapse in 2020 is practice closures and restricted capacity during the Covid-19
                pandemic; 2021 and 2022 are the climb back.
              </p>
              <ChartPanel>
                <NationalActivityChart monthly={series.national} />
              </ChartPanel>
            </ReportSection>

            <ReportSection id="recovery" title="Recovery Index against the 2019/20 baseline">
              <p>
                The Recovery Index expresses monthly UDA delivery as a percentage of the average
                month of 2019/20 (April 2019 to March 2020, the last full NHS year before Covid),
                which is set to 100. A value of 80 means the month delivered 80% of the pre-Covid
                average; a value above 100 means delivery has passed it. The dashed line marks the
                baseline.
              </p>
              <ChartPanel>
                <RecoveryIndexChart monthly={series.national} />
              </ChartPanel>
            </ReportSection>

            <ReportSection id="regional" title="UDA volume by ICB commissioner area">
              <p>
                The chart ranks the twenty largest of the {series.regional.length} ICB commissioner
                areas by contracted UDA volume over the trailing twelve settled months (
                {monthLabel(meta.regional_window[0])} to {monthLabel(meta.regional_window[1])}). A
                per-ICB recovery index against a 2019/20 baseline cannot be built from public data,
                because ICB boundaries changed in 2022 and the pre-change areas do not map onto the
                current ones. Volume is what the data supports, and it is the clearest public
                measure of relative NHS dental capacity by area.
              </p>
              <ChartPanel>
                <RegionalRecoveryChart regional={series.regional} />
              </ChartPanel>
            </ReportSection>

            <ReportSection id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> All UDA and course-of-treatment counts come from the
                NHSBSA English Contractor Monthly General Dental Activity dataset, published monthly
                on the NHSBSA open data portal. Each monthly CSV covers every NHS GDS and PDS dental
                contract in England, one row per contract per month, under the Open Government
                Licence v3.0.
              </p>
              <p>
                <strong>Recovery Index.</strong> The baseline is the mean monthly UDA total for
                April 2019 to March 2020 (NHS financial year 2019/20), which is{" "}
                {fmtNumber(headline.baseline_monthly_avg_uda)} UDAs. Each month&apos;s index is that
                month&apos;s UDA total divided by the baseline, times 100. 100 means delivery
                matches the pre-Covid average; below 100 is under-recovery.
              </p>
              <p>
                <strong>Regional series.</strong> Regional figures aggregate UDA volume per ICB
                commissioner across the trailing twelve settled months (
                {monthLabel(meta.regional_window[0])} to {monthLabel(meta.regional_window[1])});
                provisional in-year months are excluded. ICB boundaries changed in 2022 (from CCG to
                ICB), so no consistent pre-2022 per-ICB baseline exists and no per-ICB recovery
                index is published here.
              </p>
              <p>
                <strong>Caveats.</strong> UDA counts measure contracted NHS activity only, so
                private dental work is outside them entirely. The 2020/21 year is not comparable
                with any other, because of mandatory closures. Months can be revised for late
                submissions. The series is settled to {monthLabel(meta.last_settled_month)}; any
                later month comes from the NHSBSA in-year file, is flagged provisional in the data,
                and is excluded from every headline figure. Courses of treatment sum the Band 1,
                Band 2, Band 3 and urgent bands; NHSBSA reported Band 2 as one column to March 2023
                and as 2A, 2B and 2C from April 2023, and both forms are read. Generated{" "}
                {meta.generated_at}.
              </p>
              <ul className="not-prose mt-2 space-y-2 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.portal} className={reportLink} rel="nofollow">
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
                  Download the activity data (CSV)
                </Link>
              </p>
              <p className="text-sm text-[var(--muted)]">
                Free to cite and republish with attribution to Dental Finance Partners. This page is
                a data summary and does not constitute financial or business advice on any
                individual practice or contract.
              </p>
            </ReportSection>

            <ClosingPanel heading="Understanding your NHS contract and UDA position">
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                UDA delivery is the mechanism that turns clinical time into NHS income, and the
                clawback rules mean under-delivery and over-delivery are not symmetrical. Whether
                you are an associate weighing a UDA commitment, a principal valuing a contract, or a
                buyer pricing a practice, this is the number the rest of the model sits on. Our
                dental accountants work exclusively with dental professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link
                  href="/for-principals"
                  className={reportLink}
                  data-cta="research_pillar_link"
                  data-cta-placement="research_report"
                  data-cta-goal="content"
                >
                  For practice principals
                </Link>
                <Link
                  href="/for-associates"
                  className={reportLink}
                  data-cta="research_pillar_link"
                  data-cta-placement="research_report"
                  data-cta-goal="content"
                >
                  For associate dentists
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
