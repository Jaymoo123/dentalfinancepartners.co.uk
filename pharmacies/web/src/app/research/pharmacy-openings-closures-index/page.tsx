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

/**
 * CHROME ONLY, plus one net-new conversion surface the brief asked for. Every
 * sentence and every figure on this page is the pre-port string, byte for
 * byte; the figures are all read from the snapshot JSON as before.
 *
 * ADOPTED: primitives/Breadcrumb.tsx `tone="onBrand"`, primitives/page-blocks
 * `Eyebrow`, primitives/FaqSection.tsx with `alwaysRenderAnswers`, and
 * marketing/LeadCTAPanel.tsx. Reasons are at each call site below.
 *
 * ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx. Two
 * reasons, both re-derived against the current kit, neither of them the stale
 * `sectionClassName` one (that prop exists, :27,47,50). First, SlimHero holds
 * Eyebrow, h1 and children in ONE container (:52-57) with no slot above the
 * eyebrow, so this hero's Breadcrumb could only drop below the h1 or into
 * `backdrop`, which sits outside the container and under the absolute motif.
 * Second, its `py-8 sm:py-10 lg:py-12` rhythm is structural (:50) and not
 * reachable by `sectionClassName`, which replaces the single ground class and
 * nothing else (:36-38), against this hero's `py-16 sm:py-20`. KIT ASK for the
 * manager, same as hospitality filed: a `breadcrumb` slot above the eyebrow.
 * ADOPTION DECLINED: packages/web-shared/design/primitives/NoticeCard.tsx for
 * the "About this index" methodology and caveats. The component hardcodes
 * `text-center` on its panel (:38) and exposes no alignment prop, so the
 * methodology paragraph and the five-item caveat list would centre; a centred
 * five-bullet list of statistical caveats is less readable than the left-aligned
 * one it replaces. Its own docblock (:1-17) also scopes it to token-gated
 * outcome states ("link expired", "you are all set"), which these are not.
 * Adopted on /book and /complete instead, where that is exactly the content.
 * KIT ASK: `align?: "center" | "start"` on NoticeCard, defaulting to center so
 * every existing consumer is byte-identical.
 * ADOPTION DECLINED: packages/web-shared/design/marketing/WhatToExpectCard.tsx.
 * `items` must always be passed (defaults publish a fee line this site never
 * promises, :22-27) and a research page publishes no "what happens next" list.
 */
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

/**
 * ONE BINDING, TWO CONSUMERS (locked rule T17). These four Q&A pairs used to
 * exist only inside the FAQPage JSON-LD: the schema asserted four answers the
 * HTML did not carry, which is the exact defect `alwaysRenderAnswers` was added
 * to the kit for. The array now feeds `buildFaqJsonLd` below AND the visible
 * `FaqSection` near the foot of the page, so the two can never drift. Not one
 * character of the four answers is changed; they are the strings the page was
 * already publishing to crawlers.
 */
const faqs = [
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
];

const faqLd = buildFaqJsonLd(faqs);

export default function PharmacyOpeningsClosuresIndexPage() {
  const { headline, meta, companiesHouseSIC47730: ch, annualSnapshot, monthly } = snap;

  const lineData = monthly.map((m) => ({ month: m.month, tick: monthLabelShort(m.month), value: m.total }));

  const stackData = annualSnapshot.map((r) => ({
    tick: r.month.endsWith("-12") ? String(r.year) : `${r.year}*`,
    values: { small: r.small, medium: r.medium, large: r.large },
  }));

  const chAnnualData = ch.annual
    .filter((r) => r.year >= 2016)
    .map((r) => ({
      tick: String(r.year),
      value: r.count ?? 0,
    }));

  const seasonalityMax = Math.max(...ch.seasonality.map((s) => s.avgCount));
  const topSeasonMonth = ch.seasonality.reduce((a, b) => (b.avgCount > a.avgCount ? b : a));

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
      {/* Hero.
          The pre-port hero opened with a `<Link>` to THIS page's own URL whose
          only text was the word "Research": a self-referential link, not a
          trail. It is replaced by the kit Breadcrumb (a real trail, plus one
          BreadcrumbList block this URL did not have) and the kit Eyebrow
          carrying the same published word. There is deliberately no "Research"
          crumb between Home and this page: no /research hub route exists on
          this site and inventing one is an owner question, so a crumb linking
          to it would 404.

          `.ground-dark` rebinds --focus-ring / --kit-focus-ring to white; the
          brand hex rings at 1.47 on its own ground. No light-ground card with
          focusable children sits inside this section.

          GROUND ROW for PharmaciesBackdrop (its header asks each new ground for
          one; phase 1 measured slate-900 only). New ground: bg-primary-950
          #0f3a4a. Motif stroke #45cdff at the component's 0.10 group opacity
          composites to #15485c. Bare #0f3a4a: white 12.18, slate-300 8.20.
          Composited #15485c: white 9.95, white/80 7.02, slate-300 6.70. Every
          pair PASSES the 4.5 text floor.

          EYEBROW CONTRAST, recorded: `Eyebrow onDark` hardcodes text-slate-300
          (page-blocks.tsx:61), which measures 6.70 on the composited ground
          here, PASS. `className="text-white"` is passed anyway (the prop exists
          at :46) to match the h1 and the standfirst. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
        <PharmaciesBackdrop patternId="pharmacies-dispensary-shelving-openings-closures" />
        <div className={`relative z-10 ${siteContainerLg}`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[
              { label: "Home", href: "/" },
              { label: "Openings and Closures Index" },
            ]}
          />
          <Eyebrow onDark className="text-white">
            Research
          </Eyebrow>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            UK Community Pharmacy Openings and Closures Index.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Monthly, owner-segmented figures on England&apos;s pharmacy network from{" "}
            <a
              href={meta.sources.nhsbsa_openings_closures.url}
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              data-cta="research_pharmacy_openings_closures_index_hero_data"
              data-cta-placement="hero"
              data-cta-goal="research"
            >
              NHSBSA&apos;s Pharmacy Openings and Closures dataset
            </a>
            , paired with Companies House SIC 47730 corporate-formations data. Two independent official spines. England-first; Scotland and Wales v2 queued.
          </p>
          {/* data-cta: `..._hero_book` DECLINED. This hero publishes no booking
              link (grepped: only the source citation above and the CSV link
              below); the closing panel on this route already carries the
              booking form and its own `lead_form_submit` id
              (LeadForm.tsx:438). No new link is added to carry one. */}
          <p className="mt-3 text-sm text-white/60">
            Last updated: {meta.lastUpdated}. Published under{" "}
            <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" className="underline hover:text-white/70" target="_blank" rel="noopener noreferrer">
              Open Government Licence v3.0
            </a>
            .{" "}
            <a
              href="/research/pharmacy-openings-closures-index/data"
              className="underline hover:text-white/70"
              data-cta="research_pharmacy_openings_closures_index_csv"
              data-cta-placement="hero"
              data-cta-goal="tool"
            >
              Download CSV
            </a>
          </p>
        </div>
      </section>

      {/* Headline stat cards */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-8">England&apos;s NHS pharmacy network ({headline.latestMonthLabel})</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-primary-950 text-white p-6">
              <div className="text-5xl font-bold font-mono">{headline.latestTotalLabel}</div>
              <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">NHS pharmacies open in England</div>
              <p className="mt-3 text-sm text-white/60">
                Pharmacies on an NHS England Pharmaceutical List at {headline.latestMonthLabel}, including {fmtNumber(headline.latestDistanceSellers)} distance-selling pharmacies. {fmtNumber(headline.latestTotalExclDS)} excluding distance sellers.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-5xl font-bold font-mono text-primary-950">{headline.yoyChangeLabel}</div>
              <div className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">year-on-year net change</div>
              <p className="mt-3 text-sm text-slate-600">
                Net change, {headline.yoyPeriod}. A pharmacy leaving the list has closed, surrendered its NHS contract, or been absorbed into another site.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-4xl font-bold font-mono text-primary-950">{headline.baselineChangeLabel}</div>
              <div className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">change since {headline.baselinePeriod.split(" to ")[0]}</div>
              <p className="mt-3 text-sm text-slate-600">
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
              <div key={s.label} className="border border-slate-200 p-4">
                <div className="text-2xl font-bold font-mono text-slate-900">{fmtNumber(s.value)}</div>
                <div className="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly trend chart */}
      <section className="bg-slate-50 border-t border-b border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">NHS pharmacy count, {monthLabelShort(monthly[0].month)} to {monthLabelShort(monthly[monthly.length - 1].month)}</h2>
          <p className="mb-6 max-w-2xl text-slate-600">
            Total pharmacies on an NHS England Pharmaceutical List at the end of each month, including distance-selling pharmacies. Every point traces back to NHSBSA&apos;s published monthly file.
          </p>
          <div className="bg-white border border-slate-200 p-6">
            <MonthlyLineChart
              points={lineData}
              label="Monthly NHS pharmacy count"
              formatValue={(n) => fmtNumber(n)}
            />
          </div>

          <h3 className="mt-12 text-lg font-bold text-slate-900 mb-4">Owner-group composition, year-end snapshot</h3>
          <p className="mb-6 max-w-2xl text-slate-600">
            Small (1-5 premises, mostly independents), Medium (6-99) and Large (100+, the big multiples). December snapshot each year; the final bar is the latest available month, marked with an asterisk.
          </p>
          <div className="bg-white border border-slate-200 p-6">
            <StackedBarChart
              data={stackData}
              series={[
                { key: "small", label: "Small (1-5)" },
                { key: "medium", label: "Medium (6-99)" },
                { key: "large", label: "Large (100+)" },
              ]}
              label="Owner-group composition by year"
            />
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900">
                  <th className="text-left py-3 pr-6 font-semibold text-slate-900">Snapshot</th>
                  <th className="text-right py-3 pr-6 font-semibold text-slate-900">Total</th>
                  <th className="text-right py-3 pr-6 font-semibold text-slate-900">Small</th>
                  <th className="text-right py-3 pr-6 font-semibold text-slate-900">Medium</th>
                  <th className="text-right py-3 font-semibold text-slate-900">Large</th>
                </tr>
              </thead>
              <tbody>
                {annualSnapshot.map((r, i) => (
                  <tr key={r.month} className={`border-b border-slate-100 ${i === annualSnapshot.length - 1 ? "font-semibold bg-white" : ""}`}>
                    <td className="py-3 pr-6 text-slate-700 font-mono whitespace-nowrap">{r.monthLabel}</td>
                    <td className="py-3 pr-6 text-right text-slate-700 font-mono">{fmtNumber(r.total)}</td>
                    <td className="py-3 pr-6 text-right text-slate-700 font-mono">{fmtNumber(r.small)}</td>
                    <td className="py-3 pr-6 text-right text-slate-700 font-mono">{fmtNumber(r.medium)}</td>
                    <td className="py-3 text-right text-slate-700 font-mono">{fmtNumber(r.large)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">
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
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">Companies House corporate layer: SIC 47730</h2>
          <p className="mb-8 max-w-2xl text-slate-600">
            A second, independent data spine from{" "}
            <a href={ch.sourceUrl} className="text-primary-950 underline hover:opacity-75" target="_blank" rel="noopener noreferrer">
              Companies House
            </a>
            . SIC code 47730 (&quot;dispensing chemist in specialised stores&quot;) covers UK-wide incorporated pharmacy companies, measuring corporate-entity formation rather than NHS contract activity.
          </p>
          <div className="grid gap-6 sm:grid-cols-4 mb-10">
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-3xl font-bold font-mono text-primary-950">{ch.activeCompanies.label}</div>
              <div className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">active companies</div>
              <p className="mt-2 text-xs text-slate-500">as at {ch.activeCompanies.asOf}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-3xl font-bold font-mono text-primary-950">{ch.dissolvedCompanies.label}</div>
              <div className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">dissolved (all time)</div>
              <p className="mt-2 text-xs text-slate-500">as at {ch.dissolvedCompanies.asOf}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-3xl font-bold font-mono text-primary-950">{fmtNumber(ch.ttm)}</div>
              <div className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">incorporations, trailing 12m</div>
              <p className="mt-2 text-xs text-slate-500">to {ch.lastSettledMonth}, {fmtPercent(ch.yoyPct)} YoY</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6">
              <div className="text-3xl font-bold font-mono text-primary-950">{ch.decade.multiple}&times;</div>
              <div className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{ch.decade.from_year}&rarr;{ch.decade.to_year} formations</div>
              <p className="mt-2 text-xs text-slate-500">{fmtNumber(ch.decade.from_value)} &rarr; {fmtNumber(ch.decade.to_value)} a year ({fmtPercent(ch.decade.change_pct)})</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-4">Annual incorporations, SIC 47730 ({ch.decade.from_year} to {ch.decade.to_year})</h3>
          <div className="bg-slate-50 border border-slate-200 p-6 mb-4">
            <AnnualBarChart data={chAnnualData} label="Annual pharmacy company incorporations" formatValue={(n) => fmtNumber(n)} />
          </div>
          <p className="text-sm text-slate-600 max-w-2xl mb-10">
            While the NHS dispensing network above has contracted every year since {headline.baselinePeriod.split(" to ")[0]}, SIC 47730 incorporations have moved the opposite way: {ch.decade.multiple}&times; more new pharmacy companies were formed in {ch.decade.to_year} than in {ch.decade.from_year}. {ch.caveat}
          </p>

          <h3 className="text-lg font-bold text-slate-900 mb-4">Formation seasonality: which month sees the most new pharmacy companies</h3>
          <p className="mb-6 max-w-2xl text-slate-600">
            Average monthly incorporations across {ch.seasonality[0].yearsOfData} years of settled data (excludes the most recent {ch.provisionalMonths.length} provisional months). {topSeasonMonth.monthName} is the strongest month, averaging {topSeasonMonth.avgCount} incorporations.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {ch.seasonality.map((s) => (
              <div key={s.monthNum} className="text-center">
                <div className="h-24 flex items-end justify-center bg-slate-100">
                  {/* Real DOM elements, so the ramp is reachable as a utility
                      and no hex literal is needed: primary-950 for the peak
                      month, primary-200 for the rest (was an off-ramp
                      `#a8c5cd`). Only the bar HEIGHT is inline, because it is
                      data, not colour. */}
                  <div
                    className={`w-full ${s.monthNum === topSeasonMonth.monthNum ? "bg-primary-950" : "bg-primary-200"}`}
                    style={{ height: `${Math.max((s.avgCount / seasonalityMax) * 100, 4)}%` }}
                    title={`${s.monthName}: avg ${s.avgCount} incorporations`}
                  />
                </div>
                <div className="mt-1 text-xs text-slate-500">{s.monthName}</div>
              </div>
            ))}
          </div>
          {/* Locked rule 14, applied to the one chart on this page that is NOT
              a PharmacyIndexCharts component: the twelve averages existed only
              in `title` attributes, which a screen reader cannot reliably reach
              and an LLM scrape never sees. Same visually hidden text-node list
              the chart components carry. */}
          <ul className="sr-only" aria-label="Average monthly incorporations by month">
            {ch.seasonality.map((s) => (
              <li key={s.monthNum}>
                {s.monthName}: avg {s.avgCount} incorporations
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs text-slate-500">
            Source: Companies House Advanced Search API, SIC 47730. Licence: Open Government Licence v3.0. Incorporation counts pulled {meta.sources.companies_house.pullDate}; active/dissolved totals pulled {ch.activeCompanies.asOf}.
          </p>
        </div>
      </section>

      {/* On-funnel links: calculators and buying/selling */}
      <section className="bg-slate-50 border-t border-b border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">What the data means for pharmacy buyers and sellers</h2>
          <p className="mb-8 max-w-2xl text-slate-600">
            A shrinking contractor count means more distressed and motivated sellers, concentrated among the large multiples rationalising their estates. Buyers face a market where goodwill multiples reflect the contract value of the NHS income stream. The financial and tax structure of the transaction determines how much of that value is retained after CGT, BADR, and stamp duty.
          </p>
          {/* ScrollGlowGroup ADOPTED, same shape UB's /for/[slug] and
              /services/[slug] already use; 0 glow mounts on this route before. */}
          <ScrollGlowGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/calculators/pharmacy-purchase-affordability"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Calculator</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">Pharmacy Purchase Affordability</div>
              <p className="mt-2 text-sm text-slate-600">Estimate the financing headroom on a pharmacy acquisition, based on your equity position and estimated dispensing income.</p>
            </Link>
            <Link
              href="/calculators/pharmacy-fp34-cash-flow-estimator"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Calculator</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">FP34 NHS Cash Flow Estimator</div>
              <p className="mt-2 text-sm text-slate-600">Model the monthly NHS payment cycle and the advance-on-account timing gap that affects every pharmacy&apos;s working capital.</p>
            </Link>
            <Link
              href="/for/buying-a-pharmacy"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Guide</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">Buying a Pharmacy</div>
              <p className="mt-2 text-sm text-slate-600">Share purchase vs asset purchase, stamp duty, goodwill treatment, and the due-diligence accounting questions every buyer needs answered.</p>
            </Link>
            <Link
              href="/for/selling-a-pharmacy"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Guide</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">Selling a Pharmacy</div>
              <p className="mt-2 text-sm text-slate-600">CGT, BADR at 18% for 2026/27, and the tax-structuring decisions that sellers need to resolve before accepting an offer.</p>
            </Link>
            <Link
              href="/services/pharmacy-valuation-goodwill"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Service</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">Pharmacy Valuation and Goodwill</div>
              <p className="mt-2 text-sm text-slate-600">How adjusted EBITDA multiples and pence-per-item methods work in practice, and what the accounts need to show to support the asking price.</p>
            </Link>
            <Link
              href="/services/pharmacy-sale-cgt-badr"
              className="group border border-slate-200 bg-white p-6 hover:border-primary-950 transition-colors"
            >
              <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Service</div>
              <div className="font-bold text-slate-900 group-hover:text-primary-950 transition-colors">Pharmacy Sale: CGT and BADR</div>
              <p className="mt-2 text-sm text-slate-600">Structuring the sale to access Business Asset Disposal Relief and minimise the capital gains tax bill on goodwill proceeds.</p>
            </Link>
          </ScrollGlowGroup>
        </div>
      </section>

      {/* Cross-link to the density/workload asset */}
      <section className="bg-white py-10 sm:py-12">
        <div className={siteContainerLg}>
          <Link
            href="/research/pharmacy-density-and-workload-index"
            className="block border border-slate-200 p-6 hover:border-primary-950 transition-colors"
          >
            <div className="text-sm font-semibold text-primary-950 uppercase tracking-wider mb-2">Related research</div>
            <div className="font-bold text-slate-900 text-lg">Pharmacy Density and Dispensing Workload Index</div>
            <p className="mt-2 text-sm text-slate-600">Where the pharmacy network is thinnest by region, and how dispensing volume per pharmacy has changed as the network has shrunk.</p>
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
          <p className="text-sm text-slate-600 max-w-2xl mb-4">
            {meta.methodology}
          </p>
          <ul className="text-sm text-slate-500 max-w-2xl space-y-1 list-disc list-inside">
            {meta.caveats.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-500 max-w-2xl">
            <strong>Cite this index:</strong> {meta.citeAs}
          </p>
          <p className="mt-3 text-sm text-slate-500 max-w-2xl">
            Last updated: {meta.lastUpdated}. England-only; Scotland and Wales coverage is queued for v2.{" "}
            <a href="/research/pharmacy-openings-closures-index/data" className="underline">Download the full monthly series as CSV</a>.
          </p>
        </div>
      </section>

      {/* FAQ, the visible half of the binding declared at the top of this file.
          `alwaysRenderAnswers` keeps all four answers in the server HTML
          (Radix forceMount), so the FAQPage JSON-LD above can never assert an
          answer the page does not carry. `html` is NOT passed: these four
          answers are plain text, checked at the array, with no authored markup
          and no inline links.
          G3 (grounds fix): this band moves from slate-50 to WHITE, because the
          methodology section above it is now slate-50 and the closing panel
          below it is the contained slate-50 variant. `tone` flips to "slate"
          with it: slate-50 items on a white section. No copy change. */}
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

      {/* CLOSING PANEL. Replaces a hand-rolled slate-900 band whose two buttons
          were the only conversion path on the highest-authority page on the
          site: this URL carried NO form at all. The h2 and the paragraph are
          the band's own published strings, byte for byte, now the panel's
          required `title` and `description`.

          `eyebrow=""` and `formTitle=""`: this site publishes neither of the
          component's defaults ("Free consultation" / "Book your free
          consultation", LeadCTAPanel.tsx:18,27) and both render only when
          non-empty (:156,194). `proofPoints={[]}`: the page publishes no proof
          list and writing three would be authoring copy.

          LINK DELTA, derived not assumed: the band's two hrefs were /contact
          and /calculators/pharmacy-purchase-affordability. Both survive
          elsewhere in the SERVED HTML of this URL, so the UNIQUE-href count the
          floor of 18 is measured on does not move: the calculator is still
          linked from the on-funnel card grid above, and /contact is in the kit
          header CTA and the footer on every route. V1 to confirm against the
          one build.

          NO `.ground-dark` here, deliberately: the panel's section className is
          hardcoded `bg-slate-900` with no prop to reach it, AND its non-contained
          variant puts a WHITE form card inside the dark band. globals.css warns
          that `.ground-dark` must never wrap a dark section containing a
          light-ground card with focusable children, which is exactly this
          shape: the form's rings must stay on the light value. The dark half
          carries no focusable control (proofPoints is empty).

          PRE-EXISTING DEFECT CLOSED as a side effect: the two buttons it
          replaces were focusable controls on slate-900 with no `.ground-dark`
          anywhere on the route, so their rings resolved to the brand hex at
          1.47 on that ground. They are gone. G3 (grounds fix, V1 blocker B2): the slate-900 band was the last band
          before the slate-900 footer on this route (darkOnDark). The panel now
          uses the kit `contained` light variant with `ground="slate"`, the band
          above it having moved to white. Still no `.ground-dark`, now because
          the ground is light. `backdrop` is dropped: the kit renders it on the
          navy variant only (LeadCTAPanel.tsx:72-77). */}
      <LeadCTAPanel
        eyebrow=""
        formTitle=""
        title="Buying or selling a pharmacy?"
        description="Understanding the market context is the starting point. Whether you are buying into a contracting network or exiting at the right moment, the financial and tax structure of the transaction determines how much value you retain."
        proofPoints={[]}
        contained
        ground="slate"
        form={<LeadForm submitLabel="Send enquiry" />}
      />
    </div>
  );
}
