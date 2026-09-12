import type { Metadata } from "next";
import Link from "next/link";

import { ResearchLayout } from "@/components/research/ResearchLayout";
import { ResearchSection, FigureCard, DataTableWrap } from "@/components/research/ResearchSection";
import { btnOnDark, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import {
  AnnualInsolvencyChart,
  MonthlyInsolvencyChart,
  DivisionInsolvencyChart,
} from "@/components/research/InsolvencyIndexCharts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  type InsolvencyIndexSnapshot,
  type InsolvencyYear,
} from "@/lib/research/insolvency-index";
import snapshot from "@/data/construction-insolvency-index.json";

const data = snapshot as unknown as InsolvencyIndexSnapshot;
const { meta, headline, insolvencies, divisions } = data;
const { decade } = headline;

const PAGE_PATH = "/research/uk-construction-insolvency-index";

// Derived from the shipped snapshot so the prose cannot drift from the data.
const fullYears = insolvencies.annual.filter((r) => r.year < 2026);
const cvlShares = fullYears.map((r) => ({ year: r.year, pct: (r.cvl / r.total) * 100 }));
const cvlLowest = cvlShares.reduce((a, b) => (b.pct < a.pct ? b : a));
const cvlHighest = cvlShares.reduce((a, b) => (b.pct > a.pct ? b : a));
const cvlLatest = cvlShares.at(-1)!;
const peakYear = fullYears.reduce((a, b) => (b.total > a.total ? b : a));
const cvaShares = fullYears.map((r) => ({ year: r.year, pct: (r.cva / r.total) * 100 }));
const cvaHighest = cvaShares.reduce((a, b) => (b.pct > a.pct ? b : a));
const cvaFirstSubOne = cvaShares.find((r) => r.pct < 1)!;
const receivershipHighest = fullYears
  .map((r) => ({ year: r.year, pct: (r.receivership / r.total) * 100 }))
  .reduce((a, b) => (b.pct > a.pct ? b : a));

const HEADLINE_SENTENCE = `UK construction company insolvencies rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}`;

export const metadata: Metadata = {
  title: "UK Construction Insolvency Index | Construction company insolvency trends | Trade Tax Specialists",
  description: `${HEADLINE_SENTENCE}. A sourced index of construction company insolvencies by procedure type, compiled from Insolvency Service open data. Updated ${monthLabel(meta.data_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Construction Insolvency Index | Trade Tax Specialists",
    description: `${HEADLINE_SENTENCE}. Construction insolvency trends from Insolvency Service official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the UK Construction Insolvency Index measure?",
    answer:
      "It counts company insolvencies registered each month under SIC Section F (Construction), drawn from Insolvency Service record-level data covering England, Wales and Scotland. The index tracks five main procedures: Creditors Voluntary Liquidation (CVL), compulsory liquidation, administration, Company Voluntary Arrangement (CVA), and administrative receivership. Counts are gross registered events on the date of registration.",
  },
  {
    question: "Why is construction the highest-insolvency sector in the UK?",
    answer:
      "Construction companies face several structural pressures that make insolvency more common than in other sectors. Fixed-price contracts leave contractors exposed when material or labour costs rise unexpectedly. Retentions (money held back by clients) create cash-flow gaps that can last months or years. Payment chains are long, so an upstream contractor's difficulties quickly pass downstream to subcontractors. Thin margins and high working capital requirements mean that even a single large contract going wrong can be terminal. These are not recent phenomena: construction insolvencies were already climbing before the pandemic, from 2,793 in 2016 to 3,513 in 2019, and the sector has run above that pre-pandemic level every year since 2022.",
  },
  {
    question: "What is a Creditors Voluntary Liquidation (CVL)?",
    answer:
      `A CVL is the most common insolvency procedure for construction companies. The company's directors resolve to wind up the business voluntarily when they conclude it cannot pay its debts. A licensed insolvency practitioner is appointed as liquidator to realise assets and distribute proceeds to creditors. In construction, the CVL share of all insolvency events has risen over this series: it ranged from ${fmtPercent(cvlLowest.pct, false)} in ${cvlLowest.year} to ${fmtPercent(cvlHighest.pct, false)} in ${cvlHighest.year}, stayed between 62 and 65% throughout 2016 to 2019, and stood at ${fmtPercent(cvlLatest.pct, false)} in ${cvlLatest.year}. Directors choose to wind up voluntarily far more often than they enter court-led procedures.`,
  },
  {
    question: "Where does this data come from?",
    answer:
      "All insolvency counts come from the Insolvency Service's record-level data file, published as part of the Company Insolvency Statistics statistical release on gov.uk. The Insolvency Service is the UK government agency that handles corporate and personal insolvency. Its data is published under the Open Government Licence v3.0 and covers England, Wales and Scotland. The figures are updated monthly.",
  },
  {
    question: "Which part of construction has the most insolvencies: building, civil engineering, or specialised trades?",
    answer:
      "Specialised construction activities (SIC Division 43, which includes electrical, plumbing, plastering, joinery, painting and similar CIS subcontractor trades) consistently account for the largest share, over half of all construction insolvencies in every year since 2016. Building construction (Division 41, housebuilders and commercial developers) is the second-largest share and has been growing steadily, up from around 32% of construction insolvencies in 2016 to around 38 to 39% most recently. Civil engineering (Division 42, roads, railways, bridges and utilities) has by far the fewest companies and the fewest insolvencies of the three, typically under 250 a year, so its year-on-year figures move around more in percentage terms simply because the base is small.",
  },
  {
    question: "Does rising insolvency affect CIS subcontractors?",
    answer:
      "Yes, directly. When a main contractor enters insolvency, subcontractors registered under the Construction Industry Scheme (CIS) often find themselves with unpaid invoices and retained amounts that are unlikely to be recovered in full. If you work under CIS and your main contractor has financial difficulties, it is worth reviewing your contract terms, your own cash-flow position, and whether you have any retention-release rights. Our team works with CIS contractors on both tax and financial planning.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Construction Insolvency Index",
  description: `${HEADLINE_SENTENCE}, tracked from Insolvency Service open data.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-20",
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
  name: "UK Construction Insolvency Index: construction company insolvencies by procedure type",
  description:
    "Monthly counts of registered UK construction company insolvencies (SIC Section F: Divisions 41, 42 and 43) across five procedure types, compiled from Insolvency Service record-level data.",
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
    "Monthly construction company insolvencies -- total (SIC Section F)",
    "Monthly construction company insolvencies -- Creditors Voluntary Liquidation (CVL)",
    "Monthly construction company insolvencies -- Compulsory Liquidation",
    "Monthly construction company insolvencies -- Administration",
    "Monthly construction company insolvencies -- Administration converting to CVL",
    "Monthly construction company insolvencies -- Company Voluntary Arrangement (CVA)",
    "Monthly construction company insolvencies -- Administrative Receivership",
    "Monthly construction company insolvencies -- Moratorium",
    "Monthly construction company insolvencies -- Division 41 (building construction)",
    "Monthly construction company insolvencies -- Division 42 (civil engineering)",
    "Monthly construction company insolvencies -- Division 43 (specialised construction activities)",
  ],
};

// ---------------------------------------------------------------------------

export default function UKConstructionInsolvencyIndexPage() {
  const lastMonth = headline.last_settled_month;

  // Latest full year procedure breakdown
  const latestFullAnnual = insolvencies.annual
    .filter((r) => r.year < 2026)
    .at(-1);

  const procedures: { key: keyof InsolvencyYear; label: string }[] = [
    { key: "cvl", label: "Creditors Voluntary Liquidation (CVL)" },
    { key: "compulsory", label: "Compulsory Liquidation" },
    { key: "administration", label: "Administration" },
    { key: "cva", label: "Company Voluntary Arrangement (CVA)" },
    { key: "receivership", label: "Administrative Receivership" },
  ];

  return (
    <ResearchLayout
      schemas={[articleSchema, datasetSchema, buildFaqPageJsonLd(faqs)]}
      breadcrumbLabel="UK Construction Insolvency Index"
      eyebrow="UK Construction Insolvency Index"
      headline={HEADLINE_SENTENCE}
      intro={
        <>
          A sourced, monthly read on construction company insolvencies across the UK, drawn from
          Insolvency Service public records. Covering all SIC Section F construction businesses,
          broken down by insolvency procedure. Updated {monthLabel(meta.data_through)}.
        </>
      }
      heroCtas={
        <>
          <Link
            href="#book"
            data-cta="research_insolvency_hero_book"
            data-cta-placement="hero"
            data-cta-goal="form"
            className={btnPrimary}
          >
            Get a free CIS review
          </Link>
          <Link
            href={`${PAGE_PATH}/data`}
            data-cta="research_insolvency_hero_data"
            data-cta-placement="hero"
            className={btnOnDark}
          >
            Download the data (CSV)
          </Link>
        </>
      }
      stats={[
        {
          value: fmtNumber(headline.ttm_total),
          label: "construction company insolvencies in the trailing 12 months",
        },
        {
          value: fmtNumber(headline.last_month_cvl),
          label: `CVLs in ${monthLabel(lastMonth)}, the most common procedure`,
        },
        {
          value: fmtPercent(decade.change_pct, false),
          label: `more insolvencies in ${decade.to_year} than in ${decade.from_year}`,
        },
        {
          value: fmtNumber(headline.peak_total),
          label: `insolvencies in ${monthLabel(headline.peak_month)}, the highest month on record`,
        },
      ]}
      keyFindings={
        <>
                <li>
                  Construction insolvencies rose {fmtPercent(decade.change_pct, false)} from{" "}
                  {fmtNumber(decade.from_total)} in {decade.from_year} to{" "}
                  {fmtNumber(decade.to_total)} in {decade.to_year}. The highest annual total in the
                  series is {fmtNumber(peakYear.total)} in {peakYear.year}, so {decade.to_year} sits
                  just below the peak rather than at it.
                </li>
                <li>
                  In the trailing 12 months to {monthLabel(meta.data_through)},{" "}
                  {fmtNumber(headline.ttm_total)} construction companies entered insolvency across
                  England, Wales and Scotland, making it consistently the highest-volume sector in
                  the Insolvency Service data.
                </li>
                <li>
                  Creditors Voluntary Liquidation (CVL) is the dominant procedure in every year, and
                  its share has risen across the series: from {fmtPercent(cvlLowest.pct, false)} of
                  construction insolvencies in {cvlLowest.year} to a peak of{" "}
                  {fmtPercent(cvlHighest.pct, false)} in {cvlHighest.year}, and{" "}
                  {fmtPercent(cvlLatest.pct, false)} in {cvlLatest.year}. Directors choose voluntary
                  wind-up far more often than creditors force a compulsory liquidation through the
                  courts, and increasingly so.
                </li>
                <li>
                  The 2022 to 2023 surge followed the end of pandemic-era insolvency restrictions
                  (the Corporate Insolvency and Governance Act 2020 temporarily prohibited winding-up
                  petitions). The 2024 to 2025 period shows a modest fall from those peaks, though
                  levels remain well above the 2016 to 2019 baseline.
                </li>
                <li>
                  In {monthLabel(lastMonth)}, {fmtNumber(headline.last_month_total)} construction
                  companies entered insolvency, of which {fmtNumber(headline.last_month_cvl)} were
                  CVLs, {fmtNumber(headline.last_month_compulsory)} compulsory liquidations, and{" "}
                  {fmtNumber(headline.last_month_administration)} administrations.
                </li>
        </>
      }
      source={
        <>
          Source: Insolvency Service, Company Insolvency Statistics (record-level data), under
          the Open Government Licence v3.0. England, Wales and Scotland. Figures may be cited
          with attribution to Trade Tax Specialists.
        </>
      }
      conversionTitle="Working in construction? Protect your CIS position."
      conversionBody={
        <>
          High insolvency rates in construction affect every part of the payment chain,
          including subcontractors operating under CIS. Understanding your gross payment
          status, your refund entitlements, and your tax position is a practical buffer
          against client-side financial difficulties. Our calculators help you model your CIS
          refund and GPS eligibility.
        </>
      }
      conversionCtas={
        <>
          <Link
            href="/calculators/cis-refund-estimator"
            data-cta="research_insolvency_cta_calculator"
            data-cta-placement="article"
            className="text-primary-700 hover:text-primary-800"
          >
            CIS refund estimator &rarr;
          </Link>
          <Link
            href="/calculators/cis-gps-eligibility-checker"
            className="text-primary-700 hover:text-primary-800"
          >
            GPS eligibility checker &rarr;
          </Link>
        </>
      }
      faqs={faqs}
    >
            <ResearchSection id="annual" title="Construction insolvencies by year">
              <p>
                Each bar shows the total number of construction company insolvencies registered in
                that calendar year (complete years only). The sharp rise from 2022 reflects the
                unwinding of the pandemic-era moratorium on winding-up petitions. The 2020 and 2021
                dip is largely attributable to those temporary restrictions, not underlying
                improvement in sector health.
              </p>
              <FigureCard>
                <AnnualInsolvencyChart annual={insolvencies.annual} />
              </FigureCard>
            </ResearchSection>

            <ResearchSection id="monthly" title="The monthly trend by procedure">
              <p>
                The stacked area chart shows monthly insolvency registrations from January 2016,
                broken down by the three main procedures: CVL (orange), compulsory liquidation
                (amber), and administration (neutral). CVL dominates throughout, spiking sharply in
                2023. The narrowing of the compulsory band during 2020 to 2021 is the direct effect
                of the pandemic restrictions.
              </p>
              <FigureCard>
                <MonthlyInsolvencyChart monthly={insolvencies.monthly} />
              </FigureCard>
            </ResearchSection>

            <ResearchSection id="procedures" title="Breakdown by procedure">
              <p>
                The table shows the number of construction company insolvencies by procedure type in{" "}
                {latestFullAnnual ? String(latestFullAnnual.year) : "the latest full year"}.
                CVL accounts for the large majority; compulsory liquidations are the second largest
                category, triggered by creditor petitions to the court.
              </p>
              {latestFullAnnual && (
                <DataTableWrap>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-neutral-300 text-left">
                        <th className="py-2 pr-4 font-bold text-neutral-900">Procedure</th>
                        <th className="py-2 pr-4 font-bold text-neutral-900 text-right">
                          {latestFullAnnual.year} count
                        </th>
                        <th className="py-2 font-bold text-neutral-900 text-right">% of total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {procedures.map(({ key, label }) => {
                        const count = Number(latestFullAnnual[key as keyof typeof latestFullAnnual] ?? 0);
                        const pct = latestFullAnnual.total > 0
                          ? (count / latestFullAnnual.total * 100).toFixed(1)
                          : "n/a";
                        return (
                          <tr key={key} className="border-b border-neutral-200">
                            <td className="py-2 pr-4 text-neutral-700">{label}</td>
                            <td className="py-2 pr-4 text-right font-semibold text-neutral-900">
                              {fmtNumber(count)}
                            </td>
                            <td className="py-2 text-right text-neutral-700">{pct}%</td>
                          </tr>
                        );
                      })}
                      <tr className="border-b border-neutral-300">
                        <td className="py-2 pr-4 font-bold text-primary-700">Total</td>
                        <td className="py-2 pr-4 text-right font-bold text-primary-700">
                          {fmtNumber(latestFullAnnual.total)}
                        </td>
                        <td className="py-2 text-right font-bold text-primary-700">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </DataTableWrap>
              )}
            </ResearchSection>

            <ResearchSection id="sub-sector" title="Insolvencies by construction sub-sector">
              <p>
                Every construction insolvency falls into one of three SIC divisions: Division 41
                (building construction, mainly housebuilders and commercial developers), Division
                42 (civil engineering, roads, railways, bridges and utilities), and Division 43
                (specialised construction activities, the electrical, plumbing, plastering,
                joinery, painting and other trades most CIS subcontractors work in). The chart
                shows how the three have moved since 2016.
              </p>
              <FigureCard>
                <DivisionInsolvencyChart annual={divisions.annual} />
              </FigureCard>
              <DataTableWrap>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Division</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">
                        Trailing 12 months
                      </th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">
                        Share of total
                      </th>
                      <th className="py-2 font-bold text-neutral-900 text-right">
                        Change since {divisions.headline.decade_from_year}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(["div41", "div42", "div43"] as const).map((key) => (
                      <tr key={key} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{meta.division_labels[key.replace("div", "")]}</td>
                        <td className="py-2 pr-4 text-right font-semibold text-neutral-900">
                          {fmtNumber(divisions.headline.ttm_by_division[key])}
                        </td>
                        <td className="py-2 pr-4 text-right text-neutral-700">
                          {divisions.headline.ttm_share_pct[key]}%
                        </td>
                        <td className="py-2 text-right text-neutral-700">
                          {fmtPercent(divisions.headline.decade_change_pct_by_division[key], false)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DataTableWrap>
              <p className="mt-4 text-sm text-neutral-600">
                Division 41 (building) insolvencies have risen the fastest of the three since{" "}
                {divisions.headline.decade_from_year}, up{" "}
                {fmtPercent(divisions.headline.decade_change_pct_by_division.div41, false)} against{" "}
                {fmtPercent(divisions.headline.decade_change_pct_by_division.div42, false)} in civil
                engineering (Division 42), more than five times the growth rate, and{" "}
                {fmtPercent(divisions.headline.decade_change_pct_by_division.div43, false)} in
                specialised trades (Division 43). Division 43
                (specialised trades) remains the largest single contributor by volume in every
                year of the series.
              </p>
            </ResearchSection>

            <ResearchSection id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> Counts are drawn from the Insolvency Service
                record-level data file, published monthly as part of the Company Insolvency
                Statistics release on gov.uk. Each record represents a single insolvency event
                registered with Companies House or the Insolvency Service, tagged with the
                company&apos;s SIC code and procedure type. We filter to SIC 1-digit Section F
                (Construction), which encompasses Division 41 (construction of buildings), Division
                42 (civil engineering), and Division 43 (specialised construction activities).
              </p>
              <p>
                <strong>What is counted.</strong> Each figure is the number of insolvency events
                registered in that period, not the number of unique companies. A company that enters
                administration and subsequently converts to CVL appears twice: once for each
                procedure. This is consistent with how the Insolvency Service reports its own
                headline figures.
              </p>
              <p>
                <strong>Sub-sector breakdown.</strong> The same record-level file tags every
                insolvency with a 2-digit SIC division as well as the procedure type, so the
                Division 41/42/43 breakdown above uses no additional source: it is the same
                Insolvency Service data, split one level deeper.
              </p>
              <p>
                <strong>Caveats.</strong> Counts are not rates: an increase in insolvency numbers
                may partly reflect growth in the total number of active construction companies rather
                than a worsening of sector conditions. The pandemic years (2020 to 2021) are not
                comparable to other years because temporary legislation suppressed compulsory
                liquidations. CVA and receivership counts are low and should be read as indicative
                only: CVAs peaked at {fmtPercent(cvaHighest.pct, false)} of construction
                insolvencies in {cvaHighest.year}, ran between 1.7 and 2.4% from 2016 to 2019, and
                have been under 1% in every year from {cvaFirstSubOne.year} onwards, while
                receivership has never exceeded {fmtPercent(receivershipHighest.pct, false)} in any
                year of the series.
              </p>
              <p>
                <strong>Updated.</strong> Data through {monthLabel(meta.data_through)} (latest
                Insolvency Service release). Generated {monthLabel(meta.generated_at.slice(0, 7))}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.release_page}
                      className="font-semibold text-primary-700 hover:text-primary-800"
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
                  className="font-semibold text-primary-700 hover:text-primary-800"
                >
                  Download the insolvency data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Trade Tax Specialists. This page is a
                data summary and does not constitute insolvency or tax advice on any individual
                situation.
              </p>
            </ResearchSection>

    </ResearchLayout>
  );
}
