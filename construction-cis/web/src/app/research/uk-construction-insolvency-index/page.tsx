import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import {
  AnnualInsolvencyChart,
  MonthlyInsolvencyChart,
} from "@/components/research/InsolvencyIndexCharts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  type InsolvencyIndexSnapshot,
  type InsolvencyYear,
} from "@/lib/research/insolvency-index";
import snapshot from "@/data/construction-insolvency-index.json";

const data = snapshot as unknown as InsolvencyIndexSnapshot;
const { meta, headline, insolvencies } = data;
const { decade } = headline;

const PAGE_PATH = "/research/uk-construction-insolvency-index";

const HEADLINE_SENTENCE = `UK construction company insolvencies rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}`;

export const metadata: Metadata = {
  title: "UK Construction Insolvency Index | Construction company insolvency trends | Trade Tax Specialists",
  description: `${HEADLINE_SENTENCE}. A sourced index of construction company insolvencies by procedure type, compiled from Insolvency Service open data. Updated ${monthLabel(meta.data_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Construction Insolvency Index | Trade Tax Specialists",
    description: `${HEADLINE_SENTENCE}. Construction insolvency trends from Insolvency Service official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the UK Construction Insolvency Index measure?",
    answer:
      "It counts company insolvencies registered each month under SIC Section F (Construction), drawn from Insolvency Service record-level data covering England, Wales and Scotland. The index tracks five main procedures: Creditors Voluntary Liquidation (CVL), compulsory liquidation, administration, Company Voluntary Arrangement (CVA), and administrative receivership. Counts are gross registered events on the date of registration.",
  },
  {
    question: "Why is construction the highest-insolvency sector in the UK?",
    answer:
      "Construction companies face several structural pressures that make insolvency more common than in other sectors. Fixed-price contracts leave contractors exposed when material or labour costs rise unexpectedly. Retentions (money held back by clients) create cash-flow gaps that can last months or years. Payment chains are long, so an upstream contractor's difficulties quickly pass downstream to subcontractors. Thin margins and high working capital requirements mean that even a single large contract going wrong can be terminal. These are not recent phenomena: construction has consistently accounted for around 17% of all company insolvencies in England and Wales, despite being a smaller share of overall economic output.",
  },
  {
    question: "What is a Creditors Voluntary Liquidation (CVL)?",
    answer:
      "A CVL is the most common insolvency procedure for construction companies. The company's directors resolve to wind up the business voluntarily when they conclude it cannot pay its debts. A licensed insolvency practitioner is appointed as liquidator to realise assets and distribute proceeds to creditors. In construction, CVLs typically account for around 75 to 80% of all insolvency events, reflecting the frequency with which directors choose to wind up rather than entering court-led procedures.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All insolvency counts come from the Insolvency Service's record-level data file, published as part of the Company Insolvency Statistics statistical release on gov.uk. The Insolvency Service is the UK government agency that handles corporate and personal insolvency. Its data is published under the Open Government Licence v3.0 and covers England, Wales and Scotland. The figures are updated monthly.",
  },
  {
    question: "Does rising insolvency affect CIS subcontractors?",
    answer:
      "Yes, directly. When a main contractor enters insolvency, subcontractors registered under the Construction Industry Scheme (CIS) often find themselves with unpaid invoices and retained amounts that are unlikely to be recovered in full. If you work under CIS and your main contractor has financial difficulties, it is worth reviewing your contract terms, your own cash-flow position, and whether you have any retention-release rights. Our team works with CIS contractors on both tax and financial planning.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Construction Insolvency Index",
  description: `${HEADLINE_SENTENCE}, tracked from Insolvency Service open data.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-20",
  dateModified: meta.generated_at,
  author: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteConfig.url}${PAGE_PATH}`,
  },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Construction Insolvency Index: construction company insolvencies by procedure type",
  description:
    "Monthly counts of registered UK construction company insolvencies (SIC Section F: Divisions 41, 42 and 43) across five procedure types, compiled from Insolvency Service record-level data.",
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
    "Monthly construction company insolvencies -- total (SIC Section F)",
    "Monthly construction company insolvencies -- Creditors Voluntary Liquidation (CVL)",
    "Monthly construction company insolvencies -- Compulsory Liquidation",
    "Monthly construction company insolvencies -- Administration",
    "Monthly construction company insolvencies -- Administration converting to CVL",
    "Monthly construction company insolvencies -- Company Voluntary Arrangement (CVA)",
    "Monthly construction company insolvencies -- Administrative Receivership",
    "Monthly construction company insolvencies -- Moratorium",
  ],
};

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-neutral-300">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-neutral-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------

export default function UKConstructionInsolvencyIndexPage() {
  const lastMonth = headline.last_settled_month;

  // Latest full year procedure breakdown
  const latestFullAnnual = insolvencies.annual
    .filter((r) => r.year < 2026)
    .at(-1);

  const procedures: { key: keyof InsolvencyYear; label: string }[] = [
    { key: "cvl", label: "Creditors Voluntary Liquidation (CVL)" },
    { key: "compulsory", label: "Compulsory Liquidation" },
    { key: "administration", label: "Administration" },
    { key: "cva", label: "Company Voluntary Arrangement (CVA)" },
    { key: "receivership", label: "Administrative Receivership" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPageJsonLd(faqs)) }}
      />

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Construction Insolvency Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Construction Insolvency Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, monthly read on construction company insolvencies across the UK, drawn from
            Insolvency Service public records. Covering all SIC Section F construction businesses,
            broken down by insolvency procedure. Updated {monthLabel(meta.data_through)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtNumber(headline.ttm_total)}
              label="construction company insolvencies in the trailing 12 months"
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

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key findings */}
            <div className="rounded-2xl border border-orange-500/20 bg-orange-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-orange-800">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  Construction insolvencies rose {fmtPercent(decade.change_pct, false)} from{" "}
                  {fmtNumber(decade.from_total)} in {decade.from_year} to{" "}
                  {fmtNumber(decade.to_total)} in {decade.to_year}, the highest annual total since
                  records began in this series.
                </li>
                <li>
                  In the trailing 12 months to {monthLabel(meta.data_through)},{" "}
                  {fmtNumber(headline.ttm_total)} construction companies entered insolvency across
                  England, Wales and Scotland, making it consistently the highest-volume sector in
                  the Insolvency Service data.
                </li>
                <li>
                  Creditors Voluntary Liquidation (CVL) is overwhelmingly the dominant procedure,
                  accounting for roughly 75 to 80% of construction insolvencies in every year
                  tracked. Directors choose voluntary wind-up far more often than creditors force a
                  compulsory liquidation through the courts.
                </li>
                <li>
                  The 2022 to 2023 surge followed the end of pandemic-era insolvency restrictions
                  (the Corporate Insolvency and Governance Act 2020 temporarily prohibited winding-up
                  petitions). The 2024 to 2025 period shows a modest fall from those peaks, though
                  levels remain well above the 2016 to 2019 baseline.
                </li>
                <li>
                  In {monthLabel(lastMonth)}, {fmtNumber(headline.last_month_total)} construction
                  companies entered insolvency, of which {fmtNumber(headline.last_month_cvl)} were
                  CVLs, {fmtNumber(headline.last_month_compulsory)} compulsory liquidations, and{" "}
                  {fmtNumber(headline.last_month_administration)} administrations.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Insolvency Service, Company Insolvency Statistics (record-level data), under
                the Open Government Licence v3.0. England, Wales and Scotland. Figures may be cited
                with attribution to Trade Tax Specialists.
              </p>
            </div>

            <Section id="annual" title="Construction insolvencies by year">
              <p>
                Each bar shows the total number of construction company insolvencies registered in
                that calendar year (complete years only). The sharp rise from 2022 reflects the
                unwinding of the pandemic-era moratorium on winding-up petitions. The 2020 and 2021
                dip is largely attributable to those temporary restrictions, not underlying
                improvement in sector health.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <AnnualInsolvencyChart annual={insolvencies.annual} />
              </div>
            </Section>

            <Section id="monthly" title="The monthly trend by procedure">
              <p>
                The stacked area chart shows monthly insolvency registrations from January 2016,
                broken down by the three main procedures: CVL (orange), compulsory liquidation
                (amber), and administration (neutral). CVL dominates throughout, spiking sharply in
                2023. The narrowing of the compulsory band during 2020 to 2021 is the direct effect
                of the pandemic restrictions.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <MonthlyInsolvencyChart monthly={insolvencies.monthly} />
              </div>
            </Section>

            <Section id="procedures" title="Breakdown by procedure">
              <p>
                The table shows the number of construction company insolvencies by procedure type in{" "}
                {latestFullAnnual ? String(latestFullAnnual.year) : "the latest full year"}.
                CVL accounts for the large majority; compulsory liquidations are the second largest
                category, triggered by creditor petitions to the court.
              </p>
              {latestFullAnnual && (
                <div className="not-prose mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-neutral-300 text-left">
                        <th className="py-2 pr-4 font-bold text-neutral-900">Procedure</th>
                        <th className="py-2 pr-4 font-bold text-neutral-900 text-right">
                          {latestFullAnnual.year} count
                        </th>
                        <th className="py-2 font-bold text-neutral-900 text-right">% of total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {procedures.map(({ key, label }) => {
                        const count = Number(latestFullAnnual[key as keyof typeof latestFullAnnual] ?? 0);
                        const pct = latestFullAnnual.total > 0
                          ? (count / latestFullAnnual.total * 100).toFixed(1)
                          : "n/a";
                        return (
                          <tr key={key} className="border-b border-neutral-200">
                            <td className="py-2 pr-4 text-neutral-700">{label}</td>
                            <td className="py-2 pr-4 text-right font-semibold text-neutral-900">
                              {fmtNumber(count)}
                            </td>
                            <td className="py-2 text-right text-neutral-700">{pct}%</td>
                          </tr>
                        );
                      })}
                      <tr className="border-b border-neutral-300">
                        <td className="py-2 pr-4 font-bold text-orange-700">Total</td>
                        <td className="py-2 pr-4 text-right font-bold text-orange-700">
                          {fmtNumber(latestFullAnnual.total)}
                        </td>
                        <td className="py-2 text-right font-bold text-orange-700">100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> Counts are drawn from the Insolvency Service
                record-level data file, published monthly as part of the Company Insolvency
                Statistics release on gov.uk. Each record represents a single insolvency event
                registered with Companies House or the Insolvency Service, tagged with the
                company&apos;s SIC code and procedure type. We filter to SIC 1-digit Section F
                (Construction), which encompasses Division 41 (construction of buildings), Division
                42 (civil engineering), and Division 43 (specialised construction activities).
              </p>
              <p>
                <strong>What is counted.</strong> Each figure is the number of insolvency events
                registered in that period, not the number of unique companies. A company that enters
                administration and subsequently converts to CVL appears twice: once for each
                procedure. This is consistent with how the Insolvency Service reports its own
                headline figures.
              </p>
              <p>
                <strong>Caveats.</strong> Counts are not rates: an increase in insolvency numbers
                may partly reflect growth in the total number of active construction companies rather
                than a worsening of sector conditions. The pandemic years (2020 to 2021) are not
                comparable to other years because temporary legislation suppressed compulsory
                liquidations. CVA and receivership counts are low (typically under 1% each) and
                should be read as indicative only.
              </p>
              <p>
                <strong>Updated.</strong> Data through {monthLabel(meta.data_through)} (latest
                Insolvency Service release). Generated {monthLabel(meta.generated_at.slice(0, 7))}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.release_page}
                      className="font-semibold text-orange-700 hover:text-orange-800"
                      rel="nofollow"
                    >
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link
                  href={`${PAGE_PATH}/data`}
                  className="font-semibold text-orange-700 hover:text-orange-800"
                >
                  Download the insolvency data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Trade Tax Specialists. This page is a
                data summary and does not constitute insolvency or tax advice on any individual
                situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Working in construction? Protect your CIS position.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                High insolvency rates in construction affect every part of the payment chain,
                including subcontractors operating under CIS. Understanding your gross payment
                status, your refund entitlements, and your tax position is a practical buffer
                against client-side financial difficulties. Our calculators help you model your CIS
                refund and GPS eligibility.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/calculators/cis-refund-estimator"
                  className="text-orange-700 hover:text-orange-800"
                >
                  CIS refund estimator &rarr;
                </Link>
                <Link
                  href="/calculators/cis-gps-eligibility-checker"
                  className="text-orange-700 hover:text-orange-800"
                >
                  GPS eligibility checker &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get a free CIS review" />
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-6">
                {faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                    <p className="mt-2 text-base leading-relaxed text-neutral-700">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
