import type { Metadata } from "next";
import Link from "next/link";

import { ResearchLayout } from "@/components/research/ResearchLayout";
import { ResearchSection, FigureCard, DataTableWrap } from "@/components/research/ResearchSection";
import { btnOnDark, btnPrimary } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import { SlowestPayersChart } from "@/components/research/PprLeagueChart";
import { fmtDate, fmtNumber, type PprLeagueSnapshot } from "@/lib/research/ppr-league";
import snapshot from "@/data/construction-ppr-league.json";

const data = snapshot as unknown as PprLeagueSnapshot;
const { meta, headline, companies } = data;

const PAGE_PATH = "/research/uk-construction-payment-practices-league";

const HEADLINE_SENTENCE = `Large UK construction businesses take ${fmtNumber(headline.median_days_to_pay)} days on average to pay their suppliers`;

export const metadata: Metadata = {
  title: "UK Construction Payment Practices League | Who pays slowest? | Trade Tax Specialists",
  description: `${HEADLINE_SENTENCE}, based on ${fmtNumber(headline.n_companies)} large construction businesses' own statutory Payment Practices Reporting disclosures. Free to search and cite.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Construction Payment Practices League | Trade Tax Specialists",
    description: `${HEADLINE_SENTENCE}. Compiled from large businesses' own statutory payment disclosures.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What is the UK Construction Payment Practices League?",
    answer:
      "It is a ranking of large UK construction businesses by their own reported 'average time to pay' figure, built entirely from the Payment Practices Reporting (PPR) service. Every large UK business (broadly, those meeting two of: over 250 employees, over 36 million pounds turnover, over 18 million pounds balance sheet total) must publish a report on its payment practices twice a year by law. We isolated the businesses that flagged having qualifying construction contracts in the reporting period, then cross-referenced each against its registered Companies House SIC code to keep only genuine construction-sector businesses.",
  },
  {
    question: "Is it legal to publish this? Isn't this a reputational attack on named companies?",
    answer:
      "Every figure on this page is the company's own statutory public disclosure, published by the company itself on gov.uk under the Reporting on Payment Practices and Performance Regulations 2017, specifically so that suppliers, subcontractors and the public can see how a large business pays. Publishing an aggregated, sourced summary of public statutory data is exactly the transparency the regulations exist to create. This page does not allege wrongdoing: a longer average time to pay may reflect a business's standard payment terms (which large main contractors are entitled to set, within the law), the mix of invoice types it processes, or genuine payment delays. We link every figure back to the company's own gov.uk filing.",
  },
  {
    question: "Does 'average time to pay' measure only construction invoices?",
    answer:
      "No. The statutory PPR return reports a single overall average across all supplier invoices the business paid in the period, not a figure isolated to construction contracts specifically. A company can have both office suppliers and construction subcontractors on its books, and only one blended average is published. We include a company here only if it separately flagged having qualifying construction contracts (works subject to the Construction Act) in that reporting period, so every company in the table does pay construction subcontractors, but the days-to-pay figure itself is company-wide, not subcontractor-specific.",
  },
  {
    question: "How were these companies identified as construction businesses?",
    answer:
      "The PPR return only flags whether a business had 'qualifying construction contracts' in the period, true or false; it does not classify the business by sector. On its own that flag is too broad, it also catches manufacturers, retailers and other large businesses that simply commissioned building work. We cross-referenced every flagged company's registration at Companies House and kept only those whose registered SIC code falls within the same 19-code construction universe used across this site (building construction, civil engineering, and the specialised trades). That removed companies such as steel manufacturers and consumer goods businesses that had also flagged qualifying construction contracts but are not construction businesses themselves.",
  },
  {
    question: "I'm a subcontractor and my main contractor pays slowly. What can I do?",
    answer:
      "Check your payment terms and retention clauses before you sign, and keep clear records of applications for payment and certified sums so a dispute is easier to evidence. The Construction Act gives subcontractors a statutory right to adjudication for payment disputes, which is faster than court action. On the tax side, CIS deductions and any refund you are owed do not depend on when your customer actually pays you, so a slow-paying client should not be allowed to also distort your tax position. Our team can review your CIS position and cash flow planning alongside this.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Construction Payment Practices League",
  description: `${HEADLINE_SENTENCE}, compiled from statutory Payment Practices Reporting disclosures.`,
  inLanguage: "en-GB",
  datePublished: "2026-07-23",
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
  name: "UK Construction Payment Practices League: average days to pay by large construction business",
  description:
    "Average time to pay, and the share of invoices paid late, for large UK construction-sector businesses, compiled from their own statutory Payment Practices Reporting disclosures and cross-referenced against Companies House SIC codes.",
  inLanguage: "en-GB",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Average time to pay (days), self-reported by large construction businesses",
    "Percentage of invoices paid within 30 days",
    "Percentage of invoices paid later than 60 days",
    "Use of retention clauses in construction contracts",
  ],
};

// ---------------------------------------------------------------------------

export default function UKConstructionPaymentPracticesLeaguePage() {
  const top20 = companies.slice(0, 20);
  const fastest10 = companies.slice(-10).reverse();
  const retentionCount = companies.filter((c) => c.retention_clauses_all.trim() === "True").length;

  return (
    <ResearchLayout
      schemas={[articleSchema, datasetSchema, buildFaqPageJsonLd(faqs)]}
      breadcrumbLabel="UK Construction Payment Practices League"
      eyebrow="UK Construction Payment Practices League"
      headline={HEADLINE_SENTENCE}
      intro={
        <>
          A sourced league table of large construction businesses&apos; own statutory payment
          practice disclosures, built from the government&apos;s Payment Practices Reporting
          service and cross-checked against Companies House SIC codes so only genuine
          construction businesses are included.
        </>
      }
      heroCtas={
        <>
          <Link
            href="#book"
            data-cta="research_payment_practices_hero_book"
            data-cta-placement="hero"
            data-cta-goal="form"
            className={btnPrimary}
          >
            Get a free CIS review
          </Link>
          <Link
            href={`${PAGE_PATH}/data`}
            data-cta="research_payment_practices_hero_data"
            data-cta-placement="hero"
            className={btnOnDark}
          >
            Download the data (CSV)
          </Link>
        </>
      }
      stats={[
        {
          value: fmtNumber(headline.n_companies),
          label: "large construction businesses in the current cohort",
        },
        {
          value: `${fmtNumber(headline.median_days_to_pay)} days`,
          label: "median average time to pay",
        },
        {
          value: `${fmtNumber(headline.slowest?.atp ?? null)} days`,
          label: "the slowest-reported average in the cohort",
        },
        {
          value: `${Math.round((retentionCount / companies.length) * 100)}%`,
          label: "use retention clauses in all their construction contracts",
        },
      ]}
      keyFindings={
        <>
                <li>
                  Across {fmtNumber(headline.n_companies)} large UK construction businesses with a
                  qualifying construction contract in their most recent statutory filing, the
                  median reported average time to pay is {fmtNumber(headline.median_days_to_pay)}{" "}
                  days (mean {fmtNumber(data.headline.mean_days_to_pay)} days).
                </li>
                <li>
                  The slowest-reported average in the current cohort is{" "}
                  {headline.slowest?.name} at {fmtNumber(headline.slowest?.atp ?? null)} days; the
                  fastest is {headline.fastest?.name} at {fmtNumber(headline.fastest?.atp ?? null)}{" "}
                  days. Both figures are the companies&apos; own statutory disclosures.
                </li>
                <li>
                  {retentionCount} of {companies.length} businesses in the cohort ({Math.round((retentionCount / companies.length) * 100)}%)
                  report using retention clauses in all of their construction contracts, money
                  withheld from a subcontractor&apos;s payment until defects liability periods end.
                </li>
                <li>
                  This is not a construction-specific days-to-pay figure: each company&apos;s
                  reported average spans all of its supplier invoices, not construction
                  subcontractors alone. See the methodology section for exactly how companies were
                  selected and what the figure does and does not measure.
                </li>
        </>
      }
      source={
        <>
          Source: Payment Practices Reporting service (gov.uk), a statutory disclosure every
          large UK business must publish twice yearly, cross-referenced against Companies
          House SIC codes (Open Government Licence v3.0). Figures are each company&apos;s own
          filing; free to cite with attribution to Trade Tax Specialists.
        </>
      }
      conversionTitle="Paid late by a main contractor? Don't let it distort your tax position too."
      conversionBody={
        <>
          Slow payment squeezes subcontractor cash flow, but your CIS deductions and any
          refund you are owed are not tied to when your customer actually pays you. Our
          calculators help you keep your own tax position accurate regardless of how your
          clients pay.
        </>
      }
      conversionCtas={
        <>
          <Link
            href="/calculators/cis-refund-estimator"
            data-cta="research_payment_practices_cta_calculator"
            data-cta-placement="article"
            className="text-primary-700 hover:text-primary-800"
          >
            CIS refund estimator &rarr;
          </Link>
          <Link
            href="/calculators/cis-gps-eligibility-checker"
            className="text-primary-700 hover:text-primary-800"
          >
            GPS eligibility checker &rarr;
          </Link>
        </>
      }
      faqs={faqs}
    >
            <ResearchSection id="slowest" title="The 12 slowest-reported payers">
              <p>
                Ranked by each business&apos;s own most recently filed &quot;average time to
                pay&quot; figure. The dashed line marks the {fmtNumber(headline.n_companies)}
                -company cohort median of {fmtNumber(headline.median_days_to_pay)} days.
              </p>
              <FigureCard>
                <SlowestPayersChart companies={companies} medianDays={headline.median_days_to_pay} />
              </FigureCard>
            </ResearchSection>

            <ResearchSection id="league-table" title="Full league table: top 20 slowest">
              <p>
                Each row is the business&apos;s own most recent PPR filing. &quot;% over 60
                days&quot; is the share of that business&apos;s invoices paid more than 60 days
                after receipt, in the same reporting period.
              </p>
              <DataTableWrap>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Company</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900">Sector</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">Period end</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">Avg days to pay</th>
                      <th className="py-2 font-bold text-neutral-900 text-right">% over 60 days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {top20.map((c) => (
                      <tr key={c.company_number} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 font-semibold text-neutral-900">{c.name}</td>
                        <td className="py-2 pr-4 text-neutral-600">{c.sic_label}</td>
                        <td className="py-2 pr-4 text-right text-neutral-700">{fmtDate(c.end)}</td>
                        <td className="py-2 pr-4 text-right font-semibold text-neutral-900">{c.atp}</td>
                        <td className="py-2 text-right text-neutral-700">{c.pct_later_60}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DataTableWrap>
              <p className="mt-4 text-sm text-neutral-600">
                The full {companies.length}-company table, including the fastest payers, is
                available in the{" "}
                <Link href={`${PAGE_PATH}/data`} className="font-semibold text-primary-700 hover:text-primary-800">
                  CSV download
                </Link>
                .
              </p>
            </ResearchSection>

            <ResearchSection id="fastest" title="For balance: the 10 fastest-reported payers">
              <p>
                The same cohort, ranked the other way: specialist and main contractors, an
                infrastructure services group, and a couple of property-holding entities within
                larger retail groups, all reporting a fast average time to pay.
              </p>
              <DataTableWrap>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Company</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900">Sector</th>
                      <th className="py-2 font-bold text-neutral-900 text-right">Avg days to pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fastest10.map((c) => (
                      <tr key={c.company_number} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 font-semibold text-neutral-900">{c.name}</td>
                        <td className="py-2 pr-4 text-neutral-600">{c.sic_label}</td>
                        <td className="py-2 text-right font-semibold text-neutral-900">{c.atp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DataTableWrap>
            </ResearchSection>

            <ResearchSection id="methodology" title="Methodology, sources and caveats">
              <p>
                <strong>Selection.</strong> The Payment Practices Reporting (PPR) return asks every
                large UK business to flag whether it had &quot;qualifying construction
                contracts&quot; (works subject to the Construction Act and its retention-clause
                reporting requirements) in the reporting period. We took every company that ever
                flagged this as true across the full PPR history, then cross-referenced each
                company&apos;s registered SIC code at Companies House and kept only those whose SIC
                code falls within the 19-code construction universe used elsewhere on this site.
                This step matters: the QCC flag alone also catches large businesses well outside
                construction (a steel manufacturer, a consumer goods company, a book publisher,
                confirmed in our own data checks) that simply commissioned building work in the
                period, and including them would misrepresent the league as construction-specific
                when it was not.
              </p>
              <p>
                <strong>What &quot;average time to pay&quot; measures.</strong> It is each
                company&apos;s own statutory figure, an overall average across all supplier
                invoices paid in the reporting period, not a figure isolated to construction
                subcontractors specifically. A business with a large, fast-paying supply chain and
                a small, slow-paying construction spend (or vice versa) would report a single
                blended number either way.
              </p>
              <p>
                <strong>Current cohort.</strong> We use each company&apos;s most recent filing with
                a reporting period ending on or after {fmtDate(meta.current_cohort_cutoff)}, so the
                league reflects recent practice rather than historical filings.
              </p>
              <p>
                <strong>No allegation of wrongdoing.</strong> Every figure here is the company&apos;s
                own public statutory disclosure, filed by the company itself on gov.uk. A longer
                average time to pay may reflect standard payment terms a business is legally
                entitled to set, the specific mix of invoices in that reporting period, or genuine
                payment delay; this page draws no conclusion beyond what each company has itself
                reported.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      className="font-semibold text-primary-700 hover:text-primary-800"
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
                  className="font-semibold text-primary-700 hover:text-primary-800"
                >
                  Download the full league table (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Trade Tax Specialists. This page is
                a data summary and does not constitute legal, tax or business advice, and does not
                allege wrongdoing by any named business.
              </p>
            </ResearchSection>

    </ResearchLayout>
  );
}
