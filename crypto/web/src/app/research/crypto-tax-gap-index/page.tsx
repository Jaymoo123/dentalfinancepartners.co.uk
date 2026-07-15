import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { buildDatasetJsonLd } from "@/lib/schema";
import data from "@/data/uk-crypto-tax-gap-index.json";

export const metadata: Metadata = {
  title: "UK Crypto Tax Compliance Index | Digital Asset Tax Partners",
  description: "Verified data on UK cryptoasset ownership and the CARF reporting timeline. FCA-sourced ownership figures. HMRC CARF first-report deadline: 31 May 2027.",
  alternates: { canonical: `${siteConfig.url}/research/crypto-tax-gap-index` },
};

function CarfCountdown() {
  const target = new Date(data.carfTimeline.firstReportWindowEnd + "T23:59:59Z").getTime();
  const now = Date.now();
  const daysRemaining = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
  return (
    <div className="bg-[#0e1a3a] text-white rounded-lg p-6 sm:p-8 text-center">
      <div className="text-5xl sm:text-6xl font-bold font-mono">{daysRemaining}</div>
      <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">days until CARF first-report deadline</div>
      <p className="mt-4 text-sm text-white/60 max-w-sm mx-auto">
        UK exchanges must submit their first CARF report to HMRC by{" "}
        <strong className="text-white/80">31 May 2027</strong>, covering the 2026 calendar year. The reporting window opens 1 January 2027.
      </p>
      <p className="mt-3 text-xs text-white/40">
        Source:{" "}
        <a href={data.carfTimeline.sourcesReporting} className="underline hover:text-white/70" target="_blank" rel="noopener noreferrer">
          HMRC CARF reporting guidance
        </a>
      </p>
    </div>
  );
}

const datasetJsonLd = buildDatasetJsonLd({
  name: "UK Crypto Tax Compliance Index",
  description: "Verified figures on UK cryptoasset ownership rates, the CARF exchange-reporting timeline, and current CGT parameters for cryptoassets. Primary sources: FCA Cryptoassets Consumer Research and HMRC guidance.",
  url: `${siteConfig.url}/research/crypto-tax-gap-index`,
  dateModified: data.meta.lastUpdated,
  sourceOrganizations: [
    { name: "FCA Cryptoassets Consumer Research 2024 (Wave 5)", url: data.ownership.sourceUrl },
    { name: "HMRC: collecting cryptoasset user and transaction data", url: data.carfTimeline.sourcesCollection },
    { name: "HMRC: reporting cryptoasset user and transaction data", url: data.carfTimeline.sourcesReporting },
    { name: "HMRC: CGT rates", url: data.cgtParameters.sourceUrl },
    { name: "HMRC: cryptoasset disclosure service", url: data.disclosureWindows.sourceUrl },
  ],
});

export default function CryptoTaxComplianceIndexPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetJsonLd }} />
      <section className="border-b border-neutral-200 bg-[#0e1a3a] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6"
          >
            Home
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            UK Crypto Tax Compliance Index.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Verified figures on UK cryptoasset ownership, the CARF exchange-reporting timeline, and what the 31 May 2027 deadline means for holders with unreported gains. Updated annually on FCA wave publication.
          </p>
        </div>
      </section>

      {/* CARF countdown */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">CARF compliance countdown</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            The{" "}
            <a href={data.carfTimeline.sourcesCollection} className="text-[#0e1a3a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
              Cryptoasset Reporting Framework
            </a>{" "}
            requires UK-registered crypto platforms to collect account-holder and transaction data from{" "}
            <strong>1 January 2026</strong>. The first report covering the 2026 calendar year must reach HMRC between 1 January 2027 and{" "}
            <strong>31 May 2027</strong>. Annual reports follow the same 31 May deadline each year thereafter.
          </p>
          <CarfCountdown />
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            Once the first CARF data reaches HMRC, exchanges can no longer be an invisible corner of holders' finances. The data will cover trades, disposals, and income events across the 2026 tax year. Holders with unreported gains should act before HMRC writes first.
          </p>
        </div>
      </section>

      {/* UK ownership */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">UK cryptoasset ownership</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-white border border-neutral-200 p-6">
              <div className="text-4xl font-bold font-mono text-[#0e1a3a]">{data.ownership.shareOfUKAdultsLabel}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">of UK adults hold cryptoassets</div>
              <p className="mt-3 text-sm text-neutral-600">
                Approximately {data.ownership.approximateHolderCount} people, based on the{" "}
                <a href={data.ownership.sourceUrl} className="text-[#0e1a3a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
                  {data.ownership.source}
                </a>{" "}
                (YouGov survey of 2,199 UK adults, survey date {data.ownership.surveyDate}).
              </p>
            </div>
            <div className="bg-white border border-neutral-200 p-6">
              <div className="text-4xl font-bold font-mono text-[#0e1a3a]">{data.ownership.awarenessLabel.split("%")[0]}%</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">of UK adults have heard of crypto</div>
              <p className="mt-3 text-sm text-neutral-600">
                Near-universal awareness, but only 12% have moved from awareness to ownership. The compliance challenge is concentrated in that 12% and grows each year as more people enter the market.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Source:{" "}
            <a href={data.ownership.sourceUrl} className="underline" target="_blank" rel="noopener noreferrer">
              FCA Cryptoassets Consumer Research 2024 (Wave 5)
            </a>
            , published November 2024, corrected March 2025. The FCA runs this survey annually; this page is updated on each new wave.
          </p>
          <p className="mt-2 text-xs text-neutral-400">
            Note: HMRC does not publish a crypto-specific tax gap figure. No modelled gap estimate is stated here.
          </p>
        </div>
      </section>

      {/* CGT parameters */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">Current CGT parameters for cryptoassets ({data.cgtParameters.taxYear})</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            These are the rates and thresholds that apply to crypto disposals for individual investors under{" "}
            <a href={data.cgtParameters.sourceUrl} className="text-[#0e1a3a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
              current HMRC guidance
            </a>
            . Almost all individuals are treated as investors for CGT rather than traders.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-3xl font-bold font-mono text-[#0e1a3a]">
                <a href={data.cgtParameters.allowancesUrl} className="hover:opacity-75" target="_blank" rel="noopener noreferrer">
                  {data.cgtParameters.annualExemptAmountLabel}
                </a>
              </div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">CGT annual exempt amount</div>
              <p className="mt-2 text-sm text-neutral-600">
                Frozen for {data.cgtParameters.taxYear}. Gains below this threshold are not taxable, but every crypto-to-crypto swap counts as a disposal, so active holders exhaust the allowance quickly.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-3xl font-bold font-mono text-[#0e1a3a]">18% / 24%</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">CGT rates on crypto gains</div>
              <p className="mt-2 text-sm text-neutral-600">
                <a href={data.cgtParameters.sourceUrl} className="text-[#0e1a3a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
                  18% only on the portion of a gain that fits within the taxpayer's remaining basic-rate income tax band
                </a>{" "}
                (band ceiling {data.cgtParameters.basicRateBandLabel} for {data.cgtParameters.taxYear}); 24% above that threshold. Higher and additional-rate taxpayers pay 24% on the full gain.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-3xl font-bold font-mono text-[#0e1a3a]">4 / 6 / 20</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">Disclosure years by behaviour</div>
              <p className="mt-2 text-sm text-neutral-600">
                HMRC may assess{" "}
                <a href={data.disclosureWindows.sourceUrl} className="text-[#0e1a3a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
                  4 years (reasonable care), 6 years (careless), or 20 years (deliberate)
                </a>{" "}
                of unpaid tax. Unprompted voluntary disclosure secures the lowest penalty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CARF timeline detail */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">CARF timeline: what happens when</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-8 font-semibold text-neutral-900">Date</th>
                  <th className="text-left py-3 font-semibold text-neutral-900">Event</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100">
                  <td className="py-3 pr-8 text-neutral-700 font-mono whitespace-nowrap">1 Jan 2026</td>
                  <td className="py-3 text-neutral-700">UK cryptoasset reporting entities begin collecting account-holder and transaction data under CARF.</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-3 pr-8 text-neutral-700 font-mono whitespace-nowrap">31 Dec 2026</td>
                  <td className="py-3 text-neutral-700">End of the first CARF collection year. All 2026 transactions now in scope for the first report.</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-3 pr-8 text-neutral-700 font-mono whitespace-nowrap">1 Jan 2027</td>
                  <td className="py-3 text-neutral-700">First CARF reporting window opens. Platforms begin submitting 2026 data to HMRC.</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-3 pr-8 text-[#0e1a3a] font-mono font-semibold whitespace-nowrap">31 May 2027</td>
                  <td className="py-3 text-neutral-900 font-semibold">First CARF report deadline. All reporting entities must have submitted 2026 data to HMRC by this date.</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-3 pr-8 text-neutral-700 font-mono whitespace-nowrap">31 May annually</td>
                  <td className="py-3 text-neutral-700">Ongoing deadline for each subsequent year's report covering the prior calendar year.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Sources:{" "}
            <a href={data.carfTimeline.sourcesCollection} className="underline" target="_blank" rel="noopener noreferrer">
              HMRC guidance: collecting cryptoasset data
            </a>{" "}
            and{" "}
            <a href={data.carfTimeline.sourcesReporting} className="underline" target="_blank" rel="noopener noreferrer">
              HMRC guidance: reporting cryptoasset data
            </a>
            . Verified at source 2026-07-14.
          </p>
        </div>
      </section>

      {/* Methodology note */}
      <section className="bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">About this index</h2>
          <p className="text-sm text-neutral-600 max-w-2xl">
            This index uses only primary sources: FCA consumer research for ownership levels, HMRC guidance for CARF dates, and gov.uk for CGT rates and disclosure windows. HMRC does not publish a crypto-specific tax gap, so no such estimate appears here. The ownership figure is updated annually when the FCA publishes its next consumer research wave (Wave 6 published 2025; see{" "}
            <a href={data.ownership.sourceUrl} className="text-[#0e1a3a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
              FCA publications
            </a>{" "}
            for the latest figure). Last updated: {data.meta.lastUpdated}.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Is your crypto tax position ready for CARF?</h2>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            UK exchanges begin reporting 2026 transaction data to HMRC from January 2027. Holders with unreported gains or income stand on much stronger ground with a voluntary disclosure on file before that data arrives. A 4-year window applies for reasonable care; HMRC may go back 20 years for deliberate non-compliance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#0e1a3a] hover:bg-white/90 transition-colors"
            >
              Speak to a specialist
            </Link>
            <Link
              href="/services/hmrc-disclosure"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              HMRC disclosure service
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
