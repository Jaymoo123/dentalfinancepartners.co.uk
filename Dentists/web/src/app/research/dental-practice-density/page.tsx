import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import {
  DensityByRegionChart,
  LocationCountByRegionChart,
} from "@/components/research/DentalDensityCharts";
import {
  fmtDensity,
  fmtNumber,
  type DentalPracticeDensitySnapshot,
} from "@/lib/research/dental-practice-density";
import snapshot from "@/data/dental-practice-density.json";

const data = snapshot as unknown as DentalPracticeDensitySnapshot;
const { meta, headline, regions } = data;

const PAGE_PATH = "/research/dental-practice-density";

export const metadata: Metadata = {
  title: "Dental Practice Density by Region | England | Dental Finance Partners",
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
      "London has both a high absolute number of dental practices and a concentration of private dental practices serving a dense, mobile population. The capital's higher average income also sustains a larger private sector. Westminster alone has over 260 CQC-registered dental locations. However, access is uneven within London: outer boroughs have lower densities than the centre.",
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-neutral-300">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-neutral-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

export default function DentalPracticeDensityPage() {
  const knownRegions = regions.filter((r) => r.per_100k !== null);

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

      {/* Hero */}
      <section className="hero-brand py-12 sm:py-16">
        <div className={`hero-inner ${siteContainerLg}`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "Dental Practice Density" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">
            Dental Practice Density Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            England dental desert map: practices per 100,000 population by region
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            How many CQC-registered dental practices are there per 100,000 people in each England
            region? Data from the CQC Care Directory ({meta.cqc_data_date}) combined with ONS
            mid-2024 population estimates.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat
              value={fmtNumber(headline.total_dental_locations)}
              label="CQC-registered dental locations in England"
            />
            <Stat
              value={`${fmtDensity(headline.england_per_100k)}`}
              label="per 100,000 population (England average)"
            />
            <Stat
              value={`${fmtDensity(headline.highest_density_per_100k)}`}
              label={`per 100k in ${headline.highest_density_region ?? "n/a"} (highest)`}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key findings */}
            <div className="rounded-2xl border border-[var(--gold)]/20 bg-amber-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[var(--navy)]">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  England has <strong>{fmtNumber(headline.total_dental_locations)}</strong> CQC-registered
                  dental locations, an average of <strong>{fmtDensity(headline.england_per_100k)}</strong> per
                  100,000 population (ONS mid-2024).
                </li>
                <li>
                  <strong>{headline.highest_density_region}</strong> has the highest density at{" "}
                  <strong>{fmtDensity(headline.highest_density_per_100k)}</strong> per 100,000, driven by
                  a concentration of private practices in central areas.
                </li>
                <li>
                  <strong>{headline.lowest_density_region}</strong> has the lowest density at{" "}
                  <strong>{fmtDensity(headline.lowest_density_per_100k)}</strong> per 100,000, a gap of{" "}
                  {fmtDensity(
                    headline.highest_density_per_100k !== null && headline.lowest_density_per_100k !== null
                      ? headline.highest_density_per_100k - headline.lowest_density_per_100k
                      : null
                  )}{" "}
                  per 100k against the highest-density region.
                </li>
                <li>
                  The CQC directory registers both NHS and private dental locations. The density
                  measure is a geographic access proxy: it counts practice locations, not individual
                  dentists or dental chairs.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: CQC Care Directory ({meta.cqc_data_date}) and ONS Mid-2024 Population
                Estimates, both under the Open Government Licence v3.0. Figures may be cited with
                attribution to Dental Finance Partners.
              </p>
            </div>

            <Section id="density" title="Dental locations per 100,000 population by region">
              <p>
                The chart ranks England regions by CQC-registered dental locations per 100,000
                population. This is the standard access measure: higher means more practices
                relative to the local population.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <DensityByRegionChart regions={knownRegions} />
              </div>
            </Section>

            <Section id="count" title="Total dental locations by region">
              <p>
                The chart shows the raw count of CQC-registered dental locations by region.
                Regions with large populations naturally have more practices in absolute terms,
                which is why the per-100k measure is the better access indicator.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <LocationCountByRegionChart regions={regions} />
              </div>
            </Section>

            <Section id="by-region" title="Regional breakdown">
              <p>The table below shows all England regions with dental location counts, regional
              population, and the per-100k density figure.</p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Region</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900">Dental locations</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900">Population (mid-2024)</th>
                      <th className="py-2 font-bold text-neutral-900">Per 100k</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regions
                      .filter((r) => r.per_100k !== null)
                      .map((r) => (
                        <tr key={r.region} className="border-b border-neutral-200">
                          <td className="py-2 pr-4 font-semibold text-neutral-900">{r.region}</td>
                          <td className="py-2 pr-4 text-neutral-700">{fmtNumber(r.dental_locations)}</td>
                          <td className="py-2 pr-4 text-neutral-700">{fmtNumber(r.population)}</td>
                          <td className="py-2 font-semibold text-[var(--navy)]">{fmtDensity(r.per_100k)}</td>
                        </tr>
                      ))}
                    <tr className="border-t-2 border-neutral-300">
                      <td className="py-2 pr-4 font-bold text-[var(--navy)]">England (known regions)</td>
                      <td className="py-2 pr-4 font-bold text-neutral-900">
                        {fmtNumber(knownRegions.reduce((s, r) => s + r.dental_locations, 0))}
                      </td>
                      <td className="py-2 pr-4 font-bold text-neutral-900">
                        {fmtNumber(headline.england_population)}
                      </td>
                      <td className="py-2 font-bold text-[var(--navy)]">
                        {fmtDensity(headline.england_per_100k)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Dental location data.</strong> All dental location counts come from the CQC
                Care Directory, a monthly CSV release by the Care Quality Commission. We filter
                to rows where the Service types column equals exactly &apos;Dentist&apos;. Locations are
                counted by the Region column in the CQC dataset. The CQC registers all dental
                practices operating in England, regardless of whether they accept NHS patients.
                Counts are point-in-time as at {meta.cqc_data_date}.
              </p>
              <p>
                <strong>Population data.</strong> Regional population denominators are ONS Mid-2024
                Population Estimates for England regions, published 26 September 2025. The ONS
                &apos;East of England&apos; region maps to the CQC &apos;East&apos; label, which is normalised
                accordingly.
              </p>
              <p>
                <strong>Caveats.</strong> The CQC directory may include locations that have closed
                or are inactive but not yet deregistered. A location is a practice address, not an
                individual dentist. Scotland, Wales, and Northern Ireland are regulated by separate
                bodies (Care Inspectorate, Healthcare Inspectorate Wales, RQIA) and are not
                included. Data generated {meta.generated_at}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      className="font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)]"
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
                  className="font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  Download the density data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Dental Finance Partners. This page is
                a data summary and does not constitute financial or business advice.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-[var(--gold)]/20 bg-gradient-to-br from-amber-50 to-yellow-50/50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--navy)] sm:text-3xl">
                How does practice density affect your finances?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Practice density shapes patient demand, private fee potential, goodwill values, and
                NHS contract attractiveness in your area. Whether you are buying, selling, or
                planning your next move, understanding the local market is essential. Our dental
                accountants work exclusively with dental professionals across all regions.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/for-practice-buyers"
                  className="text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  For practice buyers &rarr;
                </Link>
                <Link
                  href="/for-principals"
                  className="text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  For practice principals &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Speak to a dental accountant" />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Frequently asked questions
              </h2>
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
