import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildDatasetJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import {
  HorizontalBarChart,
  AnnualBarChart,
  IndexedComparisonChart,
} from "@/components/research/PharmacyIndexCharts";
import {
  fmtNumber,
  fmtPercent,
  type PharmacyDensitySnapshot,
  type PharmacyWorkloadSnapshot,
} from "@/lib/research/pharmacy-density-workload-index";
import densityData from "@/data/pharmacy-density-by-region.json";
import workloadData from "@/data/pharmacy-dispensing-workload.json";

const density = densityData as unknown as PharmacyDensitySnapshot;
const workload = workloadData as unknown as PharmacyWorkloadSnapshot;

const SLUG = "pharmacy-density-and-workload-index";

export const metadata: Metadata = {
  title: "Pharmacy Density and Dispensing Workload Index | Pharmacy Tax",
  description: "Where England's community pharmacy network is thinnest by region, and how dispensing volume per pharmacy has risen as the network has shrunk. NHSBSA and ONS data, updated annually.",
  alternates: { canonical: `${siteConfig.url}/research/${SLUG}` },
};

const datasetLd = buildDatasetJsonLd({
  name: "Pharmacy Density and Dispensing Workload Index",
  description:
    "Regional density of NHS community pharmacies per 100,000 population (NHSBSA Contractor Details joined to ONS mid-year population estimates), and the trend in prescription items dispensed per pharmacy as the network has contracted (NHSBSA dispensing data).",
  url: `/research/${SLUG}`,
});

const lowestRegion = density.regions[density.regions.length - 1];
const highestRegion = density.regions[0];
const gapPct = Math.round(((highestRegion.per_100k - lowestRegion.per_100k) / lowestRegion.per_100k) * 100);

const wFirst = workload.annual_march_snapshot[0];
const wLast = workload.annual_march_snapshot[workload.annual_march_snapshot.length - 1];
const itemsPerPharmacyChangePct = Math.round(((wLast.items_per_pharmacy - wFirst.items_per_pharmacy) / wFirst.items_per_pharmacy) * 1000) / 10;
const pharmacyCountChangePct = Math.round(((wLast.pharmacy_count - wFirst.pharmacy_count) / wFirst.pharmacy_count) * 1000) / 10;

const faqLd = buildFaqJsonLd([
  {
    question: "Which part of England has the fewest pharmacies per person?",
    answer: `${highestRegion.region} has the most NHS pharmacies per 100,000 population (${highestRegion.per_100k}), while ${lowestRegion.region} has the fewest (${lowestRegion.per_100k}) -- a gap of about ${gapPct}%. NHSBSA Contractor Details, joined to ONS mid-year regional population estimates.`,
  },
  {
    question: "Are pharmacists dispensing more prescriptions per pharmacy than a few years ago?",
    answer: `Yes. Items dispensed per pharmacy rose from ${fmtNumber(wFirst.items_per_pharmacy)} in ${wFirst.year} to ${fmtNumber(wLast.items_per_pharmacy)} in ${wLast.year}, an increase of ${fmtPercent(itemsPerPharmacyChangePct)}, while the number of dispensing pharmacies fell ${fmtPercent(Math.abs(pharmacyCountChangePct), false)}. The same national prescription volume is being dispensed by fewer pharmacies.`,
  },
  {
    question: "How is pharmacy density calculated in this index?",
    answer: "NHS-contracted community pharmacies (excluding appliance-only and private controlled-drug accounts) from NHSBSA's Contractor Details dataset are counted by NHS England region, then divided by the ONS mid-year population estimate for the equivalent geography (Nomis dataset NM_2002_1, rebased to the 2021/22 censuses), per 100,000 residents.",
  },
]);

export default function PharmacyDensityWorkloadIndexPage() {
  const barData = density.regions.map((r) => ({ label: r.region, value: r.per_100k, highlight: r.region === highestRegion.region }));
  const workloadAnnualData = workload.annual_march_snapshot.map((r) => ({ tick: String(r.year), value: r.items_per_pharmacy }));

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
            Pharmacy Density and Dispensing Workload Index.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Where England&apos;s NHS pharmacy network is thinnest on the ground, and how much dispensing work is now falling on each remaining pharmacy. Built from{" "}
            <a href={density.source.url} className="underline hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              NHSBSA Contractor Details
            </a>
            , ONS/Nomis population estimates, and{" "}
            <a href={workload.source.url} className="underline hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              NHSBSA dispensing data
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-white/50">
            Data pulled {density.pull_date}. Published under{" "}
            <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" className="underline hover:text-white/70" target="_blank" rel="noopener noreferrer">
              Open Government Licence v3.0
            </a>
            . <a href={`/research/${SLUG}/data`} className="underline hover:text-white/70">Download CSV</a>
          </p>
        </div>
      </section>

      {/* Headline stats */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-[#0f3a4a] text-white p-6">
              <div className="text-4xl font-bold font-mono">{highestRegion.per_100k}</div>
              <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">pharmacies per 100k, {highestRegion.region}</div>
              <p className="mt-3 text-sm text-white/60">The best-served NHS region in England.</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-4xl font-bold font-mono text-[#0f3a4a]">{lowestRegion.per_100k}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">pharmacies per 100k, {lowestRegion.region}</div>
              <p className="mt-3 text-sm text-neutral-600">The thinnest-served region, {gapPct}% lower density than {highestRegion.region}.</p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-4xl font-bold font-mono text-[#0f3a4a]">{fmtPercent(itemsPerPharmacyChangePct)}</div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">items dispensed per pharmacy, {wFirst.year}&rarr;{wLast.year}</div>
              <p className="mt-3 text-sm text-neutral-600">From {fmtNumber(wFirst.items_per_pharmacy)} to {fmtNumber(wLast.items_per_pharmacy)} items a year, per pharmacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Density map */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">NHS pharmacies per 100,000 population, by region</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            NHS-contracted community pharmacies from NHSBSA&apos;s Contractor Details dataset ({density.source.resource_title}), counted by NHS England region and divided by the ONS mid-{density.population_source.year.replace("mid-", "")} population estimate for the equivalent geography.
          </p>
          <div className="bg-white border border-neutral-200 p-6 mb-8">
            <HorizontalBarChart data={barData.map((d) => ({ ...d, suffix: " /100k" }))} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-6 font-semibold text-neutral-900">Region</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">NHS pharmacies</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">Population</th>
                  <th className="text-right py-3 font-semibold text-neutral-900">Per 100k</th>
                </tr>
              </thead>
              <tbody>
                {density.regions.map((r) => (
                  <tr key={r.region} className="border-b border-neutral-100">
                    <td className="py-3 pr-6 text-neutral-700">{r.region}</td>
                    <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{fmtNumber(r.pharmacy_count)}</td>
                    <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{fmtNumber(r.population)}</td>
                    <td className="py-3 text-right font-mono font-semibold text-[#0f3a4a]">{r.per_100k}</td>
                  </tr>
                ))}
                <tr className="font-semibold bg-neutral-50">
                  <td className="py-3 pr-6 text-neutral-900">England total</td>
                  <td className="py-3 pr-6 text-right text-neutral-900 font-mono">{fmtNumber(density.england_total_pharmacies)}</td>
                  <td className="py-3 pr-6 text-right text-neutral-900 font-mono">{fmtNumber(density.england_total_population)}</td>
                  <td className="py-3 text-right font-mono text-[#0f3a4a]">{density.england_per_100k}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Source: {density.source.name} ({density.source.resource_title}), NHS Business Services Authority; {density.population_source.name}, Office for National Statistics. Both Open Government Licence v3.0. Pulled {density.pull_date}.
          </p>
          <p className="mt-2 text-xs text-neutral-400">
            NHS regions combine ONS Regions of England as follows: Midlands = East Midlands + West Midlands; North East and Yorkshire = North East + Yorkshire and The Humber. The other five NHS regions map 1:1 to an ONS region. Wales, Scotland, Northern Ireland and the Crown Dependencies (Jersey, Guernsey, Isle of Man, Alderney) are excluded from the England totals but appear in the underlying contractor list; coverage there is limited and treated as a guide only by NHSBSA. Counts exclude appliance-only accounts and private controlled-drug accounts.
          </p>
        </div>
      </section>

      {/* Dispensing workload */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">Dispensing workload: fewer pharmacies, more items dispensed each</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            National prescription items dispensed and dispensing-pharmacy counts, each March ({wFirst.year} to {wLast.year}), from NHSBSA&apos;s Pharmacy and Appliance Contractor Dispensing Data. Total items dispensed nationally rose from {fmtNumber(wFirst.total_items)} to {fmtNumber(wLast.total_items)} a year, spread across a shrinking pharmacy count.
          </p>

          <h3 className="text-lg font-bold text-neutral-900 mb-4">Pharmacy count vs items-per-pharmacy, indexed to {wFirst.year}</h3>
          <div className="bg-neutral-50 border border-neutral-200 p-6 mb-10">
            <IndexedComparisonChart
              categories={workload.annual_march_snapshot.map((r) => String(r.year))}
              seriesA={workload.annual_march_snapshot.map((r) => r.pharmacy_count)}
              seriesB={workload.annual_march_snapshot.map((r) => r.items_per_pharmacy)}
              labelA="Dispensing pharmacies"
              labelB="Items dispensed per pharmacy"
            />
          </div>

          <h3 className="text-lg font-bold text-neutral-900 mb-4">Items dispensed per pharmacy per year</h3>
          <div className="bg-neutral-50 border border-neutral-200 p-6 mb-4">
            <AnnualBarChart data={workloadAnnualData} label="Items dispensed per pharmacy, annual" formatValue={(n) => fmtNumber(n)} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-900">
                  <th className="text-left py-3 pr-6 font-semibold text-neutral-900">March</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">Total items dispensed</th>
                  <th className="text-right py-3 pr-6 font-semibold text-neutral-900">Dispensing pharmacies</th>
                  <th className="text-right py-3 font-semibold text-neutral-900">Items per pharmacy</th>
                </tr>
              </thead>
              <tbody>
                {workload.annual_march_snapshot.map((r, i, arr) => (
                  <tr key={r.year} className={`border-b border-neutral-100 ${i === arr.length - 1 ? "font-semibold bg-white" : ""}`}>
                    <td className="py-3 pr-6 text-neutral-700 font-mono">{r.year}</td>
                    <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{fmtNumber(r.total_items)}</td>
                    <td className="py-3 pr-6 text-right text-neutral-700 font-mono">{fmtNumber(r.pharmacy_count)}</td>
                    <td className="py-3 text-right font-mono text-[#0f3a4a]">{fmtNumber(r.items_per_pharmacy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-400">
            Source: {workload.source.name} ({workload.source.resource_title}), NHS Business Services Authority. Licence: Open Government Licence v3.0. Pulled {workload.pull_date}.
          </p>
          <p className="mt-2 text-xs text-neutral-400">{workload.methodology}</p>
        </div>
      </section>

      {/* On-funnel links */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">What the workload squeeze means for pharmacy owners</h2>
          <p className="mb-8 max-w-2xl text-neutral-600">
            Rising items per pharmacy means more Category M and Drug Tariff margin exposure concentrated in fewer businesses, and a workforce and staffing cost base that has to absorb the volume the network used to spread across more sites. Benchmarking your dispensing efficiency and margin against the national trend is the starting point for a pricing and staffing conversation with your accountant.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/services/pharmacy-benchmarking-margin"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Service</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">Pharmacy Benchmarking and Margin</div>
              <p className="mt-2 text-sm text-neutral-600">Compare your dispensing margin and cost base against sector norms as workload per pharmacy keeps rising.</p>
            </Link>
            <Link
              href="/services/pharmacy-payroll-workforce"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Service</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">Pharmacy Payroll and Workforce</div>
              <p className="mt-2 text-sm text-neutral-600">Staffing cost planning for a dispensing volume that keeps climbing per pharmacy.</p>
            </Link>
            <Link
              href="/calculators/pharmacy-fp34-cash-flow-estimator"
              className="group border border-neutral-200 bg-white p-6 hover:border-[#0f3a4a] transition-colors"
            >
              <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Calculator</div>
              <div className="font-bold text-neutral-900 group-hover:text-[#0f3a4a] transition-colors">FP34 NHS Cash Flow Estimator</div>
              <p className="mt-2 text-sm text-neutral-600">Model the payment cycle on a higher, and rising, monthly dispensing volume.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-link to flagship */}
      <section className="bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <Link
            href="/research/pharmacy-openings-closures-index"
            className="block border border-neutral-200 p-6 hover:border-[#0f3a4a] transition-colors"
          >
            <div className="text-sm font-semibold text-[#0f3a4a] uppercase tracking-wider mb-2">Related research</div>
            <div className="font-bold text-neutral-900 text-lg">UK Community Pharmacy Openings and Closures Index</div>
            <p className="mt-2 text-sm text-neutral-600">The monthly net-closures tracker behind the numbers on this page, plus the Companies House SIC 47730 formations divergence.</p>
          </Link>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white py-10 sm:py-12 border-t border-neutral-200">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-3">About this index</h2>
          <ul className="text-sm text-neutral-500 max-w-2xl space-y-1 list-disc list-inside">
            <li>Density figures use a single latest month&apos;s NHSBSA Contractor Details snapshot; NHSBSA describes the contractor list as &quot;a guide only&quot; due to reporting lags from Integrated Care Boards.</li>
            <li>Regional totals may differ slightly from the openings/closures index headline because the two datasets use different extraction methods (a point-in-time contractor list vs a monthly reporting cycle); both are official NHSBSA sources.</li>
            <li>Dispensing workload figures use March each year as the annual benchmark, to avoid seasonal variation and to align with the openings/closures index&apos;s own annual convention.</li>
            <li>Small counts in NHSBSA source data may be subject to standard disclosure-control rounding; this index reports published totals as-is.</li>
            <li>England-only. Scotland, Wales, and the Crown Dependencies are excluded from the density map; NHSBSA holds only limited data for Wales and the Islands and none for Scotland or Northern Ireland.</li>
          </ul>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            <strong>Cite this index:</strong> Pharmacy Density and Dispensing Workload Index, derived from NHSBSA Contractor Details, NHSBSA Pharmacy and Appliance Contractor Dispensing Data, and ONS/Nomis mid-year population estimates. Published under OGL3. Verified {density.pull_date}.
          </p>
          <p className="mt-3 text-sm text-neutral-500 max-w-2xl">
            <a href={`/research/${SLUG}/data`} className="underline">Download the full regional and annual series as CSV</a>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Running a pharmacy under rising dispensing volume?</h2>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            More items dispensed per pharmacy means margin, staffing, and cash-flow pressure concentrated in fewer businesses. Get the accounting and benchmarking right for where the sector is heading, not where it was five years ago.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#0f3a4a] hover:bg-white/90 transition-colors"
            >
              Speak to a specialist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
