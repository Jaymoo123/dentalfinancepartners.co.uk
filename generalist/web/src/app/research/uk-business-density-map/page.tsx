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
import { fmtNumber, fmtPct1 } from "@/lib/research/format";
import type { BusinessDensityMapSnapshot } from "@/lib/research/business-density-map";
import snapshot from "@/data/uk-business-density-map.json";

const data = snapshot as unknown as BusinessDensityMapSnapshot;
const { meta, headline, regions } = data;

const PAGE_PATH = "/research/uk-business-density-map";

const SOURCE_BPE =
  "Business Population Estimates for the UK and regions, Department for Business and Trade / ONS (Open Government Licence v3.0)";

export const metadata: Metadata = {
  title: "UK Business Density Map 2026 | Where Britain's Small Businesses Are | Holloway Davies",
  description: `${headline.highest_region} has the highest business density in the UK (${fmtNumber(headline.highest_density_per_10k_adults)} businesses per 10,000 adults), ${headline.density_ratio_highest_to_lowest}x ${headline.lowest_region}'s rate. Every UK region ranked from ONS/DBT open data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Business Density Map | Holloway Davies",
    description: "Where Britain's small businesses actually are: every UK region ranked by businesses per 10,000 adults.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "Which UK region has the most businesses per person?",
    answer: `${headline.highest_region} has the highest business density in the UK, ${fmtNumber(headline.highest_density_per_10k_adults)} businesses per 10,000 resident adults, according to ONS/DBT Business Population Estimates.`,
  },
  {
    question: "Which UK region has the fewest businesses per person?",
    answer: `${headline.lowest_region} has the lowest business density, ${fmtNumber(headline.lowest_density_per_10k_adults)} businesses per 10,000 resident adults, roughly ${headline.density_ratio_highest_to_lowest} times lower than ${headline.highest_region}.`,
  },
  {
    question: "Why does London have so many more businesses per person?",
    answer:
      "London combines a large working-age population, high concentrations of professional services, freelancers and sole traders, and a much higher share of very small, no-employee businesses than most other regions. Higher average incomes and business costs both push more people toward self-employment and small-scale trading.",
  },
  {
    question: "Does business density measure economic success?",
    answer:
      "Not directly. It measures how many businesses exist relative to the adult population, not their size, profitability or survival rate. A region can have high density with many small, marginal businesses, or lower density with fewer but larger employers. Density is best read alongside employment and turnover figures for a fuller regional picture.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "Business Population Estimates for the UK and regions, published annually by the Department for Business and Trade using ONS data. Density is calculated against ONS mid-year resident adult population estimates. Both are Open Government Licence v3.0.",
  },
];

export default function UkBusinessDensityMapPage() {
  const dataset = buildDataset({
    name: "UK Business Density Map",
    description:
      "UK region-by-region business density (businesses per 10,000 resident adults) and employment size mix, from Business Population Estimates.",
    path: PAGE_PATH,
    distributionPath: `${PAGE_PATH}/data`,
    dateModified: meta.generated_at,
    temporalCoverage: "2025",
    keywords: [
      "UK business density by region",
      "businesses per capita UK",
      "where are UK small businesses",
      "regional business statistics UK",
    ],
    license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    spatialCoverage: "United Kingdom",
  });
  // ONE binding: this exact array is what `<FaqSection faqs={faqs}>` renders at
  // the foot of the page. A projection here is how schema and visible copy drift.
  const faqPage = buildFaqPage(faqs);

  const chartData = regions.map((r) => ({ label: r.region, value: r.density_per_10k_adults }));

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
                { label: "UK Business Density Map" },
              ]}
            />
            <Eyebrow onDark>UK Business Density Map</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              Where Britain&apos;s small businesses actually are
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Every UK region and nation ranked by businesses per 10,000 resident adults, from
              official Business Population Estimates ({headline.as_of}).
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#book"
                data-cta="research_uk_business_density_map_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnOnDark}
              >
                Speak to an accountant
              </a>
              <Link
                href={`${PAGE_PATH}/data`}
                data-cta="research_uk_business_density_map_hero_data"
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
          <Stat
            value={fmtNumber(headline.uk_density_per_10k_adults)}
            label="UK average, per 10,000 adults"
          />
          <Stat
            value={headline.highest_region}
            label={`highest density (${fmtNumber(headline.highest_density_per_10k_adults)}/10k)`}
          />
          <Stat
            value={headline.lowest_region}
            label={`lowest density (${fmtNumber(headline.lowest_density_per_10k_adults)}/10k)`}
          />
          <Stat
            value={`${headline.density_ratio_highest_to_lowest}x`}
            label="gap between highest and lowest"
          />
        </div>
        <ul className="list-disc space-y-3 pl-5 marker:text-primary-600">
          <li>
            {headline.highest_region} has {fmtNumber(headline.highest_density_per_10k_adults)}{" "}
            businesses per 10,000 adults, the highest of any UK region,{" "}
            {headline.density_ratio_highest_to_lowest} times the rate in {headline.lowest_region} (
            {fmtNumber(headline.lowest_density_per_10k_adults)} per 10,000).
          </li>
          <li>
            The UK average is {fmtNumber(headline.uk_density_per_10k_adults)} businesses per 10,000
            adults, from a total of {fmtNumber(headline.uk_total_businesses)} private sector
            businesses.
          </li>
          <li>
            Every region has a broadly similar employment size mix (around three-quarters of
            businesses employing nobody but the owner), so density differences are mainly about how
            many businesses exist per head, not how large they are.
          </li>
        </ul>
        <p className="text-xs text-slate-500">
          Source: Business Population Estimates for the UK and regions (Open Government Licence
          v3.0). Figures may be cited with attribution to Holloway Davies.
        </p>
      </Section>

      <Section id="density" title="Business density by region">
        <p>
          Businesses per 10,000 resident adults, ranked from highest to lowest. This is the standard
          density measure: it accounts for population size, so large and small regions can be
          compared directly.
        </p>
        <FigureCard tone="slate" source={SOURCE_BPE}>
          <HorizontalBarChart data={chartData} />
        </FigureCard>
      </Section>

      <Section id="table" title="Regional detail" tone="slate">
        <FigureCard source={SOURCE_BPE}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">Region</th>
                  <th className="py-2 pr-4 text-right font-bold text-slate-900">Businesses</th>
                  <th className="py-2 pr-4 text-right font-bold text-slate-900">Per 10k adults</th>
                  <th className="py-2 text-right font-bold text-slate-900">% zero-employee</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.region} className="border-b border-slate-200">
                    <td className="py-2 pr-4 text-slate-700">{r.region}</td>
                    <td className="py-2 pr-4 text-right font-semibold tabular-nums text-slate-900">
                      {fmtNumber(r.businesses)}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums text-slate-700">
                      {fmtNumber(r.density_per_10k_adults)}
                    </td>
                    <td className="py-2 text-right tabular-nums text-slate-700">
                      {fmtPct1(r.pct_zero_employees)}
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
          <strong>Data source.</strong> Business Population Estimates for the UK and regions (Table
          8, businesses per 10,000 resident adults by region; Table 9, regional size summary),
          published annually by the Department for Business and Trade.
        </p>
        <p>
          <strong>Density calculation.</strong> Businesses per 10,000 resident adults aged 16 and
          over, using ONS mid-year population estimates as the denominator. This is the official
          published rate, not independently recalculated by us.
        </p>
        <p>
          <strong>Caveats.</strong> Figures are for the whole private sector (companies, sole
          proprietorships and partnerships) at {headline.as_of}. Density does not capture business
          size, turnover, or survival; a region can be dense with many small, marginal businesses.
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
        <p>
          <Link
            href={`${PAGE_PATH}/data`}
            data-cta="research_uk_business_density_map_csv"
            data-cta-placement="methodology"
            className={linkArrow}
          >
            Download the regional density data (CSV)
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
          title="Wherever you are based, we work nationally"
          description="Holloway Davies serves UK limited companies, contractors, sole traders and partnerships across every region, cloud-first, with no need for a local office."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Speak to an accountant" redirectOnSuccess={false} />}
          backdrop={<GeneralistBackdrop tone="navy" />}
          footnote={
            <>
              We publish a page for every town and city we serve. See{" "}
              <InlineLink href="/locations" onDark>
                our locations
              </InlineLink>
              . If your position is already right, we will say so.
            </>
          }
        />
      </div>

      <FaqSection faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
