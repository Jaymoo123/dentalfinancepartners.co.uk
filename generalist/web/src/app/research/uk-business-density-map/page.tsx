import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { Stat, Section } from "@/components/research/ResearchLayout";
import { HorizontalBarChart } from "@/components/research/Charts";
import { fmtNumber, fmtPct1 } from "@/lib/research/format";
import type { BusinessDensityMapSnapshot } from "@/lib/research/business-density-map";
import snapshot from "@/data/uk-business-density-map.json";

const data = snapshot as unknown as BusinessDensityMapSnapshot;
const { meta, headline, regions } = data;

const PAGE_PATH = "/research/uk-business-density-map";

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
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  const chartData = regions.map((r) => ({ label: r.region, value: r.density_per_10k_adults }));

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
              { label: "UK Business Density Map" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Business Density Map
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Where Britain&apos;s small businesses actually are
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Every UK region and nation ranked by businesses per 10,000 resident adults, from
            official Business Population Estimates ({headline.as_of}).
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={fmtNumber(headline.uk_density_per_10k_adults)} label="UK average, per 10,000 adults" />
            <Stat value={headline.highest_region} label={`highest density (${fmtNumber(headline.highest_density_per_10k_adults)}/10k)`} />
            <Stat value={headline.lowest_region} label={`lowest density (${fmtNumber(headline.lowest_density_per_10k_adults)}/10k)`} />
            <Stat value={`${headline.density_ratio_highest_to_lowest}x`} label="gap between highest and lowest" />
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
                  {headline.highest_region} has {fmtNumber(headline.highest_density_per_10k_adults)}{" "}
                  businesses per 10,000 adults, the highest of any UK region, {headline.density_ratio_highest_to_lowest}{" "}
                  times the rate in {headline.lowest_region} ({fmtNumber(headline.lowest_density_per_10k_adults)} per
                  10,000).
                </li>
                <li>
                  The UK average is {fmtNumber(headline.uk_density_per_10k_adults)} businesses per 10,000 adults,
                  from a total of {fmtNumber(headline.uk_total_businesses)} private sector businesses.
                </li>
                <li>
                  Every region has a broadly similar employment size mix (around three-quarters of
                  businesses employing nobody but the owner), so density differences are mainly about
                  how many businesses exist per head, not how large they are.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Business Population Estimates for the UK and regions (Open Government Licence
                v3.0). Figures may be cited with attribution to Holloway Davies.
              </p>
            </div>

            <Section id="density" title="Business density by region">
              <p>
                Businesses per 10,000 resident adults, ranked from highest to lowest. This is the
                standard density measure: it accounts for population size, so large and small regions
                can be compared directly.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <HorizontalBarChart data={chartData} />
              </div>
            </Section>

            <Section id="table" title="Regional detail">
              <div className="not-prose overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Region</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">Businesses</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">Per 10k adults</th>
                      <th className="py-2 text-right font-bold text-neutral-900">% zero-employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regions.map((r) => (
                      <tr key={r.region} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{r.region}</td>
                        <td className="py-2 pr-4 text-right font-semibold text-neutral-900">{fmtNumber(r.businesses)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-700">{fmtNumber(r.density_per_10k_adults)}</td>
                        <td className="py-2 text-right text-neutral-700">{fmtPct1(r.pct_zero_employees)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> Business Population Estimates for the UK and regions
                (Table 8, businesses per 10,000 resident adults by region; Table 9, regional size
                summary), published annually by the Department for Business and Trade.
              </p>
              <p>
                <strong>Density calculation.</strong> Businesses per 10,000 resident adults aged 16
                and over, using ONS mid-year population estimates as the denominator. This is the
                official published rate, not independently recalculated by us.
              </p>
              <p>
                <strong>Caveats.</strong> Figures are for the whole private sector (companies, sole
                proprietorships and partnerships) at {headline.as_of}. Density does not capture
                business size, turnover, or survival; a region can be dense with many small, marginal
                businesses.
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
                  Download the regional density data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Holloway Davies. This page is a data
                summary and does not constitute financial or business advice.
              </p>
            </Section>

            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Wherever you&apos;re based, we work nationally
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Holloway Davies serves UK limited companies, contractors, sole traders and
                partnerships across every region, cloud-first, with no need for a local office.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/locations" className="text-orange-700 hover:text-orange-800">
                  See our locations &rarr;
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
