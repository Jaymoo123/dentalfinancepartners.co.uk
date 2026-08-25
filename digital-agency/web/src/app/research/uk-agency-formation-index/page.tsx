import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/ui/CTASection";
import { siteConfig } from "@/config/site";
import { JsonLd, buildDataset, buildFaqPage } from "@/lib/schema";
import { BarChart, LineChart, StackedBarChart, CHART_COLORS } from "@/components/research/Charts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  monthLabelShort,
  type FormationIndexSnapshot,
} from "@/lib/research/formation-index";
import snapshot from "@/data/uk-agency-formation-index.json";

const data = snapshot as unknown as FormationIndexSnapshot;
const { meta, headline, incorporations, segments } = data;
const { decade } = headline;
const PRIMARY = headline.primary_sic;

const PAGE_PATH = "/research/uk-agency-formation-index";

// ---------------------------------------------------------------------------
// Seasonality: average union incorporations by calendar month (full years only)
// ponytail: computed in the page layer from the snapshot monthly series, same
// approach as construction-cis's UK Construction Index page.
// ---------------------------------------------------------------------------
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const fullYears = incorporations.annual.map((a) => a.year);
const seasonalityFrom = fullYears.length ? Math.min(...fullYears) : 0;
const seasonalityTo = fullYears.length ? Math.max(...fullYears) : 0;

const seasonalityData = (() => {
  const provisional = new Set(meta.provisional_months);
  const sums: number[] = Array(12).fill(0);
  const counts: number[] = Array(12).fill(0);
  for (const row of incorporations.monthly) {
    if (provisional.has(row.month)) continue;
    const year = Number(row.month.slice(0, 4));
    if (year < seasonalityFrom || year > seasonalityTo) continue;
    const mi = Number(row.month.slice(5, 7)) - 1;
    sums[mi] += Number(row["union"] ?? 0);
    counts[mi]++;
  }
  return sums.map((s, i) => ({
    label: MONTH_SHORT[i],
    value: counts[i] > 0 ? Math.round(s / counts[i]) : 0,
    highlight: i === 2,
  }));
})();

const HEADLINE_SENTENCE = `New advertising agency incorporations in the UK ${(decade?.change_pct ?? 0) >= 0 ? "rose" : "fell"} ${fmtPercent(decade?.change_pct ?? null, false)} between ${decade?.from_year} and ${decade?.to_year}`;

export const metadata: Metadata = {
  title: "UK Agency Formation Index | Agency company incorporation trends | Agency Founder Finance",
  description: `${HEADLINE_SENTENCE}. A sourced index of new agency company formations by SIC code, compiled from Companies House open data. Updated ${monthLabel(meta.incorporations_settled_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Agency Formation Index | Agency Founder Finance",
    description: `${HEADLINE_SENTENCE}. New agency company formations from Companies House official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    q: "What does the UK Agency Formation Index measure?",
    a: "It counts new companies incorporated each month under 7 agency Standard Industrial Classification (SIC) codes, drawn from Companies House public records: advertising agencies, media representation, PR and communications, specialised design, market research, software development and IT consultancy. The headline figure tracks SIC 73110 (advertising agencies) as the primary measure, alongside the deduplicated union of all 7 codes as a broader all-agency figure. Counts are gross: companies that have since been dissolved remain on the register.",
  },
  {
    q: "Does this include every kind of agency?",
    a: "It covers the SIC codes agencies most commonly register under, but SIC classification is self-reported at incorporation and imperfect. A performance-marketing agency might register as 73110 (advertising) or 62020 (IT consultancy) depending on how the founder saw the business at the time. The union figure catches companies across the whole 7-code cluster, but some agencies will inevitably sit outside it (e.g. under a generic 'other business activities' code) and some non-agency businesses will sit inside it (e.g. management-focused software consultancies under 62020).",
  },
  {
    q: "Where does this data come from?",
    a: "All incorporation counts come from the Companies House Advanced Search API. Companies House is the UK register of companies, operated by His Majesty's Government, and its data is published under the Open Government Licence v3.0. Figures are updated as Companies House releases new records, though the most recent two months are provisional due to indexing lag.",
  },
  {
    q: "What does 'provisional' mean on the chart?",
    a: "Companies House indexes very recent incorporations with a short lag. The two most recent months in the series are therefore provisional and will be revised upward as late-indexed records are captured. These months are shown as a dashed tail on the chart and excluded from all headline figures and decade comparisons.",
  },
  {
    q: "Do these counts have survivorship bias?",
    a: "No. The counts are gross: the Companies House Advanced Search API counts companies by incorporation date across all company statuses, so a company formed in an earlier year and dissolved since is still counted in the year it was formed. Companies House retains dissolved company records for roughly 20 years after dissolution, so nothing within this series' range has been purged from the search index. The formation totals therefore reflect all companies originally incorporated in each year, not just those still active today.",
  },
  {
    q: "Should I incorporate my agency as a limited company?",
    a: "It depends on your income level, growth plans and how you plan to draw money from the business. Operating through a company can be more tax-efficient at higher profit levels but brings compliance obligations including Corporation Tax returns, payroll and Companies House filings. Our incorporation guide and team can help you work through the decision for your specific circumstances.",
  },
];

const datasetSchema = buildDataset({
  name: "UK Agency Formation Index: agency company incorporations by SIC code",
  description:
    "Monthly counts of newly incorporated UK marketing, creative, advertising and digital agency companies across 7 SIC codes (Companies House), including the deduplicated union across all agency-cluster codes.",
  path: PAGE_PATH,
  distributionPath: `${PAGE_PATH}/data`,
  dateModified: meta.generated_at,
  temporalCoverage: `${incorporations.monthly[0]?.month ?? ""}/${meta.incorporations_settled_through}`,
  keywords: ["agency company formation", "advertising agency incorporations", "digital agency startups UK", "Companies House agency data"],
  license: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  spatialCoverage: "United Kingdom",
});

const faqSchema = buildFaqPage(faqs.map((f) => ({ question: f.q, answer: f.a })));

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="text-3xl font-bold text-indigo-600 sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-slate-200 py-10 first:border-t-0">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">{children}</div>
    </section>
  );
}

export default function UkAgencyFormationIndexPage() {
  const settledThrough = meta.incorporations_settled_through;
  const lastSettled = headline.last_settled_month;
  const latestRow = incorporations.monthly.find((m) => m.month === lastSettled);

  const annualBars = incorporations.annual.map((a) => ({ label: String(a.year), value: Number(a[PRIMARY] ?? 0) }));

  const provSet = new Set(meta.provisional_months);
  let lastSettledIdx = -1;
  incorporations.monthly.forEach((d, i) => {
    if (!provSet.has(d.month)) lastSettledIdx = i;
  });
  const monthlyLinePoints = incorporations.monthly.map((d, i) => {
    const v = Number(d[PRIMARY] ?? 0);
    const isProv = provSet.has(d.month);
    return {
      tick: monthLabelShort(d.month),
      month: d.month,
      settled: isProv ? null : v,
      provisional: isProv || i === lastSettledIdx ? v : null,
    };
  });

  const divisionData = (incorporations.annual_by_division ?? []).map((r) => ({
    label: String(r.year),
    creative: r.div_creative,
    tech: r.div_tech,
  }));

  const nonDivSegments = (segments ?? []).filter((s) => !s.key.startsWith("div") && !s.thin_segment);
  const rankedSegments = [...nonDivSegments].sort((a, b) => (b.ttm ?? 0) - (a.ttm ?? 0));

  return (
    <>
      <JsonLd data={faqSchema ? [datasetSchema, faqSchema] : [datasetSchema]} />

      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Research", href: "/research" }, { label: "UK Agency Formation Index" }]} />

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">UK Agency Formation Index</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-900">{HEADLINE_SENTENCE}</h1>
          <p className="mt-4 text-lg text-slate-700">
            A sourced, monthly read on new agency company formations across the UK, drawn from Companies House public
            records. Covering 7 agency SIC codes from advertising to IT consultancy. Updated {monthLabel(settledThrough)}.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat value={fmtNumber(headline.all_agency_cos_ttm)} label="agency-cluster companies incorporated in the last 12 months" />
          <Stat value={fmtNumber(headline.advertising_cos_ttm)} label={`advertising agencies (SIC ${PRIMARY}) in the last 12 months`} />
          <Stat value={fmtPercent(decade?.change_pct ?? null, false)} label={`more advertising agencies than in ${decade?.from_year}`} />
          <Stat value={fmtPercent(headline.advertising_cos_yoy_pct)} label={`year-on-year change in ${monthLabel(lastSettled)}`} />
        </div>

        <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-indigo-900">Key findings</h2>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-slate-800">
            <li>
              New advertising agencies (SIC {PRIMARY}) grew from {fmtNumber(decade?.from_value ?? null)} in{" "}
              {decade?.from_year} to {fmtNumber(decade?.to_value ?? null)} in {decade?.to_year}, a change of{" "}
              {fmtPercent(decade?.change_pct ?? null, false)}.
            </li>
            <li>
              In the 12 months to {monthLabel(settledThrough)}, {fmtNumber(headline.all_agency_cos_ttm)} UK
              agency-cluster companies were incorporated across all 7 SIC codes.
            </li>
            <li>
              Formations peaked in {headline.peak_month?.replace("-", " ")} at {fmtNumber(headline.peak_value)}{" "}
              advertising agencies in a single month, the highest on record.
            </li>
            <li>
              The all-agency union changed {fmtPercent(decade?.union_change_pct ?? null, false)} over the decade, from{" "}
              {fmtNumber(decade?.union_from ?? null)} to {fmtNumber(decade?.union_to ?? null)} annually.
            </li>
            <li>
              Year-on-year growth in {monthLabel(lastSettled)} was {fmtPercent(headline.advertising_cos_yoy_pct)} for
              advertising agencies.
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Source: Companies House Advanced Search API, under the Open Government Licence v3.0. Figures may be cited
            with attribution to Agency Founder Finance. The most recent {meta.provisional_months.length} months of
            incorporation data are provisional (Companies House indexing lag) and excluded from headline figures.
          </p>
        </div>

        <Section id="incorporations" title="Advertising agency formations by year">
          <p>
            Each bar shows the number of new companies incorporated in that calendar year under SIC code {PRIMARY},{" "}
            {meta.sic_labels[PRIMARY]?.toLowerCase()}. Only complete calendar years are shown.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
            <BarChart data={annualBars} />
          </div>
        </Section>

        <Section id="monthly" title="The monthly trend">
          <p>
            The same measure shown month by month. The dashed tail marks the most recent{" "}
            {meta.provisional_months.length} months, which are provisional because Companies House indexes very
            recent incorporations with a short lag.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
            <LineChart
              points={monthlyLinePoints}
              series={[
                { key: "settled", label: "Companies incorporated", color: CHART_COLORS.primary },
                { key: "provisional", label: "Provisional (indexing lag)", color: CHART_COLORS.secondary, dashed: true },
              ]}
            />
          </div>
        </Section>

        <Section id="breakdown" title="By agency SIC code">
          <p>
            The table below breaks down formations by all 7 agency SIC codes for{" "}
            {lastSettled ? monthLabel(lastSettled) : "the latest settled month"}, ranked by trailing-12-month total.
          </p>
          <div className="not-prose mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 text-left">
                  <th className="py-2 pr-4 font-bold text-slate-900">SIC code</th>
                  <th className="py-2 pr-4 font-bold text-slate-900">What it covers</th>
                  <th className="py-2 pr-4 font-bold text-slate-900 text-right">Latest month</th>
                  <th className="py-2 font-bold text-slate-900 text-right">TTM (settled)</th>
                </tr>
              </thead>
              <tbody>
                {rankedSegments.map((seg) => (
                  <tr key={seg.key} className="border-b border-slate-200">
                    <td className="py-2 pr-4 font-semibold text-slate-900">{seg.sic_codes[0]}</td>
                    <td className="py-2 pr-4 text-slate-700">{seg.label}</td>
                    <td className="py-2 pr-4 text-right text-slate-900">
                      {latestRow ? fmtNumber(Number(latestRow[seg.sic_codes[0]])) : "n/a"}
                    </td>
                    <td className="py-2 text-right font-semibold text-slate-900">{fmtNumber(seg.ttm)}</td>
                  </tr>
                ))}
                <tr className="border-b border-slate-300">
                  <td className="py-2 pr-4 font-semibold text-indigo-700">All 7 codes (deduplicated)</td>
                  <td className="py-2 pr-4 text-slate-700">Unique companies across all agency SIC codes</td>
                  <td className="py-2 pr-4 text-right font-semibold text-indigo-700">
                    {latestRow ? fmtNumber(Number(latestRow["union"])) : "n/a"}
                  </td>
                  <td className="py-2 text-right font-bold text-indigo-700">{fmtNumber(headline.all_agency_cos_ttm)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {divisionData.length > 0 && (
          <Section id="creative-vs-tech" title="Creative agencies vs software &amp; IT consultancy">
            <p>
              The agency SIC cluster splits into two groups: creative and communications agencies (advertising, media
              representation, PR, design and market research) and software and IT consultancy (business/domestic
              software development and IT consultancy), which straddle &quot;agency&quot; and &quot;software house&quot;.
              This chart keeps them visibly separate rather than blending them into one union figure.
            </p>
            <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
              <StackedBarChart
                data={divisionData}
                series={[
                  { key: "creative", label: meta.division_labels?.creative ?? "Creative agencies", color: CHART_COLORS.primary },
                  { key: "tech", label: meta.division_labels?.tech ?? "Software & IT consultancy", color: CHART_COLORS.secondary },
                ]}
              />
            </div>
          </Section>
        )}

        <Section id="seasonality" title="Formation seasonality: when agencies get founded">
          <p>
            Averaged across {seasonalityFrom} to {seasonalityTo} (complete calendar years only), new agency company
            formations show a seasonal pattern across the year. March, the month before the UK tax year closes on 5
            April, is highlighted below.
          </p>
          <div className="not-prose mt-6 rounded-2xl border border-slate-200 p-4 sm:p-6">
            <p className="mb-3 text-xs text-slate-500">
              Average monthly incorporations (all-agency union, {seasonalityFrom}-{seasonalityTo}).
            </p>
            <BarChart data={seasonalityData} />
          </div>
        </Section>

        <Section id="methodology" title="Methodology and sources">
          <p>
            <strong>Incorporations.</strong> For each month, we query the Companies House Advanced Search API for
            companies incorporated under each of the 7 agency SIC codes: 73110, 73120, 70210, 74100, 73200, 62012 and
            62020. The deduplicated union counts each company once even where it registers under multiple codes from
            the cluster. Counts are gross: a company that has since been dissolved still appears on the register. The
            most recent {meta.provisional_months.length} months are provisional and excluded from headline figures.
          </p>
          <p>{meta.notes}</p>
          <p>
            <strong>Updated.</strong> Incorporations to {monthLabel(settledThrough)} (settled data). Data generated{" "}
            {meta.generated_at}.
          </p>
          <ul className="not-prose mt-2 space-y-1 text-sm">
            {meta.sources.map((s) => (
              <li key={s.name}>
                <a href={s.url} className="font-semibold text-indigo-700 hover:text-indigo-800" rel="nofollow">
                  {s.name}
                </a>{" "}
                <span className="text-slate-500">({s.publisher})</span>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            <Link href={`${PAGE_PATH}/data`} className="font-semibold text-indigo-700 hover:text-indigo-800">
              Download the incorporation data (CSV)
            </Link>
          </p>
          <p className="text-sm text-slate-500">
            Free to cite and republish with attribution to Agency Founder Finance. This page is a data summary and
            does not constitute tax or business advice on any individual situation.
          </p>
        </Section>

        <div className="mt-10">
          <CTASection
            title="Starting an agency, or thinking about incorporating? Get it right from day one."
            description="The rise in agency company formations reflects a broader shift towards limited company working. Whether you are just starting out or already trading as a sole trader, understanding the incorporation decision matters for your tax position. Our team specialises exclusively in agency founders."
            primaryHref="/incorporation"
            primaryLabel="Read our incorporation guide"
            secondaryHref="/free-health-check"
            secondaryLabel="Get a free health check"
          />
        </div>

        <div className="mt-8">
          <LeadForm redirectOnSuccess={false} submitLabel="Book a free call" />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="border-l-4 border-slate-300 bg-white p-6 transition-all hover:border-indigo-600">
                <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
