import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { buildDatasetJsonLd, buildFaqJsonLd } from "@/lib/schema";
import {
  AnnualSeriesChart,
  HorizontalBarChart,
} from "@/components/research/TechFundingReliefsCharts";
import {
  fmtGBPbn,
  fmtGBPm,
  fmtNumber,
  fmtPercent0,
  type RdTaxReliefIndexSnapshot,
} from "@/lib/research/rd-tax-relief-index";
import { LeadForm } from "@/components/forms/LeadForm";
import data from "@/data/rd-tax-relief-index.json";

const snapshot = data as unknown as RdTaxReliefIndexSnapshot;
const { meta, claimsSeries, headline, sector, region } = snapshot;

const BRAND = "#4f46e5";
const PAGE_PATH = "/research/rd-tax-relief-index";

export const metadata: Metadata = {
  title: "R&D Tax Relief Usage Index: The Post-Clampdown Squeeze on Tech | Founder Tax Partners",
  description: `UK R&D tax credit claims fell ${fmtPercent0(Math.abs(headline.yoyClaimsPct ?? 0))} to ${fmtNumber(headline.totalClaims)} in ${headline.latestYear} after HMRC's anti-fraud clampdown. Information & Communication is the largest sector by claim count. Sourced from HMRC official statistics.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "R&D Tax Relief Usage Index | Founder Tax Partners",
    description: `The R&D relief squeeze on tech: claims fell ${fmtPercent0(Math.abs(headline.yoyClaimsPct ?? 0))} in ${headline.latestYear} after HMRC's compliance clampdown. Tech remains the largest sector by claim volume.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "Why did R&D tax credit claims fall so sharply?",
    answer:
      `HMRC introduced a sustained anti-fraud and error compliance programme from 2023 onward: mandatory claim notification for new claimants, a required Additional Information Form setting out the R&D in detail, and a large increase in compliance checks on submitted claims. Total claims fell from 63,780 in 2022-23 to ${fmtNumber(headline.totalClaims)} in ${headline.latestYear}, a fall of ${fmtPercent0(Math.abs(headline.yoyClaimsPct ?? 0))}. HMRC's own analysis attributes a large part of the earlier claim volume to error and fraud in the SME scheme, which the clampdown specifically targeted.`,
  },
  {
    question: "Is the tech sector still a major claimant of R&D relief?",
    answer:
      `Yes. Information & Communication is the largest single sector by number of claims (${fmtNumber(headline.infoCommsClaims)} claims, ${fmtPercent0(headline.infoCommsClaimsSharePct)} of the UK total) and the second-largest by cost (${fmtGBPm(headline.infoCommsCostM)}, ${fmtPercent0(headline.infoCommsCostSharePct)} of the total). Together with Manufacturing and Professional, Scientific & Technical services, these three sectors account for ${fmtPercent0(headline.top3SectorsClaimsSharePct)} of all claims and ${fmtPercent0(headline.top3SectorsCostSharePct)} of all relief paid.`,
  },
  {
    question: "What is the difference between the SME scheme, RDEC and the merged scheme?",
    answer:
      "Historically, smaller companies claimed under the SME scheme (a more generous deduction plus a payable credit for loss-makers) while larger companies used the Research and Development Expenditure Credit (RDEC), a taxable above-the-line credit. For accounting periods beginning on or after 1 April 2024, the two were merged into a single scheme paying a 20% above-the-line credit for most companies, with an Enhanced R&D Intensive Support (ERIS) rate for loss-making, R&D-intensive SMEs. The historical data in this index predates the merger and reflects the old scheme structure.",
  },
  {
    question: "How much scrutiny does an R&D claim now face?",
    answer:
      "Considerably more than before the clampdown. Claim notification is required within 6 months of the accounting period end for companies that have not claimed in the prior three years, an Additional Information Form must accompany every claim describing the qualifying activity in technical detail, and HMRC's compliance team reviews a much larger proportion of claims than in earlier years. The claim collapse visible in this index is, in large part, the direct effect of that scrutiny discouraging speculative or weakly-evidenced claims.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All figures come from HMRC's Research and Development Tax Credits Statistics, published annually each September on gov.uk under the Open Government Licence v3.0. Figures for the most recent 1 to 3 years are provisional and, for the very latest year, uplifted by HMRC to estimate claims not yet received; both are subject to upward revision in the next annual release.",
  },
];

const datasetJsonLd = buildDatasetJsonLd({
  name: "R&D Tax Relief Usage Index (UK tech sector)",
  description: meta.description,
  url: `${siteConfig.url}${PAGE_PATH}`,
  dateModified: meta.lastUpdated,
  sources: [
    {
      name: meta.sources.hmrc_rd_stats.name,
      url: meta.sources.hmrc_rd_stats.url,
      licence: meta.sources.hmrc_rd_stats.licence,
      publisher: meta.sources.hmrc_rd_stats.publisher,
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

export default function RdTaxReliefIndexPage() {
  const sectorSorted = [...sector.rows].sort((a, b) => (b.totalClaims ?? 0) - (a.totalClaims ?? 0));
  const regionSorted = [...region.rows].sort((a, b) => (b.totalCostM ?? 0) - (a.totalCostM ?? 0));

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
            R&amp;D Tax Relief Usage Index: the post-clampdown squeeze on tech
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            UK R&amp;D tax credit claims fell {fmtPercent0(Math.abs(headline.yoyClaimsPct ?? 0))} to{" "}
            {fmtNumber(headline.totalClaims)} in {headline.latestYear}, HMRC&apos;s anti-fraud
            clampdown working through the system. Tech remains the largest sector by claim
            volume. Sourced from{" "}
            <a
              href={meta.sources.hmrc_rd_stats.url}
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              HMRC&apos;s official R&amp;D Tax Credits Statistics
            </a>
            . Data pulled {meta.pullDate}.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Stat
              value={fmtPercent0(headline.yoyClaimsPct, true)}
              label={`change in claims, ${headline.latestYear} vs the year before`}
            />
            <Stat
              value={fmtGBPbn(headline.totalCostM)}
              label={`total R&D relief cost in ${headline.latestYear}`}
            />
            <Stat
              value={`#${headline.infoCommsClaimsRank}`}
              label="rank of Information & Communication by number of claims, the largest sector"
            />
          </div>

          <p className="mt-6 text-xs text-white/40 max-w-2xl">
            Source: {meta.sources.hmrc_rd_stats.name} ({meta.sources.hmrc_rd_stats.publisher}).
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
                Total R&amp;D tax credit claims fell to {fmtNumber(headline.totalClaims)} in{" "}
                {headline.latestYear}, down {fmtPercent0(Math.abs(headline.yoyClaimsPct ?? 0))} on
                the year before, as HMRC&apos;s anti-fraud and error compliance programme worked
                through the claimant base.
              </li>
              <li>
                Total relief cost {fmtGBPbn(headline.totalCostM)} on {fmtGBPbn(headline.totalExpenditureM)}{" "}
                of qualifying R&amp;D expenditure in {headline.latestYear}.
              </li>
              <li>
                Information &amp; Communication is the largest sector by number of claims (
                {fmtNumber(headline.infoCommsClaims)}, {fmtPercent0(headline.infoCommsClaimsSharePct)}{" "}
                of the total) and the second-largest by cost ({fmtGBPm(headline.infoCommsCostM)},{" "}
                {fmtPercent0(headline.infoCommsCostSharePct)}).
              </li>
              <li>
                Information &amp; Communication, Manufacturing, and Professional, Scientific &amp;
                Technical together account for {fmtPercent0(headline.top3SectorsClaimsSharePct)} of
                all claims and {fmtPercent0(headline.top3SectorsCostSharePct)} of all relief cost.
              </li>
            </ul>
          </div>
          <p className="mt-4 max-w-2xl text-xs text-neutral-500">
            Source: {meta.sources.hmrc_rd_stats.name}, under the Open Government Licence v3.0.
            Figures may be cited with attribution to Founder Tax Partners.
          </p>
        </div>
      </section>

      {/* Claims time series */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            R&amp;D tax credit claims, {claimsSeries[0].year} to {headline.latestYear}
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Total number of claims for the R&amp;D tax credit, all schemes combined, by
            accounting period. The steep rise to 2021-22 and the sharp fall since reflect,
            respectively, the pre-clampdown growth in claim volume (including error and
            fraud that HMRC later targeted) and the effect of the compliance programme.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <AnnualSeriesChart
              data={claimsSeries.map((r) => ({ year: r.year, value: r.totalClaims }))}
              label="Total R&D tax credit claims by year"
              formatValue={(n) => `${fmtNumber(n)} claims`}
            />
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            {headline.latestYear} is a HMRC-uplifted provisional estimate; the true figure is
            expected to revise upward in the next annual release. Source: HMRC R&amp;D Tax
            Credits Statistics (Table RD1), OGL v3.0.
          </p>
        </div>
      </section>

      {/* Sector breakdown */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Claims by sector, {headline.latestYear}
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Number of claims by sector (based on the claimant company&apos;s primary SIC 2007
            code), highest first. Information &amp; Communication is the largest single sector.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <HorizontalBarChart
              data={sectorSorted.map((r) => ({
                label: r.sector,
                value: r.totalClaims,
                sharePct: r.claimsSharePct,
                highlight: r.sectorFull === "J. Information & Communication",
              }))}
            />
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            Bars show number of claims; the figure in brackets is the share of total claims.
            Source: HMRC R&amp;D Tax Credits Statistics (Table RD6), OGL v3.0.
          </p>
        </div>
      </section>

      {/* Regional breakdown */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Relief cost by region, {headline.latestYear}
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Total R&amp;D relief cost by region, based on the claimant company&apos;s
            registered address, which may not match where the R&amp;D activity actually
            takes place.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <HorizontalBarChart
              data={regionSorted.map((r) => ({
                label: r.region,
                value: r.totalCostM,
                sharePct: r.costSharePct,
                highlight: r.region === "London",
              }))}
            />
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="bg-white border-t border-neutral-200 py-12 sm:py-16">
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
                  startups-tech/pipeline/pull_rd_relief_index.py
                </code>
                . It downloads HMRC&apos;s current R&amp;D Tax Credits statistical tables (ODS
                format, main tables) and regenerates the JSON file that powers this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sources and cite-as */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">Sources and how to cite</h2>
          <div className="max-w-2xl space-y-4 text-sm text-neutral-600">
            <div>
              <p className="font-semibold text-neutral-900">Primary source</p>
              <p>
                <a
                  href={meta.sources.hmrc_rd_stats.url}
                  className="text-[#4f46e5] underline hover:opacity-75"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {meta.sources.hmrc_rd_stats.name}
                </a>
                . Publisher: {meta.sources.hmrc_rd_stats.publisher}. Licence: Open Government
                Licence v3.0. Data pulled {meta.pullDate}.
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
            Making an R&amp;D claim in this environment?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Post-clampdown, a well-evidenced claim with a properly prepared Additional
            Information Form matters more than ever. We assess eligibility under the merged
            scheme and ERIS, prepare the technical narrative HMRC now expects, and handle claim
            notification deadlines.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services/rd-tax-claims"
              className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#1e1b4b] hover:bg-white/90 transition-colors"
            >
              R&amp;D tax claims service
            </Link>
            <Link
              href="/calculators/rd-relief-estimator"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              R&amp;D relief estimator
            </Link>
          </div>
          <div className="mt-10 max-w-xl">
            <LeadForm redirectOnSuccess={false} submitLabel="Get an R&D eligibility review" />
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
