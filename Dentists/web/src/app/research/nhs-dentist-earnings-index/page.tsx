import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import {
  EarningsTimeSeriesChart,
  EarningsBreakdownChart,
} from "@/components/research/DentalEarningsCharts";
import {
  fmtGBP,
  fmtGBPChange,
  fmtNumber,
  type DentalEarningsSnapshot,
} from "@/lib/research/dental-earnings-index";
import snapshot from "@/data/nhs-dental-earnings-index.json";

const data = snapshot as unknown as DentalEarningsSnapshot;
const { meta, headline } = data;

const PAGE_PATH = "/research/nhs-dentist-earnings-index";

export const metadata: Metadata = {
  title: "NHS Dentist Earnings and Expenses Tracker | Dental Finance Partners",
  description: `NHS dentist average net income was ${fmtGBP(headline.avg_net_income_england)} in ${headline.reference_year}. Track gross earnings, expenses and net income for NHS dentists in England from NHS Digital open data.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "NHS Dentist Earnings and Expenses Tracker | Dental Finance Partners",
    description: `NHS dentist average net income was ${fmtGBP(headline.avg_net_income_england)} in ${headline.reference_year}. Earnings, expenses and trend from NHS Digital open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the average NHS dentist salary in 2023/24?",
    answer:
      `NHS Digital reports that the average income before tax for self-employed primary-care NHS dentists in England was ${fmtGBP(headline.avg_net_income_england)} in ${headline.reference_year}. This is average net income -- gross earnings minus expenses -- before income tax and national insurance. The median net income (the midpoint, less influenced by high earners) was ${fmtGBP(headline.median_net_income_england)}. These figures cover dentists who derive the majority of their income from NHS dental contracts.`,
  },
  {
    question: "What expenses can NHS dentists deduct?",
    answer:
      "Self-employed NHS dentists can deduct legitimate business expenses from their gross earnings before calculating taxable income. Common allowable expenses include practice costs (premises, rates, utilities), clinical staff wages (nurses, receptionists), laboratory fees, equipment and instruments, professional indemnity insurance, professional body subscriptions, continuing professional development costs, clinical supplies and materials, and motor expenses for business travel. The NHS Digital data shows average expenses of " +
      fmtGBP(headline.avg_expenses_england) +
      " in 2023/24, representing roughly 50% of gross earnings. Associates working from a principal's practice have a different expense profile, primarily limited to indemnity, CPD and equipment they personally own.",
  },
  {
    question: "How do NHS dentist earnings compare with private dentistry?",
    answer:
      "The NHS Digital earnings data covers only dentists earning primarily from NHS contracts. Private dental income is not captured. In practice, many dentists work in a mixed NHS and private model, and the private component can substantially increase total earnings above the NHS-only figures shown here. Some fully private dentists earn significantly more; others earn less if they are early in their career or in less affluent areas. The figures here provide a reliable NHS benchmark, not a ceiling.",
  },
  {
    question: "Are these figures for associates or principals?",
    answer:
      "The NHS Digital dataset covers all self-employed primary-care NHS dentists, including both providing-performer (principals who hold the NHS contract) and associate (performer-only) dentists. The dataset segments by Business Arrangement in its full detail, but the headline figures shown here are for all types combined. Associates typically earn less than principals because associates pay a percentage of their UDA receipts to the practice (or work on a fee-share arrangement) and do not hold the capital value of the NHS contract. Principals have higher gross earnings but also higher expenses.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "The earnings and expenses figures come from the NHS Digital Dental Earnings and Expenses Estimates publication, produced annually from HMRC self-assessment records and NHS payment data. The latest edition covers 2023/24 and was published in July 2025. The data is published under the Open Government Licence v3.0. The time series extends back to 2009/10 and allows trends to be tracked over more than 15 years.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "NHS Dentist Earnings and Expenses Tracker",
  description:
    "Annual gross earnings, expenses and net income for self-employed NHS dentists in England, from NHS Digital open data.",
  inLanguage: "en-GB",
  datePublished: "2026-07-20",
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
  name: "NHS Dentist Earnings and Expenses Tracker: annual earnings data for self-employed NHS dentists",
  description:
    "Annual average and median gross earnings, expenses and net income before tax for self-employed primary-care NHS dentists in England, with UK country breakdown. Time series 2009/10 to 2023/24, compiled from NHS Digital open data.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: "2009-04/2024-03",
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Average gross earnings -- self-employed NHS primary-care dentists, England",
    "Average expenses -- self-employed NHS primary-care dentists, England",
    "Average income before tax (net income) -- self-employed NHS primary-care dentists, England",
    "Median income before tax -- self-employed NHS primary-care dentists, England",
    "Estimated dentist population -- self-employed NHS primary-care dentists, England",
    "Average gross earnings by UK country (England, Scotland, Wales, Northern Ireland)",
    "Average net income by UK country",
  ],
};

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

export default function NHSDentistEarningsPage() {
  const ts = data.timeseries_england;
  const cs = data.cross_sectional_2324;
  const byCountry = cs.by_country ?? [];

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqPage(faqs)) }}
      />

      {/* Hero */}
      <section className="hero-brand py-12 sm:py-16">
        <div className={`hero-inner ${siteContainerLg}`}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "NHS Dentist Earnings and Expenses Tracker" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">
            NHS Dentist Earnings and Expenses Tracker
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            NHS dentist average net income was {fmtGBP(headline.avg_net_income_england)} in{" "}
            {headline.reference_year}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            Annual gross earnings, expenses and net income for self-employed primary-care NHS
            dentists in England, from NHS Digital open data. Time series from 2009/10 onwards.
            Published under the Open Government Licence v3.0.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtGBP(headline.avg_net_income_england)}
              label={`average net income before tax (${headline.reference_year})`}
            />
            <Stat
              value={fmtGBP(headline.median_net_income_england)}
              label={`median net income before tax (${headline.reference_year})`}
            />
            <Stat
              value={fmtGBP(headline.avg_gross_earnings_england)}
              label={`average gross earnings (${headline.reference_year})`}
            />
            <Stat
              value={headline.net_income_change_yoy !== null ? fmtGBPChange(headline.net_income_change_yoy) : "n/a"}
              label={`change in avg net income vs ${headline.prior_year ?? "prior year"}`}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key findings */}
            <div className="rounded-2xl border border-[var(--gold)]/20 bg-amber-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[var(--navy)]">Key findings ({headline.reference_year})</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  Self-employed primary-care NHS dentists in England earned an average of{" "}
                  {fmtGBP(headline.avg_gross_earnings_england)} in gross income in{" "}
                  {headline.reference_year}, with average expenses of{" "}
                  {fmtGBP(headline.avg_expenses_england)}, leaving average net income before tax
                  of <strong>{fmtGBP(headline.avg_net_income_england)}</strong>.
                </li>
                <li>
                  The median net income was {fmtGBP(headline.median_net_income_england)}, below the
                  average -- reflecting that a smaller number of high-earning dentists (typically
                  large practice principals) pulls the average upward.
                </li>
                {headline.net_income_change_yoy !== null && (
                  <li>
                    Net income rose {fmtGBPChange(headline.net_income_change_yoy)} compared with the
                    prior year ({headline.prior_year}), when average net income was{" "}
                    {fmtGBP(headline.prior_year_avg_net_income)}.
                  </li>
                )}
                <li>
                  The estimated dentist population covered by this survey was{" "}
                  {fmtNumber(headline.estimated_population_england)} NHS primary-care dentists in
                  England in {headline.reference_year}.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: NHS Digital, Dental Earnings and Expenses Estimates {headline.reference_year},
                under the Open Government Licence v3.0. Figures may be cited with attribution to
                Dental Finance Partners.
              </p>
            </div>

            <Section id="timeseries" title="Earnings trend: 2009/10 to 2023/24">
              <p>
                The chart shows average gross earnings, expenses and net income before tax for
                self-employed NHS dentists in England over more than 15 years. The 2020/21 figures
                are affected by NHS Covid support payments to dental contractors and are not
                directly comparable with adjacent years.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <EarningsTimeSeriesChart series={ts} />
              </div>
            </Section>

            <Section id="breakdown" title="Gross earnings, expenses and net income (2023/24)">
              <p>
                The chart below shows the earnings breakdown for 2023/24. Expenses represent
                roughly half of gross earnings. Net income is what remains before income tax and
                national insurance contributions.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <EarningsBreakdownChart series={ts} />
              </div>
            </Section>

            {byCountry.length > 0 && (
              <Section id="by-country" title="Earnings by UK country (2023/24)">
                <p>
                  The table below shows average net income by UK country. England and Scotland
                  typically show the highest averages; Wales and Northern Ireland reflect different
                  NHS contract structures and local market conditions.
                </p>
                <div className="not-prose mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-neutral-300 text-left">
                        <th className="py-2 pr-4 font-bold text-neutral-900">Country</th>
                        <th className="py-2 pr-4 font-bold text-neutral-900 text-right">
                          Avg gross earnings
                        </th>
                        <th className="py-2 pr-4 font-bold text-neutral-900 text-right">
                          Avg expenses
                        </th>
                        <th className="py-2 font-bold text-neutral-900 text-right">
                          Avg net income
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {byCountry.map((row) => (
                        <tr key={row.country} className="border-b border-neutral-200">
                          <td className="py-2 pr-4 text-neutral-700">{row.country}</td>
                          <td className="py-2 pr-4 text-right font-semibold text-neutral-900">
                            {fmtGBP(row.avg_gross_earnings)}
                          </td>
                          <td className="py-2 pr-4 text-right text-neutral-700">
                            {fmtGBP(row.avg_expenses)}
                          </td>
                          <td className="py-2 text-right font-bold text-[var(--navy)]">
                            {fmtGBP(row.avg_net_income)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> Figures come from the NHS Digital Dental Earnings and
                Expenses Estimates publication, produced annually from HMRC self-assessment records
                and NHS payment data. The survey covers self-employed dentists who derive a
                significant proportion of their income from primary-care NHS dental contracts (GDS
                and PDS). Employed dentists (salaried dental officers in community services) are
                excluded.
              </p>
              <p>
                <strong>Measures.</strong> Gross earnings include all taxable income from dentistry,
                both NHS and private. Expenses are total allowable business expenses. Income Before
                Tax (net income) is gross earnings minus expenses, before income tax and national
                insurance. Figures are published rounded to the nearest hundred pounds.
              </p>
              <p>
                <strong>Caveats.</strong> 2020/21 figures are distorted by NHS Covid support
                payments (dentists received income without delivering normal activity). The dataset
                covers dentists primarily on NHS contracts; those working mostly in private practice
                are under-represented. Average figures are influenced by a small number of very
                high-earning principals. Generated {meta.generated_at}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.slice(0, 1).map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.publication_page}
                      className="font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)]"
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
                  className="font-semibold text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  Download the earnings time series (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Dental Finance Partners. This page is
                a data summary and does not constitute tax or financial advice on any individual
                situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-[var(--gold)]/20 bg-gradient-to-br from-amber-50 to-yellow-50/50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--navy)] sm:text-3xl">
                Making the most of your dental earnings
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Whether you are an associate benchmarking your earnings against the national
                average, a principal reviewing your practice extraction strategy, or a buyer
                assessing goodwill value relative to income, our dental accountants can help you
                structure your income efficiently. We work exclusively with dental professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/for-associates"
                  className="text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  Tax for associate dentists &rarr;
                </Link>
                <Link
                  href="/for-principals"
                  className="text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  Practice principal finance &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Speak to a dental accountant" />
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
