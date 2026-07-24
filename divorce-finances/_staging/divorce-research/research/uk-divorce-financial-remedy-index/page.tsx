import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

// ponytail: import surface copied from construction-cis reference; align paths/components
// (LeadForm, Breadcrumb, siteContainerLg, siteConfig, buildFaqPageJsonLd) to the divorce-finances scaffold on integration.
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import snapshot from "@/data/uk-divorce-financial-remedy-index.json";

// {{BRAND}} = site brand name token; replace via siteConfig.name at integration.

type TimelinessCell = number | null;
interface DivorceAnnualRow {
  year: number;
  applications: number;
  conditional_orders: number;
  final_orders: number;
  mean_weeks_to_conditional_order: TimelinessCell;
  median_weeks_to_conditional_order: TimelinessCell;
  mean_weeks_to_final_order: TimelinessCell;
  median_weeks_to_final_order: TimelinessCell;
}
interface FrAnnualRow {
  year: number;
  applications_total: number;
  applications_contested: number | null;
  applications_uncontested: number | null;
  disposals_total: number;
  disposals_contested: number | null;
  disposals_initially_contested: number | null;
  disposals_uncontested: number | null;
  applications_uncontested_share_pct: number | null;
}
interface Snapshot {
  meta: {
    generated_at: string;
    edition: string;
    published: string;
    coverage: string;
    next_release: string;
    notes: string;
    sources: { name: string; publisher: string; url: string; licence: string }[];
  };
  headline: {
    year: number;
    divorce_applications: number;
    final_orders: number;
    conditional_orders: number;
    mean_weeks_to_final_order: number;
    median_weeks_to_final_order: number;
    mean_weeks_to_conditional_order: number;
    median_weeks_to_conditional_order: number;
    q4_2025_median_weeks_to_conditional_order: number;
    q4_2025_median_weeks_to_final_order: number;
    fr_applications: number;
    fr_applications_prev_year: number;
    fr_applications_yoy_pct: number;
    fr_disposals: number;
    fr_uncontested_share_pct: number;
  };
  divorce_annual: DivorceAnnualRow[];
  financial_remedy_annual: FrAnnualRow[];
}

const data = snapshot as unknown as Snapshot;
const { meta, headline } = data;

const PAGE_PATH = "/research/uk-divorce-financial-remedy-index";

const fmtNumber = (n: number) => n.toLocaleString("en-GB");
const fmtWeeks = (w: TimelinessCell) => (w === null ? "n/a" : String(Math.round(w)));

const HEADLINE_SENTENCE = `The average divorce in England and Wales now takes ${Math.round(
  headline.mean_weeks_to_final_order,
)} weeks from application to final order`;

export const metadata: Metadata = {
  title:
    "UK Divorce and Financial Remedy Index | Divorce timings and financial remedy trends | {{BRAND}}",
  description: `${HEADLINE_SENTENCE}. A sourced index of divorce applications, final orders, court timeliness and financial remedy cases, compiled from Ministry of Justice quarterly statistics. Updated with the ${meta.edition}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Divorce and Financial Remedy Index | {{BRAND}}",
    description: `${HEADLINE_SENTENCE}. Divorce volumes, court timings and financial remedy trends from official Ministry of Justice data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "How long does a divorce take in England and Wales?",
    answer:
      `On the latest Ministry of Justice figures, divorces reaching a final order in 2025 took a mean of ${Math.round(
        headline.mean_weeks_to_final_order,
      )} weeks (about 16 months) from application to final order, with a median of ${Math.round(
        headline.median_weeks_to_final_order,
      )} weeks. The conditional order stage alone took a mean of ${Math.round(
        headline.mean_weeks_to_conditional_order,
      )} weeks. The legal minimum under the no fault regime is 26 weeks (a 20 week reflection period plus a 6 week wait before the final order), so the typical case runs well beyond the statutory floor, often because financial arrangements are resolved before the final order is applied for.`,
  },
  {
    question: "What is a financial remedy application?",
    answer:
      "A financial remedy application asks the family court to make orders about money and property when a marriage or civil partnership ends: the family home, pensions, maintenance, lump sums and asset transfers. Most are uncontested consent order applications, where both parties ask the court to approve terms they have already agreed. A minority are contested, where the court is asked to decide the division itself.",
  },
  {
    question: "How many divorces are there each year in England and Wales?",
    answer:
      `In 2025 there were ${fmtNumber(headline.divorce_applications)} divorce applications and ${fmtNumber(
        headline.final_orders,
      )} final orders of divorce in England and Wales, according to the Ministry of Justice Family Court Statistics Quarterly. Annual applications have fallen from over 170,000 in 2003, though the introduction of no fault divorce in April 2022 produced a temporary spike as couples who had waited for the reform applied.`,
  },
  {
    question: "What share of financial remedy cases are contested?",
    answer:
      `In 2025, ${headline.fr_uncontested_share_pct.toFixed(0)} percent of the ${fmtNumber(
        headline.fr_applications,
      )} financial remedy applications were uncontested, meaning the couple asked the court to approve an agreed consent order. The remainder started as contested applications, although some of those settle before a final contested hearing: the disposal figures separately record cases that were initially contested but concluded by consent.`,
  },
  {
    question: "Where does this data come from?",
    answer:
      "All figures come from the Ministry of Justice Family Court Statistics Quarterly, the official statistics series for the family courts of England and Wales, published under the Open Government Licence v3.0. This index is rebuilt from the underlying CSV data files each quarter when a new edition is released.",
  },
  {
    question: "Does getting a financial order slow down the divorce itself?",
    answer:
      "The divorce and the financial proceedings are legally separate, but they interact in practice. Many applicants delay applying for the final order of divorce until a financial order is approved, because remarriage before making a financial claim can bar some applications and because certain pension and inheritance positions change on final order. This is one reason the average time from application to final order runs far beyond the 26 week statutory minimum.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Divorce and Financial Remedy Index",
  description: `${HEADLINE_SENTENCE}, tracked from Ministry of Justice Family Court Statistics Quarterly data.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-24",
  dateModified: meta.generated_at,
  author: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  publisher: { "@id": `${siteConfig.url}#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${PAGE_PATH}` },
};

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UK Divorce and Financial Remedy Index: annual divorce and financial remedy series, England and Wales",
  description:
    "Annual divorce applications, conditional orders and final orders (2003 to 2025), mean and median weeks from application to conditional and final order, and financial remedy applications and disposals by contested status (2006 to 2025), compiled from Ministry of Justice Family Court Statistics Quarterly.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: "2003/2025",
  spatialCoverage: "England and Wales",
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Annual divorce applications (dissolution of marriage), England and Wales",
    "Annual conditional orders / decrees nisi",
    "Annual final orders / decrees absolute",
    "Mean and median weeks from application to conditional order",
    "Mean and median weeks from application to final order",
    "Annual financial remedy applications by contested status",
    "Annual financial remedy disposals by contested status",
    "Uncontested share of financial remedy applications",
  ],
};

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

export default function UKDivorceFinancialRemedyIndexPage() {
  const recentDivorce = data.divorce_annual.filter((r) => r.year >= 2015);
  const recentFr = data.financial_remedy_annual.filter((r) => r.year >= 2015);

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
              { label: "UK Divorce and Financial Remedy Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Divorce and Financial Remedy Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, quarterly read on divorce volumes, court timings and financial remedy cases
            across England and Wales, compiled from the Ministry of Justice Family Court Statistics
            Quarterly. Latest edition: {meta.edition}, published 26 March 2026.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtNumber(headline.divorce_applications)}
              label="divorce applications in 2025"
            />
            <Stat
              value={`${Math.round(headline.mean_weeks_to_final_order)} weeks`}
              label="mean time from application to final order, 2025"
            />
            <Stat
              value={fmtNumber(headline.fr_applications)}
              label={`financial remedy applications in 2025, up ${headline.fr_applications_yoy_pct.toFixed(0)}% on 2024`}
            />
            <Stat
              value={`${headline.fr_uncontested_share_pct.toFixed(0)}%`}
              label="of financial remedy applications were uncontested"
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
                  There were {fmtNumber(headline.divorce_applications)} divorce applications and{" "}
                  {fmtNumber(headline.final_orders)} final orders of divorce in England and Wales in
                  2025.
                </li>
                <li>
                  Divorces reaching a final order in 2025 took a mean of{" "}
                  {Math.round(headline.mean_weeks_to_final_order)} weeks from application, around 16
                  months, against a statutory minimum of 26 weeks. The median was{" "}
                  {Math.round(headline.median_weeks_to_final_order)} weeks.
                </li>
                <li>
                  Reaching the conditional order alone took a mean of{" "}
                  {Math.round(headline.mean_weeks_to_conditional_order)} weeks in 2025 (median{" "}
                  {Math.round(headline.median_weeks_to_conditional_order)} weeks).
                </li>
                <li>
                  Financial remedy applications rose {headline.fr_applications_yoy_pct.toFixed(0)}{" "}
                  percent in 2025 to {fmtNumber(headline.fr_applications)}, with{" "}
                  {fmtNumber(headline.fr_disposals)} disposals in the year.
                </li>
                <li>
                  {headline.fr_uncontested_share_pct.toFixed(0)} percent of financial remedy
                  applications in 2025 were uncontested consent order applications; the remainder
                  began as contested proceedings.
                </li>
                <li>
                  Two decades ago the courts moved much faster: in 2003 the mean time from petition
                  to decree absolute was 43 weeks, and there were over 170,000 divorce applications
                  a year.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Ministry of Justice, Family Court Statistics Quarterly, October to December
                2025, published under the Open Government Licence v3.0. Figures may be cited with
                attribution to {"{{BRAND}}"}.
              </p>
            </div>

            <Section id="applications" title="Divorce applications and orders by year">
              <p>
                The table shows annual divorce applications (petitions under the pre-2022 law),
                conditional orders (decrees nisi) and final orders (decrees absolute) for
                dissolution of marriage in England and Wales. The long decline in applications from
                the early 2000s reflects both fewer marriages and later marriage. The 2022 spike
                follows the Divorce, Dissolution and Separation Act 2020 taking effect that April:
                couples who had waited for no fault divorce applied in the first months of the new
                regime, and the final order figures peak a year later as those cases concluded.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Year</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Applications
                      </th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Conditional orders
                      </th>
                      <th className="py-2 text-right font-bold text-neutral-900">Final orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDivorce.map((r) => (
                      <tr key={r.year} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{r.year}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {fmtNumber(r.applications)}
                        </td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {fmtNumber(r.conditional_orders)}
                        </td>
                        <td className="py-2 text-right text-neutral-900">
                          {fmtNumber(r.final_orders)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500">
                Dissolution of marriage only; judicial separation and nullity proceedings are
                excluded. The full series back to 2003 is in the downloadable CSV.
              </p>
            </Section>

            <Section id="timeliness" title="How long divorce really takes">
              <p>
                The no fault regime sets a legal minimum of 26 weeks: a 20 week reflection period
                between application and conditional order, then a 6 week wait before the final
                order can be requested. Real cases run far longer. Divorces reaching a final order
                in 2025 took a mean of {Math.round(headline.mean_weeks_to_final_order)} weeks from
                application, and even the median case, unaffected by the long tail, took{" "}
                {Math.round(headline.median_weeks_to_final_order)} weeks. In the quarter to
                December 2025 the median stood at{" "}
                {Math.round(headline.q4_2025_median_weeks_to_final_order)} weeks to final order and{" "}
                {Math.round(headline.q4_2025_median_weeks_to_conditional_order)} weeks to
                conditional order.
              </p>
              <p>
                The gap between the median and the mean is itself informative: a minority of cases
                take dramatically longer than the rest, dragging the average up. A common driver is
                money. The divorce itself and the financial proceedings are separate, and many
                applicants hold off requesting the final order until a financial order is approved,
                because remarriage can bar some financial claims and because pension and
                inheritance positions change on final order.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Year</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Mean weeks to conditional order
                      </th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Median weeks to conditional order
                      </th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Mean weeks to final order
                      </th>
                      <th className="py-2 text-right font-bold text-neutral-900">
                        Median weeks to final order
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDivorce.map((r) => (
                      <tr key={r.year} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{r.year}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {fmtWeeks(r.mean_weeks_to_conditional_order)}
                        </td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {fmtWeeks(r.median_weeks_to_conditional_order)}
                        </td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {fmtWeeks(r.mean_weeks_to_final_order)}
                        </td>
                        <td className="py-2 text-right text-neutral-900">
                          {fmtWeeks(r.median_weeks_to_final_order)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500">
                Timings measure completed cases in each year across all case types and both legal
                regimes, so years spanning the April 2022 reform mix old law and new law cases.
              </p>
            </Section>

            <Section id="financial-remedy" title="Financial remedy: the money side of divorce">
              <p>
                Financial remedy proceedings decide how money, property and pensions are divided
                when a marriage or civil partnership ends. Applications reached{" "}
                {fmtNumber(headline.fr_applications)} in 2025, up{" "}
                {headline.fr_applications_yoy_pct.toFixed(0)} percent on 2024 and the highest
                figure in the series back to 2006. Around three quarters were uncontested consent
                order applications, where the couple asks the court to approve terms already
                agreed; the rest began as contested cases, though the disposal figures show a
                meaningful share of those concluded by consent after starting contested.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Year</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Applications
                      </th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Uncontested
                      </th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">Contested</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">
                        Uncontested share
                      </th>
                      <th className="py-2 text-right font-bold text-neutral-900">Disposals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentFr.map((r) => (
                      <tr key={r.year} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{r.year}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {fmtNumber(r.applications_total)}
                        </td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {r.applications_uncontested === null
                            ? "n/a"
                            : fmtNumber(r.applications_uncontested)}
                        </td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {r.applications_contested === null
                            ? "n/a"
                            : fmtNumber(r.applications_contested)}
                        </td>
                        <td className="py-2 pr-4 text-right text-neutral-900">
                          {r.applications_uncontested_share_pct === null
                            ? "n/a"
                            : `${r.applications_uncontested_share_pct.toFixed(1)}%`}
                        </td>
                        <td className="py-2 text-right text-neutral-900">
                          {fmtNumber(r.disposals_total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500">
                Disposals split contested, initially contested (started contested, concluded by
                consent) and uncontested; the full breakdown back to 2006 is in the downloadable
                CSV. The Ministry of Justice no longer publishes financial remedy disposals by
                order type (such as pension sharing orders) because the data quality was judged
                unsuitable for publication.
              </p>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Source data.</strong> All figures are compiled from the underlying CSV data
                files of the Ministry of Justice Family Court Statistics Quarterly (FCSQ), the
                official statistics series for the family courts of England and Wales. This edition
                uses the October to December 2025 release, published 26 March 2026. The index is
                rebuilt each quarter when a new edition is released.
              </p>
              <p>
                <strong>Definitions.</strong> Divorce figures cover dissolution of marriage
                proceedings only; judicial separation and nullity are excluded. Applications
                correspond to petitions under the pre-April 2022 law. Conditional orders include
                decrees nisi, and final orders include decrees absolute, from the earlier regime.
                Timeliness figures are means and medians for cases completing each stage in the
                period, across paper and digital cases and both legal regimes. Financial remedy
                counts follow the FCSQ contested status classification. Where the source data is
                blank, the value is left blank in this index; nothing is estimated or interpolated.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
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
                  Download the full annual series (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Contains public sector information licensed under the Open Government Licence
                v3.0. Free to cite and republish with attribution to {"{{BRAND}}"}. This page is a
                data summary and does not constitute legal or financial advice on any individual
                situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Sorting out the finances of a divorce?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Most financial remedy cases are settled by agreement, and the tax and pension
                consequences of how assets are divided can be substantial. Our calculators and
                guides cover the money side of separation, from the family home to pension sharing
                and maintenance.
              </p>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get in touch" />
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
