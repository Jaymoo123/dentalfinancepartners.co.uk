import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { buildDatasetJsonLd, buildFaqJsonLd } from "@/lib/schema";
import { AnnualSeriesChart } from "@/components/research/TechFundingReliefsCharts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  type TechFormationsIndexSnapshot,
} from "@/lib/research/tech-formations-index";
import { LeadForm } from "@/components/forms/LeadForm";
import data from "@/data/uk-tech-formations-index.json";

const snapshot = data as unknown as TechFormationsIndexSnapshot;
const { meta, headline, incorporations } = snapshot;
const { decade } = headline;
const PRIMARY = headline.primary_sic;

const BRAND = "#4f46e5";
const PAGE_PATH = "/research/uk-tech-formations-index";

// ---------------------------------------------------------------------------
// Seasonality: average union incorporations by calendar month, full years only
// ponytail: computed in the page layer from the snapshot's monthly series,
// same pattern used by the construction-cis niche's formations index.
// ---------------------------------------------------------------------------
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const FIRST_FULL_YEAR = 2016;
const LAST_FULL_YEAR = 2025;

const seasonalityData: { year: string; value: number | null }[] = (() => {
  const provisional = new Set(meta.provisional_months);
  const sums: number[] = Array(12).fill(0);
  const counts: number[] = Array(12).fill(0);
  for (const row of incorporations.monthly) {
    if (provisional.has(row.month)) continue;
    const year = Number(row.month.slice(0, 4));
    if (year < FIRST_FULL_YEAR || year > LAST_FULL_YEAR) continue;
    const mi = Number(row.month.slice(5, 7)) - 1;
    sums[mi] += Number(row["union"] ?? 0);
    counts[mi]++;
  }
  return sums.map((s, i) => ({
    year: MONTH_SHORT[i],
    value: counts[i] > 0 ? Math.round(s / counts[i]) : null,
  }));
})();

const HEADLINE_SENTENCE = `New UK software company formations rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}`;

export const metadata: Metadata = {
  title: "UK Tech Formations Index | New software company formation trends | Founder Tax Partners",
  description: `${HEADLINE_SENTENCE}. A sourced monthly index of new UK tech company formations by SIC code, compiled from Companies House open data. Updated ${monthLabel(meta.incorporations_settled_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Tech Formations Index | Founder Tax Partners",
    description: `${HEADLINE_SENTENCE}. New UK tech company formations from Companies House official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the UK Tech Formations Index measure?",
    answer:
      "It counts new companies incorporated each month under five UK tech Standard Industrial Classification (SIC) codes: business and domestic software development (62012, the primary measure), IT consultancy (62020), other IT services (62090), data processing and hosting (63110), and other software publishing (58290). The deduplicated union across all five is reported alongside the primary measure. Counts are gross: companies that have since been dissolved remain on the register, so there is no survivorship bias.",
  },
  {
    question: "Why have UK software company formations grown so fast?",
    answer:
      `New software development company formations (SIC 62012) rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}, far outpacing the ${fmtPercent(decade.union_change_pct, false)} rise across the whole 5-code tech union over the same period. Falling barriers to starting a software business (cloud infrastructure, low-code tools, remote-first hiring), the tax efficiency of operating through a limited company at higher profit levels, and the post-pandemic acceleration in software adoption across every industry have all contributed.`,
  },
  {
    question: "Where does this data come from?",
    answer:
      "All incorporation counts come from the Companies House Advanced Search API. Companies House is the UK register of companies, operated by an executive agency of the Department for Business and Trade, and its data is published under the Open Government Licence v3.0. The figures are updated monthly, though the most recent two months are provisional due to indexing lag.",
  },
  {
    question: "What does 'provisional' mean on this index?",
    answer:
      "Companies House indexes very recent incorporations with a short lag of several weeks. The two most recent months in the series are therefore provisional and are excluded from all headline figures and decade comparisons to avoid understating the trend; they will typically be revised upward once indexing catches up.",
  },
  {
    question: "How does this differ from the site's other Companies House research page?",
    answer:
      "This index tracks monthly formation velocity and seasonality for a narrower, software-focused SIC cluster. The site's UK Startup Formation and Survival Index uses a broader 8-code cluster (also including games publishing and web portals) at annual and quarterly grain, and focuses on the current active-versus-dissolved snapshot rather than the month-by-month formation trend.",
  },
];

const datasetJsonLd = buildDatasetJsonLd({
  name: "UK Tech Formations Index: tech company incorporations by SIC code",
  description: `${HEADLINE_SENTENCE}. Monthly counts of newly incorporated UK tech companies across five SIC codes (Companies House), including the deduplicated union.`,
  url: `${siteConfig.url}${PAGE_PATH}`,
  dateModified: meta.generated_at,
  sources: [
    {
      name: meta.sources[0].name,
      url: meta.sources[0].url,
      licence: meta.sources[0].licence,
      publisher: meta.sources[0].publisher,
    },
  ],
});

const faqJsonLd = buildFaqJsonLd(faqs);

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/10 border border-white/20 p-6">
      <div className="text-4xl font-bold font-mono text-white">{value}</div>
      <div className="mt-2 text-sm font-semibold text-white/60 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function TechFormationsIndexPage() {
  const settledThrough = meta.incorporations_settled_through;
  const lastSettled = headline.last_settled_month;
  const latestRow = incorporations.monthly.find((m) => m.month === lastSettled);

  // Full years only, for the annual chart
  const annualFull = incorporations.annual;
  const monthlyRecent = incorporations.monthly.slice(-36); // last 3 years for the monthly chart

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: datasetJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-[#1e1b4b] py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 uppercase tracking-wider hover:text-white transition-colors mb-6"
          >
            Research
          </Link>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            A sourced, monthly read on new UK tech company formations, drawn from Companies House
            public records. Covering software development, IT consultancy, IT services, data
            processing and software publishing. Updated {monthLabel(settledThrough)}.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-4">
            <Stat
              value={fmtNumber(headline.all_tech_cos_ttm)}
              label="tech companies incorporated in the last 12 months"
            />
            <Stat
              value={fmtNumber(headline.software_development_cos_ttm)}
              label={`software development companies (SIC ${PRIMARY}) in the last 12 months`}
            />
            <Stat
              value={fmtPercent(decade.change_pct, false)}
              label={`more software companies than in ${decade.from_year}`}
            />
            <Stat
              value={fmtPercent(headline.software_development_cos_yoy_pct)}
              label={`year-on-year change in ${monthLabel(lastSettled)}`}
            />
          </div>

          <p className="mt-6 text-xs text-white/40 max-w-2xl">
            Source: {meta.sources[0].name} ({meta.sources[0].publisher}). Licence: Open
            Government Licence v3.0.
          </p>
        </div>
      </section>

      {/* Key findings */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">Key findings</h2>
          <div className="max-w-2xl rounded-md border-l-4 p-6 text-neutral-700 text-base leading-relaxed bg-neutral-50" style={{ borderColor: BRAND }}>
            <ul className="list-disc list-inside space-y-3">
              <li>
                New software development companies (SIC {PRIMARY}) grew from{" "}
                {fmtNumber(decade.from_value)} in {decade.from_year} to {fmtNumber(decade.to_value)}{" "}
                in {decade.to_year}, a rise of {fmtPercent(decade.change_pct, false)}, a{" "}
                {decade.multiple}&times; increase.
              </li>
              <li>
                In the 12 months to {monthLabel(settledThrough)}, {fmtNumber(headline.all_tech_cos_ttm)}{" "}
                UK tech companies were incorporated across all five SIC codes tracked here.
              </li>
              <li>
                Formations peaked in {monthLabel(headline.peak_month ?? "")} at{" "}
                {fmtNumber(headline.peak_value)} software development companies in a single month,
                the highest on record.
              </li>
              <li>
                The all-tech union rose {fmtPercent(decade.union_change_pct, false)} over the
                decade, from {fmtNumber(decade.union_from)} to {fmtNumber(decade.union_to)}{" "}
                annually, a much slower pace than the software-development-specific growth,
                showing formation is concentrating in software development relative to IT
                consultancy and services.
              </li>
              <li>
                Year-on-year growth in {monthLabel(lastSettled)} was{" "}
                {fmtPercent(headline.software_development_cos_yoy_pct)} for software development
                companies.
              </li>
            </ul>
          </div>
          <p className="mt-4 max-w-2xl text-xs text-neutral-500">
            Source: {meta.sources[0].name}, under the Open Government Licence v3.0. Figures may
            be cited with attribution to Founder Tax Partners. The most recent{" "}
            {meta.provisional_months.length} months of incorporation data are provisional
            (Companies House indexing lag) and are excluded from the headline figures above.
          </p>
        </div>
      </section>

      {/* Annual chart */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Software development company formations by year
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            New companies incorporated each calendar year under SIC {PRIMARY} (
            {meta.sic_labels[PRIMARY]?.toLowerCase()}). Only complete calendar years are shown.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <AnnualSeriesChart
              data={annualFull.map((r) => ({ year: String(r.year), value: Number(r[PRIMARY] ?? 0) }))}
              label="Software development company formations by year"
              formatValue={(n) => `${fmtNumber(n)} companies`}
            />
          </div>
        </div>
      </section>

      {/* Monthly trend (last 3 years) */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            The monthly trend, last 3 years
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            Monthly software development company formations from {monthLabel(monthlyRecent[0].month)}{" "}
            to {monthLabel(settledThrough)}. The most recent{" "}
            {meta.provisional_months.length} months (highlighted) are provisional.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <AnnualSeriesChart
              data={monthlyRecent.map((r) => ({ year: monthLabel(r.month), value: Number(r[PRIMARY] ?? 0) }))}
              label="Monthly software development company formations, last 3 years"
              formatValue={(n) => `${fmtNumber(n)} companies`}
            />
          </div>
        </div>
      </section>

      {/* SIC breakdown */}
      <section className="bg-neutral-50 border-t border-b border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            By tech SIC code, {lastSettled ? monthLabel(lastSettled) : "the latest settled month"}
          </h2>
          <p className="mb-6 max-w-2xl text-neutral-600 text-sm">
            New company formations across all five tracked SIC codes in the latest settled month.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-300 text-left">
                  <th className="py-2 pr-4 font-bold text-neutral-900">SIC code</th>
                  <th className="py-2 pr-4 font-bold text-neutral-900">What it covers</th>
                  <th className="py-2 font-bold text-neutral-900 text-right">New companies</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(meta.sic_labels).map((code) => (
                  <tr key={code} className="border-b border-neutral-200">
                    <td className="py-2 pr-4 font-semibold text-neutral-900">{code}</td>
                    <td className="py-2 pr-4 text-neutral-700">{meta.sic_labels[code]}</td>
                    <td className="py-2 text-right font-semibold text-neutral-900">
                      {latestRow ? fmtNumber(Number(latestRow[code])) : "n/a"}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-neutral-300">
                  <td className="py-2 pr-4 font-bold" style={{ color: BRAND }}>
                    All 5 codes (deduplicated)
                  </td>
                  <td className="py-2 pr-4 text-neutral-700">Unique companies across all tracked SIC codes</td>
                  <td className="py-2 text-right font-bold" style={{ color: BRAND }}>
                    {latestRow ? fmtNumber(Number(latestRow["union"])) : "n/a"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Seasonality */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Tax-year seasonality in tech incorporations
          </h2>
          <p className="mb-4 max-w-2xl text-neutral-600 text-sm leading-relaxed">
            Averaged across {FIRST_FULL_YEAR} to {LAST_FULL_YEAR}, new tech company formations
            (all five SIC codes combined) show a consistent spike in the run-up to the UK tax year
            boundary on 5 April, before falling back in April itself. The likely driver is
            tax-year-boundary planning: incorporating before 6 April lets a founder open their
            company&apos;s accounting period at the start of the new tax year, avoiding
            overlapping periods and capturing a full year of company-level tax efficiency from day
            one.
          </p>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
            <p className="mb-3 text-xs text-neutral-500">
              Average monthly incorporations, all-tech union, {FIRST_FULL_YEAR} to {LAST_FULL_YEAR}.
            </p>
            <AnnualSeriesChart
              data={seasonalityData}
              label="Average monthly tech company incorporations by calendar month"
              formatValue={(n) => `${fmtNumber(n)} companies (average)`}
            />
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="bg-neutral-50 border-t border-neutral-200 py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-4">
            Methodology and sources
          </h2>
          <div className="max-w-2xl space-y-4 text-sm text-neutral-700 leading-relaxed">
            <p>
              <strong>Incorporations.</strong> For each month, we query the Companies House
              Advanced Search API for companies incorporated under each of five tech SIC codes:
              62012 (business and domestic software development, the primary measure), 62020 (IT
              consultancy), 62090 (other IT services), 63110 (data processing and hosting), and
              58290 (other software publishing). The deduplicated union counts each company once
              even where it registers under multiple codes in this set. Counts are gross: a
              company that has since been dissolved still appears on the register, so the series
              carries no survivorship bias. The most recent {meta.provisional_months.length}{" "}
              months are provisional and excluded from headline figures.
            </p>
            <p>
              <strong>Updated.</strong> Incorporations to {monthLabel(settledThrough)} (settled
              data). Data generated {monthLabel(meta.generated_at.slice(0, 7))}.
            </p>
            <ul className="not-prose mt-2 space-y-1 text-sm">
              {meta.sources.map((s) => (
                <li key={s.name}>
                  <a href={s.url} className="font-semibold text-[#4f46e5] hover:opacity-75" rel="nofollow">
                    {s.name}
                  </a>{" "}
                  <span className="text-neutral-500">({s.publisher})</span>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              <Link href={`${PAGE_PATH}/data`} className="font-semibold text-[#4f46e5] hover:opacity-75">
                Download the incorporation data (CSV)
              </Link>
            </p>
            <p className="text-sm text-neutral-500">
              Free to cite and republish with attribution to Founder Tax Partners. This page is a
              data summary and does not constitute tax advice on any individual situation.
            </p>
          </div>
        </div>
      </section>

      {/* Conversion */}
      <section className="bg-[#1e1b4b] py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Incorporating a UK tech company?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Getting the structure right from day one, including share classes for future SEIS/EIS
            rounds and an EMI-ready cap table, saves rework later. We work with founders from
            pre-incorporation through to their first raise.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/for/pre-seed-founders"
              className="inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-[#1e1b4b] hover:bg-white/90 transition-colors"
            >
              Pre-seed founder guide
            </Link>
            <Link
              href="/services/core-compliance"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Core compliance
            </Link>
          </div>
          <div className="mt-10 max-w-xl">
            <LeadForm redirectOnSuccess={false} submitLabel="Talk to us" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 sm:py-16">
        <div className={siteContainerLg}>
          <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl mb-8">
            Frequently asked questions
          </h2>
          <div className="max-w-2xl space-y-6">
            {faqs.map((f, i) => (
              <div key={f.question}>
                <h3 className="text-lg font-bold text-neutral-900">{f.question}</h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-700">
                  {i === faqs.length - 1 ? (
                    <>
                      This index tracks monthly formation velocity and seasonality for a
                      narrower, software-focused SIC cluster. The site&apos;s{" "}
                      <Link
                        href="/research/startup-formation-survival-index"
                        className="text-[#4f46e5] underline hover:opacity-75"
                      >
                        UK Startup Formation and Survival Index
                      </Link>{" "}
                      uses a broader 8-code cluster (also including games publishing and web
                      portals) at annual and quarterly grain, and focuses on the current
                      active-versus-dissolved snapshot rather than the month-by-month formation
                      trend.
                    </>
                  ) : (
                    f.answer
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
