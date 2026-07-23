import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { buildFaqJsonLd } from "@/lib/schema";
import { SequentialBarChart, RatingStackChart } from "@/components/research/CareDensityQualityCharts";
import {
  fmtNumber,
  fmtPct,
  fmtDate,
  sortedDomains,
  type CareDensityQualitySnapshot,
  type RatingPct,
} from "@/lib/research/care-density-quality-index";
import snapshot from "@/data/uk-care-density-quality-index.json";

const data = snapshot as unknown as CareDensityQualitySnapshot;
const { meta, national, domain_ratings, regions, care_deserts, best_provided_local_authorities, local_authorities } = data;

const PAGE_PATH = "/research/uk-care-density-quality-index";

const HEADLINE_SENTENCE = `England has ${fmtPct(national.beds_per_100_over65)} care home beds for every 100 people aged 65 and over`;

export const metadata: Metadata = {
  title: `UK Care Home Density & Quality Index | ${siteConfig.name}`,
  description: `${HEADLINE_SENTENCE}. A region-by-region and local-authority map of care home beds, CQC rating quality and closure churn, built from CQC open data and ONS mid-2024 population estimates. Updated ${fmtDate(meta.generated_at)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: `UK Care Home Density & Quality Index | ${siteConfig.name}`,
    description: `${HEADLINE_SENTENCE}. Region and local-authority level data, no individual care home named.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "How many care home beds are there in England?",
    answer: `There are ${fmtNumber(national.beds_total)} beds across ${fmtNumber(national.active_care_homes)} CQC-registered care homes in England, based on the CQC HSCA Active Locations extract. That works out at ${fmtPct(national.beds_per_100_over65)} beds for every 100 people aged 65 and over, using ONS mid-2024 population estimates. Some of those beds serve working-age adults (learning disability, mental health and physical disability services), so the ratio is a density proxy rather than an exact elderly-occupancy figure.`,
  },
  {
    question: "What counts as a 'care desert' in this index?",
    answer: "A local authority with a low number of care home beds relative to its population aged 65 and over, restricted to local authorities with at least 5 active care homes so a single-home area cannot distort the per-capita figure. It measures registered bed capacity, not care quality or waiting times, and it names local authority areas only, never an individual care home or provider.",
  },
  {
    question: "What share of care homes are rated Good or Outstanding by the CQC?",
    answer: `${fmtPct(national.good_or_above_pct)} of active care homes hold an overall CQC rating of Good or Outstanding. ${fmtPct(national.rating_pct.Inadequate)} are rated Inadequate and ${fmtPct(national.rating_pct["Requires improvement"])} Requires improvement. A further ${fmtPct(national.rating_pct["Not yet rated"])} are not yet rated, typically because the location has recently registered or has not been inspected under the current framework.`,
  },
  {
    question: "Does this index name individual care homes?",
    answer: "No. Every figure on this page is aggregated by region or local authority. No individual care home, provider or registered manager is named or ranked anywhere in this dataset. That is a deliberate editorial rule, not a data limitation: CQC's own location-level data is public and OGL-licensed, but a named 'worst care homes' ranking is not something we publish.",
  },
  {
    question: "What is care home closure churn and how is it measured?",
    answer: `We count CQC 'Location HSCA End Date' deactivations of care homes in the trailing 12 months to ${meta.churn_window.to}, aggregated by region and local authority. A deactivation can reflect an outright closure, but it can also reflect a change of registered provider or a relocation, so the figure should be read as registration turnover rather than solely business failure. Nationally, ${fmtNumber(national.deactivations_12m)} care home locations were deactivated in the trailing 12 months, representing ${fmtNumber(national.beds_lost_12m)} beds.`,
  },
  {
    question: "Where does this data come from?",
    answer: "Three CQC extracts (HSCA Active Locations with filters and ratings, Deactivated Locations, and ratings by domain), published under the Open Government Licence v3.0, cross-referenced with the Office for National Statistics' mid-2024 (MYE24) population estimates for local authority districts and regions in England, also OGL-licensed. CQC data covers England only; it does not regulate care homes in Scotland, Wales or Northern Ireland.",
  },
];

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: meta.title,
  description: meta.description,
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: { "@type": "Organization", "@id": `${siteConfig.url}#organization`, name: siteConfig.name },
  dateModified: meta.generated_at,
  temporalCoverage: `${meta.churn_window.from}/${meta.churn_window.to}`,
  spatialCoverage: "England",
  isAccessibleForFree: true,
  distribution: [
    { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${siteConfig.url}${PAGE_PATH}/data` },
  ],
  variableMeasured: [
    "Active care home locations by region and local authority",
    "Registered care home beds by region and local authority",
    "Care home beds per 100 population aged 65 and over",
    "CQC overall rating distribution by region and local authority",
    "CQC domain rating distribution (Safe, Effective, Caring, Responsive, Well-led)",
    "Care home deactivations (closure/registration churn) in the trailing 12 months",
  ],
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="text-3xl font-bold text-[var(--brand-primary)] sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">{children}</div>
    </section>
  );
}

const domains = sortedDomains(domain_ratings);
const regionsByDensity = [...regions].sort((a, b) => (b.beds_per_100_over65 ?? 0) - (a.beds_per_100_over65 ?? 0));
const regionsByChurn = [...regions].sort((a, b) => (b.churn_rate_pct ?? 0) - (a.churn_rate_pct ?? 0));

function toStackRow(ratingPct: RatingPct) {
  return {
    outstandingOrGood: (ratingPct.Outstanding ?? 0) + (ratingPct.Good ?? 0),
    requiresImprovement: ratingPct["Requires improvement"] ?? 0,
    inadequate: ratingPct.Inadequate ?? 0,
    notYetRated: ratingPct["Not yet rated"] ?? 0,
  };
}

export default function CareDensityQualityIndexPage() {
  const nationalStack = [
    {
      label: "England (all care homes)",
      outstandingOrGood: national.rating_pct.Outstanding + national.rating_pct.Good,
      requiresImprovement: national.rating_pct["Requires improvement"],
      inadequate: national.rating_pct.Inadequate,
      notYetRated: national.rating_pct["Not yet rated"],
    },
  ];

  const regionStack = regions.map((r) => ({ label: r.region, ...toStackRow(r.rating_pct) }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }} />

      <main>
        <section className="bg-[var(--brand-primary)] py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              UK Care Home Density &amp; Quality Index
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              {HEADLINE_SENTENCE}. Beds per capita, CQC rating quality and closure churn, mapped by
              region and local authority from CQC open data and ONS mid-2024 population estimates.
              Updated {fmtDate(meta.generated_at)}.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="-mt-8 grid gap-4 sm:grid-cols-4">
            <Stat value={fmtNumber(national.active_care_homes)} label="active CQC-registered care homes in England" />
            <Stat value={fmtNumber(national.beds_total)} label="registered care home beds" />
            <Stat value={fmtPct(national.beds_per_100_over65)} label="beds per 100 people aged 65+" />
            <Stat value={fmtPct(national.good_or_above_pct)} label="rated Good or Outstanding overall" />
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--brand-primary)]/25 bg-[var(--brand-primary)]/5 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[var(--ink)]">Key findings</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--ink-soft)]">
              <li>
                England has {fmtNumber(national.beds_total)} registered care home beds across{" "}
                {fmtNumber(national.active_care_homes)} CQC-active locations, or {fmtPct(national.beds_per_100_over65)}{" "}
                beds per 100 people aged 65 and over nationally.
              </li>
              <li>
                Bed density varies substantially by region: {regionsByDensity[0]?.region} has the highest ratio at{" "}
                {fmtPct(regionsByDensity[0]?.beds_per_100_over65)} beds per 100 over-65s, against{" "}
                {fmtPct(regionsByDensity[regionsByDensity.length - 1]?.beds_per_100_over65)} in{" "}
                {regionsByDensity[regionsByDensity.length - 1]?.region}.
              </li>
              <li>
                {fmtPct(national.good_or_above_pct)} of care homes hold an overall CQC rating of Good or Outstanding;{" "}
                {fmtPct(national.rating_pct.Inadequate)} are rated Inadequate and{" "}
                {fmtPct(national.rating_pct["Requires improvement"])} Requires improvement.
              </li>
              <li>
                Across the five CQC inspection domains, Well-led has the lowest Good-or-above share at{" "}
                {fmtPct(domain_ratings["Well-led"]?.good_or_above_pct)}, while Caring is highest at{" "}
                {fmtPct(domain_ratings["Caring"]?.good_or_above_pct)}.
              </li>
              <li>
                {fmtNumber(national.deactivations_12m)} care home locations were deactivated on the CQC register in
                the trailing 12 months to {meta.churn_window.to} ({fmtPct(national.churn_rate_pct)} of the combined
                active-plus-deactivated base), representing {fmtNumber(national.beds_lost_12m)} beds.
              </li>
            </ul>
            <p className="mt-4 text-xs text-[var(--muted)]">
              Source: CQC open data and ONS mid-2024 population estimates, both under the Open Government Licence
              v3.0. Aggregated by region and local authority only; no individual care home or provider is named.
              Figures may be cited with attribution to {siteConfig.name}.
            </p>
          </div>

          <Section id="density" title="Care home beds per 100 people aged 65 and over, by region">
            <p>
              Each region&apos;s registered care home beds, divided by its ONS mid-2024 population aged 65 and over
              and expressed per 100. This is a capacity ratio, not an occupancy figure: it does not mean 1 in ~23
              older people are in a care home today, only that this many beds exist relative to the older
              population in that region.
            </p>
            <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-6">
              <SequentialBarChart
                rows={regionsByDensity.map((r) => ({ label: r.region, value: r.beds_per_100_over65 ?? 0 }))}
              />
            </div>
          </Section>

          <Section id="quality" title="CQC overall rating quality, nationally and by region">
            <p>
              CQC&apos;s overall rating for each care home rolls up five inspection domains into a single rating:
              Outstanding, Good, Requires improvement or Inadequate. Outstanding and Good are combined below as a
              single &ldquo;Outstanding or Good&rdquo; segment.
            </p>
            <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-6">
              <RatingStackChart rows={nationalStack} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-[var(--ink)]">By region</h3>
            <div className="not-prose mt-4 rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-6">
              <RatingStackChart rows={regionStack} />
            </div>
          </Section>

          <Section id="domains" title="Rating quality by CQC inspection domain">
            <p>
              Every CQC inspection assesses five domains separately before rolling up to the overall rating. The
              chart below shows the share of care homes rated Good or Outstanding on each domain, nationally.
              Well-led (governance and leadership) and Safe consistently score lower than Caring, which is the
              domain families and residents interact with most directly.
            </p>
            <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-6">
              <SequentialBarChart
                rows={domains.map(([name, d]) => ({ label: name, value: d.good_or_above_pct ?? 0 }))}
                unit="%"
                maxOverride={100}
              />
            </div>
          </Section>

          <Section id="care-deserts" title="Care deserts and best-provided areas">
            <p>
              Local authorities with the lowest and highest care home beds per 100 people aged 65 and over,
              restricted to local authorities with at least 5 active care homes so a single-home area cannot
              distort a per-capita ratio. These are area-level figures; no individual care home is identified.
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Lowest bed density</h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                        <th className="py-2 pr-3 font-semibold">Local authority</th>
                        <th className="py-2 text-right font-semibold">Beds/100 65+</th>
                      </tr>
                    </thead>
                    <tbody>
                      {care_deserts.map((r) => (
                        <tr key={r.local_authority} className="border-b border-[var(--border)]/60">
                          <td className="py-2 pr-3">{r.local_authority}</td>
                          <td className="py-2 text-right tabular-nums">{fmtPct(r.beds_per_100_over65)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--muted)]">Highest bed density</h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                        <th className="py-2 pr-3 font-semibold">Local authority</th>
                        <th className="py-2 text-right font-semibold">Beds/100 65+</th>
                      </tr>
                    </thead>
                    <tbody>
                      {best_provided_local_authorities.map((r) => (
                        <tr key={r.local_authority} className="border-b border-[var(--border)]/60">
                          <td className="py-2 pr-3">{r.local_authority}</td>
                          <td className="py-2 text-right tabular-nums">{fmtPct(r.beds_per_100_over65)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Section>

          <Section id="churn" title="Closure and registration churn by region">
            <p>
              Care home locations deactivated on the CQC register in the trailing 12 months to{" "}
              {meta.churn_window.to}, by region. A deactivation can reflect an outright closure, a change of
              registered provider, or a relocation, so this is registration turnover rather than a pure business
              failure count.
            </p>
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Region</th>
                    <th className="py-2 pr-4 text-right font-semibold">Deactivations (12m)</th>
                    <th className="py-2 pr-4 text-right font-semibold">Beds lost (12m)</th>
                    <th className="py-2 text-right font-semibold">Churn rate</th>
                  </tr>
                </thead>
                <tbody>
                  {regionsByChurn.map((r) => (
                    <tr key={r.region} className="border-b border-[var(--border)]/60">
                      <td className="py-2 pr-4">{r.region}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(r.deactivations_12m)}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(r.beds_lost_12m)}</td>
                      <td className="py-2 text-right tabular-nums">{fmtPct(r.churn_rate_pct)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="regions-table" title="Full region table">
            <div className="overflow-x-auto">
              <table className="mt-2 w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pr-4 font-semibold">Region</th>
                    <th className="py-2 pr-4 text-right font-semibold">Care homes</th>
                    <th className="py-2 pr-4 text-right font-semibold">Beds</th>
                    <th className="py-2 pr-4 text-right font-semibold">Pop. 65+</th>
                    <th className="py-2 pr-4 text-right font-semibold">Beds/100 65+</th>
                    <th className="py-2 text-right font-semibold">Good or above</th>
                  </tr>
                </thead>
                <tbody>
                  {[...regions].sort((a, b) => a.region.localeCompare(b.region)).map((r) => (
                    <tr key={r.region} className="border-b border-[var(--border)]/60">
                      <td className="py-2 pr-4">{r.region}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(r.active_care_homes)}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(r.beds_total)}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtNumber(r.population_65_plus)}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">{fmtPct(r.beds_per_100_over65)}</td>
                      <td className="py-2 text-right tabular-nums">{fmtPct(r.good_or_above_pct)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="la-table" title="Full local authority table (England)">
            <p>
              All {local_authorities.length} English local authorities with at least one active CQC-registered care
              home, sorted alphabetically. Download the complete dataset, including deactivation and churn columns,
              as CSV below.
            </p>
            <div className="max-h-[36rem] overflow-y-auto overflow-x-auto rounded-lg border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[var(--surface)]">
                  <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
                    <th className="py-2 pl-3 pr-4 font-semibold">Local authority</th>
                    <th className="py-2 pr-4 text-right font-semibold">Care homes</th>
                    <th className="py-2 pr-4 text-right font-semibold">Beds</th>
                    <th className="py-2 pr-4 text-right font-semibold">Beds/100 65+</th>
                    <th className="py-2 pr-3 text-right font-semibold">Good or above</th>
                  </tr>
                </thead>
                <tbody>
                  {local_authorities.map((r) => (
                    <tr key={r.local_authority} className="border-b border-[var(--border)]/60">
                      <td className="py-1.5 pl-3 pr-4">{r.local_authority}</td>
                      <td className="py-1.5 pr-4 text-right tabular-nums">{fmtNumber(r.active_care_homes)}</td>
                      <td className="py-1.5 pr-4 text-right tabular-nums">{fmtNumber(r.beds_total)}</td>
                      <td className="py-1.5 pr-4 text-right tabular-nums">{fmtPct(r.beds_per_100_over65)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{fmtPct(r.good_or_above_pct)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="methodology" title="Methodology and sources">
            <p>{meta.methodology}</p>
            <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Caveats</h3>
            <ul className="list-disc space-y-1 pl-6 text-sm">
              {meta.caveats.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <h3 className="mt-4 text-lg font-semibold text-[var(--ink)]">Sources</h3>
            <ul className="space-y-1 text-sm">
              {meta.sources.map((s) => (
                <li key={s.name}>
                  <a href={s.url} rel="noopener noreferrer" className="text-[var(--brand-primary)] underline">
                    {s.name}
                  </a>{" "}
                  <span className="text-[var(--muted)]">
                    ({s.publisher}, {s.licence}{s.cadence ? `, ${s.cadence.toLowerCase()}` : ""}{s.vintage ? `, ${s.vintage}` : ""})
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              Pull date: {fmtDate(meta.generated_at)}. Churn window: {meta.churn_window.from} to{" "}
              {meta.churn_window.to}. Refreshed periodically as CQC republishes its monthly extracts.
            </p>
            <p className="text-sm">
              Download the full dataset:{" "}
              <Link href={`${PAGE_PATH}/data`} className="font-semibold text-[var(--brand-primary)] underline">
                {PAGE_PATH}/data
              </Link>{" "}
              (CSV). See also the{" "}
              <Link href="/research/care-provider-business-index" className="font-semibold text-[var(--brand-primary)] underline">
                Care Provider Business Index
              </Link>{" "}
              for the Companies House incorporation view of the whole care sector.
            </p>
            <p className="text-xs text-[var(--muted)]">
              Free to cite and republish with attribution to {siteConfig.name}. This page is a data summary and does
              not constitute regulatory, financial or care-quality advice on any individual provider.
            </p>
          </Section>

          <div className="mt-10 rounded-2xl border-2 border-[var(--brand-primary)]/20 bg-gradient-to-br from-[var(--brand-primary)]/10 to-white p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              Registering, buying or selling a care home?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              New providers need a CQC-compliant financial viability statement before registration; buyers and
              sellers need capital allowances, BADR and propco/opco structures sequenced correctly. We work with
              care operators on both.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <Link href="/services/cqc-financial-viability-statement" className="text-[var(--brand-primary)] underline">
                CQC financial viability statement &rarr;
              </Link>
              <Link href="/services/buying-a-care-home" className="text-[var(--brand-primary)] underline">
                Buying a care home &rarr;
              </Link>
            </div>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Get a free care home review" />
            </div>
          </div>

          <div className="mt-12 pb-16">
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-6 space-y-6">
              {faqs.map((f, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-[var(--ink)]">{f.question}</h3>
                  <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
