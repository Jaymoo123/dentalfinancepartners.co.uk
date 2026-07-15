import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildDatasetJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import data from "@/data/pharmacy-openings-closures-index.json";

export const metadata: Metadata = {
  title: "UK Community Pharmacy Openings and Closures Index | Pharmacy Finance Partners",
  description: "Verified data on England's community pharmacy network: NHS dispensing-contractor counts from NHSBSA open data and Companies House SIC 47730 churn figures. Updated quarterly.",
  alternates: { canonical: `${siteConfig.url}/research/pharmacy-openings-closures-index` },
};

const datasetLd = buildDatasetJsonLd({
  name: "UK Community Pharmacy Openings and Closures Index",
  description:
    "Verified data on England's community pharmacy network: NHS dispensing-contractor counts from NHSBSA open data and Companies House SIC 47730 corporate-churn figures. Updated quarterly.",
  url: "/research/pharmacy-openings-closures-index",
});

export default function PharmacyOpeningsClosuresIndexPage() {
  const latestContractors = data.nhsbsaContractors.latestCount.toLocaleString("en-GB");
  const activeCompanies = data.companiesHouseSIC47730.activeCompanies.count.toLocaleString("en-GB");
  const yoyChange = data.nhsbsaContractors.yoyChange;
  const yoyAbs = Math.abs(yoyChange).toLocaleString("en-GB");
  const yoyLabel = yoyChange < 0 ? `−${yoyAbs}` : `+${yoyAbs}`;

  const quarters = data.companiesHouseSIC47730.quarterlyChurn.quarters;
  const latestQ = quarters[quarters.length - 1];
  const prevQ = quarters[quarters.length - 2];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetLd }} />
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#0f3a4a] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/research/pharmacy-openings-closures-index"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6"
          >
            Research
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            UK Community Pharmacy Openings and Closures Index.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Verified figures on England's pharmacy network: NHS dispensing-contractor counts from{" "}
            <a href={data.nhsbsaContractors.sourceUrl} className="underline hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              NHSBSA open data
            </a>{" "}
            and Companies House SIC 47730 corporate-churn data. Two independent official spines. England-first; Scotland and Wales v2 queued.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Last updated: {data.meta.lastUpdated}. Published under{" "}
            <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" className="underline hover:text-white/70" target="_blank" rel="noopener noreferrer">
              Open Government Licence v3.0
            </a>
            .
          </p>
        </div>
      </section>

      {/* Headline stat cards */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">England's NHS pharmacy network ({data.nhsbsaContractors.latestPeriod})</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-[#0f3a4a] text-white p-6">
              <div className="text-5xl font-bold font-mono">{latestContractors}</div>
              <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">NHS dispensing pharmacies in England</div>
              <p className="mt-3 text-sm text-white/60">
                Unique pharmacy contractors appearing in the{" "}
                <a href={data.nhsbsaContractors.sourceUrl} className="underline hover:text-white/80" target="_blank" rel="noopener noreferrer">
                  NHSBSA dispensing-contractors dataset
                </a>{" "}
                for {data.nhsbsaContractors.latestPeriod}. Appliance contractors excluded.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-5xl font-bold font-mono text-[#0f3a4a]">{yoyLabel}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">year-on-year change</div>
              <p className="mt-3 text-sm text-neutral-600">
                Net change from {data.nhsbsaContractors.yoyPeriod}, measured at March each year. A contractor leaving the NHSBSA register has either closed, surrendered its NHS contract, or been absorbed into another site.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-5xl font-bold font-mono text-[#0f3a4a]">{data.nhsbsaContractors.fiveYearChangeLabel}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">seven-year change (2019 to 2026)</div>
              <p className="mt-3 text-sm text-neutral-600">
                {data.nhsbsaContractors.fiveYearPeriod}. The sustained decline from{" "}
                {data.nhsbsaContractors.years[0].count.toLocaleString("en-GB")} (March 2019) to{" "}
                {data.nhsbsaContractors.latestCount.toLocaleString("en-GB")} (March 2026) reflects the funding squeeze that has driven national coverage of pharmacy closures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NHSBSA time series table */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">NHS dispensing-pharmacy count over time</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            March snapshot each year, derived from the{" "}
            <a href={data.nhsbsaContractors.sourceUrl} className="text-[#0f3a4a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
              NHSBSA Pharmacy and Appliance Contractor Dispensing Data
            </a>
            . March is used as the annual benchmark to avoid seasonal variation. Covers England only.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-8 font-semibold text-neutral-900">Period</th>
                  <th className="text-right py-3 pr-8 font-semibold text-neutral-900">NHS Pharmacy Contractors</th>
                  <th className="text-right py-3 font-semibold text-neutral-900">Year-on-Year Change</th>
                </tr>
              </thead>
              <tbody>
                {data.nhsbsaContractors.years.map((row, i, arr) => {
                  const prev = arr[i - 1];
                  const change = prev ? row.count - prev.count : null;
                  const isLatest = i === arr.length - 1;
                  return (
                    <tr key={row.isoMonth} className={`border-b border-neutral-100 ${isLatest ? "font-semibold bg-white" : ""}`}>
                      <td className="py-3 pr-8 text-neutral-700 font-mono whitespace-nowrap">{row.period}</td>
                      <td className="py-3 pr-8 text-right text-neutral-700 font-mono">{row.count.toLocaleString("en-GB")}</td>
                      <td className="py-3 text-right font-mono">
                        {change === null ? (
                          <span className="text-neutral-400">baseline</span>
                        ) : (
                          <span className={change < 0 ? "text-red-600" : "text-green-700"}>
                            {change < 0 ? `−${Math.abs(change).toLocaleString("en-GB")}` : `+${change.toLocaleString("en-GB")}`}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Source:{" "}
            <a href={data.meta.sources.nhsbsa_dispensing.url} className="underline" target="_blank" rel="noopener noreferrer">
              NHSBSA Pharmacy and Appliance Contractor Dispensing Data
            </a>
            , NHS Business Services Authority. Licence: Open Government Licence v3.0. Data extracted 2026-07-14.
          </p>
          <p className="mt-2 text-xs text-neutral-400">
            Note: 2021 data not shown in this table as the March 2021 figure falls mid-pandemic and distorts the trend comparison; the underlying CSV is available for download from the NHSBSA portal.
          </p>
        </div>
      </section>

      {/* Companies House SIC 47730 */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">Companies House corporate layer: SIC 47730</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            A second, independent data spine from{" "}
            <a href={data.companiesHouseSIC47730.sourceUrl} className="text-[#0f3a4a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
              Companies House
            </a>
            . SIC code 47730 ("dispensing chemist in specialised stores") covers UK-wide incorporated pharmacy companies, measuring corporate-entity churn rather than NHS contract activity. The two spines are complementary: NHSBSA counts active NHS dispensing sites; Companies House counts the corporate vehicles behind those sites (and some purely private operators not on the NHS register).
          </p>
          <div className="grid gap-6 sm:grid-cols-2 mb-10">
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-4xl font-bold font-mono text-[#0f3a4a]">{activeCompanies}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">active Companies House entities (SIC 47730)</div>
              <p className="mt-3 text-sm text-neutral-600">
                Live active companies on the Companies House register under SIC 47730 as at {data.companiesHouseSIC47730.activeCompanies.asOf}. UK-wide, including holding companies and subsidiaries of pharmacy groups.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-4xl font-bold font-mono text-[#0f3a4a]">{data.companiesHouseSIC47730.dissolvedCompanies.label}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">dissolved Companies House entities (SIC 47730, all time)</div>
              <p className="mt-3 text-sm text-neutral-600">
                Total dissolved companies on the register under SIC 47730 as at {data.companiesHouseSIC47730.dissolvedCompanies.asOf}. Formal dissolution typically lags actual trading closure by several months to over a year.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-neutral-900 mb-4">Quarterly incorporations and dissolutions (SIC 47730, 2024 to 2026-Q2)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-6 font-semibold text-neutral-900">Quarter</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">Incorporations</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">Dissolutions</th>
                  <th className="text-right py-3 font-semibold text-neutral-900">Net</th>
                </tr>
              </thead>
              <tbody>
                {quarters.map((q) => {
                  const isLatest = q.quarter === latestQ.quarter;
                  return (
                    <tr key={q.quarter} className={`border-b border-neutral-100 ${isLatest ? "font-semibold bg-neutral-50" : ""}`}>
                      <td className="py-3 pr-6 text-neutral-700 font-mono whitespace-nowrap">{q.quarter}</td>
                      <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{q.incorporations}</td>
                      <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{q.dissolutions}</td>
                      <td className={`py-3 text-right font-mono ${q.net >= 0 ? "text-green-700" : "text-red-600"}`}>
                        {q.net >= 0 ? `+${q.net}` : `−${Math.abs(q.net)}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Source:{" "}
            <a href={data.companiesHouseSIC47730.sourceUrl} className="underline" target="_blank" rel="noopener noreferrer">
              Companies House Advanced Search API
            </a>
            , SIC 47730. Licence: Open Government Licence v3.0. Data pulled 2026-07-14.
          </p>
          <p className="mt-2 text-xs text-neutral-400">
            {data.companiesHouseSIC47730.quarterlyChurn.caveat}
          </p>
        </div>
      </section>

      {/* On-funnel links: calculators and buying/selling */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">What the data means for pharmacy buyers and sellers</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            A shrinking contractor count means more distressed and motivated sellers. Buyers face a market where goodwill multiples reflect the contract value of the NHS income stream. The financial and tax structure of the transaction determines how much of that value is retained after CGT, BADR, and stamp duty.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/calculators/pharmacy-purchase-affordability"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Calculator</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">Pharmacy Purchase Affordability</div>
              <p className="mt-2 text-sm text-neutral-600">Estimate the financing headroom on a pharmacy acquisition, based on your equity position and estimated dispensing income.</p>
            </Link>
            <Link
              href="/calculators/pharmacy-fp34-cash-flow-estimator"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Calculator</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">FP34 NHS Cash Flow Estimator</div>
              <p className="mt-2 text-sm text-neutral-600">Model the monthly NHS payment cycle and the advance-on-account timing gap that affects every pharmacy's working capital.</p>
            </Link>
            <Link
              href="/for/buying-a-pharmacy"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Guide</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">Buying a Pharmacy</div>
              <p className="mt-2 text-sm text-neutral-600">Share purchase vs asset purchase, stamp duty, goodwill treatment, and the due-diligence accounting questions every buyer needs answered.</p>
            </Link>
            <Link
              href="/for/selling-a-pharmacy"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Guide</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">Selling a Pharmacy</div>
              <p className="mt-2 text-sm text-neutral-600">CGT, BADR at 18% for 2026/27, and the tax-structuring decisions that sellers need to resolve before accepting an offer.</p>
            </Link>
            <Link
              href="/services/pharmacy-valuation-goodwill"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Service</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">Pharmacy Valuation and Goodwill</div>
              <p className="mt-2 text-sm text-neutral-600">How adjusted EBITDA multiples and pence-per-item methods work in practice, and what the accounts need to show to support the asking price.</p>
            </Link>
            <Link
              href="/services/pharmacy-sale-cgt-badr"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Service</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">Pharmacy Sale: CGT and BADR</div>
              <p className="mt-2 text-sm text-neutral-600">Structuring the sale to access Business Asset Disposal Relief and minimise the capital gains tax bill on goodwill proceeds.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">About this index</h2>
          <p className="text-sm text-neutral-600 max-w-2xl mb-4">
            {data.meta.methodology}
          </p>
          <ul className="text-sm text-neutral-500 max-w-2xl space-y-1 list-disc list-inside">
            {data.meta.caveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            <strong>Cite this index:</strong> {data.meta.citeAs}
          </p>
          <p className="mt-3 text-sm text-neutral-500 max-w-2xl">
            Last updated: {data.meta.lastUpdated}. Next update: on NHSBSA publication of April 2026 dispensing data (expected September 2026). England-only; Scotland and Wales coverage is queued for v2.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Buying or selling a pharmacy?</h2>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            Understanding the market context is the starting point. Whether you are buying into a contracting network or exiting at the right moment, the financial and tax structure of the transaction determines how much value you retain.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#0f3a4a] hover:bg-white/90 transition-colors"
            >
              Speak to a specialist
            </Link>
            <Link
              href="/calculators/pharmacy-purchase-affordability"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Purchase affordability calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
