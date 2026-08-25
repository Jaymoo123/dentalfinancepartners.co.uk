import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { Stat, Section } from "@/components/research/ResearchLayout";
import { HorizontalBarChart } from "@/components/research/Charts";
import { fmtNumber, fmtPercent, fmtPct1, monthLabel } from "@/lib/research/format";
import type { SectorInsolvencyLeagueSnapshot } from "@/lib/research/sector-insolvency-league";
import snapshot from "@/data/uk-sector-insolvency-league.json";

const data = snapshot as unknown as SectorInsolvencyLeagueSnapshot;
const { meta, headline, sections } = data;

const PAGE_PATH = "/research/uk-sector-insolvency-league";

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
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  const chartData = sections.map((s) => ({ label: s.label, value: s.ttm_total }));
  const top5 = sections.slice(0, 5);

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
              { label: "UK Sector Insolvency League" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Sector Insolvency League
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Which UK sectors have the most company insolvencies?
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Every SIC section ranked by trailing 12-month company insolvencies, England and Wales,
            from Insolvency Service open data. Updated {monthLabel(headline.data_through)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={headline.top_sector_label} label="highest-insolvency sector" />
            <Stat value={fmtNumber(headline.top_sector_ttm)} label="insolvencies in that sector, trailing 12 months" />
            <Stat value={fmtPct1(headline.top_sector_share_pct)} label="share of all company insolvencies" />
            <Stat value={fmtNumber(headline.ttm_total_all_sectors)} label="company insolvencies, all sectors, trailing 12 months" />
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
                  {headline.top_sector_label} recorded {fmtNumber(headline.top_sector_ttm)} company
                  insolvencies in the 12 months to {monthLabel(headline.data_through)},{" "}
                  {fmtPct1(headline.top_sector_share_pct)} of every insolvency across all{" "}
                  {headline.n_sections_ranked} SIC sections.
                </li>
                <li>
                  The five highest-volume sectors are {top5.map((s) => s.label).join(", ")}, together
                  accounting for {fmtPct1(top5.reduce((sum, s) => sum + (s.ttm_share_pct ?? 0), 0))} of
                  all company insolvencies.
                </li>
                <li>
                  {fmtNumber(headline.ttm_total_all_sectors)} companies entered insolvency across all
                  sectors combined in the trailing 12 months, with a further{" "}
                  {fmtNumber(headline.ttm_unclassified)} unclassified filings excluded from the ranked
                  league.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: The Insolvency Service, Company Insolvency Statistics, Industry Tables (Open
                Government Licence v3.0). England and Wales. Figures may be cited with attribution to
                Holloway Davies.
              </p>
            </div>

            <Section id="league" title="The full sector league table">
              <p>
                Every SIC section ranked by trailing 12-month company insolvencies. Larger sectors
                naturally register more insolvencies in absolute terms, so this ranking reflects
                volume, not necessarily risk per company.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <HorizontalBarChart data={chartData} />
              </div>
            </Section>

            <Section id="table" title="Sector-by-sector detail">
              <div className="not-prose overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Sector</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">TTM insolvencies</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">Share</th>
                      <th className="py-2 text-right font-bold text-neutral-900">
                        Change since {sections[0]?.decade_from_year}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((s) => (
                      <tr key={s.code} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{s.label}</td>
                        <td className="py-2 pr-4 text-right font-semibold text-neutral-900">{fmtNumber(s.ttm_total)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-700">{fmtPct1(s.ttm_share_pct)}</td>
                        <td className="py-2 text-right text-neutral-700">{fmtPercent(s.decade_change_pct, false)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> The Insolvency Service&apos;s Company Insolvency
                Statistics, Industry Tables (Table A1a), which breaks down monthly and annual company
                insolvencies by SIC 2007 one-digit section (21 sections, A to U) plus an unclassified
                residual.
              </p>
              <p>
                <strong>What is counted.</strong> Trailing-12-month (TTM) totals are the sum of the
                most recent 12 published monthly figures for each section. Counts are gross registered
                insolvency events, not unique companies and not rates against sector size.
              </p>
              <p>
                <strong>Coverage.</strong> England and Wales only. Scotland and Northern Ireland
                insolvencies are published separately by the Insolvency Service and are not included.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.release_page} className="font-semibold text-orange-700 hover:text-orange-800" rel="nofollow">
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-orange-700 hover:text-orange-800">
                  Download the sector league data (CSV)
                </Link>
                {" · "}
                <Link href="/research/uk-small-business-barometer" className="font-semibold text-orange-700 hover:text-orange-800">
                  See the full State of UK Small Business Barometer
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Holloway Davies. This page is a data
                summary and does not constitute financial or business advice.
              </p>
            </Section>

            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                In a high-insolvency sector? Get ahead of the risk.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Cash flow monitoring, credit control and tax planning matter most in sectors where
                insolvency is common. Holloway Davies works with UK small businesses across every
                sector on exactly these fundamentals.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/services" className="text-orange-700 hover:text-orange-800">
                  View our services &rarr;
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
