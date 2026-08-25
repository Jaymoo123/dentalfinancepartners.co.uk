import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { buildDatasetJsonLd, buildFaqJsonLd } from "@/lib/schema";
import {
  AnnualAmountChart,
  AarPipelineChart,
  HorizontalBarChart,
} from "@/components/research/TechFundingReliefsCharts";
import {
  fmtGBPm,
  fmtNumber,
  fmtPercent0,
  type TechFundingRefiefsIndexSnapshot,
} from "@/lib/research/tech-funding-reliefs-index";
import { LeadForm } from "@/components/forms/LeadForm";
import data from "@/data/uk-tech-funding-reliefs-index.json";

const snapshot = data as unknown as TechFundingRefiefsIndexSnapshot;
const { meta, eis, seis } = snapshot;

const BRAND = "#4f46e5";
const PAGE_PATH = "/research/uk-tech-funding-reliefs-index";

export const metadata: Metadata = {
  title: "UK Tech-Funding Reliefs Index (SEIS/EIS) | Founder Tax Partners",
  description: `EIS raised £${eis.latest.amountAllM}m across ${eis.latest.companiesAll} UK companies in ${eis.latest.year}, ${eis.latest.infoCommsSharePct}% of it in Information & Communication. A sourced index of SEIS/EIS funding by sector and region, from HMRC official statistics. EIS from 1993-94, SEIS from 2012-13.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Tech-Funding Reliefs Index (SEIS/EIS) | Founder Tax Partners",
    description: `Where UK startup equity money actually goes. Tech is the top sector for both EIS (${eis.latest.infoCommsSharePct}%) and SEIS (${seis.latest.infoCommsSharePct}%). HMRC official statistics, ${eis.timeSeries[0].year} to ${eis.latest.year}.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What are SEIS and EIS?",
    answer:
      "The Seed Enterprise Investment Scheme (SEIS) and Enterprise Investment Scheme (EIS) are UK government tax-relief schemes that encourage individuals to invest in early-stage and growth-stage unquoted companies. Investors get significant income tax relief (50% for SEIS, 30% for EIS) plus capital gains benefits, in exchange for taking equity risk in smaller, higher-risk companies. Both schemes require the investee company to meet trading, size and age tests, and companies typically seek HMRC advance assurance before approaching investors.",
  },
  {
    question: "Why does the technology sector dominate SEIS/EIS funding?",
    answer:
      `Information & Communication is the single largest sector for both schemes: ${fmtPercent0(eis.latest.infoCommsSharePct)} of all EIS funds raised and ${fmtPercent0(seis.latest.infoCommsSharePct)} of SEIS funds in ${eis.latest.year} went to tech companies. Software and SaaS businesses fit the schemes' risk profile well: high growth potential, asset-light balance sheets that would otherwise struggle to raise debt finance, and a well-established pipeline of angel and VC investors familiar with claiming the reliefs. The concentration is self-reinforcing: as more tech-focused investors specialise in SEIS/EIS deals, tech founders raising equity default to these schemes.`,
  },
  {
    question: "Why is EIS/SEIS funding so concentrated in London and the South East?",
    answer:
      `${fmtPercent0(eis.byRegion.londonSouthEastSharePctLatest)} of EIS funds and ${fmtPercent0(seis.byRegion.londonSouthEastSharePctLatest)} of SEIS funds in ${eis.latest.year} went to companies registered in London and the South East. This tracks the concentration of the UK's angel investor and venture capital networks in and around London. It is a widely cited 'funding desert' problem for founders based elsewhere in the UK: regional companies can access the same reliefs, but the investor networks that use them are heavily London-weighted.`,
  },
  {
    question: "What is advance assurance and why does the pipeline data matter?",
    answer:
      `Advance assurance is HMRC's optional, non-binding indication of whether a proposed investment is likely to qualify for SEIS or EIS relief, sought before a company approaches investors. Most companies apply for it because investors expect it. In ${eis.aar.latestYear}, HMRC received ${fmtNumber(eis.aar.years[eis.aar.years.length - 1].applicationsReceived)} EIS advance assurance applications and ${fmtNumber(seis.aar.years[seis.aar.years.length - 1].applicationsReceived)} SEIS applications, a forward-looking signal of fundraising intentions that runs roughly a year ahead of the completed-funding data in the main tables.`,
  },
  {
    question: "Where does this data come from?",
    answer:
      "All figures come from HMRC's Enterprise Investment Scheme, Seed Enterprise Investment Scheme and Social Investment Tax Relief statistics, published annually each spring on gov.uk under the Open Government Licence v3.0. The EIS series runs from 1993-94 (the year the scheme launched) and the SEIS series from 2012-13. Sector and region breakdowns are published for the three most recent tax years only.",
  },
];

const datasetJsonLd = buildDatasetJsonLd({
  name: "UK Tech-Funding Reliefs Index (SEIS/EIS)",
  description: meta.description,
  url: `${siteConfig.url}${PAGE_PATH}`,
  dateModified: meta.lastUpdated,
  sources: [
    {
      name: meta.sources.hmrc_eis_seis_stats.name,
      url: meta.sources.hmrc_eis_seis_stats.url,
      licence: meta.sources.hmrc_eis_seis_stats.licence,
      publisher: meta.sources.hmrc_eis_seis_stats.publisher,
    },
  ],
});

const faqJsonLd = buildFaqJsonLd(faqs);

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/10 border border-white/20 p-6">
      <div className="text-4xl font-bold font-mono text-white">{value}</div>
      <div className="mt-2 text-sm font-semibold text-white/60 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function TechFundingReliefsIndexPage() {
  const latestSectorYear = eis.bySector.years[eis.bySector.years.length - 1];
  const eisSectorSorted = [...eis.bySector.rows].sort(
    (a, b) => (b.amountMByYear[latestSectorYear] ?? 0) - (a.amountMByYear[latestSectorYear] ?? 0)
  );
  const seisSectorSorted = [...seis.bySector.rows].sort(
    (a, b) => (b.amountMByYear[latestSectorYear] ?? 0) - (a.amountMByYear[latestSectorYear] ?? 0)
  );
  const eisRegionSorted = [...eis.byRegion.rows].sort(
    (a, b) => (b.amountMByYear[latestSectorYear] ?? 0) - (a.amountMByYear[latestSectorYear] ?? 0)
  );

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e1b4b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6"
          >
            Research
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            UK Tech-Funding Reliefs Index (SEIS/EIS)
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Where UK startup equity money actually goes, tracked from{" "}
            <a
              href={meta.sources.hmrc_eis_seis_stats.url}
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              HMRC&apos;s official EIS and SEIS statistics
            </a>
            . EIS from {eis.timeSeries[0].year} (the year the scheme launched), SEIS from{" "}
            {seis.timeSeries[0].year}. Data pulled {meta.pullDate}.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Stat
              value={fmtGBPm(eis.latest.amountAllM)}
              label={`raised via EIS in ${eis.latest.year}`}
            />
            <Stat
              value={fmtPercent0(eis.latest.infoCommsSharePct)}
              label="of all EIS funds went to tech (Info & Comms), the top sector"
            />
            <Stat
              value={fmtPercent0(eis.byRegion.londonSouthEastSharePctLatest)}
              label="of EIS funds went to London and the South East"
            />
          </div>

          <p className="mt-6 text-xs text-white/40 max-w-2xl">
            Source: {meta.sources.hmrc_eis_seis_stats.name} ({meta.sources.hmrc_eis_seis_stats.publisher}).
            Licence: Open Government Licence v3.0.
          </p>
        </div>
      </section>

      {/* Key findings */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">Key findings</h2>
          <div className="max-w-2xl rounded-md border-l-4 p-6 text-neutral-700 text-base leading-relaxed bg-neutral-50" style={{ borderColor: BRAND }}>
            <ul className="list-disc list-inside space-y-3">
              <li>
                In {eis.latest.year}, {fmtNumber(eis.latest.companiesAll)} companies raised{" "}
                {fmtGBPm(eis.latest.amountAllM)} through EIS. Information &amp; Communication was
                the single largest sector at {fmtGBPm(eis.latest.infoCommsAmountM)} (
                {fmtPercent0(eis.latest.infoCommsSharePct)} of the total).
              </li>
              <li>
                SEIS raised {fmtGBPm(seis.latest.amountAllM)} across{" "}
                {fmtNumber(seis.latest.companiesAll)} companies in {seis.latest.year}. Tech was
                even more dominant here: {fmtGBPm(seis.latest.infoCommsAmountM)} (
                {fmtPercent0(seis.latest.infoCommsSharePct)}) went to Information &amp;
                Communication companies.
              </li>
              <li>
                London and the South East together took{" "}
                {fmtPercent0(eis.byRegion.londonSouthEastSharePctLatest)} of EIS funding and{" "}
                {fmtPercent0(seis.byRegion.londonSouthEastSharePctLatest)} of SEIS funding in{" "}
                {eis.latest.year}, a sharp regional concentration in the UK&apos;s tax-advantaged
                startup funding market.
              </li>
              <li>
                Advance assurance applications, a forward-looking pipeline signal, ran ahead in{" "}
                {eis.aar.latestYear}: {fmtNumber(eis.aar.years[eis.aar.years.length - 1].applicationsReceived)}{" "}
                EIS applications ({fmtPercent0(eis.aar.latestApprovedSameYearPct)} approved in-year) and{" "}
                {fmtNumber(seis.aar.years[seis.aar.years.length - 1].applicationsReceived)} SEIS applications
                ({fmtPercent0(seis.aar.latestApprovedSameYearPct)} approved in-year).
              </li>
            </ul>
          </div>
          <p className="mt-4 max-w-2xl text-xs text-neutral-500">
            Source: {meta.sources.hmrc_eis_seis_stats.name}, under the Open Government Licence
            v3.0. Figures may be cited with attribution to Founder Tax Partners.
          </p>
        </div>
      </section>

      {/* Long-run time series */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            EIS funding, {eis.timeSeries[0].year} to {eis.latest.year}
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Total amount raised by all EIS companies each tax year (£ million). This is the
            longest continuous series in UK startup-funding data: EIS has run since the scheme
            launched in {eis.timeSeries[0].year}. The most recent year is highlighted.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <AnnualAmountChart
              data={eis.timeSeries.map((r) => ({ year: r.year, amountAllM: r.amountAllM }))}
              label="EIS amount raised by year"
            />
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            Amounts rounded by HMRC to the nearest £1 million. Source: HMRC EIS statistics
            (Table 2), OGL v3.0.
          </p>
        </div>
      </section>

      {/* Sector breakdown */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            EIS funding by sector, {latestSectorYear}
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Amount raised by sector (Standard Industrial Classification 2007), highest first.
            Information &amp; Communication, the tech sector, is the largest single category.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <HorizontalBarChart
              data={eisSectorSorted.map((r) => ({
                label: r.industry,
                value: r.amountMByYear[latestSectorYear],
                sharePct: r.amountSharePctLatest,
                highlight: r.industryFull === "J. Information and Communication",
              }))}
            />
          </div>

          <h3 className="mt-12 text-xl font-bold text-neutral-900 mb-4">
            SEIS funding by sector, {latestSectorYear}
          </h3>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            SEIS funds the earliest-stage companies. Tech&apos;s dominance is even more
            pronounced here than in EIS.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <HorizontalBarChart
              data={seisSectorSorted.map((r) => ({
                label: r.industry,
                value: r.amountMByYear[latestSectorYear],
                sharePct: r.amountSharePctLatest,
                highlight: r.industryFull === "J. Information and Communication",
              }))}
            />
          </div>
        </div>
      </section>

      {/* Regional breakdown */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            EIS funding by region, {latestSectorYear}
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Regional allocation is based on the postcode of the company&apos;s registered
            office, which may not match where the investment or trading activity actually took
            place. London and the South East combined account for{" "}
            {fmtPercent0(eis.byRegion.londonSouthEastSharePctLatest)} of all EIS funds raised.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <HorizontalBarChart
              data={eisRegionSorted.map((r) => ({
                label: r.region,
                value: r.amountMByYear[latestSectorYear],
                sharePct: r.amountSharePctLatest,
                highlight: r.region === "London" || r.region === "South East",
              }))}
            />
          </div>
        </div>
      </section>

      {/* Advance assurance pipeline */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Advance assurance: the forward-looking pipeline
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Advance assurance requests run roughly a year ahead of completed funding: companies
            apply before approaching investors. EIS applications received (light) versus
            approved in the same tax year (dark).
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <AarPipelineChart
              years={eis.aar.years.map((y) => ({
                year: y.year,
                applicationsReceived: y.applicationsReceived,
                approvedSameYear: y.approvedSameYear,
              }))}
            />
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            Source: HMRC EIS statistics (Table 11), OGL v3.0. &apos;Approved in the same year&apos;
            understates the true approval rate for the most recent 1 to 2 years, since some
            pending applications are still being processed.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="bg-neutral-50 border-t border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Methodology and honest limitations
          </h2>
          <div className="max-w-2xl space-y-6 text-sm text-neutral-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Source</h3>
              <p>{meta.methodology}</p>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Caveats</h3>
              <ul className="list-disc list-inside space-y-2">
                {meta.caveats.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Re-running the pull</h3>
              <p>
                The pull script is at{" "}
                <code className="bg-neutral-100 px-1 rounded text-xs">
                  startups-tech/pipeline/pull_eis_seis_index.py
                </code>
                . It downloads the current HMRC EIS/SEIS statistical tables (ODS format) and
                regenerates the JSON file that powers this page. No manual figures are entered
                anywhere in this pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sources and cite-as */}
      <section className="bg-white border-t border-neutral-200 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">Sources and how to cite</h2>
          <div className="max-w-2xl space-y-4 text-sm text-neutral-600">
            <div>
              <p className="font-semibold text-neutral-900">Primary source</p>
              <p>
                <a
                  href={meta.sources.hmrc_eis_seis_stats.url}
                  className="text-[#4f46e5] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {meta.sources.hmrc_eis_seis_stats.name}
                </a>
                . Publisher: {meta.sources.hmrc_eis_seis_stats.publisher}. Licence: Open
                Government Licence v3.0. Data pulled {meta.pullDate}.
              </p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Cite this index as</p>
              <blockquote className="border-l-4 border-neutral-300 pl-4 text-neutral-500 italic text-xs">
                {meta.citeAs}
              </blockquote>
            </div>
            <p className="text-sm">
              <Link href={`${PAGE_PATH}/data`} className="font-semibold text-[#4f46e5] hover:opacity-75">
                Download the full dataset (CSV)
              </Link>
            </p>
            <p className="text-xs text-neutral-400">Last updated: {meta.lastUpdated}.</p>
          </div>
        </div>
      </section>

      {/* Conversion */}
      <section className="bg-[#1e1b4b] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Raising a SEIS or EIS round?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Advance assurance and SEIS1/EIS1 compliance statements are accountant territory:
            getting the company and investor tests right before you approach investors avoids
            relief being clawed back later. We handle advance assurance applications and
            post-investment compliance for founders raising SEIS or EIS.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services/seis-eis-advance-assurance"
              className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#1e1b4b] hover:bg-white/90 transition-colors"
            >
              SEIS/EIS advance assurance
            </Link>
            <Link
              href="/calculators/seis-eis-relief-calculator"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              SEIS/EIS relief calculator
            </Link>
          </div>
          <div className="mt-10 max-w-xl">
            <LeadForm redirectOnSuccess={false} submitLabel="Get advance assurance help" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">
            Frequently asked questions
          </h2>
          <div className="max-w-2xl space-y-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-700">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
