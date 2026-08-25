import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import { serialize } from "@/lib/schema/serialize";
import { SurvivalComparisonChart } from "@/components/research/LegalIncorporationCharts";
import {
  fmtPct,
  fmtNumber,
  type LegalSurvivalSnapshot,
} from "@/lib/research/legal-survival-index";
import snapshot from "@/data/legal-survival-index.json";

const data = snapshot as unknown as LegalSurvivalSnapshot;
const { meta, headline, survival_by_cohort } = data;

const PAGE_PATH = "/research/law-firm-survival-index";

const HEADLINE_SENTENCE = `Law firms survive at significantly higher rates than the UK average: ${headline.legal_activities_5yr_pct_2019.toFixed(0)}% of legal businesses born in 2019 were still trading after five years, compared with ${headline.all_industry_5yr_pct_2019.toFixed(0)}% across all industries`;

export const metadata: Metadata = {
  title: "Law Firm Survival Index | UK law firm business survival rates | Accounts for Lawyers",
  description: `${HEADLINE_SENTENCE}. Sourced from ONS Business Demography open data. Updated ${data.meta.source_release}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "Law Firm Survival Index | Accounts for Lawyers",
    description: `${headline.legal_activities_5yr_pct_2019.toFixed(0)}% five-year survival for legal businesses vs ${headline.all_industry_5yr_pct_2019.toFixed(0)}% all-industry. ONS Business Demography open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "How do law firm survival rates compare to other businesses?",
    answer:
      "Legal activities businesses (SIC 691) have consistently higher survival rates than the all-industry average. For businesses born in 2019, 96.2% survived one year, 84.8% survived two years, 72.4% survived three years, and 59.8% survived five years. The equivalent all-industry figures were 94.6%, not separately available, 55.9%, and 38.4%. The gap widens at longer time horizons: by year five, legal businesses survived at a rate roughly 21 percentage points above the national average.",
  },
  {
    question: "What does the ONS Business Demography dataset measure?",
    answer:
      "The ONS Business Demography series tracks the birth, death, and survival of UK businesses registered for VAT or PAYE. Businesses are categorised by their SIC 2007 code. Survival is measured by checking whether a business active at birth was still active in each subsequent year. The data covers England, Wales, and Scotland (Great Britain). SIC 691 (Legal activities) includes barristers, solicitors, and other legal businesses. The dataset is published annually by the ONS under the Open Government Licence v3.0.",
  },
  {
    question: "Why do law firms have above-average survival rates?",
    answer:
      "Legal businesses tend to have higher barriers to entry (professional qualifications, SRA regulation, indemnity insurance) which filter out marginal entrants. Repeat client relationships and referral networks create stable revenue streams. The combination of professional regulation and client loyalty means that law firms, once established, tend to persist. However, survival does not mean profitability: a firm may still be trading but not growing. The data covers all legal businesses including sole practitioners and small consultancies, not just large partnerships.",
  },
  {
    question: "What does the 2020 cohort data show?",
    answer:
      "Businesses born in 2020 showed one-year survival of 95.9% for legal activities, broadly in line with the 2019 cohort. Three-year survival was 74.0% for legal activities (SIC 691), also above the all-industry average of around 53%. The 2020 cohort launched during the pandemic, when business births fell across most sectors. The legal sector proved relatively resilient, and firms that started in 2020 appear to have performed similarly to pre-pandemic cohorts.",
  },
  {
    question: "Does high survival mean law firms are low risk?",
    answer:
      "Higher-than-average survival rates are a positive signal, but they do not eliminate business risk. Cash flow is a significant pressure in law firms: slow-paying clients, WIP funding gaps, and client account compliance requirements all create financial strain even in profitable practices. Professional indemnity insurance costs, SRA regulation changes, and market consolidation are ongoing pressures. The survival data should be read as one indicator of sector resilience, not a guarantee of individual practice success.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Law Firm Survival Index: UK legal business survival rates vs all-industry",
  description: HEADLINE_SENTENCE,
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
  name: "Law Firm Survival Index: UK legal business survival rates 2019-2023",
  description:
    "One, two, three, four and five year survival rates for UK legal businesses (SIC 691 Legal activities) compared with the all-industry average, compiled from ONS Business Demography open data.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: "2019/2023",
  isAccessibleForFree: true,
  variableMeasured: [
    "1-year survival rate: UK legal businesses (SIC 691)",
    "2-year survival rate: UK legal businesses (SIC 691)",
    "3-year survival rate: UK legal businesses (SIC 691)",
    "4-year survival rate: UK legal businesses (SIC 691)",
    "5-year survival rate: UK legal businesses (SIC 691)",
    "1-year survival rate: all UK industries",
    "3-year survival rate: all UK industries",
    "5-year survival rate: all UK industries",
  ],
};

// ---------------------------------------------------------------------------

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-neutral-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700">{children}</div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-3xl font-bold text-white sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-neutral-300">{label}</div>
    </div>
  );
}

// Best cohort for the comparison chart (2019 -- most complete data)
const cohort2019 = survival_by_cohort.find((c) => c.birth_year === 2019)!;

export default function LawFirmSurvivalIndexPage() {
  const faqSchema = buildFaqPage(faqs);

  const survivalLabels = ["1 year", "3 years", "5 years"];
  const legalPcts = [
    cohort2019.sic_691_1yr_pct,
    cohort2019.sic_691_3yr_pct,
    cohort2019.sic_691_5yr_pct,
  ];
  const allPcts = [
    cohort2019.all_industry_1yr_pct,
    cohort2019.all_industry_3yr_pct,
    cohort2019.all_industry_5yr_pct,
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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="bg-neutral-900 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Research", href: "/research" },
              { label: "Law Firm Survival Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            Law Firm Survival Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {fmtPct(headline.legal_activities_5yr_pct_2019)} of law firms survive five years, vs{" "}
            {fmtPct(headline.all_industry_5yr_pct_2019)} across all industries
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced read on UK law firm survival rates, drawn from ONS Business Demography official
            open data. Covering SIC 691 (Legal activities) vs the all-industry benchmark across 2019
            to 2023 birth cohorts.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtPct(headline.legal_activities_1yr_pct_2019)}
              label="one-year survival for legal businesses born in 2019"
            />
            <Stat
              value={fmtPct(headline.legal_activities_3yr_pct_2019)}
              label="three-year survival for legal businesses born in 2019"
            />
            <Stat
              value={fmtPct(headline.legal_activities_5yr_pct_2019)}
              label="five-year survival for legal businesses born in 2019"
            />
            <Stat
              value={`+${(headline.legal_activities_5yr_pct_2019 - headline.all_industry_5yr_pct_2019).toFixed(0)}pp`}
              label="above the all-industry five-year survival rate"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-10 sm:py-14">
        <div className={siteContainerLg}>
          <div className="max-w-4xl">

            {/* Key findings */}
            <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[var(--primary)]">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  Legal businesses (SIC 691) have a five-year survival rate of{" "}
                  <strong>{fmtPct(headline.legal_activities_5yr_pct_2019)}</strong> for the 2019
                  birth cohort, versus {fmtPct(headline.all_industry_5yr_pct_2019)} across all
                  industries. That gap of around 21 percentage points is consistent across recent
                  cohorts.
                </li>
                <li>
                  One-year survival is similarly strong at{" "}
                  {fmtPct(headline.legal_activities_1yr_pct_2019)}, above the all-industry rate of{" "}
                  {fmtPct(headline.all_industry_1yr_pct_2019)}. The gap is smaller at year one but
                  widens materially by years three and five.
                </li>
                <li>
                  The same pattern holds across 2019, 2020, and 2021 birth cohorts, all showing
                  three-year survival above 72% for SIC 691 versus 53-56% all-industry. This
                  suggests the outperformance is structural, not cohort-specific.
                </li>
                <li>
                  The {fmtNumber(cohort2019.sic_691_births)} legal businesses born in 2019
                  (SIC 691) compare with {fmtNumber(cohort2019.all_industry_births)} across all
                  industries. Legal accounts for a small fraction of total business births but a
                  disproportionately high share of long-term survivors.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: ONS Business Demography 2024, Table 5.2a (SIC group survival, births 2019).
                Open Government Licence v3.0. Figures may be cited with attribution to Accounts for
                Lawyers.
              </p>
            </div>

            <Section id="chart" title="Survival rates by year: legal activities vs all industry (2019 cohort)">
              <p>
                The chart compares survival at one, three and five years for businesses born in 2019,
                contrasting SIC 691 (Legal activities, in crimson) with the all-industry average (in
                grey). The legal sector outperforms at every horizon, with the gap widening as time
                passes.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <SurvivalComparisonChart
                  legalPcts={legalPcts}
                  allPcts={allPcts}
                  labels={survivalLabels}
                />
              </div>
            </Section>

            <Section id="cohort-table" title="Survival by cohort (all available years)">
              <p>
                The table shows survival data for SIC 691 (Legal activities) and the all-industry
                average for each birth year. Later cohorts have fewer follow-up years available.
                Five-year data exists only for the 2019 cohort.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-3 font-bold text-neutral-900">Cohort</th>
                      <th className="py-2 pr-2 text-right font-bold text-neutral-900">Births</th>
                      <th className="py-2 pr-2 text-right font-bold text-neutral-900">1yr %</th>
                      <th className="py-2 pr-2 text-right font-bold text-neutral-900">2yr %</th>
                      <th className="py-2 pr-2 text-right font-bold text-neutral-900">3yr %</th>
                      <th className="py-2 pr-2 text-right font-bold text-neutral-900">5yr %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {survival_by_cohort.map((c) => (
                      <tr key={c.birth_year} className="border-b border-neutral-200">
                        <td className="py-2 pr-3 font-semibold text-neutral-900">
                          {c.birth_year} Legal (SIC 691)
                        </td>
                        <td className="py-2 pr-2 text-right text-neutral-700">
                          {fmtNumber(c.sic_691_births)}
                        </td>
                        <td className="py-2 pr-2 text-right text-neutral-700">
                          {fmtPct(c.sic_691_1yr_pct)}
                        </td>
                        <td className="py-2 pr-2 text-right text-neutral-700">
                          {fmtPct(c.sic_691_2yr_pct)}
                        </td>
                        <td className="py-2 pr-2 text-right text-neutral-700">
                          {fmtPct(c.sic_691_3yr_pct)}
                        </td>
                        <td className="py-2 pr-2 text-right text-neutral-700">
                          {fmtPct(c.sic_691_5yr_pct)}
                        </td>
                      </tr>
                    ))}
                    {/* All-industry row for 2019 */}
                    <tr className="border-b-2 border-neutral-300 bg-neutral-50">
                      <td className="py-2 pr-3 text-neutral-500">2019 All industry</td>
                      <td className="py-2 pr-2 text-right text-neutral-500">
                        {fmtNumber(cohort2019.all_industry_births)}
                      </td>
                      <td className="py-2 pr-2 text-right text-neutral-500">
                        {fmtPct(cohort2019.all_industry_1yr_pct)}
                      </td>
                      <td className="py-2 pr-2 text-right text-neutral-500">
                        {fmtPct(cohort2019.all_industry_2yr_pct)}
                      </td>
                      <td className="py-2 pr-2 text-right text-neutral-500">
                        {fmtPct(cohort2019.all_industry_3yr_pct)}
                      </td>
                      <td className="py-2 pr-2 text-right text-neutral-500">
                        {fmtPct(cohort2019.all_industry_5yr_pct)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500">
                Source: ONS Business Demography 2024, Tables 5.2a-5.2e and Table 4.2. Open Government
                Licence v3.0. 5-year data available only for 2019 cohort; later cohorts have fewer
                follow-up years.
              </p>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Data source.</strong> Survival rates are drawn from the ONS Business
                Demography 2024 reference table, specifically Tables 5.2a-5.2e (survival of newly
                born enterprises by SIC 2007 group) and Table 4.2 (survival by broad industry group).
                The ONS methodology counts businesses registered for VAT or PAYE and tracks whether
                they remain active in subsequent years. The source file is{" "}
                <em>{meta.source_file}</em>, released {meta.source_release}.
              </p>
              <p>
                <strong>SIC classification.</strong> SIC 691 (Legal activities) is the most precise
                available breakdown for law firms in this dataset. SIC 69 (Legal and accounting
                activities) is a broader grouping that combines SIC 691 with SIC 692 (accountancy).
                The headline figures on this page use SIC 691 for maximum specificity.
              </p>
              <p>
                <strong>Caveats.</strong> The ONS data covers businesses registered for VAT or PAYE,
                so very small unregistered businesses below the VAT threshold may be underrepresented.
                Survival means remaining registered, not profitable. The 2019 cohort includes
                businesses that entered the pandemic; some sectors show distorted patterns due to
                government support schemes which may have prolonged survival beyond what market
                conditions alone would have produced.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                <li>
                  <a
                    href={meta.source_url}
                    className="font-semibold text-[var(--primary)] hover:opacity-80"
                    rel="nofollow"
                  >
                    ONS Business Demography Reference Table
                  </a>{" "}
                  <span className="text-neutral-500">(Office for National Statistics)</span>
                </li>
              </ul>
              <p className="text-sm text-neutral-500">
                Data is published under the Open Government Licence v3.0. Free to cite with
                attribution to Accounts for Lawyers.
              </p>
            </Section>

            {/* CTA */}
            <div className="mt-10 rounded-2xl border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
                Supporting the financial health of your law firm
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                High survival rates reflect a resilient sector, but survival and profitability are
                not the same thing. Cash flow, partner drawings, WIP management and tax efficiency
                are the levers that separate a profitable practice from one that merely survives. Our
                team works exclusively with solicitors and law firms.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/services" className="text-[var(--primary)] hover:opacity-80">
                  Our services for law firms &rarr;
                </Link>
                <Link href="/contact" className="text-[var(--primary)] hover:opacity-80">
                  Talk to our team &rarr;
                </Link>
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
