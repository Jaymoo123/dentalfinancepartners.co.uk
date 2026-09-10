import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow, InlineLink } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { GeneralistBackdrop } from "@/components/layout/GeneralistBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { LEAD_PROOF_POINTS } from "@/lib/blog-cta-map";
import { siteContainerLg, btnOnDark, linkArrow } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { Stat, Section, FigureCard } from "@/components/research/ResearchLayout";
import { VerticalBarChart } from "@/components/research/Charts";
import { fmtNumber, fmtPercent, fmtPct1 } from "@/lib/research/format";
import { periodLabel, type LatePaymentIndexSnapshot } from "@/lib/research/late-payment-index";
import snapshot from "@/data/uk-late-payment-index.json";

const data = snapshot as unknown as LatePaymentIndexSnapshot;
const { meta, headline, periods } = data;

const PAGE_PATH = "/research/uk-late-payment-index";

const SOURCE_PPR =
  "Payment Practices Reporting service, Department for Business and Trade (statutory public disclosure)";

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
  // ONE binding: this exact array is what `<FaqSection mountAnswers faqs={faqs}>` renders at
  // the foot of the page. A projection here is how schema and visible copy drift.
  const faqPage = buildFaqPage(faqs);

  const fullPeriods = periods.filter((p) => p.n_filings >= 100);
  const chartData = fullPeriods.map((p) => ({ label: periodLabel(p.period), value: p.mean_days_to_pay ?? 0 }));

  return (
    <>
      <JsonLd data={faqPage ? [dataset, faqPage] : [dataset]} />

      <section className="relative flex min-h-[300px] items-center overflow-hidden bg-slate-900 py-10 sm:min-h-[350px] sm:py-12 lg:py-14">
        <GeneralistBackdrop tone="navy" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              siteUrl={siteConfig.url}
              onDark
              items={[
                { label: "Home", href: "/" },
                { label: "Research", href: "/research" },
                { label: "UK Late Payment Index" },
              ]}
            />
            <Eyebrow onDark>UK Late Payment Index</Eyebrow>
            <h1 className="text-3xl font-bold leading-[1.15] text-white text-balance sm:text-4xl lg:text-5xl">
              How long do the UK&apos;s biggest buyers make small suppliers wait?
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              An aggregate, half-yearly trend built from every large UK business&apos;s statutory
              Payment Practices Reporting filing. No individual company is named or ranked.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#book"
                data-cta="research_uk_late_payment_index_hero_book"
                data-cta-placement="hero"
                data-cta-goal="form"
                className={btnOnDark}
              >
                Speak to an accountant
              </a>
              <Link
                href={`${PAGE_PATH}/data`}
                data-cta="research_uk_late_payment_index_hero_data"
                data-cta-placement="hero"
                className="py-0.5 text-sm font-semibold text-primary-400 underline underline-offset-4 transition-colors hover:text-primary-300"
              >
                Download the data (CSV)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section id="key-findings" title="Key findings" tone="slate">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat
            value={`${headline.latest_mean_days_to_pay} days`}
            label={`mean time to pay, ${periodLabel(headline.latest_period)}`}
          />
          <Stat value={`${headline.latest_median_days_to_pay} days`} label="median time to pay" />
          <Stat
            value={fmtPct1(headline.latest_pct_within_30d)}
            label="of invoices paid within 30 days"
          />
          <Stat value={fmtNumber(headline.latest_n_companies)} label="large businesses reporting" />
        </div>
        <ul className="list-disc space-y-3 pl-5 marker:text-primary-600">
          <li>
            Large UK businesses reported an average of {headline.latest_mean_days_to_pay} days to pay
            invoices in {periodLabel(headline.latest_period)}, down from{" "}
            {headline.series_from_mean_days_to_pay} days in {periodLabel(headline.series_from_period)},
            a fall of {fmtPercent(Math.abs(headline.change_pct ?? 0), false)}.
          </li>
          <li>
            {fmtPct1(headline.latest_pct_within_30d)} of invoices were paid within 30 days in the
            latest period, and {fmtPct1(headline.latest_pct_not_paid_on_time)} were paid outside the
            agreed contractual terms altogether.
          </li>
          <li>
            {fmtNumber(headline.latest_n_companies)} large businesses filed a Payment Practices
            Reporting return for this period, each disclosing their own average time to pay across
            all supplier invoices.
          </li>
        </ul>
        <p className="text-xs text-slate-500">
          Source: Payment Practices Reporting service (gov.uk), a statutory disclosure. Figures are
          aggregate only; no individual company is named. Free to cite with attribution to Holloway
          Davies.
        </p>
      </Section>

      <Section id="trend" title="Mean days to pay, by half-year">
        <p>
          Average of every large business&apos;s self-reported &quot;average time to pay&quot;
          figure, aggregated by the half-year reporting period. A small number of implausible values
          (outside 0 to 365 days) are excluded as data-entry errors.
        </p>
        <FigureCard tone="slate" source={SOURCE_PPR}>
          <VerticalBarChart data={chartData} format="days" />
        </FigureCard>
      </Section>

      <Section id="table" title="Full half-year series" tone="slate">
        <FigureCard source={SOURCE_PPR}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">Period</th>
                  <th className="py-2 pr-4 text-right font-bold text-slate-900">Mean days</th>
                  <th className="py-2 pr-4 text-right font-bold text-slate-900">Median days</th>
                  <th className="py-2 pr-4 text-right font-bold text-slate-900">% within 30d</th>
                  <th className="py-2 text-right font-bold text-slate-900">Companies</th>
                </tr>
              </thead>
              <tbody>
                {fullPeriods.map((p) => (
                  <tr key={p.period} className="border-b border-slate-200">
                    <td className="py-2 pr-4 text-slate-700">{periodLabel(p.period)}</td>
                    <td className="py-2 pr-4 text-right font-semibold tabular-nums text-slate-900">
                      {p.mean_days_to_pay}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums text-slate-700">
                      {p.median_days_to_pay}
                    </td>
                    <td className="py-2 pr-4 text-right tabular-nums text-slate-700">
                      {fmtPct1(p.mean_pct_within_30d)}
                    </td>
                    <td className="py-2 text-right tabular-nums text-slate-700">
                      {fmtNumber(p.n_companies)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FigureCard>
      </Section>

      <Section id="methodology" title="Methodology and sources">
        <p>
          <strong>Data source.</strong> The full CSV export of the Payment Practices Reporting
          service, which contains every filing made by every large UK business since the regulations
          took effect in April 2017.
        </p>
        <p>
          <strong>What is counted.</strong> Filings are bucketed into half-year periods by each
          company&apos;s own reporting period end date (not a fixed calendar half), then averaged.
          &quot;Average time to pay&quot; is each filer&apos;s own self-reported figure across all
          its supplier invoices, not isolable by sector or contract type.
        </p>
        <p>
          <strong>Aggregation policy.</strong> This page reports only aggregate statistics. No
          individual company is named, ranked, or identifiable from the figures shown. The earliest
          half-year (regime start-up) and the most recent half-year (still filing) are shown with
          reduced confidence due to lower filing volume.
        </p>
        <ul className="mt-2 space-y-1 text-sm">
          {meta.sources.map((s) => (
            <li key={s.name}>
              <a
                href={s.release_page}
                className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
                rel="nofollow"
              >
                {s.name}
              </a>{" "}
              <span className="text-slate-500">({s.publisher})</span>
            </li>
          ))}
        </ul>
        <p>
          <Link
            href={`${PAGE_PATH}/data`}
            data-cta="research_uk_late_payment_index_csv"
            data-cta-placement="methodology"
            className={linkArrow}
          >
            Download the late payment data (CSV)
          </Link>
        </p>
        <p className="text-sm text-slate-500">
          Free to cite and republish with attribution to Holloway Davies. This page is a data summary
          and does not constitute financial or business advice.
        </p>
      </Section>

      <div id="book" className="scroll-mt-24">
        <LeadCTAPanel
          eyebrow="Free consultation"
          title="Late payment squeezing your cash flow?"
          description="Credit control, invoice financing and cash flow forecasting can all soften the impact of slow-paying customers. Holloway Davies helps UK small businesses build a cash flow position that survives a late-paying client."
          proofPoints={LEAD_PROOF_POINTS}
          form={<LeadForm submitLabel="Speak to an accountant" redirectOnSuccess={false} />}
          backdrop={<GeneralistBackdrop tone="navy" />}
          footnote={
            <>
              Prefer to look around first? See{" "}
              <InlineLink href="/services" onDark>
                what we do
              </InlineLink>
              . If your position is already right, we will say so.
            </>
          }
        />
      </div>

      <FaqSection mountAnswers faqs={faqs} className="bg-white py-12 sm:py-16 lg:py-20" />
    </>
  );
}
