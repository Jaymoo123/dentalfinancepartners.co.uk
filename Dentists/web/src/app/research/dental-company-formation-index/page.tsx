import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPage } from "@/lib/schema/faq-page";
import {
  MonthlyFormationChart,
  AnnualFormationChart,
  SeasonalityChart,
  type SeasonalityPoint,
} from "@/components/research/DentalFormationCharts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  type DentalCompanyFormationSnapshot,
} from "@/lib/research/dental-company-formation-index";
import snapshot from "@/data/dental-company-formation-index.json";

const data = snapshot as unknown as DentalCompanyFormationSnapshot;
const { meta, headline, incorporations } = data;

const PAGE_PATH = "/research/dental-company-formation-index";

// ---------------------------------------------------------------------------
// Seasonality: average formations by calendar month (2016-2025 full years)
// ---------------------------------------------------------------------------
const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const seasonalityData: SeasonalityPoint[] = (() => {
  const provisional = new Set(meta.provisional_months);
  const sums: number[] = Array(12).fill(0);
  const counts: number[] = Array(12).fill(0);
  for (const row of incorporations.monthly) {
    if (provisional.has(row.month)) continue;
    const year = Number(row.month.slice(0, 4));
    if (year < 2016 || year > 2025) continue;
    const mi = Number(row.month.slice(5, 7)) - 1;
    sums[mi] += Number(row["86230"] ?? 0);
    counts[mi]++;
  }
  return sums.map((s, i) => ({
    month: MONTH_SHORT[i],
    avg: counts[i] > 0 ? Math.round(s / counts[i]) : 0,
    isMarch: i === 2,
  }));
})();

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const { decade } = headline;

export const metadata: Metadata = {
  title: "Dental Company Formation Index (SIC 86230) | Dental Finance Partners",
  description: `New dental company incorporations (SIC 86230) rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}. Monthly index compiled from Companies House open data. Updated ${monthLabel(meta.incorporations_settled_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "Dental Company Formation Index | Dental Finance Partners",
    description: "Monthly dental company incorporations (SIC 86230) from Companies House open data.",
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the Dental Company Formation Index measure?",
    answer:
      "It counts the number of new limited companies incorporated each month under SIC code 86230 (General dental practice activities) from the Companies House public register. It is a leading indicator of growth in the limited company dental sector, covering NHS, mixed, and private dental practices. Counts are gross: companies that have since been dissolved remain on the register, so there is no survivorship bias.",
  },
  {
    question: "Why are more dentists incorporating as limited companies?",
    answer:
      "Operating through a limited company can be more tax-efficient than sole-trader or partnership status at higher income levels. A dental company can pay a small salary plus dividends, potentially reducing income tax and National Insurance compared with being taxed entirely on self-employment income. The rise in dental company formations also reflects new practice ownership, associate dentists stepping up to principals, and practice acquisitions structured through holding companies.",
  },
  {
    question: "Why is there a March peak in dental company formations?",
    answer:
      "March falls just before the UK tax year ends on 5 April. Dentists who incorporate before 6 April can start their company accounting period at the beginning of the new tax year, which simplifies overlap and avoids a split-year calculation. Incorporating in March captures a full year of company-level tax efficiency from day one. This tax-year-boundary incentive produces a consistent spike in the data across all years.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All incorporation counts come from the Companies House Advanced Search API, which is the UK's official register of companies. The data is published under the Open Government Licence v3.0. The figures are updated monthly as Companies House releases new records. The most recent two months are provisional due to an indexing lag in the Companies House database.",
  },
  {
    question: "How does incorporating help with dental practice tax planning?",
    answer:
      "A dental limited company is subject to Corporation Tax on its profits (currently 25% for profits above the main rate threshold, or 19% for small profits). The principal can then draw a combination of salary and dividends, which is often more tax-efficient than paying income tax and Class 4 National Insurance on the full profit as a sole trader. Associates and principals should model their own position: the right structure depends on income level, plans for retained earnings, and NHS contract arrangements. Our dental accountants can prepare a personal tax comparison.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Dental Company Formation Index (SIC 86230)",
  description: `Monthly dental company incorporations from Companies House open data. ${fmtNumber(headline.dental_cos_ttm)} dental companies formed in the trailing 12 months.`,
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
  name: "Dental Company Formation Index: monthly dental company incorporations (SIC 86230)",
  description:
    "Monthly counts of newly incorporated UK dental limited companies under SIC code 86230 (General dental practice activities), compiled from Companies House public records.",
  inLanguage: "en-GB",
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  creator: {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
  },
  dateModified: meta.generated_at,
  temporalCoverage: `${incorporations.monthly[0]?.month ?? ""}/${meta.incorporations_settled_through}`,
  isAccessibleForFree: true,
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/data`,
    },
  ],
  variableMeasured: [
    "Monthly new UK dental company incorporations (SIC 86230)",
    "Annual new UK dental company incorporations",
  ],
};

// ---------------------------------------------------------------------------
// UI helpers
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

export default function DentalCompanyFormationIndexPage() {
  const settledThrough = meta.incorporations_settled_through;
  const lastSettled = headline.last_settled_month;

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
              { label: "Dental Company Formation Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">
            Dental Company Formation Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            New dental company incorporations rose {fmtPercent(decade.change_pct, false)} between{" "}
            {decade.from_year} and {decade.to_year}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A monthly index of new limited company formations under SIC 86230 (General dental
            practice activities), compiled from Companies House public records. Updated{" "}
            {monthLabel(settledThrough)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Stat
              value={fmtNumber(headline.dental_cos_ttm)}
              label="dental companies incorporated in the last 12 months"
            />
            <Stat
              value={fmtPercent(headline.dental_cos_yoy_pct)}
              label={`year-on-year change in ${monthLabel(lastSettled)}`}
            />
            <Stat
              value={fmtPercent(decade.change_pct, false)}
              label={`more dental companies than in ${decade.from_year}`}
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
              <h2 className="text-lg font-bold text-[var(--navy)]">Key findings</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-neutral-800">
                <li>
                  New dental companies (SIC 86230) grew from{" "}
                  <strong>{fmtNumber(decade.from_value)}</strong> in {decade.from_year} to{" "}
                  <strong>{fmtNumber(decade.to_value)}</strong> in {decade.to_year}, a rise of{" "}
                  {fmtPercent(decade.change_pct, false)}.
                </li>
                <li>
                  In the 12 months to {monthLabel(settledThrough)},{" "}
                  <strong>{fmtNumber(headline.dental_cos_ttm)}</strong> new dental companies were
                  incorporated under SIC 86230.
                </li>
                <li>
                  The all-time monthly record was{" "}
                  <strong>{fmtNumber(headline.peak_value)}</strong> dental companies incorporated in{" "}
                  {monthLabel(headline.peak_month)}.
                </li>
                <li>
                  A consistent March spike is visible in the data across all years, driven by
                  dentists incorporating before the 6 April tax-year boundary to capture a full year
                  of company-level tax efficiency from day one.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Companies House Advanced Search API, under the Open Government Licence v3.0.
                The most recent {meta.provisional_months.length} months of data are provisional
                (Companies House indexing lag) and are excluded from the headline figures above.
              </p>
            </div>

            <Section id="annual" title="Dental company formations by year">
              <p>
                Each bar shows the number of new dental limited companies incorporated in that
                calendar year under SIC 86230. Only complete calendar years are shown. The
                post-2020 surge reflects both a broader rise in UK company formation and growing
                awareness of the tax advantages of operating through a limited dental company.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <AnnualFormationChart annual={incorporations.annual} />
              </div>
            </Section>

            <Section id="monthly" title="Monthly trend">
              <p>
                The same measure shown month by month from mid-2015 to the present. The long climb
                is visible, with March spikes each year. The dashed tail marks the most recent{" "}
                {meta.provisional_months.length} months, which are provisional because Companies
                House indexes very recent incorporations with a short lag.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <MonthlyFormationChart
                  monthly={incorporations.monthly}
                  provisionalMonths={meta.provisional_months}
                />
              </div>
            </Section>

            <Section id="seasonality" title="Tax-year seasonality in dental incorporations">
              <p>
                Averaged across 2016 to 2025, new dental company formations show a consistent
                March spike: the month before the UK tax year closes on 5 April runs well above
                the calendar-year monthly mean. The pattern is visible across every year in the
                series.
              </p>
              <p>
                The most likely driver is tax-year-boundary planning. A dentist who incorporates
                before 6 April can open the company accounting period at the start of the new tax
                year, avoiding a split-year calculation and capturing a full year of company-level
                tax efficiency immediately. April itself falls back sharply as the pre-year-end
                rush completes. December is the seasonal low.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <p className="mb-3 text-xs text-neutral-500">
                  Average monthly dental company formations (SIC 86230, 2016-2025). Reference line
                  shows the annual average.
                </p>
                <SeasonalityChart data={seasonalityData} />
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Incorporations.</strong> For each month, we query the Companies House
                Advanced Search API for companies incorporated under SIC 86230 (General dental
                practice activities). Counts are gross: a company that has since been dissolved
                still appears on the register, so the series carries no survivorship bias. The
                most recent {meta.provisional_months.length} months are provisional and excluded
                from headline figures.
              </p>
              <p>
                <strong>Updated.</strong> Incorporations to {monthLabel(settledThrough)} (settled
                data). Data generated {monthLabel(meta.generated_at.slice(0, 7))}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
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
                  Download the formation data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Dental Finance Partners. This page
                is a data summary and does not constitute financial or tax advice.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-[var(--gold)]/20 bg-gradient-to-br from-amber-50 to-yellow-50/50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--navy)] sm:text-3xl">
                Considering incorporating your dental practice?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                The rise in dental company formations reflects a genuine financial advantage for
                many dentists. Whether you are an associate thinking about your first company,
                a principal restructuring an existing practice, or buying a practice through a
                holding company, getting the structure right matters. Our dental accountants
                work exclusively with dental professionals.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/for-principals"
                  className="text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  For practice principals &rarr;
                </Link>
                <Link
                  href="/for-associates"
                  className="text-[var(--gold-strong)] hover:text-[var(--gold)]"
                >
                  For associate dentists &rarr;
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
