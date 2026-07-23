import type { Metadata } from "next";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { Stat, Section } from "@/components/research/ResearchLayout";
import { VerticalBarChart } from "@/components/research/Charts";
import { fmtNumber, fmtPercent, fmtPct1 } from "@/lib/research/format";
import { periodLabel, type LatePaymentIndexSnapshot } from "@/lib/research/late-payment-index";
import snapshot from "@/data/uk-late-payment-index.json";

const data = snapshot as unknown as LatePaymentIndexSnapshot;
const { meta, headline, periods } = data;

const PAGE_PATH = "/research/uk-late-payment-index";

export const metadata: Metadata = {
  title: "UK Late Payment Index 2026 | How Long Big Buyers Take To Pay | Holloway Davies",
  description: `Large UK businesses took an average of ${headline.latest_mean_days_to_pay} days to pay invoices in ${periodLabel(headline.latest_period)}, down from ${headline.series_from_mean_days_to_pay} days in ${periodLabel(headline.series_from_period)}. Aggregate trend from the statutory Payment Practices Reporting register.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Late Payment Index | Holloway Davies",
    description: "How long UK large businesses take to pay their suppliers, tracked from statutory Payment Practices Reporting data.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "How long do large UK businesses take to pay invoices?",
    answer: `Large UK businesses reported an average of ${headline.latest_mean_days_to_pay} days to pay supplier invoices in ${periodLabel(headline.latest_period)} (median ${headline.latest_median_days_to_pay} days), based on their own statutory Payment Practices Reporting filings, aggregated across ${fmtNumber(headline.latest_n_companies)} reporting companies.`,
  },
  {
    question: "What is Payment Practices Reporting?",
    answer:
      "It is a statutory disclosure regime under the Reporting on Payment Practices and Performance Regulations 2017. Large UK businesses (broadly, meeting at least two of: turnover above £36 million, balance sheet above £18 million, more than 250 employees) must publish a return every six months disclosing their average time to pay, the share of invoices paid within 30, 60 days or later, and their standard payment terms.",
  },
  {
    question: "Is late payment to small suppliers getting better or worse?",
    answer: `On this aggregate measure, it has improved: mean days-to-pay fell ${fmtPercent(Math.abs(headline.change_pct ?? 0), false)} from ${headline.series_from_mean_days_to_pay} days in ${periodLabel(headline.series_from_period)} to ${headline.latest_mean_days_to_pay} days in ${periodLabel(headline.latest_period)}, and the share of invoices paid outside agreed terms has fallen over the same period. Individual buyer-supplier relationships vary widely; this is an economy-wide aggregate, not a guarantee for any particular contract.`,
  },
  {
    question: "Why doesn't this page name individual companies?",
    answer:
      "This index is deliberately kept aggregate. The underlying Payment Practices Reporting register is public and does name individual filers, but ranking named companies risks reputational unfairness (average time to pay is a single self-reported figure that does not capture context, disputes, or specific contract terms). We report the aggregate national trend instead.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "The full Payment Practices Reporting CSV export, published by the Department for Business and Trade at check-payment-practices.service.gov.uk. It is a statutory public disclosure, not OGL-badged data, but freely reusable; the underlying filings are made under legal obligation.",
  },
];

export default function UkLatePaymentIndexPage() {
  const dataset = buildDataset({
    name: "UK Late Payment Index",
    description:
      "Aggregate half-yearly trend in average time to pay, reported by large UK businesses under the statutory Payment Practices Reporting regime. No individual company is named.",
    path: PAGE_PATH,
    distributionPath: `${PAGE_PATH}/data`,
    dateModified: meta.generated_at,
    temporalCoverage: "2017/2026",
    keywords: [
      "UK late payment index",
      "payment practices reporting",
      "average time to pay UK",
      "supplier payment terms UK",
    ],
    license: "Statutory public disclosure (Reporting on Payment Practices and Performance Regulations 2017)",
    spatialCoverage: "United Kingdom",
  });
  const faqPage = buildFaqPage(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  const fullPeriods = periods.filter((p) => p.n_filings >= 100);
  const chartData = fullPeriods.map((p) => ({ label: periodLabel(p.period), value: p.mean_days_to_pay ?? 0 }));

  return (
    <>
      <JsonLd data={faqPage ? [dataset, faqPage] : [dataset]} />

      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "UK Late Payment Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Late Payment Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            How long do the UK&apos;s biggest buyers make small suppliers wait?
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            An aggregate, half-yearly trend built from every large UK business&apos;s statutory
            Payment Practices Reporting filing. No individual company is named or ranked.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={`${headline.latest_mean_days_to_pay} days`} label={`mean time to pay, ${periodLabel(headline.latest_period)}`} />
            <Stat value={`${headline.latest_median_days_to_pay} days`} label="median time to pay" />
            <Stat value={fmtPct1(headline.latest_pct_within_30d)} label="of invoices paid within 30 days" />
            <Stat value={fmtNumber(headline.latest_n_companies)} label="large businesses reporting" />
          </div>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            <div className="rounded-2xl border border-orange-500/20 bg-orange-50/60 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-orange-800">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  Large UK businesses reported an average of {headline.latest_mean_days_to_pay} days
                  to pay invoices in {periodLabel(headline.latest_period)}, down from{" "}
                  {headline.series_from_mean_days_to_pay} days in {periodLabel(headline.series_from_period)},
                  a fall of {fmtPercent(Math.abs(headline.change_pct ?? 0), false)}.
                </li>
                <li>
                  {fmtPct1(headline.latest_pct_within_30d)} of invoices were paid within 30 days in
                  the latest period, and {fmtPct1(headline.latest_pct_not_paid_on_time)} were paid
                  outside the agreed contractual terms altogether.
                </li>
                <li>
                  {fmtNumber(headline.latest_n_companies)} large businesses filed a Payment Practices
                  Reporting return for this period, each disclosing their own average time to pay
                  across all supplier invoices.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Payment Practices Reporting service (gov.uk), a statutory disclosure. Figures
                are aggregate only; no individual company is named. Free to cite with attribution to
                Holloway Davies.
              </p>
            </div>

            <Section id="trend" title="Mean days to pay, by half-year">
              <p>
                Average of every large business&apos;s self-reported &quot;average time to pay&quot;
                figure, aggregated by the half-year reporting period. A small number of implausible
                values (outside 0 to 365 days) are excluded as data-entry errors.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <VerticalBarChart data={chartData} format="days" />
              </div>
            </Section>

            <Section id="table" title="Full half-year series">
              <div className="not-prose overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Period</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">Mean days</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">Median days</th>
                      <th className="py-2 pr-4 text-right font-bold text-neutral-900">% within 30d</th>
                      <th className="py-2 text-right font-bold text-neutral-900">Companies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fullPeriods.map((p) => (
                      <tr key={p.period} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{periodLabel(p.period)}</td>
                        <td className="py-2 pr-4 text-right font-semibold text-neutral-900">{p.mean_days_to_pay}</td>
                        <td className="py-2 pr-4 text-right text-neutral-700">{p.median_days_to_pay}</td>
                        <td className="py-2 pr-4 text-right text-neutral-700">{fmtPct1(p.mean_pct_within_30d)}</td>
                        <td className="py-2 text-right text-neutral-700">{fmtNumber(p.n_companies)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> The full CSV export of the Payment Practices Reporting
                service, which contains every filing made by every large UK business since the
                regulations took effect in April 2017.
              </p>
              <p>
                <strong>What is counted.</strong> Filings are bucketed into half-year periods by each
                company&apos;s own reporting period end date (not a fixed calendar half), then
                averaged. &quot;Average time to pay&quot; is each filer&apos;s own self-reported
                figure across all its supplier invoices, not isolable by sector or contract type.
              </p>
              <p>
                <strong>Aggregation policy.</strong> This page reports only aggregate statistics. No
                individual company is named, ranked, or identifiable from the figures shown. The
                earliest half-year (regime start-up) and the most recent half-year (still filing) are
                shown with reduced confidence due to lower filing volume.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.release_page} className="font-semibold text-orange-700 hover:text-orange-800" rel="nofollow">
                      {s.name}
                    </a>{" "}
                    <span className="text-neutral-500">({s.publisher})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm">
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-orange-700 hover:text-orange-800">
                  Download the late payment data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Holloway Davies. This page is a data
                summary and does not constitute financial or business advice.
              </p>
            </Section>

            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Late payment squeezing your cash flow?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Credit control, invoice financing and cash flow forecasting can all soften the impact
                of slow-paying customers. Holloway Davies helps UK small businesses build a cash flow
                position that survives a late-paying client.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/services" className="text-orange-700 hover:text-orange-800">
                  View our services &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Speak to an accountant" />
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Frequently asked questions</h2>
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
