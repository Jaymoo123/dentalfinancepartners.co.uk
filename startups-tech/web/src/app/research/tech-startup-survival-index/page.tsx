import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";
import { siteContainerLg, focusRing, btnOnDark } from "@/components/ui/layout-utils";
import { buildDatasetJsonLd, buildFaqJsonLd } from "@/lib/schema";
import {
  ComparisonBarChart,
  HorizontalBarChart,
} from "@/components/research/TechFundingReliefsCharts";
import {
  fmtNumber,
  fmtPercent0,
  fmtPercent1,
  type TechStartupSurvivalIndexSnapshot,
} from "@/lib/research/tech-startup-survival-index";
import { LeadForm } from "@/components/forms/LeadForm";
import data from "@/data/tech-startup-survival-index.json";

const snapshot = data as unknown as TechStartupSurvivalIndexSnapshot;
const { meta, cohortSeries, sectorTwoYear, headline } = snapshot;

/**
 * The report's own name, as the /research hub already publishes it
 * (src/app/research/page.tsx, the matching `reports[].title`). Reused verbatim
 * as the breadcrumb's current crumb so the trail names the page in the site's
 * own existing words rather than in new ones.
 */
const CRUMB = "UK Tech Startup Survival Curves";
const PAGE_PATH = "/research/tech-startup-survival-index";

const HORIZON_YEARS = ["1", "2", "3", "4", "5"] as const;

export const metadata: Metadata = {
  title: "UK Tech Startup Survival Curves",
  description: `${fmtPercent0(headline.techFiveYearSurvivalPct)} of UK tech companies born in ${headline.fullFiveYearCohort} were still active five years later, versus ${fmtPercent0(headline.allIndustryFiveYearSurvivalPct)} across all industries. Sourced from ONS Business Demography official statistics.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Tech Startup Survival Curves | Founder Tax Partners",
    description: `Only ${fmtPercent0(headline.techFiveYearSurvivalPct)} of UK tech startups born in ${headline.fullFiveYearCohort} survived five years. ONS official cohort survival data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Tech Startup Survival Curves | Founder Tax Partners",
    images: ["/api/og"],
  },
};

const faqs = [
  {
    question: "What percentage of UK tech startups survive five years?",
    answer:
      `Of UK companies in the Information and Communication industry group born in ${headline.fullFiveYearCohort}, ${fmtPercent0(headline.techFiveYearSurvivalPct)} were still active five years later, according to ONS Business Demography data. This compares to ${fmtPercent0(headline.allIndustryFiveYearSurvivalPct)} across all industries for the same birth cohort. 'Survival' means the enterprise remained on the statistical business register, whether trading, dormant, or scaled down; it is not a measure of profitability or founder success.`,
  },
  {
    question: "Why does ONS use 'Information and communication' rather than 'tech'?",
    answer:
      "ONS's Business Demography statistics classify enterprises by broad industry group derived from Standard Industrial Classification (SIC) codes, not by a bespoke 'tech' category. Information and Communication (SIC sections 58 to 63) is the closest official grouping: it covers software publishing and development, IT consultancy, data processing and hosting, telecoms, and broadcasting. It is broader than software/SaaS alone, so the true survival rate for a narrower software-only cohort may differ from the figures shown here.",
  },
  {
    question: "Is tech riskier than other industries for a new business?",
    answer:
      `The data shows tech survival tracking close to, and in this edition slightly below, the all-industry average at the five-year mark (${fmtPercent0(headline.techFiveYearSurvivalPct)} vs ${fmtPercent0(headline.allIndustryFiveYearSurvivalPct)}). This runs counter to the popular narrative that tech startups fail at dramatically higher rates than other sectors: at the enterprise-survival level (not funding or profitability), most UK tech companies are not meaningfully riskier than the average small business.`,
  },
  {
    question: "What does 'survival' actually measure here?",
    answer:
      "An enterprise is counted as having survived at year N if it remains active on the UK statistical business register N years after birth, regardless of whether it is trading profitably, dormant, or has shrunk substantially. It does not distinguish a genuine failure from a successful trade sale that removed the original legal entity, or from a founder who deliberately wound up a profitable company. It is a register-continuity measure, not a success or failure judgement.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All figures come from ONS Business Demography, the UK's official annual statistics on enterprise births, deaths and survival, published each November on gov.uk under the Open Government Licence v3.0. This index uses Table 4.2 from the reference tables, which tracks each annual birth cohort's survival at one to five years after birth. Only the oldest cohort in each edition has a complete five-year reading; more recent cohorts have progressively shorter observed windows.",
  },
  {
    question: "How does this differ from the UK Startup Formation and Survival Index?",
    answer:
      "This page uses ONS cohort-based Business Demography survival curves (what share of a birth cohort is still trading after 1 to 5 years). The site's UK Startup Formation and Survival Index instead reports a live Companies House active-versus-dissolved snapshot across a broader 8-SIC cluster.",
  },
];

const datasetJsonLd = buildDatasetJsonLd({
  name: "UK Tech Startup Survival Curves",
  description: meta.description,
  url: `${siteConfig.url}${PAGE_PATH}`,
  dateModified: meta.lastUpdated,
  sources: [
    {
      name: meta.sources.ons_business_demography.name,
      url: meta.sources.ons_business_demography.url,
      licence: meta.sources.ons_business_demography.licence,
      publisher: meta.sources.ons_business_demography.publisher,
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

export default function TechStartupSurvivalIndexPage() {
  const fullCohort = cohortSeries.find((c) => c.cohortYear === headline.fullFiveYearCohort)!;
  const oneYearTrend = cohortSeries.map((c) => ({
    cohort: c.cohortYear,
    tech: c.techSurvival["1"]?.pct ?? null,
    all: c.allIndustrySurvival["1"]?.pct ?? null,
  }));

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
            UK Tech Startup Survival Curves
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Only {fmtPercent0(headline.techFiveYearSurvivalPct)} of UK tech companies born in{" "}
            {headline.fullFiveYearCohort} were still active five years later, tracked from{" "}
            <a
              href={meta.sources.ons_business_demography.url}
              className={`underline hover:text-white ${focusRing}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ONS Business Demography
            </a>{" "}
            official cohort data. Data pulled {meta.pullDate}.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Stat
              value={fmtPercent0(headline.techFiveYearSurvivalPct)}
              label={`5-year survival, tech companies born in ${headline.fullFiveYearCohort}`}
            />
            <Stat
              value={fmtPercent0(headline.allIndustryFiveYearSurvivalPct)}
              label="5-year survival, all industries, same cohort"
            />
            <Stat
              value={fmtPercent0(headline.techOneYearSurvivalPctLatest)}
              label={`1-year survival, tech companies born in ${headline.latestCohortYear} (most recent cohort)`}
            />
          </div>

          <p className="mt-6 text-xs text-white/70 max-w-2xl">
            Source: {meta.sources.ons_business_demography.name} ({meta.sources.ons_business_demography.publisher}).
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
                Of {fmtNumber(fullCohort.techBirths)} tech companies (Information and
                Communication) born in {headline.fullFiveYearCohort},{" "}
                {fmtPercent1(fullCohort.techSurvival["5"]?.pct ?? null)} were still active five
                years later, against {fmtPercent1(fullCohort.allIndustrySurvival["5"]?.pct ?? null)}{" "}
                across all industries in the same cohort.
              </li>
              <li>
                Tech survival tracks close to the all-industry average at every horizon from 1 to
                5 years, running against the popular narrative that tech startups fail at
                dramatically higher rates than other small businesses.
              </li>
              <li>
                The steepest drop for tech companies happens between year 2 and year 3: roughly a
                fifth of the survivors at 2 years are gone by year 3, before the rate of further
                loss slows in years 4 and 5.
              </li>
              <li>
                One-year survival for the most recent {headline.latestCohortYear} birth cohort is{" "}
                {fmtPercent1(headline.techOneYearSurvivalPctLatest)}, in line with prior cohorts.
              </li>
            </ul>
          </div>
          <p className="mt-4 max-w-2xl text-xs text-slate-500">
            Source: {meta.sources.ons_business_demography.name}, under the Open Government
            Licence v3.0. Figures may be cited with attribution to Founder Tax Partners.
          </p>
        </div>
      </section>

      {/* Survival curve */}
      <section className="bg-slate-50 border-t border-b border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">
            Survival curve: {headline.fullFiveYearCohort} birth cohort
          </h2>
          <p className="mb-6 max-w-2xl text-slate-600 text-sm">
            Percentage of the {headline.fullFiveYearCohort} birth cohort still active at each
            anniversary, tech (Information and Communication) versus all industries.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <ComparisonBarChart
              categories={HORIZON_YEARS.map((y) => `Year ${y}`)}
              seriesA={HORIZON_YEARS.map((y) => fullCohort.techSurvival[y]?.pct ?? null)}
              seriesB={HORIZON_YEARS.map((y) => fullCohort.allIndustrySurvival[y]?.pct ?? null)}
              labelA="Tech (Information and Communication)"
              labelB="All industries"
              formatValue={(n) => `${n.toFixed(1)}%`}
            />
          </div>
        </div>
      </section>

      {/* One-year trend across cohorts */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">
            One-year survival across birth cohorts, {cohortSeries[0].cohortYear} to{" "}
            {headline.latestCohortYear}
          </h2>
          <p className="mb-6 max-w-2xl text-slate-600 text-sm">
            One-year survival is stable across cohorts, including through the pandemic-era{" "}
            {cohortSeries[1]?.cohortYear ?? "2020"} birth cohort, which some might expect to show
            a Covid-era dip.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <ComparisonBarChart
              categories={oneYearTrend.map((r) => r.cohort)}
              seriesA={oneYearTrend.map((r) => r.tech)}
              seriesB={oneYearTrend.map((r) => r.all)}
              labelA="Tech (Information and Communication)"
              labelB="All industries"
              formatValue={(n) => `${n.toFixed(1)}%`}
            />
          </div>
        </div>
      </section>

      {/* Sector comparison */}
      <section className="bg-slate-50 border-t border-b border-slate-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-4">
            Two-year survival by industry, {sectorTwoYear.cohortYear} birth cohort
          </h2>
          <p className="mb-6 max-w-2xl text-slate-600 text-sm">
            How tech compares to other broad industry groups at the two-year survival mark,
            highest first.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
            <HorizontalBarChart
              data={sectorTwoYear.rows.map((r) => ({
                label: r.industry,
                value: r.twoYearSurvivalPct,
                sharePct: null,
                highlight: r.industry === "Information and communication",
              }))}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Bars show two-year survival percentage. Source: ONS Business Demography (Table 4.2),
            OGL v3.0.
          </p>
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
                  startups-tech/pipeline/pull_tech_survival_index.py
                </code>
                . It downloads ONS&apos;s current Business Demography reference tables and
                regenerates the JSON file that powers this page.
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
                  href={meta.sources.ons_business_demography.url}
                  className={`text-primary-600 underline hover:opacity-75 ${focusRing}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {meta.sources.ons_business_demography.name}
                </a>
                . Publisher: {meta.sources.ons_business_demography.publisher}. Licence: Open
                Government Licence v3.0. Data pulled {meta.pullDate}.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Cite this index as</p>
              <blockquote className="border-l-4 border-slate-300 pl-4 text-slate-500 italic text-xs">
                {meta.citeAs}
              </blockquote>
            </div>
            <p className="text-sm">
              <Link href={`${PAGE_PATH}/data`} data-cta="research_tech_startup_survival_index_csv" data-cta-placement="sources" className={`font-semibold text-primary-600 hover:opacity-75 ${focusRing}`}>
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
            Building a company that lasts?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Runway management, board-ready reporting and getting your structure right from day
            one all improve your odds of being in the surviving majority. Our fractional CFO and
            core compliance services support founders through the years where most attrition
            happens.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services/fractional-cfo"
              className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-950 hover:bg-white/90 transition-colors ${focusRing}`}
            >
              Fractional CFO
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
              href="/for/pre-seed-founders"
              className={btnOnDark}
            >
              Pre-seed founder guide
            </Link>
          </div>
          <div className="mt-10 max-w-xl bg-white p-6 sm:p-8">
            <LeadForm redirectOnSuccess={false} submitLabel="Talk to us" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx,
          measured 2026-09-29. The `alwaysRenderAnswers` prop the kit gained this
          wave removes the server-HTML objection, and the sibling research pages
          with plain-string answers DO adopt it. It cannot be adopted here: the
          LAST entry in this page's `faqs` array is rendered through a JSX branch
          below that carries a real internal <Link> inside the answer, and
          FaqSection's `FaqEntry.answer` is a string (schema/faq-page.ts), with
          `html` the only alternative and no <Link> component available inside a
          dangerouslySetInnerHTML string. Adopting it would render the plain
          `f.answer` string instead and DELETE that internal link, taking this
          route below its link floor. The JSON-LD already asserts the string
          form, so nothing is lost by leaving the richer rendering in place. */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl mb-8">
            Frequently asked questions
          </h2>
          <div className="max-w-2xl space-y-6">
            {faqs.map((f, i) => (
              <div key={f.question}>
                <h3 className="text-lg font-bold text-slate-900">{f.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-700">
                  {i === faqs.length - 1 ? (
                    <>
                      This page uses ONS cohort-based Business Demography survival curves (what
                      share of a birth cohort is still trading after 1 to 5 years). The
                      site&apos;s{" "}
                      <Link
                        href="/research/startup-formation-survival-index"
                        className={`text-primary-600 underline hover:opacity-75 ${focusRing}`}
                      >
                        UK Startup Formation and Survival Index
                      </Link>{" "}
                      instead reports a live Companies House active-versus-dissolved snapshot
                      across a broader 8-SIC cluster.
                    </>
                  ) : (
                    f.answer
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
