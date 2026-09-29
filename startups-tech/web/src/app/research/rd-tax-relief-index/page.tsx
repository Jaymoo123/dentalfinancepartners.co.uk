import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { siteContainerLg, focusRing, btnOnDark } from "@/components/ui/layout-utils";
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

/**
 * The report's own name, as the /research hub already publishes it
 * (src/app/research/page.tsx, the matching `reports[].title`). Reused verbatim
 * as the breadcrumb's current crumb so the trail names the page in the site's
 * own existing words rather than in new ones.
 */
const CRUMB = "R&D Tax Relief Usage Index: the post-clampdown squeeze on tech";
const PAGE_PATH = "/research/rd-tax-relief-index";

export const metadata: Metadata = {
  title: "R&D Tax Relief Usage Index: The Post-Clampdown Squeeze on Tech",
  description: `UK R&D tax credit claims fell ${fmtPercent0(Math.abs(headline.yoyClaimsPct ?? 0))} to ${fmtNumber(headline.totalClaims)} in ${headline.latestYear} after HMRC's anti-fraud clampdown. Information & Communication is the largest sector by claim count. Sourced from HMRC official statistics.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "R&D Tax Relief Usage Index | Founder Tax Partners",
    description: `The R&D relief squeeze on tech: claims fell ${fmtPercent0(Math.abs(headline.yoyClaimsPct ?? 0))} in ${headline.latestYear} after HMRC's compliance clampdown. Tech remains the largest sector by claim volume.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "R&D Tax Relief Usage Index | Founder Tax Partners",
    images: ["/api/og"],
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
      `Yes. Information & Communication is the largest single sector by number of claims (${fmtNumber(headline.infoCommsClaims)} claims, ${fmtPercent0(headline.infoCommsClaimsSharePct)} of the UK total) and the third-largest by cost (${fmtGBPm(headline.infoCommsCostM)}, ${fmtPercent0(headline.infoCommsCostSharePct)} of the total). Together with Manufacturing and Professional, Scientific & Technical services, these three sectors account for ${fmtPercent0(headline.top3SectorsClaimsSharePct)} of all claims and ${fmtPercent0(headline.top3SectorsCostSharePct)} of all relief paid.`,
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
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx in place
          of the hand-rolled "Research" back-link. It keeps that link and that
          word, adds the site root (already emitted by the phase-1 chrome, so the
          route's unique internal link set does not change because of it) and
          emits BreadcrumbList JSON-LD this route did not have. `onDark`: the
          kit's on-dark palette measures slate-300 links 10.76:1 and slate-400
          chevrons 6.08:1 on primary-950, past the 4.5 text and 3.0 graphic
          floors, so this site needs no local contrast wrapper over it.
          `ground-dark` rebinds --focus-ring to white for the band
          (src/app/globals.css:153-155).

          ADOPTION DECLINED on this page:
          - packages/web-shared/design/primitives/NoticeCard.tsx for the key
            findings callout: it is `text-center`, and this is a left-aligned
            multi-item list of authored findings that owner ruling 1 freezes.
          - packages/web-shared/design/primitives/ExampleFigureNote.tsx for the
            source footnotes: it prepends a literal `*` and an sr-only "Note:"
            to whatever it wraps, which changes the rendered text of every
            source line it touches. The research family already carries `*` as
            a live footnote marker.
          - packages/web-shared/design/primitives/page-blocks.tsx `Eyebrow`:
            adopting it here would need a label word above each h2 that is not
            on the page today. It IS adopted, with no new words, on
            /research/startup-formation-survival-index.
          ADOPTED (U2 item 1): src/components/layout/StartupsBackdrop.tsx. Its
          contrast table carries this ground: bg-primary-950 #1e1b4b composited
          with the motif at its strongest point = #28265c, white 13.80 and
          slate-300 9.29, both well past the 4.5 text floor, so the white h1,
          the white/80 standfirst, the white stat figures and the kit
          breadcrumb's slate-300 trail are all unaffected. Host contract added:
          `relative overflow-hidden` on the section, `relative z-10` on the
          content. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
        <StartupsBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: CRUMB },
            ]}
          />
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
              className={`underline hover:text-white ${focusRing}`}
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

          <p className="mt-6 text-xs text-white/70 max-w-2xl">
            Source: {meta.sources.hmrc_rd_stats.name} ({meta.sources.hmrc_rd_stats.publisher}).
            Licence: Open Government Licence v3.0.
          </p>
        </div>
      </section>

      {/* Key findings */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">Key findings</h2>
          <div className="max-w-2xl rounded-md border-l-4 p-6 text-slate-700 text-base leading-relaxed bg-slate-50" style={{ borderColor: "var(--color-primary-600)" }}>
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
                of the total) and the third-largest by cost ({fmtGBPm(headline.infoCommsCostM)},{" "}
                {fmtPercent0(headline.infoCommsCostSharePct)}).
              </li>
              <li>
                Information &amp; Communication, Manufacturing, and Professional, Scientific &amp;
                Technical together account for {fmtPercent0(headline.top3SectorsClaimsSharePct)} of
                all claims and {fmtPercent0(headline.top3SectorsCostSharePct)} of all relief cost.
              </li>
            </ul>
          </div>
          <p className="mt-4 max-w-2xl text-xs text-slate-500">
            Source: {meta.sources.hmrc_rd_stats.name}, under the Open Government Licence v3.0.
            Figures may be cited with attribution to Founder Tax Partners.
          </p>
        </div>
      </section>

      {/* Claims time series */}
      <section className="bg-slate-50 border-t border-b border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">
            R&amp;D tax credit claims, {claimsSeries[0].year} to {headline.latestYear}
          </h2>
          <p className="mb-6 max-w-2xl text-slate-600 text-sm">
            Total number of claims for the R&amp;D tax credit, all schemes combined, by
            accounting period. The steep rise to 2021-22 and the sharp fall since reflect,
            respectively, the pre-clampdown growth in claim volume (including error and
            fraud that HMRC later targeted) and the effect of the compliance programme.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <AnnualSeriesChart
              data={claimsSeries.map((r) => ({ year: r.year, value: r.totalClaims }))}
              label="Total R&D tax credit claims by year"
              formatValue={(n) => `${fmtNumber(n)} claims`}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {headline.latestYear} is a HMRC-uplifted provisional estimate; the true figure is
            expected to revise upward in the next annual release. Source: HMRC R&amp;D Tax
            Credits Statistics (Table RD1), OGL v3.0.
          </p>
        </div>
      </section>

      {/* Sector breakdown */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">
            Claims by sector, {headline.latestYear}
          </h2>
          <p className="mb-6 max-w-2xl text-slate-600 text-sm">
            Number of claims by sector (based on the claimant company&apos;s primary SIC 2007
            code), highest first. Information &amp; Communication is the largest single sector.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <HorizontalBarChart
              data={sectorSorted.map((r) => ({
                label: r.sector,
                value: r.totalClaims,
                sharePct: r.claimsSharePct,
                highlight: r.sectorFull === "J. Information & Communication",
              }))}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Bars show number of claims; the figure in brackets is the share of total claims.
            Source: HMRC R&amp;D Tax Credits Statistics (Table RD6), OGL v3.0.
          </p>
        </div>
      </section>

      {/* Regional breakdown */}
      <section className="bg-slate-50 border-t border-b border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">
            Relief cost by region, {headline.latestYear}
          </h2>
          <p className="mb-6 max-w-2xl text-slate-600 text-sm">
            Total R&amp;D relief cost by region, based on the claimant company&apos;s
            registered address, which may not match where the R&amp;D activity actually
            takes place.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
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
      <section id="methodology" className="bg-white border-t border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">
            Methodology and honest limitations
          </h2>
          <div className="max-w-2xl space-y-6 text-sm text-slate-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Source</h3>
              <p>{meta.methodology}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Caveats</h3>
              <ul className="list-disc list-inside space-y-2">
                {meta.caveats.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Re-running the pull</h3>
              <p>
                The pull script is at{" "}
                <code className="bg-slate-100 px-1 rounded text-xs">
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
      <section className="bg-slate-50 border-t border-slate-200 py-10 sm:py-12">
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Sources and how to cite</h2>
          <div className="max-w-2xl space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Primary source</p>
              <p>
                <a
                  href={meta.sources.hmrc_rd_stats.url}
                  className={`text-primary-600 underline hover:opacity-75 ${focusRing}`}
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
              <p className="font-semibold text-slate-900">Cite this index as</p>
              <blockquote className="border-l-4 border-slate-300 pl-4 text-slate-500 italic text-xs">
                {meta.citeAs}
              </blockquote>
            </div>
            <p className="text-sm">
              <Link href={`${PAGE_PATH}/data`} data-cta="research_rd_tax_relief_index_csv" data-cta-placement="sources" className={`font-semibold text-primary-600 hover:opacity-75 ${focusRing}`}>
                Download the full dataset (CSV)
              </Link>
            </p>
            <p className="text-xs text-slate-500">Last updated: {meta.lastUpdated}.</p>
          </div>
        </div>
      </section>

      {/* Conversion */}
      {/* ground-dark: globals.css:153-155 rebinds --focus-ring to white for this
          band. primary-600 measures 2.03 on primary-950, under the 3:1 floor. */}
      <section className="ground-dark bg-primary-950 py-12 sm:py-16">
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
              className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-950 hover:bg-white/90 transition-colors ${focusRing}`}
            >
              R&amp;D tax claims service
            </Link>
            {/* ADOPTED: `btnOnDark` from src/components/ui/layout-utils.ts
                (restored by U4 from packages/web-shared/design/layout-utils.ts
                with the literal focus-ring utility swapped for
                var(--focus-ring)). This replaces a hand-rolled
                `border border-white/30`, which is the exact contrast defect
                569d3304 fixed on contractors-ir35: white/30 composited over
                this primary-950 #1e1b4b ground is #61605f-equivalent at 2.64:1,
                under the 3.0 floor for a button's only visible boundary.
                btnOnDark's border-white/40 measures 3.63:1 on the same ground.
                PASS. The label and the destination are unchanged. */}
            <Link
              href="/calculators/rd-relief-estimator"
              className={btnOnDark}
            >
              R&amp;D relief estimator
            </Link>
          </div>
          <div className="mt-10 max-w-xl bg-white p-6 sm:p-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Get an R&D eligibility review" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* ADOPTED: packages/web-shared/design/primitives/FaqSection.tsx with
          `alwaysRenderAnswers` (:17,31-35), which passes Radix `forceMount`
          through accordion.tsx:52-64 and adds `data-[state=closed]:hidden`, so
          every answer stays in the server HTML exactly as the <h3>/<p> block
          put it there. The FAQPage JSON-LD emitted at the top of this file is
          built from the SAME `faqs` binding (`buildFaqJsonLd(faqs)`), so the
          rendered count and the asserted count cannot diverge.
          `html` is NOT passed: every answer in this page's `faqs` array is a
          plain string with no markup, so the safe JSX text child is correct.
          `eyebrow=""` because the kit default is the word "FAQ", which this
          page does not publish, and this package writes no prose; an empty
          string is falsy at FaqSection.tsx:39. `title` is this section's own h2
          string, verbatim. */}
      <FaqSection
        eyebrow=""
        title="Frequently asked questions"
        faqs={faqs}
        alwaysRenderAnswers
        className="bg-white py-12 sm:py-16"
      />
    </div>
  );
}
