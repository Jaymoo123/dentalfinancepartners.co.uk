import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { buildDatasetJsonLd } from "@/lib/schema";
import { buildFaqPage } from "@accounting-network/web-shared/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { SurvivalCurveChart, OneYearTrendChart } from "@/components/research/SurvivalIndexCharts";
import {
  fmtNumber,
  fmtPct,
  fmtPointsDiff,
  type SurvivalIndexSnapshot,
} from "@/lib/research/survival-index";
import snapshot from "@/data/online-seller-survival-index.json";

const data = snapshot as unknown as SurvivalIndexSnapshot;
const { meta, headline, cohorts } = data;

const PAGE_PATH = "/research/online-seller-survival-index";

/**
 * Contrast wrapper for the adopted kit Breadcrumb, the same string phases 3 and
 * 4 use on the brand hero. On the #1a3a5c research ground it is parity, not a
 * fix: packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark
 * trail slate-300 (7.84:1 here) with slate-400 chevrons (4.54:1), both already
 * past the 4.5 text and 3.0 graphic floors. Kept so every hero trail on the
 * site reads the same white: 11.64 links, 8.09 chevrons.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

const latestCohort =
  cohorts.find((c) => c.birth_year === headline.latest_5yr_cohort_year) ?? cohorts[0];

const HEADLINE_SENTENCE = `${fmtPct(headline.latest_5yr_retail_pct)} of UK retail enterprises born in ${headline.latest_5yr_cohort_year} were still trading five years later`;

export const metadata: Metadata = {
  title: "Online Seller Survival Index | UK Retail",
  description: `${HEADLINE_SENTENCE}, against a ${fmtPct(headline.latest_5yr_all_industries_pct)} all-industries average. Sourced from ONS Business Demography.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
};

const faqs = [
  {
    question: "What does the Online Seller Survival Index measure?",
    answer:
      "It tracks cohorts of newly-born UK enterprises in the Retail broad industry group (businesses registered for VAT or PAYE in a given year) and measures what percentage are still active 1, 2, 3, 4 and 5 years later. The data comes from the Office for National Statistics (ONS) Business Demography release. Each birth-year cohort is tracked independently, so the most recent cohorts only have 1 or 2 years of survival data published so far.",
  },
  {
    question: "Why 'Retail' and not online retail specifically?",
    answer:
      "ONS Business Demography publishes enterprise survival by broad industry group, not by 5-digit SIC code. Retail is the finest official survival cut available, and it mixes physical shops, market stalls, mail-order and internet retailers together. There is no official UK survival series isolating SIC 47910 (online retail) alone. We flag this clearly rather than implying more precision than the source data supports. Our companion asset, the UK Online Seller Business Index, does isolate SIC 47910 for company incorporation and dissolution counts, which is a different (and more precise) measurement of a different thing: registered companies, not enterprise survival.",
  },
  {
    question: "Does retail survive worse than the UK average?",
    answer: `Yes, on this measure. Of the ${fmtNumber(latestCohort?.retail.births ?? null)} retail enterprises born in ${headline.latest_5yr_cohort_year}, ${fmtPct(headline.latest_5yr_retail_pct)} were still active five years later, against a ${fmtPct(headline.latest_5yr_all_industries_pct)} average across all UK industries: a gap of ${fmtPointsDiff(headline.latest_5yr_retail_pct, headline.latest_5yr_all_industries_pct)}. The gap is small in year 1 and widens by year 5, consistent with a sector that has low barriers to entry (easy to start selling) but faces intense price competition, thin margins and high closure rates once initial trading momentum fades.`,
  },
  {
    question: "How does this relate to the Online Seller Business Index?",
    answer:
      "The two assets measure different things from different sources and should not be combined into one figure. This survival index uses ONS enterprise data (which includes sole traders and partnerships, not just companies) tracked by birth-year cohort. Our Online Seller Business Index uses Companies House data (limited companies and LLPs only, SIC 47910 specifically) and reports incorporations, dissolutions and a register-snapshot active rate. Read together, they give a fuller picture: the Companies House data shows accelerating incorporated-seller churn since 2022, and this ONS data shows that retail as a whole has a below-average long-run survival rate even before that churn wave.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "The Business Demography release from the Office for National Statistics (ONS), Table 4.2, 'Survival of newly born enterprises, broad industry group.' It is published under the Open Government Licence v3.0 and updated annually, typically in November. Figures are control-rounded to the base 5 by ONS.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Online Seller Survival Index",
  description: `${HEADLINE_SENTENCE}, tracked from ONS Business Demography open data.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-23",
  dateModified: meta.generated_at,
  author: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
};

export default function OnlineSellerSurvivalIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildDatasetJsonLd({
            name: "Online Seller Survival Index: UK retail enterprise survival by birth-year cohort",
            description:
              "1-to-5-year survival rates for UK retail-sector enterprises by birth-year cohort, compared against the all-industries UK average, compiled from ONS Business Demography Table 4.2 data.",
            url: PAGE_PATH,
            dateModified: meta.generated_at,
            // Every figure on this page comes from ONS Business Demography
            // Table 4.2 (see meta.sources in the committed snapshot). The
            // builder's default source list is the Index page's Companies
            // House SIC 47910 plus the ONS Retail Sales Index, neither of
            // which contributes anything here, so this page was publishing a
            // provenance its own methodology never claims.
            sourceOrganization: [
              {
                "@type": "Organization",
                name: "Office for National Statistics",
                url: "https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/datasets/businessdemographyreferencetable/current",
                description:
                  "ONS Business Demography Table 4.2, survival of newly born enterprises by broad industry group (Retail), under Open Government Licence v3.0",
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPage(faqs)) }}
      />

      {/* Hero.

          ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, the
          same trail the phase-3 hub families and the phase-4 calculator
          template carry. It replaces a hand-rolled uppercase "Research" back
          link: the word and the /research destination both survive as the
          trail's middle crumb, and the only href the trail adds is "/", which
          packages/web-shared/design/chrome/SiteHeader.tsx:128 and
          SiteFooter.tsx:145 already emit on every page. The route's unique
          internal link set is therefore unchanged.

          ADOPTION DECLINED here only: `Eyebrow onDark` from
          packages/web-shared/design/primitives/page-blocks.tsx. The breadcrumb
          already carries the section label. Eyebrow IS adopted on the light FAQ
          section below.

          `.ground-dark` stays. This band holds three focusable elements sitting
          BARE on the dark fill (the trail's Home link and the two source links
          below), with no white card anywhere inside it, so the white ring is
          the correct one. This is not the light-island shape documented at
          src/app/globals.css:226-229. */}
      <section className="ground-dark border-b border-neutral-200 bg-[#1a3a5c] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <div className={crumbOnBrand}>
            <Breadcrumb
              onDark
              siteUrl={siteConfig.url}
              items={[
                { label: "Home", href: "/" },
                { label: "Research", href: "/research" },
                { label: "Online Seller Survival Index" },
              ]}
            />
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Online Seller Survival Index.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {HEADLINE_SENTENCE}, against a {fmtPct(headline.latest_5yr_all_industries_pct)}{" "}
            all-industries average. Sourced from the{" "}
            <a
              href={meta.release_page}
              className={`underline hover:text-white transition-colors ${focusRing}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ONS Business Demography
            </a>{" "}
            release, and read alongside our{" "}
            <Link href="/research/online-seller-index" className={`underline hover:text-white transition-colors ${focusRing}`}>
              Online Seller Business Index
            </Link>
            .
          </p>
          {/* white/50 composites to #8c9cae on this #1a3a5c ground and measures
              4.15, under the 4.5 floor for 14px text that carries the release
              date and the licence link. white/60 is #a3b0be, 5.27. */}
          <p className="mt-3 text-sm text-white/60">
            Table 4.2 last published {meta.release_date}. Published under{" "}
            <a
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              className={`underline hover:text-white/70 ${focusRing}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Government Licence v3.0
            </a>
            .
          </p>
        </div>
      </section>

      {/* Headline stat cards.

          ADOPTION DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx,
          and this is the page it was written for. It takes ONE number and a
          plain string, renders no markup in the label and emits no link, so
          every one of these tiles would lose the sourcing that makes it a
          research asset: the label names the cohort year the figure belongs to,
          and the body under it names the measure. It is banned on this site for
          exactly that reason. Also declined, estate-wide or by owner gate:
          packages/web-shared/design/marketing/LeadCTAPanel.tsx,
          .../StickyCTA.tsx, .../TestimonialsSection.tsx and
          .../WhatToExpectCard.tsx.

          ADOPTION DECLINED on the tile labels: `Eyebrow` from
          packages/web-shared/design/primitives/page-blocks.tsx. It is a SECTION
          label (mb-3, a leading rule glyph) and these strings are the figures'
          captions, not section headings; swapping them would put a divider rule
          between a number and the thing it counts. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            How long UK retail enterprises last
          </h2>
          <p className="mb-8 max-w-2xl text-sm text-neutral-500">
            Source: ONS Business Demography, Table 4.2. Retail broad industry group, all UK
            enterprises (sole traders, partnerships and companies registered for VAT or PAYE).
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-[#1a3a5c] text-white p-6">
              <div className="text-5xl font-bold font-mono">{fmtPct(headline.latest_5yr_retail_pct)}</div>
              <div className="mt-2 text-sm font-semibold text-white/70 uppercase tracking-wider">
                5-year survival, {headline.latest_5yr_cohort_year} cohort
              </div>
              <p className="mt-3 text-sm text-white/60">
                Of retail enterprises born in {headline.latest_5yr_cohort_year}, still active
                five years later.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-5xl font-bold font-mono text-[#1a3a5c]">
                {fmtPointsDiff(headline.latest_5yr_retail_pct, headline.latest_5yr_all_industries_pct)}
              </div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                vs all-industries average
              </div>
              <p className="mt-3 text-sm text-neutral-600">
                All-industries 5-year survival for the same cohort was{" "}
                {fmtPct(headline.latest_5yr_all_industries_pct)}. Retail trails the wider economy.
              </p>
            </div>
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="text-5xl font-bold font-mono text-[#1a3a5c]">
                {fmtPct(headline.latest_1yr_retail_pct)}
              </div>
              <div className="mt-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                1-year survival, {headline.latest_1yr_cohort_year} cohort
              </div>
              <p className="mt-3 text-sm text-neutral-600">
                The most recent cohort published. First-year survival tracks close to the{" "}
                {fmtPct(headline.latest_1yr_all_industries_pct)} all-industries figure; the gap
                opens up from year 2 onwards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Survival curve */}
      <section className={`bg-neutral-50 border-t border-b border-neutral-200 ${sectionY}`}>
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            The survival curve: {headline.latest_5yr_cohort_year} birth cohort
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Of every 100 retail enterprises that started trading in {headline.latest_5yr_cohort_year},
            the chart tracks how many were still active at each anniversary, against the same
            measure for all UK industries combined.
          </p>
          {latestCohort && (
            <div className="bg-white border border-neutral-200 p-4 sm:p-6 max-w-2xl">
              <SurvivalCurveChart cohort={latestCohort} />
            </div>
          )}
        </div>
      </section>

      {/* Cohort table */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            Survival by birth-year cohort
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Each row is a different birth-year cohort, tracked independently. More recent cohorts
            have fewer years of data available; a dot means that survival year has not yet elapsed
            and ONS has not yet published it.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="text-left px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">Birth year</th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">Births</th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">1yr</th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">2yr</th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">3yr</th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">4yr</th>
                  <th className="text-right px-3 py-2 font-semibold text-neutral-700 border border-neutral-200">5yr</th>
                </tr>
              </thead>
              <tbody>
                {cohorts.map((c, i) => (
                  <tr key={c.birth_year} className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <td className="px-3 py-2 font-mono text-neutral-800 border border-neutral-200">{c.birth_year}</td>
                    <td className="px-3 py-2 text-right font-mono text-neutral-800 border border-neutral-200">
                      {fmtNumber(c.retail.births)}
                    </td>
                    {(["y1", "y2", "y3", "y4", "y5"] as const).map((k) => (
                      <td key={k} className="px-3 py-2 text-right font-mono text-neutral-800 border border-neutral-200">
                        {c.retail[`${k}_pct`] !== null ? fmtPct(c.retail[`${k}_pct`]) : "·"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* neutral-400 is 2.52 on white, under the 4.5 text floor. neutral-500 is
              4.74. The sourcing footnotes are the last place a figure's
              provenance should go grey. */}
          <p className="mt-3 text-xs text-neutral-500 max-w-2xl">
            Row figures are for the Retail broad industry group only. All-industries comparison
            figures are in the CSV download below.
          </p>
        </div>
      </section>

      {/* 1-year trend */}
      <section className={`bg-neutral-50 border-t border-b border-neutral-200 ${sectionY}`}>
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-2">
            1-year survival rate over time
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            The one figure available for every cohort in the series is 1-year survival. Retail has
            stayed in a relatively narrow band across the published cohorts.
          </p>
          <div className="bg-white border border-neutral-200 p-4 sm:p-6 max-w-2xl">
            <OneYearTrendChart cohorts={cohorts} />
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <h2 className="text-lg font-bold text-neutral-900 mb-4">Methodology</h2>
          <div className="max-w-2xl space-y-4 text-sm text-neutral-600">
            <div>
              <strong className="text-neutral-900">Data source.</strong> ONS Business Demography
              Table 4.2, &quot;Survival of newly born enterprises, broad industry group.&quot; ONS
              tracks &quot;enterprises&quot;, businesses registered for VAT or PAYE, from the year
              they are first active (&quot;born&quot;), and follows each birth-year cohort for up
              to five years.
            </div>
            <div>
              <strong className="text-neutral-900">Broad group, not SIC 47910.</strong> Retail is
              the finest official survival cut ONS publishes; it mixes physical shops, market
              stalls, mail order and internet retailers. There is no official UK survival series
              isolating online retail (SIC 47910) alone. Treat the figures on this page as a
              retail-sector baseline, not an online-seller-specific measurement.
            </div>
            <div>
              <strong className="text-neutral-900">Enterprise, not company.</strong> This is a
              different unit to our{" "}
              <Link href="/research/online-seller-index" className={`text-[#1a3a5c] underline hover:opacity-75 ${focusRing}`}>
                Online Seller Business Index
              </Link>
              , which tracks Companies House limited companies specifically (SIC 47910). The ONS
              enterprise measure is broader: sole traders and partnerships as well as limited
              companies. The two datasets are not directly comparable and should not be combined
              into a single figure.
            </div>
            <div>
              <strong className="text-neutral-900">Caveats.</strong> Figures are control-rounded to
              the base 5 by ONS. &quot;Survival&quot; means the enterprise is still active on the
              ONS Inter-Departmental Business Register; it says nothing about profitability,
              growth, or trading under the same name or ownership. More recent birth-year cohorts
              have fewer years of survival data published simply because less time has elapsed, not
              because of a data gap.
            </div>
            <div>
              <strong className="text-neutral-900">Updated.</strong> Table 4.2 was last published{" "}
              {meta.release_date}. Data generated {meta.generated_at}.
            </div>
          </div>
          <p className="mt-6 text-sm text-neutral-500 max-w-2xl">
            <strong>Data licence:</strong> ONS data is published under the{" "}
            <a
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              className={`underline ${focusRing}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Government Licence v3.0
            </a>
            .
          </p>
          <p className="mt-3 text-sm">
            <Link href={`${PAGE_PATH}/data`} className={`font-semibold text-[#1a3a5c] hover:underline ${focusRing}`}>
              Download the survival data (CSV)
            </Link>
          </p>
          {/* neutral-400 is 2.52 on white, under the 4.5 text floor. neutral-500 is
              4.74. The sourcing footnotes are the last place a figure's
              provenance should go grey. */}
          <p className="mt-3 text-xs text-neutral-500 max-w-2xl">
            Cite as: Online Seller Survival Index, compiled from ONS Business Demography Table 4.2
            (Open Government Licence v3.0). Published by Ecommerce Finance, data generated{" "}
            {meta.generated_at}.
          </p>
        </div>
      </section>

      {/* FAQ.

          ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
          It is a Radix accordion with no forceMount, so a closed answer is
          absent from the server HTML while the FAQPage JSON-LD emitted at the
          top of this page asserts every answer. Declined on the same grounds on
          the blog template (phase 2), all three hub families (phase 3) and the
          calculator template (phase 4). These answers are already flat,
          always-visible markup, which is the strongest version of the same
          guarantee. Revisit only if the kit gains forceMount, which is a
          manager carve-out.

          ADOPTED: `Eyebrow` from
          packages/web-shared/design/primitives/page-blocks.tsx, the same
          "Questions" label the phase-4 calculator template uses above the same
          heading. slate-600 on neutral-50 clears the text floor. */}
      <section className={`bg-neutral-50 border-t border-b border-neutral-200 ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl mb-6">
            Frequently asked questions
          </h2>
          <div className="max-w-2xl space-y-6">
            {faqs.map((f, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`ground-dark bg-neutral-900 ${sectionY}`}>
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Building a retail business that lasts?
          </h2>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            Retail survives at a below-average rate over five years. Cash-flow discipline, correct
            VAT registration timing and a clean sole-trader-vs-limited-company decision are the
            factors within your control.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LeadForm submitLabel="Speak to a specialist" />
          </div>
        </div>
      </section>
    </>
  );
}
