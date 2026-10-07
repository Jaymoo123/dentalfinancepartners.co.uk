import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { siteConfig } from "@/config/site";
import { buildDatasetJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { LeadForm } from "@/components/forms/LeadForm";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
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

/**
 * CHROME ONLY, plus one net-new conversion surface the brief asked for. Every
 * sentence and every figure is the pre-port string, byte for byte, read from
 * the two snapshot JSON files as before. The `&lt;` literals in the body copy
 * are correctly escaped "less than" comparisons and are left exactly as they
 * are (known-and-accepted item 13).
 *
 * ADOPTED: primitives/Breadcrumb.tsx `tone="onBrand"`, primitives/page-blocks
 * `Eyebrow`, primitives/FaqSection.tsx with `alwaysRenderAnswers`, and
 * marketing/LeadCTAPanel.tsx. Reasons are at each call site.
 *
 * ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx. Not
 * the stale `sectionClassName` reason (that prop exists, :27,47,50): SlimHero
 * holds Eyebrow, h1 and children in ONE container (:52-57) with no slot above
 * the eyebrow for this hero's Breadcrumb, and its `py-8 sm:py-10 lg:py-12`
 * rhythm is structural (:50) and outside `sectionClassName`'s reach (:36-38),
 * against this hero's `py-16 sm:py-20`. KIT ASK: a `breadcrumb` slot above the
 * eyebrow.
 * ADOPTION DECLINED: packages/web-shared/design/primitives/NoticeCard.tsx for
 * the "About this index" caveats. It hardcodes `text-center` (:38) with no
 * alignment prop, so a five-item list of statistical caveats would centre and
 * become harder to read, and its docblock (:1-17) scopes it to token-gated
 * outcome states. Adopted on /book and /complete, where that IS the content.
 * KIT ASK: `align?: "center" | "start"`, defaulting to center.
 * ADOPTION DECLINED: packages/web-shared/design/marketing/WhatToExpectCard.tsx
 * (its `items` default publishes a fee line this site never promises, :22-27,
 * and a research page publishes no "what happens next" list) and
 * primitives/ExampleFigureNote.tsx (not in this package's lease; its own
 * docblock, :32-40, records that a research page must pass the attribution
 * instead of "Example figures displayed", and the `label` prop is a plain
 * string that cannot carry the inline source links these notes already
 * publish).
 */
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

/**
 * ONE BINDING, TWO CONSUMERS (locked rule T17). These three Q&A pairs used to
 * exist only inside the FAQPage JSON-LD: the schema asserted three answers the
 * HTML did not carry. The array now feeds `buildFaqJsonLd` below AND the
 * visible `FaqSection` near the foot of the page, so the two cannot drift. Not
 * one character of the three answers is changed.
 */
const faqs = [
  {
    question: "Which part of England has the fewest pharmacies per person?",
    answer: `${highestRegion.region} has the most NHS pharmacies per 100,000 population (${highestRegion.per_100k}), while ${lowestRegion.region} has the fewest (${lowestRegion.per_100k}) -- a gap of about ${gapPct}%. NHSBSA Contractor Details, joined to ONS mid-year regional population estimates.`,
  },
  {
    question: "Are pharmacists dispensing more prescriptions per pharmacy than a few years ago?",
    answer: `Yes. Items dispensed per pharmacy in March alone rose from ${fmtNumber(wFirst.items_per_pharmacy)} in March ${wFirst.year} to ${fmtNumber(wLast.items_per_pharmacy)} in March ${wLast.year}, an increase of ${fmtPercent(itemsPerPharmacyChangePct)}, while the number of dispensing pharmacies fell ${fmtPercent(Math.abs(pharmacyCountChangePct), false)}. The same national prescription volume is being dispensed by fewer pharmacies.`,
  },
  {
    question: "How is pharmacy density calculated in this index?",
    answer: "NHS-contracted community pharmacies (excluding appliance-only and private controlled-drug accounts) from NHSBSA's Contractor Details dataset are counted by NHS England region, then divided by the ONS mid-year population estimate for the equivalent geography (Nomis dataset NM_2002_1, rebased to the 2021/22 censuses), per 100,000 residents.",
  },
];

const faqLd = buildFaqJsonLd(faqs);

export default function PharmacyDensityWorkloadIndexPage() {
  const barData = density.regions.map((r) => ({ label: r.region, value: r.per_100k, highlight: r.region === highestRegion.region }));
  const workloadAnnualData = workload.annual_march_snapshot.map((r) => ({ tick: String(r.year), value: r.items_per_pharmacy }));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />

      {/* Hero. The pre-port hero's "Research" link pointed at the OTHER
          research page, which reads as a trail to a hub that does not exist on
          this site. That cross-link survives untouched in the "Related
          research" card further down, where it is honest. Here it becomes the
          kit Breadcrumb (plus one BreadcrumbList block this URL did not have)
          and the kit Eyebrow carrying the same published word. No "Research"
          crumb: there is no /research hub route and a crumb to it would 404.

          `.ground-dark` rebinds the rings to white (brand hex rings at 1.47 on
          its own ground). No light-ground card with focusable children inside.

          GROUND ROW for PharmaciesBackdrop on bg-primary-950 #0f3a4a: motif
          stroke #45cdff at the component's 0.10 group opacity composites to
          #15485c. Bare: white 12.18, slate-300 8.20. Composited: white 9.95,
          white/80 7.02, slate-300 6.70. All PASS the 4.5 text floor. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
        <PharmaciesBackdrop patternId="pharmacies-dispensary-shelving-density-workload" />
        <div className={`relative z-10 ${siteContainerLg}`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[
              { label: "Home", href: "/" },
              { label: "Density and Dispensing Workload Index" },
            ]}
          />
          <Eyebrow onDark className="text-white">
            Research
          </Eyebrow>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pharmacy Density and Dispensing Workload Index.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Where England&apos;s NHS pharmacy network is thinnest on the ground, and how much dispensing work is now falling on each remaining pharmacy. Built from{" "}
            <a
              href={density.source.url}
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              data-cta="research_pharmacy_density_and_workload_index_hero_data"
              data-cta-placement="hero"
              data-cta-goal="research"
            >
              NHSBSA Contractor Details
            </a>
            , ONS/Nomis population estimates, and{" "}
            <a
              href={workload.source.url}
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              data-cta="research_pharmacy_density_and_workload_index_hero_data"
              data-cta-placement="hero"
              data-cta-goal="research"
            >
              NHSBSA dispensing data
            </a>
            .
          </p>
          {/* data-cta: `..._hero_book` DECLINED. This hero publishes no booking
              link (grepped: only the two source citations above and the CSV
              link below); the panel at the foot of this route already carries
              the booking form and its own `lead_form_submit` id
              (LeadForm.tsx:438). No new link is added to carry one. */}
          <p className="mt-3 text-sm text-white/60">
            Data pulled {density.pull_date}. Published under{" "}
            <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" className="underline hover:text-white/70" target="_blank" rel="noopener noreferrer">
              Open Government Licence v3.0
            </a>
            .{" "}
            <a
              href={`/research/${SLUG}/data`}
              className="underline hover:text-white/70"
              data-cta="research_pharmacy_density_and_workload_index_csv"
              data-cta-placement="hero"
              data-cta-goal="tool"
            >
              Download CSV
            </a>
          </p>
        </div>
      </section>

      {/* Headline stats */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-primary-950 text-white p-6">
              <div className="text-4xl font-bold font-mono">{highestRegion.per_100k}</div>
              <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">pharmacies per 100k, {highestRegion.region}</div>
              <p className="mt-3 text-sm text-white/60">The best-served NHS region in England.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-4xl font-bold font-mono text-primary-950">{lowestRegion.per_100k}</div>
              <div className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">pharmacies per 100k, {lowestRegion.region}</div>
              <p className="mt-3 text-sm text-slate-600">The thinnest-served region, {gapPct}% lower density than {highestRegion.region}.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-4xl font-bold font-mono text-primary-950">{fmtPercent(itemsPerPharmacyChangePct)}</div>
              <div className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">items dispensed per pharmacy each March, {wFirst.year}&rarr;{wLast.year}</div>
              <p className="mt-3 text-sm text-slate-600">From {fmtNumber(wFirst.items_per_pharmacy)} to {fmtNumber(wLast.items_per_pharmacy)} items dispensed in the month of March, per pharmacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Density map */}
      <section className="bg-slate-50 border-t border-b border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">NHS pharmacies per 100,000 population, by region</h2>
          <p className="mb-8 max-w-2xl text-slate-600">
            NHS-contracted community pharmacies from NHSBSA&apos;s Contractor Details dataset ({density.source.resource_title}), counted by NHS England region and divided by the ONS mid-{density.population_source.year.replace("mid-", "")} population estimate for the equivalent geography.
          </p>
          <div className="bg-white border border-slate-200 p-6 mb-8">
            <HorizontalBarChart data={barData.map((d) => ({ ...d, suffix: " /100k" }))} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900">
                  <th className="text-left py-3 pr-6 font-semibold text-slate-900">Region</th>
                  <th className="text-right py-3 pr-6 font-semibold text-slate-900">NHS pharmacies</th>
                  <th className="text-right py-3 pr-6 font-semibold text-slate-900">Population</th>
                  <th className="text-right py-3 font-semibold text-slate-900">Per 100k</th>
                </tr>
              </thead>
              <tbody>
                {density.regions.map((r) => (
                  <tr key={r.region} className="border-b border-slate-100">
                    <td className="py-3 pr-6 text-slate-700">{r.region}</td>
                    <td className="py-3 pr-6 text-right text-slate-700 font-mono">{fmtNumber(r.pharmacy_count)}</td>
                    <td className="py-3 pr-6 text-right text-slate-700 font-mono">{fmtNumber(r.population)}</td>
                    <td className="py-3 text-right font-mono font-semibold text-primary-950">{r.per_100k}</td>
                  </tr>
                ))}
                <tr className="font-semibold bg-slate-50">
                  <td className="py-3 pr-6 text-slate-900">England total</td>
                  <td className="py-3 pr-6 text-right text-slate-900 font-mono">{fmtNumber(density.england_total_pharmacies)}</td>
                  <td className="py-3 pr-6 text-right text-slate-900 font-mono">{fmtNumber(density.england_total_population)}</td>
                  <td className="py-3 text-right font-mono text-primary-950">{density.england_per_100k}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Source: {density.source.name} ({density.source.resource_title}), NHS Business Services Authority; {density.population_source.name}, Office for National Statistics. Both Open Government Licence v3.0. Pulled {density.pull_date}.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            NHS regions combine ONS Regions of England as follows: Midlands = East Midlands + West Midlands; North East and Yorkshire = North East + Yorkshire and The Humber. The other five NHS regions map 1:1 to an ONS region. Wales, Scotland, Northern Ireland and the Crown Dependencies (Jersey, Guernsey, Isle of Man, Alderney) are excluded from the England totals but appear in the underlying contractor list; coverage there is limited and treated as a guide only by NHSBSA. Counts exclude appliance-only accounts and private controlled-drug accounts.
          </p>
        </div>
      </section>

      {/* Dispensing workload */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">Dispensing workload: fewer pharmacies, more items dispensed each</h2>
          <p className="mb-8 max-w-2xl text-slate-600">
            National prescription items dispensed and dispensing-pharmacy counts, each March ({wFirst.year} to {wLast.year}), from NHSBSA&apos;s Pharmacy and Appliance Contractor Dispensing Data. Total items dispensed nationally in the month of March rose from {fmtNumber(wFirst.total_items)} ({wFirst.year}) to {fmtNumber(wLast.total_items)} ({wLast.year}), a single month&apos;s volume spread across a shrinking pharmacy count.
          </p>

          <h3 className="text-lg font-bold text-slate-900 mb-4">Pharmacy count vs items-per-pharmacy, indexed to {wFirst.year}</h3>
          <div className="bg-slate-50 border border-slate-200 p-6 mb-10">
            <IndexedComparisonChart
              categories={workload.annual_march_snapshot.map((r) => String(r.year))}
              seriesA={workload.annual_march_snapshot.map((r) => r.pharmacy_count)}
              seriesB={workload.annual_march_snapshot.map((r) => r.items_per_pharmacy)}
              labelA="Dispensing pharmacies"
              labelB="Items dispensed per pharmacy (March)"
            />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-4">Items dispensed per pharmacy each March</h3>
          <div className="bg-slate-50 border border-slate-200 p-6 mb-4">
            <AnnualBarChart data={workloadAnnualData} label="Items dispensed per pharmacy, March each year" formatValue={(n) => fmtNumber(n)} />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900">
                  <th className="text-left py-3 pr-6 font-semibold text-slate-900">March</th>
                  <th className="text-right py-3 pr-6 font-semibold text-slate-900">Total items dispensed (March)</th>
                  <th className="text-right py-3 pr-6 font-semibold text-slate-900">Dispensing pharmacies</th>
                  <th className="text-right py-3 font-semibold text-slate-900">Items per pharmacy (March)</th>
                </tr>
              </thead>
              <tbody>
                {workload.annual_march_snapshot.map((r, i, arr) => (
                  <tr key={r.year} className={`border-b border-slate-100 ${i === arr.length - 1 ? "font-semibold bg-white" : ""}`}>
                    <td className="py-3 pr-6 text-slate-700 font-mono">{r.year}</td>
                    <td className="py-3 pr-6 text-right text-slate-700 font-mono">{fmtNumber(r.total_items)}</td>
                    <td className="py-3 pr-6 text-right text-slate-700 font-mono">{fmtNumber(r.pharmacy_count)}</td>
                    <td className="py-3 text-right font-mono text-primary-950">{fmtNumber(r.items_per_pharmacy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Source: {workload.source.name} ({workload.source.resource_title}), NHS Business Services Authority. Licence: Open Government Licence v3.0. Pulled {workload.pull_date}.
          </p>
          <p className="mt-2 text-xs text-slate-500">{workload.methodology}</p>
        </div>
      </section>

      {/* On-funnel links */}
      <section className="bg-slate-50 border-t border-b border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">What the workload squeeze means for pharmacy owners</h2>
          <p className="mb-8 max-w-2xl text-slate-600">
            Rising items per pharmacy means more Category M and Drug Tariff margin exposure concentrated in fewer businesses, and a workforce and staffing cost base that has to absorb the volume the network used to spread across more sites. Benchmarking your dispensing efficiency and margin against the national trend is the starting point for a pricing and staffing conversation with your accountant.
          </p>
          {/* ScrollGlowGroup ADOPTED (the card grid shape UB's /for/[slug] and
              /services/[slug] already use); 0 glow mounts on this route
              before. */}
          <ScrollGlowGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/services/pharmacy-benchmarking-margin"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Service</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">Pharmacy Benchmarking and Margin</div>
              <p className="mt-2 text-sm text-slate-600">Compare your dispensing margin and cost base against sector norms as workload per pharmacy keeps rising.</p>
            </Link>
            <Link
              href="/services/pharmacy-payroll-workforce"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Service</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">Pharmacy Payroll and Workforce</div>
              <p className="mt-2 text-sm text-slate-600">Staffing cost planning for a dispensing volume that keeps climbing per pharmacy.</p>
            </Link>
            <Link
              href="/calculators/pharmacy-fp34-cash-flow-estimator"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Calculator</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">FP34 NHS Cash Flow Estimator</div>
              <p className="mt-2 text-sm text-slate-600">Model the payment cycle on a higher, and rising, monthly dispensing volume.</p>
            </Link>
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Cross-link to flagship */}
      <section className="bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <Link
            href="/research/pharmacy-openings-closures-index"
            className="block border border-slate-200 p-6 hover:border-primary-950 transition-colors"
          >
            <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Related research</div>
            <div className="font-bold text-slate-900 text-lg">UK Community Pharmacy Openings and Closures Index</div>
            <p className="mt-2 text-sm text-slate-600">The monthly net-closures tracker behind the numbers on this page, plus the Companies House SIC 47730 formations divergence.</p>
          </Link>
        </div>
      </section>

      {/* Methodology.
          G3 (grounds fix, V1 blocker B2): this section was `bg-white` directly
          under the white cross-link section above, the adjacentSame
          (white-on-white) pair `--grounds` reported on this route. One of the
          pair alternates to slate-50; nothing else here changes. */}
      <section className="bg-slate-50 py-10 sm:py-12 border-t border-slate-200">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-slate-900 mb-3">About this index</h2>
          <ul className="text-sm text-slate-500 max-w-2xl space-y-1 list-disc list-inside">
            <li>Density figures use a single latest month&apos;s NHSBSA Contractor Details snapshot; NHSBSA describes the contractor list as &quot;a guide only&quot; due to reporting lags from Integrated Care Boards.</li>
            <li>Regional totals may differ slightly from the openings/closures index headline because the two datasets use different extraction methods (a point-in-time contractor list vs a monthly reporting cycle); both are official NHSBSA sources.</li>
            <li>Dispensing workload figures are single-month volumes for March each year, not annual totals: the same benchmark month is compared year on year to avoid seasonal variation and to align with the openings/closures index&apos;s own annual convention. Annual dispensing volume runs at roughly 12 times the March figure.</li>
            <li>Small counts in NHSBSA source data may be subject to standard disclosure-control rounding; this index reports published totals as-is.</li>
            <li>England-only. Scotland, Wales, and the Crown Dependencies are excluded from the density map; NHSBSA holds only limited data for Wales and the Islands and none for Scotland or Northern Ireland.</li>
          </ul>
          <p className="mt-6 text-sm text-slate-500 max-w-2xl">
            <strong>Cite this index:</strong> Pharmacy Density and Dispensing Workload Index, derived from NHSBSA Contractor Details, NHSBSA Pharmacy and Appliance Contractor Dispensing Data, and ONS/Nomis mid-year population estimates. Published under OGL3. Verified {density.pull_date}.
          </p>
          <p className="mt-3 text-sm text-slate-500 max-w-2xl">
            <a href={`/research/${SLUG}/data`} className="underline">Download the full regional and annual series as CSV</a>.
          </p>
        </div>
      </section>

      {/* FAQ, the visible half of the binding declared at the top of this file.
          `alwaysRenderAnswers` keeps all three answers in the server HTML
          (Radix forceMount), so the FAQPage JSON-LD above cannot assert an
          answer the page does not carry. `html` is NOT passed: the three
          answers are plain text with no authored markup.
          G3 (grounds fix): this band moves from slate-50 to WHITE, because the
          methodology section above it is now slate-50 and the closing panel
          below it is the contained slate-50 variant. `tone` flips to "slate"
          with it, per the component's own rule: slate-50 items on a white
          section. No copy and no component change. */}
      <FaqSection
        faqs={faqs}
        /* G5 (R3 m1): the kit default is eyebrow="FAQ". "FAQ" is a label this
           site does not publish (same ruling as calculators/[slug]), and the
           h2 below already says "Frequently asked questions". */
        eyebrow=""
        alwaysRenderAnswers
        tone="slate"
        className="bg-white border-t border-slate-200 py-12 sm:py-16"
      />

      {/* CLOSING PANEL. Replaces a hand-rolled slate-900 band whose single
          button was the only conversion path on this URL: the page carried NO
          form. The h2 and the paragraph are the band's own published strings,
          byte for byte, now the panel's required `title` and `description`.
          `eyebrow=""` / `formTitle=""` because this site publishes neither
          default (LeadCTAPanel.tsx:18,27) and both render only when non-empty;
          `proofPoints={[]}` because the page publishes no proof list.

          LINK DELTA, derived: the band's one href was /contact, which is in the
          kit header CTA and the footer on every route, so the unique-href count
          the floor of 14 is measured on does not move. V1 to confirm against
          the one build.

          NO `.ground-dark`: the panel hardcodes `bg-slate-900` with no prop to
          reach it, and the non-contained variant puts a WHITE form card inside
          the dark band. globals.css warns `.ground-dark` must never wrap a dark
          section containing a light-ground card with focusable children, which
          is this shape exactly. The dark half has no focusable control.

          PRE-EXISTING DEFECT CLOSED as a side effect: the white "Speak to a
          specialist" button it replaces was a focusable control on slate-900
          with no `.ground-dark` on the route, so its ring resolved to the brand
          hex at 1.47 against that ground. G3 (grounds fix, V1 blocker B2): the slate-900 band was the last band
          before the slate-900 footer on this route (darkOnDark). The panel now
          uses the kit `contained` light variant with `ground="slate"`, the band
          above it having moved to white. Still no `.ground-dark`, now because
          the ground is light. `backdrop` is dropped: the kit renders it on the
          navy variant only (LeadCTAPanel.tsx:72-77). */}
      <LeadCTAPanel
        eyebrow=""
        formTitle=""
        title="Running a pharmacy under rising dispensing volume?"
        description="More items dispensed per pharmacy means margin, staffing, and cash-flow pressure concentrated in fewer businesses. Get the accounting and benchmarking right for where the sector is heading, not where it was five years ago."
        proofPoints={[]}
        contained
        ground="slate"
        form={<LeadForm submitLabel="Send enquiry" />}
      />
    </div>
  );
}
