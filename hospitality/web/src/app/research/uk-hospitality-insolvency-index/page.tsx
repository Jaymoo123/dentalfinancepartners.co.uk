import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { siteConfig } from "@/config/site";
import { buildFaqJsonLd, buildArticleJsonLd } from "@/lib/schema";
import {
  AnnualInsolvencyChart,
  MonthlyInsolvencyChart,
  SurvivalCurveChart,
} from "@/components/research/HospitalityInsolvencyCharts";
import {
  fmtNumber,
  fmtPercent,
  fmtSurvivalPct,
  monthLabel,
  type HospitalityInsolvencyIndexSnapshot,
  type InsolvencyYear,
} from "@/lib/research/hospitality-insolvency-index";
import snapshot from "@/data/hospitality-insolvency-index.json";

const data = snapshot as unknown as HospitalityInsolvencyIndexSnapshot;
const { meta, headline, insolvencies, survival } = data;
const { decade } = headline;

const PAGE_PATH = "/research/uk-hospitality-insolvency-index";

const HEADLINE_SENTENCE = `UK hospitality company insolvencies rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}`;

const latestCohort = survival.cohorts.find((c) => c.cohort_year === survival.latest_full_cohort_year)
  ?? survival.cohorts[0];

export const metadata: Metadata = {
  title: "UK Hospitality Insolvency Index | Restaurant, pub and hotel insolvency data | Hospitality Tax",
  description: `${HEADLINE_SENTENCE}. A sourced index of hospitality company insolvencies and business survival rates, compiled from Insolvency Service and ONS open data. Updated ${monthLabel(meta.data_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Hospitality Insolvency Index | Hospitality Tax",
    description: `${HEADLINE_SENTENCE}. Hospitality insolvency and survival trends from Insolvency Service and ONS official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the UK Hospitality Insolvency Index measure?",
    answer:
      "It counts company insolvencies registered each month under SIC Section I (Accommodation and food service activities), drawn from Insolvency Service record-level data covering England, Wales and Scotland. Section I covers restaurants, cafes, takeaways, pubs, bars, hotels and other accommodation. The index tracks the main procedures: Creditors Voluntary Liquidation (CVL), compulsory liquidation, administration, Company Voluntary Arrangement (CVA), and administrative receivership. Counts are gross registered events on the date of registration.",
  },
  {
    question: "Why does hospitality have such a high insolvency rate?",
    answer:
      "Hospitality businesses run on some of the thinnest margins of any UK sector, combined with fixed costs (rent, business rates, staff rotas) that do not flex down quickly when trade drops. Food and drink cost inflation, the post-pandemic rise in the National Living Wage and employer NIC, and high energy costs for kitchens and refrigeration have all compressed margins further. Section I (accommodation and food services) has consistently ranked among the top few sectors for company insolvencies in Insolvency Service statistics.",
  },
  {
    question: "What is a Creditors Voluntary Liquidation (CVL)?",
    answer:
      "A CVL is the most common insolvency procedure in hospitality. The company's directors resolve to wind up the business voluntarily when they conclude it cannot pay its debts, and a licensed insolvency practitioner is appointed as liquidator to realise assets and distribute proceeds to creditors. CVLs consistently account for the large majority of hospitality insolvency events tracked here.",
  },
  {
    question: "How many hospitality businesses started in 2019 are still trading?",
    answer: latestCohort
      ? `Based on ONS Business Demography data, ${fmtSurvivalPct(latestCohort.survival_5yr_pct)} of hospitality (accommodation and food service) enterprises born in ${latestCohort.cohort_year} were still active five years later, against an all-industry average of ${fmtSurvivalPct(latestCohort.all_industry_5yr_pct)}. Survival tracks whether the enterprise is still registered as active, not whether it changed hands, was renamed, or restructured.`
      : "ONS Business Demography publishes annual survival rates by broad industry group, tracking each year's newly born enterprises for up to five years.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "Insolvency counts come from the Insolvency Service's record-level data file, published as part of the Company Insolvency Statistics release on gov.uk, updated monthly. Survival rates come from the Office for National Statistics' Business Demography release, published annually, which tracks cohorts of newly born enterprises by broad industry group for up to five years. Both are published under the Open Government Licence v3.0.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleJsonLd = buildArticleJsonLd({
  title: "UK Hospitality Insolvency Index",
  description: `${HEADLINE_SENTENCE}, tracked from Insolvency Service and ONS open data.`,
  url: PAGE_PATH,
  datePublished: "2026-07-23",
  dateModified: meta.generated_at,
});

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Hospitality Insolvency Index: hospitality company insolvencies and survival rates",
  description:
    "Monthly counts of registered UK hospitality company insolvencies (SIC Section I: accommodation and food service activities) by procedure type, paired with ONS 1-to-5-year business survival rates by birth cohort.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: meta.coverage,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Monthly hospitality company insolvencies -- total (SIC Section I)",
    "Monthly hospitality company insolvencies -- Creditors Voluntary Liquidation (CVL)",
    "Monthly hospitality company insolvencies -- Compulsory Liquidation",
    "Monthly hospitality company insolvencies -- Administration",
    "Monthly hospitality company insolvencies -- Company Voluntary Arrangement (CVA)",
    "Monthly hospitality company insolvencies -- Administrative Receivership",
    "1 to 5-year business survival rate by birth cohort (Accommodation and food services)",
  ],
};

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-5">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-white/80">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--border)] py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--ink-soft)]">{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export default function UKHospitalityInsolvencyIndexPage() {
  const lastMonth = headline.last_settled_month;

  const latestFullAnnual = insolvencies.annual.filter((r) => r.year < 2026).at(-1);

  const procedures: { key: keyof InsolvencyYear; label: string }[] = [
    { key: "cvl", label: "Creditors Voluntary Liquidation (CVL)" },
    { key: "compulsory", label: "Compulsory Liquidation" },
    { key: "administration", label: "Administration" },
    { key: "cva", label: "Company Voluntary Arrangement (CVA)" },
    { key: "receivership", label: "Administrative Receivership" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
      />

      <main>
        <section className="bg-[var(--brand-primary)] py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Research</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {HEADLINE_SENTENCE}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              A sourced, monthly read on hospitality company insolvencies across the UK, drawn from
              Insolvency Service public records, paired with ONS business survival data by birth
              cohort. Covering all SIC Section I hospitality businesses. Updated {monthLabel(meta.data_through)}.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat
                value={fmtNumber(headline.ttm_total)}
                label="hospitality company insolvencies in the trailing 12 months"
              />
              <Stat
                value={fmtNumber(headline.last_month_cvl)}
                label={`CVLs in ${monthLabel(lastMonth)}, the most common procedure`}
              />
              <Stat
                value={fmtPercent(decade.change_pct, false)}
                label={`more insolvencies in ${decade.to_year} than in ${decade.from_year}`}
              />
              <Stat
                value={fmtNumber(headline.peak_total)}
                label={`insolvencies in ${monthLabel(headline.peak_month)}, the highest month on record`}
              />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="mt-8 rounded-2xl border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/[0.04] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[var(--brand-primary)]">Key findings</h2>
            <ul className="mt-4 space-y-2 text-base leading-relaxed text-[var(--ink)]">
              <li>
                Hospitality insolvencies rose {fmtPercent(decade.change_pct, false)} from{" "}
                {fmtNumber(decade.from_total)} in {decade.from_year} to {fmtNumber(decade.to_total)}{" "}
                in {decade.to_year}.
              </li>
              <li>
                In the trailing 12 months to {monthLabel(meta.data_through)}, {fmtNumber(headline.ttm_total)}{" "}
                hospitality companies entered insolvency across England, Wales and Scotland.
              </li>
              <li>
                Creditors Voluntary Liquidation (CVL) is the dominant procedure in every year tracked,
                reflecting how often directors choose voluntary wind-up over a creditor-forced compulsory
                liquidation.
              </li>
              <li>
                The 2022 to 2023 surge followed the end of pandemic-era insolvency restrictions (the
                Corporate Insolvency and Governance Act 2020 temporarily prohibited winding-up petitions),
                compounded by post-pandemic cost inflation across food, energy and staff.
              </li>
              {latestCohort && (
                <li>
                  Survival tells a more nuanced story: of hospitality enterprises born in{" "}
                  {latestCohort.cohort_year}, {fmtSurvivalPct(latestCohort.survival_5yr_pct)} were still
                  active five years later, close to the {fmtSurvivalPct(latestCohort.all_industry_5yr_pct)}{" "}
                  all-industry average. High company insolvency volumes and roughly average business
                  survival are not contradictory: insolvency counts events at existing companies, while
                  survival tracks whether the enterprise itself is still registered, regardless of how
                  it changed along the way.
                </li>
              )}
            </ul>
            <p className="mt-4 text-xs text-[var(--muted)]">
              Source: Insolvency Service, Company Insolvency Statistics (record-level data) and ONS
              Business Demography, both under the Open Government Licence v3.0. England, Wales and
              Scotland (insolvency); UK (survival). Figures may be cited with attribution to Hospitality Tax.
            </p>
          </div>

          <Section id="annual" title="Hospitality insolvencies by year">
            <p>
              Each bar shows the total number of hospitality company insolvencies registered in that
              calendar year (complete years only). The rise from 2022 reflects the unwinding of the
              pandemic-era moratorium on winding-up petitions, layered on top of sharp cost inflation.
            </p>
            <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] p-4 sm:p-6">
              <AnnualInsolvencyChart annual={insolvencies.annual} />
            </div>
          </Section>

          <Section id="monthly" title="The monthly trend by procedure">
            <p>
              The stacked area chart shows monthly insolvency registrations from January 2016, broken
              down by the three main procedures: CVL, compulsory liquidation, and administration. CVL
              dominates throughout. The narrowing of the compulsory band during 2020 to 2021 is the
              direct effect of pandemic-era restrictions on winding-up petitions.
            </p>
            <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] p-4 sm:p-6">
              <MonthlyInsolvencyChart monthly={insolvencies.monthly} />
            </div>
          </Section>

          <Section id="procedures" title="Breakdown by procedure">
            <p>
              The table shows the number of hospitality company insolvencies by procedure type in{" "}
              {latestFullAnnual ? String(latestFullAnnual.year) : "the latest full year"}.
            </p>
            {latestFullAnnual && (
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-[var(--border)] text-left">
                      <th className="py-2 pr-4 font-bold text-[var(--ink)]">Procedure</th>
                      <th className="py-2 pr-4 text-right font-bold text-[var(--ink)]">
                        {latestFullAnnual.year} count
                      </th>
                      <th className="py-2 text-right font-bold text-[var(--ink)]">% of total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedures.map(({ key, label }) => {
                      const count = Number(latestFullAnnual[key as keyof typeof latestFullAnnual] ?? 0);
                      const pct = latestFullAnnual.total > 0
                        ? (count / latestFullAnnual.total * 100).toFixed(1)
                        : "n/a";
                      return (
                        <tr key={key} className="border-b border-[var(--border)]">
                          <td className="py-2 pr-4 text-[var(--ink-soft)]">{label}</td>
                          <td className="py-2 pr-4 text-right font-semibold text-[var(--ink)]">
                            {fmtNumber(count)}
                          </td>
                          <td className="py-2 text-right text-[var(--ink-soft)]">{pct}%</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="py-2 pr-4 font-bold text-[var(--brand-primary)]">Total</td>
                      <td className="py-2 pr-4 text-right font-bold text-[var(--brand-primary)]">
                        {fmtNumber(latestFullAnnual.total)}
                      </td>
                      <td className="py-2 text-right font-bold text-[var(--brand-primary)]">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </Section>

          <Section id="survival" title="How many hospitality businesses survive, and for how long?">
            <p>
              ONS Business Demography tracks each year&apos;s cohort of newly born enterprises and reports
              what share are still active 1, 2, 3, 4 and 5 years later, by broad industry group.
              &quot;Accommodation and food services&quot; is ONS&apos;s own grouping for SIC Section I, so this
              maps directly onto the hospitality sector with no proxy or estimation involved.
            </p>
            {latestCohort && (
              <div className="not-prose mt-6 rounded-2xl border border-[var(--border)] p-4 sm:p-6">
                <SurvivalCurveChart cohort={latestCohort} />
              </div>
            )}
            <div className="not-prose mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-[var(--border)] text-left">
                    <th className="py-2 pr-4 font-bold text-[var(--ink)]">Birth cohort</th>
                    <th className="py-2 pr-4 text-right font-bold text-[var(--ink)]">Births</th>
                    <th className="py-2 pr-4 text-right font-bold text-[var(--ink)]">1yr</th>
                    <th className="py-2 pr-4 text-right font-bold text-[var(--ink)]">2yr</th>
                    <th className="py-2 pr-4 text-right font-bold text-[var(--ink)]">3yr</th>
                    <th className="py-2 pr-4 text-right font-bold text-[var(--ink)]">4yr</th>
                    <th className="py-2 text-right font-bold text-[var(--ink)]">5yr</th>
                  </tr>
                </thead>
                <tbody>
                  {survival.cohorts.map((c) => (
                    <tr key={c.cohort_year} className="border-b border-[var(--border)]">
                      <td className="py-2 pr-4 font-medium text-[var(--ink)]">{c.cohort_year}</td>
                      <td className="py-2 pr-4 text-right tabular-nums text-[var(--ink-soft)]">
                        {fmtNumber(c.births)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums text-[var(--ink-soft)]">
                        {fmtSurvivalPct(c.survival_1yr_pct)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums text-[var(--ink-soft)]">
                        {fmtSurvivalPct(c.survival_2yr_pct)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums text-[var(--ink-soft)]">
                        {fmtSurvivalPct(c.survival_3yr_pct)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums text-[var(--ink-soft)]">
                        {fmtSurvivalPct(c.survival_4yr_pct)}
                      </td>
                      <td className="py-2 text-right tabular-nums font-medium text-[var(--ink)]">
                        {fmtSurvivalPct(c.survival_5yr_pct)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-[var(--muted)]">
                Blank cells mean that many years have not yet elapsed for that cohort (ONS has not yet
                published the figure). Cohort = enterprises first registered as active in that year.
              </p>
            </div>
          </Section>

          <Section id="methodology" title="Methodology and sources">
            <p>
              <strong>Insolvency data.</strong> Counts are drawn from the Insolvency Service record-level
              data file, published monthly as part of the Company Insolvency Statistics release on
              gov.uk. Each record represents a single insolvency event registered with Companies House
              or the Insolvency Service, tagged with the company&apos;s SIC code and procedure type. We
              filter to SIC 1-digit Section I (Accommodation and food service activities), covering
              Division 55 (accommodation) and Division 56 (food and beverage service activities).
            </p>
            <p>
              <strong>What is counted.</strong> Each figure is the number of insolvency events registered
              in that period, not the number of unique companies. A company that enters administration
              and subsequently converts to CVL appears twice: once for each procedure.
            </p>
            <p>
              <strong>Survival data.</strong> ONS Business Demography Table 4.2 tracks each year&apos;s
              newly born enterprises by broad industry group and reports the count and percentage still
              active 1 to 5 years later. &quot;Accommodation and food services&quot; is the ONS broad
              industry group that corresponds to SIC Section I.
            </p>
            <p>
              <strong>Caveats.</strong> Insolvency counts are not rates: an increase may partly reflect
              growth in the total number of active hospitality companies rather than a worsening of
              sector conditions. The pandemic years (2020 to 2021) are not comparable to other years
              because temporary legislation suppressed compulsory liquidations. Survival tracks whether
              the enterprise remains active on the register, not whether ownership, name or trading
              activity changed; a company insolvency and a business &quot;surviving&quot; are measuring
              different things and are not directly reconcilable figure-for-figure.
            </p>
            <p>
              <strong>Updated.</strong> Insolvency data through {monthLabel(meta.data_through)}. Survival
              data from the ONS Business Demography release covering cohorts 2019 to 2023. Generated{" "}
              {monthLabel(meta.generated_at.slice(0, 7))}.
            </p>
            <ul className="not-prose mt-2 space-y-1 text-sm">
              {meta.sources.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.release_page}
                    className="font-semibold text-[var(--brand-primary)] hover:underline"
                    rel="nofollow noopener noreferrer"
                  >
                    {s.name}
                  </a>{" "}
                  <span className="text-[var(--muted)]">({s.publisher})</span>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              <Link
                href={`${PAGE_PATH}/data`}
                className="font-semibold text-[var(--brand-primary)] hover:underline"
              >
                Download the insolvency data (CSV)
              </Link>
            </p>
            <p className="text-sm text-[var(--muted)]">
              Free to cite and republish with attribution to Hospitality Tax. This page is a data
              summary and does not constitute insolvency or tax advice on any individual situation.
            </p>
          </Section>

          <div className="mt-10 rounded-2xl border-2 border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/[0.04] p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-[var(--brand-primary)] sm:text-3xl">
              Running a restaurant, pub or hotel? Keep the cash position ahead of the risk.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              High insolvency rates in hospitality are driven by margin, cash flow and fixed-cost
              pressure, not just bad luck. Understanding your VAT position, staff cost structure, and
              tax planning is a practical buffer against the conditions that push comparable businesses
              under. Our team works exclusively with UK hospitality operators.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Get a free hospitality tax review" />
            </div>
          </div>

          <div className="mt-12 pb-16">
            <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((f, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-[var(--ink)]">{f.question}</h3>
                  <p className="mt-2 text-base leading-relaxed text-[var(--ink-soft)]">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
