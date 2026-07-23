import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildFaqPageJsonLd } from "@/lib/faq-page-schema";
import {
  AnnualIncorporationsChart,
  MonthlyIncorporationsChart,
  SeasonalityChart,
  TradeBreakdownTable,
  NetFormationChart,
  type SeasonalityPoint,
} from "@/components/research/ConstructionIndexCharts";
import {
  fmtNumber,
  fmtPercent,
  monthLabel,
  type ConstructionIndexSnapshot,
} from "@/lib/research/construction-index";
import type { NetFormationIndexSnapshot } from "@/lib/research/net-formation-index";
import snapshot from "@/data/uk-construction-index.json";
import netFormationSnapshot from "@/data/construction-net-formation-index.json";

const data = snapshot as unknown as ConstructionIndexSnapshot;
const { meta, headline, incorporations, construction_output, segments } = data;
const { decade } = headline;
const PRIMARY = headline.primary_sic;
const netFormation = netFormationSnapshot as unknown as NetFormationIndexSnapshot;

const PAGE_PATH = "/research/uk-construction-index";

// ---------------------------------------------------------------------------
// Seasonality: average union incorporations by calendar month (2016-2025 full years)
// ponytail: seasonality computed in page layer from snapshot monthly series;
//           promote into snapshot.py if other niches need it
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
    sums[mi] += Number(row["union"] ?? 0);
    counts[mi]++;
  }
  return sums.map((s, i) => ({
    month: MONTH_SHORT[i],
    avg: counts[i] > 0 ? Math.round(s / counts[i]) : 0,
    isMarch: i === 2, // March is the tax-year-boundary peak
  }));
})();

const HEADLINE_SENTENCE = `New domestic-building companies in the UK rose ${fmtPercent(decade.change_pct, false)} between ${decade.from_year} and ${decade.to_year}`;

export const metadata: Metadata = {
  title: "UK Construction Index | Construction company incorporation trends | Trade Tax Specialists",
  description: `${HEADLINE_SENTENCE}. A sourced index of new construction company formations by SIC code, compiled from Companies House open data. Updated ${monthLabel(meta.incorporations_settled_through)}.`,
  alternates: { canonical: `${siteConfig.url}${PAGE_PATH}` },
  openGraph: {
    title: "UK Construction Index | Trade Tax Specialists",
    description: `${HEADLINE_SENTENCE}. New construction company formations from Companies House official open data.`,
    url: `${siteConfig.url}${PAGE_PATH}`,
    type: "article",
  },
};

const faqs = [
  {
    question: "What does the UK Construction Index measure?",
    answer:
      "It counts new companies incorporated each month under 19 construction Standard Industrial Classification (SIC) codes, drawn from Companies House public records. The headline figure tracks SIC 41202 (construction of domestic buildings) as the primary measure, alongside the deduplicated union of all 19 construction SIC codes as a broader all-construction figure. Counts are gross: companies that have since been dissolved remain on the register, so there is no survivorship bias.",
  },
  {
    question: "Why have construction company formations been rising?",
    answer:
      "Several factors drive the long-term upward trend. Growing use of limited companies in the construction trades reflects tax planning (a company can be more tax-efficient than sole-trader status at higher profits), the cash-flow advantage a CIS company has in reclaiming its deductions in-year through the Employer Payment Summary rather than waiting for a Self Assessment refund, and broader sector growth in housebuilding and infrastructure. The post-pandemic surge to 2022 also reflects a general rise in new company formation across the UK economy during the recovery period.",
  },
  {
    question: "Where does this data come from?",
    answer:
      "All incorporation counts come from the Companies House Advanced Search API. Companies House is the UK register of companies, operated by His Majesty's Government, and its data is published under the Open Government Licence v3.0. The figures are updated monthly as Companies House releases new records, though the most recent two months are provisional due to indexing lag.",
  },
  {
    question: "What does 'provisional' mean on the chart?",
    answer:
      "Companies House indexes very recent incorporations with a short lag of four to six weeks. The two most recent months in the series are therefore provisional: they will be revised upward as late-indexed records are captured. These months are shown with a dashed line on the chart and are excluded from all headline figures and decade comparisons to avoid understating the trend.",
  },
  {
    question: "Are more construction companies closing down than opening?",
    answer:
      "Not yet overall, but the gap has nearly closed. Net formation (new incorporations minus dissolutions) across all construction SIC codes fell from tens of thousands of companies a year in the mid-2010s to close to zero in 2025, because dissolutions have risen faster than incorporations. For domestic-building companies (SIC 41202) specifically, 2025 was the first year on record where dissolutions outnumbered incorporations. See the net formation section above for the full year-by-year breakdown.",
  },
  {
    question: "Am I better off as a CIS contractor operating through a limited company?",
    answer:
      "It depends on your income level, whether you hold gross payment status, and how you draw money from the business. Operating through a company can reduce your overall tax bill at higher income levels, but brings compliance obligations including Corporation Tax returns, payroll, and Companies House filings. Our CIS tax calculators let you model your own position, and our team can review your specific circumstances.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "UK Construction Index",
  description: `${HEADLINE_SENTENCE}, tracked from Companies House open data.`,
  inLanguage: "en-GB",
  datePublished: "2026-06-16",
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
  name: "UK Construction Index: construction company incorporations by SIC code",
  description:
    "Monthly counts of newly incorporated UK construction companies across 19 SIC codes (Companies House), including the deduplicated union across all construction sectors.",
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
    {
      "@type": "DataDownload",
      encodingFormat: "text/csv",
      contentUrl: `${siteConfig.url}${PAGE_PATH}/net-formation-data`,
    },
  ],
  variableMeasured: [
    "Monthly company incorporations by construction SIC code",
    "Deduplicated union across all 19 construction SIC codes",
    "Monthly company incorporations - Electricians (SIC 43210)",
    "Monthly company incorporations - Plumbers and heating engineers (SIC 43220)",
    "Monthly company incorporations - Painters and decorators (SIC 43341)",
    "Monthly company incorporations - Joiners and carpenters (SIC 43320)",
    "Monthly company incorporations - Plasterers (SIC 43310)",
    "Monthly company incorporations - Flooring and wall tiling (SIC 43330)",
    "Monthly company incorporations - Groundworks and site preparation (SIC 43120)",
    "Monthly company incorporations - Demolition (SIC 43110)",
    "Annual net formation (incorporations minus dissolutions) - all construction SIC codes",
    "Annual net formation (incorporations minus dissolutions) - domestic buildings (SIC 41202)",
  ],
};

// ---------------------------------------------------------------------------
// Presentational helpers
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

export default function UKConstructionIndexPage() {
  const settledThrough = meta.incorporations_settled_through;
  const lastSettled = headline.last_settled_month;
  const latestRow = incorporations.monthly.find((m) => m.month === lastSettled);

  const topSics = ["41202", "41201", "41100", "43999", "43390", "43210"];

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
              { label: "UK Construction Index" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-orange-400">
            UK Construction Index
          </p>
          <h1 className="mt-2 max-w-4xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {HEADLINE_SENTENCE}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            A sourced, monthly read on new construction company formations across the UK, drawn from
            Companies House public records. Covering 19 construction SIC codes from housebuilding to
            electrical installation. Updated {monthLabel(settledThrough)}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat
              value={fmtNumber(headline.all_construction_cos_ttm)}
              label="construction companies incorporated in the last 12 months"
            />
            <Stat
              value={fmtNumber(headline.domestic_building_cos_ttm)}
              label={`domestic-building companies (SIC ${PRIMARY}) in the last 12 months`}
            />
            <Stat
              value={fmtPercent(decade.change_pct, false)}
              label={`more domestic-building companies than in ${decade.from_year}`}
            />
            <Stat
              value={fmtPercent(headline.domestic_building_cos_yoy_pct)}
              label={`year-on-year change in ${monthLabel(lastSettled)}`}
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
                  New domestic-building companies (SIC {PRIMARY}) grew from{" "}
                  {fmtNumber(decade.from_value)} in {decade.from_year} to{" "}
                  {fmtNumber(decade.to_value)} in {decade.to_year}, a rise of{" "}
                  {fmtPercent(decade.change_pct, false)}.
                </li>
                <li>
                  In the 12 months to {monthLabel(settledThrough)},{" "}
                  {fmtNumber(headline.all_construction_cos_ttm)} UK construction companies were
                  incorporated across all 19 SIC codes.
                </li>
                <li>
                  Formations peaked in {headline.peak_month.replace("-", " ")} at{" "}
                  {fmtNumber(headline.peak_value)} domestic-building companies in a single month,
                  the highest on record.
                </li>
                <li>
                  The all-construction union rose {fmtPercent(decade.union_change_pct, false)} over
                  the decade, from {fmtNumber(decade.union_from)} to {fmtNumber(decade.union_to)}{" "}
                  annually, reflecting broad sector growth across building construction, civil
                  engineering, and specialised trades.
                </li>
                <li>
                  Year-on-year growth in {monthLabel(lastSettled)} was{" "}
                  {fmtPercent(headline.domestic_building_cos_yoy_pct)} for domestic-building
                  companies, continuing the recovery from the 2023 to 2024 cooling period.
                </li>
              </ul>
              <p className="mt-4 text-xs text-neutral-500">
                Source: Companies House Advanced Search API, under the Open Government Licence v3.0.
                Figures may be cited with attribution to Trade Tax Specialists. The most recent{" "}
                {meta.provisional_months.length} months of incorporation data are provisional
                (Companies House indexing lag) and are excluded from the headline figures above.
              </p>
            </div>

            <Section id="incorporations" title="Domestic-building company formations by year">
              <p>
                Each bar shows the number of new companies incorporated in that calendar year under
                SIC code {PRIMARY}, {meta.sic_labels[PRIMARY]?.toLowerCase()}. Only complete
                calendar years are shown. The post-2020 surge reflects the broader rise in company
                formation during the economic recovery, before a cooling period from 2023.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <AnnualIncorporationsChart annual={incorporations.annual} sic={PRIMARY} />
              </div>
            </Section>

            <Section id="monthly" title="The monthly trend">
              <p>
                The same measure shown month by month, from mid-2015 to the present. The long climb
                to the 2022 peak is visible, followed by a period of consolidation. The dashed tail
                marks the most recent {meta.provisional_months.length} months, which are provisional
                because Companies House indexes very recent incorporations with a short lag.
              </p>
              {/* ONS construction output is absent (construction_output.available === false); no output chart rendered */}
              {!construction_output.available && (
                <p className="text-sm text-neutral-500">
                  Construction output data (ONS CGBR series) will be added in a future update once
                  a machine-readable feed is available.
                </p>
              )}
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <MonthlyIncorporationsChart
                  monthly={incorporations.monthly}
                  sic={PRIMARY}
                  provisionalMonths={meta.provisional_months}
                />
              </div>
            </Section>

            <Section id="breakdown" title="By construction SIC code">
              <p>
                The table below breaks down formations by the six most active SIC codes for{" "}
                {lastSettled ? monthLabel(lastSettled) : "the latest settled month"}, showing the
                spread of new company activity across the sector.
              </p>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">SIC code</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900">What it covers</th>
                      <th className="py-2 font-bold text-neutral-900">New companies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSics.map((code) => (
                      <tr key={code} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 font-semibold text-neutral-900">{code}</td>
                        <td className="py-2 pr-4 text-neutral-700">{meta.sic_labels[code]}</td>
                        <td className="py-2 font-semibold text-neutral-900">
                          {latestRow ? fmtNumber(Number(latestRow[code])) : "n/a"}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-b border-neutral-300">
                      <td className="py-2 pr-4 font-semibold text-orange-700">
                        All 19 codes (deduplicated)
                      </td>
                      <td className="py-2 pr-4 text-neutral-700">
                        Unique companies across all construction SIC codes
                      </td>
                      <td className="py-2 font-bold text-orange-700">
                        {latestRow ? fmtNumber(Number(latestRow["union"])) : "n/a"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="net-formation" title="Net formation: incorporations minus dissolutions">
              <p>
                Incorporations are only half the story. Every year, thousands of construction
                companies are also dissolved, removed from the Companies House register through
                strike-off, liquidation or administration. Net formation, incorporations minus
                dissolutions in the same calendar year, tells you whether the population of
                construction companies is actually growing.
              </p>
              <p>
                Net formation across all 19 construction SIC codes fell{" "}
                {fmtPercent(netFormation.headline.union_net_change_pct, false)} between{" "}
                {netFormation.headline.from_year} and {netFormation.headline.to_year}, from{" "}
                {fmtNumber(netFormation.headline.union_net_from)} more companies than were lost in{" "}
                {netFormation.headline.from_year} to just{" "}
                {fmtNumber(netFormation.headline.union_net_to)} in {netFormation.headline.to_year}.
                Gross incorporations rose for most of that period before easing back from their
                2022 peak, but dissolutions climbed in almost every single year, so the net
                addition to the construction company population has nearly disappeared.
                {netFormation.headline.primary_first_negative_year && (
                  <>
                    {" "}
                    For domestic-building companies (SIC {PRIMARY}) specifically,{" "}
                    {netFormation.headline.primary_first_negative_year} was the first year on
                    record where more companies were dissolved than incorporated: a net loss of{" "}
                    {fmtNumber(Math.abs(netFormation.headline.primary_net_to))} companies.
                  </>
                )}
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <p className="mb-3 text-xs text-neutral-500">
                  All construction companies (19 SIC codes, deduplicated): incorporated vs
                  dissolved each year, with net formation as the line.
                </p>
                <NetFormationChart annual={netFormation.annual} segment="union" />
              </div>
              <div className="not-prose mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-neutral-300 text-left">
                      <th className="py-2 pr-4 font-bold text-neutral-900">Year</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">Incorporated</th>
                      <th className="py-2 pr-4 font-bold text-neutral-900 text-right">Dissolved</th>
                      <th className="py-2 font-bold text-neutral-900 text-right">Net formation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {netFormation.annual.map((r) => (
                      <tr key={r.year} className="border-b border-neutral-200">
                        <td className="py-2 pr-4 text-neutral-700">{r.year}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtNumber(r.union_inc)}</td>
                        <td className="py-2 pr-4 text-right text-neutral-900">{fmtNumber(r.union_diss)}</td>
                        <td
                          className={`py-2 text-right font-semibold ${r.union_net < 0 ? "text-red-600" : "text-neutral-900"}`}
                        >
                          {r.union_net < 0 ? "-" : "+"}
                          {fmtNumber(Math.abs(r.union_net))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                Dissolutions are companies actually removed from the Companies House register
                (company_status = dissolved), not insolvency events specifically: a company can be
                dissolved through simple voluntary strike-off as well as after liquidation or
                administration. See the{" "}
                <Link
                  href="/research/uk-construction-insolvency-index"
                  className="font-semibold text-orange-700 hover:text-orange-800"
                >
                  UK Construction Insolvency Index
                </Link>{" "}
                for insolvency-specific procedures.
              </p>
            </Section>

            <Section id="trades" title="UK construction incorporations by trade">
              <p>
                The table ranks the eight main CIS subcontractor trades by new company formations in
                the latest full calendar year, alongside the trailing 12-month total (settled data
                only). Each trade is a single SIC code within the 19-code construction universe.
                Thin segments (fewer than 120 formations in the trailing year) are not shown
                separately.
              </p>
              <TradeBreakdownTable segments={segments ?? []} />
            </Section>

            <Section id="seasonality" title="Tax-year seasonality in construction incorporations">
              <p>
                Averaged across 2016 to 2025, new construction company formations show a consistent
                March spike: the month before the UK tax year closes on 5 April runs roughly 15%
                above the calendar-year monthly mean. The pattern is visible across all major
                construction trades and in the all-construction union.
              </p>
              <p>
                The most likely driver is tax-year-boundary planning. A sole trader who incorporates
                before 6 April can open their company accounting period at the start of the new tax
                year, avoiding the complication of overlapping tax years and capturing a full
                year of company-level tax efficiency from day one. CIS contractors also benefit
                immediately on incorporation: a limited company can reclaim its monthly CIS
                deductions in-year via the Employer Payment Summary, whereas a sole trader waits
                until the following January Self Assessment filing. Both incentives concentrate
                activity in the final weeks of the tax year.
              </p>
              <p>
                April itself falls back sharply (around 11% below March) as the pre-year-end rush
                completes. December is the seasonal low, reflecting the general slowdown in company
                formation over the Christmas period.
              </p>
              <div className="not-prose mt-6 rounded-2xl border border-neutral-200 p-4 sm:p-6">
                <p className="mb-3 text-xs text-neutral-500">
                  Average monthly incorporations (all-construction union, 2016-2025). March
                  highlighted as the tax-year-boundary peak.
                </p>
                <SeasonalityChart data={seasonalityData} />
              </div>
            </Section>

            <Section id="methodology" title="Methodology and sources">
              <p>
                <strong>Incorporations.</strong> For each month, we query the Companies House
                Advanced Search API for companies incorporated under each of the 19 construction SIC
                codes spanning Division 41 (building construction), Division 42 (civil engineering),
                and Division 43 (specialised construction activities). The deduplicated union counts
                each company once even where it registers under multiple construction SIC codes.
                Counts are gross: a company that has since been dissolved still appears on the
                register, so the series carries no survivorship bias. The most recent{" "}
                {meta.provisional_months.length} months are provisional and excluded from headline
                figures.
              </p>
              <p>
                <strong>Trade segments.</strong> Each trade row is a single SIC code cut of the
                19-code universe. The union count is unchanged: a company registered under multiple
                construction SIC codes is still counted once. Roofing (SIC 43910) is a reserved
                future addition and is deliberately excluded to avoid revising the published union.
                Trade and division figures are additive within their SIC set but do not sum to the
                union (which deduplicates cross-SIC registrations).
              </p>
              <p>
                <strong>Net formation.</strong> Dissolutions are fetched from the same Companies
                House Advanced Search API, filtering on company_status = dissolved with a
                dissolved-date window instead of an incorporation-date window, for the same 19 SIC
                codes and division/segment groupings used throughout this page. Net formation for
                the in-progress current year is capped to the same settled-through month as
                incorporations, so the partial-year figure compares like with like: dissolutions
                data itself has no equivalent indexing lag, but capping it avoids an artificially
                negative partial-year net formation figure caused only by counting more months of
                dissolutions than incorporations.
              </p>
              <p>
                <strong>Updated.</strong> Incorporations to {monthLabel(settledThrough)} (settled
                data). Net formation (dissolutions) generated{" "}
                {monthLabel(netFormation.meta.generated_at.slice(0, 7))}. Data generated{" "}
                {monthLabel(meta.generated_at.slice(0, 7))}.
              </p>
              <ul className="not-prose mt-2 space-y-1 text-sm">
                {meta.sources
                  .filter((s) => s.status !== "deferred_v2")
                  .map((s) => (
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
                  Download the incorporation data (CSV)
                </Link>
              </p>
              <p className="text-sm">
                <Link
                  href={`${PAGE_PATH}/net-formation-data`}
                  className="font-semibold text-orange-700 hover:text-orange-800"
                >
                  Download the net formation data (CSV)
                </Link>
              </p>
              <p className="text-sm text-neutral-500">
                Free to cite and republish with attribution to Trade Tax Specialists. This page is a
                data summary and does not constitute tax advice on any individual situation.
              </p>
            </Section>

            {/* Conversion */}
            <div className="mt-10 rounded-2xl border-2 border-orange-500/20 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-orange-700 sm:text-3xl">
                Working in construction? See what you could claim back.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                The rise in construction companies reflects a broader shift towards limited company
                working in the sector. Whether you are an established contractor or just setting up,
                understanding your CIS obligations and entitlements matters. Our calculators help
                you model your CIS refund and gross payment status eligibility.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link
                  href="/calculators/cis-refund-estimator"
                  className="text-orange-700 hover:text-orange-800"
                >
                  CIS refund estimator &rarr;
                </Link>
                <Link
                  href="/calculators/cis-gps-eligibility-checker"
                  className="text-orange-700 hover:text-orange-800"
                >
                  GPS eligibility checker &rarr;
                </Link>
              </div>
              <div className="mt-8">
                <LeadForm redirectOnSuccess={false} submitLabel="Get a free CIS review" />
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
