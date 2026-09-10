import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, InlineLink } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { siteContainerLg, btnOnDark, linkArrow } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { Stat, Section, FigureCard } from "@/components/research/ResearchLayout";
import { HorizontalBarChart } from "@/components/research/Charts";
import { fmtNumber, fmtPercent, fmtPct1, monthLabel } from "@/lib/research/format";
import type { SectorInsolvencyLeagueSnapshot } from "@/lib/research/sector-insolvency-league";
import snapshot from "@/data/uk-sector-insolvency-league.json";

const data = snapshot as unknown as SectorInsolvencyLeagueSnapshot;
const { meta, headline, sections } = data;

const PAGE_PATH = "/research/uk-sector-insolvency-league";

const SOURCE_INSOLVENCY_SERVICE =
  "The Insolvency Service, Company Insolvency Statistics, Industry Tables, England and Wales (Open Government Licence v3.0)";

export const metadata: Metadata = {
  title: "UK Sector Insolvency League 2026 | Which Industries Fail Most | Holloway Davies",
  description: `${headline.top_sector_label} has the most company insolvencies of any sector (${fmtNumber(headline.top_sector_ttm)}, ${fmtPct1(headline.top_sector_share_pct)} of the total) in the 12 months to ${monthLabel(headline.data_through)}. Every SIC section ranked from Insolvency Service open data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Sector Insolvency League | Holloway Davies",
    description: "Every UK industry ranked by company insolvencies, from Insolvency Service open data.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "Which UK sector has the most company insolvencies?",
    answer: `${headline.top_sector_label} has had the most company insolvencies of any sector in the 12 months to ${monthLabel(headline.data_through)}, with ${fmtNumber(headline.top_sector_ttm)} insolvencies, ${fmtPct1(headline.top_sector_share_pct)} of every company insolvency across England and Wales in that period.`,
  },
  {
    question: "Does a high insolvency count mean a sector is riskier?",
    answer:
      "Not necessarily on its own. These are raw counts of registered insolvency events, not rates against the number of active companies in each sector. A large sector (by company count) will naturally register more insolvencies in absolute terms even if its per-company failure rate is average. The league table is best read alongside sector size when judging relative risk.",
  },
  {
    question: "What counts as a company insolvency here?",
    answer:
      "Any of the standard UK corporate insolvency procedures: Creditors' Voluntary Liquidation, Compulsory Liquidation, Administration, Company Voluntary Arrangement, Administrative Receivership, or Moratorium, as registered with Companies House or the Insolvency Service. Each is counted once, in the month it was registered.",
  },
  {
    question: "Why is there an 'unclassified' category?",
    answer: `A residual category of companies without a captured SIC code at the time of filing exists in the underlying data (${fmtNumber(headline.ttm_unclassified)} in the trailing 12 months). It is shown for completeness but excluded from the ranked sector league, since it is not a real industry.`,
  },
  {
    question: "Does this cover Scotland and Northern Ireland?",
    answer:
      "No. The Insolvency Service publishes this industry breakdown for England and Wales only. Scotland and Northern Ireland insolvency statistics are published separately by their own authorities and are not included in this league table.",
  },
];

export default function UkSectorInsolvencyLeaguePage() {
  const dataset = buildDataset({
    name: "UK Sector Insolvency League",
    description:
      "Every SIC 2007 one-digit section ranked by trailing 12-month company insolvencies, England and Wales.",
    path: PAGE_PATH,
    distributionPath: `${PAGE_PATH}/data`,
    dateModified: meta.generated_at,
    temporalCoverage: "2016/2026",
    keywords: [
      "sector insolvency rates UK",
      "which industry has most insolvencies",
      "UK company insolvency by sector",
      "SIC insolvency data",
    ],
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    spatialCoverage: "United Kingdom",
  });
  // ONE binding: this exact array is what `<FaqSection mountAnswers faqs={faqs}>` renders at
  // the foot of the page. A projection here is how schema and visible copy drift.
  const faqPage = buildFaqPage(faqs);

  const chartData = sections.map((s) => ({ label: s.label, value: s.ttm_total }));
  const top5 = sections.slice(0, 5);

  return (
    <>
      <JsonLd data={faqPage ? [dataset, faqPage] : [dataset]} />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Research", href: "/research" },
                { label: "UK Sector Insolvency League" },
              ]}
            />
            <Eyebrow onDark>UK Sector Insolvency League</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              Which UK sectors have the most company insolvencies?
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Every SIC section ranked by trailing 12-month company insolvencies, England and Wales,
              from Insolvency Service open data. Updated {monthLabel(headline.data_through)}.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#book"
                data-cta="research_uk_sector_insolvency_league_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnOnDark}
              >
                Speak to an accountant
              </a>
              <Link
                href={`${PAGE_PATH}/data`}
                data-cta="research_uk_sector_insolvency_league_hero_data"
                data-cta-placement="hero"
                className="py-0.5 text-sm font-semibold text-primary-400 underline underline-offset-4 transition-colors hover:text-primary-300"
              >
                Download the data (CSV)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section id="key-findings" title="Key findings" tone="slate">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat value={headline.top_sector_label} label="highest-insolvency sector" />
          <Stat
            value={fmtNumber(headline.top_sector_ttm)}
            label="insolvencies in that sector, trailing 12 months"
          />
          <Stat
            value={fmtPct1(headline.top_sector_share_pct)}
            label="share of all company insolvencies"
          />
          <Stat
            value={fmtNumber(headline.ttm_total_all_sectors)}
            label="company insolvencies, all sectors, trailing 12 months"
          />
        </div>
        <ul className="list-disc space-y-3 pl-5 marker:text-primary-600">
          <li>
            {headline.top_sector_label} recorded {fmtNumber(headline.top_sector_ttm)} company
            insolvencies in the 12 months to {monthLabel(headline.data_through)},{" "}
            {fmtPct1(headline.top_sector_share_pct)} of every insolvency across all{" "}
            {headline.n_sections_ranked} SIC sections.
          </li>
          <li>
            The five highest-volume sectors are {top5.map((s) => s.label).join(", ")}, together
            accounting for {fmtPct1(top5.reduce((sum, s) => sum + (s.ttm_share_pct ?? 0), 0))} of all
            company insolvencies.
          </li>
          <li>
            {fmtNumber(headline.ttm_total_all_sectors)} companies entered insolvency across all
            sectors combined in the trailing 12 months, with a further{" "}
            {fmtNumber(headline.ttm_unclassified)} unclassified filings excluded from the ranked
            league.
          </li>
        </ul>
        <p className="text-xs text-slate-500">
          Source: The Insolvency Service, Company Insolvency Statistics, Industry Tables (Open
          Government Licence v3.0). England and Wales. Figures may be cited with attribution to
          Holloway Davies.
        </p>
      </Section>

      <Section id="league" title="The full sector league table">
        <p>
          Every SIC section ranked by trailing 12-month company insolvencies. Larger sectors
          naturally register more insolvencies in absolute terms, so this ranking reflects volume,
          not necessarily risk per company.
        </p>
        <FigureCard tone="slate" source={SOURCE_INSOLVENCY_SERVICE}>
          <HorizontalBarChart data={chartData} />
        </FigureCard>
      </Section>

      <Section id="table" title="Sector-by-sector detail" tone="slate">
        <FigureCard source={SOURCE_INSOLVENCY_SERVICE}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">Sector</th>
                  <th className="py-2 pr-4 text-right font-bold text-slate-900">TTM insolvencies</th>
                  <th className="py-2 pr-4 text-right font-bold text-slate-900">Share</th>
                  <th className="py-2 text-right font-bold text-slate-900">
                    Change since {sections[0]?.decade_from_year}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.map((s) => (
                  <tr key={s.code} className="border-b border-slate-200">
                    <td className="py-2 pr-4 text-slate-700">{s.label}</td>
                    <td className="py-2 pr-4 text-right font-semibold tabular-nums text-slate-900">
                      {fmtNumber(s.ttm_total)}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums text-slate-700">
                      {fmtPct1(s.ttm_share_pct)}
                    </td>
                    <td className="py-2 text-right tabular-nums text-slate-700">
                      {fmtPercent(s.decade_change_pct, false)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FigureCard>
      </Section>

      <Section id="methodology" title="Methodology and sources">
        <p>
          <strong>Data source.</strong> The Insolvency Service&apos;s Company Insolvency Statistics,
          Industry Tables (Table A1a), which breaks down monthly and annual company insolvencies by
          SIC 2007 one-digit section (21 sections, A to U) plus an unclassified residual.
        </p>
        <p>
          <strong>What is counted.</strong> Trailing-12-month (TTM) totals are the sum of the most
          recent 12 published monthly figures for each section. Counts are gross registered
          insolvency events, not unique companies and not rates against sector size.
        </p>
        <p>
          <strong>Coverage.</strong> England and Wales only. Scotland and Northern Ireland
          insolvencies are published separately by the Insolvency Service and are not included.
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          {meta.sources.map((s) => (
            <li key={s.name}>
              <a
                href={s.release_page}
                className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                rel="nofollow"
              >
                {s.name}
              </a>{" "}
              <span className="text-slate-500">({s.publisher})</span>
            </li>
          ))}
        </ul>
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href={`${PAGE_PATH}/data`}
            data-cta="research_uk_sector_insolvency_league_csv"
            data-cta-placement="methodology"
            className={linkArrow}
          >
            Download the sector league data (CSV)
          </Link>
          <Link
            href="/research/uk-small-business-barometer"
            data-cta="research_uk_sector_insolvency_league_barometer"
            data-cta-placement="methodology"
            className={linkArrow}
          >
            See the full State of UK Small Business Barometer
          </Link>
        </p>
        <p className="text-sm text-slate-500">
          Free to cite and republish with attribution to Holloway Davies, under the Open Government
          Licence v3.0 terms of the underlying release. This page is a data summary and does not
          constitute financial or business advice.
        </p>
      </Section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free consultation"
          title="In a high-insolvency sector? Get ahead of the risk."
          description="Cash flow monitoring, credit control and tax planning matter most in sectors where insolvency is common. Holloway Davies works with UK small businesses across every sector on exactly these fundamentals."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Speak to an accountant" redirectOnSuccess={false} />}
          backdrop={<GeneralistBackdrop tone="navy" />}
          footnote={
            <>
              Prefer to look around first? See{" "}
              <InlineLink href="/services" onDark>
                what we do
              </InlineLink>
              . If your position is already right, we will say so.
            </>
          }
        />
      </div>

      <FaqSection mountAnswers faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
