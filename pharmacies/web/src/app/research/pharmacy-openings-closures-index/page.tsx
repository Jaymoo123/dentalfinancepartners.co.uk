import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildDatasetJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import {
  MonthlyLineChart,
  StackedBarChart,
  AnnualBarChart,
} from "@/components/research/PharmacyIndexCharts";
import {
  monthLabelShort,
  fmtNumber,
  fmtPercent,
  type PharmacyOpeningsClosuresSnapshot,
} from "@/lib/research/pharmacy-openings-closures-index";
import data from "@/data/pharmacy-openings-closures-index.json";

const snap = data as unknown as PharmacyOpeningsClosuresSnapshot;

export const metadata: Metadata = {
  title: "UK Community Pharmacy Openings and Closures Index | Pharmacy Tax",
  description: "Monthly, owner-segmented data on England's community pharmacy network: NHSBSA Pharmacy Openings and Closures dataset paired with Companies House SIC 47730 formations. Updated monthly.",
  alternates: { canonical: `${siteConfig.url}/research/pharmacy-openings-closures-index` },
};

const datasetLd = buildDatasetJsonLd({
  name: "UK Community Pharmacy Openings and Closures Index",
  description: snap.meta.description,
  url: "/research/pharmacy-openings-closures-index",
});

const faqLd = buildFaqJsonLd([
  {
    question: "How many community pharmacies are open in England?",
    answer: `${snap.headline.latestTotalLabel} pharmacies were on an NHS England Pharmaceutical List as at ${snap.headline.latestMonthLabel}, according to NHSBSA's Pharmacy Openings and Closures dataset. This is down from ${fmtNumber(snap.headline.baselineFromTotal)} in ${snap.headline.baselinePeriod.split(" to ")[0]}, a net fall of ${fmtNumber(Math.abs(snap.headline.baselineChange))} pharmacies.`,
  },
  {
    question: "Are more independent or multiple-owned pharmacies closing?",
    answer: `NHSBSA segments pharmacies by owner-group size: Small (1-5 premises, mostly independents), Medium (6-99) and Large (100+, the big multiples). Since ${snap.headline.baselinePeriod.split(" to ")[0]}, Small-group pharmacies have grown from ${fmtNumber(snap.monthly[0].small)} to ${fmtNumber(snap.headline.latestSmall)}, while Large-group pharmacies have fallen from ${fmtNumber(snap.monthly[0].large)} to ${fmtNumber(snap.headline.latestLarge)}. The closures are concentrated in the large multiples, not independents.`,
  },
  {
    question: "Why does a pharmacy count as both a closure and an opening in the same month?",
    answer: "When a pharmacy changes ownership, NHSBSA records it as a closure of the old contractor and a same-day opening of the new one, even though the premises never stopped trading. This inflates gross 'opened' and 'closed' totals without affecting the net-change figures, which is why this index reports net change as the primary measure of market contraction.",
  },
  {
    question: "Is the number of pharmacy companies on Companies House going up or down?",
    answer: `The opposite of the NHS network: Companies House SIC 47730 ("dispensing chemist in specialised stores") incorporations rose from ${fmtNumber(snap.companiesHouseSIC47730.decade.from_value)} in ${snap.companiesHouseSIC47730.decade.from_year} to ${fmtNumber(snap.companiesHouseSIC47730.decade.to_value)} in ${snap.companiesHouseSIC47730.decade.to_year} (${fmtPercent(snap.companiesHouseSIC47730.decade.change_pct)}). This corporate-formations count includes holding companies and group restructurings, so it is not a proxy for physical pharmacy openings -- it reflects consolidation and online-only entrants alongside the shrinking NHS estate.`,
  },
]);

export default function PharmacyOpeningsClosuresIndexPage() {
  const { headline, meta, companiesHouseSIC47730: ch, annualSnapshot, monthly } = snap;

  const lineData = monthly.map((m) => ({ month: m.month, tick: monthLabelShort(m.month), value: m.total }));

  const stackData = annualSnapshot.map((r) => ({
    tick: r.month.endsWith("-12") ? String(r.year) : `${r.year}*`,
    values: { small: r.small, medium: r.medium, large: r.large },
  }));

  const chAnnualData = ch.annual
    .filter((r) => r.year >= 2016)
    .map((r) => ({ tick: String(r.year), value: r["47730"] }));

  const seasonalityMax = Math.max(...ch.seasonality.map((s) => s.avgCount));
  const topSeasonMonth = ch.seasonality.reduce((a, b) => (b.avgCount > a.avgCount ? b : a));

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
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
            Monthly, owner-segmented figures on England&apos;s pharmacy network from{" "}
            <a href={meta.sources.nhsbsa_openings_closures.url} className="underline hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              NHSBSA&apos;s Pharmacy Openings and Closures dataset
            </a>
            , paired with Companies House SIC 47730 corporate-formations data. Two independent official spines. England-first; Scotland and Wales v2 queued.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Last updated: {meta.lastUpdated}. Published under{" "}
            <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" className="underline hover:text-white/70" target="_blank" rel="noopener noreferrer">
              Open Government Licence v3.0
            </a>
            . <a href="/research/pharmacy-openings-closures-index/data" className="underline hover:text-white/70">Download CSV</a>
          </p>
        </div>
      </section>

      {/* Headline stat cards */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">England&apos;s NHS pharmacy network ({headline.latestMonthLabel})</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-[#0f3a4a] text-white p-6">
              <div className="text-5xl font-bold font-mono">{headline.latestTotalLabel}</div>
              <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">NHS pharmacies open in England</div>
              <p className="mt-3 text-sm text-white/60">
                Pharmacies on an NHS England Pharmaceutical List at {headline.latestMonthLabel}, including {fmtNumber(headline.latestDistanceSellers)} distance-selling pharmacies. {fmtNumber(headline.latestTotalExclDS)} excluding distance sellers.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-5xl font-bold font-mono text-[#0f3a4a]">{headline.yoyChangeLabel}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">year-on-year net change</div>
              <p className="mt-3 text-sm text-neutral-600">
                Net change, {headline.yoyPeriod}. A pharmacy leaving the list has closed, surrendered its NHS contract, or been absorbed into another site.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-4xl font-bold font-mono text-[#0f3a4a]">{headline.baselineChangeLabel}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">change since {headline.baselinePeriod.split(" to ")[0]}</div>
              <p className="mt-3 text-sm text-neutral-600">
                From {fmtNumber(headline.baselineFromTotal)} ({headline.baselinePeriod.split(" to ")[0]}) to {headline.latestTotalLabel} ({headline.latestMonthLabel}), the longest run NHSBSA publishes in this dataset.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-4">
            {[
              { label: "Small (1-5 sites)", value: headline.latestSmall },
              { label: "Medium (6-99 sites)", value: headline.latestMedium },
              { label: "Large (100+ sites)", value: headline.latestLarge },
              { label: "100-hour contract", value: headline.latestHundredHour },
            ].map((s) => (
              <div key={s.label} className="border border-neutral-200 p-4">
                <div className="text-2xl font-bold font-mono text-neutral-900">{fmtNumber(s.value)}</div>
                <div className="mt-1 text-xs font-semibold text-neutral-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly trend chart */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">NHS pharmacy count, {monthLabelShort(monthly[0].month)} to {monthLabelShort(monthly[monthly.length - 1].month)}</h2>
          <p className="mb-6 max-w-2xl text-neutral-600">
            Total pharmacies on an NHS England Pharmaceutical List at the end of each month, including distance-selling pharmacies. Every point traces back to NHSBSA&apos;s published monthly file.
          </p>
          <div className="bg-white border border-neutral-200 p-6">
            <MonthlyLineChart
              points={lineData}
              label="Monthly NHS pharmacy count"
              formatValue={(n) => fmtNumber(n)}
            />
          </div>

          <h3 className="mt-12 text-lg font-bold text-neutral-900 mb-4">Owner-group composition, year-end snapshot</h3>
          <p className="mb-6 max-w-2xl text-neutral-600">
            Small (1-5 premises, mostly independents), Medium (6-99) and Large (100+, the big multiples). December snapshot each year; the final bar is the latest available month, marked with an asterisk.
          </p>
          <div className="bg-white border border-neutral-200 p-6">
            <StackedBarChart
              data={stackData}
              series={[
                { key: "small", label: "Small (1-5)", color: "#0f3a4a" },
                { key: "medium", label: "Medium (6-99)", color: "#2d7a94" },
                { key: "large", label: "Large (100+)", color: "#a8c5cd" },
              ]}
              label="Owner-group composition by year"
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-6 font-semibold text-neutral-900">Snapshot</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">Total</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">Small</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">Medium</th>
                  <th className="text-right py-3 font-semibold text-neutral-900">Large</th>
                </tr>
              </thead>
              <tbody>
                {annualSnapshot.map((r, i) => (
                  <tr key={r.month} className={`border-b border-neutral-100 ${i === annualSnapshot.length - 1 ? "font-semibold bg-white" : ""}`}>
                    <td className="py-3 pr-6 text-neutral-700 font-mono whitespace-nowrap">{r.monthLabel}</td>
                    <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{fmtNumber(r.total)}</td>
                    <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{fmtNumber(r.small)}</td>
                    <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{fmtNumber(r.medium)}</td>
                    <td className="py-3 text-right text-neutral-700 font-mono">{fmtNumber(r.large)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Source:{" "}
            <a href={meta.sources.nhsbsa_openings_closures.url} className="underline" target="_blank" rel="noopener noreferrer">
              {meta.sources.nhsbsa_openings_closures.resource}
            </a>
            , NHS Business Services Authority. Licence: Open Government Licence v3.0. Pulled {meta.sources.nhsbsa_openings_closures.pullDate}.
          </p>
        </div>
      </section>

      {/* Companies House SIC 47730 */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">Companies House corporate layer: SIC 47730</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            A second, independent data spine from{" "}
            <a href={ch.sourceUrl} className="text-[#0f3a4a] underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
              Companies House
            </a>
            . SIC code 47730 (&quot;dispensing chemist in specialised stores&quot;) covers UK-wide incorporated pharmacy companies, measuring corporate-entity formation rather than NHS contract activity.
          </p>
          <div className="grid gap-6 sm:grid-cols-4 mb-10">
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-3xl font-bold font-mono text-[#0f3a4a]">{ch.activeCompanies.label}</div>
              <div className="mt-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">active companies</div>
              <p className="mt-2 text-xs text-neutral-500">as at {ch.activeCompanies.asOf}</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-3xl font-bold font-mono text-[#0f3a4a]">{ch.dissolvedCompanies.label}</div>
              <div className="mt-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">dissolved (all time)</div>
              <p className="mt-2 text-xs text-neutral-500">as at {ch.dissolvedCompanies.asOf}</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-3xl font-bold font-mono text-[#0f3a4a]">{fmtNumber(ch.ttm)}</div>
              <div className="mt-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">incorporations, trailing 12m</div>
              <p className="mt-2 text-xs text-neutral-500">to {ch.lastSettledMonth}, {fmtPercent(ch.yoyPct)} YoY</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-3xl font-bold font-mono text-[#0f3a4a]">{ch.decade.multiple}&times;</div>
              <div className="mt-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">{ch.decade.from_year}&rarr;{ch.decade.to_year} formations</div>
              <p className="mt-2 text-xs text-neutral-500">{fmtNumber(ch.decade.from_value)} &rarr; {fmtNumber(ch.decade.to_value)} a year ({fmtPercent(ch.decade.change_pct)})</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-neutral-900 mb-4">Annual incorporations, SIC 47730 ({ch.decade.from_year} to {ch.decade.to_year})</h3>
          <div className="bg-neutral-50 border border-neutral-200 p-6 mb-4">
            <AnnualBarChart data={chAnnualData} label="Annual pharmacy company incorporations" formatValue={(n) => fmtNumber(n)} />
          </div>
          <p className="text-sm text-neutral-600 max-w-2xl mb-10">
            While the NHS dispensing network above has contracted every year since {headline.baselinePeriod.split(" to ")[0]}, SIC 47730 incorporations have moved the opposite way: {ch.decade.multiple}&times; more new pharmacy companies were formed in {ch.decade.to_year} than in {ch.decade.from_year}. {ch.caveat}
          </p>

          <h3 className="text-lg font-bold text-neutral-900 mb-4">Formation seasonality: which month sees the most new pharmacy companies</h3>
          <p className="mb-6 max-w-2xl text-neutral-600">
            Average monthly incorporations across {ch.seasonality[0].yearsOfData} years of settled data (excludes the most recent {ch.provisionalMonths.length} provisional months). {topSeasonMonth.monthName} is the strongest month, averaging {topSeasonMonth.avgCount} incorporations.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {ch.seasonality.map((s) => (
              <div key={s.monthNum} className="text-center">
                <div className="h-24 flex items-end justify-center bg-neutral-100">
                  <div
                    className="w-full"
                    style={{
                      height: `${Math.max((s.avgCount / seasonalityMax) * 100, 4)}%`,
                      background: s.monthNum === topSeasonMonth.monthNum ? "#0f3a4a" : "#a8c5cd",
                    }}
                    title={`${s.monthName}: avg ${s.avgCount} incorporations`}
                  />
                </div>
                <div className="mt-1 text-xs text-neutral-500">{s.monthName}</div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-neutral-400">
            Source: Companies House Advanced Search API, SIC 47730. Licence: Open Government Licence v3.0. Incorporation counts pulled {meta.sources.companies_house.pullDate}; active/dissolved totals pulled {ch.activeCompanies.asOf}.
          </p>
        </div>
      </section>

      {/* On-funnel links: calculators and buying/selling */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">What the data means for pharmacy buyers and sellers</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            A shrinking contractor count means more distressed and motivated sellers, concentrated among the large multiples rationalising their estates. Buyers face a market where goodwill multiples reflect the contract value of the NHS income stream. The financial and tax structure of the transaction determines how much of that value is retained after CGT, BADR, and stamp duty.
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
              <p className="mt-2 text-sm text-neutral-600">Model the monthly NHS payment cycle and the advance-on-account timing gap that affects every pharmacy&apos;s working capital.</p>
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

      {/* Cross-link to the density/workload asset */}
      <section className="bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <Link
            href="/research/pharmacy-density-and-workload-index"
            className="block border border-neutral-200 p-6 hover:border-[#0f3a4a] transition-colors"
          >
            <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Related research</div>
            <div className="font-bold text-neutral-900 text-lg">Pharmacy Density and Dispensing Workload Index</div>
            <p className="mt-2 text-sm text-neutral-600">Where the pharmacy network is thinnest by region, and how dispensing volume per pharmacy has changed as the network has shrunk.</p>
          </Link>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white py-10 sm:py-12 border-t border-neutral-200">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">About this index</h2>
          <p className="text-sm text-neutral-600 max-w-2xl mb-4">
            {meta.methodology}
          </p>
          <ul className="text-sm text-neutral-500 max-w-2xl space-y-1 list-disc list-inside">
            {meta.caveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            <strong>Cite this index:</strong> {meta.citeAs}
          </p>
          <p className="mt-3 text-sm text-neutral-500 max-w-2xl">
            Last updated: {meta.lastUpdated}. England-only; Scotland and Wales coverage is queued for v2.{" "}
            <a href="/research/pharmacy-openings-closures-index/data" className="underline">Download the full monthly series as CSV</a>.
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
