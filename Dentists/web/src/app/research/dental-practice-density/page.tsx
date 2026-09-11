import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import {
  DensityByRegionChart,
  LocationCountByRegionChart,
} from "@/components/research/DentalDensityCharts";
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
  fmtDensity,
  fmtNumber,
  type DentalPracticeDensitySnapshot,
} from "@/lib/research/dental-practice-density";
import snapshot from "@/data/dental-practice-density.json";

const data = snapshot as unknown as DentalPracticeDensitySnapshot;
const { meta, headline, regions } = data;

const PAGE_PATH = "/research/dental-practice-density";

/** Regions with a population denominator, so a density can be computed. The CQC
 *  directory also carries a small number of locations with no region recorded;
 *  they are in the England total and cannot be in any regional rate. */
const knownRegions = regions.filter((r) => r.per_100k !== null);
const knownLocations = knownRegions.reduce((sum, r) => sum + r.dental_locations, 0);
const unplacedLocations = headline.total_dental_locations - knownLocations;
const densityGap =
  headline.highest_density_per_100k !== null && headline.lowest_density_per_100k !== null
    ? headline.highest_density_per_100k - headline.lowest_density_per_100k
    : null;
const topLondonLa = regions.find((r) => r.region === headline.highest_density_region)
  ?.top_local_authorities?.[0];

export const metadata: Metadata = {
  title: "Dental Practice Density by Region | England",
  description: `There are ${headline.total_dental_locations.toLocaleString("en-GB")} CQC-registered dental locations in England (${fmtDensity(headline.england_per_100k)} per 100,000 population). London has the highest density (${fmtDensity(headline.highest_density_per_100k)}/100k); ${headline.lowest_density_region} the lowest (${fmtDensity(headline.lowest_density_per_100k)}/100k). CQC open data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "Dental Practice Density by Region | Dental Finance Partners",
    description: "CQC-registered dental locations per 100,000 population by England region, from CQC open data.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is a dental desert?",
    answer:
      "A dental desert is an area with low access to dental services relative to population. There is no official threshold, but areas with significantly fewer dentists or dental practices per head of population than the England average are commonly described using this term. This index uses CQC-registered dental locations per 100,000 population as the access measure, which is the most granular public data available across England.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "Dental location counts come from the CQC Care Directory, a monthly release by the Care Quality Commission of all CQC-registered locations in England. We filter to locations where Service types equals 'Dentist'. Population figures are ONS mid-2024 estimates for England regions, published in September 2025. Both datasets are published under the Open Government Licence v3.0.",
  },
  {
    question: "Does this count all dentists or just practices?",
    answer:
      "This counts CQC-registered locations (practices), not individual dentists. A single practice may employ several dentists. The location count is the best publicly available proxy for geographic access. CQC registers both NHS and private practices, so the figures include all dental locations regardless of whether they accept NHS patients. A practice closed or inactive but not yet deregistered may still appear in the CQC directory.",
  },
  {
    question: "Why does London have the highest dental density?",
    answer:
      `London has the largest absolute number of CQC-registered dental locations of any England region${topLondonLa ? `, and one local authority, ${topLondonLa.local_authority}, accounts for ${topLondonLa.count} of them` : ""}. The published data measures locations and population, not ownership or patient mix, so it shows where practices are rather than why. Access is also uneven within the region: a regional rate averages over boroughs that differ widely from each other.`,
  },
  {
    question: "What does dental access mean for my practice finances?",
    answer:
      "In lower-density regions, NHS contract values may attract more patients, and private pay rates can command a premium due to limited competition. In high-density areas such as London, competition for private patients is higher but patient volumes can also be larger. Understanding the local density picture is one factor in practice valuation, goodwill calculations, and partnership or acquisition decisions. Our dental accountants work with practice principals across all regions.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Dental Practice Density by Region: England",
  description:
    "CQC-registered dental locations per 100,000 population by England region, compiled from CQC Care Directory open data.",
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
  name: "Dental Practice Density by Region: CQC-registered dental locations per 100,000 population",
  description:
    "Count of CQC-registered dental locations by England region, combined with ONS mid-2024 regional population estimates to compute dental locations per 100,000 population.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: meta.cqc_data_date,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "CQC-registered dental locations by England region",
    "ONS mid-2024 regional population",
    "Dental locations per 100,000 population by region",
  ],
};

const th = "py-2 pr-4 text-left text-sm font-semibold text-[var(--ink)]";
const td = "py-2 pr-4 text-sm text-[var(--ink-soft)]";

export default function DentalPracticeDensityPage() {
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
        crumb="Dental Practice Density"
        eyebrow="Dental Practice Density Index"
        title="England dental desert map: practices per 100,000 people, by region"
        intro={
          <>
            How many CQC-registered dental practices are there per 100,000 people in each England
            region? Built from the CQC Care Directory of {meta.cqc_data_date} and ONS mid-2024
            population estimates, and free to cite with attribution.
          </>
        }
        stats={[
          {
            value: fmtNumber(headline.total_dental_locations),
            label: "CQC-registered dental locations in England",
          },
          {
            value: fmtDensity(headline.england_per_100k),
            label: "dental locations per 100,000 people, England average",
          },
          {
            value: fmtDensity(headline.highest_density_per_100k),
            label: `per 100,000 in ${headline.highest_density_region ?? "the densest region"}, the highest of any region`,
          },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className={siteContainerLg}>
          <div className="max-w-4xl py-10 sm:py-14">
            <KeyFindings
              note={
                <>
                  Source: CQC Care Directory ({meta.cqc_data_date}) and ONS Mid-2024 Population
                  Estimates, both under the Open Government Licence v3.0. Figures may be cited with
                  attribution to Dental Finance Partners.
                </>
              }
            >
              <li>
                England has <strong>{fmtNumber(headline.total_dental_locations)}</strong>{" "}
                CQC-registered dental locations, an average of{" "}
                <strong>{fmtDensity(headline.england_per_100k)}</strong> per 100,000 people against
                the ONS mid-2024 population.
              </li>
              <li>
                <strong>{headline.highest_density_region}</strong> is the densest region at{" "}
                <strong>{fmtDensity(headline.highest_density_per_100k)}</strong> locations per
                100,000 people.
              </li>
              <li>
                <strong>{headline.lowest_density_region}</strong> is the thinnest at{" "}
                <strong>{fmtDensity(headline.lowest_density_per_100k)}</strong> per 100,000, a gap
                of {fmtDensity(densityGap)} per 100,000 against the densest region.
              </li>
              <li>
                The CQC directory registers NHS, mixed and private dental locations alike. This is a
                geographic access measure: it counts practice locations, not individual dentists or
                dental chairs.
              </li>
            </KeyFindings>

            <ReportSection id="density" title="Dental locations per 100,000 people, by region">
              <p>
                The chart ranks England regions by CQC-registered dental locations per 100,000
                people. Higher means more practices relative to the local population.
              </p>
              <ChartPanel>
                <DensityByRegionChart regions={knownRegions} />
              </ChartPanel>
            </ReportSection>

            <ReportSection id="count" title="Total dental locations by region">
              <p>
                The same directory counted in absolute terms. Regions with large populations
                naturally hold more practices, which is why the per-100,000 measure is the better
                access indicator and the raw count is the better capacity one.
              </p>
              <ChartPanel>
                <LocationCountByRegionChart regions={regions} />
              </ChartPanel>
            </ReportSection>

            <ReportSection id="by-region" title="Regional breakdown">
              <p>
                Every England region with a population denominator, with its location count, its
                mid-2024 population and the resulting rate.
              </p>
              <DataTableWrap>
                <table className="w-full border-collapse">
                  <caption className="sr-only">
                    CQC-registered dental locations, mid-2024 population and dental locations per
                    100,000 people, by England region
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-[var(--border)]">
                      <th scope="col" className={th}>Region</th>
                      <th scope="col" className={th}>Dental locations</th>
                      <th scope="col" className={th}>Population (mid-2024)</th>
                      <th scope="col" className={th}>Per 100,000</th>
                    </tr>
                  </thead>
                  <tbody>
                    {knownRegions.map((r) => (
                      <tr key={r.region} className="border-b border-[var(--border)]">
                        <th scope="row" className={`${th} font-semibold`}>{r.region}</th>
                        <td className={td}>{fmtNumber(r.dental_locations)}</td>
                        <td className={td}>{fmtNumber(r.population)}</td>
                        <td className={`${td} font-semibold text-[var(--ink)]`}>
                          {fmtDensity(r.per_100k)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-[var(--border)]">
                      <th scope="row" className={`${th} font-bold`}>England (placed regions)</th>
                      <td className={`${td} font-bold text-[var(--ink)]`}>
                        {fmtNumber(knownLocations)}
                      </td>
                      <td className={`${td} font-bold text-[var(--ink)]`}>
                        {fmtNumber(headline.england_population)}
                      </td>
                      <td className={`${td} font-bold text-[var(--ink)]`}>
                        {fmtDensity(headline.england_per_100k)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </DataTableWrap>
              {unplacedLocations > 0 && (
                <p className="text-sm text-[var(--muted)]">
                  {fmtNumber(unplacedLocations)} of the {fmtNumber(headline.total_dental_locations)}{" "}
                  locations in the directory carry no region, so they are in the England total and
                  in no regional rate. The England rate above is computed on the{" "}
                  {fmtNumber(knownLocations)} placed locations.
                </p>
              )}
            </ReportSection>

            <ReportSection id="methodology" title="Methodology and sources">
              <p>
                <strong>Dental location data.</strong> All location counts come from the CQC Care
                Directory, a monthly CSV release by the Care Quality Commission. We filter to rows
                where the Service types column equals exactly &apos;Dentist&apos;, and count by the
                Region column in the CQC dataset. The CQC registers every dental practice operating
                in England, whether or not it accepts NHS patients. Counts are point-in-time as at{" "}
                {meta.cqc_data_date}.
              </p>
              <p>
                <strong>Population data.</strong> Regional denominators are ONS Mid-2024 Population
                Estimates for England regions, published 26 September 2025. The ONS &apos;East of
                England&apos; region maps to the CQC &apos;East&apos; label, which is normalised
                accordingly.
              </p>
              <p>
                <strong>Caveats.</strong> The directory may include locations that have closed or
                gone inactive but are not yet deregistered. A location is a practice address, not an
                individual dentist, and practices differ in size. Scotland, Wales and Northern
                Ireland are regulated by separate bodies (Care Inspectorate, Healthcare Inspectorate
                Wales, RQIA) and are not included. Data generated {meta.generated_at}.
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
                  Download the density data (CSV)
                </Link>
              </p>
              <p className="text-sm text-[var(--muted)]">
                Free to cite and republish with attribution to Dental Finance Partners. This page is
                a data summary and does not constitute financial or business advice.
              </p>
            </ReportSection>

            <ClosingPanel heading="How does practice density affect your finances?">
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
                Density shapes patient demand, private fee potential, goodwill values and how
                attractive an NHS contract is in a given area. Whether you are buying, selling or
                planning your next move, the local market picture is one of the inputs. Our dental
                accountants work exclusively with dental professionals, across every region in the
                table above.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link
                  href="/for-practice-buyers"
                  className={reportLink}
                  data-cta="research_pillar_link"
                  data-cta-placement="research_report"
                  data-cta-goal="content"
                >
                  For practice buyers
                </Link>
                <Link
                  href="/for-principals"
                  className={reportLink}
                  data-cta="research_pillar_link"
                  data-cta-placement="research_report"
                  data-cta-goal="content"
                >
                  For practice principals
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
