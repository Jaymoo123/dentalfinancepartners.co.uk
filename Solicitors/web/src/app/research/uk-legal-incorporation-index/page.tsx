import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import { serialize } from "@/lib/schema/serialize";
import {
  AnnualIncorporationChart,
  SraStructureChart,
} from "@/components/research/LegalIncorporationCharts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  type LegalIncorporationIndexSnapshot,
} from "@/lib/research/legal-incorporation-index";
import snapshot from "@/data/uk-legal-incorporation-index.json";

const data = snapshot as unknown as LegalIncorporationIndexSnapshot;
const { meta, headline, incorporations, sra_structure_series } = data;

const PAGE_PATH = "/research/uk-legal-incorporation-index";

const INC_SHIFT = headline.sra_incorporated_latest_pct - headline.sra_incorporated_2011_pct;
const HEADLINE_SENTENCE = `Law firm incorporations have risen sharply: incorporated companies now account for ${headline.sra_incorporated_latest_pct}% of SRA-regulated firms, up from ${headline.sra_incorporated_2011_pct}% in 2011`;

export const metadata: Metadata = {
  title: "UK Legal Incorporation Index | Law firm structure shift 2011-2026 | Accounts for Lawyers",
  description: `${HEADLINE_SENTENCE}. A sourced index of law firm incorporation trends, compiled from Companies House and SRA data. Updated ${monthLabel(meta.data_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Legal Incorporation Index | Accounts for Lawyers",
    description: `Incorporated companies now account for ${headline.sra_incorporated_latest_pct}% of SRA-regulated law firms, up from ${headline.sra_incorporated_2011_pct}% in 2011. Sourced from Companies House and SRA open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "Why are more law firms incorporating as limited companies?",
    answer:
      "The shift from traditional partnership and LLP structures to incorporated limited companies has been driven by several factors: flexibility in profit extraction (salary plus dividends), access to the corporate tax regime rather than income tax on drawings, the ability to bring in external investors or build a scalable equity structure, and regulatory clarity following the Legal Services Act 2007 which permitted Alternative Business Structures. Since 2011 the SRA has tracked a near-continuous rise in the share of firms operating as incorporated companies, from 22% to 59% by June 2026. At the same time, sole practitioners and traditional partnerships have contracted sharply.",
  },
  {
    question: "What is the difference between an LLP and a limited company for a law firm?",
    answer:
      "A Limited Liability Partnership (LLP) gives partners limited liability while preserving the partnership tax treatment: each partner is taxed individually on their share of profits at income tax rates. A limited company is a separate legal entity taxed at corporation tax rates, with profits extracted via salary and dividends. The tax position of each structure depends on individual circumstances, profit levels, and whether funds are retained in the business. For many law firms the corporation tax plus dividend route has become materially more attractive as income tax rates have risen, though the analysis is sensitive to profit levels and national insurance implications.",
  },
  {
    question: "What SIC codes are used for law firms at Companies House?",
    answer:
      "Companies House uses three SIC codes for legal activities: 69101 (Barristers at law), 69102 (Solicitors), and 69109 (Other legal activities). Firms with multiple activities may file under more than one, but most solicitor practices file under 69102. It is important to note that Limited Liability Partnerships (LLPs) in the legal sector often do not file SIC codes at all on formation, which is why this index uses SRA regulated-community statistics for the LLP vs incorporated comparison rather than the CH API alone.",
  },
  {
    question: "Where does the SRA structure data come from?",
    answer:
      "The Solicitors Regulation Authority publishes monthly counts of regulated firms by constitution type -- sole practitioner, partnership, incorporated company, LLP, and other -- as part of its Regulated Community Statistics. The data goes back to July 2010 and is updated monthly. The figures count all SRA-regulated firms operating under each structure, and are subject to revision as firm openings and closures are back-dated in the register. This page uses aggregate counts and trends only; no individual firm data is presented. Data attributed to the Solicitors Regulation Authority under its custom publication licence.",
  },
  {
    question: "Is incorporation right for my law firm?",
    answer:
      "That depends on your profit level, how much you retain in the business, your personal tax position, and whether the SRA's requirements for recognised bodies apply to your practice type. There is no universal answer: some firms benefit significantly from incorporation, others find that LLP or even sole practitioner structures remain more efficient. The right starting point is a firm-specific tax analysis that models both routes under current rates. Our team specialises in exactly this comparison for solicitors and law firms.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Legal Incorporation Index",
  description: `${HEADLINE_SENTENCE}, tracked from Companies House and SRA data.`,
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
  name: "UK Legal Incorporation Index: law firm incorporations and firm structure 2011-2026",
  description:
    "Monthly counts of UK law firm incorporations under SIC codes 69101, 69102 and 69109, plus annual SRA firm structure data showing the shift from partnerships and LLPs to incorporated companies.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: `${incorporations.annual[0]?.year ?? "2015"}/2026`,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Monthly law firm incorporations -- total (SIC 69101, 69102, 69109)",
    "Monthly law firm incorporations -- private limited company",
    "SRA-regulated firms -- incorporated company count and share",
    "SRA-regulated firms -- LLP count and share",
    "SRA-regulated firms -- partnership count and share",
    "SRA-regulated firms -- sole practitioner count and share",
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

export default function UKLegalIncorporationIndexPage() {
  const faqSchema = buildFaqPage(faqs);

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
              { label: "UK Legal Incorporation Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">
            UK Legal Incorporation Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Incorporated law firms: from {headline.sra_incorporated_2011_pct}% to {headline.sra_incorporated_latest_pct}% since 2011
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, data-led read on the structural shift in UK law firm ownership, drawn from
            Companies House incorporation records and SRA Regulated Community Statistics. Updated{" "}
            {monthLabel(meta.data_through)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={`${headline.sra_incorporated_latest_pct}%`}
              label={`of SRA-regulated firms were incorporated companies in ${headline.sra_incorporated_latest_month} ${headline.sra_incorporated_latest_year}`}
            />
            <Stat
              value={`+${INC_SHIFT}pp`}
              label="percentage-point rise in incorporated share since 2011"
            />
            <Stat
              value={fmtNumber(headline.sra_total_firms_latest)}
              label="total SRA-regulated firms in the register"
            />
            <Stat
              value={fmtNumber(headline.ttm_total)}
              label="legal companies incorporated in the trailing 12 months"
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
                  Incorporated companies account for <strong>{headline.sra_incorporated_latest_pct}%</strong> of
                  all SRA-regulated law firms in {headline.sra_incorporated_latest_month}{" "}
                  {headline.sra_incorporated_latest_year}, up from just {headline.sra_incorporated_2011_pct}% in
                  July 2011 -- a rise of {INC_SHIFT} percentage points in 15 years.
                </li>
                <li>
                  The number of traditional partnerships has fallen from 3,620 (33% of all firms) in
                  July 2010 to around 906 (10%) in June 2026. Sole practitioners have declined from
                  4,030 to 1,327 over the same period.
                </li>
                <li>
                  LLPs have remained broadly stable in absolute terms -- around 1,250-1,560 firms
                  throughout the period -- but have declined as a share from 11-12% to around 16% by
                  count, stable in relative terms despite the overall contraction in firm numbers.
                </li>
                <li>
                  Companies House records show {fmtNumber(headline.ttm_total)} legal company
                  incorporations in the trailing 12 months (SIC codes 69101, 69102, 69109), of
                  which {fmtPercent(headline.ttm_ltd_share_pct, false)} were private limited
                  companies. New LLP formations under these SIC codes are negligible in the CH data
                  (law firm LLPs rarely file SIC codes on formation).
                </li>
                <li>
                  The total number of SRA-regulated firms has contracted from around 10,885 in July
                  2010 to {fmtNumber(headline.sra_total_firms_latest)}, driven mainly by the
                  consolidation of sole practitioners and partnerships into larger incorporated
                  practices.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Sources: Companies House (Open Government Licence v3.0) and Solicitors Regulation
                Authority Regulated Community Statistics (aggregate data, SRA custom licence). Figures
                may be cited with attribution to Accounts for Lawyers.
              </p>
            </div>

            <Section id="annual" title="Legal firm incorporations by year">
              <p>
                Each bar shows the total number of companies incorporated under SIC codes 69101, 69102
                and 69109 (legal activities) in that calendar year. The series covers complete years
                from 2015 onwards. The January dip each year is structural (fewer working days); the
                trend has been broadly stable at around 2,300-2,800 per year, reflecting steady
                demand for the corporate form in the legal sector.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <AnnualIncorporationChart annual={incorporations.annual} />
              </div>
              <p className="text-sm text-neutral-500">
                Source: Companies House Advanced Search API (Open Government Licence v3.0).
                Private limited companies account for approximately 98-99% of all legal
                incorporations; the remainder are guarantee companies, unlimited companies, and other
                types. Law firm LLPs are not captured here because LLPs rarely file SIC codes on
                formation.
              </p>
            </Section>

            <Section id="sra-structure" title="Regulated firm structure: the 15-year shift">
              <p>
                The stacked bar chart shows SRA-regulated firms each July from 2010 to 2026, split by
                constitution type. The crimson band (incorporated companies) has grown continuously;
                the grey band (traditional partnerships) and the light band (sole practitioners) have
                contracted. The purple band (LLPs) has remained broadly stable in absolute terms. The
                total number of regulated firms has fallen from around 10,885 to around 8,900,
                reflecting consolidation rather than sector contraction.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <SraStructureChart series={sra_structure_series} />
              </div>
              <p className="text-sm text-neutral-500">
                Source: Solicitors Regulation Authority, Regulated Community Statistics (monthly firm
                counts by constitution type). Published under SRA custom licence -- aggregate data
                only; no individual firm details. Attributed to the Solicitors Regulation Authority.
              </p>
            </Section>

            <Section id="data-table" title="Annual SRA firm structure (selected years)">
              <p>
                The table below shows SRA firm counts at July of each year (or June for 2026) for
                selected reference points. Percentages are rounded to the nearest whole number by the
                SRA.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-3 font-bold text-neutral-900">Year</th>
                      <th className="py-2 pr-3 text-right font-bold text-neutral-900">Incorporated</th>
                      <th className="py-2 pr-3 text-right font-bold text-neutral-900">LLP</th>
                      <th className="py-2 pr-3 text-right font-bold text-neutral-900">Partnership</th>
                      <th className="py-2 pr-3 text-right font-bold text-neutral-900">Sole</th>
                      <th className="py-2 text-right font-bold text-neutral-900">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sra_structure_series
                      .filter((r) => [2010, 2012, 2015, 2018, 2020, 2022, 2024, 2026].includes(r.year))
                      .map((r) => (
                        <tr key={r.year} className="border-b border-neutral-200">
                          <td className="py-2 pr-3 text-neutral-700">
                            {r.month.slice(0, 3)} {r.year}
                          </td>
                          <td className="py-2 pr-3 text-right font-semibold text-neutral-900">
                            {fmtNumber(r.incorporated)}{" "}
                            <span className="text-neutral-400">({r.incorporated_pct}%)</span>
                          </td>
                          <td className="py-2 pr-3 text-right text-neutral-700">
                            {fmtNumber(r.llp)}{" "}
                            <span className="text-neutral-400">({r.llp_pct}%)</span>
                          </td>
                          <td className="py-2 pr-3 text-right text-neutral-700">
                            {fmtNumber(r.partnership)}{" "}
                            <span className="text-neutral-400">({r.partnership_pct}%)</span>
                          </td>
                          <td className="py-2 pr-3 text-right text-neutral-700">
                            {fmtNumber(r.sole)}{" "}
                            <span className="text-neutral-400">({r.sole_pct}%)</span>
                          </td>
                          <td className="py-2 text-right font-semibold text-neutral-900">
                            {fmtNumber(r.total)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-neutral-500">
                Source: Solicitors Regulation Authority, Regulated Community Statistics. Percentages
                are SRA-published rounded figures. Data attributed to the SRA under its custom
                publication licence.
              </p>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Companies House data.</strong> Monthly incorporation counts come from the
                Companies House Advanced Search API, filtered to SIC codes 69101, 69102 and 69109
                and queried month by month from January 2015. The API follows a 404-equals-zero
                convention for low-volume months. Each figure is the count of new companies
                incorporated in that calendar month; dissolutions and active-company counts are not
                included. Company types are dominated by private limited companies (company_type=ltd),
                which account for around 98-99% of monthly totals.
              </p>
              <p>
                <strong>LLP limitation.</strong> Law firm LLPs rarely file SIC codes at Companies
                House on formation, so filtering by SIC code + LLP company type returns zero (or
                near-zero) results in almost all monthly windows. The CH series therefore reflects
                limited-company incorporations only. The LLP structure trend is covered by SRA data.
              </p>
              <p>
                <strong>SRA data.</strong> Firm structure counts come from the SRA&apos;s monthly
                Regulated Community Statistics, which count all recognised bodies, recognised sole
                practices, and licensed bodies by constitution type. The data is published under the
                SRA&apos;s own licence; this page presents aggregate totals and trends only, in line
                with the permitted use for commentary and analysis. No individual firm details are
                included. Formation and closure dates may be backdated, so figures are subject to
                revision.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      className="font-semibold text-[var(--primary)] hover:opacity-80"
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
                  className="font-semibold text-[var(--primary)] hover:opacity-80"
                >
                  Download the monthly incorporation data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                CH data is published under the Open Government Licence v3.0. SRA data published with
                attribution to the Solicitors Regulation Authority under its custom licence. Free to
                cite with attribution to Accounts for Lawyers.
              </p>
            </Section>

            {/* CTA */}
            <div className="mt-10 rounded-2xl border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
                Thinking about incorporating your law firm?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                The structural shift is clear, but incorporation is not right for every practice.
                The tax saving depends on your profit level, how much you draw, and whether you
                retain funds in the company. Our team works exclusively with solicitors and law firms
                and can model both routes for your specific situation.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/calculators" className="text-[var(--primary)] hover:opacity-80">
                  Tax calculators for solicitors &rarr;
                </Link>
                <Link href="/services" className="text-[var(--primary)] hover:opacity-80">
                  Our services for law firms &rarr;
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
