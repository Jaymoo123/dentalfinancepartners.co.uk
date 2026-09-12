import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import {
  MonthlyFormationChart,
  AnnualFormationChart,
  SeasonalityChart,
  type SeasonalityPoint,
} from "@/components/research/DentalFormationCharts";
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
  fmtPercent,
  monthLabel,
  type DentalCompanyFormationSnapshot,
} from "@/lib/research/dental-company-formation-index";
import snapshot from "@/data/dental-company-formation-index.json";

const data = snapshot as unknown as DentalCompanyFormationSnapshot;
const { meta, headline, incorporations } = data;

const PAGE_PATH = "/research/dental-company-formation-index";

// ---------------------------------------------------------------------------
// Seasonality, derived from the committed monthly series.
//
// Two figures on this page are computed here rather than asserted: the average
// month-by-month profile the chart draws, and how many complete calendar years
// actually peak in March. The page used to say the March spike appeared "across
// all years"; the committed data does not support that, so the sentence now
// states the count the data gives and recomputes it when the data changes.
// ---------------------------------------------------------------------------
const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const SEASONALITY_FROM = 2016;
const SEASONALITY_TO = 2025;

const settledMonths = incorporations.monthly.filter(
  (row) => !meta.provisional_months.includes(row.month),
);

const seasonalityData: SeasonalityPoint[] = (() => {
  const sums: number[] = Array(12).fill(0);
  const counts: number[] = Array(12).fill(0);
  for (const row of settledMonths) {
    const year = Number(row.month.slice(0, 4));
    if (year < SEASONALITY_FROM || year > SEASONALITY_TO) continue;
    const mi = Number(row.month.slice(5, 7)) - 1;
    sums[mi] += Number(row["86230"] ?? 0);
    counts[mi]++;
  }
  return sums.map((s, i) => ({
    month: MONTH_SHORT[i],
    avg: counts[i] > 0 ? Math.round(s / counts[i]) : 0,
    isMarch: i === 2,
  }));
})();

const monthlyAverage = Math.round(
  seasonalityData.reduce((sum, d) => sum + d.avg, 0) / seasonalityData.length,
);
const marchAverage = seasonalityData[2].avg;
const lowestMonth = seasonalityData.reduce((lo, d) => (d.avg < lo.avg ? d : lo));

/** Complete calendar years in the settled series, and how many of them peak in
 *  March. Both numbers are counted, not stated. */
const { completeYears, marchPeakYears } = (() => {
  const byYear = new Map<number, Map<number, number>>();
  for (const row of settledMonths) {
    const year = Number(row.month.slice(0, 4));
    if (year < SEASONALITY_FROM || year > SEASONALITY_TO) continue;
    const months = byYear.get(year) ?? new Map<number, number>();
    months.set(Number(row.month.slice(5, 7)), Number(row["86230"] ?? 0));
    byYear.set(year, months);
  }
  let complete = 0;
  let march = 0;
  for (const months of byYear.values()) {
    if (months.size < 12) continue;
    complete++;
    const peak = [...months.entries()].reduce((hi, e) => (e[1] > hi[1] ? e : hi));
    if (peak[0] === 3) march++;
  }
  return { completeYears: complete, marchPeakYears: march };
})();

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const { decade } = headline;

export const metadata: Metadata = {
  title: "Dental Company Formation Index (SIC 86230)",
  description: `New dental company incorporations (SIC 86230) rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}. Monthly index compiled from Companies House open data. Updated ${monthLabel(meta.incorporations_settled_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "Dental Company Formation Index | Dental Finance Partners",
    description: "Monthly dental company incorporations (SIC 86230) from Companies House open data.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the Dental Company Formation Index measure?",
    answer:
      "It counts the number of new limited companies incorporated each month under SIC code 86230 (General dental practice activities) from the Companies House public register. It is a leading indicator of growth in the limited company dental sector, covering NHS, mixed, and private dental practices. Counts are gross: companies that have since been dissolved remain on the register, so there is no survivorship bias.",
  },
  {
    question: "Why are more dentists incorporating as limited companies?",
    answer:
      "Operating through a limited company can be more tax-efficient than sole-trader or partnership status at higher income levels. A dental company can pay a small salary plus dividends, potentially reducing income tax and National Insurance compared with being taxed entirely on self-employment income. The rise in dental company formations also reflects new practice ownership, associate dentists stepping up to principals, and practice acquisitions structured through holding companies.",
  },
  {
    question: "Is there a March peak in dental company formations?",
    answer:
      `March is the busiest month on average across ${SEASONALITY_FROM} to ${SEASONALITY_TO}, at ${marchAverage} formations against a monthly average of ${monthlyAverage}, and it is the peak month in ${marchPeakYears} of the ${completeYears} complete years in that window. March falls just before the UK tax year ends on 5 April, and a dentist who incorporates before 6 April can open the company accounting period at the start of the new tax year. The pattern is a strong tendency in the data rather than a rule that holds every year.`,
  },
  {
    question: "Where does this data come from?",
    answer:
      "All incorporation counts come from the Companies House Advanced Search API, which is the UK's official register of companies. The data is published under the Open Government Licence v3.0. The figures are updated monthly as Companies House releases new records. The most recent two months are provisional due to an indexing lag in the Companies House database.",
  },
  {
    question: "How does incorporating help with dental practice tax planning?",
    answer:
      "A dental limited company is subject to Corporation Tax on its profits (currently 25% for profits above the main rate threshold, or 19% for small profits). The principal can then draw a combination of salary and dividends, which is often more tax-efficient than paying income tax and Class 4 National Insurance on the full profit as a sole trader. Associates and principals should model their own position: the right structure depends on income level, plans for retained earnings, and NHS contract arrangements. Our dental accountants can prepare a personal tax comparison.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Dental Company Formation Index (SIC 86230)",
  description: `Monthly dental company incorporations from Companies House open data. ${fmtNumber(headline.dental_cos_ttm)} dental companies formed in the trailing 12 months.`,
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
  name: "Dental Company Formation Index: monthly dental company incorporations (SIC 86230)",
  description:
    "Monthly counts of newly incorporated UK dental limited companies under SIC code 86230 (General dental practice activities), compiled from Companies House public records.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: `${incorporations.monthly[0]?.month ?? ""}/${meta.incorporations_settled_through}`,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Monthly new UK dental company incorporations (SIC 86230)",
    "Annual new UK dental company incorporations",
  ],
};

export default function DentalCompanyFormationIndexPage() {
  const settledThrough = meta.incorporations_settled_through;
  const firstMonth = incorporations.monthly[0]?.month;

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
        crumb="Dental Company Formation Index"
        eyebrow="Dental Company Formation Index"
        title={
          <>
            New dental company incorporations rose {fmtPercent(decade.change_pct, false)} between{" "}
            {decade.from_year} and {decade.to_year}
          </>
        }
        intro={
          <>
            A monthly index of new limited company formations under SIC 86230 (General dental
            practice activities), compiled from the Companies House public register. Settled to{" "}
            {monthLabel(settledThrough)}, with the most recent{" "}
            {meta.provisional_months.length} months held back as provisional.
          </>
        }
        stats={[
          {
            value: fmtNumber(headline.dental_cos_ttm),
            label: "dental companies incorporated in the last twelve settled months",
          },
          {
            value: fmtPercent(headline.dental_cos_yoy_pct),
            label: `year-on-year change in ${monthLabel(headline.last_settled_month)}`,
          },
          {
            value: fmtPercent(decade.change_pct, false),
            label: `more dental companies formed in ${decade.to_year} than in ${decade.from_year}`,
          },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className={siteContainerLg}>
          <div className="max-w-4xl py-10 sm:py-14">
            <KeyFindings
              note={
                <>
                  Source: Companies House Advanced Search API, under the Open Government Licence
                  v3.0. The most recent {meta.provisional_months.length} months are provisional, a
                  Companies House indexing lag, and are excluded from every figure above and below.
                </>
              }
            >
              <li>
                New dental companies under SIC 86230 grew from{" "}
                <strong>{fmtNumber(decade.from_value)}</strong> in {decade.from_year} to{" "}
                <strong>{fmtNumber(decade.to_value)}</strong> in {decade.to_year}, a rise of{" "}
                {fmtPercent(decade.change_pct, false)}.
              </li>
              <li>
                In the twelve settled months to {monthLabel(settledThrough)},{" "}
                <strong>{fmtNumber(headline.dental_cos_ttm)}</strong> new dental companies were
                incorporated.
              </li>
              <li>
                The busiest single month in the series is{" "}
                <strong>{fmtNumber(headline.peak_value)}</strong> incorporations in{" "}
                {monthLabel(headline.peak_month)}.
              </li>
              <li>
                March is the busiest month of the year on average, at {marchAverage} formations
                against a monthly average of {monthlyAverage}, and it is the peak month in{" "}
                {marchPeakYears} of the {completeYears} complete years from {SEASONALITY_FROM} to{" "}
                {SEASONALITY_TO}. The 6 April tax-year boundary is the obvious explanation, and the
                exceptions are worth noting rather than smoothing over.
              </li>
            </KeyFindings>

            <ReportSection id="annual" title="Dental company formations by year">
              <p>
                Each bar is the number of new dental limited companies incorporated in that calendar
                year under SIC 86230. Only complete calendar years are shown. The post-2020 step up
                runs alongside a broader rise in UK company formation generally, so it should not be
                read as a dentistry-specific effect on its own.
              </p>
              <ChartPanel>
                <AnnualFormationChart annual={incorporations.annual} />
              </ChartPanel>
            </ReportSection>

            <ReportSection id="monthly" title="Monthly trend">
              <p>
                The same measure month by month from {firstMonth ? monthLabel(firstMonth) : "the start of the series"} to{" "}
                {monthLabel(settledThrough)}. The dashed tail marks the most recent{" "}
                {meta.provisional_months.length} months, which are provisional because Companies
                House indexes very recent incorporations with a short lag.
              </p>
              <ChartPanel>
                <MonthlyFormationChart
                  monthly={incorporations.monthly}
                  provisionalMonths={meta.provisional_months}
                />
              </ChartPanel>
            </ReportSection>

            <ReportSection id="seasonality" title="Tax-year seasonality in dental incorporations">
              <p>
                Averaged across {SEASONALITY_FROM} to {SEASONALITY_TO}, new dental company
                formations run highest in March, at {marchAverage} against the monthly average of{" "}
                {monthlyAverage}. {lowestMonth.month} is the quietest month, at {lowestMonth.avg}.
              </p>
              <p>
                The likeliest driver is the tax-year boundary. A dentist who incorporates before 6
                April can open the company accounting period at the start of the new tax year,
                avoiding a split-year calculation. April stays above the annual average rather than
                collapsing, so the effect looks like a pull-forward of a few weeks rather than a
                cliff. And it is a tendency, not a law: March is the peak month in{" "}
                {marchPeakYears} of {completeYears} complete years, not all of them.
              </p>
              <ChartPanel>
                <p className="mb-3 text-xs text-[var(--muted)]">
                  Average monthly dental company formations, SIC 86230, {SEASONALITY_FROM} to{" "}
                  {SEASONALITY_TO}. The reference line is the annual monthly average.
                </p>
                <SeasonalityChart data={seasonalityData} />
              </ChartPanel>
            </ReportSection>

            <ReportSection id="methodology" title="Methodology and sources">
              <p>
                <strong>Incorporations.</strong> For each month we query the Companies House
                Advanced Search API for companies incorporated under SIC 86230 (General dental
                practice activities). Counts are gross: a company that has since been dissolved
                still appears on the register, so the series carries no survivorship bias. The most
                recent {meta.provisional_months.length} months are provisional and excluded from
                every headline figure.
              </p>
              <p>
                <strong>What the count is not.</strong> An incorporation is a company registered
                under a dental SIC code, not a new practice opening. A restructure, a holding
                company over an existing practice, or a company that never trades all count once
                each, and none of them is a new surgery.
              </p>
              <p>
                <strong>Updated.</strong> Incorporations to {monthLabel(settledThrough)}, settled
                data. Generated {monthLabel(meta.generated_at.slice(0, 7))}.
              </p>
              <ul className="not-prose mt-2 space-y-2 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} className={reportLink} rel="nofollow">
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
                  Download the formation data (CSV)
                </Link>
              </p>
              <p className="text-sm text-[var(--muted)]">
                Free to cite and republish with attribution to Dental Finance Partners. This page is
                a data summary and does not constitute financial or tax advice.
              </p>
            </ReportSection>

            <ClosingPanel heading="Considering incorporating your dental practice?">
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                The rise in the chart above is a trend, not advice. Whether a company beats staying
                self-employed depends on your income level, what you need to draw, what you can
                leave in, and how your NHS contract is held. Whether you are an associate looking at
                a first company, a principal restructuring, or a buyer acquiring through a holding
                company, the structure is worth modelling before it is registered. Our partner
                network acts for dental professionals only.
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
